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

    function buttonFunctionality(){
    $(".btn_update").unbind("click").on("click", function(){
        console.log("button update click")
        var client_id = $(this).data("id");
        var client_type = $(this).data("type")
        window.location.href = api+'/pis/client_update_single_carpeta?client_id='+client_id+'&client_type='+client_type;
        // window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;

    })
    $(".btn_view").unbind("click").on("click", function(){
        console.log("button view click")
        var client_id = $(this).data("id");
        var client_type = $(this).data("type")
        window.location.href = api+'/pis/pdl-view?client_id='+client_id+'&client_type='+client_type;
        // window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;

    })
    $(".btn_upload").unbind("click").on("click", function(){
        var client_id = $(this).data("id");
        var client_type = $(this).data("type");
        console.log(client_type, client_id)
        window.location.href = api+'/pis/client_single_carpeta_upload?client_id='+client_id+'&client_type='+client_type;
    })
    // $(".btn_view").unbind("click").on("click", function(){
    //     var client_id = $(this).data("id");
    //     var client_type = $(this).data("type");
    //     // console.log(client_type)
    //     window.location.href = api+'/pis/client_view_upload_single_carpeta?client_id='+client_id+'&client_type='+client_type;
    // })
    $(".btn_remove").unbind("click").on("click", function(){
        var data_id = $(this).data("id");
        console.log(data_id)
        $("#removeModal").modal("show")
        $(".btn_confirm_remove").unbind("click").on("click", function(){
            __executeExternalPost('8000/petitioner/remove/'+data_id).done(function (result) {
                if (result.status != "ERROR") {
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
    }

    var dataTable;
    var currentType = "PDL - Investigation"; // Store current type
    var userRole = localStorage.getItem("userRole")
    const managerIds = JSON.parse(localStorage.getItem("managerId") || "[]");

    function drawTable(type) {
        currentType = type; // Update current type

        if (!dataTable) {
            dataTable = $('.table_head').DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": false,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "12%", "targets": [1] },
                    { "width": "13%", "targets": [2] },
                    { "width": "15%", "targets": [3] },
                    { "width": "15%", "targets": [4] },
                    { "width": "15%", "targets": [5] },
                    { "width": "25%", "targets": [6] },
                ],
                ajax: {
                    url: api + "8000/petitioner",
                    type: 'GET',
                    cache: true,
                    data: function (d) {
                        return {
                            page: d.start / d.length,
                            size: d.length,
                            type: currentType, // Use dynamic type here
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
            });
        } else {
            // Just reload with updated type
            dataTable.ajax.reload();
        }
    }
    
    let sectionChiefTableInitialized = false;
    let sectionChiefPage = 0;
    let sectionChiefSize = 10;

    function sectionChiefTable(type) {
        currentType = type;

        // Prevent multiple re-inits
        if (sectionChiefTableInitialized && $.fn.DataTable.isDataTable('.table_head')) {
            $('.table_head').DataTable().ajax.reload(null, false); // reload without resetting paging
            return;
        }

        $('.table_head').DataTable({
            destroy: true,
            processing: true,
            serverSide: true,
            scrollX: true,
            searching: false,
            lengthMenu: [10, 25, 50, 100],
            pageLength: sectionChiefSize,
            columnDefs: [
                { width: "5%", targets: [0] },
                { width: "12%", targets: [1] },
                { width: "13%", targets: [2] },
                { width: "15%", targets: [3] },
                { width: "15%", targets: [4] },
                { width: "15%", targets: [5] },
                { width: "25%", targets: [6] }
            ],
            ajax: {
                url: ___ctx + '8000/petitioner/section-chief',
                type: 'POST',
                contentType: 'application/json',
                data: function (d) {
                    // Store current paging info for next reload
                    sectionChiefPage = d.start / d.length;
                    sectionChiefSize = d.length;

                    return JSON.stringify({
                        userList: managerIds
                    });
                },
                dataType: 'json',
                beforeSend: function (xhr, settings) {
                    const params = $.param({
                        page: sectionChiefPage,
                        size: sectionChiefSize,
                        type: currentType,
                        officeId: $.cookie('field_office_id')
                    });
                    settings.url += '?' + params;
                },
                dataFilter: function (data) {
                    var json = jQuery.parseJSON(data);
                    json.recordsTotal = json.totalElements || 0;
                    json.recordsFiltered = json.totalElements || 0;
                    json.data = json.content || [];
                    return JSON.stringify(json);
                }
            },
            columns: tableColumns()
        }).on('draw.dt', function () {
            buttonFunctionality();
        });

        sectionChiefTableInitialized = true;
    }

    let clientType;
    function tableColumns() {
        return [
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            {
                "data": 'firstName',
            },
            {
                "data": 'middleName',
            },
            {
                "data": 'lastName',
            },
            {
                data: 'criminalCaseNo',
                render: function (data, type, row) {
                    try {
                        // Attempt to parse if it's a JSON string
                        var criminalCases = (typeof data === "string") ? JSON.parse(data) : data;

                        if (Array.isArray(criminalCases)) {
                            return criminalCases.map(item => item.criminal_cases_number).join('<br>');
                        } else if (typeof criminalCases === "string") {
                            return criminalCases; // display raw string
                        } else if (criminalCases && criminalCases.criminal_cases_number) {
                            return criminalCases.criminal_cases_number; // single object case
                        }
                    } catch (e) {
                        // If JSON.parse fails, just display the original value
                        return data;
                    }
                    return '';
                }
            },
            {
                "data": 'prisonNumber',
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    // <button class='btn btn-sm btn-danger btn_remove client_remove' type='submit' data-id='" + data.id + "'><i class='fa fa-trash'></i> Remove</button>
                    return "<button class='btn btn-sm btn-primary btn_update client_update client_update_pdl' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-primary btn_view client_view client_view_pdl' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-primary btn_upload client_upload client_upload_pdl' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-upload'></i> Attachments</button>";
                }
            }
        ]
    }
    function tableColumnsSearch() {
        return [
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            {
                "data": 'firstName',
            },
            {
                "data": 'middleName',
            },
            {
                "data": 'lastName',
            },
            {
                data: 'criminalCaseNo',
                render: function (data, type, row) {
                    try {
                        // Attempt to parse if it's a JSON string
                        var criminalCases = (typeof data === "string") ? JSON.parse(data) : data;

                        if (Array.isArray(criminalCases)) {
                            return criminalCases.map(item => item.criminal_cases_number).join('<br>');
                        } else if (typeof criminalCases === "string") {
                            return criminalCases; // display raw string
                        } else if (criminalCases && criminalCases.criminal_cases_number) {
                            return criminalCases.criminal_cases_number; // single object case
                        }
                    } catch (e) {
                        // If JSON.parse fails, just display the original value
                        return data;
                    }
                    return '';
                }
            },
            {
                "data": 'prisonNumber',
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    // <button class='btn btn-sm btn-danger btn_remove client_remove' type='submit' data-id='" + data.id + "'><i class='fa fa-trash'></i> Remove</button>
                    return "<button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-eye'></i> View</button>";
                }
            }
        ]
    }


    if (userRole === "TSD - Section Chief" || userRole === "TSD - Staff") {
        sectionChiefTable("PDL-Investigation")
    } else {
        drawTable("PDL-Investigation");
    }

    $(".client_search").unbind("click").on("click", function() {
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        const firstName = document.querySelector('.firstName').value;
        const lastName = document.querySelector('.lastName').value;
        const fieldOfficeId = "206";
        const canSeeOtherOffices = true;

        $('.table_head').DataTable({
            "processing": false,
            "serverSide": true,
            "scrollX": true,
            "searching": false,
            "lengthMenu": [10, 25, 50, 100],
            "pageLength": 10,
            "columnDefs": [
                { width: "5%", targets: [0] },
                { width: "12%", targets: [1] },
                { width: "13%", targets: [2] },
                { width: "15%", targets: [3] },
                { width: "15%", targets: [4] },
                { width: "15%", targets: [5] },
                { width: "25%", targets: [6] }
            ],
            "ajax": {
                url: ___ctx+'8000/petitioner/search?page=0&size=10',
                type: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: function(d) {
                    // Set page and size as part of the payload, along with other data
                    return JSON.stringify({
                        page: d.start / d.length,  // Page number
                        size: d.length,            // Page size
                        firstName: firstName,
                        lastName: lastName,
                        fieldOfficeId: fieldOfficeId,
                        canSeeOtherOffices: canSeeOtherOffices
                    });
                },
                dataSrc: function(json) {
                    console.log(json)
                    json.recordsTotal = json.totalElements;
                    json.recordsFiltered = json.totalElements;
                    return json.content || [];
                }
            },
            columns: tableColumnsSearch()
        });

        $('.table_head').on('draw.dt', function() {
            buttonFunctionality();
        });
    });
    $(".client_add").unbind("click").on("click", function() {
        let activeType = $('.nav-link.active').data('type');
        let client_type;
        if (activeType === "investigation") {
            client_type = "PDL-Investigation"
        } else {
            client_type = "PDL-Supervision"
        }
        window.location.href = api+'/pis/new_client_single_carpeta?client_type='+client_type;
    })

    // event handler when a tab is clicked
    $("#inv_tab").unbind("click").on("click", function(){
        console.log("clicked inv")
        if (userRole === "TSD - Section Chief" || userRole === "TSD - Staff") {
            sectionChiefTable("PDL-Investigation")
        } else {
            drawTable("PDL-Investigation");
        }
    })
    $("#sup_tab").unbind("click").on("click", function(){
        console.log("clicked sup")
        if (userRole === "TSD - Section Chief" || userRole === "TSD - Staff") {
            sectionChiefTable("PDL-Supervision")
        } else {
            drawTable("PDL-Supervision");
        }
    })

} )( jQuery );