
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { Book } from "@/data/books";

interface SearchEngineProps {
  books: Book[];
  onFilteredBooks: (books: Book[]) => void;
}

const SearchEngine = ({ books, onFilteredBooks }: SearchEngineProps) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");

  const genres = [...new Set(books.map(book => language === 'fr' ? book.genre : book.genreEn))];

  const filterAndSortBooks = (term: string, genre: string, sort: string) => {
    let filtered = books.filter(book => {
      const title = language === 'fr' ? book.title : book.titleEn;
      const bookGenre = language === 'fr' ? book.genre : book.genreEn;
      const description = language === 'fr' ? book.description : book.descriptionEn;
      
      const matchesSearch = term === "" || 
        title.toLowerCase().includes(term.toLowerCase()) ||
        book.year.toString().includes(term) ||
        description.toLowerCase().includes(term.toLowerCase());
      
      const matchesGenre = genre === "all" || bookGenre === genre;
      
      return matchesSearch && matchesGenre;
    });

    // Sort books
    filtered.sort((a, b) => {
      const aTitle = language === 'fr' ? a.title : a.titleEn;
      const bTitle = language === 'fr' ? b.title : b.titleEn;
      
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

    onFilteredBooks(filtered);
  };

  const handleSearch = () => {
    filterAndSortBooks(searchTerm, selectedGenre, sortBy);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSortBy("title-asc");
    onFilteredBooks(books);
  };

  // Auto-search when filters change
  const handleFilterChange = (newGenre?: string, newSort?: string) => {
    const genre = newGenre ?? selectedGenre;
    const sort = newSort ?? sortBy;
    
    if (newGenre !== undefined) setSelectedGenre(newGenre);
    if (newSort !== undefined) setSortBy(newSort);
    
    filterAndSortBooks(searchTerm, genre, sort);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                filterAndSortBooks("", selectedGenre, sortBy);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Genre Filter */}
        <Select value={selectedGenre} onValueChange={(value) => handleFilterChange(value, undefined)}>
          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
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

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value) => handleFilterChange(undefined, value)}>
          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
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

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <Button 
          onClick={handleSearch}
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <Search className="w-4 h-4 mr-2" />
          {t('searchButton')}
        </Button>
        <Button 
          onClick={handleClear}
          variant="outline"
          className="px-6 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors"
        >
          {t('clearFilters')}
        </Button>
      </div>
    </div>
  );
};

export default SearchEngine;
