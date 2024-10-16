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
        var __select = function(){
            $('.ref_office_update').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $('.ref_office_update').append("<option selected disabled>Select Field Office</option>");
                    result.forEach(function(data){
                        $('.ref_office_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });

                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        var __selectclient = function(){
            $('.client_update').empty();
            __executeExternalGet('8000/petitioner/list?type=PARDONEE&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.client_update').append("<option selected disabled>Select Client</option>");
                    result.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        $('.client_update').append(
                            '<option value="'+data.id+'" data-id="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

        var docket_number = GetURLParameter('docket_number');
        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);
        
        var __fields = function(){
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docket_num_update").val(result.docketNumber);
                    $(".state_update").val(result.status).trigger("change");
                    $(".board_order_update").val(result.boardOrder).trigger("change");
                    $(".board_status_update").val(result.boardOrderStatus).trigger("change");
                    $(".client_type_update").val(result.clientType).trigger("change");
                    $(".task_update").val(result.caseloadType).trigger("change");
                    $(".docket_series_update").val(result.docketSeries).trigger("change");
                    $(".recommendation_update").val(result.recommendationState).trigger("change");
                    $(".ref_office_update").val(result.transferredOfficeId).trigger("change");
                    $(".client_update").val(result.clientId).trigger("change");
                    $(".inv_off_update").val(result.investigatingOfficer);
                    $(".cc_no_update").val(result.criminalCaseNumber);
                    $(".offense_update").val(result.offense);
                    $(".prison_name_update").val(result.prisonName);
                    $(".date_transferred_update").val(result.dateOfTransfer);
                    $(".date_peci_update").val(result.investigationReportSubmittedDate);

                    

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var fname = $('.client_update option:selected').data('fname');
                        var mname = $('.client_update option:selected').data('mname');
                        var lname = $('.client_update option:selected').data('lname');
                        var sname = $('.client_update option:selected').data('sname');
                        var fullName = fname + " " + mname + " " + lname + " " + sname;

                        var payload = {
                        "type"                  : "SC_PD_INV",
                        "docketNumber"          : $(".docket_num_update").val(),
                        "docketSeries"          : $(".docket_series_update").val(),
                        "caseloadType"          : $(".task_update").val(),
                        "fieldOfficeId"         : $.cookie('field_office_id'),
                        "clientType"            : "PARDONEE",
                        "clientId"              : $(".client_update").val(),
                        "firstName"             : fname,
                        "middleName"            : mname,
                        "lastName"              : lname,
                        "suffixName"            : sname,
                        "fullName"              : fullName,
                        "pleaBargain"           : false,
                        "caseClassification"    : "",
                        "criminalCaseNumber"    : $(".cc_no_update").val(),
                        "offense"               : $(".offense_update").val(),
                        "investigatingOfficer"  : $(".inv_off_update").val(),
                        "courtOfOrigin"         : "",
                        "courtOrderDate"        : "",
                        "receivedDateByPPO"     : "",
                        "sentence"              : "",
                        "manualDocket"          : false,
                        "referral"              : false,
                        "referralData"          : "",
                        "remarks"               : "",
                        "probationStartDate"    : "",
                        "probationYear"         : "",
                        "probationMonth"        : "",
                        "probationDay"          :"",
                        "prisonName"            : $(".prison_name_update").val(),
                        "investigationReportSubmittedDate"  : $(".date_peci_update").val(),
                        "ppoRecommendation"                 : "",
                        "recommendationState"               : $(".recommendation_update").val(),
                        "dateOfTransfer"                    : $(".date_transferred_update").val(),
                        "transferredOfficeId"               : $(".ref_office_update").val(),
                        "dateOrderReceivedFromTheBoard"     : "",
                        "boardOrder"            : $(".board_order_update").val(),
                        "boardOrderStatus"      : $(".board_status_update").val(),
                        "referrringOfficeId"    : "",
                        "dateCICAR"             : "",
                        "supervisingOfficer"    : "",
                        "probationEndDate"      : "",
                        "referralType"          : "",
                        "dateReportSubmittedToTheBoard"                 : "",
                        "dateReportSubmittedToRDForTransferToOtherPPO"  : "",
                        "resolutionType"                                : "",
                        "dateResolutionFromTheBoard"                    : "",
                        "dateResolutionFromTheRDForTransfer"            : "",
                        "createdBy"     : "",
                        "legalAge"      : false,
                        "militaryCourt" : false,

                        }
                        __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success').show();
                                setTimeout(function () {
                                    $('#success').hide();
                                    window.location.href = api+'/pis/pardonee_investigation_docketing';
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
            $('.docket_num_update').prop('disabled', true)
            $('.client_update').prop('disabled', true)
            $('.docket_series_update').prop('disabled', true)
        }, 4000);

    } )( jQuery );