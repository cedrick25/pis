    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

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

        var client_id = GetURLParameter('client_id');
        var foid = GetURLParameter('field_office_id');
        var field_office_id = $.cookie('field_office_id');

        function gatheredData () {
             var presentOffense = {
                chargedWith                 : $(".charged").val(),
                commisionPlace              : $(".p_commision").val(),
                convictedOf                 : $(".convicted").val(),
                dateCharged                 : $(".date_charged").val(),
                dateCommitted               : $(".date_commited").val(),
                dateConvicted               : $(".date_convicted").val(),
                sentenceYear                : $(".s_yr").val(),
                sentenceMonth               : $(".s_mo").val(),
                sentenceDay                 : $(".s_day").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                arrestingOfficer            : $(".arresting").val(),
                firstAddress                : $(".address_1").val(),
                defenseCounsel              : $(".defense").val(),
                secondAddress               : $(".address_2").val(),
                prosecutor                  : $(".prosecutor").val(),
                thirdAddress                : $(".address_3").val(),
                offended                    : $(".offended").val(),
                fourthAddress               : $(".address_4").val(),
                coAccused                   : $(".ca").val(),
                aggravatingCirsumstances    : $(".ac").val(),
                mitigatingCircumstances     : $(".mc").val(),
                extentParticipation         : $(".ep").val(),
                custody                     : $(".custody").val(),
                mannerofCommision           : $(".commision").val(),
                motives                     : $(".motives").val(),
                explain                     : $(".explain").val(),
            }

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(presentOffense),
            "type"                      : "psirPresentOffense",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){

           var dataPayload = gatheredData()

            __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        $(".overlay").show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                            window.location.href = api+'/pis/psir_prior_records?client_id='+client_id+'&field_office_id='+foid;
                        }, 500); 
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        $(".btn-update").unbind("click").on("click", function(){

            var dataPayload = gatheredData();

            __executeExternalPost('8000/worksheet/updatePetitioner/psirPresentOffense/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        $(".overlay").show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                            window.location.href = api+'/pis/psir_prior_records?client_id='+client_id+'&field_office_id='+foid;
                        }, 500); 
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        __executeExternalGet('8000/worksheet/getPetitioner/presentOffense/'+client_id).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "INCOMPLETE"){
                    __executeExternalGet('8000/worksheet/getPetitioner/psirPresentOffense/'+client_id).done(function (result) {
                            var result = result.response;
                            if (result.status != "ERROR") {
                                if (result.worksheetStatus == "INCOMPLETE"){
                                    $(".btn-next").hide();
                                    $(".btn-update").show();

                                }else{
                                    $(".btn-update").hide();
                                    $(".btn-next").show();
                                } 
                            }
                    })

                    JSON.parse(result.jsonData)

                    $(".charged").val(JSON.parse(result.jsonData).chargedWith);
                    $(".p_commision").val(JSON.parse(result.jsonData).commisionPlace);
                    $(".convicted").val(JSON.parse(result.jsonData).convictedOf);
                    $(".date_charged").val(JSON.parse(result.jsonData).dateCharged);
                    $(".date_commited").val(JSON.parse(result.jsonData).dateCommitted);
                    $(".date_convicted").val(JSON.parse(result.jsonData).dateConvicted);
                    $(".s_yr").val(JSON.parse(result.jsonData).sentenceYear);
                    $(".s_mo").val(JSON.parse(result.jsonData).sentenceMonth);
                    $(".s_day").val(JSON.parse(result.jsonData).sentenceDay);
                    $(".judge").val(JSON.parse(result.jsonData).judge);
                    $(".court").val(JSON.parse(result.jsonData).court);
                    $(".arresting").val(JSON.parse(result.jsonData).arrestingOfficer);
                    $(".address_1").val(JSON.parse(result.jsonData).firstAddress);
                    $(".defense").val(JSON.parse(result.jsonData).defenseCounsel);
                    $(".address_2").val(JSON.parse(result.jsonData).secondAddress);
                    $(".prosecutor").val(JSON.parse(result.jsonData).prosecutor);
                    $(".address_3").val(JSON.parse(result.jsonData).thirdAddress);
                    $(".offended").val(JSON.parse(result.jsonData).offended);
                    $(".address_4").val(JSON.parse(result.jsonData).fourthAddress);
                    $(".ca").val(JSON.parse(result.jsonData).coAccused);
                    $(".ac").val(JSON.parse(result.jsonData).aggravatingCirsumstances);
                    $(".mc").val(JSON.parse(result.jsonData).mitigatingCircumstances);
                    $(".ep").val(JSON.parse(result.jsonData).extentParticipation).trigger("change");
                    $(".custody").val(JSON.parse(result.jsonData).custody).trigger("change");
                    $(".commision").val(JSON.parse(result.jsonData).mannerofCommision);
                    $(".motives").val(JSON.parse(result.jsonData).motives).trigger("change");
                    $(".explain").val(JSON.parse(result.jsonData).explain);

                }else{
                    $(".btn-update").hide();
                    $(".btn-next").show();
                } 

            }
        })

        function setupWorksheetClickHandler(psirType) {
            $(`.${psirType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    $(".overlay").show();
                    setTimeout(function () {
                        $(".overlay").hide();
                        window.location.href = api+'/pis/psir_'+psirType+'?client_id='+client_id+'&field_office_id='+foid;
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("socio_economic");
        setupWorksheetClickHandler("residence_economic");
        setupWorksheetClickHandler("spouse_children");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor")
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation")

    } )( jQuery );