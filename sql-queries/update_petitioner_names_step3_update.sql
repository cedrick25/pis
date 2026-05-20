-- =============================================================
-- Use this update. It picks one docket_book row 
-- per client_id, prefers rows with split name fields, 
-- then newest records, and only updates petitioner_profile rows where all name fields are currently blank.
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
SET
    pp.first_name = CASE 
        WHEN (pp.first_name IS NULL OR TRIM(pp.first_name) = '')
             AND db.first_name IS NOT NULL AND TRIM(db.first_name) != ''
        THEN LEFT(TRIM(db.first_name), 255)
        ELSE pp.first_name 
    END,
    pp.middle_name = CASE 
        WHEN (pp.middle_name IS NULL OR TRIM(pp.middle_name) = '')
             AND db.middle_name IS NOT NULL AND TRIM(db.middle_name) != ''
        THEN LEFT(TRIM(db.middle_name), 255)
        ELSE pp.middle_name 
    END,
    pp.last_name = CASE 
        WHEN (pp.last_name IS NULL OR TRIM(pp.last_name) = '')
             AND db.last_name IS NOT NULL AND TRIM(db.last_name) != ''
        THEN LEFT(TRIM(db.last_name), 255)
        ELSE pp.last_name 
    END,
    pp.suffix_name = CASE 
        WHEN (pp.suffix_name IS NULL OR TRIM(pp.suffix_name) = '')
             AND db.suffix_name IS NOT NULL AND TRIM(db.suffix_name) != ''
        THEN LEFT(TRIM(db.suffix_name), 255)
        ELSE pp.suffix_name 
    END,
    pp.full_name = CASE 
        WHEN (pp.full_name IS NULL OR TRIM(pp.full_name) = '')
             AND db.full_name IS NOT NULL AND TRIM(db.full_name) != ''
             AND db.full_name NOT LIKE '%undefined%'
        THEN LEFT(TRIM(db.full_name), 255)
        ELSE pp.full_name
    END
WHERE (
      ((pp.first_name IS NULL OR TRIM(pp.first_name) = '') AND (db.first_name IS NOT NULL AND TRIM(db.first_name) != ''))
   OR ((pp.middle_name IS NULL OR TRIM(pp.middle_name) = '') AND (db.middle_name IS NOT NULL AND TRIM(db.middle_name) != ''))
   OR ((pp.last_name IS NULL OR TRIM(pp.last_name) = '') AND (db.last_name IS NOT NULL AND TRIM(db.last_name) != ''))
   OR ((pp.suffix_name IS NULL OR TRIM(pp.suffix_name) = '') AND (db.suffix_name IS NOT NULL AND TRIM(db.suffix_name) != ''))
   OR ((pp.full_name IS NULL OR TRIM(pp.full_name) = '') AND (db.full_name IS NOT NULL AND TRIM(db.full_name) != ''))
);
