-- MAXX Energy Services - Supabase Database Schema
-- Run this in your Supabase SQL Editor to create all tables
-- Safe to re-run: drops existing tables first

-- Drop existing tables (in dependency order)
drop table if exists contact_submissions cascade;
drop table if exists project_images cascade;
drop table if exists sub_products cascade;
drop table if exists products cascade;
drop table if exists projects cascade;
drop table if exists markets cascade;
drop table if exists shale_plays cascade;
drop table if exists news_articles cascade;
drop table if exists job_postings cascade;
drop table if exists locations cascade;
drop table if exists team_members cascade;
drop table if exists approved_emails cascade;

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- APPROVED EMAILS (Admin Access Control)
-- ============================================
create table if not exists approved_emails (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null
);

-- ============================================
-- TEAM MEMBERS
-- ============================================
create table if not exists team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text not null,
  bio text,
  photo_url text,
  email text,
  phone text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PRODUCTS (replaces Sniper's "services")
-- ============================================
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  tagline text not null,
  description jsonb,
  icon text,
  hero_image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SUB-PRODUCTS (replaces "sub_services")
-- ============================================
create table if not exists sub_products (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description jsonb,
  icon text,
  image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROJECTS (Portfolio / Case Studies)
-- ============================================
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  client text not null,
  location text,
  description jsonb,
  excerpt text not null,
  featured_image text,
  products_used text[] default '{}',
  market text,
  featured boolean default false,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROJECT IMAGES
-- ============================================
create table if not exists project_images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  image_url text not null,
  caption text,
  display_order integer default 0
);

-- ============================================
-- MARKETS
-- ============================================
create table if not exists markets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description jsonb,
  icon_url text,
  hero_image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SHALE PLAYS (Strategic Basins)
-- ============================================
create table if not exists shale_plays (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description jsonb,
  region text,
  hero_image_url text,
  lat decimal,
  lng decimal,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- NEWS ARTICLES (combined News & Events)
-- ============================================
create table if not exists news_articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  type text default 'news' check (type in ('news', 'event')),
  excerpt text,
  content jsonb,
  featured_image text,
  event_date timestamptz,
  event_location text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- JOB POSTINGS
-- ============================================
create table if not exists job_postings (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  department text,
  location text default 'Godley, TX',
  employment_type text default 'Full-time' check (employment_type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  description jsonb,
  requirements jsonb,
  salary_range text,
  published boolean default false,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- LOCATIONS
-- ============================================
create table if not exists locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  phone text,
  email text,
  is_headquarters boolean default false,
  lat decimal,
  lng decimal,
  published boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
create table if not exists contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table approved_emails enable row level security;
alter table team_members enable row level security;
alter table products enable row level security;
alter table sub_products enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table markets enable row level security;
alter table shale_plays enable row level security;
alter table news_articles enable row level security;
alter table job_postings enable row level security;
alter table locations enable row level security;
alter table contact_submissions enable row level security;

-- Public read access for published content
create policy "Public can read published team members" on team_members
  for select using (published = true);

create policy "Public can read published products" on products
  for select using (published = true);

create policy "Public can read published sub-products" on sub_products
  for select using (published = true);

create policy "Public can read published projects" on projects
  for select using (published = true);

create policy "Public can read project images" on project_images
  for select using (true);

create policy "Public can read published markets" on markets
  for select using (published = true);

create policy "Public can read published shale plays" on shale_plays
  for select using (published = true);

create policy "Public can read published news" on news_articles
  for select using (published = true);

create policy "Public can read published jobs" on job_postings
  for select using (published = true);

create policy "Public can read published locations" on locations
  for select using (published = true);

-- Contact submissions - public can insert (submit form)
create policy "Public can submit contact form" on contact_submissions
  for insert with check (true);

-- Authenticated users (admin) can do everything
-- Team Members
create policy "Admins can read all team members" on team_members
  for select to authenticated using (true);

create policy "Admins can insert team members" on team_members
  for insert to authenticated with check (true);

create policy "Admins can update team members" on team_members
  for update to authenticated using (true);

create policy "Admins can delete team members" on team_members
  for delete to authenticated using (true);

-- Products
create policy "Admins can read all products" on products
  for select to authenticated using (true);

create policy "Admins can insert products" on products
  for insert to authenticated with check (true);

create policy "Admins can update products" on products
  for update to authenticated using (true);

create policy "Admins can delete products" on products
  for delete to authenticated using (true);

-- Sub-Products
create policy "Admins can read all sub-products" on sub_products
  for select to authenticated using (true);

create policy "Admins can insert sub-products" on sub_products
  for insert to authenticated with check (true);

create policy "Admins can update sub-products" on sub_products
  for update to authenticated using (true);

create policy "Admins can delete sub-products" on sub_products
  for delete to authenticated using (true);

-- Projects
create policy "Admins can read all projects" on projects
  for select to authenticated using (true);

create policy "Admins can insert projects" on projects
  for insert to authenticated with check (true);

create policy "Admins can update projects" on projects
  for update to authenticated using (true);

create policy "Admins can delete projects" on projects
  for delete to authenticated using (true);

-- Project Images
create policy "Admins can manage project images" on project_images
  for all to authenticated using (true);

-- Markets
create policy "Admins can read all markets" on markets
  for select to authenticated using (true);

create policy "Admins can insert markets" on markets
  for insert to authenticated with check (true);

create policy "Admins can update markets" on markets
  for update to authenticated using (true);

create policy "Admins can delete markets" on markets
  for delete to authenticated using (true);

-- Shale Plays
create policy "Admins can read all shale plays" on shale_plays
  for select to authenticated using (true);

create policy "Admins can insert shale plays" on shale_plays
  for insert to authenticated with check (true);

create policy "Admins can update shale plays" on shale_plays
  for update to authenticated using (true);

create policy "Admins can delete shale plays" on shale_plays
  for delete to authenticated using (true);

-- News Articles
create policy "Admins can read all news" on news_articles
  for select to authenticated using (true);

create policy "Admins can insert news" on news_articles
  for insert to authenticated with check (true);

create policy "Admins can update news" on news_articles
  for update to authenticated using (true);

create policy "Admins can delete news" on news_articles
  for delete to authenticated using (true);

-- Job Postings
create policy "Admins can read all jobs" on job_postings
  for select to authenticated using (true);

create policy "Admins can insert jobs" on job_postings
  for insert to authenticated with check (true);

create policy "Admins can update jobs" on job_postings
  for update to authenticated using (true);

create policy "Admins can delete jobs" on job_postings
  for delete to authenticated using (true);

-- Locations
create policy "Admins can read all locations" on locations
  for select to authenticated using (true);

create policy "Admins can insert locations" on locations
  for insert to authenticated with check (true);

create policy "Admins can update locations" on locations
  for update to authenticated using (true);

create policy "Admins can delete locations" on locations
  for delete to authenticated using (true);

-- Contact Submissions - admin can read, update, delete
create policy "Admins can read contact submissions" on contact_submissions
  for select to authenticated using (true);

create policy "Admins can update contact submissions" on contact_submissions
  for update to authenticated using (true);

create policy "Admins can delete contact submissions" on contact_submissions
  for delete to authenticated using (true);

-- Approved emails - only authenticated can read
create policy "Authenticated can read approved emails" on approved_emails
  for select to authenticated using (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create these in the Supabase dashboard:
-- 1. "uploads" bucket (public) - for images, documents
-- 2. Set public access policy on the bucket

-- ============================================
-- SEED DATA
-- ============================================

-- Team Members
insert into team_members (name, title, email, phone, display_order, published) values
  ('Elizabeth Carmichael', 'CEO', 'elizabeth@maxxenergysvcs.com', '806-474-3244', 1, true),
  ('Kevin Schuldes', 'President', 'kevin@maxxenergysvcs.com', '832-279-1226', 2, true),
  ('Bryan Stubblefield', 'Chief Revenue Officer', 'bryan@maxxenergysvcs.com', '806-928-1926', 3, true),
  ('Britt Carmichael', 'Executive Vice President', 'Britt@maxxenergysvcs.com', '806-474-3248', 4, true),
  ('Brett Stroope', 'VP of Agriculture', 'brett@maxxenergysvcs.com', '806-674-4116', 5, true),
  ('Tatum Hurford', 'VP of National Sales', 'Tatum@maxxenergysvcs.com', '432-614-7062', 6, true),
  ('Jennifer Upchurch', 'Executive Administrator', 'AP@maxxenergysvcs.com', '817-376-7213', 7, true);

-- Products
insert into products (name, slug, tagline, description, icon, display_order, published) values
  ('Chemical Solutions', 'chemical-solutions', 'Revolutionary Oilfield Chemical Formulations', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"MAXX Energy Services develops revolutionary oilfield chemical formulations that deliver permanent, cost-effective solutions. Our comprehensive chemical product line serves fracturing, production, drilling, coiled tubing, water treatment, completions, agricultural, industrial, and municipal applications."}]}]}', 'FlaskConical', 1, true),
  ('Containment Solutions', 'containment-solutions', 'Industry-Leading Spill Containment & Environmental Protection', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"MAXX Energy Services provides industry-leading containment solutions including secondary spill containment berms, pond liners, dust control, and noise control products. Our containment products feature high chemical resistance and are designed for demanding industrial environments."}]}]}', 'Shield', 2, true);

