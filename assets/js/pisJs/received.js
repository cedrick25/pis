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

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_INV').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload pb_inv_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return pb_inv_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward pb_inv_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete pb_inv_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+data.fieldOfficeName+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
                        });
                    });
                    setTimeout(function () {
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "40%", "targets": 5 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm").unbind("click").on("click", function(){
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
                                console.log(payload)
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
                    }, 1000);
                }
            })
        }
        __table();

        var __tablesup = function(){
            $('.table_head_sup').DataTable().destroy();
            $('.table_body_sup').empty();

            __executeExternalGet('8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_SUP').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        __executeExternalGet('8088/user/'+data.senderId).done(function (result) {
                            var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                            var field = result.departmentId;
                            let actions;
                            switch (data.approvalStatus) {
                            case "COMPLETED":
                                actions = "<h5>This Docket is Completed</h5>";
                                break;
                            default:
                                actions = " <button class='btn btn-sm btn-primary btn_upload pb_sup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return pb_sup_return' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward pb_sup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete pb_sup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
                                break;
                            };
                            $('.table_body_sup').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+data.fieldOfficeName+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+senderId+"</td>"+
                                "<td align='center' class='actions'>"+actions+"")
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
                            //     { "width": "40%", "targets": 5 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 

                    $(".btn_complete").unbind("click").on("click", function(){
                        var id = $(this).data("id");
                        var docket_number = $(this).data("docket");
                        $(".docket").html(docket_number)
                        __executeExternalGet('8000/workflow/'+id).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            $(".btn_complete_confirm").unbind("click").on("click", function(){
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
                                console.log(payload)
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
                    }, 1000);
                }
            })
        }
        __tablesup();




















        // var __table_sup = function(){
        //     $('.table_head_sup').DataTable().destroy();
        //     $('.table_body_sup').empty();

        //     __executeExternalGet('http://localhost:8000/workflow/receiver/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_SUP').done(function (result) {
        //         console.log("==========")
        //         console.log(result)
        //         console.log("==========")
        //         if (result.status != "ERROR") {
        //             result.content.forEach(function(data){
        //                 __executeExternalGet('http://localhost:8088/user/'+data.senderId).done(function (result) {
        //                     var senderId = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
        //                     var field = result.departmentId;
        //                     let actions;
        //                     switch (data.approvalStatus) {
        //                     case "COMPLETED":
        //                         actions = "<h5>This Docket is Completed</h5>";
        //                         break;
        //                     default:
        //                         actions = " <button class='btn btn-sm btn-primary btn_upload_sup pb_sup_upload' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+field+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger btn_return_sup' style='display:none;' pb_sup_return type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info btn_forward_sup pb_sup_forward' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success btn_complete_sup pb_sup_complete' style='display:none;' type='submit' data-toggle='modal' data-target='#completeModal_sup'data-docket='"+data.docketNumber+"' data-id='"+data.id+"'><i class='fa fa-check-circle'></i> Complete</button>";
        //                         break;
        //                     };
        //                     $('.table_body_sup').append("<tr>"+
        //                         "<td></td>"+
        //                         "<td>"+data.docketNumber+"</td>"+
        //                         "<td>"+data.fieldOfficeName+"</td>"+
        //                         "<td>"+data.details+"</td>"+
        //                         "<td>"+senderId+"</td>"+
        //                         "<td align='center' class='actions' width='40%'>"+actions+"")
        //                     });
        //             });
        //             // setTimeout(function () {
        //             $(document).ready(function () {
        //                 $('.table_head_sup tbody tr').each(function (idx) {
        //                    $(this).children("td:eq(0)").html(idx + 1);
        //                 });
        //                 var table = $('.table_head_sup').DataTable({
        //                     order: [[0, 'asc']],
        //                     // "columnDefs": [
        //                     //     { "width": "40%", "targets": 6 }
        //                     // ]
        //                 });
        //                 $('.dataTables_length').addClass('bs-select');
        //             }); 

        //             $(".btn_complete_sup").unbind("click").on("click", function(){
        //                 var id = $(this).data("id");
        //                 var docket_number = $(this).data("docket");
        //                 $(".docket").html(docket_number)
        //                 __executeExternalGet('http://localhost:8000/workflow/'+id).done(function (result) {
        //                     console.log(result)
        //                     var result = result.response;
        //                     $(".btn_complete_confirm_sup").unbind("click").on("click", function(){
        //                         console.log('clicked sup')

        //                         var payload = {
        //                             "type"                  : result.type,
        //                             "caseload_type"         : result.caseloadType,
        //                             "senderId"              : result.senderId,
        //                             "receiverId"            : result.receiverId,
        //                             "fieldOfficeId"         : result.fieldOfficeId,
        //                             "docketNumber"          : result.docketNumber,
        //                             "details"               : result.details,
        //                             "remarks"               : result.remarks,
        //                             "approvalStatus"        : "",
        //                             "lastStatusUpdateDate"  : "",
        //                         }
        //                         console.log(payload)
        //                         __executeExternalPost('http://localhost:8000/workflow/complete/'+id,JSON.stringify(payload)).done(function (result) {
        //                             if (result.status != "ERROR") {
        //                                     $(".form-control").val('');
        //                                     $('#complete_success_sup').show();
        //                                         setTimeout(function () {
        //                                             $('#completeModal_sup').modal('hide');
        //                                             $('#complete_success_sup').hide();
        //                                             window.location.reload(true);
        //                                         }, 1000);
        //                             }else{
        //                                 alert("failed")
        //                             }
        //                         })
        //                     })
        //                 })
        //             })
        //             $(".btn_return_sup").unbind("click").on("click", function(){
        //                 var id = $(this).data("id");
        //                 var docket_number = $(this).data("docket");
        //                 window.location.href = 'http://localhost/pis/return?docket_number='+docket_number+'&id='+id;
        //             })
        //             $(".btn_forward_sup").unbind("click").on("click", function(){
        //                 var id = $(this).data("id");
        //                 var docket_number = $(this).data("docket");
        //                 window.location.href = 'http://localhost/pis/forward?docket_number='+docket_number+'&id='+id;
        //             })
        //             $(".btn_upload_sup").unbind("click").on("click", function(){
        //                 var id = $(this).data("id");
        //                 var type = $(this).data("type");
        //                 var docket_number = $(this).data("docket");
        //                 var fi = $(this).data("fi");
        //                 window.location.href = 'http://localhost/pis/upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
        //             })
        //             // }, 1000);
        //         }
        //     })
        // }
        
        // // $(".sup_tab").unbind("click").on("click", function(){
        //     __table_sup();
        // })

    } )( jQuery );