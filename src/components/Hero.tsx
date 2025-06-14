import AnimatedButton from "@/components/AnimatedButton";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Star, Award, Users, ArrowRight, Sparkles, Play, Quote, Search, ShoppingBag } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background optimisé pour mobile */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-900/90 to-red-900/95"></div>
      </div>
      
      {/* Éléments décoratifs optimisés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-4 w-32 h-32 sm:top-20 sm:left-20 sm:w-72 sm:h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-40 h-40 sm:bottom-20 sm:right-20 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenu principal avec meilleure responsivité mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center min-h-screen">
          
          {/* Colonne gauche - Contenu textuel optimisé mobile */}
          <div className="text-white space-y-4 sm:space-y-8 order-2 lg:order-1">
            <div className="animate-fade-in text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3 sm:mb-6">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold text-xs sm:text-lg tracking-wide">
                  Excellence Littéraire Africaine
                </span>
              </div>
              
              <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block text-white/95">Professeur</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Mahougnon
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Kakpo
                </span>
              </h1>
              
              {/* Tags optimisés mobile */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-3 mt-3 sm:mt-6">
                <span className="px-2 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20">
                  ✍️ Écrivain
                </span>
                <span className="px-2 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20">
                  🎓 Professeur
                </span>
                <span className="px-2 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20">
                  🏛️ Ministre
                </span>
              </div>
            </div>
            
            <div className="animate-fade-in text-center lg:text-left" style={{animationDelay: '0.3s'}}>
              {/* Citation optimisée mobile */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-8">
                <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 mb-2 sm:mb-4 mx-auto lg:mx-0" />
                <p className="text-sm sm:text-lg lg:text-xl text-orange-100 leading-relaxed font-light italic">
                  "La littérature africaine est le miroir de notre âme collective, le gardien de nos traditions et le pont vers l'avenir."
                </p>
                <div className="mt-2 sm:mt-4 text-xs sm:text-base text-orange-200">
                  — Professeur Mahougnon Kakpo
                </div>
              </div>
              
              <p className="text-sm sm:text-lg lg:text-xl text-orange-100 leading-relaxed font-light px-2 lg:px-0">
                Découvrez l'univers fascinant de la littérature africaine contemporaine et explorez les œuvres qui célèbrent la richesse culturelle et spirituelle du Bénin et de l'Afrique.
              </p>
            </div>
            
            {/* Nouveaux boutons repensés et optimisés mobile */}
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col gap-3 sm:gap-4 px-2 lg:px-0">
                <Link to="/catalogue" className="w-full">
                  <button className="group w-full relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold">Explorer Notre Catalogue</div>
                        <div className="text-sm opacity-90">Découvrez nos livres exceptionnels</div>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </Link>
                
                {/* CORRECTION: Lien vers la page About au lieu de Contact */}
                <button
                  onClick={() => {
                    // Scroll vers la section About
                    const aboutSection = document.querySelector('#about-section');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group w-full relative overflow-hidden border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-amber-900 font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-white/25"
                >
                  <div className="relative flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">Découvrir l'Auteur</div>
                      <div className="text-sm opacity-90">Son parcours et ses œuvres</div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>

            {/* Stats optimisées mobile */}
            <div className="animate-fade-in grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-8 px-2 lg:px-0" style={{animationDelay: '0.9s'}}>
              <div className="text-center group">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-orange-200 text-xs leading-tight">Livres<br />Publiés</div>
              </div>
              
              <div className="text-center group">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Award className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-orange-200 text-xs leading-tight">Années<br />d'Enseignement</div>
              </div>
              
              <div className="text-center group">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Users className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-orange-200 text-xs leading-tight">Lecteurs<br />Touchés</div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Carte du profil optimisée mobile */}
          <div className="animate-fade-in order-1 lg:order-2 px-2 lg:px-0" style={{animationDelay: '0.4s'}}>
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Carte principale optimisée mobile */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                <div className="text-center">
                  {/* Avatar optimisé mobile */}
                  <div className="relative mb-4 sm:mb-8">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                      <span className="text-white text-2xl sm:text-5xl font-playfair font-bold">MK</span>
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-10 sm:h-10 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl font-playfair font-bold text-white mb-2">
                    Professeur Mahougnon Kakpo
                  </h3>
                  
                  <p className="text-orange-200 mb-4 sm:mb-8 text-sm sm:text-lg leading-relaxed">
                    Académicien • Écrivain • Ministre • Député
                  </p>
                  
                  {/* Distinctions optimisées mobile */}
                  <div className="space-y-2 sm:space-y-4 text-xs sm:text-sm">
                    <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg p-2 sm:p-4">
                      <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-400" />
                      <span className="text-white font-medium text-center">Chevalier de l'Ordre national du Bénin (2016)</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg p-2 sm:p-4">
                      <Award className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-400" />
                      <span className="text-white font-medium text-center">Président du Comité des rites Vodun (2023)</span>
                    </div>
                  </div>
                  
                  {/* Bouton d'action optimisé mobile - CORRECTION: Scroll vers About */}
                  <div className="mt-4 sm:mt-8">
                    <button
                      onClick={() => {
                        const aboutSection = document.querySelector('#about-section');
                        if (aboutSection) {
                          aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Play className="w-4 h-4 inline mr-2" />
                      Découvrir son parcours
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition optimisée */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-32 bg-gradient-to-t from-amber-50 via-amber-50/80 to-transparent"></div>
      
      {/* Indicateur de scroll optimisé mobile */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;