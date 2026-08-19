(function ($) {
    var FILE_TYPE = 'investigation';
    var LOADER_ID = 'pis_inv_attachments_loader';
    var TABLE_SEL = '#tblPisInvestigationUploads';

    function resolveApiBase() {
        var raw = localStorage.getItem('api');
        if (raw != null && String(raw).trim() !== '') {
            return String(raw).trim();
        }
        if (typeof window.__PIS_API_BASE === 'string' && String(window.__PIS_API_BASE).trim() !== '') {
            return String(window.__PIS_API_BASE).trim();
        }
        return '';
    }

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

    function escAttr(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }

    function fileServiceHref(pathAfterPort) {
        var tail = String(pathAfterPort || '').replace(/^\/+/, '');
        return escAttr(joinApiUrl(resolveApiBase(), tail));
    }

    function formatClientErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
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

    function formatUserFullName(r) {
        if (!r) {
            return '';
        }
        var parts = [r.firstName, r.middleName, r.lastName, r.suffix || r.suffixName].filter(function (p) {
            return p != null && String(p).trim() !== '';
        });
        return parts.join(' ');
    }

    function formatDocketClientName(r) {
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
            return parts
                .map(function (p) {
                    return String(p).trim();
                })
                .join(' ');
        }
        return '';
    }

    function showAttachmentsError(msg) {
        $('#attachments_error').text(msg).show();
        $('#success_upload').hide();
    }

    function hideAttachmentsError() {
        $('#attachments_error').hide().empty();
    }

    function setPageLoader(busy) {
        var $el = $('#' + LOADER_ID);
        if (!$el.length) {
            return;
        }
        if (busy) {
            $el.removeClass('is-hidden').attr('aria-busy', 'true');
        } else {
            $el.addClass('is-hidden').attr('aria-busy', 'false');
        }
    }

    function setConfirmBusy(busy) {
        var $btn = $('.btn-confirm');
        if (busy) {
            if ($btn.data('pisinv-att-orig-html') === undefined) {
                $btn.data('pisinv-att-orig-html', $btn.html());
            }
            $btn.prop('disabled', true).attr('aria-busy', 'true');
            $btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Uploading…');
        } else {
            $btn.prop('disabled', false).attr('aria-busy', 'false');
            var orig = $btn.data('pisinv-att-orig-html');
            if (orig !== undefined) {
                $btn.html(orig);
            } else {
                $btn.text('Confirm');
            }
        }
    }

    var __executeExternalGet = function (path, customLoader) {
        path = joinApiUrl(resolveApiBase(), path);
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
            cache: false,
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
                var msg = '';
                if (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    msg = jqXHR.responseJSON.message;
                } else if (typeof errorThrown === 'string' && errorThrown && errorThrown !== 'error') {
                    msg = errorThrown;
                } else if (textStatus && textStatus !== 'error') {
                    msg = textStatus;
                }
                d.resolve({ status: 'ERROR', message: msg });
            });
        return d.promise();
    };

    function resolveAttachmentsOfficeId() {
        if (window.PisDocketOfficeFilter && typeof window.PisDocketOfficeFilter.resolvePageOfficeId === 'function') {
            var fromFilter = window.PisDocketOfficeFilter.resolvePageOfficeId();
            if (fromFilter != null && String(fromFilter).trim() !== '') {
                return String(fromFilter).trim();
            }
        }
        var fromUrl = GetURLParameter('officeId') || GetURLParameter('office_id') || GetURLParameter('fi');
        if (fromUrl != null && String(fromUrl).trim() !== '') {
            return String(fromUrl).trim();
        }
        var cookieOffice = $.cookie('field_office_id');
        return cookieOffice != null && String(cookieOffice).trim() !== '' ? String(cookieOffice).trim() : '';
    }

    var docket_number = GetURLParameter('docket_number');
    if (docket_number !== undefined && docket_number !== null) {
        docket_number = String(docket_number).trim();
    }
    var fi = resolveAttachmentsOfficeId();

    var dataTable = null;

    function refreshTypeSelect2Ui($t) {
        try {
            if ($t.data('select2')) {
                $t.trigger('change.select2');
            }
        } catch (e) {
            /* optional */
        }
    }

    function populateInvestigationTypeOptions(cmisVal) {
        var $t = $('.type');
        $t.empty();
        hideAttachmentsError();

        if (!cmisVal || cmisVal === 'none') {
            $t.append('<option value="none" disabled selected>Select</option>');
            $t.trigger('change');
            refreshTypeSelect2Ui($t);
            return;
        }

        if (cmisVal === 'F5T2RR') {
            $t.append(
                '<option value="" disabled selected>Select</option>' +
                    '<option value="Order to Conduct PSI">Order to Conduct PSI</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
            );
        } else if (cmisVal === 'F5T2_RAU') {
            $t.append(
                '<option value="" disabled selected>Select</option>' +
                    '<option value="Post-Sentence Investigation Report">Post-Sentence Investigation Report</option>' +
                    '<option value="Manifestation">Manifestation</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
            );
        } else if (cmisVal === 'F5T2_warant' || cmisVal === 'F5T2_recall') {
            $t.append(
                '<option value="" selected>Select</option>' +
                    '<option value="Recall">Recall</option>' +
                    '<option value="Warrant of Arrest">Warrant of Arrest</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
            );
        } else if (cmisVal === 'F5T4RR') {
            $t.append(
                '<option value="" selected>Select</option>' +
                    '<option value="Order of Grant Probation">Order of Grant Probation</option>' +
                    '<option value="Order of Denial of Probation">Order of Denial of Probation</option>' +
                    '<option value="Order of Dismissal">Order of Dismissal</option>' +
                    '<option value="Order to Withdrawal of Application for Probation">Order to Withdrawal of Application for Probation</option>' +
                    '<option value="Order to Reinvestigate">Order to Reinvestigate</option>' +
                    '<option value="Warrant of Arrest">Warrant of Arrest</option>' +
                    '<option value="Recall Order">Recall Order</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
            );
        } else {
            $t.append('<option value="none" disabled selected>Select</option>');
            var invMsg = 'Invalid Kind selection. Choose a Kind from the list.';
            showAttachmentsError(invMsg);
            showPisToast(invMsg, 'warning');
        }
        $t.trigger('change');
        refreshTypeSelect2Ui($t);
    }

    function bindCmisChange() {
        $('.cmisTable')
            .off('change.pisInvCmis')
            .on('change.pisInvCmis', function () {
                populateInvestigationTypeOptions($(this).val());
            });
    }

    function tableColumns() {
        return [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            { data: 'fileName' },
            { data: 'remarks' },
            {
                data: null,
                render: function (data) {
                    if (!data || data.id == null) {
                        return '';
                    }
                    var id = data.id;
                    var viewHref = fileServiceHref('8080/file/view/' + id);
                    var dlHref = fileServiceHref('8080/file/download/' + id);
                    var idAttr = escAttr(id);
                    return (
                        '<a class="btn btn-primary btn-sm mr-1 mb-1" href="' +
                        viewHref +
                        '" target="_blank" rel="noopener noreferrer">' +
                        '<i class="fa fa-eye" aria-hidden="true"></i> View</a>' +
                        '<a class="btn btn-primary btn-sm mr-1 mb-1" href="' +
                        dlHref +
                        '" target="_blank" rel="noopener noreferrer">' +
                        '<i class="fa fa-download" aria-hidden="true"></i> Download</a>' +
                        '<button type="button" class="btn btn-danger btn-sm btn-delete mb-1" data-id="' +
                        idAttr +
                        '" aria-label="Delete file">' +
                        '<i class="fa fa-trash" aria-hidden="true"></i> Delete</button>'
                    );
                }
            }
        ];
    }

    function loadTable(fileType, uuid, officeId) {
        var listUrl = joinApiUrl(
            resolveApiBase(),
            '8080/file/page/' +
                encodeURIComponent(fileType) +
                '/' +
                encodeURIComponent(uuid) +
                '/' +
                encodeURIComponent(officeId)
        );

        if (!dataTable) {
            dataTable = $(TABLE_SEL).DataTable({
                processing: true,
                serverSide: true,
                scrollX: true,
                searching: false,
                lengthMenu: [10, 25, 50, 100],
                pageLength: 10,
                language: {
                    processing: 'Loading files…'
                },
                columnDefs: [
                    { width: '5%', targets: [0] },
                    { width: '30%', targets: [1] },
                    { width: '40%', targets: [2] },
                    { width: '25%', targets: [3] }
                ],
                ajax: {
                    url: listUrl,
                    type: 'GET',
                    cache: false,
                    data: function (d) {
                        return {
                            page: d.start / d.length,
                            size: d.length
                        };
                    },
                    dataFilter: function (data) {
                        try {
                            var json = jQuery.parseJSON(data);
                            if (json.content && Array.isArray(json.content)) {
                                json.content.sort(function (a, b) {
                                    if (a.fileName === b.fileName) {
                                        return (b.version || 0) - (a.version || 0);
                                    }
                                    return String(a.fileName || '').localeCompare(String(b.fileName || ''));
                                });
                            }
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content || [];
                            return JSON.stringify(json);
                        } catch (e) {
                            return JSON.stringify({
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            });
                        }
                    },
                    error: function () {
                        var msg =
                            'Could not load the file list. Refresh the page or try again.';
                        showAttachmentsError(msg);
                        showPisToast(msg, 'danger');
                    }
                },
                columns: tableColumns()
            });
        } else {
            dataTable.ajax.url(listUrl).load();
        }
    }

    function bindDeleteHandler() {
        $(document)
            .off('click.pisInvViewAttDel', TABLE_SEL + ' .btn-delete')
            .on('click.pisInvViewAttDel', TABLE_SEL + ' .btn-delete', function () {
                var fileId = $(this).data('id');
                if (fileId === undefined || fileId === null || fileId === '') {
                    return;
                }
                if (!window.confirm('Are you sure you want to delete this file?')) {
                    return;
                }
                var $btn = $(this);
                $btn.prop('disabled', true);
                __executeExternalGet('8080/file/delete/' + fileId).done(function (res) {
                    if (res.status !== 'ERROR') {
                        hideAttachmentsError();
                        $('#success_upload')
                            .html('<i class="fa fa-check" aria-hidden="true"></i> File deleted. Refreshing…')
                            .show();
                        showPisToast('File deleted.', 'success');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 800);
                    } else {
                        $btn.prop('disabled', false);
                        var msg = formatClientErrorMessage(
                            res && res.message,
                            'Could not delete the file. Please try again.'
                        );
                        showAttachmentsError(msg);
                        showPisToast(msg, 'danger');
                    }
                });
            });
    }

    function bindUploadConfirm(officeId, createdByName, docketRow) {
        $('.btn-confirm')
            .off('click.pisInvViewAttUp')
            .on('click.pisInvViewAttUp', function () {
                hideAttachmentsError();

                var kind = $('.cmisTable').val();
                var docType = $('.type').val();
                if (!kind || kind === 'none') {
                    showAttachmentsError('Please select a Kind.');
                    showPisToast('Please select a Kind.', 'warning');
                    return;
                }
                if (!docType || docType === 'none' || docType === '') {
                    showAttachmentsError('Please select a Type.');
                    showPisToast('Please select a Type.', 'warning');
                    return;
                }

                var fileInput = document.getElementById('fileupload');
                var fileToUpload = fileInput && fileInput.files ? fileInput.files[0] : null;
                if (!fileToUpload) {
                    showAttachmentsError('Please choose a file before uploading.');
                    showPisToast('Please choose a file before uploading.', 'warning');
                    return;
                }

                setConfirmBusy(true);

                var form = new FormData();
                form.append('file', fileToUpload, fileToUpload.name);

                var uploadUrl = joinApiUrl(resolveApiBase(), '8080/file/upload?' + $.param({
                    uuid: docketRow.docketNumber,
                    type: FILE_TYPE,
                    createdby: createdByName,
                    version: 0,
                    kind: kind,
                    officeId: officeId,
                    remarks: docType
                }));

                $.ajax({
                    url: uploadUrl,
                    method: 'POST',
                    timeout: 0,
                    processData: false,
                    contentType: false,
                    data: form
                })
                    .done(function (response) {
                        if (response && response.status === 'ERROR') {
                            var upMsg = formatClientErrorMessage(
                                response.message,
                                'Upload failed. Please try again.'
                            );
                            showAttachmentsError(upMsg);
                            showPisToast(upMsg, 'danger');
                            setConfirmBusy(false);
                            return;
                        }
                        $('#success_upload')
                            .html('<i class="fa fa-check" aria-hidden="true"></i> Successfully uploaded.')
                            .show();
                        showPisToast('Successfully uploaded.', 'success');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 1000);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        var failMsg = formatClientErrorMessage(
                            typeof errorThrown === 'string' ? errorThrown : textStatus,
                            'Upload could not be completed. Check your connection and try again.'
                        );
                        showAttachmentsError(failMsg);
                        showPisToast(failMsg, 'danger');
                        setConfirmBusy(false);
                    });
            });
    }

    function startPage() {
        hideAttachmentsError();
        setPageLoader(true);
        $('.btn-confirm').prop('disabled', true);

        if (!docket_number) {
            setPageLoader(false);
            var m1 =
                'This page is missing a docket number. Open attachments from the Investigation Docket list.';
            showAttachmentsError(m1);
            showPisToast(m1, 'warning');
            return;
        }
        if (!fi) {
            setPageLoader(false);
            var m2 =
                'This page is missing a field office. Open attachments from the Investigation Docket list.';
            showAttachmentsError(m2);
            showPisToast(m2, 'warning');
            return;
        }
        if (!resolveApiBase()) {
            setPageLoader(false);
            var m3 = 'Could not resolve the application API base URL. Please refresh the page.';
            showAttachmentsError(m3);
            showPisToast(m3, 'warning');
            return;
        }

        var userUuid = $.cookie('uuid');
        if (!userUuid) {
            setPageLoader(false);
            var m4 = 'Your session is missing user id. Try signing in again.';
            showAttachmentsError(m4);
            showPisToast(m4, 'warning');
            return;
        }

        __executeExternalGet('8088/user/' + userUuid).done(function (userProfile) {
            if (!userProfile || userProfile.status === 'ERROR') {
                setPageLoader(false);
                var umsg = formatClientErrorMessage(
                    userProfile && userProfile.message,
                    'Could not load your user profile. Please try again.'
                );
                showAttachmentsError(umsg);
                showPisToast(umsg, 'danger');
                return;
            }

            var createdByName = formatUserFullName(userProfile);

            __executeExternalGet(
                '8000/docketbook/' + encodeURIComponent(docket_number) + '/' + encodeURIComponent(fi)
            ).done(function (apiResult) {
                setPageLoader(false);

                var docketRow = apiResult.response;
                if (apiResult.status === 'ERROR' || !docketRow || docketRow.status === 'ERROR') {
                    var dmsg = 'Could not load this docket. Return to the list and try again.';
                    if (apiResult.status === 'ERROR') {
                        dmsg = formatClientErrorMessage(apiResult.message, dmsg);
                    } else if (docketRow && docketRow.status === 'ERROR' && docketRow.message) {
                        dmsg = formatClientErrorMessage(docketRow.message, dmsg);
                    }
                    showAttachmentsError(dmsg);
                    showPisToast(dmsg, 'danger');
                    return;
                }

                hideAttachmentsError();
                $('.name').val(formatDocketClientName(docketRow));
                $('.docket_num').val(docketRow.docketNumber || '');

                var docketOfficeId = docketRow.fieldOfficeId || fi;
                bindDeleteHandler();
                loadTable(FILE_TYPE, docketRow.docketNumber, docketOfficeId);
                bindUploadConfirm(docketOfficeId, createdByName, docketRow);
                $('.btn-confirm').prop('disabled', false);
            });
        });
    }

    $(function () {
        $('.btn-confirm').prop('disabled', true);
        bindCmisChange();
        populateInvestigationTypeOptions($('.cmisTable').val());
        startPage();
    });
})(jQuery);
