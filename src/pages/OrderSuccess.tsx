
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Home, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  useEffect(() => {
    // Clean up any pending order data
    localStorage.removeItem('pendingOrder');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Commande confirmée !
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Merci pour votre commande. Nous avons bien reçu votre demande et nous vous contacterons bientôt pour organiser la livraison.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Package className="w-5 h-5 mr-2" />
                Prochaines étapes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-800">1</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Vérification du paiement</h3>
                  <p className="text-sm text-gray-600">
                    Nous vérifions votre paiement et préparons votre commande.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-yellow-800">2</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Confirmation par téléphone</h3>
                  <p className="text-sm text-gray-600">
                    Nous vous appellerons pour confirmer l'adresse de livraison.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-800">3</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Livraison gratuite</h3>
                  <p className="text-sm text-gray-600">
                    Livraison gratuite dans tout le Bénin sous 2-5 jours ouvrables.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
            
            <Link to="/catalogue">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Continuer les achats
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
            <p className="text-gray-600 mb-4">
              Si vous avez des questions concernant votre commande, n'hésitez pas à nous contacter.
            </p>
            <Link to="/contact">
              <Button variant="outline">Nous contacter</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
