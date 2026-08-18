-- PIS permission rework: rename `detail` to can_* keys used by data-permission attributes.
-- Preserves existing IDs so role_permission rows stay valid.
-- Adds missing Probation Courtesy Investigation/Supervision ACTION permissions (ids 139-148).
-- Sets parent_id so the grant modal can group by module / sub-module.

START TRANSACTION;

-- Hierarchy (VIEW modules)
UPDATE `permission` SET `detail` = 'can_access_docketing_module', `name` = 'DOCKETING MODULE', `parent_id` = NULL WHERE `id` = 1;
UPDATE `permission` SET `detail` = 'can_access_docket_probation', `name` = 'DOCKETING - PROBATION', `parent_id` = 1 WHERE `id` = 2;
UPDATE `permission` SET `detail` = 'can_access_docket_probation_investigation', `name` = 'PROBATION - INVESTIGATION', `parent_id` = 2 WHERE `id` = 3;
UPDATE `permission` SET `detail` = 'can_access_docket_probation_supervision', `name` = 'PROBATION - SUPERVISION', `parent_id` = 2 WHERE `id` = 4;
UPDATE `permission` SET `detail` = 'can_access_docket_probation_courtesy_investigation', `name` = 'PROBATION - COURTESY INVESTIGATION', `parent_id` = 2 WHERE `id` = 5;
UPDATE `permission` SET `detail` = 'can_access_docket_probation_courtesy_supervision', `name` = 'PROBATION - COURTESY SUPERVISION', `parent_id` = 2 WHERE `id` = 6;

UPDATE `permission` SET `detail` = 'can_create_docket_probation_investigation', `name` = 'PROBATION INVESTIGATION - CREATE', `parent_id` = 3 WHERE `id` = 7;
UPDATE `permission` SET `detail` = 'can_view_docket_probation_investigation', `name` = 'PROBATION INVESTIGATION - VIEW', `parent_id` = 3 WHERE `id` = 8;
UPDATE `permission` SET `detail` = 'can_edit_docket_probation_investigation', `name` = 'PROBATION INVESTIGATION - UPDATE', `parent_id` = 3 WHERE `id` = 9;
UPDATE `permission` SET `detail` = 'can_attachments_docket_probation_investigation', `name` = 'PROBATION INVESTIGATION - ATTACHMENTS', `parent_id` = 3 WHERE `id` = 10;
UPDATE `permission` SET `detail` = 'can_delete_docket_probation_investigation', `name` = 'PROBATION INVESTIGATION - DELETE', `parent_id` = 3 WHERE `id` = 11;

UPDATE `permission` SET `detail` = 'can_create_docket_probation_supervision', `name` = 'PROBATION SUPERVISION - CREATE', `parent_id` = 4 WHERE `id` = 12;
UPDATE `permission` SET `detail` = 'can_view_docket_probation_supervision', `name` = 'PROBATION SUPERVISION - VIEW', `parent_id` = 4 WHERE `id` = 13;
UPDATE `permission` SET `detail` = 'can_edit_docket_probation_supervision', `name` = 'PROBATION SUPERVISION - UPDATE', `parent_id` = 4 WHERE `id` = 14;
UPDATE `permission` SET `detail` = 'can_attachments_docket_probation_supervision', `name` = 'PROBATION SUPERVISION - ATTACHMENTS', `parent_id` = 4 WHERE `id` = 15;
UPDATE `permission` SET `detail` = 'can_delete_docket_probation_supervision', `name` = 'PROBATION SUPERVISION - DELETE', `parent_id` = 4 WHERE `id` = 16;

