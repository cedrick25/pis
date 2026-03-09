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

        var docket_number = GetURLParameter('docket_number');
        var type = "supervision";
        var id = GetURLParameter('id');
        var fi = $.cookie("field_office_id");
        var dataTable = null; // Initialize the variable globally to store the DataTable instance

        
        $('.cmisTable').on('change', function() {
            $(".type").empty();
            var value = $(this).val();

            // console.log(value)
            if (value === "F21T8") {
                $(".type").append(`
                    <option value="" disabled="" selected="">Select</option>
                    <option value="Discharge on Parole">Discharge on Parole</option>
                    <option value="Arrival Report">Arrival Report</option>
                    <option value="Briefing Report">Briefing Report</option>
                    <option value="Certificate of Undertaking">Certificate of Undertaking</option>
                    <option value="Other Document/s">Other Document/s</option>
                `)
            } else if (value === "F21T9") {
                $(".type").append(`
                    <option value="" disabled="" selected="">Select</option>
                      <option value="Summary Report">Summary Report</option>
                      <option value="Infraction Report">Infraction Report</option>
                      <option value="Death Report">Death Report</option>
                      <option value="Report for Transfer">Report for Transfer</option>
                      <option value="Other Document/s">Other Document/s</option>
                `)
            } else if (value === "F21T11") {
                $(".type").append(`
                    <option value="" disabled="" selected="">Select</option>
                    <option value="Final Release and Discharge">Final Release and Discharge</option>
                    <option value="Arrest/Recommitment">Arrest/Recommitment</option>
                    <option value="Death">Death</option>
                    <option value="Other Document/s">Other Document/s</option>
                `)
            } else if (value === "F21T13") {
                $(".type").append(`
                    <option value="" disabled="" selected="">Select</option>
                    <option value="Approved Transfer of Residence">Approved Transfer of Residence</option>
                    <option value="Other Document/s">Other Document/s</option>
                `)
            } else {
                alert ("CMIS Table dropdown doesn't load properply refreshing the page ...")
                window.location.reload(true)
            }
        })

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
                    "data": 'remarks',
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {

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
                            <button class='btn btn-danger btn-sm btn-delete' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                <i class='fa fa-trash'></i> Delete
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
                        { "width": "30%", "targets": [1] },
                        { "width": "40%", "targets": [2] },
                        { "width": "25%", "targets": [3] },
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
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    columns: tableColumns() // Call your function to get table columns
                });
                // Delete button event (delegated for DataTable dynamic rows)
                $(document).off("click", ".btn-delete").on("click", ".btn-delete", function(){
                    let fileId = $(this).data("id");

                    if(confirm("Are you sure you want to delete this file?")) {
                        __executeExternalGet(`8080/file/delete/${fileId}`).done(function (res) {
                            if(res.status !== "ERROR") {
                                alert("File deleted successfully!");
                                window.location.reload(true);
                            } else {
                                alert("Error deleting file!");
                            }
                        });
                    }
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
                __executeExternalGet('8000/docketbook/'+docket_number+'/'+fi).done(function (result) {
                    var result = result.response;

                    $(".name").val(result.fullName);
                    $(".docket_num").val(result.docketNumber)

                    load_table(type, result.docketNumber, officeId)

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
                                // "url": api+"8080/file/upload?uuid="+result.docketNumber+"&type="+type+"&createdby="+fullname+"&version=0&kind="+$(".cmisTable").val()+"&officeId="+officeId+"&remarks="+$(".type").val(),
                                "url": `${api}8080/file/upload?uuid=${result.docketNumber}&type=${type}&createdby=${fullname}&version=0&kind=${$(".cmisTable").val()}_${$(".client_type").val()}&officeId=${officeId}&remarks=${$(".type").val()}`,
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