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

        var client_id = GetURLParameter('client_id');
        var foid = GetURLParameter('field_office_id');

        function functionPresentOffense () {
            return {
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
        }

        function functionPayload(presentOffense) {
            return {
                "petitionerId"              : client_id,
                "jsonData"                  : JSON.stringify(presentOffense),
                "worksheetStatus"           : "INCOMPLETE",
                "type"                      : "presentOffense",
                "fieldOfficeId"             : $.cookie("field_office_id"),
                "createdBy"                 : $.cookie("uuid"),
                "status"                    : true
            }
        }


        $(".btn-next").unbind("click").on("click", function(){

            var required = ["charged", "p_commision", "convicted", "date_charged", "date_commited", "date_convicted", "s_yr", "s_mo", "s_day", "judge", "court", 
                "court", "arresting", "address_1", "defense", "address_2", "prosecutor", "address_3", "offended", "address_4", "ca", "ac", "mc", "ep", "custody",
                "commision", "motives", "explain"];

            required.forEach(function(data) {
                // First, remove the existing error message and error class if present
                $("." + data).removeClass("error_field");
                $("." + data).next('.errorRequired').remove();
        
                // Now check if the field is empty or null
                if ($("." + data).val() === "" || $("." + data).val() === null) {
                    $("." + data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter($("." + data));
                } 
            });

            var requiredFields = $('.errorRequired:visible').length;
            console.log('Number of required fields: ' + requiredFields);


            var presentOffense = functionPresentOffense();

            var payload = functionPayload(presentOffense);

            if (requiredFields === 0) {
                __executeExternalPost('8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                    if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").show();
                            $('#success').hide();
                            setTimeout(function () {
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                                window.location.href = api+'/pis/worksheet_prior_records?client_id='+client_id+'&field_office_id='+foid;
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }

        })

        __executeExternalGet('8000/worksheet/getPetitioner/presentOffense/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){
                    $(".btn-update").show();
                    $(".btn-next").hide();

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

                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })


        $(".btn-update").unbind("click").on("click", function(){

            var presentOffense = functionPresentOffense()
            var payload = functionPayload(presentOffense);

            __executeExternalPost('8000/worksheet/updatePetitioner/presentOffense/'+client_id,JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    $(".btn-update").prop('disabled', true);
                    setTimeout(function () {
                        $('#success').hide();
                        $(".overlay").show();
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".btn-update").prop('disabled', false);
                            window.location.href = api+'/pis/worksheet_prior_records?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        function setupWorksheetClickHandler(worksheetType) {
            $(`.${worksheetType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    $(".overlay").show();
                    setTimeout(function () {
                        $(".overlay").hide();
                        window.location.href = api+'/pis/worksheet_'+worksheetType+'?client_id='+client_id+'&field_office_id='+foid;
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("socio_economic");
        setupWorksheetClickHandler("residence_economic");
        setupWorksheetClickHandler("spouse_children");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor");


    } )( jQuery );