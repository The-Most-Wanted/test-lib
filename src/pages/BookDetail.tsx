
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, BookOpen, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { books } from "@/data/books";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const book = books.find(b => b.id.toString() === id);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              {t('bookNotFound')}
            </h1>
            <AnimatedButton onClick={() => navigate('/catalogue')} variant="primary">
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
      
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fade-in">
          <AnimatedButton 
            onClick={() => navigate('/catalogue')} 
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToCatalogue')}
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          {/* Book Cover & Info */}
          <Card className="overflow-hidden shadow-2xl">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                  <span className="text-white text-5xl font-playfair font-bold">
                    {(language === 'fr' ? book.title : book.titleEn).charAt(0)}
                  </span>
                </div>
                <h1 className="text-blue-800 font-playfair font-bold text-2xl leading-tight">
                  {language === 'fr' ? book.title : book.titleEn}
                </h1>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{book.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{language === 'fr' ? book.genre : book.genreEn}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{language === 'fr' ? book.publisher : book.publisherEn}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Details */}
          <div className="space-y-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? book.title : book.titleEn}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6"></div>
            </div>

            <Card className="animate-fade-in bg-white/80 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  {t('description')}
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed text-lg">
                  {language === 'fr' ? book.description : book.descriptionEn}
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in bg-white/80 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  {t('aboutThisBook')}
                </h3>
                <div className="space-y-3 font-inter text-gray-700">
                  <p><strong>{t('genre')}:</strong> {language === 'fr' ? book.genre : book.genreEn}</p>
                  <p><strong>{t('publicationYear')}:</strong> {book.year}</p>
                  <p><strong>{t('publisher')}:</strong> {language === 'fr' ? book.publisher : book.publisherEn}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <AnimatedButton 
                onClick={() => navigate('/contact')} 
                variant="primary" 
                size="lg"
                className="flex-1"
              >
                {t('contactForInfo')}
              </AnimatedButton>
              <AnimatedButton 
                onClick={() => navigate('/catalogue')} 
                variant="outline" 
                size="lg"
                className="flex-1"
              >
                {t('exploreOtherBooks')}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
