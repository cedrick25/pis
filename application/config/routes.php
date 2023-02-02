<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
// AMS start
$route['docketing'] = "routes/docket_routing";
$route['sent'] = "routes/sent";
$route['sent_view'] = "routes/sent_view";
$route['received'] = "routes/received";
$route['return'] = "routes/return";
$route['forward'] = "routes/forward";
$route['docket_routing'] = "routes/docket_routing";
$route['upload'] = "routes/upload";
$route['investigation_docketing'] = "routes/investigation_docketing";
$route['investigation_docket_create'] = "routes/investigation_docket_create";
$route['investigation_docket_update'] = "routes/investigation_docket_update";
$route['supervision_docket_update'] = "routes/supervision_docket_update";
$route['inv_forward'] = "routes/inv_forward";
$route['sup_forward'] = "routes/sup_forward";
$route['supervision_docket_create'] = "routes/supervision_docket_create";
$route['field_office'] = "routes/field_office";
$route['regions'] = "routes/regions";
$route['supervision_docketing'] = "routes/supervision_docketing";
$route['department'] = "routes/department";
$route['location'] = "routes/location";
$route['permission'] = "routes/permission";
$route['user_accounts'] = "routes/user_accounts";
$route['user_roles'] = "routes/user_roles";
$route['dashboard'] = "routes/dashboard";
$route['single_carpeta_create'] = "routes/single_carpeta_create";
$route['single_carpeta'] = "routes/single_carpeta";
$route['single_carpeta_update'] = "routes/single_carpeta_update";
$route['new_client'] = "routes/new_client";
$route['parolee_courtesy_supervision_create'] = "routes/parolee_courtesy_supervision_create";
$route['parolee_courtesy_investigation_create'] = "routes/parolee_courtesy_investigation_create";
$route['parolee_investigation_create'] = "routes/parolee_investigation_create";
$route['parolee_supervision_create'] = "routes/parolee_supervision_create";
$route['parolee_investigation_docketing'] = "routes/parolee_investigation_docketing";
$route['parolee_courtesy_investigation_docketing'] = "routes/parolee_courtesy_investigation_docketing";
$route['parolee_courtesy_investigation_update'] = "routes/parolee_courtesy_investigation_update";
$route['parolee_supervision_docketing'] = "routes/parolee_supervision_docketing";
$route['parolee_courtesy_supervision_docketing'] = "routes/parolee_courtesy_supervision_docketing";
$route['parolee_courtesy_supervision_update'] = "routes/parolee_courtesy_supervision_update";
$route['parolee_investigation_update'] = "routes/parolee_investigation_update";
$route['parolee_supervision_update'] = "routes/parolee_supervision_update";
$route['pardonee_courtesy_investigation_create'] = "routes/pardonee_courtesy_investigation_create";
$route['pardonee_courtesy_supervision_create'] = "routes/pardonee_courtesy_supervision_create";
$route['pardonee_investigation_create'] = "routes/pardonee_investigation_create";
$route['pardonee_supervision_create'] = "routes/pardonee_supervision_create";
$route['pardonee_courtesy_investigation_docketing'] = "routes/pardonee_courtesy_investigation_docketing";
$route['pardonee_courtesy_supervision_docketing'] = "routes/pardonee_courtesy_supervision_docketing";
$route['pardonee_investigation_docketing'] = "routes/pardonee_investigation_docketing";
$route['pardonee_supervision_docketing'] = "routes/pardonee_supervision_docketing";
$route['pardonee_courtesy_investigation_update'] = "routes/pardonee_courtesy_investigation_update";
$route['pardonee_courtesy_supervision_update'] = "routes/pardonee_courtesy_supervision_update";
$route['pardonee_investigation_update'] = "routes/pardonee_investigation_update";
$route['pardonee_supervision_update'] = "routes/pardonee_supervision_update";
$route['client_list'] = "routes/client_list";
$route['client_update'] = "routes/client_update";
$route['docket_routing_parolee'] = "routes/docket_routing_parolee";
$route['pardonee_docket_routing'] = "routes/pardonee_docket_routing";
$route['sent_parolee'] = "routes/sent_parolee";
$route['received_pardonee'] = "routes/received_pardonee";
$route['received_parolee'] = "routes/received_parolee";

// AMS end

$route['request_user'] = "routes/request_user";
$route['brgy_residency'] = "routes/brgy_residency";
$route['brgy_indigency'] = "routes/brgy_indigency";
$route['brgy_business_permit'] = "routes/brgy_business_permit";
$route['brgy_clearance'] = "routes/brgy_clearance";
$route['audit_trail'] = "routes/audit_trail";
$route['qrcode'] = "routes/qrcode";
$route['barcode'] = "routes/barcode";
$route['barcode_qr_management'] = "routes/barcode_qr_management";
$route['resident'] = "routes/resident";
$route['blotter'] = "routes/blotter";
$route['announcement'] = "routes/announcement";
$route['inventory'] = "routes/inventory";
$route['default_controller'] = 'Routes';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
