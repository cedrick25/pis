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

    function formatClientErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

    var __executeExternalGet = function (path) {
        var base = resolveApiBase();
        path = joinApiUrl(base, path);
        var d = $.Deferred();
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
            cache: false,
            timeout: 90000
        }).done(function (data) {
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
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
        $select.val(normalized);
    }

    function updateForms(row) {
        $('.docket_num_update').val(row.docketNumber || '');
        $('.client_update').val(getDisplayFullName(row));
        $('.cc_no_update').val(safeValue(row.criminalCaseNumber));
        $('.name_prison').val(safeValue(row.prisonName));
        setSelectValue('.board_order_update', row.fromPrisonType);
        $('.offense').val(safeValue(row.offense));
        $('.date_received_by_ppo').val(normalizeDate(row.receivedDateByPPO));
        $('.inv_officer').val(safeValue(row.investigatingOfficer));
        $('.date_peci_update').val(normalizeDate(row.investigationReportSubmittedDate));
        setSelectValue('.ppo_recommendation', row.ppoRecommendation);
        $('.transfered_date').val(normalizeDate(row.dateOfTransfer));
        $('.transfer_to').val(safeValue(row.specifyCourtPpoTransferred || row.transferredOfficeId));
        setSelectValue('.court_decision', row.courtDecision);
        $('.date_order_rcv_court').val(normalizeDate(row.dateOrderReceivedFromTheCourt));
    }

    function loadInvestigationDocket(docket_number, officeId) {
        var req = __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId);
        req.always(function () {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
        });
        req.done(function (apiResult) {
            if (apiResult.status === 'ERROR') {
                var msg = formatClientErrorMessage(
                    apiResult.message,
                    'Could not load this docket. Return to the list and try again.'
                );
                $('#view_form_error').text(msg).show();
                showPisToast(msg, 'danger');
                return;
            }

            var row = apiResult.response;
            if (!row || row.status === 'ERROR') {
                var errMsg = formatClientErrorMessage(
                    row && row.message,
                    'Could not load this docket. Return to the list and try again.'
                );
                $('#view_form_error').text(errMsg).show();
                showPisToast(errMsg, 'danger');
                return;
            }

            $('#view_form_error').hide().empty();

            try {
                updateForms(row);
            } catch (e) {
                var fillMsg = 'The docket loaded but the form could not be filled. Refresh the page.';
                $('#view_form_error').text(fillMsg).show();
                showPisToast(fillMsg, 'danger');
            }
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
            linkInvalidMessage = 'This page is missing a docket number. Open View from the Investigation list.';
        } else if (!officeId) {
            linkInvalidMessage =
                'Your field office could not be determined. Try signing in again or return to the list.';
        } else if (!resolveApiBase()) {
            linkInvalidMessage = 'Could not resolve the application API base URL. Please refresh the page.';
        }

        if (linkInvalidMessage) {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            $('#view_form_error').text(linkInvalidMessage).show();
            showPisToast(linkInvalidMessage, 'warning');
        } else {
            loadInvestigationDocket(docket_number, officeId);
        }
    });
})(jQuery);
