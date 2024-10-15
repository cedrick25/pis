   ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
            // path = $.wms.getContextPath() + path;
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
            __executeExternalGet('8000/petitioner/list?type=PAROLEE&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.client_update').append("<option selected disabled> - - Select Client - - </option>");
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
                if (result.status != "ERROR") {
                    $(".docket_num_update").val(result.docketNumber);

                    $(".docket_series_update").val(result.docketSeries).trigger("change");
                    $(".client_update").val(result.clientId).trigger("change");
                    $(".type_update").val(result.caseloadType).trigger("change");
                    $(".client_type_update").val(result.clientType).trigger("change");
                    $(".case_class_update").val(result.caseClassification).trigger("change");
                    $(".report_type_update").val(result.reportType).trigger("change");
                    $(".referral_type_update").val(result.referralType).trigger("change");
                    $(".res_type_update").val(result.resolutionType).trigger("change");
                    $(".board_order_update").val(result.referralType).trigger("change");
                    $(".board_status_update").val(result.resolutionType).trigger("change");
                    $(".dr_ppo_update").val(result.receivedDateByPPO);
                    $(".sup_officer_update").val(result.supervisingOfficer);
                    $(".date_rec_board_update").val(result.dateResolutionFromTheBoard);
                    $(".date_rec_trans_update").val(result.dateResolutionFromTheRDForTransfer);
                    $(".start_sup_update").val(result.supervisionStartDate);
                    $(".end_sup_update").val(result.supervisionEndDate);
                    $(".date_sub_board_update").val(result.dateReportSubmittedToTheBoard)
                    $(".date_sub_trans_update").val(result.dateReportSubmittedToRDForTransferToOtherPPO)

                    $(".btn-confirm_update").unbind("click").on("click", function(){

                        var fname = $('.client_update option:selected').data('fname');
                        var mname = $('.client_update option:selected').data('mname');
                        var lname = $('.client_update option:selected').data('lname');
                        var sname = $('.client_update option:selected').data('sname');
                        var fullName = fname + " " + mname + " " + lname + " " + sname; 
                        var clientId = $('.client_update option:selected').data('id');

                        var payload = {
                        "type"                      : "SC_PR_SUP",
                        "docketNumber"              : $(".docket_num_update").val(),
                        "docketSeries"              : $(".docket_series_update").val(),
                        "caseloadType"              : $(".type_update").val(),
                        "fieldOfficeId"             : $.cookie('field_office_id'),
                        "clientType"                : "PAROLEE",
                        "clientId"                  : clientId,
                        "firstName"                 : fname,
                        "middleName"                : mname,
                        "lastName"                  : lname,
                        "suffixName"                : sname,
                        "fullName"                  : fullName,
                        "pleaBargain"               : true,
                        "caseClassification"        : $(".case_class_update").val(),
                        "criminalCaseNumber"        : "",
                        "offense"                   : "",
                        "courtOfOrigin"             : "",
                        "courtOrderDate"            : "",
                        "investigatingOfficer"      : "",
                        "receivedDateByPPO"         : $(".dr_ppo_update").val(),
                        "sentence"                  : "",
                        "manualDocket"              : true,
                        "referral"                  : true,
                        "referralData"              : "",
                        "remarks"                   : "",
                        "probationStartDate"        : "",
                        "probationYear"             : "",
                        "probationMonth"            : "",
                        "probationDay"              : "",
                        "reportType"                : $(".report_type_update").val(),
                        "prisonName"                : "",
                        "investigationReportSubmittedDate"          :"",
                        "ppoRecommendation"         : "",
                        "recommendationState"       : "",
                        "dateOfTransfer"            : "",
                        "transferredOfficeId"       : "",
                        "dateOrderReceivedFromTheBoard"             : "",
                        "boardOrder"                : $(".board_update").val(),
                        "boardOrderStatus"          : $(".board_status_update").val(),
                        "referrringOfficeId"        : "",
                        "dateCICAR"                 : "",
                        "supervisingOfficer"        : $(".sup_officer_update").val(),
                        "probationEndDate"          : "",
                        "referralType"              : $(".referral_type_update").val(),
                        "dateReportSubmittedToTheBoard"             : $(".date_sub_board_update").val(),
                        "dateReportSubmittedToRDForTransferToOtherPPO": $(".date_sub_trans_update").val(),
                        "resolutionType"            : $(".res_type_update").val(),
                        "dateResolutionFromTheBoard": $(".date_rec_board_update").val(),
                        "dateResolutionFromTheRDForTransfer"        : $(".date_rec_trans_update").val(),
                        "createdBy"                 : "",
                        "updatedBy"                 : "",
                        "legalAge"                  : true,
                        "militaryCourt"             : true,
                        "supervisionStartDate"      : $(".start_sup_update").val(),
                        "supervisionEndDate"        : $(".end_sup_update").val()

                        }
                        __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success').show();
                                setTimeout(function () {
                                    $('#success').hide();
                                    window.location.href = api+'/pis/parolee_supervision_docketing';
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
        var __select = function(){
            $('.ref_office_update').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.ref_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
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

        setTimeout(function () {
            __fields();
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm_update').prop('disabled', false);
            $('.docket_num_update').prop('disabled', true)
            $('.docket_series_update').prop('disabled', true)
        }, 3000);
    } )( jQuery );