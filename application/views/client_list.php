<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Docket</h5>
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
                        Are you sure you want to remove this Docket: <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
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
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list">Fact Sheet</a></li>
                            <li class="active">Fact Sheet Dashboard</li>
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
                            <div class="card-header" id="pager">
                                <strong class="card-title">Fact Sheet</strong>
                                <a href="new_client"> <button class="btn btn-sm btn-success float-right client_add"
                                style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button> </a>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="client_pb" data-toggle="tab" href="#pb" role="tab" aria-controls="investigation" aria-selected="true">Probationer</a>
                                    </li>
<!--                                     <li class="nav-item">
                                        <a class="nav-link" id="client_pr" data-toggle="tab" href="#pr" role="tab" aria-controls="supervision" aria-selected="false">Parolee</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="client_pd" data-toggle="tab" href="#pd" role="tab" aria-controls="single_carpeta" aria-selected="false">Pardonee</a>
                                    </li> -->
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="pb" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Probationer</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pb">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pb">
                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pr" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Parolee</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pr">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pr">
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pd" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Pardonee</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pd">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pd">

                                                </tbody>
                                            </table>
                                        </div>
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


        var __tablePB = function(){
            $('.table_head_pb').DataTable().destroy();
            $('.table_body_pb').empty();

            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PROBATIONER').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                    console.log(result.name)
                    if (result.status != "ERROR") {
                        result.content.forEach(function(data){
                            // __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (resultfo) {
                            //     console.log(resultfo.name);
                            let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet worksheet' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir psir' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> PSIR</button>";
                            $('.table_body_pb').append("<tr>"+
                                "<td>"+data.id+"</td>"+
                                "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
                                "<td>"+data.sex+"</td>"+
                                "<td>"+data.clientType+"</td>"+
                                "<td value="+data.fieldOfficeId+">"+data.fieldOfficeName+"</td>"+
                                "<td class='actions'> "+actions+"")
                            // });
                    })  
                    
                    $(document).ready(function () {
                        $('.table_head_pb tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_pb').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "40%", "targets": 5 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_worksheet").unbind("click").on("click", function(){
                        var client_id   = $(this).data("id");
                        var foid        = $(this).data("foid");
                        window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
                    })
                    $(".btn_update").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
                    })
                    $(".btn_upload").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
                    })
                    $(".btn_view").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
                    })
                    $(".btn_psir").unbind("click").on("click", function(){
                        var client_id   = $(this).data("id");
                        var foid        = $(this).data("foid");
                        window.location.href = 'http://localhost/pis/psir_identifying_data?client_id='+client_id+'&field_office_id='+foid;
                    })                   
                }
            })
        }
        __tablePB();

        var __tablePR = function(){
            $('.table_head_pr').DataTable().destroy();
            $('.table_body_pr').empty();

            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PAROLEE').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> View</button>";
                        $('.table_body_pr').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
                            "<td>"+data.sex+"</td>"+
                            "<td>"+data.clientType+"</td>"+
                            "<td value="+data.fieldOfficeId+">"+data.fieldOfficeId+"</td>"+
                            "<td class='actions'> "+actions+"")
                    });
                    
                    $(document).ready(function () {
                        $('.table_head_pr tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_pr').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 5 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });


                    $(".btn_update").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
                    })
                    $(".btn_upload").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
                    })
                    $(".btn_view").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
                    })
                }
            })
        }
        __tablePR();

        var __tablePD = function(){
            $('.table_head_pd').DataTable().destroy();
            $('.table_body_pd').empty();

            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PARDONEE').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> View</button>";
                        $('.table_body_pd').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
                            "<td>"+data.sex+"</td>"+
                            "<td>"+data.clientType+"</td>"+
                            "<td value="+data.fieldOfficeId+">"+data.fieldOfficeId+"</td>"+
                            "<td class='actions'> "+actions+"")
                    });
                    $(document).ready(function () {
                        $('.table_head_pd tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_pd').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "30%", "targets": 5 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_update").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
                    })
                    $(".btn_upload").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
                    })
                    $(".btn_view").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
                    })
                   
                }
            })
        }
        __tablePD();


    } )( jQuery );
    </script>


</body>

</html>