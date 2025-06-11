
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, BookOpen, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600">Chargement du catalogue...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t('catalogueTitle')}
          </h1>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            {t('catalogueSubtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un livre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les genres</SelectItem>
                {getUniqueGenres().map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Titre A-Z</SelectItem>
                <SelectItem value="price_asc">Prix croissant</SelectItem>
                <SelectItem value="price_desc">Prix décroissant</SelectItem>
                <SelectItem value="year">Année de publication</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} trouvé{filteredBooks.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Aucun livre trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card 
                key={book.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur-md border-0 shadow-lg hover:shadow-blue-200/50 overflow-hidden"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500 shadow-lg">
                        <span className="text-white text-2xl font-playfair font-bold">
                          {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-blue-800 font-playfair font-bold text-sm leading-tight px-2">
                        {language === 'fr' ? book.title : book.title_en}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    {book.year}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      {language === 'fr' ? book.genre : book.genre_en}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                  
                  <p className="font-inter text-gray-600 mb-4 text-xs leading-relaxed line-clamp-2">
                    {language === 'fr' ? book.description : book.description_en}
                  </p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleViewBook(book.id)}
                      className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                    >
                      <div className="relative flex items-center justify-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">Voir</span>
                      </div>
                    </button>
                    
                    <Button
                      onClick={() => handleAddToCart(book)}
                      disabled={book.stock_quantity <= 0}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-3 py-2"
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                    <p className="text-orange-600 text-xs mt-2 text-center">
                      Plus que {book.stock_quantity} en stock !
                    </p>
                  )}
                  
                  {book.stock_quantity <= 0 && (
                    <p className="text-red-600 text-xs mt-2 text-center font-semibold">
                      Rupture de stock
                    </p>
                  )}
                </CardContent>
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
