<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// First URI segment is the application's route slug (see application/config/routes.php).
$pis_nav = strtolower(trim((string)$this->uri->segment(1), '/'));
$pis_submenu_li = ''; // data-permission value for active submenu highlight

if ($pis_nav !== '') {
    // Parole and Pardon (pre-parole routes + parolee_* parole module)
    if (strpos($pis_nav, 'parole-pardon-courtesy-investigation') === 0) {
        $pis_submenu_li = 'can_access_docket_pre_parole_courtesy_investigation';
    } elseif (strpos($pis_nav, 'parole-pardon-investigation') === 0 || strpos($pis_nav, 'parolee_investigation') === 0 || strpos($pis_nav, 'parolee_courtesy_investigation') === 0 || $pis_nav === 'parolee-investigation-file-upload') {
        $pis_submenu_li = strpos($pis_nav, 'courtesy') !== false ? 'can_access_docket_pre_parole_courtesy_investigation' : 'can_access_docket_pre_parole_investigation';
    } elseif (strpos($pis_nav, 'parole-pardon-courtesy-supervision') === 0 || strpos($pis_nav, 'parolee_courtesy_supervision') === 0) {
        $pis_submenu_li = 'can_access_docket_pre_parole_courtesy_supervision';
    } elseif (strpos($pis_nav, 'parole-pardon-supervision') === 0 || strpos($pis_nav, 'parolee_supervision') === 0) {
        $pis_submenu_li = 'can_access_docket_pre_parole_supervision';
    } elseif (strpos($pis_nav, 'probation-courtesy-investigation') === 0) {
        $pis_submenu_li = 'can_access_docket_probation_courtesy_investigation';
    } elseif (strpos($pis_nav, 'probation-courtesy-supervision') === 0) {
        $pis_submenu_li = 'can_access_docket_probation_courtesy_supervision';
    } elseif (strpos($pis_nav, 'investigation_docket') === 0 || $pis_nav === 'pis-investigation-file-upload') {
        $pis_submenu_li = 'can_access_docket_probation_investigation';
    } elseif (strpos($pis_nav, 'supervision_docket') === 0 || $pis_nav === 'pis-supervision-file-upload') {
        $pis_submenu_li = 'can_access_docket_probation_supervision';
    } elseif ($pis_nav === 'docket_routing' || $pis_nav === 'docketing' || in_array($pis_nav, array('forward', 'return', 'upload', 'inv_forward', 'sup_forward', 'sent_view'), TRUE)) {
        $pis_submenu_li = 'can_access_docket_routing_probation';
    } elseif ($pis_nav === 'pre-parole-docketing-start') {
        $pis_submenu_li = 'can_access_docket_routing_pre_parole';
    } elseif ($pis_nav === 'docket_routing_parolee' || strpos($pis_nav, 'parolee_docket_') === 0) {
        $pis_submenu_li = 'can_access_docket_routing_parole';
    } elseif ($pis_nav === 'pardonee_docket_routing' || strpos($pis_nav, 'pardonee_docket_') === 0) {
        $pis_submenu_li = 'can_access_docket_routing_pardone';
    } elseif ($pis_nav === 'sent') {
        $pis_submenu_li = 'can_access_docket_routing_sent_probation';
    } elseif ($pis_nav === 'pre-parole-docketing-sent') {
        $pis_submenu_li = 'can_access_docket_routing_sent_pre_parole';
    } elseif ($pis_nav === 'sent_parolee') {
        $pis_submenu_li = 'can_access_docket_routing_sent_parole';
    } elseif ($pis_nav === 'sent_pardonee') {
        $pis_submenu_li = 'can_access_docket_routing_sent_pardone';
    } elseif ($pis_nav === 'pdl-sent') {
        $pis_submenu_li = 'can_access_docket_routing_sent_pdl';
    } elseif ($pis_nav === 'received') {
        $pis_submenu_li = 'can_access_docket_routing_inbox_probation';
    } elseif ($pis_nav === 'pre-parole-docketing-inbox') {
        $pis_submenu_li = 'can_access_docket_routing_inbox_pre_parole';
    } elseif ($pis_nav === 'received_parolee') {
        $pis_submenu_li = 'can_access_docket_routing_inbox_parole';
    } elseif ($pis_nav === 'received_pardonee') {
        $pis_submenu_li = 'can_access_docket_routing_inbox_pardone';
    } elseif ($pis_nav === 'pdl-receive') {
        $pis_submenu_li = 'can_access_docket_routing_inbox_pdl';
    } elseif (strpos($pis_nav, 'client_list_parole_and_pardone') === 0) {
        $pis_submenu_li = 'can_access_fact_sheet_parole_pardone';
    } elseif (strpos($pis_nav, 'single_carpeta') === 0 || in_array($pis_nav, array('client_list_single_carpeta', 'new_client_single_carpeta', 'client_update_single_carpeta', 'client_view_upload_single_carpeta', 'client_single_carpeta_upload'), TRUE)) {
        $pis_submenu_li = 'can_access_fact_sheet_pdl';
    } elseif (in_array($pis_nav, array('client_list', 'new_client', 'client_update', 'client_view_factsheet', 'client_file_upload', 'client_uploads', 'client_file_view', 'worksheet_create'), TRUE)
        || strpos($pis_nav, 'worksheet_') === 0
        || strpos($pis_nav, 'psir_') === 0
        || strpos($pis_nav, 'factsheet') === 0
        || $pis_nav === 'pdf_generate'
    ) {
        $pis_submenu_li = 'can_access_fact_sheet_probation';
    } elseif ($pis_nav === 'user_accounts') {
        $pis_submenu_li = 'can_access_organization_user_accounts';
    } elseif ($pis_nav === 'user_roles') {
        $pis_submenu_li = 'can_access_organization_user_roles';
    } elseif ($pis_nav === 'department') {
        $pis_submenu_li = 'can_access_organization_field_offices';
    } elseif ($pis_nav === 'location') {
        $pis_submenu_li = 'can_access_organization_regions';
    } elseif ($pis_nav === 'permission') {
        $pis_submenu_li = 'can_access_organization_permissions';
    }
}

