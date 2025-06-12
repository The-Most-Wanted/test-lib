import AnimatedButton from "@/components/AnimatedButton";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Star, Award, Users, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec dégradé animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90"></div>
      </div>
      
      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Colonne gauche - Texte */}
          <div className="text-white space-y-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-lg">Découvrez l'excellence littéraire</span>
              </div>
              
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">Professeur</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Mahougnon Kakpo
                </span>
              </h1>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                  Écrivain Renommé
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                  Professeur Émérite
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                  Homme Politique
                </span>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed font-light">
                Plongez dans l'univers fascinant de la littérature africaine et découvrez les œuvres exceptionnelles qui explorent la richesse culturelle et spirituelle du Bénin.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalogue">
                  <AnimatedButton variant="secondary" size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-2xl">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explorer le Catalogue
                  </AnimatedButton>
                </Link>
                
                <Link to="/contact">
                  <AnimatedButton variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    En Savoir Plus
                  </AnimatedButton>
                </Link>
              </div>
            </div>

            {/* Stats améliorées */}
            <div className="animate-fade-in grid grid-cols-3 gap-6 pt-8" style={{animationDelay: '0.9s'}}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-blue-200 text-sm">Livres Publiés</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-blue-200 text-sm">Années d'Enseignement</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-blue-200 text-sm">Lecteurs Touchés</div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Image/Carte */}
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              {/* Carte principale */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <span className="text-white text-5xl font-playfair font-bold">MK</span>
                  </div>
                  
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                    Professeur Mahougnon Kakpo
                  </h3>
                  
                  <p className="text-blue-200 mb-6 text-lg">
                    Académicien • Écrivain • Ministre • Député
                  </p>
                  
                  {/* Distinctions */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg p-3">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">Chevalier de l'Ordre national du Bénin (2016)</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg p-3">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">Président du Comité des rites Vodun (2023)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  );
};

export default Hero;