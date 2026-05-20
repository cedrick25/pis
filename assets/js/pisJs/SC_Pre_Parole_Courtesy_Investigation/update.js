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

    var api = localStorage.getItem('api');
    var ___ctx = api;

    var __getContext = function () {
        return ___ctx;
    };

    var __buildUrl = function (path) {
        if (/^https?:\/\//i.test(path)) return path;
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

    function buildFullName(firstName, middleName, lastName, suffixName) {
        return [firstName, middleName, lastName, suffixName].filter(function (v) {
            return !!v;
        }).join(' ').trim();
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
            linkInvalidMessage = 'This page is missing a docket number. Open Update from the Courtesy Investigation list.';
        } else if (!officeId) {
            linkInvalidMessage = 'Your field office could not be determined. Try signing in again or return to the list.';
        }

        var currentRecord = null;
        var formLoaded = false;
        var submitting = false;

        function hideFormError() {
            $('#update_form_error').hide().empty();
        }

        function showFormError(msg) {
            $('#update_form_error').text(msg).show();
        }

        function setConfirmBusy(busy) {
            var $btn = $('.btn-confirm');
            if (busy) {
                if ($btn.data('cinv-orig-html') === undefined) {
                    $btn.data('cinv-orig-html', $btn.html());
                }
                $btn.prop('disabled', true).attr('aria-busy', 'true');
                $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Saving…');
            } else {
                $btn.prop('disabled', false).attr('aria-busy', 'false');
                var orig = $btn.data('cinv-orig-html');
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

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm').prop('disabled', true);

        var __selectFieldOffice = function () {
            $('.ref_office').empty().append('<option value="" selected disabled>Please Choose</option>');
            return __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status !== 'ERROR' && Array.isArray(result)) {
                    result.forEach(function (data) {
                        $('.ref_office').append('<option value="' + data.id + '">' + data.name + '</option>');
                    });
                }
            });
        };

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
                    return;
                }

                var result = apiResult.response;
                if (result.status === 'ERROR') {
                    formLoaded = false;
                    currentRecord = null;
                    $('#success').hide();
                    showFormError('Could not load this docket. Return to the list and try again.');
                    return;
                }

                currentRecord = result;
                formLoaded = true;
                hideFormError();

                var responseFullName = result.fullName || buildFullName(result.firstName, result.middleName, result.lastName, result.suffixName);

                $('.docket_num_update').val(result.docketNumber || '');
                $('.client_update').val(responseFullName || '');
                $('.date_received_by_ppo').val(result.receivedDateByPPO || '');
                $('.inv_officer').val(result.investigatingOfficer || '');
                $('.reasons').val(result.remarks || result.referralData || '');
                $('.date_completed_and_returned').val(result.dateCICAR || result.dateCompletedAndReturned || '');

                setTimeout(function () {
                    var refOfficeId = result.referringOfficeCourtesyInvId || result.referringOfficeId;
                    var refOfficeName = result.referringOfficeCourtesyInv || result.referringOfficeId || '';

                    if (refOfficeId && $(".ref_office option[value='" + refOfficeId + "']").length) {
                        $('.ref_office').val(refOfficeId).trigger('change');
                    } else if (refOfficeName) {
                        var $opt = $('.ref_office option').filter(function () {
                            return $(this).text().trim() === refOfficeName;
                        });
                        if ($opt.length) {
                            $opt.prop('selected', true).trigger('change');
                        } else {
                            $('.ref_office').append('<option value="' + refOfficeName + '" selected>' + refOfficeName + '</option>').trigger('change');
                        }
                    }
                }, 400);

                try {
                    revealFormControls();
                } catch (e) {
                    formLoaded = false;
                    showFormError('The docket loaded but the form could not be filled. Refresh the page.');
                }
            });
        }

        $(document).on('click.scCinvUpdate', '.btn-confirm', function (e) {
            e.preventDefault();
            if (linkInvalidMessage || !formLoaded || submitting || !currentRecord) {
                if (!formLoaded && !linkInvalidMessage) {
                    showFormError('Docket data is not ready. Wait for the form to finish loading.');
                }
                return;
            }

            hideFormError();

            var referringOfficeSelectedText = $('.ref_office option:selected').text() || currentRecord.referringOfficeCourtesyInv || currentRecord.referringOfficeId || '';
            var referringOfficeSelectedValue = $('.ref_office').val() || currentRecord.referringOfficeCourtesyInvId || currentRecord.referringOfficeId || '';

            var payload = {
                type: currentRecord.type || 'SC_PPI_CSINV',
                docketNumber: $('.docket_num_update').val() || currentRecord.docketNumber || '',
                docketSeries: currentRecord.docketSeries || '',
                caseloadType: currentRecord.caseloadType || '',
                fieldOfficeId: officeId || currentRecord.fieldOfficeId || '',
                clientType: currentRecord.clientType,
                clientId: currentRecord.clientId,
                firstName: currentRecord.firstName,
                middleName: currentRecord.middleName,
                lastName: currentRecord.lastName,
                suffixName: currentRecord.suffixName,
                fullName: currentRecord.fullName,
                isLegalAge: !!currentRecord.isLegalAge,
                pleaBargain: !!currentRecord.pleaBargain,
                caseClassification: currentRecord.caseClassification || '',
                criminalCaseNumber: currentRecord.criminalCaseNumber || '',
                offense: currentRecord.offense || '',
                courtOfOrigin: currentRecord.courtOfOrigin || '',
                isMilitaryCourt: !!currentRecord.isMilitaryCourt,
                courtOrderDate: currentRecord.courtOrderDate || '',
                investigatingOfficer: $('.inv_officer').val() || '',
                receivedDateByPPO: $('.date_received_by_ppo').val() || '',
                sentence: currentRecord.sentence || '',
                manualDocket: typeof currentRecord.manualDocket === 'boolean' ? currentRecord.manualDocket : false,
                referral: typeof currentRecord.referral === 'boolean' ? currentRecord.referral : false,
                referralData: currentRecord.referralData || '',
                remarks: $('.reasons').val() || '',
                probationStartDate: currentRecord.probationStartDate || '',
                probationYear: currentRecord.probationYear || '',
                probationMonth: currentRecord.probationMonth || '',
                probationDay: currentRecord.probationDay || '',
                prisonName: currentRecord.prisonName || '',
                investigationReportSubmittedDate: currentRecord.investigationReportSubmittedDate || '',
                ppoRecommendation: currentRecord.ppoRecommendation || '',
                recommendationState: currentRecord.recommendationState || '',
                dateOfTransfer: currentRecord.dateOfTransfer || '',
                transferredOfficeId: currentRecord.transferredOfficeId || '',
                dateOrderReceivedFromTheBoard: currentRecord.dateOrderReceivedFromTheBoard || '',
                boardOrder: currentRecord.boardOrder || '',
                boardOrderStatus: currentRecord.boardOrderStatus || '',
                referringOfficeId: referringOfficeSelectedValue,
                dateCICAR: $('.date_completed_and_returned').val() || '',
                supervisingOfficer: currentRecord.supervisingOfficer || '',
                supervisionStartDate: currentRecord.supervisionStartDate || '',
                supervisionEndDate: currentRecord.supervisionEndDate || '',
                probationEndDate: currentRecord.probationEndDate || '',
                reportType: currentRecord.reportType || '',
                referralType: currentRecord.referralType || '',
                dateReportSubmittedToTheBoard: currentRecord.dateReportSubmittedToTheBoard || '',
                dateReportSubmittedToRDForTransferToOtherPPO: currentRecord.dateReportSubmittedToRDForTransferToOtherPPO || '',
                resolutionType: currentRecord.resolutionType || '',
                dateResolutionFromTheBoard: currentRecord.dateResolutionFromTheBoard || '',
                dateResolutionFromTheRDForTransfer: currentRecord.dateResolutionFromTheRDForTransfer || '',
                createdBy: currentRecord.createdBy || '',
                updatedBy: currentRecord.updatedBy || '',
                psirDate: currentRecord.psirDate || '',
                manifestationDate: currentRecord.manifestationDate || '',
                typeOfReferrals: currentRecord.typeOfReferrals || '',
                referralsNotActedUponDateOrderReceived: currentRecord.referralsNotActedUponDateOrderReceived || '',
                alias: currentRecord.alias || '',
                courtDecision: currentRecord.courtDecision || '',
                reasonForDenialDismissal: currentRecord.reasonForDenialDismissal || '',
                dateOrderReceivedFromTheCourt: currentRecord.dateOrderReceivedFromTheCourt || '',
                dateCompletedAndReturned: $('.date_completed_and_returned').val() || '',
                officeFindingsForActedUpon: currentRecord.officeFindingsForActedUpon || '',
                officeFindingsForPendingDisposition: currentRecord.officeFindingsForPendingDisposition || '',
                specifyCourtPpoTransferred: currentRecord.specifyCourtPpoTransferred || '',
                specifyOtherReasonsRevocation: currentRecord.specifyOtherReasonsRevocation || '',
                periodOfSupervision: currentRecord.periodOfSupervision || '',
                specifyOtherSubmittedReports: currentRecord.specifyOtherSubmittedReports || '',
                otherResolutionType: currentRecord.otherResolutionType || '',
                periodOfCourtesySupervision: currentRecord.periodOfCourtesySupervision || '',
                dateReturned: currentRecord.dateReturned || '',
                referringOfficeCourtesyInv: referringOfficeSelectedText,
                referringOfficeCourtesyInvId: referringOfficeSelectedValue,
                referringOfficeCourtesySup: currentRecord.referringOfficeCourtesySup || '',
                referringOfficeCourtesySupId: currentRecord.referringOfficeCourtesySupId || '',
                specifyOtherTypeOfDecision: currentRecord.specifyOtherTypeOfDecision || '',
                fromPrisonType: currentRecord.fromPrisonType || ''
            };

            submitting = true;
            setConfirmBusy(true);
            $('#success').hide();

            __executeExternalPost('8000/docketbook/update/' + docket_number + '/' + officeId, payload).done(function (result) {
                if (result && result.status !== 'ERROR') {
                    hideFormError();
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href = joinApiUrl(api || '', 'pis/parole-pardon-courtesy-investigation-list');
                    }, 2000);
                } else {
                    $('#success').hide();
                    showFormError('Update could not be saved. Please try again.');
                    submitting = false;
                    setConfirmBusy(false);
                }
            });
        });

        if (linkInvalidMessage) {
            $('#spinner_update').addClass('is-hidden').attr('aria-busy', 'false');
            $('#success').hide();
            showFormError(linkInvalidMessage);
        } else {
            __selectFieldOffice().always(function () {
                loadDocketRecord();
            });
        }
    });
})(jQuery);
