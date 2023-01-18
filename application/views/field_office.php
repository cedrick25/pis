<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
<!--     <div class="modal fade" id="forwardDocket" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Forward Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Forward  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                        <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label">PIS-00000-0001</label></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload Type</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control caseload_supervision select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="uploadFile" class=" form-control-label">Upload a File</label></div>
                        <div class="col-12 col-md-9"><input type="file" class="form-control-file" id="uploadFile"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div> -->
    <!-- Update modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateOfficemodal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Field Office Update</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="success">
                    
                </div>
                    <div class="modal-body col-md-12">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control field_office_update form_capitalized"></div>
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Region</label></div>
                            <div class="col-12 col-md-9">
                                <select name="select" class="form-control region_update select2" >
                                    <option>Select Location</option>
                                    <option>NCR</option>
                                </select>
                            </div>
                        </div>      
                    </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new Docket modal -->
    <div class="modal fade" id="newOfficemodal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
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
                        Successfully Added  
                </div>
                <div class="modal-body col-md-12">
                    <div class="modal-body col-md-12">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control field_office form_capitalized"></div>
                        </div>
                        <div class="row form-group col-md-12">      
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Region</label></div>
                            <div class="col-12 col-md-9">
                                <select name="select" class="form-control region select2" >
                                    <option>Select Location</option>
                                    <option>NCR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new Docket modal -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Field Office</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">My Organization</a></li>
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
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newOfficemodal"><i class="fa fa-plus-circle"></i> Add Field Office</button>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Field Office</th>
                                            <th>Region</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
<!--                                        <th>Criminal Case No.</th>
                                            <th>Status</th>
                                            <th>Actions</th>
 -->                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                        <tr>
                                            <td>1</td>
                                            <td>Central Office</td>
                                            <td>NCR</td>
                                            <td>01/01/2023</td>
                                            <td class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateOfficemodal'><i class='fa fa-refresh'></i> Update</button>
                                            </td>
<!--                                        <td>Test Case</td> 
                                            <td>Criminal case test</td>
                                            <td>inbox</td>
                                            <td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDocketing'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_forward' type='submit' data-toggle='modal' data-target='#forwardDocket'><i class='fa fa-forward'></i> Forwarding</button>
                                            </td> -->
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

<!--     <script type="text/javascript">
    ( function ( $ ) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
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

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                    "field_office"     : $(".field_office").val(),
                    "region"           : $(".region").val(),
                }
            // console.log(payload);

            __executeExternalPost('http://localhost:8088/region/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                $(".form-control").val('');
                    setTimeout(function () {
                        $('#success').html('<div class="alert alert-success" role="alert" style="display:none"> <i class="fa fa-check"></i> Successfully Updated</div>');
                        $('#newOfficemodal').modal('hide');
                        __table();
                    }, 1000);
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/user?page=0&size=50').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")

                result.content.forEach(function(data){

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
                    __executeExternalGet('http://localhost:8088/region/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".field_office_update").val(result.field_office);
                            $(".region_update").val(result.region);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                    "field_office_update"     : $(".field_office_update").val(),
                                    "region_update"           : $(".region_update").val(),
                                }
                                // console.log(payload)

                                __executeExternalPost('http://localhost:8088/region/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                        setTimeout(function () {
                                            $('#success_update').html('<div class="alert alert-success" role="alert" style="display:none"> <i class="fa fa-check"></i> Successfully Updated</div>');
                                            $('#updateUserModal').modal('hide');
                                            __table();
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

    })( jQuery );
    </script>
 -->
</body>

</html>