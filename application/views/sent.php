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
                    <h5 class="modal-title" id="mediumModalLabel">Update Sent</h5>
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
                            <select class="form-control field_office_update">
                                
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
                    <h5 class="modal-title" id="mediumModalLabel">New Sent</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
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
                            <select class="form-control field_office">
                                
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

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Sent</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">Forwarding Docket</a></li>
                            <li class="active">Sent</li>
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
                                <strong class="card-title">Sent List</strong>
                                <!-- <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newUserModal"><i class="fa fa-plus-circle"></i> Add User Account</button> -->
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Docket No.</th>
                                            <th>Field Office</th>
                                            <th>Details</th>
                                            <th>Remarks</th>
                                            <th>Caseload Type</th>
                                            <th>Receiver</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                        <tr>
                                            <td>1</td>
                                            <td>JPI202400001</td>
                                            <td>Central Office</td>
                                            <td>test</td>
                                            <td>testing</td>
                                            <td>caseload type sample</td>
                                            <td>User 1</td>
                                            <td>Pending</td>
                                            <td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button></td>
                                        </tr>
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
                console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        console.log(data)
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

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8000/docketbook/list/inv').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.response.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.docketNumber+"</td>"+
                            "<td>"+data.fieldOfficeId+"</td>"+
                            "<td>"+data.status+"</td>"+
                            "<td>"+data.remarks+"</td>"+
                            "<td>"+data.type+"</td>"+
                            "<td>"+data.createdBy+"</td>"+
                            "<td>"+data.status+"</td>"+
                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button>")
                    });
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "30%", "targets": 9 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });
                    $(".btn_update").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/investigation_docket_update?docket_number='+docket_number;
                    })
                }
            })
        }
        __table();

    } )( jQuery );
    </script>

</body>

</html>