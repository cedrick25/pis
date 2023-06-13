( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)
        
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
            path = __getContext() + path;
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

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                "name"             : $(".user_role_name").val(),
                "description"      : $(".user_role_desc").val(),
                "parentId"         : "0",
                "departmentId"     : "0"
             }
             console.log(payload);

            __executeExternalPost('8088/role/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                        $('#newRoleModal').modal('hide');
                        $('#success').hide();
                            __table();
                        }, 1000);
                }else{
                    console.log("failed adding new department")
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('8088/role/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    result.forEach(function(data){
                        // console.log(data)
                        $('.table_body').append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.name+"</td>"+  
                            "<td>"+data.description+"</td>"+
                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateRoleModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button>"+
                            "<td align='center' class='actions' width='40%'> <button class='btn btn-sm btn-success btn_grant' type='submit' data-toggle='modal' data-target='#grantPermissionModal' data-id='"+data.id+"'><i class='fa fa-plus-circle'></i> Grant Permission</button> <button class='btn btn-sm btn-primary btn_grant_update' type='submit' data-toggle='modal' data-target='#updatePermissionModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update Permission</button>");
                    });
                } else {
                    console.log("failed fetching department list")
                }
                
                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_update").unbind("click").on("click", function(){
                    console.log("clicked button update")
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('8088/role/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".user_role_name_update").val(result.name);
                            $(".user_role_desc_update").val(result.description);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked btn update confirm')
                                var payload = {
                                    "name"             : $(".user_role_name_update").val(),
                                    "description"      : $(".user_role_desc_update").val(),
                                    "parentId"         : "0",
                                    "departmentId"     : "0"
                                }
                                console.log(payload);
                                __executeExternalPost('8088/role/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_update').show();
                                        setTimeout(function () {
                                            $('#success_update').hide();
                                            window.location.reload(true);
                                        }, 2000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })

                        }else{
                            alert("failed")
                        }
                    })
                })
                $(".btn_grant").unbind("click").on("click", function(){
                    console.log("clicked button grant")
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('8088/permission/list').done(function (result) {
                        // console.log(result);

                        $('.permission_list').empty();
                        if (result.status != "ERROR") {
                            result.forEach(function(data){

                                $('.permission_list').append(`
                                    <div class="col col-md-10"><label for="text-input" class=" form-control-label" style="display:block">${data.name}</label></div>
                                    <div class="col col-md-2">
                                        <div class="form-check form-check-inline">
                                        <label class="switch">
                                            <input type="checkbox" name="type" class="form-check-input primary" checked data-name="${data.name}" value="${data.id}">
                                            <span class="slider round"></span>
                                        </label>
                                        </div>
                                    </div>`);
                            });
                            
                        } else {
                            console.log("failed fetching department list")
                        }
                    });

                    $(".btn_grant_confirm").unbind("click").on("click", function(){
                        console.log('clicked btn grant confirm')
                        const sentence = [];
                        $("input:checkbox[name=type]:checked").each(function(){
                            var list = {
                              "id": $(this).val(),
                              "value": true,
                            }
                            sentence.push(list);
                        });
                        $("input:checkbox[name=type]:not(:checked)").each(function(){
                            var list = {
                              "id": $(this).val(),
                              "value": false,
                            }
                            sentence.push(list);
                        });

                        var payload = {
                            "roleId": data_id,
                            "permissionList": sentence
                        }
                        console.log(payload)
                        __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                                $('#success_grant').show();
                                setTimeout(function () {
                                    $('#success_grant').hide();
                                    window.location.reload(true);
                                }, 2000);
                            }else{
                            }
                        })   
                    })
                })
                $(".btn_grant_update").unbind("click").on("click", function(){
                    console.log("clicked button grant")
                    var data_id = $(this).data("id");
                    console.log(data_id)

                    __executeExternalGet('8088/role-permission/'+data_id).done(function (result_rp) {
                        console.log(result_rp);

                        $('.permission_list_update').empty();
                        if (result_rp.status != "ERROR") {
                            result_rp.permissionList.forEach(function(data){
                            console.log(data);
                            let value;
                            switch (data.value) {
                            case true:
                                value = "checked";
                                break;
                            default:
                                value = "";
                                break;
                            }

                            $('.permission_list_update').append(`
                                <div class="col col-md-10"><label for="text-input" class=" form-control-label" style="display:block">${data.name}</label></div>
                                <div class="col col-md-2">
                                    <div class="form-check form-check-inline">
                                    <label class="switch">
                                        <input type="checkbox" name="type" class="form-check-input primary" ${value} data-name="${data.name}" value="${data.id}">
                                        <span class="slider round"></span>
                                    </label>
                                    </div>
                                </div>`);
                            });
                            
                        } else {
                            console.log("failed fetching department list")
                        }
                    });

                    $(".btn_grant_confirm_update").unbind("click").on("click", function(){
                        console.log('clicked btn grant confirm')
                        const sentence = [];
                        $("input:checkbox[name=type]:checked").each(function(){
                            var list = {
                              "id": $(this).val(),
                              "value": true,
                              "name": $(this).data("name")
                            }
                            sentence.push(list);
                        });
                        $("input:checkbox[name=type]:not(:checked)").each(function(){
                            var list = {
                              "id": $(this).val(),
                              "value": false,
                              "name": $(this).data("name")
                            }
                            sentence.push(list);
                        });

                        var payload = {
                            "roleId": data_id,
                            "permissionList": sentence
                        }
                        console.log(payload)
                        __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                                $('#success_grant_update').show();
                                setTimeout(function () {
                                    $('#success_grant_update').hide();
                                    window.location.reload(true);
                                }, 2000);
                            }else{
                            }
                        })   
                    })
                })
            })
        }
        __table();


} )( jQuery );