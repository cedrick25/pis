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
                            <li><a href="pardonee_supervision_docketing">Pardonee</a></li>
                            <li class="active">Supervision Docket list</li>
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
                                <strong class="card-title">Pardonee Supervision Docket List</strong>
                                <a href="pardonee_supervision_create"> <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button> </a>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr align="center">
                                            <th>#</th>
                                            <th>Docket Number</th>
                                            <th>Docket Series</th>
                                            <th>Client Type</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body" align="center">
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

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8000/docketbook/list/SC_PD_SUP/'+$.cookie("field_office_id")).done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.response.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.docketNumber+"</td>"+
                            "<td>"+data.docketSeries+"</td>"+
                            "<td>"+data.clientType+"</td>"+
                            "<td>"+data.status+"</td>"+
                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button>")
                    });
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "20%", "targets": 5 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_remove").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var office_id = $(this).data("oi");
                        $(".docket").html(docket_number)
                        $(".btn_remove_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8000/docketbook/remove/'+docket_number+'/'+office_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_remove').show();
                                            setTimeout(function () {
                                                $('#removeModal').modal('hide');
                                                $('#success_remove').hide();
                                                __table();
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#removeModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })
                        })
                    })

                    $(".btn_update").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/pardonee_supervision_update?docket_number='+docket_number;
                    })
                   
                }
            })
        }
        __table();

    } )( jQuery );
    </script>

</body>

</html>