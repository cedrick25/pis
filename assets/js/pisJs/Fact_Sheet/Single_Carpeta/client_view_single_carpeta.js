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

    // function fieldOffices(fieldOfficeDropdown, fieldOffice) {
    //     $(`${fieldOfficeDropdown}`).empty().append(`<option value="" selected disabled>Loading ...</option>`);
    //     __executeExternalGet('8088/department/list').done(function (result) {
    //         if (result.status != "ERROR") {
    //         $(`${fieldOfficeDropdown}`).empty().append(`<option value="" selected disabled>Select Field Office</option>`);
    //             result.forEach(function(data) {
    //                 // Exclude names that start with "Regional Office"
    //                 if (!data.name.startsWith("Regional Office")) {
    //                     var selected = data.id == fieldOffice ? "selected" : "";
    //                     $(`${fieldOfficeDropdown}`).append(
    //                         // '<option value="' + data.id + '">' + data.name + '</option>'
    //                         `<option value="${data.id}" ${selected}>${data.name}</option>`
    //                     );
    //                 }
    //             });
    //         } else {
    //             console.log("failed fetching docket list");
    //         }
    //     });
    // }    
    // function regionalOffices(regionalOfficeDropdown, regionalOffice) {
    //     $(`${regionalOfficeDropdown}`).empty().append(`<option value="" selected disabled>Loading ...</option>`);
    //     __executeExternalGet('8088/department/list').done(function (result) {
    //         if (result.status != "ERROR") {
    //         $(`${regionalOfficeDropdown}`).empty().append(`<option value="" selected disabled>Select Regional Office</option>`);
    //             result.forEach(function(data) {
    //                 // Include only names that start with "Regional Office"
    //                 if (data.name.startsWith("Regional Office")) {
    //                     var selected = data.id == regionalOffice ? "selected" : "";
    //                     $(`${regionalOfficeDropdown}`).append(
    //                         `<option value="${data.id}" ${selected}>${data.name}</option>`
    //                     );
    //                 }
    //             });
    //         } else {
    //             console.log("failed fetching docket list");
    //         }
    //     });
    // }

    var client_id = GetURLParameter('client_id');
    var client_type = GetURLParameter('client_type');
    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm_update').prop('disabled', true);
    
    var __fields = function() {
        __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
            var result = result.response;

            if (result.status != "ERROR") {
                console.log(result)
                let criminalCasesHtml = "";
                let criminalCasesToParse = [];

                try {
                    criminalCasesToParse = JSON.parse(result.criminalCaseNo);
                } catch (e) {
                    console.error("Invalid JSON in criminalCaseNo:", e);
                }

                if (Array.isArray(criminalCasesToParse) && criminalCasesToParse.length > 0) {
                    criminalCasesHtml = criminalCasesToParse
                        .map(item => `${item.criminal_cases_number || item}<br>`)
                        .join("");
                } else {
                    criminalCasesHtml = "N/A";
                }
                // hide the spinner and enable again all the buttons and forms after fetching the data

                var client_type = result.clientType;
                var client_id = result.id;
                __executeExternalGet(`8000/data/${client_type}/${client_id}`).done(function (data) {
                    if (data.status != "ERROR") {
                        var data = data.response;
                        // console.log(data)
                        var parsedData = JSON.parse(data[0].jsonData)
                        console.log(parsedData)
                        console.log(parsedData.supervision.length)

                        function hasData(arr) {
                          if (!arr || arr.length === 0) return false;

                          return arr.some(obj =>
                            Object.values(obj).some(value => value !== "" && value !== null)
                          );
                        }

                        if (Array.isArray(parsedData.investigation) && parsedData.investigation.length > 0) {
                            $("#inv_html").html(`
                                <dt class="col-sm-3">First Name</dt>
                                <dd class="col-sm-9">${result.firstName || "N/A"}</dd>
                                <dt class="col-sm-3">Middle Name</dt>
                                <dd class="col-sm-9">${result.middleName || "N/A"}</dd>
                                <dt class="col-sm-3">Last Name</dt>
                                <dd class="col-sm-9">${result.lastName || "N/A"}</dd>
                                <dt class="col-sm-3">Suffix</dt>
                                <dd class="col-sm-9">${result.suffixName || "N/A"}</dd>
                                <dt class="col-sm-3">Alias</dt>
                                <dd class="col-sm-9">${result.alias || "N/A"}</dd>
                                <dt class="col-sm-3">Birth Date</dt>
                                <dd class="col-sm-9">${result.birthDate || "N/A"}</dd>
                                <dt class="col-sm-3">Birth Place</dt>
                                <dd class="col-sm-9">${result.birthCity || "N/A"}</dd>
                                <dt class="col-sm-3">Civil Status</dt>
                                <dd class="col-sm-9">${result.civilStatus || "N/A"}</dd>
                                <dt class="col-sm-3">Nationality</dt>
                                <dd class="col-sm-9">${result.nationality || "N/A"}</dd>
                                <dt class="col-sm-3">Educational Attainment</dt>
                                <dd class="col-sm-9">${result.education || "N/A"}</dd>
                                <dt class="col-sm-3">Occupation</dt>
                                <dd class="col-sm-9">${result.occupation || "N/A"}</dd>
                                <dt class="col-sm-3">Religion</dt>
                                <dd class="col-sm-9">${result.permanentAddress || "N/A"}</dd>
                                <dt class="col-sm-3">Address</dt>
                                <dd class="col-sm-9">${result.religion || "N/A"}</dd>
                                <dt class="col-sm-3">File Number</dt>
                                <dd class="col-sm-9">${result.fileNumber || "N/A"}</dd>
                                <dt class="col-sm-3">Location</dt>
                                <dd class="col-sm-9">${result.location || "N/A"}</dd>
                                <dt class="col-sm-3">Prison Number</dt>
                                <dd class="col-sm-9">${result.prisonNumber || "N/A"}</dd>
                                <dt class="col-sm-3">Prison Name</dt>
                                <dd class="col-sm-9">${result.prisonName || "N/A"}</dd>
                                <dt class="col-sm-3">Criminal Cases:</dt>
                                <dd class="col-sm-9">
                                    ${criminalCasesHtml}
                                </dd>
                                <dt class="col-sm-3">TSD PO</dt>
                                <dd class="col-sm-9">${result.tsdPO}</dd>
                            `);
                            let investigationHtml = `
                                <dt class="col-sm-12" style="padding-top: 20px; padding-bottom: 10px;">
                                    <strong>Investigation Items: </strong>
                                </dt>
                            `
                            var investigationData = parsedData.investigation
                            if (Array.isArray(investigationData) && investigationData.length > 0) {
                                for (var j = 0; j < investigationData.length; j++) {
                                    var jsonItems = investigationData[j]
                                    investigationHtml += `
                                        <dt class="col-sm-12">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#investigation_item_${j}" aria-expanded="false" aria-controls="investigation_item_${j}">
                                                <strong>Investigation Item ${j + 1}</strong>
                                            </button>
                                        </dt>
                                        <dd class="col-sm-12">
                                            <div class="collapse" id="investigation_item_${j}">
                                                <dl class="row" style="padding-left: 50px; padding-top: 20px">
                                                    <dt class="col-sm-3">Date Forwarded to Field Office</dt>
                                                    <dd class="col-sm-9">${jsonItems.date_forwarded_to_fo || "N/A"}</dd>

                                                    <dt class="col-sm-3">Field Office Forwarded to</dt>
                                                    <dd class="col-sm-9">${jsonItems.forwarded_to_fo || "N/A"}</dd>

                                                    <dt class="col-sm-3">Date Forwarded to Regional Office</dt>
                                                    <dd class="col-sm-9">${jsonItems.forwarded_date_to_ro || "N/A"}</dd>

                                                    <dt class="col-sm-3">Regional Office Forwarded to</dt>
                                                    <dd class="col-sm-9">${jsonItems.forwarded_to_ro || "N/A"}</dd>

                                                    <dt class="col-sm-3">Date of Transmittal from BPP</dt>
                                                    <dd class="col-sm-9">${jsonItems.transmittal_bpp_date || "N/A"}</dd>

                                                    <dt class="col-sm-3">Transmital Date from Field Office</dt>
                                                    <dd class="col-sm-9">${jsonItems.transmittal_date_from_fo || "N/A"}</dd>

                                                    <dt class="col-sm-3">Date Received by TSD</dt>
                                                    <dd class="col-sm-9">${jsonItems.received_date_by_tsd || "N/A"}</dd>

                                                    <dt class="col-sm-3">Date Forwarded to BPP</dt>
                                                    <dd class="col-sm-9">${jsonItems.forwarded_to_bpp || "N/A"}</dd>

                                                    <dt class="col-sm-3">Indorsement Date</dt>
                                                    <dd class="col-sm-9">${jsonItems.indorsement_date || "N/A"}</dd>

                                                    <dt class="col-sm-3">Request Type</dt>
                                                    <dd class="col-sm-9">${jsonItems.request_type || "N/A"}</dd>

                                                    <dt class="col-sm-3">Type of Report</dt>
                                                    <dd class="col-sm-9">${jsonItems.type_report || "N/A"}</dd>
                                                </dl>
                                            </div>
                                        </dd>
                                    `
                                }

                            $("#inv_item_html").html(`
                                ${investigationHtml}
                            `);
                            } else {
                                investigationHtml += `No Investigation Items to Display`
                            }
                        } else {
                            $("#inv_html").html(`
                                <dd class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <strong> No Investigation Data to Display </strong>
                                    </div>
                                </dd>
                            `)
                        }

                        if (parsedData.supervision.length == 0) {
                            $("#sup_html").html(`
                                <dd class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <strong> No Supervision Data to Display </strong>
                                    </div>
                                </dd>
                            `)
                        } else {
                            $("#sup_html").html(`
                                <dt class="col-sm-3">First Name</dt>
                                <dd class="col-sm-9">${result.firstName || "N/A"}</dd>
                                <dt class="col-sm-3">Middle Name</dt>
                                <dd class="col-sm-9">${result.middleName || "N/A"}</dd>
                                <dt class="col-sm-3">Last Name</dt>
                                <dd class="col-sm-9">${result.lastName || "N/A"}</dd>
                                <dt class="col-sm-3">Suffix</dt>
                                <dd class="col-sm-9">${result.suffixName || "N/A"}</dd>
                                <dt class="col-sm-3">Alias</dt>
                                <dd class="col-sm-9">${result.alias || "N/A"}</dd>
                                <dt class="col-sm-3">Birth Date</dt>
                                <dd class="col-sm-9">${result.birthDate || "N/A"}</dd>
                                <dt class="col-sm-3">Birth Place</dt>
                                <dd class="col-sm-9">${result.birthCity || "N/A"}</dd>
                                <dt class="col-sm-3">Civil Status</dt>
                                <dd class="col-sm-9">${result.civilStatus || "N/A"}</dd>
                                <dt class="col-sm-3">Nationality</dt>
                                <dd class="col-sm-9">${result.nationality || "N/A"}</dd>
                                <dt class="col-sm-3">Educational Attainment</dt>
                                <dd class="col-sm-9">${result.education || "N/A"}</dd>
                                <dt class="col-sm-3">Occupation</dt>
                                <dd class="col-sm-9">${result.occupation || "N/A"}</dd>
                                <dt class="col-sm-3">Religion</dt>
                                <dd class="col-sm-9">${result.permanentAddress || "N/A"}</dd>
                                <dt class="col-sm-3">Address</dt>
                                <dd class="col-sm-9">${result.religion || "N/A"}</dd>
                                <dt class="col-sm-3">File Number</dt>
                                <dd class="col-sm-9">${result.fileNumber || "N/A"}</dd>
                                <dt class="col-sm-3">Location</dt>
                                <dd class="col-sm-9">${result.location || "N/A"}</dd>
                                <dt class="col-sm-3">Prison Number</dt>
                                <dd class="col-sm-9">${result.prisonNumber || "N/A"}</dd>
                                <dt class="col-sm-3">Prison Name</dt>
                                <dd class="col-sm-9">${result.prisonName || "N/A"}</dd>
                                <dt class="col-sm-3">Criminal Cases:</dt>
                                <dd class="col-sm-9">
                                    ${criminalCasesHtml}
                                </dd>
                                <dt class="col-sm-3">TSD PO</dt>
                                <dd class="col-sm-9">${result.tsdPO}</dd>
                            `);
                            let supervisionHtml = `
                                <dt class="col-sm-12" style="padding-top: 20px; padding-bottom: 10px;">
                                    <strong>Supervision Items: </strong>
                                </dt>
                            `
                            var supervisionData = parsedData.supervision
                            var supervisionDataBpp = supervisionData.supervision_bpp; // for supervision

                            if (Array.isArray(supervisionDataBpp) && supervisionDataBpp.length > 0) {
                                if (!hasData(supervisionDataBpp)) {
                                    supervisionHtml += `
                                        <dd class="col-sm-12">
                                            <div>
                                                <dl class="row" style="padding-left: 30px; padding-top: 10px">
                                                    <strong> No Supervision - Originated Reports From The Field Items to Display </strong>
                                                </dl>
                                            </div>
                                        </dd>
                                    `
                                } else {
                                    for (var j = 0; j < supervisionDataBpp.length; j++) {
                                        var bppItems = supervisionDataBpp[j]
                                        supervisionHtml += `
                                            <dt class="col-sm-12">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_item_${j}" aria-expanded="false" aria-controls="supervision_item_${j}">
                                                    <strong>Supervision (Item ${j + 1})</strong>
                                                </button>
                                            </dt>
                                            <dd class="col-sm-12">
                                                <div class="collapse" id="supervision_item_${j}">
                                                    <dl class="row" style="padding-left: 50px; padding-top: 20px">
                                                        <dt class="col-sm-3">Date of Transmittal from BPP</dt>
                                                        <dd class="col-sm-9">${bppItems.transmittal_bpp_date || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Received by TSD</dt>
                                                        <dd class="col-sm-9">${bppItems.received_date_by_tsd || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Forwarded to Field Office</dt>
                                                        <dd class="col-sm-9">${bppItems.transmittal_date_from_fo || "N/A"}</dd>

                                                        <dt class="col-sm-3">Field Office</dt>
                                                        <dd class="col-sm-9">${bppItems.forwarded_to_fo_sup || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Forwarded to Regional</dt>
                                                        <dd class="col-sm-9">${bppItems.date_forwarded_to_ro_sup || "N/A"}</dd>

                                                        <dt class="col-sm-3">Regional Office</dt>
                                                        <dd class="col-sm-9">${bppItems.forwarded_to_ro_sup || "N/A"}</dd>

                                                        <dt class="col-sm-3">Indorsement Date</dt>
                                                        <dd class="col-sm-9">${bppItems.indorsement_date || "N/A"}</dd>

                                                        <dt class="col-sm-3">BPP Resolutions</dt>
                                                        <dd class="col-sm-9">${bppItems.bpp_resolutions || "N/A"}</dd>
                                                    </dl>
                                                </div>
                                            </dd>
                                        `
                                    }
                                }
                            }

                            var supervisionDataOrff = supervisionData.supervision_orff; // for supervision

                            if (Array.isArray(supervisionDataOrff) && supervisionDataOrff.length > 0) {
                                if (!hasData(supervisionDataOrff)) {
                                    supervisionHtml += `
                                        <dd class="col-sm-12">
                                            <div>
                                                <dl class="row" style="padding-left: 30px; padding-top: 10px">
                                                    <strong> No Supervision - Originated Reports From The Field Items to Display </strong>
                                                </dl>
                                            </div>
                                        </dd>
                                    `
                                } else {
                                    for (var j = 0; j < supervisionDataOrff.length; j++) {
                                        var orffItems = supervisionDataOrff[j]
                                        supervisionHtml += `
                                            <dt class="col-sm-12">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_item_orff${j}" aria-expanded="false" aria-controls="supervision_item_orff${j}">
                                                    <strong>Supervision - Originated reports from the field (Item ${j + 1}) </strong>
                                                </button>
                                            </dt>
                                            <dd class="col-sm-12">
                                                <div class="collapse" id="supervision_item_orff${j}">
                                                    <dl class="row" style="padding-left: 50px; padding-top: 20px">
                                                        <dt class="col-sm-3">Date of Transmittal from the Field Office</dt>
                                                        <dd class="col-sm-9">${orffItems.transmittal_bpp_date_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Received by TSD</dt>
                                                        <dd class="col-sm-9">${orffItems.date_received_by_tsd_orftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Forwarded to BPP</dt>
                                                        <dd class="col-sm-9">${orffItems.forwarded_to_bpp || "N/A"}</dd>

                                                        <dt class="col-sm-3">Indorsement Date</dt>
                                                        <dd class="col-sm-9">${orffItems.indorsement_date_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Returned to the Field Office</dt>
                                                        <dd class="col-sm-9">${orffItems.returned_date_to_fo_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Field Office</dt>
                                                        <dd class="col-sm-9">${orffItems.forwarded_to_fo_sup_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Forwarded to the Regional Office</dt>
                                                        <dd class="col-sm-9">${orffItems.returned_date_to_ro_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Regional Office</dt>
                                                        <dd class="col-sm-9">${orffItems.forwarded_to_ro_sup_ortftf || "N/A"}</dd>

                                                        <dt class="col-sm-3">Type of Report</dt>
                                                        <dd class="col-sm-9">${orffItems.type_report || "N/A"}</dd>
                                                    </dl>
                                                </div>
                                            </dd>
                                        `
                                    }
                                }
                            }

                            var supervisionDataWalkIn = supervisionData.supervision_walkIn; // for supervision

                            if (Array.isArray(supervisionDataWalkIn) && supervisionDataWalkIn.length > 0) {
                                if (!hasData(supervisionDataWalkIn)) {
                                    supervisionHtml += `
                                        <dd class="col-sm-12">
                                            <div>
                                                <dl class="row" style="padding-left: 30px; padding-top: 10px">
                                                    <strong> No Supervision - Originated Reports From The Field Items to Display </strong>
                                                </dl>
                                            </div>
                                        </dd>
                                    `
                                } else {
                                    for (var j = 0; j < supervisionDataWalkIn.length; j++) {
                                        var walkInItems = supervisionDataWalkIn[j]
                                        supervisionHtml += `
                                            <dt class="col-sm-12">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_item_walkIn${j}" aria-expanded="false" aria-controls="supervision_item_walkIn${j}">
                                                    <strong>Supervision - Walk In (Item ${j + 1}) </strong>
                                                </button>
                                            </dt>
                                            <dd class="col-sm-12">
                                                <div class="collapse" id="supervision_item_walkIn${j}">
                                                    <dl class="row" style="padding-left: 50px; padding-top: 20px">
                                                        <dt class="col-sm-3">Date Received by TSD</dt>
                                                        <dd class="col-sm-9">${walkInItems.date_received_by_tsd_walk_in || "N/A"}</dd>

                                                        <dt class="col-sm-3">Indorsement Date</dt>
                                                        <dd class="col-sm-9">${walkInItems.indorsement_date_walk_in || "N/A"}</dd>

                                                        <dt class="col-sm-3">Date Forwarded to Field Office</dt>
                                                        <dd class="col-sm-9">${walkInItems.date_forwarded_to_fo_walk_in || "N/A"}</dd>

                                                        <dt class="col-sm-3">Field Office</dt>
                                                        <dd class="col-sm-9">${walkInItems.forwarded_to_fo_walk_in || "N/A"}</dd>
                                                    </dl>
                                                </div>
                                            </dd>
                                        `
                                    }
                                }
                            }

                            $("#sup_item_html").html(`
                                ${supervisionHtml}
                            `);
                        }
                    } else {
                        console.log("Error")
                    }
                })

                $("#spinner_view").hide();
            }else{
                alert("failed")
            }
        })
    }
    setTimeout(function () {
        __fields();
    }, 2000);

} )( jQuery );