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

        var transaction_number = GetURLParameter('transaction_number');
        var id = GetURLParameter('id');
        var client_type = GetURLParameter('client_type');

        var __fields = function(){
            __executeExternalGet(___ctx+'8000/workflow/'+id).done(function (result) {
                var result = result.response;
                console.log(result)
                var petitionerId = result.petitionerId;
                if (result.status != "ERROR") {
                    __executeExternalGet(___ctx+'8000/petitioner/'+petitionerId).done(function (resultPetitioner) {
                        var resultPetitioner = resultPetitioner.response;
                        console.log(resultPetitioner)
                        $(".name").text(resultPetitioner.firstName+" "+resultPetitioner.lastName)
                        $(".field_office").text(result.senderFieldOfficeName)
                        $(".return_to").text(result.senderName)
                        $(".details").text(result.details)

                        $(".btn-confirm_return").unbind("click").on("click", function(){
                            let approvalStatus;
                            if (result.approvalStatus === "Pending" || result.approvalStatus === "New"){
                                approvalStatus = "New"
                            } else {
                                approvalStatus = "Approved"
                            }
                            var payload = {
                                "type"                  : client_type,
                                "transactionNumber"     : transaction_number,
                                "petitionerId"          : resultPetitioner.id,
                                "caseloadType"          : "",
                                "senderId"              : $.cookie("uuid"),
                                "senderName"            : "",
                                "senderFieldOfficeId"   : $.cookie("field_office_id"),
                                "senderFieldOfficeName" : result.receiverNames,
                                "originFieldOfficeId"   : result.originFieldOfficeId,
                                "originFieldOfficeName" : "",
                                "receiverId"            : result.senderId,
                                "receiverName"          : result.senderName,
                                "fieldOfficeId"         : result.senderFieldOfficeId,
                                "fieldOfficeName"       : "",
                                "docketNumber"          : "",
                                "details"               : $(".remarks").val(),
                                "remarks"               : result.remarks,
                                "approvalStatus"        : approvalStatus,
                                "lastStatusUpdateDate"  : "",
                                "createdBy"             : "",
                                "createdDate"           : "",
                                "updatedBy"             : "",
                                "updatedDate"           : "",
                                "status"                : true
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
            console.log("view history")
        }
        // __fields();

        $(document).ready(function(){
            // ___updateStatusUponViewingDocket();
            __fields();
        })
    } )( jQuery );