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

            __executeExternalGet('8000/workflow/sender/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_INV').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        // __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (result) {
                            // var fo = result.name;
                        // __executeExternalGet('http://localhost:8088/user/'+data.receiverId).done(function (result) {
                            $('.table_body').append("<tr>"+
                                "<td>"+data.id+"</td>"+
                                "<td>"+data.docketNumber+"</td>"+
                                "<td>"+data.fieldOfficeName+"</td>"+
                                "<td>"+data.details+"</td>"+
                                "<td>"+data.receiverName+"</td>"+
                                "<td>"+data.status+"</td>")
                        // })
                        // })
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
                        $(".btn_view").unbind("click").on("click", function(){
                            var id = $(this).data("id");
                            var docket_number = $(this).data("docket");
                            window.location.href = 'http://localhost/pis/sent_view?docket_number='+docket_number+'&id='+id;
                        })
                    }, 400);
                }
            })
        } 
        __table();

        var __table_sup = function(){
            $('.table_head_sup').DataTable().destroy();
            $('.table_body_sup').empty();

            __executeExternalGet('8000/workflow/sender/'+$.cookie("uuid")+'?page=0&size=100&type=PIS_SUP').done(function (result) {
                console.log("=====this is=====")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.content.forEach(function(data){
                        var receiver = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                        $('.table_body_sup').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.docketNumber+"</td>"+
                            "<td>"+data.fieldOfficeName+"</td>"+
                            "<td>"+data.details+"</td>"+
                            "<td>"+data.receiverName+"</td>"+
                            "<td>"+data.status+"</td>")
                    })
                    setTimeout(function () {
                        $(document).ready(function () {
                            $('.table_head_sup tbody tr').each(function (idx) {
                               $(this).children("td:eq(0)").html(idx + 1);
                            });
                            var table = $('.table_head_sup').DataTable({
                                order: [[0, 'asc']],
                                // "columnDefs": [
                                //     { "width": "30%", "targets": 6 }
                                // ]
                            });
                            $('.dataTables_length').addClass('bs-select');
                        }); 
                        $(".btn_view_sup").unbind("click").on("click", function(){
                            var id = $(this).data("id");
                            var docket_number = $(this).data("docket");
                            window.location.href = 'http://localhost/pis/sent_view?docket_number='+docket_number+'&id='+id;
                        })
                    }, 400);
                }
            })
        }
        __table_sup();

        var __select = function(){
            $('.field_office').empty();
            $('.field_office_update').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        console.log(data)
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.field_office_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();
    } )( jQuery );