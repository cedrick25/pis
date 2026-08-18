(function ($) {
    var ___ctx = localStorage.getItem('api');

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
                d.resolve({ status: 'ERROR', message: errorThrown || textStatus });
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

    var $select2Fields = $(
        '.plea_bargain, .ppo_recommendation, .transfer_to, .not_acted_decision, .court_decision_t4'
    );

    function __initSelect2() {
        $select2Fields.select2({
            width: '100%'
        });
    }

    function lockFormForViewing() {
        $('.card-body').find('input, select, button').prop('disabled', true);
        $select2Fields.trigger('change.select2');
    }

    function __selectFieldOffice() {
        return __executeExternalGet('8088/department/list').done(function (result) {
            if (result && result.status !== 'ERROR' && Array.isArray(result)) {
                result.forEach(function (data) {
                    $('.transfer_to').append(
                        '<option value="' + data.id + '">' + data.name + '</option>'
                    );
                });
            }
        });
    }

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
            'This page is missing a docket number. Use the Investigation Docket list and choose View from there.';
    } else if (!officeId) {
        linkInvalidMessage =
            'Your field office could not be determined (try signing in again or returning to the list).';
    }

    function applyDocketToForm(data) {
        $('.docketNum_update').val(data.docketNumber);
        $('.pb_client').val(formatClientDisplayName(data));

        var pb = data.pleaBargain === true ? 'true' : 'false';
        $('.plea_bargain').val(pb).trigger('change');
        $('.cc_no').val(data.criminalCaseNumber);
        $('.court_origin').val(data.courtOfOrigin);
        $('.offense').val(data.offense);
        $('.sentence').val(data.sentence);
        $('.cod').val(data.courtOrderDate);
        $('.rd').val(data.receivedDateByPPO);
        $('.inv_off').val(data.investigatingOfficer);

        $('.psir_date').val(data.psirDate);
        $('.ppo_recommendation').val(data.ppoRecommendation).trigger('change');
        $('.manifestation_date').val(data.manifestationDate);
        $('.transfer_date').val(data.dateOfTransfer);
        if (data.transferredOfficeId != null && data.transferredOfficeId !== '') {
            var transferredOfficeIdStr = String(data.transferredOfficeId);
            if ($('.transfer_to option[value="' + transferredOfficeIdStr + '"]').length === 0) {
                $('.transfer_to').append(
                    '<option value="' +
                        transferredOfficeIdStr +
                        '">Office #' +
                        transferredOfficeIdStr +
                        '</option>'
                );
            }
            $('.transfer_to').val(transferredOfficeIdStr).trigger('change');
        } else {
            $('.transfer_to').val('').trigger('change');
        }

        var typeOfReferrals = data.typeOfReferrals ?? '';
        $('.not_acted_decision').val(typeOfReferrals).trigger('change');
        $('.date_order_received').val(data.referralsNotActedUponDateOrderReceived);

        $('.alias_t4').val(data.alias);
        $('.court_decision_t4').val(data.courtDecision);
        $('.reason_for_denial_t4').val(data.reasonForDenialDismissal);
        $('.other_type_of_decision_t4').val(data.specifyOtherTypeOfDecision);
        $('.date_order_received_court_t4').val(data.dateOrderReceivedFromTheCourt);
    }

    function loadInvestigationDocket() {
        var req = __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId);
        req.always(function () {
            $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
        });
        req.done(function (apiResult) {
            if (!apiResult || apiResult.status === 'ERROR') {
                $('#view_form_error')
                    .text('Could not load this docket. You can return to the list and try again.')
                    .show();
                return;
            }
            var data = apiResult.response;
            if (!data || data.status === 'ERROR') {
                $('#view_form_error')
                    .text('Could not load this docket. You can return to the list and try again.')
                    .show();
                return;
            }
            $('#view_form_error').hide().empty();
            try {
                applyDocketToForm(data);
            } catch (e) {
                $('#view_form_error')
                    .text('The docket loaded but the form could not be filled. Refresh the page.')
                    .show();
            }
        });
        return req;
    }

    if (linkInvalidMessage) {
        $('#spinner_view').addClass('is-hidden').attr('aria-busy', 'false');
        $('#view_form_error').text(linkInvalidMessage).show();
        __initSelect2();
        lockFormForViewing();
        return;
    }

    __selectFieldOffice().always(function () {
        __initSelect2();
        loadInvestigationDocket().always(function () {
            lockFormForViewing();
        });
    });
})(jQuery);
