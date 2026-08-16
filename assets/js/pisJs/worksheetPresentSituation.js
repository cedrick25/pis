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
            const name = $(".children_name");
            const dob = $(".children_dob");
            const age = $(".children_age");
            const education = $(".children_education");
            const occupation = $(".children_occupation");

            const residence = [];
            const address = $(".residence_address");
            const inclusiveDate = $(".residence_inclusive_date");

            for (var i = 0; i < name.length; i++) {
                const list = {};
                list.name = $(name[i]).val();
                list.dob = $(dob[i]).val();
                list.age = $(age[i]).val();
                list.education = $(education[i]).val();
                list.occupation = $(occupation[i]).val();
                children.push(list);
            }

            for (var i = 0; i < address.length; i++) {
                const list = {};
                list.address = $(address[i]).val();
                list.inclusiveDate = $(inclusiveDate[i]).val();
                residence.push(list);
            }

            return {
                civilStatus : $(".civil_status").val(),
                seperationCause : $(".seperation_cause_field").val(),
                spouseLastName : $(".spouse_last_name").val(),
                spouseMiddleName : $(".spouse_middle_name").val(),
                spouseFirstName : $(".spouse_first_name").val(),
                spouseHomeAddress : $(".spouse_home_address").val(),
                spouseBirthPlace : $(".spouse_place_of_birth").val(),
                spouseBirthDate : $(".spouse_date_of_birth").val(),
                spouseOccupation : $(".spouse_occupation").val(),
                spouseWorkAddress : $(".spouse_work_address").val(),
                marriageDate : $(".date_of_marriage").val(),
                marriageNature : $(".nature_ceremony").val(),
                reasonSeparation : $(".reason_seperation").val(),
                wifeRelationship : $(".relationship_with_spouse").val(),
                noOfChildren : $(".no_of_children").val(),
                childrenRelationship : $(".relationship_with_children").val(),
                residenceStability : $(".stability_residence").val(),
                residenceType : $(".type_residence").val(),
                physicalHomeCondition : $(".physical_home_conditions").val(),
                familyEconomicStatus : $(".family_economic_status").val(),
                familyBreadwinner : $(".family_breadwinner").val(),
                numberOfDependentsChildren : $(".no_of_dependents_children").val(),
                numberOfDependentsOthers : $(".no_of_dependents_others").val(),
                majorFamilyProblem : $(".major_family_problem").val(),
                commentsOnFamilyProblem : $(".comments").val(),
                children : children,
                residence: residence

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

        let childrenCounter = 0;

        function resetChildrenList() {
            childrenCounter = 0;
            $("#children_list").empty().append(`
                <li class="list-group-item d-flex align-items-center">
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Name</label>
                        <input type="text" placeholder="Name" class="form-control children_name">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Date of Birth</label>
                        <input type="date" placeholder="Degree of Relationship" class="form-control children_dob">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Occupation</label>
                        <input type="text" placeholder="Occupation" class="form-control children_occupation">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px;">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `);
        }

        function clearSpouseAndChildrenFields() {
            $(".spouse_last_name, .spouse_first_name, .spouse_middle_name, .spouse_home_address, .spouse_place_of_birth, .spouse_date_of_birth, .spouse_occupation, .spouse_work_address, .date_of_marriage, .nature_ceremony, .reason_seperation, .no_of_children").val("");
            $(".relationship_with_spouse").val(null).trigger("change");
            $(".relationship_with_children").val(null).trigger("change");
            resetChildrenList();
        }

        var suppressCivilStatusClear = false;

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

        $(".civil_status").on("change", function () {
            toggleSpouseChildrenByCivilStatus($(this).val(), !suppressCivilStatusClear);
        });
        
        // event handler for showing modal upon saving and updating data
        $(".btn-saveData").unbind("click").on("click", function(){
            $("#saveModal").modal("show")
        })

        // display buttons and data
        if (status === "null" || !status || status === "Not Available") {
            $("#saveModal .saveModalTitle").text("Save Changes")
            $("#saveModal #saveMessage").show();
            $("#saveModal .btn-save").show();

            $("#children_list").append(`
                <li class="list-group-item d-flex align-items-center">
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Name</label>
                        <input type="text" placeholder="Name" class="form-control children_name">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Date of Birth</label>
                        <input type="date" placeholder="Degree of Relationship" class="form-control children_dob">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Occupation</label>
                        <input type="text" placeholder="Occupation" class="form-control children_occupation">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addSibling btn-sm" style="border-radius:2px;">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `)
            $("#residence_list").append(`
                <li class="list-group-item d-flex align-items-center">
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label class="form-control-label">Address</label>
                        <input type="text" placeholder="Address" class="form-control residence_address">
                    </div>
                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <label class="form-control-label">Inclusive Dates</label>
                        <input type="date" class="form-control residence_inclusive_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addSibling btn-sm" style="border-radius:2px;">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `) 
        } else {
            __executeExternalGet('8000/worksheet/getPetitioner/worksheet/'+client_id).done(function (result) {

                var result = result.response;
                if (result.status != "ERROR") {
                    let workSheetData = JSON.parse(result.jsonData);
                    let presentSituation = workSheetData.presentSituation;
                    if (presentSituation) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        presentSituation.children.forEach(function(data, index){
                            $("#children_list").append(`
                                <li class="list-group-item d-flex align-items-center" id="children_item_${index}">
                                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                        <label class="form-control-label">Name</label>
                                        <input type="text" placeholder="Name" class="form-control children_name" value="${data.name}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Date of Birth</label>
                                        <input type="date" placeholder="Date of Birth" class="form-control children_dob" value="${data.dob || ''}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Age</label>
                                        <input type="text" placeholder="Age" class="form-control children_age" value="${data.age}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Educational Attainment</label>
                                        <input type="text" placeholder="Educational Attainment" class="form-control children_education" value="${data.education}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Occupation</label>
                                        <input type="text" placeholder="Occupation" class="form-control children_occupation" value="${data.occupation}">
                                    </div>
                                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="button_group_children">
                                    </div>
                                </li>
                                `
                            )
                            childrenCounter += 1;

                            if (index === 0) {
                                $(`#button_group_children`).append(`
                                    <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#button_group_children`).append(`
                                    <button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                        presentSituation.residence.forEach(function(data, index){
                            $("#residence_list").append(`
                                <li class="list-group-item d-flex align-items-center" id="residence_item_${index}">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label class="form-control-label">Address</label>
                                        <input type="text" placeholder="Address" class="form-control residence_address" value="${data.address}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <label class="form-control-label">Inclusive Dates</label>
                                        <input type="date" class="form-control residence_inclusive_date" value="${data.inclusiveDate}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="button_group_residence">
                                    </div>
                                </li>
                                `
                            )
                            residenceCounter += 1;

                            if (index === 0) {
                                $(`#button_group_residence`).append(`
                                    <button type="button" class="btn btn-primary btn-addResidence btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#button_group_residence`).append(`
                                    <button type="button" class="btn btn-danger btn-delResidence btn-sm" style="border-radius:2px;" data-id="${index}">
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                        suppressCivilStatusClear = true;
                        $(".civil_status").val(presentSituation.civilStatus).trigger("change");
                        $(".spouse_last_name").val(presentSituation.spouseLastName)
                        $(".spouse_first_name").val(presentSituation.spouseFirstName)
                        $(".spouse_middle_name").val(presentSituation.spouseMiddleName)
                        $(".spouse_home_address").val(presentSituation.spouseHomeAddress)
                        $(".spouse_place_of_birth").val(presentSituation.spouseBirthPlace)
                        $(".spouse_date_of_birth").val(presentSituation.spouseBirthDate)
                        $(".spouse_occupation").val(presentSituation.spouseOccupation)
                        $(".spouse_work_address").val(presentSituation.spouseWorkAddress)
                        $(".date_of_marriage").val(presentSituation.marriageDate)
                        $(".nature_ceremony").val(presentSituation.marriageNature)
                        $(".reason_seperation").val(presentSituation.reasonSeparation)
                        $(".relationship_with_spouse").val(presentSituation.wifeRelationship).trigger("change")
                        $(".no_of_children").val(presentSituation.noOfChildren)
                        $(".relationship_with_children").val(presentSituation.childrenRelationship).trigger("change")
                        $(".stability_residence").val(presentSituation.residenceStability).trigger("change")
                        $(".type_residence").val(presentSituation.residenceType).trigger("change")
                        $(".physical_home_conditions").val(presentSituation.physicalHomeCondition).trigger("change")
                        $(".family_economic_status").val(presentSituation.familyEconomicStatus).trigger("change")
                        $(".family_breadwinner").val(presentSituation.familyBreadwinner).trigger("change")
                        $(".no_of_dependents_children").val(presentSituation.numberOfDependentsChildren)
                        $(".no_of_dependents_others").val(presentSituation.numberOfDependentsOthers)
                        $(".major_family_problem").val(presentSituation.majorFamilyProblem).trigger("change")
                        $(".comments").val(presentSituation.commentsOnFamilyProblem)
                        toggleSpouseChildrenByCivilStatus(presentSituation.civilStatus, presentSituation.civilStatus === "single");
                        suppressCivilStatusClear = false;

                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $("#children_list").append(`
                            <li class="list-group-item d-flex align-items-center">
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Name</label>
                                    <input type="text" placeholder="Name" class="form-control children_name">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Date of Birth</label>
                                    <input type="date" placeholder="Degree of Relationship" class="form-control children_dob">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Age</label>
                                    <input type="text" placeholder="Age" class="form-control children_age">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Educational Attainment</label>
                                    <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Occupation</label>
                                    <input type="text" placeholder="Occupation" class="form-control children_occupation">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px;">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `)
                        $("#residence_list").append(`
                            <li class="list-group-item d-flex align-items-center">
                                <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label class="form-control-label">Address</label>
                                    <input type="text" placeholder="Address" class="form-control residence_address">
                                </div>
                                <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                    <label class="form-control-label">Inclusive Dates</label>
                                    <input type="date" class="form-control residence_inclusive_date">
                                </div>
                                <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addResidence btn-sm" style="border-radius:2px;">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `)
                    }
                }
            })
        }

        // event handler for adding records
        $(document).on("click", ".btn-addChildren", function(){
            $("#children_list").append(`
                <li class="list-group-item d-flex align-items-center" id="children_item_${childrenCounter}">
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Name</label>
                        <input type="text" placeholder="Name" class="form-control children_name">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Date of Birth</label>
                        <input type="date" placeholder="Degree of Relationship" class="form-control children_dob">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Age</label>
                        <input type="text" placeholder="Age" class="form-control children_age">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Educational Attainment</label>
                        <input type="text" placeholder="Educational Attainment" class="form-control children_education">
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Occupation</label>
                        <input type="text" placeholder="Occupation" class="form-control children_occupation">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px;" data-id=${childrenCounter}>
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>
                `
            )
            // updatechildrenButtons();
            childrenCounter += 1;
        });

        $(document).on("click", ".btn-delChildren", function(){
            var id = $(this).data("id");
            $(`#children_item_${id}`).remove();
        })

        let residenceCounter = 0;
        $(document).on("click", ".btn-addResidence", function(){
            $("#residence_list").append(`
                <li class="list-group-item d-flex align-items-center" id="residence_item_${residenceCounter}">
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label class="form-control-label">Address</label>
                        <input type="text" placeholder="Address" class="form-control residence_address">
                    </div>
                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <label class="form-control-label">Inclusive Dates</label>
                        <input type="date" class="form-control residence_inclusive_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delResidence btn-sm" style="border-radius:2px;" data-id="${residenceCounter}">
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>
                `
            )
            residenceCounter += 1;
        });

        $(document).on("click", ".btn-delResidence", function(){
            var id = $(this).data("id");
            $(`#residence_item_${id}`).remove();
        })

        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectPresentSituation();

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
                                    `${api}/pis/worksheet_education_history?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
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

            let data = collectPresentSituation();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecords = workSheetData.priorRecords;
                    let familyBackground = workSheetData.familyBackground;
                    let identificationData = workSheetData.identificationData;
                    let educationalHistory = workSheetData.educationalHistory;
                    let employmentHistory = workSheetData.employmentHistory;
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecords, identificationData, familyBackground, data, educationalHistory, employmentHistory, communityBackground);
                    console.log(payload)

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
                                window.location.href =`${api}/pis/worksheet_education_history?client_id=${client_id}&field_office_id=${foid}&status=${res.response.worksheetStatus}`;
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
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor");
    } )( jQuery );