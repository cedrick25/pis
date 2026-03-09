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
    var officeId = $.cookie("field_office_id");
    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm').prop('disabled', true);
    
    var __selectFieldOffice = function () {
        __executeExternalGet('8088/department/list').done(function (result) {
            if (result.status != "ERROR") {
                result.forEach(function (data) {
                    $('.ref_office').append("<option value=" + data.id + ">" + data.name + "</option>");
                });
            }
        });
    };
    __selectFieldOffice();

    var loadCourtesyInvestigation = function () {
        __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId).done(function (apiResult) {
            var result = apiResult.response;
            if (apiResult.status !== "ERROR" && result) {
                $(".docket_number").val(result.docketNumber || '');
                let name = "";
                if (!result.fullName) {
                    name = `${result.firstName} ${result.middleName} ${result.lastName} ${result.suffixName}`
                } else {
                    name = result.fullName
                }
                $(".client").val(name)

                // setTimeout(function () {
                //     var clientId = GetURLParameter('petitionerId') || result.clientId;
                //     if (clientId) $(".client").val(clientId).trigger("change");
                // }, 500);

                setTimeout(function () {
                    var refOfficeId = result.referringOfficeCourtesyInvId || result.referringOfficeId;
                    var refOfficeName = result.referringOfficeCourtesyInv || result.referringOfficeId;
                    if (refOfficeId && $(".ref_office option[value='" + refOfficeId + "']").length) {
                        $(".ref_office").val(refOfficeId).trigger("change");
                    } else if (refOfficeName) {
                        var $opt = $(".ref_office option").filter(function () {
                            return $(this).text().trim() === refOfficeName;
                        });
                        if ($opt.length) $opt.prop('selected', true).trigger("change");
                    }
                }, 600);

                $(".date_rcv_from_ppo").val(result.receivedDateByPPO || '');
                $(".inv_officer").val(result.investigatingOfficer || '');
                $(".reasons").val(result.remarks || '');
                $(".date_completed_and_returned").val(result.dateCICAR || result.dateCompletedAndReturned || '');

            } else {
                alert("Failed to load data");
            }
        });
    };

        setTimeout(function () {
            $("#spinner_update").hide();
            // $('.card-body').find('input, select, button').prop('disabled', false);
            // $('.btn-confirm_update').prop('disabled', false);
            // $('.docketNum_update').prop('disabled', true)
            // $('.pb_client').prop('disabled', true)
            loadCourtesyInvestigation();
        }, 3000);

    } )( jQuery );