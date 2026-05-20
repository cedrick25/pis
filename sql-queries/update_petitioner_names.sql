-- =============================================================
-- STEP 1: Find petitioners with all core name fields empty
-- (Narrow diagnostic; for sync from docket_book use step 2 preview
--  then step 3 update — those handle partial missing names too.)
-- =============================================================

SELECT
    pp.id AS petitioner_profile_id,
    db.id AS docket_book_id,
    db.client_id,
    db.first_name AS docket_first_name,
    db.middle_name AS docket_middle_name,
    db.last_name AS docket_last_name,
    db.suffix_name AS docket_suffix_name,
    db.full_name AS docket_full_name
FROM petitioner_profile pp
JOIN docket_book db
    ON db.client_id = CAST(pp.id AS CHAR)
WHERE NULLIF(TRIM(pp.first_name), '') IS NULL
  AND NULLIF(TRIM(pp.middle_name), '') IS NULL
  AND NULLIF(TRIM(pp.last_name), '') IS NULL
  AND NULLIF(TRIM(pp.suffix_name), '') IS NULL
  AND NULLIF(TRIM(pp.full_name), '') IS NULL
  AND NULLIF(TRIM(db.client_id), '') IS NOT NULL
ORDER BY pp.id, db.id;