-- Pre-Parole / Parole and Pardon (menu still under Parole and Pardon)
UPDATE `permission` SET `detail` = 'can_access_docket_pre_parole', `name` = 'DOCKETING - PRE-PAROLE / PAROLE & PARDON', `parent_id` = 1 WHERE `id` = 17;
UPDATE `permission` SET `detail` = 'can_access_docket_pre_parole_investigation', `name` = 'PRE-PAROLE - INVESTIGATION', `parent_id` = 17 WHERE `id` = 18;
UPDATE `permission` SET `detail` = 'can_access_docket_pre_parole_supervision', `name` = 'PRE-PAROLE - SUPERVISION', `parent_id` = 17 WHERE `id` = 19;
UPDATE `permission` SET `detail` = 'can_access_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE - COURTESY INVESTIGATION', `parent_id` = 17 WHERE `id` = 20;
UPDATE `permission` SET `detail` = 'can_access_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE - COURTESY SUPERVISION', `parent_id` = 17 WHERE `id` = 21;

UPDATE `permission` SET `detail` = 'can_create_docket_pre_parole_investigation', `name` = 'PRE-PAROLE INVESTIGATION - CREATE', `parent_id` = 18 WHERE `id` = 22;
UPDATE `permission` SET `detail` = 'can_view_docket_pre_parole_investigation', `name` = 'PRE-PAROLE INVESTIGATION - VIEW', `parent_id` = 18 WHERE `id` = 23;
UPDATE `permission` SET `detail` = 'can_edit_docket_pre_parole_investigation', `name` = 'PRE-PAROLE INVESTIGATION - UPDATE', `parent_id` = 18 WHERE `id` = 24;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pre_parole_investigation', `name` = 'PRE-PAROLE INVESTIGATION - ATTACHMENTS', `parent_id` = 18 WHERE `id` = 25;
UPDATE `permission` SET `detail` = 'can_delete_docket_pre_parole_investigation', `name` = 'PRE-PAROLE INVESTIGATION - DELETE', `parent_id` = 18 WHERE `id` = 26;

UPDATE `permission` SET `detail` = 'can_create_docket_pre_parole_supervision', `name` = 'PRE-PAROLE SUPERVISION - CREATE', `parent_id` = 19 WHERE `id` = 27;
UPDATE `permission` SET `detail` = 'can_view_docket_pre_parole_supervision', `name` = 'PRE-PAROLE SUPERVISION - VIEW', `parent_id` = 19 WHERE `id` = 28;
UPDATE `permission` SET `detail` = 'can_edit_docket_pre_parole_supervision', `name` = 'PRE-PAROLE SUPERVISION - UPDATE', `parent_id` = 19 WHERE `id` = 29;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pre_parole_supervision', `name` = 'PRE-PAROLE SUPERVISION - ATTACHMENTS', `parent_id` = 19 WHERE `id` = 30;
UPDATE `permission` SET `detail` = 'can_delete_docket_pre_parole_supervision', `name` = 'PRE-PAROLE SUPERVISION - DELETE', `parent_id` = 19 WHERE `id` = 31;

UPDATE `permission` SET `detail` = 'can_create_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE COURTESY INVESTIGATION - CREATE', `parent_id` = 20 WHERE `id` = 32;
UPDATE `permission` SET `detail` = 'can_view_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE COURTESY INVESTIGATION - VIEW', `parent_id` = 20 WHERE `id` = 33;
UPDATE `permission` SET `detail` = 'can_edit_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE COURTESY INVESTIGATION - UPDATE', `parent_id` = 20 WHERE `id` = 34;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE COURTESY INVESTIGATION - ATTACHMENTS', `parent_id` = 20 WHERE `id` = 35;
UPDATE `permission` SET `detail` = 'can_delete_docket_pre_parole_courtesy_investigation', `name` = 'PRE-PAROLE COURTESY INVESTIGATION - DELETE', `parent_id` = 20 WHERE `id` = 36;

UPDATE `permission` SET `detail` = 'can_create_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE COURTESY SUPERVISION - CREATE', `parent_id` = 21 WHERE `id` = 37;
UPDATE `permission` SET `detail` = 'can_view_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE COURTESY SUPERVISION - VIEW', `parent_id` = 21 WHERE `id` = 38;
UPDATE `permission` SET `detail` = 'can_edit_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE COURTESY SUPERVISION - UPDATE', `parent_id` = 21 WHERE `id` = 39;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE COURTESY SUPERVISION - ATTACHMENTS', `parent_id` = 21 WHERE `id` = 40;
UPDATE `permission` SET `detail` = 'can_delete_docket_pre_parole_courtesy_supervision', `name` = 'PRE-PAROLE COURTESY SUPERVISION - DELETE', `parent_id` = 21 WHERE `id` = 41;

