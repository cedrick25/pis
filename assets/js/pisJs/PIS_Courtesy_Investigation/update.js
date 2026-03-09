(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;

    var __getContext = function () {
        return ___ctx;
    };

    var __executeExternalGet = function (path, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        if (customLoader != "") {
            $("#" + customLoader).show();
            $("#" + customLoader).removeClass("hide");
        }
        $.ajax({
            method: "GET",
            url: path,
            dataType: "json",
        }).done(function (data) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve({ status: 'ERROR', message: errorThrown });
        });
        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        if (customLoader != "") {
            $("#" + customLoader).show();
            $("#" + customLoader).removeClass("hide");
        }
        $.ajax({
            method: "POST",
            url: path,
            dataType: "json",
            headers: { 'Content-Type': 'application/json' },
            data: jsonObj
        }).done(function (data) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve({ status: 'ERROR', message: errorThrown });
        });
        return d.promise();
    };

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    var __selectFieldOffice = function () {
        __executeExternalGet('8088/department/list').done(function (result) {
            if (result.status != "ERROR") {
                result.forEach(function (data) {
                    $('.ref_office').append("<option value=" + data.id + ">" + data.name + "</option>");
                });
            }
        });
    };
    __selectFieldOffice();

    // var __selectclient = function () {
    //     $('.client').empty();
    //     __executeExternalGet('8000/petitioner/list?type=PROBATIONER&officeId=' + $.cookie("field_office_id")).done(function (result) {
    //         if (result.status != "ERROR") {
    //             $('.client').append("<option selected disabled>Select Client</option>");
    //             result.forEach(function (data) {
    //                 var name = (data.firstName === null && data.middleName === null && data.lastName === null && data.suffixName === null)
    //                     ? data.fullName
    //                     : [data.firstName, data.middleName, data.lastName, data.suffixName].filter(Boolean).join(' ');
    //                 $('.client').append(
    //                     '<option value="' + data.id + '" data-fname="' + (data.firstName || '') + '" data-mname="' + (data.middleName || '') + '" data-lname="' + (data.lastName || '') + '" data-sname="' + (data.suffixName || '') + '" data-fullname="' + (data.fullName || '') + '">' + name + '</option>'
    //                 );
    //             });
    //         }
    //     });
    // };
    // __selectclient();

    var docket_number = GetURLParameter('docket_number');
    var officeId = $.cookie("field_office_id");

    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm').prop('disabled', true);

    var loadCourtesyInvestigation = function () {
        __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId).done(function (apiResult) {
            var result = apiResult.response;
            if (apiResult.status !== "ERROR" && result) {
                $(".docket_number").val(result.docketNumber || '');
                let name = "";
                if (!result.fullName) {
                    name = `${result.firstName} ${result.middleName} ${result.lastName} ${result.suffixName}`
                } else {
                    name = result.fullName
                }
                $(".client").val(name)

                // setTimeout(function () {
                //     var clientId = GetURLParameter('petitionerId') || result.clientId;
                //     if (clientId) $(".client").val(clientId).trigger("change");
                // }, 500);

                setTimeout(function () {
                    var refOfficeId = result.referringOfficeCourtesyInvId || result.referringOfficeId;
                    var refOfficeName = result.referringOfficeCourtesyInv || result.referringOfficeId;
                    if (refOfficeId && $(".ref_office option[value='" + refOfficeId + "']").length) {
                        $(".ref_office").val(refOfficeId).trigger("change");
                    } else if (refOfficeName) {
                        var $opt = $(".ref_office option").filter(function () {
                            return $(this).text().trim() === refOfficeName;
                        });
                        if ($opt.length) $opt.prop('selected', true).trigger("change");
                    }
                }, 600);

                $(".date_rcv_from_ppo").val(result.receivedDateByPPO || '');
                $(".inv_officer").val(result.investigatingOfficer || '');
                $(".reasons").val(result.remarks || '');
                $(".date_completed_and_returned").val(result.dateCICAR || result.dateCompletedAndReturned || '');

                $(".btn-confirm").on("click", function () {
                    var $client = $('.client option:selected');
                    var payload = {
                        type: "PIS_CSINV",
                        docketNumber: $(".docket_number").val() || "",
                        docketSeries: "",
                        caseloadType: "",
                        fieldOfficeId: officeId || "",
                        clientType: "PROBATIONER",
                        clientId: result.clientId,
                        firstName: result.firstName || "",
                        middleName: result.middleName || "",
                        lastName: result.lastName || "",
                        suffixName: result.suffixName || "",
                        fullName: result.fullName || "",
                        isLegalAge: false,
                        pleaBargain: false,
                        caseClassification: "",
                        criminalCaseNumber: "",
                        offense: "",
                        courtOfOrigin: "",
                        isMilitaryCourt: false,
                        courtOrderDate: "",
                        investigatingOfficer: $(".inv_officer").val() || "",
                        receivedDateByPPO: $(".date_rcv_from_ppo").val() || "",
                        sentence: "",
                        manualDocket: true,
                        referral: false,
                        referralData: "",
                        remarks: $(".reasons").val() || "",
                        probationStartDate: "",
                        probationYear: "",
                        probationMonth: "",
                        probationDay: "",
                        prisonName: "",
                        investigationReportSubmittedDate: "",
                        ppoRecommendation: "",
                        recommendationState: "",
                        dateOfTransfer: "",
                        transferredOfficeId: "",
                        dateOrderReceivedFromTheBoard: "",
                        boardOrder: "",
                        boardOrderStatus: "",
                        referringOfficeId: $(".ref_office").val() || "",
                        dateCICAR: $(".date_completed_and_returned").val() || "",
                        supervisingOfficer: "",
                        supervisionStartDate: "",
                        supervisionEndDate: "",
                        probationEndDate: "",
                        reportType: "",
                        referralType: "",
                        dateReportSubmittedToTheBoard: "",
                        dateReportSubmittedToRDForTransferToOtherPPO: "",
                        resolutionType: "",
                        dateResolutionFromTheBoard: "",
                        dateResolutionFromTheRDForTransfer: "",
                        createdBy: "",
                        updatedBy: "",
                        psirDate: "",
                        manifestationDate: "",
                        typeOfReferrals: "",
                        referralsNotActedUponDateOrderReceived: "",
                        alias: "",
                        courtDecision: "",
                        reasonForDenialDismissal: "",
                        dateOrderReceivedFromTheCourt: "",
                        dateCompletedAndReturned: $(".date_completed_and_returned").val() || "",
                        officeFindingsForActedUpon: "",
                        officeFindingsForPendingDisposition: "",
                        specifyCourtPpoTransferred: "",
                        specifyOtherReasonsRevocation: "",
                        periodOfSupervision: "",
                        specifyOtherSubmittedReports: "",
                        otherResolutionType: "",
                        periodOfCourtesySupervision: "",
                        dateReturned: "",
                        referringOfficeCourtesyInv: $(".ref_office option:selected").text() || "",
                        referringOfficeCourtesyInvId: $(".ref_office").val() || "",
                        referringOfficeCourtesySup: "",
                        referringOfficeCourtesySupId: "",
                        specifyOtherTypeOfDecision: "",
                        fromPrisonType: ""
                    };

                    __executeExternalPost('8000/docketbook/update/' + docket_number + '/' + officeId, JSON.stringify(payload)).done(function (postResult) {
                        if (postResult.status !== "ERROR") {
                            $('#success').show();
                            setTimeout(function () {
                                $('#success').hide();
                                window.location.href = api + "/pis/probation-courtesy-investigation-list";
                            }, 2000);
                        } else {
                            alert("Update failed");
                        }
                    });
                });
            } else {
                alert("Failed to load data");
            }
        });
    };


    setTimeout(function () {
        if ($("#spinner_update").length) $("#spinner_update").hide();
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm').prop('disabled', false);
        $('.docket_number').prop('disabled', true);
        $('.client').prop('disabled', true);
        loadCourtesyInvestigation();
    }, 3000);

})(jQuery);
