<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class routes extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{
		$this->load->view('login');
	}
	public function dashboard()
	{
		$this->load->view('dashboard');
	}
	public function inventory()
	{
		$this->load->view('inventory');
	}
	public function announcement()
	{
		$this->load->view('announcement');
	}
	public function blotter()
	{
		$this->load->view('blotter');
	}
	public function resident()
	{
		$this->load->view('resident');
	}
	public function barcode_qr_management()
	{
		$this->load->view('barcode_qr_management');
	}
	public function barcode()
	{
		$this->load->view('barcode');
	}
	public function qrcode()
	{
		$this->load->view('qrcode');
	}

	public function brgy_indigency()
	{
		$this->load->view('brgy_indigency');
	}

	public function brgy_business_permit()
	{
		$this->load->view('brgy_business_permit');
	}

	public function brgy_clearance()
	{
		$this->load->view('brgy_clearance');
	}

	public function brgy_residency()
	{
		$this->load->view('brgy_residency');
	}
	public function audit_trail()
	{
		$this->load->view('audit_trail');
	}
	public function request_user()
	{
		$this->load->view('request_user');
	}
	public function user_accounts()
	{
		$this->load->view('user_accounts');
	}
	public function user_roles()
	{
		$this->load->view('user_roles');
	}
	public function department()
	{
		$this->load->view('department');
	}
	public function location()
	{
		$this->load->view('location');
	}
	public function permission()
	{
		$this->load->view('permission');
	}
	public function docketing()
	{
		$this->load->view('docketing');
	}
}