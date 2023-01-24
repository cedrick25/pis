<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php');?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updatePermissionModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="permission_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permission Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control permission_name_update form_capitalized"></div>
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="description" class="form-control permission_desc_update form_capitalized"></div>
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


    <!-- new permission modal -->
    <div class="modal fade" id="newPermission" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">


                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Select Parent</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control permission_add select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permission Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g User Accounts" class="form-control permission_name"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">API</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control type_add select2">
                                <option value="0" selected disabled> - - Select Type - - </option>
                                <option value="API">API</option>
                                <option value="VIEW">VIEW</option>
                                <option value="ACTION">ACTION</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Detail</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g api - user_accounts/list, page - /user_account, action - add" class="form-control permission_desc"></div>
                    </div>
                </div>


                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new permission modal -->


    <!-- new grant permission modal -->

    <!-- new grant permission modal -->


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
                            <li><a href="permission">My Organization</a></li>
                            <li class="active">Permission</li>
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
                                <strong class="card-title">Permission List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newPermission"><i class="fa fa-plus-circle"></i> Add Permission </button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Permission Name</th>
                                            <th>Type</th>
                                            <th>Detail</th>
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

        // var __select = function(){
        //     $('.permission_desc').empty();
        //     $('.permission_desc_update').empty();

        //     __executeExternalGet('http://localhost:8088/location/list').done(function (result) {
        //         // console.log(result)
        //         if (result.status != "ERROR") {
        //             $('.dep_loc').append("<option selected disabled> - - Select Location - - </option>");
        //             $('.dep_loc_update').append("<option selected disabled> - - Select Location - - </option>");
        //             result.forEach(function(data){
        //                 console.log(data)
        //                 $('.dep_loc').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");
        //                 $('.dep_loc_update').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");

        //                 // $(".dep_loc").append($('<option>', {
        //                 //     value: data.id,
        //                 //     text: data.name,
        //                 // }));
        //             });
        //         } else {
        //             console.log("failed fetching department list")
        //         }
        //     })
        // }
        // __select();

        var __select = function(){
            $('.permission_add').empty();

            __executeExternalGet('http://localhost:8088/permission/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.permission_add').append("<option selected value='0'> - - None - - </option>");
                    result.forEach(function(data){
                        console.log(data)
                        $('.permission_add').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();



        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')
            var payload = {
                  "name"       : $(".permission_name").val(),
                  "type"       : $(".type_add").val(),
                  "detail"     : $(".permission_desc").val(),
                  "parentId"   : $(".permission_add").val()
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8088/permission/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#permission_success').show();

                        setTimeout(function () {
                            $('#newPermissionModal').modal('hide');
                            $('#permission_success').hide();
                            __table();
                            __select();
                        }, 1000);


                    setTimeout(function () {
                        $('#newPermission').modal('hide');
                        $('#permission_success').hide();
                        __table();
                        __select();
                    }, 1000);

                }else{
                    console.log("failed adding new permission")
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/permission/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    result.forEach(function(data){
                        console.log(data)
                        $('.table_body').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.name+"</td>"+
                            "<td>"+data.type+"</td>"+
                            "<td>"+data.detail+"</td>"+

                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updatePermissionModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button>");
                    });
                } else {
                    console.log("failed fetching department list")
                }
                
                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                        // "columnDefs": [
                            // { "width": "30%", "targets": 6 }
                        // ]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_update").unbind("click").on("click", function(){
                    console.log("clicked button update")
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('http://localhost:8088/permission/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".permission_name_update").val(result.name);
                            $(".permission_desc_update").val(result.detail);
                            // $(".dep_loc_update").val(result.locationId);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked btn update confirm')
                                var payload = {
                                    "name"          : $(".permission_name_update").val(),
                                    "detail"        : $(".permission_desc_update").val(),
                                    "parentId"      : "0",
                                }
                                console.log(payload);
                                __executeExternalPost('http://localhost:8088/permission/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#permission_update').show();
                                            setTimeout(function () {
                                                $('#updateDeptModal').modal('hide');
                                                $('#permission_update').hide();
                                                __table();
                                                __select();
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
            })
        }
        __table();

    } )( jQuery );
    </script>

</body>

</html>