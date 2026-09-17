-- MAXX Energy Services - Catalog Brands (white-label flip catalogs)
--
-- SAFE / ADDITIVE — drops nothing. Run in the Supabase SQL Editor.
-- Idempotent: re-running will not create duplicates or overwrite edits.
--
-- What it does:
--   1. Creates `catalog_brands`: one row per catalog "brand". MAXX itself is
--      the row with slug 'maxx'; every distributor is another row. The catalog
--      hub renders each brand's pages from this row (logo, contact, links,
--      optional colors) and serves the result at <slug>.<hub domain> or at the
--      brand's custom_domain.
--   2. RLS: anyone can read PUBLISHED brands (the hub uses the anon key);
--      signed-in admins can do everything (same model as `locations`).
--   3. Seeds the 'maxx' row if it does not exist yet.
--
-- Storage (create in the Supabase dashboard, same as the "uploads" bucket):
--   * "uploads"  (exists)  — brand logos are uploaded here by the admin form,
--                            under catalog-brands/<slug>/.
--   * "catalogs" (NEW, public) — the export script writes each build to
--                            catalogs/<slug>/<build id>/page-NN.webp, catalog.pdf,
--                            manifest.json, nav.json, links.json using the
--                            service-role key. Public read, no public write.
--
-- Columns written only by the export script (service role), never by the form:
--   current_build, last_built_at, build_status.

create extension if not exists "uuid-ossp";

create table if not exists catalog_brands (
  id uuid default uuid_generate_v4() primary key,

  -- Addressing
  slug text not null unique
    check (slug ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$' and length(slug) <= 63),
  custom_domain text unique,            -- e.g. catalog.acmesupply.com (optional)

  -- Naming
  display_name text not null,           -- "Acme Industrial Supply"
  short_name text,                      -- "Acme" — used inside sentences
  legal_name text,                      -- "Acme Industrial Supply, Inc."
  division_line text,                   -- small line under the logo, optional

  -- Contact printed on every page
  contact_name text,
  contact_email text,
  contact_phone text,

  -- Links (QR codes and buttons). Null product_url falls back to the brand's
  -- contact page on the hub.
  website_url text,
  product_url text,
  box_parts_url text,

  -- Art. logo_url is the full logo for DARK backgrounds (cover, openers);
  -- mark_url is the small square mark for the page rail.
  logo_url text,
  mark_url text,

  -- Optional palette override: {"accent": "#00afc7", "navy": "#001029"}
  colors jsonb not null default '{}'::jsonb,

  include_box_parts boolean not null default false,
  published boolean not null default false,

  -- Build pointer (export script only)
  current_build text,
  last_built_at timestamptz,
  build_status text not null default 'never',  -- never | queued | building | ok | failed

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalog_brands_custom_domain_idx
  on catalog_brands (custom_domain) where custom_domain is not null;

alter table catalog_brands enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'catalog_brands' and policyname = 'Public can read published catalog brands') then
    create policy "Public can read published catalog brands" on catalog_brands
      for select using (published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'catalog_brands' and policyname = 'Admins can read all catalog brands') then
    create policy "Admins can read all catalog brands" on catalog_brands
      for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'catalog_brands' and policyname = 'Admins can insert catalog brands') then
    create policy "Admins can insert catalog brands" on catalog_brands
      for insert to authenticated with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'catalog_brands' and policyname = 'Admins can update catalog brands') then
    create policy "Admins can update catalog brands" on catalog_brands
      for update to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'catalog_brands' and policyname = 'Admins can delete catalog brands') then
    create policy "Admins can delete catalog brands" on catalog_brands
      for delete to authenticated using (true);
  end if;
end $$;

-- Seed MAXX as the reference brand. Logos are left null on purpose: the hub
-- falls back to its bundled MAXX art for this slug until staff upload files.
insert into catalog_brands (
  slug, display_name, short_name, legal_name, division_line,
  contact_name, contact_email, contact_phone,
  website_url, product_url, box_parts_url,
  include_box_parts, published
) values (
  'maxx',
  'MAXX First Response Solutions',
  'MAXX',
  'MAXX Energy Services LLC',
  'First Response Solutions Division',
  'Britt',
  'britt@maxxenergysvcs.com',
  '806.474.3248',
  'https://www.maxxenergysvcs.com',
  'https://www.maxxenergysvcs.com/products/spill-control',
  'https://www.maxxenergysvcs.com/products/box-parts',
  true,
  true
)
on conflict (slug) do nothing;
