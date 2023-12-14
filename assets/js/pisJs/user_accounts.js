( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        
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
                    "data": null,
                    "render": function (data, type, row, meta) {
                        let name;
                        if (data.suffixName == undefined){
                            name = data.firstName + " " + data.middleName + " " + data.lastName;
                            return name;
                        } else {
                            name = data.firstName + " " + data.middleName + " " + data.lastName + " " + data.suffixName;
                            return name;
                        }
                    }
                },
                {
                    "data": 'username'
                },
                {
                    "data": 'email'
                },
                {
                    "data": 'roleName'
                },
                {
                    "data": 'departmentName'
                },
                {
                    "data": 'accountStatus'
                },
                {
                    "data": 'uuid',
                    render: function(data, type, row) {
                        switch (row.accountStatus){
                            case "ACTIVE":
                                switch (row.isLocked){
                                    case true:
                                        return "<button class='btn btn-primary btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-success btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data+"'><i class='fa fa-unlock'></i> Lift</button>";
                                        break;
                                    case false:
                                        return "<button class='btn btn-primary btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                        break;
                                    default:
                                        return "<button class='btn btn-primary btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                        break;
                                };
                                break;
                            case "INACTIVE":
                                return "<button class='btn btn-primary btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-success btn_activate userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button>";
                                break;
                            case "REMOVED":
                                var status = "REMOVED";
                                return status;
                                break;
                            default:
                                return "<button class='btn btn-primary btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                break;
                        };
                    }
                }
            ]
        }


        function buttonFunctionality(){
            $(".btn_update").unbind("click").on("click", function(){
                var data_id = $(this).data("id");
                console.log(data_id)
                __executeExternalGet('8088/user/'+data_id).done(function (result) {
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

                            __executeExternalPost('8088/user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
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

                    __executeExternalPost('8088/user/active/'+data_id).done(function (result) {
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
                console.log(data_id)
                $(".btn_deactivate_confirm").unbind("click").on("click", function(){
                    console.log("clicked")
                    __executeExternalPost('8088/user/inactive/'+data_id).done(function (result) {
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

                    __executeExternalPost('8088/user/restrict/'+data_id).done(function (result) {
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

                    __executeExternalPost('8088/user/remove/'+data_id).done(function (result) {
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

                    __executeExternalPost('8088/user/lift/'+data_id).done(function (result) {
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

        function drawTable(name) {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "20%", "targets": 7 }
                    ],
                    ajax: {
                        url: api+'8088/user',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,
                                size: d.length,
                                name: searchBarContent,
                            };
                        },
                        dataFilter: function(data){
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    "columns": tableColumns()
                })
                $('.table_head').on('draw.dt', function() {
                    buttonFunctionality();
                });
            })
        }

        const searchBarValue = document.getElementById('searchBar');
        let searchBarContent;

        searchBarValue.addEventListener('keyup', function() {
            searchBarContent = searchBarValue.value;
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
            drawTable(searchBarContent);
        });

        drawTable(searchBarContent);

        var checkbox = document.getElementsByClassName("middleNameCheck")[0];
        checkbox.addEventListener("change", toggleCheckbox);
        var inputBoxMiddleName = document.getElementsByClassName("middleName")[0];

        function toggleCheckbox() {
            if (checkbox.checked) {
                console.log("The checkbox is checked.");
                inputBoxMiddleName.disabled = true;
                inputBoxMiddleName.placeholder = "N/A";
            } else {
                console.log("The checkbox is not checked.");
                inputBoxMiddleName.disabled = false;
                inputBoxMiddleName.placeholder = "e.g A.";
            }
        }


        var checkboxUpdate = document.getElementsByClassName("middleNameCheckUpdate")[0];
        checkboxUpdate.addEventListener("change", toggleCheckboxUpdate);
        var inputBoxMiddleNameUpdate = document.getElementsByClassName("middleName_update")[0];

        function toggleCheckboxUpdate() {
            if (checkboxUpdate.checked) {
                console.log("The checkbox is checked.");
                inputBoxMiddleNameUpdate.disabled = true;
                inputBoxMiddleNameUpdate.placeholder = "N/A";
            } else {
                console.log("The checkbox is not checked.");
                inputBoxMiddleNameUpdate.disabled = false;
                inputBoxMiddleNameUpdate.placeholder = "e.g A.";
            }
        }



        var __select = function(){
            $('.field_office').empty();
            $('.field_office_update').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
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

            __executeExternalGet('8088/role/list').done(function (result) {
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
            __executeExternalPost('8088/user/create',JSON.stringify(payload)).done(function (result) {
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

} )( jQuery );