$pis_open_probation_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_docket_probation_investigation',
        'can_access_docket_probation_courtesy_investigation',
        'can_access_docket_probation_supervision',
        'can_access_docket_probation_courtesy_supervision'
    ),
    TRUE
);

$pis_open_pp_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_docket_pre_parole_investigation',
        'can_access_docket_pre_parole_courtesy_investigation',
        'can_access_docket_pre_parole_supervision',
        'can_access_docket_pre_parole_courtesy_supervision'
    ),
    TRUE
);

$pis_open_docket_routing_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_docket_routing_probation',
        'can_access_docket_routing_pre_parole',
        'can_access_docket_routing_parole',
        'can_access_docket_routing_pardone'
    ),
    TRUE
);

$pis_open_sent_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_docket_routing_sent_probation',
        'can_access_docket_routing_sent_pre_parole',
        'can_access_docket_routing_sent_parole',
        'can_access_docket_routing_sent_pardone',
        'can_access_docket_routing_sent_pdl'
    ),
    TRUE
);

$pis_open_inbox_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_docket_routing_inbox_probation',
        'can_access_docket_routing_inbox_pre_parole',
        'can_access_docket_routing_inbox_parole',
        'can_access_docket_routing_inbox_pardone',
        'can_access_docket_routing_inbox_pdl'
    ),
    TRUE
);

$pis_open_factsheet_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_fact_sheet_probation',
        'can_access_fact_sheet_parole_pardone',
        'can_access_fact_sheet_pdl'
    ),
    TRUE
);

