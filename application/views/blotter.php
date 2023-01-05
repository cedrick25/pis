<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->
    <div class="modal fade" id="addBlotter" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Create New Blotter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Complainant</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="complainant" name="text-input" placeholder="Janella Salvador" class="form-control a">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Complaint</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="complaint" name="text-input" placeholder="Binasag ang salamin ng kotse" class="form-control b">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Suspect</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="where" name="text-input" placeholder="Joshua Garcia" class="form-control c">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Involved</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="where" name="text-input" placeholder="Daniel Padilla, Sanjo, Naruto, Goku" class="form-control d">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Date Occurred</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="date" id="date" class="form-control e">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Time Occurred</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="time" name="text-input" placeholder="12:00am/pm" class="form-control f">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="updateBlotter" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Blotter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Complainant</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="complainant" name="text-input" placeholder="Janella Salvador" class="form-control a_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Complaint</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="complaint" name="text-input" placeholder="Binasag ang salamin ng kotse" class="form-control b_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Suspect</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="where" name="text-input" placeholder="Joshua Garcia" class="form-control c_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Involved</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="where" name="text-input" placeholder="Daniel Padilla, Sanjo, Naruto, Goku" class="form-control d_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Date Occurred</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="date" id="date" class="form-control e_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Time Occurred</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="time" name="text-input" placeholder="12:00am/pm" class="form-control f_update">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="archiveModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Archive</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <p>
                            Are you sure you want to archive this Blotter? 
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_archive_confirm">Confirm</button>
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
                        <h1>Blotter</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Blotter</li>
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
                                <strong class="card-title">Blotter</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#addBlotter"><i class="fa fa-plus-circle"></i> Blotter</button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date Time Occurred</th>
                                            <th>Complainant</th>
                                            <th>Complaint</th>
                                            <th>Suspect</th>
                                            <th>Involved</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
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
               METHOD       : "insert",
               complainant  : $(".a").val(),
               complaint    : $(".b").val(),
               suspect      : $(".c").val(),
               involved     : $(".d").val(),
               date_occured : $(".e").val(),
               time_occured : $(".f").val(),
            }
            __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#addBlotter').modal('hide');

                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Add",
                       action_details   : "Add Blotter module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __table();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                result.payload.forEach(function(data){
                    actions = ((data.status==1) ? "<button class='btn btn-sm btn-primary btn_update "+status+"' type='submit' data-toggle='modal' data-target='#updateBlotter' data-id='"+data.blotter_id+"'><i class='fa fa-refresh'></i> Update</button>"+
                        " <button class='btn btn-sm btn-danger btn_archive "+status+"' type='submit' data-toggle='modal' data-target='#archiveModal' data-id='"+data.blotter_id+"'><i class='fa fa-archive'></i> Archive</button>" : 'ARCHIVED');
                    $('.table_body').append("<tr>"+
                        "<td>"+data.blotter_id+"</td>"+
                        "<td>"+data.date_occured+" "+data.time_occured+"</td>"+
                        "<td>"+data.complainant+"</td>"+
                        "<td>"+data.complaint+"</td>"+
                        "<td>"+data.suspect+"</td>"+
                        "<td>"+data.involved+"</td>"+
                        "<td>"+data.date_created+"</td>"+
                        "<td align='center' class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "20%", "targets": 7 }
                        ],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_update").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    var payload = {
                       METHOD      : "fetch_by_id",
                       blotter_id  : data_id,
                    }
                    __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status == "SUCCESS") {
                            console.log(result.status);
                           $(".a_update").val(result.payload.complainant);
                           $(".b_update").val(result.payload.complaint);
                           $(".c_update").val(result.payload.suspect);
                           $(".d_update").val(result.payload.involved);
                           $(".e_update").val(result.payload.date_occured);
                           $(".f_update").val(result.payload.time_occured);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')

                                var payload = {
                                   METHOD       : "update",
                                   blotter_id   : data_id,
                                   complainant  : $(".a_update").val(),
                                   complaint    : $(".b_update").val(),
                                   suspect      : $(".c_update").val(),
                                   involved     : $(".d_update").val(),
                                   date_occured  : $(".e_update").val(),
                                   time_occured  : $(".f_update").val(),
                                }
                                __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status == "SUCCESS") {
                                        console.log(result.status);
                                        $(".form-control").val('');
                                        alert(result.message)
                                        $('#updateBlotter').modal('hide');
                                        __table();
                                    }else{
                                        console.log(result.status);
                                        alert(result.message)
                                    }
                                })
                            })

                        }else{
                            console.log(result.status);
                            alert(result.message)
                        }
                    })
                })

                $(".btn_archive").unbind("click").on("click", function(){
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    $(".btn_archive_confirm").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                           METHOD  : "update",
                           blotter_id   : data_id,
                           status  : "2",
                        }
                        __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status == "SUCCESS") {
                                console.log(result.status);
                                $(".form-control").val('');
                                alert(result.message)
                                $('#archiveModal').modal('hide');
                                __table();
                            }else{
                                console.log(result.status);
                                alert(result.message)
                            }
                        })

                    })
                })
            })
        }
        __table();


    } )( jQuery );
    </script>
</body>

</html>
