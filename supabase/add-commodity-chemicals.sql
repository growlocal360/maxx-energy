-- MAXX Energy Services - Chemical Solutions sub-categories (Skyhawk list)
--
-- SAFE / ADDITIVE — drops nothing. Run in the Supabase SQL Editor.
-- Idempotent: re-running will not create duplicates.
--
-- What it does:
--   1. Updates the Chemical Solutions tagline + description (adds "Data Centers",
--      "Oilfield" -> "Industrial").
--   2. Ensures THREE sub-categories under Chemical Solutions, each showing the
--      same 122-item chemical list:
--        - Industrial Chemicals
--        - Data Center Chemical Solutions
--        - Commodity Chemicals
--   3. Registers each in the multi-category join table so they appear on the page.
--   4. Loads the 122 chemicals (names only) under each. UOM/Packing can be added
--      later per item via the admin Product Items editor.
--
-- Note: each sub-category keeps its own copy of the item list (items belong to a
-- single sub-category in the schema). Re-running only seeds a category that has
-- no items yet, so existing/edited items are left untouched.

do $$
declare
  v_product_id uuid;
  v_sub_id     uuid;
  v_cat        record;
  v_names text[] := array[
    '2-Ethylhexanol (2-EH)','Acetic Acid','Acetone','Activated Carbon','Aluminum Sulfate',
    'Ammonium Bifluoride','Ammonium Chloride','Ammonium Persulfate (APS)','Anhydrous Ammonia',
    'Antifoam','Antifreeze','Aqua Ammonia','Aromatic 100','Aromatic 150',
    'Bentonite','Benzoic Acid','Bleach','Borax','Boric Acid','Butanol','Calcium Chloride',
    'Calcium Nitrate','Caustic Soda','Choline Chloride','Citric Acid',
    'Deionized Water','Dicalite','Diethanolamine','Diethylene Glycol','Dimethyl Disulfide (DMDS)',
    'Dipropylene Glycol',
    'Ethylene Diamine','Ethylene Glycol','Ferric Chloride','Ferric Sulfate','Formaldehyde','Fumaric Acid',
    'Glycerin','Glycol Ether DB','Glycol Ether DM','Glycol Ether DPM','Glycol Ether EB',
    'Glycol Ether PM','Glycol Ether PNB','Guar Gum',
    'Heptane','Hexane','Hexylene Glycol','Hydrazine','Hydrochloric Acid','Hydrofluoric Acid',
    'Hydrofluosilicic Acid (HFS Acid)','Hydrogen Peroxide','Isopropyl Alcohol','LABSA (DDBSA)',
    'Lime','Lithium Hydroxide',
    'Magnesium Chloride','Magnesium Oxide','Magnesium Sulfate','Methanol','Methyl Amyl Alcohol',
    'Methyl Ethyl Ketone (MEK)','Methyl Isobutyl Ketone','Methylene Chloride','Mineral Oil',
    'Mineral Spirits','Mono Sodium Phosphate','Monoethanolamine (MEA)','Morpholine',
    'Nitric Acid','Nitrilotriacetic Acid (NTA)','N-Propyl Acetate',
    'Phosphoric Acid','PM Acetate','Polyphosphoric Acid','Potassium Acetate','Potassium Carbonate',
    'Potassium Chloride','Potassium Hydroxide (KOH)','Propylene Glycol','Potassium Formate',
    'Soda Ash','Sodium Acetate','Sodium Acid Pyrophosphate (SAPP)','Sodium Bicarbonate',
    'Sodium Bisulfite','Sodium Chloride (Salt)','Sodium Metabisulfite','Sodium Metasilicate',
    'Sodium Methylate','Sodium Nitrate','Sodium Nitrite','Sodium Perborate Tetrahydrate',
    'Sodium Persulfate','Sodium Sulfate','Sodium Sulfite','Sodium Thiocyanate','Sodium Thiosulfate',
    'Solvent 142','Sorbic Acid','Stearic Acid','Sulfamic Acid','Sulfuric Acid','Surfactants',
    'Tertiary Butyl Acetate','Tetra Potassium Pyrophosphate (TKPP)','Thinners','THPS','Toluene',
    'Trichloroethylene (TCE)','Triethanolamine (TEA)','Triethylene Glycol (TEG)','Trisodium Phosphate',
    'Urea','VM&P Naphtha',
    'Xylene','Zinc Ammonium Chloride','Zinc Chloride','Zinc Dust','Zinc Oxide','Zinc Sulfate'
  ];
  -- The three sub-categories (display order 6/7/8, after the 5 existing ones)
  v_cats jsonb := '[
    {"name":"Industrial Chemicals","slug":"industrial-chemicals","ord":6,
     "subtext":"Bulk and specialty chemicals for manufacturing, processing, and heavy industrial operations — available by drum, tote, or bulk."},
    {"name":"Data Center Chemical Solutions","slug":"data-center-chemical-solutions","ord":7,
     "subtext":"Water treatment, cooling, and specialty chemicals supporting data center operations — available by drum, tote, or bulk."},
    {"name":"Commodity Chemicals","slug":"commodity-chemicals","ord":8,
     "subtext":"A broad line of commodity and specialty chemicals available by drum, tote, or bulk — contact us for current pricing and availability."}
  ]'::jsonb;
begin
  select id into v_product_id from products where slug = 'chemical-solutions';
  if v_product_id is null then
    raise exception 'chemical-solutions product not found — aborting.';
  end if;

  -- 1) Tagline + description (description column is jsonb; store as a JSON string)
  update products
    set tagline = 'Revolutionary Industrial Chemical Formulations',
        description = to_jsonb(
          'MAXX Energy Services develops revolutionary industrial chemical formulations that deliver permanent, cost-effective solutions. Our comprehensive chemical product line serves fracturing, production, drilling, coiled tubing, water treatment, completions, agricultural, industrial, municipal, and data center applications.'::text
        )
    where id = v_product_id;

  -- 2-4) Ensure each sub-category, its membership, and its items
  for v_cat in
    select * from jsonb_to_recordset(v_cats) as x(name text, slug text, ord int, subtext text)
  loop
    select id into v_sub_id
    from sub_products
    where product_id = v_product_id and slug = v_cat.slug;

    if v_sub_id is null then
      insert into sub_products (product_id, name, slug, description, display_order, published)
      values (v_product_id, v_cat.name, v_cat.slug, to_jsonb(v_cat.subtext), v_cat.ord, true)
      returning id into v_sub_id;
    else
      -- keep name/order in sync; leave description alone (may be admin-edited)
      update sub_products set name = v_cat.name, display_order = v_cat.ord where id = v_sub_id;
    end if;

    -- multi-category membership (public pages list sub-products via this join)
    insert into sub_product_categories (sub_product_id, product_id)
    values (v_sub_id, v_product_id)
    on conflict do nothing;

    -- items: family is NOT NULL, so use '' (empty = no grouping -> clean list).
    -- Only seed when the category currently has none (keeps re-runs idempotent).
    if not exists (select 1 from product_items where sub_product_id = v_sub_id) then
      insert into product_items (sub_product_id, family, trade_name, display_order)
      select v_sub_id, '', name, ord
      from unnest(v_names) with ordinality as t(name, ord);
    end if;

    raise notice 'Ready: % (% items)', v_cat.name, array_length(v_names, 1);
  end loop;
end $$;
