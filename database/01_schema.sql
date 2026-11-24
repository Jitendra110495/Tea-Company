-- ====================================================================
-- THE TEA STORY - PostgreSQL Database DDL Schema Script v1.0
-- Target Engine: PostgreSQL 14+
-- Owner: Product & Engineering Team
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if re-initialising
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- --------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Black Tea', 'Green Tea', 'Herbal Tea', 'White Tea', 'Oolong Tea', 'Wellness Blend'
    collection VARCHAR(50) NOT NULL, -- 'Signature', 'Single Origin', 'Wellness', 'Royal Reserve'
    price DECIMAL(10, 2) NOT NULL, -- Base price in INR
    original_price DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    image_url TEXT NOT NULL,
    gallery TEXT[], -- Array of image URLs
    description TEXT NOT NULL,
    origin VARCHAR(100) NOT NULL,
    elevation VARCHAR(50) NOT NULL,
    flush VARCHAR(50) NOT NULL,
    ingredients TEXT[] NOT NULL,
    taste_notes TEXT[] NOT NULL,
    aroma TEXT NOT NULL,
    caffeine VARCHAR(20) NOT NULL, -- 'None', 'Low', 'Medium', 'High'
    benefits TEXT[] NOT NULL,
    water_temp VARCHAR(20) NOT NULL,
    steep_time VARCHAR(50) NOT NULL,
    timer_seconds INT NOT NULL DEFAULT 180,
    serving_size VARCHAR(50) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 50,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 2. USERS TABLE
-- --------------------------------------------------------------------
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'admin'
    phone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 3. ADDRESSES TABLE
-- --------------------------------------------------------------------
CREATE TABLE addresses (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    recipient_name VARCHAR(150) NOT NULL,
    street TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE
);

-- --------------------------------------------------------------------
-- 4. ORDERS TABLE
-- --------------------------------------------------------------------
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- e.g. TS-2026-8891
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    tax DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Processing', -- 'Processing', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'
    shipping_address_json JSONB NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_id VARCHAR(100) NOT NULL,
    tracking_number VARCHAR(100),
    courier_partner VARCHAR(100) DEFAULT 'Shiprocket Express',
    estimated_delivery DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 5. ORDER ITEMS TABLE
-- --------------------------------------------------------------------
CREATE TABLE order_items (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    tea_format VARCHAR(30) NOT NULL, -- 'Loose Leaf', 'Tea Bags'
    sweetener VARCHAR(30) NOT NULL, -- 'Unsweetened', 'Natural Stevia'
    package_size VARCHAR(50) NOT NULL, -- '50g', '100g', '250g', '500g', etc.
    custom_engraving VARCHAR(100),
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- --------------------------------------------------------------------
-- 6. COUPONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE coupons (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed'
    value DECIMAL(10, 2) NOT NULL,
    min_spend DECIMAL(10, 2) DEFAULT 0.00,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 7. REVIEWS TABLE
-- --------------------------------------------------------------------
CREATE TABLE reviews (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    author_name VARCHAR(150) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    headline VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- --------------------------------------------------------------------
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_collection ON products(collection);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_coupons_code ON coupons(code);
