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
        var field_office_id = $.cookie('field_office_id');

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
            "type"                      : "environmentalFactor",
            "worksheetStatus"           : "COMPLETED",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

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

        var worksheetDataStorage = [];

        function getEnvFacData (worksheetType) {
            const apiUrl = api+'8000/worksheet/getPetitioner/'+worksheetType+'/'+client_id;
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    var result = result.response;
                    if (result.worksheetStatus == "COMPLETED"){
                        $(".btn-update").show();
                        $(".btn-next").hide();
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
                        $(".btn-next").show();
                        $(".btn-update").hide();
                    }

                    $(".btn-next").unbind("click").on("click", function(){
                        if (worksheetDataStorage.length < 9) {
                            alert("Please Complete the pre-requisite forms before proceeding")
                        } else {
                            var dataPayload = gatheredData();

                            var required = ["neighborhood", "neighborhoodDescribe", "neighCrim", "criminalityExplain", "comAcceptance", "acceptanceSpecify", "peerRel", "peerSpecify", 
                                "area"];

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

                            if (requiredFields === 0) {
                                __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
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
                                                window.location.href = api+'/pis/client_list';
                                            }, 500);
                                        }, 2000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            }
                        }
                    })
                    $(".btn-update").unbind("click").on("click", function(){
                        var dataPayload = gatheredData();
                        __executeExternalPost('8000/worksheet/updatePetitioner/environmentalFactor/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
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
                                        window.location.href = api+'/pis/client_list';
                                    }, 500);
                                }, 2000);
                            }else{
                                alert("failed")
                            }
                        })
                    })

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
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchPetitioner(worksheetType) {
            const apiUrl = api+'8000/worksheet/getPetitioner/'+worksheetType+'/'+client_id;
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    var result = result.response;
                    var dataToBeStored = {
                        id              : result.id,
                        worksheetStatus : result.worksheetStatus
                    }
                    if (result.worksheetStatus == null){
                        console.log("Cannot save worksheet status that is null")
                    } else {
                        worksheetDataStorage.push(dataToBeStored);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }
        var worksheetType = ['identifyingData', 'presentOffense', 'priorRecords', 'familyBackground', 'socioEconomic', 'residenceEconomic', 'spouseChildren', 'educationHistory', 'employmentHistory']
        worksheetType.forEach(function(data){
            fetchPetitioner(data);
        })
        getEnvFacData("environmentalFactor")

    } )( jQuery );