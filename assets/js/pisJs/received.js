    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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
        
        var uuid = $.cookie("uuid");

        function buttonVisibility (){
            var data = JSON.parse(localStorage.getItem('permission'));
            if (data != null) {
                data.forEach(function(data){
                    if (data.type == "ACTION") {
                        // console.log(data.value)
                        setTimeout(function() {
                            if (!data.value) {
                                var element = $('.' + data.detail);
                                element.hide();
                            }else{
                                var element = $('.' + data.detail);
                                element.show();
                            }
                        }, 10);
                    }else if (data.type == "VIEW") {
                        if (!data.value) {
                            var element = $('.' + data.detail);
                            element.hide();
                        }else{
                            var element = $('.' + data.detail);
                            element.show();
                        }
                    }else{
                    }
                });
            }
        }

        function buttonFunctionality(){
            $("#btn_return").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                console.log("btn_return click")
                window.location.href = api+'/pis/return?docket_number='+docket_number+'&id='+id;
            })
            $("#btn_forward").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                console.log("btn_forward click")
                window.location.href = api+'/pis/forward?docket_number='+docket_number+'&id='+id;
            })
            $("#btn_upload").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("fi");
                console.log("btn_upload click")
                window.location.href = api+'/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
            })
            $("#btn_complete").unbind("click").on("click", function(){
                var id = $(this).data("id");
                var docket_number = $(this).data("docket");
                var type = $(this).data("type")
                __executeExternalGet('8000/workflow/'+id).done(function (result) {
                    var result = result.response;
                    $(".btn_complete_confirm").unbind("click").on("click", function(){
                        function loadPayload () {
                            return {
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
                        }
                        if (type == "PIS_INV"){
                            var payload = loadPayload()
                        } else {
                            var payload = loadPayload()
                        }
                        __executeExternalPost('8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                            if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#complete_success_cinv').show();
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
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        if (data.id == null){
                            return "No id";
                        } else {
                            return data.id;
                        }
                    }
                },
                {
                    "data": 'docketNumber'
                },
                {
                    "data": 'fieldOfficeName'
                },
                {
                    "data": 'details',
                },
                {
                    "data": 'senderName'
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        switch (data.approvalStatus) {
                            case "COMPLETED":
                                return "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                return "<button class='btn btn-sm btn-primary' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.departmentId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                        };
                    }
                }
            ]
        }

        function drawTable(type,uuid) {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "15px", "targets": [0] },
                        { "width": "100px", "targets": [2] },
                        { "width": "150px", "targets": [3] },
                        { "width": "200px", "targets": [1,4] },
                        { "width": "600px", "targets": [5] }
                    ],
                    "ajax": function(data, callback, settings) {
                        const size = 10;
                        const page = data.start / size;
                        const apiUrl = api+"8000/workflow/receiver/"+uuid+"?page="+page+"&size="+size+"&type="+type;
                        $.ajax({
                            url: apiUrl,
                            method: 'GET',
                            dataType: 'json',
                            success: function(res) {
                                callback({
                                    recordsTotal: res.totalElements,
                                    recordsFiltered: res.totalElements,
                                    data: res.content
                                });
                            },
                            error: function(err) {
                                console.error("Failed to fetch data:", err);
                            }
                        });
                    },
                    "columns": tableColumns()
                });
                $('.table_head').on('draw.dt', function() {
                    buttonFunctionality();
                    buttonVisibility();
                    if ( type == "PIS_INV" ){
                        $('#btn_upload').addClass('pb_inv_upload')
                        $('#btn_forward').addClass('pb_inv_forward')
                        $('#btn_complete').addClass('pb_inv_complete')
                        $('#btn_return').addClass('pb_inv_return')
                    } else {
                        $('#btn_upload').removeClass('pb_inv_upload')
                        $('#btn_forward').removeClass('pb_inv_forward')
                        $('#btn_complete').removeClass('pb_inv_complete')
                        $('#btn_return').removeClass('pb_inv_return')
                        $('#btn_upload').addClass('pb_sup_upload')
                        $('#btn_forward').addClass('pb_sup_forward')
                        $('#btn_complete').addClass('pb_sup_complete')
                        $('#btn_return').addClass('pb_sup_return')
                    }
                });
            })
        }
                    
        var tableInv = document.getElementById('inv_tab')

        if (tableInv.classList.contains("active")) {
            $('.table_head').DataTable().destroy();
            var type = "PIS_INV";
            drawTable(type,uuid)
        }

        tableInv.addEventListener('click', function() {
            $('.table_head').DataTable().destroy();
            var type = "PIS_INV";
            drawTable(type,uuid)
        });

        var tableSup = document.getElementById('sup_tab')
        tableSup.addEventListener('click', function() {
            $('.table_head').DataTable().destroy();
            var type = "PIS_SUP";
            drawTable(type,uuid)
        });

    } )( jQuery );