<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline worksheet API (PIS/Apache — never calls port 8000).
 *
 * Mirrors online /worksheet create, update, and fetch:
 *   POST api/worksheet/offline/create
 *   POST api/worksheet/offline/update/{id}
 *   GET  api/worksheet/offline/{type}/{id}
 *   GET  api/worksheet/offline/getPetitioner/{type}/{petitionerId}
 *   POST api/worksheet/offline/updatePetitioner/{type}/{petitionerId}
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

	/** POST create — body WorksheetDto */
	public function create()
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		$dto = $this->json_body();
		if ($this->val($dto, 'petitionerId') === null || $this->val($dto, 'petitionerId') === '') {
			return $this->json_error('petitionerId is required');
		}
		if ($this->val($dto, 'type') === null || $this->val($dto, 'type') === '') {
			return $this->json_error('type is required');
		}
		try {
			$result = $this->worksheet_model->create_worksheet($dto);
		} catch (Exception $e) {
			return $this->json_error('Create failed: '.$e->getMessage(), 500);
		}
		if ($result === null) {
			return $this->json_error('Create failed', 500);
		}
		return $this->ok($result);
	}

	/** POST update by worksheet id — body WorksheetDto */
	public function update($id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($id === null || $id === '' || !ctype_digit((string) $id)) {
			return $this->json_error('id is required');
		}
		$dto = $this->json_body();
		try {
			$result = $this->worksheet_model->update_worksheet($id, $dto);
		} catch (Exception $e) {
			return $this->json_error('Update failed: '.$e->getMessage(), 500);
		}
		if ($result === null) {
			return $this->json_error('Worksheet not found', 404);
		}
		return $this->ok($result);
	}

	/** GET by type + numeric id */
	public function get_by_id($type = null, $id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($type === null || $type === '' || $id === null || $id === '') {
			return $this->json_error('type and id are required');
		}
		try {
			$result = $this->worksheet_model->get_by_type_and_id($type, $id);
		} catch (Exception $e) {
			return $this->json_error('Fetch failed: '.$e->getMessage(), 500);
		}
		return $this->ok($result);
	}

	/** GET by type + petitioner id (same as online getPetitioner) */
	public function get_petitioner($type = null, $petitioner_id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'GET') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($type === null || $type === '' || $petitioner_id === null || $petitioner_id === '') {
			return $this->json_error('type and petitionerId are required');
		}
		try {
			$result = $this->worksheet_model->get_by_type_and_petitioner($type, $petitioner_id);
		} catch (Exception $e) {
			return $this->json_error('Fetch failed: '.$e->getMessage(), 500);
		}
		return $this->ok($result);
	}

	/** POST update by type + petitioner id */
	public function update_petitioner($type = null, $petitioner_id = null)
	{
		if (strtoupper($this->input->method(TRUE)) !== 'POST') {
			return $this->json_error('Method not allowed', 405);
		}
		if ($type === null || $type === '' || $petitioner_id === null || $petitioner_id === '') {
			return $this->json_error('type and petitionerId are required');
		}
		$dto = $this->json_body();
		try {
			$result = $this->worksheet_model->update_by_type_and_petitioner($type, $petitioner_id, $dto);
		} catch (Exception $e) {
			return $this->json_error('Update failed: '.$e->getMessage(), 500);
		}
		if ($result === null) {
			return $this->json_error('Worksheet not found for petitioner', 404);
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

	private function val($arr, $key, $default = null)
	{
		return (is_array($arr) && array_key_exists($key, $arr)) ? $arr[$key] : $default;
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
