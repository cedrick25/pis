<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline petitioner API (served by PIS/Apache — not port 8000).
 *
 * Mirrors online GET /petitioner with an offline-only createdBy filter:
 *   GET  api/petitioner/offline?page&size&type&officeId&createdBy
 *   GET  api/petitioner/offline/(:num)
 *   POST api/petitioner/offline/search/(:any)?page&size
 *   POST api/petitioner/sync
 */
class Api_petitioner extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('petitioner_model');
		$this->output->set_header('Access-Control-Allow-Origin: *');
		$this->output->set_header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
		$this->output->set_header('Access-Control-Allow-Headers: Content-Type, Authorization');
		if (isset($_SERVER['REQUEST_METHOD']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'OPTIONS') {
			$this->output->set_status_header(204);
			$this->output->_display();
			exit;
		}
	}

	/**
	 * GET paginated list from snapshot.
	 * Mirrors GET /petitioner?page&size&type&officeId plus offline-only createdBy.
	 */
	public function offline()
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		$page = (int) $this->input->get('page');
		$size = (int) $this->input->get('size');
		$type = $this->input->get('type');
		$office_id = $this->input->get('officeId');
		if ($type === null || $type === '' || $office_id === null || $office_id === '') {
			return $this->json_error('type and officeId are required');
		}
		if ($size <= 0) {
			$size = 10;
		}
		$created_by = $this->resolve_created_by();
		$page_data = $this->petitioner_model->offline_paginated($page, $size, $type, $office_id, $created_by);
		return $this->json_raw($page_data);
	}

	/** GET single petitioner by id — mirrors StandardResponse.ok(petitioner). */
	public function offline_get($id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($id === null || $id === '' || !ctype_digit((string) $id)) {
			return $this->json_error('id is required');
		}
		$result = $this->petitioner_model->offline_get_by_id($id);
		return $this->json_raw(array(
			'status' => 'SUCCESS',
			'message' => null,
			'response' => $result,
		));
	}

	/**
	 * POST search — body: {
	 *   name/search, fieldOfficeId/field_office, canSeeOtherOffices, createdBy,
	 *   createdDate (YYYY-MM-DD), createdDateFrom, createdDateTo
	 * }
	 * Path clientType: PROBATIONER | PAROLEE | PARDONEE
	 */
	public function offline_search($client_type = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		$client_type = strtoupper(trim((string) $client_type));
		$allowed = $this->petitioner_model->default_client_types();
		if ($client_type === '' || !in_array($client_type, $allowed, true)) {
			return $this->json_error('client type must be one of: '.implode(', ', $allowed));
		}
		$page = (int) $this->input->get('page');
		$size = (int) $this->input->get('size');
		if ($size <= 0) {
			$size = 10;
		}
		$body = $this->json_body();
		if ($this->resolve_created_by() !== '' && empty($body['createdBy']) && empty($body['created_by'])) {
			$body['createdBy'] = $this->resolve_created_by();
		}
		$page_data = $this->petitioner_model->offline_search($page, $size, $client_type, $body);
		return $this->json_raw($page_data);
	}

	/**
	 * POST sync snapshot for an office (call on login while online).
	 * Body: { field_office|fieldOfficeId, types?: [], field_office_name?, force? }
	 */
	public function sync()
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		$body = $this->json_body();
		$office = '';
		if (!empty($body['field_office'])) {
			$office = trim((string) $body['field_office']);
		} elseif (!empty($body['fieldOfficeId'])) {
			$office = trim((string) $body['fieldOfficeId']);
		} elseif ($this->input->get_request_header('X-Field-Office-Id', TRUE)) {
			$office = trim((string) $this->input->get_request_header('X-Field-Office-Id', TRUE));
		}
		if ($office === '') {
			return $this->json_error('field_office is required');
		}
		$types = null;
		if (isset($body['types'])) {
			$types = $body['types'];
		} elseif (isset($body['type'])) {
			$types = $body['type'];
		}
		$office_name = null;
		if (!empty($body['field_office_name'])) {
			$office_name = $body['field_office_name'];
		} elseif (!empty($body['fieldOfficeName'])) {
			$office_name = $body['fieldOfficeName'];
		}
		try {
			$result = $this->petitioner_model->sync_office($office, $types, $office_name, null);
		} catch (Exception $e) {
			return $this->json_raw(array(
				'status' => 'FAILED',
				'message' => 'Sync exception: '.$e->getMessage(),
				'record_count' => 0,
			), 500);
		}
		$code = ($result['status'] === 'FAILED') ? 400 : 200;
		return $this->json_raw($result, $code);
	}

	private function resolve_created_by()
	{
		$created_by = $this->input->get('createdBy');
		if ($created_by === null || $created_by === '') {
			$created_by = $this->input->get('created_by');
		}
		return ($created_by === null) ? '' : trim((string) $created_by);
	}

	private function json_body()
	{
		$raw = $this->input->raw_input_stream;
		if ($raw === null || $raw === '') {
			$raw = @file_get_contents('php://input');
		}
		if ($raw !== false && trim((string) $raw) !== '') {
			$decoded = json_decode($raw, true);
			if (is_array($decoded)) {
				return $decoded;
			}
		}
		$post = $this->input->post(null, true);
		return is_array($post) ? $post : array();
	}

	private function json_raw($data, $status = 200)
	{
		$this->output
			->set_status_header($status)
			->set_content_type('application/json', 'utf-8')
			->set_output(json_encode($data));
	}

	private function json_error($message, $status = 400)
	{
		return $this->json_raw(array(
			'status' => 'FAILED',
			'message' => $message,
			'response' => null,
		), $status);
	}
}
