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


    var __selectclient = function(){
        console.log("fetching client")
        __executeExternalGet('8000/petitioner/list?type=PDL-Investigation&officeId='+$.cookie('field_office_id')).done(function (result) {
            if (result.status != "ERROR") {
                $('.client_name').append("<option selected disabled>Select Client</option>");
                result.forEach(function(data){
                    var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                    $('.client_name').append(
                        '<option value="'+data.id+'" data-id="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                });
            } else {
                console.log("failed fetching docket list")
            }
        })
    }
    __selectclient();

    function fieldOffices(fieldOfficeDropdown) {
        __executeExternalGet('8088/department/list').done(function (result) {
            if (result.status != "ERROR") {
                result.forEach(function(data) {
                    // Exclude names that start with "Regional Office"
                    if (!data.name.startsWith("Regional Office")) {
                        $(`${fieldOfficeDropdown}`).append(
                            '<option value="' + data.id + '">' + data.name + '</option>'
                        );
                    }
                });
            } else {
                console.log("failed fetching docket list");
            }
        });
    }    
    function regionalOffices(regionalOfficeDropdown) {
        __executeExternalGet('8088/department/list').done(function (result) {
            if (result.status != "ERROR") {
                result.forEach(function(data) {
                    // Include only names that start with "Regional Office"
                    if (data.name.startsWith("Regional Office")) {
                        $(`${regionalOfficeDropdown}`).append(
                            '<option value="' + data.id + '">' + data.name + '</option>'
                        );
                    }
                });
            } else {
                console.log("failed fetching docket list");
            }
        });
    }

    var client_type = GetURLParameter('client_type');
    let cc_counter;

    if (client_type === "PDL-Investigation") {
        var transmittal_counter = 0;
        var date_received_counter = 0;
        var request_counter = 0;
        var supervision_counter = 0;
        var client_type = GetURLParameter('client_type');

        var investigation_counter = 0;
        var item = 1;

        $(`#investigation_card`).show();
        $("#supervision_card").hide();
        $("#supervision_walk_in_card").hide();
        $("#supervision_originated_from_field_card").hide();
        $("#supervision_client").hide();
        $("#supervision_client_label").hide();
        $(".add_more").show();
        $(".add_more_supervision").hide();
        cc_counter = 0;
        $("#criminal_case_body").append(`
            <div class="col col-md-3" id="cc_label_${cc_counter}"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
            <div class="col-12 col-md-8" id="cc_no_${cc_counter}"><input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number"></div>
            <div class="col-12 col-md-1" id="cc_no_button_${cc_counter}"><button type="button" class="btn btn-primary btn-sm" id="add_cc_num" style="max-height: 37px;"><i class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
        `)

        $("#investigation_card_body_accordion").append(`
            <div class="card" id="investigation_card_${investigation_counter}" style="border-radius: 10px; margin-bottom:0px">
                <div class="card-header d-flex" style="background: transparent;">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#investigation_accordion_${investigation_counter}" aria-expanded="true" aria-controls="">
                      Investigation (Item ${item})
                    </button>
                    <button class="btn btn-link delete_investigation ml-auto p-2" data-id="${investigation_counter}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="investigation_body collapse hide" id="investigation_accordion_${investigation_counter}" data-parent="#investigation_card">
                    <div class="card-body" id="investigation_body_${investigation_counter}">
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_date_to_fo"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office Forwarded to</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_fo select2" id="forwarded_to_fo_${investigation_counter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Regional Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_date_to_ro"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office Forwarded to</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_ro select2" id="forwarded_to_ro_${investigation_counter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
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
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Request Type</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control request_type select2" id=request_type_${investigation_counter}>
                                        <option value="" selected disabled>Select</option>
                                        <option value="REQUEST PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)">REQUEST PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)</option>
                                        <option value="REQUEST PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)">REQUEST PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)</option>
                                        <option value="REQUEST PRE-PAROLE INVESTIGATION REPORT (PPIR)">REQUEST PRE-PAROLE INVESTIGATION REPORT (PPIR)</option>
                                        <option value="REQUEST COMMUNITY INTERVIEW (CI)">REQUEST COMMUNITY INTERVIEW (CI)</option>
                                        <option value="REQUEST CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC">REQUEST CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC</option>
                                        <option value="REQUEST CERTIFICATE OF NO APPEAL (CNA)">REQUEST CERTIFICATE OF NO APPEAL (CNA)</option>
                                        <option value="REQUEST CERTIFICATE OF NO PENDING CASE (CNPC)">REQUEST CERTIFICATE OF NO PENDING CASE (CNPC)</option>
                                        <option value="REQUEST CASE VERIFICATION (CV) (PDL)">REQUEST CASE VERIFICATION (CV) (PDL)</option>
                                        <option value="REQUEST COPY FISCAL INFORMATION (FI)">REQUEST COPY FISCAL INFORMATION (FI)</option>
                                        <option value="REQUEST COPY COURT'S DECISION (CD)">REQUEST COPY COURT'S DECISION (CD)</option>
                                        <option value="REQUEST COPY COMMITMENT ORDER (CO)">REQUEST COPY COMMITMENT ORDER (CO)</option>
                                        <option value="REQUEST COPY OF CERTIFICATION OF DETENTION (COD)">REQUEST COPY OF CERTIFICATION OF DETENTION (COD)</option>
                                        <option value="REQUEST PERTINENT DOCUMENTS">REQUEST PERTINENT DOCUMENTS</option>
                                        <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control type_report select2" id=type_report_${investigation_counter}>
                                        <option value="" selected disabled>Select</option>
                                        <option value="RESULT PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)">RESULT PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)</option>
                                        <option value="RESULT PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)">RESULT PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)</option>
                                        <option value="RESULT PRE-PAROLE INVESTIGATION REPORT (PPIR)">RESULT PRE-PAROLE INVESTIGATION REPORT (PPIR)</option>
                                        <option value="RESULT COMMUNITY INTERVIEW (CI)">RESULT COMMUNITY INTERVIEW (CI)</option>
                                        <option value="RESULT CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC">RESULT CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC</option>
                                        <option value="RESULT CERTIFICATE OF NO APPEAL (CNA)">RESULT CERTIFICATE OF NO APPEAL (CNA)</option>
                                        <option value="RESULT CERTIFICATE OF NO PENDING CASE (CNPC)">RESULT CERTIFICATE OF NO PENDING CASE (CNPC)</option>
                                        <option value="RESULT CASE VERIFICATION (CV) (PDL)">RESULT CASE VERIFICATION (CV) (PDL)</option>
                                        <option value="RESULT COPY FISCAL INFORMATION (FI)">RESULT COPY FISCAL INFORMATION (FI)</option>
                                        <option value="RESULT COPY COURT'S DECISION (CD)">RESULT COPY COURT'S DECISION (CD)</option>
                                        <option value="RESULT COPY COMMITMENT ORDER (CO)">RESULT COPY COMMITMENT ORDER (CO)</option>
                                        <option value="RESULT COPY OF CERTIFICATION OF DETENTION (COD)">RESULT COPY OF CERTIFICATION OF DETENTION (COD)</option>
                                        <option value="RESULT PERTINENT DOCUMENTS">RESULT PERTINENT DOCUMENTS</option>
                                        <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        fieldOffices(`#forwarded_to_fo_${investigation_counter}`)
        regionalOffices(`#forwarded_to_ro_${investigation_counter}`)

        $(".delete_investigation").unbind("click").on("click", function (){
            let id = $(this).data("id");
            $("#removeInvestigation").modal("show")
            $('#btn_confirm_remove').data('id', id);
        })

        $(".add_more").unbind("click").on("click", function () {
            investigation_counter++;
            item ++;
            $("#investigation_card_body_accordion").append(`
                <div class="card" id="investigation_card_${investigation_counter}" style="border-radius: 10px; margin-bottom:0px">
                    <div class="card-header d-flex" style="background: transparent;">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#investigation_accordion_${investigation_counter}" aria-expanded="true" aria-controls="">
                          Investigation (Item ${item})
                        </button>
                        <button class="btn btn-link delete_investigation ml-auto p-2" data-id="${investigation_counter}">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="investigation_body collapse hide" id="investigation_accordion_${investigation_counter}" data-parent="#investigation_card">
                        <div class="card-body" id="investigation_body_${investigation_counter}">
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_date_to_fo"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office Forwarded to</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_fo select2" id="forwarded_to_fo_${investigation_counter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Regional Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_date_to_ro"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office Forwarded to</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_ro select2" id="forwarded_to_ro_${investigation_counter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
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
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Request Type</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control request_type select2" id="request_type_${investigation_counter}">
                                            <option value="" selected disabled>Select</option>
                                            <option value="REQUEST PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)">REQUEST PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)</option>
                                            <option value="REQUEST PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)">REQUEST PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)</option>
                                            <option value="REQUEST PRE-PAROLE INVESTIGATION REPORT (PPIR)">REQUEST PRE-PAROLE INVESTIGATION REPORT (PPIR)</option>
                                            <option value="REQUEST COMMUNITY INTERVIEW (CI)">REQUEST COMMUNITY INTERVIEW (CI)</option>
                                            <option value="REQUEST CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC">REQUEST CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC</option>
                                            <option value="REQUEST CERTIFICATE OF NO APPEAL (CNA)">REQUEST CERTIFICATE OF NO APPEAL (CNA)</option>
                                            <option value="REQUEST CERTIFICATE OF NO PENDING CASE (CNPC)">REQUEST CERTIFICATE OF NO PENDING CASE (CNPC)</option>
                                            <option value="REQUEST CASE VERIFICATION (CV) (PDL)">REQUEST CASE VERIFICATION (CV) (PDL)</option>
                                            <option value="REQUEST COPY FISCAL INFORMATION (FI)">REQUEST COPY FISCAL INFORMATION (FI)</option>
                                            <option value="REQUEST COPY COURT'S DECISION (CD)">REQUEST COPY COURT'S DECISION (CD)</option>
                                            <option value="REQUEST COPY COMMITMENT ORDER (CO)">REQUEST COPY COMMITMENT ORDER (CO)</option>
                                            <option value="REQUEST COPY OF CERTIFICATION OF DETENTION (COD)">REQUEST COPY OF CERTIFICATION OF DETENTION (COD)</option>
                                            <option value="REQUEST PERTINENT DOCUMENTS">REQUEST PERTINENT DOCUMENTS</option>
                                            <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control type_report select2" id="type_report_${investigation_counter}">
                                            <option value="" selected disabled>Select</option>
                                            <option value="RESULT PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)">RESULT PRE-PAROLE INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PPIR W/ CI)</option>
                                            <option value="RESULT PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)">RESULT PRE-EXECUTIVE CLEMENCY INVESTIGATION REPORT W/ COMMUNITY INTERVIEW (PECIR W/ CI)</option>
                                            <option value="RESULT PRE-PAROLE INVESTIGATION REPORT (PPIR)">RESULT PRE-PAROLE INVESTIGATION REPORT (PPIR)</option>
                                            <option value="RESULT COMMUNITY INTERVIEW (CI)">RESULT COMMUNITY INTERVIEW (CI)</option>
                                            <option value="RESULT CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC">RESULT CERTIFICATE OF NO APPEAL / CERTIFICATE OF NO PENDING CASE CNA / CNPC</option>
                                            <option value="RESULT CERTIFICATE OF NO APPEAL (CNA)">RESULT CERTIFICATE OF NO APPEAL (CNA)</option>
                                            <option value="RESULT CERTIFICATE OF NO PENDING CASE (CNPC)">RESULT CERTIFICATE OF NO PENDING CASE (CNPC)</option>
                                            <option value="RESULT CASE VERIFICATION (CV) (PDL)">RESULT CASE VERIFICATION (CV) (PDL)</option>
                                            <option value="RESULT COPY FISCAL INFORMATION (FI)">RESULT COPY FISCAL INFORMATION (FI)</option>
                                            <option value="RESULT COPY COURT'S DECISION (CD)">RESULT COPY COURT'S DECISION (CD)</option>
                                            <option value="RESULT COPY COMMITMENT ORDER (CO)">RESULT COPY COMMITMENT ORDER (CO)</option>
                                            <option value="RESULT COPY OF CERTIFICATION OF DETENTION (COD)">RESULT COPY OF CERTIFICATION OF DETENTION (COD)</option>
                                            <option value="RESULT PERTINENT DOCUMENTS">RESULT PERTINENT DOCUMENTS</option>
                                            <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            $(`#forwarded_to_fo_${investigation_counter}, #forwarded_to_ro_${investigation_counter}, #request_type_${investigation_counter}, #type_report_${investigation_counter}`).select2({
                width: '100%'
            });
            fieldOffices(`#forwarded_to_fo_${investigation_counter}`)
            regionalOffices(`#forwarded_to_ro_${investigation_counter}`)            
            $(".delete_investigation").unbind("click").on("click", function (){
                let id = $(this).data("id");
                $("#removeInvestigation").modal("show")
                $('#btn_confirm_remove').data('id', id);
            })
        })

        $("#btn_confirm_remove").unbind("click").on("click", function (){
            let id = $(this).data("id");
            console.log(id)
            $(`#investigation_card_${id}`).remove();
            $(`#success_remove`).show()
            setTimeout (function () {
                $(`#success_remove`).hide()
                $("#removeInvestigation").modal("hide")
            },1500)
        })
    } else if (client_type === "PDL-Supervision") {
        $("#investigation_card").hide();
        $("#supervision_card").show();
        $("#supervision_walk_in_card").show();
        $("#supervision_originated_from_field_card").show();
        $("#supervision_client").show();
        $("#supervision_client_label").show();
        $(".add_more").hide();
        $(".add_more_supervision").show();
        $(".add_more_supervision_originated_from_the_field").show();
        $(".add_more_supervision_walk_in").show();
        cc_counter = 0;
        $("#criminal_case_body").append(`
            <div class="col col-md-3" id="cc_label_${cc_counter}"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
            <div class="col-12 col-md-8" id="cc_no_${cc_counter}"><input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number"></div>
            <div class="col-12 col-md-1" id="cc_no_button_${cc_counter}"><button type="button" class="btn btn-primary btn-sm" id="add_cc_num" style="max-height: 37px;"><i class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
        `)
    // fetch the data in client and display it
        $('.client_name').change(function() {
            var client_id = $(this).val();
            $(".spinner").show();
            $('.pdl_details').find('input, select, button').prop('disabled', true);
            $('.card-body').find('input, select, button').prop('disabled', true);
            $('.btn-confirm').prop('disabled', true);
            // if the client dropdown change delete the criminal case body to append the new criminal cases input boxes
                $("#criminal_case_body").empty();
            __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                var result = result.response
                $('.card-body').find('input, select, button').prop('disabled', false);
                $('.btn-confirm').prop('disabled', false);
                $('.pdl_details').find('input, select, button').prop('disabled', true);

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
                $(".location").val(result.location);
                $(".tsd_po").val(result.tsdPO);

                var criminalCasesToParse = JSON.parse(result.criminalCaseNo);
                // initialize the cc_counter for tracking the number of criminal cases starts at negative so that the first value will become 0
                cc_counter = -1;
                for (var i = 0; i < criminalCasesToParse.length; i++) {
                    cc_counter++;

                    // Determine the button type based on index
                    let buttonHtml = '';
                    if (i === 0) {
                        buttonHtml = `
                            <button type="button" class="btn btn-primary btn-sm" id="add_cc_num" style="max-height: 37px;">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                        `;
                    } else {
                        buttonHtml = `
                            <button type="button" class="btn btn-danger btn-sm delete_cc" id="delete_cc_${cc_counter}" data-id="${cc_counter}" style="max-height: 37px;">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        `;
                    }

                    $("#criminal_case_body").append(`
                        <div class="col col-md-3" id="cc_label_${cc_counter}">
                            <label for="text-input" class="form-control-label">Criminal Case Number</label>
                        </div>
                        <div class="col-12 col-md-8" id="cc_no_${cc_counter}">
                            <input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number" value="${criminalCasesToParse[i].criminal_cases_number}">
                        </div>
                        <div class="col-12 col-md-1" id="cc_no_button_${cc_counter}">
                            ${buttonHtml}
                        </div>
                    `);
                }
                $(".spinner").hide();
                $('#criminal_case_body').find('input, select, button').prop('disabled', true);
            })
        })

        function deleteSupervision () {
            $(".delete_supervision").unbind("click").on("click", function (){
                let id = $(this).data("id");
                let type = $(this).data("type")
                $("#removeSupervision").modal("show")
                $('#btn_confirm_remove_sup').data('id', id);
                $('#btn_confirm_remove_sup').data('type', type);
            })


            $("#btn_confirm_remove_sup").unbind("click").on("click", function (){
                let id = $(this).data("id");
                let type = $(this).data("type");

                if (type === "supervision_bpp") {
                    $(`#supervision_card_${id}`).remove();
                    $(`#success_remove_sup`).show()
                    setTimeout (function () {
                        $(`#success_remove_sup`).hide()
                        $("#removeSupervision").modal("hide")
                    },1500)
                } else if (type === "supervision_orff") {
                    $(`#supervision_orff_card_${id}`).remove();
                    $(`#success_remove_sup`).show()
                    setTimeout (function () {
                        $(`#success_remove_sup`).hide()
                        $("#removeSupervision").modal("hide")
                    },1500)
                } else if (type === "supervision_walkIn") {
                    $(`#supervision_walk_in_card_${id}`).remove();
                    $(`#success_remove_sup`).show()
                    setTimeout (function () {
                        $(`#success_remove_sup`).hide()
                        $("#removeSupervision").modal("hide")
                    },1500)
                }
            })
        }

        var supervision_counter = 0;
        var originatedFromTheFieldCounter = 0;
        var walkInCounter = 0;
        var itemSupervision = 1;
        var itemSupervisionORFF = 1;
        var itemSupervisionWalkIn = 1;

        // append the supervision
        $(`#supervision_accordion_card`).append(`
            <div class="card" id="supervision_card_${supervision_counter}" style="border-radius: 10px; margin-bottom: 0px;">
                <div class="card-header d-flex" style="background: transparent;">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_accordion_${supervision_counter}" aria-expanded="true" aria-controls="">
                      Supervision (Item ${itemSupervision})
                    </button>
                    <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${supervision_counter}" data-type="supervision_bpp">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="supervision_body collapse hide" id="supervision_accordion_${supervision_counter}" data-parent="#supervision_accordion_card">
                    <div class="card-body" id="supervision_body_${supervision_counter}">
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from BPP</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class="form-control-label">Date Received by TSD</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control received_date_by_tsd"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_date_from_fo"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_fo_sup select2" id="forwarded_to_fo_sup_${supervision_counter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Regional</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_forwarded_to_ro_sup"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_ro_sup select2"  id="forwarded_to_ro_sup_${supervision_counter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class="form-control-label">BPP Resolutions</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control bpp_resolutions select2">
                                        <option value="" selected disabled>Select</option>
                                        <option value="DISCHARGE ON PAROLE (DOP)">DISCHARGE ON PAROLE (DOP)</option>
                                        <option value="GRANTED FINAL RELEASE & DISCHARGE (GFRD)">GRANTED FINAL RELEASE & DISCHARGE (GFRD)</option>
                                        <option value="CONFIRMATION OF TRANSFER OF RESIDENCE (CFTR)">CONFIRMATION OF TRANSFER OF RESIDENCE (CFTR)</option>
                                        <option value="DEATH NOTATION">DEATH NOTATION</option>
                                        <option value="REQUEST CASE VERIFICATION (PAROLEE)">REQUEST CASE VERIFICATION (PAROLEE)</option>
                                        <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        fieldOffices(`#forwarded_to_fo_sup_${supervision_counter}`)
        regionalOffices(`#forwarded_to_ro_sup_${supervision_counter}`)
        $(".add_more_supervision").unbind("click").on("click", function () {
            supervision_counter++;
            itemSupervision++;
            $(`#supervision_accordion_card`).append(`
                <div class="card" id="supervision_card_${supervision_counter}" style="border-radius: 10px; margin-bottom: 0px;">
                    <div class="card-header d-flex" style="background: transparent;">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_accordion_${supervision_counter}" aria-expanded="true" aria-controls="">
                          Supervision (Item ${itemSupervision})
                        </button>
                        <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${supervision_counter}" data-type="supervision_bpp">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="supervision_body collapse hide" id="supervision_accordion_${supervision_counter}" data-parent="#supervision_accordion_card">
                        <div class="card-body" id="supervision_body_${supervision_counter}">
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from BPP</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class="form-control-label">Date Received by TSD</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control received_date_by_tsd"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_date_from_fo"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_fo_sup select2" id="forwarded_to_fo_sup_${supervision_counter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Regional</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control date_forwarded_to_ro_sup"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_ro_sup select2"  id="forwarded_to_ro_sup_${supervision_counter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class="form-control-label">BPP Resolutions</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control bpp_resolutions select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="DISCHARGE ON PAROLE (DOP)">DISCHARGE ON PAROLE (DOP)</option>
                                            <option value="GRANTED FINAL RELEASE & DISCHARGE (GFRD)">GRANTED FINAL RELEASE & DISCHARGE (GFRD)</option>
                                            <option value="CONFIRMATION OF TRANSFER OF RESIDENCE (CFTR)">CONFIRMATION OF TRANSFER OF RESIDENCE (CFTR)</option>
                                            <option value="DEATH NOTATION">DEATH NOTATION</option>
                                            <option value="REQUEST CASE VERIFICATION (PAROLEE)">REQUEST CASE VERIFICATION (PAROLEE)</option>
                                            <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            deleteSupervision();
            fieldOffices(`#forwarded_to_fo_sup_${supervision_counter}`)
            regionalOffices(`#forwarded_to_ro_sup_${supervision_counter}`)
        })
        // append the body of supervision originated from the field
        $(`#supervision_originated_from_the_field_accordion_card`).append(`
            <div class="card" id="supervision_orff_card_${originatedFromTheFieldCounter}" style="border-radius: 10px; margin-bottom: 0px">
                <div class="card-header d-flex" style="background: transparent;">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_originated_from_field_accordion_${originatedFromTheFieldCounter}" aria-expanded="true" aria-controls="">
                      Supervision - Originated reports from the field (Item ${itemSupervisionORFF})
                    </button>
                    <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${originatedFromTheFieldCounter}" data-type="supervision_orff">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="collapse hide" id="supervision_originated_from_field_accordion_${originatedFromTheFieldCounter}" data-parent="#supervision_originated_from_field_card">
                    <div class="card-body supervision_orff_body_${originatedFromTheFieldCounter}">
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_transmittal_fo_field">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from the Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date_ortftf"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_received_by_tsd_orftf"></div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_forwarded_bpp_field">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date_ortftf"></div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Returned to the Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control returned_date_to_fo_ortftf"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="field_office_field">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_fo_sup_ortftf select2" id="forwarded_to_fo_sup_ortftf_${originatedFromTheFieldCounter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to the Regional Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control returned_date_to_ro_ortftf"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_ro_sup_ortftf select2" id="forwarded_to_ro_sup_ortftf_${originatedFromTheFieldCounter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="type_of_report_field">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control type_report select2">
                                        <option value="" selected disabled>Select</option>
                                        <option value="SUMMARY REPORT (SR)">SUMMARY REPORT (SR)</option>
                                        <option value="ARRIVAL / BRIEFING REPORT (AR)">ARRIVAL / BRIEFING REPORT (AR)</option>
                                        <option value="STATUS REPORT (STAT)">STATUS REPORT (STAT)</option>
                                        <option value="VIOLATION REPORT (VR)">VIOLATION REPORT (VR)</option>
                                        <option value="INFRACTION REPORT (IR)">INFRACTION REPORT (IR)</option>
                                        <option value="DEATH REPORT (DR)">DEATH REPORT (DR)</option>
                                        <option value="PROGRESS REPORT (PR)">PROGRESS REPORT (PR)</option>
                                        <option value="RESULT CASE VERICATION (PAROLEE)">RESULT CASE VERICATION (PAROLEE)</option>
                                        <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        fieldOffices(`#forwarded_to_fo_sup_ortftf_${originatedFromTheFieldCounter}`)
        regionalOffices(`#forwarded_to_ro_sup_ortftf_${originatedFromTheFieldCounter}`)
        $(".add_more_supervision_originated_from_the_field").unbind("click").on("click", function () {
            originatedFromTheFieldCounter++;
            itemSupervisionORFF++;
            $(`#supervision_originated_from_the_field_accordion_card`).append(`
                <div class="card" id="supervision_orff_card_${originatedFromTheFieldCounter}" style="border-radius: 10px; margin-bottom: 0px">
                    <div class="card-header d-flex" style="background: transparent;">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_originated_from_field_accordion_${originatedFromTheFieldCounter}" aria-expanded="true" aria-controls="">
                          Supervision - Originated reports from the field (Item ${itemSupervisionORFF})
                        </button>
                        <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${originatedFromTheFieldCounter}" data-type="supervision_orff">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="collapse hide" id="supervision_originated_from_field_accordion_${originatedFromTheFieldCounter}" data-parent="#supervision_originated_from_field_card">
                        <div class="card-body supervision_orff_body_${originatedFromTheFieldCounter}">
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_transmittal_fo_field">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Transmittal from the Field Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control transmittal_bpp_date_ortftf"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control date_received_by_tsd_orftf"></div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="date_forwarded_bpp_field">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control forwarded_to_bpp"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date_ortftf"></div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Returned to the Field Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control returned_date_to_fo_ortftf"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="field_office_field">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_fo_sup_ortftf select2" id="forwarded_to_fo_sup_ortftf_${originatedFromTheFieldCounter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to the Regional Office</label></div>
                                    <div class="col-12 col-md-8"><input type="date" class="form-control returned_date_to_ro_ortftf"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Regional Office</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control forwarded_to_ro_sup_ortftf select2" id="forwarded_to_ro_sup_ortftf_${originatedFromTheFieldCounter}">
                                            <option value="" selected disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="type_of_report_field">
                                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                                    <div class="col-12 col-md-8">
                                        <select class="form-control type_report select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="SUMMARY REPORT (SR)">SUMMARY REPORT (SR)</option>
                                            <option value="ARRIVAL / BRIEFING REPORT (AR)">ARRIVAL / BRIEFING REPORT (AR)</option>
                                            <option value="STATUS REPORT (STAT)">STATUS REPORT (STAT)</option>
                                            <option value="VIOLATION REPORT (VR)">VIOLATION REPORT (VR)</option>
                                            <option value="INFRACTION REPORT (IR)">INFRACTION REPORT (IR)</option>
                                            <option value="DEATH REPORT (DR)">DEATH REPORT (DR)</option>
                                            <option value="PROGRESS REPORT (PR)">PROGRESS REPORT (PR)</option>
                                            <option value="RESULT CASE VERICATION (PAROLEE)">RESULT CASE VERICATION (PAROLEE)</option>
                                            <option value="MISCELLANEOUS COMMUNICATION">MISCELLANEOUS COMMUNICATION</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            deleteSupervision();
            fieldOffices(`#forwarded_to_fo_sup_ortftf_${originatedFromTheFieldCounter}`)
            regionalOffices(`#forwarded_to_ro_sup_ortftf_${originatedFromTheFieldCounter}`)
        })
        // append the body of supervision walk in
        $("#supervision_walk_in_accordion_card").append(`
            <div class="card" id="supervision_walk_in_card_${walkInCounter}" style="border-radius: 10px; margin-bottom: 0px">
                <div class="card-header d-flex" style="background: transparent;">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_walk_in_accordion_walkInCounter" aria-expanded="true" aria-controls="">
                      Supervision - Walk in (Item ${itemSupervisionWalkIn})
                    </button>
                    <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${walkInCounter}" data-type="supervision_walkIn">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="collapse hide" id="supervision_walk_in_accordion_walkInCounter" data-parent="#supervision_walk_in_card">
                    <div class="card-body supervision_walk_in_body_walkInCounter">
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_received_by_tsd_walk_in"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date_walk_in"></div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_forwarded_to_fo_walk_in"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_fo_walk_in select2" id="forwarded_to_fo_walk_in_${walkInCounter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        fieldOffices(`#forwarded_to_fo_walk_in_${walkInCounter}`)
        $(".add_more_supervision_walk_in").unbind("click").on("click", function () {
            walkInCounter++;
            itemSupervisionWalkIn++;
            $("#supervision_walk_in_accordion_card").append(`
            <div class="card" id="supervision_walk_in_card_${walkInCounter}" style="border-radius: 10px; margin-bottom: 0px">
                <div class="card-header d-flex" style="background: transparent;">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#supervision_walk_in_accordion_walkInCounter" aria-expanded="true" aria-controls="">
                      Supervision - Walk in (Item ${itemSupervisionWalkIn})
                    </button>
                    <button class="btn btn-link delete_supervision ml-auto p-2" data-id="${walkInCounter}" data-type="supervision_walkIn">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="collapse hide" id="supervision_walk_in_accordion_walkInCounter" data-parent="#supervision_walk_in_card">
                    <div class="card-body supervision_walk_in_body_walkInCounter">
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_received_by_tsd_walk_in"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control indorsement_date_walk_in"></div>
                            </div>
                        </div>
                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Forwarded to Field Office</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control date_forwarded_to_fo_walk_in"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                <div class="col-12 col-md-8">
                                    <select class="form-control forwarded_to_fo_walk_in select2" id="forwarded_to_fo_walk_in_${walkInCounter}">
                                        <option value="" selected disabled>Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
            fieldOffices(`#forwarded_to_fo_walk_in_${walkInCounter}`)
            deleteSupervision();
        })
        // attach the event handler to the first load supervisions
        deleteSupervision();
    } else {
        alert("Client type is not defined redirecting to the PDL List")
        window.location.href = api+'/pis/client_list_single_carpeta';
    }

    // for appending additional criminal cases
    $(document).on("click", "#add_cc_num", function(){
        cc_counter++;
        $("#criminal_case_body").append(`
            <div class="col col-md-3" id="cc_label_${cc_counter}"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
            <div class="col-12 col-md-8" id="cc_no_${cc_counter}"><input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number"></div>
            <div class="col-12 col-md-1" id="cc_no_button_${cc_counter}"><button type="button" class="btn btn-danger btn-sm delete_cc" id="delete_cc_${cc_counter}" data-id="${cc_counter}" style="max-height: 37px;"><i class="fa fa-trash" aria-hidden="true"></i></button></div>
        `)

        // for deleting criminal cases
        $(".delete_cc").unbind("click").on("click", function (){
            let id = $(this).data("id");
            $(`#cc_no_button_${id}`).remove();
            $(`#cc_no_${id}`).remove();
            $(`#cc_label_${id}`).remove();
        })
    })

    // for deleting criminal cases
    $(document).on("click", ".delete_cc", function(){
        let id = $(this).data("id");
        $(`#cc_no_button_${id}`).remove();
        $(`#cc_no_${id}`).remove();
        $(`#cc_label_${id}`).remove();
    })

    $(".btn-confirm").unbind("click").on("click", function(){
        let pdlClientType;
        
        let data;

        const criminal_cases_number_array = [];
        const criminal_cases_number = $(".criminal_case_number")

        for (var i = 0; i < criminal_cases_number.length; i++) {
            const cc_list = {};
            cc_list.criminal_cases_number = $(criminal_cases_number[i]).val();
            criminal_cases_number_array.push(cc_list)
        }

        function petitionerPayload (pdlClientType) {
            return {
                "clientType"            : pdlClientType,
                "firstName"             : $(".firstName").val(),
                "middleName"            : $(".middleName").val(),
                "lastName"              : $(".lastName").val(),
                "suffixName"            : $(".suffix").val(),
                "sex"                   : $(".gender").val(),
                "education"             : $(".educational_attainment").val(),
                "occupation"            : $(".occupation").val(),
                // "criminalCaseNo"        : $(".criminal_case_number").val(),
                "criminalCaseNo"        : JSON.stringify(criminal_cases_number_array),
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
                "endorsementDate"       : "",
                "tsdPO"                 : $(".tsd_po").val(),
                "dateEmailedToFO"       : "",
                "dateReceived"          : "",
                "resultFromFO"          : "",
                "requestType"           : "",
                "remarks"               : $(".pdl_remarks").val(),
                "dateForwardedToBpp"    : "",
                "location"              : $(".location").val(),
                "religion"              : $(".religion").val()
            } 
        } 

        if (client_type === "PDL-Investigation") {
            pdlClientType = "PDL-Investigation"
            var payload = petitionerPayload(pdlClientType)
            data = [];
            // construct the JSON Data for investigation start
            const date_forwarded_to_fo = $(".forwarded_date_to_fo");
            const forwarded_to_fo = $(".forwarded_to_fo");
            const forwarded_date_to_ro = $(".forwarded_date_to_ro");
            const forwarded_to_ro = $(".forwarded_to_ro");
            const transmittal_bpp_date = $(".transmittal_bpp_date");
            const transmittal_date_from_fo = $(".transmittal_date_from_fo");
            const received_date_by_tsd = $(".received_date_by_tsd");
            const forwarded_to_bpp = $(".forwarded_to_bpp");
            const indorsement_date = $(".indorsement_date");
            const request_type = $(".request_type");
            const type_report = $(".type_report");

            for(var i = 0; i < date_forwarded_to_fo.length; i++){
                const list = {};
                list.date_forwarded_to_fo = $(date_forwarded_to_fo[i]).val();
                list.forwarded_to_fo = $(forwarded_to_fo[i]).val();
                list.forwarded_date_to_ro = $(forwarded_date_to_ro[i]).val();
                list.forwarded_to_ro = $(forwarded_to_ro[i]).val();
                list.transmittal_bpp_date = $(transmittal_bpp_date[i]).val();
                list.transmittal_date_from_fo = $(transmittal_date_from_fo[i]).val();
                list.received_date_by_tsd = $(received_date_by_tsd[i]).val();
                list.forwarded_to_bpp = $(forwarded_to_bpp[i]).val();
                list.indorsement_date = $(indorsement_date[i]).val();
                list.request_type = $(request_type[i]).val();
                list.type_report = $(type_report[i]).val();
                data.push(list);
            }
            // construct the JSON Data for investigation end
        } else {
            pdlClientType = "PDL-Supervision"
            var payload = petitionerPayload(pdlClientType)

            // Initialize the array for JSON Data of supervision
            data = [];

            // construct the JSON Data for supervision_bpp start
            const transmittal_bpp_date = $(".transmittal_bpp_date");
            const received_date_by_tsd = $(".received_date_by_tsd");
            const transmittal_date_from_fo = $(".transmittal_date_from_fo");
            const forwarded_to_fo_sup = $(".forwarded_to_fo_sup");
            const date_forwarded_to_ro_sup = $(".date_forwarded_to_ro_sup");
            const forwarded_to_ro_sup = $(".forwarded_to_ro_sup");
            const indorsement_date = $(".indorsement_date");
            const bpp_resolutions = $(".bpp_resolutions");

            const supervision_data = {
                supervision_bpp: [],
                supervision_orff: [],
                supervision_walkIn: []
            };
            for(var i = 0; i < transmittal_bpp_date.length; i++){
                const supervision_bpp_list = {};
                supervision_bpp_list.transmittal_bpp_date = $(transmittal_bpp_date[i]).val();
                supervision_bpp_list.received_date_by_tsd = $(received_date_by_tsd[i]).val();
                supervision_bpp_list.transmittal_date_from_fo = $(transmittal_date_from_fo[i]).val();
                supervision_bpp_list.forwarded_to_fo_sup = $(forwarded_to_fo_sup[i]).val();
                supervision_bpp_list.date_forwarded_to_ro_sup = $(date_forwarded_to_ro_sup[i]).val();
                supervision_bpp_list.forwarded_to_ro_sup = $(forwarded_to_ro_sup[i]).val();
                supervision_bpp_list.indorsement_date = $(indorsement_date[i]).val();
                supervision_bpp_list.bpp_resolutions = $(bpp_resolutions[i]).val();
                supervision_data.supervision_bpp.push(supervision_bpp_list);
            }
            // construct the JSON Data for supervision_orff start
            const transmittal_bpp_date_ortftf = $(".transmittal_bpp_date_ortftf");
            const date_received_by_tsd_orftf = $(".date_received_by_tsd_orftf");
            const forwarded_to_bpp = $(".forwarded_to_bpp");
            const indorsement_date_ortftf = $(".indorsement_date_ortftf");
            const returned_date_to_fo_ortftf = $(".returned_date_to_fo_ortftf");
            const forwarded_to_fo_sup_ortftf = $(".forwarded_to_fo_sup_ortftf");
            const returned_date_to_ro_ortftf = $(".returned_date_to_ro_ortftf");
            const forwarded_to_ro_sup_ortftf = $(".forwarded_to_ro_sup_ortftf");
            const type_report = $(".type_report");

            for(var i = 0; i < transmittal_bpp_date_ortftf.length; i++){
                const supervision_orff_list = {};
                supervision_orff_list.transmittal_bpp_date_ortftf = $(transmittal_bpp_date_ortftf[i]).val();
                supervision_orff_list.date_received_by_tsd_orftf = $(date_received_by_tsd_orftf[i]).val();
                supervision_orff_list.forwarded_to_bpp = $(forwarded_to_bpp[i]).val();
                supervision_orff_list.indorsement_date_ortftf = $(indorsement_date_ortftf[i]).val();
                supervision_orff_list.returned_date_to_fo_ortftf = $(returned_date_to_fo_ortftf[i]).val();
                supervision_orff_list.forwarded_to_fo_sup_ortftf = $(forwarded_to_fo_sup_ortftf[i]).val();
                supervision_orff_list.returned_date_to_ro_ortftf = $(returned_date_to_ro_ortftf[i]).val();
                supervision_orff_list.forwarded_to_ro_sup_ortftf = $(forwarded_to_ro_sup_ortftf[i]).val();
                supervision_orff_list.type_report = $(type_report[i]).val();
                supervision_data.supervision_orff.push(supervision_orff_list);
            }


            // construct the JSON Data for supervision_walk_in start
            const date_received_by_tsd_walk_in = $(".date_received_by_tsd_walk_in");
            const indorsement_date_walk_in = $(".indorsement_date_walk_in");
            const date_forwarded_to_fo_walk_in = $(".date_forwarded_to_fo_walk_in");
            const forwarded_to_fo_walk_in = $(".forwarded_to_fo_walk_in");

            for(var i = 0; i < date_received_by_tsd_walk_in.length; i++){
                const supervision_walkIn_list = {};
                supervision_walkIn_list.date_received_by_tsd_walk_in = $(date_received_by_tsd_walk_in[i]).val();
                supervision_walkIn_list.indorsement_date_walk_in = $(indorsement_date_walk_in[i]).val();
                supervision_walkIn_list.date_forwarded_to_fo_walk_in = $(date_forwarded_to_fo_walk_in[i]).val();
                supervision_walkIn_list.forwarded_to_fo_walk_in = $(forwarded_to_fo_walk_in[i]).val();
                supervision_data.supervision_walkIn.push(supervision_walkIn_list);
            }

            data.push(supervision_data)
        }
        __executeExternalPost('8000/petitioner/create',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            var petitionerId = result.response.id
            var dataPayload = {
              "petitionerId": petitionerId,
              "type": pdlClientType,
              "jsonData": JSON.stringify(data),
              "createdBy": $.cookie("uuid"),
              "createdByName": "",
              "status": true
            }
            if (result.status != "ERROR") {
                __executeExternalPost('8000/data/create',JSON.stringify(dataPayload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {                        
                        $(".form-control").val('');
                        $('#success').show();
                        setTimeout(function () {
                            $('#success').hide();
                            setTimeout(function () {
                                window.location.href = api+'/pis/client_list_single_carpeta';
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }else{
                alert("failed")
            }
        })
    })
} )( jQuery );