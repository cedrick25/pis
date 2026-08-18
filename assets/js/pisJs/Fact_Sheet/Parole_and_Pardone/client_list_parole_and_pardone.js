( function ( $ ) {

    var api = localStorage.getItem('api');
    var ___ctx = api;
    console.log(___ctx)

    var __setContext = function(newctx) {
        ___ctx = newctx;
    };

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
            header: {
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

    var officeId = $.cookie("field_office_id");
    let petitionerData;
    let clientType;
    function buttonFunctionality(){
        $(".btn_worksheet").unbind("click").on("click", function(){
            var client_id   = $(this).data("id");
            var foid        = $(this).data("foid");
            // window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
            window.location.href = api+'/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
        })
        $(".btn_update").unbind("click").on("click", function(){
            var client_id = $(this).data("id");
            window.location.href = api+'/pis/client_list_parole_and_pardone_update?client_id='+client_id;
            // window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;

        })
        $(".btn_upload").unbind("click").on("click", function(){
            var client_id = $(this).data("id");
            var client_type = $(this).data("type");
            window.location.href = api+'/pis/client_list_parole_and_pardone_upload?client_id='+client_id+'&client_type='+client_type;
        })
        $(".btn_view").unbind("click").on("click", function(){
            var client_id = $(this).data("id");
            var client_type = $(this).data("type");
            // console.log(client_type)
            window.location.href = api+'/pis/client_list_parole_and_pardone_view_attachments?client_id='+client_id+'&client_type='+client_type;
        }) 
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

    function drawTable(clientType) {
        // Check if DataTable has already been initialized
        if (!$.fn.DataTable.isDataTable('.table_head')) {
            // Initialize the DataTable
            $('.table_head').DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": true,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "25%", "targets": [1] },
                    { "width": "25%", "targets": [2] },
                    { "width": "25%", "targets": [3] },
                    { "width": "20%", "targets": [4] },
                ],
                ajax: {
                    url: api + "8000/petitioner", // Base URL remains the same
                    type: 'GET',
                    cache: true,
                    data: function (d) {
                        // Dynamically add the current 'type' parameter
                        return {
                            page: d.start / d.length,  // Pagination
                            size: d.length,            // Page size
                            type: clientType,          // Pass the updated clientType (PAROLEE/PARDONEE)
                            officeId: $.cookie('field_office_id')
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
                columns: tableColumns() // Call your function to get table columns
            });

            // Event listener for when the DataTable is drawn
            $('.table_head').on('draw.dt', function () {
                buttonFunctionality();
                buttonVisibility();
            });
        } else {
            // If DataTable is already initialized, update the ajax.data with new clientType
            var table = $('.table_head').DataTable();

            // Modify the ajax data function to use the new clientType
            table.settings()[0].ajax.data = function(d) {
                console.log("Updated client type on reload:", clientType);
                return {
                    page: d.start / d.length,  // Pagination
                    size: d.length,            // Page size
                    type: clientType,          // Pass the new clientType dynamically
                    officeId: $.cookie('field_office_id')
                };
            };

            // Reload the table data with the updated clientType
            table.ajax.reload(null, false);  // Pass 'false' to prevent resetting the paging
        }
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
                "data": null,
                "render": function (data, type, row, meta) {
                    if (
                        data.firstName === null &&
                        data.middleName === null &&
                        data.lastName === null &&
                        data.suffixName === null
                    ) {
                        return data.fullName || "N/A";
                    }
                    var name = `${data.firstName ?? ""} ${data.middleName ?? ""} ${data.lastName ?? ""} ${data.suffixName ?? ""}`.trim();
                    return name || "N/A";
                }
            },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    if (data.criminalCaseNo === null || data.criminalCaseNo === "") {
                        return "N/A";
                    }
                    return data.criminalCaseNo;
                }
            },
            {
                "data": 'fieldOfficeName',
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    // setTimeout (function (){
                    // },1000)
                    // console.log(clientDataStorage.length)
                    // if (!loggedValues.has(data)) {
                    //     if (clientDataStorage.length > 0 && clientDataStorage[0].petitionerId == data.id) {
                    //         if (clientDataStorage[0].worksheetStatus == "COMPLETED") {
                    //             console.log("Show")
                    //             return "<button class='btn btn-sm btn-primary btn_update' data-permission='can_edit_fact_sheet_probation' type='submit' data-id='" + data.id + "'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload' data-permission='can_attachments_fact_sheet_probation' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet' data-permission="can_worksheet_fact_sheet_probation" perm_worksheet' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir' data-permission="can_psir_fact_sheet_probation" perm_psir' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-plus-circle'></i> PSIR</button> <button class='btn btn-sm btn-success btn_pdfPSIR' data-permission="can_generate_psir_fact_sheet_probation" perm_pdfPSIR' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-download'></i> Generate PSIR</button>";
                    //         }
                    //     } else {
                    //         console.log("Hide")
                    //         // return "<button class='btn btn-sm btn-primary btn_update' data-permission='can_edit_fact_sheet_probation' type='submit' data-id='" + data.id + "'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload' data-permission='can_attachments_fact_sheet_probation' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet' data-permission="can_worksheet_fact_sheet_probation" perm_worksheet' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-plus-circle'></i> Worksheet</button>";
                    //     }
                    //     loggedValues.add(data);
                    // }
                    // // Return an empty string if the condition is not met
                    // return "";
                    // <button class='btn btn-sm btn-primary btn_pecir' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-plus-circle'></i> PECIR</button>
                    return "<button class='btn btn-sm btn-primary btn_update' data-permission='can_edit_fact_sheet_parole_pardone' type='submit' data-id='" + data.id + "'><i class='fa fa-edit'></i> Update</button> <button class='btn btn-sm btn-primary btn_upload' data-permission='can_attachments_fact_sheet_parole_pardone' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-upload'></i> Attachments</button>";
                }
            }
        ]
    }
    // <button class='btn btn-sm btn-success btn_worksheet' data-permission="can_worksheet_fact_sheet_probation" perm_worksheet' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir' data-permission="can_psir_fact_sheet_probation" perm_psir' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-plus-circle'></i> PSIR</button> <button class='btn btn-sm btn-success btn_pdfPSIR' data-permission="can_generate_psir_fact_sheet_probation" perm_pdfPSIR' type='submit' data-id='" + data.id + "' data-foid='" + data.fieldOfficeId + "'><i class='fa fa-download'></i> Generate PSIR</button>

    var searchHtml = '<div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">' +
        '<label style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
        '<input type="text" class="form-control form-control-sm searchInput" placeholder="Search Client" style="width: 250px;">' +
        '<button class="btn btn-primary btn-sm client_search"><i class="fa fa-search"></i></button>' +
        '</div>';

    function injectSearch(value) {
        var $target = $('.dataTables_length').parent().next();
        if ($target.length) {
            $target.html(searchHtml);
            if (value) $target.find('.searchInput').val(value);
        }
    }

    var tableParolee = document.getElementById('client_pr');

    if (tableParolee.classList.contains("active")) {
        clientType = "PAROLEE";
        drawTable(clientType);
        injectSearch();
    }

    tableParolee.addEventListener('click', function(e) {
        e.preventDefault();
        $('#client_pd').removeClass('active');
        $('#client_pr').addClass('active');
        clientType = "PAROLEE";
        if ($.fn.DataTable.isDataTable('.table_head')) {
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
        }
        drawTable(clientType);
        injectSearch();
    });

    var tablePardonee = document.getElementById('client_pd');

    tablePardonee.addEventListener('click', function(e) {
        e.preventDefault();
        $('#client_pr').removeClass('active');
        $('#client_pd').addClass('active');
        clientType = "PARDONEE";
        if ($.fn.DataTable.isDataTable('.table_head')) {
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
        }
        drawTable(clientType);
        injectSearch();
    });

    $(document).on('keypress', '.searchInput', function(e) {
        if (e.which === 13) {
            $('.client_search').trigger('click');
        }
    });

    $(document).on("click", ".client_search", function() {
        var searchVal = $('.searchInput').val().trim();

        if ($.fn.DataTable.isDataTable('.table_head')) {
            $('.table_head').DataTable().destroy();
        }
        $('.table_body').empty();

        if (!searchVal) {
            drawTable(clientType);
            injectSearch();
            return;
        }

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
                { "width": "25%", "targets": [1] },
                { "width": "25%", "targets": [2] },
                { "width": "25%", "targets": [3] },
                { "width": "20%", "targets": [4] },
            ],
            "ajax": function(data, callback, settings) {
                var page = data.start / data.length;
                var size = data.length;
                $.ajax({
                    url: `${___ctx}8000/petitioner/search/${clientType}?page=${page}&size=${size}`,
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
        });

        injectSearch(searchVal);
    });

} )( jQuery );