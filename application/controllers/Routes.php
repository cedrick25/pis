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
	public function docket_routing()
	{
		$this->load->view('docket_routing');
	}
	public function investigation_docketing()
	{
		$this->load->view('investigation_docketing');
	}
	public function supervision_docketing()
	{
		$this->load->view('supervision_docketing');
	}
	public function field_office()
	{
		$this->load->view('field_office');
	}
	public function regions()
	{
		$this->load->view('regions');
	}
	public function investigation_docket_create()
	{
		$this->load->view('investigation_docket_create');
	}
	public function investigation_docket_update()
	{
		$this->load->view('investigation_docket_update');
	}
	public function supervision_docket_create()
	{
		$this->load->view('supervision_docket_create');
	}
	public function supervision_docket_update()
	{
		$this->load->view('supervision_docket_update');
	}
	public function inv_forward()
	{
		$this->load->view('inv_forward');
	}
	public function sent()
	{
		$this->load->view('sent');
	}
	public function received()
	{
		$this->load->view('received');
	}
	public function sup_forward()
	{
		$this->load->view('sup_forward');
	}
	public function upload()
	{
		$this->load->view('upload');
	}
	public function return()
	{
		$this->load->view('return');
	}
	public function forward()
	{
		$this->load->view('forward');
	}
	public function sent_view()
	{
		$this->load->view('sent_view');
	}
	public function single_carpeta_create()
	{
		$this->load->view('single_carpeta_create');
	}
	public function single_carpeta()
	{
		$this->load->view('single_carpeta');
	}
	public function single_carpeta_update()
	{
		$this->load->view('single_carpeta_update');
	}
	public function new_client()
	{
		$this->load->view('new_client');
	}
	public function parolee_courtesy_supervision_create()
	{
		$this->load->view('parolee_courtesy_supervision_create');
	}
	public function parolee_courtesy_investigation_create()
	{
		$this->load->view('parolee_courtesy_investigation_create');
	}
	public function parolee_investigation_create()
	{
		$this->load->view('parolee_investigation_create');
	}
}