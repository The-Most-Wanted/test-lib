import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeOrder {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  customer_id: string;
}

export const useRealtimeOrders = () => {
  const [newOrders, setNewOrders] = useState<RealtimeOrder[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    // Créer un canal pour écouter les nouvelles commandes
    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Nouvelle commande reçue:', payload);
          const newOrder = payload.new as RealtimeOrder;
          
          setNewOrders(prev => [newOrder, ...prev.slice(0, 9)]); // Garder les 10 dernières
          
          // Notification toast ou autre action
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nouvelle commande!', {
              body: `Commande ${newOrder.order_number} - ${new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0,
              }).format(newOrder.total_amount)}`,
              icon: '/favicon.ico'
            });
          }
        }
      )
      .subscribe();

    setChannel(ordersChannel);

    // Demander permission pour les notifications
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      if (ordersChannel) {
        supabase.removeChannel(ordersChannel);
      }
    };
  }, []);

  const clearNewOrders = () => {
    setNewOrders([]);
  };

  return { newOrders, clearNewOrders };
};

export const useRealtimeActivityLogs = () => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const activityChannel = supabase
      .channel('activity-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_logs'
        },
        (payload) => {
          console.log('Nouvelle activité:', payload);
          setActivities(prev => [payload.new, ...prev.slice(0, 19)]); // Garder les 20 dernières
        }
      )
      .subscribe();

    return () => {
      if (activityChannel) {
        supabase.removeChannel(activityChannel);
      }
    };
  }, []);

  return { activities };
};