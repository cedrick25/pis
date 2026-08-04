-- Offline worksheet table (used by PHP API — not port 8000)
-- Same shape as the Java JPA `worksheet` entity. Safe to run if table already exists.

CREATE TABLE IF NOT EXISTS `worksheet` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `petitioner_id` VARCHAR(64) NULL,
  `json_data` LONGTEXT NULL,
  `worksheet_status` VARCHAR(64) NULL,
  `type` VARCHAR(64) NULL,
  `field_office_id` VARCHAR(64) NULL,
  `created_by` VARCHAR(128) NULL,
  `created_date` DATETIME NULL,
  `updated_by` VARCHAR(128) NULL,
  `updated_date` DATETIME NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_type_petitioner` (`type`, `petitioner_id`),
  KEY `idx_type_id_status` (`type`, `id`, `status`),
  KEY `idx_field_office` (`field_office_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