-- Parolee module (kept for DB completeness; menu may be merged under Parole and Pardon)
UPDATE `permission` SET `detail` = 'can_access_docket_parole', `name` = 'DOCKETING - PAROLE', `parent_id` = 1 WHERE `id` = 42;
UPDATE `permission` SET `detail` = 'can_access_docket_parole_investigation', `name` = 'PAROLE - INVESTIGATION', `parent_id` = 42 WHERE `id` = 43;
UPDATE `permission` SET `detail` = 'can_access_docket_parole_supervision', `name` = 'PAROLE - SUPERVISION', `parent_id` = 42 WHERE `id` = 44;
UPDATE `permission` SET `detail` = 'can_access_docket_parole_courtesy_investigation', `name` = 'PAROLE - COURTESY INVESTIGATION', `parent_id` = 42 WHERE `id` = 45;
UPDATE `permission` SET `detail` = 'can_access_docket_parole_courtesy_supervision', `name` = 'PAROLE - COURTESY SUPERVISION', `parent_id` = 42 WHERE `id` = 46;

UPDATE `permission` SET `detail` = 'can_create_docket_parole_investigation', `name` = 'PAROLE INVESTIGATION - CREATE', `parent_id` = 43 WHERE `id` = 47;
UPDATE `permission` SET `detail` = 'can_view_docket_parole_investigation', `name` = 'PAROLE INVESTIGATION - VIEW', `parent_id` = 43 WHERE `id` = 48;
UPDATE `permission` SET `detail` = 'can_edit_docket_parole_investigation', `name` = 'PAROLE INVESTIGATION - UPDATE', `parent_id` = 43 WHERE `id` = 49;
UPDATE `permission` SET `detail` = 'can_attachments_docket_parole_investigation', `name` = 'PAROLE INVESTIGATION - ATTACHMENTS', `parent_id` = 43 WHERE `id` = 50;
UPDATE `permission` SET `detail` = 'can_delete_docket_parole_investigation', `name` = 'PAROLE INVESTIGATION - DELETE', `parent_id` = 43 WHERE `id` = 51;

UPDATE `permission` SET `detail` = 'can_create_docket_parole_supervision', `name` = 'PAROLE SUPERVISION - CREATE', `parent_id` = 44 WHERE `id` = 52;
UPDATE `permission` SET `detail` = 'can_view_docket_parole_supervision', `name` = 'PAROLE SUPERVISION - VIEW', `parent_id` = 44 WHERE `id` = 53;
UPDATE `permission` SET `detail` = 'can_edit_docket_parole_supervision', `name` = 'PAROLE SUPERVISION - UPDATE', `parent_id` = 44 WHERE `id` = 54;
UPDATE `permission` SET `detail` = 'can_attachments_docket_parole_supervision', `name` = 'PAROLE SUPERVISION - ATTACHMENTS', `parent_id` = 44 WHERE `id` = 55;
UPDATE `permission` SET `detail` = 'can_delete_docket_parole_supervision', `name` = 'PAROLE SUPERVISION - DELETE', `parent_id` = 44 WHERE `id` = 56;

UPDATE `permission` SET `detail` = 'can_create_docket_parole_courtesy_investigation', `name` = 'PAROLE COURTESY INVESTIGATION - CREATE', `parent_id` = 45 WHERE `id` = 57;
UPDATE `permission` SET `detail` = 'can_view_docket_parole_courtesy_investigation', `name` = 'PAROLE COURTESY INVESTIGATION - VIEW', `parent_id` = 45 WHERE `id` = 58;
UPDATE `permission` SET `detail` = 'can_edit_docket_parole_courtesy_investigation', `name` = 'PAROLE COURTESY INVESTIGATION - UPDATE', `parent_id` = 45 WHERE `id` = 59;
UPDATE `permission` SET `detail` = 'can_attachments_docket_parole_courtesy_investigation', `name` = 'PAROLE COURTESY INVESTIGATION - ATTACHMENTS', `parent_id` = 45 WHERE `id` = 60;
UPDATE `permission` SET `detail` = 'can_delete_docket_parole_courtesy_investigation', `name` = 'PAROLE COURTESY INVESTIGATION - DELETE', `parent_id` = 45 WHERE `id` = 61;

