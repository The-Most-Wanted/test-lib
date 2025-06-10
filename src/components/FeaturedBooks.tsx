
import { Card, CardContent } from "@/components/ui/card";
import AnimatedButton from "@/components/AnimatedButton";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const FeaturedBooks = () => {
  const { t, language } = useLanguage();

  const featuredBooks = [
    {
      id: 1,
      title: "Le Fá expliqué aux profanes",
      titleEn: "Fa Explained to the Uninitiated",
      year: 2021,
      description: "Une exploration accessible du système divinatoire Fá, patrimoine spirituel du Bénin.",
      descriptionEn: "An accessible exploration of the Fa divination system, spiritual heritage of Benin.",
      genre: "Essai",
      genreEn: "Essay"
    },
    {
      id: 2,
      title: "L'Iroko : l'arbre de vie dans la mystique Vodun",
      titleEn: "The Iroko: Tree of Life in Vodun Mysticism",
      year: 2017,
      description: "Étude approfondie de l'arbre Iroko dans la cosmogonie vodun et son importance spirituelle.",
      descriptionEn: "In-depth study of the Iroko tree in vodun cosmogony and its spiritual importance.",
      genre: "Essai",
      genreEn: "Essay"
    },
    {
      id: 3,
      title: "Les épouses de Fa : récits de la parole sacrée du Bénin",
      titleEn: "The Wives of Fa: Tales of Sacred Words from Benin",
      year: 2007,
      description: "Recueil de récits traditionnels puisés dans la sagesse du Fá.",
      descriptionEn: "Collection of traditional tales drawn from Fa wisdom.",
      genre: "Récits",
      genreEn: "Narratives"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t('featuredBooksTitle')}
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('featuredBooksSubtitle')}
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
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-3xl font-playfair font-bold">
                        {(language === 'fr' ? book.title : book.titleEn).charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-blue-800 font-playfair font-bold text-lg leading-tight px-2">
                      {language === 'fr' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {book.year}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {language === 'fr' ? book.genre : book.genreEn}
                  </span>
                </div>
                <p className="font-inter text-gray-600 mb-6 text-sm leading-relaxed">
                  {language === 'fr' ? book.description : book.descriptionEn}
                </p>
                <div className="flex items-center justify-center">
                  <AnimatedButton variant="outline" size="sm">
                    {t('learnMore')}
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Link to="/catalogue">
            <AnimatedButton variant="primary" size="lg" className="text-lg px-12 py-4">
              {t('viewAllBooks')}
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
