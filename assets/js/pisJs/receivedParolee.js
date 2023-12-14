    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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
            $(".btn_complete").unbind("click").on("click", function(){
                var id = $(this).data("id");
                var docket_number = $(this).data("docket");
                $(".docket").html(docket_number)
                __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                    var result = result.response;
                    $(".btn_complete_confirm_csup").unbind("click").on("click", function(){
                        console.log('clicked')
                        var payload = {
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
                        __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
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
            $(".btn_return").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
            })
            $(".btn_forward").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
            })
            $(".btn_upload").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("fi");
                window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
            })
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
                        { "width": "200px", "targets": [1,2,3,4,5] },
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
                    if (type == "SC_PR_INV") {
                        $('#btn_upload').addClass('pr_inv_upload')
                        $('#btn_return').addClass('pr_inv_return')
                        $('#btn_forward').addClass('pr_inv_forward')
                        $('#btn_complete').addClass('pr_inv_complete')
                    } else if (type == "SC_PR_CINV") {
                        $('#btn_upload').addClass('pr_cinv_upload')
                        $('#btn_return').addClass('pr_cinv_return')
                        $('#btn_forward').addClass('pr_cinv_forward')
                        $('#btn_complete').addClass('pr_cinv_complete')
                    } else if (type == "SC_PR_SUP") {
                        $('#btn_upload').addClass('pr_sup_upload')
                        $('#btn_return').addClass('pr_sup_return')
                        $('#btn_forward').addClass('pr_sup_forward')
                        $('#btn_complete').addClass('pr_sup_complete')
                    } else if (type == "SC_PR_CSUP") {
                        $('#btn_upload').addClass('pr_csup_upload')
                        $('#btn_return').addClass('pr_csup_return')
                        $('#btn_forward').addClass('pr_csup_forward')
                        $('#btn_complete').addClass('pr_csup_complete')
                    } else {
                        alert("Error!")
                    }     
                });
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
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = "<button class='btn btn-sm btn-primary' id='btn_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.departmentId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger' id='btn_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info' id='btn_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success' id='btn_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                        };
                    }
                }
            ]
        }

        var tableInv = document.getElementById('inv_tab')
        if (tableInv.classList.contains("active")){
            $('.table_head').DataTable().destroy()
            $('#tableTitle').text("Investigation")
            var type = "SC_PR_INV"
            drawTable(type,uuid)
        }

        tableInv.addEventListener('click', function () {
            $('.table_head').DataTable().destroy()
            $('#tableTitle').text("Investigation")
            var type = "SC_PR_INV"
            drawTable(type,uuid)
        })

        var tableSup = document.getElementById('sup_tab')
        tableSup.addEventListener('click', function () {
            $('.table_head').DataTable().destroy()
            $('#tableTitle').text("Supervision")
            var type = "SC_PR_SUP"
            drawTable(type,uuid)
        })

        var table_cinv = document.getElementById('cinv_tab')
        table_cinv.addEventListener('click', function(){
            $('.table_head').DataTable().destroy()
            $('#tableTitle').text("Courtesy Investigation")
            var type = "SC_PR_CINV"
            drawTable(type,uuid)
        })

        var table_csup = document.getElementById('csup_tab')
        table_csup.addEventListener('click', function(){
            $('.table_head').DataTable().destroy()
            $('#tableTitle').text("Courtesy Supervision")
            var type = "SC_PR_CSUP"
            drawTable(type,uuid)
        })

    } )( jQuery );