UPDATE `permission` SET `detail` = 'can_create_docket_parole_courtesy_supervision', `name` = 'PAROLE COURTESY SUPERVISION - CREATE', `parent_id` = 46 WHERE `id` = 62;
UPDATE `permission` SET `detail` = 'can_view_docket_parole_courtesy_supervision', `name` = 'PAROLE COURTESY SUPERVISION - VIEW', `parent_id` = 46 WHERE `id` = 63;
UPDATE `permission` SET `detail` = 'can_edit_docket_parole_courtesy_supervision', `name` = 'PAROLE COURTESY SUPERVISION - UPDATE', `parent_id` = 46 WHERE `id` = 64;
UPDATE `permission` SET `detail` = 'can_attachments_docket_parole_courtesy_supervision', `name` = 'PAROLE COURTESY SUPERVISION - ATTACHMENTS', `parent_id` = 46 WHERE `id` = 65;
UPDATE `permission` SET `detail` = 'can_delete_docket_parole_courtesy_supervision', `name` = 'PAROLE COURTESY SUPERVISION - DELETE', `parent_id` = 46 WHERE `id` = 66;

-- Pardone
UPDATE `permission` SET `detail` = 'can_access_docket_pardone', `name` = 'DOCKETING - PARDONE', `parent_id` = 1 WHERE `id` = 67;
UPDATE `permission` SET `detail` = 'can_access_docket_pardone_investigation', `name` = 'PARDONE - INVESTIGATION', `parent_id` = 67 WHERE `id` = 68;
UPDATE `permission` SET `detail` = 'can_access_docket_pardone_supervision', `name` = 'PARDONE - SUPERVISION', `parent_id` = 67 WHERE `id` = 69;
UPDATE `permission` SET `detail` = 'can_access_docket_pardone_courtesy_investigation', `name` = 'PARDONE - COURTESY INVESTIGATION', `parent_id` = 67 WHERE `id` = 70;
UPDATE `permission` SET `detail` = 'can_access_docket_pardone_courtesy_supervision', `name` = 'PARDONE - COURTESY SUPERVISION', `parent_id` = 67 WHERE `id` = 71;

UPDATE `permission` SET `detail` = 'can_create_docket_pardone_investigation', `name` = 'PARDONE INVESTIGATION - CREATE', `parent_id` = 68 WHERE `id` = 72;
UPDATE `permission` SET `detail` = 'can_view_docket_pardone_investigation', `name` = 'PARDONE INVESTIGATION - VIEW', `parent_id` = 68 WHERE `id` = 73;
UPDATE `permission` SET `detail` = 'can_edit_docket_pardone_investigation', `name` = 'PARDONE INVESTIGATION - UPDATE', `parent_id` = 68 WHERE `id` = 74;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pardone_investigation', `name` = 'PARDONE INVESTIGATION - ATTACHMENTS', `parent_id` = 68 WHERE `id` = 75;
UPDATE `permission` SET `detail` = 'can_delete_docket_pardone_investigation', `name` = 'PARDONE INVESTIGATION - DELETE', `parent_id` = 68 WHERE `id` = 76;

UPDATE `permission` SET `detail` = 'can_create_docket_pardone_supervision', `name` = 'PARDONE SUPERVISION - CREATE', `parent_id` = 69 WHERE `id` = 77;
UPDATE `permission` SET `detail` = 'can_view_docket_pardone_supervision', `name` = 'PARDONE SUPERVISION - VIEW', `parent_id` = 69 WHERE `id` = 78;
UPDATE `permission` SET `detail` = 'can_edit_docket_pardone_supervision', `name` = 'PARDONE SUPERVISION - UPDATE', `parent_id` = 69 WHERE `id` = 79;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pardone_supervision', `name` = 'PARDONE SUPERVISION - ATTACHMENTS', `parent_id` = 69 WHERE `id` = 80;
UPDATE `permission` SET `detail` = 'can_delete_docket_pardone_supervision', `name` = 'PARDONE SUPERVISION - DELETE', `parent_id` = 69 WHERE `id` = 81;

