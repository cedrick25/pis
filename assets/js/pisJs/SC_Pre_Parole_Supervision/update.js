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

    var __executeExternalGet = function (path, customLoader) {
        var base = localStorage.getItem('api') || '';
        path = joinApiUrl(base, path);
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).removeClass('is-hidden').attr('aria-busy', 'true');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
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
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus
            });
        });
        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        var base = localStorage.getItem('api') || '';
        path = joinApiUrl(base, path);
        var d = $.Deferred();
        var body = typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj);
        if (customLoader) {
            $('#' + customLoader).removeClass('is-hidden').attr('aria-busy', 'true');
        }
        $.ajax({
            method: 'POST',
            url: path,
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
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus
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

    function toSafeString(value) {
        return value == null ? '' : String(value).trim();
    }

    function buildNameFromParts(record) {
        return [
            toSafeString(record.firstName),
            toSafeString(record.middleName),
            toSafeString(record.lastName),
            toSafeString(record.suffixName)
        ].filter(function (part) {
            return part !== '';
        }).join(' ');
    }

    function resolveClientDisplayName(record) {
        var fullName = toSafeString(record.fullName);
        if (fullName !== '') {
            return fullName;
        }
        return buildNameFromParts(record);
    }

    $(function () {
        var currentRecord = null;
        var api = localStorage.getItem('api') || '';
        var scUpdateLoaded = false;
        var scUpdateSubmitting = false;

        var docketNumber = GetURLParameter('docket_number');
        if (docketNumber !== undefined && docketNumber !== null) {
            docketNumber = String(docketNumber).trim();
        }
        var officeId = (window.PisDocketOfficeFilter && window.PisDocketOfficeFilter.resolvePageOfficeId()) || $.cookie('field_office_id');
        if (officeId) {
            officeId = String(officeId).trim();
        }

        var linkInvalidMessage = null;
        if (docketNumber === undefined || docketNumber === null || docketNumber === '') {
            linkInvalidMessage = 'This page is missing a docket number. Open Update from the Supervision Docket list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        function setConfirmBusy(busy) {
            var $btn = $('.btn-confirm');
            if (busy) {
                if ($btn.data('sc-orig-html') === undefined) {
                    $btn.data('sc-orig-html', $btn.html());
                }
                $btn.prop('disabled', true).attr('aria-busy', 'true');
                $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
            } else {
                $btn.prop('disabled', false).attr('aria-busy', 'false');
                var orig = $btn.data('sc-orig-html');
                if (orig !== undefined) {
                    $btn.html(orig);
                }
            }
        }

        function revealFormControls() {
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm').prop('disabled', false);
            $('.docket_num_update').prop('disabled', true);
            $('.client_update').prop('disabled', true);
        }

        function fillForm(record) {
            $('.docket_num_update').val(record.docketNumber || '');
            $('.client_type_update').val(record.clientType || '').trigger('change');
            $('.client_update').val(resolveClientDisplayName(record));
            $('.case_classification').val(record.caseClassification || '').trigger('change');
            $('.date_received_by_ppo').val(record.receivedDateByPPO || '');
            $('.sup_officer').val(record.supervisingOfficer || '');
            $('.sup_start_date').val(record.supervisionStartDate || '');
            $('.sup_end_date').val(record.supervisionEndDate || '');
            $('.office_findings').val(record.officeFindingsForActedUpon || '').trigger('change');
            $('.specify_report').val(record.specifyOtherSubmittedReports || '');
            $('.date_submitted_board').val(record.dateReportSubmittedToTheBoard || '');
            $('.date_submitted_regional_dir').val(record.dateReportSubmittedToRDForTransferToOtherPPO || '');
            $('.board_resolution').val(record.resolutionType || '').trigger('change');
            $('.specify_resolution').val(record.otherResolutionType || '');
            $('.date_resolution').val(record.dateResolutionFromTheBoard || '');
            $('.date_resolution_rd').val(record.dateResolutionFromTheRDForTransfer || '');
        }

        function buildPayload() {
            var fallbackFullName = buildNameFromParts(currentRecord || {});
            var resolvedFullName = toSafeString(currentRecord.fullName) || fallbackFullName;

            return $.extend({}, currentRecord, {
                type: 'SC_PPI_SUP',
                docketNumber: $('.docket_num_update').val() || toSafeString(currentRecord.docketNumber),
                fieldOfficeId: officeId,
                clientType: toSafeString(currentRecord.clientType) || $('.client_type_update').val(),
                clientId: toSafeString(currentRecord.clientId),
                firstName: toSafeString(currentRecord.firstName),
                middleName: toSafeString(currentRecord.middleName),
                lastName: toSafeString(currentRecord.lastName),
                suffixName: toSafeString(currentRecord.suffixName),
                fullName: resolvedFullName,
                caseClassification: $('.case_classification').val() || '',
                receivedDateByPPO: $('.date_received_by_ppo').val() || '',
                supervisingOfficer: $('.sup_officer').val() || '',
                supervisionStartDate: $('.sup_start_date').val() || '',
                supervisionEndDate: $('.sup_end_date').val() || '',
                officeFindingsForActedUpon: $('.office_findings').val() || '',
                specifyOtherSubmittedReports: $('.specify_report').val() || '',
                dateReportSubmittedToTheBoard: $('.date_submitted_board').val() || '',
                dateReportSubmittedToRDForTransferToOtherPPO: $('.date_submitted_regional_dir').val() || '',
                resolutionType: $('.board_resolution').val() || '',
                otherResolutionType: $('.specify_resolution').val() || '',
                dateResolutionFromTheBoard: $('.date_resolution').val() || '',
                dateResolutionFromTheRDForTransfer: $('.date_resolution_rd').val() || ''
            });
        }

        function loadRecord() {
            var req = __executeExternalGet('8000/docketbook/' + docketNumber + '/' + officeId);
            req.always(function () {
                $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            });
            req.done(function (result) {
                if (!result || result.status === 'ERROR' || !result.response) {
                    scUpdateLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    $('#update_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }

                var row = result.response;
                if (row.status === 'ERROR') {
                    scUpdateLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    $('#update_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }

                scUpdateLoaded = true;
                currentRecord = row;
                $('#update_form_error').hide().empty();

                try {
                    fillForm(currentRecord);
                    revealFormControls();
                } catch (e) {
                    scUpdateLoaded = false;
                    $('#update_form_error').text('The docket loaded but the form could not be filled. Refresh the page.').show();
                }
            });
        }

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm').prop('disabled', true);

        $(document).on('click.scPprSupUpdate', '.btn-confirm', function (e) {
            e.preventDefault();
            if (linkInvalidMessage || !scUpdateLoaded || scUpdateSubmitting || currentRecord == null) {
                if (!scUpdateLoaded && !linkInvalidMessage) {
                    $('#update_form_error').text('Docket data is not ready. Wait for the form to finish loading.').show();
                }
                return;
            }

            scUpdateSubmitting = true;
            setConfirmBusy(true);
            $('#update_form_error').hide().empty();
            $('#success').hide();

            var payload = buildPayload();
            __executeExternalPost(
                '8000/docketbook/update/' + docketNumber + '/' + officeId,
                payload
            ).done(function (result) {
                if (result && result.status !== 'ERROR') {
                    $('#update_form_error').hide().empty();
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href = joinApiUrl(api, 'pis/parole-pardon-supervision');
                    }, 2000);
                } else {
                    $('#success').hide();
                    $('#update_form_error').text('Update could not be saved. Please try again.').show();
                    scUpdateSubmitting = false;
                    setConfirmBusy(false);
                }
            });
        });

        if (linkInvalidMessage) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            $('#success').hide();
            $('#update_form_error').text(linkInvalidMessage).show();
        } else {
            loadRecord();
        }
    });
})(jQuery);
