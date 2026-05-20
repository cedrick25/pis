-- =============================================================
-- STEP 2: Preview (READ-ONLY — no table is modified)
--
-- Shows petitioner_profile rows that step 3 would update, using name
-- values from docket_book where client_id = petitioner_profile.id.
-- docket_book is never written; only step 3 UPDATEs petitioner_profile.
--
-- Includes rows where ANY name field is empty on petitioner_profile
-- while the chosen docket row has data for that field.
-- full_name is only considered from docket_book.full_name (not merged
-- from first/middle/last/suffix — same rule as step 3).
-- One docket row per client: prefers rows with first name, then newest.
-- =============================================================

SELECT 
    pp.id AS petitioner_id,
    pp.first_name  AS pp_first_name,
    pp.middle_name AS pp_middle_name,
    pp.last_name   AS pp_last_name,
    pp.suffix_name AS pp_suffix_name,
    pp.full_name   AS pp_full_name,
    '--->'         AS will_become,
    db.first_name  AS db_first_name,
    db.middle_name AS db_middle_name,
    db.last_name   AS db_last_name,
    db.suffix_name AS db_suffix_name,
    db.full_name   AS db_full_name
FROM petitioner_profile pp
INNER JOIN (
    SELECT 
        sub.client_id,
        sub.first_name,
        sub.middle_name,
        sub.last_name,
        sub.suffix_name,
        sub.full_name
    FROM (
        SELECT 
            CAST(client_id AS UNSIGNED) AS client_id,
            first_name,
            middle_name,
            last_name,
            suffix_name,
            full_name,
            ROW_NUMBER() OVER (
                PARTITION BY CAST(client_id AS UNSIGNED)
                ORDER BY 
                    CASE WHEN first_name IS NOT NULL AND TRIM(first_name) != '' THEN 0 ELSE 1 END,
                    updated_date DESC,
                    created_date DESC
            ) AS rn
        FROM docket_book
        WHERE client_id IS NOT NULL
          AND TRIM(client_id) != ''
          AND client_id REGEXP '^[0-9]+$'
          AND (
              (first_name IS NOT NULL AND TRIM(first_name) != '')
              OR (middle_name IS NOT NULL AND TRIM(middle_name) != '')
              OR (last_name IS NOT NULL AND TRIM(last_name) != '')
              OR (suffix_name IS NOT NULL AND TRIM(suffix_name) != '')
              OR (full_name IS NOT NULL AND TRIM(full_name) != '')
          )
    ) sub
    WHERE sub.rn = 1
) db ON pp.id = db.client_id
WHERE (
      ((pp.first_name IS NULL OR TRIM(pp.first_name) = '') AND (db.first_name IS NOT NULL AND TRIM(db.first_name) != ''))
   OR ((pp.middle_name IS NULL OR TRIM(pp.middle_name) = '') AND (db.middle_name IS NOT NULL AND TRIM(db.middle_name) != ''))
   OR ((pp.last_name IS NULL OR TRIM(pp.last_name) = '') AND (db.last_name IS NOT NULL AND TRIM(db.last_name) != ''))
   OR ((pp.suffix_name IS NULL OR TRIM(pp.suffix_name) = '') AND (db.suffix_name IS NOT NULL AND TRIM(db.suffix_name) != ''))
   OR ((pp.full_name IS NULL OR TRIM(pp.full_name) = '')
       AND (db.full_name IS NOT NULL AND TRIM(db.full_name) != ''))
);
