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
        var status = GetURLParameter("status")

        function collectCommunityBackground() {

            return {
                neighborhood            : $(".neighborhood").val(),
                describeNeighborhood    : $(".neighborhoodDescribe").val(),
                criminalityInNeighborhood               : $(".neighCrim").val(),
                criminalityExplain      : $(".criminalityExplain").val(),
                communityAcceptance           : $(".comAcceptance").val(),
                communityAcceptanceSpecify       : $(".acceptanceSpecify").val(),
                peerRelationship                 : $(".peerRel").val(),
                peerRelationshipSpecify             : $(".peerSpecify").val(),
                neighborhoodArea                    : $(".area").val(),
                resourcesForRehabilitation                    : $(".resourcesForRehabilition").val(),
                resourcesForRehabilitationSpecify                    : $(".resourcesForRehabilitionSpecify").val()
            };
        }

        function normalizeNeighborhoodArea(value) {
            if (value == null || value === "") return value;
            var key = String(value).toLowerCase().replace(/[\s-]+/g, "_");
            if (key.indexOf("non") !== -1 && key.indexOf("slum") !== -1) return "non_slum_area";
            if (key.indexOf("slum") !== -1) return "slum_area";
            return value;
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

            console.log(result)

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

        function saveWorksheet(existing, newCommunityBackground) {

            // update identifyingData
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

        // event handler for showing modal upon saving and updating data
        // $(document).on("click", ".btn-saveData", function(){
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })

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
                    let communityBackground = workSheetData.communityBackground;
                    if (communityBackground) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".neighborhood").val(communityBackground.neighborhood).trigger("change")
                        $(".neighborhoodDescribe").val(communityBackground.describeNeighborhood)
                        $(".neighCrim").val(communityBackground.criminalityInNeighborhood).trigger("change")
                        $(".criminalityExplain").val(communityBackground.criminalityExplain)
                        $(".comAcceptance").val(communityBackground.communityAcceptance).trigger("change")
                        $(".acceptanceSpecify").val(communityBackground.communityAcceptanceSpecify)
                        $(".peerRel").val(communityBackground.peerRelationship).trigger("change")
                        $(".peerSpecify").val(communityBackground.peerRelationshipSpecify)
                        $(".area").val(normalizeNeighborhoodArea(communityBackground.neighborhoodArea)).trigger("change")
                        $(".resourcesForRehabilition").val(communityBackground.resourcesForRehabilitation).trigger("change")
                        $(".resourcesForRehabilitionSpecify").val(communityBackground.resourcesForRehabilitationSpecify)


                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();
                    }
                }
            })
        }


        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectCommunityBackground();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = saveWorksheet(existing, data);

                    __executeExternalPost("8000/worksheet/create", JSON.stringify(payload))
                        .done(function (res) {

                            if (res.status === "ERROR") return;

                            function finish() {
                            $(".form-control").val('');
                            $('#save_success').show();

                            setTimeout(() => {
                                $('#save_success').hide();
                                $('#saveModal').modal("hide");
                                window.location.href =
                                    window.pisUrl(`worksheet_environmental_factor?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
                            }, 2000);
                            }
                            if (window.PsirPrefill && PsirPrefill.afterSave) {
                                PsirPrefill.afterSave(client_id, __executeExternalGet, __executeExternalPost, finish);
                            } else {
                                finish();
                            }
                        });
                });
        });

        // event handler for updating data
        $("#saveModal .btn-update").unbind("click").on("click", function () {

            let data = collectCommunityBackground();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecords = workSheetData.priorRecords;
                    let familyBackground = workSheetData.familyBackground;
                    let identificationData = workSheetData.identificationData;
                    let presentSituation = workSheetData.presentSituation;
                    let employmentHistory = workSheetData.employmentHistory;
                    let educationalHistory = workSheetData.educationalHistory;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecords, identificationData, familyBackground, presentSituation, educationalHistory, employmentHistory, data);
                    // console.log(payload)

                    __executeExternalPost(`8000/worksheet/updatePetitioner/worksheet/${client_id}`, JSON.stringify(payload))
                        .done(function (res) {
                            if (res.status === "ERROR") return;
                            function finish() {
                            $(".form-control").val('');
                            $('#create_success').show();
                            $("#saveModal .btn-save").prop("disabled", true)

                            setTimeout(() => {
                                $('#create_success').hide();
                                $('#saveModal').modal("hide");
                                $("#saveModal .btn-save").prop("disabled", false)
                                window.location.href =window.pisUrl(`worksheet_environmental_factor?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`);
                            }, 2000);
                            }
                            if (window.PsirPrefill && PsirPrefill.afterSave) {
                                PsirPrefill.afterSave(client_id, __executeExternalGet, __executeExternalPost, finish);
                            } else {
                                finish();
                            }
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
                        window.location.href = window.pisUrl(`worksheet_${worksheetType}?client_id=${client_id}&field_office_id=${foid}&status=${status}`);
                    }, 500);
                });
            });
        }
            
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("identification_data");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("education_history");

    } )( jQuery );