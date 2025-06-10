
import { useLanguage } from "@/hooks/useLanguage";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t('aboutTitle')}
            </h2>
            
            <div className="space-y-4 font-inter text-gray-700 leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p>{t('aboutP3')}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">25+</div>
                <div className="text-sm text-gray-600">Années d'enseignement</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Ouvrages publiés</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-4xl font-playfair font-bold">MK</span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Professeur Mahougnon Kakpo
                </h3>
                <p className="font-inter text-gray-600 mb-2">
                  Académicien • Écrivain • Ministre • Député
                </p>
                <div className="text-sm text-gray-500">
                  <p>Chevalier de l'Ordre national du Bénin (2016)</p>
                  <p>Président du Comité des rites Vodun (2023)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
