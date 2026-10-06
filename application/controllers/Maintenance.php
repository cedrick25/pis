<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance extends CI_Controller {

	public function index()
	{
		$this->config->load('maintenance', TRUE);

		$enabled = (bool) $this->config->item('maintenance_mode', 'maintenance');
		$title = $this->config->item('maintenance_title', 'maintenance');
		$message = $this->config->item('maintenance_message', 'maintenance');

		$data = array(
			'title' => ($title !== NULL && $title !== '') ? $title : 'System Maintenance',
			'message' => ($message !== NULL && $message !== '')
				? $message
				: 'The system is temporarily unavailable while updates are being applied. Please try again later.',
			'show_sign_in' => FALSE,
			'sign_in_url' => '',
		);

		if ($enabled)
		{
			$this->output->set_status_header(503);
			$this->output->set_header('Retry-After: 3600');
		}

		$this->output->set_header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
		$this->output->set_header('Pragma: no-cache');
		$this->load->view('maintenance', $data);
	}
}
