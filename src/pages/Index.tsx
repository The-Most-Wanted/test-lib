import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('Index page loaded successfully');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 font-inter overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Professor Presentation Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 via-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-800 mb-6">
              Rencontrez le Professeur
              <span className="block text-3xl lg:text-4xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mt-2">
                Mahougnon KAKPO
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Éminent spécialiste des traditions africaines, de la philosophie du Vodun et de la littérature francophone d'Afrique
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="/lovable-uploads/60cb850e-9094-432b-8cf6-f1a1c73d42a7.png" 
                alt="Professeur Mahougnon KAKPO"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">Portrait officiel</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="/lovable-uploads/89ce6b28-f3dd-4ced-863b-46873adaa7be.png" 
                alt="Professeur Mahougnon KAKPO en conférence"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">En conférence</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="/lovable-uploads/bcc43420-7f82-42e3-9540-49b3391b9738.png" 
                alt="Professeur Mahougnon KAKPO en tenue traditionnelle"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">Tenue traditionnelle</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="/lovable-uploads/dc908365-fa97-4028-8547-da4f7554a11d.png" 
                alt="Professeur Mahougnon KAKPO en visite culturelle"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">Visite culturelle</p>
              </div>
            </div>
          </div>

          {/* Professor Bio */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Le Professeur Mahougnon KAKPO est une figure emblématique de la recherche africaine contemporaine. 
                Spécialiste reconnu de la philosophie du Vodun et des traditions orales africaines, il a consacré sa carrière 
                à l'étude et à la valorisation du patrimoine culturel africain.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Auteur de plus de 29 ouvrages, ses travaux constituent une référence incontournable pour comprendre 
                les systèmes de pensée africains traditionnels et leur pertinence dans le monde contemporain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
      
      {/* Featured Books Section */}
      <FeaturedBooks />
      
      <Footer />
    </div>
  );
};

export default Index;