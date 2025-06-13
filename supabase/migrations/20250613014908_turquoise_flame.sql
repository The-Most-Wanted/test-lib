/*
  # Tables pour le système d'administration et suivi d'activité

  1. Nouvelles tables
    - `admin_users` - Utilisateurs administrateurs
    - `activity_logs` - Logs d'activité du site
    - `analytics_events` - Événements analytics personnalisés

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour les admins uniquement

  3. Fonctions
    - Fonction pour vérifier les droits admin
    - Triggers pour logs automatiques
*/

-- Table des utilisateurs administrateurs
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  permissions JSONB DEFAULT '{"orders": true, "analytics": true, "users": false}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des logs d'activité
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des événements analytics personnalisés
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  event_category TEXT,
  event_label TEXT,
  event_value NUMERIC,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vue pour les statistiques des commandes
CREATE OR REPLACE VIEW public.order_statistics AS
SELECT 
  DATE(created_at) as order_date,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as average_order_value,
  COUNT(DISTINCT customer_id) as unique_customers
FROM public.orders 
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- Vue pour les statistiques des visiteurs
CREATE OR REPLACE VIEW public.visitor_statistics AS
SELECT 
  DATE(created_at) as visit_date,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) as total_page_views,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as page_views,
  COUNT(CASE WHEN event_name = 'add_to_cart' THEN 1 END) as add_to_cart_events,
  COUNT(CASE WHEN event_name = 'purchase' THEN 1 END) as purchases
FROM public.analytics_events 
GROUP BY DATE(created_at)
ORDER BY visit_date DESC;

-- Fonction pour vérifier si un utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour logger les activités
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id TEXT DEFAULT NULL,
  p_details JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.activity_logs (
    user_id, action, resource_type, resource_id, details
  ) VALUES (
    auth.uid(), p_action, p_resource_type, p_resource_id, p_details
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour logger automatiquement les nouvelles commandes
CREATE OR REPLACE FUNCTION public.log_order_activity()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.log_activity(
    'order_created',
    'order',
    NEW.id::TEXT,
    jsonb_build_object(
      'order_number', NEW.order_number,
      'total_amount', NEW.total_amount,
      'status', NEW.status
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger s'il n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_log_order_activity'
  ) THEN
    CREATE TRIGGER trigger_log_order_activity
      AFTER INSERT ON public.orders
      FOR EACH ROW
      EXECUTE FUNCTION public.log_order_activity();
  END IF;
END $$;

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Politiques pour admin_users
CREATE POLICY "Only admins can view admin users" ON public.admin_users
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Only super admins can manage admin users" ON public.admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Politiques pour activity_logs
CREATE POLICY "Only admins can view activity logs" ON public.activity_logs
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (true);

-- Politiques pour analytics_events
CREATE POLICY "Only admins can view analytics events" ON public.analytics_events
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can insert analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Insérer un utilisateur admin par défaut (à modifier avec un vrai email)
-- INSERT INTO public.admin_users (user_id, email, role) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'admin@livreskakpo.com', 'super_admin')
-- ON CONFLICT (user_id) DO NOTHING;