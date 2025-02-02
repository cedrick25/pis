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
            __executeExternalGet('8000/workflow/'+id).done(function (result2) {
                var result2 = result2.response
                __executeExternalGet('8088/department/'+result2.fieldOfficeId).done(function (result3) {
                    var fo = result3.name;
                    __executeExternalGet('8088/user/'+result2.receiverId).done(function (result4) {
                        console.log(result4);
                        var receiver = result4.firstName+" "+result4.middleName+" "+result4.lastName+" "+result4.suffix;
                        if (result4.status != "ERROR") {
                            $(".docket_number").html(result2.docketNumber);
                            // $(".type").html(result2.type);
                            $(".field_office").html(fo);
                            $(".sent_to").html(receiver);
                            $(".details").html(result2.details);

                            // Check the type and set href accordingly
                            if (result2.type === "PDL") {
                                $(".type").html("PDL");
                                $(".sent_href").attr("href", "pdl-sent");  // Replace with actual URL for "PDL"
                            } else if (result2.type === "SC_PR_CINV" || result2.type === "SC_PR_CSUP" || result2.type === "SC_PR_INV" || result2.type === "SC_PR_SUP") {
                                $(".type").html("PAROLE");
                                $(".sent_href").attr("href", "sent_parolee");  // Replace with URL for the other type
                            } else if (result2.type === "SC_PD_CINV" || result2.type === "SC_PD_CSUP" || result2.type === "SC_PD_INV" || result2.type === "SC_PD_SUP") {
                                $(".type").html("PARDONE");
                                $(".sent_href").attr("href", "sent_pardonee");  // Replace with URL for the other type
                            } else {
                                $(".sent_href").attr("href", "sent");  // Default URL if none of the types match
                            }
                        }else{
                            alert("failed")
                        }
                    })
                })
            })
        }
        __fields();
    } )( jQuery );