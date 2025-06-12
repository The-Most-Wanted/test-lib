/*
  # E-commerce functionality for Professor Kakpo's book catalog

  1. Database Schema Updates
    - Add e-commerce columns to existing books table
    - Create customers, orders, order_items, and cart_items tables
    - Set up proper relationships and constraints

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access control
    - Ensure books are publicly readable

  3. Functions and Triggers
    - Order number generation system
    - Automatic order numbering
*/

-- First, let's add missing columns to the existing books table if they don't exist
DO $$
BEGIN
  -- Add price column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'books' AND column_name = 'price'
  ) THEN
    ALTER TABLE public.books ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0.00;
  END IF;

  -- Add stock_quantity column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'books' AND column_name = 'stock_quantity'
  ) THEN
    ALTER TABLE public.books ADD COLUMN stock_quantity INTEGER NOT NULL DEFAULT 0;
  END IF;

  -- Add featured column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'books' AND column_name = 'featured'
  ) THEN
    ALTER TABLE public.books ADD COLUMN featured BOOLEAN DEFAULT false;
  END IF;

  -- Add active column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'books' AND column_name = 'active'
  ) THEN
    ALTER TABLE public.books ADD COLUMN active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- Create customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.customers (
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

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.orders (
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

-- Create order_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES public.books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cart_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES public.books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Create sequence for order numbers if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

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

-- Create trigger function to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_set_order_number'
  ) THEN
    CREATE TRIGGER trigger_set_order_number
      BEFORE INSERT ON public.orders
      FOR EACH ROW
      EXECUTE FUNCTION set_order_number();
  END IF;
END $$;

-- Enable Row Level Security on all tables
DO $$
BEGIN
  -- Enable RLS on books if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables WHERE tablename = 'books' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Enable RLS on customers
  ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
  
  -- Enable RLS on orders
  ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
  
  -- Enable RLS on order_items
  ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
  
  -- Enable RLS on cart_items
  ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
END $$;

-- Create policies (drop existing ones first to avoid conflicts)
DO $$
BEGIN
  -- Books policies
  DROP POLICY IF EXISTS "Anyone can view active books" ON public.books;
  CREATE POLICY "Anyone can view active books" ON public.books
    FOR SELECT USING (active = true);

  -- Customers policies
  DROP POLICY IF EXISTS "Users can view their own customer data" ON public.customers;
  CREATE POLICY "Users can view their own customer data" ON public.customers
    FOR SELECT USING (user_id = auth.uid());

  DROP POLICY IF EXISTS "Users can insert their own customer data" ON public.customers;
  CREATE POLICY "Users can insert their own customer data" ON public.customers
    FOR INSERT WITH CHECK (user_id = auth.uid());

  DROP POLICY IF EXISTS "Users can update their own customer data" ON public.customers;
  CREATE POLICY "Users can update their own customer data" ON public.customers
    FOR UPDATE USING (user_id = auth.uid());

  -- Orders policies
  DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
  CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

  DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
  CREATE POLICY "Users can insert their own orders" ON public.orders
    FOR INSERT WITH CHECK (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

  -- Order items policies
  DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
  CREATE POLICY "Users can view their own order items" ON public.order_items
    FOR SELECT USING (order_id IN (
      SELECT o.id FROM public.orders o 
      JOIN public.customers c ON o.customer_id = c.id 
      WHERE c.user_id = auth.uid()
    ));

  DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
  CREATE POLICY "Users can insert their own order items" ON public.order_items
    FOR INSERT WITH CHECK (order_id IN (
      SELECT o.id FROM public.orders o 
      JOIN public.customers c ON o.customer_id = c.id 
      WHERE c.user_id = auth.uid()
    ));

  -- Cart items policies
  DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
  CREATE POLICY "Users can view their own cart items" ON public.cart_items
    FOR SELECT USING (user_id = auth.uid());

  DROP POLICY IF EXISTS "Users can insert their own cart items" ON public.cart_items;
  CREATE POLICY "Users can insert their own cart items" ON public.cart_items
    FOR INSERT WITH CHECK (user_id = auth.uid());

  DROP POLICY IF EXISTS "Users can update their own cart items" ON public.cart_items;
  CREATE POLICY "Users can update their own cart items" ON public.cart_items
    FOR UPDATE USING (user_id = auth.uid());

  DROP POLICY IF EXISTS "Users can delete their own cart items" ON public.cart_items;
  CREATE POLICY "Users can delete their own cart items" ON public.cart_items
    FOR DELETE USING (user_id = auth.uid());
END $$;

-- Update existing books with e-commerce data if the table is mostly empty
DO $$
BEGIN
  -- Only insert sample data if there are fewer than 5 books
  IF (SELECT COUNT(*) FROM public.books) < 5 THEN
    -- Clear existing data first
    DELETE FROM public.books;
    
    -- Insert sample books with e-commerce data
    INSERT INTO public.books (title, title_en, description, description_en, genre, genre_en, year, publisher, publisher_en, price, stock_quantity, featured, active) VALUES
    ('Le Fá expliqué aux profanes', 'Fa Explained to the Uninitiated', 'Une exploration accessible du système divinatoire Fá, patrimoine spirituel du Bénin.', 'An accessible exploration of the Fa divination system, spiritual heritage of Benin.', 'Essai', 'Essay', 2021, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 15000.00, 50, true, true),
    ('Danxomè, le royaume abomey et l''art de la guerre', 'Danxomè, the Abomey Kingdom and the Art of War', 'Histoire militaire et politique du royaume du Danxomè, analysant les stratégies guerrières et l''organisation sociale.', 'Military and political history of the Danxomè kingdom, analyzing war strategies and social organization.', 'Histoire', 'History', 2019, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 18000.00, 30, true, true),
    ('Les épouses de Fa : récits de la parole sacrée du Bénin', 'The Wives of Fa: Tales of Sacred Words from Benin', 'Recueil de récits traditionnels puisés dans la sagesse du Fá.', 'Collection of traditional tales drawn from Fa wisdom.', 'Récits', 'Narratives', 2007, 'Éditions Ruisseaux d''Afrique', 'Ruisseaux d''Afrique Editions', 12000.00, 40, true, true),
    ('Bénin : carrefour de civilisations africaines', 'Benin: Crossroads of African Civilizations', 'Analyse approfondie des influences culturelles multiples qui ont façonné le Bénin moderne.', 'In-depth analysis of the multiple cultural influences that shaped modern Benin.', 'Anthropologie', 'Anthropology', 2020, 'Éditions Universitaires', 'University Editions', 20000.00, 25, false, true),
    ('Vodun et modernité : spiritualité africaine contemporaine', 'Vodun and Modernity: Contemporary African Spirituality', 'Étude de l''évolution des pratiques vodun dans le contexte de la mondialisation.', 'Study of the evolution of vodun practices in the context of globalization.', 'Sociologie', 'Sociology', 2018, 'Presses Africaines', 'African Press', 16000.00, 35, false, true),
    ('Contes et légendes du Bénin', 'Tales and Legends of Benin', 'Compilation de contes traditionnels béninois transmis de génération en génération.', 'Compilation of traditional Beninese tales passed down from generation to generation.', 'Littérature', 'Literature', 2015, 'Éditions du Patrimoine', 'Heritage Editions', 10000.00, 60, false, true),
    ('L''oralité dans la littérature africaine', 'Orality in African Literature', 'Analyse de l''influence de la tradition orale sur la littérature africaine moderne.', 'Analysis of the influence of oral tradition on modern African literature.', 'Critique littéraire', 'Literary Criticism', 2016, 'Presses Universitaires', 'University Press', 22000.00, 20, false, true),
    ('Rites et symboles vodun', 'Vodun Rites and Symbols', 'Guide détaillé des rituels et symboliques du vodun béninois.', 'Detailed guide to Beninese vodun rituals and symbolism.', 'Anthropologie', 'Anthropology', 2017, 'Éditions Spirituelles', 'Spiritual Editions', 14000.00, 45, false, true),
    ('L''Iroko : l''arbre de vie dans la mystique Vodun', 'The Iroko: Tree of Life in Vodun Mysticism', 'Étude approfondie de l''arbre Iroko dans la cosmogonie vodun et son importance spirituelle.', 'In-depth study of the Iroko tree in vodun cosmogony and its spiritual importance.', 'Essai', 'Essay', 2017, 'Éditions Mystiques', 'Mystical Editions', 13000.00, 55, false, true),
    ('Femmes et pouvoir au Bénin précolonial', 'Women and Power in Precolonial Benin', 'Exploration du rôle des femmes dans les structures de pouvoir traditionnelles béninoises.', 'Exploration of women''s role in traditional Beninese power structures.', 'Histoire', 'History', 2019, 'Éditions Féminines', 'Feminine Editions', 17000.00, 30, false, true);
  ELSE
    -- Just update existing books to add missing e-commerce fields with default values
    UPDATE public.books SET 
      price = COALESCE(price, 15000.00),
      stock_quantity = COALESCE(stock_quantity, 25),
      featured = COALESCE(featured, false),
      active = COALESCE(active, true)
    WHERE price IS NULL OR stock_quantity IS NULL OR featured IS NULL OR active IS NULL;
  END IF;
END $$;