
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CreditCard, Smartphone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bénin'
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    // Load existing customer data if available
    loadCustomerData();
  }, [user, items, navigate]);

  const loadCustomerData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setCustomerData({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        email: data.email || user.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        postalCode: data.postal_code || '',
        country: data.country || 'Bénin'
      });
    } else {
      setCustomerData(prev => ({
        ...prev,
        email: user.email || ''
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const missing = required.filter(field => !customerData[field as keyof typeof customerData]);
    
    if (missing.length > 0) {
      toast.error(`Veuillez remplir tous les champs obligatoires`);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Create or update customer
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user!.id)
        .single();

      let customerId;
      if (existingCustomer) {
        const { data } = await supabase
          .from('customers')
          .update({
            first_name: customerData.firstName,
            last_name: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            city: customerData.city,
            postal_code: customerData.postalCode,
            country: customerData.country,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user!.id)
          .select('id')
          .single();
        customerId = data?.id;
      } else {
        const { data } = await supabase
          .from('customers')
          .insert({
            user_id: user!.id,
            email: customerData.email,
            first_name: customerData.firstName,
            last_name: customerData.lastName,
            phone: customerData.phone,
            address: customerData.address,
            city: customerData.city,
            postal_code: customerData.postalCode,
            country: customerData.country
          })
          .select('id')
          .single();
        customerId = data?.id;
      }

      // Create order
      const { data: order } = await supabase
        .from('orders')
        .insert({
          customer_id: customerId,
          total_amount: getTotalPrice(),
          shipping_address: customerData.address,
          shipping_city: customerData.city,
          shipping_postal_code: customerData.postalCode,
          shipping_country: customerData.country,
          payment_method: paymentMethod,
          notes: notes || null
        })
        .select('id, order_number')
        .single();

      if (!order) throw new Error('Erreur lors de la création de la commande');

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        book_id: item.book_id,
        quantity: item.quantity,
        unit_price: item.book.price,
        total_price: item.book.price * item.quantity
      }));

      await supabase.from('order_items').insert(orderItems);

      // Handle payment based on method
      if (paymentMethod === 'stripe') {
        // TODO: Integrate Stripe here
        toast.info('Redirection vers Stripe...');
        // For now, simulate success
        await new Promise(resolve => setTimeout(resolve, 2000));
        await finalizeOrder(order.id);
      } else {
        // For mobile money options, show payment instructions
        localStorage.setItem('pendingOrder', JSON.stringify({
          orderId: order.id,
          orderNumber: order.order_number,
          amount: getTotalPrice(),
          paymentMethod
        }));
        navigate('/payment-instructions');
      }

    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error('Erreur lors de la finalisation de la commande');
    } finally {
      setLoading(false);
    }
  };

  const finalizeOrder = async (orderId: string) => {
    await supabase
      .from('orders')
      .update({ 
        status: 'confirmed',
        payment_status: 'paid'
      })
      .eq('id', orderId);

    await clearCart();
    toast.success('Commande confirmée avec succès !');
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Link>
        </div>

        <h1 className="text-4xl font-playfair font-bold mb-8 text-center">Finaliser la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Informations de livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={customerData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={customerData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+229 XX XX XX XX"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    value={customerData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={customerData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      value={customerData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={customerData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Mode de paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <label htmlFor="stripe" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Carte bancaire (Stripe)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="mtn" id="mtn" />
                    <label htmlFor="mtn" className="flex items-center cursor-pointer">
                      <Smartphone className="w-4 h-4 mr-2" />
                      MTN Mobile Money
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="moov" id="moov" />
                    <label htmlFor="moov" className="flex items-center cursor-pointer">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Moov Money
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="celtiis" id="celtiis" />
                    <label htmlFor="celtiis" className="flex items-center cursor-pointer">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Celtiis Cash
                    </label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes (optionnel)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Instructions spéciales pour la livraison..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-semibold">{item.book.title}</p>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(item.book.price * item.quantity)}
                    </p>
                  </div>
                ))}
                
                <div className="space-y-2 pt-4">
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
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-6"
                >
                  {loading ? 'Traitement...' : 'Confirmer la commande'}
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

export default Checkout;
