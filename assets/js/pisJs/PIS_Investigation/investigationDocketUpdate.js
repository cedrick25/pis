(function ($) {
    function resolveApiBase() {
        var raw = localStorage.getItem('api');
        if (raw != null && String(raw).trim() !== '') {
            return String(raw).trim();
        }
        if (typeof window.__PIS_API_BASE === 'string' && String(window.__PIS_API_BASE).trim() !== '') {
            return String(window.__PIS_API_BASE).trim();
        }
        return '';
    }

    var api = resolveApiBase();
    var ___ctx = api;

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

    function formatClientErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

    function normalizeDate(value) {
        if (value == null || String(value).trim() === '') {
            return '';
        }
        return String(value).substring(0, 10);
    }

    function showPisToast(message, variant) {
        variant = variant || 'success';
        var $stack = $('#pis_toast_stack');
        if (!$stack.length || !message) {
            return;
        }
        var alertClass =
            variant === 'danger' ? 'alert-danger' : variant === 'warning' ? 'alert-warning' : 'alert-success';
        var $t = $('<div role="status" class="pis-toast alert ' + alertClass + ' shadow-sm mb-0"></div>').text(
            String(message)
        );
        $stack.append($t);
        requestAnimationFrame(function () {
            $t.addClass('pis-toast--visible');
        });
        var ms = variant === 'danger' ? 5200 : 3200;
        setTimeout(function () {
            $t.removeClass('pis-toast--visible');
            setTimeout(function () {
                $t.remove();
            }, 280);
        }, ms);
    }

    var __getContext = function () {
        return ___ctx;
    };

    var __executeExternalGet = function (path, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
            cache: false,
            timeout: 90000
        })
            .done(function (data) {
                if (customLoader) {
                    $('#' + customLoader).hide();
                    $('#' + customLoader).addClass('hide');
                }
                d.resolve(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (customLoader) {
                    $('#' + customLoader).hide();
                    $('#' + customLoader).addClass('hide');
                }
                var msg = typeof errorThrown === 'string' && errorThrown
                    ? errorThrown
                    : (textStatus || 'Network error');
                d.resolve({ status: 'ERROR', message: msg });
            });
        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        var body =
            jsonObj === undefined || jsonObj === null
                ? '{}'
                : typeof jsonObj === 'string'
                  ? jsonObj
                  : JSON.stringify(jsonObj);
        $.ajax({
            method: 'POST',
            url: path,
            dataType: 'json',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            processData: false,
            data: body
        })
            .done(function (data) {
                if (customLoader) {
                    $('#' + customLoader).hide();
                    $('#' + customLoader).addClass('hide');
                }
                d.resolve(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (customLoader) {
                    $('#' + customLoader).hide();
                    $('#' + customLoader).addClass('hide');
                }
                var msg = typeof errorThrown === 'string' && errorThrown
                    ? errorThrown
                    : (textStatus || 'Network error');
                d.resolve({ status: 'ERROR', message: msg });
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

    function isClientNamePartEmpty(v) {
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
            return !isClientNamePartEmpty(p);
        });
        if (parts.length) {
            return parts
                .map(function (p) {
                    return String(p).trim();
                })
                .join(' ');
        }
        return '';
    }

    var __selectFieldOffice = function () {
        if (!resolveApiBase()) {
            return;
        }
        __executeExternalGet('8088/department/list').done(function (result) {
            if (result && result.status !== 'ERROR' && Array.isArray(result)) {
                result.forEach(function (data) {
                    $('.transfer_to').append(
                        $('<option></option>').attr('value', data.id).text(data.name || data.id)
                    );
                });
            }
        });
    };
    __selectFieldOffice();

    var docket_number = GetURLParameter('docket_number');
    if (docket_number !== undefined && docket_number !== null) {
        docket_number = String(docket_number).trim();
    }
    var officeId = $.cookie('field_office_id');
    if (officeId) {
        officeId = String(officeId).trim();
    }
    var petitionerId = GetURLParameter('petitionerId');

    var linkInvalidMessage = null;
    if (docket_number === undefined || docket_number === null || docket_number === '') {
        linkInvalidMessage =
            'This page is missing a docket number. Use the Investigation Docket list and choose Update from there.';
    } else if (!officeId) {
        linkInvalidMessage =
            'Your field office could not be determined (try signing in again or returning to the list).';
    } else if (!resolveApiBase()) {
        linkInvalidMessage = 'Could not resolve the application API base URL. Please refresh the page.';
    }

    $('.card-body').find('input, select, button').prop('disabled', true);
    $('.btn-confirm_update').prop('disabled', true);

    var invUpdateApiResult = null;
    var invUpdateSubmitting = false;

    function setConfirmBusy(busy) {
        var $btn = $('.btn-confirm_update');
        if (busy) {
            if ($btn.data('pinv-orig-html') === undefined) {
                $btn.data('pinv-orig-html', $btn.html());
            }
            $btn.prop('disabled', true).attr('aria-busy', 'true');
            $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
        } else {
            $btn.prop('disabled', false).attr('aria-busy', 'false');
            var orig = $btn.data('pinv-orig-html');
            if (orig !== undefined) {
                $btn.html(orig);
            }
        }
    }

    function revealFormControls() {
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm_update').prop('disabled', false);
        $('.docketNum_update').prop('disabled', true);
        $('.pb_client').prop('disabled', true);
    }

    function applyRecordToForm(result) {
        $('.docketNum_update').val(result.docketNumber);
        $('.pb_client').val(formatClientDisplayName(result));

        var pbVal = result.pleaBargain;
        var pb = pbVal === true ? 'true' : pbVal === false ? 'false' : '';
        $('.plea_bargain').val(pb).trigger('change');

        $('.cc_no').val(result.criminalCaseNumber);
        $('.court_origin').val(result.courtOfOrigin);
        $('.offense').val(result.offense);
        $('.sentence').val(result.sentence);
        $('.cod').val(normalizeDate(result.courtOrderDate));
        $('.rd').val(normalizeDate(result.receivedDateByPPO));
        $('.inv_off').val(result.investigatingOfficer);

        $('.psir_date').val(normalizeDate(result.psirDate));
        $('.ppo_recommendation').val(result.ppoRecommendation).trigger('change');
        $('.manifestation_date').val(normalizeDate(result.manifestationDate));
        $('.transfer_date').val(normalizeDate(result.dateOfTransfer));
        $('.transfer_to').val(result.transferredOfficeId != null ? String(result.transferredOfficeId) : '').trigger('change');

        var typeOfReferrals = result.typeOfReferrals ?? '';
        $('.not_acted_decision').val(typeOfReferrals).trigger('change');
        $('.date_order_received').val(normalizeDate(result.referralsNotActedUponDateOrderReceived));

        $('.alias_t4').val(result.alias);
        $('.court_decision_t4').val(result.courtDecision).trigger('change');
        $('.reason_for_denial_t4').val(result.reasonForDenialDismissal);
        $('.other_type_of_decision_t4').val(result.specifyOtherTypeOfDecision);
        $('.date_order_received_court_t4').val(normalizeDate(result.dateOrderReceivedFromTheCourt));
    }

    function loadInvestigation() {
        __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId).done(function (apiResult) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            var result = apiResult.response;
            if (apiResult.status !== 'ERROR' && result && result.status !== 'ERROR') {
                invUpdateApiResult = result;
                $('#update_form_error').hide().empty();
                try {
                    applyRecordToForm(result);
                    revealFormControls();
                } catch (e) {
                    invUpdateApiResult = null;
                    $('#success').hide();
                    var fillMsg =
                        'The docket loaded but the form could not be filled. Refresh the page.';
                    $('#update_form_error').text(fillMsg).show();
                    showPisToast(fillMsg, 'danger');
                }
            } else {
                invUpdateApiResult = null;
                $('#success').hide();
                var loadMsg = formatClientErrorMessage(
                    apiResult && apiResult.message,
                    'Could not load this docket. You can return to the list and try again.'
                );
                if (result && result.status === 'ERROR' && result.message) {
                    loadMsg = formatClientErrorMessage(result.message, loadMsg);
                }
                $('#update_form_error').text(loadMsg).show();
                showPisToast(loadMsg, 'danger');
            }
        });
    }

    function syncPleaBargainOptionalFields() {
        var $extra = $('.class_sel, .class-sel');
        if (!$extra.length) {
            return;
        }
        var v = $('.plea_bargain').val();
        if (v === 'true') {
            $extra.show();
        } else {
            $extra.hide();
        }
    }

    $('.plea_bargain')
        .off('change.pisInvUpPb')
        .on('change.pisInvUpPb', syncPleaBargainOptionalFields);
    syncPleaBargainOptionalFields();

    function bindSubmitOnce() {
        $(document)
            .off('click.pisInvUpdate', '.btn-confirm_update')
            .on('click.pisInvUpdate', '.btn-confirm_update', function (e) {
                e.preventDefault();
                if (linkInvalidMessage || !invUpdateApiResult || invUpdateSubmitting) {
                    if (linkInvalidMessage) {
                        $('#update_form_error').text(linkInvalidMessage).show();
                        showPisToast(linkInvalidMessage, 'warning');
                    } else if (!invUpdateApiResult) {
                        var waitMsg =
                            'Docket data is not ready. Wait for the form to finish loading.';
                        $('#update_form_error').text(waitMsg).show();
                        showPisToast(waitMsg, 'warning');
                    }
                    return;
                }

                var result = invUpdateApiResult;
                invUpdateSubmitting = true;
                setConfirmBusy(true);
                $('#update_form_error').hide().empty();

                var clientId =
                    petitionerId !== undefined && petitionerId !== null && String(petitionerId).trim() !== ''
                        ? petitionerId
                        : result.clientId;

                var payload = {
                    type: 'PIS_INV',
                    docketNumber: $('.docketNum_update').val(),
                    docketSeries: '',
                    caseloadType: '',
                    fieldOfficeId: officeId,
                    clientType: 'PROBATIONER',
                    clientId: clientId,
                    firstName: result.firstName ?? '',
                    middleName: result.middleName ?? '',
                    lastName: result.lastName ?? '',
                    suffixName: result.suffixName ?? '',
                    fullName: result.fullName ?? '',
                    isLegalAge: false,
                    pleaBargain: $('.plea_bargain').val(),
                    caseClassification: '',
                    criminalCaseNumber: $('.cc_no').val(),
                    offense: $('.offense').val(),
                    courtOfOrigin: $('.court_origin').val(),
                    isMilitaryCourt: false,
                    courtOrderDate: $('.cod').val(),
                    investigatingOfficer: $('.inv_off').val(),
                    receivedDateByPPO: $('.rd').val(),
                    sentence: $('.sentence').val(),
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
                    ppoRecommendation: $('.ppo_recommendation').val(),
                    recommendationState: '',
                    dateOfTransfer: $('.transfer_date').val(),
                    transferredOfficeId: $('.transfer_to').val(),
                    dateOrderReceivedFromTheBoard: '',
                    boardOrder: '',
                    boardOrderStatus: '',
                    referringOfficeId: '',
                    dateCICAR: '',
                    supervisingOfficer: '',
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
                    psirDate: $('.psir_date').val(),
                    manifestationDate: $('.manifestation_date').val(),
                    typeOfReferrals: $('.not_acted_decision').val(),
                    referralsNotActedUponDateOrderReceived: $('.date_order_received').val(),
                    alias: $('.alias_t4').val(),
                    courtDecision: $('.court_decision_t4').val(),
                    reasonForDenialDismissal: $('.reason_for_denial_t4').val(),
                    dateOrderReceivedFromTheCourt: $('.date_order_received_court_t4').val(),
                    dateCompletedAndReturned: '',
                    officeFindingsForActedUpon: '',
                    officeFindingsForPendingDisposition: '',
                    specifyCourtPpoTransferred: '',
                    specifyOtherReasonsRevocation: '',
                    periodOfSupervision: '',
                    specifyOtherSubmittedReports: '',
                    otherResolutionType: '',
                    periodOfCourtesySupervision: '',
                    dateReturned: '',
                    referringOfficeCourtesyInv: '',
                    referringOfficeCourtesyInvId: '',
                    referringOfficeCourtesySup: '',
                    referringOfficeCourtesySupId: '',
                    specifyOtherTypeOfDecision: $('.other_type_of_decision_t4').val(),
                    fromPrisonType: ''
                };

                __executeExternalPost(
                    '8000/docketbook/update/' + docket_number + '/' + officeId,
                    JSON.stringify(payload)
                ).done(function (postResult) {
                    if (postResult.status !== 'ERROR') {
                        $('#update_form_error').hide().empty();
                        $('#success').show();
                        showPisToast('Record updated successfully.', 'success');
                        setTimeout(function () {
                            $('#success').hide();
                            window.location.href = joinApiUrl(resolveApiBase(), 'pis/investigation_docketing');
                        }, 2000);
                    } else {
                        $('#success').hide();
                        var saveMsg = formatClientErrorMessage(
                            postResult && postResult.message,
                            'Update could not be saved. Please try again.'
                        );
                        $('#update_form_error').text(saveMsg).show();
                        showPisToast(saveMsg, 'danger');
                        invUpdateSubmitting = false;
                        setConfirmBusy(false);
                    }
                });
            });
    }

    bindSubmitOnce();

    if (linkInvalidMessage) {
        $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
        $('#success').hide();
        $('#update_form_error').text(linkInvalidMessage).show();
        showPisToast(linkInvalidMessage, 'warning');
    } else {
        loadInvestigation();
    }
})(jQuery);
