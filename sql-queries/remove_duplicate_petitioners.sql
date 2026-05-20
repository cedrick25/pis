DELETE pp
FROM petitioner_profile pp
JOIN (
    SELECT
        MIN(id) AS duplicate_id
    FROM petitioner_profile
    GROUP BY
        first_name,
        middle_name,
        last_name,
        suffix_name,
        full_name
    HAVING COUNT(*) = 2
) d
ON pp.id = d.duplicate_id;