-- Sub-Products for Chemical Solutions
insert into sub_products (product_id, name, slug, description, icon, display_order, published)
select p.id, s.name, s.slug, s.description::jsonb, s.icon, s.display_order, true
from products p
cross join (values
  ('Acid Chemicals', 'acid-chemicals', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ACI corrosion inhibitors (ACI-120, ACI-130), iron control products, and anti-sludge solutions for acidizing operations."}]}]}', 'Beaker', 1),
  ('Frac Chemicals', 'frac-chemicals', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Complete fracturing chemical solutions including diverting agents, breaker systems, clay stabilizers, crosslinkers, friction reducers, scale inhibitors, and buffer solutions."}]}]}', 'Zap', 2),
  ('Surfactants', 'surfactants', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Specialized surfactant formulations including FS-LST-100, FS-112, FS-118, and FS-RDM for enhanced oil recovery and production optimization."}]}]}', 'Droplets', 3),
  ('Coiled Tubing Chemicals', 'coiled-tubing-chemicals', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Complete coiled tubing chemical solutions including foamers, biocides, viscosifiers, lubricants, H2S inhibitors/scavengers, and corrosion inhibitors."}]}]}', 'Cylinder', 4),
  ('Specialty Chemicals', 'specialty-chemicals', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hydrochloric acid (36%, 32%, 15% inhibited), methanol, xylene, toluene, sulfuric acid, registered biocides, and barite dissolver."}]}]}', 'Atom', 5)
) as s(name, slug, description, icon, display_order)
where p.slug = 'chemical-solutions';

-- Sub-Products for Containment Solutions
insert into sub_products (product_id, name, slug, description, icon, display_order, published)
select p.id, s.name, s.slug, s.description::jsonb, s.icon, s.display_order, true
from products p
cross join (values
  ('Foam Wall Berms', 'foam-wall-berms', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"MAXX Foam Wall Secondary Spill Containment Berms featuring high chemical resistance and easy-to-clean design for demanding industrial environments."}]}]}', 'Box', 1),
  ('L-Bracket Berms', 'l-bracket-berms', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"MAXX L-Bracket Berms constructed with heavy-duty, chemically resistant fabric for reliable secondary containment."}]}]}', 'CornerDownRight', 2),
  ('Spill Kits', 'spill-kits', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Ready-to-use MAXX Spill Kits for rapid spill response, providing everything needed for immediate containment and cleanup."}]}]}', 'Package', 3),
  ('Pond Liners', 'pond-liners', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Durable pond liner solutions for industrial water containment, produced with chemically resistant materials for long-term performance."}]}]}', 'Waves', 4),
  ('Dust & Noise Control', 'dust-noise-control', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Environmental control solutions including dust suppression products and noise barrier systems for industrial operations."}]}]}', 'Wind', 5)
) as s(name, slug, description, icon, display_order)
where p.slug = 'containment-solutions';

-- Markets
insert into markets (name, slug, description, display_order, published) values
  ('Oil & Gas', 'oil-and-gas', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Comprehensive chemical and containment solutions for upstream, midstream, and downstream oil and gas operations. From fracturing chemicals to spill containment berms, MAXX Energy supports the full lifecycle of oil and gas production."}]}]}', 1, true),
  ('Agriculture', 'agriculture', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Specialized chemical solutions for agricultural applications including water treatment, soil management, and crop protection. MAXX Energy brings industrial-grade reliability to the agricultural sector."}]}]}', 2, true),
  ('Energy Recovery', 'energy-recovery', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical solutions and containment products supporting energy recovery operations including enhanced oil recovery, waste-to-energy, and renewable energy production facilities."}]}]}', 3, true),
  ('Industrial', 'industrial', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical supply and containment solutions for general industrial applications including manufacturing, processing, and heavy industry operations."}]}]}', 4, true),
  ('Industrial Water', 'industrial-water', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Water treatment chemical solutions for industrial water management, cooling systems, boiler treatment, and wastewater processing."}]}]}', 5, true),
  ('Mining', 'mining', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical and containment solutions for mining operations including dust control, water treatment, and environmental compliance products."}]}]}', 6, true),
  ('Municipal Water', 'municipal-water', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Water treatment chemicals and containment solutions for municipal water systems, ensuring safe and reliable community water supply and wastewater treatment."}]}]}', 7, true),
  ('Paper', 'paper', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Specialty chemicals for paper manufacturing and pulp processing including water treatment, process chemicals, and environmental solutions."}]}]}', 8, true),
  ('Construction', 'construction', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Containment and chemical solutions for construction operations including dust control, water management, and environmental protection products."}]}]}', 9, true),
  ('Heavy Commercial', 'heavy-commercial', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical and containment products for heavy commercial operations including fleet maintenance, equipment cleaning, and facility management."}]}]}', 10, true),
  ('Select Industries', 'select-industries', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Customized chemical solutions for specialized industries requiring unique formulations, precision blending, and dedicated technical support."}]}]}', 11, true),
  ('Water Treatment', 'water-treatment', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Full spectrum of water treatment chemicals for potable water, process water, cooling water, and wastewater applications across all industries."}]}]}', 12, true);

-- Shale Plays
insert into shale_plays (name, slug, description, region, lat, lng, display_order, published) values
  ('Utica Basin', 'utica-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Strategic presence in the Utica Basin serving eastern Ohio, western Pennsylvania, and West Virginia with comprehensive chemical and containment solutions."}]}]}', 'Appalachian', 39.96, -81.09, 1, true),
  ('Permian / Delaware Basin', 'permian-delaware-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Full-service chemical supply and containment solutions for the prolific Permian and Delaware Basin operations in West Texas and southeastern New Mexico."}]}]}', 'Southwest', 31.87, -103.52, 2, true),
  ('Marcellus Basin', 'marcellus-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Supporting Marcellus Shale natural gas operations across Pennsylvania, West Virginia, and Ohio with specialized frac chemicals and containment products."}]}]}', 'Northeast', 41.20, -77.19, 3, true),
  ('Haynesville / Bossier Basin', 'haynesville-bossier-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical and containment solutions for the Haynesville and Bossier Shale formations in northwestern Louisiana and eastern Texas."}]}]}', 'Gulf Coast', 32.45, -93.75, 4, true),
  ('Eagle Ford Basin', 'eagle-ford-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Comprehensive chemical supply for Eagle Ford Shale oil and gas operations stretching across South Texas from the Mexican border to East Texas."}]}]}', 'South Texas', 28.80, -98.50, 5, true),
  ('Bakken Basin', 'bakken-basin', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Chemical and containment solutions supporting Bakken Formation operations in North Dakota, Montana, and the Canadian provinces of Saskatchewan and Manitoba."}]}]}', 'Northern Plains', 48.10, -103.62, 6, true);

-- Locations
insert into locations (name, address, city, state, zip, phone, email, is_headquarters, published) values
  ('Godley, TX (Headquarters)', 'PO Box 444', 'Godley', 'TX', '76044', '1-833-777-6299', 'info@maxxenergysvcs.com', true, true),
  ('Odessa, TX', '2250 South Dixie Boulevard', 'Odessa', 'TX', '79766', '1-833-777-6299', 'info@maxxenergysvcs.com', false, true);
