-- Align permission catalog with CURRENT PIS left-panel / list pages.
-- 1) Short display names for active modules
-- 2) Deactivate unused historical Parole/Pardone docket menus (not in left-panel)
-- 3) Remove leftover docket Create actions
--
-- Run against `pis` after previous permission imports.

START TRANSACTION;

-- Unused: standalone Parole / Pardone docket Access menus (commented out of left-panel)
UPDATE `permission` SET `status` = 0, `updated_by` = 'SYSTEM', `updated_date` = NOW()
WHERE `id` BETWEEN 42 AND 91;

-- Unused: Fact Sheet Pre-Parole (not in left-panel)
UPDATE `permission` SET `status` = 0, `updated_by` = 'SYSTEM', `updated_date` = NOW()
WHERE `id` = 116 OR `detail` = 'can_access_fact_sheet_pre_parole';

-- Unused: docket Create actions (Add Docket not on list pages)
UPDATE `permission` SET `status` = 0, `updated_by` = 'SYSTEM', `updated_date` = NOW()
WHERE `detail` LIKE 'can_create_docket_%';

DELETE FROM `permission` WHERE `detail` LIKE 'can_create_docket_%';

-- Active module short names (match grant modal / left-panel)
UPDATE `permission` SET `name` = 'Docketing' WHERE `detail` = 'can_access_docketing_module';
UPDATE `permission` SET `name` = 'Probation' WHERE `detail` = 'can_access_docket_probation';
UPDATE `permission` SET `name` = 'Investigation' WHERE `detail` IN (
  'can_access_docket_probation_investigation',
  'can_access_docket_pre_parole_investigation'
);
UPDATE `permission` SET `name` = 'Supervision' WHERE `detail` IN (
  'can_access_docket_probation_supervision',
  'can_access_docket_pre_parole_supervision'
);
UPDATE `permission` SET `name` = 'Courtesy Investigation' WHERE `detail` IN (
  'can_access_docket_probation_courtesy_investigation',
  'can_access_docket_pre_parole_courtesy_investigation'
);
UPDATE `permission` SET `name` = 'Courtesy Supervision' WHERE `detail` IN (
  'can_access_docket_probation_courtesy_supervision',
  'can_access_docket_pre_parole_courtesy_supervision'
);
UPDATE `permission` SET `name` = 'Parole and Pardon' WHERE `detail` = 'can_access_docket_pre_parole';

UPDATE `permission` SET `name` = 'Docket Routing' WHERE `detail` = 'can_access_docket_routing_module';
UPDATE `permission` SET `name` = 'Probation' WHERE `detail` IN (
  'can_access_docket_routing_probation',
  'can_access_docket_routing_sent_probation',
  'can_access_docket_routing_inbox_probation'
);
UPDATE `permission` SET `name` = 'Pre-Parole' WHERE `detail` IN (
  'can_access_docket_routing_pre_parole',
  'can_access_docket_routing_sent_pre_parole',
  'can_access_docket_routing_inbox_pre_parole'
);
UPDATE `permission` SET `name` = 'Parole' WHERE `detail` IN (
  'can_access_docket_routing_parole',
  'can_access_docket_routing_sent_parole',
  'can_access_docket_routing_inbox_parole'
);
UPDATE `permission` SET `name` = 'Pardone' WHERE `detail` IN (
  'can_access_docket_routing_pardone',
  'can_access_docket_routing_sent_pardone',
  'can_access_docket_routing_inbox_pardone'
);
UPDATE `permission` SET `name` = 'PDL Routing' WHERE `detail` = 'can_access_docket_routing_pdl';
UPDATE `permission` SET `name` = 'PDL' WHERE `detail` IN (
  'can_access_docket_routing_sent_pdl',
  'can_access_docket_routing_inbox_pdl'
);
UPDATE `permission` SET `name` = 'Sent' WHERE `detail` = 'can_access_docket_routing_sent';
UPDATE `permission` SET `name` = 'Inbox' WHERE `detail` = 'can_access_docket_routing_inbox';

UPDATE `permission` SET `name` = 'Fact Sheet' WHERE `detail` = 'can_access_fact_sheet';
UPDATE `permission` SET `name` = 'Probation' WHERE `detail` = 'can_access_fact_sheet_probation';
UPDATE `permission` SET `name` = 'Parole and Pardone' WHERE `detail` = 'can_access_fact_sheet_parole_pardone';
UPDATE `permission` SET `name` = 'PDL' WHERE `detail` = 'can_access_fact_sheet_pdl';
UPDATE `permission` SET `name` = 'Forms' WHERE `detail` = 'can_access_forms';
UPDATE `permission` SET `name` = 'My Organization' WHERE `detail` = 'can_access_organization';
UPDATE `permission` SET `name` = 'User Accounts' WHERE `detail` = 'can_access_organization_user_accounts';
UPDATE `permission` SET `name` = 'User Roles' WHERE `detail` = 'can_access_organization_user_roles';
UPDATE `permission` SET `name` = 'Field Offices' WHERE `detail` = 'can_access_organization_field_offices';
UPDATE `permission` SET `name` = 'Regions' WHERE `detail` = 'can_access_organization_regions';
UPDATE `permission` SET `name` = 'Permissions' WHERE `detail` = 'can_access_organization_permissions';

-- ACTION short labels
UPDATE `permission` SET `name` = 'View' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_view_%';
UPDATE `permission` SET `name` = 'Update' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_edit_%';
UPDATE `permission` SET `name` = 'Delete' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_delete_%';
UPDATE `permission` SET `name` = 'Attachments' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_attachments_%';
UPDATE `permission` SET `name` = 'Forward' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_forward_%';
UPDATE `permission` SET `name` = 'Create' WHERE `status` = 1 AND `type` = 'ACTION' AND `detail` LIKE 'can_create_%';
UPDATE `permission` SET `name` = 'Worksheet' WHERE `detail` = 'can_worksheet_fact_sheet_probation';
UPDATE `permission` SET `name` = 'PSIR' WHERE `detail` = 'can_psir_fact_sheet_probation';
UPDATE `permission` SET `name` = 'Generate PSIR' WHERE `detail` = 'can_generate_psir_fact_sheet_probation';

COMMIT;
