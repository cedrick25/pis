(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;
    var TABLE_SEL = '#tblScPreParoleCourtesySup';
    var scPpcSupListDataTable = null;

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
        $('#sc_ppcsup_page_error').hide().empty();
    }

    function showPageError(msg) {
        $('#sc_ppcsup_page_error').text(msg).show();
    }

    var DEFAULT_LOADER_TEXT = 'Loading dockets…';

    function setScPpcSupListLoader(visible, statusText) {
        var $el = $('#scPpcSupListLoader');
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
        if (data == null) {
            return;
        }
        data.forEach(function (row) {
            if (row.type === 'ACTION') {
                var el = $('.' + row.detail);
                if (!row.value) {
                    el.hide();
                } else {
                    el.show();
                }
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

    function bindTableDrawOnce() {
        $(TABLE_SEL).off('draw.dt.scPpcSup').on('draw.dt.scPpcSup', function () {
            buttonVisibility();
            setScPpcSupListLoader(false);
        });
    }

    function bindRowActionsOnce() {
        $(document).off('click.scPpcSup', '.btn_update').on('click.scPpcSup', '.btn_update', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-supervision-update?docket_number=' + encodeURIComponent(docket_number));
        });
        $(document).off('click.scPpcSup', '.btn_view').on('click.scPpcSup', '.btn_view', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-supervision-view?docket_number=' + encodeURIComponent(docket_number));
        });
        $(document).off('click.scPpcSup', '.btn_attachments').on('click.scPpcSup', '.btn_attachments', function () {
            var docket_number = $(this).data('docket');
            window.location.href = joinApiUrl(api, 'pis/parole-pardon-courtesy-supervision-upload?docket_number=' + encodeURIComponent(docket_number));
        });

        $(document).off('click.scPpcSup', '.btn_remove').on('click.scPpcSup', '.btn_remove', function () {
            var docket_number = $(this).data('docket');
            var office_id = $(this).data('oi');
            $('#removeModal').data('removeDocket', docket_number).data('removeOffice', office_id);
            $('.docket').text(docket_number);
            $('#success_remove, #error_remove').hide();
            $('#error_remove').empty();
        });

        $(document).off('click.scPpcSup', '.btn_remove_confirm').on('click.scPpcSup', '.btn_remove_confirm', function () {
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
                        if (scPpcSupListDataTable) {
                            scPpcSupListDataTable.ajax.reload(null, false);
                        }
                    }, 1000);
                } else {
                    $('#error_remove').text('Could not remove this docket. Please try again.').show();
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
                data: 'referringOfficeCourtesySup',
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
                        '<button class="btn btn-sm btn-primary btn_view ppr_csup_view" type="button" data-docket="' + dn + '"><i class="fa fa-eye"></i> View</button> ' +
                        '<button class="btn btn-sm btn-primary btn_update ppr_csup_update" type="button" data-docket="' + dn + '"><i class="fa fa-edit"></i> Update</button> ' +
                        '<button class="btn btn-sm btn-primary btn_attachments ppr_cinv_attachments" type="button" data-docket="' + dn + '"><i class="fa fa-paperclip"></i> Attachments</button> ' +
                        '<button type="button" class="btn btn-sm btn-danger btn_remove ppr_csup_remove" data-toggle="modal" data-target="#removeModal" data-docket="' + dn + '" data-oi="' + oi + '" aria-label="Remove docket ' + dn + '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>'
                    );
                }
            }
        ];
    }

    function searchClientTypeForAjax() {
        var v = $('#sc_ppcsup_client_type').val();
        return v || 'PAROLEE';
    }

    function scPpcSupListAjax(data, callback /* , settings */) {
        setScPpcSupListLoader(true, searchTermForAjax() ? 'Searching…' : 'Loading dockets…');
        hidePageError();

        var page = data.start / data.length;
        var size = data.length;
        var fieldOfficeId = $.cookie('field_office_id');
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

        if (!term) {
            $.ajax({
                url: joinApiUrl(api, '8000/docketbook'),
                type: 'GET',
                dataType: 'json',
                cache: true,
                data: {
                    page: page,
                    size: size,
                    type: 'SC_PPI_CSUP',
                    officeId: fieldOfficeId
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
                complete: function () {
                    setScPpcSupListLoader(false);
                }
            });
        } else {
            var clientType = searchClientTypeForAjax();
            var searchUrl = joinApiUrl(___ctx, '8000/docketbook/search/' + clientType + '?page=' + page + '&size=' + size);
            $.ajax({
                url: searchUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    name: term,
                    fieldOfficeId: fieldOfficeId,
                    canSeeOtherOffices: false
                }),
                success: function (json) {
                    safeDataTablesCallback(callback, {
                        draw: data.draw,
                        recordsTotal: json && json.totalElements != null ? json.totalElements : 0,
                        recordsFiltered: json && json.totalElements != null ? json.totalElements : 0,
                        data: (json && json.content) ? json.content : []
                    });
                },
                error: function () {
                    finishFail('Search could not be completed. Check your connection and try again.');
                },
                complete: function () {
                    setScPpcSupListLoader(false);
                }
            });
        }
    }

    function searchTermForAjax() {
        return ($('.docketSearchInput').val() || '').trim();
    }

    function initScPpcSupListDataTable() {
        scPpcSupListDataTable = $(TABLE_SEL).DataTable({
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
                { width: '20%', targets: [1] },
                { width: '20%', targets: [2] },
                { width: '25%', targets: [3] },
                { width: '30%', targets: [4] }
            ],
            ajax: scPpcSupListAjax,
            columns: tableColumns()
        });
    }

    function updateScPpcSupSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    var searchHtml = '<div class="sup-docket-search-toolbar" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="sc_ppcsup_client_type" style="margin-bottom: 0; white-space: nowrap;">Client</label>' +
        '<select id="sc_ppcsup_client_type" class="form-control form-control-sm" style="width: auto; min-width: 7rem;">' +
        '<option value="PAROLEE">Parole</option>' +
        '<option value="PARDONEE">Pardon</option>' +
        '</select>' +
        '<label for="sc_ppcsup_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="sc_ppcsup_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Search docket / name" autocomplete="off">' +
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
            updateScPpcSupSearchClearState();
        }
    }

    $(document).on('input', '.docketSearchInput', function () {
        updateScPpcSupSearchClearState();
    });

    $(document).on('keypress', '.docketSearchInput', function (e) {
        if (e.which === 13) {
            $('.docket_search').trigger('click');
        }
    });

    $(document).on('click', '.sup-docket-search-clear', function (e) {
        e.preventDefault();
        $('.docketSearchInput').val('');
        updateScPpcSupSearchClearState();
        hidePageError();
        if (scPpcSupListDataTable) {
            scPpcSupListDataTable.ajax.reload(null, true);
        }
        $('.docketSearchInput').trigger('focus');
    });

    $(document).on('click', '.docket_search', function () {
        if (!scPpcSupListDataTable) {
            return;
        }
        hidePageError();
        scPpcSupListDataTable.ajax.reload(null, true);
    });

    $('#removeModal').on('hidden.bs.modal.scPpcSup', function () {
        $('#success_remove, #error_remove').hide();
        $('#error_remove').empty();
        $('.btn_remove_confirm').prop('disabled', false);
    });

    bindRowActionsOnce();
    bindTableDrawOnce();
    initScPpcSupListDataTable();
    injectSearch();
    updateScPpcSupSearchClearState();
})(jQuery);
