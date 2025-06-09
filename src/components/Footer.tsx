
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Prof. M. Kakpo
            </h3>
            <p className="font-inter text-gray-300 leading-relaxed">
              Découvrez l'univers littéraire et académique du Professeur Mahougnon Kakpo 
              à travers ses œuvres et publications.
            </p>
          </div>
          
          <div>
            <h4 className="font-inter text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-inter text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="font-inter text-gray-300 hover:text-white transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-inter text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-inter text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 font-inter text-gray-300">
              <p>Email: contact@professeurkakpo.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="font-inter text-gray-400">
            © 2024 Professeur Mahougnon Kakpo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
