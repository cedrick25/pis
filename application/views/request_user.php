<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->
    <div class="modal fade" id="donePrint" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Change Status</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <p>
                            Are you sure it's done? 
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_accept_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="permitModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Request Permit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks:</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="text-input" name="text-input" placeholder="remarks sample" class="form-control remarkspermit">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_permit_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="clearanceModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Request Clearance</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks:</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="text-input" name="text-input" placeholder="remarks sample" class="form-control remarksclearance">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_clearance_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="indigencyModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Request Indigency</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks:</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="text-input" name="text-input" placeholder="remarks sample" class="form-control remarksindigency">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_indigency_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="residencyModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Request Residency</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks:</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="text-input" name="text-input" placeholder="remarks sample" class="form-control remarksresidency">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_residency_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Request</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Request</li>
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
                                <strong class="card-title">Request</strong>
                                <button style="margin-right: 2px;" class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#clearanceModal"><i class="fa fa-plus-circle"></i> Clearance</button>
                                <button style="margin-right: 2px;" class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#indigencyModal"><i class="fa fa-plus-circle"></i> Indigency</button>
                                <button style="margin-right: 2px;" class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#residencyModal"><i class="fa fa-plus-circle"></i> Residency</button>
                                <button style="margin-right: 2px;" class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#permitModal"><i class="fa fa-plus-circle"></i> Permit</button>
                            </div>
                            <div class="card-body">
                                <table id="request_table" class="request_table table table-striped table-bordered request_table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Fullname</th>
                                            <th>Type</th>
                                            <th>Remarks</th>
                                            <th>Date Requested</th>
                                            <th>Status</th>
                                            <!-- <th>Actions</th> -->
                                        </tr>
                                    </thead>
                                    <tbody class="request_table_body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Resident</strong>
                            </div>
                            <div class="card-body">
                                <table id="resident_table" class="resident_table table table-striped table-bordered resident_table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Fullname</th>
                                            <th>Address</th>
                                            <th>Voter Status</th>
                                            <th>Civil Status</th>
                                            <th>Occupation</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body_resident">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> -->

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

        var __request = function(){
            $('.request_table').DataTable().destroy();
            $('.request_table_body').empty();

            var payload = {
                METHOD : "fetch_by_rid",
                resident_id  : $.cookie("resident_id"),
            }
            __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                result.payload.forEach(function(data){
                    let status;
                    let actions;
                    switch (data.status) {
                    case "1":
                        status = "Pending";
                        switch (data.type) {
                        case "Brgy Indigency":
                            actions = "<a href='brgy_indigency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Indigency</button></a>"+ " <button class='btn btn-sm btn-success btn_accept' type='submit' data-toggle='modal' data-target='#donePrint' data-id='"+data.request_id+"'><i class='fa fa-check-circle'></i> Done</button>"+" <button class='btn btn-sm btn-danger btn_delete' type='submit' data-toggle='modal' data-target='#deleteModal' data-id='"+data.request_id+"><i class='fa fa-trash'></i> Delete</button>";
                            break;
                        case "Brgy Residency":
                            actions = "<a href='brgy_residency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Residency</button></a>"+ " <button class='btn btn-sm btn-success btn_accept' type='submit' data-toggle='modal' data-target='#donePrint' data-id='"+data.request_id+"'><i class='fa fa-check-circle'></i> Done</button>"+" <button class='btn btn-sm btn-danger btn_delete' type='submit' data-toggle='modal' data-target='#deleteModal' data-id='"+data.request_id+"><i class='fa fa-trash'></i> Delete</button>";
                            break;
                        case "Brgy Permit":
                            actions = "<a href='brgy_business_permit?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Permit</button></a>"+ " <button class='btn btn-sm btn-success btn_accept' type='submit' data-toggle='modal' data-target='#donePrint' data-id='"+data.request_id+"'><i class='fa fa-check-circle'></i> Done</button>"+" <button class='btn btn-sm btn-danger btn_delete' type='submit' data-toggle='modal' data-target='#deleteModal' data-id='"+data.request_id+"><i class='fa fa-trash'></i> Delete</button>";
                            break;
                        case "Brgy Clearance":
                            actions = "<a href='brgy_clearance?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Clearance</button></a>"+ " <button class='btn btn-sm btn-success btn_accept' type='submit' data-toggle='modal' data-target='#donePrint' data-id='"+data.request_id+"'><i class='fa fa-check-circle'></i> Done</button>"+" <button class='btn btn-sm btn-danger btn_delete' type='submit' data-toggle='modal' data-target='#deleteModal' data-id='"+data.request_id+"><i class='fa fa-trash'></i> Delete</button>";
                            break;
                        };
                        break;
                    case "2":
                        status = "Done";
                        switch (data.type) {
                        case "Brgy Indigency":
                            actions = "<a href='brgy_indigency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Indigency</button></a>";
                            break;
                        case "Brgy Residency":
                            actions = "<a href='brgy_residency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Residency</button></a>";
                            break;
                        case "Brgy Permit":
                            actions = "<a href='brgy_business_permit?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Permit</button></a>";
                            break;
                        case "Brgy Clearance":
                            actions = "<a href='brgy_clearance?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Clearance</button></a>";
                            break;
                        };
                        break;
                    case "3":
                        status = "Deleted";
                        actions = "Deleted";
                        break;
                    default:
                        status = "";
                        break;
                    };

                    $('.request_table_body').append("<tr>"+
                        "<td>"+data.request_id+"</td>"+
                        "<td>"+data.first_name+" "+data.middle_name+" "+data.last_name+" "+data.suffix_name+"</td>"+
                        "<td>"+data.type+"</td>"+
                        "<td>"+data.remarks+"</td>"+
                        "<td>"+data.date_requested+"</td>"+
                        "<td>"+status+"</td>")
                        // "<td align='center' class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    var table = $('.request_table').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "20%", "targets": 5 }
                        ]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_accept").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    $(".btn_accept_confirm").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                           METHOD  : "update",
                           request_id   : data_id,
                           status  : "2",
                        }
                        __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status == "SUCCESS") {
                                console.log(result.status);
                                $(".form-control").val('');
                                alert(result.message)
                                $('#donePrint').modal('hide');
                                __request();
                            }else{
                                console.log(result.status);
                                alert(result.message)
                            }
                        })

                    })
                })
            })
        }
        __request();


        $(".btn_permit_confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               resident_id      : $.cookie("resident_id"),
               type             : "Brgy Permit",
               remarks          : $(".remarkspermit").val(),
            }
            __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#permitModal').modal('hide');
                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Request",
                       action_details   : "Request Permit module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __request();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })
        $(".btn_clearance_confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               resident_id      : $.cookie("resident_id"),
               type             : "Brgy Clearance",
               remarks          : $(".remarksclearance").val(),
            }
            __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#clearanceModal').modal('hide');
                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Request",
                       action_details   : "Request Clearance module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __request();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })
        $(".btn_indigency_confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               resident_id      : $.cookie("resident_id"),
               type             : "Brgy Indigency",
               remarks          : $(".remarksindigency").val(),
            }
            __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#indigencyModal').modal('hide');
                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Request",
                       action_details   : "Request Indigency module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __request();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })
        $(".btn_residency_confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               resident_id      : $.cookie("resident_id"),
               type             : "Brgy Residency",
               remarks          : $(".remarksresidency").val(),
            }
            __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#residencyModal').modal('hide');
                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Request",
                       action_details   : "Request Residency module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __request();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

    } )( jQuery );
    </script>
</body>

</html>
