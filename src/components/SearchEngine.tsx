
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchEngineProps {
  onSearch: (searchTerm: string, filters: SearchFilters) => void;
  categories: string[];
}

interface SearchFilters {
  category: string;
  priceRange: string;
  sortBy: string;
}

const SearchEngine = ({ onSearch, categories }: SearchEngineProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "",
    priceRange: "",
    sortBy: "title"
  });

  const handleSearch = () => {
    onSearch(searchTerm, filters);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      sortBy: "title"
    });
    setSearchTerm("");
    onSearch("", {
      category: "",
      priceRange: "",
      sortBy: "title"
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6 mb-8 animate-fade-in">
      {/* Barre de recherche principale */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Rechercher un livre, un thème, un mot-clé..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-32 h-14 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            className="rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button
            onClick={handleSearch}
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Rechercher
          </Button>
        </div>
      </div>

      {/* Filtres avancés */}
      {showFilters && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filtre par catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtre par prix */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gamme de prix
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Tous les prix</option>
                <option value="0-25">0€ - 25€</option>
                <option value="25-30">25€ - 30€</option>
                <option value="30+">30€ et plus</option>
              </select>
            </div>

            {/* Tri */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="title">Titre A-Z</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="category">Catégorie</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={clearFilters}
              variant="outline"
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
            >
              <X className="h-4 w-4" />
              Effacer les filtres
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
