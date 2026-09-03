<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline worksheet reads against local MySQL `worksheet` table.
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

	/**
	 * Lookup by type + docket number + field office.
	 * Mirrors GET /worksheet/getPetitioner/{type}/{docketNumber}?fieldOfficeId=
	 * Returns empty DTO when not found (same as Java WorksheetDto::new).
	 *
	 * @param string $type
	 * @param string $docket_number
	 * @param string $field_office_id
	 * @return array
	 */
	public function get_by_type_and_docket($type, $docket_number, $field_office_id)
	{
		if (!$this->db->table_exists(self::TABLE)) {
			return $this->empty_dto();
		}

		$type = trim((string) $type);
		$docket_number = trim((string) $docket_number);
		$field_office_id = trim((string) $field_office_id);
		if ($type === '' || $docket_number === '' || $field_office_id === '') {
			return $this->empty_dto();
		}

		$this->db->from(self::TABLE);
		$this->db->where('type', $type);
		$this->db->where('docket_number', $docket_number);
		$this->db->where('field_office_id', $field_office_id);
		$this->apply_active_status_filter();
		$this->db->order_by('id', 'DESC');
		$this->db->limit(1);
		$row = $this->db->get()->row_array();
		if (empty($row)) {
			return $this->empty_dto();
		}
		return $this->map_row_to_dto($row);
	}

	private function apply_active_status_filter()
	{
		$this->db->group_start();
		$this->db->where('status', 1);
		$this->db->or_where('status', true);
		$this->db->or_where('status', '1');
		$this->db->group_end();
	}

	private function map_row_to_dto($row)
	{
		$field_office_id = isset($row['field_office_id']) ? $row['field_office_id'] : null;
		return array(
			'id' => isset($row['id']) ? (int) $row['id'] : null,
			'petitionerId' => isset($row['petitioner_id']) ? $row['petitioner_id'] : null,
			'docketNumber' => isset($row['docket_number']) ? $row['docket_number'] : null,
			'jsonData' => isset($row['json_data']) ? $row['json_data'] : null,
			'worksheetStatus' => isset($row['worksheet_status']) ? $row['worksheet_status'] : null,
			'type' => isset($row['type']) ? $row['type'] : null,
			'fieldOfficeId' => $field_office_id,
			'fieldOfficeName' => $this->lookup_field_office_name($field_office_id),
			'createdBy' => isset($row['created_by']) ? $row['created_by'] : null,
			'createdDate' => isset($row['created_date']) ? $row['created_date'] : null,
			'updatedBy' => isset($row['updated_by']) ? $row['updated_by'] : null,
			'updatedDate' => isset($row['updated_date']) ? $row['updated_date'] : null,
		);
	}

	private function empty_dto()
	{
		return array(
			'id' => null,
			'petitionerId' => null,
			'docketNumber' => null,
			'jsonData' => null,
			'worksheetStatus' => null,
			'type' => null,
			'fieldOfficeId' => null,
			'fieldOfficeName' => null,
			'createdBy' => null,
			'createdDate' => null,
			'updatedBy' => null,
			'updatedDate' => null,
		);
	}

	private function lookup_field_office_name($field_office_id)
	{
		if ($field_office_id === null || $field_office_id === '') {
			return null;
		}
		if (!$this->db->table_exists('department')) {
			return null;
		}
		$row = $this->db->get_where('department', array('id' => $field_office_id), 1)->row_array();
		if (empty($row)) {
			return null;
		}
		return isset($row['name']) ? $row['name'] : null;
	}
}
