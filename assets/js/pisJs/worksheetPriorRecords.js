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


        function collectPriorRecordsData() {

            const records = [];
            const agency = $(".agency");
            const cc_no = $(".cc_no");
            const offense = $(".offense");
            const when = $(".when");
            const where = $(".where");
            const disposition = $(".disposition");

            const recordInfo = [];
            const source = $(".source");
            const pos = $(".position");
            const particulars = $(".particulars");

            for (var i = 0; i < agency.length; i++) {
                const list = {};
                list.agency = $(agency[i]).val();
                list.cc_no = $(cc_no[i]).val();
                list.offense = $(offense[i]).val();
                list.when = $(when[i]).val();
                list.where = $(where[i]).val();
                list.disposition = $(disposition[i]).val();
                records.push(list);
            }

            for (var i = 0; i < source.length; i++) {
                const list_info = {};
                list_info.source = $(source[i]).val();
                list_info.position = $(pos[i]).val();
                list_info.particulars = $(particulars[i]).val();
                recordInfo.push(list_info);
            }

            return {
                record      : $(".withRecord").val(),
                recordOthers: DropdownOthers.collect($(".withRecord"), $(".withRecord_others")),
                allegedBy   : $(".allegedBy").val(),
                allegedByOthers: DropdownOthers.collect($(".allegedBy"), $(".allegedBy_others")),
                probation   : $(".hasProbation").val(),
                probationOthers: DropdownOthers.collect($(".hasProbation"), $(".hasProbation_others")),
                priorRecord : records,
                recordsInfo : recordInfo
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

        function saveWorksheet(existing, newPriorRecord) {

            // update identifyingData
            existing.priorRecords = newPriorRecord;

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

        let recordCounter = 0;
        let infoCounter = 0;

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
                    let priorRecords = workSheetData.priorRecords;
                    if (priorRecords) {
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();
                        $(".allegedBy").val(priorRecords.allegedBy).trigger("change")
                        $(".allegedBy_others").val(priorRecords.allegedByOthers)
                        $(".withRecord").val(priorRecords.record).trigger("change")
                        $(".withRecord_others").val(priorRecords.recordOthers)
                        $(".hasProbation").val(priorRecords.probation).trigger("change")
                        $(".hasProbation_others").val(priorRecords.probationOthers)
                        DropdownOthers.refresh();
                        priorRecords.priorRecord.forEach(function(data, index){
                            $("#records_list").append(`
                                    <li class="list-group-item d-flex align-items-center" id="record_list_${index}">
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Agency</label>
                                            <input type="text" placeholder="Agency" class="form-control agency" value="${data.agency}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">CC No.</label>
                                            <input type="text" placeholder="CC No." class="form-control cc_no" value="${data.cc_no}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Offense</label>
                                            <input type="text" placeholder="Offense" class="form-control offense" value="${data.offense}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">When</label>
                                            <input type="date" placeholder="When" class="form-control when" value="${data.when}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                            <label class="form-control-label">Where</label>
                                            <input type="text" placeholder="Where" class="form-control where" value="${data.where}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1">
                                            <label class="form-control-label">Disposition</label>
                                            <input type="text" placeholder="Disposition" class="form-control disposition" value="${data.disposition}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="prior_records_button_group_${index}">
                                        </div>
                                    </li>
                                `
                            )
                            recordCounter += 1;

                            if (index === 0) {
                                $(`#prior_records_button_group_${index}`).append(`
                                    <button type="button" class="btn btn-primary btn-addRecord btn-sm" style="border-radius:2px;" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#prior_records_button_group_${index}`).append(`
                                    <button type="button" class="btn btn-danger btn-delRecord btn-sm" style="border-radius:2px;" data-id="${index}">
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                        priorRecords.recordsInfo.forEach(function(data, index){
                            $("#info_list").append(`
                                    <li class="list-group-item d-flex align-items-center" id="info_list_${index}">
                                        <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                            <label class="form-control-label">Source/Date</label>
                                            <input type="text" placeholder="Source/Date" class="form-control source" value="${data.source}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                            <label class="form-control-label">Position</label>
                                            <input type="text" placeholder="Position" class="form-control position" value="${data.position}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                            <label class="form-control-label">Particulars</label>
                                            <input type="text" placeholder="Particulars" class="form-control particulars" value="${data.particulars}">
                                        </div>
                                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="info_records_button_group_${index}">
                                        </div>
                                    </li>
                                `
                            )

                            if (index === 0) {
                                $(`#info_records_button_group_${index}`).append(`
                                    <button type="button" class="btn btn-primary btn-addInfo btn-sm" style="border-radius:2px" data-id=${index}>
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                `)
                            } else {
                                $(`#info_records_button_group_${index}`).append(`
                                    <button type="button" class="btn btn-danger btn-delInfo btn-sm" style="border-radius:2px" data-id="${index}">
                                        <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                                    </button>
                                `)

                            }
                        })

                    } else {
                        
                        $("#saveModal .saveModalTitle").text("Update Changes")
                        $("#saveModal #updateMessage").show();
                        $("#saveModal .btn-update").show();

                        // append the record list
                        $("#records_list").append(`
                            <li class="list-group-item d-flex align-items-center" id="record_list_${recordCounter}">
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Agency</label>
                                    <input type="text" placeholder="Agency" class="form-control agency">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">CC No.</label>
                                    <input type="text" placeholder="CC No." class="form-control cc_no">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Offense</label>
                                    <input type="text" placeholder="Offense" class="form-control offense">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">When</label>
                                    <input type="date" placeholder="When" class="form-control when">
                                </div>
                                <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                                    <label class="form-control-label">Where</label>
                                    <input type="text" placeholder="Where" class="form-control where">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1">
                                    <label class="form-control-label">Disposition</label>
                                    <input type="text" placeholder="Disposition" class="form-control disposition">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addRecord btn-sm" style="border-radius:2px" data-id="${recordCounter}">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `)
                        // append info list
                        $("#info_list").append(`
                            <li class="list-group-item d-flex align-items-center" id="info_list_${infoCounter}">
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Source/Date</label>
                                    <input type="text" placeholder="Source/Date" class="form-control source">
                                </div>
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Position</label>
                                    <input type="text" placeholder="Position" class="form-control position">
                                </div>
                                <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                    <label class="form-control-label">Particulars</label>
                                    <input type="text" placeholder="Particulars" class="form-control particulars">
                                </div>
                                <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                                    <button type="button" class="btn btn-primary btn-addInfo btn-sm" style="border-radius:2px" data-id="${infoCounter}">
                                        <i class="fa fa-plus"></i><span class="mx-2">Add</span>
                                    </button>
                                </div>
                            </li>
                        `)
                    }
                }
            })
        }

        $(document).on("click", ".btn-delRecord", function(){
            var id = $(this).data("id")
            console.log(id)
            $(`#record_list_${id}`).remove()
        });

        $(document).on("click", ".btn-delInfo", function(){
            var id = $(this).data("id")
            $(`#info_list_${id}`).remove()
        });

        // event handler for adding records
        $(document).on("click", ".btn-addRecord", function(){
            recordCounter += 1;
        // $("#records_list .btn-addRecord").unbind("click").on("click", function(){
            $("#records_list").append(`
                    <li class="list-group-item d-flex align-items-center" id="record_list_${recordCounter}">
                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                            <label class="form-control-label">Agency</label>
                            <input type="text" placeholder="Agency" class="form-control agency">
                        </div>
                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                            <label class="form-control-label">CC No.</label>
                            <input type="text" placeholder="CC No." class="form-control cc_no">
                        </div>
                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                            <label class="form-control-label">Offense</label>
                            <input type="text" placeholder="Offense" class="form-control offense">
                        </div>
                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                            <label class="form-control-label">When</label>
                            <input type="date" placeholder="When" class="form-control when">
                        </div>
                        <div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">
                            <label class="form-control-label">Where</label>
                            <input type="text" placeholder="Where" class="form-control where">
                        </div>
                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1">
                            <label class="form-control-label">Disposition</label>
                            <input type="text" placeholder="Disposition" class="form-control disposition">
                        </div>
                        <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                            <button type="button" class="btn btn-danger btn-delRecord btn-sm" style="border-radius:2px" data-id="${recordCounter}">
                                <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                            </button>
                        </div>
                    </li>
                `
            )
        });

        // event handler for adding information
        $(document).on("click", ".btn-addInfo", function(){
            infoCounter += 1;
            $("#info_list").append(`
                <li class="list-group-item d-flex align-items-center" id="info_list_${infoCounter}">
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Source/Date</label>
                        <input type="text" placeholder="Source/Date" class="form-control source">
                    </div>
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Position</label>
                        <input type="text" placeholder="Position" class="form-control position">
                    </div>
                    <div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">
                        <label class="form-control-label">Particulars</label>
                        <input type="text" placeholder="Particulars" class="form-control particulars">
                    </div>
                    <div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">
                        <button type="button" class="btn btn-danger btn-delInfo btn-sm" style="border-radius:2px" data-id="${infoCounter}">
                            <i class="fa fa-trash"></i><span class="mx-2">Remove</span>
                        </button>
                    </div>
                </li> `
            )
        });
        
        // event handler for saving data
        $("#saveModal .btn-save").unbind("click").on("click", function () {

            let data = collectPriorRecordsData();

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
                                    window.pisUrl('worksheet_identification_data?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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

            let data = collectPriorRecordsData();

            __executeExternalGet(WorksheetApi.getUrl('worksheet'))
                .done(function (result) {

                    let workSheetData = JSON.parse(result.response.jsonData);
                    let identifyingData = workSheetData.identifyingData;
                    let presentOffense = workSheetData.presentOffense;
                    let identificationData = workSheetData.identificationData;
                    let familyBackground = workSheetData.familyBackground;
                    let presentSituation = workSheetData.presentSituation;
                    let educationalHistory = workSheetData.educationalHistory;
                    let employmentHistory = workSheetData.employmentHistory;
                    let communityBackground = workSheetData.communityBackground;

                    let existing = result.jsonData ? JSON.parse(result.jsonData) : {};

                    let payload = updateWorksheet(existing, identifyingData, presentOffense, data, identificationData, familyBackground, presentSituation, educationalHistory, employmentHistory, communityBackground);
                    // console.log(JSON.parse(payload.jsonData))
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
                                    window.pisUrl('worksheet_identification_data?' + WorksheetApi.pageQuery({ status: res.response.worksheetStatus }));
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
                        window.location.href = window.pisUrl('worksheet_' + worksheetType + '?' + WorksheetApi.pageQuery({ status: status }));
                    }, 500);
                });
            });
        }

        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("identification_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("present_situation");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor");

    } )( jQuery );