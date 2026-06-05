-- MAXX Energy Services - Multi-Category Migration
-- Run this in the Supabase SQL Editor AFTER schema.sql and add-product-items.sql.
-- Lets a single sub-product (product) appear under multiple categories.
-- Safe to re-run (idempotent).

-- ============================================
-- JOIN TABLE: sub_products <-> products (categories)
-- ============================================
create table if not exists sub_product_categories (
  sub_product_id uuid references sub_products(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  primary key (sub_product_id, product_id)
);

-- ============================================
-- RLS POLICIES (mirror sub_products: public read, admin full CRUD)
-- ============================================
alter table sub_product_categories enable row level security;

drop policy if exists "Public can read sub_product_categories" on sub_product_categories;
create policy "Public can read sub_product_categories" on sub_product_categories
  for select using (true);

drop policy if exists "Admins manage sub_product_categories" on sub_product_categories;
create policy "Admins manage sub_product_categories" on sub_product_categories
  for all to authenticated using (true) with check (true);

-- ============================================
-- BACKFILL: every existing sub-product belongs to its current home category
-- ============================================
insert into sub_product_categories (sub_product_id, product_id)
select id, product_id from sub_products
on conflict do nothing;

-- ============================================
-- DATA CLEANUP: consolidate the duplicate "Spill Kits"
-- Canonical = the spill-kits row under the "spill-control" product
--             (the one that has product_items / the full kit table).
-- Removes the empty Containment Solutions "spill-kits" placeholder, then
-- tags the canonical Spill Kits to the containment-solutions category.
-- ============================================
do $$
declare
  containment_id  uuid;
  spillcontrol_id uuid;
  canonical_sk    uuid;
  empty_sk        uuid;
begin
  select id into containment_id  from products where slug = 'containment-solutions';
  select id into spillcontrol_id from products where slug = 'spill-control';

  -- Only proceed if both categories exist
  if containment_id is null or spillcontrol_id is null then
    raise notice 'Skipping Spill Kits consolidation: containment-solutions or spill-control product not found.';
    return;
  end if;

  -- Canonical Spill Kits = the one whose home category is spill-control
  select id into canonical_sk
  from sub_products
  where slug = 'spill-kits' and product_id = spillcontrol_id
  limit 1;

  -- The placeholder Spill Kits whose home category is containment-solutions
  select id into empty_sk
  from sub_products
  where slug = 'spill-kits' and product_id = containment_id
  limit 1;

  if canonical_sk is null then
    raise notice 'Skipping Spill Kits consolidation: no canonical (spill-control) Spill Kits found.';
    return;
  end if;

  -- Delete the empty containment placeholder ONLY if it exists, is distinct
  -- from the canonical record, and carries no product_items.
  if empty_sk is not null
     and empty_sk <> canonical_sk
     and not exists (select 1 from product_items where sub_product_id = empty_sk) then
    delete from sub_products where id = empty_sk;  -- cascades to its join rows
  end if;

  -- Tag the canonical Spill Kits to the containment-solutions category
  insert into sub_product_categories (sub_product_id, product_id)
  values (canonical_sk, containment_id)
  on conflict do nothing;
end $$;
