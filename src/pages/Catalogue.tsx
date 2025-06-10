
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchEngine from "@/components/SearchEngine";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedButton from "@/components/AnimatedButton";
import { useLanguage } from "@/hooks/useLanguage";
import { books as allBooks, Book } from "@/data/books";

const Catalogue = () => {
  const { t, language } = useLanguage();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('catalogue')}
          </h1>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l'ensemble des œuvres du Professeur Mahougnon Kakpo, de ses essais académiques à ses créations littéraires.
          </p>
        </div>

        <SearchEngine books={allBooks} onFilteredBooks={setFilteredBooks} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl font-playfair font-bold">
                        {(language === 'fr' ? book.title : book.titleEn).charAt(0)}
                      </span>
                    </div>
                    <div className="text-blue-600 font-playfair font-bold text-lg leading-tight">
                      {language === 'fr' ? book.title : book.titleEn}
                    </div>
                  </div>
                </div>
                <CardTitle className="font-playfair text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {language === 'fr' ? book.title : book.titleEn}
                </CardTitle>
                <CardDescription className="font-inter text-gray-600">
                  {book.year} • {language === 'fr' ? book.genre : book.genreEn}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <p className="font-inter text-gray-700 text-sm line-clamp-3 mb-3">
                  {language === 'fr' ? book.description : book.descriptionEn}
                </p>
                <p className="font-inter text-xs text-gray-500">
                  {language === 'fr' ? book.publisher : book.publisherEn}
                </p>
              </CardContent>
              
              <CardFooter className="pt-4 flex justify-between items-center">
                <span className="font-inter text-2xl font-bold text-blue-600">
                  {book.price}€
                </span>
                <AnimatedButton 
                  variant="primary" 
                  size="sm"
                  className="px-6"
                >
                  Commander
                </AnimatedButton>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
              Aucun livre trouvé
            </h3>
            <p className="font-inter text-gray-600">
              Essayez de modifier vos critères de recherche ou effacez les filtres.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalogue;
