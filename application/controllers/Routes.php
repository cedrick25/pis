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
	public function worksheet_create()
	{
		$this->load->view('worksheet_create');
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
	public function parolee_supervision_create()
	{
		$this->load->view('parolee_supervision_create');
	}
	public function parolee_investigation_docketing()
	{
		$this->load->view('parolee_investigation_docketing');
	}
	public function parolee_supervision_docketing()
	{
		$this->load->view('parolee_supervision_docketing');
	}
	public function parolee_courtesy_supervision_docketing()
	{
		$this->load->view('parolee_courtesy_supervision_docketing');
	}
	public function parolee_courtesy_investigation_docketing()
	{
		$this->load->view('parolee_courtesy_investigation_docketing');
	}
	public function parolee_courtesy_investigation_update()
	{
		$this->load->view('parolee_courtesy_investigation_update');
	}
	public function parolee_courtesy_supervision_update()
	{
		$this->load->view('parolee_courtesy_supervision_update');
	}
	public function parolee_investigation_update()
	{
		$this->load->view('parolee_investigation_update');
	}
	public function parolee_supervision_update()
	{
		$this->load->view('parolee_supervision_update');
	}

	public function pardonee_courtesy_investigation_create()
	{
		$this->load->view('pardonee_courtesy_investigation_create');
	}
	public function pardonee_courtesy_supervision_create()
	{
		$this->load->view('pardonee_courtesy_supervision_create');
	}
	public function pardonee_investigation_create()
	{
		$this->load->view('pardonee_investigation_create');
	}
	public function pardonee_supervision_create()
	{
		$this->load->view('pardonee_supervision_create');
	}
	public function pardonee_courtesy_investigation_docketing()
	{
		$this->load->view('pardonee_courtesy_investigation_docketing');
	}
	public function pardonee_courtesy_supervision_docketing()
	{
		$this->load->view('pardonee_courtesy_supervision_docketing');
	}
	public function pardonee_investigation_docketing()
	{
		$this->load->view('pardonee_investigation_docketing');
	}
	public function pardonee_supervision_docketing()
	{
		$this->load->view('pardonee_supervision_docketing');
	}
	public function pardonee_courtesy_investigation_update()
	{
		$this->load->view('pardonee_courtesy_investigation_update');
	}
	public function pardonee_courtesy_supervision_update()
	{
		$this->load->view('pardonee_courtesy_supervision_update');
	}
	public function pardonee_investigation_update()
	{
		$this->load->view('pardonee_investigation_update');
	}
	public function pardonee_supervision_update()
	{
		$this->load->view('pardonee_supervision_update');
	}
	public function client_list()
	{
		$this->load->view('client_list');
	}
	public function client_update()
	{
		$this->load->view('client_update');
	}
	public function client_view_upload()
	{
		$this->load->view('client_view_upload');
	}
	public function client_uploads()
	{
		$this->load->view('client_uploads');
	}
	public function client_file_upload()
	{
		$this->load->view('client_file_upload');
	}
	public function client_file_view()
	{
		$this->load->view('client_file_view');
	}
	public function docket_routing_parolee()
	{
		$this->load->view('docket_routing_parolee');
	}
	public function pardonee_docket_routing()
	{
		$this->load->view('pardonee_docket_routing');
	}
	public function sent_parolee()
	{
		$this->load->view('sent_parolee');
	}
	public function sent_pardonee()
	{
		$this->load->view('sent_pardonee');
	}
	public function received_pardonee()
	{
		$this->load->view('received_pardonee');
	}
	public function received_parolee()
	{
		$this->load->view('received_parolee');
	}
	public function form_list()
	{
		$this->load->view('form_list');
	}
	public function form_upload()
	{
		$this->load->view('form_upload');
	}
	public function worksheet_identifying_data()
	{
		$this->load->view('worksheet_identifying_data');
	}
	public function worksheet_present_offense()
	{
		$this->load->view('worksheet_present_offense');
	}
	public function worksheet_prior_records()
	{
		$this->load->view('worksheet_prior_records');
	}
	public function worksheet_family_background()
	{
		$this->load->view('worksheet_family_background');
	}
	public function worksheet_socio_economic()
	{
		$this->load->view('worksheet_socio_economic');
	}
	public function worksheet_spouse_children()
	{
		$this->load->view('worksheet_spouse_children');
	}
	public function worksheet_residence_economic()
	{
		$this->load->view('worksheet_residence_economic');
	}
	public function worksheet_education_history()
	{
		$this->load->view('worksheet_education_history');
	}
	public function worksheet_employment_history()
	{
		$this->load->view('worksheet_employment_history');
	}
	public function worksheet_environmental_factor()
	{
		$this->load->view('worksheet_environmental_factor');
	}
	
}