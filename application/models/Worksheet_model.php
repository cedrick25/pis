<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline worksheet CRUD against local MySQL `worksheet` table.
 * Never calls the Java service on port 8000.
 */
class Worksheet_model extends CI_Model
{
	const TABLE = 'worksheet';

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function ensure_schema()
	{
		$this->db->query("
			CREATE TABLE IF NOT EXISTS `".self::TABLE."` (
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
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		");
	}

	/**
	 * @param array $dto WorksheetDto-like associative array
	 * @return array|null
	 */
	public function create_worksheet($dto)
	{
		$this->ensure_schema();
		$now = date('Y-m-d H:i:s');
		$row = array(
			'petitioner_id' => $this->val($dto, 'petitionerId'),
			'json_data' => $this->normalize_json_data($this->val($dto, 'jsonData')),
			'worksheet_status' => $this->val($dto, 'worksheetStatus'),
			'type' => $this->val($dto, 'type'),
			'field_office_id' => $this->val($dto, 'fieldOfficeId'),
			'created_by' => $this->val($dto, 'createdBy'),
			'created_date' => $now,
			'updated_by' => null,
			'updated_date' => null,
			'status' => 1,
		);
		if (!$this->db->insert(self::TABLE, $row)) {
			return null;
		}
		$id = (int) $this->db->insert_id();
		return $this->get_by_id_row($id);
	}

	/**
	 * @param int|string $id
	 * @param array $dto
	 * @return array|null null if not found
	 */
	public function update_worksheet($id, $dto)
	{
		$this->ensure_schema();
		$id = (int) $id;
		$existing = $this->db->get_where(self::TABLE, array('id' => $id), 1)->row_array();
		if (empty($existing)) {
			return null;
		}
		$now = date('Y-m-d H:i:s');
		$update = array(
			'petitioner_id' => $this->pick($dto, 'petitionerId', $existing['petitioner_id']),
			'json_data' => $this->normalize_json_data($this->pick($dto, 'jsonData', $existing['json_data'])),
			'worksheet_status' => $this->pick($dto, 'worksheetStatus', $existing['worksheet_status']),
			'type' => $this->pick($dto, 'type', $existing['type']),
			'field_office_id' => $this->pick($dto, 'fieldOfficeId', $existing['field_office_id']),
			'updated_by' => $this->val($dto, 'updatedBy', $this->val($dto, 'createdBy')),
			'updated_date' => $now,
		);
		$this->db->where('id', $id);
		$this->db->update(self::TABLE, $update);
		return $this->get_by_id_row($id);
	}

	/**
	 * Mirrors GET /worksheet/{type}/{id} — active rows only.
	 * Returns empty DTO array when not found (same as Java).
	 *
	 * @return array
	 */
	public function get_by_type_and_id($type, $id)
	{
		$this->ensure_schema();
		$this->db->from(self::TABLE);
		$this->db->where('type', $type);
		$this->db->where('id', (int) $id);
		$this->db->group_start();
		$this->db->where('status', 1);
		$this->db->or_where('status', true);
		$this->db->or_where('status', '1');
		$this->db->group_end();
		$row = $this->db->get()->row_array();
		if (empty($row)) {
			return $this->empty_dto();
		}
		return $this->map_row_to_dto($row);
	}

	/**
	 * Mirrors GET /worksheet/getPetitioner/{type}/{petitionerId}
	 *
	 * @return array
	 */
	public function get_by_type_and_petitioner($type, $petitioner_id)
	{
		$this->ensure_schema();
		$row = $this->db->get_where(self::TABLE, array(
			'type' => $type,
			'petitioner_id' => $petitioner_id,
		), 1)->row_array();
		if (empty($row)) {
			return $this->empty_dto();
		}
		return $this->map_row_to_dto($row);
	}

	/**
	 * Mirrors POST /worksheet/updatePetitioner/{type}/{petitionerId}
	 *
	 * @return array|null
	 */
	public function update_by_type_and_petitioner($type, $petitioner_id, $dto)
	{
		$this->ensure_schema();
		$existing = $this->db->get_where(self::TABLE, array(
			'type' => $type,
			'petitioner_id' => $petitioner_id,
		), 1)->row_array();
		if (empty($existing)) {
			return null;
		}
		return $this->update_worksheet((int) $existing['id'], $dto);
	}

	private function get_by_id_row($id)
	{
		$row = $this->db->get_where(self::TABLE, array('id' => (int) $id), 1)->row_array();
		if (empty($row)) {
			return null;
		}
		return $this->map_row_to_dto($row);
	}

	private function map_row_to_dto($row)
	{
		return array(
			'id' => isset($row['id']) ? (int) $row['id'] : null,
			'petitionerId' => isset($row['petitioner_id']) ? $row['petitioner_id'] : null,
			'jsonData' => isset($row['json_data']) ? $row['json_data'] : null,
			'worksheetStatus' => isset($row['worksheet_status']) ? $row['worksheet_status'] : null,
			'type' => isset($row['type']) ? $row['type'] : null,
			'fieldOfficeId' => isset($row['field_office_id']) ? $row['field_office_id'] : null,
			'fieldOfficeName' => null,
			'createdBy' => isset($row['created_by']) ? $row['created_by'] : null,
			'createdDate' => isset($row['created_date']) ? $row['created_date'] : null,
			'updatedBy' => isset($row['updated_by']) ? $row['updated_by'] : null,
			'updatedDate' => isset($row['updated_date']) ? $row['updated_date'] : null,
			'status' => $this->to_bool(isset($row['status']) ? $row['status'] : 1),
		);
	}

	private function empty_dto()
	{
		return array(
			'id' => null,
			'petitionerId' => null,
			'jsonData' => null,
			'worksheetStatus' => null,
			'type' => null,
			'fieldOfficeId' => null,
			'fieldOfficeName' => null,
			'createdBy' => null,
			'createdDate' => null,
			'updatedBy' => null,
			'updatedDate' => null,
			'status' => false,
		);
	}

	private function normalize_json_data($value)
	{
		if ($value === null) {
			return null;
		}
		if (is_array($value) || is_object($value)) {
			return json_encode($value);
		}
		return (string) $value;
	}

	private function val($dto, $key, $default = null)
	{
		if (!is_array($dto)) {
			return $default;
		}
		return array_key_exists($key, $dto) ? $dto[$key] : $default;
	}

	private function pick($dto, $key, $fallback)
	{
		if (!is_array($dto) || !array_key_exists($key, $dto)) {
			return $fallback;
		}
		return $dto[$key];
	}

	private function to_bool($v)
	{
		return $v === true || $v === 1 || $v === '1' || $v === 'true';
	}
}
