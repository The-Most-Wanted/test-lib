
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchEngine from "@/components/SearchEngine";
import AnimatedButton from "@/components/AnimatedButton";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";

const Catalogue = () => {
  const books = [
    {
      id: 1,
      title: "Réflexions sur l'éducation moderne",
      author: "Professeur Mahougnon Kakpo",
      price: 25,
      description: "Une analyse approfondie des défis contemporains de l'éducation et des méthodes pédagogiques innovantes.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
      category: "Éducation"
    },
    {
      id: 2,
      title: "Culture et société",
      author: "Professeur Mahougnon Kakpo",
      price: 30,
      description: "Exploration des liens entre patrimoine culturel et évolution sociale dans le monde contemporain.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      category: "Sociologie"
    },
    {
      id: 3,
      title: "Les enjeux de la recherche",
      author: "Professeur Mahougnon Kakpo",
      price: 28,
      description: "Guide méthodologique pour les jeunes chercheurs et introduction aux pratiques de recherche académique.",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      category: "Recherche"
    },
    {
      id: 4,
      title: "Philosophie et modernité",
      author: "Professeur Mahougnon Kakpo",
      price: 32,
      description: "Réflexions philosophiques sur les enjeux de la modernité et l'évolution de la pensée humaine.",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
      category: "Philosophie"
    },
    {
      id: 5,
      title: "L'art de l'enseignement",
      author: "Professeur Mahougnon Kakpo",
      price: 26,
      description: "Méthodes et techniques pour un enseignement efficace et inspirant dans l'enseignement supérieur.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
      category: "Pédagogie"
    },
    {
      id: 6,
      title: "Tradition et innovation",
      author: "Professeur Mahougnon Kakpo",
      price: 29,
      description: "Comment concilier respect des traditions et nécessité d'innovation dans nos sociétés modernes.",
      image: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2",
      category: "Culture"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    sortBy: "title"
  });

  const categories = [...new Set(books.map(book => book.category))];

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || book.category === filters.category;
      
      const matchesPrice = !filters.priceRange || (() => {
        const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
        if (filters.priceRange.includes('+')) {
          return book.price >= parseInt(min);
        }
        return book.price >= parseInt(min) && book.price <= parseInt(max);
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [books, searchTerm, filters]);

  const handleSearch = (term: string, newFilters: any) => {
    setSearchTerm(term);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative">
      <FloatingElements />
      <Navigation />
      
      {/* Header avec animation */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold mb-6 animate-fade-in transform hover:scale-105 transition-transform duration-300">
            Catalogue des œuvres
          </h1>
          <p className="font-inter text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Découvrez la collection complète des livres du Professeur Mahougnon Kakpo
          </p>
          <div className="mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <span className="text-lg font-semibold">{filteredAndSortedBooks.length} livre(s) disponible(s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Moteur de recherche */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <SearchEngine 
          onSearch={handleSearch}
          categories={categories}
        />
      </div>

      {/* Grille des livres */}
      <div className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedBooks.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
                  Aucun livre trouvé
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier vos critères de recherche ou vos filtres.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedBooks.map((book, index) => (
                <Card 
                  key={book.id} 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-fade-in bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-blue-200/50 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg overflow-hidden relative">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        {book.category}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 mb-3">
                      par {book.author}
                    </p>
                    <p className="font-inter text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {book.price}€
                      </span>
                      <AnimatedButton variant="primary" size="sm">
                        Commander
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;
