-- Update contact email from info@ to information@maxxenergysvcs.com
-- Safe targeted UPDATEs — does NOT drop or reseed anything.
UPDATE locations
SET email = 'information@maxxenergysvcs.com'
WHERE email = 'info@maxxenergysvcs.com';

-- Update Odessa location to its new address
UPDATE locations
SET address = '8001 W Hwy 80 E',
    zip = '79765'
WHERE name = 'Odessa, TX';
