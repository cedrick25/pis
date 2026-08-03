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
        var userRole = localStorage.getItem("userRole");
        var managerIds = [];
        try {
            var parsedManagerIds = JSON.parse(localStorage.getItem("managerId"));
            if (Array.isArray(parsedManagerIds)) {
                managerIds = parsedManagerIds;
            }
        } catch (e) {
            managerIds = [];
        }
        var selectPdl = function () {
            $(".pdl_client").prop("disabled", true)
            $(".field_office").prop("disabled", true)
            $(".user_account").prop("disabled", true)
            $(".subject").prop("disabled", true)
            $(".details").prop("disabled", true)
            $('.pdl_client_type').on('change', function() {
                var pdlType = $(this).val();
                var fieldOfficeid = "206";
                $('.pdl_client').empty().append(`<option value="" selected disabled>Loading ...</option>`)
                __executeExternalGet(`${___ctx}8000/petitioner/list?type=${pdlType}&officeId=${fieldOfficeid}`).done(function (result) {
                    if (result.status != "ERROR") {
                        $(".pdl_client").prop("disabled", false)
                        $('.pdl_client').empty().append(`<option value="" selected disabled>Select Client</option>`)
                        result.forEach(function(data){
                            console.log(data)
                            var fullname = data.firstName+" "+ data.middleName + " " + data.lastName+ " " + data.suffixName ;
                            if (userRole === "TSD - Staff" || userRole === "72" || userRole === 72) {
                                if (data.createdBy === $.cookie("uuid")) {
                                    $('.pdl_client').append(
                                    `<option value="${data.id}" data-fname="${data.firstName}" data-mname="${data.middleName}" data-lname="${data.lastName}" data-sname="${data.suffixName}"> ${fullname} </option>`);
                                } 
                            } else if (userRole === "TSD - Section Chief" || userRole === "75" || userRole === 75) {
                                for (var i = 0; i < managerIds.length; i++) {
                                    if (data.createdBy === managerIds[i]) {
                                        $('.pdl_client').append(
                                        `<option value="${data.id}" data-fname="${data.firstName}" data-mname="${data.middleName}" data-lname="${data.lastName}" data-sname="${data.suffixName}"> ${fullname} </option>`);
                                    }
                                }
                            } else {
                                $('.pdl_client').append(
                                `<option value="${data.id}" data-fname="${data.firstName}" data-mname="${data.middleName}" data-lname="${data.lastName}" data-sname="${data.suffixName}"> ${fullname} </option>`);
                            }
                        });
                    } else {
                        $('.pdl_client').empty().append(`<option value="" selected disabled>Error Fetching Data</option>`)
                    }
                })
                $(".pdl_client").on('change', function() {
                    $(".user_account").prop("disabled", false)
                    $('.user_account').empty().append("<option selected disabled>Loading ...</option>");
                    __executeExternalGet(___ctx+'8088/user/list/206').done(function (result) {
                        if (result.status != "ERROR") {
                            $('.user_account').empty().append("<option selected disabled>Select User Account</option>");
                            result.forEach(function(data) {
                                var includeName = "TSD"
                                if (data.roleName.includes(includeName)) {
                                    var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                    $('.user_account').append(
                                        "<option value="+data.uuid+" data-oid="+data.departmentId+">"+fullname+"</option>");
                                }
                            });
                        } else {
                            console.log("failed fetching user list")
                            $(".user_display").hide()
                        }
                    });
                })
                
                $('.user_account').on('change', function() {
                    $(".subject").prop("disabled", false)
                    $(".details").prop("disabled", false)
                })
            })
        }

        selectPdl();
        var originFieldOfficeId = $.cookie('field_office_id');
        var user_name = localStorage.getItem("userName");

        $(".btn-confirm_forward").unbind("click").on("click", function(){
            
            var fname = $('.user_account option:selected').data('fname');
            var mname = $('.user_account option:selected').data('mname');
            var lname = $('.user_account option:selected').data('lname');
            var sname = $('.user_account option:selected').data('sname');
            var receiverFieldOfficeId = $('.user_account option:selected').data('oid');

            var receivername = fname + " " + mname + " " + lname + " " + sname;

            var payload = {
                "type"                  : $(".pdl_client_type").val(),
                "transactionNumber"     : "",
                "petitionerId"          : $(".pdl_client").val(),
                "caseloadType"          : "",
                "senderId"              : $.cookie("uuid"),
                "senderName"            : user_name,
                "senderFieldOfficeId"   : $.cookie('field_office_id'),
                "senderFieldOfficeName" : "",
                "originFieldOfficeId"   : originFieldOfficeId,
                "originFieldOfficeName" : "",
                "receiverId"            : $(".user_account").val(),
                "receiverName"          : receivername,
                "fieldOfficeId"         : receiverFieldOfficeId,
                "fieldOfficeName"       : "",
                "docketNumber"          : "",
                "details"               : $(".details").val(),
                "remarks"               : $(".subject").val(),
                "approvalStatus"        : "New",
                "lastStatusUpdateDate"  : "",
                "id"                    : "",
                "createdBy"             : "",
                "createdDate"           : "",
                "updatedBy"             : "",
                "updatedDate"           : "",
                "status"                : true
            }
            __executeExternalPost('8000/workflow/create',JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                $(".form-control").val('');
                $('#success_forwarding').show();
                    setTimeout(function () {
                        $('#success_forwarding').hide();
                        window.location.reload(true);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })
        // }
        // __select();

    } )( jQuery );