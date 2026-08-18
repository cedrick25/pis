(function ($) {
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

    var __getContext = function () {
        return resolveApiBase();
    };

    var __buildUrl = function (path) {
        if (/^https?:\/\//i.test(path)) {
            return path;
        }
        return joinApiUrl(__getContext(), path);
    };

    function formatClientErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

    var __executeExternalGet = function (path, customLoader) {
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).removeClass('is-hidden').attr('aria-busy', 'true');
        }
        $.ajax({
            method: 'GET',
            url: __buildUrl(path),
            dataType: 'json',
            cache: false,
            timeout: 90000
        }).done(function (data) {
            if (customLoader) {
                $('#' + customLoader).addClass('is-hidden').attr('aria-busy', 'false');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader) {
                $('#' + customLoader).addClass('is-hidden').attr('aria-busy', 'false');
            }
            var msg = typeof errorThrown === 'string' && errorThrown
                ? errorThrown
                : (textStatus || 'Network error');
            d.resolve({
                status: 'ERROR',
                message: msg
            });
        });
        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        var d = $.Deferred();
        var body = typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj);
        if (customLoader) {
            $('#' + customLoader).removeClass('is-hidden').attr('aria-busy', 'true');
        }
        $.ajax({
            method: 'POST',
            url: __buildUrl(path),
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' },
            data: body,
            timeout: 90000
        }).done(function (data) {
            if (customLoader) {
                $('#' + customLoader).addClass('is-hidden').attr('aria-busy', 'false');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader) {
                $('#' + customLoader).addClass('is-hidden').attr('aria-busy', 'false');
            }
            var msg = typeof errorThrown === 'string' && errorThrown
                ? errorThrown
                : (textStatus || 'Network error');
            d.resolve({
                status: 'ERROR',
                message: msg
            });
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

    function safeValue(value) {
        return value === null || value === undefined ? '' : value;
    }

    function normalizeDate(value) {
        if (!value) {
            return '';
        }
        return String(value).substring(0, 10);
    }

    function composeNameFromParts(record) {
        var firstName = safeValue(record.firstName);
        var middleName = safeValue(record.middleName);
        var lastName = safeValue(record.lastName);
        var suffixName = safeValue(record.suffixName);
        return $.trim((firstName + ' ' + middleName + ' ' + lastName + ' ' + suffixName).replace(/\s+/g, ' '));
    }

    function getDisplayFullName(record) {
        var responseFullName = safeValue(record.fullName);
        if (responseFullName !== '') {
            return responseFullName;
        }
        return composeNameFromParts(record);
    }

    function setSelectValue(selector, value) {
        var normalized = safeValue(value);
        var $select = $(selector);
        var hasOption =
            $select.find('option').filter(function () {
                return String($(this).val()) === String(normalized);
            }).length > 0;

        if (!hasOption && normalized !== '') {
            $select.append($('<option></option>').attr('value', normalized).text(normalized));
        }
        $select.val(normalized).trigger('change');
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

    function hideFormError() {
        $('#update_form_error').hide().empty();
    }

    function showFormError(msg) {
        $('#update_form_error').text(msg).show();
    }

    function setUpdateBusy(busy) {
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
        $('.docket_num_update').prop('disabled', true);
        $('.client_update').prop('readonly', true);
    }

    function clearFieldValidation() {
        $('.board_order_update').removeClass('is-invalid').attr('aria-invalid', 'false');
        $('#fb_board_from').hide().text('');
    }

    function setFieldInvalid($el, $fb, msg) {
        $el.addClass('is-invalid');
        $el.attr('aria-invalid', 'true');
        if ($fb && $fb.length) {
            $fb.text(msg).show();
        }
    }

    function validateBeforeSubmit() {
        clearFieldValidation();
        var ok = true;
        var $from = $('.board_order_update');
        var fromVal = String($from.val() || '').trim();
        var fromLower = fromVal.toLowerCase();
        if (fromVal === '' || fromVal === 'select' || fromLower === 'select') {
            setFieldInvalid($from, $('#fb_board_from'), 'Please choose where the referral was received from.');
            ok = false;
        }
        return ok;
    }

    function fillForm(record) {
        $('.docket_num_update').val(safeValue(record.docketNumber));
        $('.client_update').val(getDisplayFullName(record));
        $('.cc_no_update').val(safeValue(record.criminalCaseNumber));
        $('.name_prison').val(safeValue(record.prisonName));
        setSelectValue('.board_order_update', record.fromPrisonType);
        $('.offense').val(safeValue(record.offense));
        $('.date_received_by_ppo').val(normalizeDate(record.receivedDateByPPO));
        $('.inv_officer').val(safeValue(record.investigatingOfficer));
        $('.date_peci_update').val(normalizeDate(record.investigationReportSubmittedDate));
        setSelectValue('.ppo_recommendation', record.ppoRecommendation);
        $('.transfered_date').val(normalizeDate(record.dateOfTransfer));
        $('.transfer_to').val(safeValue(record.specifyCourtPpoTransferred || record.transferredOfficeId));
        setSelectValue('.court_decision', record.courtDecision);
        $('.date_order_rcv_court').val(normalizeDate(record.dateOrderReceivedFromTheCourt));
    }

    function buildPayload(currentRecord, docket_number, officeId) {
        var fallbackFullName = composeNameFromParts(currentRecord || {});
        return $.extend({}, currentRecord, {
            type: safeValue(currentRecord.type) || 'SC_PPI_INV',
            docketNumber: $('.docket_num_update').val() || docket_number,
            clientType: safeValue(currentRecord.clientType) || 'PAROLEE',
            fieldOfficeId: safeValue(currentRecord.fieldOfficeId) || officeId,
            clientId: safeValue(currentRecord.clientId),
            firstName: safeValue(currentRecord.firstName),
            middleName: safeValue(currentRecord.middleName),
            lastName: safeValue(currentRecord.lastName),
            suffixName: safeValue(currentRecord.suffixName),
            fullName: safeValue(currentRecord.fullName) || fallbackFullName,
            criminalCaseNumber: $('.cc_no_update').val(),
            prisonName: $('.name_prison').val(),
            fromPrisonType: $('.board_order_update').val(),
            offense: $('.offense').val(),
            receivedDateByPPO: $('.date_received_by_ppo').val(),
            investigatingOfficer: $('.inv_officer').val(),
            investigationReportSubmittedDate: $('.date_peci_update').val(),
            ppoRecommendation: $('.ppo_recommendation').val(),
            dateOfTransfer: $('.transfered_date').val(),
            specifyCourtPpoTransferred: $('.transfer_to').val(),
            courtDecision: $('.court_decision').val(),
            dateOrderReceivedFromTheCourt: $('.date_order_rcv_court').val(),
            updatedBy: $.cookie('employee_id') || safeValue(currentRecord.updatedBy)
        });
    }

    $(function () {
        var docket_number = GetURLParameter('docket_number');
        if (docket_number !== undefined && docket_number !== null) {
            docket_number = String(docket_number).trim();
        }
        var officeId = (window.PisDocketOfficeFilter && window.PisDocketOfficeFilter.resolvePageOfficeId()) || $.cookie('field_office_id');
        if (officeId) {
            officeId = String(officeId).trim();
        }

        var linkInvalidMessage = null;
        if (docket_number === undefined || docket_number === null || docket_number === '') {
            linkInvalidMessage =
                'This page is missing a docket number. Open Update from the Investigation list.';
        } else if (!officeId) {
            linkInvalidMessage =
                'Your field office could not be determined. Try signing in again or return to the list.';
        } else if (!resolveApiBase()) {
            linkInvalidMessage =
                'Could not resolve the application API base URL. Please refresh the page.';
        }

        var currentRecord = null;
        var formLoaded = false;
        var submitting = false;

        function loadDocketRecord() {
            var req = __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId);
            req.always(function () {
                $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            });
            req.done(function (apiResult) {
                if (apiResult.status === 'ERROR' || !apiResult.response) {
                    formLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    var msg = formatClientErrorMessage(
                        apiResult && apiResult.message,
                        'Could not load this docket. Return to the list and try again.'
                    );
                    showFormError(msg);
                    showPisToast(msg, 'danger');
                    return;
                }

                var result = apiResult.response;
                if (result.status === 'ERROR') {
                    formLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    var errMsg = formatClientErrorMessage(
                        result.message,
                        'Could not load this docket. Return to the list and try again.'
                    );
                    showFormError(errMsg);
                    showPisToast(errMsg, 'danger');
                    return;
                }

                currentRecord = result;
                formLoaded = true;
                hideFormError();

                try {
                    fillForm(currentRecord);
                    revealFormControls();
                } catch (e) {
                    formLoaded = false;
                    showFormError('The docket loaded but the form could not be filled. Refresh the page.');
                    showPisToast('Form could not be filled from this docket.', 'danger');
                }
            });
        }

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        $(document)
            .off('click.scPpInvUpdate', '.btn-confirm_update')
            .on('click.scPpInvUpdate', '.btn-confirm_update', function (e) {
                e.preventDefault();
                if (linkInvalidMessage || !formLoaded || submitting || !currentRecord) {
                    if (!formLoaded && !linkInvalidMessage) {
                        showFormError('Docket data is not ready. Wait for the form to finish loading.');
                        showPisToast('Form is still loading.', 'warning');
                    }
                    return;
                }

                hideFormError();
                if (!validateBeforeSubmit()) {
                    showFormError('Please correct the highlighted fields and try again.');
                    showPisToast('Please fix the highlighted fields.', 'warning');
                    return;
                }

                var payload = buildPayload(currentRecord, docket_number, officeId);

                submitting = true;
                setUpdateBusy(true);
                $('#success').hide();

                __executeExternalPost('8000/docketbook/update/' + docket_number + '/' + officeId, payload).done(
                    function (result) {
                        if (result && result.status !== 'ERROR') {
                            hideFormError();
                            clearFieldValidation();
                            $('#success').show();
                            showPisToast('Record updated successfully.', 'success');
                            setTimeout(function () {
                                $('#success').hide();
                                window.location.href = joinApiUrl(resolveApiBase(), 'pis/parole-pardon-investigation-list');
                            }, 2000);
                        } else {
                            $('#success').hide();
                            var saveMsg = formatClientErrorMessage(
                                result && result.message,
                                'Update could not be saved. Please try again.'
                            );
                            showFormError(saveMsg);
                            showPisToast(saveMsg, 'danger');
                            submitting = false;
                            setUpdateBusy(false);
                        }
                    }
                );
            });

        function clearBoardOrderValidationUi() {
            var $el = $('.board_order_update');
            if ($el.hasClass('is-invalid')) {
                $el.removeClass('is-invalid');
            }
            $el.attr('aria-invalid', 'false');
            $('#fb_board_from').hide().text('');
        }

        $(document)
            .off('change.scPpInvUpdate', '.board_order_update')
            .off('input.scPpInvUpdate', '.board_order_update')
            .on('change.scPpInvUpdate', '.board_order_update', clearBoardOrderValidationUi)
            .on('input.scPpInvUpdate', '.board_order_update', clearBoardOrderValidationUi);

        if (linkInvalidMessage) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            $('#success').hide();
            showFormError(linkInvalidMessage);
            showPisToast(linkInvalidMessage, 'warning');
        } else {
            loadDocketRecord();
        }
    });
})(jQuery);
