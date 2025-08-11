<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateUserModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1100px;">
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
                <div class="modal-body">
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">First Name <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="" class="form-control firstName_update form_capitalized"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <label class="form-check-label" for="mNameCheck">Middle Name <span class="text-danger">*</span></label>
                            </div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <input type="text" name="text-input" placeholder="" class="form-control middleName_update form_capitalized">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input middleNameCheckUpdate" id="mNameCheck" style="width: 12px; height: 12px;">
                                    <label class="form-check-label italic-font small-font" for="mNameCheck">No Middle Name</label>
                                </div>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Last Name <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="" class="form-control lastName_update form_capitalized"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Suffix</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="" class="form-control suffix_update form_capitalized"></div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Birthday</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="date" class="form-control birthday_update"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Contact No.</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="number" name="text-input" placeholder="" class="form-control num_update"></div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Email Address <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="" class="form-control email_update"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Field Office <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control field_office_update select2">
                                    
                                </select>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Username <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="" class="form-control userName_update"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Password</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="password" name="" placeholder="*********" class="form-control password_update"></div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">User Roles <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control user_roles_update select2">
                                </select>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6 managerFieldUpdate" style="display:none;">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Manager</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control manager_update select2" multiple>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new User account modal -->
    <div class="modal fade" id="newUserModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Created  
                </div>
                <div class="modal-body">
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">First Name <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="First Name" class="form-control firstName form_capitalized"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <label class="form-check-label" for="mNameCheck">Middle Name <span class="text-danger middleNameAsterisk">*</span></label>
                            </div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <input type="text" name="text-input" placeholder="Middle Name" class="form-control middleName form_capitalized">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input middleNameCheck" id="mNameCheck" style="width: 12px; height: 12px;">
                                    <label class="form-check-label italic-font small-font" for="mNameCheck">No Middle Name</label>
                                </div>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Last Name <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="Last Name"class="form-control lastName form_capitalized"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Suffix</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="Suffix"class="form-control suffix form_capitalized"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Birthday</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="date" class="form-control birthday"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Contact No.</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="number" name="text-input" placeholder="e.g 09123456789"class="form-control num"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Email Address <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="email@probation.gov.ph"class="form-control email"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Field Office <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control field_office select2">
                                </select>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Username <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" name="text-input" placeholder="username@probation.gov.ph" class="form-control username"></div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Password <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="password" name="" placeholder="*********" class="form-control password password2"></div>
                            <div class="errorMessage"></div>
                        </div>
                    </div>
                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">User Roles <span class="text-danger">*</span></label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control user_roles select2">
                                </select>
                            </div>
                            <div class="errorMessage"></div>
                        </div>
                        <div class="row form-group col-sm-6 col-md-6 col-lg-6 col-xl-6 managerFieldCreate" style="display: none;">
                            <div class="col col-sm-3 col-md-3 col-lg-3 col-xl-3"><label for="text-input" class=" form-control-label">Manager</label></div>
                            <div class="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control manager select2" multiple>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-cancel btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new User account modal -->

    <div class="modal fade" id="activateModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Activate User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_activated" style="display:none">
                    <i class="fa fa-check"></i>
                        Activated Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Activate this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_activate_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deactivateModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Deactivate User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_deactivate" style="display:none">
                    <i class="fa fa-check"></i>
                        Deactivated Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to deactive this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_deactivate_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Removed Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Remove this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="restrictModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Restrict User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_restrict" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Restricted  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Restrict this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_restrict_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="liftModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Lift User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_lift" style="display:none">
                    <i class="fa fa-check"></i>
                        Lifted Successfully
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Lift this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_lift_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

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
                            <li><a href="user_accounts">My Organization</a></li>
                            <li class="active">User Accounts</li>
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
                                <strong class="card-title">User Account List</strong>
                                <button class="btn btn-sm btn-success float-right btn-newUser"><i class="fa fa-plus-circle"></i> Add User Account</button>
                            </div>
<!--                             <div class="dataTables_filter">
                                <label style=" display: inline-flex; margin-left: 5px; margin-right: 20px; margin-top: 25px" class="float-right" >Search:<input type="search" class="form-control form-control-sm searchBar" id= "searchBar" placeholder="Search Name" style="margin-left: 7px"></label>
                            </div> -->
                            <div class="card-body">
                                <table id="" class="table table_head" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <th>Email Address</th>
                                            <th>User Role</th>
                                            <th>Field Office</th>
                                            <th>Status</th>
                                            <th>Actions</th>
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
    <script src="assets/js/pisJs/user_accounts.js"></script>
</body>

</html>