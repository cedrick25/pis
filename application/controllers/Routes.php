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
		$this->load->view('PIS/Docketing/docket_routing');
	}
	public function investigation_docketing()
	{
		$this->load->view('PIS/Investigation/investigation_docketing');
	}
	public function supervision_docketing()
	{
		$this->load->view('PIS/Supervision/supervision_docketing');
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
		$this->load->view('PIS/Investigation/investigation_docket_create');
	}
	public function investigation_docket_update()
	{
		$this->load->view('PIS/Investigation/investigation_docket_update');
	}
	public function investigation_docket_view()
	{
		$this->load->view('PIS/Investigation/investigation_docket_view');
	}
	public function supervision_docket_create()
	{
		$this->load->view('PIS/Supervision/supervision_docket_create');
	}
	public function supervision_docket_update()
	{
		$this->load->view('PIS/Supervision/supervision_docket_update');
	}
	public function supervision_docket_view()
	{
		$this->load->view('PIS/Supervision/supervision_docket_view');
	}
	public function inv_forward()
	{
		$this->load->view('PIS/Docketing/inv_forward');
	}
	public function sent()
	{
		$this->load->view('PIS/Docketing/sent');
	}
	public function received()
	{
		$this->load->view('PIS/Docketing/received');
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
		$this->load->view('PIS/Docketing/return');
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
	public function new_client_single_carpeta()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/new_client_single_carpeta');
	}
	public function client_update_single_carpeta()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/client_update_single_carpeta');
	}
	public function parolee_courtesy_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Supervision/parolee_courtesy_supervision_create');
	}
	public function parolee_courtesy_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Investigation/parolee_courtesy_investigation_create');
	}
	public function parolee_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Investigation/parolee_investigation_create');
	}
	public function parolee_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Supervision/parolee_supervision_create');
	}
	public function parolee_investigation_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Investigation/parolee_investigation_docketing');
	}
	public function parolee_supervision_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Supervision/parolee_supervision_docketing');
	}
	public function parolee_courtesy_supervision_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Supervision/parolee_courtesy_supervision_docketing');
	}
	public function parolee_courtesy_investigation_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Investigation/parolee_courtesy_investigation_docketing');
	}
	public function parolee_courtesy_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Investigation/parolee_courtesy_investigation_update');
	}
	public function parolee_courtesy_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Investigation/parolee_courtesy_investigation_view');
	}
	public function parolee_courtesy_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Supervision/parolee_courtesy_supervision_update');
	}
	public function parolee_courtesy_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Courtesy_Supervision/parolee_courtesy_supervision_view');
	}
	public function parolee_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Investigation/parolee_investigation_update');
	}
	public function parolee_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Investigation/parolee_investigation_view');
	}
	public function parolee_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Supervision/parolee_supervision_update');
	}
	public function parolee_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Supervision/parolee_supervision_view');
	}
	public function pardonee_courtesy_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Investigation/pardonee_courtesy_investigation_create');
	}
	public function pardonee_courtesy_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Supervision/pardonee_courtesy_supervision_create');
	}
	public function pardonee_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Investigation/pardonee_investigation_create');
	}
	public function pardonee_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Supervision/pardonee_supervision_create');
	}
	public function pardonee_courtesy_investigation_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Investigation/pardonee_courtesy_investigation_docketing');
	}
	public function pardonee_courtesy_supervision_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Supervision/pardonee_courtesy_supervision_docketing');
	}
	public function pardonee_investigation_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Investigation/pardonee_investigation_docketing');
	}
	public function pardonee_supervision_docketing()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Supervision/pardonee_supervision_docketing');
	}
	public function pardonee_courtesy_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Investigation/pardonee_courtesy_investigation_update');
	}
	public function pardonee_courtesy_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Supervision/pardonee_courtesy_supervision_update');
	}
	public function pardonee_courtesy_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Supervision/pardonee_courtesy_supervision_view');
	}
	public function pardonee_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Investigation/pardonee_investigation_update');
	}
	public function pardonee_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Investigation/pardonee_investigation_view');
	}
	public function pardonee_courtesy_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Courtesy_Investigation/pardonee_courtesy_investigation_view');
	}
	public function pardonee_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Supervision/pardonee_supervision_update');
	}
	public function pardonee_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Pardonee/Supervision/pardonee_supervision_view');
	}
	public function client_list()
	{
		$this->load->view('Fact_Sheet/Probation/client_list');
	}
	public function client_list_single_carpeta()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/client_list_single_carpeta');
	}
	public function client_update()
	{
		$this->load->view('client_update');
	}
	public function client_view_upload()
	{
		$this->load->view('client_view_upload');
	}
	public function client_view_upload_single_carpeta()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/client_view_upload_single_carpeta');
	}
	public function client_uploads()
	{
		$this->load->view('client_uploads');
	}
	public function client_file_upload()
	{
		$this->load->view('client_file_upload');
	}
	public function client_single_carpeta_upload()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/client_single_carpeta_upload');
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
		$this->load->view('SINGLE_CARPETA/Docketing/Pardone/pardonee_docket_routing');
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
	public function psir_identifying_data()
	{
		$this->load->view('psir_identifying_data');
	}
	public function psir_present_offense()
	{
		$this->load->view('psir_present_offense');
	}
	public function psir_prior_records()
	{
		$this->load->view('psir_prior_records');
	}
	public function psir_family_background()
	{
		$this->load->view('psir_family_background');
	}
	public function psir_socio_economic()
	{
		$this->load->view('psir_socio_economic');
	}
	public function psir_residence_economic()
	{
		$this->load->view('psir_residence_economic');
	}
	public function psir_spouse_children()
	{
		$this->load->view('psir_spouse_children');
	}
	public function psir_education_history()
	{
		$this->load->view('psir_education_history');
	}
	public function psir_employment_history()
	{
		$this->load->view('psir_employment_history');
	}
	public function psir_environmental_factor()
	{
		$this->load->view('psir_environmental_factor');
	}
	public function pdf_generate()
	{
		$this->load->view('pdf_generate');
	}
	public function psir_evaluation()
	{
		$this->load->view('psir_evaluation');
	}
	public function psir_recommendation()
	{
		$this->load->view('psir_recommendation');
	}
	public function psir_med_history()
	{
		$this->load->view('psir_med_history');
	}
	public function factSheetSeperate()
	{
		$this->load->view('factSheetSeperate');
	}
	public function docket()
	{
		$this->load->view('docket');
	}
	public function factSheet()
	{
		$this->load->view('factSheet');
	}
	public function factSheetText()
	{
		$this->load->view('factSheetText');
	}
	public function factSheetClientInfo()
	{
		$this->load->view('factSheetClientInfo');
	}
	public function factSheetUploadedDocuments()
	{
		$this->load->view('factSheetUploadedDocuments');
	}
	public function pardonee_docket_forward()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pardone/pardonee_docket_forward');
	}
	public function pardonee_docket_return()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pardone/pardonee_docket_return');
	}
	public function parolee_docket_routing()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Parole/parolee_docket_routing');
	}
	public function parolee_docket_return()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Parole/parolee_docket_return');
	}
	public function parolee_docket_forward()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Parole/parolee_docket_forward');
	}
	public function pardonee_docket_uploads()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pardone/pardonee_docket_uploads');
	}
	public function parolee_docket_uploads()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Parole/parolee_docket_uploads');
	}
	public function client_list_parole_and_pardone()
	{
		$this->load->view('Fact_Sheet/Parole_and_Probation/client_list_parole_and_pardone');
	}
	public function client_list_parole_and_pardone_create()
	{
		$this->load->view('Fact_Sheet/Parole_and_Probation/client_list_parole_and_pardone_create');
	}
	public function client_list_parole_and_pardone_update()
	{
		$this->load->view('Fact_Sheet/Parole_and_Probation/client_list_parole_and_pardone_update');
	}
	public function client_list_parole_and_pardone_view_attachments()
	{
		$this->load->view('Fact_Sheet/Parole_and_Probation/client_list_parole_and_pardone_view_attachments');
	}
	public function client_list_parole_and_pardone_upload()
	{
		$this->load->view('Fact_Sheet/Parole_and_Probation/client_list_parole_and_pardone_upload');
	}
	public function pdl_received()
	{
		$this->load->view('PDL Inbox/received');
	}
	public function pdl_sent()
	{
		$this->load->view('PDL Inbox/sent');
	}
	public function pdl_upload()
	{
		$this->load->view('PDL Inbox/upload');
	}
	public function pdl_return()
	{
		$this->load->view('PDL Inbox/return');
	}
	public function pdl_forward()
	{
		$this->load->view('PDL Inbox/forward');
	}
	public function pdl_docket()
	{
		$this->load->view('PDL Inbox/pdl_forward');
	}
	public function pdl_view_history()
	{
		$this->load->view('PDL Inbox/view_history');
	}
	public function pdl_factsheet_upload()
	{
		$this->load->view('Fact_Sheet/Single Carpeta/client_upload_single_carpeta');
	}
	// for pre-parole investigation
	public function pre_parole_investigation_list()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Investigation/list');
	}
	public function pre_parole_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Investigation/create');
	}
	public function pre_parole_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Investigation/update');
	}
	public function pre_parole_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Investigation/view');
	}
	// for pre-parole supervision
	public function pre_parole_supervision_list()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Supervision/list');
	}
	public function pre_parole_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Supervision/create');
	}
	public function pre_parole_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Supervision/update');
	}
	public function pre_parole_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Supervision/view');
	}
	// for pre-parole courtesy investigation
	public function pre_parole_cs_investigation_list()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Investigation/list');
	}
	public function pre_parole_cs_investigation_create()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Investigation/create');
	}
	public function pre_parole_cs_investigation_update()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Investigation/update');
	}
	public function pre_parole_cs_investigation_view()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Investigation/view');
	}
	// for pre-parole courtesy supervision
	public function pre_parole_cs_supervision_list()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Supervision/list');
	}
	public function pre_parole_cs_supervision_create()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Supervision/create');
	}
	public function pre_parole_cs_supervision_update()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Supervision/update');
	}
	public function pre_parole_cs_supervision_view()
	{
		$this->load->view('SINGLE_CARPETA/Pre_parole/Courtesy Supervision/view');
	}
	// pre-parole docketing
	public function pre_parole_docketing_start()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pre-Parole/docket_routing_pre_parole');
	}
	public function pre_parole_docketing_inbox()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pre-Parole/inbox');
	}
	public function pre_parole_docketing_sent()
	{
		$this->load->view('SINGLE_CARPETA/Docketing/Pre-Parole/docket_routing_pre_parole');
	}
	public function pis_investigation_file_upload()
	{
		$this->load->view('PIS/Investigation/investigation_docket_view_uploads');
	}
	public function pis_supervision_file_upload()
	{
		$this->load->view('PIS/Supervision/supervision_docket_view_uploads');
	}
	public function parolee_investigation_file_upload()
	{
		$this->load->view('SINGLE_CARPETA/Parolee/Investigation/parolee_investigation_view_uploads');
	}
}