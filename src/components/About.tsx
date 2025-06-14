import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Award, Users, Globe, Quote, CheckCircle } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Chevalier de l'Ordre national",
      description: "Distinction reçue en 2016 pour ses contributions exceptionnelles",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Professeur Émérite",
      description: "25+ années d'enseignement à l'Université d'Abomey-Calavi",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Leader Spirituel",
      description: "Président du Comité des rites Vodun depuis 2023",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Homme Politique",
      description: "Ancien ministre et député engagé pour l'éducation",
      color: "from-red-500 to-amber-500"
    }
  ];

  const expertise = [
    "Littérature africaine francophone",
    "Traditions spirituelles du Bénin",
    "Culture et patrimoine vodun",
    "Histoire du royaume du Danxomè",
    "Anthropologie culturelle",
    "Éducation et pédagogie"
  ];

  return (
    <section id="about-section" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50/30 to-red-50/50 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 bg-clip-text text-transparent mb-6">
            Un Parcours d'Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'homme derrière l'œuvre : un parcours exceptionnel au service de la culture, de l'éducation et du patrimoine africain.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Colonne gauche - Texte */}
          <div className="animate-fade-in space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                    Vision et Mission
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Professeur titulaire à l'Université d'Abomey-Calavi depuis 1998, Mahougnon Kakpo est un éminent spécialiste de la littérature africaine francophone et des traditions spirituelles du Bénin.
                    </p>
                    <p>
                      Docteur en littérature française (Bordeaux III, 1996), il dirige plusieurs laboratoires de recherche et a été fait Chevalier de l'Ordre national du Bénin en 2016 pour ses contributions exceptionnelles.
                    </p>
                    <p>
                      Ancien ministre des Enseignements secondaire, technique et de la Formation professionnelle (2017-2021), il œuvre inlassablement pour la promotion du patrimoine culturel béninois.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Domaines d'expertise */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-amber-600" />
                Domaines d'Expertise
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Réalisations */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section statistiques améliorée */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-playfair font-bold mb-4">
                Impact et Reconnaissance
              </h3>
              <p className="text-orange-200 text-lg max-w-2xl mx-auto">
                Des décennies d'engagement au service de l'excellence académique et culturelle
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <BookOpen className="w-10 h-10 text-yellow-400" />
                </div>
                <div className="text-4xl font-bold mb-2 text-yellow-400">29+</div>
                <div className="text-orange-200 text-sm">Ouvrages Publiés</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Award className="w-10 h-10 text-yellow-400" />
                </div>
                <div className="text-4xl font-bold mb-2 text-yellow-400">25+</div>
                <div className="text-orange-200 text-sm">Années d'Enseignement</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Users className="w-10 h-10 text-yellow-400" />
                </div>
                <div className="text-4xl font-bold mb-2 text-yellow-400">1000+</div>
                <div className="text-orange-200 text-sm">Étudiants Formés</div>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Globe className="w-10 h-10 text-yellow-400" />
                </div>
                <div className="text-4xl font-bold mb-2 text-yellow-400">5+</div>
                <div className="text-orange-200 text-sm">Pays d'Influence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;