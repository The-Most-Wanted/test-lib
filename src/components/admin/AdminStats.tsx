
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Users, DollarSign, BarChart3 } from "lucide-react";
import { useMemo } from "react";

interface AdminStatsProps {
  showDetails?: boolean;
}

const AdminStats = ({ showDetails = false }: AdminStatsProps) => {
  // Statistiques des commandes
  const { data: orderStats, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('total_amount, status, created_at, customer_id');

      if (error) throw error;

      return data || [];
    },
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
  });

  // Statistiques des visiteurs
  const { data: visitorStats, isLoading: isLoadingVisitors } = useQuery({
    queryKey: ['admin-visitor-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_name, session_id, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      return data || [];
    },
    refetchInterval: 60000, // Rafraîchir toutes les minutes
  });

  // Calculs optimisés avec useMemo
  const calculations = useMemo(() => {
    if (!orderStats || !visitorStats) return null;

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Statistiques des commandes
    const totalOrders = orderStats.length;
    const totalRevenue = orderStats.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    const todayOrders = orderStats.filter(order => 
      new Date(order.created_at) >= yesterday
    ).length;

    const uniqueCustomers = new Set(orderStats.map(order => order.customer_id)).size;

    // Statistiques des visiteurs
    const uniqueSessions = new Set(visitorStats.map(event => event.session_id)).size;
    const pageViews = visitorStats.filter(event => event.event_name === 'page_view').length;
    const addToCarts = visitorStats.filter(event => event.event_name === 'add_to_cart').length;
    const purchases = visitorStats.filter(event => event.event_name === 'purchase').length;

    // Taux de conversion
    const conversionRate = uniqueSessions > 0 ? (purchases / uniqueSessions) * 100 : 0;

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      todayOrders,
      uniqueCustomers,
      uniqueSessions,
      pageViews,
      addToCarts,
      purchases,
      conversionRate
    };
  }, [orderStats, visitorStats]);

  if (isLoadingOrders || isLoadingVisitors || !calculations) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Commandes totales",
      value: calculations.totalOrders.toLocaleString(),
      change: `+${calculations.todayOrders} aujourd'hui`,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Revenus",
      value: new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
      }).format(calculations.totalRevenue),
      change: `Panier moyen: ${new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
      }).format(calculations.averageOrderValue)}`,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Visiteurs (7j)",
      value: calculations.uniqueSessions.toLocaleString(),
      change: `${calculations.pageViews} pages vues`,
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Taux de conversion",
      value: `${calculations.conversionRate.toFixed(1)}%`,
      change: `${calculations.purchases} achats / ${calculations.uniqueSessions} sessions`,
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Activité récente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Ajouts au panier</span>
                  <span className="font-semibold">{calculations.addToCarts}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Pages vues</span>
                  <span className="font-semibold">{calculations.pageViews}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Clients uniques</span>
                  <span className="font-semibold">{calculations.uniqueCustomers}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taux de conversion</span>
                    <span>{calculations.conversionRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(calculations.conversionRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ajouts panier → Achat</span>
                    <span>{calculations.addToCarts > 0 ? ((calculations.purchases / calculations.addToCarts) * 100).toFixed(1) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${calculations.addToCarts > 0 ? Math.min((calculations.purchases / calculations.addToCarts) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
