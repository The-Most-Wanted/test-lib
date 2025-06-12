import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import AnimatedButton from "@/components/AnimatedButton";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, BookOpen, Calendar, Building, Mail, Sparkles, Eye, ShoppingCart } from "lucide-react";
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
  publisher: string;
  publisher_en: string;
  price: number;
  stock_quantity: number;
}

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [otherBooks, setOtherBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBook(parseInt(id));
    }
  }, [id]);

  const loadBook = async (bookId: number) => {
    setLoading(true);
    
    // Load the specific book
    const { data: bookData, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .eq('active', true)
      .single();

    if (bookError || !bookData) {
      console.error('Error loading book:', bookError);
      setBook(null);
    } else {
      setBook(bookData);
      
      // Load other books (excluding current one)
      const { data: otherBooksData } = await supabase
        .from('books')
        .select('*')
        .eq('active', true)
        .neq('id', bookId)
        .limit(3);
      
      setOtherBooks(otherBooksData || []);
    }
    
    setLoading(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <div className="text-gray-300 text-8xl mb-6">📚</div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Chargement...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <div className="text-gray-300 text-8xl mb-6">📚</div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">{t('bookNotFound')}</h1>
            <AnimatedButton 
              variant="primary" 
              onClick={() => navigate('/catalogue')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToCatalogue')}
            </AnimatedButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in mb-6">
            <button
              onClick={() => navigate('/catalogue')}
              className="group inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t('backToCatalogue')}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-2xl p-8 mx-auto max-w-sm">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <span className="text-white text-4xl font-playfair font-bold">
                        {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-blue-800 font-playfair font-bold text-xl leading-tight">
                      {language === 'fr' ? book.title : book.title_en}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                {language === 'fr' ? book.title : book.title_en}
              </h1>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-yellow-400">
                  {formatPrice(book.price)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('publicationYear')}</div>
                  <div className="font-bold text-white">{book.year}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('genre')}</div>
                  <div className="font-bold text-white">{language === 'fr' ? book.genre : book.genre_en}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <Building className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('publisher')}</div>
                  <div className="font-bold text-white text-xs">{language === 'fr' ? book.publisher : book.publisher_en}</div>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => handleAddToCart(book)}
                  disabled={book.stock_quantity <= 0}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg disabled:cursor-not-allowed"
                >
                  <div className="relative flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-lg">
                      {book.stock_quantity <= 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span className="text-lg">{t('contactForInfo')}</span>
                  </div>
                </button>
              </div>

              {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                <p className="text-orange-300 text-sm">
                  Plus que {book.stock_quantity} en stock !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        <div className="mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            {t('aboutThisBook')}
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <p className="font-inter text-lg text-gray-700 leading-relaxed">
              {language === 'fr' ? book.description : book.description_en}
            </p>
          </div>
        </div>

        {/* Other Books */}
        {otherBooks.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-8 h-8 mr-3 text-indigo-600" />
                {t('exploreOtherBooks')}
              </h2>
              <button
                onClick={() => navigate('/catalogue')}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{t('viewAllBooks')}</span>
                </div>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherBooks.map((otherBook, index) => (
                <div
                  key={otherBook.id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/book/${otherBook.id}`)}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-xl p-6">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                          <span className="text-white text-2xl font-playfair font-bold">
                            {(language === 'fr' ? otherBook.title : otherBook.title_en).charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-blue-800 font-playfair font-bold text-sm leading-tight px-2">
                          {language === 'fr' ? otherBook.title : otherBook.title_en}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {language === 'fr' ? otherBook.genre : otherBook.genre_en}
                      </span>
                      <span className="text-xs text-gray-500">{otherBook.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {language === 'fr' ? otherBook.description : otherBook.description_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;