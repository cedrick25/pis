( function ( $ ) {
        
    var api = localStorage.getItem('api');
    var ___ctx = api;
    console.log(___ctx)

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
    var transmittal_counter = 0;
    var date_received_counter = 0;
    var request_counter = 0;
    $(".transmittal_body").append(`
        <div class="row col-12 transmittal_field_0">
            <div class="col col-md-3" style="margin-right: 10px;"><label for="text-input" class=" form-control-label" id="transmittal_label_0">Transmittal Date</label></div>
            <div class="col col-md-8"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control transmittal_date" id="transmittal_input_0"></div>
            <div class="col-12 col-md-1 align-items-center" style="margin-bottom: 15px; max-width: 40px;"><button type="button" class="add_more_transmittal_date btn btn-primary btn-sm" id="transmittal_add_0"><i class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
        </div>
    `)
    $(".add_more_transmittal_date").unbind("click").on("click", function(){
        transmittal_counter++;
        $(".transmittal_body").append(`
            <div class="row col-12 transmittal_field_${transmittal_counter}">
                <div class="col col-md-3" style="margin-right: 10px;"><label for="text-input" class=" form-control-label" id="transmittal_label_${transmittal_counter}"></label></div>
                <div class="col col-md-8"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control transmittal_date" id="transmittal_input_${transmittal_counter}"></div>
                <div class="col-12 col-md-1 align-items-center" style="margin-bottom: 15px; max-width: 40px;"><button type="button" class="delete_transmittal_date btn btn-danger btn-sm" id="transmittal_delete_${transmittal_counter}" data-id="${transmittal_counter}"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
            </div>
        `)
    })

    $(document).on("click", ".delete_transmittal_date", function () {
        var id = $(this).data("id");
        console.log(id)
        $(`.transmittal_field_${id}`).remove();
    });

    $(".date_received_body").append(`
        <div class="row col-12 date_received_field_0">
            <div class="col col-md-3" style="margin-right: 10px;"><label for="text-input" class=" form-control-label">Date Received by TSD</label></div>
            <div class="col-12 col-md-8"><input type="date" name="text-input" placeholder="Enter Address" class="form-control date_received"></div>
            <div class="col-12 col-md-1 align-items-center" style="margin-bottom: 15px; max-width: 40px;"><button type="button" class="add_more_date_received btn btn-primary btn-sm"><i class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
        </div>
    `)
    $(".add_more_date_received").unbind("click").on("click", function(){
        date_received_counter++;
        $(".date_received_body").append(`
            <div class="row col-12 date_received_field_${date_received_counter}">
                <div class="col col-md-3" style="margin-right: 10px;"><label for="text-input" class=" form-control-label"></label></div>
                <div class="col-12 col-md-8"><input type="date" name="text-input" placeholder="Enter Address" class="form-control date_received"></div>
                <div class="col-12 col-md-1 align-items-center" style="margin-bottom: 15px; max-width: 40px;"><button type="button" class="delete_date_received btn btn-danger btn-sm" id="date_received_delete_${date_received_counter}" data-id="${date_received_counter}"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
            </div>
        `)
    })

    $(document).on("click", ".delete_date_received", function () {
        var id = $(this).data("id");
        console.log(id)
        $(`.date_received_field_${id}`).remove();
    });

    $(".add_more").unbind("click").on("click", function(){
        request_counter++;
        $(`.request_card`).append(`
            <div id="request_body_${request_counter}">
                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Request Type</label></div>
                        <div class="col-12 col-md-9">
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
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                        <div class="col-12 col-md-9">
                            <select class="form-control type_report select2">
                                <option value="" selected disabled>Select</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control indorsement_date"></div>
                    </div>
                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Address" class="form-control date_forwarded_bpp"></div>
                    </div>
                </div>
                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-end">
                        <button type="button" class="delete btn btn-danger btn-sm float-right" data-id="${request_counter}">Delete</button>
                    </div>
                </div>
            </div>
        `)
    })

    $(document).on("click", ".delete", function () {
        var id = $(this).data("id");
        $(`#request_body_${id}`).remove();
    });

    $(".btn-confirm").unbind("click").on("click", function(){
        var payload = {
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
        // console.log(payload)
        __executeExternalPost('8000/petitioner/create',JSON.stringify(payload)).done(function (result) {
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
    })
} )( jQuery );