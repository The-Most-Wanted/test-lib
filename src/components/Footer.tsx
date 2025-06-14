import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="animate-fade-in">
            <h3 className="font-playfair text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h3>
            <p className="font-inter text-orange-300 leading-relaxed mb-6">
              {t('footerDescription')}
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="text-yellow-400 font-semibold mb-2">{t('achievements')}</p>
              <ul className="text-sm text-orange-300 space-y-1">
                <li>• {t('knightOrder')}</li>
                <li>• {t('professorTitle')}</li>
                <li>• {t('ministerEducation')}</li>
                <li>• {t('vodunCommittee')}</li>
              </ul>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-inter text-xl font-semibold mb-6 text-yellow-400">{t('navigation')}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="font-inter text-orange-300 hover:text-yellow-400 transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="font-inter text-orange-300 hover:text-yellow-400 transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('catalogue')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-inter text-orange-300 hover:text-yellow-400 transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-inter text-xl font-semibold mb-6 text-yellow-400">{t('contactInfo')}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 font-inter text-orange-300 hover:text-yellow-400 transition-colors">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>mkakpo2012@yahoo.fr</span>
              </div>
              <div className="flex items-center space-x-3 font-inter text-orange-300 hover:text-yellow-400 transition-colors">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>+229 01 97 26 54 70</span>
              </div>
              <div className="flex items-start space-x-3 font-inter text-orange-300 hover:text-yellow-400 transition-colors">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <span>Bénin, Godomey Fignonhou</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg border border-yellow-400/30">
              <p className="text-sm text-orange-300 italic">
                "{t('footerQuote')}"
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-orange-700/50 mt-12 pt-8 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="font-inter text-orange-400">
            © 2024 {t('heroTitle')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;