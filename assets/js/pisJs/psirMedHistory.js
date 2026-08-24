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
        var status = GetURLParameter('status');

        function collectMedicalHistory() {
            return {

                pastMedicalHistory         : $(".past_medical_history").val(),
                presentIllness      : $(".present_illness").val(),
                presentMedication          : $(".present_medication").val(),
                drugOrAlcoholUse      : $(".drug_alcohol_usage").val(),
                extentOfUse              : $(".extent_use").val(),
                remarksMedical       : $(".remarks_medical").val(),
            };
        }

        function worksheetChecker(data) {

            if (!data) data = {};

            const REQUIRED_SECTIONS = [
                "identifyingData",
                "presentOffense",
                "priorRecordsAndDerogatoryRecord",
                "familyBackgroundAndBirthData",
                "presentSituation",
                "educationAndJobHistory",
                "medicalHistory",
                "traitsAndCommunityBackground",
                "analysisAndProjectedThrust",
                // "recommendation",
            ];

            let result = {
                missingSections: [],
                completedSections: [],
            };

            REQUIRED_SECTIONS.forEach(section => {
                if (data[section] && Object.keys(data[section]).length > 0) {
                    result.completedSections.push(section);
                } else {
                    result.missingSections.push(section);
                }
            });

            result.isComplete = (result.missingSections.length === 0);

            return result;
        }

        function saveWorksheet(existing, newMedicalHistory) {

            // update identifyingData
            existing.medicalHistory = newMedicalHistory;

            let check = worksheetChecker(existing);

            // Decide worksheet status dynamically
            let status = check.isComplete ? "complete" : "incomplete";

            // If worksheetStatus is missing/null -> assign INCOMPLETE by default
            if (check.statusIsNull) {
                status = "INCOMPLETE";
            }

            return {
                petitionerId: client_id,
                jsonData: JSON.stringify(existing),
                type: "psir",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
            };
        }

        function updateWorksheet(existing, newIdentifyingData, newPresentOffense, newPriorRecordsAndDerogatoryRecord, 
            newFamilyBackgroundAndBirthData, newPresentSituation, newEducationAndJobHistory, 
            newMedicalHistory, newTraitsAndCommunityBackground, newAnalysisAndProjectedThrust) {

            // update identifyingData
            existing.identifyingData = newIdentifyingData;
            existing.presentOffense = newPresentOffense;
            existing.priorRecordsAndDerogatoryRecord = newPriorRecordsAndDerogatoryRecord;
            existing.familyBackgroundAndBirthData = newFamilyBackgroundAndBirthData;
            existing.presentSituation = newPresentSituation;
            existing.educationAndJobHistory = newEducationAndJobHistory;
            existing.medicalHistory = newMedicalHistory;
            existing.traitsAndCommunityBackground = newTraitsAndCommunityBackground;
            existing.analysisAndProjectedThrust = newAnalysisAndProjectedThrust;
            // existing.recommendation = newRecommendation;

            let check = worksheetChecker(existing);

            // Decide worksheet status dynamically
            let status = check.isComplete ? "complete" : "incomplete";

            // If worksheetStatus is missing/null -> assign INCOMPLETE by default
            if (check.statusIsNull) {
                status = "INCOMPLETE";
            }

            return {
                petitionerId: client_id,
                jsonData: JSON.stringify(existing),
                type: "psir",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
            };
        }

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
        // if (status === "null" || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();
        } else {
            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    var worksheetData = JSON.parse(result.jsonData);
                    var medicalHistory = worksheetData.medicalHistory;
                    console.log(worksheetData)
                    if (medicalHistory) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".past_medical_history").val(medicalHistory.pastMedicalHistory)
                        $(".present_illness").val(medicalHistory.presentIllness)
                        $(".present_medication").val(medicalHistory.presentMedication)
                        $(".drug_alcohol_usage").val(medicalHistory.drugOrAlcoholUse).trigger("change")
                        $(".extent_use").val(medicalHistory.extentOfUse)
                        $(".remarks_medical").val(medicalHistory.remarksMedical)

                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                    }

                }
            })
        }

        $('.drug_alcohol_usage').change(function(){
            var value = $(this).val();
            if (value === "yes") {
                $("#extent_use_field").show();
            } else {
                $("#extent_use_field").hide();
            } 
        });

        // event handler for showing modal upon saving and updating data
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })

        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectMedicalHistory();

            __executeExternalGet(`8000/worksheet/getPetitioner/psir/${client_id}`)
                .done(function (result) {
                    var parsed = window.PsirRecord.parseExisting(result);
                    if (parsed.error) return;

                    let payload = saveWorksheet(parsed.existing, data);

                    window.PsirRecord.persist(__executeExternalPost, client_id, payload, parsed, function (res) {

                            if (res.status === "ERROR") return;

                            $(".form-control").val('');
                            $('#create_success').show();

                            setTimeout(() => {
                                $('#create_success').hide();
                                $('#saveModal').modal("hide");
                                window.location.href =
                                    window.pisUrl(`psir_traits_and_community_background?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
                            }, 2000);
                        });
                });
        });

        // evend handler for updating data
        $("#saveModal .btn-update").unbind("click").on("click", function () {

            let data = collectMedicalHistory();

            __executeExternalGet(`8000/worksheet/getPetitioner/psir/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecordsAndDerogatoryRecord = workSheetData.priorRecordsAndDerogatoryRecord;
                    let familyBackgroundAndBirthData = workSheetData.familyBackgroundAndBirthData;
                    let presentSituation = workSheetData.presentSituation;
                    let educationAndJobHistory = workSheetData.educationAndJobHistory;
                    let traitsAndCommunityBackground = workSheetData.traitsAndCommunityBackground;
                    let analysisAndProjectedThrust = workSheetData.analysisAndProjectedThrust;
                    // let recommendation = workSheetData.recommendation;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecordsAndDerogatoryRecord, familyBackgroundAndBirthData, presentSituation, educationAndJobHistory, data, traitsAndCommunityBackground, analysisAndProjectedThrust);

                    __executeExternalPost(
                        `8000/worksheet/updatePetitioner/psir/${client_id}`,
                        JSON.stringify(payload)
                    ).done(function (res) {

                        if (res.status === "ERROR") return;

                        $('#update_success').show();

                        setTimeout(() => {
                            $('#update_success').hide();
                            $('#saveModal').modal("hide");

                            window.location.href =
                                window.pisUrl(`psir_traits_and_community_background?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
                        }, 2000);
                    });
                });
        });
        
        function setupWorksheetClickHandler(psirType) {
            $(`.${psirType}`).unbind("click").on("click", function () {
                var tabName = $(this).data("name")
                $(".warningModalTitle").text(`${tabName} Tab`)
                $("#tabName").text(tabName)
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    setTimeout(function () {
                        $(".overlay").hide();
                        // window.location.href = window.pisUrl(`worksheet_${psirType}?client_id=${client_id}`);
                        window.location.href = window.pisUrl(`psir_${psirType}?client_id=${client_id}&field_office_id=${foid}&status=${status}`)
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("identifying_data")
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("traits_and_community_background");
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation");


    } )( jQuery );