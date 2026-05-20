-- Update docket_book to only keep one record per client_id (based on the earlier latest id)
UPDATE docket_book db
JOIN (
    SELECT
        MAX(id) AS master_id,
        MIN(id) AS duplicate_id
    FROM petitioner_profile
    GROUP BY
        first_name,
        middle_name,
        last_name,
        suffix_name,
        full_name
    HAVING COUNT(*) >= 2
) pp
ON db.client_id = pp.duplicate_id
SET db.client_id = pp.master_id;