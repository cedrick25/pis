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

        console.log(id)
        var __fields = function(){

            __executeExternalGet('8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    $('.field_office').on('change', function() {
                        $('.user_account').empty();
                        const dep_id = this.value
                        __executeExternalGet('8088/user/list/'+dep_id).done(function (result) {
                            // console.log(result)
                            if (result.status != "ERROR") {
                                $(".user_display").show()
                                $('.user_account').append("<option selected disabled> - - Select User Account - - </option>");
                                result.forEach(function(data){
                                    // console.log(data)
                                    var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                    $('.user_account').append(
                                        "<option value="+data.uuid+">"+fullname+"</option>");
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
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                // console.log(result);
                var result = result.response;

                if (result.status != "ERROR") {

                    __executeExternalGet('8000/workflow/'+id).done(function (result) {
                        console.log(result);

                        var result = result.response;
                        if (result.status != "ERROR") {
                            $(".docket_number").html(result.docketNumber);
                            $(".type").html(result.type);
                            $(".field_office").html(result.fieldOfficeId);
                            $(".return_to").html(result.senderId);
                            // $(".details").val(result.details);
                            
                            $(".btn-confirm_forward").unbind("click").on("click", function(){
                            console.log('clicked')
                            
                            var payload = {
                                "type"                  : result.type,
                                "caseloadType"          : result.caseloadType,
                                "senderId"              : $.cookie("uuid"),
                                "receiverId"            : $(".user_account").val(),
                                "fieldOfficeId"         : $(".field_office").val(),
                                "docketNumber"          : result.docketNumber,
                                "details"               : $(".details").val(),
                                "remarks"               : result.remarks,
                                "approvalStatus"        : "",
                                "lastStatusUpdateDate"  : "",
                            }

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
                        }else{
                            alert("failed")
                        }
                    })
                }else{
                    alert("failed")
                }
            })
        }
        __fields();

    } )( jQuery );