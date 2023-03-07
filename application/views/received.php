<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="completeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success" style="display:none">
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
                    <button type="button" class="btn btn-primary btn_complete_confirm btn-sm">Confirm</button>
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
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head">
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
                                                <tbody class="table_body">
                                                    
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

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_INV').done(function (result) {
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
                                actions = " <button class='btn btn-sm btn-primary btn_upload pb_inv_upload type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return pb_inv_return type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward pb_inv_forward type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete pb_inv_complete type='submit' data-toggle='modal' data-target='#completeModal'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body').append("<tr>"+
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
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "40%", "targets": 6 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                    "type"                  : result.type,
                                    "caseload_type"         : result.caseloadType,
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
                                            $('#complete_success').show();
                                                setTimeout(function () {
                                                    $('#completeModal').modal('hide');
                                                    $('#complete_success').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })
                    $(".btn_return").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload").unbind("click").on("click", function(){
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
        __table();

        var __table_sup = function(){
            $('.table_head_sup').DataTable().destroy();
            $('.table_body_sup').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_SUP').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
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
                                actions = " <button class='btn btn-sm btn-primary btn_upload_sup pb_sup_upload type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_sup pb_sup_return type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_sup pb_sup_forward type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_sup pb_sup_complete type='submit' data-toggle='modal' data-target='#completeModal_sup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_sup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions' width='40%'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_sup tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table_sup = $('.table_head_sup').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                // { "width": "30%", "targets": 6 }
                            ]
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
                                console.log('clicked sup')

                                var payload = {
                                    "type"                  : result.type,
                                    "caseload_type"         : result.caseloadType,
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
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_sup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_sup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var docket_number = $(this).data("docket");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        
        // $(".sup_tab").unbind("click").on("click", function(){
            __table_sup();
        // })

    } )( jQuery );
    </script>

</body>

</html>