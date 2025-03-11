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

        function gathereDataEducHis () {

            var educHistory = {

                elemLevel         : $(".elem_lvl").val(),
                elemWhere         : $(".elem_where").val(),
                elemHigh          : $(".elem_high").val(),
                elemAward         : $(".elem_award").val(),
                elemDate          : $(".elem_date").val(),
                secLevel          : $(".sec_lvl").val(),
                secWhere          : $(".sec_where").val(),
                secHigh           : $(".sec_high").val(),
                secAward          : $(".sec_award").val(),
                secDate           : $(".sec_date").val(),
                collegeLevel      : $(".college_lvl").val(),
                collegeWhere      : $(".college_where").val(),
                collegeHigh       : $(".college_high").val(),
                collegeAward      : $(".college_award").val(),
                collegeDate       : $(".college_date").val(),
                pcollegeLevel     : $(".pcollege_lvl").val(),
                pcollegeWhere     : $(".pcollege_where").val(),
                pcollegeHigh      : $(".pcollege_high").val(),
                pcollegeAward     : $(".pcollege_award").val(),
                pcollegeDate      : $(".pcollege_date").val(),
                vocLevel          : $(".voc_lvl").val(),
                vocWhere          : $(".voc_where").val(),
                vocHigh           : $(".voc_high").val(),
                vocAward          : $(".voc_award").val(),
                vocDate           : $(".voc_date").val(),
                unschool          : $(".unschool").val(),
                educExplain       : $(".educExplain").val(),
                conduct           : $(".conduct").val()



            }

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(educHistory),
            "type"                      : "educationHistory",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        __executeExternalGet('8000/worksheet/getPetitioner/educationHistory/'+client_id).done(function (result) {

                var result = result.response;

                if (result.status != "ERROR") {

                    if (result.worksheetStatus == "INCOMPLETE"){

                        $(".btn-update").show();
                        $(".btn-next").hide();

                        JSON.parse(result.jsonData)

                        $(".elem_lvl").val(JSON.parse(result.jsonData).elemLevel);
                        $(".elem_where").val(JSON.parse(result.jsonData).elemWhere);
                        $(".elem_high").val(JSON.parse(result.jsonData).elemHigh);
                        $(".elem_award").val(JSON.parse(result.jsonData).elemAward);
                        $(".elem_date").val(JSON.parse(result.jsonData).elemDate);
                        $(".sec_lvl").val(JSON.parse(result.jsonData).secLevel);
                        $(".sec_where").val(JSON.parse(result.jsonData).secWhere);
                        $(".sec_high").val(JSON.parse(result.jsonData).secHigh);
                        $(".sec_award").val(JSON.parse(result.jsonData).secAward);
                        $(".sec_date").val(JSON.parse(result.jsonData).secDate);
                        $(".college_lvl").val(JSON.parse(result.jsonData).collegeLevel);
                        $(".college_where").val(JSON.parse(result.jsonData).collegeWhere);
                        $(".college_high").val(JSON.parse(result.jsonData).collegeHigh);
                        $(".college_award").val(JSON.parse(result.jsonData).collegeAward);
                        $(".college_date").val(JSON.parse(result.jsonData).collegeDate);
                        $(".pcollege_lvl").val(JSON.parse(result.jsonData).pcollegeLevel);
                        $(".pcollege_where").val(JSON.parse(result.jsonData).pcollegeWhere);
                        $(".pcollege_high").val(JSON.parse(result.jsonData).pcollegeHigh);
                        $(".pcollege_award").val(JSON.parse(result.jsonData).pcollegeAward);
                        $(".pcollege_date").val(JSON.parse(result.jsonData).pcollegeDate);
                        $(".voc_lvl").val(JSON.parse(result.jsonData).vocLevel);
                        $(".voc_where").val(JSON.parse(result.jsonData).vocWhere);
                        $(".voc_high").val(JSON.parse(result.jsonData).vocHigh);
                        $(".voc_award").val(JSON.parse(result.jsonData).vocAward);
                        $(".voc_date").val(JSON.parse(result.jsonData).vocDate);
                        $(".unschool").val(JSON.parse(result.jsonData).unschool).trigger("change");
                        $(".educExplain").val(JSON.parse(result.jsonData).educExplain);  
                        $(".conduct").val(JSON.parse(result.jsonData).conduct).trigger("change");

                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
        })

        $(".btn-next").unbind("click").on("click", function(){

            var dataPayload = gathereDataEducHis();

            var required = ["elem_lvl", "elem_where", "elem_high", "elem_award", "sec_lvl", "sec_where", "sec_high", "sec_award", "college_lvl",
                "college_where", "college_high", "college_award", "pcollege_lvl", "pcollege_where", "pcollege_high", "pcollege_award",
                "voc_lvl", "voc_where", "voc_high", "voc_award", "unschool", "educExplain", "conduct"];

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
                                window.location.href = api+'/pis/worksheet_employment_history?client_id='+client_id+'&field_office_id='+foid;
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }
        })


        $(".btn-update").unbind("click").on("click", function(){

            var dataPayload = gathereDataEducHis();

            __executeExternalPost('8000/worksheet/updatePetitioner/educationHistory/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
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
                            window.location.href = api+'/pis/worksheet_employment_history?client_id='+client_id+'&field_office_id='+foid;
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