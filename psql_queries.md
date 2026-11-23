# PostgreSQL Assessment

## Overview

This document contains the database schema and the SQL solutions implemented in the NestJS application. PostgreSQL objects use the `dev` schema.

## Prerequisites

- Node.js and npm
- PostgreSQL 18
- PostgreSQL database named `new_mobitech`

## Database Setup

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<username>:<password>@127.0.0.1:5432/new_mobitech
```

Do not commit database credentials or `.env` files to source control.

## Run the Application

```bash
npm install
npm run start:dev
```

- API base URL: `http://localhost:3000`
- Swagger documentation: `http://localhost:3000/api`

## Table Definitions

### Categories

```sql
CREATE TABLE dev.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Customers

```sql
CREATE TABLE dev.customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(20)
);
```

### Products

```sql
CREATE TABLE dev.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER REFERENCES dev.categories(id),
    price NUMERIC(10,2),
    stock INTEGER
);
```

### Orders

```sql
CREATE TYPE dev.order_status AS ENUM (
    'PENDING',
    'PAID',
    'CANCELLED'
);

CREATE TABLE dev.orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    customer_id INTEGER REFERENCES dev.customers(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(20),
    total_amount NUMERIC(10,2),
    status dev.order_status
);
```

## SQL Solutions

### 1. Get Categories and Product Counts

```sql
SELECT
    c.id AS category_id,
    c.name AS category_name,
    COUNT(p.id) AS no_of_products
FROM dev.categories c
LEFT JOIN dev.products p
    ON p.category_id = c.id
GROUP BY c.id, c.name;
```

### 2. Delete Categories Without Products

```sql
WITH category_count AS (
    SELECT
        c.id,
        COUNT(p.id) AS no_of_products
    FROM dev.categories c
    LEFT JOIN dev.products p
        ON p.category_id = c.id
    GROUP BY c.id
)
DELETE FROM dev.categories
WHERE id IN (
    SELECT id
    FROM category_count
    WHERE no_of_products = 0
)
RETURNING *;
```

### 3. Fetch Never-Ordered Products

Not implemented. The provided tables do not contain a product-to-order relationship.

### 4. Get Customers and Order Counts

```sql
SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    COUNT(o.id) AS no_of_orders
FROM dev.customers c
LEFT JOIN dev.orders o
    ON o.customer_id = c.id
GROUP BY c.id, c.name;
```

### 5. Search Customers by Name

```sql
SELECT
    name,
    phone,
    email
FROM dev.customers
WHERE name = $1;
```

### 6. Get Orders for a Customer

```sql
SELECT *
FROM dev.orders
WHERE customer_id = $1;
```

### 7. Get Pending Orders Older Than Seven Days

```sql
SELECT *
FROM dev.orders
WHERE status = 'PENDING'
  AND created_at < NOW() - INTERVAL '7 days';
```

### 8. List Products Ordered in a Date Range

Not implemented. A product-to-order mapping or order-items table is required.

### 9. Find the Most-Ordered Product in the Last 30 Days

Not implemented. A product-to-order mapping or order-items table is required.

### 10. Cancel an Order and Restore Product Stock

Not implemented. Order-line and stock information is required to restore products correctly.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/emp/fetchAllProductsWithCategory` | List categories and product counts |
| `DELETE` | `/emp/withnoproducts` | Delete categories with no products |
| `GET` | `/emp/orders/customers/:id` | List orders for a customer |
| `GET` | `/emp/pending-orders` | List pending orders older than seven days |
| `GET` | `/emp/customers-orderss-count` | List customers and order counts |
| `GET` | `/emp/customer-details?name=<name>` | Search for customer contact details |
