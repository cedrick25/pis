<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline worksheet API (served by PIS/Apache — not port 8000).
 *
 * Lookup by type + docket number + field office (not numeric worksheet id):
 *   GET api/worksheet/offline/{type}/{docketNumber}?fieldOfficeId=
 */
class Api_worksheet extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('worksheet_model');
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
	 * GET by type + docket number + field office — mirrors GET /worksheet/getPetitioner/{type}/{docketNumber}?fieldOfficeId=
	 * Query (required): fieldOfficeId
	 */
	public function get_by_docket($type = null, $docket_number = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		$type = trim((string) $type);
		$docket_number = rawurldecode(trim((string) $docket_number));
		if ($type === '' || $docket_number === '') {
			return $this->json_error('type and docketNumber are required');
		}
		$field_office_id = $this->input->get('fieldOfficeId');
		if ($field_office_id === null || $field_office_id === '') {
			$field_office_id = $this->input->get('field_office_id');
		}
		$field_office_id = ($field_office_id === null) ? '' : trim((string) $field_office_id);
		if ($field_office_id === '') {
			return $this->json_error('fieldOfficeId is required');
		}
		try {
			$result = $this->worksheet_model->get_by_type_and_docket($type, $docket_number, $field_office_id);
		} catch (Exception $e) {
			return $this->json_error('Fetch failed: '.$e->getMessage(), 500);
		}
		return $this->ok($result);
	}

	private function ok($response)
	{
		return $this->json_raw(array(
			'status' => 'SUCCESS',
			'message' => null,
			'response' => $response,
		));
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
