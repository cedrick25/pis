    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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
            path = __getContext() + path;
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
                    // 'Content-Type': 'multipart/form-data;'
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

        function buttonVisibility (){
            var data = JSON.parse(localStorage.getItem('permission'));
            if (data != null) {
                data.forEach(function(data){
                    if (data.type == "ACTION") {
                        // console.log(data.value)
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
                $(".docket").html(docket_number)
                $(".btn_remove_confirm").unbind("click").on("click", function(){

                    __executeExternalPost('8000/docketbook/remove/'+docket_number+'/'+office_id).done(function (result) {
                        if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_remove').show();
                                    setTimeout(function () {
                                        $('#removeModal').modal('hide');
                                        $('#success_remove').hide();
                                        $('.table_head').DataTable().ajax.reload();
                                    }, 1000);
                        }else{
                            alert("failed")
                        }
                    })
                })
            })

            $(".btn_update").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                window.location.href = api+'/pis/parole-pardon-courtesy-supervision-update?docket_number='+docket_number;
            })
            $(".btn_view").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                window.location.href = api+'/pis/parole-pardon-courtesy-supervision-view?docket_number='+docket_number;
            })
            $(".btn_attachments").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                window.location.href = api+'/pis/parole-pardon-courtesy-supervision-upload?docket_number='+docket_number;
            })
        }
        function drawTable() {
            $('.table_head').DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": true,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "20%", "targets": [1] },
                    { "width": "20%", "targets": [2] },
                    { "width": "25%", "targets": [3] },
                    { "width": "30%", "targets": [4] },
            ],
            ajax: {
                url: api+"8000/docketbook",
                type: 'GET',
                cache: true,
                data: function (d) {
                return {
                    page: d.start / d.length,  // Pagination
                    size: d.length,            // Page size
                    // name: d.search.value    // Pass search term as 'keyword'
                    type: "SC_PPI_CSUP",
                    officeId: $.cookie('field_office_id')

                };
                },
                dataFilter: function(data) {
                    var json = jQuery.parseJSON(data);
                    json.recordsTotal = json.totalElements;
                    json.recordsFiltered = json.totalElements;
                    json.data = json.content;
                    return JSON.stringify(json);
                }
            },
            columns: tableColumns()
            });
            $('.table_head').on('draw.dt', function() {
                buttonFunctionality();
                buttonVisibility();
                $(".btn_view").show(); // temporarily show the view button for testing
            });
        }

        var searchModalHtml = '' +
            '<div class="modal fade" id="docketSearchModal" tabindex="-1" role="dialog" aria-labelledby="docketSearchModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h5 class="modal-title" id="docketSearchModalLabel">Search Docket</h5>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<div class="form-group">' +
                                '<label for="docketSearchClientType">Client Type</label>' +
                                '<select class="form-control" id="docketSearchClientType">' +
                                    '<option value="PAROLEE">Parole</option>' +
                                    '<option value="PARDONEE">Pardon</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="docketSearchKeyword">Search</label>' +
                                '<input type="text" class="form-control" id="docketSearchKeyword" placeholder="Docket Number, CC Number, Name">' +
                            '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                            '<button type="button" class="btn btn-primary docket_search_submit"><i class="fa fa-search"></i> Search</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        var searchButtonHtml = '<div style="display: flex; align-items: center; justify-content: flex-end;">' +
            '<button type="button" class="btn btn-primary btn-sm docket_search_open" data-toggle="modal" data-target="#docketSearchModal">' +
                '<i class="fa fa-search"></i> Search' +
            '</button>' +
            '</div>';

        function injectSearch() {
            if (!$('#docketSearchModal').length) {
                $('body').append(searchModalHtml);
            }
            var $target = $('.dataTables_length').parent().next();
            if ($target.length) {
                $target.html(searchButtonHtml);
            }
        }

        function drawSearchTable(searchVal, clientType) {
            var fieldOfficeId = $.cookie('field_office_id');

            $('.table_head').DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": true,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "20%", "targets": [1] },
                    { "width": "20%", "targets": [2] },
                    { "width": "25%", "targets": [3] },
                    { "width": "30%", "targets": [4] },
                ],
                "ajax": function(data, callback, settings) {
                    var page = data.start / data.length;
                    var size = data.length;
                    $.ajax({
                        url: `${___ctx}8000/docketbook/search/${clientType}?page=${page}&size=${size}`,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            name: searchVal,
                            fieldOfficeId: fieldOfficeId,
                            canSeeOtherOffices: false
                        }),
                        success: function(json) {
                            callback({
                                recordsTotal: json.totalElements,
                                recordsFiltered: json.totalElements,
                                data: json.content || []
                            });
                        }
                    });
                },
                columns: tableColumns()
            });

            $('.table_head').on('draw.dt', function() {
                buttonFunctionality();
                buttonVisibility();
                $(".btn_view").show(); // temporarily show the view button for testing
            });
        }

        $(document).on('keypress', '#docketSearchKeyword', function(e) {
            if (e.which === 13) {
                $('.docket_search_submit').trigger('click');
            }
        });

        $(document).on('click', '.docket_search_submit', function() {
            var searchVal = $('#docketSearchKeyword').val().trim();
            var clientType = $('#docketSearchClientType').val() || 'PAROLEE';

            $('#docketSearchModal').modal('hide');

            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            if (!searchVal) {
                drawTable();
                injectSearch();
                return;
            }

            drawSearchTable(searchVal, clientType);
            injectSearch();
        });

        function formatTableValue(value) {
            if (value === null || value === undefined) {
                return "N/A";
            }

            if (typeof value === "string" && value.trim() === "") {
                return "N/A";
            }

            return value;
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
                    }
                },
                {
                    "data": 'docketNumber',
                    "render": function(data) {
                        return formatTableValue(data);
                    }
                },
                {
                    "data": "fullName",
                    "render": function(data) {
                        return formatTableValue(data);
                    }
                },
                {
                    "data": 'referringOfficeCourtesySup',
                    "render": function(data) {
                        return formatTableValue(data);
                    }
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_view ppr_csup_view' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-primary btn_update ppr_csup_update' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-primary btn_attachments ppr_cinv_attachments' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-upload'></i> Attachments</button> <button class='btn btn-sm btn-danger btn_remove ppr_csup_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button>";
                    }
                }
            ]
        }
        drawTable();
        injectSearch();

    } )( jQuery );