
import AnimatedButton from "@/components/AnimatedButton";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Star, Award, Users, ArrowRight, Sparkles, Play, Quote } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background amélioré avec plus de profondeur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-indigo-900/90 to-purple-900/95"></div>
        {/* Nouveau effet de grille subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      {/* Éléments décoratifs améliorés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Nouvelles particules flottantes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + i * 8}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal avec meilleure responsivité */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          
          {/* Colonne gauche - Contenu textuel amélioré */}
          <div className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold text-sm sm:text-lg tracking-wide">
                  Excellence Littéraire Africaine
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block text-white/95">Professeur</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
                  Mahougnon
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Kakpo
                </span>
              </h1>
              
              {/* Tags améliorés avec meilleure responsivité */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                  ✍️ Écrivain Renommé
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                  🎓 Professeur Émérite
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                  🏛️ Homme Politique
                </span>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              {/* Citation inspirante */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed font-light italic">
                  "La littérature africaine est le miroir de notre âme collective, le gardien de nos traditions et le pont vers l'avenir."
                </p>
                <div className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-200">
                  — Professeur Mahougnon Kakpo
                </div>
              </div>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed font-light">
                Découvrez l'univers fascinant de la littérature africaine contemporaine et explorez les œuvres qui célèbrent la richesse culturelle et spirituelle du Bénin et de l'Afrique.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/catalogue" className="flex-1 sm:flex-none">
                  <AnimatedButton 
                    variant="secondary" 
                    size="lg" 
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Explorer les Livres
                  </AnimatedButton>
                </Link>
                
                <Link to="/contact" className="flex-1 sm:flex-none">
                  <AnimatedButton 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    En Savoir Plus
                  </AnimatedButton>
                </Link>
              </div>
            </div>

            {/* Stats redesignées avec meilleure responsivité */}
            <div className="animate-fade-in grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8" style={{animationDelay: '0.9s'}}>
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-blue-200 text-xs sm:text-sm leading-tight">Livres<br className="sm:hidden" /> Publiés</div>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Award className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-blue-200 text-xs sm:text-sm leading-tight">Années<br className="sm:hidden" /> d'Enseignement</div>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Users className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-blue-200 text-xs sm:text-sm leading-tight">Lecteurs<br className="sm:hidden" /> Touchés</div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Carte du profil redesignée */}
          <div className="animate-fade-in order-1 lg:order-2" style={{animationDelay: '0.4s'}}>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Carte principale avec design moderne */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="text-center">
                  {/* Avatar amélioré */}
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                      <span className="text-white text-3xl sm:text-5xl font-playfair font-bold">MK</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-2 sm:mb-3">
                    Professeur Mahougnon Kakpo
                  </h3>
                  
                  <p className="text-blue-200 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                    Académicien • Écrivain • Ministre • Député
                  </p>
                  
                  {/* Distinctions avec design amélioré */}
                  <div className="space-y-3 sm:space-y-4 text-sm">
                    <div className="flex items-center justify-center space-x-3 bg-white/5 rounded-xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 group">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                      <span className="text-white text-xs sm:text-sm font-medium">Chevalier de l'Ordre national du Bénin (2016)</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 bg-white/5 rounded-xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 group">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                      <span className="text-white text-xs sm:text-sm font-medium">Président du Comité des rites Vodun (2023)</span>
                    </div>
                  </div>
                  
                  {/* Nouveau bouton d'action */}
                  <div className="mt-6 sm:mt-8">
                    <Link to="/contact">
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        <Play className="w-4 h-4 inline mr-2" />
                        Découvrir son parcours
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Éléments décoratifs améliorés */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition améliorée vers la section suivante */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      
      {/* Indicateur de scroll */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
