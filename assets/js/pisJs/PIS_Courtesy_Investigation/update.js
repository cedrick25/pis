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
            var pair = sURLVariables[i].split('=');
            if (pair[0] === sParam) {
                if (pair.length < 2 || pair[1] === '') {
                    return '';
                }
                try {
                    return decodeURIComponent(pair[1].replace(/\+/g, ' '));
                } catch (e) {
                    return '';
                }
            }
        }
        return undefined;
    }

    function isCourtesyClientNamePartEmpty(v) {
        return v === null || v === undefined || String(v).trim() === '';
    }

    function formatClientDisplayName(r) {
        if (!r) {
            return '';
        }
        if (r.fullName != null && String(r.fullName).trim() !== '') {
            return String(r.fullName).trim();
        }
        var parts = [r.firstName, r.middleName, r.lastName, r.suffixName].filter(function (p) {
            return !isCourtesyClientNamePartEmpty(p);
        });
        if (parts.length) {
            return parts.map(function (p) { return String(p).trim(); }).join(' ');
        }
        return 'N/A';
    }

    var __selectFieldOffice = function () {
        var $warn = $('#ref_office_list_error');
        __executeExternalGet('8088/department/list').done(function (result) {
            if ($warn.length) {
                $warn.hide().empty();
            }
            if (!result || result.status === 'ERROR') {
                if ($warn.length) {
                    $warn.text('Referring offices could not be loaded. The department service may be unavailable (port 8088). Refresh the page or try again later.').show();
                }
                return;
            }
            if (!Array.isArray(result)) {
                if ($warn.length) {
                    $warn.text('Referring office list was not in the expected format.').show();
                }
                return;
            }
            if (result.length === 0) {
                if ($warn.length) {
                    $warn.text('No departments were returned. If the list should not be empty, check the department service (port 8088).').show();
                }
                return;
            }
            var $sel = $('.ref_office');
            result.forEach(function (data) {
                if (data == null) {
                    return;
                }
                var id = data.id;
                var label = data.name != null ? String(data.name) : '';
                $('<option></option>').attr('value', id).text(label).appendTo($sel);
            });
            $sel.trigger('change');
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
    if (docket_number !== undefined && docket_number !== null) {
        docket_number = String(docket_number).trim();
    }
    var officeId = (window.PisDocketOfficeFilter && window.PisDocketOfficeFilter.resolvePageOfficeId()) || $.cookie("field_office_id");
    if (officeId) {
        officeId = String(officeId).trim();
    }

    var linkInvalidMessage = null;
    if (docket_number === undefined || docket_number === null || docket_number === '') {
        linkInvalidMessage = 'This page is missing a docket number. Use the Courtesy Investigation list and choose Update from there.';
    } else if (!officeId) {
        linkInvalidMessage = 'Your field office could not be determined (try signing in again or returning to the list).';
    }

    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm').prop('disabled', true);

    var courtesyUpdateApiResult = null;
    var courtesyUpdateSubmitting = false;

    var setConfirmBusy = function (busy) {
        var $btn = $('.btn-confirm');
        if (busy) {
            if ($btn.data('cinv-orig-html') === undefined) {
                $btn.data('cinv-orig-html', $btn.html());
            }
            $btn.prop('disabled', true).attr('aria-busy', 'true');
            $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
        } else {
            $btn.prop('disabled', false).attr('aria-busy', 'false');
            var orig = $btn.data('cinv-orig-html');
            if (orig !== undefined) {
                $btn.html(orig);
            }
        }
    };

    var revealFormControls = function () {
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm').prop('disabled', false);
        $('.docket_number').prop('disabled', true);
        $('.client').prop('disabled', true);
    };

    var loadCourtesyInvestigation = function () {
        __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId).done(function (apiResult) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            var result = apiResult.response;
            if (apiResult.status !== "ERROR" && result) {
                courtesyUpdateApiResult = result;
                $('#update_form_error').hide().empty();
                $(".docket_number").val(result.docketNumber || '');
                $(".client").val(formatClientDisplayName(result));

                // setTimeout(function () {
                //     var clientId = GetURLParameter('petitionerId') || result.clientId;
                //     if (clientId) $(".client").val(clientId).trigger("change");
                // }, 500);

                setTimeout(function () {
                    var refOfficeId = result.referringOfficeCourtesyInvId != null && result.referringOfficeCourtesyInvId !== ''
                        ? result.referringOfficeCourtesyInvId
                        : result.referringOfficeId;
                    var refOfficeNameRaw = result.referringOfficeCourtesyInv
                        || result.referringOfficeName
                        || result.referringOfficeDescription
                        || '';
                    var refOfficeName = String(refOfficeNameRaw).trim();
                    var $opts = $(".ref_office option");
                    var $byId = $opts.filter(function () {
                        return String($(this).val()) === String(refOfficeId == null ? '' : refOfficeId);
                    });
                    if (refOfficeId != null && refOfficeId !== '' && $byId.length) {
                        $(".ref_office").val(String(refOfficeId)).trigger("change");
                    } else if (refOfficeName) {
                        var $opt = $opts.filter(function () {
                            return $(this).text().trim() === refOfficeName;
                        });
                        if ($opt.length) {
                            $opt.prop('selected', true);
                            $(".ref_office").trigger("change");
                        }
                    }
                }, 600);

                $(".date_rcv_from_ppo").val(result.receivedDateByPPO || '');
                $(".inv_officer").val(result.investigatingOfficer || '');
                $(".reasons").val(result.remarks || '');
                $(".date_completed_and_returned").val(result.dateCICAR || result.dateCompletedAndReturned || '');

                revealFormControls();
            } else {
                courtesyUpdateApiResult = null;
                $('#success').hide();
                $('#update_form_error').text('Could not load this docket. You can return to the list and try again.').show();
            }
        });
    };

    $(document).on('click.courtesyInvUpdate', '.btn-confirm', function (e) {
        e.preventDefault();
        if (linkInvalidMessage || !courtesyUpdateApiResult || courtesyUpdateSubmitting) {
            return;
        }
        var r = courtesyUpdateApiResult;
        courtesyUpdateSubmitting = true;
        setConfirmBusy(true);
        $('#update_form_error').hide().empty();

        var payload = {
            type: "PIS_CSINV",
            docketNumber: $(".docket_number").val() || "",
            docketSeries: "",
            caseloadType: "",
            fieldOfficeId: officeId || "",
            clientType: "PROBATIONER",
            clientId: r.clientId,
            firstName: r.firstName || "",
            middleName: r.middleName || "",
            lastName: r.lastName || "",
            suffixName: r.suffixName || "",
            fullName: r.fullName || "",
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
                $('#update_form_error').hide().empty();
                $('#success').show();
                setTimeout(function () {
                    $('#success').hide();
                    window.location.href = api + "/pis/probation-courtesy-investigation-list";
                }, 2000);
            } else {
                $('#success').hide();
                $('#update_form_error').text('Update could not be saved. Please try again.').show();
                courtesyUpdateSubmitting = false;
                setConfirmBusy(false);
            }
        });
    });


    if (linkInvalidMessage) {
        $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
        $('#success').hide();
        $('#update_form_error').text(linkInvalidMessage).show();
    } else {
        loadCourtesyInvestigation();
    }

})(jQuery);
