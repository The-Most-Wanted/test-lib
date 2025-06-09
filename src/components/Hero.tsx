
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center bg-no-repeat opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Professeur
          <span className="block text-yellow-400">Mahougnon Kakpo</span>
        </h1>
        
        <p className="font-inter text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Académicien, auteur et penseur reconnu. Découvrez une collection d'œuvres littéraires 
          qui explorent les profondeurs de la culture et de la connaissance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
            <Link to="/catalogue">
              Découvrir les livres
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full transition-all duration-300">
            <Link to="/contact">
              Nous contacter
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
