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
    
    var __fields = function(){
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


    // var __select = function(){
    //     $('.field_office_update').empty();

    //     __executeExternalGet('8088/department/list').done(function (result) {
    //         console.log(result)
    //         if (result.status != "ERROR") {
    //             $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
    //             result.forEach(function(data){
    //                 $('.field_office_update').append(
    //                     "<option value="+data.id+">"+data.name+"</option>");
    //             });

    //         } else {
    //             console.log("failed fetching docket list")
    //         }
    //     })
    // }
    // __select();

    setTimeout(function () {
        __fields();
        $("#spinner_update").hide();
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm_update').prop('disabled', false);
    }, 2000);

    // var checkbox = document.getElementsByClassName("middleNameCheck")[0];
    // checkbox.addEventListener("change", toggleCheckbox);
    // var inputBoxMiddleName = document.getElementsByClassName("middleName_update")[0];

    // function toggleCheckbox() {
    //     if (checkbox.checked) {
    //         console.log("The checkbox is checked.");
    //         inputBoxMiddleName.disabled = true;
    //         inputBoxMiddleName.placeholder = "N/A";
    //         inputBoxMiddleName.value = "";
    //     } else {
    //         console.log("The checkbox is not checked.");
    //         inputBoxMiddleName.disabled = false;
    //         inputBoxMiddleName.placeholder = "e.g A.";
    //     }
    // }

} )( jQuery );