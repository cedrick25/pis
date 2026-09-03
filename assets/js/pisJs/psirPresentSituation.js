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

        function collectPresentSituation() {

            const children = [];
            const age = $(".children_age");
            const school = $(".children_school");
            const education = $(".children_education");
            const legitimate = $(".children_legitimate");
            const illegitimate = $(".children_illegitimate");

            for (var i = 0; i < age.length; i++) {
                const list = {};
                list.age = $(age[i]).val();
                list.school = $(school[i]).val();
                list.education = $(education[i]).val();
                list.legitimate = $(legitimate[i]).val();
                list.illegitimate = $(illegitimate[i]).val();
                children.push(list);
            }


            return {
                civilStatus : $(".civil_status").val(),
                civilStatusOthers : DropdownOthers.collect($(".civil_status"), $(".civil_status_others")),
                statusOfMarriage : $(".status_of_marriage").val(),
                otherStatusOfMarriage : $(".other_married_status").val(),
                remarksCivilStatus : $(".remarks_civil_status").val(),
                spouseName : $(".spouse_name").val(),
                spouseAge : $(".spouse_age").val(),
                spouseSex : $(".spouse_sex").val(),
                spouseSexOthers : DropdownOthers.collect($(".spouse_sex"), $(".spouse_sex_others")),
                spouseOccupation : $(".spouse_occupation").val(),
                spouseHomeAddress : $(".spouse_home_address").val(),
                spouseWorkAddress : $(".spouse_work_address").val(),
                totalNoOfchildren : $(".total_children").val(),
                childrenRelationship : $(".relationship_with_children").val(),
                childrenRelationshipOthers : DropdownOthers.collect($(".relationship_with_children"), $(".relationship_with_children_others")),
                remarksInChildren : $(".remarks_children").val(),
                dwelling : $(".dwelling").val(),
                dwellingOthers : DropdownOthers.collect($(".dwelling"), $(".dwelling_others")),
                yearsStayedOwned : $(".years_of_stay_owned").val(),
                yearsStayedRented : $(".years_of_stay_rented").val(),
                residenceStability : $(".stability_residence").val(),
                residenceStabilityOthers : DropdownOthers.collect($(".stability_residence"), $(".stability_residence_others")),
                physicalHomeCondition : $(".physical_home_conditions").val(),
                physicalHomeConditionOthers : DropdownOthers.collect($(".physical_home_conditions"), $(".physical_home_conditions_others")),
                familyEconomicStatus : $(".family_economic_status").val(),
                familyEconomicStatusOthers : DropdownOthers.collect($(".family_economic_status"), $(".family_economic_status_others")),
                familyBreadwinner: $(".family_breadwinner").val(),
                familyBreadwinnerOthers : DropdownOthers.collect($(".family_breadwinner"), $(".family_breadwinner_others")),
                roleInTheFamily : $(".role_in_the_family").val(),
                roleInTheFamilyOthers : DropdownOthers.collect($(".role_in_the_family"), $(".role_in_the_family_others")),
                incomeContributor : $(".income_contributor").val(),
                incomeContributorOthers : DropdownOthers.collect($(".income_contributor"), $(".income_contributor_others")),
                majorFamilyProblem : $(".major_family_problem").val(),
                otherFamilyProblem : $(".other_famiy_problem").val(),
                remarksInPetitionersSituation : $(".remarks_situation").val(),
                children : children,
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

        function saveWorksheet(existing, newPresentSituation) {

            // update identifyingData
            existing.presentSituation = newPresentSituation;

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


        let childrenCounter = 0;
        var suppressCivilStatusClear = false;

        function resetChildrenList() {
            childrenCounter = 0;
            $("#children_list").empty().append(`
                <li class="list-group-item d-flex align-items-center" id="children_list_${childrenCounter}">
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">In/Out of School</label>
                        <input type="text" placeholder="In/Out of School" class="form-control children_school">
                    </div>
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Legitimate</label>
                        <input type="text" placeholder="Legitimate" class="form-control children_legitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Illegitimate</label>
                        <input type="text" placeholder="Illegitimate" class="form-control children_illegitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `);
        }

        function clearSpouseAndChildrenFields() {
            $(".spouse_name, .spouse_age, .spouse_occupation, .spouse_home_address, .spouse_work_address, .total_children, .remarks_children").val("");
            $(".spouse_sex").val(null).trigger("change");
            $(".relationship_with_children").val(null).trigger("change");
            resetChildrenList();
        }

        function toggleSpouseChildrenByCivilStatus(civilStatus, shouldClear) {
            var isSingle = civilStatus === "single";
            if (isSingle) {
                $("#spouse_section").hide();
                $("#children_section").hide();
                if (shouldClear) {
                    clearSpouseAndChildrenFields();
                }
            } else {
                $("#spouse_section").show();
                $("#children_section").show();
            }
        }

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
        // if (status === "null" || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();

            // append the children list
            $("#children_list").append(`
                <li class="list-group-item d-flex align-items-center" id="children_list_${childrenCounter}">
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">In/Out of School</label>
                        <input type="text" placeholder="In/Out of School" class="form-control children_school">
                    </div>
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Legitimate</label>
                        <input type="text" placeholder="Legitimate" class="form-control children_legitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Illegitimate</label>
                        <input type="text" placeholder="Illegitimate" class="form-control children_illegitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `)
            if (window.PsirPrefill) {
                PsirPrefill.fromWorksheet(client_id, "presentSituation", __executeExternalGet).done(function (applied) {
                    if (applied && typeof window.__psirPrefillChildrenCounter === "number") {
                        childrenCounter = window.__psirPrefillChildrenCounter;
                    }
                    toggleSpouseChildrenByCivilStatus($(".civil_status").val(), $(".civil_status").val() === "single");
                });
            }
        } else {
            __executeExternalGet(WorksheetApi.getUrl('psir')).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    var worksheetData = JSON.parse(result.jsonData);
                    var presentSituation = worksheetData.presentSituation;
                    console.log(worksheetData)
                    if (presentSituation) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        suppressCivilStatusClear = true;
                        $(".civil_status").val(presentSituation.civilStatus).trigger("change")
                        $(".civil_status_others").val(presentSituation.civilStatusOthers)
                        $(".status_of_marriage").val(presentSituation.statusOfMarriage).trigger("change")
                        $(".other_married_status").val(presentSituation.otherStatusOfMarriage)
                        $(".relationship_with_children").val(presentSituation.childrenRelationship).trigger("change")
                        $(".relationship_with_children_others").val(presentSituation.childrenRelationshipOthers)
                        $(".remarks_children").val(presentSituation.remarksInChildren)
                        $(".dwelling").val(presentSituation.dwelling).trigger("change")
                        $(".dwelling_others").val(presentSituation.dwellingOthers)
                        $(".years_of_stay_owned").val(presentSituation.yearsStayedOwned)
                        $(".years_of_stay_rented").val(presentSituation.yearsStayedRented)
                        $(".stability_residence").val(presentSituation.residenceStability).trigger("change")
                        $(".stability_residence_others").val(presentSituation.residenceStabilityOthers)
                        $(".physical_home_conditions").val(presentSituation.physicalHomeCondition).trigger("change")
                        $(".physical_home_conditions_others").val(presentSituation.physicalHomeConditionOthers)
                        $(".family_economic_status").val(presentSituation.familyEconomicStatus).trigger("change")
                        $(".family_economic_status_others").val(presentSituation.familyEconomicStatusOthers)
                        $(".family_breadwinner").val(presentSituation.familyBreadwinner).trigger("change")
                        $(".family_breadwinner_others").val(presentSituation.familyBreadwinnerOthers)
                        $(".role_in_the_family").val(presentSituation.roleInTheFamily).trigger("change")
                        $(".role_in_the_family_others").val(presentSituation.roleInTheFamilyOthers)
                        $(".income_contributor").val(presentSituation.incomeContributor).trigger("change")
                        $(".income_contributor_others").val(presentSituation.incomeContributorOthers)
                        $(".major_family_problem").val(presentSituation.majorFamilyProblem).trigger("change")
                        $(".other_famiy_problem").val(presentSituation.otherFamilyProblem)
                        $(".remarks_situation").val(presentSituation.remarksInPetitionersSituation)
                        $(".remarks_civil_status").val(presentSituation.remarksCivilStatus)
                        $(".total_children").val(presentSituation.totalNoOfchildren)

                        $(".spouse_name").val(presentSituation.spouseName)
                        $(".spouse_age").val(presentSituation.spouseAge)
                        $(".spouse_sex").val(presentSituation.spouseSex).trigger("change")
                        $(".spouse_sex_others").val(presentSituation.spouseSexOthers)
                        DropdownOthers.refresh();
                        $(".spouse_occupation").val(presentSituation.spouseOccupation)
                        $(".spouse_home_address").val(presentSituation.spouseHomeAddress)
                        $(".spouse_work_address").val(presentSituation.spouseWorkAddress)

                        if (presentSituation.children) {
                            presentSituation.children.forEach(function(data, index){
                                $("#children_list").append(`
                                    <li class="list-group-item d-flex align-items-center" id="children_list_${childrenCounter}">
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Age</label>
                                            <input type="text" placeholder="Age" class="form-control children_age" value="${data.age}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">In/Out of School</label>
                                            <input type="text" placeholder="In/Out of School" class="form-control children_school" value="${data.school}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                            <label class="form-control-label">Educational Attainment</label>
                                            <input type="text" placeholder="Educational Attainment" class="form-control children_education" value="${data.education}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Legitimate</label>
                                            <input type="text" placeholder="Legitimate" class="form-control children_legitimate" value="${data.legitimate}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Illegitimate</label>
                                            <input type="text" placeholder="Illegitimate" class="form-control children_illegitimate" value="${data.illegitimate}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="children_button_group_${index}">
                                        </div>
                                    </li>
                                `)
                                childrenCounter += 1;

                                if (index === 0) {
                                    $(`#children_button_group_${index}`).append(`
                                        <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                        </button>
                                    `)
                                } else {
                                    $(`#children_button_group_${index}`).append(`
                                        <button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                        </button>
                                    `)
                                }
                            })
                        }
                        toggleSpouseChildrenByCivilStatus(presentSituation.civilStatus, presentSituation.civilStatus === "single");
                        suppressCivilStatusClear = false;
                        if (window.PsirPrefill) {
                            PsirPrefill.fromWorksheet(client_id, "presentSituation", __executeExternalGet).done(function (applied) {
                                if (applied && typeof window.__psirPrefillChildrenCounter === "number") {
                                    childrenCounter = window.__psirPrefillChildrenCounter;
                                }
                                toggleSpouseChildrenByCivilStatus($(".civil_status").val(), false);
                            });
                        }

                    } else {
                        
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        // append the children list
                        $("#children_list").append(`
                            <li class="list-group-item d-flex align-items-center" id="children_list_${childrenCounter}">
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Age</label>
                                    <input type="text" placeholder="Age" class="form-control children_age">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">In/Out of School</label>
                                    <input type="text" placeholder="In/Out of School" class="form-control children_school">
                                </div>
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Educational Attainment</label>
                                    <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Legitimate</label>
                                    <input type="text" placeholder="Legitimate" class="form-control children_legitimate">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Illegitimate</label>
                                    <input type="text" placeholder="Illegitimate" class="form-control children_illegitimate">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `)
                        if (window.PsirPrefill) {
                            PsirPrefill.fromWorksheet(client_id, "presentSituation", __executeExternalGet).done(function (applied) {
                                if (applied && typeof window.__psirPrefillChildrenCounter === "number") {
                                    childrenCounter = window.__psirPrefillChildrenCounter;
                                }
                                toggleSpouseChildrenByCivilStatus($(".civil_status").val(), $(".civil_status").val() === "single");
                            });
                        }
                    }

                }
            })
        }

        $('.civil_status').change(function(){
            var value = $(this).val();
            if (value === "married") {
                $("#married_status_field").show();
            } else {
                $("#married_status_field").hide();
                $(".status_of_marriage").val(null).trigger("change");
            }
            toggleSpouseChildrenByCivilStatus(value, !suppressCivilStatusClear);
        });

        $('.status_of_marriage').change(function(){
            var value = $(this).val();
            if (value === "others") {
                $("#other_married_status_field").show();
            } else {
                $("#other_married_status_field").hide();
            }
        });

        $('.dwelling').change(function(){
            var value = $(this).val();
            if (value === "owned") {
                $("#years_of_stay_owned_field").show();
                $("#years_of_stay_rented_field").hide();
            } else if (value === "rented") {
                $("#years_of_stay_owned_field").hide();
                $("#years_of_stay_rented_field").show();
            } else {
                $("#years_of_stay_owned_field").hide();
                $("#years_of_stay_rented_field").hide();
            }
        });

        $('.role_in_the_family').change(function(){
            var value = $(this).val();
            if (value === "income_contributor") {
                $("#income_contributor_field").show();
            } else {
                $("#income_contributor_field").hide();
            }
        });
        
        $('.major_family_problem').change(function(){
            var value = $(this).val();
            if (value === "others") {
                $("#other_famiy_problem_field").show();
            } else {
                $("#other_famiy_problem_field").hide();
            }
        });


        // event handler for adding records
        $(document).on("click", ".btn-addChildren", function(){
            childrenCounter += 1;
            $("#children_list").append(`
                <li class="list-group-item d-flex align-items-center" id="children_list_${childrenCounter}">
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">In/Out of School</label>
                        <input type="text" placeholder="In/Out of School" class="form-control children_school">
                    </div>
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Legitimate</label>
                        <input type="text" placeholder="Legitimate" class="form-control children_legitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Illegitimate</label>
                        <input type="text" placeholder="Illegitimate" class="form-control children_illegitimate">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px" data-id="${childrenCounter}">
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>
            `)
        });

        $(document).on("click", ".btn-delChildren", function(){
            var id = $(this).data("id")
            console.log(id)
            $(`#children_list_${id}`).remove()
        });

        // event handler for showing modal upon saving and updating data
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })


        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectPresentSituation();

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
                                    window.pisUrl('psir_education_history?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
                            }, 2000);
                        });
                });
        });

        // evend handler for updating data
        $("#saveModal .btn-update").unbind("click").on("click", function () {

            let data = collectPresentSituation();

            __executeExternalGet(WorksheetApi.getUrl('psir'))
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecordsAndDerogatoryRecord = workSheetData.priorRecordsAndDerogatoryRecord;
                    let familyBackgroundAndBirthData = workSheetData.familyBackgroundAndBirthData;
                    let educationAndJobHistory = workSheetData.educationAndJobHistory;
                    let medicalHistory = workSheetData.medicalHistory;
                    let traitsAndCommunityBackground = workSheetData.traitsAndCommunityBackground;
                    let analysisAndProjectedThrust = workSheetData.analysisAndProjectedThrust;
                    // let recommendation = workSheetData.recommendation;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecordsAndDerogatoryRecord, familyBackgroundAndBirthData, data, educationAndJobHistory, medicalHistory, traitsAndCommunityBackground, analysisAndProjectedThrust);

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
                                window.pisUrl('psir_education_history?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("medical_history");
        setupWorksheetClickHandler("traits_and_community_background");
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation");

    } )( jQuery );