UPDATE `permission` SET `detail` = 'can_create_docket_pardone_courtesy_investigation', `name` = 'PARDONE COURTESY INVESTIGATION - CREATE', `parent_id` = 70 WHERE `id` = 82;
UPDATE `permission` SET `detail` = 'can_view_docket_pardone_courtesy_investigation', `name` = 'PARDONE COURTESY INVESTIGATION - VIEW', `parent_id` = 70 WHERE `id` = 83;
UPDATE `permission` SET `detail` = 'can_edit_docket_pardone_courtesy_investigation', `name` = 'PARDONE COURTESY INVESTIGATION - UPDATE', `parent_id` = 70 WHERE `id` = 84;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pardone_courtesy_investigation', `name` = 'PARDONE COURTESY INVESTIGATION - ATTACHMENTS', `parent_id` = 70 WHERE `id` = 85;
UPDATE `permission` SET `detail` = 'can_delete_docket_pardone_courtesy_investigation', `name` = 'PARDONE COURTESY INVESTIGATION - DELETE', `parent_id` = 70 WHERE `id` = 86;

UPDATE `permission` SET `detail` = 'can_create_docket_pardone_courtesy_supervision', `name` = 'PARDONE COURTESY SUPERVISION - CREATE', `parent_id` = 71 WHERE `id` = 87;
UPDATE `permission` SET `detail` = 'can_view_docket_pardone_courtesy_supervision', `name` = 'PARDONE COURTESY SUPERVISION - VIEW', `parent_id` = 71 WHERE `id` = 88;
UPDATE `permission` SET `detail` = 'can_edit_docket_pardone_courtesy_supervision', `name` = 'PARDONE COURTESY SUPERVISION - UPDATE', `parent_id` = 71 WHERE `id` = 89;
UPDATE `permission` SET `detail` = 'can_attachments_docket_pardone_courtesy_supervision', `name` = 'PARDONE COURTESY SUPERVISION - ATTACHMENTS', `parent_id` = 71 WHERE `id` = 90;
UPDATE `permission` SET `detail` = 'can_delete_docket_pardone_courtesy_supervision', `name` = 'PARDONE COURTESY SUPERVISION - DELETE', `parent_id` = 71 WHERE `id` = 91;

-- Docket routing
UPDATE `permission` SET `detail` = 'can_access_docket_routing_module', `name` = 'DOCKET ROUTING MODULE', `parent_id` = NULL WHERE `id` = 92;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_probation', `name` = 'DOCKET ROUTING - PROBATION', `parent_id` = 92 WHERE `id` = 93;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_pre_parole', `name` = 'DOCKET ROUTING - PRE-PAROLE', `parent_id` = 92 WHERE `id` = 94;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_parole', `name` = 'DOCKET ROUTING - PAROLE', `parent_id` = 92 WHERE `id` = 95;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_pardone', `name` = 'DOCKET ROUTING - PARDONE', `parent_id` = 92 WHERE `id` = 96;

UPDATE `permission` SET `detail` = 'can_forward_docket_routing_probation', `name` = 'DOCKET ROUTING - PROBATION FORWARD', `parent_id` = 93 WHERE `id` = 97;
UPDATE `permission` SET `detail` = 'can_forward_docket_routing_pre_parole', `name` = 'DOCKET ROUTING - PRE-PAROLE FORWARD', `parent_id` = 94 WHERE `id` = 98;
UPDATE `permission` SET `detail` = 'can_forward_docket_routing_parole', `name` = 'DOCKET ROUTING - PAROLE FORWARD', `parent_id` = 95 WHERE `id` = 99;
UPDATE `permission` SET `detail` = 'can_forward_docket_routing_pardone', `name` = 'DOCKET ROUTING - PARDONE FORWARD', `parent_id` = 96 WHERE `id` = 100;

