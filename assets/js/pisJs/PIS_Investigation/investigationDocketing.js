(function ($) {
    var INVESTIGATION_DOCKET_TYPE = 'PIS_INV';
    var INVESTIGATION_SEARCH_CLIENT = 'PROBATIONER';
    var TABLE_SEL = '#tblPisInvestigationDockets';
    var investigationListDataTable = null;

    function normalizeInvestigationApiBase(raw) {
        if (raw == null || typeof raw !== 'string') {
            return '';
        }
        return raw.trim();
    }

    function resolveInvestigationApiBase() {
        var fromStorage = normalizeInvestigationApiBase(localStorage.getItem('api'));
        if (fromStorage) {
            return fromStorage;
        }
        if (typeof window.__PIS_API_BASE === 'string') {
            var fromGlobal = normalizeInvestigationApiBase(window.__PIS_API_BASE);
            if (fromGlobal) {
                return fromGlobal;
            }
        }
        return '';
    }

    var api = resolveInvestigationApiBase();
    var ___ctx = api;

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

    function formatClientErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

    function isNamePartEmpty(v) {
        return v === null || v === undefined || String(v).trim() === '';
    }

    var __executeExternalPost = function (path, jsonObj, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if (customLoader) {
            $('#' + customLoader).show();
            $('#' + customLoader).removeClass('hide');
        }
        var body;
        if (jsonObj === undefined || jsonObj === null) {
            body = '{}';
        } else if (typeof jsonObj === 'string') {
            body = jsonObj;
        } else {
            body = JSON.stringify(jsonObj);
        }
        $.ajax({
            method: 'POST',
            url: path,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            processData: false,
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

    var __getContext = function () {
        return ___ctx;
    };

    function setPisInvDocketListLoader(visible) {
        var $el = $('#pisInvDocketListLoader');
        if (!$el.length) {
            return;
        }
        if (visible) {
            $el.removeClass('is-hidden').attr('aria-busy', 'true');
        } else {
            $el.addClass('is-hidden').attr('aria-busy', 'false');
        }
    }

    function showPisInvSearchError(message) {
        $('#pisInvDocketListSearchError').text(message).show();
    }

    function hidePisInvSearchError() {
        $('#pisInvDocketListSearchError').hide().empty();
    }

    function updatePisInvSearchClearState() {
        var hasTerm = !!($('.docketSearchInput').val() || '').trim();
        $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
    }

    function searchTermForAjax() {
        return ($('.docketSearchInput').val() || '').trim();
    }

    var searchHtml =
        '<div class="sup-docket-search-toolbar" role="search" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="pis_inv_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="text" id="pis_inv_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Docket Number, CC Number, Name" autocomplete="off">' +
        '<button type="button" class="sup-docket-search-clear" title="Clear search" aria-label="Clear search">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-sm docket_search" aria-label="Run search"><i class="fa fa-search" aria-hidden="true"></i></button>' +
        '</div>';

    function injectSearch(value) {
        var $slot = $('#pisInvDocketSearchSlot');
        if ($slot.length) {
            $slot.html(searchHtml);
            if (value) {
                $slot.find('.docketSearchInput').val(value);
            }
            updatePisInvSearchClearState();
            return;
        }
        var $target = $('.dataTables_length').parent().next();
        if ($target.length) {
            $target.html(searchHtml);
            if (value) {
                $target.find('.docketSearchInput').val(value);
            }
            updatePisInvSearchClearState();
        }
    }

    function safeDataTablesCallback(callback, payload) {
        try {
            callback(payload);
        } catch (e) {
            /* DataTables can throw on malformed rows */
        }
    }

    function resolveFieldOfficeId(callback) {
        var fieldOfficeId = $.cookie('field_office_id');
        if (fieldOfficeId != null && String(fieldOfficeId).trim() !== '') {
            callback(fieldOfficeId);
            return;
        }
        if (typeof window.__pisEnsureUserSession === 'function') {
            window.__pisEnsureUserSession()
                .done(function () {
                    callback($.cookie('field_office_id'));
                })
                .fail(function () {
                    callback(null);
                });
            return;
        }
        callback(null);
    }

    function investigationListAjax(data, callback /* , settings */) {
        setPisInvDocketListLoader(true);
        hidePisInvSearchError();

        var page = data.start / data.length;
        var size = data.length;
        var term = searchTermForAjax();

        function finishFail(message) {
            showPisInvSearchError(message);
            safeDataTablesCallback(callback, {
                draw: data.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            });
        }

        function onAjaxComplete() {
            setPisInvDocketListLoader(false);
        }

        function loadDockets(fieldOfficeId) {
            if (fieldOfficeId == null || String(fieldOfficeId).trim() === '') {
                finishFail('Your field office could not be determined. Please sign in again.');
                setPisInvDocketListLoader(false);
                return;
            }

            if (!term) {
            $.ajax({
                url: joinApiUrl(___ctx, '8000/docketbook'),
                type: 'GET',
                dataType: 'json',
                cache: false,
                data: {
                    page: page,
                    size: size,
                    type: INVESTIGATION_DOCKET_TYPE,
                    officeId: fieldOfficeId
                }
            })
                .done(function (json) {
                    if (!json || typeof json !== 'object') {
                        finishFail('Could not load dockets. Please try again.');
                        return;
                    }
                    var total =
                        typeof json.totalElements === 'number' ? json.totalElements : 0;
                    var rows = Array.isArray(json.content) ? json.content : [];
                    safeDataTablesCallback(callback, {
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: rows
                    });
                })
                .fail(function () {
                    finishFail('Could not load dockets. Please try again.');
                })
                .always(onAjaxComplete);
        } else {
            var searchUrl = joinApiUrl(
                ___ctx,
                '8000/docketbook/search/' + INVESTIGATION_SEARCH_CLIENT + '?page=' + page + '&size=' + size
            );
            $.ajax({
                url: searchUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    name: term,
                    fieldOfficeId: fieldOfficeId,
                    canSeeOtherOffices: false
                })
            })
                .done(function (json) {
                    if (!json || typeof json !== 'object') {
                        finishFail('Search could not be completed. Please try again.');
                        return;
                    }
                    var total =
                        typeof json.totalElements === 'number' ? json.totalElements : 0;
                    var rows = Array.isArray(json.content) ? json.content : [];
                    safeDataTablesCallback(callback, {
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: rows
                    });
                })
                .fail(function () {
                    finishFail('Search could not be completed. Please try again.');
                })
                .always(onAjaxComplete);
            }
        }

        resolveFieldOfficeId(loadDockets);
    }

    function buttonVisibility() {
        var raw = localStorage.getItem('permission');
        var perm = null;
        if (raw) {
            try {
                perm = JSON.parse(raw);
            } catch (e) {
                perm = null;
            }
        }
        if (!Array.isArray(perm)) {
            return;
        }
        perm.forEach(function (row) {
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

    function bindRowActionsOnce() {
        $(document)
            .off('click.pisInvDock', '.btn_remove')
            .on('click.pisInvDock', '.btn_remove', function () {
                var docket_number = $(this).data('docket');
                var office_id = $(this).data('oi');
                $('#removeModal').data('pendingDocket', docket_number).data('pendingOfficeId', office_id);
                $('.docket').text(docket_number);
                $('#success_remove, #error_remove').hide();
                $('#error_remove').empty();
            });

        $(document)
            .off('click.pisInvDock', '.btn_update')
            .on('click.pisInvDock', '.btn_update', function () {
                var docket_number = $(this).data('docket');
                var petitionerId = $(this).data('cid');
                var officeId = $.cookie('field_office_id');
                window.location.href = joinApiUrl(
                    api,
                    'pis/investigation_docket_update?docket_number=' +
                        encodeURIComponent(docket_number) +
                        '&officeId=' +
                        encodeURIComponent(officeId) +
                        '&petitionerId=' +
                        encodeURIComponent(petitionerId)
                );
            });

        $(document)
            .off('click.pisInvDock', '.btn_view')
            .on('click.pisInvDock', '.btn_view', function () {
                var docket_number = $(this).data('docket');
                var officeId = $.cookie('field_office_id');
                window.location.href = joinApiUrl(
                    api,
                    'pis/investigation_docket_view?docket_number=' +
                        encodeURIComponent(docket_number) +
                        '&officeId=' +
                        encodeURIComponent(officeId)
                );
            });

        $(document)
            .off('click.pisInvDock', '.btn_attachments')
            .on('click.pisInvDock', '.btn_attachments', function () {
                var docket_number = $(this).data('docket');
                var fi = $(this).data('oi');
                window.location.href = joinApiUrl(
                    api,
                    'pis/pis-investigation-file-upload?docket_number=' +
                        encodeURIComponent(docket_number) +
                        '&officeId=' +
                        encodeURIComponent(fi)
                );
            });
    }

    function bindRemoveModalConfirm() {
        $('#removeModal')
            .off('click.pisInvDockRm', '.btn_remove_confirm')
            .on('click.pisInvDockRm', '.btn_remove_confirm', function (e) {
                e.preventDefault();
                var $modal = $('#removeModal');
                var docket_number = $modal.data('pendingDocket');
                var office_id = $modal.data('pendingOfficeId');
                if (
                    docket_number === undefined ||
                    docket_number === null ||
                    docket_number === ''
                ) {
                    $('#error_remove').text('Missing docket. Close this dialog and try again.').show();
                    return;
                }
                if (office_id === undefined || office_id === null || office_id === '') {
                    $('#error_remove').text('Missing office. Close this dialog and try again.').show();
                    return;
                }

                $('#error_remove').hide().empty();

                var $btn = $('.btn_remove_confirm').prop('disabled', true);
                __executeExternalPost(
                    '8000/docketbook/remove/' + docket_number + '/' + office_id,
                    {}
                ).done(function (result) {
                    $btn.prop('disabled', false);
                    if (result.status !== 'ERROR') {
                        $('#success_remove').show();
                        $('#error_remove').hide().empty();
                        setTimeout(function () {
                            $('#removeModal').modal('hide');
                            $('#success_remove').hide();
                            $('#error_remove').hide().empty();
                            if (investigationListDataTable) {
                                investigationListDataTable.ajax.reload(null, false);
                            }
                        }, 1000);
                    } else {
                        $('#success_remove').hide();
                        var rmMsg = formatClientErrorMessage(
                            result && result.message,
                            'Remove failed. Please try again.'
                        );
                        $('#error_remove').text(rmMsg).show();
                    }
                });
            });
    }

    function initInvestigationListDataTable() {
        $(TABLE_SEL)
            .off('draw.dt.pisInvDock')
            .on('draw.dt.pisInvDock', function () {
                buttonVisibility();
            });

        investigationListDataTable = $(TABLE_SEL).DataTable({
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
            ajax: investigationListAjax,
            columns: tableColumns()
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
                    if (!data || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return data;
                }
            },
            {
                data: 'receivedDateByPPO',
                render: function (data) {
                    if (!data || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return data;
                }
            },
            {
                data: null,
                render: function (data) {
                    var name;
                    if (
                        isNamePartEmpty(data.firstName) &&
                        isNamePartEmpty(data.middleName) &&
                        isNamePartEmpty(data.lastName) &&
                        isNamePartEmpty(data.suffixName)
                    ) {
                        name = data.fullName || 'N/A';
                    } else if (
                        data.firstName === '' &&
                        data.middleName === '' &&
                        data.lastName === '' &&
                        data.suffixName === ''
                    ) {
                        name = data.fullName || 'N/A';
                    } else {
                        name =
                            (data.firstName ?? '') +
                            ' ' +
                            (data.middleName ?? '') +
                            ' ' +
                            (data.lastName ?? '') +
                            ' ' +
                            (data.suffixName ?? '');
                    }
                    var t = String(name).trim();
                    return t === '' ? 'N/A' : t;
                }
            },
            {
                data: 'criminalCaseNumber',
                render: function (data) {
                    if (!data || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return data;
                }
            },
            {
                data: 'fieldOfficeName',
                render: function (data) {
                    if (!data || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return data;
                }
            },
            {
                data: null,
                render: function (data) {
                    var dn = escAttr(data.docketNumber);
                    var cid = escAttr(data.clientId);
                    var oi = escAttr(data.fieldOfficeId);
                    return (
                        '<div class="pis-inv-docket-actions" role="group" aria-label="Actions for docket ' +
                        dn +
                        '">' +
                        '<button type="button" class="btn btn-sm btn-primary btn_view pb_inv_view" data-docket="' +
                        dn +
                        '" data-petitionerid="' +
                        cid +
                        '" aria-label="View docket ' +
                        dn +
                        '" title="View"><i class="fa fa-eye" aria-hidden="true"></i> View</button>' +
                        ' <button type="button" class="btn btn-sm btn-primary btn_update pb_inv_update" data-docket="' +
                        dn +
                        '" data-cid="' +
                        cid +
                        '" aria-label="Update docket ' +
                        dn +
                        '" title="Update"><i class="fa fa-edit" aria-hidden="true"></i> Update</button>' +
                        '  <button type="button" class="btn btn-sm btn-primary btn_attachments pb_inv_attachments" data-docket="' +
                        dn +
                        '" data-oi="' +
                        oi +
                        '" aria-label="Attachments for docket ' +
                        dn +
                        '" title="Attachments"><i class="fa fa-paperclip" aria-hidden="true"></i> Attachments</button>' +
                        ' <button type="button" class="btn btn-sm btn-danger btn_remove pb_inv_remove" data-toggle="modal" data-target="#removeModal" data-docket="' +
                        dn +
                        '" data-oi="' +
                        oi +
                        '" aria-label="Remove docket ' +
                        dn +
                        '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>' +
                        '</div>'
                    );
                }
            }
        ];
    }

    function wireSearchAndModalUi() {
        $(document)
            .off('click.pisInvDockSearch', '.docket_search')
            .on('click.pisInvDockSearch', '.docket_search', function () {
                if (!investigationListDataTable) {
                    return;
                }
                hidePisInvSearchError();
                investigationListDataTable.ajax.reload(null, true);
            });

        $(document)
            .off('click.pisInvDockSearch', '.sup-docket-search-clear')
            .on('click.pisInvDockSearch', '.sup-docket-search-clear', function (e) {
                e.preventDefault();
                $('.docketSearchInput').val('');
                updatePisInvSearchClearState();
                hidePisInvSearchError();
                if (investigationListDataTable) {
                    investigationListDataTable.ajax.reload(null, true);
                }
                $('.docketSearchInput').trigger('focus');
            });

        $(document)
            .off('input.pisInvDockSearch', '.docketSearchInput')
            .on('input.pisInvDockSearch', '.docketSearchInput', function () {
                updatePisInvSearchClearState();
            });

        $(document)
            .off('keydown.pisInvDockSearch', '.docketSearchInput')
            .on('keydown.pisInvDockSearch', '.docketSearchInput', function (e) {
                if (e.key === 'Enter' || e.which === 13) {
                    e.preventDefault();
                    $('.docket_search').trigger('click');
                }
            });

        $('#removeModal')
            .off('hidden.bs.modal.pisInvDock')
            .on('hidden.bs.modal.pisInvDock', function () {
                $('#success_remove, #error_remove').hide();
                $('#error_remove').empty();
                $('.btn_remove_confirm').prop('disabled', false);
            });
    }

    if (!api) {
        setPisInvDocketListLoader(false);
        var configMsg =
            '<div class="alert alert-warning investigation-docket-api-missing mb-3" role="alert">' +
            'Application configuration is missing (API base URL). ' +
            'Try refreshing the page. If this continues, ensure browser storage is enabled or contact your administrator.' +
            '</div>';
        var $cardBody = $(TABLE_SEL).closest('.card-body');
        if ($cardBody.length) {
            $cardBody.prepend(configMsg);
            $(TABLE_SEL).hide();
        } else {
            alert(
                'Application configuration is missing (API base URL). Try refreshing the page or contact your administrator.'
            );
        }
        return;
    }

    function startInvestigationDocketListPage() {
        wireSearchAndModalUi();
        bindRowActionsOnce();
        bindRemoveModalConfirm();
        initInvestigationListDataTable();
        injectSearch();
        updatePisInvSearchClearState();
    }

    resolveFieldOfficeId(function (fieldOfficeId) {
        if (fieldOfficeId == null || String(fieldOfficeId).trim() === '') {
            setPisInvDocketListLoader(false);
            showPisInvSearchError('Your field office could not be determined. Please sign in again.');
            return;
        }
        startInvestigationDocketListPage();
    });
})(jQuery);
