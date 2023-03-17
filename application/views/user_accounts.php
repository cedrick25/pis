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
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="John" class="form-control firstName_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="A."class="form-control middleName_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Doe"class="form-control lastName_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Jr."class="form-control suffix_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Username</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="john_doe"class="form-control userName_update"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Email Address</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="john_doe@gmail.com"class="form-control email_update"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control field_office_update select2">
                                
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Roles</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control user_roles_update select2">
                                
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Contact No.</label></div>
                        <div class="col-12 col-md-9"><input type="number" name="text-input" placeholder="09123456789"class="form-control num_update"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthday</label></div>
                        <div class="col-12 col-md-9"><input type="date" class="form-control birthday_update"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Password</label></div>
                        <div class="col-12 col-md-9"><input type="password" name="" placeholder="*********" class="form-control password_update"></div>
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
                    <h5 class="modal-title" id="mediumModalLabel">New User Accounts</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Created  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A."class="form-control middleName form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe"class="form-control lastName form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr."class="form-control suffix form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Username</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g john_doe"class="form-control username"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Email Address</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g john_doe@gmail.com"class="form-control email"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control field_office select2">
                                
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Roles</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control user_roles select2">
                                
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Contact No.</label></div>
                        <div class="col-12 col-md-9"><input type="number" name="text-input" placeholder="e.g 09123456789"class="form-control num"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthday</label></div>
                        <div class="col-12 col-md-9"><input type="date" class="form-control birthday"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Password</label></div>
                        <div class="col-12 col-md-9"><input type="password" name="" placeholder="*********" class="form-control password password2"></div>
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
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newUserModal"><i class="fa fa-plus-circle"></i> Add User Account</button>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <th>Email Address</th>
                                            <th>Created By</th>
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

    <script type="text/javascript">
    ( function ( $ ) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalPost = function(path, jsonObj, customLoader) {
            path = __getContext() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                headers: {
                    // 'Content-Type': 'multipart/form-data;'
                    'Content-Type':'application/json'
                },
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };
        var __executeExternalGet = function(path, customLoader) {
            // path = $.wms.getContextPath() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "GET",
                url: path,
                dataType: "json",
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };

        var __select = function(){
            $('.field_office').empty();
            $('.field_office_update').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.field_office_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();

        var __select_user_roles = function(){
            $('.user_roles').empty();
            $('.user_roles_update').empty();

            __executeExternalGet('http://localhost:8088/role/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.user_roles').append("<option selected disabled> - - Select User Roles - - </option>");
                    $('.user_roles_update').append("<option selected disabled> - - Select User Roles - - </option>");
                    result.forEach(function(data){
                        $('.user_roles').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.user_roles_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select_user_roles();

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')
            var payload = {
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "firstName"     : $(".firstName").val(),
                    "middleName"    : $(".middleName").val(),
                    "lastName"      : $(".lastName").val(),
                    "suffix"        : $(".suffix").val(),
                    "corpKey"       : "",
                    "username"      : $(".username").val(),
                    "email"         : $(".email").val(),
                    "phoneNumber"   : $(".num").val(),
                    "birthday"      : $(".birthday").val(),
                    "password"      : $(".password").val(),
                    "departmentId"  : $(".field_office").val(),
                    "roleId"        : $(".user_roles").val(),
                }
            console.log(payload);
            __executeExternalPost('http://localhost:8088/user/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#newUserModal').modal('hide');
                        $('#success').hide();
                            // __table();
                                                
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                    }, 1000);
                }else{
                //     console.log(result.status);
                //     alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/user?page=0&size=50').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {

                    result.content.forEach(function(data){
                        var status;
                        let actions;
                        switch (data.accountStatus) {
                        case "ACTIVE":
                                switch (data.isLocked) {
                                case true:
                                    status = "RESTRICTED"
                                    actions = "<button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                                    break;
                                case false:
                                    status = "ACTIVE"
                                    actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                    break;
                                default:
                                    status = "ACTIVE"
                                    actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                    break;
                                };
                            break;
                        case "INACTIVE":
                            status = "INACTIVE"
                            actions = "<button class='btn btn-sm btn-success btn_activate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button>";
                            break;
                        case "REMOVED":
                            status = "REMOVED"
                            actions = "";
                            break;
                        default:
                            status = "ACTIVE"
                            actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                            break;
                        };
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix+"</td>"+
                            "<td>"+data.username+"</td>"+
                            "<td>"+data.email+"</td>"+
                            "<td>"+data.createdBy+"</td>"+
                            "<td>"+status+"</td>"+
                            "<td align='center' class='actions'> "+actions+"")
                    });
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "30%", "targets": 6 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_update").unbind("click").on("click", function(){
                        var data_id = $(this).data("id");
                        console.log(data_id)
                        __executeExternalGet('http://localhost:8088/user/'+data_id).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                                $(".firstName_update").val(result.firstName);
                                $(".middleName_update").val(result.middleName);
                                $(".lastName_update").val(result.lastName);
                                $(".suffix_update").val(result.suffix);
                                $(".userName_update").val(result.username);
                                $(".email_update").val(result.email);
                                $(".num_update").val(result.phoneNumber);
                                $(".birthday_update").val(result.birthday);
                                $(".password_update").val(result.password);
                                setTimeout(function() {
                                    $(".field_office_update").val(result.departmentId).trigger('change');
                                    $(".user_roles_update").val(result.roleId).trigger('change');
                                },1500);
                                console.log(result.departmentId);

                                $(".btn_confirm_update").unbind("click").on("click", function(){
                                    console.log('clicked')
                                    var payload = {
                                        "firstName"     : $(".firstName_update").val(),
                                        "middleName"    : $(".middleName_update").val(),
                                        "lastName"      : $(".lastName_update").val(),
                                        "suffix"        : $(".suffix_update").val(),
                                        "corpKey"       : "",
                                        "username"      : $(".userName_update").val(),
                                        "email"         : $(".email_update").val(),
                                        "phoneNumber"   : $(".num_update").val(),
                                        "birthday"      : $(".birthday_update").val(),
                                        "password"      : $(".password_update").val(),
                                        "departmentId"  : $(".field_office_update").val(),
                                        "roleId"        : $(".user_roles_update").val(),
                                    }

                                    __executeExternalPost('http://localhost:8088/user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                        console.log(result);
                                        if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_update').show();
                                            setTimeout(function () {
                                                $('#updateUserModal').modal('hide');
                                                $('#success_update').hide();
                                                // __table();

                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                        }else{
                                            alert("failed")
                                        }
                                    })
                                })

                            }else{
                                alert("failed")
                            }
                        })
                    })
                    $(".btn_activate").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");

                        $(".btn_activate_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8088/user/active/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_activated').show();
                                            setTimeout(function () {
                                                $('#activateModal').modal('hide');
                                                $('#success_activated').hide();
                                                // __table();
                                                
                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#activateModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })

                        })
                    })
                    $(".btn_deact").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");

                        $(".btn_deactivate_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8088/user/inactive/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_deactivate').show();
                                            setTimeout(function () {
                                                $('#deactivateModal').modal('hide');
                                                $('#success_deactivate').hide();
                                                // __table();
                                                
                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                    // $(".form-control").val('');
                                    // $('#deactivateModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })

                        })
                    })
                    $(".btn_restrict").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");

                        $(".btn_restrict_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8088/user/restrict/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_restrict').show();
                                            setTimeout(function () {
                                                $('#restrictModal').modal('hide');
                                                $('#success_restrict').hide();
                                                // __table();

                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#restrictModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })

                        })
                    })
                    $(".btn_remove").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");

                        $(".btn_remove_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8088/user/remove/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_remove').show();
                                            setTimeout(function () {
                                                $('#removeModal').modal('hide');
                                                $('#success_remove').hide();
                                                // __table();
                                                
                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#removeModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })
                        })
                    })
                    $(".btn_lift").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");
                        console.log(data_id)
                        $(".btn_lift_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8088/user/lift/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_lift').show();
                                            setTimeout(function () {
                                                $('#liftModal').modal('hide');
                                                $('#success_lift').hide();
                                                // __table();
                                                
                                                setTimeout(function () {
                                                    window.location.reload(true);
                                                }, 500);
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#liftModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })

                        })
                    })
                }

            })
        }
        __table();

    } )( jQuery );
    </script>

</body>

</html>