UPDATE `permission` SET `detail` = 'can_access_docket_routing_pdl', `name` = 'DOCKET ROUTING - PDL', `parent_id` = 92 WHERE `id` = 101;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent', `name` = 'DOCKET ROUTING - SENT', `parent_id` = 92 WHERE `id` = 102;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox', `name` = 'DOCKET ROUTING - INBOX', `parent_id` = 92 WHERE `id` = 103;

UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent_probation', `name` = 'SENT - PROBATION', `parent_id` = 102 WHERE `id` = 104;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent_pre_parole', `name` = 'SENT - PRE-PAROLE', `parent_id` = 102 WHERE `id` = 105;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent_parole', `name` = 'SENT - PAROLE', `parent_id` = 102 WHERE `id` = 106;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent_pardone', `name` = 'SENT - PARDONE', `parent_id` = 102 WHERE `id` = 107;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_sent_pdl', `name` = 'SENT - PDL', `parent_id` = 102 WHERE `id` = 108;

UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox_probation', `name` = 'INBOX - PROBATION', `parent_id` = 103 WHERE `id` = 109;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox_pre_parole', `name` = 'INBOX - PRE-PAROLE', `parent_id` = 103 WHERE `id` = 110;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox_parole', `name` = 'INBOX - PAROLE', `parent_id` = 103 WHERE `id` = 111;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox_pardone', `name` = 'INBOX - PARDONE', `parent_id` = 103 WHERE `id` = 112;
UPDATE `permission` SET `detail` = 'can_access_docket_routing_inbox_pdl', `name` = 'INBOX - PDL', `parent_id` = 103 WHERE `id` = 113;

-- Fact sheet
UPDATE `permission` SET `detail` = 'can_access_fact_sheet', `name` = 'FACT SHEET', `parent_id` = NULL WHERE `id` = 114;
UPDATE `permission` SET `detail` = 'can_access_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION', `parent_id` = 114 WHERE `id` = 115;
UPDATE `permission` SET `detail` = 'can_access_fact_sheet_pre_parole', `name` = 'FACT SHEET - PRE-PAROLE', `parent_id` = 114 WHERE `id` = 116;
UPDATE `permission` SET `detail` = 'can_access_fact_sheet_parole_pardone', `name` = 'FACT SHEET - PAROLE AND PARDONE', `parent_id` = 114 WHERE `id` = 117;
UPDATE `permission` SET `detail` = 'can_access_fact_sheet_pdl', `name` = 'FACT SHEET - PDL', `parent_id` = 114 WHERE `id` = 118;

UPDATE `permission` SET `detail` = 'can_create_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION CREATE', `parent_id` = 115 WHERE `id` = 119;
UPDATE `permission` SET `detail` = 'can_edit_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION UPDATE', `parent_id` = 115 WHERE `id` = 120;
UPDATE `permission` SET `detail` = 'can_attachments_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION ATTACHMENTS', `parent_id` = 115 WHERE `id` = 121;
UPDATE `permission` SET `detail` = 'can_worksheet_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION WORKSHEET', `parent_id` = 115 WHERE `id` = 122;
UPDATE `permission` SET `detail` = 'can_psir_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION PSIR', `parent_id` = 115 WHERE `id` = 123;
UPDATE `permission` SET `detail` = 'can_generate_psir_fact_sheet_probation', `name` = 'FACT SHEET - PROBATION GENERATE PSIR', `parent_id` = 115 WHERE `id` = 124;

UPDATE `permission` SET `detail` = 'can_create_fact_sheet_parole_pardone', `name` = 'FACT SHEET - PAROLE AND PARDONE CREATE', `parent_id` = 117 WHERE `id` = 125;
UPDATE `permission` SET `detail` = 'can_edit_fact_sheet_parole_pardone', `name` = 'FACT SHEET - PAROLE AND PARDONE UPDATE', `parent_id` = 117 WHERE `id` = 126;
UPDATE `permission` SET `detail` = 'can_attachments_fact_sheet_parole_pardone', `name` = 'FACT SHEET - PAROLE AND PARDONE ATTACHMENTS', `parent_id` = 117 WHERE `id` = 127;

