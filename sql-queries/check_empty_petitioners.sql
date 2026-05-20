-- =============================================================
-- Petitioners with ALL name fields empty whose ID exists in docket_book
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
WHERE NULLIF(TRIM(db.first_name), '') IS NULL
  AND NULLIF(TRIM(db.middle_name), '') IS NULL
  AND NULLIF(TRIM(db.last_name), '') IS NULL
  AND NULLIF(TRIM(db.full_name), '') IS NULL
  AND NULLIF(TRIM(db.client_id), '') IS NOT NULL
ORDER BY pp.id, db.id;
