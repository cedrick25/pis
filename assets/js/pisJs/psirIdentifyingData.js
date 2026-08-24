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
        // var status = "Not Available"
        var status = GetURLParameter('status');


        // utility for checking the worksheet if complete
        function collectIdentifyingData() {
            return {
                petitionersName           : $(".data_name").val(),
                trueName            : $(".true_name").val(),
                sourceOfInfo        : $(".source_info").val(),
                alias               : $(".alias").val(),
                height              : $(".height").val(),
                weight              : $(".weight").val(),
                age                 : $(".age").val(),
                sex                 : $(".sex").val(),
                citizenship         : $(".citizenship").val(),
                religion            : $(".religion").val(),
                identifyingMarks    : $(".identifying_marks").val(),
                presentAddress      : $(".present_add").val(),
                permanentAdress     : $(".permanent_add").val(),
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

        function saveWorksheet(existing, newIdentifyingData) {

            // update identifyingData
            existing.identifyingData = newIdentifyingData;

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
            if (window.PsirPrefill) {
                PsirPrefill.fromWorksheet(client_id, "identifyingData", __executeExternalGet);
            }
        } else {
            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    var worksheetData = JSON.parse(result.jsonData);
                    var identifyingData = worksheetData.identifyingData;
                    console.log(worksheetData)
                    if (identifyingData) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".data_name").val(identifyingData.petitionersName);
                        // $(".petitioner_middle_name").val(identifyingData.middleName);
                        // $(".petitioner_last_name").val(identifyingData.lastName);
                        $(".true_name").val(identifyingData.trueName);
                        $(".source_info").val(identifyingData.sourceOfInfo);
                        $(".alias").val(identifyingData.alias);
                        $(".height").val(identifyingData.height);
                        $(".weight").val(identifyingData.weight);
                        $(".age").val(identifyingData.age);
                        $(".sex").val(identifyingData.sex).trigger("change");
                        $(".citizenship").val(identifyingData.citizenship).trigger("change");
                        $(".religion").val(identifyingData.religion).trigger("change");
                        $(".identifying_marks").val(identifyingData.identifyingMarks);
                        $(".present_add").val(identifyingData.presentAddress);
                        $(".permanent_add").val(identifyingData.permanentAdress);
                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();
                    }
                    if (window.PsirPrefill) {
                        PsirPrefill.fromWorksheet(client_id, "identifyingData", __executeExternalGet);
                    }

                }
            })
        }

        // event handler for showing modal upon saving and updating data
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })

        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectIdentifyingData();

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
                                    window.pisUrl(`psir_present_offense?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
                            }, 2000);
                        });
                });
        });

        // evend handler for updating data
        $("#saveModal .btn-update").unbind("click").on("click", function () {

            let data = collectIdentifyingData();

            __executeExternalGet(`8000/worksheet/getPetitioner/psir/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecordsAndDerogatoryRecord = workSheetData.priorRecordsAndDerogatoryRecord;
                    let familyBackgroundAndBirthData = workSheetData.familyBackgroundAndBirthData;
                    let presentSituation = workSheetData.presentSituation;
                    let educationAndJobHistory = workSheetData.educationAndJobHistory;
                    let medicalHistory = workSheetData.medicalHistory;
                    let traitsAndCommunityBackground = workSheetData.traitsAndCommunityBackground;
                    let analysisAndProjectedThrust = workSheetData.analysisAndProjectedThrust;
                    // let recommendation = workSheetData.recommendation;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, data, presentOffense, priorRecordsAndDerogatoryRecord, familyBackgroundAndBirthData, presentSituation, educationAndJobHistory, medicalHistory, traitsAndCommunityBackground, analysisAndProjectedThrust);

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
                                window.pisUrl(`psir_present_offense?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
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

        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("medical_history");
        setupWorksheetClickHandler("traits_and_community_background");
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation");

    } )( jQuery );