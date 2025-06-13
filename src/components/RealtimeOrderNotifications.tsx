
import { useEffect, useState } from 'react';
import { useRealtimeOrders } from '@/hooks/useRealtime';
import { toast } from 'sonner';
import { Package, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RealtimeOrderNotifications = () => {
  const { newOrders, clearNewOrders } = useRealtimeOrders();
  const [hasShownInitialToast, setHasShownInitialToast] = useState(false);

  useEffect(() => {
    // Afficher une notification pour chaque nouvelle commande
    newOrders.forEach((order, index) => {
      // Éviter de montrer les notifications au premier chargement
      if (hasShownInitialToast) {
        setTimeout(() => {
          toast.success(
            `Nouvelle commande reçue!`,
            {
              description: `Commande ${order.order_number} - ${new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0,
              }).format(order.total_amount)}`,
              icon: <Package className="h-4 w-4" />,
              duration: 5000,
              action: {
                label: "Voir",
                onClick: () => {
                  // Scroll vers le tableau des commandes si on est sur la page admin
                  const ordersTable = document.querySelector('[data-testid="orders-table"]');
                  if (ordersTable) {
                    ordersTable.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }
            }
          );
        }, index * 500); // Délai entre les notifications multiples
      }
    });

    // Marquer comme ayant montré les toasts initiaux après le premier rendu
    if (newOrders.length > 0 && !hasShownInitialToast) {
      setHasShownInitialToast(true);
    }
  }, [newOrders, hasShownInitialToast]);

  // Afficher un indicateur visuel s'il y a de nouvelles commandes
  if (newOrders.length > 0) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <Button
          onClick={clearNewOrders}
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse"
        >
          <Bell className="h-4 w-4 mr-2" />
          {newOrders.length} nouvelle{newOrders.length > 1 ? 's' : ''} commande{newOrders.length > 1 ? 's' : ''}
        </Button>
      </div>
    );
  }

  return null;
};

export default RealtimeOrderNotifications;
