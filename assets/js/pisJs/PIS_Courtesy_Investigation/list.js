    ( function ( $ ) {

        var api = localStorage.getItem('api');
        var ___ctx = api;
        var COURTESY_INV_CLIENT_TYPE = 'PROBATIONER';
        var courtesyListDataTable = null;

        function joinApiUrl(base, path) {
            var b = String(base == null ? '' : base).replace(/\/+$/, '');
            var p = String(path == null ? '' : path).replace(/^\/+/, '');
            if (!b) {
                return p;
            }
            if (!p) {
                return b;
            }
            // localStorage api is often "http://localhost:"; port + path come as "8000/docketbook..." (no extra '/').
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

        function isCourtesyNamePartEmpty(v) {
            return v === null || v === undefined || String(v).trim() === '';
        }

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = joinApiUrl(__getContext(), path);
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "GET",
                url: path,
                dataType: "json",
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');

                d.resolve({
                    status : 'ERROR',
                    message : request
                });

                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });

            return d.promise();
        };
        var __executeExternalPost = function(path, jsonObj, customLoader) {
            path = joinApiUrl(__getContext(), path);
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                headers: {
                    'Content-Type':'application/json'
                },
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');

                d.resolve({
                    status : 'ERROR',
                    message : request
                });

                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });

            return d.promise();
        };

        function setCourtesyListLoader(visible) {
            var $el = $('#courtesyInvListLoader');
            if (visible) {
                $el.show();
                $el.attr('aria-busy', 'true');
            } else {
                $el.hide();
                $el.attr('aria-busy', 'false');
            }
        }

        function showCourtesySearchError(message) {
            $('#courtesyInvListSearchError').text(message).show();
        }

        function hideCourtesySearchError() {
            $('#courtesyInvListSearchError').hide().empty();
        }

        function updateCourtesySearchClearState() {
            var hasTerm = !!($('.docketSearchInput').val() || '').trim();
            $('.sup-docket-search-wrap').toggleClass('has-value', hasTerm);
        }

        function searchTermForAjax() {
            return ($('.docketSearchInput').val() || '').trim();
        }

        var searchHtml = '<div class="sup-docket-search-toolbar" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
            '<label for="courtesy_inv_docket_search" style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
            '<div class="sup-docket-search-wrap" style="width: 250px; max-width: 100%;">' +
            '<input type="text" id="courtesy_inv_docket_search" class="form-control form-control-sm docketSearchInput sup-docket-search-input" placeholder="Search docket / name" autocomplete="off">' +
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
                updateCourtesySearchClearState();
            }
        }

        function courtesyListAjax(data, callback /*, settings */) {
            setCourtesyListLoader(true);
            hideCourtesySearchError();

            var page = data.start / data.length;
            var size = data.length;
            var fieldOfficeId = $.cookie('field_office_id');
            var term = searchTermForAjax();

            function finishFail(message) {
                showCourtesySearchError(message);
                callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: []
                });
            }

            if (!term) {
                $.ajax({
                    url: joinApiUrl(___ctx, '8000/docketbook'),
                    type: 'GET',
                    dataType: 'json',
                    cache: true,
                    data: {
                        page: page,
                        size: size,
                        type: 'PIS_CSINV',
                        officeId: fieldOfficeId
                    }
                }).done(function (json) {
                    callback({
                        recordsTotal: json.totalElements,
                        recordsFiltered: json.totalElements,
                        data: json.content || []
                    });
                }).fail(function () {
                    finishFail('Could not load dockets. Please try again.');
                }).always(function () {
                    setCourtesyListLoader(false);
                });
            } else {
                $.ajax({
                    url: joinApiUrl(___ctx, '8000/docketbook/search/' + COURTESY_INV_CLIENT_TYPE + '?page=' + page + '&size=' + size),
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                        name: term,
                        fieldOfficeId: fieldOfficeId,
                        canSeeOtherOffices: false
                    })
                }).done(function (json) {
                    callback({
                        recordsTotal: json.totalElements,
                        recordsFiltered: json.totalElements,
                        data: json.content || []
                    });
                }).fail(function () {
                    finishFail('Search could not be completed. Please try again.');
                }).always(function () {
                    setCourtesyListLoader(false);
                });
            }
        }

        function buttonVisibility (){
            var data = JSON.parse(localStorage.getItem('permission'));
            if (data != null) {
                data.forEach(function(data){
                    if (data.type == "ACTION") {
                        setTimeout(function() {
                            if (!data.value) {
                                var element = $('.' + data.detail);
                                element.hide();
                            }else{
                                var element = $('.' + data.detail);
                                element.show();
                            }
                        }, 10);
                    }else if (data.type == "VIEW") {
                        if (!data.value) {
                            var element = $('.' + data.detail);
                            element.hide();
                        }else{
                            var element = $('.' + data.detail);
                            element.show();
                        }
                    }else{
                    }
                });
            }
        }

        function buttonFunctionality(){
            $(".btn_remove").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var office_id = $(this).data("oi");
                $("#removeModal").data("pendingDocket", docket_number).data("pendingOfficeId", office_id);
                $(".docket").html(docket_number);
                $("#success_remove, #error_remove").hide();
                $("#error_remove").empty();
            });

            $(".btn_update").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var petitionerId = $(this).data("cid");
                var officeId = $.cookie("field_office_id");
                window.location.href = joinApiUrl(api, 'pis/probation-courtesy-investigation-update?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId) + '&petitionerId=' + encodeURIComponent(petitionerId));
            });
            $(".btn_view").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var officeId = $.cookie("field_office_id");
                window.location.href = joinApiUrl(api, 'pis/probation-courtesy-investigation-view?docket_number=' + encodeURIComponent(docket_number) + '&officeId=' + encodeURIComponent(officeId));
            });
            $(".btn_attachments").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var id = $(this).data("id");
                var type = $(this).data("type");
                var fi = $(this).data("oi");
                window.location.href = joinApiUrl(api, 'pis/probation-courtesy-investigation-uploads?docket_number=' + encodeURIComponent(docket_number) + '&id=' + encodeURIComponent(id) + '&type=investigation&fi=' + encodeURIComponent(fi));
            });
        }

        function bindRemoveModalConfirm() {
            $("#removeModal").on("click", ".btn_remove_confirm", function (e) {
                e.preventDefault();
                var $modal = $("#removeModal");
                var docket_number = $modal.data("pendingDocket");
                var office_id = $modal.data("pendingOfficeId");
                if (docket_number === undefined || docket_number === null || docket_number === "") {
                    return;
                }
                if (office_id === undefined || office_id === null) {
                    return;
                }

                $("#error_remove").hide().empty();

                __executeExternalPost("8000/docketbook/remove/" + docket_number + "/" + office_id, JSON.stringify({})).done(function (result) {
                    if (result.status != "ERROR") {
                        $("#success_remove").show();
                        $("#error_remove").hide().empty();
                        setTimeout(function () {
                            $("#removeModal").modal("hide");
                            $("#success_remove").hide();
                            $("#error_remove").hide().empty();
                            if (courtesyListDataTable) {
                                courtesyListDataTable.ajax.reload(null, false);
                            }
                        }, 1000);
                    } else {
                        $("#success_remove").hide();
                        $("#error_remove").text("Remove failed. Please try again.").show();
                    }
                });
            });
        }

        function initCourtesyListDataTable() {
            var $table = $(".table_head");
            $table.off("draw.dt.courtesyInv").on("draw.dt.courtesyInv", function() {
                buttonFunctionality();
                buttonVisibility();
            });

            courtesyListDataTable = $table.DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": true,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "language": {
                    "emptyTable": "No dockets found.",
                    "zeroRecords": "No dockets found."
                },
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "15%", "targets": [1] },
                    { "width": "20%", "targets": [2] },
                    { "width": "15%", "targets": [3] },
                    { "width": "15%", "targets": [4] },
                    { "width": "30%", "targets": [5] }
                ],
                "ajax": courtesyListAjax,
                "columns": tableColumns()
            });
        }

        $(document).on("click", ".docket_search", function () {
            if (!courtesyListDataTable) {
                return;
            }
            hideCourtesySearchError();
            courtesyListDataTable.ajax.reload(null, true);
        });

        $(document).on("click", ".sup-docket-search-clear", function (e) {
            e.preventDefault();
            $('.docketSearchInput').val('');
            updateCourtesySearchClearState();
            hideCourtesySearchError();
            if (courtesyListDataTable) {
                courtesyListDataTable.ajax.reload(null, true);
            }
            $('.docketSearchInput').trigger('focus');
        });

        $(document).on("input", ".docketSearchInput", function () {
            updateCourtesySearchClearState();
        });

        $(document).on("keypress", ".docketSearchInput", function (e) {
            if (e.which === 13) {
                e.preventDefault();
                $(".docket_search").trigger("click");
            }
        });

        $("#removeModal").on("hidden.bs.modal", function () {
            $("#success_remove, #error_remove").hide();
            $("#error_remove").empty();
        });

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
                    }
                },
                {
                    "data": 'docketNumber'
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return `${data.dateCompletedAndReturned === null || data.dateCompletedAndReturned === "" ? "N/A" : data.dateCompletedAndReturned}`
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var name;
                        if (
                            isCourtesyNamePartEmpty(data.firstName) &&
                            isCourtesyNamePartEmpty(data.middleName) &&
                            isCourtesyNamePartEmpty(data.lastName) &&
                            isCourtesyNamePartEmpty(data.suffixName)
                        ) {
                            name = data.fullName || "N/A";
                        } else {
                            name = (data.firstName ?? "") + " " + (data.middleName ?? "") + " " + (data.lastName ?? "") + " " + (data.suffixName ?? "");
                        }
                        return name.trim();
                    }
                },
                {
                    "data": 'fieldOfficeName'
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        var dn = escAttr(data.docketNumber);
                        var cid = escAttr(data.clientId);
                        var oi = escAttr(data.fieldOfficeId);
                        return (
                            '<div class="courtesy-inv-actions" role="group" aria-label="Actions for docket ' + dn + '">' +
                            '<button type="button" class="btn btn-sm btn-primary btn_view pb_cinv_view" data-docket="' + dn + '" aria-label="View docket ' + dn + '" title="View"><i class="fa fa-eye" aria-hidden="true"></i> View</button>' +
                            '<button type="button" class="btn btn-sm btn-primary btn_update pb_cinv_update" data-docket="' + dn + '" data-cid="' + cid + '" aria-label="Update docket ' + dn + '" title="Update"><i class="fa fa-edit" aria-hidden="true"></i> Update</button>' +
                            '<button type="button" class="btn btn-sm btn-primary btn_attachments pb_cinv_attachments" data-docket="' + dn + '" data-id="' + cid + '" data-type="investigation" data-oi="' + oi + '" aria-label="Attachments for docket ' + dn + '" title="Attachments"><i class="fa fa-paperclip" aria-hidden="true"></i> Attachments</button>' +
                            '<button type="button" class="btn btn-sm btn-danger btn_remove pb_cinv_remove" data-toggle="modal" data-target="#removeModal" data-docket="' + dn + '" data-oi="' + oi + '" aria-label="Remove docket ' + dn + '" title="Remove"><i class="fa fa-remove" aria-hidden="true"></i> Remove</button>' +
                            '</div>'
                        );
                    }
                }
            ]
        }

        bindRemoveModalConfirm();
        initCourtesyListDataTable();
        injectSearch();
        updateCourtesySearchClearState();

    } )( jQuery );
