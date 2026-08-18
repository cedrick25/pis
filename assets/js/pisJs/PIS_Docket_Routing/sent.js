    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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

        var type = ""; // Declare type in a proper scope
        var tableInv = document.getElementById('inv_tab');
        var tableSup = document.getElementById('sup_tab');

        // Function to initialize or reload the DataTable
        function drawTable(type, uuid) {
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
                        { "width": "15%", "targets": [1] },
                        { "width": "10%", "targets": [2] },
                        { "width": "20%", "targets": [3] },
                        { "width": "15%", "targets": [4] },
                        { "width": "15%", "targets": [5] },
                        { "width": "20%", "targets": [6] }
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
                            console.log(json.data)
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

        // Check if the inventory tab is active on page load
        if (tableInv.classList.contains("active")) {
            type = "PIS_INV"; // Set type value for inventory
            drawTable(type, uuid); // Draw the table with the active tab's type
        }

        // Event listener for inventory tab click
        tableInv.addEventListener('click', function () {
            type = "PIS_INV"; // Set type for inventory
            drawTable(type, uuid); // Draw or reload the table
        });

        // Event listener for supply tab click
        tableSup.addEventListener('click', function () {
            type = "PIS_SUP"; // Set type for supply
            drawTable(type, uuid); // Draw or reload the table
        });

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
    } )( jQuery );