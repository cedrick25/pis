(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;

    var __getContext = function () {
        return ___ctx;
    };

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
        var base = __getContext() || '';
        var tail = String(pathAfterPort || '').replace(/^\/+/, '');
        return escAttr(joinApiUrl(base, tail));
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
            return parts.map(function (p) { return String(p).trim(); }).join(' ');
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
        var $el = $('#cinv_attachments_loader');
        if (busy) {
            $el.removeClass('is-hidden').attr('aria-busy', 'true');
        } else {
            $el.addClass('is-hidden').attr('aria-busy', 'false');
        }
    }

    var __executeExternalGet = function (path, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if (customLoader !== '') {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json',
            timeout: 90000
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

    var docket_number = GetURLParameter('docket_number');
    if (docket_number !== undefined && docket_number !== null) {
        docket_number = String(docket_number).trim();
    }
    var fi = $.cookie('field_office_id');
    if (fi) {
        fi = String(fi).trim();
    }

    var dataTable = null;

    function bindCmisChange() {
        $('.cmisTable').on('change.courtesyCmis', function () {
            $('.type').empty();
            var value = $(this).val();
            hideAttachmentsError();

            if (value === 'F5T6RR') {
                $('.type').append(
                    '<option value="" disabled selected>Select</option>' +
                    '<option value="Accomplished General Inter-Office Referral">Accomplished General Inter-Office Referral</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
                );
            } else if (value === 'F5T6RCR') {
                $('.type').append(
                    '<option value="" disabled selected>Select</option>' +
                    '<option value="Courtesy Probation Investigation Report">Courtesy Probation Investigation Report</option>' +
                    '<option value="Full Blown Courtesy Investigation">Full Blown Courtesy Investigation</option>' +
                    '<option value="Other Document/s">Other Document/s</option>'
                );
            } else {
                showAttachmentsError('Invalid Kind selection. Choose Referrals Received or Referrals Completed and Returned.');
            }
            $('.type').trigger('change');
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
                    var id = data.id;
                    var viewHref = fileServiceHref('8080/file/view/' + id);
                    var dlHref = fileServiceHref('8080/file/download/' + id);
                    var idAttr = escAttr(id);
                    return (
                        '<a class="btn btn-primary btn-sm mr-1 mb-1" href="' + viewHref + '" target="_blank" rel="noopener noreferrer">' +
                        '<i class="fa fa-eye" aria-hidden="true"></i> View</a>' +
                        '<a class="btn btn-primary btn-sm mr-1 mb-1" href="' + dlHref + '" target="_blank" rel="noopener noreferrer">' +
                        '<i class="fa fa-download" aria-hidden="true"></i> Download</a>' +
                        '<button type="button" class="btn btn-danger btn-sm btn-delete mb-1" data-id="' + idAttr + '">' +
                        '<i class="fa fa-trash" aria-hidden="true"></i> Delete</button>'
                    );
                }
            }
        ];
    }

    function loadTable(fileType, uuid, officeId) {
        var listUrl = joinApiUrl(
            api,
            '8080/file/page/' + fileType + '/' + encodeURIComponent(uuid) + '/' + encodeURIComponent(officeId)
        );

        if (!dataTable) {
            dataTable = $('.table_head').DataTable({
                processing: true,
                serverSide: true,
                scrollX: false,
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
                    cache: true,
                    data: function (d) {
                        return {
                            page: d.start / d.length,
                            size: d.length
                        };
                    },
                    dataFilter: function (data) {
                        var json = jQuery.parseJSON(data);
                        json.recordsTotal = json.totalElements;
                        json.recordsFiltered = json.totalElements;
                        json.data = json.content;
                        return JSON.stringify(json);
                    }
                },
                columns: tableColumns()
            });
        } else {
            dataTable.ajax.url(listUrl).load();
        }
    }

    $(document).on('click.courtesyAttDel', '.table_head .btn-delete', function () {
        var fileId = $(this).data('id');
        if (fileId === undefined || fileId === null || fileId === '') {
            return;
        }
        if (!window.confirm('Are you sure you want to delete this file?')) {
            return;
        }
        __executeExternalGet('8080/file/delete/' + fileId).done(function (res) {
            if (res.status !== 'ERROR') {
                hideAttachmentsError();
                $('#success_upload').html('<i class="fa fa-check" aria-hidden="true"></i> File deleted. Refreshing…').show();
                setTimeout(function () {
                    window.location.reload(true);
                }, 800);
            } else {
                showAttachmentsError('Could not delete the file. Please try again.');
            }
        });
    });

    function bindUploadConfirm(officeId, createdByName, docketRow) {
        $('.btn-confirm').off('click.courtesyAttUp').on('click.courtesyAttUp', function () {
            hideAttachmentsError();

            var kind = $('.cmisTable').val();
            var docType = $('.type').val();
            if (!kind || kind === 'none') {
                showAttachmentsError('Please select a Kind.');
                return;
            }
            if (!docType || docType === 'none' || docType === '') {
                showAttachmentsError('Please select a Type.');
                return;
            }

            var fileInput = document.getElementById('fileupload');
            var fileToUpload = fileInput && fileInput.files ? fileInput.files[0] : null;
            if (!fileToUpload) {
                showAttachmentsError('Please choose a file before uploading.');
                return;
            }

            var $btn = $('.btn-confirm').prop('disabled', true);
            var form = new FormData();
            form.append('file', fileToUpload, fileToUpload.name);

            var uploadUrl = joinApiUrl(api, '8080/file/upload?' + $.param({
                uuid: docketRow.docketNumber,
                type: 'investigation',
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
            }).done(function (response) {
                if (response && response.status === 'ERROR') {
                    showAttachmentsError('Upload failed. Please try again.');
                    $btn.prop('disabled', false);
                    return;
                }
                $('#success_upload').html('<i class="fa fa-check" aria-hidden="true"></i> Successfully uploaded.').show();
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }).fail(function () {
                showAttachmentsError('Upload could not be completed. Check your connection and try again.');
                $btn.prop('disabled', false);
            });
        });
    }

    function startPage() {
        hideAttachmentsError();
        setPageLoader(true);

        if (!docket_number) {
            setPageLoader(false);
            showAttachmentsError('This page is missing a docket number. Open attachments from the Courtesy Investigation list.');
            return;
        }
        if (!fi) {
            setPageLoader(false);
            showAttachmentsError('Your field office could not be determined. Try signing in again or return to the list.');
            return;
        }

        var userUuid = $.cookie('uuid');
        if (!userUuid) {
            setPageLoader(false);
            showAttachmentsError('Your session is missing user id. Try signing in again.');
            return;
        }

        __executeExternalGet('8088/user/' + userUuid).done(function (userProfile) {
            if (!userProfile || userProfile.status === 'ERROR') {
                setPageLoader(false);
                showAttachmentsError('Could not load your user profile. Please try again.');
                return;
            }

            var officeId = userProfile.departmentId;
            var createdByName = formatUserFullName(userProfile);

            __executeExternalGet('8000/docketbook/' + docket_number + '/' + fi).done(function (apiResult) {
                setPageLoader(false);

                var docketRow = apiResult.response;
                if (apiResult.status === 'ERROR' || !docketRow || docketRow.status === 'ERROR') {
                    showAttachmentsError('Could not load this docket. Return to the list and try again.');
                    return;
                }

                hideAttachmentsError();
                $('.name').val(formatDocketClientName(docketRow));
                $('.docket_num').val(docketRow.docketNumber || '');

                loadTable('investigation', docketRow.docketNumber, officeId);
                bindUploadConfirm(officeId, createdByName, docketRow);
            });
        });
    }

    $(function () {
        bindCmisChange();
        startPage();
    });

})(jQuery);
