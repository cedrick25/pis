<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="completeModal_inv" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_inv" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_inv btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_sup" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_sup" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_sup"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_sup btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_cinv" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_cinv" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_cinv"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_cinv btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_csup" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_csup" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_csup"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_csup btn-sm">Confirm</button>
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
                            <li><a href="received">Docket Routing</a></li>
                            <li class="active">Received</li>
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
                                <strong class="card-title">Received List</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" data-toggle="tab" href="#inv" role="tab" aria-controls="investigation" aria-selected="true">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" data-toggle="tab" href="#sup" role="tab" aria-controls="supervision" aria-selected="false">Supervision</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="cinv_tab" data-toggle="tab" href="#cinv" role="tab" aria-controls="single_carpeta" aria-selected="false">Courtesy Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="cinv_tab" data-toggle="tab" href="#csup" role="tab" aria-controls="single_carpeta" aria-selected="false">Courtesy Supervision</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_inv">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_inv">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="sup" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Supervision</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_sup">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_sup">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="cinv" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Courtesy Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_cinv">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_cinv">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="csup" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Courtesy Supervision</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_csup">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_csup">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
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

        var __table_inv = function(){
            $('.table_head_inv').DataTable().destroy();
            $('.table_body_inv').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_INV').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            console.log(result)
                            var fo = result.name;
                            
                            // console.log(field_id)
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            console.log(result)
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            console.log(field)
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_inv pr_inv_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_inv pr_inv_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_inv pr_inv_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_inv pr_inv_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_inv'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_inv').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_inv tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_inv').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_inv").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_inv").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"          : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_inv').show();
                                                setTimeout(function () {
                                                    $('#completeModal_inv').modal('hide');
                                                    $('#complete_success_inv').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        // console.log(fi)
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_inv();

        var __table_cinv = function(){
            $('.table_head_cinv').DataTable().destroy();
            $('.table_body_cinv').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_CINV').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_cinv pr_cinv_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_cinv pr_cinv_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_cinv pr_cinv_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_cinv pr_cinv_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_cinv'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_cinv').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_cinv tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_cinv').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_cinv").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_cinv").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"         : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_cinv').show();
                                                setTimeout(function () {
                                                    $('#completeModal_cinv').modal('hide');
                                                    $('#complete_success_cinv').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_cinv();

        var __table_sup = function(){
            $('.table_head_sup').DataTable().destroy();
            $('.table_body_sup').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_SUP').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_sup pr_sup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_sup pr_sup_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_sup pr_sup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_sup pr_sup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_sup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_sup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_sup tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_sup').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_sup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_sup").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"         : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_sup').show();
                                                setTimeout(function () {
                                                    $('#completeModal_sup').modal('hide');
                                                    $('#complete_success_sup').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id+'&type='+type;
                    })
                    $(".btn_forward_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_sup();

        var __table_csup = function(){
            $('.table_head_csup').DataTable().destroy();
            $('.table_body_csup').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_CSUP').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_csup pr_csup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_csup pr_csup_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_csup pr_csup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_csup pr_csup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_csup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_csup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_csup tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_csup').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_csup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_csup").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"          : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_csup').show();
                                                setTimeout(function () {
                                                    $('#completeModal_csup').modal('hide');
                                                    $('#complete_success_csup').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_csup();


    } )( jQuery );
    </script>

</body>

</html>