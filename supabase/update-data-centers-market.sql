-- MAXX Energy Services - Data Centers market: image + description
--
-- SAFE / ADDITIVE — updates one existing row. Run in the Supabase SQL Editor.
-- Idempotent: re-running just re-applies the same values.
--
-- Sets the card image + detail-page hero background (both read hero_image_url)
-- and a short description (TipTap doc, so the card excerpt + detail body render).
-- NOTE: the image /markets/data-center-chemicals.jpg must be deployed first
-- (it's a static asset committed to the repo), or it will 404 until the deploy
-- completes.

update markets
set
  hero_image_url = '/markets/data-center-chemicals.jpg',
  description = '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Specialized chemical solutions for data center operations, including cooling water treatment, corrosion and scale control for chilled-water and cooling-tower systems, and reliable supply and containment for critical infrastructure."}]}]}'::jsonb
where slug = 'data-centers';
