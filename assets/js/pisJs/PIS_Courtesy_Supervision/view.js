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

    function formatClientDisplayName(r) {
        if (!r) {
            return '';
        }
        if (r.fullName != null && String(r.fullName).trim() !== '') {
            return String(r.fullName).trim();
        }
        var parts = [r.firstName, r.middleName, r.lastName, r.suffixName].filter(function (p) {
            return p != null && String(p).trim() !== '';
        });
        if (parts.length) {
            return parts.map(function (p) { return String(p).trim(); }).join(' ');
        }
        return 'N/A';
    }

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

        $('.client').val(formatClientDisplayName(data));
    }

    function loadCourtesySupervisionDocket(docket_number, officeId) {
        $.ajax({
            method: 'GET',
            url: joinApiUrl(api, '8000/docketbook/' + encodeURIComponent(docket_number) + '/' + encodeURIComponent(officeId)),
            dataType: 'json',
            timeout: 90000
        })
            .always(function () {
                $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            })
            .done(function (res) {
                if (res.status === 'ERROR') {
                    $('#view_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }
                var data = res.response;
                if (!data || data.status === 'ERROR') {
                    $('#view_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }
                $('#view_form_error').hide().empty();
                try {
                    populateForm(data);
                } catch (e) {
                    $('#view_form_error').text('The docket loaded but the form could not be filled. Refresh the page.').show();
                }
            })
            .fail(function () {
                $('#view_form_error').text('Could not load this docket. Check your connection and try again.').show();
            });
    }

    $(function () {
        var docket_number = getUrlParam('docket_number');
        if (docket_number !== undefined && docket_number !== null) {
            docket_number = String(docket_number).trim();
        }
        var officeId = getUrlParam('officeId') || $.cookie('field_office_id');
        if (officeId) {
            officeId = String(officeId).trim();
        }

        var linkInvalidMessage = null;
        if (docket_number === undefined || docket_number === null || docket_number === '') {
            linkInvalidMessage = 'This page is missing a docket number. Open View from the Courtesy Supervision list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        if (linkInvalidMessage) {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
            $('#view_form_error').text(linkInvalidMessage).show();
            return;
        }

        $('.ref_office').empty().append("<option value=''>—</option>");
        $.ajax({
            method: 'GET',
            url: joinApiUrl(api, '8088/department/list'),
            dataType: 'json',
            timeout: 90000
        }).done(function (result) {
            var list = Array.isArray(result) ? result : (result && (result.content || result.data)) || [];
            if (result && result.status !== 'ERROR' && list.length) {
                $('.ref_office').empty().append("<option value=''>Select Referring Office</option>");
                list.forEach(function (d) {
                    $('.ref_office').append("<option value='" + d.id + "'>" + d.name + '</option>');
                });
            }
            loadCourtesySupervisionDocket(docket_number, officeId);
        }).fail(function () {
            loadCourtesySupervisionDocket(docket_number, officeId);
        });
    });

})(jQuery);
