<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline docket book API (served by PIS/Apache — not port 8000).
 *
 * Mirrors online /docketbook/getclient/{clientId}?page&size&type as a GET:
 *   GET api/docketbook/offline/getclient/{clientId}?page&size&type
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

	/**
	 * GET paginated dockets for a client id.
	 * Same params as online POST /docketbook/getclient/{clientId}?page&size&type
	 */
	public function offline_getclient($client_id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($client_id === null || trim((string) $client_id) === '') {
			return $this->json_error('clientId is required');
		}

		$page = (int) $this->input->get('page');
		$size = (int) $this->input->get('size');
		$type = $this->input->get('type');
		if ($size <= 0) {
			$size = 10;
		}

		$page_data = $this->docket_book_model->getclient_paginated($page, $size, $client_id, $type);
		return $this->json_raw($page_data);
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
