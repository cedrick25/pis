<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

        <div class="navbar-header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
            </button>
            <!-- <a class="navbar-brand" href="./"><img src="images/logo.png" alt="Logo"></a> -->
            <!-- <a class="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo"></a> -->
            <a class="navbar-brand" href="dashboard">PPIS</a>
            <a class="navbar-brand hidden" href="dashboard">P</a>
        </div>

        <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav" id="mm">
                <li class="aa">
                    <a href="dashboard"> <i class="menu-icon fa fa-dashboard" aria-hidden="true"></i>Dashboard </a>
                </li>
                <h3 class="menu-title">Docketing</h3>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle probation_module" style='display:none;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle parolee_module" style='display:none;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Parole</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="parolee_investigastion_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="parolee_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_supervision_docketing">Supervision</a></li>
                        <li style='display:none;' class="parolee_courtesy_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li style='display:none;' class="parolee_courtesy_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_supervision_docketing">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle pardonee_module" style='display:none;'  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Pardone</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="pardonee_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="pardonee_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_supervision_docketing">Supervision</a></li>
                        <li style='display:none;' class="pardonee_courtesy_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li style='display:none;' class="pardonee_courtesy_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_supervision_docketing">Courtesy Supervision</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Docket Routing</h3>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="docket_routing"><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li style='display:none;' class="pardonee_docket_routing"><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardone</a></li>
                        <li style='display:none;' class="docket_routing_parolee"><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parole</a></li>
                        <!-- <li style='' class="pdl_docketing"><i class="menu-icon fa fa-user"></i><a href="pdl-docket"></a></li> -->
                    </ul>
                </li>
                <li class="pdl_docketing" style=''>
                    <a href="pdl-docket"> <i class="menu-icon fa fa-building-o"></i>PDL Routing</a>
<!--                     <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="form_list"><i class="menu-icon fa fa-user"></i><a href="form_list">Form List</a></li>
                    </ul> -->
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="sent"><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li style='display:none;' class="sent_pardonee"><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardone</a></li>
                        <li style='display:none;' class="sent_parolee"><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parole</a></li>
                        <li style='' class="sent_pdl"><i class="menu-icon fa fa-user"></i><a href="pdl-sent">PDL</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Inbox</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="received"><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li style='display:none;' class="received_pardonee"><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardone</a></li>
                        <li style='display:none;' class="received_parolee"><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parole</a></li>
                        <li style='' class="from_tsd"><i class="menu-icon fa fa-user"></i><a href="pdl-receive">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title client_list" style='display:none;'>Fact Sheet</h3>
                <li class="menu-item-has-children dropdown client_list" style='display:none;'>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a>
                    <!-- <a href="client_list"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a> -->
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="client_list"><i class="menu-icon fa fa-user"></i><a href="client_list">Probation</a></li>
                        <li style='display:none;' class="client_list"><i class="menu-icon fa fa-user"></i><a href="client_list_parole_and_pardone">Parole and Pardone</a></li>
                        <li style='display:none;' class="client_list"><i class="menu-icon fa fa-user"></i><a href="client_list_single_carpeta">PDL</a></li>
                    </ul>
                </li>
                <h3 class="menu-title form_list" style='display:none;'>Forms</h3>
                <li class="form_list" style='display:none;'>
                    <a href="form_list"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
<!--                     <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="form_list"><i class="menu-icon fa fa-user"></i><a href="form_list">Form List</a></li>
                    </ul> -->
                </li>
                <h3 class="menu-title org_module" style='display:none;'>Management</h3>
                <li class="menu-item-has-children dropdown hh org_module" style='display:none;'>
                    <a href="#" class="dropdown-toggle org_module" style='display:none;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class=""><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li class=""><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li class=""><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li class=""><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li class=""><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                    </ul>
                </li>
<!--                 <li class="menu-item-has-children dropdown hh org_module" style='display:none;'>
                    <a href="#" class="dropdown-toggle org_module" style='display:none;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Services</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class=""><i class="menu-icon fa fa-user"></i><a href="user_accounts">TC</a></li>
                        <li class=""><i class="menu-icon fa fa-user"></i><a href="user_roles">RJ</a></li>
                        <li class=""><i class="menu-icon fa fa-building-o"></i><a href="department">Volunterism</a></li>
                </li> -->
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</aside>

<script>
        var header = document.getElementById("mm");
        var btns = header.getElementsByClassName("aa");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          if (current.length > 0) { 
            current[0].className = current[0].className.replace(" active", "");
          }
          this.className += " active";
          });
        }
    </script>
