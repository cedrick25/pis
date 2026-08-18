(function ($) {
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

    var api = resolveApiBase();
    var ___ctx = api;
    var TABLE_SEL = '#tblScPreParoleInv';
    var scPpInvListDataTable = null;

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

    function displayValue(value) {
        if (value === null || value === undefined || String(value).trim() === '') {
            return 'N/A';
        }
        return String(value).trim();
    }

    function hidePageError() {
        $('#sc_ppinv_page_error').hide().empty();
    }

    function showPageError(msg) {
        $('#sc_ppinv_page_error').text(msg).show();
    }

    var DEFAULT_LOADER_TEXT = 'Loading dockets…';

    function setScPpInvListLoader(visible, statusText) {
        var $el = $('#scPpInvListLoader');
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

    function safeDataTablesCallback(callback, payload) {
        try {
            callback(payload);
        } catch (e) {
            /* DataTables can throw on malformed rows */
        }
    }

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = joinApiUrl(___ctx, path);
        var d = $.Deferred();
        var body = jsonObj === undefined || jsonObj === null
            ? '{}'
            : (typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj));
        if (customLoader) {
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
            if (customLoader) {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader) {
                $('#' + customLoader).hide();
                $('#' + customLoader).addClass('hide');
            }
            var msg = typeof errorThrown === 'string' && errorThrown
                ? errorThrown
                : (textStatus || 'Network error');
            d.resolve({
                status: 'ERROR',
                message: msg
            });
        });
        return d.promise();
    };

    function formatRemoveErrorMessage(result) {
        var fallback = 'Could not remove this docket. Please try again.';
        if (!result || result.status !== 'ERROR') {
            return fallback;
        }
        var m = result.message;
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

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

    function bindTableDrawOnce() {
        $(TABLE_SEL).off('draw.dt.scPpInv').on('draw.dt.scPpInv', function () {
            buttonVisibility();
        });
    }

    function bindRowActionsOnce() {
        $(document).off('click.scPpInv', '.btn_update').on('click.scPpInv', '.btn_update', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-investigation-update?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });
        $(document).off('click.scPpInv', '.btn_view').on('click.scPpInv', '.btn_view', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-investigation-view?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });
        $(document).off('click.scPpInv', '.btn_attachments').on('click.scPpInv', '.btn_attachments', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-investigation-upload?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });

        $(document).off('click.scPpInv', '.btn_remove').on('click.scPpInv', '.btn_remove', function () {
            var docket_number = $(this).data('docket');
            var office_id = $(this).data('oi');
            $('#removeModal').data('removeDocket', docket_number).data('removeOffice', office_id);
            $('.docket').text(docket_number);
            $('#success_remove, #error_remove').hide();
            $('#error_remove').empty();
        });

        $(document).off('click.scPpInv', '.btn_remove_confirm').on('click.scPpInv', '.btn_remove_confirm', function () {
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
                        if (scPpInvListDataTable) {
                            scPpInvListDataTable.ajax.reload(null, false);
                        }
                    }, 1000);
                } else {
                    $('#error_remove').text(formatRemoveErrorMessage(result)).show();
                }
            });
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
            {
                data: 'docketNumber',
                render: function (data) {
                    return displayValue(data);
                }
            },
            {
                data: 'fullName',
                render: function (data) {
                    return displayValue(data);
                }
            },
            {
                data: null,
                render: function (data) {
                    var dn = escAttr(data.docketNumber);
                    var oi = escAttr(data.fieldOfficeId);
                    return (
                        '<button class="btn btn-sm btn-primary btn_view " data-permission="can_view_docket_pre_parole_investigation" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-eye" aria-hidden="true"></i> View</button> ' +
                        '<button class="btn btn-sm btn-primary btn_update " data-permission="can_edit_docket_pre_parole_investigation" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-edit" aria-hidden="true"></i> Update</button> ' +
                        '<button class="btn btn-sm btn-primary btn_attachments " data-permission="can_attachments_docket_pre_parole_investigation" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-upload" aria-hidden="true"></i> Attachments</button> ' +
                        '<button type="button" class="btn btn-sm btn-danger btn_remove " data-permission="can_delete_docket_pre_parole_investigation" data-toggle="modal" data-target="#removeModal" data-docket="' + dn + '" data-oi="' + oi + '" aria-label="Remove docket ' + dn + '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>'
                    );
                }
            }
        ];
    }

    function scPpInvListAjax(data, callback /* , settings */) {
        setScPpInvListLoader(true, searchTermForAjax() ? 'Searching…' : 'Loading dockets…');
        hidePageError();

        var page = data.start / data.length;
        var size = data.length;
        var officeQuery = window.PisDocketOfficeFilter
            ? window.PisDocketOfficeFilter.docketListQuery()
            : { officeId: $.cookie('field_office_id'), fieldOfficeId: $.cookie('field_office_id'), canSeeOtherOffices: false };
        var fieldOfficeId = officeQuery.officeId;
        var term = searchTermForAjax();

        function finishFail(message) {
            showPageError(message);
            safeDataTablesCallback(callback, {
                draw: data.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            });
        }

        if (fieldOfficeId == null || String(fieldOfficeId).trim() === '') {
            finishFail('Your field office could not be determined. Please sign in again.');
            setScPpInvListLoader(false);
            return;
        }

        function onAjaxComplete() {
            setScPpInvListLoader(false);
        }

        if (!term) {
            $.ajax({
                url: joinApiUrl(api, '8000/docketbook'),
                type: 'GET',
                dataType: 'json',
                cache: false,
                data: {
                    page: page,
                    size: size,
                    type: 'SC_PPI_INV',
                    officeId: officeQuery.officeId
                },
                success: function (json) {
                    try {
                        if (!json || json.totalElements == null) {
                            throw new Error('invalid');
                        }
                        safeDataTablesCallback(callback, {
                            draw: data.draw,
                            recordsTotal: json.totalElements,
                            recordsFiltered: json.totalElements,
                            data: json.content || []
                        });
                    } catch (e) {
                        showPageError('Could not read docket data. Please refresh the page.');
                        safeDataTablesCallback(callback, {
                            draw: data.draw,
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: []
                        });
                    }
                },
                error: function () {
                    finishFail('Could not load dockets. Check your connection and try again.');
                },
                complete: onAjaxComplete
            });
        } else {
            var searchUrl = joinApiUrl(___ctx, '8000/docketbook/search/PAROLEE?page=' + page + '&size=' + size);
            $.ajax({
                url: searchUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    name: term,
                    type: 'SC_PPI_INV',
                    fieldOfficeId: officeQuery.fieldOfficeId,
                    canSeeOtherOffices: officeQuery.canSeeOtherOffices
                }),
                success: function (json) {
                    try {
                        safeDataTablesCallback(callback, {
                            draw: data.draw,
                            recordsTotal: json && json.totalElements != null ? json.totalElements : 0,
                            recordsFiltered: json && json.totalElements != null ? json.totalElements : 0,
                            data: (json && json.content) ? json.content : []
                        });
                    } catch (e) {
                        showPageError('Search returned data in an unexpected format. Please try again.');
                        safeDataTablesCallback(callback, {
                            draw: data.draw,
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: []
                        });
                    }
                },
                error: function () {
                    finishFail('Search could not be completed. Check your connection and try again.');
                },
                complete: onAjaxComplete
            });
        }
    }

    function searchTermForAjax() {
        return ($('.docketSearchInput').val() || '').trim();
    }

    function initScPpInvListDataTable() {
        scPpInvListDataTable = $(TABLE_SEL).DataTable({
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
                { width: '8%', targets: [0] },
                { width: '28%', targets: [1] },
                { width: '28%', targets: [2] },
                { width: '1%', targets: [3], orderable: false, className: 'pis-actions-col text-nowrap' }
            ],
            ajax: scPpInvListAjax,
            columns: tableColumns()
        });
    }

    function updateScPpInvSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    var searchHtml = '<div class="sup-docket-search-toolbar" role="search" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="sc_ppinv_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="sc_ppinv_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Docket Number, CC Number, Name" autocomplete="off">' +
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
            updateScPpInvSearchClearState();
        }
    }

    function wireDelegatedUiOnce() {
        $('#removeModal').off('hidden.bs.modal.scPpInv').on('hidden.bs.modal.scPpInv', function () {
            $('#success_remove, #error_remove').hide();
            $('#error_remove').empty();
            $('.btn_remove_confirm').prop('disabled', false);
        });

        $(document).off('input.scPpInv', '.docketSearchInput').on('input.scPpInv', '.docketSearchInput', function () {
            updateScPpInvSearchClearState();
        });

        $(document).off('keydown.scPpInv', '.docketSearchInput').on('keydown.scPpInv', '.docketSearchInput', function (e) {
            if (e.key === 'Enter' || e.which === 13) {
                e.preventDefault();
                $('.docket_search').trigger('click');
            }
        });

        $(document).off('click.scPpInv', '.sup-docket-search-clear').on('click.scPpInv', '.sup-docket-search-clear', function (e) {
            e.preventDefault();
            $('.docketSearchInput').val('');
            updateScPpInvSearchClearState();
            hidePageError();
            if (scPpInvListDataTable) {
                scPpInvListDataTable.ajax.reload(null, true);
            }
            $('.docketSearchInput').trigger('focus');
        });

        $(document).off('click.scPpInv', '.docket_search').on('click.scPpInv', '.docket_search', function () {
            if (!scPpInvListDataTable) {
                return;
            }
            hidePageError();
            scPpInvListDataTable.ajax.reload(null, true);
        });
    }

    function startListPage() {
        api = resolveApiBase();
        ___ctx = api;
        if (!api) {
            showPageError('Could not resolve the application API base URL. Please refresh the page.');
            setScPpInvListLoader(false);
            return;
        }
        var fo = $.cookie('field_office_id');
        if (fo == null || String(fo).trim() === '') {
            showPageError('Your field office could not be determined. Please sign in again.');
            setScPpInvListLoader(false);
            return;
        }
        if (window.PisDocketOfficeFilter && typeof window.PisDocketOfficeFilter.mountDocketOfficeFilter === 'function') {
            window.PisDocketOfficeFilter.mountDocketOfficeFilter('.card-header', function () {
                if (scPpInvListDataTable) {
                    scPpInvListDataTable.ajax.reload(null, true);
                }
            });
        }
        initScPpInvListDataTable();
        injectSearch();
        updateScPpInvSearchClearState();
    }

    wireDelegatedUiOnce();
    bindRowActionsOnce();
    bindTableDrawOnce();
    startListPage();
})(jQuery);
