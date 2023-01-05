<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateDeptModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Location</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Location</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="LOCATION" class="form-control a_update"></div>
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

    <!-- new Location modal -->
    <div class="modal fade" id="newLocationModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New Location</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Location</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="DEPARTMENT" class="form-control a"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new User account modal -->

    <div class="modal fade" id="deactivateModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Deactivate User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to deactive this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->
    <div class="modal fade" id="acceptModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Accept User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to accept this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_accept_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Locations</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">My Organization</a></li>
                            <li class="active">Locations</li>
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
                                <strong class="card-title">Locations</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newDeptModal"><i class="fa fa-plus-circle"></i> Add Location</button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Location</th>
                                            <th>Action</th>
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


        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               first_name       : $(".a").val(),
               middle_name      : $(".b").val(),
               last_name        : $(".c").val(),
               suffix_name      : $(".d").val(),
               username         : $(".e").val(),
               email            : $(".f").val(),
               user_type_id     : $(".g").val(),
               contact_no       : $(".h").val(),
               gender           : $(".i").val(),
               birthdate        : $(".j").val(),
               civil_status     : $(".k").val(),
               voter_status     : $(".l").val(),
               occupation       : $(".m").val(),
               street           : $(".n").val(),
               barangay         : $(".o").val(),
               city             : $(".p").val(),
               province         : $(".q").val(),
               password         : $(".r").val(),
               retype_password  : $(".s").val(),
               status           : $(".t").val(),
            }
            __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#newUserModal').modal('hide');
                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Add",
                       action_details   : "Add User Accounts module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __table();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/location?page=0&size=50&name=cmrd').done(function (result) {
                console.log(result)

                result.content.forEach(function(data){
                    var status;
                    let actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDeptModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button>";

                    $('.table_body').append("<tr>"+
                        "<td>"+data.id+"</td>"+
                        "<td>"+data.name+"</td>"+  
                        "<td align='center' class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                        "columnDefs": [
                            { "width": "30%", "targets": 6 }
                        ]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_update").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    var payload = {
                       METHOD      : "fetch_by_id",
                       resident_id  : data_id,
                    }
                    __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status == "SUCCESS") {
                            console.log(result.status);
                           $(".a_update").val(result.payload.first_name);
                           $(".b_update").val(result.payload.middle_name);
                           $(".c_update").val(result.payload.last_name);
                           $(".d_update").val(result.payload.suffix_name);
                           $(".e_update").val(result.payload.username);
                           $(".f_update").val(result.payload.email);
                           $(".g_update").val(result.payload.user_type_id);
                           $(".h_update").val(result.payload.contact_no);
                           $(".i_update").val(result.payload.gender);
                           $(".j_update").val(result.payload.birthdate);
                           $(".k_update").val(result.payload.civil_status);
                           $(".l_update").val(result.payload.voter_status);
                           $(".m_update").val(result.payload.occupation);
                           $(".n_update").val(result.payload.street);
                           $(".o_update").val(result.payload.barangay);
                           $(".p_update").val(result.payload.city);
                           $(".q_update").val(result.payload.province);
                           // $(".r_update").val(result.payload.password);
                           // $(".s_update").val(result.payload.retype_password);
                           $(".t_update").val(result.payload.status);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                   METHOD       : "update",
                                   resident_id   : data_id,
                                   first_name  : $(".a_update").val(),
                                   middle_name    : $(".b_update").val(),
                                   last_name      : $(".c_update").val(),
                                   suffix_name     : $(".d_update").val(),
                                   username  : $(".e_update").val(),
                                   email  : $(".f_update").val(),
                                   user_type_id  : $(".g_update").val(),
                                   contact_no    : $(".h_update").val(),
                                   gender      : $(".i_update").val(),
                                   birthdate     : $(".j_update").val(),
                                   civil_status  : $(".k_update").val(),
                                   voter_status  : $(".l_update").val(),
                                   occupation  : $(".m_update").val(),
                                   street    : $(".n_update").val(),
                                   barangay      : $(".o_update").val(),
                                   city     : $(".p_update").val(),
                                   province  : $(".q_update").val(),
                                   password  : $(".r_update").val(),
                                   retype_password  : $(".s_update").val(),
                                   status    : $(".t_update").val(),
                                }
                                __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status == "SUCCESS") {
                                        console.log(result.status);
                                        $(".form-control").val('');
                                        alert(result.message)
                                        $('#updateUserModal').modal('hide');

                                        var payload_audit = {
                                           METHOD : "insert",
                                           resident_id      :  $.cookie("resident_id"),
                                           action_performed : "Update",
                                           action_details   : "Update Account module"
                                        }
                                        __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                                        })
                                        __table();
                                    }else{
                                        console.log(result.status);
                                        alert(result.message)
                                    }
                                })
                            })

                        }else{
                            console.log(result.status);
                            alert(result.message)
                        }
                    })
                })

                $(".btn_accept").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    $(".btn_accept_confirm").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                           METHOD  : "update_status",
                           resident_id   : data_id,
                           status  : "1",
                        }
                        __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status == "SUCCESS") {
                                console.log(result.status);
                                $(".form-control").val('');
                                alert(result.message)
                                $('#acceptModal').modal('hide');
                                var payload_audit = {
                                   METHOD : "insert",
                                   resident_id      :  $.cookie("resident_id"),
                                   action_performed : "Accept",
                                   action_details   : "Accept Account module"
                                }
                                __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                                })
                                __table();
                            }else{
                                console.log(result.status);
                                alert(result.message)
                            }
                        })

                    })
                })

                $(".btn_archive").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    $(".btn_archive_confirm").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                           METHOD  : "update",
                           blotter_id   : data_id,
                           status  : "2",
                        }
                        __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status == "SUCCESS") {
                                console.log(result.status);
                                $(".form-control").val('');
                                alert(result.message)
                                $('#archiveModal').modal('hide');
                                __table();
                            }else{
                                console.log(result.status);
                                alert(result.message)
                            }
                        })

                    })
                })
            })
        }
        __table();


    } )( jQuery );
    </script>

</body>

</html>