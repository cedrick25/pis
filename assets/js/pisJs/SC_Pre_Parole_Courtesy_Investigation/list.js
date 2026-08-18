(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;
    var TABLE_SEL = '#tblScPreParoleCourtesyInv';

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

    function hidePageError() {
        $('#sc_ppcinv_page_error').hide().empty();
    }

    function showPageError(msg) {
        $('#sc_ppcinv_page_error').text(msg).show();
    }

    var DEFAULT_LOADER_TEXT = 'Loading dockets…';

    function setScPpcInvListLoader(visible, statusText) {
        var $el = $('#scPpcInvListLoader');
        if (!$el.length) {
            return;
        }
        var msg = statusText != null && statusText !== '' ? statusText : DEFAULT_LOADER_TEXT;
        $el.find('.sup-docket-loader-text').text(msg);
        if (visible) {
            $el.removeClass('is-hidden');
            $el.attr('aria-busy', 'true');
        } else {
            $el.addClass('is-hidden');
            $el.attr('aria-busy', 'false');
            $el.find('.sup-docket-loader-text').text(DEFAULT_LOADER_TEXT);
        }
    }

    var __getContext = function () {
        return ___ctx;
    };

    var __executeExternalGet = function (path, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        if (customLoader != '') {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'GET',
            url: path,
            dataType: 'json'
        }).done(function (data) {
            if (customLoader != '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader != '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus
            });
        });

        return d.promise();
    };

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        var body = jsonObj === undefined || jsonObj === null
            ? '{}'
            : (typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj));
        if (customLoader != '') {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        $.ajax({
            method: 'POST',
            url: path,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        }).done(function (data) {
            if (customLoader != '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader != '') {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus
            });
        });

        return d.promise();
    };

    function buttonVisibility() {
        if (typeof window.applyPermissionVisibility === 'function') {
            window.applyPermissionVisibility();
            return;
        }
        var raw = localStorage.getItem('permission');
        var data = null;
        if (raw) {
            try { data = JSON.parse(raw); } catch (e) { data = null; }
        }
        $('[data-permission]').hide();
        if (!data || !Array.isArray(data)) { return; }
        data.forEach(function (row) {
            if (!row || !row.detail) { return; }
            var $el = $('[data-permission="' + row.detail + '"]');
            if (row.value) { $el.show(); } else { $el.hide(); }
        });
    }

    function updateScSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    var searchHtml = '<div class="sup-docket-search-toolbar" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="sc_ppcinv_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="sc_ppcinv_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Search docket / name" autocomplete="off">' +
        '<button type="button" class="sup-docket-search-clear" title="Clear search" aria-label="Clear search">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-sm docket_search" aria-label="Run search"><i class="fa fa-search" aria-hidden="true"></i></button>' +
        '</div>';

    function injectSearch(value) {
        var $target = $('.dataTables_length').parent().next();
        if ($target.length) {
            $target.html(searchHtml);
            if (value) {
                $target.find('.docketSearchInput').val(value);
            }
            updateScSearchClearState();
        }
    }

    function bindRowActionsOnce() {
        $(document).off('click.scPpcInv', '.btn_update').on('click.scPpcInv', '.btn_update', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-investigation-update?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });
        $(document).off('click.scPpcInv', '.btn_view').on('click.scPpcInv', '.btn_view', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-investigation-view?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });
        $(document).off('click.scPpcInv', '.btn_attachments').on('click.scPpcInv', '.btn_attachments', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-investigation-upload?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });

        $('#removeModal').off('show.bs.modal.scPpcInv').on('show.bs.modal.scPpcInv', function (e) {
            var rel = e.relatedTarget;
            if (!rel) {
                return;
            }
            var $t = $(rel);
            if (!$t.hasClass('btn_remove')) {
                return;
            }
            var docket_number = $t.data('docket');
            var office_id = $t.data('oi');
            $('#removeModal').data('removeDocket', docket_number).data('removeOffice', office_id);
            $('.docket').text(docket_number);
            $('#success_remove, #error_remove').hide();
            $('#error_remove').empty();
        });

        $(document).off('click.scPpcInv', '.btn_remove_confirm').on('click.scPpcInv', '.btn_remove_confirm', function () {
            var docket_number = $('#removeModal').data('removeDocket');
            var office_id = $('#removeModal').data('removeOffice');
            if (docket_number === undefined || docket_number === null || office_id === undefined || office_id === null) {
                $('#error_remove').text('Missing docket or office. Close this dialog and try again.').show();
                return;
            }
            var $btn = $('.btn_remove_confirm').prop('disabled', true);
            $('#error_remove').hide().empty();
            __executeExternalPost('8000/docketbook/remove/' + docket_number + '/' + office_id, {}).done(function (result) {
                $btn.prop('disabled', false);
                if (result.status !== 'ERROR') {
                    $('#error_remove').hide().empty();
                    $('#success_remove').show();
                    setTimeout(function () {
                        $('#removeModal').modal('hide');
                        $('#success_remove').hide();
                        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
                            $(TABLE_SEL).DataTable().ajax.reload(null, false);
                        }
                    }, 1000);
                } else {
                    $('#error_remove').text('Could not remove this docket. Please try again.').show();
                }
            });
        });
    }

    function formatTableValue(value) {
        if (value === null || value === undefined) {
            return 'N/A';
        }
        if (typeof value === 'string' && value.trim() === '') {
            return 'N/A';
        }
        return value;
    }

    function onTableXhrScPpcInv() {
        setScPpcInvListLoader(false);
    }

    function onTableDrawScPpcInv() {
        setScPpcInvListLoader(false);
        try {
            buttonVisibility();
        } catch (e) {
            /* ignore */
        }
    }

    function wireTableLoaderAndPermissions(api) {
        var $tbl = $(api.table().node());
        setScPpcInvListLoader(false);
        try {
            buttonVisibility();
        } catch (e) {
            /* ignore malformed permission payloads */
        }
        $tbl.off('xhr.dt', onTableXhrScPpcInv).on('xhr.dt', onTableXhrScPpcInv);
        $tbl.off('draw.dt', onTableDrawScPpcInv).on('draw.dt', onTableDrawScPpcInv);
    }

    function tableColumns() {
        return [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            {
                data: 'docketNumber',
                render: function (data) {
                    return formatTableValue(data);
                }
            },
            {
                data: 'fullName',
                render: function (data) {
                    return formatTableValue(data);
                }
            },
            {
                data: 'referringOfficeCourtesyInv',
                render: function (data) {
                    return formatTableValue(data);
                }
            },
            {
                data: null,
                render: function (data) {
                    return "<button class='btn btn-sm btn-primary btn_view' data-permission='can_view_docket_pre_parole_courtesy_investigation' type='button' data-docket='" + data.docketNumber + "' data-oi='" + data.fieldOfficeId + "'><i class='fa fa-eye'></i> View</button> " +
                        "<button class='btn btn-sm btn-primary btn_update' data-permission='can_edit_docket_pre_parole_courtesy_investigation' type='button' data-docket='" + data.docketNumber + "' data-oi='" + data.fieldOfficeId + "'><i class='fa fa-edit'></i> Update</button> " +
                        "<button class='btn btn-sm btn-primary btn_attachments' data-permission='can_attachments_docket_pre_parole_courtesy_investigation' type='button' data-docket='" + data.docketNumber + "' data-oi='" + data.fieldOfficeId + "'><i class='fa fa-upload'></i> Attachments</button> " +
                        "<button type='button' class='btn btn-sm btn-danger btn_remove' data-permission='can_delete_docket_pre_parole_courtesy_investigation' data-toggle='modal' data-target='#removeModal' data-docket='" + data.docketNumber + "' data-oi='" + data.fieldOfficeId + "' aria-label='Remove docket " + String(data.docketNumber == null ? '' : data.docketNumber).replace(/'/g, '&#39;') + "' title='Remove'><i class='fa fa-remove' aria-hidden='true'></i> Remove</button>";
                }
            }
        ];
    }

    function drawTable() {
        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }

        $(TABLE_SEL).DataTable({
            processing: false,
            serverSide: true,
            searching: false,
            lengthMenu: [10, 25, 50, 100],
            pageLength: 10,
            language: {
                emptyTable: 'No dockets found.',
                zeroRecords: 'No dockets found.'
            },
            columnDefs: [
                { width: '5%', targets: [0] },
                { width: '28%', targets: [1] },
                { width: '24%', targets: [2] },
                { width: '28%', targets: [3] },
                { width: '1%', targets: [4], orderable: false, className: 'pis-actions-col text-nowrap' }
            ],
            ajax: {
                url: api + '8000/docketbook',
                type: 'GET',
                cache: true,
                data: function (d) {
                    return {
                        page: d.start / d.length,
                        size: d.length,
                        type: 'SC_PPI_CSINV',
                        officeId: (window.PisDocketOfficeFilter ? window.PisDocketOfficeFilter.docketListQuery().officeId : $.cookie('field_office_id'))
                    };
                },
                beforeSend: function () {
                    hidePageError();
                    setScPpcInvListLoader(true);
                },
                complete: function () {
                    setScPpcInvListLoader(false);
                },
                error: function () {
                    showPageError('Could not load dockets. Check your connection and try again.');
                },
                dataFilter: function (data) {
                    try {
                        var json = typeof data === 'string' ? jQuery.parseJSON(data) : data;
                        if (json.totalElements == null) {
                            throw new Error('invalid');
                        }
                        json.recordsTotal = json.totalElements;
                        json.recordsFiltered = json.totalElements;
                        json.data = json.content;
                        return JSON.stringify(json);
                    } catch (err) {
                        showPageError('Could not read docket data. Please refresh the page.');
                        return JSON.stringify({
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: []
                        });
                    }
                }
            },
            columns: tableColumns(),
            initComplete: function () {
                wireTableLoaderAndPermissions(this.api());
            }
        });
    }

    function drawSearchTable(searchVal) {
        var officeQuery = window.PisDocketOfficeFilter
            ? window.PisDocketOfficeFilter.docketListQuery()
            : { officeId: $.cookie('field_office_id'), fieldOfficeId: $.cookie('field_office_id'), canSeeOtherOffices: false };
        var fieldOfficeId = officeQuery.fieldOfficeId;

        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }

        $(TABLE_SEL).DataTable({
            processing: false,
            serverSide: true,
            searching: false,
            lengthMenu: [10, 25, 50, 100],
            pageLength: 10,
            language: {
                emptyTable: 'No dockets found.',
                zeroRecords: 'No dockets found.'
            },
            columnDefs: [
                { width: '5%', targets: [0] },
                { width: '28%', targets: [1] },
                { width: '24%', targets: [2] },
                { width: '28%', targets: [3] },
                { width: '1%', targets: [4], orderable: false, className: 'pis-actions-col text-nowrap' }
            ],
            ajax: function (data, callback /* , settings */) {
                var page = data.start / data.length;
                var size = data.length;
                hidePageError();
                setScPpcInvListLoader(true, 'Searching…');
                $.ajax({
                    url: joinApiUrl(___ctx, '8000/docketbook/search/PAROLEE?page=' + page + '&size=' + size),
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                        name: searchVal,
                        type: 'SC_PPI_CSINV',
                        fieldOfficeId: officeQuery.fieldOfficeId,
                        canSeeOtherOffices: officeQuery.canSeeOtherOffices
                    }),
                    success: function (json) {
                        if (!json || json.totalElements == null) {
                            showPageError('Could not read search results. Please try again.');
                            callback({
                                draw: data.draw,
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            });
                            return;
                        }
                        callback({
                            draw: data.draw,
                            recordsTotal: json.totalElements,
                            recordsFiltered: json.totalElements,
                            data: json.content || []
                        });
                    },
                    error: function () {
                        showPageError('Search could not be completed. Check your connection and try again.');
                        callback({
                            draw: data.draw,
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: []
                        });
                    },
                    complete: function () {
                        setScPpcInvListLoader(false);
                    }
                });
            },
            columns: tableColumns(),
            initComplete: function () {
                wireTableLoaderAndPermissions(this.api());
            }
        });
    }

    $(document).on('input', '.docketSearchInput', function () {
        updateScSearchClearState();
    });

    $(document).on('keypress', '.docketSearchInput', function (e) {
        if (e.which === 13) {
            $('.docket_search').trigger('click');
        }
    });

    $(document).on('click', '.sup-docket-search-clear', function (e) {
        e.preventDefault();
        $('.docketSearchInput').val('');
        updateScSearchClearState();
        hidePageError();
        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }
        drawTable();
        injectSearch();
        updateScSearchClearState();
        $('.docketSearchInput').trigger('focus');
    });

    $(document).on('click', '.docket_search', function () {
        var searchVal = ($('.docketSearchInput').val() || '').trim();

        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }

        hidePageError();

        if (!searchVal) {
            drawTable();
            injectSearch();
            updateScSearchClearState();
            return;
        }

        drawSearchTable(searchVal);
        injectSearch(searchVal);
        updateScSearchClearState();
    });

    $('#removeModal').on('hidden.bs.modal.scPpcInv', function () {
        $('#success_remove, #error_remove').hide();
        $('#error_remove').empty();
        $('.btn_remove_confirm').prop('disabled', false);
    });

    if (window.PisDocketOfficeFilter && typeof window.PisDocketOfficeFilter.mountDocketOfficeFilter === 'function') {
        window.PisDocketOfficeFilter.mountDocketOfficeFilter('.card-header', function () {
            var searchVal = ($('.docketSearchInput').val() || '').trim();
            if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
                $(TABLE_SEL).DataTable().destroy();
                $('.table_body').empty();
            }
            if (searchVal) {
                drawSearchTable(searchVal);
            } else {
                drawTable();
            }
            injectSearch(searchVal);
            updateScSearchClearState();
        });
    }
    bindRowActionsOnce();
    drawTable();
    injectSearch();
    updateScSearchClearState();
})(jQuery);
