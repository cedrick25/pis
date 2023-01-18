<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Investigation Docket</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">Docket</a></li>
                            <li class="active">Investigation Docket list</li>
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
                                <strong class="card-title">Investigation Docket List</strong>
                                <a href="investigation_docket_create"> <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button> </a>
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
                <div class="">
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
                    <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                </div>`
            )
        })
        $(".btn-confirm").unbind("click").on("click", function(){

            var payload = {
                "type"          : "INV",
                "docketNumber"  : "",
                "fieldOfficeId" : "",
                "clientType"    : "ADULT",
                "firstName"     : $(".firstName").val(),
                "middleName"    : $(".middleName").val(),
                "lastName"      : $(".lastName").val(),
                "suffixName"    : $(".suffix").val(),
                "criminalCaseNumber" : $(".cc_no").val(),
                "offense"       : $(".offense").val(),
                "courtOfOrigin" : $(".court_origin").val(),
                "militaryCourt" : $(".military_court").val(),
                "sentence"      : $(".sentence").val(),
                "courtOrderDate": $(".cod").val(),
                "receivedDate"  : $(".rd").val(),
                "manualDocket"  : false,
                "referral"      : false,
                "typeOfReferral": "",
                "remarks"       : $(".remarks").val(),
                "probationStartDate": "",
                "probationYear" : "",
                "probationMonth": "",
                "probationDay"  :"",
            }
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
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

            __executeExternalGet('http://localhost:8000/docketbook/list/inv').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.response.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.docketNumber+"</td>"+
                            "<td>"+data.receivedDate+"</td>"+
                            "<td>"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffixName+"</td>"+
                            "<td>"+data.criminalCaseNumber+"</td>"+
                            "<td>"+data.status+"</td>"+
                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_forward' type='submit'><i class='fa fa-forward'></i> Forwarding</button>")
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
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/investigation_docket_update?docket_number='+docket_number;
                    })
                    // $(".btn_update").unbind("click").on("click", function(){
                    //     var data_id = $(this).data("id");
                    //     console.log(data_id)
                    //     __executeExternalGet('http://localhost:8088/user/'+data_id).done(function (result) {
                    //         console.log(result);
                    //         if (result.status != "ERROR") {
                    //             $(".firstName_update").val(result.firstName);
                    //             $(".middleName_update").val(result.middleName);
                    //             $(".lastName_update").val(result.lastName);
                    //             $(".suffix_update").val(result.suffix);
                    //             $(".userName_update").val(result.username);
                    //             $(".email_update").val(result.email);
                    //             $(".num_update").val(result.phoneNumber);
                    //             $(".birthday_update").val(result.birthday);
                    //             $(".password_update").val(result.password);

                    //             $(".btn_confirm_update").unbind("click").on("click", function(){
                    //                 console.log('clicked')
                    //                 var payload = {
                    //                     "firstName"     : $(".firstName_update").val(),
                    //                     "middleName"    : $(".middleName_update").val(),
                    //                     "lastName"      : $(".lastName_update").val(),
                    //                     "suffix"        : $(".suffix_update").val(),
                    //                     "corpKey"       : "",
                    //                     "username"      : $(".userName_update").val(),
                    //                     "email"         : $(".email_update").val(),
                    //                     "phoneNumber"   : $(".num_update").val(),
                    //                     "birthday"      : $(".birthday_update").val(),
                    //                     "password"      : $(".password_update").val()
                    //                 }

                    //                 __executeExternalPost('http://localhost:8088/user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                    //                     console.log(result);
                    //                     if (result.status != "ERROR") {
                    //                     $(".form-control").val('');
                    //                     $('#success_update').show();
                    //                         setTimeout(function () {
                    //                             $('#updateUserModal').modal('hide');
                    //                             $('#success_update').hide();
                    //                             __table();
                    //                         }, 1000);
                    //                     }else{
                    //                         alert("failed")
                    //                     }
                    //                 })
                    //             })

                    //         }else{
                    //             alert("failed")
                    //         }
                    //     })
                    // })
                }
            })
        }
        __table();

    } )( jQuery );
    </script>

</body>

</html>