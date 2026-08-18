-- Add Docket Routing (CSD) parent permission and re-parent CSD children.
-- Run against `pis` if you already imported permission.sql and only need this change.

START TRANSACTION;

INSERT INTO `permission` (
  `id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`,
  `detail`, `name`, `parent_id`, `type`, `value`
) VALUES (
  149, 'SYSTEM', NOW(), 1, NULL, NULL,
  'can_access_docket_routing_module_csd', 'Docket Routing (CSD)', 92, 'VIEW', 0
)
ON DUPLICATE KEY UPDATE
  `detail` = VALUES(`detail`),
  `name` = VALUES(`name`),
  `parent_id` = VALUES(`parent_id`),
  `type` = VALUES(`type`),
  `status` = 1;

-- CSD children: Probation, Pre-Parole, Parole, Pardone
UPDATE `permission` SET `parent_id` = 149 WHERE `id` IN (93, 94, 95, 96);

-- Module still parents: CSD, PDL Routing, Sent, Inbox
UPDATE `permission` SET `parent_id` = 92 WHERE `id` IN (149, 101, 102, 103);
UPDATE `permission` SET `name` = 'Docket Routing' WHERE `id` = 92;
UPDATE `permission` SET `name` = 'Docket Routing (CSD)' WHERE `id` = 149;

COMMIT;
