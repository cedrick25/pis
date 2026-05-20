<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// First URI segment is the application's route slug (see application/config/routes.php).
$pis_nav = strtolower(trim((string)$this->uri->segment(1), '/'));
$pis_submenu_li = ''; // Class on a submenu `<li>` to mark active (matches permission classes)

if ($pis_nav !== '') {
    // Parole and Pardon (pre-parole routes + parolee_* parole module)
    if (strpos($pis_nav, 'parole-pardon-courtesy-investigation') === 0) {
        $pis_submenu_li = 'ppi_cs_investigation';
    } elseif (strpos($pis_nav, 'parole-pardon-investigation') === 0 || strpos($pis_nav, 'parolee_investigation') === 0 || strpos($pis_nav, 'parolee_courtesy_investigation') === 0 || $pis_nav === 'parolee-investigation-file-upload') {
        $pis_submenu_li = strpos($pis_nav, 'courtesy') !== false ? 'ppi_cs_investigation' : 'ppi_investigation';
    } elseif (strpos($pis_nav, 'parole-pardon-courtesy-supervision') === 0 || strpos($pis_nav, 'parolee_courtesy_supervision') === 0) {
        $pis_submenu_li = 'parolee_courtesy_supervision_docketing';
    } elseif (strpos($pis_nav, 'parole-pardon-supervision') === 0 || strpos($pis_nav, 'parolee_supervision') === 0) {
        $pis_submenu_li = 'parolee_supervision_docketing';
    } elseif (strpos($pis_nav, 'probation-courtesy-investigation') === 0) {
        $pis_submenu_li = 'probation_probation_courtesy_investigation';
    } elseif (strpos($pis_nav, 'probation-courtesy-supervision') === 0) {
        $pis_submenu_li = 'probation_probation_courtesy_supervision';
    } elseif (strpos($pis_nav, 'investigation_docket') === 0 || $pis_nav === 'pis-investigation-file-upload') {
        $pis_submenu_li = 'probation_probation_investigation';
    } elseif (strpos($pis_nav, 'supervision_docket') === 0 || $pis_nav === 'pis-supervision-file-upload') {
        $pis_submenu_li = 'probation_probation_supervision';
    } elseif ($pis_nav === 'docket_routing' || $pis_nav === 'docketing' || in_array($pis_nav, array('forward', 'return', 'upload', 'inv_forward', 'sup_forward', 'sent_view'), TRUE)) {
        $pis_submenu_li = 'docket_routing';
    } elseif ($pis_nav === 'pre-parole-docketing-start') {
        $pis_submenu_li = 'docket_routing_pre_parolee';
    } elseif ($pis_nav === 'docket_routing_parolee' || strpos($pis_nav, 'parolee_docket_') === 0) {
        $pis_submenu_li = 'docket_routing_parolee';
    } elseif ($pis_nav === 'pardonee_docket_routing' || strpos($pis_nav, 'pardonee_docket_') === 0) {
        $pis_submenu_li = 'pardonee_docket_routing';
    } elseif ($pis_nav === 'sent') {
        $pis_submenu_li = 'sent';
    } elseif ($pis_nav === 'pre-parole-docketing-sent') {
        $pis_submenu_li = 'sent_pre_parolee';
    } elseif ($pis_nav === 'sent_parolee') {
        $pis_submenu_li = 'sent_parolee';
    } elseif ($pis_nav === 'sent_pardonee') {
        $pis_submenu_li = 'sent_pardonee';
    } elseif ($pis_nav === 'pdl-sent') {
        $pis_submenu_li = 'sent_pdl';
    } elseif ($pis_nav === 'received') {
        $pis_submenu_li = 'received';
    } elseif ($pis_nav === 'pre-parole-docketing-inbox') {
        $pis_submenu_li = 'received_pre_parolee';
    } elseif ($pis_nav === 'received_parolee') {
        $pis_submenu_li = 'received_parolee';
    } elseif ($pis_nav === 'received_pardonee') {
        $pis_submenu_li = 'received_pardonee';
    } elseif ($pis_nav === 'pdl-receive') {
        $pis_submenu_li = 'from_tsd';
    } elseif (strpos($pis_nav, 'client_list_parole_and_pardone') === 0) {
        $pis_submenu_li = 'sc_client_list';
    } elseif (strpos($pis_nav, 'single_carpeta') === 0 || in_array($pis_nav, array('client_list_single_carpeta', 'new_client_single_carpeta', 'client_update_single_carpeta', 'client_view_upload_single_carpeta', 'client_single_carpeta_upload'), TRUE)) {
        $pis_submenu_li = 'pdl_client_list';
    } elseif (in_array($pis_nav, array('client_list', 'new_client', 'client_update', 'client_view_factsheet', 'client_file_upload', 'client_uploads', 'client_file_view', 'worksheet_create'), TRUE)
        || strpos($pis_nav, 'worksheet_') === 0
        || strpos($pis_nav, 'psir_') === 0
        || strpos($pis_nav, 'factsheet') === 0
        || $pis_nav === 'pdf_generate'
    ) {
        $pis_submenu_li = 'pb_client_list';
    } elseif ($pis_nav === 'user_accounts') {
        $pis_submenu_li = 'user_account_module';
    } elseif ($pis_nav === 'user_roles') {
        $pis_submenu_li = 'user_role_module';
    } elseif ($pis_nav === 'department') {
        $pis_submenu_li = 'field_office_module';
    } elseif ($pis_nav === 'location') {
        $pis_submenu_li = 'region_module';
    } elseif ($pis_nav === 'permission') {
        $pis_submenu_li = 'permission_module';
    }
}

