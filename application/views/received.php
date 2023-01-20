<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="returnModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Return Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Returned  
                </div>
                <div class="modal-body col-md-12">
                    <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                        <i class="fa fa-check"></i>
                            Successfully Forward  
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                        <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label docket_number"></label></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload Type</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Caseload Type" class="form-control caseload_type"></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control field_office select2">
                                <option>Central Office</option>
                                <option>San Juan</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12 user_display" style="display: none;">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Account</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control user_account select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Details" class="form-control details"></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
                    </div>
                    <!-- <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="uploadFile" class=" form-control-label">Upload a File</label></div>
                        <div class="col-12 col-md-9"><input type="file" class="form-control-file" id="uploadFile"></div>
                    </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new User account modal -->
    <div class="modal fade" id="forwardModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New Received</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Returned  
                </div>
                <div class="modal-body col-md-12">
                    <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                        <i class="fa fa-check"></i>
                            Successfully Forward  
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                        <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label docket_number"></label></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload Type</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Caseload Type" class="form-control caseload_type"></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control field_office select2">
                                <option>Central Office</option>
                                <option>San Juan</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12 user_display" style="display: none;">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Account</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control user_account select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Details" class="form-control details"></div>
                    </div>
                    <div class="row form-group col-md-12">         
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
                    </div>
                    <!-- <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="uploadFile" class=" form-control-label">Upload a File</label></div>
                        <div class="col-12 col-md-9"><input type="file" class="form-control-file" id="uploadFile"></div>
                    </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new User account modal -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Received</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">Forwarding Docket</a></li>
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
                                <!-- <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newUserModal"><i class="fa fa-plus-circle"></i> Add User Account</button> -->
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Docket No.</th>
                                            <th>Field Office</th>
                                            <th>Details</th>
                                            <th>Remarks</th>
                                            <th>Caseload Type</th>
                                            <th>Sender</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                        <tr>
                                            <td>1</td>
                                            <td>JPI202400001</td>
                                            <td>Central Office</td>
                                            <td>test</td>
                                            <td>testing</td>
                                            <td>caseload type sample</td>
                                            <td>User 1</td>
                                            <td>Pending</td>
                                            <td width="30%" align='center' class='actions'> <a href="upload"><button class='btn btn-sm btn-primary btn_upload' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-upload'></i> Upload</button></a> <button class='btn btn-sm btn-success btn_return' type='submit' data-toggle='modal' data-target='#returnModal'><i class='fa fa-backward'></i> Return</button> <button class='btn btn-sm btn-danger btn_forward' type='submit' data-toggle='modal' data-target='#forwardModal'><i class='fa fa-forward'></i> Forward </button> </td>
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

    <script type="text/javascript">
    // ( function ( $ ) {
    //     var ___ctx = '';

    //     var __setContext = function(newctx) {
    //         ___ctx = newctx;
    //     };

    //     var __getContext = function() {
    //         return ___ctx;
    //     };

    //     var __executeExternalPost = function(path, jsonObj, customLoader) {
    //         path = __getContext() + path;
    //         var d = $.Deferred();
    //         if(customLoader != ""){
    //             $("#"+customLoader).show();
    //             $("#"+customLoader).removeClass("hide");
    //         }
    //         $.ajax({
    //             method: "POST",
    //             url: path,
    //             dataType: "json",
    //             headers: {
    //                 // 'Content-Type': 'multipart/form-data;'
    //                 'Content-Type':'application/json'
    //             },
    //             data: jsonObj
    //         }).done(function (data, textStatus, jqXHR) {
    //             if(customLoader != ""){
    //                 $("#"+customLoader).hide();
    //                 $("#"+customLoader).addClass("hide");
    //             }
    //             d.resolve(data)
    //         }).fail(function (jqXHR, textStatus, errorThrown,request) {
    //             console.log('---FAILED---');
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //             console.log('---FAILED---');
                
    //             d.resolve({
    //                 status : 'ERROR',
    //                 message : request
    //             });
                
    //             if(customLoader != ""){
    //                 $("#"+customLoader).hide();
    //                 $("#"+customLoader).addClass("hide");
    //             }
    //         });
            
    //         return d.promise();
    //     };

    //     var __executeExternalGet = function(path, customLoader) {
    //         // path = $.wms.getContextPath() + path;
    //         var d = $.Deferred();
    //         if(customLoader != ""){
    //             $("#"+customLoader).show();
    //             $("#"+customLoader).removeClass("hide");
    //         }
    //         $.ajax({
    //             method: "GET",
    //             url: path,
    //             dataType: "json",
    //         }).done(function (data, textStatus, jqXHR) {
    //             if(customLoader != ""){
    //                 $("#"+customLoader).hide();
    //                 $("#"+customLoader).addClass("hide");
    //             }
    //             d.resolve(data)
    //         }).fail(function (jqXHR, textStatus, errorThrown,request) {
    //             console.log('---FAILED---');
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //             console.log('---FAILED---');
                
    //             d.resolve({
    //                 status : 'ERROR',
    //                 message : request
    //             });
                
    //             if(customLoader != ""){
    //                 $("#"+customLoader).hide();
    //                 $("#"+customLoader).addClass("hide");
    //             }
    //         });
            
    //         return d.promise();
    //     };

    //     var type = GetURLParameter('type');
        
    //     var __select = function(){
    //         $('.field_office').empty();
    //         $('.field_office_update').empty();

    //         __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
    //             console.log(result)
    //             if (result.status != "ERROR") {
    //                 $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
    //                 $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
    //                 result.forEach(function(data){
    //                     console.log(data)
    //                     $('.field_office').append(
    //                         "<option value="+data.id+">"+data.name+"</option>");
    //                     $('.field_office_update').append(
    //                         "<option value="+data.id+">"+data.name+"</option>");

    //                 });
    //             } else {
    //                 console.log("failed fetching department list")
    //             }
    //         })
    //     }
    //     __select();

    //     function GetURLParameter(sParam){
    //         var sPageURL = window.location.search.substring(1);
    //         var sURLVariables = sPageURL.split('&');
    //         for (var i = 0; i < sURLVariables.length; i++)
    //         {
    //             var sParameterName = sURLVariables[i].split('=');
    //             if (sParameterName[0] == sParam)
    //             {
    //                 return decodeURIComponent(sParameterName[1]);
    //             }
    //         }
    //     }

    //     var __table = function(){
    //         $('.table_head').DataTable().destroy();
    //         $('.table_body').empty();

    //         __executeExternalGet('http://localhost:8000/docketbook/list/inv').done(function (result) {
    //             console.log("==========")
    //             console.log(result)
    //             console.log("==========")
    //             if (result.status != "ERROR") {
    //                 result.response.forEach(function(data){
    //                     $('.table_body').append("<tr>"+
    //                         "<td></td>"+
    //                         "<td>"+data.docketNumber+"</td>"+
    //                         "<td>"+data.fieldOfficeId+"</td>"+
    //                         "<td>"+data.status+"</td>"+
    //                         "<td>"+data.remarks+"</td>"+
    //                         "<td>"+data.type+"</td>"+
    //                         "<td>"+data.createdBy+"</td>"+
    //                         "<td>"+data.status+"</td>"+
    //                         "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_upload' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Upload</button> <button class='btn btn-sm btn-success btn_view' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-eye'></i> View upload</button>")
    //                 });
    //                 $(document).ready(function () {
    //                     $('.table_head tbody tr').each(function (idx) {
    //                        $(this).children("td:eq(0)").html(idx + 1);
    //                     });
    //                     var table = $('.table_head').DataTable({
    //                         order: [[0, 'asc']],
    //                         "columnDefs": [
    //                             { "width": "30%", "targets": 9 }
    //                         ]
    //                     });
    //                     $('.dataTables_length').addClass('bs-select');
    //                 });
    //                 $(".btn_upload").unbind("click").on("click", function(){
    //                     var docket_number = $(this).data("docket");
    //                     window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number;
    //                 })

    //                 $(".btn_view").unbind("click").on("click", function(){
    //                     var docket_number = $(this).data("docket");
    //                     window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number;
    //                 })
    //             }
    //         })
    //     }
    //     __table();


    // } )( jQuery );
    </script>

</body>

</html>