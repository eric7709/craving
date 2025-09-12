create table public.tables (
  id uuid not null default gen_random_uuid (),
  name text not null,
  table_number integer not null,
  capacity integer not null,
  is_available boolean not null default true,
  waiter_id uuid null,
  url text null,
  created_at timestamp with time zone not null default now(),
  constraint tables_pkey primary key (id),
  constraint tables_table_number_key unique (table_number),
  constraint unique_url unique (url),
  constraint tables_waiter_id_fkey foreign KEY (waiter_id) references employees (id) on delete set null
) TABLESPACE pg_default;



create table public.orders (
  id uuid not null default gen_random_uuid (),
  table_id uuid null,
  waiter_id uuid null,
  customer_id uuid null,
  items jsonb not null,
  total double precision not null,
  status character varying not null default 'pending'::character varying,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  invoice_number text null,
  discount boolean null default false,
  payment_method text null,
  constraint orders_pkey primary key (id),
  constraint orders_invoice_number_key unique (invoice_number),
  constraint orders_customer_id_fkey foreign KEY (customer_id) references customers (id),
  constraint orders_table_id_fkey foreign KEY (table_id) references tables (id) on delete set null,
  constraint orders_waiter_id_fkey foreign KEY (waiter_id) references employees (id) on delete set null
) TABLESPACE pg_default;



create table public.menu_items (
  id uuid not null default gen_random_uuid (),
  name character varying not null,
  price numeric(10, 2) not null,
  description text not null,
  image_url character varying null,
  is_available boolean not null default true,
  created_at timestamp with time zone not null default now(),
  category_id uuid null,
  ingredients text[] null,
  constraint menu_items_pkey primary key (id),
  constraint menu_items_category_id_fkey foreign KEY (category_id) references categories (id) on delete set null
) TABLESPACE pg_default;


create table public.employees (
  id uuid not null default gen_random_uuid (),
  firstname character varying(100) null,
  lastname character varying(100) null,
  email character varying(255) not null,
  phone_number character varying(20) null,
  gender character varying(10) null,
  role character varying(50) null,
  is_active boolean null default true,
  created_at timestamp with time zone null default now(),
  registered_by text null,
  auth_user_id uuid null,
  constraint employees_pkey primary key (id),
  constraint employees_email_key unique (email),
  constraint employees_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.customers (
  id uuid not null default gen_random_uuid (),
  name text not null,
  phone_number text null,
  email text not null,
  created_at timestamp with time zone null default now(),
  discount bigint null default '0'::bigint,
  discount_type text null default 'null'::text,
  discount_expiry date null,
  constraint customers_pkey primary key (id),
  constraint customers_email_key unique (email)
) TABLESPACE pg_default;

create table public.categories (
  id uuid not null default gen_random_uuid (),
  name character varying(50) not null,
  created_at timestamp with time zone null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_name_key unique (name)
) TABLESPACE pg_default;


  items jsonb not null = [
    {
        id: string;
        name: string;
        takeOut: boolean;
        price: number;
        quantity: number;
    }
  ]