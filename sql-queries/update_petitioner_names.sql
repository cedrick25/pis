-- =============================================================
-- STEP 1: Find all petitioners with empty names
-- Run this first to see how many records have missing names
-- =============================================================

SELECT 
    pp.id,
    pp.first_name,
    pp.middle_name,
    pp.last_name,
    pp.suffix_name,
    pp.full_name
FROM petitioner_profile pp
WHERE (pp.first_name IS NULL OR TRIM(pp.first_name) = '')
  AND (pp.middle_name IS NULL OR TRIM(pp.middle_name) = '')
  AND (pp.last_name IS NULL OR TRIM(pp.last_name) = '')
  AND (pp.full_name IS NULL OR TRIM(pp.full_name) = '');
