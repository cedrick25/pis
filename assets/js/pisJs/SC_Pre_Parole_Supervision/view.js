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

    var __executeExternalGet = function (path) {
        var base = localStorage.getItem('api') || '';
        path = joinApiUrl(base, path);
        var d = $.Deferred();
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
            timeout: 90000
        }).done(function (data) {
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
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

    function fillViewForm(record) {
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

    function loadDocket(docketNumber, officeId) {
        var req = __executeExternalGet('8000/docketbook/' + docketNumber + '/' + officeId);
        req.always(function () {
            $('#sc_ppr_sup_view_loader').addClass('is-hidden').attr('aria-busy', 'false');
        });
        req.done(function (apiResult) {
            if (!apiResult || apiResult.status === 'ERROR') {
                $('#sc_ppr_sup_view_error').text('Could not load this docket. Return to the list and try again.').show();
                return;
            }

            var row = apiResult.response;
            if (!row || row.status === 'ERROR') {
                $('#sc_ppr_sup_view_error').text('Could not load this docket. Return to the list and try again.').show();
                return;
            }

            $('#sc_ppr_sup_view_error').hide().empty();

            try {
                fillViewForm(row);
            } catch (e) {
                $('#sc_ppr_sup_view_error').text('The docket loaded but the form could not be filled. Refresh the page.').show();
            }
        });
    }

    $(function () {
        var docketNumber = GetURLParameter('docket_number');
        if (docketNumber !== undefined && docketNumber !== null) {
            docketNumber = String(docketNumber).trim();
        }
        var officeId = $.cookie('field_office_id');
        if (officeId) {
            officeId = String(officeId).trim();
        }

        var linkInvalidMessage = null;
        if (docketNumber === undefined || docketNumber === null || docketNumber === '') {
            linkInvalidMessage = 'This page is missing a docket number. Open View from the Supervision Docket list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        if (linkInvalidMessage) {
            $('#sc_ppr_sup_view_loader').addClass('is-hidden').attr('aria-busy', 'false');
            $('#sc_ppr_sup_view_error').text(linkInvalidMessage).show();
        } else {
            loadDocket(docketNumber, officeId);
        }
    });
})(jQuery);
