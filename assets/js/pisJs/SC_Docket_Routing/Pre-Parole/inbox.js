    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;

        var __getContext = function() {
            return ___ctx;
        };

        var __setContext = function(newctx) {
            ___ctx = newctx;
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
            $("#btn_complete").unbind("click").on("click", function(){
                $(".completeModal").modal('show');
                var id = $(this).data("id");
                var docket_number = $(this).data("docket");
                $(".docket").html(docket_number)
                __executeExternalGet('8000/workflow/'+id).done(function (result) {
                    var result = result.response;
                    $(".btn_complete_confirm").unbind("click").on("click", function(){
                        // console.log('clicked')
                        console.log(result)
                        var payload = {
                            "type"                  : result.type,
                            "caseload_type"         : result.caseloadType,
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
                                            $('#completeModal_csup').modal('hide');
                                            $('#complete_success_csup').hide();
                                            window.location.reload(true);
                                        }, 1000);
                            }else{
                                alert("failed")
                            }
                        })
                    })
                })
            })
            $("#btn_return").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var fi = $(this).data("fi");
                var senderId = $(this).data("sender");
                window.location.href = api+'/pis/parolee_docket_return?docket_number='+docket_number+'&id='+id+'&fo='+fi+'&senderId='+senderId;
            })
            $("#btn_forward").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var fi = $(this).data("fi");
                var senderId = $(this).data("sender");
                window.location.href = 'http://localhost/pis/parolee_docket_forward?docket_number='+docket_number+'&id='+id+'&fo='+fi+'&senderId='+senderId;
            })
            $("#btn_upload").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("fi");
                window.location.href = api+'/pis/parolee_docket_uploads?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
            })
        }
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
                        { "width": "15%", "targets": [3] },
                        { "width": "15%", "targets": [4] },
                        { "width": "35%", "targets": [5] }
                        // { "width": "35%", "targets": [6] }
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

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
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
                        console.log(data)
                        switch (data.approvalStatus) {
                            case "COMPLETED":
                                var actions = "<h5>This Docket is Completed</h5>";
                                return actions;
                                break;
                            default:
                                var actions = "<button class='btn btn-sm btn-primary pr_inbox_upload' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-upload'></i> Attachments</button> <button class='btn btn-sm btn-danger pr_inbox_return' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pr_inbox_forward' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success pr_inbox_complete' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                return actions;
                                break;
                        };
                    }
                }
            ]
        }

        var tableInv = document.getElementById('inv_tab')
        if (tableInv.classList.contains("active")){
            var type = "SC_PPI_INV"
            drawTable(type,uuid)
        }

        tableInv.addEventListener('click', function () {
            var type = "SC_PPI_INV"
            drawTable(type,uuid)
        })

        var tableSup = document.getElementById('sup_tab')
        tableSup.addEventListener('click', function () {
            var type = "SC_PPI_SUP"
            drawTable(type,uuid)
        })

        var table_cinv = document.getElementById('cinv_tab')
        table_cinv.addEventListener('click', function(){
            var type = "SC_PPI_CSINV"
            drawTable(type,uuid)
        })

        var table_csup = document.getElementById('csup_tab')
        table_csup.addEventListener('click', function(){
            var type = "SC_PPI_CSUP"
            drawTable(type,uuid)
        })

    } )( jQuery );