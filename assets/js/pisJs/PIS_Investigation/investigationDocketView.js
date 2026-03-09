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

        var updateProbationInvestigation = function () {
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+officeId).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docketNum_update").val(result.docketNumber);
                    let name = "";
                    if (!result.fullName) {
                        name = `${result.firstName} ${result.middleName} ${result.lastName} ${result.suffixName}`
                    } else {
                        name = result.fullName
                    }
                    $(".pb_client").val(name);

                    if (result.pleaBargain == true) {
                        var pb = "true"
                    } else {
                        var pb = "false"
                    }

                    $(".plea_bargain").val(pb).trigger("change");
                    $(".cc_no").val(result.criminalCaseNumber);
                    $(".court_origin").val(result.courtOfOrigin);
                    $(".offense").val(result.offense);
                    $(".sentence").val(result.sentence);
                    $(".cod").val(result.courtOrderDate);
                    $(".rd").val(result.receivedDateByPPO);
                    $(".inv_off").val(result.investigatingOfficer);
                    // for referrals acted upon
                    $(".psir_date").val(result.psirDate);
                    $(".ppo_recommendation").val(result.ppoRecommendation).trigger("change");
                    $(".manifestation_date").val(result.manifestationDate);
                    $(".transfer_date").val(result.dateOfTransfer);
                    $(".transfer_to").val(result.transferredOfficeId).trigger("change");
                    // for referrals not acted upon
                    var typeOfReferrals = result.typeOfReferrals ?? "";
                    $(".not_acted_decision").val(typeOfReferrals).trigger("change");
                    $(".date_order_received").val(result.referralsNotActedUponDateOrderReceived);
                    // for cases disposed of by the court and issuance of
                    $(".alias_t4").val(result.alias);
                    $(".court_decision_t4").val(result.courtDecision);
                    $(".reason_for_denial_t4").val(result.reasonForDenialDismissal);
                    $(".other_type_of_decision_t4").val(result.specifyOtherTypeOfDecision);
                    $(".date_order_received_court_t4").val(result.dateOrderReceivedFromTheCourt);

                }else{
                    alert("failed")
                }
            })
        }

        setTimeout(function () {
            $("#spinner_update").hide();
            updateProbationInvestigation();
        }, 3000);

    } )( jQuery );