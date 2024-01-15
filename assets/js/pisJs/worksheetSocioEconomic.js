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

        function gatheredDataSocioEconomic() {
            var socioEco = {

                family_rel          : $(".family_rel").val(),
                family_rep          : $(".family_rep").val(),
                home_cond           : $(".home_cond").val(),
                fam_prob            : $(".fam_prob").val(),
                eco_status          : $(".eco_status").val(),
                stability           : $(".stability").val(),
                comments            : $(".comments").val(),
                circumstances       : $(".circumstances").val(),
                explain             : $(".explain").val(),

            }

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(socioEco),
            "type"                      : "socioEconomic",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload
        }

        $(".btn-next").unbind("click").on("click", function(){
            var dataPayload = gatheredDataSocioEconomic();
            __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/worksheet_residence_economic?client_id='+client_id+'&field_office_id='+foid;;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/socioEconomic/'+client_id).done(function (result) {

                var result = result.response;

                if (result.status != "ERROR") {

                    if (result.worksheetStatus == "INCOMPLETE"){

                        $(".btn-update").show();
                        $(".btn-next").hide();

                        JSON.parse(result.jsonData)

                        $(".family_rel").val(JSON.parse(result.jsonData).family_rel).trigger("change");
                        $(".family_rep").val(JSON.parse(result.jsonData).family_rep).trigger("change");
                        $(".home_cond").val(JSON.parse(result.jsonData).home_cond).trigger("change");
                        $(".fam_prob").val(JSON.parse(result.jsonData).fam_prob).trigger("change");
                        $(".eco_status").val(JSON.parse(result.jsonData).eco_status).trigger("change");
                        $(".stability").val(JSON.parse(result.jsonData).stability).trigger("change");
                        $(".comments").val(JSON.parse(result.jsonData).comments);
                        $(".circumstances").val(JSON.parse(result.jsonData).circumstances).trigger("change");
                        $(".explain").val(JSON.parse(result.jsonData).explain);

                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
            })

        $(".btn-update").unbind("click").on("click", function(){
            var dataPayload = gatheredDataSocioEconomic();
            __executeExternalPost('8000/worksheet/updatePetitioner/socioEconomic/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/worksheet_residence_economic?client_id='+client_id+'&field_office_id='+foid;;
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
                        setTimeout(function () {
                            window.location.href = api+'/pis/worksheet_'+worksheetType+'?client_id='+client_id+'&field_office_id='+foid;
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
    } )( jQuery );