$pis_open_org_dropdown = in_array(
    $pis_submenu_li,
    array(
        'can_access_organization_user_accounts',
        'can_access_organization_user_roles',
        'can_access_organization_field_offices',
        'can_access_organization_regions',
        'can_access_organization_permissions'
    ),
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
            <div class="mobile-menu-brand">
                <img src="images/avatar/images.png" alt="PPIS Logo">
                <span>PPIS</span>
            </div>
            <ul class="nav navbar-nav" id="mm">
                <li class="aa dashboard<?php echo $pis_nav === 'dashboard' ? ' active' : ''; ?>" style="display:none;">
                    <a href="dashboard"> <i class="menu-icon fa fa-dashboard" aria-hidden="true"></i>Dashboard</a>
                </li>
                <h3 class="menu-title" data-permission="can_access_docketing_module" style="display:none;">Docket Access</h3>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_probation_dropdown ? ' show active' : ''; ?>" data-permission="can_access_docket_probation" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_probation_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_probation_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_docket_probation_investigation"<?php echo $pis_submenu_li === 'can_access_docket_probation_investigation' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li data-permission="can_access_docket_probation_courtesy_investigation"<?php echo $pis_submenu_li === 'can_access_docket_probation_courtesy_investigation' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li data-permission="can_access_docket_probation_supervision"<?php echo $pis_submenu_li === 'can_access_docket_probation_supervision' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                        <li data-permission="can_access_docket_probation_courtesy_supervision"<?php echo $pis_submenu_li === 'can_access_docket_probation_courtesy_supervision' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-supervision-list">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_pp_dropdown ? ' show active' : ''; ?>" data-permission="can_access_docket_pre_parole" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_pp_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Parole and Pardon</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_pp_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_docket_pre_parole_investigation"<?php echo $pis_submenu_li === 'can_access_docket_pre_parole_investigation' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-investigation-list">Investigation</a></li>
                        <li data-permission="can_access_docket_pre_parole_courtesy_investigation"<?php echo $pis_submenu_li === 'can_access_docket_pre_parole_courtesy_investigation' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li data-permission="can_access_docket_pre_parole_supervision"<?php echo $pis_submenu_li === 'can_access_docket_pre_parole_supervision' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-supervision">Supervision</a></li>
                        <li data-permission="can_access_docket_pre_parole_courtesy_supervision"<?php echo $pis_submenu_li === 'can_access_docket_pre_parole_courtesy_supervision' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-supervision-list">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <h3 class="menu-title" data-permission="can_access_docket_routing_module" style="display:none;">Docket Routing</h3>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_docket_routing_dropdown ? ' show active' : ''; ?>" data-permission="can_access_docket_routing_module_csd" style="">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_docket_routing_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_docket_routing_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_docket_routing_probation"<?php echo $pis_submenu_li === 'can_access_docket_routing_probation' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li data-permission="can_access_docket_routing_pre_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_pre_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-start">Pre-Parole</a></li>
                        <li data-permission="can_access_docket_routing_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parole</a></li>
                        <li data-permission="can_access_docket_routing_pardone"<?php echo $pis_submenu_li === 'can_access_docket_routing_pardone' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardone</a></li>
                    </ul>
                </li>
                <li data-permission="can_access_docket_routing_pdl"<?php echo $pis_nav === 'pdl-docket' ? ' class="active"' : ''; ?> style="display:none;">
                    <a href="pdl-docket"> <i class="menu-icon fa fa-building-o"></i>PDL Routing</a>
                </li>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_sent_dropdown ? ' show active' : ''; ?>" data-permission="can_access_docket_routing_sent" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_sent_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_sent_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_docket_routing_sent_probation"<?php echo $pis_submenu_li === 'can_access_docket_routing_sent_probation' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li data-permission="can_access_docket_routing_sent_pre_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_sent_pre_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-sent">Pre-Parole</a></li>
                        <li data-permission="can_access_docket_routing_sent_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_sent_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parole</a></li>
                        <li data-permission="can_access_docket_routing_sent_pardone"<?php echo $pis_submenu_li === 'can_access_docket_routing_sent_pardone' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardone</a></li>
                        <li data-permission="can_access_docket_routing_sent_pdl"<?php echo $pis_submenu_li === 'can_access_docket_routing_sent_pdl' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pdl-sent">PDL</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_inbox_dropdown ? ' show active' : ''; ?>" data-permission="can_access_docket_routing_inbox" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_inbox_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Inbox</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_inbox_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_docket_routing_inbox_probation"<?php echo $pis_submenu_li === 'can_access_docket_routing_inbox_probation' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li data-permission="can_access_docket_routing_inbox_pre_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_inbox_pre_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-inbox">Pre-Parole</a></li>
                        <li data-permission="can_access_docket_routing_inbox_parole"<?php echo $pis_submenu_li === 'can_access_docket_routing_inbox_parole' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parole</a></li>
                        <li data-permission="can_access_docket_routing_inbox_pardone"<?php echo $pis_submenu_li === 'can_access_docket_routing_inbox_pardone' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardone</a></li>
                        <li data-permission="can_access_docket_routing_inbox_pdl"<?php echo $pis_submenu_li === 'can_access_docket_routing_inbox_pdl' ? ' class="active"' : ''; ?> style=""><i class="menu-icon fa fa-user"></i><a href="pdl-receive">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title" data-permission="can_access_fact_sheet" style="display:none;">Fact Sheet</h3>
                <li class="menu-item-has-children dropdown<?php echo $pis_open_factsheet_dropdown ? ' show active' : ''; ?>" data-permission="can_access_fact_sheet" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_factsheet_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_factsheet_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_fact_sheet_probation"<?php echo $pis_submenu_li === 'can_access_fact_sheet_probation' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list">Probation</a></li>
                        <li data-permission="can_access_fact_sheet_parole_pardone"<?php echo $pis_submenu_li === 'can_access_fact_sheet_parole_pardone' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_parole_and_pardone">Parole and Pardone</a></li>
                        <li data-permission="can_access_fact_sheet_pdl"<?php echo $pis_submenu_li === 'can_access_fact_sheet_pdl' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title" data-permission="can_access_forms" style="display:none;">Forms</h3>
                <li data-permission="can_access_forms"<?php echo ($pis_nav === 'form_list' || $pis_nav === 'form_upload') ? ' class="active"' : ''; ?> style="display:none;">
                    <a href="form_list"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
                </li>
                <h3 class="menu-title" data-permission="can_access_organization" style="display:none;">Management</h3>
                <li class="menu-item-has-children dropdown hh<?php echo $pis_open_org_dropdown ? ' show active' : ''; ?>" data-permission="can_access_organization" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="<?php echo $pis_open_org_dropdown ? 'true' : 'false'; ?>"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu<?php echo $pis_open_org_dropdown ? ' show' : ''; ?>">
                        <li data-permission="can_access_organization_user_accounts"<?php echo $pis_submenu_li === 'can_access_organization_user_accounts' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li data-permission="can_access_organization_user_roles"<?php echo $pis_submenu_li === 'can_access_organization_user_roles' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li data-permission="can_access_organization_field_offices"<?php echo $pis_submenu_li === 'can_access_organization_field_offices' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li data-permission="can_access_organization_regions"<?php echo $pis_submenu_li === 'can_access_organization_regions' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li data-permission="can_access_organization_permissions"<?php echo $pis_submenu_li === 'can_access_organization_permissions' ? ' class="active"' : ''; ?> style="display:none;"><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</aside>
