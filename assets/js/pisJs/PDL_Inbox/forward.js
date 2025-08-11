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
        var roleName = localStorage.getItem("userRole")
        function GetURLParameter(sParam){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam)
                {
                    return decodeURIComponent(sParameterName[1]);
                }
            }
        }

        function __select(status) {
            console.log(status)
            if (status === "Approved" && (roleName === "TSD - Division Chief" || roleName === "TSD - Assistant Division Chief")) {
                $('.field_office_display').hide();
                $('.user_account').prop('disabled', false)
                __executeExternalGet(___ctx+'8088/user/list/206').done(function (result) {
                    if (result.status != "ERROR") {
                        $('.user_account').empty().append("<option selected disabled>Select User Account</option>");
                        result.forEach(function(data) {
                            var includeName = "TSD"
                            if (data.roleName.includes(includeName)) {
                                var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                $('.user_account').append(
                                    "<option value="+data.uuid+">"+fullname+"</option>");
                            }
                        });
                    } else {
                        console.log("failed fetching user list")
                        $(".user_display").hide()
                    }
                });
            } else if (status !== "Approved" ){
                console.log("Pending Status")
                $('.field_office_display').hide();
                $('.user_account').prop('disabled', false)
                // $('.field_office').empty().append("<option selected disabled>Loading ...</option>");
                __executeExternalGet(___ctx+'8088/user/list/206').done(function (result) {
                    if (result.status != "ERROR") {
                        $('.user_account').empty().append("<option selected disabled>Select User Account</option>");
                        result.forEach(function(data) {
                            var includeName = "TSD"
                            if (data.roleName.includes(includeName)) {
                                var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                $('.user_account').append(
                                    "<option value="+data.uuid+">"+fullname+"</option>");
                            }
                        });
                    } else {
                        console.log("failed fetching user list")
                        $(".user_display").hide()
                    }
                });
            } else {
                console.log("Approved Status")
                $('.field_office_display').show();
                $('.user_account').prop('disabled', true)
                $('.field_office').empty().append("<option selected disabled>Loading ...</option>");
                __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
                    if (result.status != "ERROR") {
                        $('.field_office').empty().append("<option selected disabled>Select Field Office</option>");
                        result.forEach(function(data){
                            $('.field_office').append(
                                "<option value="+data.id+">"+data.name+"</option>");
                        });
                        $('.field_office').on('change', function() {
                            $('.user_account').empty().append(`<option selected disabled>Loading ...</option>`);
                            $('.user_account').prop('disabled', false)
                            const dep_id = this.value
                            __executeExternalGet(___ctx+'8088/user/list/'+dep_id).done(function (result) {
                                if (result.status != "ERROR") {
                                    $('.user_account').empty().append("<option selected disabled>Select User Account</option>");
                                    result.forEach(function(data){
                                        var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                        if (data.roleName === "CLERK ACCOUNT") {
                                            $('.user_account').append(
                                                "<option value="+data.uuid+" data-fullname="+fullname+">"+fullname+"</option>");
                                        }
                                    });
                                } else {
                                    console.log("failed fetching user list")
                                    $(".user_display").hide()
                                }
                            });
                        });
                    } else {
                        console.log("failed fetching department list")
                    }
                })
            }
        }

        var transaction_number = GetURLParameter('transaction_number');
        var id = GetURLParameter('id');
        var type = GetURLParameter('client_type');
        var __fields = function(){
            __executeExternalGet(___ctx+'8000/workflow/'+id).done(function (result) {
                // console.log(result);
                var result = result.response;
                if (result.status != "ERROR") {
                    console.log(result)
                    __select(result.approvalStatus)
                    __executeExternalGet(___ctx+'8000/petitioner/'+result.petitionerId).done(function (resultPetitioner) {
                        var resultPetitioner = resultPetitioner.response;
                        console.log(resultPetitioner)
                        $(".name").text(resultPetitioner.firstName + " " + resultPetitioner.lastName)
                        var user_name = localStorage.getItem("userName")

                        $(".btn-confirm_forward").unbind("click").on("click", function(){
                            var fullname = $('.user_account option:selected').data('fullname');
                            function payloadWorkflow (approvalStatus) {
                                return {
                                    "type"                  : type,
                                    "transactionNumber"     : transaction_number,
                                    "petitionerId"          : resultPetitioner.id,
                                    "caseloadType"          : "",
                                    "senderId"              : $.cookie("uuid"),
                                    "senderName"            : "",
                                    "senderFieldOfficeId"   : $.cookie('field_office_id'),
                                    "senderFieldOfficeName" : "",
                                    "originFieldOfficeId"   : result.originFieldOfficeId,
                                    "originFieldOfficeName" : "",
                                    "receiverId"            : $(".user_account").val(),
                                    "receiverName"          : fullname,
                                    "fieldOfficeId"         : result.senderFieldOfficeId,
                                    "fieldOfficeName"       : "",
                                    "docketNumber"          : "",
                                    "details"               : $(".details").val(),
                                    "remarks"               : result.remarks,
                                    "approvalStatus"        : approvalStatus,
                                    "lastStatusUpdateDate"  : "",
                                    "createdBy"             : "",
                                    "createdDate"           : "",
                                    "updatedBy"             : "",
                                    "updatedDate"           : "",
                                    "status"                : true
                                }
                            }
                            let payload;
                            if (result.approvalStatus === "Approved") {
                                payload = payloadWorkflow("Approved")
                            } else {
                                payload = payloadWorkflow("New")
                            }
                            console.log(payload)
                            __executeExternalPost('8000/workflow/create',JSON.stringify(payload)).done(function (result) {
                                if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_forwarding').show();
                                    setTimeout(function () {
                                        $('#success_forwarding').hide();
                                        window.location.href=api+"/pis/pdl-receive";
                                    }, 2000);
                                }else{
                                    alert("failed")
                                }
                            })
                        })
                    })
                }else{
                    alert("failed")
                }
            })
        }
        // __fields();

        $(document).ready(function(){
            // ___updateStatusUponViewingDocket();
            __fields();
        })

    } )( jQuery );