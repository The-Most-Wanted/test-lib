
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart, Gift } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-blue-500" />
            <h1 className="text-3xl font-playfair font-bold mb-4 text-gray-800">{t('cart')}</h1>
            <p className="text-lg mb-8 text-gray-600">Veuillez vous connecter pour voir votre panier</p>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                {t('login')}
              </Button>
            </Link>
          </div>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Chargement du panier...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-3xl font-playfair font-bold mb-4 text-gray-800">{t('emptyCart')}</h1>
            <p className="text-lg mb-8 text-gray-600">{t('emptyCartMessage')}</p>
            <Link to="/catalogue">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                {t('discoverBooks')}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Header avec breadcrumb */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">{t('home')}</Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">{t('cart')}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-gray-800 mb-2">{t('myCart')}</h1>
              <p className="text-gray-600">{items.length} {items.length === 1 ? 'livre' : 'livres'} dans votre panier</p>
            </div>
            
            <Link to="/catalogue" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mt-4 sm:mt-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <Card key={item.id} className="overflow-hidden bg-white/80 backdrop-blur-md border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Book Image/Icon */}
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                      <div className="text-center">
                        <span className="text-3xl font-playfair font-bold text-blue-800 block">
                          {(language === 'fr' ? item.book.title : item.book.title_en).charAt(0)}
                        </span>
                        <div className="w-8 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 leading-tight mb-1">
                            {language === 'fr' ? item.book.title : item.book.title_en}
                          </h3>
                          <p className="text-sm text-gray-500">Livre numérique</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="font-semibold text-lg px-3 py-1 bg-gray-50 rounded-lg min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.book.stock_quantity}
                            className="h-8 w-8 rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(item.book.price * 1.2)}
                          </p>
                          <p className="text-xl font-bold text-blue-600">
                            {formatPrice(item.book.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-white/80 backdrop-blur-md border-gray-200/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Gift className="w-5 h-5 text-blue-600" />
                    <span>{t('orderSummary')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>{t('subtotal')}:</span>
                      <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>{t('shippingFees')}:</span>
                      <span className="text-green-600 font-medium">{t('free')}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>{t('total')}:</span>
                        <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => navigate('/checkout')}
                    >
                      {t('checkout')}
                    </Button>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{t('freeShipping')}</span>
                    </div>
                  </div>
                  
                  {/* Promotions */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <Gift className="w-4 h-4" />
                      <span className="font-medium text-sm">Offre spéciale</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Livraison gratuite sur toutes les commandes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
