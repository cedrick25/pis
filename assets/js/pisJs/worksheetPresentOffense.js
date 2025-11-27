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
        var status = GetURLParameter('status');

        function collectPresentOffenseData() {
            return {
                chargedWith                 : $(".charged").val(),
                chargedWithDate             : $(".date_charged_with").val(),
                commisionPlace              : $(".place_commission").val(),
                commisionPlaceDate          : $(".place_commision_date").val(),
                convictedOf                 : $(".convicted_of").val(),
                convictedOfDate             : $(".date_convicted_of").val(),
                sentence                    : $(".sentence").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                arrestingOfficer            : $(".arresting_officer").val(),
                arrestingOfficerAddress     : $(".arresting_office_address").val(),
                defenseCounsel              : $(".defense_counsel").val(),
                defenseCounselAddress       : $(".defense_counsel_address").val(),
                prosecutor                  : $(".prosecutor").val(),
                prosecutorAddress           : $(".prosecutor_address").val(),
                offendedParty               : $(".offended_party").val(),
                offendedPartyAddress        : $(".offended_party_address").val(),
                coAccused                   : $(".co_accused").val(),
                aggravatingCirsumstances    : $(".aggravating_circumstances").val(),
                mitigatingCircumstances     : $(".mitigating_circumstances").val(),
                custody                     : $(".custody").val(),
                periodOfDetention           : $(".period_detention").val(),
                rorCustodian                : $(".ror_custodian").val(),
                rorCustodianAddress         : $(".ror_custodian_address").val(),
                extentParticipation         : $(".extent_participation").val(),
                mannerofCommision           : $(".manner_commission").val(),
                motives                     : $(".motives").val(),
                explain                     : $(".explain").val(),
            };
        }

        function worksheetChecker(data) {

            if (!data) data = {};

            const REQUIRED_SECTIONS = [
                "identifyingData",
                "presentOffense",
                "priorRecords",
                "identificationData",
                "familyBackground",
                "presentSituation",
                "educationalHistory",
                "employmentHistory",
                "communityBackground"
            ];

            let result = {
                missingSections: [],
                completedSections: [],
                // statusIsNull: !data.worksheetStatus || data.worksheetStatus === "null"
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
                jsonData: JSON.stringify(existing),
                type: "worksheet",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
            };
        }

        function updateWorksheet(existing, newIdentifyingData, newPresentOffense, 
            newPriorRecord, newIdentificationData, newFamilyBackground, 
            newPresentSituation, newEducationalHistory, newEmploymentHistory, 
            newCommunityBackground) {

            // update identifyingData
            existing.identifyingData = newIdentifyingData;
            existing.presentOffense = newPresentOffense;
            existing.priorRecords = newPriorRecord;
            existing.identificationData = newIdentificationData;
            existing.familyBackground = newFamilyBackground;
            existing.presentSituation = newPresentSituation;
            existing.educationalHistory = newEducationalHistory;
            existing.employmentHistory = newEmploymentHistory;
            existing.communityBackground = newCommunityBackground;

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
                type: "worksheet",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
            };
        }

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();
        } else {
            __executeExternalGet('8000/worksheet/getPetitioner/worksheet/'+client_id).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    let workSheetData = JSON.parse(result.jsonData);
                    let presentOffense = workSheetData.presentOffense;
                    if (presentOffense) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".charged").val(presentOffense.chargedWith);
                        $(".date_charged_with").val(presentOffense.chargedWithDate);
                        $(".place_commission").val(presentOffense.commisionPlace);
                        $(".place_commision_date").val(presentOffense.commisionPlaceDate);
                        $(".convicted_of").val(presentOffense.convictedOf);
                        $(".date_convicted_of").val(presentOffense.convictedOfDate);
                        $(".sentence").val(presentOffense.sentence);
                        $(".judge").val(presentOffense.judge);
                        $(".court").val(presentOffense.court);
                        $(".arresting_officer").val(presentOffense.arrestingOfficer);
                        $(".arresting_office_address").val(presentOffense.arrestingOfficerAddress);
                        $(".defense_counsel").val(presentOffense.defenseCounsel);
                        $(".defense_counsel_address").val(presentOffense.defenseCounselAddress);
                        $(".prosecutor").val(presentOffense.prosecutor);
                        $(".prosecutor_address").val(presentOffense.prosecutorAddress);
                        $(".offended_party").val(presentOffense.offendedParty);
                        $(".offended_party_address").val(presentOffense.offendedPartyAddress);
                        $(".co_accused").val(presentOffense.coAccused);
                        $(".aggravating_circumstances").val(presentOffense.aggravatingCirsumstances);
                        $(".mitigating_circumstances").val(presentOffense.mitigatingCircumstances);
                        $(".custody").val(presentOffense.custody).trigger("change");
                        $(".period_detention").val(presentOffense.periodOfDetention);
                        $(".ror_custodian").val(presentOffense.rorCustodian);
                        $(".ror_custodian_address").val(presentOffense.rorCustodianAddress);
                        $(".extent_participation").val(presentOffense.extentParticipation).trigger("change");
                        $(".manner_commission").val(presentOffense.mannerofCommision);
                        $(".motives").val(presentOffense.motives).trigger("change");
                        $(".explain").val(presentOffense.explain);
                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                    }
                }
            })
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

        // event handler for showing modal upon saving and updating data
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })
        
        // event handler for saving data
        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectPresentOffenseData();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = saveWorksheet(existing, data);

                    __executeExternalPost("8000/worksheet/create", JSON.stringify(payload))
                        .done(function (res) {

                            if (res.status === "ERROR") return;

                            $(".form-control").val('');
                            $('#save_success').show();

                            setTimeout(() => {
                                $('#save_success').hide();
                                $('#saveModal').modal("hide");
                                window.location.href =
                                    `${api}/pis/worksheet_prior_records?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
                            }, 2000);
                        });
                });
        });

        // event handler for updating data
        $("#saveModal .btn-update").unbind("click").on("click", function () {

            let data = collectPresentOffenseData();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let priorRecords = workSheetData.priorRecords;
                    let identificationData = workSheetData.identificationData;
                    let familyBackground = workSheetData.familyBackground;
                    let presentSituation = workSheetData.presentSituation;
                    let educationalHistory = workSheetData.educationalHistory;
                    let employmentHistory = workSheetData.employmentHistory;
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, data, priorRecords, identificationData, familyBackground, presentSituation, educationalHistory, employmentHistory, communityBackground);
                    console.log(JSON.parse(payload.jsonData))
                    __executeExternalPost(`8000/worksheet/updatePetitioner/worksheet/${client_id}`, JSON.stringify(payload))
                        .done(function (res) {
                            if (res.status === "ERROR") return;
                            $(".form-control").val('');
                            $('#create_success').show();
                            $("#saveModal .btn-save").prop("disabled", true)

                            setTimeout(() => {
                                $('#create_success').hide();
                                $('#saveModal').modal("hide");
                                $("#saveModal .btn-save").prop("disabled", false)
                                window.location.href =
                                    `${api}/pis/worksheet_prior_records?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
                            }, 2000);
                        });
                });
        });

        function setupWorksheetClickHandler(worksheetType) {
            $(`.${worksheetType}`).unbind("click").on("click", function () {
                var tabName = $(this).data("name")
                $(".warningModalTitle").text(`${tabName} Tab`)
                $("#tabName").text(tabName)
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    setTimeout(function () {
                        $(".overlay").hide();
                        // window.location.href = `${api}/pis/worksheet_${worksheetType}?client_id=${client_id}`;
                        window.location.href = `${api}/pis/worksheet_${worksheetType}?client_id=${client_id}&field_office_id=${foid}&status=${status}`
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("identification_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor");


    } )( jQuery );