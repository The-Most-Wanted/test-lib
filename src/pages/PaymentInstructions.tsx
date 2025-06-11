
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Copy, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const PaymentInstructions = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('pendingOrder');
    if (!data) {
      navigate('/');
      return;
    }
    setOrderData(JSON.parse(data));
  }, [navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papiers');
  };

  const getPaymentInstructions = () => {
    if (!orderData) return null;

    const instructions = {
      mtn: {
        title: 'MTN Mobile Money',
        icon: <Smartphone className="w-6 h-6" />,
        steps: [
          'Composez *134#',
          'Choisissez l\'option "Transfert d\'argent"',
          'Sélectionnez "Vers un marchand"',
          'Entrez le numéro marchand : 123456',
          `Entrez le montant : ${orderData.amount}`,
          `Référence : ${orderData.orderNumber}`,
          'Confirmez avec votre code PIN'
        ],
        phone: '+229 XX XX XX XX'
      },
      moov: {
        title: 'Moov Money',
        icon: <Smartphone className="w-6 h-6" />,
        steps: [
          'Composez *555#',
          'Choisissez "Paiement marchand"',
          'Entrez le code marchand : 654321',
          `Entrez le montant : ${orderData.amount}`,
          `Référence : ${orderData.orderNumber}`,
          'Confirmez avec votre code PIN'
        ],
        phone: '+229 YY YY YY YY'
      },
      celtiis: {
        title: 'Celtiis Cash',
        icon: <Smartphone className="w-6 h-6" />,
        steps: [
          'Composez *999#',
          'Choisissez "Paiement"',
          'Sélectionnez "Paiement marchand"',
          'Entrez le code marchand : 789123',
          `Entrez le montant : ${orderData.amount}`,
          `Référence : ${orderData.orderNumber}`,
          'Confirmez avec votre code PIN'
        ],
        phone: '+229 ZZ ZZ ZZ ZZ'
      }
    };

    return instructions[orderData.paymentMethod as keyof typeof instructions];
  };

  const handlePaymentCompleted = () => {
    localStorage.removeItem('pendingOrder');
    navigate('/order-success');
  };

  if (!orderData) return null;

  const paymentInfo = getPaymentInstructions();
  if (!paymentInfo) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold mb-8 text-center">
            Instructions de paiement
          </h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Commande créée avec succès
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Numéro de commande :</strong> {orderData.orderNumber}</p>
                <p><strong>Montant à payer :</strong> {formatPrice(orderData.amount)}</p>
                <p><strong>Mode de paiement :</strong> {paymentInfo.title}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {paymentInfo.icon}
                <span className="ml-2">{paymentInfo.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important :</strong> Assurez-vous d'avoir suffisamment de solde sur votre compte {paymentInfo.title} avant de procéder au paiement.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Étapes à suivre :</h3>
                <ol className="space-y-2">
                  {paymentInfo.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Informations importantes :</h4>
                
                <div className="flex items-center justify-between">
                  <span>Montant exact :</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono bg-white px-2 py-1 rounded">{orderData.amount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(orderData.amount.toString())}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Référence :</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono bg-white px-2 py-1 rounded">{orderData.orderNumber}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(orderData.orderNumber)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4 pt-4">
                <p className="text-sm text-gray-600">
                  Une fois le paiement effectué, cliquez sur le bouton ci-dessous pour confirmer votre commande.
                </p>
                
                <Button
                  onClick={handlePaymentCompleted}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  J'ai effectué le paiement
                </Button>
                
                <p className="text-xs text-gray-500">
                  Nous vérifierons votre paiement et vous contacterons pour la livraison.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentInstructions;
