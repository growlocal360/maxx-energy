-- MAXX Energy Services - Product Items Migration
-- Run this in the Supabase SQL Editor AFTER schema.sql
-- Adds the product_items table and seeds it with chemical catalog data

-- ============================================
-- PRODUCT ITEMS TABLE
-- ============================================
drop table if exists product_items cascade;

create table product_items (
  id uuid default uuid_generate_v4() primary key,
  sub_product_id uuid references sub_products(id) on delete cascade not null,
  family text not null,
  trade_name text not null,
  uom text,
  packing text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- RLS POLICIES
-- ============================================
alter table product_items enable row level security;

-- Public can read all items (visibility inherited from sub_product's published state)
create policy "Public can read product items" on product_items
  for select using (true);

-- Authenticated users (admin) full CRUD
create policy "Admins can read all product items" on product_items
  for select to authenticated using (true);

create policy "Admins can insert product items" on product_items
  for insert to authenticated with check (true);

create policy "Admins can update product items" on product_items
  for update to authenticated using (true);

create policy "Admins can delete product items" on product_items
  for delete to authenticated using (true);

-- ============================================
-- SEED DATA: ACID CHEMICALS
-- ============================================
insert into product_items (sub_product_id, family, trade_name, uom, packing, display_order)
select sp.id, i.family, i.trade_name, i.uom, i.packing, i.display_order
from sub_products sp
cross join (values
  ('Acid Corrosion Inhibitor', 'ACI-120 Medium Temp', 'gal', 'Totes', 1),
  ('Acid Corrosion Inhibitor', 'ACI-130 High Temp', 'gal', 'Totes', 2),
  ('5-in-1 Acidizing Combo', '5-N-1 AC', 'gal', 'Totes', 3),
  ('Mutual Solvent - Micellar', 'Micellar Solv-100', 'gal', 'Totes', 4),
  ('Iron Control - FE-4 Citric Acid 50%', 'IC-50', 'gal', 'Totes', 5),
  ('Iron Control - Acetic & Citric Blend', 'Acetic & Citric Blend', 'gal', 'Totes', 6),
  ('Iron Control - FE-6 Acetic Acid', 'IC-FE-6', 'gal', 'Totes', 7),
  ('Iron Control - BME Iron Reducer', 'IC-BME-R', 'gal', 'Totes', 8),
  ('Emulsifier', 'MUL X HCI-100', 'gal', 'Totes', 9),
  ('Retarder - Acid Retarder', 'AR-150', 'gal', 'Totes', 10),
  ('Anti-Sludge', 'AS-500', 'gal', 'Totes', 11)
) as i(family, trade_name, uom, packing, display_order)
where sp.slug = 'acid-chemicals';

-- ============================================
-- SEED DATA: SURFACTANTS
-- ============================================
insert into product_items (sub_product_id, family, trade_name, uom, packing, display_order)
select sp.id, i.family, i.trade_name, i.uom, i.packing, i.display_order
from sub_products sp
cross join (values
  ('Surfactant', 'FS-LST-100', 'gal', 'Bulk/Totes', 1),
  ('Surfactant + Non-Emulsifier', 'FS-112', 'gal', 'Bulk/Totes', 2),
  ('Surfactant + Non-Emulsifier', 'FS-118', 'gal', 'Bulk/Totes', 3),
  ('Surfactant + Non-Emulsifier', 'FS-RDM', 'gal', 'Bulk/Totes', 4)
) as i(family, trade_name, uom, packing, display_order)
where sp.slug = 'surfactants';

-- ============================================
-- SEED DATA: FRAC CHEMICALS
-- ============================================
insert into product_items (sub_product_id, family, trade_name, uom, packing, display_order)
select sp.id, i.family, i.trade_name, i.uom, i.packing, i.display_order
from sub_products sp
cross join (values
  ('Diverting Agent - Low Temp', 'DA-LT-100', 'lb', 'Sacks', 1),
  ('Diverting Agent - High Temp', 'DA-HT-355', 'lb', 'Sacks', 2),
  ('Live Breaker - Ammonium Persulfate', 'LB-AP-100', 'lb', 'Pails', 3),
  ('Encap Breaker - Low Temp', 'EB-110-LT', 'lb', 'Pails', 4),
  ('Encap Breaker - High Temp', 'EB-120-HT', 'lb', 'Pails', 5),
  ('Liquid FR Breaker', 'Hydrogen Peroxide', 'gal', 'Bulk/Totes', 6),
  ('Liquid FR Breaker', 'Chlorite', 'gal', 'Bulk/Totes', 7),
  ('Clay Stabilizer', 'CS-ADV', 'gal', 'Bulk/Totes', 8),
  ('Clay Stabilizer - Choline Chloride', 'CS-110', 'gal', 'Bulk/Totes', 9),
  ('Instant Crosslinker', 'ICL-GXL-4', 'gal', 'Bulk/Totes', 10),
  ('Delayed Crosslinker', 'DCL-14', 'gal', 'Bulk/Totes', 11),
  ('Friction Reducer - Fresh Water', 'Anionic Friction Reducer FW', 'gal', 'Bulk/Totes', 12),
  ('Friction Reducer - Low Brine', 'Anionic Friction Reducer-LB', 'gal', 'Bulk/Totes', 13),
  ('Friction Reducer - Mid Brine', 'Anionic Friction Reducer-MB', 'gal', 'Bulk/Totes', 14),
  ('Friction Reducer - High Brine', 'Anionic Friction Reducer', 'gal', 'Bulk/Totes', 15),
  ('Friction Reducer', 'Cationic Brine Tolerant', 'gal', 'Bulk/Totes', 16),
  ('Scale Inhibitor Liquid', 'Phosphonate Neutral pH', 'gal', 'Bulk/Totes', 17),
  ('Scale Inhibitor Solid', 'Scale-B-Gone', 'lb', 'Totes', 18),
  ('Buffer', '25% Caustic Soda', 'gal', 'Totes', 19),
  ('Buffer', 'Potassium Hydroxide', 'gal', 'Totes', 20),
  ('Buffer', 'Sodium Hydroxide', 'gal', 'Totes', 21),
  ('Buffer for Produced Water', 'BF7L', 'gal', 'Totes', 22)
) as i(family, trade_name, uom, packing, display_order)
where sp.slug = 'frac-chemicals';

-- ============================================
-- SEED DATA: COILED TUBING CHEMICALS
-- ============================================
insert into product_items (sub_product_id, family, trade_name, uom, packing, display_order)
select sp.id, i.family, i.trade_name, i.uom, i.packing, i.display_order
from sub_products sp
cross join (values
  ('Foamer', 'Foam 810', 'gal', 'Totes', 1),
  ('Biocide', 'DDAC/ADBAC 11%', 'gal', 'Totes', 2),
  ('Biocide', 'THPS 20%', 'gal', 'Totes', 3),
  ('Viscosifier Gel Sweep', 'GS-150', 'gal', 'Totes', 4),
  ('Viscosifier Slurry', 'Xanthan 3.5 lb/ga', 'gal', 'Totes', 5),
  ('Viscosifier Slurry', 'Xanthan 4 lb/ga', 'gal', 'Totes', 6),
  ('Friction Reducer UHB', 'FR-4200', 'gal', 'Totes', 7),
  ('Filming Amine', 'H2S Inhibitor', 'gal', 'Totes', 8),
  ('Lubricant Economy', 'POP 100', 'gal', 'Totes', 9),
  ('Lubricant', 'Liquid Beads', 'gal', 'Totes', 10),
  ('Lubricant - Nano Graphite', 'POP 300 NG', 'gal', 'Totes', 11),
  ('Triazine MEA', 'H2S Scavenger', 'gal', 'Totes', 12),
  ('Corrosion Inhibitor Oil Soluble', 'CI-250-OS', 'gal', 'Totes', 13),
  ('Corrosion Inhibitor Water Soluble', 'CI-350-WS', 'gal', 'Totes', 14),
  ('Corrosion Inhibitor + O2 Scavenger', 'Multi-Purpose Additive', 'gal', 'Totes', 15),
  ('Corrosion Inhibitor + H2S Scavenger', 'Multi-Purpose Additive', 'gal', 'Totes', 16)
) as i(family, trade_name, uom, packing, display_order)
where sp.slug = 'coiled-tubing-chemicals';

-- ============================================
-- SEED DATA: SPECIALTY CHEMICALS (Other Chemicals)
-- ============================================
insert into product_items (sub_product_id, family, trade_name, uom, packing, display_order)
select sp.id, i.family, i.trade_name, i.uom, i.packing, i.display_order
from sub_products sp
cross join (values
  ('Registered Biocide', 'Quat - 10%', 'gal', 'Bulk/Totes', 1),
  ('Registered Biocide', 'DDAC/ADBAC 11%', 'gal', 'Totes', 2),
  ('Registered Biocide', 'Glut-Quat 12%+3%', 'gal', 'Bulk/Totes', 3),
  ('Registered Biocide', 'TTPC 5%', 'gal', 'Totes', 4),
  ('FeS Control', 'THPS 20%', 'gal', 'Totes', 5),
  ('Film Control', 'Glutaraldehyde 15%', 'gal', 'Totes', 6),
  ('Film Control', 'Glut-Quat 12%+3%', 'gal', 'Totes', 7),
  ('Film Control', 'Quat - 10%', 'gal', 'Totes', 8),
  ('Packer Fluid Inhibitor', 'PackFL-10', 'gal', 'Totes', 9),
  ('Defoamer (Cementing)', 'C-Defoam', 'gal', 'Totes', 10),
  ('Hydrochloric Acid 36%, 32% & 15% Inhibited', 'HCL', 'gal', 'Bulk', 11),
  ('Modified Acid', 'Safe Acid', 'gal', 'Bulk', 12),
  ('All in One Acid Additive', '5 in 1 Combo', 'gal', 'Totes', 13),
  ('Methanol', 'Methanol', 'gal', 'Bulk', 14),
  ('Xylene', 'Xylene', 'gal', 'Bulk', 15),
  ('Toluene', 'Toluene', 'gal', 'Bulk', 16),
  ('Sulfuric Acid', 'Sulfuric Acid', 'gal', 'Totes', 17),
  ('Caustic Soda', 'Caustic Soda', 'gal', 'Totes', 18),
  ('Non Emulsifier for Completion Brine', 'NoMUL', 'gal', 'Totes', 19),
  ('Barite Dissolver', 'BD-700', 'gal', 'Totes', 20)
) as i(family, trade_name, uom, packing, display_order)
where sp.slug = 'specialty-chemicals';
