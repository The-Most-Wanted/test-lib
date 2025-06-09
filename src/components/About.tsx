
const About = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              À propos du Professeur
            </h2>
            
            <div className="space-y-4 font-inter text-gray-700 leading-relaxed">
              <p>
                Le Professeur Mahougnon Kakpo est une figure emblématique du monde académique 
                et littéraire. Fort de plusieurs décennies d'expérience dans l'enseignement 
                supérieur et la recherche, il a consacré sa carrière à l'exploration des 
                thématiques culturelles et sociales.
              </p>
              
              <p>
                Ses œuvres, reconnues tant au niveau national qu'international, offrent 
                une perspective unique sur les enjeux contemporains et patrimoniaux. 
                Alliant rigueur académique et accessibilité, ses écrits s'adressent aussi 
                bien aux chercheurs qu'au grand public.
              </p>
              
              <p>
                Aujourd'hui, le Professeur Kakpo continue de partager sa passion pour 
                la connaissance à travers ses publications, conférences et interventions 
                dans le monde académique.
              </p>
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
                <p className="font-inter text-gray-600">
                  Auteur • Académicien • Chercheur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
