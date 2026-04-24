-- =============================================================
-- STEP 3: Actual UPDATE — fills empty petitioner names from docket_book
-- Only run this after verifying Step 2 results look correct
-- =============================================================

UPDATE petitioner_profile pp
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
          AND (
              (first_name IS NOT NULL AND TRIM(first_name) != '')
              OR (last_name IS NOT NULL AND TRIM(last_name) != '')
              OR (full_name IS NOT NULL AND TRIM(full_name) != '')
          )
    ) sub
    WHERE sub.rn = 1
) db ON pp.id = db.client_id
SET
    pp.first_name = CASE 
        WHEN db.first_name IS NOT NULL AND TRIM(db.first_name) != ''
        THEN TRIM(db.first_name)
        ELSE pp.first_name 
    END,
    pp.middle_name = CASE 
        WHEN db.middle_name IS NOT NULL AND TRIM(db.middle_name) != ''
        THEN TRIM(db.middle_name)
        ELSE pp.middle_name 
    END,
    pp.last_name = CASE 
        WHEN db.last_name IS NOT NULL AND TRIM(db.last_name) != ''
        THEN TRIM(db.last_name)
        ELSE pp.last_name 
    END,
    pp.suffix_name = CASE 
        WHEN db.suffix_name IS NOT NULL AND TRIM(db.suffix_name) != ''
        THEN TRIM(db.suffix_name)
        ELSE pp.suffix_name 
    END,
    pp.full_name = CASE 
        WHEN db.full_name IS NOT NULL AND TRIM(db.full_name) != '' AND db.full_name NOT LIKE '%undefined%'
        THEN TRIM(db.full_name)
        WHEN db.first_name IS NOT NULL AND TRIM(db.first_name) != ''
        THEN TRIM(CONCAT(
            COALESCE(TRIM(db.first_name), ''), ' ',
            COALESCE(TRIM(db.middle_name), ''), ' ',
            COALESCE(TRIM(db.last_name), ''),
            CASE WHEN db.suffix_name IS NOT NULL AND TRIM(db.suffix_name) != '' 
                 THEN CONCAT(' ', TRIM(db.suffix_name)) ELSE '' END
        ))
        ELSE pp.full_name
    END
WHERE (pp.first_name IS NULL OR TRIM(pp.first_name) = '')
  AND (pp.middle_name IS NULL OR TRIM(pp.middle_name) = '')
  AND (pp.last_name IS NULL OR TRIM(pp.last_name) = '')
  AND (pp.full_name IS NULL OR TRIM(pp.full_name) = '');
