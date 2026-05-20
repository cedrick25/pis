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
            return parts.map(function (p) { return String(p).trim(); }).join(' ');
        }
        return 'N/A';
    }

    function formatReferringOffice(row) {
        if (!row) {
            return '';
        }
        var name = row.referringOfficeCourtesyInv;
        if (name != null && String(name).trim() !== '') {
            return String(name).trim();
        }
        var id = row.referringOfficeCourtesyInvId || row.referringOfficeId;
        if (id != null && String(id).trim() !== '') {
            return String(id).trim();
        }
        return 'N/A';
    }

    function updateForms(row) {
        $('.docketNum_update').val(row.docketNumber || '');
        $('.pb_client_sup').val(formatClientDisplayName(row));
        $('.referring_office_display').val(formatReferringOffice(row));
        $('.date_received_by_ppo').val(row.receivedDateByPPO || '');
        $('.inv_officer').val(row.investigatingOfficer || '');
        $('.reasons').val(row.remarks || row.referralData || '');
        $('.date_completed_and_returned').val(row.dateCICAR || row.dateCompletedAndReturned || '');
    }

    function loadCourtesyInvestigationDocket(docket_number, officeId) {
        var req = __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId);
        req.always(function () {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
        });
        req.done(function (apiResult) {
            if (apiResult.status === 'ERROR') {
                $('#view_form_error').text('Could not load this docket. Return to the list and try again.').show();
                return;
            }

            var row = apiResult.response;
            if (!row || row.status === 'ERROR') {
                $('#view_form_error').text('Could not load this docket. Return to the list and try again.').show();
                return;
            }

            $('#view_form_error').hide().empty();

            try {
                updateForms(row);
            } catch (e) {
                $('#view_form_error').text('The docket loaded but the form could not be filled. Refresh the page.').show();
            }
        });
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
            linkInvalidMessage = 'This page is missing a docket number. Open View from the Courtesy Investigation list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        if (linkInvalidMessage) {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            $('#view_form_error').text(linkInvalidMessage).show();
        } else {
            loadCourtesyInvestigationDocket(docket_number, officeId);
        }
    });
})(jQuery);
