-- Offline docket book snapshot cache (PIS PHP twin API — not port 8000)
-- Run once against the same MySQL database used by the Java docket service (`pis`).

CREATE TABLE IF NOT EXISTS `docket_book_offline_cache` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `source_id` BIGINT NULL,
  `docket_number` VARCHAR(100) NOT NULL,
  `field_office_id` VARCHAR(64) NOT NULL,
  `client_type` VARCHAR(32) NOT NULL,
  `module_type` VARCHAR(64) NULL,
  `full_name` VARCHAR(255) NULL,
  `first_name` VARCHAR(100) NULL,
  `middle_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `criminal_case_number` VARCHAR(255) NULL,
  `payload` LONGTEXT NOT NULL,
  `synced_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_office_docket` (`field_office_id`, `docket_number`),
  KEY `idx_office_client` (`field_office_id`, `client_type`),
  KEY `idx_module` (`module_type`),
  KEY `idx_search_name` (`full_name`),
  KEY `idx_search_docket` (`docket_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `docket_book_sync_meta` (
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
