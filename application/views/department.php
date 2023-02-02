<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateDeptModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Field Office</h5>
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
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control dep_loc_update select2" >
                                <!-- <option>Select Location</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD" class="form-control dep_name_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="description" class="form-control dep_desc_update form_capitalized"></div>
                    </div>
                    <!-- <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Parent Name</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" class="form-control parent_name_update select2">
                            </select>
                        </div>
                    </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new dept account modal -->
    <div class="modal fade" id="newDeptModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">New Field Office</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully created  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control dep_loc select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD" class="form-control dep_name form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD Field Office" class="form-control dep_desc form_capitalized"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new dept account modal -->

    <div class="modal fade" id="addModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">Add Department</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="alert alert-success" role="alert" id="success_update_parent" style="display:none">
                        <i class="fa fa-check"></i>
                            Successfully Department Added  
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group region_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group field_office_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group desc_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Department</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control parent_name select2">
                            </select>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm_add btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="viewModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">View details</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group region_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group field_office_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group desc_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Department</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group parent_name_view"></label>
                        </div>
                    </div>
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
                            <li><a href="department">My Organization</a></li>
                            <li class="active">Field Office</li>
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
                                <strong class="card-title">Field Office List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newDeptModal"><i class="fa fa-plus-circle"></i> Add Field Office</button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Field Office Name</th>
                                            <th>Description</th>
                                            <th>Region</th>
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

        var __select = function(){
            $('.dep_loc').empty();
            $('.dep_loc_update').empty();

            __executeExternalGet('http://localhost:8088/location/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.dep_loc').append("<option selected disabled> - - Select Region - - </option>");
                    $('.dep_loc_update').append("<option selected disabled> - - Select Region - - </option>");
                    result.forEach(function(data){
                        console.log(data)
                        $('.dep_loc').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.dep_loc_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();
        var __select_parent = function(){
            $('.parent_name').empty();
            $('.parent_name_update').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.parent_name').append("<option selected disabled> - - Select Department - - </option>");
                    $('.parent_name').append("<option value='0'> None </option>");

                    $('.parent_name_update').append("<option selected disabled> - - Select Department - - </option>");
                    $('.parent_name_update').append("<option value='0'> None </option>");
                    result.forEach(function(data){
                        console.log(data)
                        $('.parent_name').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.parent_name_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select_parent();

        $(".btn-confirm").unbind("click").on("click", function(){
            var payload = {
                "createdBy"     : "1",
                "name"          : $(".dep_name").val(),
                "description"   : $(".dep_desc").val(),
                "parentId"      : "0",
                "locationId"    : $(".dep_loc").val()
            }
            // console.log(payload)
            __executeExternalPost('http://localhost:8088/department/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                            $('#newDeptModal').modal('hide');
                            $('success').hide();
                            __table();
                            __select();
                            __select_parent();
                        }, 1000);

                }else{
                    console.log("failed adding new department")
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    result.forEach(function(data){
                        console.log(data)
                        var actions;
                        switch (data.hasChild) {
                        case true:
                            actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDeptModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_add' type='submit' data-toggle='modal' data-target='#addModal' data-id='"+data.id+"'><i class='fa fa-plus-circle'></i> Add</button> <button class='btn btn-sm btn-info btn_view' type='submit' data-toggle='modal' data-target='#viewModal' data-id='"+data.id+"'><i class='fa fa-eye'></i> View</button></td>";
                        default:
                            actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDeptModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_add' type='submit' data-toggle='modal' data-target='#addModal' data-id='"+data.id+"'><i class='fa fa-plus-circle'></i> Add</button> <button class='btn btn-sm btn-info btn_view' type='submit' data-toggle='modal' data-target='#viewModal' data-id='"+data.id+"'><i class='fa fa-eye'></i> View</button></td>";
                            break;
                        };
                        $('.table_body').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.name+"</td>"+
                            "<td>"+data.description+"</td>"+
                            "<td value="+data.locationId+">"+data.locationName+"</td>"+
                            "<td align='center' class='actions' width='35%'> "+actions+" ");
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
                    __executeExternalGet('http://localhost:8088/department/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".dep_name_update").val(result.name);
                            $(".dep_desc_update").val(result.description);
                            $(".dep_loc_update").val(result.locationId).trigger('change');

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked btn update confirm')
                                var payload = {
                                    "updatedBy"     : "1",
                                    "name"          : $(".dep_name_update").val(),
                                    "description"   : $(".dep_desc_update").val(),
                                    "parentId"      : "0",
                                    "locationId"    : $(".dep_loc_update").val()
                                }
                                // console.log(payload);
                                __executeExternalPost('http://localhost:8088/department/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_update').show();
                                            setTimeout(function () {
                                                $('#updateDeptModal').modal('hide');
                                                $('#success_update').hide();
                                                __table();
                                                __select();
                                                __select_parent();
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

                $(".btn_add").unbind("click").on("click", function(){
                    console.log("clicked button update")
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('http://localhost:8088/department/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".region_add").html(result.locationName);
                            $(".field_office_add").html(result.name);
                            $(".desc_add").html(result.description);

                            $(".btn-confirm_add").unbind("click").on("click", function(){
                                console.log('clicked btn update confirm')
                                var payload = {
                                    "updatedBy"     : "1",
                                    "name"          : result.name,
                                    "description"   : result.description,
                                    "parentId"      : $(".parent_name").val(),
                                    "locationId"    : result.locationId
                                };
                                // console.log(payload);
                                __executeExternalPost('http://localhost:8088/department/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_update_parent').show();
                                            setTimeout(function () {
                                                $('#addModal').modal('hide');
                                                $('#success_update_parent').hide();
                                                __table();
                                                __select();
                                                __select_parent();
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
                $(".btn_view").unbind("click").on("click", function(){
                    console.log("clicked button update")
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('http://localhost:8088/department/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".region_view").html(result.locationName);
                            $(".field_office_view").html(result.name);
                            $(".desc_view").html(result.description);
                            if (result.parentId != 0 ) {

                                __executeExternalGet('http://localhost:8088/department/'+result.parentId).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                        $(".parent_name_view").html(result.name);

                                    }else{
                                        alert("failed")
                                    }
                                })
                            } else {
                                $(".parent_name_view").html(" - - no parent added - - ");

                            }

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