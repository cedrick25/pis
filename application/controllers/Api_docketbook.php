<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline / snapshot docket-book API (served by PIS/Apache — not port 8000).
 *
 * Routes (see config/routes.php):
 *   GET  api/docketbook/offline?page&size&type&officeId
 *   GET  api/docketbook/offline/list/{type}/{officeId}
 *   POST api/docketbook/offline/search/{clientType}?page&size
 *   POST api/docketbook/sync
 *   GET  api/docketbook/sync/status?field_office=
 */
class Api_docketbook extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('docket_book_model');
		$this->output->set_header('Access-Control-Allow-Origin: *');
		$this->output->set_header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
		$this->output->set_header('Access-Control-Allow-Headers: Content-Type, Authorization');
		if (isset($_SERVER['REQUEST_METHOD']) && strtoupper($_SERVER['REQUEST_METHOD']) === 'OPTIONS') {
			$this->output->set_status_header(204);
			$this->output->_display();
			exit;
		}
	}

	/** GET paginated list from snapshot. */
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
		$page_data = $this->docket_book_model->offline_paginated($page, $size, $type, $office_id);
		return $this->json_raw($page_data);
	}

	/** GET non-paged list — mirrors StandardResponse.ok(list). */
	public function offline_list($type = null, $office_id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($type === null || $office_id === null || $type === '' || $office_id === '') {
			return $this->json_error('type and officeId are required');
		}
		$list = $this->docket_book_model->offline_list($type, $office_id);
		return $this->json_raw(array(
			'status' => 'SUCCESS',
			'message' => null,
			'response' => $list,
		));
	}

	/**
	 * POST search — body: { search|name, type (module), fieldOfficeId|field_office, canSeeOtherOffices }
	 * Path clientType: PROBATIONER | PAROLEE | PARDONEE
	 */
	public function offline_search($client_type = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		$client_type = strtoupper(trim((string) $client_type));
		$allowed = $this->docket_book_model->default_client_types();
		if ($client_type === '' || !in_array($client_type, $allowed, true)) {
			return $this->json_error('client type must be one of: '.implode(', ', $allowed));
		}
		$page = (int) $this->input->get('page');
		$size = (int) $this->input->get('size');
		if ($size <= 0) {
			$size = 10;
		}
		$body = $this->json_body();
		$page_data = $this->docket_book_model->offline_search($page, $size, $client_type, $body);
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
			$result = $this->docket_book_model->sync_office($office, $types, $office_name, null);
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

	/** GET sync status for an office. */
	public function sync_status()
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		$office = $this->input->get('field_office');
		if ($office === null || $office === '') {
			$office = $this->input->get('fieldOfficeId');
		}
		if ($office === null || $office === '') {
			return $this->json_error('field_office is required');
		}
		return $this->json_raw($this->docket_book_model->get_sync_status($office));
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
		// Fallback for form-encoded / query-style posts
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
