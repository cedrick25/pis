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

        __executeExternalGet('8000/worksheet/getPetitioner/environmentalFactor/'+client_id).done(function (result) {
            __executeExternalGet('8000/worksheet/getPetitioner/psirEnvironmentalFactor/'+client_id).done(function (result) {
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

                var result = result.response;
                if (result.status != "ERROR") {
                    if (result.worksheetStatus == "COMPLETED"){
                        JSON.parse(result.jsonData)
                        $(".neighborhood").val(JSON.parse(result.jsonData).neighborhood).trigger("change");
                        $(".area").val(JSON.parse(result.jsonData).area).trigger("change");
                        $(".neighborhoodDescribe").val(JSON.parse(result.jsonData).neighborhoodDescribe);
                        $(".neighCrim").val(JSON.parse(result.jsonData).neighCrim).trigger("change");
                        $(".criminalityExplain").val(JSON.parse(result.jsonData).criminalityExplain);
                        $(".comAcceptance").val(JSON.parse(result.jsonData).comAcceptance).trigger("change");
                        $(".acceptanceSpecify").val(JSON.parse(result.jsonData).acceptanceSpecify);
                        $(".peerRel").val(JSON.parse(result.jsonData).peerRel).trigger("change");
                        $(".peerSpecify").val(JSON.parse(result.jsonData).peerSpecify);
                    }else{
                        $(".btn-update").hide();
                        $(".btn-next").show();
                    } 

                }
        })

        function gatheredData () {

            var envFactor = {
                neighborhood            : $(".neighborhood").val(),
                neighborhoodDescribe    : $(".neighborhoodDescribe").val(),
                neighCrim               : $(".neighCrim").val(),
                criminalityExplain      : $(".criminalityExplain").val(),
                comAcceptance           : $(".comAcceptance").val(),
                acceptanceSpecify       : $(".acceptanceSpecify").val(),
                peerRel                 : $(".peerRel").val(),
                peerSpecify             : $(".peerSpecify").val(),
                area                    : $(".area").val()
            }

            var payload = {
                "petitionerId"              : client_id,
                "jsonData"                  : JSON.stringify(envFactor),
                "type"                      : "psirEnvironmentalFactor",
                "worksheetStatus"           : "INCOMPLETE",
                "createdBy"                 : $.cookie("uuid"),
                "fieldOfficeId"             : $.cookie("field_office_id")
            }
            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){
            var payload = gatheredData();
            __executeExternalPost('8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/psir_evaluation?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        $(".btn-update").unbind("click").on("click", function(){
            var payload = gatheredData();
            __executeExternalPost('8000/worksheet/updatePetitioner/psirEnvironmentalFactor/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = api+'/pis/psir_evaluation?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

            function setupWorksheetClickHandler(psirType) {
                $(`.${psirType}`).unbind("click").on("click", function () {
                    $(".btn_warning").unbind("click").on("click", function () {
                        $(".form-control").val('');
                        setTimeout(function () {
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