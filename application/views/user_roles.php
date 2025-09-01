<?php $this->load->view('templates/header.php'); ?>

<style>
  .permission-item {
    margin-bottom: 10px;
  }
  .permission-row {
    display: flex;
    align-items: center;
    gap: 8px; /* spacing between switch and label */
  }
  .permission-label {
    /*font-weight: bold;*/
    margin-left: 5px;
    /*margin-bottom: 30px;*/
  }
  .sub-permission {
    margin-left: 15px;
    margin-top: 10px;
  }
  /* switch style */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: #2196F3;
  }
  input:checked + .slider:before {
    transform: translateX(20px);
  }
</style>

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateRoleModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update User Accounts</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control user_role_name_update form_capitalized"></div>
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role Description</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="description" class="form-control user_role_desc_update form_capitalized"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->
    
    <!-- new User account modal -->
    <div class="modal fade" id="newRoleModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New User Role</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Created  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Administrator" class="form-control user_role_name form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role Description</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Administrator CMRD" class="form-control user_role_desc form_capitalized"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new User account modal -->

    <!-- grant modal -->
    <div class="modal fade" id="grantPermissionModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Grant Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div id="permissionContainer" class="col col-md-12 row permission_list" style="margin-left: 5px; height: 700px; overflow: auto;">
                    </div>
                </div>
                <div class="alert alert-success" role="alert" id="success_grant" style="display:none">
                    <i class="fa fa-check"></i>
                        Granted!  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_grant_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- grant modal -->
    <!-- update permission modal -->
    <div class="modal fade" id="updatePermissionModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="col col-md-12 row">
                        <div class="col col-md-10"><label for="text-input" class=" form-control-label" style="display:block">Permissions:</label></div>
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label" style="display:block">Grant</label></div>
                    </div>
                    <div class="col col-md-12 row permission_list_update">
                    </div>
                </div>
                <div class="alert alert-success" role="alert" id="success_grant_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Permission Updated!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_grant_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- grant modal -->


    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="user_roles">My Organization</a></li>
                            <li class="active">User Roles</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">User Roles List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newRoleModal"><i class="fa fa-plus-circle"></i> Add Role</button>
                            </div>
                            <div class="dataTables_filter">
                                <label style=" display: inline-flex; margin-left: 5px; margin-right: 20px; margin-top: 25px" class="float-right" >Search:<input type="search" class="form-control form-control-sm searchBar" id= "searchBar" placeholder="Search" style="margin-left: 7px"></label>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                            <th>Permission</th> 
                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/user_roles.js"></script>
</body>

</html>