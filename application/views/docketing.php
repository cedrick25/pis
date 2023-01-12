<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <!-- Update modal -->

    <!-- new Docket modal -->
    <div class="modal fade" id="newUserModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1000px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Is this Military Court?</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control military_court">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <fieldset class="row col col-md-12">
                            <legend>List</legend>
                            <div class="list">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                    <div class="col-12 col-md-11"><textarea id="" name="" rows="2" cols="50" class="form-control sentence"></textarea></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Year"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Month"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Day"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Year"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Month"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Day"></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                            </div>
                        </fieldset>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                        <div class="col-12 col-md-9"><input type="date" class="form-control cod"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                        <div class="col-12 col-md-9"><input type="date" class="form-control rd"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
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
                        <h1>Docketing</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Docket list</li>
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
                                <strong class="card-title">Docket List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newUserModal"><i class="fa fa-plus-circle"></i> Add Docket</button>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Docket Number</th>
                                            <th>Received Date</th>
                                            <th>Name</th>
                                            <th>Criminal Case No.</th>
                                            <th>Status</th>
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

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked")
            $(".list").append(`
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea id="" name="" rows="2" cols="50" class="form-control sentence"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Day"></div>
                </div>`)

        })
        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                    "firstName"     : $(".firstName").val(),
                    "middleName"    : $(".middleName").val(),
                    "lastName"      : $(".lastName").val(),
                    "suffix"        : $(".suffix").val(),
                    "cc_no"         : $(".cc_no").val(),
                    "offense"       : $(".offense").val(),
                    "court_origin"  : $(".court_origin").val(),
                    "military_court": $(".military_court").val(),
                    "sentence"      : $(".sentence").val(),
                    "min"           : $(".min").val(),
                    "max"           : $(".max").val(),
                    "cod"           : $(".cod").val(),
                    "rd"            : $(".rd").val(),
                    "remarks"       : $(".remarks").val()
                }
            __executeExternalPost('http://localhost:8088/user/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                $(".form-control").val('');
                $('#success').show();
                    setTimeout(function () {
                        $('#newUserModal').modal('hide');
                        $('#success').hide();
                        __table();
                    }, 1000);
                }else{
                //     console.log(result.status);
                //     alert(result.message)
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
                    var status;
                    let actions;
                    switch (data.accountStatus) {
                    case "ACTIVE":
                            switch (data.isLocked) {
                            case true:
                                status = "RESTRICTED"
                                actions = "<button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                                break;
                            case false:
                                status = "ACTIVE"
                                actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                break;
                            default:
                                status = "ACTIVE"
                                actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                break;
                            };
                        break;
                    case "INACTIVE":
                        status = "INACTIVE"
                        actions = "<button class='btn btn-sm btn-success btn_activate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button>";
                        break;
                    case "REMOVED":
                        status = "REMOVED"
                        actions = "";
                        break;
                    default:
                        status = "ACTIVE"
                        actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                        break;
                    };
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
                    __executeExternalGet('http://localhost:8088/user/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".firstName_update").val(result.firstName);
                            $(".middleName_update").val(result.middleName);
                            $(".lastName_update").val(result.lastName);
                            $(".suffix_update").val(result.suffix);
                            $(".userName_update").val(result.username);
                            $(".email_update").val(result.email);
                            $(".num_update").val(result.phoneNumber);
                            $(".birthday_update").val(result.birthday);
                            $(".password_update").val(result.password);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                    "firstName"     : $(".firstName_update").val(),
                                    "middleName"    : $(".middleName_update").val(),
                                    "lastName"      : $(".lastName_update").val(),
                                    "suffix"        : $(".suffix_update").val(),
                                    "corpKey"       : "",
                                    "username"      : $(".userName_update").val(),
                                    "email"         : $(".email_update").val(),
                                    "phoneNumber"   : $(".num_update").val(),
                                    "birthday"      : $(".birthday_update").val(),
                                    "password"      : $(".password_update").val()
                                }

                                __executeExternalPost('http://localhost:8088/user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_update').show();
                                        setTimeout(function () {
                                            $('#updateUserModal').modal('hide');
                                            $('#success_update').hide();
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

    } )( jQuery );
    </script>

</body>

</html>