import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ShoppingCart, Eye, Star, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ModernSearchBar from "@/components/ModernSearchBar";
import { toast } from "sonner";

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
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book => {
        const title = language === 'fr' ? book.title : book.title_en;
        const description = language === 'fr' ? book.description : book.description_en;
        const genre = language === 'fr' ? book.genre : book.genre_en;
        
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               genre.toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Track search
      trackSearch(searchTerm, filtered.length);
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(book => {
        const genre = language === 'fr' ? book.genre : book.genre_en;
        return genre.toLowerCase() === selectedGenre.toLowerCase();
      });
    }

    // Sort books
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Modern Search Bar */}
      <ModernSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genres={getUniqueGenres()}
        isVisible={isSearchVisible}
        onToggle={() => setIsSearchVisible(!isSearchVisible)}
      />
      
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
                Notre Catalogue
                <span className="block text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mt-2">
                  Littéraire
                </span>
              </h1>
              <p className="font-inter text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Découvrez notre collection soigneusement sélectionnée de livres qui éveillent l'esprit
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{books.length}</div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">Livres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{getUniqueGenres().length}</div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">Genres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {books.filter(book => book.year >= new Date().getFullYear() - 1).length}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wide">Nouveautés</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-16 z-30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} trouvé{filteredBooks.length > 1 ? 's' : ''}
                </h2>
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    pour "{searchTerm}"
                  </span>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Display */}
        <div className="container mx-auto px-4 py-12">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Aucun livre trouvé</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Aucun livre ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
              <Button 
                onClick={() => setIsSearchVisible(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Modifier la recherche
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
                  className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in bg-white/95 backdrop-blur-md border-0 shadow-lg hover:shadow-blue-200/50 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        <div className="relative w-full h-full flex items-center justify-center p-8">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-700 shadow-xl group-hover:shadow-2xl transform group-hover:scale-110">
                              <span className="text-white text-3xl font-playfair font-bold">
                                {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                              </span>
                            </div>
                            <h3 className="text-blue-800 font-playfair font-bold text-lg leading-tight px-2 group-hover:text-indigo-900 transition-colors">
                              {language === 'fr' ? book.title : book.title_en}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                          {book.year}
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                        
                        {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Stock limité
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200/50">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {language === 'fr' ? book.genre : book.genre_en}
                          </span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                            {formatPrice(book.price)}
                          </span>
                        </div>
                        
                        <p className="font-inter text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                          {language === 'fr' ? book.description : book.description_en}
                        </p>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleViewBook(book.id)}
                            className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
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
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-3 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
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
                    /* List View */
                    <div className="flex w-full">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center rounded-l-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl font-playfair font-bold">
                            {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                          </span>
                        </div>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-playfair font-bold text-gray-800 mb-1">
                              {language === 'fr' ? book.title : book.title_en}
                            </h3>
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {language === 'fr' ? book.genre : book.genre_en}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-green-600">
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
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                            >
                              <Eye className="w-4 h-4 inline mr-1" />
                              Voir
                            </button>
                            
                            <Button
                              onClick={() => handleAddToCart(book)}
                              disabled={book.stock_quantity <= 0}
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Publié en {book.year}</div>
                            {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                              <div className="text-orange-600 text-xs font-semibold">
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
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;