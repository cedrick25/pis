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

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm').prop('disabled', true);


        $('.plea_bargain').change(function(){
            if ($('.plea_bargain').val() == "true") {
                $(".class_sel_true").show();
            } else {
                $(".class_sel_true").hide();
            }
            if ($('.plea_bargain').val() == "false"){
            $(".class_sel_true").hide();
            } else {
                $(".class_sel_true").show();
            }
        });

        var __selectclient = function(){
            $('.pb_client_sup').empty();
            __executeExternalGet('8000/petitioner/list?type=PROBATIONER&officeId='+$.cookie("field_office_id")).done(function (result) {
                if (result.status != "ERROR") {
                    $('.pb_client_sup').append("<option selected disabled>Select Client</option>");
                    let name = "";
                    result.forEach(function(data){
                        if (data.firstName === null &&
                            data.middleName === null &&
                            data.lastName === null &&
                            data.suffixName === null ) {
                            name = data.fullName;
                            $('.pb_client_sup').append(
                                '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');
                        } else {
                            name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                            $('.pb_client_sup').append(
                                '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');

                        }
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        if ($('.pb_client_sup').is('select')) {
            __selectclient();
        }
        var __select = function(){
            __executeExternalGet(`8000/docketbook/list/PIS_SUP/${$.cookie("field_office_id")}`).done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.link_docket_num').append("<option selected disabled>Select Docket Number</opion>");
                    result.response.forEach(function(data){
                        $('.link_docket_num').append(
                            "<option value="+data.id+" data-id="+data.id+">"+data.docketNumber+"</option>");
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        var docketSwitch = document.getElementById('docketSwitch');
        let md;
        var docketData = {}; // Store loaded docket data for payload (preserves server-only fields)

        var docket_number = GetURLParameter('docket_number');

        function updateForms(result) {
            docketData = result; // Store for payload (preserves fields not in form)
            // Main section
            $(".docketNum_update").val(result.docketNumber || '');
            if ($('.pb_client_sup').is('select')) {
                $(".pb_client_sup").val(result.clientId || '').trigger("change");
            } else {
                $(".pb_client_sup").val(result.fullName || '').trigger("change");
            }

            // For Probation Supervision Referrals Received (#received)
            $(".alias").val(result.alias || '');
            $(".referral_type").val(result.referralType || '').trigger("change");
            $(".cc_no").val(result.criminalCaseNumber || '');
            $(".court_origin").val(result.courtOfOrigin || '');
            $(".case_classification").val(result.caseClassification || '').trigger("change");
            $(".date_rcv_ppo").val(result.receivedDateByPPO || '');
            $(".supervising_officer").val(result.supervisingOfficer || '');
            $(".prob_start_date").val(result.probationStartDate || '');
            $(".prob_end_date").val(result.probationEndDate || '');

            // For Probation Supervision Cases Acted Upon (#casesActedUpon)
            $("#casesActedUpon .office_findings").val(result.officeFindingsForActedUpon || '').trigger("change");
            $("#casesActedUpon .other_reasons_of_revocation").val(result.specifyOtherReasonsRevocation || '');
            $("#casesActedUpon .court_probationer_transferred").val(result.specifyCourtPpoTransferred || '');
            $("#casesActedUpon .date_submitted_court").val(result.dateOrderReceivedFromTheCourt || result.dateCompletedAndReturned || '');

            // For Carry Over Probation Supervision Cases Pending Disposition (#carryOver)
            $("#carryOver .office_findings").val(result.officeFindingsForPendingDisposition || '').trigger("change");
            $("#carryOver .date_submitted_court").val(result.dateOrderReceivedFromTheCourt || result.dateCompletedAndReturned || '');
            $("#carryOver .supervising_officer_carry_over").val(result.supervisingOfficer || '');
            // Single sentence input
            if ($(".sentence").length) {
                $(".sentence").val(result.sentence || '');
            }
        }
        if (!docket_number) {
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            console.warn('No docket_number in URL - cannot load docket details');
            return;
        }
        __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
            var result = result.response || result;
            if (result.status === "ERROR" || !result) {
                $("#spinner_update").hide();
                $('.card-body').find('input, select, button').prop('disabled', false);
                console.error('Failed to load docket:', result);
                return;
            }
            console.log(result);
            md = result.manualDocket === true;
            if (result.manualDocket === false){
                $('.manualProbStart').hide()
                $('.manualProbYear').hide()
                $('.manualProbMonth').hide()
                $('.manualProbDay').hide()
            }
            setTimeout(function () {
                $("#spinner_update").hide();
                $('.card-body').find('input, select, button').prop('disabled', false);
                $('.btn-confirm').prop('disabled', false);
                $('.docketNum_update').prop('disabled', true);
                updateForms(result);
            }, 3000);
        })
        $(".btn-confirm").unbind("click").on("click", function(){
            if (!docket_number) {
                console.error('No docket number - cannot save');
                return;
            }
            if (Object.keys(docketData).length === 0) {
                console.error('Docket data not loaded - cannot save');
                return;
            }
            var sentenceVal = $(".sentence").length ? $(".sentence").val() : (docketData.sentence || "");

            var payload = {
                "type": "PIS_SUP",
                "docketNumber": $(".docketNum_update").val() || docket_number,
                "docketSeries": docketData.docketSeries || "",
                "caseloadType": docketData.caseloadType || "",
                "fieldOfficeId": $.cookie("field_office_id") || docketData.fieldOfficeId || "",
                "clientType": docketData.clientType || "PROBATIONER",
                "clientId": docketData.clientId || "",
                "firstName": docketData.firstName || "",
                "middleName": docketData.middleName || "",
                "lastName": docketData.lastName || "",
                "suffixName": docketData.suffixName || "",
                "fullName": docketData.fullName || $(".pb_client_sup").val() || "",
                "isLegalAge": docketData.isLegalAge === true,
                "pleaBargain": docketData.pleaBargain === true,
                "caseClassification": $(".case_classification").val() || docketData.caseClassification || "",
                "criminalCaseNumber": $(".cc_no").val() || docketData.criminalCaseNumber || "",
                "offense": docketData.offense || "",
                "courtOfOrigin": $(".court_origin").val() || docketData.courtOfOrigin || "",
                "isMilitaryCourt": docketData.isMilitaryCourt === true,
                "courtOrderDate": docketData.courtOrderDate || "",
                "investigatingOfficer": docketData.investigatingOfficer || "",
                "receivedDateByPPO": $(".date_rcv_ppo").val() || docketData.receivedDateByPPO || "",
                "sentence": sentenceVal || "",
                "manualDocket": md !== undefined ? md : (docketData.manualDocket === true),
                "referral": docketData.referral === true,
                "referralData": docketData.referralData || "",
                "remarks": docketData.remarks || "",
                "probationStartDate": $(".prob_start_date").val() || docketData.probationStartDate || "",
                "probationYear": docketData.probationYear || "",
                "probationMonth": docketData.probationMonth || "",
                "probationDay": docketData.probationDay || "",
                "prisonName": docketData.prisonName || "",
                "investigationReportSubmittedDate": docketData.investigationReportSubmittedDate || "",
                "ppoRecommendation": docketData.ppoRecommendation || "",
                "recommendationState": docketData.recommendationState || "",
                "dateOfTransfer": docketData.dateOfTransfer || "",
                "transferredOfficeId": docketData.transferredOfficeId || "",
                "dateOrderReceivedFromTheBoard": docketData.dateOrderReceivedFromTheBoard || "",
                "boardOrder": docketData.boardOrder || "",
                "boardOrderStatus": docketData.boardOrderStatus || "",
                "referringOfficeId": docketData.referringOfficeId || "",
                "dateCICAR": docketData.dateCICAR || "",
                "supervisingOfficer": $(".supervising_officer").val() || $("#carryOver .supervising_officer_carry_over").val() || docketData.supervisingOfficer || "",
                "supervisionStartDate": docketData.supervisionStartDate || "",
                "supervisionEndDate": docketData.supervisionEndDate || "",
                "probationEndDate": $(".prob_end_date").val() || docketData.probationEndDate || "",
                "reportType": docketData.reportType || "",
                "referralType": $(".referral_type").val() || docketData.referralType || "",
                "dateReportSubmittedToTheBoard": docketData.dateReportSubmittedToTheBoard || "",
                "dateReportSubmittedToRDForTransferToOtherPPO": docketData.dateReportSubmittedToRDForTransferToOtherPPO || "",
                "resolutionType": docketData.resolutionType || "",
                "dateResolutionFromTheBoard": docketData.dateResolutionFromTheBoard || "",
                "dateResolutionFromTheRDForTransfer": docketData.dateResolutionFromTheRDForTransfer || "",
                "createdBy": docketData.createdBy || "",
                "updatedBy": docketData.updatedBy || "",
                "psirDate": docketData.psirDate || "",
                "manifestationDate": docketData.manifestationDate || "",
                "typeOfReferrals": docketData.typeOfReferrals || "",
                "referralsNotActedUponDateOrderReceived": docketData.referralsNotActedUponDateOrderReceived || "",
                "alias": $(".alias").val() || docketData.alias || "",
                "courtDecision": docketData.courtDecision || "",
                "reasonForDenialDismissal": docketData.reasonForDenialDismissal || "",
                "dateOrderReceivedFromTheCourt": docketData.dateOrderReceivedFromTheCourt || "",
                "dateCompletedAndReturned": docketData.dateCompletedAndReturned || "",
                "officeFindingsForActedUpon": $("#casesActedUpon .office_findings").val() || docketData.officeFindingsForActedUpon || "",
                "officeFindingsForPendingDisposition": $("#carryOver .office_findings").val() || docketData.officeFindingsForPendingDisposition || "",
                "specifyCourtPpoTransferred": $("#casesActedUpon .court_probationer_transferred").val() || docketData.specifyCourtPpoTransferred || "",
                "specifyOtherReasonsRevocation": $("#casesActedUpon .other_reasons_of_revocation").val() || docketData.specifyOtherReasonsRevocation || "",
                "periodOfSupervision": docketData.periodOfSupervision || "",
                "specifyOtherSubmittedReports": docketData.specifyOtherSubmittedReports || "",
                "otherResolutionType": docketData.otherResolutionType || "",
                "periodOfCourtesySupervision": docketData.periodOfCourtesySupervision || "",
                "dateReturned": docketData.dateReturned || "",
                "referringOfficeCourtesyInv": docketData.referringOfficeCourtesyInv || "",
                "referringOfficeCourtesyInvId": docketData.referringOfficeCourtesyInvId || "",
                "referringOfficeCourtesySup": docketData.referringOfficeCourtesySup || "",
                "referringOfficeCourtesySupId": docketData.referringOfficeCourtesySupId || "",
                "specifyOtherTypeOfDecision": docketData.specifyOtherTypeOfDecision || "",
                "fromPrisonType": docketData.fromPrisonType || ""
            };

            __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"), JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href = api + '/pis/supervision_docketing';
                    }, 2000);
                } else {
                    console.error('Update failed:', result);
                }
            });
        });
    } )( jQuery );