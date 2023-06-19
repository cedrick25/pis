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

        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        var docket_number = GetURLParameter('docket_number');
        var id = GetURLParameter('id');
        var __fields = function(){

            __executeExternalGet('8000/workflow/'+id).done(function (result) {
                console.log(result);

                var result = result.response;
                if (result.status != "ERROR") {
                        __executeExternalGet('8088/department/'+result.fieldOfficeId).done(function (result2) {
                            var fo = result2.name;
                        __executeExternalGet('8088/user/'+result.senderId).done(function (result3) {
                            var senderId = result3.firstName+" "+result3.middleName+" "+result3.lastName+" "+result3.suffix;
                            $(".docket_number").html(result.docketNumber);
                            $(".type").html(result.type);
                            $(".field_office").html(fo);
                            $(".return_to").html(senderId);
                            $(".details").html(result.details);

                            $(".btn-confirm_return").unbind("click").on("click", function(){
                            console.log('clicked')

                            var payload = {
                                "type"                  : result.type,
                                "caseloadType"          : result.caseloadType,
                                "senderId"              : $.cookie("uuid"),
                                "receiverId"            : result.senderId,
                                "fieldOfficeId"         : result.fieldOfficeId,
                                "docketNumber"          : $(".docket_number").html(),
                                "details"               : $(".details").html(),
                                "remarks"               : $(".remarks").val(),
                                "approvalStatus"        : "",
                                "lastStatusUpdateDate"  : "",
                            }
                            console.log(payload)
                            __executeExternalPost('8000/workflow/create',JSON.stringify(payload)).done(function (result) {
                                console.log(result);
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
                    })
                })
                }else{
                    alert("failed")
                }
            })
        }
        __fields();
    } )( jQuery );