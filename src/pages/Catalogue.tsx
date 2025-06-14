
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ShoppingCart, Eye, Star, Grid, List, Filter, Search, X, Sparkles, Calendar, User, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Book {
  id: number;
  title: string;
  title_en: string;
  year: number;
  description: string;
  description_en: string;
  genre: string;
  genre_en: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
  publisher?: string;
  publisher_en?: string;
}

const Catalogue = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { trackSearch } = useAnalytics();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, selectedGenre, sortBy, language]);

  const loadBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('active', true)
      .order('title');

    if (error) {
      console.error('Error loading books:', error);
      toast.error('Erreur lors du chargement des livres');
    } else {
      setBooks(data || []);
    }
    setLoading(false);
  };

  const filterAndSortBooks = () => {
    let filtered = [...books];

    if (searchTerm) {
      filtered = filtered.filter(book => {
        const title = language === 'fr' ? book.title : book.title_en;
        const description = language === 'fr' ? book.description : book.description_en;
        const genre = language === 'fr' ? book.genre : book.genre_en;
        
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               genre.toLowerCase().includes(searchTerm.toLowerCase());
      });

      trackSearch(searchTerm, filtered.length);
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(book => {
        const genre = language === 'fr' ? book.genre : book.genre_en;
        return genre.toLowerCase() === selectedGenre.toLowerCase();
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'year':
          return b.year - a.year;
        case 'title':
        default:
          const titleA = language === 'fr' ? a.title : a.title_en;
          const titleB = language === 'fr' ? b.title : b.title_en;
          return titleA.localeCompare(titleB);
      }
    });

    setFilteredBooks(filtered);
  };

  const getUniqueGenres = () => {
    const genres = books.map(book => language === 'fr' ? book.genre : book.genre_en);
    return [...new Set(genres)].sort();
  };

  const handleViewBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const handleAddToCart = async (book: Book) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour ajouter au panier');
      navigate('/auth');
      return;
    }

    if (book.stock_quantity <= 0) {
      toast.error('Ce livre est en rupture de stock');
      return;
    }

    await addToCart(book.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSortBy("title");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">Chargement du catalogue...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section - Redesigned */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg tracking-wide uppercase">
                Bibliothèque Académique
              </span>
            </div>
            
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Catalogue Littéraire
              <span className="block text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mt-4">
                du Professeur Mahougnon KAKPO
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Explorez une collection exceptionnelle d'œuvres littéraires et d'essais philosophiques sur les traditions africaines et la spiritualité
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{books.length}</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Ouvrages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{getUniqueGenres().length}</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Genres</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {new Date().getFullYear() - Math.min(...books.map(b => b.year))}
                </div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Années</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Search & Filter Section */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-6">
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <Input
              type="text"
              placeholder="Rechercher par titre, genre, année..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-16 h-14 text-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl bg-white shadow-lg transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Genre Filter */}
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl bg-white shadow-sm">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Tous les genres" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl">
                  <SelectItem value="all">Tous les genres</SelectItem>
                  {getUniqueGenres().map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl bg-white shadow-sm">
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl">
                  <SelectItem value="title">Titre A-Z</SelectItem>
                  <SelectItem value="price_asc">Prix croissant</SelectItem>
                  <SelectItem value="price_desc">Prix décroissant</SelectItem>
                  <SelectItem value="year">Année de publication</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(searchTerm || selectedGenre !== "all" || sortBy !== "title") && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-xl bg-white shadow-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Effacer
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Results Count */}
              <div className="text-gray-600 font-medium">
                {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} trouvé{filteredBooks.length > 1 ? 's' : ''}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedGenre !== "all") && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Filtres actifs:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  <Search className="w-3 h-3 mr-1" />
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="ml-2 hover:text-indigo-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedGenre !== "all" && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Tag className="w-3 h-3 mr-1" />
                  {selectedGenre}
                  <button onClick={() => setSelectedGenre("all")} className="ml-2 hover:text-purple-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Books Display - Completely Redesigned */}
      <div className="container mx-auto px-4 py-12">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Aucun livre trouvé</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Aucun livre ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
            </p>
            <Button 
              onClick={clearFilters}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Voir tous les livres
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "space-y-6"
          }>
            {filteredBooks.map((book, index) => (
              <Card 
                key={book.id} 
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg hover:shadow-indigo-200/50 overflow-hidden rounded-2xl ${
                  viewMode === 'list' ? 'flex flex-row h-40' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Book Cover */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
                      {book.image_url ? (
                        <img 
                          src={book.image_url} 
                          alt={language === 'fr' ? book.title : book.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-700 transition-all duration-500 shadow-xl group-hover:shadow-2xl transform group-hover:scale-110">
                              <span className="text-white text-2xl font-playfair font-bold">
                                {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                              </span>
                            </div>
                            <h3 className="text-indigo-800 font-playfair font-bold text-lg leading-tight px-2 group-hover:text-purple-900 transition-colors">
                              {(language === 'fr' ? book.title : book.title_en).substring(0, 50)}
                              {(language === 'fr' ? book.title : book.title_en).length > 50 ? '...' : ''}
                            </h3>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        {book.year}
                      </div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                        <Star className="w-3 h-3" />
                        <span>Nouveau</span>
                      </div>
                      
                      {/* Stock Warning */}
                      {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Stock limité
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200/50">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {language === 'fr' ? book.genre : book.genre_en}
                        </span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                          {formatPrice(book.price)}
                        </span>
                      </div>
                      
                      <h3 className="font-playfair text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-800 transition-colors">
                        {language === 'fr' ? book.title : book.title_en}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{book.year}</span>
                        {book.publisher && (
                          <>
                            <span className="mx-2">•</span>
                            <User className="w-4 h-4 mr-1" />
                            <span className="truncate">{language === 'fr' ? book.publisher : book.publisher_en}</span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                        {language === 'fr' ? book.description : book.description_en}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewBook(book.id)}
                          className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative flex items-center justify-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">Découvrir</span>
                          </div>
                        </button>
                        
                        <Button
                          onClick={() => handleAddToCart(book)}
                          disabled={book.stock_quantity <= 0}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-3 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {book.stock_quantity <= 0 && (
                        <p className="text-red-600 text-sm mt-3 text-center font-semibold bg-red-50 py-2 rounded-lg">
                          Rupture de stock
                        </p>
                      )}
                    </CardContent>
                  </>
                ) : (
                  /* List View - Redesigned */
                  <div className="flex w-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center rounded-l-2xl">
                      {book.image_url ? (
                        <img 
                          src={book.image_url} 
                          alt={language === 'fr' ? book.title : book.title_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl font-playfair font-bold">
                            {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-playfair font-bold text-gray-800 mb-1 line-clamp-1">
                            {language === 'fr' ? book.title : book.title_en}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span className="inline-flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                              <Tag className="w-3 h-3 mr-1" />
                              {language === 'fr' ? book.genre : book.genre_en}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {book.year}
                            </span>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-green-600 ml-4">
                          {formatPrice(book.price)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {language === 'fr' ? book.description : book.description_en}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleViewBook(book.id)}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </button>
                          
                          <Button
                            onClick={() => handleAddToCart(book)}
                            disabled={book.stock_quantity <= 0}
                            size="sm"
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                            <div className="text-orange-600 text-xs font-semibold flex items-center">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Plus que {book.stock_quantity} en stock
                            </div>
                          )}
                          {book.stock_quantity <= 0 && (
                            <div className="text-red-600 text-xs font-semibold">
                              Rupture de stock
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;
