(function ($) {
    var api = localStorage.getItem("api");
    var ___ctx = api;
    var currentRecord = null;

    var __getContext = function () {
        return ___ctx;
    };

    var __buildUrl = function (path) {
        if (/^https?:\/\//i.test(path)) {
            return path;
        }
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
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] === sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
        return null;
    }

    function toSafeString(value) {
        if (value == null) {
            return "";
        }
        var normalized = String(value).trim();
        if (normalized.toLowerCase() === "null" || normalized.toLowerCase() === "undefined") {
            return "";
        }
        return normalized;
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

    function hasNameParts(record) {
        return (
            toSafeString(record.firstName) !== "" ||
            toSafeString(record.middleName) !== "" ||
            toSafeString(record.lastName) !== "" ||
            toSafeString(record.suffixName) !== ""
        );
    }

    function resolveClientDisplayName(record) {
        var fullName = toSafeString(record.fullName);
        var partsName = buildNameFromParts(record);
        var withParts = hasNameParts(record);

        if (fullName === "") {
            return partsName;
        }

        if (!withParts) {
            return fullName;
        }

        return fullName;
    }

    function populateFieldOfficeOptions(list) {
        var $offices = $(".ref_office");
        $offices.each(function () {
            $(this).empty().append("<option selected disabled>Select Field Office</option>");
            list.forEach(function (data) {
                $(this).append("<option value=\"" + data.id + "\">" + data.name + "</option>");
            }, this);
        });
    }

    function setOfficeSelection($element, officeId, officeName) {
        var idValue = toSafeString(officeId);
        var textValue = toSafeString(officeName);

        if (idValue !== "" && $element.find("option[value='" + idValue + "']").length) {
            $element.val(idValue).trigger("change");
            return;
        }

        if (textValue !== "") {
            var $existing = $element.find("option").filter(function () {
                return $(this).text().trim() === textValue;
            });

            if ($existing.length) {
                $existing.prop("selected", true);
                $element.trigger("change");
            } else {
                $element.append("<option value=\"" + textValue + "\" selected>" + textValue + "</option>").trigger("change");
            }
        }
    }

    function fillForm(record) {
        $(".board_order_update").val(record.clientType || "").trigger("change");
        $(".docket_num_update").val(record.docketNumber || "");
        $(".date_received_from_ppo").val(record.receivedDateByPPO || "");
        $(".sup_officer").val(record.supervisingOfficer || "");
        $(".period_cs_sup").val(record.periodOfCourtesySupervision || "");
        $(".case_classification").val(record.caseClassification || "").trigger("change");
        $(".date_returned").val(record.dateReturned || "");
        $(".client_update").val(resolveClientDisplayName(record))

        var $officeFields = $(".ref_office");
        if ($officeFields.length > 0) {
            setOfficeSelection(
                $officeFields.eq(0),
                record.referringOfficeCourtesySupId || record.referringOfficeId,
                record.referringOfficeCourtesySup || record.referringOfficeId
            );
        }
        if ($officeFields.length > 1) {
            setOfficeSelection(
                $officeFields.eq(1),
                record.referringOfficeId || record.referringOfficeCourtesySupId,
                record.referringOfficeId || record.referringOfficeCourtesySup
            );
        }
    }

    function getSelectedOffice($element, fallbackValue, fallbackLabel) {
        var selectedValue = toSafeString($element.val());
        var selectedLabel = toSafeString($element.find("option:selected").text());

        if (selectedValue === "" || selectedValue.toLowerCase() === "select") {
            selectedValue = toSafeString(fallbackValue);
        }
        if (selectedLabel === "" || selectedLabel.toLowerCase() === "select field office") {
            selectedLabel = toSafeString(fallbackLabel);
        }

        return {
            value: selectedValue,
            label: selectedLabel
        };
    }

    function buildPayload() {
        var $officeFields = $(".ref_office");
        var receivedOffice = getSelectedOffice(
            $officeFields.eq(0),
            currentRecord.referringOfficeCourtesySupId || currentRecord.referringOfficeId,
            currentRecord.referringOfficeCourtesySup || currentRecord.referringOfficeId
        );
        var terminatedOffice = getSelectedOffice(
            $officeFields.eq(1),
            currentRecord.referringOfficeId || currentRecord.referringOfficeCourtesySupId,
            currentRecord.referringOfficeId || currentRecord.referringOfficeCourtesySup
        );

        var fallbackFullName = buildNameFromParts(currentRecord || {});
        var resolvedFullName = toSafeString(currentRecord.fullName) || fallbackFullName;

        return $.extend({}, currentRecord, {
            type: currentRecord.type || "SC_PPI_CSUP",
            docketNumber: $(".docket_num_update").val() || toSafeString(currentRecord.docketNumber),
            fieldOfficeId: $.cookie("field_office_id") || toSafeString(currentRecord.fieldOfficeId),
            clientType: $(".client_type_update").val() || toSafeString(currentRecord.clientType),
            clientId: toSafeString(currentRecord.clientId),
            firstName: toSafeString(currentRecord.firstName),
            middleName: toSafeString(currentRecord.middleName),
            lastName: toSafeString(currentRecord.lastName),
            suffixName: toSafeString(currentRecord.suffixName),
            fullName: resolvedFullName,
            caseClassification: $(".case_classification").val() || "",
            receivedDateByPPO: $(".date_received_from_ppo").val() || "",
            supervisingOfficer: $(".sup_officer").val() || "",
            periodOfCourtesySupervision: $(".period_cs_sup").val() || "",
            dateReturned: $(".date_returned").val() || "",
            referringOfficeCourtesySup: receivedOffice.label || "",
            referringOfficeCourtesySupId: receivedOffice.value || "",
            referringOfficeId: terminatedOffice.value || receivedOffice.value || ""
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
                if (result.status !== "ERROR") {
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                        window.location.href = api + "/pis/parole-pardon-courtesy-supervision-list";
                    }, 2000);
                } else {
                    alert("failed");
                }
            });
        });
    }

    function loadFieldOfficesAndRecord(docketNumber) {
        __executeExternalGet("8088/department/list").done(function (offices) {
            if (offices.status !== "ERROR" && Array.isArray(offices)) {
                populateFieldOfficeOptions(offices);
            }

            __executeExternalGet("8000/docketbook/" + docketNumber + "/" + $.cookie("field_office_id"), "spinner_update").done(function (result) {
                if (!result || result.status === "ERROR" || !result.response) {
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
        });
    }

    var docketNumber = GetURLParameter("docket_number");
    $(".card-body").find("input, select, button").prop("disabled", true);
    $(".btn-confirm_update").prop("disabled", true);
    loadFieldOfficesAndRecord(docketNumber);
})(jQuery);