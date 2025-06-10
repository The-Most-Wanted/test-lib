import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import AnimatedButton from "@/components/AnimatedButton";
import { useLanguage } from "@/hooks/useLanguage";
import { books } from "@/data/books";
import { ArrowLeft, BookOpen, Calendar, Building, Mail, Sparkles, Eye } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const book = books.find(b => b.id === parseInt(id || ''));

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

  const otherBooks = books.filter(b => b.id !== book.id).slice(0, 3);

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
                        {(language === 'fr' ? book.title : book.titleEn).charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-blue-800 font-playfair font-bold text-xl leading-tight">
                      {language === 'fr' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                {language === 'fr' ? book.title : book.titleEn}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('publicationYear')}</div>
                  <div className="font-bold text-white">{book.year}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('genre')}</div>
                  <div className="font-bold text-white">{language === 'fr' ? book.genre : book.genreEn}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                  <Building className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-100">{t('publisher')}</div>
                  <div className="font-bold text-white text-xs">{language === 'fr' ? book.publisher : book.publisherEn}</div>
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg">{t('contactForInfo')}</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </button>
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
              {language === 'fr' ? book.description : book.descriptionEn}
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
                            {(language === 'fr' ? otherBook.title : otherBook.titleEn).charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-blue-800 font-playfair font-bold text-sm leading-tight px-2">
                          {language === 'fr' ? otherBook.title : otherBook.titleEn}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {language === 'fr' ? otherBook.genre : otherBook.genreEn}
                      </span>
                      <span className="text-xs text-gray-500">{otherBook.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {language === 'fr' ? otherBook.description : otherBook.descriptionEn}
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
