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
       
        $(".addMoreCollInfo").unbind("click").on("click", function(){
            $(".collateralInfo").append(`
            <div class="collateralInformation">
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Source Of Information</label></div>
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collInfo"></textarea></div>
                </div>
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Relationship to Client</label></div>
                    <div class="col-12 col-md-5"><input type="text" name="text-input" placeholder=" " class="form-control relClient"></div>
                </div>
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Information Gathered</label></div>
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collGathered"></textarea></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.collateralInfo').on('click', '.remove', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });

        function gatheredData () {

            const collateralInfo = [];
            const collInfo = $(".collInfo");
            const relClient = $(".relClient");
            const collGathered = $(".collGathered");

            for(var i = 0; i < collInfo.length; i++){
                const list = {};
                list.collInfo = $(collInfo[i]).val();
                list.relClient = $(relClient[i]).val();
                list.collGathered = $(collGathered[i]).val();
                collateralInfo.push(list);
            }


            var evaluation = {

                collateralInfo          : collateralInfo,
                positiveTraits          : $(".positiveTraits").val(),
                negativeTraits          : $(".negativeTraits").val(),
                overallTraits           : $(".overallTraits").val(),
                analysisAndEvaluation   : $(".analysisAndEvaluation").val(),
                projectedThrust         : $(".projectedThrust").val(),
                communityBackground     : $(".communityBackground").val(),
            }

            var payload = {
                "petitionerId"              : client_id,
                "jsonData"                  : JSON.stringify(evaluation),
                "type"                      : "psirEvaluation",
                "worksheetStatus"           : "INCOMPLETE",
                "createdBy"                 : $.cookie("uuid"),
                "fieldOfficeId"             : $.cookie("field_office_id")
            }
            return payload;
        }


        $(".btn-next").unbind("click").on("click", function(){
            var payload = gatheredData();

            var required = ["positiveTraits", "negativeTraits", "overallTraits", "analysisAndEvaluation", "projectedThrust", "communityBackground"];

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
                                window.location.href = api+'/pis/psir_recommendation?client_id='+client_id+'&field_office_id='+foid;
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }
        })

        $(".btn-update").unbind("click").on("click", function(){
            var payload = gatheredData();
            __executeExternalPost('8000/worksheet/updatePetitioner/psirEvaluation/'+client_id,JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    $(".btn-update").prop('disabled', true);
                    setTimeout(function () {
                        $(".overlay").show();
                        $('#success').hide();
                        setTimeout(function () {
                        $(".overlay").hide();
                        $(".btn-update").prop('disabled', false);
                            window.location.href = api+'/pis/psir_recommendation?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })

        })

        __executeExternalGet('8000/worksheet/getPetitioner/psirEvaluation/'+client_id).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "INCOMPLETE"){
                    $(".btn-update").show();
                    $(".btn-next").hide();

                    var evaluation = JSON.parse(result.jsonData);
                    $(".positiveTraits").val(JSON.parse(result.jsonData).positiveTraits);
                    $(".negativeTraits").val(JSON.parse(result.jsonData).negativeTraits);
                    $(".overallTraits").val(JSON.parse(result.jsonData).overallTraits);
                    $(".analysisAndEvaluation").val(JSON.parse(result.jsonData).analysisAndEvaluation);
                    $(".projectedThrust").val(JSON.parse(result.jsonData).projectedThrust);
                    $(".communityBackground").val(JSON.parse(result.jsonData).communityBackground);

                    evaluation.collateralInfo.forEach(function(data){
                        $(".collateralInfo").append(`
                            <div class="collateralInfo">
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Source Of Information</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collInfo" value="${data.collInfo}">${data.collInfo}</textarea></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Relationship to Client</label></div>
                                    <div class="col-12 col-md-5"><input type="text" name="text-input" placeholder=" " class="form-control relClient" value="${data.relClient}"></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Information Gathered</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collGathered" value="${data.collGathered}">${data.collGathered}</textarea></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>
                        `
                        )
                    });
                }else{
                    $(".btn-next").show();
                    $(".btn-update").hide();
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