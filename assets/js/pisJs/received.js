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
        var roleId = $.cookie("role_id");

        function buttonVisibility (){
            var data = JSON.parse(localStorage.getItem('permission'));
            if (data != null) {
                data.forEach(function(data){
                    if (data.type == "ACTION") {
                        setTimeout(function() {
                            if (!data.value) {
                                var element = $('.' + data.detail);
                                element.hide();
                            }else{
                                var element = $('.' + data.detail);
                                element.show();
                            }
                        }, 100);
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
            $(".pb_inv_return").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                window.location.href = api+'/pis/return?docket_number='+docket_number+'&id='+id;
            })
            $(".pb_inv_forward").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var fi = $(this).data("fi");
                window.location.href = api+'/pis/forward?docket_number='+docket_number+'&id='+id+'&fo='+fi;
            })
            $(".pb_inv_upload").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("fi");
                window.location.href = api+'/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
            })
            $(".pb_inv_complete").unbind("click").on("click", function(){
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
            $(".pb_inv_worksheet").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var fi = $(this).data("fi");
                var apiUrl = api+'8000/docketbook/'+docket_number+'/'+fi
                $.ajax({
                    url: apiUrl,
                    type: 'GET',
                    dataType: 'json',
                    success: function(result) {
                        var data = result.response;
                        window.location.href = api+'/pis/worksheet_identifying_data?client_id='+data.clientId+'&field_office_id='+data.fieldOfficeId;
                    },
                    error: function(xhr, status, error) {
                        console.error('Error:', status, error);
                    }
                })
            })
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        if (data.id == null){
                            var idText = "No id"
                            if (data.approvalStatus == "New - (Forwarded to CPPO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Forwarded to FO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Return to Clerk)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Return to CPPO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                                idText += ' <span style="color: red;">*</span>';
                            }else {
                                idText;
                            }
                            return idText;
                        } else {
                            var idText = data.id
                            if (data.approvalStatus == "New - (Forwarded to CPPO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Forwarded to FO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Return to Clerk)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Return to CPPO)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                                idText += ' <span style="color: red;">*</span>';
                            } else {
                                idText;
                            }   
                            return idText;
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
                    "data": 'approvalStatus',
                    render: function (data, type, row){
                        if (data == "New - (Forwarded to CPPO)")
                        {
                            var statusText = "New"
                            return statusText;
                        } else if (data == "New - (Forwarded to FO)")
                        {
                            var statusText = "New"
                            return statusText;
                        } else if (data == "New - (Returned to FO)")
                        {
                            var statusText = "New"
                            return statusText;
                        } else if (data == "New - (Returned to CPPO)")
                        {
                            var statusText = "New"
                            return statusText;
                        } else if (data == "New - (Forward to CPPO for Approval)")
                        {
                            var statusText = "New"
                            return statusText;
                        } if (data == null){
                            var statusText = "Error! value is null"
                            return statusText
                        } else {
                            var statusText = "Pending"
                            return statusText
                        }
                    }
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        switch (data.approvalStatus) {
                            case "COMPLETED":
                                return "<h5>This Docket is Completed</h5>";
                                break;
                            case "New - (Forward to CPPO for Approval)":
                                if (roleId == "32"){
                                    return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-success pb_inv_complete pb_sup_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button>"
                                }
                            case "Pending of CPPO for Approval":
                                if (roleId == "32"){
                                    return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-success pb_inv_complete pb_sup_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button>"
                                }
                            default:
                                if (roleId == "32"){
                                    return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button>"
                                } else if (roleId == "4"){
                                    return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-info pb_inv_worksheet pb_sup_worksheet' id='btn_worksheet' style='display:none;' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-docket='"+data.docketNumber+"'><i class='fa fa-plus-circle'></i> Worksheet</button>"
                                } else {
                                    return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success pb_inv_complete pb_sup_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button> <button class='btn btn-sm btn-info pb_inv_worksheet pb_sup_worksheet' id='btn_worksheet' style='display:none;' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-docket='"+data.docketNumber+"'><i class='fa fa-plus-circle'></i> Worksheet</button>";                                    
                                }
                                break;
                        };
                    }
                }
            ]
        }

        function drawTable(type,uuid) {
            let responseData;
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "5%", "targets": [0] },
                        { "width": "7%", "targets": [1,2,3,4,5] },
                        { "width": "15%", "targets": [6] }
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
                                responseData = res.content;
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