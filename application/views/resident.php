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
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Delete Request</h5>
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
                                <input type="text" id="text-input" name="text-input" placeholder="already submitted" class="form-control remarks">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_delete_confirm">Confirm</button>
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
                        <h1>Resident & Request</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Resident & Request</li>
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
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="request_table_body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
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

        var __request = function(){
            $('.request_table').DataTable().destroy();
            $('.request_table_body').empty();

            var payload = {
               METHOD : "fetch_all",
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
                        "<td>"+status+"</td>"+
                        "<td align='center' class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    var table = $('.request_table').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "20%", "targets": 6 }
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

                $(".btn_delete").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    $(".btn_delete_confirm").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                           METHOD  : "update",
                           request_id   : data_id,
                           remarks   : $(".remarks").val(),
                           status  : "3",
                        }
                        __executeExternalPost('/bms_api/bms/request',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status == "SUCCESS") {
                                console.log(result.status);
                                $(".form-control").val('');
                                alert(result.message)
                                $('#deleteModal').modal('hide');
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
        var __table = function(){
            $('.resident_table').DataTable().destroy();
            $('.table_body_resident').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                result.payload.forEach(function(data){
                    let civil_status;
                    switch (data.civil_status) {
                    case "1":
                        civil_status = "Single";
                        console.log(civil_status)
                        break;
                    case "2":
                        civil_status = "Married";
                        console.log(civil_status)
                        break;
                    case "3":
                        civil_status = "Widowed";
                        console.log(civil_status)
                        break;
                    case "4":
                        civil_status = "Seperated";
                        console.log(civil_status)
                        break;
                    case "5":
                        civil_status = "Not Indicated";
                        console.log(civil_status)
                        break;
                    default:
                        civil_status = "";
                        break;
                    };

                    voter_status = ((data.voter_status==1) ? "Yes" : 'No');
                    // civil_status = ((data.civil_status==1) ? "Single" : 'Married');

                    $('.table_body_resident').append("<tr>"+
                        "<td>"+data.resident_id+"</td>"+
                        "<td>"+data.first_name+" "+data.middle_name+" "+data.last_name+" "+data.suffix_name+"</td>"+
                        "<td>"+data.street+" Brgy."+data.barangay+" "+data.city+" "+data.province+"</td>"+
                        "<td>"+voter_status+"</td>"+
                        "<td>"+civil_status+"</td>"+
                        "<td>"+data.occupation+"</td>"+
                        "<td align='center' class='actions'> <a href='brgy_clearance?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Clearance</button></a>"+ " <a href='brgy_indigency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Indigency</button></a>"+" <a href='brgy_residency?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Residency</button></a>"+" <a href='brgy_business_permit?resident="+data.resident_id+"' target='_blank'><button class='btn btn-sm btn-primary' type='submit'><i class='fa fa-print'></i> Permit</button></a>")
                });
                $(document).ready(function () {
                    var table = $('.resident_table').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "30%", "targets": 6 }
                        ],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });
            })
        }
        __table();


    } )( jQuery );
    </script>
</body>

</html>
