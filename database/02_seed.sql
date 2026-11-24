-- ====================================================================
-- THE TEA STORY - PostgreSQL Seed Data Script v1.0
-- Initial data insertion for organic tea catalog, users, and coupons
-- ====================================================================

-- 1. SEED PRODUCTS
INSERT INTO products (
    id, name, subtitle, category, collection, price, original_price, rating, review_count,
    image_url, gallery, description, origin, elevation, flush, ingredients, taste_notes,
    aroma, caffeine, benefits, water_temp, steep_time, timer_seconds, serving_size,
    in_stock, stock_quantity, is_bestseller, is_new
) VALUES 
(
    'tea-001',
    'Assam Golden Reserve STGFOP1',
    'Full-bodied single-estate black tea with rich malt and honey notes',
    'Black Tea',
    'Single Origin',
    850.00,
    1100.00,
    4.90,
    42,
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80'],
    'Sourced from the historic Brahmaputra Valley estate, this rare tippy golden flowering orange pekoe delivers a robust, amber liquor with natural malty sweetness.',
    'Upper Assam, India',
    '150 meters',
    'Second Flush (June Harvest)',
    ARRAY['100% Handpicked Organic Assam Whole Leaf Tea'],
    ARRAY['Malt', 'Wild Honey', 'Caramel', 'Warm Spices'],
    'Rich roasted cocoa with sweet floral undertones',
    'High',
    ARRAY['Enhances mental alertness', 'Supports heart health', 'Rich in natural polyphenols'],
    '95°C',
    '3-4 mins',
    210,
    '2.5g per 200ml cup',
    TRUE,
    45,
    TRUE,
    FALSE
),
(
    'tea-002',
    'Darjeeling First Flush Spring Blossom',
    'The Champagne of Teas with delicate floral and muscatel bouquet',
    'Black Tea',
    'Royal Reserve',
    1450.00,
    NULL,
    5.00,
    38,
    'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80'],
    'Plucked exclusively during the first spring mist in the misty Himalayan foothills, yielding a pale golden infusion with muscatel grape brightness.',
    'Darjeeling Foothills, West Bengal',
    '2,100 meters',
    'First Flush (Early March)',
    ARRAY['100% Single Estate First Flush Greenish-Black Whole Leaves'],
    ARRAY['Muscatel Grape', 'Green Apple', 'White Jasmine', 'Fresh Meadow'],
    'Subtle orchid and citrus breeze',
    'Medium',
    ARRAY['Gentle energizer', 'Boosts metabolic vitality', 'High antioxidant concentration'],
    '85°C',
    '2.5 mins',
    150,
    '2g per 200ml cup',
    TRUE,
    20,
    TRUE,
    TRUE
),
(
    'tea-003',
    'Kashmiri Shahi Saffron Kahwa',
    'Traditional royal Himalayan infusion with organic green tea, saffron & crushed almonds',
    'Wellness Blend',
    'Signature',
    1200.00,
    1350.00,
    4.80,
    56,
    'https://images.unsplash.com/photo-1563822249510-04678c787b47?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1563822249510-04678c787b47?auto=format&fit=crop&w=800&q=80'],
    'An opulent recipe passed down through Kashmiri royalty. Combines stone-ground Kashmiri saffron strands, green tea leaves, green cardamom, and flaked almonds.',
    'Pampore & Kangra Valley, India',
    '1,600 meters',
    'Autumn Harvest',
    ARRAY['Organic Kangra Green Tea', 'Pampore Saffron Strands', 'Green Cardamom Pods', 'Ceylon Cinnamon', 'Kashmiri Almond Flakes'],
    ARRAY['Saffron Silk', 'Cardamom Heat', 'Sweet Almond', 'Cinnamon Warmth'],
    'Exotic spicy sweetness with rich saffron perfume',
    'Low',
    ARRAY['Warming & immunity boosting', 'Promotes glowing skin', 'Aids digestional comfort'],
    '90°C',
    '4 mins',
    240,
    '3g per 200ml cup',
    TRUE,
    60,
    TRUE,
    FALSE
);

-- 2. SEED USERS & ADDRESSES
INSERT INTO users (id, name, email, password_hash, role, phone) VALUES
('usr-001', 'Priya Sharma', 'priya.sharma@example.com', '$2a$11$e8Z...hashed', 'customer', '+91 98765 43210'),
('adm-001', 'Master Sommelier', 'admin@theteastory.in', '$2a$11$e8Z...hashedAdmin', 'admin', '+91 99999 00000');

INSERT INTO addresses (id, user_id, recipient_name, street, city, state, pincode, phone, is_default) VALUES
('addr-001', 'usr-001', 'Priya Sharma', '402, Green Glen Layout, Bellandur', 'Bengaluru', 'Karnataka', '560103', '+91 98765 43210', TRUE);

-- 3. SEED COUPONS
INSERT INTO coupons (id, code, discount_type, value, min_spend, active) VALUES
('c-01', 'LUXURY10', 'percentage', 10.00, 1000.00, TRUE),
('c-02', 'WELCOME500', 'fixed', 500.00, 2500.00, TRUE);
