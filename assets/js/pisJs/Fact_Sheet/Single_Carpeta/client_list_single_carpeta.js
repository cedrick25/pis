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
        var client_id = $(this).data("id");
        window.location.href = api+'/pis/client_update_single_carpeta?client_id='+client_id;
        // window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;

    })
    $(".btn_upload").unbind("click").on("click", function(){
        var client_id = $(this).data("id");
        var client_type = $(this).data("type");
        console.log(client_type, client_id)
        window.location.href = api+'/pis/client_single_carpeta_upload?client_id='+client_id+'&client_type='+client_type;
    })
    $(".btn_view").unbind("click").on("click", function(){
        var client_id = $(this).data("id");
        var client_type = $(this).data("type");
        // console.log(client_type)
        window.location.href = api+'/pis/client_view_upload_single_carpeta?client_id='+client_id+'&client_type='+client_type;
    })
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
                { "width": "12%", "targets": [1] },
                { "width": "13%", "targets": [2] },
                { "width": "15%", "targets": [3] },
                { "width": "15%", "targets": [4] },
                { "width": "15%", "targets": [5] },
                { "width": "25%", "targets": [6] },
        ],
        ajax: {
            url: api+"8000/petitioner",
            type: 'GET',
            cache: true,
            data: function (d) {
            return {
                page: d.start / d.length,  // Pagination
                size: d.length,            // Page size
                // name: d.search.value    // Pass search term as 'keyword'
                type: "PDL",
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
            // buttonVisibility();
        });
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
                "data": 'lastName',
            },
            {
                "data": 'criminalCaseNo'
            },
            {
                "data": 'prisonNumber',
            },
            {
                "data": 'fileNumber',
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='" + data.id + "'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-primary btn_upload client_upload' type='submit' data-id='" + data.id + "' data-type='" + data.clientType + "'><i class='fa fa-upload'></i> Attachments</button> <button class='btn btn-sm btn-danger btn_remove client_remove' type='submit' data-id='" + data.id + "'><i class='fa fa-trash'></i> Remove</button>";
                }
            }
        ]
    }

    drawTable();

    $(".client_search").unbind("click").on("click", function() {
        console.log("btn click search");
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        const firstName = document.querySelector('.firstName').value;
        const lastName = document.querySelector('.lastName').value;
        const fieldOfficeId = $.cookie('field_office_id');
        const canSeeOtherOffices = true;

        $('.table_head').DataTable({
            "processing": false,
            "serverSide": true,
            "scrollX": true,
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
                { "width": "25%", "targets": [6] }
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
                dataFilter: function(d) {
                    var json = jQuery.parseJSON(d);
                    // Prepare response in DataTables format
                    json.recordsTotal = json.totalElements;
                    json.recordsFiltered = json.totalElements; // Adjust if filtering
                    json.data = json.content;
                    return JSON.stringify(json);
                }
            },
            columns: tableColumns()
        });

        $('.table_head').on('draw.dt', function() {
            buttonFunctionality();
        });
    });

} )( jQuery );