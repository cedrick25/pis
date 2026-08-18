-- phpMyAdmin SQL Dump
-- PIS permission — ACTIVE left-panel pages only
-- Generated: 2026-08-17
--
-- Matches Grant Permission modal + current PIS navigation.
-- Excludes unused standalone Parole/Pardone docket menus and docket Create actions.
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=latin1;

INSERT INTO `permission` (`id`, `created_by`, `created_date`, `status`, `updated_by`, `updated_date`, `detail`, `name`, `parent_id`, `type`, `value`) VALUES
-- Docketing > Probation
(1, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docketing_module', 'Docketing', NULL, 'VIEW', 0),
(2, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_probation', 'Probation', 1, 'VIEW', 0),
(3, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_probation_investigation', 'Investigation', 2, 'VIEW', 0),
(4, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_probation_supervision', 'Supervision', 2, 'VIEW', 0),
(5, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_probation_courtesy_investigation', 'Courtesy Investigation', 2, 'VIEW', 0),
(6, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_probation_courtesy_supervision', 'Courtesy Supervision', 2, 'VIEW', 0),
(8, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_probation_investigation', 'View', 3, 'ACTION', 0),
(9, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_probation_investigation', 'Update', 3, 'ACTION', 0),
(10, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_probation_investigation', 'Attachments', 3, 'ACTION', 0),
(11, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_probation_investigation', 'Delete', 3, 'ACTION', 0),
(13, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_probation_supervision', 'View', 4, 'ACTION', 0),
(14, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_probation_supervision', 'Update', 4, 'ACTION', 0),
(15, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_probation_supervision', 'Attachments', 4, 'ACTION', 0),
(16, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_probation_supervision', 'Delete', 4, 'ACTION', 0),
(140, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_probation_courtesy_investigation', 'View', 5, 'ACTION', 0),
(141, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_probation_courtesy_investigation', 'Update', 5, 'ACTION', 0),
(142, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_probation_courtesy_investigation', 'Attachments', 5, 'ACTION', 0),
(143, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_probation_courtesy_investigation', 'Delete', 5, 'ACTION', 0),
(145, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_probation_courtesy_supervision', 'View', 6, 'ACTION', 0),
(146, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_probation_courtesy_supervision', 'Update', 6, 'ACTION', 0),
(147, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_probation_courtesy_supervision', 'Attachments', 6, 'ACTION', 0),
(148, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_probation_courtesy_supervision', 'Delete', 6, 'ACTION', 0),

-- Docketing > Parole and Pardon (active parole-pardon-* pages)
(17, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_pre_parole', 'Parole and Pardon', 1, 'VIEW', 0),
(18, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_pre_parole_investigation', 'Investigation', 17, 'VIEW', 0),
(19, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_pre_parole_supervision', 'Supervision', 17, 'VIEW', 0),
(20, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_pre_parole_courtesy_investigation', 'Courtesy Investigation', 17, 'VIEW', 0),
(21, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_pre_parole_courtesy_supervision', 'Courtesy Supervision', 17, 'VIEW', 0),
(23, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_pre_parole_investigation', 'View', 18, 'ACTION', 0),
(24, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_pre_parole_investigation', 'Update', 18, 'ACTION', 0),
(25, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_pre_parole_investigation', 'Attachments', 18, 'ACTION', 0),
(26, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_pre_parole_investigation', 'Delete', 18, 'ACTION', 0),
(28, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_pre_parole_supervision', 'View', 19, 'ACTION', 0),
(29, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_pre_parole_supervision', 'Update', 19, 'ACTION', 0),
(30, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_pre_parole_supervision', 'Attachments', 19, 'ACTION', 0),
(31, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_pre_parole_supervision', 'Delete', 19, 'ACTION', 0),
(33, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_pre_parole_courtesy_investigation', 'View', 20, 'ACTION', 0),
(34, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_pre_parole_courtesy_investigation', 'Update', 20, 'ACTION', 0),
(35, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_pre_parole_courtesy_investigation', 'Attachments', 20, 'ACTION', 0),
(36, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_pre_parole_courtesy_investigation', 'Delete', 20, 'ACTION', 0),
(38, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_docket_pre_parole_courtesy_supervision', 'View', 21, 'ACTION', 0),
(39, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_docket_pre_parole_courtesy_supervision', 'Update', 21, 'ACTION', 0),
(40, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_docket_pre_parole_courtesy_supervision', 'Attachments', 21, 'ACTION', 0),
(41, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_delete_docket_pre_parole_courtesy_supervision', 'Delete', 21, 'ACTION', 0),

-- Docket Routing (active nav)
-- module (92) -> CSD dropdown (149) + PDL + Sent + Inbox
(92, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_module', 'Docket Routing', NULL, 'VIEW', 0),
(149, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_module_csd', 'Docket Routing (CSD)', 92, 'VIEW', 0),
(93, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_probation', 'Probation', 149, 'VIEW', 0),
(94, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_pre_parole', 'Pre-Parole', 149, 'VIEW', 0),
(95, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_parole', 'Parole', 149, 'VIEW', 0),
(96, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_pardone', 'Pardone', 149, 'VIEW', 0),
(97, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_forward_docket_routing_probation', 'Forward', 93, 'ACTION', 0),
(98, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_forward_docket_routing_pre_parole', 'Forward', 94, 'ACTION', 0),
(99, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_forward_docket_routing_parole', 'Forward', 95, 'ACTION', 0),
(100, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_forward_docket_routing_pardone', 'Forward', 96, 'ACTION', 0),
(101, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_pdl', 'PDL Routing', 92, 'VIEW', 0),
(102, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent', 'Sent', 92, 'VIEW', 0),
(103, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox', 'Inbox', 92, 'VIEW', 0),
(104, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent_probation', 'Probation', 102, 'VIEW', 0),
(105, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent_pre_parole', 'Pre-Parole', 102, 'VIEW', 0),
(106, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent_parole', 'Parole', 102, 'VIEW', 0),
(107, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent_pardone', 'Pardone', 102, 'VIEW', 0),
(108, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_sent_pdl', 'PDL', 102, 'VIEW', 0),
(109, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox_probation', 'Probation', 103, 'VIEW', 0),
(110, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox_pre_parole', 'Pre-Parole', 103, 'VIEW', 0),
(111, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox_parole', 'Parole', 103, 'VIEW', 0),
(112, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox_pardone', 'Pardone', 103, 'VIEW', 0),
(113, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_docket_routing_inbox_pdl', 'PDL', 103, 'VIEW', 0),

-- Fact Sheet (active nav only — no Pre-Parole fact sheet)
(114, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_fact_sheet', 'Fact Sheet', NULL, 'VIEW', 0),
(115, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_fact_sheet_probation', 'Probation', 114, 'VIEW', 0),
(117, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_fact_sheet_parole_pardone', 'Parole and Pardone', 114, 'VIEW', 0),
(118, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_fact_sheet_pdl', 'PDL', 114, 'VIEW', 0),
(119, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_create_fact_sheet_probation', 'Create', 115, 'ACTION', 0),
(120, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_fact_sheet_probation', 'Update', 115, 'ACTION', 0),
(121, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_fact_sheet_probation', 'Attachments', 115, 'ACTION', 0),
(122, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_worksheet_fact_sheet_probation', 'Worksheet', 115, 'ACTION', 0),
(123, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_psir_fact_sheet_probation', 'PSIR', 115, 'ACTION', 0),
(124, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_generate_psir_fact_sheet_probation', 'Generate PSIR', 115, 'ACTION', 0),
(125, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_create_fact_sheet_parole_pardone', 'Create', 117, 'ACTION', 0),
(126, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_fact_sheet_parole_pardone', 'Update', 117, 'ACTION', 0),
(127, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_fact_sheet_parole_pardone', 'Attachments', 117, 'ACTION', 0),
(128, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_create_fact_sheet_pdl', 'Create', 118, 'ACTION', 0),
(129, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_edit_fact_sheet_pdl', 'Update', 118, 'ACTION', 0),
(130, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_view_fact_sheet_pdl', 'View', 118, 'ACTION', 0),
(131, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_attachments_fact_sheet_pdl', 'Attachments', 118, 'ACTION', 0),

-- Forms / Organization
(132, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_forms', 'Forms', NULL, 'VIEW', 0),
(133, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization', 'My Organization', NULL, 'VIEW', 0),
(134, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization_user_accounts', 'User Accounts', 133, 'VIEW', 0),
(135, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization_user_roles', 'User Roles', 133, 'VIEW', 0),
(136, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization_field_offices', 'Field Offices', 133, 'VIEW', 0),
(137, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization_regions', 'Regions', 133, 'VIEW', 0),
(138, 'SYSTEM', '2026-08-17 00:00:00', 1, NULL, NULL, 'can_access_organization_permissions', 'Permissions', 133, 'VIEW', 0);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
