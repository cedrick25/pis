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

        var __select = function(){
            $('.field_office').empty();
            $('.field_office_update').empty();

            __executeExternalGet('http://ppis.probation.gov.ph:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
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

        var __select_user_roles = function(){
            $('.user_roles').empty();
            $('.user_roles_update').empty();

            __executeExternalGet('http://ppis.probation.gov.ph:8088/role/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.user_roles').append("<option selected disabled> - - Select User Roles - - </option>");
                    $('.user_roles_update').append("<option selected disabled> - - Select User Roles - - </option>");
                    result.forEach(function(data){
                        $('.user_roles').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.user_roles_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select_user_roles();

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')
            var payload = {
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "firstName"     : $(".firstName").val(),
                    "middleName"    : $(".middleName").val(),
                    "lastName"      : $(".lastName").val(),
                    "suffix"        : $(".suffix").val(),
                    "corpKey"       : "",
                    "username"      : $(".username").val(),
                    "email"         : $(".email").val(),
                    "phoneNumber"   : $(".num").val(),
                    "birthday"      : $(".birthday").val(),
                    "password"      : $(".password").val(),
                    "departmentId"  : $(".field_office").val(),
                    "roleId"        : $(".user_roles").val(),
                }
            console.log(payload);
            __executeExternalPost('http://ppis.probation.gov.ph:8088/user/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#newUserModal').modal('hide');
                        $('#success').hide();
                            // __table();
                                                
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                    }, 1000);
                }else{
                //     console.log(result.status);
                //     alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://ppis.probation.gov.ph:8088/user?page=0&size=50').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")

                
                    if (result.status != "ERROR") {
                            
                                result.content.forEach(function(data){
                                    var status;
                                    let actions;
                                    switch (data.accountStatus) {
                                    case "ACTIVE":
                                            switch (data.isLocked) {
                                            case true:
                                                status = "RESTRICTED"
                                                actions = "<button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                                                break;
                                            case false:
                                                status = "ACTIVE"
                                                actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                                break;
                                            default:
                                                status = "ACTIVE"
                                                actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button>";
                                                break;
                                            };
                                        break;
                                    case "INACTIVE":
                                        status = "INACTIVE"
                                        actions = "<button class='btn btn-sm btn-success btn_activate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button>";
                                        break;
                                    case "REMOVED":
                                        status = "REMOVED"
                                        actions = "";
                                        break;
                                    default:
                                        status = "ACTIVE"
                                        actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data.uuid+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"'><i class='fa fa-unlock'></i> Lift</button>";
                                        break;
                                    };
                                    
                                        $('.table_body').append("<tr>"+
                                            "<td></td>"+
                                            "<td>"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix+"</td>"+
                                            "<td>"+data.username+"</td>"+
                                            "<td>"+data.email+"</td>"+
                                            "<td value="+data.roleId+">"+data.roleName+"</td>"+
                                            "<td>"+data.departmentName+"</td>"+
                                            "<td>"+status+"</td>"+
                                            "<td align='center' class='actions'> "+actions+"")
                                        
                                        
                                    });
                                $(document).ready(function () {
                                $('.table_head tbody tr').each(function (idx) {
                                   $(this).children("td:eq(0)").html(idx + 1);
                                });
                                var table = $('.table_head').DataTable({
                                    order: [[0, 'asc']],
                                    "columnDefs": [
                                        { "width": "30%", "targets": 7 }
                                    ]
                                });
                                $('.dataTables_length').addClass('bs-select');
                            });



                        $(".btn_update").unbind("click").on("click", function(){
                            var data_id = $(this).data("id");
                            console.log(data_id)
                            __executeExternalGet('http://ppis.probation.gov.ph:8088/user/'+data_id).done(function (result) {
                                console.log(result);
                                if (result.status != "ERROR") {
                                    $(".firstName_update").val(result.firstName);
                                    $(".middleName_update").val(result.middleName);
                                    $(".lastName_update").val(result.lastName);
                                    $(".suffix_update").val(result.suffix);
                                    $(".userName_update").val(result.username);
                                    $(".email_update").val(result.email);
                                    $(".num_update").val(result.phoneNumber);
                                    $(".birthday_update").val(result.birthday);
                                    $(".password_update").val(result.password);
                                    setTimeout(function() {
                                        $(".field_office_update").val(result.departmentId).trigger('change');
                                        $(".user_roles_update").val(result.roleId).trigger('change');
                                    },1500);
                                    console.log(result.departmentId);

                                    $(".btn_confirm_update").unbind("click").on("click", function(){
                                        console.log('clicked')
                                        var payload = {
                                            "firstName"     : $(".firstName_update").val(),
                                            "middleName"    : $(".middleName_update").val(),
                                            "lastName"      : $(".lastName_update").val(),
                                            "suffix"        : $(".suffix_update").val(),
                                            "corpKey"       : "",
                                            "username"      : $(".userName_update").val(),
                                            "email"         : $(".email_update").val(),
                                            "phoneNumber"   : $(".num_update").val(),
                                            "birthday"      : $(".birthday_update").val(),
                                            "password"      : $(".password_update").val(),
                                            "departmentId"  : $(".field_office_update").val(),
                                            "roleId"        : $(".user_roles_update").val(),
                                        }

                                        __executeExternalPost('user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                            console.log(result);
                                            if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_update').show();
                                                setTimeout(function () {
                                                    $('#updateUserModal').modal('hide');
                                                    $('#success_update').hide();
                                                    // __table();

                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
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
                        $(".btn_activate").unbind("click").on("click", function(){
                            var data_id     = $(this).data("id");

                            $(".btn_activate_confirm").unbind("click").on("click", function(){

                                __executeExternalPost('user/active/'+data_id).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_activated').show();
                                                setTimeout(function () {
                                                    $('#activateModal').modal('hide');
                                                    $('#success_activated').hide();
                                                    // __table();
                                                    
                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
                                            
                                        // $(".form-control").val('');
                                        // $('#activateModal').modal('hide');
                                        // __table();
                                    }else{
                                        alert("failed")
                                    }
                                })

                            })
                        })
                        $(".btn_deact").unbind("click").on("click", function(){
                            var data_id     = $(this).data("id");

                            $(".btn_deactivate_confirm").unbind("click").on("click", function(){

                                __executeExternalPost('user/inactive/'+data_id).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_deactivate').show();
                                                setTimeout(function () {
                                                    $('#deactivateModal').modal('hide');
                                                    $('#success_deactivate').hide();
                                                    // __table();
                                                    
                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
                                        // $(".form-control").val('');
                                        // $('#deactivateModal').modal('hide');
                                        // __table();
                                    }else{
                                        alert("failed")
                                    }
                                })

                            })
                        })
                        $(".btn_restrict").unbind("click").on("click", function(){
                            var data_id     = $(this).data("id");

                            $(".btn_restrict_confirm").unbind("click").on("click", function(){

                                __executeExternalPost('user/restrict/'+data_id).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_restrict').show();
                                                setTimeout(function () {
                                                    $('#restrictModal').modal('hide');
                                                    $('#success_restrict').hide();
                                                    // __table();

                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
                                            
                                        // $(".form-control").val('');
                                        // $('#restrictModal').modal('hide');
                                        // __table();
                                    }else{
                                        alert("failed")
                                    }
                                })

                            })
                        })
                        $(".btn_remove").unbind("click").on("click", function(){
                            var data_id     = $(this).data("id");

                            $(".btn_remove_confirm").unbind("click").on("click", function(){

                                __executeExternalPost('user/remove/'+data_id).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_remove').show();
                                                setTimeout(function () {
                                                    $('#removeModal').modal('hide');
                                                    $('#success_remove').hide();
                                                    // __table();
                                                    
                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
                                            
                                        // $(".form-control").val('');
                                        // $('#removeModal').modal('hide');
                                        // __table();
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })
                        })
                        $(".btn_lift").unbind("click").on("click", function(){
                            var data_id     = $(this).data("id");
                            console.log(data_id)
                            $(".btn_lift_confirm").unbind("click").on("click", function(){

                                __executeExternalPost('user/lift/'+data_id).done(function (result) {
                                    if (result.status != "ERROR") {
                                            $(".form-control").val('');
                                            $('#success_lift').show();
                                                setTimeout(function () {
                                                    $('#liftModal').modal('hide');
                                                    $('#success_lift').hide();
                                                    // __table();
                                                    
                                                    setTimeout(function () {
                                                        window.location.reload(true);
                                                    }, 500);
                                                }, 1000);
                                            
                                        // $(".form-control").val('');
                                        // $('#liftModal').modal('hide');
                                        // __table();
                                    }else{
                                        alert("failed")
                                    }
                                })

                            })
                        })
                    }

            })
        }
        __table();

} )( jQuery );
