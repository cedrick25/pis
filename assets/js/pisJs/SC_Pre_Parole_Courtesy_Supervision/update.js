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

    var __getContext = function () {
        return localStorage.getItem('api') || '';
    };

    var __buildUrl = function (path) {
        if (/^https?:\/\//i.test(path)) {
            return path;
        }
        return __getContext() + path;
    };

    var __executeExternalGet = function (path, customLoader) {
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).removeClass('is-hidden').attr('aria-busy', 'true');
        }
        $.ajax({
            method: 'GET',
            url: __buildUrl(path),
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
                message: errorThrown || textStatus || jqXHR
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
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus || jqXHR
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
        if (value == null) {
            return '';
        }
        var normalized = String(value).trim();
        if (normalized.toLowerCase() === 'null' || normalized.toLowerCase() === 'undefined') {
            return '';
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
            return part !== '';
        }).join(' ');
    }

    function hasNameParts(record) {
        return (
            toSafeString(record.firstName) !== '' ||
            toSafeString(record.middleName) !== '' ||
            toSafeString(record.lastName) !== '' ||
            toSafeString(record.suffixName) !== ''
        );
    }

    function resolveClientDisplayName(record) {
        var fullName = toSafeString(record.fullName);
        var partsName = buildNameFromParts(record);
        var withParts = hasNameParts(record);

        if (fullName === '') {
            return partsName;
        }

        if (!withParts) {
            return fullName;
        }

        return fullName;
    }

    function setOfficeSelection($element, officeId, officeName) {
        var idValue = toSafeString(officeId);
        var textValue = toSafeString(officeName);

        if (idValue !== '' && $element.find("option[value='" + idValue + "']").length) {
            $element.val(idValue).trigger('change');
            return;
        }

        if (textValue !== '') {
            var $existing = $element.find('option').filter(function () {
                return $(this).text().trim() === textValue;
            });

            if ($existing.length) {
                $existing.prop('selected', true);
                $element.trigger('change');
            } else {
                $element.append('<option value="' + textValue + '" selected>' + textValue + '</option>').trigger('change');
            }
        }
    }

    function fillForm(record) {
        $('.client_type_update').val(record.clientType || '').trigger('change');
        $('.docket_num_update').val(record.docketNumber || '');
        $('.cc_num').val(record.criminalCaseNumber || '');
        $('.court_origin').val(record.courtOfOrigin || '');
        $('.date_received_from_ppo').val(record.receivedDateByPPO || '');
        $('.sup_officer').val(record.supervisingOfficer || '');
        $('.period_cs_sup').val(record.periodOfCourtesySupervision || '');
        $('.case_classification').val(record.caseClassification || '').trigger('change');
        $('.date_returned').val(record.dateReturned || '');
        $('.client_update').val(resolveClientDisplayName(record));

        var $officeFields = $('.ref_office');
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
        var selectedLabel = toSafeString($element.find('option:selected').text());

        if (selectedValue === '' || selectedValue.toLowerCase() === 'select') {
            selectedValue = toSafeString(fallbackValue);
        }
        if (
            selectedLabel === '' ||
            selectedLabel.toLowerCase() === 'select field office' ||
            selectedLabel.toLowerCase() === 'please choose'
        ) {
            selectedLabel = toSafeString(fallbackLabel);
        }

        return {
            value: selectedValue,
            label: selectedLabel
        };
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

    function revealFormControls() {
        $('.card-body').find('input, select, button').prop('disabled', false);
        $('.btn-confirm_update').prop('disabled', false);
        $('.docket_num_update').prop('disabled', true);
        $('.client_update').prop('readonly', true);
    }

    function clearFieldValidation() {
        $('.client_type_update, .ref_office').removeClass('is-invalid');
        $('#fb_client_type, #fb_ref_office').hide().text('');
    }

    function setFieldInvalid($el, $fb, msg) {
        $el.addClass('is-invalid');
        if ($fb && $fb.length) {
            $fb.text(msg).show();
        }
    }

    function validateBeforeSubmit() {
        clearFieldValidation();
        var ok = true;
        var clientType = toSafeString($('.client_type_update').val());
        if (clientType === '') {
            setFieldInvalid($('.client_type_update'), $('#fb_client_type'), 'Please select a client type.');
            ok = false;
        }

        var $ref = $('.ref_office').eq(0);
        var refVal = toSafeString($ref.val());
        var refLabel = toSafeString($ref.find('option:selected').text()).toLowerCase();
        if (
            refVal === '' ||
            refLabel === 'please choose' ||
            refLabel === 'select field office' ||
            refLabel === 'select'
        ) {
            setFieldInvalid($ref, $('#fb_ref_office'), 'Please choose a referring office.');
            ok = false;
        }

        return ok;
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
                'This page is missing a docket number. Open Update from the Courtesy Supervision list.';
        } else if (!officeId) {
            linkInvalidMessage =
                'Your field office could not be determined. Try signing in again or return to the list.';
        }

        var currentRecord = null;
        var formLoaded = false;
        var submitting = false;

        function buildPayload() {
            var $officeFields = $('.ref_office');
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
                type: currentRecord.type || 'SC_PPI_CSUP',
                docketNumber: $('.docket_num_update').val() || toSafeString(currentRecord.docketNumber),
                fieldOfficeId: officeId || toSafeString(currentRecord.fieldOfficeId),
                clientType: $('.client_type_update').val() || toSafeString(currentRecord.clientType),
                clientId: toSafeString(currentRecord.clientId),
                firstName: toSafeString(currentRecord.firstName),
                middleName: toSafeString(currentRecord.middleName),
                lastName: toSafeString(currentRecord.lastName),
                suffixName: toSafeString(currentRecord.suffixName),
                fullName: resolvedFullName,
                criminalCaseNumber: $('.cc_num').val() || toSafeString(currentRecord.criminalCaseNumber),
                courtOfOrigin: $('.court_origin').val() || toSafeString(currentRecord.courtOfOrigin),
                caseClassification: $('.case_classification').val() || '',
                receivedDateByPPO: $('.date_received_from_ppo').val() || '',
                supervisingOfficer: $('.sup_officer').val() || '',
                periodOfCourtesySupervision: $('.period_cs_sup').val() || '',
                dateReturned: $('.date_returned').val() || '',
                referringOfficeCourtesySup: receivedOffice.label || '',
                referringOfficeCourtesySupId: receivedOffice.value || '',
                referringOfficeId: terminatedOffice.value || receivedOffice.value || ''
            });
        }

        function __selectFieldOffice() {
            $('.ref_office')
                .empty()
                .append('<option value="" selected disabled>Please Choose</option>');
            return __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status !== 'ERROR' && Array.isArray(result)) {
                    result.forEach(function (data) {
                        $('.ref_office').append('<option value="' + data.id + '">' + data.name + '</option>');
                    });
                }
            });
        }

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
                    showFormError('Could not load this docket. Return to the list and try again.');
                    showPisToast('Could not load this docket.', 'danger');
                    return;
                }

                var result = apiResult.response;
                if (result.status === 'ERROR') {
                    formLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    showFormError('Could not load this docket. Return to the list and try again.');
                    showPisToast('Could not load this docket.', 'danger');
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

        $(document).on('click.scPpcSupUpdate', '.btn-confirm_update', function (e) {
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

            var payload = buildPayload();

            submitting = true;
            setUpdateBusy(true);
            $('#success').hide();

            __executeExternalPost(
                '8000/docketbook/update/' + docket_number + '/' + officeId,
                payload
            ).done(function (result) {
                if (result && result.status !== 'ERROR') {
                    hideFormError();
                    clearFieldValidation();
                    $('#success').show();
                    showPisToast('Record updated successfully.', 'success');
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href = joinApiUrl(
                            localStorage.getItem('api') || '',
                            'pis/parole-pardon-courtesy-supervision-list'
                        );
                    }, 2000);
                } else {
                    $('#success').hide();
                    showFormError('Update could not be saved. Please try again.');
                    showPisToast('Update could not be saved.', 'danger');
                    submitting = false;
                    setUpdateBusy(false);
                }
            });
        });

        $(document).on('change input', '.client_type_update, .ref_office', function () {
            if ($(this).hasClass('is-invalid')) {
                $(this).removeClass('is-invalid');
            }
            var id = $(this).attr('id');
            if (id === 'sc_ppcsup_update_client_type') {
                $('#fb_client_type').hide().text('');
            }
            if (id === 'sc_ppcsup_update_ref_office_primary') {
                $('#fb_ref_office').hide().text('');
            }
        });

        if (linkInvalidMessage) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            $('#success').hide();
            showFormError(linkInvalidMessage);
            showPisToast(linkInvalidMessage, 'warning');
        } else {
            __selectFieldOffice().always(function () {
                loadDocketRecord();
            });
        }
    });
})(jQuery);
