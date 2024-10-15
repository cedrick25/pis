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

    var __userDropdownForForwarding = function (dep_id, userId, roleId, secRoleId) {
        __executeExternalGet(___ctx+'8088/user/list/'+dep_id).done(function (result) {
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

        __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.field_office').append("<option selected disabled>Select Field Office</option>");
                result.forEach(function(data){
                    $('.field_office').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
                $('.field_office').on('change', function() {
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
    }
    __select();

    var approval_status = "Pending of CPPO"

    var docket_number = GetURLParameter('docket_number');
    var officeId = GetURLParameter('fo');
    var id = GetURLParameter('id');
    var senderId = GetURLParameter('senderId');

    function storeData(postUrl, postData) {
        $.ajax({
            url: postUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (result) {
                // console.log('User data received:', result);
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }

    var ___updateStatusUponViewingDocket = function () {
        var apiUrl = api+'8000/workflow/'+id
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                // console.log('Data received:', result);
                var data = result.response;
                console.log(data)
                var postUrl = api+'8000/workflow/update/'+id;
                let approvalStatus;
                
                if (data.approvalStatus == "New - (Forwarded to CPPO)" ){
                    approvalStatus = "Pending of CPPO";
                } else if (data.approvalStatus == "New - (Forwarded to FO)" ){
                    approvalStatus = "Pending of FO";
                } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                    approvalStatus = "Pending of CPPO for Approval";
                } else if (data.approvalStatus == "Pending of FO"){ 
                    approvalStatus = "Pending of FO";
                } else if (data.approvalStatus == "Pending of CPPO"){ 
                    approvalStatus = "Pending of CPPO";
                } else if (data.approvalStatus == "Pending of CPPO for Approval"){ 
                    approvalStatus = "Pending of CPPO for Approval";
                }
                var postData = {
                    "type": data.type,
                    "caseloadType": data.caseloadType,
                    "senderId": data.senderId,
                    "senderName": data.senderName,
                    "senderFieldOfficeId": data.senderFieldOfficeId,
                    "originFieldOfficeId": data.originFieldOfficeId,
                    "receiverId": data.receiverId,
                    "fieldOfficeId": data.fieldOfficeId,
                    "docketNumber": data.docketNumber,
                    "details": data.details,
                    "remarks": data.remarks,
                    "approvalStatus": approvalStatus,
                    "lastStatusUpdateDate": "",
                };
                if (approvalStatus == "Pending of FO"){
                    approvalStatus == "Pending of FO";
                    storeData(postUrl,postData)
                } else if (approvalStatus == "Pending of CPPO"){
                    approvalStatus == "Pending of CPPO";
                    storeData(postUrl,postData)
                } else if (approvalStatus == "Pending of CPPO for Approval"){
                    approvalStatus == "ending of CPPO for Approval";
                    storeData(postUrl,postData)
                }
                $(".btn-confirm_forward").unbind("click").on("click", function(){
                    console.log("click")
                    function postDatas() {
                        return {
                            "type"                  : data.type,
                            "caseloadType"          : data.caseloadType,
                            "senderFieldOfficeId"   : $.cookie('field_office_id'),
                            "senderFieldOfficeName" : $.cookie('departmentName'),
                            "originFieldOfficeId"   : data.originFieldOfficeId,
                            "senderId"              : $.cookie("uuid"),
                            "receiverId"            : $(".user_account").val(),
                            "fieldOfficeId"         : $(".field_office").val(),
                            "docketNumber"          : data.docketNumber,
                            "details"               : $(".details").val(),
                            "remarks"               : data.remarks,
                            "approvalStatus"        : approvalStatus,
                            "lastStatusUpdateDate"  : "",
                        };
                    }
                    if (data.approvalStatus == "Pending of CPPO"){
                        approvalStatus = "New - (Forwarded to FO)"
                        var postData = postDatas()
                        storeData(postUrl,postData)
                        $("#success_forwarding").show()
                        setTimeout(function () {
                            $("#success_forwarding").hide()
                            window.location.href = api+"/pis/sent";
                        }, 2000);
                    } else if (data.approvalStatus == "Pending of FO"){
                        approvalStatus = "New - (Forward to CPPO for Approval)"
                        var postData = postDatas()
                        storeData(postUrl,postData)
                        $("#success_forwarding").show()
                        setTimeout(function () {
                            $("#success_forwarding").hide()
                            window.location.href = api+"/pis/sent";
                        }, 2000);
                    } else if (data.approvalStatus == "Pending of CPPO for Approval"){
                        approvalStatus = "New - (Forwarded to clerk for completion)"
                        var postData = postDatas()
                        storeData(postUrl,postData)
                        $("#success_forwarding").show()
                        setTimeout(function () {
                            $("#success_forwarding").hide()
                            window.location.href = api+"/pis/sent";
                        }, 2000);
                    } else {
                        approvalStatus = ""
                        var postData = postDatas()
                        storeData(postUrl,postData)
                        $("#success_forwarding").show()
                        setTimeout(function () {
                            $("#success_forwarding").hide()
                            window.location.href = api+"/pis/sent";
                        }, 2000);
                    }
                })
            },
            error: function(xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }
    
    var __fields = function(){
        __executeExternalGet(___ctx+'8000/docketbook/'+docket_number+'/'+senderId).done(function (result) {
            // console.log(result);
            var result = result.response;
            if (result.status != "ERROR") {
                $(".type").html("PARDONE");
                $(".docket_number").html(result.docketNumber);
            }else{
                alert("failed")
            }
        })
    }
    __fields();

    $(document).ready(function(){
        ___updateStatusUponViewingDocket();
        __fields();
    })

} )( jQuery );