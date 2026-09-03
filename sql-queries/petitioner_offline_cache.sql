-- Offline petitioner snapshot cache (served by PIS PHP API, not port 8000).
-- Tables are also auto-created by Petitioner_model::ensure_schema() on first use.

CREATE TABLE IF NOT EXISTS `petitioner_offline_cache` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `source_id` BIGINT NULL,
  `field_office_id` VARCHAR(64) NOT NULL,
  `client_type` VARCHAR(32) NOT NULL,
  `created_by` VARCHAR(128) NULL,
  `created_date` DATETIME NULL,
  `full_name` VARCHAR(255) NULL,
  `first_name` VARCHAR(100) NULL,
  `middle_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `criminal_case_number` VARCHAR(255) NULL,
  `docket_number` VARCHAR(100) NULL,
  `payload` LONGTEXT NOT NULL,
  `synced_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_source_id` (`source_id`),
  KEY `idx_office_client` (`field_office_id`, `client_type`),
  KEY `idx_created_by` (`created_by`),
  KEY `idx_created_date` (`created_date`),
  KEY `idx_search_name` (`full_name`),
  KEY `idx_search_docket` (`docket_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Existing installs: add created_date if missing
-- ALTER TABLE `petitioner_offline_cache` ADD COLUMN `created_date` DATETIME NULL AFTER `created_by`;
-- ALTER TABLE `petitioner_offline_cache` ADD KEY `idx_created_date` (`created_date`);

CREATE TABLE IF NOT EXISTS `petitioner_sync_meta` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `field_office_id` VARCHAR(64) NOT NULL,
  `client_types` VARCHAR(255) NOT NULL,
  `record_count` INT NOT NULL DEFAULT 0,
  `last_synced_at` DATETIME NOT NULL,
  `last_sync_status` VARCHAR(32) NOT NULL,
  `last_sync_message` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_office` (`field_office_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
