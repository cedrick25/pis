(function ($) {
    var api = localStorage.getItem("api");
    var contextPath = api;
    var docketNumber = getUrlParameter("docket_number");
    var currentRecord = {};

    var getContext = function () {
        return contextPath;
    };

    var safeValue = function (value) {
        return value === null || value === undefined ? "" : value;
    };

    var normalizeDate = function (value) {
        if (!value) {
            return "";
        }
        return String(value).substring(0, 10);
    };

    var composeNameFromParts = function (record) {
        var firstName = safeValue(record.firstName);
        var middleName = safeValue(record.middleName);
        var lastName = safeValue(record.lastName);
        var suffixName = safeValue(record.suffixName);
        return $.trim((firstName + " " + middleName + " " + lastName + " " + suffixName).replace(/\s+/g, " "));
    };

    var getDisplayFullName = function (record) {
        var responseFullName = safeValue(record.fullName);
        if (responseFullName !== "") {
            return responseFullName;
        }
        return composeNameFromParts(record);
    };

    var setSelectValue = function (selector, value) {
        var normalized = safeValue(value);
        var $select = $(selector);

        if ($select.find('option[value="' + normalized + '"]').length === 0 && normalized !== "") {
            $select.append('<option value="' + normalized + '">' + normalized + "</option>");
        }
        $select.val(normalized).trigger("change");
    };

    var executeExternalGet = function (path, customLoader) {
        path = getContext() + path;
        var d = $.Deferred();
        if (customLoader !== "") {
            $("#" + customLoader).show().removeClass("hide");
        }

        $.ajax({
            method: "GET",
            url: path,
            dataType: "json"
        }).done(function (data) {
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown, request) {
            console.log("---FAILED---");
            console.log(jqXHR, textStatus, errorThrown);
            console.log("---FAILED---");

            d.resolve({
                status: "ERROR",
                message: request
            });

            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
        });

        return d.promise();
    };

    var executeExternalPost = function (path, jsonObj, customLoader) {
        path = getContext() + path;
        var d = $.Deferred();
        if (customLoader !== "") {
            $("#" + customLoader).show().removeClass("hide");
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
            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown, request) {
            console.log("---FAILED---");
            console.log(jqXHR, textStatus, errorThrown);
            console.log("---FAILED---");

            d.resolve({
                status: "ERROR",
                message: request
            });

            if (customLoader !== "") {
                $("#" + customLoader).hide().addClass("hide");
            }
        });

        return d.promise();
    };

    function getUrlParameter(paramName) {
        var pageURL = window.location.search.substring(1);
        var urlVariables = pageURL.split("&");
        for (var i = 0; i < urlVariables.length; i++) {
            var parameterName = urlVariables[i].split("=");
            if (parameterName[0] === paramName) {
                return decodeURIComponent(parameterName[1]);
            }
        }
    }

    var setFormDisabled = function (isDisabled) {
        $(".card-body").find("input, select, button").prop("disabled", isDisabled);
        $(".btn-confirm_update").prop("disabled", isDisabled);
        $(".docket_num_update").prop("disabled", true);
    };

    var populateFields = function (record) {
        currentRecord = record || {};

        $(".docket_num_update").val(safeValue(currentRecord.docketNumber));
        $(".client_update").val(getDisplayFullName(currentRecord));
        $(".cc_no_update").val(safeValue(currentRecord.criminalCaseNumber));
        $(".name_prison").val(safeValue(currentRecord.prisonName));
        setSelectValue(".board_order_update", currentRecord.fromPrisonType);
        $(".offense").val(safeValue(currentRecord.offense));
        $(".date_received_by_ppo").val(normalizeDate(currentRecord.receivedDateByPPO));
        $(".inv_officer").val(safeValue(currentRecord.investigatingOfficer));
        $(".date_peci_update").val(normalizeDate(currentRecord.investigationReportSubmittedDate));
        setSelectValue(".ppo_recommendation", currentRecord.ppoRecommendation);
        $(".transfered_date").val(normalizeDate(currentRecord.dateOfTransfer));
        $(".transfer_to").val(safeValue(currentRecord.specifyCourtPpoTransferred || currentRecord.transferredOfficeId));
        setSelectValue(".court_decision", currentRecord.courtDecision);
        $(".date_order_rcv_court").val(normalizeDate(currentRecord.dateOrderReceivedFromTheCourt));
    };

    var buildPayload = function () {
        var fallbackFullName = composeNameFromParts(currentRecord);
        return $.extend({}, currentRecord, {
            type: safeValue(currentRecord.type) || "SC_PPI_INV",
            docketNumber: $(".docket_num_update").val(),
            clientType: safeValue(currentRecord.clientType) || "PAROLEE",
            fieldOfficeId: safeValue(currentRecord.fieldOfficeId) || $.cookie("field_office_id"),
            clientId: safeValue(currentRecord.clientId),
            firstName: safeValue(currentRecord.firstName),
            middleName: safeValue(currentRecord.middleName),
            lastName: safeValue(currentRecord.lastName),
            suffixName: safeValue(currentRecord.suffixName),
            fullName: safeValue(currentRecord.fullName) || fallbackFullName,
            criminalCaseNumber: $(".cc_no_update").val(),
            prisonName: $(".name_prison").val(),
            fromPrisonType: $(".board_order_update").val(),
            offense: $(".offense").val(),
            receivedDateByPPO: $(".date_received_by_ppo").val(),
            investigatingOfficer: $(".inv_officer").val(),
            investigationReportSubmittedDate: $(".date_peci_update").val(),
            ppoRecommendation: $(".ppo_recommendation").val(),
            dateOfTransfer: $(".transfered_date").val(),
            specifyCourtPpoTransferred: $(".transfer_to").val(),
            courtDecision: $(".court_decision").val(),
            dateOrderReceivedFromTheCourt: $(".date_order_rcv_court").val(),
            updatedBy: $.cookie("employee_id") || safeValue(currentRecord.updatedBy)
        });
    };

    var loadDocketDetails = function () {
        return executeExternalGet("8000/docketbook/" + docketNumber + "/" + $.cookie("field_office_id"), "spinner_update");
    };

    $(".btn-confirm_update").off("click").on("click", function () {
        var payload = buildPayload();
        var officeId = safeValue(currentRecord.fieldOfficeId) || $.cookie("field_office_id");
        var $button = $(this);

        $button.prop("disabled", true);
        executeExternalPost("8000/docketbook/update/" + docketNumber + "/" + officeId, JSON.stringify(payload), "spinner_update").done(function (result) {
            $button.prop("disabled", false);
            if (result.status !== "ERROR") {
                $("#success").html('<i class="fa fa-check"></i> Successfully Updated').show();

                setTimeout(function () {
                    $("#success").hide();
                    window.location.href = api + "/pis/parolee_investigation_docketing";
                }, 1500);
            } else {
                alert("Update failed.");
            }
        });
    });

    setFormDisabled(true);
    loadDocketDetails().done(function (result) {
        if (result.status === "ERROR" || !result.response) {
            alert("Failed to load docket details.");
            $("#spinner_update").hide().addClass("hide");
            return;
        }

        populateFields(result.response);
        setFormDisabled(false);
        $("#spinner_update").hide().addClass("hide");
    });
})(jQuery);