$pis_open_probation_dropdown = in_array(
    $pis_submenu_li,
    array('probation_probation_investigation', 'probation_probation_courtesy_investigation', 'probation_probation_supervision', 'probation_probation_courtesy_supervision'),
    TRUE
);

$pis_open_pp_dropdown = in_array(
    $pis_submenu_li,
    array('ppi_investigation', 'ppi_cs_investigation', 'parolee_supervision_docketing', 'parolee_courtesy_supervision_docketing'),
    TRUE
);

$pis_open_docket_routing_dropdown = in_array(
    $pis_submenu_li,
    array('docket_routing', 'docket_routing_pre_parolee', 'docket_routing_parolee', 'pardonee_docket_routing'),
    TRUE
);

$pis_open_sent_dropdown = in_array(
    $pis_submenu_li,
    array('sent', 'sent_pre_parolee', 'sent_parolee', 'sent_pardonee', 'sent_pdl'),
    TRUE
);

$pis_open_inbox_dropdown = in_array(
    $pis_submenu_li,
    array('received', 'received_pre_parolee', 'received_parolee', 'received_pardonee', 'from_tsd'),
    TRUE
);

$pis_open_factsheet_dropdown = in_array(
    $pis_submenu_li,
    array('pb_client_list', 'sc_client_list', 'pdl_client_list'),
    TRUE
);

$pis_open_org_dropdown = in_array(
    $pis_submenu_li,
    array('user_account_module', 'user_role_module', 'field_office_module', 'region_module', 'permission_module'),
    TRUE
);

/**
 * Highlight submenu row and link text/icons (Bootstrap only styles top-level `.active`; submenus need explicit rules).
 */
?>
<style>
    #left-panel .navbar-nav .sub-menu.dropdown-menu > li.active > a,
    #left-panel .navbar-nav .sub-menu.dropdown-menu > li.active > a:focus,
    #left-panel .navbar-nav .sub-menu.dropdown-menu > li.active > a:hover {
        color: #d7d9e3 !important;
        font-weight: 600;
    }
