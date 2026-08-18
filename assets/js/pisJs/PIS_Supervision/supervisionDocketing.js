(function ($) {
    var api = localStorage.getItem('api');
    var ___ctx = api;
    var supDocketListDataTable = null;

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
        $('#sup_docketing_page_error').hide().empty();
    }

    function showPageError(msg) {
        $('#sup_docketing_page_error').text(msg).show();
    }

    var DEFAULT_LOADER_TEXT = 'Loading dockets…';

    function setSupDocketListLoader(visible, statusText) {
        var $el = $('#supDocketListLoader');
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
            /* DataTables can throw on malformed rows; loader still clears via complete/draw */
        }
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
            dataType: 'json'
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

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = joinApiUrl(__getContext(), path);
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
        $('#tblSupervisionDocketing').off('draw.dt.supDocket').on('draw.dt.supDocket', function () {
            buttonVisibility();
            setSupDocketListLoader(false);
        });
    }

    function bindRowActionsOnce() {
        $(document).off('click.supDocket', '.btn_update').on('click.supDocket', '.btn_update', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/supervision_docket_update?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });
        $(document).off('click.supDocket', '.btn_view').on('click.supDocket', '.btn_view', function () {
            var docket_number = $(this).data('docket');
            var officeId = $(this).data('oi') || $.cookie('field_office_id');
            window.location.href = joinApiUrl(api, 'pis/supervision_docket_view?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
        });

        $(document).off('click.supDocket', '.btn_remove').on('click.supDocket', '.btn_remove', function () {
            var docket_number = $(this).data('docket');
            var office_id = $(this).data('oi');
            $('#removeModal').data('removeDocket', docket_number).data('removeOffice', office_id);
            $('.docket').text(docket_number);
            $('#success_remove, #error_remove').hide();
            $('#error_remove').empty();
        });

        $(document).off('click.supDocket', '.btn_remove_confirm').on('click.supDocket', '.btn_remove_confirm', function () {
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
                        if (supDocketListDataTable) {
                            supDocketListDataTable.ajax.reload(null, false);
                        }
                    }, 1000);
                } else {
                    $('#error_remove').text('Could not remove this docket. Please try again.').show();
                }
            });
        });

        $(document).off('click.supDocket', '.btn_attachments').on('click.supDocket', '.btn_attachments', function () {
            var docket_number = $(this).data('docket');
            var id = $(this).data('id');
            var type = $(this).data('type');
            var fi = $(this).data('oi');
            var q = $.param({
                docket_number: docket_number,
                id: id,
                type: type,
                fi: fi
            });
            window.location.href = joinApiUrl(api, 'pis/pis-supervision-file-upload?' + q);
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
                        '<button class="btn btn-sm btn-primary btn_view " data-permission="can_view_docket_probation_supervision" style="display:none;" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-eye"></i> View</button> ' +
                        '<button class="btn btn-sm btn-primary btn_update " data-permission="can_edit_docket_probation_supervision" style="display:none;" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-edit"></i> Update</button> ' +
                        '<button class="btn btn-sm btn-primary btn_attachments " data-permission="can_attachments_docket_probation_supervision" style="display:none;" type="button" data-docket="' + dn + '" data-oi="' + oi + '"><i class="fa fa-paperclip"></i> Attachments</button> ' +
                        '<button type="button" class="btn btn-sm btn-danger btn_remove " data-permission="can_delete_docket_probation_supervision" style="display:none;" data-toggle="modal" data-target="#removeModal" data-docket="' + dn + '" data-oi="' + oi + '" aria-label="Remove docket ' + dn + '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>'
                    );
                }
            }
        ];
    }

    function supervisionListAjax(data, callback /* , settings */) {
        setSupDocketListLoader(true, searchTermForAjax() ? 'Searching…' : 'Loading dockets…');
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

        if (!term) {
            $.ajax({
                url: joinApiUrl(api, '8000/docketbook'),
                type: 'GET',
                dataType: 'json',
                cache: true,
                data: {
                    page: page,
                    size: size,
                    type: 'PIS_SUP',
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
                complete: function () {
                    setSupDocketListLoader(false);
                }
            });
        } else {
            var searchUrl = joinApiUrl(___ctx, '8000/docketbook/search/PROBATIONER?page=' + page + '&size=' + size);
            $.ajax({
                url: searchUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    name: term,
                    type: 'PIS_SUP',
                    fieldOfficeId: officeQuery.fieldOfficeId,
                    canSeeOtherOffices: officeQuery.canSeeOtherOffices
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
                    setSupDocketListLoader(false);
                }
            });
        }
    }

    function searchTermForAjax() {
        return ($('.docketSearchInput').val() || '').trim();
    }

    function initSupDocketListDataTable() {
        supDocketListDataTable = $('#tblSupervisionDocketing').DataTable({
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
                { width: '4%', targets: [0] },
                { width: '16%', targets: [1] },
                { width: '12%', targets: [2] },
                { width: '24%', targets: [3] },
                { width: '18%', targets: [4] },
                { width: '18%', targets: [5] },
                { width: '1%', targets: [6], orderable: false, className: 'pis-actions-col text-nowrap' }
            ],
            ajax: supervisionListAjax,
            columns: tableColumns()
        });
    }

    function updateSupDocketSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    var searchHtml = '<div class="sup-docket-search-toolbar" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="sup_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="sup_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Search docket / name" autocomplete="off">' +
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
            updateSupDocketSearchClearState();
        }
    }

    $(document).on('input', '.docketSearchInput', function () {
        updateSupDocketSearchClearState();
    });

    $(document).on('keypress', '.docketSearchInput', function (e) {
        if (e.which === 13) {
            $('.docket_search').trigger('click');
        }
    });

    $(document).on('click', '.sup-docket-search-clear', function (e) {
        e.preventDefault();
        $('.docketSearchInput').val('');
        updateSupDocketSearchClearState();
        hidePageError();
        if (supDocketListDataTable) {
            supDocketListDataTable.ajax.reload(null, true);
        }
        $('.docketSearchInput').trigger('focus');
    });

    $(document).on('click', '.docket_search', function () {
        if (!supDocketListDataTable) {
            return;
        }
        hidePageError();
        supDocketListDataTable.ajax.reload(null, true);
    });

    $('#removeModal').on('hidden.bs.modal', function () {
        $('#success_remove, #error_remove').hide();
        $('#error_remove').empty();
        $('.btn_remove_confirm').prop('disabled', false);
    });

    if (window.PisDocketOfficeFilter && typeof window.PisDocketOfficeFilter.mountDocketOfficeFilter === 'function') {
        window.PisDocketOfficeFilter.mountDocketOfficeFilter('.card-header', function () {
            if (supDocketListDataTable) {
                supDocketListDataTable.ajax.reload(null, true);
            }
        });
    }
    bindRowActionsOnce();
    bindTableDrawOnce();
    initSupDocketListDataTable();
    injectSearch();
    updateSupDocketSearchClearState();

})(jQuery);
