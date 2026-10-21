-- ============================================
-- SEED DATA
-- ============================================

-- Insert Sample Artisans
INSERT INTO artisans (name, bio, location, profile_image) VALUES
('Amara Okafor', 'Master weaver from Lagos with 20 years of experience in traditional Aso-Oke textiles.', 'Lagos, Nigeria', '/images/artisans/artisan-001.jpg'),
('Kofi Mensah', 'Third-generation Kente cloth artisan from the Ashanti region.', 'Kumasi, Ghana', '/images/artisans/artisan-002.jpg'),
('Zara Ibrahim', 'Specialist in intricate beadwork and traditional jewelry.', 'Nairobi, Kenya', '/images/artisans/artisan-003.jpg'),
('Omar Diallo', 'Expert in hand-dyed fabrics using organic indigo and natural pigments.', 'Dakar, Senegal', '/images/artisans/artisan-004.jpg');

-- Insert Sample Products (using actual artisan IDs)
INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Aso-Oke Royal Gown',
    'Hand-woven traditional Nigerian gown with gold thread accents',
    450.00,
    'WOMEN',
    '/images/products/gown-001.jpg',
    id,
    5,
    true
FROM artisans WHERE name = 'Amara Okafor';

INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Kente Classic Blazer',
    'Modern tailored blazer featuring authentic Kente patterns',
    320.00,
    'MEN',
    '/images/products/blazer-001.jpg',
    id,
    8,
    true
FROM artisans WHERE name = 'Kofi Mensah';

INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Maasai Beaded Necklace',
    'Traditional Maasai collar necklace with glass beads',
    85.00,
    'ACCESSORIES',
    '/images/products/necklace-001.jpg',
    id,
    15,
    false
FROM artisans WHERE name = 'Zara Ibrahim';

INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Indigo Dashiki Set',
    'Hand-dyed indigo cotton dashiki with matching pants',
    180.00,
    'MEN',
    '/images/products/dashiki-001.jpg',
    id,
    12,
    false
FROM artisans WHERE name = 'Omar Diallo';

INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Children''s Kente Dress',
    'Traditional Kente-patterned dress for ages 5-12',
    95.00,
    'CHILDREN',
    '/images/products/children-001.jpg',
    id,
    20,
    false
FROM artisans WHERE name = 'Kofi Mensah';

INSERT INTO products (name, description, price, category, image_url, artisan_id, stock_quantity, is_featured) 
SELECT 
    'Gold Thread Clutch',
    'Evening clutch with hand-embroidered gold thread patterns',
    120.00,
    'ACCESSORIES',
    '/images/products/clutch-001.jpg',
    id,
    10,
    true
FROM artisans WHERE name = 'Amara Okafor';
