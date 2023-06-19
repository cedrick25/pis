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

        var __table_inv = function(){
            $('.table_head_inv').DataTable().destroy();
            $('.table_body_inv').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_INV').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            console.log(result)
                            var fo = result.name;
                            
                            // console.log(field_id)
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            console.log(result)
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            console.log(field)
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_inv pr_inv_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_inv pr_inv_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_inv pr_inv_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_inv pr_inv_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_inv'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_inv').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_inv tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_inv').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_inv").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_inv").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"          : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_inv').show();
                                                setTimeout(function () {
                                                    $('#completeModal_inv').modal('hide');
                                                    $('#complete_success_inv').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_inv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        // console.log(fi)
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_inv();

        var __table_cinv = function(){
            $('.table_head_cinv').DataTable().destroy();
            $('.table_body_cinv').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_CINV').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_cinv pr_cinv_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_cinv pr_cinv_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_cinv pr_cinv_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_cinv pr_cinv_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_cinv'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_cinv').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_cinv tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_cinv').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_cinv").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_cinv").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"         : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_cinv').show();
                                                setTimeout(function () {
                                                    $('#completeModal_cinv').modal('hide');
                                                    $('#complete_success_cinv').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_cinv").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_cinv();

        var __table_sup = function(){
            $('.table_head_sup').DataTable().destroy();
            $('.table_body_sup').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_SUP').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_sup pr_sup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_sup pr_sup_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_sup pr_sup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_sup pr_sup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_sup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_sup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_sup tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_sup').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_sup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_sup").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"         : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_sup').show();
                                                setTimeout(function () {
                                                    $('#completeModal_sup').modal('hide');
                                                    $('#complete_success_sup').hide();
                                                    window.location.reload(true);
                                                }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                    })

                    $(".btn_return_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id+'&type='+type;
                    })
                    $(".btn_forward_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_sup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_sup();

        var __table_csup = function(){
            $('.table_head_csup').DataTable().destroy();
            $('.table_body_csup').empty();

            __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=SC_PR_CSUP').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            var fo = result.name;
                        __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload_csup pr_csup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_csup pr_csup_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_csup pr_csup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_csup pr_csup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_csup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_csup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+fo+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td>"+data.status+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                            });
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head_csup tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_csup').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "40%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete_csup").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm_csup").unbind("click").on("click", function(){
                                console.log('clicked')
                                console.log(result.caseloadType)
                                var payload = {
                                    "type"                  : result.type,
                                    "caseloadType"          : result.caseloadType,
                                    "senderId"              : result.senderId,
                                    "receiverId"            : result.receiverId,
                                    "fieldOfficeId"         : result.fieldOfficeId,
                                    "docketNumber"          : result.docketNumber,
                                    "details"               : result.details,
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : "",
                                    "lastStatusUpdateDate"  : "",
                                }
                                console.log(payload)
                                __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#complete_success_csup').show();
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

                    $(".btn_return_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_forward_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
                    })
                    $(".btn_upload_csup").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var id = $(this).data("id");
                        var type = $(this).data("type");
                        var fi = $(this).data("fi");
                        window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                    })
                    }, 500);
                }
            })
        }
        __table_csup();


    } )( jQuery );