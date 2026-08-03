<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Snapshot cache for offline docket-book list/search (not port 8000).
 */
class Docket_book_model extends CI_Model
{
	const CACHE_TABLE = 'docket_book_offline_cache';
	const META_TABLE = 'docket_book_sync_meta';
	const SOURCE_TABLE = 'docket_book';

	/** @var string[] */
	private $default_client_types = array('PROBATIONER', 'PAROLEE', 'PARDONEE');

	/** Module types used when syncing via live HTTP API (fallback). */
	private $module_types = array(
		'PIS_INV', 'PIS_SUP', 'PIS_CSINV', 'PIS_CSUP',
		'SC_PR_INV', 'SC_PR_SUP', 'SC_PR_CINV', 'SC_PR_CSUP',
		'SC_PD_INV', 'SC_PD_SUP', 'SC_PD_CINV', 'SC_PD_CSUP',
		'SC_PPI_INV', 'SC_PPI_SUP', 'SC_PPI_CINV', 'SC_PPI_CSUP',
		'SC_PE_INV', 'SC_PE_SUP', 'SC_PE_CINV', 'SC_PE_CSUP',
	);

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
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		");
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
	 * Pull live dockets into snapshot cache for an office.
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
		$message = 'Synced '.$count.' docket book(s) via '.$source;
		if ($count === 0) {
			$status = 'SUCCESS';
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

	public function get_sync_status($field_office_id)
	{
		$this->ensure_schema();
		$field_office_id = trim((string) $field_office_id);
		$row = $this->db->get_where(self::META_TABLE, array('field_office_id' => $field_office_id), 1)->row_array();
		if (empty($row)) {
			return array(
				'status' => 'SUCCESS',
				'synced' => false,
				'field_office' => $field_office_id,
				'record_count' => 0,
				'last_synced_at' => null,
				'message' => 'No snapshot yet — login while online to sync',
			);
		}
		return array(
			'status' => 'SUCCESS',
			'synced' => true,
			'field_office' => $field_office_id,
			'record_count' => (int) $row['record_count'],
			'last_synced_at' => $row['last_synced_at'],
			'last_sync_status' => $row['last_sync_status'],
			'message' => $row['last_sync_message'],
			'client_types' => $row['client_types'],
		);
	}

	/**
	 * Paginated list from snapshot (mirrors GET /docketbook?page&size&type&officeId).
	 */
	public function offline_paginated($page, $size, $module_type, $office_id)
	{
		$this->ensure_schema();
		$page = max(0, (int) $page);
		$size = max(1, min(500, (int) $size));

		$this->db->from(self::CACHE_TABLE);
		$this->db->where('module_type', $module_type);
		if (strtoupper((string) $office_id) !== 'ALL') {
			$this->db->where('field_office_id', $office_id);
		}
		$total = $this->db->count_all_results();

		$this->db->from(self::CACHE_TABLE);
		$this->db->where('module_type', $module_type);
		if (strtoupper((string) $office_id) !== 'ALL') {
			$this->db->where('field_office_id', $office_id);
		}
		$this->db->order_by('docket_number', 'ASC');
		$this->db->limit($size, $page * $size);
		$rows = $this->db->get()->result_array();

		return $this->build_spring_page($this->decode_payloads($rows), $page, $size, $total);
	}

	/**
	 * Non-paged list (mirrors GET /docketbook/list/{type}/{officeId} response body array).
	 */
	public function offline_list($module_type, $office_id)
	{
		$this->ensure_schema();
		$this->db->from(self::CACHE_TABLE);
		$this->db->where('module_type', $module_type);
		$this->db->where('field_office_id', $office_id);
		$this->db->order_by('docket_number', 'ASC');
		$rows = $this->db->get()->result_array();
		return $this->decode_payloads($rows);
	}

	/**
	 * Search snapshot (mirrors POST /docketbook/search/{clientType}).
	 *
	 * @param array $request keys: name/search, type (module), fieldOfficeId/field_office, canSeeOtherOffices
	 */
	public function offline_search($page, $size, $client_type, $request)
	{
		$this->ensure_schema();
		$page = max(0, (int) $page);
		$size = max(1, min(500, (int) $size));
		$client_type = strtoupper(trim((string) $client_type));
		$module_type = isset($request['type']) ? trim((string) $request['type']) : '';
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

		$apply_filters = function () use ($client_type, $module_type, $office_id, $can_see_other, $keyword) {
			$this->db->where('client_type', $client_type);
			if ($module_type !== '') {
				$this->db->where('module_type', $module_type);
			}
			if (!$can_see_other && $office_id !== '' && strtoupper($office_id) !== 'ALL') {
				$this->db->where('field_office_id', $office_id);
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
		$this->db->order_by('docket_number', 'ASC');
		$this->db->limit($size, $page * $size);
		$rows = $this->db->get()->result_array();

		return $this->build_spring_page($this->decode_payloads($rows), $page, $size, $total);
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
			foreach ($this->module_types as $module_type) {
				$page = 0;
				$size = 200;
				do {
					$url = rtrim($base, '/').'/docketbook/search/'.rawurlencode($client_type)
						.'?page='.$page.'&size='.$size;
					$body = json_encode(array(
						'name' => '',
						'type' => $module_type,
						'fieldOfficeId' => $field_office_id,
						'canSeeOtherOffices' => false,
					));
					$resp = $this->http_json('POST', $url, $body);
					if ($resp === null || empty($resp['content']) || !is_array($resp['content'])) {
						break;
					}
					foreach ($resp['content'] as $item) {
						if (!is_array($item)) {
							continue;
						}
						$key = (isset($item['docketNumber']) ? $item['docketNumber'] : '')
							.'|'.(isset($item['fieldOfficeId']) ? $item['fieldOfficeId'] : $field_office_id);
						if (isset($seen[$key])) {
							continue;
						}
						$seen[$key] = true;
						$merged[] = $item;
					}
					$total_pages = isset($resp['totalPages']) ? (int) $resp['totalPages'] : 1;
					$page++;
				} while ($page < $total_pages && $page < 50);
			}
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

	private function map_source_row_to_response($row, $field_office_name)
	{
		$bool = function ($v) {
			return $v === true || $v === 1 || $v === '1' || $v === 'true';
		};
		return array(
			'type' => isset($row['type']) ? $row['type'] : null,
			'docketNumber' => isset($row['docket_number']) ? $row['docket_number'] : null,
			'docketSeries' => isset($row['docket_series']) ? $row['docket_series'] : null,
			'caseloadType' => isset($row['caseload_type']) ? $row['caseload_type'] : null,
			'fieldOfficeId' => isset($row['field_office_id']) ? $row['field_office_id'] : null,
			'fieldOfficeName' => $field_office_name,
			'clientId' => isset($row['client_id']) ? $row['client_id'] : null,
			'clientType' => isset($row['client_type']) ? $row['client_type'] : null,
			'firstName' => isset($row['first_name']) ? $row['first_name'] : null,
			'middleName' => isset($row['middle_name']) ? $row['middle_name'] : null,
			'lastName' => isset($row['last_name']) ? $row['last_name'] : null,
			'suffixName' => isset($row['suffix_name']) ? $row['suffix_name'] : null,
			'fullName' => isset($row['full_name']) ? $row['full_name'] : null,
			'isLegalAge' => isset($row['is_legal_age']) ? $bool($row['is_legal_age']) : false,
			'pleaBargain' => isset($row['plea_bargain']) ? $bool($row['plea_bargain']) : false,
			'caseClassification' => isset($row['case_classification']) ? $row['case_classification'] : null,
			'criminalCaseNumber' => isset($row['criminal_case_number']) ? $row['criminal_case_number'] : null,
			'offense' => isset($row['offense']) ? $row['offense'] : null,
			'courtOfOrigin' => isset($row['court_of_origin']) ? $row['court_of_origin'] : null,
			'isMilitaryCourt' => isset($row['is_military_court']) ? $bool($row['is_military_court']) : false,
			'courtOrderDate' => isset($row['court_order_date']) ? $row['court_order_date'] : null,
			'investigatingOfficer' => isset($row['investigating_officer']) ? $row['investigating_officer'] : null,
			'receivedDateByPPO' => isset($row['received_date_by_ppo']) ? $row['received_date_by_ppo'] : null,
			'sentence' => isset($row['sentence']) ? $row['sentence'] : null,
			'manualDocket' => isset($row['manual_docket']) ? $bool($row['manual_docket']) : false,
			'referral' => isset($row['referral']) ? $bool($row['referral']) : false,
			'remarks' => isset($row['remarks']) ? $row['remarks'] : null,
			'probationStartDate' => isset($row['probation_start_date']) ? $row['probation_start_date'] : null,
			'probationYear' => isset($row['probation_year']) ? $row['probation_year'] : null,
			'probationMonth' => isset($row['probation_month']) ? $row['probation_month'] : null,
			'probationDay' => isset($row['probation_day']) ? $row['probation_day'] : null,
			'prisonName' => isset($row['prison_name']) ? $row['prison_name'] : null,
			'investigationReportSubmittedDate' => isset($row['ir_submitted_date']) ? $row['ir_submitted_date'] : null,
			'ppoRecommendation' => isset($row['ppo_recommendation']) ? $row['ppo_recommendation'] : null,
			'recommendationState' => isset($row['recommendation_state']) ? $row['recommendation_state'] : null,
			'dateOfTransfer' => isset($row['date_of_transfer']) ? $row['date_of_transfer'] : null,
			'transferredOfficeId' => isset($row['transferred_office_id']) ? $row['transferred_office_id'] : null,
			'dateOrderReceivedFromTheBoard' => isset($row['date_order_received_from_the_board']) ? $row['date_order_received_from_the_board'] : null,
			'boardOrder' => isset($row['board_order']) ? $row['board_order'] : null,
			'boardOrderStatus' => isset($row['board_order_status']) ? $row['board_order_status'] : null,
			'referringOfficeId' => isset($row['referring_office_id']) ? $row['referring_office_id'] : null,
			'dateCICAR' => isset($row['date_courtesy_inv_completed_and_return']) ? $row['date_courtesy_inv_completed_and_return'] : null,
			'supervisingOfficer' => isset($row['supervising_officer']) ? $row['supervising_officer'] : null,
			'supervisingOfficerCarryOver' => isset($row['supervising_officer_carry_over']) ? $row['supervising_officer_carry_over'] : null,
			'probationEndDate' => isset($row['probation_end_date']) ? $row['probation_end_date'] : null,
			'supervisionStartDate' => isset($row['supervision_start_date']) ? $row['supervision_start_date'] : null,
			'supervisionEndDate' => isset($row['supervision_end_date']) ? $row['supervision_end_date'] : null,
			'referralType' => isset($row['referral_type']) ? $row['referral_type'] : null,
			'dateReportSubmittedToTheBoard' => isset($row['date_report_submitted_to_the_board']) ? $row['date_report_submitted_to_the_board'] : null,
			'dateReportSubmittedToRDForTransferToOtherPPO' => isset($row['date_report_submitted_to_rd_for_transfer']) ? $row['date_report_submitted_to_rd_for_transfer'] : null,
			'resolutionType' => isset($row['resolution_type']) ? $row['resolution_type'] : null,
			'dateResolutionFromTheBoard' => isset($row['date_resolution_from_the_board']) ? $row['date_resolution_from_the_board'] : null,
			'dateResolutionFromTheRDForTransfer' => isset($row['date_report_resolution_from_the_rd_for_transfer']) ? $row['date_report_resolution_from_the_rd_for_transfer'] : null,
			'reportType' => isset($row['report_type']) ? $row['report_type'] : null,
			'id' => isset($row['id']) ? $row['id'] : null,
			'createdBy' => isset($row['created_by']) ? $row['created_by'] : null,
			'createdDate' => isset($row['created_date']) ? $row['created_date'] : null,
			'updatedBy' => isset($row['updated_by']) ? $row['updated_by'] : null,
			'updatedDate' => isset($row['updated_date']) ? $row['updated_date'] : null,
			'status' => isset($row['status']) ? $bool($row['status']) : true,
			'psirDate' => isset($row['psir_date']) ? $row['psir_date'] : null,
			'manifestationDate' => isset($row['manifestation_date']) ? $row['manifestation_date'] : null,
			'typeOfReferrals' => isset($row['type_of_referrals']) ? $row['type_of_referrals'] : null,
			'referralsNotActedUponDateOrderReceived' => isset($row['referrals_not_acted_upon_date_order_received']) ? $row['referrals_not_acted_upon_date_order_received'] : null,
			'alias' => isset($row['alias']) ? $row['alias'] : null,
			'courtDecision' => isset($row['court_decision']) ? $row['court_decision'] : null,
			'reasonForDenialDismissal' => isset($row['reason_for_denial_dismissal']) ? $row['reason_for_denial_dismissal'] : null,
			'SpecifyOtherTypeOfDecision' => isset($row['specify_other_type_of_decision']) ? $row['specify_other_type_of_decision'] : null,
			'dateOrderReceivedFromTheCourt' => isset($row['date_order_received_from_the_court']) ? $row['date_order_received_from_the_court'] : null,
			'dateCompletedAndReturned' => isset($row['date_completed_and_returned']) ? $row['date_completed_and_returned'] : null,
			'officeFindingsForActedUpon' => isset($row['office_findings_for_acted_upon']) ? $row['office_findings_for_acted_upon'] : null,
			'officeFindingsForPendingDisposition' => isset($row['office_findings_for_pending_disposition']) ? $row['office_findings_for_pending_disposition'] : null,
			'specifyCourtPpoTransferred' => isset($row['specify_court_ppo_transferred']) ? $row['specify_court_ppo_transferred'] : null,
			'specifyOtherReasonsRevocation' => isset($row['specify_other_reasons_revocation']) ? $row['specify_other_reasons_revocation'] : null,
			'periodOfSupervision' => isset($row['period_of_supervision']) ? $row['period_of_supervision'] : null,
			'FromPrisonType' => isset($row['from_prison_type']) ? $row['from_prison_type'] : null,
			'specifyOtherSubmittedReports' => isset($row['specify_other_submitted_reports']) ? $row['specify_other_submitted_reports'] : null,
			'otherResolutionType' => isset($row['other_resolution_type']) ? $row['other_resolution_type'] : null,
			'periodOfCourtesySupervision' => isset($row['period_of_courtesy_supervision']) ? $row['period_of_courtesy_supervision'] : null,
			'dateReturned' => isset($row['date_returned']) ? $row['date_returned'] : null,
			'referringOfficeCourtesyInv' => isset($row['referring_office_courtesy_inv']) ? $row['referring_office_courtesy_inv'] : null,
			'referringOfficeCourtesyInvId' => isset($row['referring_office_courtesy_inv_id']) ? $row['referring_office_courtesy_inv_id'] : null,
			'referringOfficeCourtesySup' => isset($row['referring_office_courtesy_sup']) ? $row['referring_office_courtesy_sup'] : null,
			'referringOfficeCourtesySupId' => isset($row['referring_office_courtesy_sup_id']) ? $row['referring_office_courtesy_sup_id'] : null,
		);
	}

	private function payload_to_cache_row($item, $field_office_id, $synced_at)
	{
		if (!is_array($item)) {
			return null;
		}
		$docket_number = isset($item['docketNumber']) ? trim((string) $item['docketNumber']) : '';
		if ($docket_number === '') {
			return null;
		}
		$office = isset($item['fieldOfficeId']) && $item['fieldOfficeId'] !== ''
			? (string) $item['fieldOfficeId']
			: $field_office_id;
		$client_type = isset($item['clientType']) ? strtoupper((string) $item['clientType']) : '';
		if ($client_type === '') {
			return null;
		}
		return array(
			'source_id' => isset($item['id']) ? $item['id'] : null,
			'docket_number' => $docket_number,
			'field_office_id' => $office,
			'client_type' => $client_type,
			'module_type' => isset($item['type']) ? $item['type'] : null,
			'full_name' => isset($item['fullName']) ? $item['fullName'] : null,
			'first_name' => isset($item['firstName']) ? $item['firstName'] : null,
			'middle_name' => isset($item['middleName']) ? $item['middleName'] : null,
			'last_name' => isset($item['lastName']) ? $item['lastName'] : null,
			'criminal_case_number' => isset($item['criminalCaseNumber']) ? $item['criminalCaseNumber'] : null,
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
