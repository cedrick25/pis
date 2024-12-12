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

        var __userDropdownForForwarding = function (dep_id, userId, roleId, secRoleId) {
            __executeExternalGet('8088/user/list/'+dep_id).done(function (result) {
                if (result.status != "ERROR") {
                    $(".user_display").show()
                    $('.user_account').append("<option selected disabled>Select User Account</option>");
                    if (userId == $.cookie('role_id')) {
                        result.forEach(function(data){
                            var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                            if (userId == "32") {
                                if (data.roleId == roleId || data.roleId == secRoleId){
                                    $('.user_account').append(
                                        '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
                                    );   
                                }
                            } else if (userId == "14" || userId == "4"){
                                if (data.roleId == roleId){
                                    $('.user_account').append(
                                        '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
                                    );   
                                }
                            } else {
                                $('.user_account').append(
                                    '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
                                );
                            }
                        });
                    }
                } else {
                    console.log("failed fetching user list")
                    $(".user_display").hide()
                }
            });
        }

        var __select = function(){
            $('.field_office').empty();
            $(".docket_num").prop('disabled',true)
            $('.type').on('change', function() {
                $('.docket_num').empty();
                $(".docket_num").prop('disabled',false)
                const type = this.value
                __executeExternalGet('8000/docketbook/list/'+type+"/"+$.cookie("field_office_id")).done(function (result) {
                    if (result.status != "ERROR") {
                        $('.docket_num').append("<option selected disabled>Select Docket Number</option>");
                        result.response.forEach(function(data){
                            $('.docket_num').append(
                                "<option value="+data.docketNumber+" data-id="+data.type+">"+data.docketNumber+"</option>");
                        });
                    } else {
                        console.log("failed fetching docket number")
                    }
                });
            });

            $('.docket_num').on('change', function() {
                const docket_number = this.value
                __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                    var result = result.response;
                    if (result.status != "ERROR") {
                        var tcsi = "PROBATION_INV_TCSI"
                        var tpi = "PROBATION_INV_TPI"
                        var tssi = "PROBATION_INV_TSSI"
                        var tcss = "PROBATION_SUP_TCSS"
                        var tps = "PROBATION_SUP_TPS"
                        var tsss = "PROBATION_SUP_TSSS"
                        setTimeout(function () {
                            $(".caseload").val(result.caseloadType).trigger("change");
                        }, 500);
                        if (result.caseloadType != tcsi && result.caseloadType != tpi && result.caseloadType != tssi && result.caseloadType != tcss &&
                            result.caseloadType != tps && result.caseloadType != tsss){
                            setTimeout(function () {
                                $(".field_office").val(result.fieldOfficeId).trigger("change");
                            }, 500);
                        }
                        else {
                            setTimeout(function () {
                                $(".field_office").val('').trigger("change");
                            }, 500);
                        }
                    } else {
                        console.log("failed fetching docket number")
                    }
                });
            });
  
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled>Select Field Office</option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    $('.field_office').on('change', function() {
                        $('.user_account').empty();
                        const dep_id = this.value
                        var userId = $.cookie('role_id');
                        var roleId;
                        var secRoleId;
                        if (userId == "14") {
                            roleId = "32"
                            __userDropdownForForwarding(dep_id, userId, roleId)
                        } else if (userId == "32") {
                            roleId = "4"
                            secRoleId = "14"
                            __userDropdownForForwarding(dep_id, userId, roleId, secRoleId)
                        } else if (userId == "4") {
                            roleId = "32"
                            __userDropdownForForwarding(dep_id, userId, roleId)
                        } else {
                            __userDropdownForForwarding(dep_id, userId, roleId)
                        }
                        
                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
            console.log($.cookie('departmentName'), $.cookie('field_office_id'))
            var originFieldOfficeId = $.cookie('field_office_id');

            $(".btn-confirm_forward").unbind("click").on("click", function(){

                var fname = $('.user_account option:selected').data('fname');
                var mname = $('.user_account option:selected').data('mname');
                var lname = $('.user_account option:selected').data('lname');
                var sname = $('.user_account option:selected').data('sname');

                var receivername = fname + " " + mname + " " + lname + " " + sname;

                var payload = {
                    "type"                  : $('.type').val(),
                    "transactionNumber"     : "",
                    "caseloadType"          : $(".caseload").val(),
                    "senderId"              : $.cookie("uuid"),
                    "senderFieldOfficeId"   : $.cookie('field_office_id'),
                    "senderFieldOfficeName" : $.cookie('departmentName'),
                    "originFieldOfficeId"   : originFieldOfficeId,
                    // "originFieldOfficeName" : $.cookie('departmentName'),
                    "receiverId"            : $(".user_account").val(),
                    "receiverName"          : receivername,
                    "fieldOfficeId"         : $(".field_office").val(),
                    "docketNumber"          : $(".docket_num").val(),
                    "details"               : $(".details").val(),
                    "remarks"               : "",
                    "approvalStatus"        : "New - (Forwarded to CPPO)",
                    "lastStatusUpdateDate"  : "",
                }
                // console.log(payload)
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

        }
        __select();

    } )( jQuery );