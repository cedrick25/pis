(function ($) {
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

    function fillViewForm(record) {
        $('.ref_office, .case_classification').prop('disabled', false);

        $('.docket_number').val(record.docketNumber || '');
        $('.cc_num').val(record.criminalCaseNumber || '');
        $('.court_origin').val(record.courtOfOrigin || '');
        $('.date_rcv_from_ppo').val(record.receivedDateByPPO || '');
        $('.sup_officer').val(record.supervisingOfficer || '');
        $('.period_supervision').val(record.periodOfCourtesySupervision || '');
        $('.case_classification').val(record.caseClassification || '').trigger('change');
        $('.date_completed_and_returned').val(record.dateReturned || '');
        $('.client').val(resolveClientDisplayName(record));

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

        $('.ref_office, .case_classification').prop('disabled', true).trigger('change');
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
        $('#view_form_error').hide().empty();
    }

    function showFormError(msg) {
        $('#view_form_error').text(msg).show();
    }

    function revealViewControls() {
        $('.card-body').find('input').prop('readonly', true).prop('disabled', false);
        $('.card-body').find('select').prop('disabled', true).trigger('change');
    }

    $(function () {
        var docket_number = GetURLParameter('docket_number');
        if (docket_number !== undefined && docket_number !== null) {
            docket_number = String(docket_number).trim();
        }
        var officeId = $.cookie('field_office_id');
        if (officeId) {
            officeId = String(officeId).trim();
        }

        var linkInvalidMessage = null;
        if (docket_number === undefined || docket_number === null || docket_number === '') {
            linkInvalidMessage =
                'This page is missing a docket number. Open View from the Courtesy Supervision list.';
        } else if (!officeId) {
            linkInvalidMessage =
                'Your field office could not be determined. Try signing in again or return to the list.';
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
                $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            });
            req.done(function (apiResult) {
                if (apiResult.status === 'ERROR' || !apiResult.response) {
                    $('#success').hide();
                    showFormError('Could not load this docket. Return to the list and try again.');
                    showPisToast('Could not load this docket.', 'danger');
                    return;
                }

                var result = apiResult.response;
                if (result.status === 'ERROR') {
                    $('#success').hide();
                    showFormError('Could not load this docket. Return to the list and try again.');
                    showPisToast('Could not load this docket.', 'danger');
                    return;
                }

                hideFormError();

                try {
                    fillViewForm(result);
                    revealViewControls();
                } catch (e) {
                    showFormError('The docket loaded but the form could not be filled. Refresh the page.');
                    showPisToast('Form could not be filled from this docket.', 'danger');
                }
            });
        }

        $('.card-body').find('input, select').prop('disabled', true);
        $('#success').hide();

        if (linkInvalidMessage) {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
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
