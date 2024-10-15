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
            $("#btn_return").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var fi = $(this).data("fi");
                var senderId = $(this).data("sender");
                window.location.href = api+'/pis/return?docket_number='+docket_number+'&id='+id+'&fo='+fi+'&senderId='+senderId;
            })
            $("#btn_forward").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var fi = $(this).data("fi");
                var senderId = $(this).data("sender");
                window.location.href = api+'/pis/inv_forward?docket_number='+docket_number+'&id='+id+'&fo='+fi+'&senderId='+senderId;
            })
            $("#btn_upload").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("fi");
                var senderId = $(this).data("sender");
                window.location.href = api+'/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi+'&senderId='+senderId;
            })
            $("#btn_complete").unbind("click").on("click", function(){
                var id = $(this).data("id");
                var docket_number = $(this).data("docket");
                var type = $(this).data("type")
                __executeExternalGet('8000/workflow/'+id).done(function (result) {
                    var result = result.response;
                    $(".btn_complete_confirm").unbind("click").on("click", function(){
                        var payload = {
                            "type"                  : result.type,
                            "caseloadType"          : result.caseloadType,
                            "senderId"              : result.senderId,
                            "senderFieldOfficeId"   : result.senderFieldOfficeId,
                            "originFieldOfficeId"   : result.originFieldOfficeId,
                            "receiverId"            : result.receiverId,
                            "fieldOfficeId"         : result.fieldOfficeId,
                            "docketNumber"          : result.docketNumber,
                            "details"               : result.details,
                            "remarks"               : result.remarks,
                            "approvalStatus"        : "COMPLETED",
                            "lastStatusUpdateDate"  : "",
                        }
                        __executeExternalPost('8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
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
            // $(".pb_inv_worksheet").unbind("click").on("click", function(){
            //     var docket_number = $(this).data("docket");
            //     var fi = $(this).data("fi");
            //     var apiUrl = api+'8000/docketbook/'+docket_number+'/'+fi
            //     $.ajax({
            //         url: apiUrl,
            //         type: 'GET',
            //         dataType: 'json',
            //         success: function(result) {
            //             var data = result.response;
            //             window.location.href = api+'/pis/worksheet_identifying_data?client_id='+data.clientId+'&field_office_id='+data.fieldOfficeId;
            //         },
            //         error: function(xhr, status, error) {
            //             console.error('Error:', status, error);
            //         }
            //     })
            // })
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var idText = meta.settings._iDisplayStart + meta.row + 1;
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
                        } else if (data.approvalStatus == "New - (Forwarded to clerk for completion)"){
                            idText += ' <span style="color: red;">*</span>';
                        } else {
                            idText;
                        }
                        return idText;
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
                        }
                        else if (data == "New - (Forwarded to clerk for completion)")
                        {
                            var statusText = "New"
                            return statusText;
                        } 

                        if (data == null){
                            var statusText = ""
                            return statusText
                        } else if (data == "COMPLETED") {
                            var statusText = "Completed"
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
                            // case "New - (Forward to CPPO for Approval)":
                            //     if (roleId == "32"){
                            //         return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button>"
                            //     }
                            // case "Pending of CPPO for Approval":
                            //     if (roleId == "32"){
                            //         return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_inv_return pb_sup_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button>"
                            //     }
                            // default:
                            //     if (roleId == "32"){
                            //         return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button>"
                            //     } else if (roleId == "4"){
                            //         return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-info pb_inv_worksheet pb_sup_worksheet' id='btn_worksheet' style='display:none;' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-docket='"+data.docketNumber+"'><i class='fa fa-plus-circle'></i> Worksheet</button>"
                            //     } else if (roleId == "14") {
                            //         if (data.approvalStatus == "New - (Forwarded to clerk for completion)") {
                            //             return "<button class='btn btn-sm btn-success pb_inv_complete pb_sup_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button>"
                            //         } else {
                            //             return "<button class='btn btn-sm btn-primary pb_inv_upload pb_sup_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-info pb_inv_forward pb_sup_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.senderFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button>"   
                            //         }
                            //     }
                            //     else {
                            default:
                                return "<button class='btn btn-sm btn-primary pb_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.originFieldOfficeId+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success pb_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button> <button class='btn btn-sm btn-info pb_inv_worksheet pb_sup_worksheet' id='btn_worksheet' style='display:none;' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-docket='"+data.docketNumber+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-plus-circle'></i> Worksheet</button>";                                    
                                // }
                                // break;
                        };
                    }
                }
            ]
        }

        var type = ""; // Declare type in a proper scope
        var tableInv = document.getElementById('inv_tab');
        var tableSup = document.getElementById('sup_tab');

        // Function to initialize or reload the DataTable
        function drawTable(type, uuid) {
            // Check if DataTable has already been initialized
            if (!$.fn.DataTable.isDataTable('.table_head')) {
                // Initialize the DataTable
                $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": true,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "columnDefs": [
                        { "width": "5%", "targets": [0] },
                        { "width": "15%", "targets": [1] },
                        { "width": "15%", "targets": [2] },
                        { "width": "18%", "targets": [3] },
                        { "width": "12%", "targets": [4] },
                        { "width": "10%", "targets": [5] },
                        { "width": "35%", "targets": [6] }
                    ],
                    ajax: {
                        url: api + "8000/workflow/receiver/" + uuid + "?type=" + type,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,  // Pagination
                                size: d.length,            // Page size
                                // name: d.search.value    // Pass search term as 'keyword'
                            };
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call your function to get table columns
                });

                // Event listener for when the DataTable is drawn
                $('.table_head').on('draw.dt', function () {
                    buttonFunctionality();
                    buttonVisibility();
                    // show buttons for testing purposes only
                    $("#btn_upload").show();
                    $("#btn_return").show();
                    $("#btn_forward").show();
                    $("#btn_complete").show();
                });
            } else {
                // If DataTable is already initialized, reload it with new data
                $('.table_head').DataTable().ajax.url(api + "8000/workflow/receiver/" + uuid + "?type=" + type).load();
            }
        }

        // Check if the inventory tab is active on page load
        if (tableInv.classList.contains("active")) {
            type = "PIS_INV"; // Set type value for inventory
            drawTable(type, uuid); // Draw the table with the active tab's type
        }

        // Event listener for inventory tab click
        tableInv.addEventListener('click', function () {
            type = "PIS_INV"; // Set type for inventory
            drawTable(type, uuid); // Draw or reload the table
        });

        // Event listener for supply tab click
        tableSup.addEventListener('click', function () {
            type = "PIS_SUP"; // Set type for supply
            drawTable(type, uuid); // Draw or reload the table
        });

    } )( jQuery );