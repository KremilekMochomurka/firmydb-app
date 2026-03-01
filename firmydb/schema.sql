-- FirmyDB.cz - Database Schema
-- Czech B2B Sales Intelligence Platform

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ico VARCHAR(8) UNIQUE NOT NULL, -- IČO (Czech company ID)
    name VARCHAR(255) NOT NULL,
    legal_form VARCHAR(100), -- s.r.o., a.s., etc.
    industry VARCHAR(100),
    
    -- Contact info
    email VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(255),
    
    -- Address
    street VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    region VARCHAR(100),
    
    -- Company details
    employees_count VARCHAR(50), -- "1-10", "11-50", etc.
    founded_year INTEGER,
    revenue_range VARCHAR(50), -- estimated
    
    -- Tech stack (JSON array)
    tech_stack JSONB DEFAULT '[]',
    
    -- Social & online presence
    linkedin_url VARCHAR(255),
    facebook_url VARCHAR(255),
    
    -- Data quality
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    last_updated TIMESTAMP DEFAULT NOW(),
    data_quality_score INTEGER, -- 0-100
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(255),
    position VARCHAR(255),
    
    -- Contact info
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url VARCHAR(255),
    
    -- Verification
    email_verified BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- from auth system
    
    -- Export details
    company_ids UUID[] NOT NULL,
    filters JSONB, -- what filters were used
    export_format VARCHAR(20), -- csv, json
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- Subscription
    subscription_tier VARCHAR(50), -- startup, growth, pro
    exports_used INTEGER DEFAULT 0,
    exports_limit INTEGER DEFAULT 100,
    
    -- Payment
    stripe_customer_id VARCHAR(255),
    subscription_status VARCHAR(50), -- active, cancelled, expired
    current_period_end TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_companies_ico ON companies(ico);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_city ON companies(city);
CREATE INDEX idx_companies_employees ON companies(employees_count);
CREATE INDEX idx_companies_email_verified ON companies(email_verified);
CREATE INDEX idx_contacts_company ON contacts(company_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_users_email ON users(email);

-- Full-text search
CREATE INDEX idx_companies_search ON companies USING gin(to_tsvector('czech', name || ' ' || COALESCE(industry, '')));
