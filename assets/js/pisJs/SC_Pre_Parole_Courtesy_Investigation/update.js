(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;

    var __getContext = function () {
        return ___ctx;
    };

    var __buildUrl = function (path) {
        if (/^https?:\/\//i.test(path)) return path;
        return __getContext() + path;
    };

    var __executeExternalGet = function (path, customLoader) {
        var d = $.Deferred();
        if (customLoader !== "") {
            $("#" + customLoader).show().removeClass("hide");
        }
        $.ajax({
            method: "GET",
            url: __buildUrl(path),
            dataType: "json"
        }).done(function (data) {
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve({
                status: "ERROR",
                message: errorThrown || textStatus || jqXHR
            });
        });
        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        var d = $.Deferred();
        if (customLoader !== "") {
            $("#" + customLoader).show().removeClass("hide");
        }
        $.ajax({
            method: "POST",
            url: __buildUrl(path),
            dataType: "json",
            headers: { "Content-Type": "application/json" },
            data: jsonObj
        }).done(function (data) {
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve({
                status: "ERROR",
                message: errorThrown || textStatus || jqXHR
            });
        });
        return d.promise();
    };

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    function buildFullName(firstName, middleName, lastName, suffixName) {
        return [firstName, middleName, lastName, suffixName].filter(function (v) {
            return !!v;
        }).join(" ").trim();
    }

    var docket_number = GetURLParameter("docket_number");
    var officeId = $.cookie("field_office_id");
    var currentRecord = null;

    $(".card-body").find("input, select, button").prop("disabled", true);
    $(".btn-confirm_update").prop("disabled", true);

    var __selectFieldOffice = function () {
        $(".ref_office").empty().append("<option selected disabled>Select Field Office</option>");
        return __executeExternalGet("8088/department/list").done(function (result) {
            if (result.status !== "ERROR" && Array.isArray(result)) {
                result.forEach(function (data) {
                    $(".ref_office").append("<option value=\"" + data.id + "\">" + data.name + "</option>");
                });
            }
        });
    };

    var __fields = function () {
        __executeExternalGet("8000/docketbook/" + docket_number + "/" + officeId).done(function (apiResult) {
            if (apiResult.status === "ERROR" || !apiResult.response) {
                alert("failed");
                return;
            }

            var result = apiResult.response;
            currentRecord = result;

            var responseFullName = result.fullName || buildFullName(result.firstName, result.middleName, result.lastName, result.suffixName);

            $(".docket_num_update").val(result.docketNumber || "");
            $(".client_update").val(responseFullName || "");
            $(".date_received_by_ppo").val(result.receivedDateByPPO || "");
            $(".inv_officer").val(result.investigatingOfficer || "");
            $(".reasons").val(result.remarks || result.referralData || "");
            $(".date_completed_and_returned").val(result.dateCICAR || result.dateCompletedAndReturned || "");

            setTimeout(function () {
                var refOfficeId = result.referringOfficeCourtesyInvId || result.referringOfficeId;
                var refOfficeName = result.referringOfficeCourtesyInv || result.referringOfficeId || "";

                if (refOfficeId && $(".ref_office option[value='" + refOfficeId + "']").length) {
                    $(".ref_office").val(refOfficeId).trigger("change");
                } else if (refOfficeName) {
                    var $opt = $(".ref_office option").filter(function () {
                        return $(this).text().trim() === refOfficeName;
                    });
                    if ($opt.length) {
                        $opt.prop("selected", true).trigger("change");
                    } else {
                        $(".ref_office").append("<option value=\"" + refOfficeName + "\" selected>" + refOfficeName + "</option>").trigger("change");
                    }
                }
            }, 400);
        });
    };

    $(".btn-confirm_update").off("click").on("click", function () {
        if (!currentRecord) {
            alert("failed");
            return;
        }

        var firstName = currentRecord.firstName || "";
        var middleName = currentRecord.middleName || "";
        var lastName = currentRecord.lastName || "";
        var suffixName = currentRecord.suffixName || "";
        var fullName = currentRecord.fullName || buildFullName(firstName, middleName, lastName, suffixName);

        var referringOfficeSelectedText = $(".ref_office option:selected").text() || currentRecord.referringOfficeCourtesyInv || currentRecord.referringOfficeId || "";
        var referringOfficeSelectedValue = $(".ref_office").val() || currentRecord.referringOfficeCourtesyInvId || currentRecord.referringOfficeId || "";

        var payload = {
            type: currentRecord.type || "SC_PPI_CSINV",
            docketNumber: $(".docket_num_update").val() || currentRecord.docketNumber || "",
            docketSeries: currentRecord.docketSeries || "",
            caseloadType: currentRecord.caseloadType || "",
            fieldOfficeId: officeId || currentRecord.fieldOfficeId || "",
            clientType: currentRecord.clientType,
            clientId: currentRecord.clientId,
            firstName: currentRecord.firstName,
            middleName: currentRecord.middleName,
            lastName: currentRecord.lastName,
            suffixName: currentRecord.suffixName,
            fullName: currentRecord.fullName,
            isLegalAge: !!currentRecord.isLegalAge,
            pleaBargain: !!currentRecord.pleaBargain,
            caseClassification: currentRecord.caseClassification || "",
            criminalCaseNumber: currentRecord.criminalCaseNumber || "",
            offense: currentRecord.offense || "",
            courtOfOrigin: currentRecord.courtOfOrigin || "",
            isMilitaryCourt: !!currentRecord.isMilitaryCourt,
            courtOrderDate: currentRecord.courtOrderDate || "",
            investigatingOfficer: $(".inv_officer").val() || "",
            receivedDateByPPO: $(".date_received_by_ppo").val() || "",
            sentence: currentRecord.sentence || "",
            manualDocket: typeof currentRecord.manualDocket === "boolean" ? currentRecord.manualDocket : false,
            referral: typeof currentRecord.referral === "boolean" ? currentRecord.referral : false,
            referralData: currentRecord.referralData || "",
            remarks: $(".reasons").val() || "",
            probationStartDate: currentRecord.probationStartDate || "",
            probationYear: currentRecord.probationYear || "",
            probationMonth: currentRecord.probationMonth || "",
            probationDay: currentRecord.probationDay || "",
            prisonName: currentRecord.prisonName || "",
            investigationReportSubmittedDate: currentRecord.investigationReportSubmittedDate || "",
            ppoRecommendation: currentRecord.ppoRecommendation || "",
            recommendationState: currentRecord.recommendationState || "",
            dateOfTransfer: currentRecord.dateOfTransfer || "",
            transferredOfficeId: currentRecord.transferredOfficeId || "",
            dateOrderReceivedFromTheBoard: currentRecord.dateOrderReceivedFromTheBoard || "",
            boardOrder: currentRecord.boardOrder || "",
            boardOrderStatus: currentRecord.boardOrderStatus || "",
            referringOfficeId: referringOfficeSelectedValue,
            dateCICAR: $(".date_completed_and_returned").val() || "",
            supervisingOfficer: currentRecord.supervisingOfficer || "",
            supervisionStartDate: currentRecord.supervisionStartDate || "",
            supervisionEndDate: currentRecord.supervisionEndDate || "",
            probationEndDate: currentRecord.probationEndDate || "",
            reportType: currentRecord.reportType || "",
            referralType: currentRecord.referralType || "",
            dateReportSubmittedToTheBoard: currentRecord.dateReportSubmittedToTheBoard || "",
            dateReportSubmittedToRDForTransferToOtherPPO: currentRecord.dateReportSubmittedToRDForTransferToOtherPPO || "",
            resolutionType: currentRecord.resolutionType || "",
            dateResolutionFromTheBoard: currentRecord.dateResolutionFromTheBoard || "",
            dateResolutionFromTheRDForTransfer: currentRecord.dateResolutionFromTheRDForTransfer || "",
            createdBy: currentRecord.createdBy || "",
            updatedBy: currentRecord.updatedBy || "",
            psirDate: currentRecord.psirDate || "",
            manifestationDate: currentRecord.manifestationDate || "",
            typeOfReferrals: currentRecord.typeOfReferrals || "",
            referralsNotActedUponDateOrderReceived: currentRecord.referralsNotActedUponDateOrderReceived || "",
            alias: currentRecord.alias || "",
            courtDecision: currentRecord.courtDecision || "",
            reasonForDenialDismissal: currentRecord.reasonForDenialDismissal || "",
            dateOrderReceivedFromTheCourt: currentRecord.dateOrderReceivedFromTheCourt || "",
            dateCompletedAndReturned: $(".date_completed_and_returned").val() || "",
            officeFindingsForActedUpon: currentRecord.officeFindingsForActedUpon || "",
            officeFindingsForPendingDisposition: currentRecord.officeFindingsForPendingDisposition || "",
            specifyCourtPpoTransferred: currentRecord.specifyCourtPpoTransferred || "",
            specifyOtherReasonsRevocation: currentRecord.specifyOtherReasonsRevocation || "",
            periodOfSupervision: currentRecord.periodOfSupervision || "",
            specifyOtherSubmittedReports: currentRecord.specifyOtherSubmittedReports || "",
            otherResolutionType: currentRecord.otherResolutionType || "",
            periodOfCourtesySupervision: currentRecord.periodOfCourtesySupervision || "",
            dateReturned: currentRecord.dateReturned || "",
            referringOfficeCourtesyInv: referringOfficeSelectedText,
            referringOfficeCourtesyInvId: referringOfficeSelectedValue,
            referringOfficeCourtesySup: currentRecord.referringOfficeCourtesySup || "",
            referringOfficeCourtesySupId: currentRecord.referringOfficeCourtesySupId || "",
            specifyOtherTypeOfDecision: currentRecord.specifyOtherTypeOfDecision || "",
            fromPrisonType: currentRecord.fromPrisonType || ""
        };

        __executeExternalPost("8000/docketbook/update/" + docket_number + "/" + officeId, JSON.stringify(payload)).done(function (result) {
            if (result.status !== "ERROR") {
                $("#success").show();
                setTimeout(function () {
                    $("#success").hide();
                    window.location.href = api + "/pis/parole-pardon-courtesy-investigation-list";
                }, 2000);
            } else {
                alert("failed");
            }
        });
    });

    __selectFieldOffice();
    setTimeout(function () {
        __fields();
        $("#spinner_update").hide();
        $(".card-body").find("input, select, button").prop("disabled", false);
        $(".btn-confirm_update").prop("disabled", false);
        $(".docket_num_update").prop("disabled", true);
        $(".client_update").prop("disabled", true);
    }, 1000);
})(jQuery);