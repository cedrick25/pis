<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

        <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
            </button>
            <!-- <a class="navbar-brand" href="./"><img src="images/logo.png" alt="Logo"></a> -->
            <!-- <a class="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo"></a> -->
            <a class="navbar-brand" href="dashboard">PIS</a>
            <a class="navbar-brand hidden" href="dashboard">P</a>
        </div>

        <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="aa">
                    <a href="dashboard"> <i class="menu-icon fa fa-dashboard" aria-hidden="true"></i>Dashboard </a>
                </li>
                <!-- <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docketing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="single_carpeta">Single Carpeta</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-share"></i><a href="docket_routing">Docket Routing</a></li>
                        <li><i class="menu-icon fa fa-paper-plane-o"></i><a href="sent">Sent</a></li>
                        <li><i class="menu-icon fa fa-inbox"></i><a href="received">Received</a></li>
                    </ul>
                </li> -->
                <h3 class="menu-title">Docketing</h3>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Parolee</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="parolee_investigation_docketing">Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="parolee_supervision_docketing">Supervision</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_supervision_docketing">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Pardonee</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="pardonee_investigation_docketing">Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="pardonee_supervision_docketing">Supervision</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_supervision_docketing">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Docket Routing</h3>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardonee</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parolee</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardonee</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parolee</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Received</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardonee</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parolee</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Clients</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Clients</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="client_list">Client List</a></li>
                        <!-- <li><i class="menu-icon fa fa-building-o"></i><a href="field_office">Field Office</a></li> -->
                        <!-- <li><i class="menu-icon fa fa-map-marker"></i><a href="regions">Regions</a></li> -->
                    </ul>
                </li>
                <h3 class="menu-title">Forms</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="form_list">Form List</a></li>
                        
                        <!-- <li><i class="menu-icon fa fa-building-o"></i><a href="field_office">Field Office</a></li> -->
                        <!-- <li><i class="menu-icon fa fa-map-marker"></i><a href="regions">Regions</a></li> -->
                    </ul>
                </li>
                <h3 class="menu-title">Management</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                        <!-- <li><i class="menu-icon fa fa-building-o"></i><a href="field_office">Field Office</a></li> -->
                        <!-- <li><i class="menu-icon fa fa-map-marker"></i><a href="regions">Regions</a></li> -->
                    </ul>
                </li>
               <!--  <li class="ii">
                    <a href="audit_trail"><i class="menu-icon fa fa-history"></i>Audit Trail</a>
                </li> -->
                <!-- <li class="jj">
                    <a href="request_user"><i class="menu-icon fa fa-file"></i>Request</a>
                </li> -->
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</aside>