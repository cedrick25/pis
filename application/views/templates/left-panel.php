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
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Probation</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="supervision_docketing">Supervision</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Parolee</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="parolee_investigastion_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="parolee_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_supervision_docketing">Supervision</a></li>
<!--                         <li style='display:none;' class="parolee_courtesy_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li style='display:none;' class="parolee_courtesy_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="parolee_courtesy_supervision_docketing">Courtesy Supervision</a></li> -->
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Pardonee</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="pardonee_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_investigation_docketing">Investigation</a></li>
                        <li style='display:none;' class="pardonee_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_supervision_docketing">Supervision</a></li>
<!--                         <li style='display:none;' class="pardonee_courtesy_investigation_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_investigation_docketing">Courtesy Investigation</a></li>
                        <li style='display:none;' class="pardonee_courtesy_supervision_docketing"><i class="menu-icon fa fa-user"></i><a href="pardonee_courtesy_supervision_docketing">Courtesy Supervision</a></li> -->
                    </ul>
                </li>
                <h3 class="menu-title">Docket Routing</h3>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Docket Routing</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="docket_routing"><i class="menu-icon fa fa-user"></i><a href="docket_routing">Probation</a></li>
                        <li style='display:none;' class="pardonee_docket_routing"><i class="menu-icon fa fa-user"></i><a href="pardonee_docket_routing">Pardonee</a></li>
                        <li style='display:none;' class="docket_routing_parolee"><i class="menu-icon fa fa-user"></i><a href="docket_routing_parolee">Parolee</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Sent</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="sent"><i class="menu-icon fa fa-user"></i><a href="sent">Probation</a></li>
                        <li style='display:none;' class="sent_pardonee"><i class="menu-icon fa fa-user"></i><a href="sent_pardonee">Pardonee</a></li>
                        <li style='display:none;' class="sent_parolee"><i class="menu-icon fa fa-user"></i><a href="sent_parolee">Parolee</a></li>
                    </ul>
                </li>
                <li class="menu-item-has-children dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Received</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="received"><i class="menu-icon fa fa-user"></i><a href="received">Probation</a></li>
                        <li style='display:none;' class="received_pardonee"><i class="menu-icon fa fa-user"></i><a href="received_pardonee">Pardonee</a></li>
                        <li style='display:none;' class="received_parolee"><i class="menu-icon fa fa-user"></i><a href="received_parolee">Parolee</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Fact Sheet</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Fact Sheet</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="client_list"><i class="menu-icon fa fa-user"></i><a href="client_list">Fact Sheet</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Forms</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>Forms</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li style='display:none;' class="form_list"><i class="menu-icon fa fa-user"></i><a href="form_list">Form List</a></li>
                    </ul>
                </li>
                <h3 class="menu-title">Management</h3>
                <li class="menu-item-has-children dropdown hh">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-building-o"></i>My Organization</a>
                    <ul class="sub-menu children dropdown-menu">
                        <li class="user_accounts"><i class="menu-icon fa fa-user"></i><a href="user_accounts">User Accounts</a></li>
                        <li class=""><i class="menu-icon fa fa-user"></i><a href="user_roles">User Roles</a></li>
                        <li class="department"><i class="menu-icon fa fa-building-o"></i><a href="department">Field Office</a></li>
                        <li class="location"><i class="menu-icon fa fa-location-arrow"></i><a href="location">Region</a></li>
                        <li class="permission"><i class="menu-icon fa fa-lock"></i><a href="permission">Permission</a></li>
                    </ul>
                </li>
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
