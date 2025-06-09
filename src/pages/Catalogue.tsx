
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Catalogue = () => {
  const books = [
    {
      id: 1,
      title: "Réflexions sur l'éducation moderne",
      author: "Professeur Mahougnon Kakpo",
      price: "25€",
      description: "Une analyse approfondie des défis contemporains de l'éducation et des méthodes pédagogiques innovantes.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
      category: "Éducation"
    },
    {
      id: 2,
      title: "Culture et société",
      author: "Professeur Mahougnon Kakpo",
      price: "30€",
      description: "Exploration des liens entre patrimoine culturel et évolution sociale dans le monde contemporain.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      category: "Sociologie"
    },
    {
      id: 3,
      title: "Les enjeux de la recherche",
      author: "Professeur Mahougnon Kakpo",
      price: "28€",
      description: "Guide méthodologique pour les jeunes chercheurs et introduction aux pratiques de recherche académique.",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      category: "Recherche"
    },
    {
      id: 4,
      title: "Philosophie et modernité",
      author: "Professeur Mahougnon Kakpo",
      price: "32€",
      description: "Réflexions philosophiques sur les enjeux de la modernité et l'évolution de la pensée humaine.",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
      category: "Philosophie"
    },
    {
      id: 5,
      title: "L'art de l'enseignement",
      author: "Professeur Mahougnon Kakpo",
      price: "26€",
      description: "Méthodes et techniques pour un enseignement efficace et inspirant dans l'enseignement supérieur.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
      category: "Pédagogie"
    },
    {
      id: 6,
      title: "Tradition et innovation",
      author: "Professeur Mahougnon Kakpo",
      price: "29€",
      description: "Comment concilier respect des traditions et nécessité d'innovation dans nos sociétés modernes.",
      image: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2",
      category: "Culture"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4">
            Catalogue des œuvres
          </h1>
          <p className="font-inter text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez la collection complète des livres du Professeur Mahougnon Kakpo
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <Card 
                key={book.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {book.category}
                    </span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-500 mb-3">
                    par {book.author}
                  </p>
                  <p className="font-inter text-gray-600 mb-4 text-sm leading-relaxed">
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-2xl font-bold text-blue-600">
                      {book.price}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Commander
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;
