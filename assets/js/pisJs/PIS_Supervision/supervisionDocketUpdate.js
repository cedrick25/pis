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
            linkInvalidMessage = 'This page is missing a docket number. Open Update from the Supervision Docket list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        var md;
        var docketData = {};
        var supUpdateLoaded = false;
        var supUpdateSubmitting = false;

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm').prop('disabled', true);

        function setConfirmBusy(busy) {
            var $btn = $('.btn-confirm');
            if (busy) {
                if ($btn.data('sup-orig-html') === undefined) {
                    $btn.data('sup-orig-html', $btn.html());
                }
                $btn.prop('disabled', true).attr('aria-busy', 'true');
                $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
            } else {
                $btn.prop('disabled', false).attr('aria-busy', 'false');
                var orig = $btn.data('sup-orig-html');
                if (orig !== undefined) {
                    $btn.html(orig);
                }
            }
        }

        function revealFormControls() {
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm').prop('disabled', false);
            $('.docketNum_update').prop('disabled', true);
            $('.pb_client_sup').prop('disabled', true);
        }

        function updateForms(row) {
            docketData = row;
            $('.docketNum_update').val(row.docketNumber || '');
            var name;
            if (row.fullName != null && String(row.fullName).trim() !== '') {
                name = String(row.fullName).trim();
            } else {
                name = [row.firstName, row.middleName, row.lastName, row.suffixName]
                    .filter(function (p) { return p != null && String(p).trim() !== ''; })
                    .map(function (p) { return String(p).trim(); })
                    .join(' ');
            }
            $('.pb_client_sup').val(name || '');

            $('.alias').val(row.alias || '');
            $('.referral_type').val(row.referralType || '').trigger('change');
            $('.cc_no').val(row.criminalCaseNumber || '');
            $('.court_origin').val(row.courtOfOrigin || '');
            $('.case_classification').val(row.caseClassification || '').trigger('change');
            $('.date_rcv_ppo').val(row.receivedDateByPPO || '');
            $('.supervising_officer').val(row.supervisingOfficer || '');
            $('.prob_start_date').val(row.probationStartDate || '');
            $('.prob_end_date').val(row.probationEndDate || '');

            $('#casesActedUpon .office_findings').val(row.officeFindingsForActedUpon || '').trigger('change');
            $('#casesActedUpon .other_reasons_of_revocation').val(row.specifyOtherReasonsRevocation || '');
            $('#casesActedUpon .court_probationer_transferred').val(row.specifyCourtPpoTransferred || '');
            $('#casesActedUpon .date_submitted_court').val(
                row.dateOrderReceivedFromTheCourt || row.dateCompletedAndReturned || ''
            );

            $('#carryOver .office_findings').val(row.officeFindingsForPendingDisposition || '').trigger('change');
            $('#carryOver .date_submitted_court').val(row.referralsNotActedUponDateOrderReceived || '');
            $('#carryOver .supervising_officer_carry_over').val(row.supervisingOfficer || '');

            if ($('.sentence').length) {
                $('.sentence').val(row.sentence || '');
            }
        }

        function loadSupervisionDocket() {
            var req = __executeExternalGet('8000/docketbook/' + docket_number + '/' + officeId);
            req.always(function () {
                $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            });
            req.done(function (apiResult) {
                if (apiResult.status === 'ERROR') {
                    supUpdateLoaded = false;
                    docketData = {};
                    $('#success').hide();
                    $('#update_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }

                var row = apiResult.response;
                if (!row || row.status === 'ERROR') {
                    supUpdateLoaded = false;
                    docketData = {};
                    $('#success').hide();
                    $('#update_form_error').text('Could not load this docket. Return to the list and try again.').show();
                    return;
                }

                supUpdateLoaded = true;
                $('#update_form_error').hide().empty();

                md = row.manualDocket === true;
                if (row.manualDocket === false) {
                    $('.manualProbStart, .manualProbYear, .manualProbMonth, .manualProbDay').hide();
                }

                try {
                    updateForms(row);
                    revealFormControls();
                } catch (e) {
                    supUpdateLoaded = false;
                    $('#update_form_error').text('The docket loaded but the form could not be filled. Refresh the page.').show();
                }
            });
        }

        $(document).on('click.supSupUpdate', '.btn-confirm', function (e) {
            e.preventDefault();
            if (linkInvalidMessage || !supUpdateLoaded || supUpdateSubmitting || Object.keys(docketData).length === 0) {
                if (!supUpdateLoaded && !linkInvalidMessage) {
                    $('#update_form_error').text('Docket data is not ready. Wait for the form to finish loading.').show();
                }
                return;
            }

            var sentenceVal = $('.sentence').length ? $('.sentence').val() : (docketData.sentence || '');

            var payload = {
                type: 'PIS_SUP',
                docketNumber: $('.docketNum_update').val() || docket_number,
                docketSeries: docketData.docketSeries || '',
                caseloadType: docketData.caseloadType || '',
                fieldOfficeId: officeId || docketData.fieldOfficeId || '',
                clientType: docketData.clientType || 'PROBATIONER',
                clientId: docketData.clientId || '',
                firstName: docketData.firstName || '',
                middleName: docketData.middleName || '',
                lastName: docketData.lastName || '',
                suffixName: docketData.suffixName || '',
                fullName: docketData.fullName || $('.pb_client_sup').val() || '',
                isLegalAge: docketData.isLegalAge === true,
                pleaBargain: docketData.pleaBargain === true,
                caseClassification: $('.case_classification').val() || docketData.caseClassification || '',
                criminalCaseNumber: $('.cc_no').val() || docketData.criminalCaseNumber || '',
                offense: docketData.offense || '',
                courtOfOrigin: $('.court_origin').val() || docketData.courtOfOrigin || '',
                isMilitaryCourt: docketData.isMilitaryCourt === true,
                courtOrderDate: docketData.courtOrderDate || '',
                investigatingOfficer: docketData.investigatingOfficer || '',
                receivedDateByPPO: $('.date_rcv_ppo').val() || docketData.receivedDateByPPO || '',
                sentence: sentenceVal || '',
                manualDocket: md !== undefined ? md : (docketData.manualDocket === true),
                referral: docketData.referral === true,
                referralData: docketData.referralData || '',
                remarks: docketData.remarks || '',
                probationStartDate: $('.prob_start_date').val() || docketData.probationStartDate || '',
                probationYear: docketData.probationYear || '',
                probationMonth: docketData.probationMonth || '',
                probationDay: docketData.probationDay || '',
                prisonName: docketData.prisonName || '',
                investigationReportSubmittedDate: docketData.investigationReportSubmittedDate || '',
                ppoRecommendation: docketData.ppoRecommendation || '',
                recommendationState: docketData.recommendationState || '',
                dateOfTransfer: docketData.dateOfTransfer || '',
                transferredOfficeId: docketData.transferredOfficeId || '',
                dateOrderReceivedFromTheBoard: docketData.dateOrderReceivedFromTheBoard || '',
                boardOrder: docketData.boardOrder || '',
                boardOrderStatus: docketData.boardOrderStatus || '',
                referringOfficeId: docketData.referringOfficeId || '',
                dateCICAR: docketData.dateCICAR || '',
                supervisingOfficer: $('.supervising_officer').val() || $('#carryOver .supervising_officer_carry_over').val() || docketData.supervisingOfficer || '',
                supervisionStartDate: docketData.supervisionStartDate || '',
                supervisionEndDate: docketData.supervisionEndDate || '',
                probationEndDate: $('.prob_end_date').val() || docketData.probationEndDate || '',
                reportType: docketData.reportType || '',
                referralType: $('.referral_type').val() || docketData.referralType || '',
                dateReportSubmittedToTheBoard: docketData.dateReportSubmittedToTheBoard || '',
                dateReportSubmittedToRDForTransferToOtherPPO: docketData.dateReportSubmittedToRDForTransferToOtherPPO || '',
                resolutionType: docketData.resolutionType || '',
                dateResolutionFromTheBoard: docketData.dateResolutionFromTheBoard || '',
                dateResolutionFromTheRDForTransfer: docketData.dateResolutionFromTheRDForTransfer || '',
                createdBy: docketData.createdBy || '',
                updatedBy: docketData.updatedBy || '',
                psirDate: docketData.psirDate || '',
                manifestationDate: docketData.manifestationDate || '',
                typeOfReferrals: docketData.typeOfReferrals || '',
                referralsNotActedUponDateOrderReceived: $('#carryOver .date_submitted_court').val() || docketData.referralsNotActedUponDateOrderReceived || '',
                alias: $('.alias').val() || docketData.alias || '',
                courtDecision: docketData.courtDecision || '',
                reasonForDenialDismissal: docketData.reasonForDenialDismissal || '',
                dateOrderReceivedFromTheCourt: $('#casesActedUpon .date_submitted_court').val() || docketData.dateOrderReceivedFromTheCourt || '',
                dateCompletedAndReturned: docketData.dateCompletedAndReturned || '',
                officeFindingsForActedUpon: $('#casesActedUpon .office_findings').val() || docketData.officeFindingsForActedUpon || '',
                officeFindingsForPendingDisposition: $('#carryOver .office_findings').val() || docketData.officeFindingsForPendingDisposition || '',
                specifyCourtPpoTransferred: $('#casesActedUpon .court_probationer_transferred').val() || docketData.specifyCourtPpoTransferred || '',
                specifyOtherReasonsRevocation: $('#casesActedUpon .other_reasons_of_revocation').val() || docketData.specifyOtherReasonsRevocation || '',
                periodOfSupervision: docketData.periodOfSupervision || '',
                specifyOtherSubmittedReports: docketData.specifyOtherSubmittedReports || '',
                otherResolutionType: docketData.otherResolutionType || '',
                periodOfCourtesySupervision: docketData.periodOfCourtesySupervision || '',
                dateReturned: docketData.dateReturned || '',
                referringOfficeCourtesyInv: docketData.referringOfficeCourtesyInv || '',
                referringOfficeCourtesyInvId: docketData.referringOfficeCourtesyInvId || '',
                referringOfficeCourtesySup: docketData.referringOfficeCourtesySup || '',
                referringOfficeCourtesySupId: docketData.referringOfficeCourtesySupId || '',
                specifyOtherTypeOfDecision: docketData.specifyOtherTypeOfDecision || '',
                fromPrisonType: docketData.fromPrisonType || ''
            };

            supUpdateSubmitting = true;
            setConfirmBusy(true);
            $('#update_form_error').hide().empty();
            $('#success').hide();

            __executeExternalPost('8000/docketbook/update/' + docket_number + '/' + officeId, payload).done(function (postResult) {
                if (postResult && postResult.status !== 'ERROR') {
                    $('#update_form_error').hide().empty();
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href = joinApiUrl(localStorage.getItem('api') || '', 'pis/supervision_docketing');
                    }, 2000);
                } else {
                    $('#success').hide();
                    $('#update_form_error').text('Update could not be saved. Please try again.').show();
                    supUpdateSubmitting = false;
                    setConfirmBusy(false);
                }
            });
        });

        if (linkInvalidMessage) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            $('#success').hide();
            $('#update_form_error').text(linkInvalidMessage).show();
        } else {
            loadSupervisionDocket();
        }
    });

})(jQuery);
