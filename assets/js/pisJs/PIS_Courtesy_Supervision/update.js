(function ($) {
    var api = localStorage.getItem('api') || '';

    function joinApiUrl(base, path) {
        var b = String(base == null ? '' : base).replace(/\/+$/, '');
        var p = String(path == null ? '' : path).replace(/^\/+/, '');
        if (!b) {
            return p;
        }
        if (!p) {
            return b;
        }
        if (b.slice(-1) === ':' && /^\d+\//.test(p)) {
            return b + p;
        }
        return b + '/' + p;
    }

    var get = function (path) {
        return $.ajax({
            method: 'GET',
            url: joinApiUrl(api, path),
            dataType: 'json',
            timeout: 90000
        }).then(function (data) { return data; }, function () {
            return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
        });
    };

    var post = function (path, payload) {
        var body = typeof payload === 'string' ? payload : JSON.stringify(payload);
        return $.ajax({
            method: 'POST',
            url: joinApiUrl(api, path),
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' },
            data: body,
            timeout: 90000
        }).then(function (data) { return data; }, function () {
            return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
        });
    };

    function getUrlParam(name) {
        var params = {};
        window.location.search.substring(1).split('&').forEach(function (p) {
            var kv = p.split('=');
            if (kv[0]) {
                try {
                    params[kv[0]] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
                } catch (e) {
                    params[kv[0]] = kv[1] || '';
                }
            }
        });
        return params[name];
    }

    var docket_number = getUrlParam('docket_number');
    var petitionerId = getUrlParam('petitionerId');
    var officeId = getUrlParam('officeId') || $.cookie('field_office_id');

    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm').prop('disabled', true);

    get('8088/department/list').done(function (result) {
        var list = Array.isArray(result) ? result : (result.content || result.data || []);
        if (result && result.status !== 'ERROR' && list.length) {
            $('.ref_office').empty().append("<option value=''>Select Referring Office</option>");
            list.forEach(function (d) {
                $('.ref_office').append("<option value='" + d.id + "'>" + d.name + '</option>');
            });
        }
    });

    function populateForm(data) {
        if (!data) {
            return;
        }
        $('.docket_number').val(data.docketNumber || '');
        $('.cc_num').val(data.criminalCaseNumber || '');
        $('.court_origin').val(data.courtOfOrigin || '');
        $('.date_rcv_from_ppo').val(data.receivedDateByPPO || '');
        $('.sup_officer').val(data.supervisingOfficer || '');
        $('.period_supervision').val(data.periodOfSupervision || data.periodOfCourtesySupervision || '');
        $('.case_classification').val(data.caseClassification || '').trigger('change');
        $('.date_completed_and_returned').val(data.dateCICAR || data.dateReturned || data.dateCompletedAndReturned || '');

        var refId = data.referringOfficeId || data.referringOfficeCourtesySupId;
        if (refId) {
            $('.ref_office').val(String(refId)).trigger('change');
        }

        var cid = data.clientId || petitionerId;
        var name = '';
        if (!data.fullName) {
            name = [data.firstName, data.middleName, data.lastName, data.suffixName].filter(Boolean).join(' ').trim();
        } else {
            name = data.fullName;
        }
        $('.client').val(name);
    }

    function enableForm(keepReadonly) {
        $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
        $('#update_form_error').hide().empty();
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm').prop('disabled', false);
        if (keepReadonly) {
            $('.docket_number').prop('disabled', true);
            $('.client').prop('disabled', true);
        }
    }

    function showLoadError(msg) {
        $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
        $('#success').hide();
        $('#update_form_error').text(msg).show();
    }

    function setConfirmBusy(busy) {
        var $btn = $('.btn-confirm');
        if (busy) {
            if ($btn.data('csup-orig-html') === undefined) {
                $btn.data('csup-orig-html', $btn.html());
            }
            $btn.prop('disabled', true).attr('aria-busy', 'true');
            $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
        } else {
            $btn.prop('disabled', false).attr('aria-busy', 'false');
            var orig = $btn.data('csup-orig-html');
            if (orig !== undefined) {
                $btn.html(orig);
            }
        }
    }

    if (docket_number && officeId) {
        get('8000/docketbook/' + encodeURIComponent(docket_number) + '/' + encodeURIComponent(officeId)).done(function (res) {
            var data = res.response || res;
            if (res.status === 'ERROR' || !data || data.status === 'ERROR') {
                showLoadError('Could not load this docket. Return to the list and try again.');
                return;
            }
            populateForm(data);

            $('.btn-confirm').off('click.csupUp').on('click.csupUp', function () {
                if (!docket_number || !officeId) {
                    $('#update_form_error').text('Missing docket or office information.').show();
                    return;
                }
                $('#update_form_error').hide().empty();

                var dateCompleted = $('.date_completed_and_returned').val() || '';

                var payload = {
                    type: 'PIS_CSUP',
                    docketNumber: $('.docket_number').val() || '',
                    docketSeries: '',
                    caseloadType: '',
                    fieldOfficeId: officeId || '',
                    clientType: 'PROBATIONER',
                    clientId: data.clientId,
                    firstName: data.firstName || '',
                    middleName: data.middleName || '',
                    lastName: data.lastName || '',
                    suffixName: data.suffixName || '',
                    fullName: data.fullName || '',
                    isLegalAge: false,
                    pleaBargain: false,
                    caseClassification: $('.case_classification').val() || '',
                    criminalCaseNumber: $('.cc_num').val() || '',
                    offense: '',
                    courtOfOrigin: $('.court_origin').val() || '',
                    isMilitaryCourt: false,
                    courtOrderDate: '',
                    investigatingOfficer: '',
                    receivedDateByPPO: $('.date_rcv_from_ppo').val() || '',
                    sentence: '',
                    manualDocket: false,
                    referral: false,
                    referralData: '',
                    remarks: '',
                    probationStartDate: '',
                    probationYear: '',
                    probationMonth: '',
                    probationDay: '',
                    prisonName: '',
                    investigationReportSubmittedDate: '',
                    ppoRecommendation: '',
                    recommendationState: '',
                    dateOfTransfer: '',
                    transferredOfficeId: '',
                    dateOrderReceivedFromTheBoard: '',
                    boardOrder: '',
                    boardOrderStatus: '',
                    referringOfficeId: $('.ref_office').val() || '',
                    dateCICAR: dateCompleted,
                    supervisingOfficer: $('.sup_officer').val() || '',
                    supervisionStartDate: '',
                    supervisionEndDate: '',
                    probationEndDate: '',
                    reportType: '',
                    referralType: '',
                    dateReportSubmittedToTheBoard: '',
                    dateReportSubmittedToRDForTransferToOtherPPO: '',
                    resolutionType: '',
                    dateResolutionFromTheBoard: '',
                    dateResolutionFromTheRDForTransfer: '',
                    createdBy: '',
                    updatedBy: '',
                    psirDate: '',
                    manifestationDate: '',
                    typeOfReferrals: '',
                    referralsNotActedUponDateOrderReceived: '',
                    alias: '',
                    courtDecision: '',
                    reasonForDenialDismissal: '',
                    dateOrderReceivedFromTheCourt: '',
                    dateCompletedAndReturned: dateCompleted,
                    officeFindingsForActedUpon: '',
                    officeFindingsForPendingDisposition: '',
                    specifyCourtPpoTransferred: '',
                    specifyOtherReasonsRevocation: '',
                    periodOfSupervision: $('.period_supervision').val() || '',
                    specifyOtherSubmittedReports: '',
                    otherResolutionType: '',
                    periodOfCourtesySupervision: $('.period_supervision').val() || '',
                    dateReturned: dateCompleted,
                    referringOfficeCourtesyInv: '',
                    referringOfficeCourtesyInvId: '',
                    referringOfficeCourtesySup: '',
                    referringOfficeCourtesySupId: $('.ref_office').val() || '',
                    specifyOtherTypeOfDecision: '',
                    fromPrisonType: ''
                };

                setConfirmBusy(true);
                post('8000/docketbook/update/' + encodeURIComponent(docket_number) + '/' + encodeURIComponent(officeId), payload).done(function (res) {
                    setConfirmBusy(false);
                    if (res.status !== 'ERROR') {
                        $('#update_form_error').hide().empty();
                        $('#success').show();
                        setTimeout(function () {
                            window.location.href = joinApiUrl(api, 'pis/probation-courtesy-supervision-list');
                        }, 1500);
                    } else {
                        $('#update_form_error').text(res.message || 'Save failed. Please try again.').show();
                    }
                }).fail(function () {
                    setConfirmBusy(false);
                    $('#update_form_error').text('Save could not be completed. Check your connection and try again.').show();
                });
            });
            setTimeout(function () {
                enableForm(true);
            }, 200);
        });
    } else {
        showLoadError('This page is missing a docket number or field office. Open Update from the Courtesy Supervision list.');
    }

})(jQuery);