UPDATE `permission` SET `detail` = 'can_create_fact_sheet_pdl', `name` = 'FACT SHEET - PDL CREATE', `parent_id` = 118 WHERE `id` = 128;
UPDATE `permission` SET `detail` = 'can_edit_fact_sheet_pdl', `name` = 'FACT SHEET - PDL UPDATE', `parent_id` = 118 WHERE `id` = 129;
UPDATE `permission` SET `detail` = 'can_view_fact_sheet_pdl', `name` = 'FACT SHEET - PDL VIEW', `parent_id` = 118 WHERE `id` = 130;
UPDATE `permission` SET `detail` = 'can_attachments_fact_sheet_pdl', `name` = 'FACT SHEET - PDL ATTACHMENTS', `parent_id` = 118 WHERE `id` = 131;

-- Forms / org
UPDATE `permission` SET `detail` = 'can_access_forms', `name` = 'FORMS', `parent_id` = NULL WHERE `id` = 132;
UPDATE `permission` SET `detail` = 'can_access_organization', `name` = 'MY ORGANIZATION', `parent_id` = NULL WHERE `id` = 133;
UPDATE `permission` SET `detail` = 'can_access_organization_user_accounts', `name` = 'USER ACCOUNTS', `parent_id` = 133 WHERE `id` = 134;
UPDATE `permission` SET `detail` = 'can_access_organization_user_roles', `name` = 'USER ROLES', `parent_id` = 133 WHERE `id` = 135;
UPDATE `permission` SET `detail` = 'can_access_organization_field_offices', `name` = 'FIELD OFFICES', `parent_id` = 133 WHERE `id` = 136;
UPDATE `permission` SET `detail` = 'can_access_organization_regions', `name` = 'REGIONS', `parent_id` = 133 WHERE `id` = 137;
UPDATE `permission` SET `detail` = 'can_access_organization_permissions', `name` = 'PERMISSIONS', `parent_id` = 133 WHERE `id` = 138;

-- Missing: Probation courtesy investigation/supervision ACTION permissions (were used in UI as pb_cinv_* / pb_csup_*)
INSERT INTO `permission` (`id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`, `detail`, `name`, `parent_id`, `type`, `value`) VALUES
(139, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_create_docket_probation_courtesy_investigation', 'PROBATION COURTESY INVESTIGATION - CREATE', 5, 'ACTION', 0),
(140, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_view_docket_probation_courtesy_investigation', 'PROBATION COURTESY INVESTIGATION - VIEW', 5, 'ACTION', 0),
(141, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_edit_docket_probation_courtesy_investigation', 'PROBATION COURTESY INVESTIGATION - UPDATE', 5, 'ACTION', 0),
(142, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_attachments_docket_probation_courtesy_investigation', 'PROBATION COURTESY INVESTIGATION - ATTACHMENTS', 5, 'ACTION', 0),
(143, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_delete_docket_probation_courtesy_investigation', 'PROBATION COURTESY INVESTIGATION - DELETE', 5, 'ACTION', 0),
(144, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_create_docket_probation_courtesy_supervision', 'PROBATION COURTESY SUPERVISION - CREATE', 6, 'ACTION', 0),
(145, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_view_docket_probation_courtesy_supervision', 'PROBATION COURTESY SUPERVISION - VIEW', 6, 'ACTION', 0),
(146, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_edit_docket_probation_courtesy_supervision', 'PROBATION COURTESY SUPERVISION - UPDATE', 6, 'ACTION', 0),
(147, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_attachments_docket_probation_courtesy_supervision', 'PROBATION COURTESY SUPERVISION - ATTACHMENTS', 6, 'ACTION', 0),
(148, 'SYSTEM', NOW(), 1, NULL, NULL, 'can_delete_docket_probation_courtesy_supervision', 'PROBATION COURTESY SUPERVISION - DELETE', 6, 'ACTION', 0);

COMMIT;
