(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;
    var TABLE_SEL = '#tblScPreParoleSupervision';
    var DOCKET_LIST_TYPE = 'SC_PPI_SUP';

    /** Preserved when the DataTable is destroyed/rebuilt (toolbar is re-injected). */
    var scPprSupToolbarState = {
        term: '',
        clientType: 'PAROLEE'
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

    function namePartEmpty(v) {
        return v === null || v === undefined || String(v).trim() === '';
    }

    function hidePageError() {
        $('#sc_ppr_sup_page_error').hide().empty();
    }

    function showPageError(msg) {
        $('#sc_ppr_sup_page_error').text(msg).show();
    }

    var DEFAULT_LOADER_TEXT = 'Loading dockets…';

    function setScPprSupListLoader(visible, statusText) {
        var $el = $('#scPprSupListLoader');
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

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = __getContext() + path;
        var d = $.Deferred();
        var body = jsonObj === undefined || jsonObj === null
            ? '{}'
            : (typeof jsonObj === 'string' ? jsonObj : JSON.stringify(jsonObj));
        if (customLoader && customLoader !== '') {
            $('#' + customLoader).show().removeClass('hide');
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
            if (customLoader && customLoader !== '') {
                $('#' + customLoader).hide().addClass('hide');
            }
            d.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (customLoader && customLoader !== '') {
                $('#' + customLoader).hide().addClass('hide');
            }
            d.resolve({
                status: 'ERROR',
                message: errorThrown || textStatus
            });
        });
        return d.promise();
    };

    function buttonVisibility() {
        var raw = localStorage.getItem('permission');
        var data = null;
        if (raw) {
            try {
                data = JSON.parse(raw);
            } catch (e) {
                data = null;
            }
        }
        if (data == null || !Array.isArray(data)) {
            return;
        }
        data.forEach(function (row) {
            if (row.type === 'ACTION') {
                setTimeout(function () {
                    var el = $('.' + row.detail);
                    if (!row.value) {
                        el.hide();
                    } else {
                        el.show();
                    }
                }, 10);
            } else if (row.type === 'VIEW') {
                var elv = $('.' + row.detail);
                if (!row.value) {
                    elv.hide();
                } else {
                    elv.show();
                }
            }
        });
    }

    function updateScSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    var searchHtml =
        '<div class="sup-docket-search-toolbar" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="sc_ppr_sup_client_type" style="margin-bottom: 0; white-space: nowrap;">Client</label>' +
        '<select id="sc_ppr_sup_client_type" name="sc_ppr_sup_client_type" class="form-control form-control-sm" style="width: auto; min-width: 7rem;">' +
        '<option value="PAROLEE">Parole</option>' +
        '<option value="PARDONEE">Pardon</option>' +
        '</select>' +
        '<label for="sc_ppr_sup_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="sc_ppr_sup_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Search docket / name" autocomplete="off">' +
        '<button type="button" class="sup-docket-search-clear" title="Clear search" aria-label="Clear search">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-sm docket_search" aria-label="Run search"><i class="fa fa-search" aria-hidden="true"></i></button>' +
        '</div>';

    function injectSearch() {
        var $target = $('.dataTables_length').parent().next();
        if (!$target.length) {
            return;
        }
        $target.html(searchHtml);
        $('#sc_ppr_sup_client_type').val(scPprSupToolbarState.clientType);
        $('#sc_ppr_sup_docket_search').val(scPprSupToolbarState.term);
        updateScSearchClearState();
    }

    function searchClientTypeForAjax() {
        var $sel = $('#sc_ppr_sup_client_type');
        if ($sel.length) {
            return String($sel.val() || 'PAROLEE');
        }
        return scPprSupToolbarState.clientType;
    }

    function bindRowActionsOnce() {
        $(document).off('click.scPprSup', '.btn_update').on('click.scPprSup', '.btn_update', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-supervision-update?docket_number=' + encodeURIComponent(docket_number));
        });
        $(document).off('click.scPprSup', '.btn_view').on('click.scPprSup', '.btn_view', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-supervision-view?docket_number=' + encodeURIComponent(docket_number));
        });
        $(document).off('click.scPprSup', '.btn_attachments').on('click.scPprSup', '.btn_attachments', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-supervision-upload?docket_number=' + encodeURIComponent(docket_number));
        });

        $('#removeModal').off('show.bs.modal.scPprSup').on('show.bs.modal.scPprSup', function (e) {
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

        $(document).off('click.scPprSup', '.btn_remove_confirm').on('click.scPprSup', '.btn_remove_confirm', function () {
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

    function onTableXhrScPprSup() {
        setScPprSupListLoader(false);
    }

    function onTableDrawScPprSup() {
        setScPprSupListLoader(false);
        try {
            buttonVisibility();
        } catch (e) {
            /* ignore */
        }
    }

    function wireTableLoaderAndPermissions(api) {
        var $tbl = $(api.table().node());
        setScPprSupListLoader(false);
        try {
            buttonVisibility();
        } catch (e) {
            /* ignore */
        }
        $tbl.off('xhr.dt', onTableXhrScPprSup).on('xhr.dt', onTableXhrScPprSup);
        $tbl.off('draw.dt', onTableDrawScPprSup).on('draw.dt', onTableDrawScPprSup);
    }

    function tableColumns() {
        return [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            { data: 'docketNumber' },
            {
                data: null,
                render: function (data) {
                    return (data.receivedDateByPPO === null || data.receivedDateByPPO === '') ? 'N/A' : data.receivedDateByPPO;
                }
            },
            {
                data: null,
                render: function (data) {
                    var allEmpty = namePartEmpty(data.firstName) && namePartEmpty(data.middleName) &&
                        namePartEmpty(data.lastName) && namePartEmpty(data.suffixName);
                    var name;
                    if (allEmpty) {
                        name = (data.fullName != null && String(data.fullName).trim() !== '') ? String(data.fullName).trim() : 'N/A';
                    } else {
                        name = [data.firstName, data.middleName, data.lastName, data.suffixName]
                            .filter(function (p) { return p != null && String(p).trim() !== ''; })
                            .map(function (p) { return String(p).trim(); })
                            .join(' ');
                    }
                    return name;
                }
            },
            {
                data: null,
                render: function (data) {
                    return (data.criminalCaseNumber === null || data.criminalCaseNumber === '') ? 'N/A' : data.criminalCaseNumber;
                }
            },
            { data: 'fieldOfficeName' },
            {
                data: null,
                render: function (data) {
                    var dn = escAttr(data.docketNumber);
                    var oi = escAttr(data.fieldOfficeId);
                    return (
                        '<button class="btn btn-sm btn-primary btn_view ppr_sup_view" style="display:none;" type="button" data-docket="' + dn + '"><i class="fa fa-eye"></i> View</button> ' +
                        '<button class="btn btn-sm btn-primary btn_update ppr_sup_update" style="display:none;" type="button" data-docket="' + dn + '"><i class="fa fa-edit"></i> Update</button> ' +
                        '<button class="btn btn-sm btn-primary btn_attachments ppr_sup_attachments" style="display:none;" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-paperclip"></i> Attachments</button> ' +
                        '<button type="button" class="btn btn-sm btn-danger btn_remove ppr_sup_remove" style="display:none;" data-toggle="modal" data-target="#removeModal" data-docket="' + dn + '" data-oi="' + oi + '" aria-label="Remove docket ' + dn + '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>'
                    );
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
            scrollX: true,
            searching: false,
            lengthMenu: [10, 25, 50, 100],
            pageLength: 10,
            language: {
                emptyTable: 'No dockets found.',
                zeroRecords: 'No dockets found.'
            },
            columnDefs: [
                { width: '5%', targets: [0] },
                { width: '15%', targets: [1] },
                { width: '10%', targets: [2] },
                { width: '17%', targets: [3] },
                { width: '13%', targets: [4] },
                { width: '15%', targets: [5] },
                { width: '25%', targets: [6] }
            ],
            ajax: {
                url: api + '8000/docketbook',
                type: 'GET',
                cache: true,
                data: function (d) {
                    return {
                        page: d.start / d.length,
                        size: d.length,
                        type: DOCKET_LIST_TYPE,
                        officeId: $.cookie('field_office_id')
                    };
                },
                beforeSend: function () {
                    hidePageError();
                    setScPprSupListLoader(true);
                },
                complete: function () {
                    setScPprSupListLoader(false);
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
                injectSearch();
                wireTableLoaderAndPermissions(this.api());
            }
        });
    }

    function drawSearchTable(searchVal) {
        var fieldOfficeId = $.cookie('field_office_id');

        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }

        $(TABLE_SEL).DataTable({
            processing: false,
            serverSide: true,
            scrollX: true,
            searching: false,
            lengthMenu: [10, 25, 50, 100],
            pageLength: 10,
            language: {
                emptyTable: 'No dockets found.',
                zeroRecords: 'No dockets found.'
            },
            columnDefs: [
                { width: '5%', targets: [0] },
                { width: '15%', targets: [1] },
                { width: '10%', targets: [2] },
                { width: '17%', targets: [3] },
                { width: '13%', targets: [4] },
                { width: '15%', targets: [5] },
                { width: '25%', targets: [6] }
            ],
            ajax: function (data, callback /* , settings */) {
                var page = data.start / data.length;
                var size = data.length;
                hidePageError();
                setScPprSupListLoader(true, 'Searching…');
                var clientType = searchClientTypeForAjax();
                $.ajax({
                    url: joinApiUrl(___ctx, '8000/docketbook/search/' + clientType + '?page=' + page + '&size=' + size),
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                        name: searchVal,
                        fieldOfficeId: fieldOfficeId,
                        canSeeOtherOffices: false
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
                        setScPprSupListLoader(false);
                    }
                });
            },
            columns: tableColumns(),
            initComplete: function () {
                injectSearch();
                wireTableLoaderAndPermissions(this.api());
            }
        });
    }

    $(document).on('input', '.docketSearchInput', function () {
        scPprSupToolbarState.term = String($(this).val() || '').trim();
        updateScSearchClearState();
    });

    $(document).on('change', '#sc_ppr_sup_client_type', function () {
        scPprSupToolbarState.clientType = String($(this).val() || 'PAROLEE');
    });

    $(document).on('keypress', '.docketSearchInput', function (e) {
        if (e.which === 13) {
            $('.docket_search').trigger('click');
        }
    });

    $(document).on('click', '.sup-docket-search-clear', function (e) {
        e.preventDefault();
        if ($('#sc_ppr_sup_client_type').length) {
            scPprSupToolbarState.clientType = String($('#sc_ppr_sup_client_type').val() || 'PAROLEE');
        }
        scPprSupToolbarState.term = '';
        $('.docketSearchInput').val('');
        updateScSearchClearState();
        hidePageError();
        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }
        drawTable();
        $('#sc_ppr_sup_docket_search').trigger('focus');
    });

    $(document).on('click', '.docket_search', function () {
        var searchVal = ($('.docketSearchInput').val() || '').trim();
        scPprSupToolbarState.term = searchVal;
        if ($('#sc_ppr_sup_client_type').length) {
            scPprSupToolbarState.clientType = String($('#sc_ppr_sup_client_type').val() || 'PAROLEE');
        }

        if ($.fn.DataTable.isDataTable(TABLE_SEL)) {
            $(TABLE_SEL).DataTable().destroy();
            $('.table_body').empty();
        }

        hidePageError();

        if (!searchVal) {
            drawTable();
            return;
        }

        drawSearchTable(searchVal);
    });

    $('#removeModal').on('hidden.bs.modal.scPprSup', function () {
        $('#success_remove, #error_remove').hide();
        $('#error_remove').empty();
        $('.btn_remove_confirm').prop('disabled', false);
    });

    bindRowActionsOnce();
    drawTable();
    updateScSearchClearState();
})(jQuery);