</style>
<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

        <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="" style="border-bottom: 1px solid #4e4e5200 !important;">PPIS</a>
            <a class="navbar-brand hidden" href="">P</a>
        </div>

        <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav" id="mm">
                <li class="aa dashboard<?php echo $pis_nav === 'dashboard' ? ' active' : ''; ?>" style="display:none;">
                    <a href="dashboard"> <i class="menu-icon fa fa-dashboard" aria-hidden="true"></i>Dashboard</a>
                </li>
                <h3 class="menu-title docketing_module" style="display:none;">Docketing</h3>
                <li class="menu-item-has-children dropdown probation_docketing_module<?php echo $pis_open_probation_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_probation_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_probation_dropdown ? ' show' : ''; ?>">
                        <li class="probation_probation_investigation<?php echo $pis_submenu_li === 'probation_probation_investigation' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li class="probation_probation_courtesy_investigation<?php echo $pis_submenu_li === 'probation_probation_courtesy_investigation' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li class="probation_probation_supervision<?php echo $pis_submenu_li === 'probation_probation_supervision' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                        <li class="probation_probation_courtesy_supervision<?php echo $pis_submenu_li === 'probation_probation_courtesy_supervision' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-supervision-list">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown pre_parole_docketing_module<?php echo $pis_open_pp_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_pp_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Parole and Pardon</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_pp_dropdown ? ' show' : ''; ?>">
                        <li class="ppi_investigation<?php echo $pis_submenu_li === 'ppi_investigation' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-investigation-list">Investigation</a></li>
                        <li class="ppi_cs_investigation<?php echo $pis_submenu_li === 'ppi_cs_investigation' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li class="parolee_supervision_docketing<?php echo $pis_submenu_li === 'parolee_supervision_docketing' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-supervision">Supervision</a></li>
                        <li class="parolee_courtesy_supervision_docketing<?php echo $pis_submenu_li === 'parolee_courtesy_supervision_docketing' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-supervision-list">Courtesy Supervision</a></li>
                        <!-- <li class="ppi_cs_supervision" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-courtesy-supervision-list">Courtesy Supervision</a></li> -->
                        <!-- <li class="ppi_supervision" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-supervision-list">Supervision</a></li> -->
                        <!-- <li class="parolee_investigation_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parolee_investigation_docketing">Investigation</a></li> -->
                        <!-- <li class="parolee_courtesy_investigation_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_investigation_docketing">Courtesy Investigation</a></li> -->
                    </ul>
                </li>
                <!-- <li class="menu-item-has-children dropdown parolee_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Parole and Pardon</a>
                    <ul class="sub-menu children dropdown-menu">
                    </ul>
                </li> -->
                <!-- <li class="menu-item-has-children dropdown pardonee_module" style="display:none;">
                    <a href="#" class="dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Pardone</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="pardonee_investigation_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_investigation_docketing">Investigation</a></li>
                        <li class="pardonee_supervision_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_supervision_docketing">Supervision</a></li>
                        <li class="pardonee_courtesy_investigation_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li class="pardonee_courtesy_supervision_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_supervision_docketing">Courtesy Supervision</a></li>
                    </ul>
                </li> -->
                <h3 class="menu-title docket_routing_module" style="display:none;">Docket Routing</h3>
                <li class="menu-item-has-children dropdown docket_routing_module_pis<?php echo $pis_open_docket_routing_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_docket_routing_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_docket_routing_dropdown ? ' show' : ''; ?>">
                        <li class="docket_routing<?php echo $pis_submenu_li === 'docket_routing' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li class="docket_routing_pre_parolee<?php echo $pis_submenu_li === 'docket_routing_pre_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-start">Pre-Parole</a></li>
                        <li class="docket_routing_parolee<?php echo $pis_submenu_li === 'docket_routing_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parole</a></li>
                        <li class="pardonee_docket_routing<?php echo $pis_submenu_li === 'pardonee_docket_routing' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardone</a></li>
                    </ul>
                </li>
                <li class="pdl_docketing<?php echo $pis_nav === 'pdl-docket' ? ' active' : ''; ?>" style="display:none;">
                    <a href="pdl-docket"> <i class="menu-icon fa fa-building-o"></i>PDL Routing</a>
                </li>
                <li class="menu-item-has-children dropdown sent_module<?php echo $pis_open_sent_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_sent_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_sent_dropdown ? ' show' : ''; ?>">
                        <li class="sent<?php echo $pis_submenu_li === 'sent' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li class="sent_pre_parolee<?php echo $pis_submenu_li === 'sent_pre_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-sent">Pre-Parole</a></li>
                        <li class="sent_parolee<?php echo $pis_submenu_li === 'sent_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parole</a></li>
                        <li class="sent_pardonee<?php echo $pis_submenu_li === 'sent_pardonee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardone</a></li>
                        <li class="sent_pdl<?php echo $pis_submenu_li === 'sent_pdl' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pdl-sent">PDL</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown inbox_module<?php echo $pis_open_inbox_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_inbox_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Inbox</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_inbox_dropdown ? ' show' : ''; ?>">
                        <li class="received<?php echo $pis_submenu_li === 'received' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li class="received_pre_parolee<?php echo $pis_submenu_li === 'received_pre_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-inbox">Pre-Parole</a></li>
                        <li class="received_parolee<?php echo $pis_submenu_li === 'received_parolee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parole</a></li>
                        <li class="received_pardonee<?php echo $pis_submenu_li === 'received_pardonee' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardone</a></li>
                        <li class="from_tsd<?php echo $pis_submenu_li === 'from_tsd' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pdl-receive">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title client_list" style="display:none;">Fact Sheet</h3>
                <li class="menu-item-has-children dropdown client_list<?php echo $pis_open_factsheet_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_factsheet_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a>
                    <!-- <a href="client_list"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a> -->
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_factsheet_dropdown ? ' show' : ''; ?>">
                        <li class="pb_client_list<?php echo $pis_submenu_li === 'pb_client_list' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list">Probation</a></li>
                        <li class="sc_client_list<?php echo $pis_submenu_li === 'sc_client_list' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_parole_and_pardone">Parole and Pardone</a></li>
                        <li class="pdl_client_list<?php echo $pis_submenu_li === 'pdl_client_list' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">PDL</a></li>
                        <!-- <li class="pre_parole_client_list"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">Pre-Parole</a></li> -->
                    </ul>
                </li>
                <h3 class="menu-title form_list" style="display:none;">Forms</h3>
                <li class="form_list<?php echo ($pis_nav === 'form_list' || $pis_nav === 'form_upload') ? ' active' : ''; ?>" style="display:none;">
                    <a href="form_list"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
                </li>
                <h3 class="menu-title org_module" style="display:none;">Management</h3>
                <li class="menu-item-has-children dropdown hh org_module<?php echo $pis_open_org_dropdown ? ' show active' : ''; ?>" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_org_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_org_dropdown ? ' show' : ''; ?>">
                        <li class="user_account_module<?php echo $pis_submenu_li === 'user_account_module' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li class="user_role_module<?php echo $pis_submenu_li === 'user_role_module' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li class="field_office_module<?php echo $pis_submenu_li === 'field_office_module' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li class="region_module<?php echo $pis_submenu_li === 'region_module' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li class="permission_module<?php echo $pis_submenu_li === 'permission_module' ? ' active' : ''; ?>" style="display:none;"><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</aside>
