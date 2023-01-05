<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->
    <div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Add New Inventory</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label ">Barcode/Qrcode</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control a">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Type</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <select class="form-control b" id="type">
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Brand/Model</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control c">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Status</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <select class="form-control d" id="status">
                                    <option value="1" selected>In Stock</option>
                                    <option value="2">In Use</option>
                                    <option value="3">In Repair</option>
                                    <option value="4">Disposed</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control e">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm_inv">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Inventory</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label ">Barcode/Qrcode</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control a_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Type</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <select class="form-control b" id="type_update">
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Brand/Model</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control c_update">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Status</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <select class="form-control d_update" id="status_update">
                                    <option value="1">In Stock</option>
                                    <option value="2">In Use</option>
                                    <option value="3">In Repair</option>
                                    <option value="4">Disposed</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Remarks</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control e_update">
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
    <div class="modal fade" id="stockModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Create New Equipment</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Equipment Name</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control eq_name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_equipment">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="updatestockModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Equipment</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Equipment Name</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="" class="form-control eq_name_update">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_equipment_update">Confirm</button>
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
                        <h1>Inventory</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Inventory</li>
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
                                <strong class="card-title">Equipment</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#stockModal"><i class="fa fa-plus-circle"></i> Equipment</button>
                            </div>
                            <div class="card-body">
                                <table class="table table_head_equipment">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">In Stock</th>
                                            <th scope="col">In Use</th>
                                            <th scope="col">In Repair</th>
                                            <th scope="col">Disposed</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body_equipment">
                                        <tr>
                                            <th scope="row">Laptop</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Desktop</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cellphone</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Services</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Fans</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Air Conditioning Unit</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Chairs</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tables</th>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>10</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Inventory List</strong>
                                <button class="btn btn-sm btn-success float-right btn_inv" type="submit" data-toggle="modal" data-target="#mediumModal"><i class="fa fa-plus-circle"></i> Inventory</button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head_inv">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Barcode/QRcode</th>
                                            <th>Type</th>
                                            <th>Brand/Model</th>
                                            <th>Remarks</th>
                                            <th>Date Encoded</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body_inv">
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


        var __equipment_type = function(){
            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                $('.b').html("");
                result.payload.forEach(function(data){
                    $('.b').append(`
                        <option value='${data.equipment_id}'>${data.equipment_name}</option>`)
                })
            })
        }
        $(".btn_inv").unbind("click").on("click", function(){
            __equipment_type();
        })
        $(".btn_confirm_equipment").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD       : "insert",
               equipment_name  : $(".eq_name").val(),
            }
            __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {
                    console.log(result.status);
                    $(".form-control").val('');
                    alert(result.message)
                    $('#stockModal').modal('hide');

                    var payload_audit = {
                       METHOD : "insert",
                       resident_id      :  $.cookie("resident_id"),
                       action_performed : "Add",
                       action_details   : "Add Equipment module"
                    }
                    __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                    })
                    __table_equipment();
                    __table_inv();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table_equipment = function(){
            $('.table_head_equipment').DataTable().destroy();
            $('.table_body_equipment').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                // console.log(result)
                result.payload.forEach(function(data){
                    // console.log(data)

                    var payload = {
                       METHOD : "fetch_all_ie",
                       equipment_id :data.equipment_id,
                    }
                    // console.log(payload)
                    __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                        // console.log(result)
                        if (result.status === "SUCCESS") {
                            var total = 0;
                            var a = 0;
                            var b = 0;
                            var c = 0;
                            var d = 0;
                            result.payload.forEach(function(data){
                                a += parseInt(data.stock);
                                b += parseInt(data.used);
                                c += parseInt(data.repair);
                                d += parseInt(data.disposed);
                            });
                            total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d));
                            $('.table_body_equipment').append("<tr>"+
                                "<td><a class='btn_update_eq btn' href='#!' data-toggle='modal' data-target='#updatestockModal' data-id='"+data.equipment_id+"'>"+data.equipment_name+"</a></td>"+
                                "<td>"+a+"</td>"+
                                "<td>"+b+"</td>"+
                                "<td>"+c+"</td>"+
                                "<td>"+d+"</td>"+
                                "<td>"+total+"</td>")
                        } else {
                            $('.table_body_equipment').append("<tr>"+
                                "<td><a class='btn_update_eq btn' href='#!' data-toggle='modal' data-target='#updatestockModal' data-id='"+data.equipment_id+"'>"+data.equipment_name+"</a></td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>")
                        }

                        $(".btn_update_eq").unbind("click").on("click", function(){
                            console.log('clicked')
                            var data_id = $(this).data("id");

                            var payload = {
                               METHOD           : "fetch_by_id",
                               equipment_id     : data_id,
                               equipment_name   : $(".eq_name_update").val(),
                            }
                            __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                                console.log(result);
                                if (result.status == "SUCCESS") {
                                    // console.log(result.status);
                                   $(".eq_name_update").val(result.payload.equipment_name);

                                    $(".btn_confirm_equipment_update").unbind("click").on("click", function(){
                                        console.log('clicked')

                                        var payload = {
                                           METHOD       : "update",
                                           equipment_id     : data_id,
                                           equipment_name   : $(".eq_name_update").val(),
                                        }
                                        __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                                            console.log(result);
                                            if (result.status == "SUCCESS") {
                                                console.log(result.status);
                                                $(".form-control").val('');
                                                alert(result.message)
                                                $('#updatestockModal').modal('hide');
                                                __table_equipment();
                                                __table_inv();
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
                    })
                })

            })
        }
        __table_equipment();


        $(".btn-confirm_inv").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
               METHOD           : "insert",
               barcode_qrcode   : $(".a").val(),
               equipment_id     : $("#type").val(),
               brand_model      : $(".c").val(),
               status           : $(".d").val(),
               remarks          : $(".e").val(),
            }
            __executeExternalPost('/bms_api/bms/inventory',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status == "SUCCESS") {

                    let payload2;
                    switch ($("#status").val()) {
                    case "1":
                        payload2 = {
                           METHOD           : "insert_ie",
                           equipment_id     : $("#type").val(),
                           inventory_id     : result.payload,
                           stock            : "1",
                        }
                        break;
                    case "2":
                        payload2 = {
                           METHOD           : "insert_ie",
                           equipment_id     : $("#type").val(),
                           inventory_id     : result.payload,
                           used             : "1",
                        }
                        break;
                    case "3":
                        payload2 = {
                           METHOD           : "insert_ie",
                           equipment_id     : $("#type").val(),
                           inventory_id     : result.payload,
                           repair           : "1",
                        }
                        break;
                    case "4":
                        payload2 = {
                           METHOD           : "insert_ie",
                           equipment_id     : $("#type").val(),
                           inventory_id     : result.payload,
                           disposed         : "1",
                        }
                        break;
                    default:
                        break;
                    };
                    __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload2)).done(function (result) {
                        console.log(result);
                        if (result.status == "SUCCESS") {
                            $(".form-control").val('');
                            alert(result.message)
                            $('#mediumModal').modal('hide');

                            var payload_audit = {
                               METHOD : "insert",
                               resident_id      :  $.cookie("resident_id"),
                               action_performed : "Add",
                               action_details   : "Add Inventory module"
                            }
                            __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

                            })
                            __table_equipment();
                            __table_inv();
                        }else{
                            console.log(result.status);
                            alert(result.message)
                        }
                    })

                    // $(".form-control").val('');
                    // alert(result.message)
                    // $('#mediumModal').modal('hide');
                    // __table_equipment();
                    // __table_inv();
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table_inv = function(){
            $('.table_head_inv').DataTable().destroy();
            $('.table_body_inv').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/inventory',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                result.payload.forEach(function(data){
                    let status;
                    switch (data.status) {
                        case "1":
                            status = "In Stock"
                            break;
                        case "2":
                            status = "In Use"
                            break;
                        case "3":
                            status = "In Repair"
                            break;
                        case "4":
                            status = "Disposed"
                            break;
                        default:
                            status = "In Stock"
                            break;
                    };
                    
                    $('.table_body_inv').append("<tr>"+
                        "<td>"+data.inventory_id+"</td>"+
                        "<td>"+data.barcode_qrcode+"</td>"+
                        "<td>"+data.equipment_name+"</td>"+
                        "<td>"+data.brand_model+"</td>"+
                        "<td>"+data.remarks+"</td>"+
                        "<td>"+data.date_created+"</td>"+
                        "<td>"+status+"</td>"+
                        "<td align='center' class='actions'><button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateModal' data-id='"+data.inventory_id+" data-idd='"+data.equipment_id+"><i class='fa fa-refresh'></i> Update</button>")
                });
                $(document).ready(function () {
                    var table = $('.table_head_inv').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "20%", "targets": 7}
                        ],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });
                $(".btn_update").unbind("click").on("click", function(){
                    __equipment_type()
                    console.log('clicked')
                    var data_id     = $(this).data("id");

                    var payload = {
                       METHOD      : "fetch_by_id",
                       inventory_id  : data_id,
                    }
                    __executeExternalPost('/bms_api/bms/inventory',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status == "SUCCESS") {
                            console.log(result.status);
                           $(".a_update").val(result.payload.barcode_qrcode);
                           $("#type_update").val(result.payload.equipment_id).trigger('change');
                           $(".c_update").val(result.payload.brand_model);
                           $("#status_update").val(result.payload.status).trigger('change');
                           $(".e_update").val(result.payload.remarks);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')

                                var payload = {
                                   METHOD           : "update",
                                   inventory_id     : data_id,
                                   equipment_id     : $("#type_update").val(),
                                   barcode_qrcode   : $(".a_update").val(),
                                   brand_model      : $(".b_update").val(),
                                   remarks          : $(".c_update").val(),
                                   status           : $(".d_update").val(),
                                }
                                __executeExternalPost('/bms_api/bms/inventory',JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status == "SUCCESS") {

                                        let payload2;
                                        switch ($("#status_update").val()) {
                                        case "1":
                                            payload2 = {
                                               METHOD           : "update_ie",
                                               e_i_id           : data_id,
                                               inventory_id     : data_id,
                                               equipment_id     : $("#type_update").val(),
                                               stock            : "1",
                                            }
                                            break;
                                        case "2":
                                            payload2 = {
                                               METHOD           : "update_ie",
                                               e_i_id           : data_id,
                                               inventory_id     : data_id,
                                               equipment_id     : $("#type_update").val(),
                                               used             : "1",
                                            }
                                            break;
                                        case "3":
                                            payload2 = {
                                               METHOD           : "update_ie",
                                               e_i_id           : data_id,
                                               inventory_id     : data_id,
                                               equipment_id     : $("#type_update").val(),
                                               repair           : "1",
                                            }
                                            break;
                                        case "4":
                                            payload2 = {
                                               METHOD           : "update_ie",
                                               e_i_id           : data_id,
                                               inventory_id     : data_id,
                                               equipment_id     : $("#type_update").val(),
                                               disposed         : "1",
                                            }
                                            break;
                                        default:
                                            break;
                                        };

                                        __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload2)).done(function (result) {
                                            console.log(result);
                                            if (result.status == "SUCCESS") {
                                                $(".form-control").val('');
                                                alert(result.message)
                                                $('#updateModal').modal('hide');
                                                __table_equipment();
                                                __table_inv();
                                            }else{
                                                console.log(result.status);
                                                alert(result.message)
                                            }
                                        })
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
            })
        }
        __table_inv();


    } )( jQuery );
    </script>

</body>

</html>
