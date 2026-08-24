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

        let previousJobCounter = 0;
        let hospitalCounter = 0;

        function appendEmptyHospitalizationRow() {
            $("#previous_hospitalization_list").append(`
                <li class="list-group-item d-flex align-items-center" id="hospital_item_${hospitalCounter}">
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label class="form-control-label">Name of Hospital</label>
                        <input type="text" placeholder="Name of Hospital" class="form-control hospital">
                    </div>
                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <label class="form-control-label">Date Hospitalized</label>
                        <input type="date" class="form-control hospital_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="button_group_hospital">
                        <button type="button" class="btn btn-primary btn-addHospital btn-sm" style="border-radius:2px;" data-id="${hospitalCounter}">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `);
            hospitalCounter += 1;
        }

        function collectEmploymentHistory() {

            const previousJobs = [];
            const jobHeld = $(".job_held");
            const employerAddress = $(".employer_address");
            const date = $(".job_date");
            const income = $(".income");

            const hospitalization = [];
            const hospital = $(".hospital");
            const dateHospitalized = $(".hospital_date");

            for (var i = 0; i < jobHeld.length; i++) {
                const list = {};
                list.jobHeld = $(jobHeld[i]).val();
                list.employerAddress = $(employerAddress[i]).val();
                list.date = $(date[i]).val();
                list.income = $(income[i]).val();
                previousJobs.push(list);
            }

            for (var i = 0; i < hospital.length; i++) {
                const list = {};
                list.hospital = $(hospital[i]).val();
                list.dateHospitalized = $(dateHospitalized[i]).val();
                hospitalization.push(list);
            }

            return {
                employmentStatus               : $(".employment_status").val(),
                specifyEmplymentStatus           : $(".specify_employment_status").val(),
                meansOfSupport              : $(".means_of_support").val(),
                specifyMeansOfSupport             : $(".specify_means_of_support").val(),
                employableSkills               : $(".employable_skills").val(),
                otherEMployableSkills        : $(".other_skills").val(),
                sourceOfIncome               : $(".other_source_income").val(),
                otherSourceOfIncome          : $(".other_income").val(),
                physicalHealth            : $(".physical_health").val(),
                explainPhysicalHealthCondition              : $(".explainHealthCondition").val(),
                previousTreatment              : $(".previous_treatment").val(),
                specifyTreatment              : $(".specify_treatment").val(),
                drugUsage          : $(".drug_usage").val(),
                explainDrugUsage          : $(".explain_use_of_drugs").val(),
                previousJobs             : previousJobs,
                hospitalizations    : hospitalization
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

        function saveWorksheet(existing, newEmploymentHistory) {

            // update identifyingData
            existing.employmentHistory = employmentHistory;

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

            $("#previous_job_list").append(`
                <li class="list-group-item d-flex align-items-center">
                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <label class="form-control-label">Job Held</label>
                        <input type="text" placeholder="Job Held" class="form-control job_held">
                    </div>
                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <label class="form-control-label">Employer Address</label>
                        <input type="text" placeholder="Employer Address" class="form-control employer_address">
                    </div>
                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Dates</label>
                        <input type="date" class="form-control job_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <label class="form-control-label">Income</label>
                        <input type="text" placeholder="Income" class="form-control income">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addJob btn-sm" style="border-radius:2px;">
                            <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                        </button>
                    </div>
                </li>
            `) 
            $("#previous_hospitalization_list").append(`
                <li class="list-group-item d-flex align-items-center">
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label class="form-control-label">Name of Hospital</label>
                        <input type="text" placeholder="Name of Hospital" class="form-control hospital">
                    </div>
                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <label class="form-control-label">Date Hospitalized</label>
                        <input type="date" class="form-control hospital_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-addHospital btn-sm" style="border-radius:2px;">
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
                    let employmentHistory = workSheetData.employmentHistory;
                    if (employmentHistory) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        (employmentHistory.previousJobs || []).forEach(function(data, index){
                            $("#previous_job_list").append(`
                                <li class="list-group-item d-flex align-items-center" id="job_item_${index}">
                                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <label class="form-control-label">Job Held</label>
                                        <input type="text" placeholder="Job Held" class="form-control job_held" value="${data.jobHeld}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <label class="form-control-label">Employer Address</label>
                                        <input type="text" placeholder="Employer Address" class="form-control employer_address" value="${data.employerAddress}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                        <label class="form-control-label">Dates</label>
                                        <input type="date" class="form-control job_date" value="${data.date}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <label class="form-control-label">Income</label>
                                        <input type="text" placeholder="Income" class="form-control income" value="${data.income}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="button_group_job">
                                    </div>
                                </li>
                                `
                            )
                            previousJobCounter += 1;

                            if (index === 0) {
                                $(`#button_group_job`).append(`
                                    <button type="button" class="btn btn-primary btn-addJob btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#button_group_job`).append(`
                                    <button type="button" class="btn btn-danger btn-delJob btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                        (employmentHistory.hospitalizations || []).forEach(function(data, index){
                            $("#previous_hospitalization_list").append(`
                                <li class="list-group-item d-flex align-items-center" id="hospital_item_${index}">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label class="form-control-label">Name of Hospital</label>
                                        <input type="text" placeholder="Name of Hospital" class="form-control hospital" value="${data.hospital}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <label class="form-control-label">Date Hospitalized</label>
                                        <input type="date" class="form-control hospital_date" value="${data.dateHospitalized}">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="button_group_hospital">
                                    </div>
                                </li>
                            `) 
                            hospitalCounter += 1;

                            if (index === 0) {
                                $(`#button_group_hospital`).append(`
                                    <button type="button" class="btn btn-primary btn-addHospital btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#button_group_hospital`).append(`
                                    <button type="button" class="btn btn-danger btn-delHospital btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                        $(".employment_status").val(employmentHistory.employmentStatus).trigger("change")
                        $(".specify_employment_status").val(employmentHistory.specifyEmplymentStatus)
                        $(".means_of_support").val(employmentHistory.meansOfSupport).trigger("change")
                        $(".specify_means_of_support").val(employmentHistory.specifyMeansOfSupport)
                        $(".employable_skills").val(employmentHistory.employableSkills).trigger("change")
                        $(".other_skills").val(employmentHistory.otherEMployableSkills)
                        $(".other_source_income").val(employmentHistory.sourceOfIncome).trigger("change")
                        $(".other_income").val(employmentHistory.otherSourceOfIncome)
                        $(".physical_health").val(employmentHistory.physicalHealth).trigger("change")
                        $(".explainHealthCondition").val(employmentHistory.explainPhysicalHealthCondition)
                        $(".previous_treatment").val(employmentHistory.previousTreatment).trigger("change")
                        $(".specify_treatment").val(employmentHistory.specifyTreatment)
                        $(".drug_usage").val(employmentHistory.drugUsage).trigger("change")
                        $(".explain_use_of_drugs").val(employmentHistory.explainDrugUsage)

                    } else {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        $("#previous_job_list").append(`
                            <li class="list-group-item d-flex align-items-center">
                                <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Job Held</label>
                                    <input type="text" placeholder="Job Held" class="form-control job_held">
                                </div>
                                <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Employer Address</label>
                                    <input type="text" placeholder="Employer Address" class="form-control employer_address">
                                </div>
                                <div class="form-group col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Dates</label>
                                    <input type="date" class="form-control job_date">
                                </div>
                                <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Income</label>
                                    <input type="text" placeholder="Income" class="form-control income">
                                </div>
                                <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addJob btn-sm" style="border-radius:2px;">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `) 
                        $("#previous_hospitalization_list").append(`
                            <li class="list-group-item d-flex align-items-center">
                                <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <label class="form-control-label">Name of Hospital</label>
                                    <input type="text" placeholder="Name of Hospital" class="form-control hospital">
                                </div>
                                <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                    <label class="form-control-label">Date Hospitalized</label>
                                    <input type="date" class="form-control hospital_date">
                                </div>
                                <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addHospital btn-sm" style="border-radius:2px;">
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
        $(document).on("click", ".btn-addJob", function(){
            $("#previous_job_list").append(`
                <li class="list-group-item d-flex align-items-center" id="job_item_${previousJobCounter}">
                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Job Held</label>
                        <input type="text" placeholder="Job Held" class="form-control job_held">
                    </div>
                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Employer Address</label>
                        <input type="text" placeholder="Employer Address" class="form-control employer_address">
                    </div>
                    <div class="form-group col-sm-12 col-md-2 col-lg-2 col-xl-2">
                        <label class="form-control-label">Dates</label>
                        <input type="date" class="form-control job_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Income</label>
                        <input type="text" placeholder="Income" class="form-control income">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delJob btn-sm" style="border-radius:2px;" data-id=${previousJobCounter}>
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>
                `
            )
            // updatechildrenButtons();
            previousJobCounter += 1;
        });

        $(document).on("click", ".btn-delJob", function(){
            var id = $(this).data("id");
            $(`#job_item_${id}`).remove();
        })

        // event handler for adding records
        $(document).on("click", ".btn-addHospital", function(){
            $("#previous_hospitalization_list").append(`
                <li class="list-group-item d-flex align-items-center" id="hospital_item_${hospitalCounter}">
                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label class="form-control-label">Name of Hospital</label>
                        <input type="text" placeholder="Name of Hospital" class="form-control hospital">
                    </div>
                    <div class="form-group col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <label class="form-control-label">Date Hospitalized</label>
                        <input type="date" class="form-control hospital_date">
                    </div>
                    <div class="form-group col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delHospital btn-sm" style="border-radius:2px;" data-id="${hospitalCounter}">
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li>
            `) 
            // updatechildrenButtons();
            hospitalCounter += 1;
        });

        $(document).on("click", ".btn-delHospital", function(){
            var id = $(this).data("id");
            $(`#hospital_item_${id}`).remove();
        })

        $('.employable_skills').change(function(){
            var value = $(this).val();
            if (value === "others") {
                $("#other_employable_skills_field").show();
            } else {
                $("#other_employable_skills_field").hide();
            }
        });

        $('.other_source_income').change(function(){
            var value = $(this).val();
            if (value === "others") {
                $("#other_source_income_field").show();
            } else {
                $("#other_source_income_field").hide();
            }
        });

        $('.previous_treatment').change(function(){
            var value = $(this).val();
            if (value === "yes") {
                $("#specify_treatment_field").show();
                $("#previousHospitalizationsList").show();
                if ($("#previous_hospitalization_list li").length === 0) {
                    appendEmptyHospitalizationRow();
                }
            } else {
                $("#specify_treatment_field").hide();
                $("#previousHospitalizationsList").hide();
            }
        });

        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectEmploymentHistory();

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

            let data = collectEmploymentHistory();

            __executeExternalGet(`8000/worksheet/getPetitioner/worksheet/${client_id}`)
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let priorRecords = workSheetData.priorRecords;
                    let familyBackground = workSheetData.familyBackground;
                    let identificationData = workSheetData.identificationData;
                    let presentSituation = workSheetData.presentSituation;
                    let educationalHistory = workSheetData.educationalHistory;
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, priorRecords, identificationData, familyBackground, presentSituation, educationalHistory, data, communityBackground);
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
                        // $(".overlay").hide();
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
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("environmental_factor");

    } )( jQuery );