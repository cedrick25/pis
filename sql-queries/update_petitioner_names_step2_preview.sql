-- =============================================================
-- STEP 2: Preview — which petitioners will get updated and with what values
-- Run this to verify before doing the actual update
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
          AND (
              (first_name IS NOT NULL AND TRIM(first_name) != '')
              OR (last_name IS NOT NULL AND TRIM(last_name) != '')
              OR (full_name IS NOT NULL AND TRIM(full_name) != '')
          )
    ) sub
    WHERE sub.rn = 1
) db ON pp.id = db.client_id
WHERE (pp.first_name IS NULL OR TRIM(pp.first_name) = '')
  AND (pp.middle_name IS NULL OR TRIM(pp.middle_name) = '')
  AND (pp.last_name IS NULL OR TRIM(pp.last_name) = '')
  AND (pp.full_name IS NULL OR TRIM(pp.full_name) = '');
