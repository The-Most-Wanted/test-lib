
import AnimatedButton from "@/components/AnimatedButton";
import FloatingElements from "@/components/FloatingElements";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      <FloatingElements />
      
      {/* Background Pattern avec parallax */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center bg-no-repeat opacity-15 transform scale-110 animate-pulse"></div>
      
      {/* Gradient overlay animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-purple-900/90"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight transform hover:scale-105 transition-transform duration-300">
            {t('heroTitle')}
          </h1>
        </div>
        
        <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <p className="font-inter text-xl sm:text-2xl lg:text-3xl mb-4 text-blue-100 max-w-4xl mx-auto leading-relaxed font-semibold">
            {t('heroSubtitle')}
          </p>
          <p className="font-inter text-lg sm:text-xl mb-10 text-blue-200 max-w-4xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Link to="/catalogue">
            <AnimatedButton variant="secondary" size="lg" className="text-lg px-10 py-4">
              {t('exploreCatalogue')}
            </AnimatedButton>
          </Link>
          
          <Link to="/contact">
            <AnimatedButton variant="outline" size="lg" className="text-lg px-10 py-4 border-white text-white hover:bg-white hover:text-gray-900">
              {t('contactUs')}
            </AnimatedButton>
          </Link>
        </div>

        {/* Stats animées */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: '0.9s'}}>
          {[
            { number: "15+", label: t('booksPublished') },
            { number: "25+", label: t('yearsTeaching') },
            { number: "1000+", label: t('readersReached') }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:bg-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  );
};

export default Hero;
