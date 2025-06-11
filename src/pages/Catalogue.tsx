
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Calendar, Search, Filter, Sparkles, Eye, Building } from "lucide-react";

interface Book {
  id: number;
  title: string;
  title_en: string;
  year: number;
  publisher: string;
  publisher_en: string;
  genre: string;
  genre_en: string;
  description: string;
  description_en: string;
  price: number;
  stock_quantity: number;
  featured?: boolean;
}

const Catalogue = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading books:', error);
      } else {
        console.log('Loaded books:', data);
        setAllBooks(data || []);
        setFilteredBooks(data || []);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const genres = [...new Set(allBooks.map(book => language === 'fr' ? book.genre : book.genre_en))];

  const filterAndSortBooks = (term: string, genre: string, sort: string) => {
    let filtered = allBooks.filter(book => {
      const title = language === 'fr' ? book.title : book.title_en;
      const bookGenre = language === 'fr' ? book.genre : book.genre_en;
      const description = language === 'fr' ? book.description : book.description_en;
      
      const matchesSearch = term === "" || 
        title.toLowerCase().includes(term.toLowerCase()) ||
        book.year.toString().includes(term) ||
        description.toLowerCase().includes(term.toLowerCase());
      
      const matchesGenre = genre === "all" || bookGenre === genre;
      
      return matchesSearch && matchesGenre;
    });

    filtered.sort((a, b) => {
      const aTitle = language === 'fr' ? a.title : a.title_en;
      const bTitle = language === 'fr' ? b.title : b.title_en;
      
      switch (sort) {
        case "title-asc":
          return aTitle.localeCompare(bTitle);
        case "title-desc":
          return bTitle.localeCompare(aTitle);
        case "year-asc":
          return a.year - b.year;
        case "year-desc":
          return b.year - a.year;
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterAndSortBooks(term, selectedGenre, sortBy);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    filterAndSortBooks(searchTerm, genre, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterAndSortBooks(searchTerm, selectedGenre, sort);
  };

  const handleViewBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter relative overflow-hidden">
        <FloatingElements />
        <Navigation />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xl text-gray-600">Chargement des livres...</p>
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
      <div className="relative z-10 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{t('catalogue')}</span>
            </div>
            <h1 className="font-playfair text-5xl sm:text-6xl font-bold mb-6">
              {t('catalogue')}
            </h1>
            <p className="font-inter text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('catalogueDescription')}
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{allBooks.length}</div>
                <div className="text-blue-200">{t('totalBooks')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{genres.length}</div>
                <div className="text-blue-200">{t('genres')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">25+</div>
                <div className="text-blue-200">{t('yearsTeaching')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Search Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-12 border border-white/20 animate-fade-in">
          <div className="flex items-center mb-6">
            <Search className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="font-playfair text-2xl font-bold text-gray-900">{t('searchAndFilter')}</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <Select value={selectedGenre} onValueChange={handleGenreChange}>
                <SelectTrigger className="h-14 pl-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg">
                  <SelectValue placeholder={t('filterByGenre')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allGenres')}</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg">
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">{t('titleAsc')}</SelectItem>
                <SelectItem value="title-desc">{t('titleDesc')}</SelectItem>
                <SelectItem value="year-asc">{t('yearAsc')}</SelectItem>
                <SelectItem value="year-desc">{t('yearDesc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Summary */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-blue-600">{filteredBooks.length}</span> {t('booksFound')}
            </p>
            {(searchTerm || selectedGenre !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("all");
                  setSortBy("title-asc");
                  setFilteredBooks(allBooks);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {t('clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-blue-200/50 overflow-hidden animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleViewBook(book.id)}
            >
              <CardHeader className="pb-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
                        <span className="text-white text-2xl font-playfair font-bold">
                          {(language === 'fr' ? book.title : book.title_en).charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-blue-800 font-playfair font-bold text-lg leading-tight px-2">
                        {language === 'fr' ? book.title : book.title_en}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    {book.year}
                  </div>
                </div>
                
                <CardTitle className="font-playfair text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {language === 'fr' ? book.title : book.title_en}
                </CardTitle>
                
                <CardDescription className="font-inter text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {book.year} • {language === 'fr' ? book.genre : book.genre_en}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <p className="font-inter text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {language === 'fr' ? book.description : book.description_en}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-inter">
                    <Building className="w-4 h-4" />
                    {language === 'fr' ? book.publisher : book.publisher_en}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {formatPrice(book.price)}
                  </div>
                </div>

                {book.stock_quantity <= 5 && book.stock_quantity > 0 && (
                  <p className="text-orange-600 text-xs font-medium">
                    Plus que {book.stock_quantity} en stock !
                  </p>
                )}
                
                {book.stock_quantity <= 0 && (
                  <p className="text-red-600 text-xs font-semibold">
                    Rupture de stock
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="pt-4 flex justify-center">
                <button
                  className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewBook(book.id);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>{t('learnMore')}</span>
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </div>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Books Found */}
        {filteredBooks.length === 0 && !loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-gray-300 text-8xl mb-6">📚</div>
            <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {t('noBooksFound')}
            </h3>
            <p className="font-inter text-xl text-gray-600 mb-8">
              {t('tryDifferentSearch')}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("all");
                setSortBy("title-asc");
                setFilteredBooks(allBooks);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('showAllBooks')}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white animate-fade-in shadow-2xl">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="font-playfair text-3xl font-bold mb-4">
            {t('interestedInBooks')}
          </h2>
          <p className="font-inter text-lg mb-8 opacity-90">
            {t('contactForMoreInfo')}
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {t('contactUs')}
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalogue;
