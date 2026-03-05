-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'vendor', 'affiliate', 'member');

-- Profiles table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  phone TEXT UNIQUE, -- Main account ID
  email TEXT,        -- For messaging/notifications
  full_name TEXT,
  role user_role DEFAULT 'member',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, email, full_name, role)
  VALUES (
    new.id, 
    new.phone, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'member')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT, -- Markdown or Rich Text
  price DECIMAL(12, 2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  youtube_url TEXT,
  social_links JSONB DEFAULT '{}',
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Affiliate Links table
CREATE TABLE IF NOT EXISTS public.affiliate_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  unique_code TEXT UNIQUE NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(affiliate_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  affiliate_id UUID REFERENCES public.profiles(id),
  total_amount DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, completed, cancelled
  items JSONB NOT NULL, -- Snapshot of products at time of purchase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Simplifed for part 1)
-- Profiles: Users can read their own profile, admins can read all
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: Everyone can view published products
CREATE POLICY "Published products are viewable by everyone." ON public.products
  FOR SELECT USING (is_published = true);

-- Vendors can manage their own products
CREATE POLICY "Vendors can manage their own products." ON public.products
  FOR ALL USING (auth.uid() = vendor_id);

-- Affiliate Links: Affiliates can see their own links
CREATE POLICY "Affiliates can see their own links." ON public.affiliate_links
  FOR SELECT USING (auth.uid() = affiliate_id);

-- Orders: Customers see their own, Affiliates see orders they referred, Admins see all
CREATE POLICY "Users can see their own orders." ON public.orders
  FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = affiliate_id);
