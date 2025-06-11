
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, loading } = useCart();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-playfair font-bold mb-6">Panier</h1>
          <p className="text-xl mb-8">Veuillez vous connecter pour voir votre panier</p>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Se connecter
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Chargement du panier...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h1 className="text-4xl font-playfair font-bold mb-6">Panier vide</h1>
          <p className="text-xl mb-8 text-gray-600">Votre panier est actuellement vide</p>
          <Link to="/catalogue">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Découvrir nos livres
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/catalogue" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuer les achats
          </Link>
        </div>

        <h1 className="text-4xl font-playfair font-bold mb-8 text-center">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-playfair font-bold text-blue-800">
                        {(language === 'fr' ? item.book.title : item.book.title_en).charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {language === 'fr' ? item.book.title : item.book.title_en}
                      </h3>
                      <p className="text-lg font-bold text-blue-600 mb-3">
                        {formatPrice(item.book.price)}
                      </p>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="font-semibold text-lg px-3">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.book.stock_quantity}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {formatPrice(item.book.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Sous-total:</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span>Frais de livraison:</span>
                  <span className="text-green-600">Gratuit</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-6"
                  onClick={() => navigate('/checkout')}
                >
                  Finaliser la commande
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  Livraison gratuite dans tout le Bénin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
