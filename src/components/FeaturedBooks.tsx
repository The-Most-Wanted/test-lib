
import { Card, CardContent } from "@/components/ui/card";
import AnimatedButton from "@/components/AnimatedButton";
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
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Livres en vedette
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez une sélection des œuvres les plus appréciées du Professeur Kakpo
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 animate-fade-in bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-blue-200/50 overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg overflow-hidden relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Bestseller
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="font-inter text-gray-600 mb-6 text-sm leading-relaxed">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {book.price}
                  </span>
                  <AnimatedButton variant="outline" size="sm">
                    En savoir plus
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Link to="/catalogue">
            <AnimatedButton variant="primary" size="lg" className="text-lg px-12 py-4">
              Voir tous les livres
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
