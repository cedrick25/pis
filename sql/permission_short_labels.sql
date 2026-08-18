-- In-place update for an already-imported permission table.
-- Shortens display names and removes unused docket Create permissions.
-- Run against `pis` if you do not want to DROP the table.

START TRANSACTION;

-- Remove unused docket Create permissions (Add Docket not in current list UIs)
DELETE FROM `permission` WHERE `id` IN (
  7, 12, 22, 27, 32, 37, 47, 52, 57, 62, 72, 77, 82, 87, 139, 144
);
DELETE FROM `permission` WHERE `detail` LIKE 'can_create_docket_%';

-- Module / sub-module short labels
UPDATE `permission` SET `name` = 'Docketing' WHERE `id` = 1;
UPDATE `permission` SET `name` = 'Probation' WHERE `id` = 2;
UPDATE `permission` SET `name` = 'Investigation' WHERE `id` = 3;
UPDATE `permission` SET `name` = 'Supervision' WHERE `id` = 4;
UPDATE `permission` SET `name` = 'Courtesy Investigation' WHERE `id` = 5;
UPDATE `permission` SET `name` = 'Courtesy Supervision' WHERE `id` = 6;

UPDATE `permission` SET `name` = 'Parole and Pardon' WHERE `id` = 17;
UPDATE `permission` SET `name` = 'Investigation' WHERE `id` = 18;
UPDATE `permission` SET `name` = 'Supervision' WHERE `id` = 19;
UPDATE `permission` SET `name` = 'Courtesy Investigation' WHERE `id` = 20;
UPDATE `permission` SET `name` = 'Courtesy Supervision' WHERE `id` = 21;

UPDATE `permission` SET `name` = 'Parole' WHERE `id` = 42;
UPDATE `permission` SET `name` = 'Investigation' WHERE `id` = 43;
UPDATE `permission` SET `name` = 'Supervision' WHERE `id` = 44;
UPDATE `permission` SET `name` = 'Courtesy Investigation' WHERE `id` = 45;
UPDATE `permission` SET `name` = 'Courtesy Supervision' WHERE `id` = 46;

UPDATE `permission` SET `name` = 'Pardone' WHERE `id` = 67;
UPDATE `permission` SET `name` = 'Investigation' WHERE `id` = 68;
UPDATE `permission` SET `name` = 'Supervision' WHERE `id` = 69;
UPDATE `permission` SET `name` = 'Courtesy Investigation' WHERE `id` = 70;
UPDATE `permission` SET `name` = 'Courtesy Supervision' WHERE `id` = 71;

UPDATE `permission` SET `name` = 'Docket Routing' WHERE `id` = 92;
UPDATE `permission` SET `name` = 'Probation' WHERE `id` = 93;
UPDATE `permission` SET `name` = 'Pre-Parole' WHERE `id` = 94;
UPDATE `permission` SET `name` = 'Parole' WHERE `id` = 95;
UPDATE `permission` SET `name` = 'Pardone' WHERE `id` = 96;
UPDATE `permission` SET `name` = 'PDL' WHERE `id` = 101;
UPDATE `permission` SET `name` = 'Sent' WHERE `id` = 102;
UPDATE `permission` SET `name` = 'Inbox' WHERE `id` = 103;
UPDATE `permission` SET `name` = 'Probation' WHERE `id` IN (104, 109);
UPDATE `permission` SET `name` = 'Pre-Parole' WHERE `id` IN (105, 110);
UPDATE `permission` SET `name` = 'Parole' WHERE `id` IN (106, 111);
UPDATE `permission` SET `name` = 'Pardone' WHERE `id` IN (107, 112);
UPDATE `permission` SET `name` = 'PDL' WHERE `id` IN (108, 113);

UPDATE `permission` SET `name` = 'Fact Sheet' WHERE `id` = 114;
UPDATE `permission` SET `name` = 'Probation' WHERE `id` = 115;
UPDATE `permission` SET `name` = 'Pre-Parole' WHERE `id` = 116;
UPDATE `permission` SET `name` = 'Parole and Pardone' WHERE `id` = 117;
UPDATE `permission` SET `name` = 'PDL' WHERE `id` = 118;
UPDATE `permission` SET `name` = 'Forms' WHERE `id` = 132;
UPDATE `permission` SET `name` = 'My Organization' WHERE `id` = 133;
UPDATE `permission` SET `name` = 'User Accounts' WHERE `id` = 134;
UPDATE `permission` SET `name` = 'User Roles' WHERE `id` = 135;
UPDATE `permission` SET `name` = 'Field Offices' WHERE `id` = 136;
UPDATE `permission` SET `name` = 'Regions' WHERE `id` = 137;
UPDATE `permission` SET `name` = 'Permissions' WHERE `id` = 138;

-- ACTION short labels (under parent module context)
UPDATE `permission` SET `name` = 'View' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_view_%';
UPDATE `permission` SET `name` = 'Update' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_edit_%';
UPDATE `permission` SET `name` = 'Delete' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_delete_%';
UPDATE `permission` SET `name` = 'Attachments' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_attachments_%';
UPDATE `permission` SET `name` = 'Forward' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_forward_%';
UPDATE `permission` SET `name` = 'Create' WHERE `type` = 'ACTION' AND `detail` LIKE 'can_create_%';
UPDATE `permission` SET `name` = 'Worksheet' WHERE `detail` = 'can_worksheet_fact_sheet_probation';
UPDATE `permission` SET `name` = 'PSIR' WHERE `detail` = 'can_psir_fact_sheet_probation';
UPDATE `permission` SET `name` = 'Generate PSIR' WHERE `detail` = 'can_generate_psir_fact_sheet_probation';

COMMIT;
