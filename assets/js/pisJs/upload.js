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
        var type = GetURLParameter('type');
        var id = GetURLParameter('id');
        var fi = $.cookie("field_office_id");
        var dataTable = null; // Initialize the variable globally to store the DataTable instance

        function storeData(postUrl, postData) {
            $.ajax({
                url: postUrl,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(postData),
                success: function (result) {
                    // console.log('User data received:', result);
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchWorkflow (){
            var apiUrl = api+'8000/workflow/'+id
                var apiUrl = api+'8000/workflow/'+id
                $.ajax({
                    url: apiUrl,
                    type: 'GET',
                    dataType: 'json',
                    success: function(result) {
                        // console.log('Data received:', result);
                        var data = result.response;
                        var postUrl = api+'8000/workflow/update/'+id;
                        let approvalStatus;
                        if (data.approvalStatus == "New - (Forwarded to CPPO)" ){
                            approvalStatus = "Pending of CPPO";
                        } else if (data.approvalStatus == "New - (Forwarded to FO)"){
                            approvalStatus = "Pending of FO";
                        } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                            approvalStatus = "Pending of CPPO for Approval";
                        } else if (data.approvalStatus == "Pending of FO"){ 
                            approvalStatus = "Pending of FO";
                        } else if (data.approvalStatus == "Pending of CPPO"){ 
                            approvalStatus = "Pending of CPPO";
                        } else if (data.approvalStatus == "Pending of CPPO for Approval"){ 
                            approvalStatus = "Pending of CPPO for Approval";
                        }
                        var postData = {
                            "type": data.type,
                            "transactionNumber": data.transactionNumber,
                            "caseloadType": data.caseloadType,
                            "senderId": data.senderId,
                            "senderName": data.senderName,
                            "senderFieldOfficeId": data.senderFieldOfficeId,
                            "originFieldOfficeId": data.originFieldOfficeId,
                            "receiverId": data.receiverId,
                            "fieldOfficeId": data.fieldOfficeId,
                            "docketNumber": data.docketNumber,
                            "details": data.details,
                            "remarks": data.remarks,
                            "approvalStatus": approvalStatus,
                            "lastStatusUpdateDate": ""
                        };
                        storeData(postUrl, postData)
                        
                        // $(".btn-confirm_forward").unbind("click").on("click", function(){
                        //     console.log('clicked')
                        //     function postDatas() {
                        //         return {
                        //             "type"                  : data.type,
                        //             "caseloadType"          : data.caseloadType,
                        //             "senderId"              : $.cookie("uuid"),
                        //             "receiverId"            : $(".user_account").val(),
                        //             "fieldOfficeId"         : $(".field_office").val(),
                        //             "docketNumber"          : data.docketNumber,
                        //             "details"               : $(".details").val(),
                        //             "remarks"               : data.remarks,
                        //             "approvalStatus"        : approvalStatus,
                        //             "lastStatusUpdateDate"  : "",
                        //         };
                        //     }
                        //     if (data.approvalStatus == "Pending of CPPO"){
                        //         approvalStatus = "New - (Forwarded to FO)"
                        //         var postData = postDatas()
                        //         storeData(postUrl,postData)
                        //         $("#success_forwarding").show()
                        //         setTimeout(function () {
                        //             $("#success_forwarding").hide()
                        //             window.location.href = api+"/pis/sent";
                        //         }, 2000);
                        //     } else if (data.approvalStatus == "Pending of FO"){
                        //         approvalStatus = "New - (Forward to CPPO for Approval)"
                        //         var postData = postDatas()
                        //         storeData(postUrl,postData)
                        //         $("#success_forwarding").show()
                        //         setTimeout(function () {
                        //             $("#success_forwarding").hide()
                        //             window.location.href = api+"/pis/sent";
                        //         }, 2000);
                        //     } else if (data.approvalStatus == "Pending of CPPO for Approval"){
                        //         approvalStatus = "New - (Forwarded to clerk for completion)"
                        //         var postData = postDatas()
                        //         storeData(postUrl,postData)
                        //         $("#success_forwarding").show()
                        //         setTimeout(function () {
                        //             $("#success_forwarding").hide()
                        //             window.location.href = api+"/pis/sent";
                        //         }, 2000);
                        //     } 
                        // })
                    },
                    error: function(xhr, status, error) {
                        console.error('Error:', status, error);
                    }
                });
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
                        `;

                        // Add "Show All Versions" button only for the latest version
                        if (rows.length > 1) {
                            if (data.version === latestVersion) {
                                actions += `
                                    <button class='btn btn-secondary btn-sm btn-showVersions' data-file_name='${data.fileName}'>
                                        <i class='fa fa-angle-down'></i> Show All Versions
                                    </button>
                                `;
                            }
                        }

                        return actions;
                    }
                }
            ]
        }
        function hideDuplicateRows() {
            let fileGroups = {};
            
            // Group rows by file name
            $('.table_head tbody tr').each(function () {
                const fileName = $(this).find('td:eq(1)').text().trim();
                if (!fileGroups[fileName]) {
                    fileGroups[fileName] = [];
                }
                fileGroups[fileName].push($(this));
            });

            // Hide all but the latest version for each group
            for (let fileName in fileGroups) {
                const rows = fileGroups[fileName];
                rows.sort((a, b) => {
                    const versionA = parseInt(a.find('td:eq(2)').text().trim()); // Assuming column 2 is 'version'
                    const versionB = parseInt(b.find('td:eq(2)').text().trim());
                    return versionB - versionA; // Descending order
                });

                // Keep only the first row visible, hide the rest
                rows.slice(1).forEach(row => row.addClass('hidden'));
            }
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
                    hideDuplicateRows();
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
                    console.log(result)

                    $(".name").val(result.fullName);
                    $(".docket_num").val(result.docketNumber)

                    load_table('investigation', result.docketNumber, officeId)

                    // event handler when a tab is clicked
                    $("#inv_tab").unbind("click").on("click", function(){
                        console.log("clicked inv")
                        load_table('investigation', result.docketNumber, officeId)
                    })
                    $("#sup_tab").unbind("click").on("click", function(){
                        console.log("clicked sup")
                        load_table('supervision', result.docketNumber, officeId)
                    })
                    $("#rehab_tab").unbind("click").on("click", function(){
                        console.log("clicked rehab")
                        load_table('rehabilitation', result.docketNumber, officeId)
                    })
                    $("#oth_tab").unbind("click").on("click", function(){
                        console.log("clicked oth")
                        load_table('others', result.docketNumber, officeId)
                    })

                    // event handler to toggle visibility
                    $('.table_head').on('click', '.btn-showVersions', function () {
                        const fileName = $(this).data('file_name');

                        // Identify rows with the same file name and sort them by version
                        let rows = [];
                        $('.table_head tbody tr').each(function () {
                            if ($(this).find('td:eq(1)').text().trim() === fileName) {
                                rows.push($(this));
                            }
                        });

                        // Sort rows by version in descending order
                        rows.sort((a, b) => {
                            const versionA = parseInt(a.find('td:eq(2)').text().trim()); // Assuming column 2 is 'version'
                            const versionB = parseInt(b.find('td:eq(2)').text().trim());
                            return versionB - versionA; // Descending
                        });

                        // Keep the first (latest) version visible and toggle visibility of others
                        rows.forEach((row, index) => {
                            if (index === 0) {
                                row.removeClass('hidden'); // Ensure the latest version is always visible
                            } else {
                                row.toggleClass('hidden'); // Toggle visibility for other versions
                            }
                        });

                        // Optional: Update button text/icon based on visibility
                        const isHidden = rows.slice(1).some(row => row.hasClass('hidden')); // Check if any non-latest rows are hidden
                        $(this).html(isHidden 
                            ? `<i class='fa fa-angle-down'></i> Show All Versions` 
                            : `<i class='fa fa-angle-up'></i> Hide Versions`);
                    });

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
                                "url": api+"8080/file/upload?uuid="+result.docketNumber+"&type="+$(".type").val()+"&createdby="+fullname+"&version=0&kind="+fileToUpload.name+"&officeId="+officeId+"&remarks="+$(".remarks").val(),
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

        $(document).ready(function(){
            fetchWorkflow();
        })

    } )( jQuery );