<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

        <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="dashboard">PPIS</a>
            <a class="navbar-brand hidden" href="dashboard">P</a>
        </div>

        <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav" id="mm">
                <li class="aa dashboard">
                    <a href="dashboard"> <i class="menu-icon fa fa-dashboard" aria-hidden="true"></i>Dashboard</a>
                </li>
                <h3 class="menu-title" class="docketing_module" style="display:none;">Docketing</h3>
                <li class="menu-item-has-children dropdown probation_docketing_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="probation_probation_investigation" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li class="probation_probation_courtesy_investigation" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li class="probation_probation_supervision" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                        <li class="probation_probation_courtesy_supervision" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="probation-courtesy-supervision-list">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown pre_parole_docketing_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Parole and Pardon</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="ppi_investigation" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-investigation-list">Investigation</a></li>
                        <li class="ppi_cs_investigation" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-investigation-list">Courtesy Investigation</a></li>
                        <li class="parolee_supervision_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-supervision">Supervision</a></li>
                        <li class="parolee_courtesy_supervision_docketing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="parole-pardon-courtesy-supervision-list">Courtesy Supervision</a></li>
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
                <li class="menu-item-has-children dropdown docket_routing_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="docket_routing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li class="docket_routing_pre_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-start">Pre-Parole</a></li>
                        <li class="docket_routing_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parole</a></li>
                        <li class="pardonee_docket_routing" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardone</a></li>
                    </ul>
                </li>
                <li class="pdl_docketing" style="display:none;">
                    <a href="pdl-docket"> <i class="menu-icon fa fa-building-o"></i>PDL Routing</a>
                </li>
                <li class="menu-item-has-children dropdown sent_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="sent" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li class="sent_pre_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="">Pre-Parole</a></li>
                        <li class="sent_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parole</a></li>
                        <li class="sent_pardonee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardone</a></li>
                        <li class="sent_pdl" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pdl-sent">PDL</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown inbox_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Inbox</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="received" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li class="received_pre_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pre-parole-docketing-inbox">Pre-Parole</a></li>
                        <li class="received_parolee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parole</a></li>
                        <li class="received_pardonee" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardone</a></li>
                        <li class="from_tsd" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="pdl-receive">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title client_list" style="display:none;">Fact Sheet</h3>
                <li class="menu-item-has-children dropdown client_list" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a>
                    <!-- <a href="client_list"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a> -->
                    <ul class="sub-menu children dropdown-menu">
                        <li class="pb_client_list" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list">Probation</a></li>
                        <li class="sc_client_list" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_parole_and_pardone">Parole and Pardone</a></li>
                        <li class="pdl_client_list" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">PDL</a></li>
                        <!-- <li class="pre_parole_client_list"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">Pre-Parole</a></li> -->
                    </ul>
                </li>
                <h3 class="menu-title form_list" style="display:none;">Forms</h3>
                <li class="form_list" style="display:none;">
                    <a href="form_list"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
                </li>
                <h3 class="menu-title org_module" style="display:none;">Management</h3>
                <li class="menu-item-has-children dropdown hh org_module" style="display:none;">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="user_account_module" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li class="user_role_module" style="display:none;"><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li class="field_office_module" style="display:none;"><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li class="region_module" style="display:none;"><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li class="permission_module" style="display:none;"><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</aside>

<script>
        // var header = document.getElementById("mm");
        // var btns = header.getElementsByClassName("aa");
        // for (var i = 0; i < btns.length; i++) {
        //   btns[i].addEventListener("click", function() {
        //   var current = document.getElementsByClassName("active");
        //   if (current.length > 0) { 
        //     current[0].className = current[0].className.replace(" active", "");
        //   }
        //   this.className += " active";
        //   });
        // }
    </script>
