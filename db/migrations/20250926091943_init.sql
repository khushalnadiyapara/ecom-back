-- migrate:up
-- ========================================
-- Event Management System - PostgreSQL Schema (UUIDs)
-- ========================================

CREATE TYPE PAYMENT_TYPE AS ENUM ('credit', 'debit');
CREATE TYPE PAYMENT_METHOD AS ENUM ('cash', 'bank', 'cheque', 'other');
CREATE TYPE VENDOR_TYPE AS ENUM ('regular', 'extra');


-- =============================
-- Company Profile
-- =============================
CREATE TABLE company_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo TEXT,
    description TEXT,
    social_media_links JSONB,
    address JSONB,
    static_data JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VENUES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_venue_name UNIQUE (name)
);

-- =============================
-- Dashboard Users (Admins/Partners only)
-- =============================

CREATE TABLE PERMISSIONS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USERS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_email UNIQUE (email),
    CONSTRAINT uk_user_phone_number UNIQUE (phone_number)
);

CREATE TABLE USER_PERMISSIONS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_permissions_user FOREIGN KEY (user_id) REFERENCES USERS(id),
    CONSTRAINT fk_user_permissions_permission FOREIGN KEY (permission_id) REFERENCES PERMISSIONS(id)
);

CREATE TABLE SESSIONS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address TEXT NOT NULL,
    device_info JSONB,
    permissions JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- =============================
-- Clients (Event Customers, Login via App)
-- =============================
CREATE TABLE CLIENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    address TEXT,
    profile_image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_client_phone_number UNIQUE (phone_number)
);

CREATE TABLE CLIENT_DOCUMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_client_document_client FOREIGN KEY (client_id) REFERENCES CLIENTS(id)
);

-- =============================
-- Vendors (Suppliers, Login via App)
-- =============================
CREATE TABLE VENDOR_CATEGORIES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VENDORS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_category_id UUID,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    amount NUMERIC(18,2),
    opening_balance NUMERIC(18,2),
    balance NUMERIC(18,2),
    profile_image TEXT,
    description TEXT,
    type VENDOR_TYPE DEFAULT 'regular',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vendor_category FOREIGN KEY (vendor_category_id) REFERENCES VENDOR_CATEGORIES(id),
    CONSTRAINT uk_vendor_phone_number UNIQUE (phone_number),
    CONSTRAINT uk_vendor_email UNIQUE (email)
);


-- =============================
-- Employees (Internal Staff, NO Dashboard Login)
-- =============================
CREATE TABLE EMPLOYEES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    designation TEXT,
    phone_number TEXT,
    salary NUMERIC(18,2),
    profile_image TEXT,
    opening_balance NUMERIC(18,2),
    balance NUMERIC(18,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_employee_phone_number UNIQUE (phone_number)
);

CREATE TABLE EMPLOYEE_DOCUMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_document_employee FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(id)
);

-- =============================
-- Events & Categories
-- =============================
CREATE TABLE EVENT_CATEGORIES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE EVENT_SUB_CATEGORIES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_category_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_sub_category_event_category FOREIGN KEY (event_category_id) REFERENCES EVENT_CATEGORIES(id)
);

CREATE TABLE EVENT_CATEGORY_DOCUMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_category_id UUID NOT NULL,
    event_sub_category_id UUID,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_category_document_event_category FOREIGN KEY (event_category_id) REFERENCES EVENT_CATEGORIES(id),
    CONSTRAINT fk_event_category_document_event_sub_category FOREIGN KEY (event_sub_category_id) REFERENCES EVENT_SUB_CATEGORIES(id)
);
CREATE TABLE PACKAGES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    event_category_id UUID NOT NULL,
    venue_id UUID,
    amount NUMERIC(18,2),
    info JSONB,
    charges JSONB, -- [{name: sub_category_name, amount: number}]
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_package_event_category FOREIGN KEY (event_category_id) REFERENCES EVENT_CATEGORIES(id),
    CONSTRAINT fk_package_venue FOREIGN KEY (venue_id) REFERENCES VENUES(id)
);

CREATE TABLE EVENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    event_category_id UUID NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    name TEXT NOT NULL,
    venue_id UUID NOT NULL,
    description TEXT,
    amount NUMERIC(18,2),
    advance_amount NUMERIC(18,2),
    paid_amount NUMERIC(18,2),
    info JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    charges JSONB, -- [{name: sub_category_name, amount: number}]
    signature TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_event_client FOREIGN KEY (client_id) REFERENCES CLIENTS(id),
    CONSTRAINT fk_event_category FOREIGN KEY (event_category_id) REFERENCES EVENT_CATEGORIES(id),
    CONSTRAINT fk_event_venue FOREIGN KEY (venue_id) REFERENCES VENUES(id),
    CONSTRAINT uk_event_date_place UNIQUE (date, venue_id,event_category_id)
);


