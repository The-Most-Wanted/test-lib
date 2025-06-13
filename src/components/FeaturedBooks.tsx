
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Eye, BookOpen, Sparkles, ShoppingCart, Star, TrendingUp } from "lucide-react";
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

const FeaturedBooks = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('featured', true)
      .eq('active', true)
      .limit(3);

    if (error) {
      console.error('Error loading featured books:', error);
    } else {
      console.log('Featured books loaded:', data);
      setFeaturedBooks(data || []);
    }
    setLoading(false);
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Chargement des livres en vedette...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Éléments décoratifs de fond améliorés */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section amélioré */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="text-blue-600 font-semibold text-sm sm:text-base tracking-wide uppercase">
              Sélection d'Excellence
            </span>
          </div>
          
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4 sm:mb-6">
            {t('featuredBooksTitle')}
          </h2>
          
          <p className="font-inter text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('featuredBooksSubtitle')}
          </p>
          
          <div className="mt-6 sm:mt-8 w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Grille de livres avec meilleure responsivité */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {featuredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 sm:hover:-translate-y-6 animate-fade-in bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-blue-200/50 overflow-hidden rounded-2xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image de couverture améliorée */}
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-2xl overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                      <span className="text-white text-2xl sm:text-3xl font-playfair font-bold">
                        {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-blue-800 font-playfair font-bold text-base sm:text-lg leading-tight px-2">
                      {language === 'fr' ? book.title : book.title_en}
                    </h3>
                  </div>
                </div>
                
                {/* Overlay avec animations */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge année */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  {book.year}
                </div>
                
                {/* Badge vedette */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                  <Star className="w-3 h-3" />
                  <span>Vedette</span>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex items-center justify-between">
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-blue-200">
                    <BookOpen className="w-3 h-3 inline mr-1" />
                    {language === 'fr' ? book.genre : book.genre_en}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {formatPrice(book.price)}
                  </span>
                </div>
                
                <p className="font-inter text-gray-600 mb-4 sm:mb-6 text-sm leading-relaxed line-clamp-3">
                  {language === 'fr' ? book.description : book.description_en}
                </p>
                
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <button
                    onClick={() => handleViewBook(book.id)}
                    className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{t('learnMore')}</span>
                    </div>
                  </button>
                  
                  <Button
                    onClick={() => handleAddToCart(book)}
                    disabled={book.stock_quantity <= 0}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                
                {/* Indicateur de stock */}
                {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                  <div className="mt-3 sm:mt-4 flex items-center justify-center space-x-1 text-orange-600 text-xs sm:text-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Plus que {book.stock_quantity} en stock !</span>
                  </div>
                )}
                
                {book.stock_quantity <= 0 && (
                  <p className="text-red-600 text-xs sm:text-sm mt-3 sm:mt-4 text-center font-semibold">
                    Rupture de stock
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bouton d'action principal amélioré */}
        <div className="text-center animate-fade-in">
          <Link to="/catalogue">
            <Button className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-xl hover:shadow-2xl font-semibold transform hover:scale-105 transition-all duration-300 rounded-xl">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t('viewAllBooks')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
