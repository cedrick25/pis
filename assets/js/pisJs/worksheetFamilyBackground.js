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
        var status = GetURLParameter('status')

        function collectFamilybackground() {

            const siblings = [];
            const name = $(".sibling_name");
            const relationship = $(".sibling_relationship");
            const age = $(".sibling_age");
            const education = $(".sibling_education");
            const occupation = $(".sibling_occupation");

            for(var i = 0; i < name.length; i++){
                const list = {};
                list.name = $(name[i]).val();
                list.relationship = $(relationship[i]).val();
                list.age = $(age[i]).val();
                list.education = $(education[i]).val();
                list.occupation = $(occupation[i]).val();
                siblings.push(list);
            }

            return {

                siblings            : siblings,
                parentsRelationship : $(".relationship_with_parents").val(),
                parentsRelationshipOthers : DropdownOthers.collect($(".relationship_with_parents"), $(".relationship_with_parents_others")),
                civilStatus         : $(".civil_status").val(),
                civilStatusOthers   : DropdownOthers.collect($(".civil_status"), $(".civil_status_others")),

                fatherName          : $(".father_name").val(),
                fatherBday          : $(".father_birthday").val(),
                fatherBplace        : $(".father_birthplace").val(),
                fatherAge           : $(".father_age").val(),
                fatherAddress       : $(".father_address").val(),
                fatherCitizenship   : $(".father_citizenship").val(),
                fatherCitizenshipOthers : DropdownOthers.collect($(".father_citizenship"), $(".father_citizenship_others")),
                fatherReligion      : $(".father_religion").val(),
                fatherReligionOthers : DropdownOthers.collect($(".father_religion"), $(".father_religion_others")),
                fatherEducation     : $(".father_education").val(),
                fatherOccupation    : $(".father_occupation").val(),
                fatherWorkAddress   : $(".father_work_address").val(),
                fatherTelNo         : $(".father_tel_no").val(),
                fatherIncome        : $(".father_income").val(),
                // fatherDeceased      : $(".father_deceased").val(),
                fatherDeceasedCause : $(".father_deceased_cause").val(),
                fatherDateDeceased  : $(".father_date_deceased").val(),

                motherName          : $(".mother_name").val(),
                motherBday          : $(".mother_birthday").val(),
                motherBplace        : $(".mother_birthplace").val(),
                motherAge           : $(".mother_age").val(),
                motherAddress       : $(".mother_address").val(),
                motherCitizenship   : $(".mother_citizenship").val(),
                motherCitizenshipOthers : DropdownOthers.collect($(".mother_citizenship"), $(".mother_citizenship_others")),
                motherReligion      : $(".mother_religion").val(),
                motherReligionOthers : DropdownOthers.collect($(".mother_religion"), $(".mother_religion_others")),
                motherEducation     : $(".mother_education").val(),
                motherOccupation    : $(".mother_occupation").val(),
                motherWorkAddress   : $(".mother_work_address").val(),
                motherTelNo         : $(".mother_tel_no").val(),
                motherIncome        : $(".mother_income").val(),
                // motherDeceased      : $(".mother_deceased").val(),
                motherDeceasedCause : $(".mother_deceased_cause").val(),
                motherDateDeceased  : $(".mother_date_deceased").val(),

                familyRelationship          : $(".fam_relationship").val(),
                familyRelationshipOthers    : DropdownOthers.collect($(".fam_relationship"), $(".fam_relationship_others")),
                majorFamilyProblem          : $(".family_problems").val(),
                majorFamilyProblemOthers    : DropdownOthers.collect($(".family_problems"), $(".family_problems_others")),
                familyReputation            : $(".family_reputation").val(),
                familyReputationOthers      : DropdownOthers.collect($(".family_reputation"), $(".family_reputation_others")),
                familyEconomic              : $(".family_economic").val(),
                familyEconomicOthers        : DropdownOthers.collect($(".family_economic"), $(".family_economic_others")),
                homeCondition               : $(".home_condition").val(),
                homeConditionOthers         : DropdownOthers.collect($(".home_condition"), $(".home_condition_others")),
                stabilityOfResidence        : $(".residence_stability").val(),
                stabilityOfResidenceOthers  : DropdownOthers.collect($(".residence_stability"), $(".residence_stability_others")),
                commentsOnBehavior          : $(".comments_behavior").val(),
                childhoodCircumstances      : $(".childhood_circumstances").val(),
                childhoodCircumstancesOthers : DropdownOthers.collect($(".childhood_circumstances"), $(".childhood_circumstances_others")),
                explainCircumstances        : $(".explain_circumtances").val(),

            };
        }

        function worksheetChecker(data) {

            if (!data) data = {};

            const REQUIRED_SECTIONS = [
                "identifyingData",
                "presentOffense",
                "educationHistory",
                "employmentHistory"
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

        function saveWorksheet(existing, newIdentifyingData, newPresentOffense, newPriorRecord, newIdentificationData, newFamilyBackground) {

            // update identifyingData
            existing.identifyingData = newIdentifyingData;
            existing.presentOffense = newPresentOffense;
            existing.priorRecords = newPriorRecord;
            existing.identificationData = newIdentificationData;
            existing.familyBackground = newFamilyBackground;

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
                type: "worksheet",
                worksheetStatus: status,
                createdBy: $.cookie("uuid"),
                fieldOfficeId: $.cookie("field_office_id")
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
                statusIsNull: !data.worksheetStatus || data.worksheetStatus === "null"
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

        function saveWorksheet(existing, newFamilyBackground) {

            // update identifyingData
            existing.familyBackground = newFamilyBackground;

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
                docketNumber: WorksheetApi.docketNumber(),
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

        let siblingCounter = 0;

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();
        } else {
            __executeExternalGet(WorksheetApi.getUrl('worksheet')).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    let workSheetData = JSON.parse(result.jsonData);
                    let familyBackground = workSheetData.familyBackground;
                    if (familyBackground) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $(".civil_status").val(familyBackground.civilStatus).trigger("change");
                        $(".civil_status_others").val(familyBackground.civilStatusOthers);
                        $(".relationship_with_parents").val(familyBackground.parentsRelationship).trigger("change");
                        $(".relationship_with_parents_others").val(familyBackground.parentsRelationshipOthers);

                        $(".father_name").val(familyBackground.fatherName);
                        $(".father_birthday").val(familyBackground.fatherBday);
                        $(".father_birthplace").val(familyBackground.fatherBplace);
                        $(".father_age").val(familyBackground.fatherAge);
                        $(".father_address").val(familyBackground.fatherAddress);
                        $(".father_citizenship").val(familyBackground.fatherCitizenship).trigger("change");
                        $(".father_citizenship_others").val(familyBackground.fatherCitizenshipOthers);
                        $(".father_religion").val(familyBackground.fatherReligion).trigger("change");
                        $(".father_religion_others").val(familyBackground.fatherReligionOthers);
                        $(".father_education").val(familyBackground.fatherEducation);
                        $(".father_occupation").val(familyBackground.fatherOccupation);
                        $(".father_work_address").val(familyBackground.fatherWorkAddress);
                        $(".father_tel_no").val(familyBackground.fatherTelNo);
                        $(".father_income").val(familyBackground.fatherIncome);
                        $(".father_date_deceased").val(familyBackground.fatherDateDeceased);
                        $(".father_deceased_cause").val(familyBackground.fatherDeceasedCause);

                        $(".mother_name").val(familyBackground.motherName);
                        $(".mother_birthday").val(familyBackground.motherBday);
                        $(".mother_birthplace").val(familyBackground.motherBplace);
                        $(".mother_age").val(familyBackground.motherAge);
                        $(".mother_address").val(familyBackground.motherAddress);
                        $(".mother_citizenship").val(familyBackground.motherCitizenship).trigger("change");
                        $(".mother_citizenship_others").val(familyBackground.motherCitizenshipOthers);
                        $(".mother_religion").val(familyBackground.motherReligion).trigger("change");
                        $(".mother_religion_others").val(familyBackground.motherReligionOthers);
                        $(".mother_education").val(familyBackground.motherEducation);
                        $(".mother_occupation").val(familyBackground.motherOccupation);
                        $(".mother_work_address").val(familyBackground.motherWorkAddress);
                        $(".mother_tel_no").val(familyBackground.motherTelNo);
                        $(".mother_income").val(familyBackground.motherIncome);
                        $(".mother_date_deceased").val(familyBackground.motherDateDeceased);
                        $(".mother_deceased_cause").val(familyBackground.motherDeceasedCause);

                        $(".fam_relationship").val(familyBackground.familyRelationship).trigger("change");
                        $(".fam_relationship_others").val(familyBackground.familyRelationshipOthers);
                        $(".family_problems").val(familyBackground.majorFamilyProblem).trigger("change");
                        $(".family_problems_others").val(familyBackground.majorFamilyProblemOthers);
                        $(".family_reputation").val(familyBackground.familyReputation).trigger("change");
                        $(".family_reputation_others").val(familyBackground.familyReputationOthers);
                        $(".family_economic").val(familyBackground.familyEconomic).trigger("change");
                        $(".family_economic_others").val(familyBackground.familyEconomicOthers);
                        $(".home_condition").val(familyBackground.homeCondition).trigger("change");
                        $(".home_condition_others").val(familyBackground.homeConditionOthers);
                        $(".residence_stability").val(familyBackground.stabilityOfResidence).trigger("change");
                        $(".residence_stability_others").val(familyBackground.stabilityOfResidenceOthers);
                        $(".comments_behavior").val(familyBackground.commentsOnBehavior);
                        $(".childhood_circumstances").val(familyBackground.childhoodCircumstances).trigger("change");
                        $(".childhood_circumstances_others").val(familyBackground.childhoodCircumstancesOthers);
                        $(".explain_circumtances").val(familyBackground.explainCircumstances);
                        DropdownOthers.refresh();



                        familyBackground.siblings.forEach(function(data, index){
                            $("#siblings_list").append(`
                                <li class="list-group-item d-flex align-items-center" id="sibling_list_${index}">
                                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                        <label class="form-control-label">Name</label>
                                        <input type="text" placeholder="Name" class="form-control sibling_name" value="${data.name}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Degree of Relationship</label>
                                        <input type="text" placeholder="Degree of Relationship" class="form-control sibling_relationship" value="${data.relationship}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Age</label>
                                        <input type="text" placeholder="Age" class="form-control sibling_age" value="${data.age}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Educational Attainment</label>
                                        <input type="text" placeholder="Educational Attainment" class="form-control sibling_education" value="${data.education}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Occupation</label>
                                        <input type="text" placeholder="Occupation" class="form-control sibling_occupation" value="${data.occupation}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="sibling_button_group_${index}">
                                    </div>
                                </li>

                                `
                            )
                            siblingCounter += 1;
                            if (index === 0) {
                                $(`#sibling_button_group_${index}`).append(`
                                        <button type="button" class="btn btn-primary btn-addSibling btn-sm" style="border-radius:2px;" data-id="${index}">
                                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                        </button>
                                `)
                            } else {
                                $(`#sibling_button_group_${index}`).append(`
                                    <button type="button" class="btn btn-danger btn-delSibling btn-sm" style="border-radius:2px;" data-id="${index}">
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                    } else {
                        
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $("#siblings_list").append(`
                            <li class="list-group-item d-flex align-items-center" id="sibling_list_${siblingCounter}">
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Name</label>
                                    <input type="text" placeholder="Name" class="form-control sibling_name">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Degree of Relationship</label>
                                    <input type="text" placeholder="Degree of Relationship" class="form-control sibling_relationship">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Age</label>
                                    <input type="text" placeholder="Age" class="form-control sibling_age">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Educational Attainment</label>
                                    <input type="text" placeholder="Educational Attainment" class="form-control sibling_education">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Occupation</label>
                                    <input type="text" placeholder="Occupation" class="form-control sibling_occupation">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addSibling btn-sm" style="border-radius:2px;">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>

                            `
                        )
                    }
                }
            })
        }

        $(document).on("click", ".btn-addSibling", function(){
            $("#siblings_list").append(`
                <li class="list-group-item d-flex align-items-center" id="sibling_list_${siblingCounter}">
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Name</label>
                        <input type="text" placeholder="Name" class="form-control sibling_name">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Degree of Relationship</label>
                        <input type="text" placeholder="Degree of Relationship" class="form-control sibling_relationship">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control sibling_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control sibling_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Occupation</label>
                        <input type="text" placeholder="Occupation" class="form-control sibling_occupation">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delSibling btn-sm" style="border-radius:2px;" data-id="${siblingCounter}">
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>

                `
            )
            siblingCounter += 1;
        });

        $(document).on("click", ".btn-delSibling", function(){
            var id = $(this).data("id")
            $(`#sibling_list_${id}`).remove()
        });

        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectFamilybackground();

            __executeExternalGet(WorksheetApi.getUrl('worksheet'))
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = saveWorksheet(existing, data);

                    __executeExternalPost("8000/worksheet/create", JSON.stringify(payload))
                        .done(function (res) {

                            if (res.status === "ERROR") return;

                            function finish() {
                            $(".form-control").val('');
                            $('#create_success').show();

                            setTimeout(() => {
                                $('#create_success').hide();
                                $('#saveModal').modal("hide");
                                window.location.href =
                                    window.pisUrl('worksheet_present_situation?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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

            let data = collectFamilybackground();

            __executeExternalGet(WorksheetApi.getUrl('worksheet'))
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecords = workSheetData.priorRecords;
                    let identificationData = workSheetData.identificationData;
                    let presentSituation = workSheetData.presentSituation;
                    let educationalHistory = workSheetData.educationalHistory;
                    let employmentHistory = workSheetData.employmentHistory;
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecords, identificationData, data, presentSituation, educationalHistory, employmentHistory, communityBackground);
                    console.log(JSON.parse(payload.jsonData))

                    __executeExternalPost(WorksheetApi.updateUrl('worksheet'), JSON.stringify(payload))
                        .done(function (res) {
                            if (res.status === "ERROR") return;
                            function finish() {
                            $(".form-control").val('');
                            $('#update_success').show();
                            $("#saveModal .btn-update").prop("disabled", true)

                            setTimeout(() => {
                                $('#update_success').hide();
                                $('#saveModal').modal("hide");
                                $("#saveModal .btn-update").prop("disabled", false)
                                window.location.href =
                                    window.pisUrl('worksheet_present_situation?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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
                        $(".overlay").hide();
                        window.location.href = window.pisUrl('worksheet_' + worksheetType + '?' + WorksheetApi.pageQuery({ status: status }));
                    }, 500);
                });
            });
        }
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("identification_data");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor");
    } )( jQuery );