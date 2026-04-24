-- =============================================================
-- Petitioners with ALL name fields empty whose ID exists in docket_book
-- =============================================================

SELECT 
    pp.id AS petitioner_id,
    pp.first_name,
    pp.middle_name,
    pp.last_name,
    pp.suffix_name,
    pp.full_name,
    db.id AS docket_id,
    db.first_name AS db_first_name,
    db.middle_name AS db_middle_name,
    db.last_name AS db_last_name,
    db.suffix_name AS db_suffix_name,
    db.full_name AS db_full_name
FROM petitioner_profile pp
INNER JOIN docket_book db ON pp.id = CAST(db.client_id AS UNSIGNED)
WHERE (pp.first_name IS NULL OR TRIM(pp.first_name) = '')
  AND (pp.middle_name IS NULL OR TRIM(pp.middle_name) = '')
  AND (pp.last_name IS NULL OR TRIM(pp.last_name) = '')
  AND (pp.suffix_name IS NULL OR TRIM(pp.suffix_name) = '')
  AND (pp.full_name IS NULL OR TRIM(pp.full_name) = '')
GROUP BY pp.id
ORDER BY pp.id;
