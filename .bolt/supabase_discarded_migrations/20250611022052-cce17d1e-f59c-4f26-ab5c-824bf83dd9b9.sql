
-- Create books table with e-commerce data
CREATE TABLE public.books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description TEXT NOT NULL,
  description_en TEXT NOT NULL,
  genre TEXT NOT NULL,
  genre_en TEXT NOT NULL,
  year INTEGER NOT NULL,
  publisher TEXT NOT NULL,
  publisher_en TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  isbn TEXT UNIQUE,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Bénin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'Bénin',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  stripe_session_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES public.books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cart_items table for shopping cart
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES public.books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Insert sample books with prices
INSERT INTO public.books (title, title_en, description, description_en, genre, genre_en, year, publisher, publisher_en, price, stock_quantity, featured) VALUES
('Le Fá expliqué aux profanes', 'Fa Explained to the Uninitiated', 'Une exploration accessible du système divinatoire Fá, patrimoine spirituel du Bénin.', 'An accessible exploration of the Fa divination system, spiritual heritage of Benin.', 'Essai', 'Essay', 2021, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 15000.00, 50, true),
('Danxomè, le royaume abomey et l''art de la guerre', 'Danxomè, the Abomey Kingdom and the Art of War', 'Histoire militaire et politique du royaume du Danxomè, analysant les stratégies guerrières et l''organisation sociale.', 'Military and political history of the Danxomè kingdom, analyzing war strategies and social organization.', 'Histoire', 'History', 2019, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 18000.00, 30, true),
('Les épouses de Fa : récits de la parole sacrée du Bénin', 'The Wives of Fa: Tales of Sacred Words from Benin', 'Recueil de récits traditionnels puisés dans la sagesse du Fá.', 'Collection of traditional tales drawn from Fa wisdom.', 'Récits', 'Narratives', 2007, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 12000.00, 40, true),
('Bénin : carrefour de civilisations africaines', 'Benin: Crossroads of African Civilizations', 'Analyse approfondie des influences culturelles multiples qui ont façonné le Bénin moderne.', 'In-depth analysis of the multiple cultural influences that shaped modern Benin.', 'Anthropologie', 'Anthropology', 2020, 'Éditions Universitaires', 'University Editions', 20000.00, 25, false),
('Vodun et modernité : spiritualité africaine contemporaine', 'Vodun and Modernity: Contemporary African Spirituality', 'Étude de l''évolution des pratiques vodun dans le contexte de la mondialisation.', 'Study of the evolution of vodun practices in the context of globalization.', 'Sociologie', 'Sociology', 2018, 'Presses Africaines', 'African Press', 16000.00, 35, false),
('Contes et légendes du Bénin', 'Tales and Legends of Benin', 'Compilation de contes traditionnels béninois transmis de génération en génération.', 'Compilation of traditional Beninese tales passed down from generation to generation.', 'Littérature', 'Literature', 2015, 'Éditions du Patrimoine', 'Heritage Editions', 10000.00, 60, false),
('L''oralité dans la littérature africaine', 'Orality in African Literature', 'Analyse de l''influence de la tradition orale sur la littérature africaine moderne.', 'Analysis of the influence of oral tradition on modern African literature.', 'Critique littéraire', 'Literary Criticism', 2016, 'Presses Universitaires', 'University Press', 22000.00, 20, false),
('Rites et symboles vodun', 'Vodun Rites and Symbols', 'Guide détaillé des rituels et symboliques du vodun béninois.', 'Detailed guide to Beninese vodun rituals and symbolism.', 'Anthropologie', 'Anthropology', 2017, 'Éditions Spirituelles', 'Spiritual Editions', 14000.00, 45, false),
('L''Iroko : l''arbre de vie dans la mystique Vodun', 'The Iroko: Tree of Life in Vodun Mysticism', 'Étude approfondie de l''arbre Iroko dans la cosmogonie vodun et son importance spirituelle.', 'In-depth study of the Iroko tree in vodun cosmogony and its spiritual importance.', 'Essai', 'Essay', 2017, 'Éditions Mystiques', 'Mystical Editions', 13000.00, 55, false),
('Femmes et pouvoir au Bénin précolonial', 'Women and Power in Precolonial Benin', 'Exploration du rôle des femmes dans les structures de pouvoir traditionnelles béninoises.', 'Exploration of women''s role in traditional Beninese power structures.', 'Histoire', 'History', 2019, 'Éditions Féminines', 'Feminine Editions', 17000.00, 30, false);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for books (public read access)
CREATE POLICY "Anyone can view active books" ON public.books
  FOR SELECT USING (active = true);

-- Create policies for customers (users can only see their own data)
CREATE POLICY "Users can view their own customer data" ON public.customers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own customer data" ON public.customers
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own customer data" ON public.customers
  FOR UPDATE USING (user_id = auth.uid());

-- Create policies for orders (users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT WITH CHECK (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- Create policies for order_items (users can only see items from their orders)
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (order_id IN (
    SELECT o.id FROM public.orders o 
    JOIN public.customers c ON o.customer_id = c.id 
    WHERE c.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own order items" ON public.order_items
  FOR INSERT WITH CHECK (order_id IN (
    SELECT o.id FROM public.orders o 
    JOIN public.customers c ON o.customer_id = c.id 
    WHERE c.user_id = auth.uid()
  ));

-- Create policies for cart_items (users can only manage their own cart)
CREATE POLICY "Users can view their own cart items" ON public.cart_items
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own cart items" ON public.cart_items
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own cart items" ON public.cart_items
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own cart items" ON public.cart_items
  FOR DELETE USING (user_id = auth.uid());

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();
