-- SaaS Data Analytics Sénior: Database Schema (Multitenant)

-- 1. Create Tenants (Companies) Table
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT UNIQUE,
    main_currency CHAR(3) DEFAULT 'EUR',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Users Table (Linked to Tenants)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id),
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'analyst')) DEFAULT 'analyst',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Invoices Table (Main Data Storage)
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id),
    uploaded_by UUID REFERENCES auth.users(id),
    file_url TEXT,
    vendor_name TEXT,
    invoice_date DATE,
    total_amount DECIMAL(15, 2),
    currency CHAR(3) DEFAULT 'EUR',
    invoice_number TEXT,
    concept TEXT,
    status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error', 'requires_review')) DEFAULT 'uploaded',
    raw_data JSONB, -- Storing original LLM output
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row-Level Security (RLS) for Multitenancy
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- 5. Define Policies (Example: Users can only see data from their tenant)
-- (Note: These are simplified; usually we'd use current_setting('request.jwt.claims.tenant_id'))
-- Policies would be added here to filter by tenant_id automatically.
