import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealtimeOrders, useRealtimeActivityLogs } from '@/hooks/useRealtime';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Activity, 
  Eye,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  order_items: {
    quantity: number;
    book: {
      title: string;
    };
  }[];
}

interface Statistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  todayOrders: number;
  pendingOrders: number;
  completedOrders: number;
}

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [orderStats, setOrderStats] = useState<any[]>([]);
  const [visitorStats, setVisitorStats] = useState<any[]>([]);

  const { newOrders, clearNewOrders } = useRealtimeOrders();
  const { activities } = useRealtimeActivityLogs();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkAdminAccess();
  }, [user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadOrders();
      loadStatistics();
      loadOrderStatistics();
      loadVisitorStatistics();
    }
  }, [isAdmin]);

  const checkAdminAccess = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        toast.error('Accès non autorisé');
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Erreur vérification admin:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers(first_name, last_name, email),
        order_items(
          quantity,
          book:books(title)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Erreur chargement commandes:', error);
      return;
    }

    setOrders(data || []);
  };

  const loadStatistics = async () => {
    // Statistiques générales
    const { data: ordersData } = await supabase
      .from('orders')
      .select('total_amount, status, created_at');

    if (ordersData) {
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = ordersData.filter(order => 
        order.created_at.startsWith(today)
      ).length;

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total_amount, 0);
      const averageOrderValue = ordersData.length > 0 ? totalRevenue / ordersData.length : 0;
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const completedOrders = ordersData.filter(order => order.status === 'delivered').length;

      setStatistics({
        totalOrders: ordersData.length,
        totalRevenue,
        averageOrderValue,
        todayOrders,
        pendingOrders,
        completedOrders
      });
    }
  };

  const loadOrderStatistics = async () => {
    const { data, error } = await supabase
      .from('order_statistics')
      .select('*')
      .order('order_date', { ascending: false })
      .limit(30);

    if (!error && data) {
      setOrderStats(data);
    }
  };

  const loadVisitorStatistics = async () => {
    const { data, error } = await supabase
      .from('visitor_statistics')
      .select('*')
      .order('visit_date', { ascending: false })
      .limit(30);

    if (!error && data) {
      setVisitorStats(data);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
      return;
    }

    toast.success('Statut mis à jour');
    loadOrders();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const, icon: Clock },
      confirmed: { label: 'Confirmée', variant: 'default' as const, icon: CheckCircle },
      processing: { label: 'En cours', variant: 'default' as const, icon: Package },
      shipped: { label: 'Expédiée', variant: 'default' as const, icon: TrendingUp },
      delivered: { label: 'Livrée', variant: 'default' as const, icon: CheckCircle },
      cancelled: { label: 'Annulée', variant: 'destructive' as const, icon: AlertCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Vérification des accès...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-600">Tableau de bord et gestion des commandes</p>
          </div>
          
          {newOrders.length > 0 && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">{newOrders.length} nouvelle(s) commande(s)</span>
              </div>
              <Button 
                onClick={clearNewOrders}
                size="sm"
                className="mt-2"
              >
                Marquer comme vues
              </Button>
            </div>
          )}
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes totales</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(statistics.totalRevenue)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Panier moyen</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(statistics.averageOrderValue)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.todayOrders}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Gestion des commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Commande</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.order_number}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer?.first_name} {order.customer?.last_name}</p>
                              <p className="text-sm text-gray-600">{order.customer?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {order.order_items?.map((item, index) => (
                                <div key={index}>
                                  {item.quantity}x {item.book?.title}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatPrice(order.total_amount)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{formatDate(order.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {order.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                >
                                  Confirmer
                                </Button>
                              )}
                              {order.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                                >
                                  Expédier
                                </Button>
                              )}
                              {order.status === 'shipped' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                                >
                                  Livrer
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Visiteurs par jour (30 derniers jours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visitorStats.slice(0, 10).map((stat, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(stat.visit_date).toLocaleDateString('fr-FR')}</p>
                          <p className="text-sm text-gray-600">{stat.unique_sessions} sessions uniques</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{stat.total_page_views} vues</p>
                          <p className="text-sm text-gray-600">{stat.unique_users} utilisateurs</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Événements récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activities.slice(0, 10).map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-600">
                            {new Date(activity.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Journal d'activité en temps réel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.resource_type}</p>
                            {activity.details && (
                              <pre className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                                {JSON.stringify(activity.details, null, 2)}
                              </pre>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(activity.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes par jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderStats.slice(0, 10).map((stat, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(stat.order_date).toLocaleDateString('fr-FR')}</p>
                          <p className="text-sm text-gray-600">{stat.unique_customers} clients uniques</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{stat.total_orders} commandes</p>
                          <p className="text-sm text-green-600">{formatPrice(stat.total_revenue)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Résumé des performances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Commandes en attente</span>
                      <span className="text-2xl font-bold text-blue-600">{statistics.pendingOrders}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Commandes livrées</span>
                      <span className="text-2xl font-bold text-green-600">{statistics.completedOrders}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Taux de conversion</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {statistics.totalOrders > 0 ? 
                          ((statistics.completedOrders / statistics.totalOrders) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;