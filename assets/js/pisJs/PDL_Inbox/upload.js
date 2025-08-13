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
        var __executeFile = function(path, jsonObj) {
            var d = $.Deferred();
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                cache: false,
                "mimeType": "multipart/form-data",
                processData: false,
                contentType: false,
                /*data: JSON.stringify(jsonObj)*/
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                d.resolve(data);
                $(".loadDiv").hide();
                $(".overlay-back").hide();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : errorThrown
                });
            });
            return d.promise();
        };
        
        function GetURLParameter(sParam){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam)
                {
                    return decodeURIComponent(sParameterName[1]);
                }
            }
        }
            var client_id = GetURLParameter('petitionerId');
            var officeid = GetURLParameter('departmentId');
            var client_type = GetURLParameter('client_type');
            var transaction_number = GetURLParameter('transaction_number');
            var dataTable = null; // Initialize the variable globally to store the DataTable instance

            function tableColumns() {
                return [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.settings._iDisplayStart + meta.row + 1;
                        }
                    },
                    {
                        "data": 'fileName',
                    },
                    {
                        "data": 'version'
                    },
                    {
                        "data": 'remarks',
                    },
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            const rows = meta.settings.json.data.filter(r => r.fileName === data.fileName); // Group by fileName
                            const latestVersion = Math.max(...rows.map(r => r.version)); // Find the latest version

                            // Render the action buttons
                            let actions = `
                                <a href=${___ctx}8080/file/view/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-view' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-eye'></i> View
                                    </button>
                                </a>
                                <a href=${___ctx}8080/file/download/${data.id} target='_blank'>
                                    <button class='btn btn-primary btn-sm btn-download' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                        <i class='fa fa-download'></i> Download
                                    </button>
                                </a>
                                <button class='btn btn-primary btn-sm btn-danger' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                    <i class='fa fa-download'></i> Delete
                                </button>
                            `;
                            return actions;
                        }
                    }
                ]
            }
            var load_table = function (type, uuid, officeId) {
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
                            { "width": "20%", "targets": [1] },
                            { "width": "15%", "targets": [2] },
                            { "width": "25%", "targets": [3] },
                            { "width": "35%", "targets": [4] },
                        ],
                        ajax: {
                            url: `${api}8080/file/page/${type}/${uuid}/${officeId}`, // Base URL remains the same
                            type: 'GET',
                            cache: true,
                            data: function (d) {
                                // Dynamically add the current 'type' parameter
                                return {
                                    page: d.start / d.length,  // Pagination
                                    size: d.length,            // Page size
                                };
                            },
                            dataFilter: function (data) {
                                var json = jQuery.parseJSON(data);
                                // Sort the data by fileName and then by version
                                json.content.sort((a, b) => {
                                    if (a.fileName === b.fileName) {
                                        return b.version - a.version; // Sort versions in descending order within the same file name
                                    }
                                    return a.fileName.localeCompare(b.fileName); // Sort file names alphabetically
                                });
                                json.recordsTotal = json.totalElements;
                                json.recordsFiltered = json.totalElements;
                                json.data = json.content;
                                return JSON.stringify(json);
                            }
                        },
                        columns: tableColumns() // Call your function to get table columns
                    });

                    $('.table_head').on('draw.dt', function () {
                        // hideDuplicateRows();
                        // Delete button event
                        $(document).on("click", ".btn-delete", function(){
                            let fileId = $(this).data("id");

                            if(confirm("Are you sure you want to delete this file?")) {
                                __executeExternalGet(`8080/file/delete/${fileId}`).done(function (res) {
                                    if(res.status !== "ERROR") {
                                        alert("File deleted successfully!");
                                        window.location.reload(true);
                                        // __table(); // Reload table
                                    } else {
                                        alert("Error deleting file!");
                                    }
                                });
                            }
                        });     
                    });
                } else {
                    // Update the AJAX URL and reload the DataTable
                    dataTable.ajax.url(`${api}8080/file/page/${type}/${uuid}/${officeId}`).load();
                }
            }

            __executeExternalGet('8088/user/'+$.cookie("uuid")).done(function (result) {
                if (result.status != "ERROR") {
                    var fullname = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix; 
                    var officeId = result.departmentId;
                    $(".uploader").val(fullname);
                    $(".uploader").prop('disabled', true);
                    __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                        var result = result.response;
                        var name = result.firstName + " " + result.lastName;
                        var file_uuid = `${client_id}_${transaction_number}`; // initialize the value of the uuid

                        load_table('investigation', file_uuid, 0)

                        // event handler when a tab is clicked
                        $("#inv_tab").unbind("click").on("click", function(){
                            console.log("clicked inv")
                            load_table('investigation', file_uuid, 0)
                        })
                        $("#sup_tab").unbind("click").on("click", function(){
                            console.log("clicked sup")
                            load_table('supervision', file_uuid, 0)
                        })
                        $("#rehab_tab").unbind("click").on("click", function(){
                            console.log("clicked rehab")
                            load_table('rehabilitation', file_uuid, 0)
                        })
                        $("#oth_tab").unbind("click").on("click", function(){
                            console.log("clicked oth")
                            load_table('others', file_uuid, 0)
                        })

                        // for uploading file
                        $(".btn-confirm").unbind("click").on("click", function(){
                            console.log("clicked upload confirm")
                            var fileToUpload = $('#fileupload').prop('files')[0];
                            if (fileToUpload === undefined) {
                                alert("Please Choose File Before Upload!")
                            }
                            else {
                                var form = new FormData();
                                form.append("file", fileToUpload, fileToUpload.name);
                                // console.log(fileToUpload.name)
                                var settings = {
                                    "url": api+"8080/file/upload?uuid="+file_uuid+"&type="+$(".type").val()+"&createdby="+fullname+"&version=0&kind="+fileToUpload.name+"&officeId=0&remarks="+$(".remarks").val(),
                                    "method": "POST",
                                    "timeout": 0,
                                    "processData": false,
                                    "mimeType": "multipart/form-data",
                                    "contentType": false,
                                    "data": form
                                };

                                $.ajax(settings).done(function (response) {
                                    console.log(response);
                                    if (response) {
                                        $('#success_upload').show();
                                        setTimeout(function () {
                                            $('#success_upload').hide();
                                            window.location.reload(true);
                                        }, 1000);
                                    } else {

                                    }
                                });
                            }
                        })
                    })
                }else{
                    alert("failed")
                }
            })
               
    } )( jQuery );