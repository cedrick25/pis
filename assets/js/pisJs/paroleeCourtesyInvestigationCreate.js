    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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

            $(".btn-confirm").unbind("click").on("click", function(){
                console.log('clicked')

                var payload = {

                "type"                      : "SC_PR_CINV",
                "docketNumber"              : "",
                "docketSeries"              : $(".docket_series").val(),
                "caseloadType"              : $(".task").val(),
                "fieldOfficeId"             : $.cookie('field_office_id'),
                "clientType"                : "PAROLEE",
                "clientId"                  : "",
                "firstName"                 : "",
                "middleName"                : "",
                "lastName"                  : "",
                "suffixName"                : "",
                "fullName"                  : "",
                "pleaBargain"               : true,
                "caseClassification"        : "",
                "criminalCaseNumber"        : "",
                "offense"                   : "",
                "courtOfOrigin"             : "",
                "courtOrderDate"            : "",
                "investigatingOfficer"      : $(".inv_off").val(),
                "receivedDateByPPO"         : $(".dr_ppo").val(),
                "sentence"                  : "",
                "manualDocket"              : true,
                "referral"                  : true,
                "referralData"              : "",
                "remarks"                   : "",
                "probationStartDate"        : "",
                "probationYear"             : "",
                "probationMonth"            : "",
                "probationDay"              : "",
                "reportType"                : "",
                "prisonName"                : "",
                "investigationReportSubmittedDate"          :"",
                "ppoRecommendation"         : "",
                "recommendationState"       : "",
                "dateOfTransfer"            : "",
                "transferredOfficeId"       : "",
                "dateOrderReceivedFromTheBoard"             : "",
                "boardOrder"                : "",
                "boardOrderStatus"          : "",
                "referringOfficeId"         : $(".ref_office").val(),
                "dateCICAR"                 : $(".date_cic").val(),
                "supervisingOfficer"        : "",
                "probationEndDate"          : "",
                "referralType"              : "",
                "dateReportSubmittedToTheBoard"             : "",
                "dateReportSubmittedToRDForTransferToOtherPPO": "",
                "resolutionType"            : "",
                "dateResolutionFromTheBoard": "",
                "dateResolutionFromTheRDForTransfer"        : "",
                "createdBy"                 : "",
                "updatedBy"                 : "",
                "legalAge"                  : true,
                "militaryCourt"             : true,
                "supervisionStartDate"      : "",
                "supervisionEndDate"        : ""

                }
                __executeExternalPost('8000/docketbook/create/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                    if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                            $('#success').hide();
                            window.location.href = api+'/pis/parolee_courtesy_investigation_docketing';
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            })
                var __select = function(){
                    $('.ref_office').empty();

                    __executeExternalGet('8088/department/list').done(function (result) {
                        if (result.status != "ERROR") {
                            $('.ref_office').append("<option selected disabled> - - Select Field Office - - </option>");
                            result.forEach(function(data){
                                $('.ref_office').append(
                                    "<option value="+data.id+">"+data.name+"</option>");
                            });

                        } else {
                            console.log("failed fetching docket list")
                        }
                    })
                }
                __select();
    } )( jQuery );