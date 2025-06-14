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
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-2xl rounded-full p-4 transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>

      {/* Modern Search Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 animate-scale-in">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-playfair">
                    Recherche Avancée
                  </h2>
                  <Button
                    onClick={onToggle}
                    variant="ghost"
                    className="rounded-full p-3 hover:bg-white/20 transition-all duration-300"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </Button>
                </div>

                {/* Search Input */}
                <div className="relative mb-8">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-amber-600 h-6 w-6" />
                  <Input
                    placeholder="Rechercher par titre, auteur, genre, année..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-16 pr-16 h-16 text-lg border-3 border-amber-200/50 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg text-gray-800 placeholder:text-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors duration-200"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Genre Littéraire
                    </label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="h-14 border-2 border-amber-200/50 focus:border-amber-500 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                        <Filter className="w-5 h-5 mr-2 text-amber-600" />
                        <SelectValue placeholder="Tous les genres" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border border-amber-200 rounded-xl shadow-2xl">
                        <SelectItem value="all">Tous les genres</SelectItem>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Ordre de tri
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-14 border-2 border-amber-200/50 focus:border-amber-500 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                        <SelectValue placeholder="Titre A-Z" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border border-amber-200 rounded-xl shadow-2xl">
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
                    className="flex-1 h-14 border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-50 rounded-xl transition-all duration-300 text-amber-700 font-semibold"
                  >
                    Effacer les filtres
                  </Button>
                  <Button
                    onClick={onToggle}
                    className="flex-1 h-14 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Appliquer la recherche
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