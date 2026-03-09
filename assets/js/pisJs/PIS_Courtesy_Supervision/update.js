(function ($) {
    var api = localStorage.getItem('api');

    var get = function (path) {
        return $.ajax({
            method: "GET",
            url: api + path,
            dataType: "json"
        }).then(function (data) { return data; }, function () {
            return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
        });
    };

    var post = function (path, payload) {
        return $.ajax({
            method: "POST",
            url: api + path,
            dataType: "json",
            headers: { 'Content-Type': 'application/json' },
            data: payload
        }).then(function (data) { return data; }, function () {
            return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
        });
    };

    function getUrlParam(name) {
        var params = {};
        window.location.search.substring(1).split('&').forEach(function (p) {
            var kv = p.split('=');
            if (kv[0]) params[kv[0]] = decodeURIComponent(kv[1] || '');
        });
        return params[name];
    }

    var docket_number = getUrlParam('docket_number');
    var petitionerId = getUrlParam('petitionerId');
    var officeId = getUrlParam('officeId') || $.cookie("field_office_id");

    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm').prop('disabled', true);

    // Load referring office dropdown
    get('8088/department/list').done(function (result) {
        var list = Array.isArray(result) ? result : (result.content || result.data || []);
        if (result && result.status != "ERROR" && list.length) {
            $('.ref_office').append("<option value=''>Select Referring Office</option>");
            list.forEach(function (d) {
                $('.ref_office').append("<option value='" + d.id + "'>" + d.name + "</option>");
            });
        }
    });

    // Load client dropdown
    // get('8000/petitioner/list?type=PROBATIONER&officeId=' + $.cookie("field_office_id")).done(function (result) {
    //     var list = Array.isArray(result) ? result : (result.content || result.data || []);
    //     if (result && result.status != "ERROR" && list.length) {
    //         $('.client').empty().append("<option value=''>Select Client</option>");
    //         list.forEach(function (d) {
    //             var name = (d.firstName && d.lastName)
    //                 ? ((d.firstName || '') + " " + (d.middleName || '') + " " + (d.lastName || '') + " " + (d.suffixName || '')).trim()
    //                 : (d.fullName || '');
    //             $('.client').append('<option value="' + d.id + '" data-fname="' + (d.firstName || '') + '" data-mname="' + (d.middleName || '') + '" data-lname="' + (d.lastName || '') + '" data-sname="' + (d.suffixName || '') + '" data-fullname="' + (d.fullName || name) + '">' + name + '</option>');
    //         });
    //     }
    // });

    function populateForm(data) {
        if (!data) return;
        $(".docket_number").val(data.docketNumber || '');
        $(".cc_num").val(data.criminalCaseNumber || '');
        $(".court_origin").val(data.courtOfOrigin || '');
        $(".date_rcv_from_ppo").val(data.receivedDateByPPO || '');
        $(".sup_officer").val(data.supervisingOfficer || '');
        $(".period_supervision").val(data.periodOfSupervision || data.periodOfCourtesySupervision || '');
        $(".case_classification").val(data.caseClassification || '');
        $(".date_completed_and_returned").val(data.dateCICAR || data.dateReturned || data.dateCompletedAndReturned || '');

        var refId = data.referringOfficeId || data.referringOfficeCourtesySupId;
        if (refId) $(".ref_office").val(refId);

        var cid = data.clientId || petitionerId;
        let name = "";
        if (!data.fullName) {
            name = `${data.firstName} ${data.middleName} ${data.lastName} ${data.suffixName}`
        } else {
            name = data.fullName
        }
        $(".client").val(name)
    }

    function enableForm(keepReadonly) {
        $("#spinner_update").length && $("#spinner_update").hide();
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm').prop('disabled', false);
        if (keepReadonly) {
            $('.docket_number').prop('disabled', true);
            $('.client').prop('disabled', true);
        }
    }

    // Load docket data
    if (docket_number && officeId) {
        $("#spinner_update").length && $("#spinner_update").show();
        get('8000/docketbook/' + docket_number + '/' + officeId).done(function (res) {
            var data = res.response || res;
            if (res.status === "ERROR" || !data) {
                enableForm(false);
                alert(res.message || "Failed to load data");
                return;
            }
            populateForm(data);
            // Save handler
            $(".btn-confirm").on("click", function () {
                if (!docket_number || !officeId) {
                    alert("Missing docket or office information.");
                    return;
                }
                var $btn = $(this);
                var sel = $('.client option:selected');
                var clientId = petitionerId || $(".client").val();

                var dateCompleted = $(".date_completed_and_returned").val() || "";

                var payload = {
                    type: "PIS_CSUP",
                    docketNumber: $(".docket_number").val() || "",
                    docketSeries: "",
                    caseloadType: "",
                    fieldOfficeId: officeId || "",
                    clientType: "PROBATIONER",
                    clientId: data.clientId,
                    firstName: data.firstName || "",
                    middleName: data.middleName || "",
                    lastName: data.lastName || "",
                    suffixName: data.suffixName || "",
                    fullName: data.fullName || "",
                    isLegalAge: false,
                    pleaBargain: false,
                    caseClassification: $(".case_classification").val() || "",
                    criminalCaseNumber: $(".cc_num").val() || "",
                    offense: "",
                    courtOfOrigin: $(".court_origin").val() || "",
                    isMilitaryCourt: false,
                    courtOrderDate: "",
                    investigatingOfficer: "",
                    receivedDateByPPO: $(".date_rcv_from_ppo").val() || "",
                    sentence: "",
                    manualDocket: false,
                    referral: false,
                    referralData: "",
                    remarks: "",
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
                    dateCICAR: dateCompleted,
                    supervisingOfficer: $(".sup_officer").val() || "",
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
                    dateCompletedAndReturned: dateCompleted,
                    officeFindingsForActedUpon: "",
                    officeFindingsForPendingDisposition: "",
                    specifyCourtPpoTransferred: "",
                    specifyOtherReasonsRevocation: "",
                    periodOfSupervision: $(".period_supervision").val() || "",
                    specifyOtherSubmittedReports: "",
                    otherResolutionType: "",
                    periodOfCourtesySupervision: $(".period_supervision").val() || "",
                    dateReturned: dateCompleted,
                    referringOfficeCourtesyInv: "",
                    referringOfficeCourtesyInvId: "",
                    referringOfficeCourtesySup: "",
                    referringOfficeCourtesySupId: $(".ref_office").val() || "",
                    specifyOtherTypeOfDecision: "",
                    fromPrisonType: ""
                };

                $btn.prop('disabled', true);
                post('8000/docketbook/update/' + docket_number + '/' + officeId, JSON.stringify(payload)).done(function (res) {
                    if (res.status != "ERROR") {
                        $('#success').show();
                        setTimeout(function () {
                            window.location.href = api + "/pis/probation-courtesy-supervision-list";
                        }, 1500);
                    } else {
                        $btn.prop('disabled', false);
                        alert(res.message || "Save failed");
                    }
                }).fail(function () {
                    $btn.prop('disabled', false);
                    alert("Save failed");
                });
            });
            setTimeout(function () { enableForm(true); }, 300);
        });
    } else {
        enableForm(false);
    }

})(jQuery);
