    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
            // path = $.wms.getContextPath() + path;
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
        
        var uuid = $.cookie("uuid");
        var roleId = $.cookie("role_id");

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
                        }, 100);
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
            $(".btn-view").unbind("click").on("click", function(){
                var transactionNumber = $(this).data("tid");
                var id = $(this).data("id");
                window.location.href=api+"/pis/pdl-view-history?transaction_number="+transactionNumber+"&id="+id+"&sent=yes";
            })
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var idText = meta.settings._iDisplayStart + meta.row + 1;
                        return idText;
                    }
                },
                {
                    "data": 'transactionNumber'
                },
                {
                    "data": 'fieldOfficeName'
                },
                {
                    "data": 'senderName',
                },
                {
                    "data": 'remarks'
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        // return "<button class='btn btn-sm btn-primary pb_upload' id='btn_upload'  type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-danger pb_return' id='btn_return'  type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-sender='"+data.originFieldOfficeId+"' data-fi='"+data.fieldOfficeId+"'><i class='fa fa-undo'></i> Return</button> <button class='btn btn-sm btn-info pb_forward' id='btn_forward'  type='submit' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-sender='"+data.originFieldOfficeId+"'><i class='fa fa-forward'></i> Forward</button> <button class='btn btn-sm btn-success pb_complete' id='btn_complete'  type='submit' data-toggle='modal' data-target='#completeModal' data-docket='"+data.docketNumber+"' data-id='"+data.id+"' data-type='"+data.type+"'><i class='fa fa-check-circle'></i> Complete</button> <button class='btn btn-sm btn-info pb_inv_worksheet pb_sup_worksheet' id='btn_worksheet'  data-id='"+data.id+"' data-fi='"+data.fieldOfficeId+"' data-docket='"+data.docketNumber+"' data-sender='"+data.originFieldOfficeId+"' style='display:none;'><i class='fa fa-plus-circle'></i> Worksheet</button>";                                    
                        return "<button type='button' class='btn btn-sm btn-primary waves-effect btn-create btn-view' data-tid='"+data.transactionNumber+"' data-id='"+data.id+"'><i class='fa fa-eye'></i>&nbsp;&nbsp;View</button>";                                    
                    }
                }
            ]
        }

        var type = "PDL"; // Declare type in a proper scope

        // Function to initialize or reload the DataTable
        function drawTable(type) {
            // Check if DataTable has already been initialized
            if (!$.fn.DataTable.isDataTable('.table_head')) {
                // Initialize the DataTable
                $('.table_head').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": true,
                    "searching": true,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "columnDefs": [
                        { "width": "5%", "targets": [0] },
                        { "width": "35%", "targets": [1] },
                        { "width": "15%", "targets": [2] },
                        { "width": "15%", "targets": [3] },
                        { "width": "15%", "targets": [4] },
                        { "width": "15%", "targets": [5] }
                    ],
                    ajax: {
                        url: api + "8000/workflow/sender/" + uuid + "?type=" + type,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,  // Pagination
                                size: d.length,            // Page size
                                // name: d.search.value    // Pass search term as 'keyword'
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
                // If DataTable is already initialized, reload it with new data
                $('.table_head').DataTable().ajax.url(api + "8000/workflow/sender/" + uuid + "?type=" + type).load();
            }
        }

        drawTable(type)

    } )( jQuery );