-- Add Carry Over under Probation Courtesy Investigation.
-- Safe to re-run: skips rows that already exist.

INSERT INTO `permission` (`created_by`, `created_date`, `status`, `detail`, `name`, `parent_id`, `type`, `value`)
SELECT 'SYSTEM', '2026-08-17 00:00:00', 1, 'can_access_docket_probation_carry_over_courtesy_investigation', 'Carry Over', p.id, 'VIEW', 0
FROM `permission` p
WHERE p.detail = 'can_access_docket_probation_courtesy_investigation'
  AND NOT EXISTS (
    SELECT 1 FROM `permission` x
    WHERE x.detail = 'can_access_docket_probation_carry_over_courtesy_investigation'
  );

INSERT INTO `permission` (`created_by`, `created_date`, `status`, `detail`, `name`, `parent_id`, `type`, `value`)
SELECT 'SYSTEM', '2026-08-17 00:00:00', 1, 'can_view_docket_probation_carry_over_courtesy_investigation', 'View', p.id, 'ACTION', 0
FROM `permission` p
WHERE p.detail = 'can_access_docket_probation_carry_over_courtesy_investigation'
  AND NOT EXISTS (
    SELECT 1 FROM `permission` x
    WHERE x.detail = 'can_view_docket_probation_carry_over_courtesy_investigation'
  );

INSERT INTO `permission` (`created_by`, `created_date`, `status`, `detail`, `name`, `parent_id`, `type`, `value`)
SELECT 'SYSTEM', '2026-08-17 00:00:00', 1, 'can_edit_docket_probation_carry_over_courtesy_investigation', 'Update', p.id, 'ACTION', 0
FROM `permission` p
WHERE p.detail = 'can_access_docket_probation_carry_over_courtesy_investigation'
  AND NOT EXISTS (
    SELECT 1 FROM `permission` x
    WHERE x.detail = 'can_edit_docket_probation_carry_over_courtesy_investigation'
  );

INSERT INTO `permission` (`created_by`, `created_date`, `status`, `detail`, `name`, `parent_id`, `type`, `value`)
SELECT 'SYSTEM', '2026-08-17 00:00:00', 1, 'can_attachments_docket_probation_carry_over_courtesy_investigation', 'Attachments', p.id, 'ACTION', 0
FROM `permission` p
WHERE p.detail = 'can_access_docket_probation_carry_over_courtesy_investigation'
  AND NOT EXISTS (
    SELECT 1 FROM `permission` x
    WHERE x.detail = 'can_attachments_docket_probation_carry_over_courtesy_investigation'
  );

INSERT INTO `permission` (`created_by`, `created_date`, `status`, `detail`, `name`, `parent_id`, `type`, `value`)
SELECT 'SYSTEM', '2026-08-17 00:00:00', 1, 'can_delete_docket_probation_carry_over_courtesy_investigation', 'Delete', p.id, 'ACTION', 0
FROM `permission` p
WHERE p.detail = 'can_access_docket_probation_carry_over_courtesy_investigation'
  AND NOT EXISTS (
    SELECT 1 FROM `permission` x
    WHERE x.detail = 'can_delete_docket_probation_carry_over_courtesy_investigation'
  );
