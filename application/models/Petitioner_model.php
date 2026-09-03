<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Snapshot cache for offline petitioner list/search (not port 8000).
 */
class Petitioner_model extends CI_Model
{
	const CACHE_TABLE = 'petitioner_offline_cache';
	const META_TABLE = 'petitioner_sync_meta';
	const SOURCE_TABLE = 'petitioner_profile';

	/** @var string[] */
	private $default_client_types = array('PROBATIONER', 'PAROLEE', 'PARDONEE');

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		if (defined('PIS_OFFLINE_CLIENT_TYPES') && PIS_OFFLINE_CLIENT_TYPES !== '') {
			$parts = array_filter(array_map('trim', explode(',', strtoupper(PIS_OFFLINE_CLIENT_TYPES))));
			if (!empty($parts)) {
				$this->default_client_types = array_values($parts);
			}
		}
	}

	public function ensure_schema()
	{
		$this->db->query("
			CREATE TABLE IF NOT EXISTS `".self::CACHE_TABLE."` (
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
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		");
		if ($this->db->table_exists(self::CACHE_TABLE) && !$this->db->field_exists('created_date', self::CACHE_TABLE)) {
			$this->db->query("ALTER TABLE `".self::CACHE_TABLE."` ADD COLUMN `created_date` DATETIME NULL AFTER `created_by`");
			$this->db->query("ALTER TABLE `".self::CACHE_TABLE."` ADD KEY `idx_created_date` (`created_date`)");
		}
		$this->db->query("
			CREATE TABLE IF NOT EXISTS `".self::META_TABLE."` (
			  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
			  `field_office_id` VARCHAR(64) NOT NULL,
			  `client_types` VARCHAR(255) NOT NULL,
			  `record_count` INT NOT NULL DEFAULT 0,
			  `last_synced_at` DATETIME NOT NULL,
			  `last_sync_status` VARCHAR(32) NOT NULL,
			  `last_sync_message` VARCHAR(500) NULL,
			  PRIMARY KEY (`id`),
			  UNIQUE KEY `uq_office` (`field_office_id`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		");
	}

	public function default_client_types()
	{
		return $this->default_client_types;
	}

	/**
	 * Pull live petitioners into snapshot cache for an office.
	 *
	 * @param string $field_office_id
	 * @param string[]|null $client_types
	 * @param string|null $field_office_name
	 * @param string|null $online_base Java API base e.g. http://localhost:8000
	 * @return array
	 */
	public function sync_office($field_office_id, $client_types = null, $field_office_name = null, $online_base = null)
	{
		$this->ensure_schema();
		$field_office_id = trim((string) $field_office_id);
		if ($field_office_id === '') {
			return array(
				'status' => 'FAILED',
				'message' => 'field_office is required',
				'record_count' => 0,
			);
		}

		$client_types = $this->normalize_client_types($client_types);
		$synced_at = date('Y-m-d H:i:s');
		$payloads = array();
		$source = 'db';

		try {
			$payloads = $this->fetch_from_source_table($field_office_id, $client_types, $field_office_name);
		} catch (Exception $e) {
			$payloads = array();
			$source = 'http';
		}

		if (empty($payloads)) {
			$http_rows = $this->fetch_from_online_api($field_office_id, $client_types, $online_base);
			if (!empty($http_rows)) {
				$payloads = $http_rows;
				$source = 'http';
			}
		}

		$this->db->where('field_office_id', $field_office_id);
		$this->db->where_in('client_type', $client_types);
		$this->db->delete(self::CACHE_TABLE);

		$count = 0;
		foreach ($payloads as $item) {
			$row = $this->payload_to_cache_row($item, $field_office_id, $synced_at);
			if ($row === null) {
				continue;
			}
			$this->db->replace(self::CACHE_TABLE, $row);
			$count++;
		}

		$status = 'SUCCESS';
		$message = 'Synced '.$count.' petitioner(s) via '.$source;
		if ($count === 0) {
			$message = 'Sync completed with 0 records (source='.$source.')';
		}

		$this->upsert_sync_meta($field_office_id, $client_types, $count, $synced_at, $status, $message);

		return array(
			'status' => $status,
			'message' => $message,
			'record_count' => $count,
			'source' => $source,
			'field_office' => $field_office_id,
			'types' => $client_types,
			'last_synced_at' => $synced_at,
		);
	}

	/**
	 * Paginated list from snapshot (mirrors GET /petitioner?page&size&type&officeId).
	 * Offline-only: optional createdBy filters to petitioners created by that user UUID.
	 */
	public function offline_paginated($page, $size, $type, $office_id, $created_by = null)
	{
		$this->ensure_schema();
		$page = max(0, (int) $page);
		$size = max(1, min(500, (int) $size));
		$created_by = $this->normalize_created_by($created_by);

		$apply_filters = function () use ($type, $office_id, $created_by) {
			$this->db->where('client_type', strtoupper(trim((string) $type)));
			if (strtoupper((string) $office_id) !== 'ALL') {
				$this->db->where('field_office_id', $office_id);
			}
			if ($created_by !== '') {
				$this->db->where('created_by', $created_by);
			}
		};

		$this->db->from(self::CACHE_TABLE);
		$apply_filters();
		$total = $this->db->count_all_results();

		$this->db->from(self::CACHE_TABLE);
		$apply_filters();
		$this->db->order_by('full_name', 'ASC');
		$this->db->limit($size, $page * $size);
		$rows = $this->db->get()->result_array();

		return $this->build_spring_page($this->decode_payloads($rows), $page, $size, $total);
	}

	/**
	 * Get single petitioner by id (mirrors GET /petitioner/{id}).
	 */
	public function offline_get_by_id($id)
	{
		$this->ensure_schema();
		$id = (int) $id;
		if ($id <= 0) {
			return array();
		}

		$row = $this->db->get_where(self::CACHE_TABLE, array('source_id' => $id), 1)->row_array();
		if (!empty($row)) {
			$decoded = json_decode($row['payload'], true);
			return is_array($decoded) ? $decoded : array();
		}

		if ($this->db->table_exists(self::SOURCE_TABLE)) {
			$source = $this->db->get_where(self::SOURCE_TABLE, array('id' => $id), 1)->row_array();
			if (!empty($source) && $this->is_active_status(isset($source['status']) ? $source['status'] : true)) {
				return $this->map_source_row_to_response($source, null);
			}
		}

		return array();
	}

	/**
	 * Search snapshot (mirrors POST /petitioner/search/{clientType}).
	 *
	 * @param array $request keys: name/search, fieldOfficeId/field_office, canSeeOtherOffices,
	 *                          createdBy, createdDate (YYYY-MM-DD or YYYY-MM-DD HH:mm:ss),
	 *                          createdDateFrom, createdDateTo
	 */
	public function offline_search($page, $size, $client_type, $request)
	{
		$this->ensure_schema();
		$page = max(0, (int) $page);
		$size = max(1, min(500, (int) $size));
		$client_type = strtoupper(trim((string) $client_type));
		$keyword = '';
		if (isset($request['search']) && $request['search'] !== '') {
			$keyword = trim((string) $request['search']);
		} elseif (isset($request['name']) && $request['name'] !== '') {
			$keyword = trim((string) $request['name']);
		}
		$office_id = '';
		if (isset($request['fieldOfficeId']) && $request['fieldOfficeId'] !== '') {
			$office_id = trim((string) $request['fieldOfficeId']);
		} elseif (isset($request['field_office']) && $request['field_office'] !== '') {
			$office_id = trim((string) $request['field_office']);
		}
		$can_see_other = !empty($request['canSeeOtherOffices']);
		$created_by = '';
		if (isset($request['createdBy']) && $request['createdBy'] !== '') {
			$created_by = trim((string) $request['createdBy']);
		} elseif (isset($request['created_by']) && $request['created_by'] !== '') {
			$created_by = trim((string) $request['created_by']);
		}
		$date_range = $this->resolve_created_date_range($request);

		$apply_filters = function () use ($client_type, $office_id, $can_see_other, $keyword, $created_by, $date_range) {
			$this->db->where('client_type', $client_type);
			if (!$can_see_other && $office_id !== '' && strtoupper($office_id) !== 'ALL') {
				$this->db->where('field_office_id', $office_id);
			}
			if ($created_by !== '') {
				$this->db->where('created_by', $created_by);
			}
			if ($date_range['from'] !== null) {
				$this->db->where('created_date >=', $date_range['from']);
			}
			if ($date_range['to'] !== null) {
				$this->db->where('created_date <=', $date_range['to']);
			}
			if ($keyword !== '') {
				$esc = $this->db->escape_like_str($keyword);
				$this->db->group_start();
				$this->db->like('full_name', $esc);
				$this->db->or_like('first_name', $esc);
				$this->db->or_like('middle_name', $esc);
				$this->db->or_like('last_name', $esc);
				$this->db->or_like('criminal_case_number', $esc);
				$this->db->or_like('docket_number', $esc);
				$this->db->group_end();
			}
		};

		$this->db->from(self::CACHE_TABLE);
		$apply_filters();
		$total = $this->db->count_all_results();

		$this->db->from(self::CACHE_TABLE);
		$apply_filters();
		$this->db->order_by('full_name', 'ASC');
		$this->db->limit($size, $page * $size);
		$rows = $this->db->get()->result_array();

		return $this->build_spring_page($this->decode_payloads($rows), $page, $size, $total);
	}

	/**
	 * Resolve created-date filter bounds from request.
	 * - createdDate alone → that calendar day (00:00:00–23:59:59)
	 * - createdDateFrom / createdDateTo → inclusive range (optional either side)
	 *
	 * @return array{from:?string,to:?string}
	 */
	private function resolve_created_date_range($request)
	{
		$from = $this->pick_request_value($request, array('createdDateFrom', 'created_date_from'));
		$to = $this->pick_request_value($request, array('createdDateTo', 'created_date_to'));
		$single = $this->pick_request_value($request, array('createdDate', 'created_date'));

		if ($from === '' && $to === '' && $single !== '') {
			$day = $this->normalize_date_only($single);
			if ($day === null) {
				return array('from' => null, 'to' => null);
			}
			return array(
				'from' => $day.' 00:00:00',
				'to' => $day.' 23:59:59',
			);
		}

		$from_bound = null;
		$to_bound = null;
		if ($from !== '') {
			$from_bound = $this->normalize_datetime_start($from);
		}
		if ($to !== '') {
			$to_bound = $this->normalize_datetime_end($to);
		}
		return array('from' => $from_bound, 'to' => $to_bound);
	}

	private function pick_request_value($request, $keys)
	{
		foreach ($keys as $key) {
			if (isset($request[$key]) && $request[$key] !== '' && $request[$key] !== null) {
				return trim((string) $request[$key]);
			}
		}
		return '';
	}

	private function normalize_date_only($value)
	{
		$value = trim((string) $value);
		if ($value === '') {
			return null;
		}
		if (preg_match('/^(\d{4}-\d{2}-\d{2})/', $value, $m)) {
			return $m[1];
		}
		$ts = strtotime($value);
		if ($ts === false) {
			return null;
		}
		return date('Y-m-d', $ts);
	}

	private function normalize_datetime_start($value)
	{
		$value = trim((string) $value);
		if ($value === '') {
			return null;
		}
		if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
			return $value.' 00:00:00';
		}
		if (preg_match('/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/', $value)) {
			return str_replace('T', ' ', substr($value, 0, 19));
		}
		$ts = strtotime($value);
		return ($ts === false) ? null : date('Y-m-d H:i:s', $ts);
	}

	private function normalize_datetime_end($value)
	{
		$value = trim((string) $value);
		if ($value === '') {
			return null;
		}
		if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
			return $value.' 23:59:59';
		}
		if (preg_match('/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/', $value)) {
			return str_replace('T', ' ', substr($value, 0, 19));
		}
		$ts = strtotime($value);
		return ($ts === false) ? null : date('Y-m-d H:i:s', $ts);
	}

	private function normalize_client_types($client_types)
	{
		if ($client_types === null || $client_types === '') {
			return $this->default_client_types;
		}
		if (is_string($client_types)) {
			$client_types = explode(',', $client_types);
		}
		if (!is_array($client_types)) {
			return $this->default_client_types;
		}
		$out = array();
		foreach ($client_types as $t) {
			$t = strtoupper(trim((string) $t));
			if ($t !== '' && in_array($t, $this->default_client_types, true)) {
				$out[] = $t;
			}
		}
		return !empty($out) ? array_values(array_unique($out)) : $this->default_client_types;
	}

	private function normalize_created_by($created_by)
	{
		if ($created_by === null) {
			return '';
		}
		return trim((string) $created_by);
	}

	private function fetch_from_source_table($field_office_id, $client_types, $field_office_name)
	{
		if (!$this->db->table_exists(self::SOURCE_TABLE)) {
			throw new Exception('source table missing');
		}
		$this->db->from(self::SOURCE_TABLE);
		$this->db->where('field_office_id', $field_office_id);
		$this->db->where_in('client_type', $client_types);
		$this->db->group_start();
		$this->db->where('status', 1);
		$this->db->or_where('status', true);
		$this->db->or_where('status', '1');
		$this->db->group_end();
		$rows = $this->db->get()->result_array();
		$out = array();
		foreach ($rows as $row) {
			$out[] = $this->map_source_row_to_response($row, $field_office_name);
		}
		return $out;
	}

	private function fetch_from_online_api($field_office_id, $client_types, $online_base)
	{
		$base = $this->resolve_online_base($online_base);
		if ($base === '') {
			return array();
		}
		$merged = array();
		$seen = array();
		foreach ($client_types as $client_type) {
			$page = 0;
			$size = 200;
			do {
				$url = rtrim($base, '/').'/petitioner'
					.'?page='.$page.'&size='.$size
					.'&type='.rawurlencode($client_type)
					.'&officeId='.rawurlencode($field_office_id);
				$resp = $this->http_json('GET', $url);
				if ($resp === null || empty($resp['content']) || !is_array($resp['content'])) {
					break;
				}
				foreach ($resp['content'] as $item) {
					if (!is_array($item)) {
						continue;
					}
					$key = (isset($item['id']) ? $item['id'] : '')
						.'|'.(isset($item['fieldOfficeId']) ? $item['fieldOfficeId'] : $field_office_id);
					if (isset($seen[$key])) {
						continue;
					}
					$seen[$key] = true;
					$merged[] = $item;
				}
				$total_pages = isset($resp['totalPages']) ? (int) $resp['totalPages'] : 1;
				$page++;
			} while ($page < $total_pages && $page < 100);
		}
		return $merged;
	}

	private function resolve_online_base($online_base)
	{
		if (is_string($online_base) && trim($online_base) !== '') {
			return rtrim(trim($online_base), '/');
		}
		if (defined('PIS_DOCKET_ONLINE_BASE') && PIS_DOCKET_ONLINE_BASE !== '') {
			return rtrim(PIS_DOCKET_ONLINE_BASE, '/');
		}
		$host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/:\d+$/', '', (string) $_SERVER['HTTP_HOST']) : 'localhost';
		$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
		$protocol = $https ? 'https://' : 'http://';
		$path_style = defined('PIS_API_PATH_STYLE') ? PIS_API_PATH_STYLE : 'auto';
		$is_path = false;
		if ($path_style === true || $path_style === 'true' || $path_style === 1 || $path_style === '1') {
			$is_path = true;
		} elseif ($path_style === 'auto') {
			$h = strtolower($host);
			$is_local = ($h === 'localhost' || $h === '127.0.0.1' || $h === '::1' || substr($h, -6) === '.local');
			$is_path = !$is_local;
		}
		return $is_path ? ($protocol.$host.'/8000') : ($protocol.$host.':8000');
	}

	private function http_json($method, $url, $body = null)
	{
		if (!function_exists('curl_init')) {
			return null;
		}
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($ch, CURLOPT_TIMEOUT, 60);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		$headers = array('Accept: application/json');
		if ($body !== null) {
			$headers[] = 'Content-Type: application/json';
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		}
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$raw = curl_exec($ch);
		$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		if ($raw === false || $code < 200 || $code >= 300) {
			return null;
		}
		$decoded = json_decode($raw, true);
		return is_array($decoded) ? $decoded : null;
	}

	private function is_active_status($status)
	{
		return $status === true || $status === 1 || $status === '1' || $status === 'true';
	}

	private function map_source_row_to_response($row, $field_office_name)
	{
		$id = isset($row['id']) ? (int) $row['id'] : null;
		$field_office_id = isset($row['field_office_id']) ? $row['field_office_id'] : null;
		return array(
			'id' => $id,
			'clientType' => isset($row['client_type']) ? $row['client_type'] : null,
			'fullName' => isset($row['full_name']) ? $row['full_name'] : null,
			'docketNumber' => isset($row['docket_number']) ? $row['docket_number'] : null,
			'firstName' => isset($row['first_name']) ? $row['first_name'] : null,
			'middleName' => isset($row['middle_name']) ? $row['middle_name'] : null,
			'lastName' => isset($row['last_name']) ? $row['last_name'] : null,
			'suffixName' => isset($row['suffix_name']) ? $row['suffix_name'] : null,
			'sex' => isset($row['sex']) ? $row['sex'] : null,
			'education' => isset($row['education']) ? $row['education'] : null,
			'occupation' => isset($row['occupation']) ? $row['occupation'] : null,
			'criminalCaseNo' => isset($row['criminal_case_number']) ? $row['criminal_case_number'] : null,
			'fieldOfficeId' => $field_office_id,
			'fieldOfficeName' => $field_office_name !== null ? $field_office_name : $this->lookup_field_office_name($field_office_id),
			'birthDate' => isset($row['birthdate']) ? $row['birthdate'] : null,
			'birthCity' => isset($row['birthCity']) ? $row['birthCity'] : null,
			'permanentAddress' => isset($row['permanent_address']) ? $row['permanent_address'] : null,
			'createdBy' => isset($row['created_by']) ? $row['created_by'] : null,
			'createdByName' => $this->lookup_user_name(isset($row['created_by']) ? $row['created_by'] : null),
			'createdDate' => isset($row['created_date']) ? $row['created_date'] : null,
			'updatedBy' => isset($row['updated_by']) ? $row['updated_by'] : null,
			'updatedByName' => $this->lookup_user_name(isset($row['updated_by']) ? $row['updated_by'] : null),
			'status' => $this->is_active_status(isset($row['status']) ? $row['status'] : true),
			'worksheetStatus' => $this->lookup_worksheet_status($id),
			'psirStatus' => 'Not Available',
			'prisonNumber' => isset($row['prison_number']) ? $row['prison_number'] : null,
			'prisonName' => isset($row['prison_name']) ? $row['prison_name'] : null,
			'alias' => isset($row['alias']) ? $row['alias'] : null,
			'civilStatus' => isset($row['civil_status']) ? $row['civil_status'] : null,
			'nationality' => isset($row['nationality']) ? $row['nationality'] : null,
			'fileNumber' => isset($row['file_number']) ? $row['file_number'] : null,
			'endorsementDate' => isset($row['endorsement_date']) ? $row['endorsement_date'] : null,
			'tsdPO' => isset($row['tsd_po']) ? $row['tsd_po'] : null,
			'dateEmailedToFO' => isset($row['date_emailed_to_fo']) ? $row['date_emailed_to_fo'] : null,
			'dateReceived' => isset($row['date_received']) ? $row['date_received'] : null,
			'resultFromFO' => isset($row['result_from_fo']) ? $row['result_from_fo'] : null,
			'requestType' => isset($row['request_type']) ? $row['request_type'] : null,
			'remarks' => isset($row['remarks']) ? $row['remarks'] : null,
			'dateForwardedToBpp' => isset($row['date_forwarded_to_bpp']) ? $row['date_forwarded_to_bpp'] : null,
			'location' => isset($row['location']) ? $row['location'] : null,
			'religion' => isset($row['religion']) ? $row['religion'] : null,
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

	private function lookup_user_name($uuid)
	{
		if ($uuid === null || $uuid === '') {
			return null;
		}
		if (!$this->db->table_exists('user_profile')) {
			return null;
		}
		$this->db->select('first_name, middle_name, last_name, suffix');
		$row = $this->db->get_where('user_profile', array('uuid' => $uuid), 1)->row_array();
		if (empty($row)) {
			return null;
		}
		$parts = array();
		foreach (array('first_name', 'middle_name', 'last_name', 'suffix') as $key) {
			if (!empty($row[$key])) {
				$parts[] = trim((string) $row[$key]);
			}
		}
		return !empty($parts) ? implode(' ', $parts) : null;
	}

	private function lookup_worksheet_status($petitioner_id)
	{
		if ($petitioner_id === null || !$this->db->table_exists('worksheet')) {
			return 'Not Available';
		}
		$this->db->from('worksheet');
		$this->db->where('petitioner_id', (string) $petitioner_id);
		$this->db->group_start();
		$this->db->where('status', 1);
		$this->db->or_where('status', true);
		$this->db->or_where('status', '1');
		$this->db->group_end();
		$this->db->order_by('id', 'DESC');
		$this->db->limit(1);
		$row = $this->db->get()->row_array();
		if (empty($row)) {
			return 'Not Available';
		}
		return isset($row['worksheet_status']) && $row['worksheet_status'] !== ''
			? $row['worksheet_status']
			: 'Not Available';
	}

	private function payload_to_cache_row($item, $field_office_id, $synced_at)
	{
		if (!is_array($item)) {
			return null;
		}
		$source_id = isset($item['id']) ? (int) $item['id'] : 0;
		if ($source_id <= 0) {
			return null;
		}
		$office = isset($item['fieldOfficeId']) && $item['fieldOfficeId'] !== ''
			? (string) $item['fieldOfficeId']
			: $field_office_id;
		$client_type = isset($item['clientType']) ? strtoupper((string) $item['clientType']) : '';
		if ($client_type === '') {
			return null;
		}
		$created_date = null;
		if (isset($item['createdDate']) && $item['createdDate'] !== '') {
			$created_date = $this->normalize_datetime_start((string) $item['createdDate']);
		} elseif (isset($item['created_date']) && $item['created_date'] !== '') {
			$created_date = $this->normalize_datetime_start((string) $item['created_date']);
		}

		return array(
			'source_id' => $source_id,
			'field_office_id' => $office,
			'client_type' => $client_type,
			'created_by' => isset($item['createdBy']) ? $item['createdBy'] : null,
			'created_date' => $created_date,
			'full_name' => isset($item['fullName']) ? $item['fullName'] : null,
			'first_name' => isset($item['firstName']) ? $item['firstName'] : null,
			'middle_name' => isset($item['middleName']) ? $item['middleName'] : null,
			'last_name' => isset($item['lastName']) ? $item['lastName'] : null,
			'criminal_case_number' => isset($item['criminalCaseNo']) ? $item['criminalCaseNo'] : null,
			'docket_number' => isset($item['docketNumber']) ? $item['docketNumber'] : null,
			'payload' => json_encode($item),
			'synced_at' => $synced_at,
		);
	}

	private function upsert_sync_meta($field_office_id, $client_types, $count, $synced_at, $status, $message)
	{
		$data = array(
			'field_office_id' => $field_office_id,
			'client_types' => implode(',', $client_types),
			'record_count' => (int) $count,
			'last_synced_at' => $synced_at,
			'last_sync_status' => $status,
			'last_sync_message' => substr((string) $message, 0, 500),
		);
		$existing = $this->db->get_where(self::META_TABLE, array('field_office_id' => $field_office_id), 1)->row_array();
		if (!empty($existing)) {
			$this->db->where('field_office_id', $field_office_id);
			$this->db->update(self::META_TABLE, $data);
		} else {
			$this->db->insert(self::META_TABLE, $data);
		}
	}

	private function decode_payloads($rows)
	{
		$out = array();
		foreach ($rows as $row) {
			$decoded = json_decode($row['payload'], true);
			if (is_array($decoded)) {
				$out[] = $decoded;
			}
		}
		return $out;
	}

	private function build_spring_page($content, $page, $size, $total)
	{
		$total = (int) $total;
		$size = max(1, (int) $size);
		$page = max(0, (int) $page);
		$total_pages = $size > 0 ? (int) ceil($total / $size) : 0;
		$count = count($content);
		return array(
			'content' => $content,
			'pageable' => array(
				'sort' => array('sorted' => false, 'unsorted' => true, 'empty' => true),
				'pageNumber' => $page,
				'pageSize' => $size,
				'offset' => $page * $size,
				'paged' => true,
				'unpaged' => false,
			),
			'totalElements' => $total,
			'totalPages' => $total_pages,
			'last' => ($total_pages === 0) || ($page >= $total_pages - 1),
			'size' => $size,
			'number' => $page,
			'sort' => array('sorted' => false, 'unsorted' => true, 'empty' => true),
			'first' => $page === 0,
			'numberOfElements' => $count,
			'empty' => $count === 0,
		);
	}
}
