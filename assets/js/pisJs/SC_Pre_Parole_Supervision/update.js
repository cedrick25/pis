 (function ($) {
    var api = localStorage.getItem("api");
    var ___ctx = api;
    var currentRecord = null;

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
            dataType: "json"
        }).done(function (data) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown, request) {
            console.log("---FAILED---");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log("---FAILED---");

            d.resolve({
                status: "ERROR",
                message: request
            });

            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
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
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonObj
        }).done(function (data) {
            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown, request) {
            console.log("---FAILED---");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log("---FAILED---");

            d.resolve({
                status: "ERROR",
                message: request
            });

            if (customLoader != "") {
                $("#" + customLoader).hide();
                $("#" + customLoader).addClass("hide");
            }
        });

        return d.promise();
    };

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
        return null;
    }

    function toSafeString(value) {
        return value == null ? "" : String(value).trim();
    }

    function buildNameFromParts(record) {
        return [
            toSafeString(record.firstName),
            toSafeString(record.middleName),
            toSafeString(record.lastName),
            toSafeString(record.suffixName)
        ].filter(function (part) {
            return part !== "";
        }).join(" ");
    }

    function resolveClientDisplayName(record) {
        var fullName = toSafeString(record.fullName);
        if (fullName !== "") {
            return fullName;
        }
        return buildNameFromParts(record);
    }

    function fillForm(record) {
        $(".docket_num_update").val(record.docketNumber || "");
        $(".client_type_update").val(record.clientType || "").trigger("change");
        $(".client_update").val(resolveClientDisplayName(record));
        $(".case_classification").val(record.caseClassification || "").trigger("change");
        $(".date_received_by_ppo").val(record.receivedDateByPPO || "");
        $(".sup_officer").val(record.supervisingOfficer || "");
        $(".sup_start_date").val(record.supervisionStartDate || "");
        $(".sup_end_date").val(record.supervisionEndDate || "");
        $(".office_findings").val(record.officeFindingsForActedUpon || "").trigger("change");
        $(".specify_report").val(record.specifyOtherSubmittedReports || "");
        $(".date_submitted_board").val(record.dateReportSubmittedToTheBoard || "");
        $(".date_submitted_regional_dir").val(record.dateReportSubmittedToRDForTransferToOtherPPO || "");
        $(".board_resolution").val(record.resolutionType || "").trigger("change");
        $(".specify_resolution").val(record.otherResolutionType || "");
        $(".date_resolution").val(record.dateResolutionFromTheBoard || "");
        $(".date_resolution_rd").val(record.dateResolutionFromTheRDForTransfer || "");
    }

    function buildPayload() {
        var fallbackFullName = buildNameFromParts(currentRecord || {});
        var resolvedFullName = toSafeString(currentRecord.fullName) || fallbackFullName;

        return $.extend({}, currentRecord, {
            type: "SC_PPI_SUP",
            docketNumber: $(".docket_num_update").val() || toSafeString(currentRecord.docketNumber),
            fieldOfficeId: $.cookie("field_office_id"),
            clientType: toSafeString(currentRecord.clientType) || $(".client_type_update").val(),
            clientId: toSafeString(currentRecord.clientId),
            firstName: toSafeString(currentRecord.firstName),
            middleName: toSafeString(currentRecord.middleName),
            lastName: toSafeString(currentRecord.lastName),
            suffixName: toSafeString(currentRecord.suffixName),
            fullName: resolvedFullName,
            caseClassification: $(".case_classification").val() || "",
            receivedDateByPPO: $(".date_received_by_ppo").val() || "",
            supervisingOfficer: $(".sup_officer").val() || "",
            supervisionStartDate: $(".sup_start_date").val() || "",
            supervisionEndDate: $(".sup_end_date").val() || "",
            officeFindingsForActedUpon: $(".office_findings").val() || "",
            specifyOtherSubmittedReports: $(".specify_report").val() || "",
            dateReportSubmittedToTheBoard: $(".date_submitted_board").val() || "",
            dateReportSubmittedToRDForTransferToOtherPPO: $(".date_submitted_regional_dir").val() || "",
            resolutionType: $(".board_resolution").val() || "",
            otherResolutionType: $(".specify_resolution").val() || "",
            dateResolutionFromTheBoard: $(".date_resolution").val() || "",
            dateResolutionFromTheRDForTransfer: $(".date_resolution_rd").val() || ""
        });
    }

    function bindUpdate(docketNumber) {
        $(".btn-confirm_update").off("click").on("click", function () {
            var payload = buildPayload();
            __executeExternalPost(
                "8000/docketbook/update/" + docketNumber + "/" + $.cookie("field_office_id"),
                JSON.stringify(payload),
                "spinner_update"
            ).done(function (result) {
                if (result.status != "ERROR") {
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                        window.location.href = api + "/pis/pre-parole-supervision-list";
                    }, 2000);
                } else {
                    alert("failed");
                }
            });
        });
    }

    function loadRecord(docketNumber) {
        __executeExternalGet("8000/docketbook/" + docketNumber + "/" + $.cookie("field_office_id"), "spinner_update").done(function (result) {
            if (!result || result.status == "ERROR" || !result.response) {
                $("#spinner_update").hide();
                alert("failed");
                return;
            }

            currentRecord = result.response;
            fillForm(currentRecord);
            bindUpdate(docketNumber);

            $("#spinner_update").hide();
            $(".card-body").find("input, select, button").prop("disabled", false);
            $(".btn-confirm_update").prop("disabled", false);
            $(".docket_num_update").prop("disabled", true);
            $(".client_update").prop("disabled", true);
        });
    }

    var docketNumber = GetURLParameter("docket_number");
    $(".card-body").find("input, select, button").prop("disabled", true);
    $(".btn-confirm_update").prop("disabled", true);
    loadRecord(docketNumber);
})(jQuery);