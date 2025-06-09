
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "Réflexions sur l'éducation moderne",
      price: "25€",
      description: "Une analyse approfondie des défis contemporains de l'éducation",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570"
    },
    {
      id: 2,
      title: "Culture et société",
      price: "30€",
      description: "Exploration des liens entre patrimoine culturel et évolution sociale",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: 3,
      title: "Les enjeux de la recherche",
      price: "28€",
      description: "Guide méthodologique pour les jeunes chercheurs",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Livres en vedette
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez une sélection des œuvres les plus appréciées du Professeur Kakpo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
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
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="font-inter text-gray-600 mb-4 text-sm">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-2xl font-bold text-blue-600">
                    {book.price}
                  </span>
                  <Button variant="outline" size="sm" className="hover:bg-blue-600 hover:text-white transition-colors">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
            <Link to="/catalogue">
              Voir tous les livres
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
