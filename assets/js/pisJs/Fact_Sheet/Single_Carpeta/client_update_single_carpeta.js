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
    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm_update').prop('disabled', true);
    
    var __fields = function() {
        // for appending additional criminal cases
        $("#add_cc_num").unbind("click").on("click", function(){
            cc_counter++;
            $("#criminal_case_body").append(`
                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number" id="cc_no_${cc_counter}"></div>
                </div>
                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <button type="button" class="btn btn-danger btn-sm" id="add_cc_num" style="max-height: 37px;"><i class="fa fa-trash" aria-hidden="true"></i> Criminal Case Number</button>
                </div>
            `)
        })
        // for appending investigation
        $(".add_more").unbind("click").on("click", function(){
            investigation_counter++;
            $(".investigation_body").append(`
                <div id="investigation_body_${investigation_counter}" style="margin-top: 150px; padding-top: 150px">
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from BPP</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Transmital Date from Field Office</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_date_from_fo"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control received_date_by_tsd"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_date_to_fo"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Request Type</label></div>
                            <div class="col-12 col-md-8">
                                <select class="form-control request_type select2">
                                    <option value="" selected disabled>Select</option>
                                    <option value="Request to conduct PPIR">Request to conduct PPIR</option>
                                    <option value="Request to conduct PECIR">Request to conduct PECIR</option>
                                    <option value="Request for transmittal">Request for transmittal</option>
                                    <option value="Request for transfer">Request for transfer</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                            <div class="col-12 col-md-8">
                                <select class="form-control type_report select2">
                                    <option value="" selected disabled>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
        // for appending supervision
        $(".add_more_supervision").unbind("click").on("click", function(){
            supervision_counter++;
            $(".supervision_body").append(`
                <div id="supervision_body_${supervision_counter}" style="margin-top: 150px; padding-top: 150px">
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_transmittal_bpp_field">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from BPP</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_transmittal_fo_field" style="display:none;">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from the Field Office</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="regional_date_field">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Regional</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_date_from_fo"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="fo_date_field" style="display:none;">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_date_from_fo"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_forwarded_bpp_field" style="display:none;">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_received_tsd_field">
                            <div class="col col-md-4"><label for="text-input" class="form-control-label">Date Received by TSD</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control received_date_by_tsd"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_returned_fo_field" style="display: none;">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Returned to the Field Office</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control returned_date_to_fo"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                            <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                        </div>
                    </div>
                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">BPP Resolutions</label></div>
                            <div class="col-12 col-md-8">
                                <select class="form-control bpp_resolutions select2">
                                    <option value="" selected disabled>Select</option>
                                    <option value="Discharge on Parole">Discharge on Parole</option>
                                    <option value="Other BPP Resolutions">Other BPP Resolutions</option>
                                    <option value="Originated Reports From The Field">Originated Reports From The Field</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display:none;">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                            <div class="col-12 col-md-8">
                                <select class="form-control type_report select2">
                                    <option value="" selected disabled>Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
        // for bpp resolution dropdown
        $('.bpp_resolutions').change(function() {
            let value = $(this).val();
            if (value === "Discharge on Parole") {
                $("#regional_date_field").show();
                $("#fo_date_field").hide();
                $("#date_forwarded_bpp_field").hide();
                $("#date_transmittal_fo_field").hide();
                $("#date_transmittal_bpp_field").show();
                $("#date_returned_fo_field").hide()
            } else if (value === "Other BPP Resolutions") {
                $("#regional_date_field").hide();
                $("#fo_date_field").show();
                $("#date_forwarded_bpp_field").hide();
                $("#date_transmittal_fo_field").hide();
                $("#date_transmittal_bpp_field").show();
                $("#date_returned_fo_field").hide()
            } else if (value === "Originated Reports From The Field") {
                $("#date_transmittal_fo_field").show();
                $("#date_transmittal_bpp_field").hide();
                $("#date_forwarded_bpp_field").show();
                $("#regional_date_field").hide();
                $("#fo_date_field").hide();
                $("#date_returned_fo_field").show()
            }
        });
        __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
            var result = result.response;

            if (result.status != "ERROR") {
                console.log()
                // $(".field_office_update").val(result.fieldOfficeId).trigger("change");
                // $(".client_type").val(result.clientType).trigger("change");
                // $(".gender").val(result.sex).trigger("change");
                // $(".firstName").val(result.firstName);
                // $(".middleName").val(result.middleName);
                // $(".lastName").val(result.lastName);
                // $(".suffix").val(result.suffixName);
                // $(".educational_attainment").val(result.education);
                // $(".occupation").val(result.occupation);
                // $(".file_number").val(result.criminalCaseNo);
                // $(".birthdate").val(result.birthDate);
                // $(".b_place").val(result.birthCity);
                // $(".address").val(result.permanentAddress);
                // $(".criminal_case_number").val(result.criminalCaseNo);
                // $(".prison_number").val(result.criminalCaseNo);
                // $(".alias").val(result.criminalCaseNo);
                // $(".status").val(result.criminalCaseNo);
                // $(".file_number").val(result.criminalCaseNo);
                // $(".location").val(result.criminalCaseNo);
                // $(".prison_name").val(result.criminalCaseNo);
                // $(".civil_status").val(result.sex).trigger("change");
                // $(".religion").val(result.sex).trigger("change");

                $(".criminal_case_number").val(result.criminalCaseNo);
                $(".prison_number").val(result.prisonNumber);
                $(".firstName").val(result.firstName);
                $(".middleName").val(result.middleName);
                $(".lastName").val(result.lastName);
                $(".suffix").val(result.suffixName);
                $(".alias").val(result.alias);
                $(".prison_name").val(result.prisonName);
                $(".file_number").val(result.fileNumber);
                $(".civil_status").val(result.civilStatus).trigger("change");
                $(".nationality").val(result.nationality).trigger("change");
                $(".gender").val(result.sex).trigger("change");
                $(".birthdate").val(result.birthDate);
                $(".b_place").val(result.birthCity);
                $(".educational_attainment").val(result.education);
                $(".occupation").val(result.occupation);
                $(".address").val(result.permanentAddress);
                $(".indorsement_date").val(result.endorsementDate);
                $(".date_forwarded_bpp").val(result.dateForwardedToBpp);
                $(".date_emailed_to_fo").val(result.dateEmailedToFO);
                $(".date_received").val(result.dateReceived);
                $(".date_result_from_fo").val(result.resultFromFO);



                $(".btn-confirm").unbind("click").on("click", function(){
                    var payload = {
                    // "firstName"         : $(".firstName").val(),
                    // "middleName"        : $(".middleName").val(),
                    // "lastName"          : $(".lastName").val(),
                    // "suffixName"        : $(".suffix").val(),
                    // "clientType"        : result.clientType,
                    // "sex"               : $(".gender").val(),
                    // "education"         : $(".educational_attainment").val(),
                    // "occupation"        : $(".occupation").val(),
                    // "criminalCaseNo"    : $(".file_number").val(),
                    // "fieldOfficeId"     : result.fieldOfficeId,
                    // "birthDate"         : $(".birthdate").val(),
                    // "birthCity"         : $(".b_place").val(),
                    // "permanentAddress"  : $(".address").val(),
                    // "createdBy"         : "",
                    // "updatedBy"         : "",
                    // "status"            : 1
                    "clientType"            : "PDL",
                    "firstName"             : $(".firstName").val(),
                    "middleName"            : $(".middleName").val(),
                    "lastName"              : $(".lastName").val(),
                    "suffixName"            : $(".suffix").val(),
                    "sex"                   : $(".gender").val(),
                    "education"             : $(".educational_attainment").val(),
                    "occupation"            : $(".occupation").val(),
                    "criminalCaseNo"        : $(".criminal_case_number").val(),
                    "fieldOfficeId"         : $.cookie("field_office_id"),
                    "birthDate"             : $(".birthdate").val(),
                    "birthCity"             : $(".b_place").val(),
                    "permanentAddress"      : $(".address").val(),
                    "createdBy"             : $.cookie('uuid'),
                    "createdByName"         : "",
                    "updatedBy"             : "",
                    "updatedByName"         : "",
                    "id"                    : "",
                    "status"                : 1,
                    "fieldOfficeName"       : $.cookie("departmentName"),
                    "worksheetStatus"       : "",
                    "prisonNumber"          : $(".prison_number").val(),
                    "prisonName"            : $(".prison_name").val(),
                    "alias"                 : $(".alias").val(),
                    "civilStatus"           : $(".civil_status").val(),
                    "nationality"           : $(".nationality").val(),
                    "fileNumber"            : $(".file_number").val(),
                    "endorsementDate"       : $(".indorsement_date").val(),
                    "tsdPO"                 : $(".tsd_po").val(),
                    "dateEmailedToFO"       : $(".date_emailed_to_fo").val(),
                    "dateReceived"          : $(".date_received").val(),
                    "resultFromFO"          : $(".date_result_from_fo").val(),
                    "requestType"           : $(".request_type").val(),
                    "remarks"               : $(".pdl_remarks").val(),
                    "dateForwardedToBpp"    : $(".date_forwarded_bpp").val(),
                    "location"              : $(".location").val(),
                    "religion"              : $(".religion").val()

                    }
                    __executeExternalPost('8000/petitioner/update/'+client_id,JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                            setTimeout(function () {
                                $('#success').hide();
                                window.location.href = api+'/pis/client_list_single_carpeta';
                            }, 2000);
                        }else{
                            alert("failed")
                        }
                    })
                })

            }else{
                alert("failed")
            }
        })
    }
    setTimeout(function () {
        __fields();
        $("#spinner_update").hide();
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm_update').prop('disabled', false);
    }, 2000);

} )( jQuery );