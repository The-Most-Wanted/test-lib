
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchEngine from "@/components/SearchEngine";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedButton from "@/components/AnimatedButton";
import { useLanguage } from "@/hooks/useLanguage";
import { books as allBooks, Book } from "@/data/books";
import { BookOpen, Calendar, Eye } from "lucide-react";

const Catalogue = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);

  const handleViewBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            {t('catalogue')}
          </h1>
          <p className="font-inter text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('catalogueDescription')}
          </p>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SearchEngine books={allBooks} onFilteredBooks={setFilteredBooks} />

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-blue-200/50 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                        <span className="text-white text-2xl font-playfair font-bold">
                          {(language === 'fr' ? book.title : book.titleEn).charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-blue-800 font-playfair font-bold text-lg leading-tight px-2">
                        {language === 'fr' ? book.title : book.titleEn}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {book.year}
                  </div>
                </div>
                
                <CardTitle className="font-playfair text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {language === 'fr' ? book.title : book.titleEn}
                </CardTitle>
                
                <CardDescription className="font-inter text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {book.year} • {language === 'fr' ? book.genre : book.genreEn}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <p className="font-inter text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {language === 'fr' ? book.description : book.descriptionEn}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 font-inter">
                  <BookOpen className="w-4 h-4" />
                  {language === 'fr' ? book.publisher : book.publisherEn}
                </div>
              </CardContent>
              
              <CardFooter className="pt-4 flex justify-center">
                <AnimatedButton 
                  variant="primary" 
                  size="sm"
                  className="px-6 group-hover:scale-105 transition-transform duration-300"
                  onClick={() => handleViewBook(book.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t('learnMore')}
                </AnimatedButton>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Books Found */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-gray-300 text-8xl mb-6">📚</div>
            <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {t('noBooksFound')}
            </h3>
            <p className="font-inter text-xl text-gray-600 mb-8">
              {t('tryDifferentSearch')}
            </p>
            <AnimatedButton 
              variant="primary" 
              onClick={() => setFilteredBooks(allBooks)}
            >
              {t('showAllBooks')}
            </AnimatedButton>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white animate-fade-in">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            {t('interestedInBooks')}
          </h2>
          <p className="font-inter text-lg mb-8 opacity-90">
            {t('contactForMoreInfo')}
          </p>
          <AnimatedButton 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/contact')}
          >
            {t('contactUs')}
          </AnimatedButton>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalogue;
