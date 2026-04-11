-- ============================================
-- Origin 54 Database Schema
-- ============================================

-- Enable Row Level Security (RLS)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- ============================================
-- ARTISANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS artisans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    location TEXT,
    profile_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Artisans are viewable by everyone" 
    ON artisans FOR SELECT 
    USING (true);

CREATE POLICY "Only authenticated users can insert artisans" 
    ON artisans FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update artisans" 
    ON artisans FOR UPDATE 
    USING (auth.role() = 'authenticated');

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('WOMEN', 'MEN', 'CHILDREN', 'ACCESSORIES')),
    image_url TEXT,
    artisan_id UUID REFERENCES artisans(id) ON DELETE SET NULL,
    stock_quantity INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone" 
    ON products FOR SELECT 
    USING (true);

CREATE POLICY "Only authenticated users can insert products" 
    ON products FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update products" 
    ON products FOR UPDATE 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete products" 
    ON products FOR DELETE 
    USING (auth.role() = 'authenticated');

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    items JSONB NOT NULL,
    paystack_reference TEXT,
    customer_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own orders" 
    ON orders FOR SELECT 
    USING (auth.uid()::text = customer_details->>'user_id' OR auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert orders" 
    ON orders FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_artisans_updated_at BEFORE UPDATE ON artisans 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_artisan_id ON products(artisan_id);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- STORAGE BUCKET SETUP (Run in Supabase Dashboard SQL Editor)
-- ============================================
-- Note: Create buckets manually in Supabase Dashboard or use Storage API
-- Required buckets: 'products', 'artisans', 'logos'

