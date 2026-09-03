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
        var status = GetURLParameter("status")

        function collectPresentOffenseData() {
            return {
                chargedWith                 : $(".charged").val(),
                chargedWithDate             : $(".date_charged_with").val(),
                convictedOf                 : $(".convicted_of").val(),
                convictedOfDate             : $(".date_convicted_of").val(),
                sentence                    : $(".sentence").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                defenseCounsel              : $(".defense_counsel").val(),
                defenseCounselAddress       : $(".defense_counsel_address").val(),
                offendedParty               : $(".offended_party").val(),
                offendedPartyAddress        : $(".offended_party_address").val(),
                custody                     : $(".custody").val(),
                custodyOthers               : DropdownOthers.collect($(".custody"), $(".custody_others")),
                periodOfDetention           : $(".period_detention").val(),
                rorCustodian                : $(".ror_custodian").val(),
                rorCustodianAddress         : $(".ror_custodian_address").val(),
                extentParticipation         : $(".extent_participation").val(),
                extentParticipationOthers   : DropdownOthers.collect($(".extent_participation"), $(".extent_participation_others")),
                mannerofCommision           : $(".manner_commission").val(),
                offendersStatement          : $(".offenders_statement").val(),
                victimsStatement            : $(".victims_statement").val(),
                remarks                     : $(".remarks").val(),
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

        function saveWorksheet(existing, newPresentOffense) {

            // update identifyingData
            existing.presentOffense = newPresentOffense;

            let check = worksheetChecker(existing);

            // Decide worksheet status dynamically
            let status = check.isComplete ? "complete" : "incomplete";

            // If worksheetStatus is missing/null -> assign INCOMPLETE by default
            if (check.statusIsNull) {
                status = "INCOMPLETE";
            }

            return {
                petitionerId: client_id,
                docketNumber: WorksheetApi.docketNumber(),
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
                docketNumber: WorksheetApi.docketNumber(),
                jsonData: JSON.stringify(existing),
                type: "psir",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
            };
        }

        // event handler when selecting custody
        $('.custody').change(function(){
            if ($('.custody').val() == "on_detention") {
                $("#period_detention_field").show()
                $("#custodian_field").hide()
                $("#ror_custodian_address_field").hide()
                $(".ror_custodian").val("")
                $(".ror_custodian_address").val("")
            } else if ($('.custody').val() == "ror_custodian") {
                $("#period_detention_field").hide()
                $("#custodian_field").show()
                $("#ror_custodian_address_field").show()
                $(".period_detention").val("")
            } else {
                $("#period_detention_field").hide()
                $("#custodian_field").hide()
                $("#ror_custodian_address_field").hide()
                $(".period_detention").val("")
                $(".ror_custodian_address_field").hide()
                $(".ror_custodian").val("")
            }
        });

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
        // if (status === "null" || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();
            if (window.PsirPrefill) {
                PsirPrefill.fromWorksheet(client_id, "presentOffense", __executeExternalGet);
            }
        } else {
            __executeExternalGet(WorksheetApi.getUrl('psir')).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    var worksheetData = JSON.parse(result.jsonData);
                    var presentOffense = worksheetData.presentOffense;
                    console.log(worksheetData)
                    if (presentOffense) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".charged").val(presentOffense.chargedWith);
                        $(".date_charged_with").val(presentOffense.chargedWithDate);
                        $(".convicted_of").val(presentOffense.convictedOf);
                        $(".date_convicted_of").val(presentOffense.convictedOfDate);
                        $(".sentence").val(presentOffense.sentence);
                        $(".judge").val(presentOffense.judge);
                        $(".court").val(presentOffense.court);
                        $(".defense_counsel").val(presentOffense.defenseCounsel);
                        $(".defense_counsel_address").val(presentOffense.defenseCounselAddress);
                        $(".offended_party").val(presentOffense.offendedParty);
                        $(".offended_party_address").val(presentOffense.offendedPartyAddress);
                        $(".custody").val(presentOffense.custody).trigger("change");
                        $(".custody_others").val(presentOffense.custodyOthers);
                        $(".period_detention").val(presentOffense.periodOfDetention);
                        $(".ror_custodian").val(presentOffense.rorCustodian);
                        $(".ror_custodian_address").val(presentOffense.rorCustodianAddress);
                        $(".extent_participation").val(presentOffense.extentParticipation).trigger("change");
                        $(".extent_participation_others").val(presentOffense.extentParticipationOthers);
                        DropdownOthers.refresh();
                        $(".manner_commission").val(presentOffense.mannerofCommision);
                        $(".offenders_statement").val(presentOffense.offendersStatement);
                        $(".victims_statement").val(presentOffense.victimsStatement);
                        $(".remarks").val(presentOffense.remarks);
                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();
                    }
                    if (window.PsirPrefill) {
                        PsirPrefill.fromWorksheet(client_id, "presentOffense", __executeExternalGet);
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

            let data = collectPresentOffenseData();

            __executeExternalGet(WorksheetApi.getUrl('psir'))
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
                                    window.pisUrl('psir_prior_records?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
                            }, 2000);
                        });
                });
        });

        // evend handler for updating data
        $(".btn-update").unbind("click").on("click", function () {

            let data = collectPresentOffenseData();

            __executeExternalGet(WorksheetApi.getUrl('psir'))
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let priorRecordsAndDerogatoryRecord = workSheetData.priorRecordsAndDerogatoryRecord;
                    let familyBackgroundAndBirthData = workSheetData.familyBackgroundAndBirthData;
                    let presentSituation = workSheetData.presentSituation;
                    let educationAndJobHistory = workSheetData.educationAndJobHistory;
                    let medicalHistory = workSheetData.medicalHistory;
                    let traitsAndCommunityBackground = workSheetData.traitsAndCommunityBackground;
                    let analysisAndProjectedThrust = workSheetData.analysisAndProjectedThrust;
                    // let recommendation = workSheetData.recommendation;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, data, priorRecordsAndDerogatoryRecord, familyBackgroundAndBirthData, presentSituation, educationAndJobHistory, medicalHistory, traitsAndCommunityBackground, analysisAndProjectedThrust);

                    __executeExternalPost(
                        WorksheetApi.updateUrl('psir'),
                        JSON.stringify(payload)
                    ).done(function (res) {

                        if (res.status === "ERROR") return;

                        $('#update_success').show();

                        setTimeout(() => {
                            $('#update_success').hide();
                            $('#saveModal').modal("hide");

                            window.location.href =
                                window.pisUrl('psir_prior_records?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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
                        window.location.href = window.pisUrl('psir_' + psirType + '?' + WorksheetApi.pageQuery({ status: status }))
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("identifying_data")
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("medical_history");
        setupWorksheetClickHandler("traits_and_community_background");
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation");

    } )( jQuery );