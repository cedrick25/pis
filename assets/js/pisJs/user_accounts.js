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
                    data: null,
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
                    },
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
                                        return "<button class='btn btn-primary btn-sm btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-success btn-sm btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data+"'><i class='fa fa-unlock'></i> Lift</button>";
                                        break;
                                    case false:
                                        return "<button class='btn btn-primary btn-sm btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn-sm btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn-sm btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn-sm btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                        break;
                                    default:
                                        return "<button class='btn btn-primary btn-sm btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn-sm btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn-sm btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn-sm btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                        break;
                                };
                                break;
                            case "INACTIVE":
                                return "<button class='btn btn-primary btn-sm btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-success btn_activate btn-sm userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data+"'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-danger btn-sm btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button>";
                                break;
                            case "REMOVED":
                                var status = "REMOVED";
                                return status;
                                break;
                            default:
                                return "<button class='btn btn-primary btn-sm btn_update viewUser' type='submit' data-toggle='modal' data-target='#updateUserModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-danger btn-sm btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data+"'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-danger btn-sm btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-danger btn-sm btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data+"'><i class='fa fa-lock'></i> Restrict</button>";
                                break;
                        };
                    }
                }
            ]
        }

        let middleNameCheckBoxValue = "false";

        function toggleCheckbox() {
            if (checkbox.checked) {
                inputBoxMiddleName.disabled = true;
                inputBoxMiddleName.placeholder = "N/A";
                middleNameCheckBoxValue = "true"
            } else {
                inputBoxMiddleName.disabled = false;
                inputBoxMiddleName.placeholder = "";
                middleNameCheckBoxValue = "false"
            }
        }

        function toggleCheckboxUpdate() {
            if (checkboxUpdate.checked) {
                inputBoxMiddleNameUpdate.disabled = true;
                inputBoxMiddleNameUpdate.placeholder = "N/A";
            } else {
                inputBoxMiddleNameUpdate.disabled = false;
                inputBoxMiddleNameUpdate.placeholder = "e.g A.";
            }
        }

        var checkbox = document.getElementsByClassName("middleNameCheck")[0];
        checkbox.addEventListener("change", toggleCheckbox);
        var inputBoxMiddleName = document.getElementsByClassName("middleName")[0];

        var checkboxUpdate = document.getElementsByClassName("middleNameCheckUpdate")[0];
        checkboxUpdate.addEventListener("change", toggleCheckboxUpdate);
        var inputBoxMiddleNameUpdate = document.getElementsByClassName("middleName_update")[0];

        var __select = function(dropdown, office) {
            $(`.${dropdown}`).empty().append("<option selected disabled>Loading ...</option>");
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $(`.${dropdown}`).empty().append("<option selected disabled>Select Field Office</option>");
                    result.forEach(function(data){
                        var selected = office === data.id ? "selected" : "";
                        $(`.${dropdown}`).append(
                            `<option value="${data.id}" ${selected}>${data.name}</option>`);
                    });
                } else {
                    $(`.${dropdown}`).empty().append("<option selected disabled>Failed Loading Field Offices</option>");
                }
            })
        }
        var selectManager = function(dropdown, managerIds) {
            // If managerIds is a JSON string, parse it
            if (typeof managerIds === "string") {
                try {
                    managerIds = JSON.parse(managerIds);
                } catch (e) {
                    managerIds = [managerIds]; // fallback if it's just a single value
                }
            }

            // Ensure it's always an array
            if (!Array.isArray(managerIds)) {
                managerIds = [managerIds];
            }

            $(`.${dropdown}`).empty().append("<option selected disabled value=''>Loading ...</option>");

            __executeExternalGet('8088/user/list').done(function (result) {
                if (result.status != "ERROR") {
                    $(`.${dropdown}`).empty();

                    result.forEach(function(data) {
                        var name = `${data.firstName} ${data.middleName || ""} ${data.lastName} ${data.suffix || ""}`.trim();
                        var selected = managerIds.includes(data.uuid) ? "selected" : "";
                        $(`.${dropdown}`).append(
                            `<option value="${data.uuid}" ${selected}>${name}</option>`
                        );
                    });

                    // If using Select2, refresh the selection
                    if ($(`.${dropdown}`).data('select2')) {
                        $(`.${dropdown}`).trigger('change');
                    }
                } else {
                    console.log("failed fetching user list");
                }
            });
        };
        var __select_user_roles = function(dropdown, role){
            // console.log(role)
            $(`.${dropdown}`).empty().append("<option selected disabled>Loading ...</option>");
            __executeExternalGet('8088/role/list').done(function (result) {
                if (result.status != "ERROR") {
                    $(`.${dropdown}`).empty().append("<option value='' selected disabled>Select User Roles</option>");
                    result.forEach(function(data){
                        var selected = role == data.id ? "selected" : "";
                        $(`.${dropdown}`).append(
                            `<option value="${data.id}" ${selected} data-name="${data.name}">${data.name}</option>`);
                    });

                    $(`.${dropdown}`).on('change', function() {
                        var userRoleName = $(`.${dropdown} option:selected`).data('name');
                        var userRoleId = this.value;
                        if (dropdown === "user_roles" && userRoleName === "TSD - Section Chief" & userRoleId === "75") {
                            $(".managerFieldCreate").show();
                        } else if (dropdown === "user_roles_update" && userRoleName === "TSD - Section Chief" && userRoleId === "75") {
                            $(".managerFieldUpdate").show();
                        } else {
                            $(".managerFieldUpdate").hide();
                            $(".managerFieldCreate").hide();
                        }
                    })
                } else {
                    console.log("failed fetching department list")
                }
            })
        }


        function buttonFunctionality(){
            $(".btn_update").unbind("click").on("click", function(){
                var data_id = $(this).data("id");
                __executeExternalGet('8088/user/'+data_id).done(function (result) {
                    if (result.status != "ERROR") {
                        __select("field_office_update", result.departmentId)
                        __select_user_roles("user_roles_update", result.roleId)
                        $(".firstName_update").val(result.firstName);
                        $(".middleName_update").val(result.middleName === "N/A" ? "" : result.middleName);
                        if ($(".middleName_update").val() === "" || $(".middleName_update").val() === "N/A") {
                            $(".middleNameCheckUpdate").first().prop("checked", true); // works
                            inputBoxMiddleNameUpdate.disabled = true;
                            inputBoxMiddleNameUpdate.placeholder = "N/A";
                            middleNameCheckBoxValue = "true"
                        }
                        $(".lastName_update").val(result.lastName);
                        $(".suffix_update").val(result.suffix === "N/A" ? "" : result.suffix);
                        $(".userName_update").val(result.username);
                        $(".email_update").val(result.email);
                        $(".num_update").val(result.phoneNumber === "N/A" ? "" : result.phoneNumber);
                        $(".birthday_update").val(result.birthday);
                        $(".password_update").val(result.password);

                        setTimeout (function () {
                            var userRoleNameUpdate = $(`.user_roles_update option:selected`).data('name');
                            var userRoleIdUpdate = $(`.user_roles_update`).val();
                            if (userRoleNameUpdate === "TSD - Section Chief" && userRoleIdUpdate === "75") {
                                $(".managerFieldUpdate").show();
                            } else {
                                $(".managerFieldUpdate").hide();
                            }
                        }, 100)

                        setTimeout (function () {selectManager("manager_update", result.managerId)},1000)

                        $(".btn_confirm_update").unbind("click").on("click", function(){
                            let required;
                            $(".errorRequired").remove();

                            if (middleNameCheckBoxValue === "false") {
                                required = ["firstName_update", "middleName_update", "lastName_update", "userName_update", "email_update", "field_office_update", "user_roles_update"]
                            } else {
                                required = ["firstName_update", "lastName_update", "userName_update", "email_update", "field_office_update", "user_roles_update"]
                            }

                            required.forEach(function (data) {
                                if ($("." + data).val() == "" || $("." + data).val() == null) {
                                    $("." + data).addClass("error_field");
                                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter("." + data);
                                } else {
                                    $("." + data).removeClass("error_field");
                                }
                            });

                            var requiredFields = $(".errorRequired:visible").length;
                            console.log("Number of required fields: " + requiredFields);

                            if (requiredFields === 0) {
                                let managerIdPayload = "";

                                if ($(".user_roles_update").val() === "72") {
                                    // var userUuid = $.cookie("uuid");
                                    managerIdPayload = JSON.stringify([`${data_id}`])
                                } else {
                                    managerIdPayload = JSON.stringify($(".manager_update").val())
                                }
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
                                    "managerId"     : managerIdPayload,
                                }
                                __executeExternalPost('8088/user/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_update').show();
                                        setTimeout(function () {
                                            $('#updateUserModal').modal('hide');
                                            $('#success_update').hide();
                                            // __table();

                                            setTimeout(function () {
                                                $('.table_head').DataTable().ajax.reload(null, false);
                                            }, 500);
                                        }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            }
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
                                                $('.table_head').DataTable().ajax.reload(null, false);
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
                                            $('.table_head').DataTable().ajax.reload(null, false);
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
                                            $('.table_head').DataTable().ajax.reload(null, false);
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
                                            $('.table_head').DataTable().ajax.reload(null, false);
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
                                            $('.table_head').DataTable().ajax.reload(null, false);
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

        function drawTable() {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "searching": true,
                    "columnDefs": [
                        { "width": "5%", "targets": 0 },
                        { "width": "15%", "targets": 1 },
                        { "width": "10%", "targets": 3 },
                        { "width": "15%", "targets": 4 },
                        { "width": "15%", "targets": 5 },
                        { "width": "7%", "targets": 6 },
                        { "width": "33%", "targets": 7 }
                    ],
                    ajax: {
                        url: api+'8088/user',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,
                                size: d.length,
                                name: name,
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
        drawTable();

        $(".btn-newUser").unbind("click").on("click", function(){
            $(".errorRequired").remove();
            const resetFields = ["firstName", "middleName", "lastName", "username", "email", "field_office", "user_roles", "password", "suffix", "num", "birthday"];
            resetFields.forEach(function (data) {
                $("." + data).val("");
            });
            $("#newUserModal").modal("show")
            selectManager("manager")
            __select("field_office")
            __select_user_roles("user_roles")
        })

        $(".btn-confirm").unbind("click").on("click", function(){
            let required;
            $(".errorRequired").remove();

            if (middleNameCheckBoxValue === "false") {
                required = ["firstName", "middleName", "lastName", "username", "email", "field_office", "user_roles", "password"]
            } else {
                required = ["firstName", "lastName", "username", "email", "field_office", "user_roles", "password"]
            }

            required.forEach(function (data) {
                if ($("." + data).val() == "" || $("." + data).val() == null) {
                    $("." + data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter("." + data);
                } else {
                    $("." + data).removeClass("error_field");
                }
            });

            var requiredFields = $(".errorRequired:visible").length;
            console.log("Number of required fields: " + requiredFields);

            if (requiredFields === 0) {
                let managerIdPayload = "";

                if ($(".user_roles").val() === "TSD - Staff") {
                    managerIdPayload = JSON.stringify([$.cookie("uuid")])
                } else {
                    managerIdPayload = JSON.stringify($(".manager").val())
                }
                var payload = {
                        "updatedBy"     : "",
                        "updatedDate"   : "",
                        "firstName"     : $(".firstName").val(),
                        "middleName"    : $(".middleName").val() || "",
                        "lastName"      : $(".lastName").val(),
                        "suffix"        : $(".suffix").val() || "",
                        "corpKey"       : "",
                        "username"      : $(".username").val(),
                        "email"         : $(".email").val(),
                        "phoneNumber"   : $(".num").val() || "",
                        "birthday"      : $(".birthday").val(),
                        "password"      : $(".password").val(),
                        "departmentId"  : $(".field_office").val(),
                        "roleId"        : $(".user_roles").val(),
                        "managerId"     : managerIdPayload
                    }
                __executeExternalPost('8088/user/create',JSON.stringify(payload)).done(function (result) {
                    if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                        setTimeout(function () {
                            $('#newUserModal').modal('hide');
                            $('#success').hide();
                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 500);
                        }, 1000);
                    }else{
                        alert("Please Try Again! Refreshing the page")
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 500);
                    }
                })   
            }
        })

} )( jQuery );
