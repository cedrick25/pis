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
        var status = GetURLParameter("status");

        function collectEducationalHistory() {

            return {
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
                postCollegeLevel     : $(".postCollege_lvl").val(),
                postCollegeWhere     : $(".postCollege_where").val(),
                postCollegeHigh      : $(".postCollege_high").val(),
                postCollegeAward     : $(".postCollege_award").val(),
                postCollegeDate      : $(".postCollege_date").val(),
                vocLevel          : $(".voc_lvl").val(),
                vocWhere          : $(".voc_where").val(),
                vocHigh           : $(".voc_high").val(),
                vocAward          : $(".voc_award").val(),
                vocDate           : $(".voc_date").val(),
                unschooled          : $(".unschooled").val(),
                conductInSchoolExplain       : $(".explain").val(),
                conductInSchool           : $(".conduct_in_school").val()
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

        function saveWorksheet(existing, newEducationalHistory) {

            // update identifyingData
            existing.educationalHistory = newEducationalHistory;

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
                    let educationalHistory = workSheetData.educationalHistory;
                    if (educationalHistory) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".elem_lvl").val(educationalHistory.elemLevel)
                        $(".elem_where").val(educationalHistory.elemWhere)
                        $(".elem_high").val(educationalHistory.elemHigh)
                        $(".elem_award").val(educationalHistory.elemAward)
                        $(".elem_date").val(educationalHistory.elemDate)
                        $(".sec_lvl").val(educationalHistory.secLevel)
                        $(".sec_where").val(educationalHistory.secWhere)
                        $(".sec_high").val(educationalHistory.secHigh)
                        $(".sec_award").val(educationalHistory.secAward)
                        $(".sec_date").val(educationalHistory.secDate)
                        $(".college_lvl").val(educationalHistory.collegeLevel)
                        $(".college_where").val(educationalHistory.collegeWhere)
                        $(".college_high").val(educationalHistory.collegeHigh)
                        $(".college_award").val(educationalHistory.collegeAward)
                        $(".college_date").val(educationalHistory.collegeDate)
                        $(".postCollege_lvl").val(educationalHistory.postCollegeLevel)
                        $(".postCollege_where").val(educationalHistory.postCollegeWhere)
                        $(".postCollege_high").val(educationalHistory.postCollegeHigh)
                        $(".postCollege_award").val(educationalHistory.postCollegeAward)
                        $(".postCollege_date").val(educationalHistory.postCollegeDate)
                        $(".voc_lvl").val(educationalHistory.vocLevel)
                        $(".voc_where").val(educationalHistory.vocWhere)
                        $(".voc_high").val(educationalHistory.vocHigh)
                        $(".voc_award").val(educationalHistory.vocAward)
                        $(".voc_date").val(educationalHistory.vocDate)
                        var unschooledValue = educationalHistory.unschooled === "illeterate"
                            ? "illiterate"
                            : educationalHistory.unschooled;
                        $(".unschooled").val(unschooledValue).trigger("change")
                        $(".explain").val(educationalHistory.conductInSchoolExplain)
                        $(".conduct_in_school").val(educationalHistory.conductInSchool).trigger("change")

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

            let data = collectEducationalHistory();

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
                                    `${api}/pis/worksheet_employment_history?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
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

            let data = collectEducationalHistory();

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
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecords, identificationData, familyBackground, presentSituation, data, employmentHistory, communityBackground);
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
                                window.location.href =`${api}/pis/worksheet_employment_history?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
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
                        // $(".overlay").hide();
                        window.location.href = `${api}/pis/worksheet_${worksheetType}?client_id=${client_id}&field_office_id=${foid}&status=${status}`;
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
        setupWorksheetClickHandler("environmental_factor");

    } )( jQuery );