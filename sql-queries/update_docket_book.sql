-- Update docket_book to only keep one record per client_id (based on the earlier latest id)
UPDATE docket_book cr
JOIN (
    SELECT
        MAX(id) AS master_id,
        MIN(id) AS duplicate_id
    FROM petitioner_profile
    WHERE field_office_id = 200
    GROUP BY
        first_name,
        middle_name,
        last_name,
        suffix_name,
        full_name
    HAVING COUNT(*) = 2
) d
ON cr.client_id = d.duplicate_id
SET cr.client_id = d.master_id;