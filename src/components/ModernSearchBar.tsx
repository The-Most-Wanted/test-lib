
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

interface ModernSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  genres: string[];
  isVisible: boolean;
  onToggle: () => void;
}

const ModernSearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres,
  isVisible,
  onToggle
}: ModernSearchBarProps) => {
  const { t } = useLanguage();

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSortBy("title");
  };

  return (
    <>
      {/* Search Toggle Button */}
      <div className="fixed top-20 right-6 z-50">
        <Button
          onClick={onToggle}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl rounded-full p-3 transition-all duration-300 transform hover:scale-110"
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>

      {/* Modern Search Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 animate-scale-in">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Recherche avancée
                  </h2>
                  <Button
                    onClick={onToggle}
                    variant="ghost"
                    className="rounded-full p-2 hover:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </Button>
                </div>

                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    placeholder="Rechercher par titre, auteur, genre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-12 h-16 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-2xl bg-white/90 backdrop-blur-sm transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genre
                    </label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/90">
                        <Filter className="w-4 h-4 mr-2 text-gray-500" />
                        <SelectValue placeholder="Tous les genres" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md">
                        <SelectItem value="all">Tous les genres</SelectItem>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trier par
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/90">
                        <SelectValue placeholder="Titre A-Z" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md">
                        <SelectItem value="title">Titre A-Z</SelectItem>
                        <SelectItem value="price_asc">Prix croissant</SelectItem>
                        <SelectItem value="price_desc">Prix décroissant</SelectItem>
                        <SelectItem value="year">Année de publication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300"
                  >
                    Effacer les filtres
                  </Button>
                  <Button
                    onClick={onToggle}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernSearchBar;
