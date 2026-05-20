(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;

    var __getContext = function () {
        return ___ctx;
    };

    var __executeExternalGet = function (path, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        if (customLoader !== '') {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json'
        }).done(function (data) {
            if (customLoader !== '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader !== '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
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
        linkInvalidMessage = 'This page is missing a docket number. Use the Courtesy Investigation list and choose View from there.';
    } else if (!officeId) {
        linkInvalidMessage = 'Your field office could not be determined (try signing in again or returning to the list).';
    }

    var loadCourtesyInvestigation = function () {
        __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId).done(function (apiResult) {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            var result = apiResult.response;
            if (apiResult.status !== 'ERROR' && result) {
                $('#view_form_error').hide().empty();
                $('.docket_number').val(result.docketNumber || '');
                $('.client').val(formatClientDisplayName(result));

                setTimeout(function () {
                    var refOfficeId = result.referringOfficeCourtesyInvId != null && result.referringOfficeCourtesyInvId !== ''
                        ? result.referringOfficeCourtesyInvId
                        : result.referringOfficeId;
                    var refOfficeNameRaw = result.referringOfficeCourtesyInv
                        || result.referringOfficeName
                        || result.referringOfficeDescription
                        || '';
                    var refOfficeName = String(refOfficeNameRaw).trim();
                    var $opts = $('.ref_office option');
                    var $byId = $opts.filter(function () {
                        return String($(this).val()) === String(refOfficeId == null ? '' : refOfficeId);
                    });
                    if (refOfficeId != null && refOfficeId !== '' && $byId.length) {
                        $('.ref_office').val(String(refOfficeId)).trigger('change');
                    } else if (refOfficeName) {
                        var $opt = $opts.filter(function () {
                            return $(this).text().trim() === refOfficeName;
                        });
                        if ($opt.length) {
                            $opt.prop('selected', true);
                            $('.ref_office').trigger('change');
                        }
                    }
                }, 600);

                $('.date_rcv_from_ppo').val(result.receivedDateByPPO || '');
                $('.inv_officer').val(result.investigatingOfficer || '');
                $('.reasons').val(result.remarks || '');
                $('.date_completed_and_returned').val(result.dateCICAR || result.dateCompletedAndReturned || '');
            } else {
                $('#view_form_error').text('Could not load this docket. You can return to the list and try again.').show();
            }
        });
    };

    if (linkInvalidMessage) {
        $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
        $('#view_form_error').text(linkInvalidMessage).show();
    } else {
        loadCourtesyInvestigation();
    }

})(jQuery);