-- =============================
-- Event Vendors
-- =============================  

CREATE TABLE EVENT_VENDORS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    actual_payment NUMERIC(18,2),
    client_payment NUMERIC(18,2),  
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_vendors_event FOREIGN KEY (event_id) REFERENCES EVENTS(id),
    CONSTRAINT fk_event_vendors_vendor FOREIGN KEY (vendor_id) REFERENCES VENDORS(id)
);


-- =============================
-- Event References Documents
-- =============================  

CREATE TABLE EVENT_REFERENCES_DOCUMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_references_documents_event FOREIGN KEY (event_id) REFERENCES EVENTS(id)
);


-- =============================
-- Expenses
-- =============================
CREATE TABLE EXPENSE_CATEGORIES  (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE EXPENSES (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expanse_category_id UUID NOT NULL,
    event_id UUID,
    vendor_id UUID ,
    employee_id UUID ,
    venue_id UUID ,
    amount NUMERIC(18,2),
    remarks TEXT,
    date TIMESTAMPTZ NOT NULL,
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expenses_event FOREIGN KEY (event_id) REFERENCES EVENTS(id),
    CONSTRAINT fk_expenses_expanse_category FOREIGN KEY (expanse_category_id) REFERENCES EXPENSE_CATEGORIES(id),
    CONSTRAINT fk_expenses_vendor FOREIGN KEY (vendor_id) REFERENCES VENDORS(id),
    CONSTRAINT fk_expenses_employee FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(id),
    CONSTRAINT fk_expenses_venue FOREIGN KEY (venue_id) REFERENCES VENUES(id)
);


-- =============================
-- Event Payments
-- =============================

CREATE TABLE EVENT_PAYMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    amount NUMERIC(18,2) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    type PAYMENT_TYPE DEFAULT 'credit',
    payment_method PAYMENT_METHOD DEFAULT 'cash',
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_payments_event FOREIGN KEY (event_id) REFERENCES EVENTS(id)
);

CREATE TABLE EMPLOYEE_PAYMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    amount NUMERIC(18,2) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    type PAYMENT_TYPE DEFAULT 'credit',
    payment_method PAYMENT_METHOD DEFAULT 'cash',
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_payments_employee FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(id)
);

CREATE TABLE VENDOR_PAYMENTS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    amount NUMERIC(18,2) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    type PAYMENT_TYPE DEFAULT 'credit',
    payment_method PAYMENT_METHOD DEFAULT 'cash',
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vendor_payments_vendor FOREIGN KEY (vendor_id) REFERENCES VENDORS(id)
);

-- =============================
-- Reminders
-- =============================
CREATE TABLE REMINDERS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    vendor_id UUID,
    event_id UUID,
    title TEXT,
    description TEXT,
    reminder_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reminders_client FOREIGN KEY (client_id) REFERENCES CLIENTS(id),
    CONSTRAINT fk_reminders_vendor FOREIGN KEY (vendor_id) REFERENCES VENDORS(id),
    CONSTRAINT fk_reminders_event FOREIGN KEY (event_id) REFERENCES EVENTS(id)
);

-- migrate:down
DROP TABLE IF EXISTS company_profile;
DROP TABLE IF EXISTS VENUES;
DROP TABLE IF EXISTS PERMISSIONS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS USER_PERMISSIONS;
DROP TABLE IF EXISTS SESSIONS;
DROP TABLE IF EXISTS CLIENTS;
DROP TABLE IF EXISTS CLIENT_DOCUMENTS;
DROP TABLE IF EXISTS VENDOR_CATEGORIES;
DROP TABLE IF EXISTS VENDORS;
DROP TABLE IF EXISTS EMPLOYEES;
DROP TABLE IF EXISTS EMPLOYEE_DOCUMENTS;
DROP TABLE IF EXISTS EVENT_CATEGORIES;
DROP TABLE IF EXISTS EVENT_SUB_CATEGORIES;
DROP TABLE IF EXISTS EVENT_CATEGORY_DOCUMENTS;
DROP TABLE IF EXISTS PACKAGES;
DROP TABLE IF EXISTS EVENTS;
DROP TABLE IF EXISTS EVENT_VENDORS;
DROP TABLE IF EXISTS EVENT_REFERENCES_DOCUMENTS;
DROP TABLE IF EXISTS EXPENSE_CATEGORIES;
DROP TABLE IF EXISTS EXPENSES;
DROP TABLE IF EXISTS EVENT_PAYMENTS;
DROP TABLE IF EXISTS EMPLOYEE_PAYMENTS;
DROP TABLE IF EXISTS VENDOR_PAYMENTS;
DROP TABLE IF EXISTS REMINDERS;
DROP TYPE IF EXISTS PAYMENT_TYPE;
DROP TYPE IF EXISTS PAYMENT_METHOD;
DROP TYPE IF EXISTS VENDOR_TYPE;


