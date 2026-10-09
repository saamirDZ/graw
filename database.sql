-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    tag TEXT,
    movement TEXT,
    caseMaterial TEXT,
    strap TEXT,
    water TEXT,
    size TEXT,
    crystal TEXT,
    img TEXT
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

-- Allow public insert to orders
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Set up storage bucket for products
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;

-- Allow public read access to products bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');

-- Allow service role to manage storage (this is usually default, but just in case)
CREATE POLICY "Service Role Access" ON storage.objects FOR ALL USING (auth.role() = 'service_role');
