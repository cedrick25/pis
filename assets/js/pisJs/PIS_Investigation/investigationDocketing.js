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
                var petitionerId = $(this).data("cid");
                var officeId = $.cookie("field_office_id");
                // window.location.href = 'http://ppis.probation.gov.ph/pis/investigation_docket_update?docket_number='+docket_number+'&officeId='+officeId;
                window.location.href = api+'/pis/investigation_docket_update?docket_number='+docket_number+'&officeId='+officeId+'&petitionerId='+petitionerId;
            })
            $(".btn_view").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                var officeId = $.cookie("field_office_id");
                // window.location.href = 'http://ppis.probation.gov.ph/pis/investigation_docket_update?docket_number='+docket_number+'&officeId='+officeId;
                window.location.href = api+'/pis/investigation_docket_view?docket_number='+docket_number+'&officeId='+officeId;
            })
            $(".btn_attachments").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                // var id = $(this).data("petitionerId");
                // var type = $(this).data("type");
                var fi = $(this).data("oi");
                // window.location.href = api+'/pis/pis-investigation-file-upload?docket_number='+docket_number+'&id='+id+'&type='+type+'&fi='+fi;
                window.location.href = api+'/pis/pis-investigation-file-upload?docket_number='+docket_number+'&officeId='+fi;
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
                    { "width": "15%", "targets": [1] },
                    { "width": "10%", "targets": [2] },
                    { "width": "17%", "targets": [3] },
                    { "width": "13%", "targets": [4] },
                    { "width": "15%", "targets": [5] },
                    { "width": "25%", "targets": [6] }
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
                    type: "PIS_INV",
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
            });
        }

        var searchHtml = '<div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">' +
            '<label style="margin-bottom: 0; white-space: nowrap;">Search:</label>' +
            '<input type="text" class="form-control form-control-sm docketSearchInput" placeholder="Docket Number, CC Number, Name" style="width: 250px;">' +
            '<button class="btn btn-primary btn-sm docket_search"><i class="fa fa-search"></i></button>' +
            '</div>';

        function injectSearch(value) {
            var $target = $('.dataTables_length').parent().next();
            if ($target.length) {
                $target.html(searchHtml);
                if (value) $target.find('.docketSearchInput').val(value);
            }
        }

        function drawSearchTable(searchVal) {
            var fieldOfficeId = $.cookie('field_office_id');
            var clientType = "PIS_INV";

            $('.table_head').DataTable({
                "processing": false,
                "serverSide": true,
                "scrollX": true,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "15%", "targets": [1] },
                    { "width": "10%", "targets": [2] },
                    { "width": "17%", "targets": [3] },
                    { "width": "13%", "targets": [4] },
                    { "width": "15%", "targets": [5] },
                    { "width": "25%", "targets": [6] }
                ],
                "ajax": function(data, callback, settings) {
                    var page = data.start / data.length;
                    var size = data.length;
                    $.ajax({
                        url: `${___ctx}8000/docketbook/search/PROBATIONER?page=${page}&size=${size}`,
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
        }

        $(document).on('keypress', '.docketSearchInput', function(e) {
            if (e.which === 13) {
                $('.docket_search').trigger('click');
            }
        });

        $(document).on('click', '.docket_search', function() {
            var searchVal = $('.docketSearchInput').val().trim();

            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            if (!searchVal) {
                drawTable();
                injectSearch();
                return;
            }

            drawSearchTable(searchVal);
            injectSearch(searchVal);
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
                    "data": "receivedDateByPPO", // It's better to specify the field here
                    "render": function (data, type, row, meta) {
                        // Checks for null, undefined, or empty/whitespace strings
                        if (!data || data.toString().trim() === "") {
                            return "N/A";
                        }
                        return data;
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var client_fo = data.fieldOfficeId;
                        var client_id = data.id;
                        // Check if all parts are null
                        if (
                            data.firstName === null &&
                            data.middleName === null &&
                            data.lastName === null &&
                            data.suffixName === null
                        ) {
                            var name = data.fullName || "N/A";
                        } else if (
                            data.firstName === "" &&
                            data.middleName === "" &&
                            data.lastName === "" &&
                            data.suffixName === ""
                        ) {
                            var name = data.fullName || "N/A";
                        } else {
                            var name = `${data.firstName ?? ""} ${data.middleName ?? ""} ${data.lastName ?? ""} ${data.suffixName ?? ""}`;
                        }

                        var nameLink = `${name.trim()}`;
                        return nameLink;
                    }
                },
                {
                    "data": "criminalCaseNumber",
                    "render": function (data, type, row, meta) {
                        // Checks for null, undefined, or empty/whitespace strings
                        if (!data || data.toString().trim() === "") {
                            return "N/A";
                        }
                        return data;
                    }
                },
                {
                    "data": 'fieldOfficeName'
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_view pb_inv_view' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-petitionerId='"+data.clientId+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-primary btn_update pb_inv_update' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-cid='"+data.clientId+"'><i class='fa fa-edit'></i> Update</button>  <button class='btn btn-sm btn-primary btn_attachments pb_inv_attachments' type='submit' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-download'></i> Attachments</button> <button class='btn btn-sm btn-danger btn_remove pb_inv_remove' style='display:none;' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button>";
                        // return "<button class='btn btn-sm btn-primary btn_view pb_inv_view' style='display:none;' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-primary btn_update pb_inv_update' style='display:none;' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-edit'></i> Update</button> <button class='btn btn-sm btn-danger btn_remove pb_inv_remove' style='display:none;' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-primary btn_attachments pb_inv_attachments' style='display:none;' type='submit' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Attachments</button>";
                    }
                }
            ]
        }
        drawTable();
        injectSearch();

    } )( jQuery );