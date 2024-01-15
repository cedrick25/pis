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

        var docket_number = GetURLParameter('docket_number');
        var id = GetURLParameter('id');
        var fieldOffice = GetURLParameter('fo');

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
        function fetchWorfklow() {
            var apiUrl = api+'8000/workflow/'+id
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    var data = result.response;
                    $(".docket_number").html(data.docketNumber);
                    $(".type").html(data.type);
                    $(".return_to").html(data.senderName)
                    $(".details").html(data.details)
                    $(".field_office").html(data.fieldOfficeName)
                    var postUrl = api+'8000/workflow/update/'+id;
                    let approvalStatus;
                    if (data.approvalStatus == "New - (Forwarded to CPPO)" ){
                        approvalStatus = "Pending of CPPO"
                    } else if (data.approvalStatus == "New - (Forwarded to FO)" ){
                        approvalStatus = "Pending of FO"
                    } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                        approvalStatus = "Pending of CPPO for Approval"
                    }
                    var postData = {
                        "type": data.type,
                        "caseloadType": data.caseloadType,
                        "senderId": data.senderId,
                        "senderName": data.senderName,
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
                        approvalStatus == "Pending of CPPO for Approval"
                        storeData(postUrl,postData)
                    }

                    $(".btn-confirm_return").unbind("click").on("click", function(){
                        var apiUrl = api+'8000/workflow/'+id
                        $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            success: function(result) {
                                var data = result.response;
                                let approvalStatus;
                                var postUrl = api+'8000/workflow/create';
                                function postDatas() {
                                    return {
                                        "type"                  : data.type,
                                        "caseloadType"          : data.caseloadType,
                                        "senderId"              : $.cookie("uuid"),
                                        "receiverId"            : data.senderId,
                                        "fieldOfficeId"         : data.fieldOfficeId,
                                        "docketNumber"          : data.docketNumber,
                                        "details"               : data.details,
                                        "remarks"               : $(".remarks").val(),
                                        "approvalStatus"        : approvalStatus,
                                        "lastStatusUpdateDate"  : "",
                                    };
                                }
                                if (data.approvalStatus == "Pending of CPPO"){
                                    approvalStatus = "New - (Forwarded to FO)"
                                    var postData = postDatas()
                                    storeData(postUrl,postData)
                                } else if (data.approvalStatus == "Pending of FO"){
                                    approvalStatus = "New - (Returned to CPPO)"
                                    var postData = postDatas()
                                    storeData(postUrl,postData)
                                } 
                            },
                            error: function(xhr, status, error) {
                                console.error('Error:', status, error);
                            }
                        })
                    })

                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }
        $(document).ready(function(){
            fetchWorfklow();
        })
    } )( jQuery );