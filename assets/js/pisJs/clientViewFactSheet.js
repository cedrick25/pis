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

        var client_id = GetURLParameter('client_id');
        var client_fo = GetURLParameter('field_office_id');
        var userName = localStorage.getItem("userName")
        localStorage.removeItem("psirStatus");

        $('#file-input').on('change', function() {
            var imgavat = $('#client_photo');
            var file = this.files[0];
            var formData = new FormData();
            formData.append('file', file);
            if (this.files[0]) {   
                var reader  = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onloadend = function () {
                    imgavat.attr('src', reader.result);
                };
            }
        });

        function handleFingerPrintUpload (fileInputId, imgInputId) {
            $(`#${fileInputId}`).on('change', function() {
                var imgavat = $(`#${imgInputId}`);
                var file = this.files[0];
                var formData = new FormData();
                formData.append('file', file);
                if (this.files[0]) {   
                    var reader  = new FileReader();
                    reader.readAsDataURL(this.files[0]);
                    reader.onloadend = function () {
                        imgavat.attr('src', reader.result);
                    };
                }
            });
        }
        var docketCurrentPage = 0;
        var docketPageSize = 10;
        var docketIsLoading = false;
        var docketHasMore = true;
        var docketRowCount = 0;
        var cachedWsStatus = null;
        var cachedPsStatus = null;

        function getDocketNumberDetails () {
            if (docketIsLoading || !docketHasMore) return;
            docketIsLoading = true;

            $(".table_body_tc .docket-loader-row").remove();
            $(".table_body_tc").append(`
                <tr class="docket-loader-row">
                    <td colspan="8" class="text-center"><i class="fa fa-spinner fa-spin"></i> Loading...</td>
                </tr>
            `);

            var docketPromise = __executeExternalPost(
                '8000/docketbook/getclient/'+client_id+'?page='+docketCurrentPage+'&size='+docketPageSize, '{}'
            );
            var petitionerPromise = cachedWsStatus !== null
                ? $.Deferred().resolve(null)
                : __executeExternalGet('8000/petitioner/'+client_id);
            var psirPromise = cachedPsStatus !== null
                ? $.Deferred().resolve(null)
                : __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id);

            $.when(docketPromise, petitionerPromise, psirPromise)
            .done(function (docketRes, petitionerRes, psirRes) {
                $(".table_body_tc .docket-loader-row").remove();

                if (cachedWsStatus === null) {
                    cachedWsStatus = petitionerRes && petitionerRes.response
                        ? petitionerRes.response.worksheetStatus : "Not Available";
                }
                if (cachedPsStatus === null) {
                    cachedPsStatus = psirRes && psirRes.response
                        ? psirRes.response.worksheetStatus : null;
                }

                var dockets = docketRes && docketRes.content ? docketRes.content : [];
                var totalPages = docketRes && docketRes.totalPages ? docketRes.totalPages : 0;

                if (docketCurrentPage === 0 && dockets.length === 0) {
                    $(".table_body_tc").append(`
                        <tr>
                            <td colspan="8" class="text-center">No docket records found.</td>
                        </tr>
                    `);
                    docketHasMore = false;
                    docketIsLoading = false;
                    return;
                }

                var wsStatus = cachedWsStatus || "Not Available";
                var psStatus = cachedPsStatus === null || cachedPsStatus === "null" ? "Not Available" : cachedPsStatus;

                dockets.forEach(function (docket) {
                    docketRowCount++;
                    var docketNumber = docket.docketNumber || "N/A";
                    var dateReceived = docket.receivedDateByPPO || "N/A";
                    var officer = docket.investigatingOfficer || docket.supervisingOfficer || "N/A";
                    var status = docket.status || "N/A";

                    $(".table_body_tc").append(`
                        <tr>
                            <td>${docketRowCount}</td>
                            <td>${docketNumber}</td>
                            <td>${dateReceived}</td>
                            <td>N/A</td>
                            <td>${officer}</td>
                            <td>${status}</td>
                            <td>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${wsStatus}</span>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="${api}/pis/worksheet_identifying_data?client_id=${client_id}&field_office_id=${client_fo}&status=${wsStatus}" class="text-primary">
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                        </a>
                                        <a href="#" class="text-info btn_pdfWorksheet">
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${psStatus}</span>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="${api}/pis/psir_identifying_data?client_id=${client_id}&field_office_id=${client_fo}&status=${psStatus}" class="text-primary">
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                        </a>
                                        <a href="#" class="text-info btn_pdfPSIR">
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                        </a>
                                        <a href="#" class="text-info btn_pdfPSIRLong">
                                            <i class="fa fa-download" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `);
                });

                docketCurrentPage++;
                docketHasMore = docketCurrentPage < totalPages;
                docketIsLoading = false;
            })
            .fail(function () {
                $(".table_body_tc .docket-loader-row").remove();
                docketIsLoading = false;
            });
        }


        // Utility to convert image file to Base64
        function loadImageToBase64(url) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.send();
            });
        }

        // function for proper case
        function toProperCase(text) {
            if (!text) return "";

            return text
                .toLowerCase()
                .replace(/\b\w/g, function(letter) {
                    return letter.toUpperCase();
                });
        }
        let petitionersName;
        function getClientDetails () {
            __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                var result = result.response;

                if (result.status != "ERROR") {
                    let fullName = "";

                    if ( result.firstName === null &&
                         result.middleName === null &&
                         result.lastName === null &&
                         result.suffixName === null ) {

                            fullName = result.fullName;
                            petitionersName = fullName;
                            $("#petitionerName").text(fullName)
                    } else {
                        fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                        petitionersName = fullName;
                        $("#petitionerName").text(fullName)
                    }
                } else{
                    alert("failed")
                }
            })
        }
        getClientDetails();

        handleFingerPrintUpload("rthumb", "rthumb_fingerprint")
        handleFingerPrintUpload("rindex", "rindex_fingerprint")
        handleFingerPrintUpload("rmiddle", "rmiddle_fingerprint")
        handleFingerPrintUpload("rring", "rring_fingerprint")
        handleFingerPrintUpload("rlittle", "rlittle_fingerprint")

        $("#rthumb_fingerprint").unbind("click").on("click", function(){
            $("#rthumb").click();
        })
        $("#rindex_fingerprint").unbind("click").on("click", function(){
            $("#rindex").click();
        })
        $("#rmiddle_fingerprint").unbind("click").on("click", function(){
            $("#rmiddle").click();
        })
        $("#rring_fingerprint").unbind("click").on("click", function(){
            $("#rring").click();
        })
        $("#rlittle_fingerprint").unbind("click").on("click", function(){
            $("#rlittle").click();
        })
        $(".btn-fingerprint").unbind("click").on("click", function(){
            $("#uploadFingerprintModal").modal("show")
            getLatestFingerPrint ("rthumb", "rthumb_fingerprint")
            getLatestFingerPrint ("rindex", "rindex_fingerprint")
            getLatestFingerPrint ("rmiddle", "rmiddle_fingerprint")
            getLatestFingerPrint ("rring", "rring_fingerprint")
            getLatestFingerPrint ("rlittle", "rlittle_fingerprint")
        })
        $(".btn-refreshFingerprint").unbind("click").on("click", function(){
            getLatestFingerPrint ("rthumb", "rthumb_fingerprint")
            getLatestFingerPrint ("rindex", "rindex_fingerprint")
            getLatestFingerPrint ("rmiddle", "rmiddle_fingerprint")
            getLatestFingerPrint ("rring", "rring_fingerprint")
            getLatestFingerPrint ("rlittle", "rlittle_fingerprint")
        })

        $('.uploadPhotoBtn').unbind("click").on("click", function(){
            var imgInput = $('#file-input')[0];
            var file = imgInput.files[0];
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
              url: api+"8080/file/upload?uuid="+client_id+"&type=petitioner_profile&createdby="+userName+"&version=0&kind=petitioner_profile&officeId="+client_fo+"&remarks=petitioner_profile_remarks", // Replace with the path to your server-side script
              type: 'POST',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                $("#success_upload").show()
                setTimeout(function () {
                    $("#success_upload").hide()
                    $("#uploadPicModal").modal("hide")
                }, 1000);
              },
              error: function(xhr, status, error) {
                console.log(error);
              }
            });
        });
        function ajaxUploadSaveFingerPrint (formData, fingerPrintType) {
            $.ajax({
              url: `${api}8080/file/upload?uuid=${client_id}&type=petitioner_${fingerPrintType}&createdby=${userName}&version=0&kind=petitioner_fingerprint&officeId=${client_fo}&remarks=petitioner_fingerprint_remarks`, // Replace with the path to your server-side script
              type: 'POST',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                $("#success_upload_fingerprint").show()
                setTimeout(function () {
                    $("#success_upload_fingerprint").hide()
                    $("#uploadFingerprintModal").modal("hide")
                }, 1000);
              },
              error: function(xhr, status, error) {
                console.log(error);
              }
            });
        }
        $('.saveFingerPrints').unbind("click").on("click", function(){
            var imgInputsArray = ['rthumb','rindex','rmiddle','rring','rlittle']
            for (var i = 0; i < imgInputsArray.length; i++) {
                var imgInputs = $(`#${imgInputsArray[i]}`)[0];
                var file = imgInputs.files[0];

                if (file) { // ✅ only process if file exists
                    var formData = new FormData();
                    formData.append('file', file);
                    formData.append('finger', imgInputsArray[i]); // optional: pass which finger it is

                    ajaxUploadSaveFingerPrint(formData, imgInputsArray[i]);
                } else {
                    console.log("No fingerprint uploaded for: " + imgInputsArray[i]);
                }
            }
        });

        function getLatestProfile () {
            __executeExternalGet('8080/file/getLatest/petitioner_profile/'+client_id+"/"+client_fo).done(function (result) {
                if (result.status != "ERROR") {
                    if (result.files.length != 0) {
                        $('#client_photo').attr('src', api+'8080/file/view/'+result.files[0].id);
                    }
                }
            })
        }
        function getLatestFingerPrint (fingerPrintType, imgSrc) {
            __executeExternalGet(`8080/file/getLatest/petitioner_${fingerPrintType}/${client_id}/${client_fo}`).done(function (result) {
                if (result.status != "ERROR") {
                    if (result.files.length != 0) {
                        $(`#${imgSrc}`).attr('src', api+'8080/file/view/'+result.files[0].id);
                    } else {
                        $(`#${imgSrc}`).attr('src', 'images/fingerprintlogo.jpg');
                    }
                }
            })
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
        let dataTable = null;
        function loadUploadedDocuments (type, uuid, officeId) {
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
                        { "width": "35%", "targets": [1] },
                        { "width": "30%", "targets": [2] },
                        { "width": "30%", "targets": [3] },
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

                $('.table_head').on('draw.dt', function () {
                    // Delete button event
                    $(document).on("click", ".btn-delete", function(){
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
                });
            } else {
                // Update the AJAX URL and reload the DataTable
                dataTable.ajax.url(`${api}8080/file/page/${type}/${uuid}/${officeId}`).load();
            }
        }

        var cachedInvFiles = null;
        var cachedSupFiles = null;
        var docketFilesLoaded = false;

        function fetchAllDocketNumbers(clientId) {
            var d = $.Deferred();
            var allDockets = [];

            function fetchPage(page) {
                __executeExternalPost('8000/docketbook/getclient/' + clientId + '?page=' + page + '&size=100', '{}')
                    .done(function (result) {
                        var content = result && result.content ? result.content : [];
                        allDockets = allDockets.concat(content);
                        var totalPages = result && result.totalPages ? result.totalPages : 0;
                        if (page + 1 < totalPages) {
                            fetchPage(page + 1);
                        } else {
                            d.resolve(allDockets);
                        }
                    })
                    .fail(function () {
                        d.resolve(allDockets);
                    });
            }

            fetchPage(0);
            return d.promise();
        }

        function fetchFilesForDockets(dockets, fileType, officeId) {
            var d = $.Deferred();
            var allFiles = [];

            if (dockets.length === 0) {
                d.resolve(allFiles);
                return d.promise();
            }

            var completed = 0;
            dockets.forEach(function (docket) {
                __executeExternalGet('8080/file/list/' + fileType + '/' + docket.docketNumber + '/' + officeId)
                    .done(function (result) {
                        if (result && result.status !== "ERROR" && result.files && result.files.length > 0) {
                            var officer = docket.investigatingOfficer || docket.supervisingOfficer || "N/A";
                            result.files.forEach(function (file) {
                                file.officerName = officer;
                            });
                            allFiles = allFiles.concat(result.files);
                        }
                        completed++;
                        if (completed === dockets.length) {
                            d.resolve(allFiles);
                        }
                    })
                    .fail(function () {
                        completed++;
                        if (completed === dockets.length) {
                            d.resolve(allFiles);
                        }
                    });
            });

            return d.promise();
        }

        function loadDocketFiles(clientId, officeId) {
            var d = $.Deferred();

            if (docketFilesLoaded) {
                d.resolve({ invFiles: cachedInvFiles, supFiles: cachedSupFiles });
                return d.promise();
            }

            fetchAllDocketNumbers(clientId).done(function (allDockets) {
                var invDockets = [];
                var supDockets = [];

                allDockets.forEach(function (docket) {
                    if (docket.type === "PIS_INV") {
                        invDockets.push(docket);
                    } else if (docket.type === "PIS_SUP") {
                        supDockets.push(docket);
                    }
                });

                var invPromise = fetchFilesForDockets(invDockets, "investigation", officeId);
                var supPromise = fetchFilesForDockets(supDockets, "supervision", officeId);

                $.when(invPromise, supPromise).done(function (invFiles, supFiles) {
                    cachedInvFiles = invFiles;
                    cachedSupFiles = supFiles;
                    docketFilesLoaded = true;
                    d.resolve({ invFiles: invFiles, supFiles: supFiles });
                });
            });

            return d.promise();
        }

        function renderDocketFilesTable(tableSelector, files) {
            if ($.fn.DataTable.isDataTable(tableSelector)) {
                $(tableSelector).DataTable().destroy();
            }
            $(tableSelector + ' tbody').empty();

            $(tableSelector).DataTable({
                "processing": false,
                "serverSide": false,
                "scrollX": false,
                "searching": false,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 10,
                "columnDefs": [
                    { "width": "5%", "targets": [0] },
                    { "width": "35%", "targets": [1] },
                    { "width": "30%", "targets": [2] },
                    { "width": "30%", "targets": [3] },
                ],
                "data": files,
                "columns": [
                    {
                        "data": null,
                        "render": function (data, type, row, meta) {
                            return meta.row + 1;
                        }
                    },
                    {
                        "data": "fileName"
                    },
                    {
                        "data": "officerName",
                        "defaultContent": "N/A"
                    },
                    {
                        "data": null,
                        "render": function (data) {
                            return `
                                <a href="${___ctx}8080/file/view/${data.id}" target="_blank">
                                    <button class="btn btn-primary btn-sm"><i class="fa fa-eye"></i> View</button>
                                </a>
                                <a href="${___ctx}8080/file/download/${data.id}" target="_blank">
                                    <button class="btn btn-primary btn-sm"><i class="fa fa-download"></i> Download</button>
                                </a>
                            `;
                        }
                    }
                ]
            });
        }

        function loadInvestigationFiles() {
            loadDocketFiles(client_id, client_fo).done(function (result) {
                renderDocketFilesTable('.table_head', result.invFiles);
            });
        }

        function loadSupervisionFiles() {
            loadDocketFiles(client_id, client_fo).done(function (result) {
                renderDocketFilesTable('.table_head', result.supFiles);
            });
        }

        function tableColumnsForOtherDocuments() {
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
                        return "N/A";
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return "N/A";
                    }
                },
                {
                    "data": 'createdBy',
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
        let dataTableOther = null;
        function loadOtherUploadedDocuments (type, uuid, officeId) {
            if (!dataTableOther) {
                dataTableOther = $('.table_head_odctab').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": false,
                    "searching": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "columnDefs": [
                        { "width": "5%", "targets": [0] },
                        { "width": "15%", "targets": [1] },
                        { "width": "20%", "targets": [2] },
                        { "width": "20%", "targets": [3] },
                        { "width": "20%", "targets": [4] },
                        { "width": "20%", "targets": [5] },
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
                    columns: tableColumnsForOtherDocuments() // Call your function to get table columns
                });

                $('.table_head_odctab').on('draw.dt', function () {
                    // Delete button event
                    $(document).on("click", ".btn-delete", function(){
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
                });
            } else {
                // Update the AJAX URL and reload the DataTable
                dataTableOther.ajax.url(`${api}8080/file/page/${type}/${uuid}/${officeId}`).load();
            }
        }

        getLatestProfile();

        $('#dismissedModalUploadPic').unbind("click").on("click", function(){
            $("#uploadPicModal").modal("hide");
            getLatestProfile();
        })

        $(document).ready(function() {
            $('#control').hide();
            $('#video').resize(function(){
                $('#cont').height($('#video').height());
                  $('#cont').width($('#video').width());
                  $('#control').height($('#video').height()*0.1);
                  $('#control').css('top',$('#video').height()*0.9 );
                    $('#control').width($('#video').width());
                    $('#control').show();
            });
            function opencam(){
                $("#wrap").show()
                navigator.getUserMedia= navigator.getUserMedia ||   navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia ;
                if(navigator.getUserMedia)
                {
                    navigator.getUserMedia({video:true },  streamWebCam ,throwError) ;
                }
                    $('#vid').css('z-index','30');
                    $('#capture').css('z-index','20');
                    $('#snap').unbind("click").on("click", function(){
                        var canvas = document.getElementById('canvas');
                        var context = canvas.getContext('2d');
                        var video = document.getElementById('video');
                        context.drawImage(video, 0, 0, canvas.width=video.clientWidth, canvas.height=video.clientHeight);
                        $('#vid').css('z-index','20');
                        $('#capture').css('z-index','30');

                        $('.btn_confirm').unbind("click").on("click", function(){
                            // console.log("opne cam confirm")
                            var dataURL = canvas.toDataURL();
                            var blob = dataURItoBlob(dataURL);
                            handleBlob(blob);
                        });
                        function dataURItoBlob(dataURI) {
                          var byteString = atob(dataURI.split(',')[1]);
                          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                          var ab = new ArrayBuffer(byteString.length);
                          var ia = new Uint8Array(ab);
                          for (var i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                          }
                          return new Blob([ab], { type: mimeString });
                        }

                        function handleBlob(blob) {
                            var formData = new FormData();
                            formData.append('file', blob, 'image.jpg');
                            $.ajax({
                                url: api+"8080/file/upload?uuid="+client_id+"&type=petitioner_profile&createdby="+$.cookie('uuid')+"&version=0&kind=petitioner_profile&officeId="+$.cookie('field_office_id')+"&remarks=petitioner_profile_remarks",
                                type: 'POST',
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    success: function(response) {
                                        $("#success_photo_capture").show()
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 1000);
                                    },
                                    error: function(xhr, status, error) {
                                        console.log(error);
                                    }
                            });
                        }
                    });

                    $('#retake').unbind("click").on("click", function(){
                        $('#vid').css('z-index','30');
                        $('#capture').css('z-index','20');
                    });
            }
            function closecam(){
                $("#wrap").hide()
                video.pause();
                try {
                    video.srcObject = null;
                } catch (error) {
                    video.src =null;
                }
              var track = strr.getTracks()[0];  // if only one media track
              // ...
              track.stop();
            }
              var video= document.getElementById('video');
              var canvas= document.getElementById('canvas');
              var context= canvas.getContext('2d');
              var strr;
              function streamWebCam(stream){
              const  mediaSource = new MediaSource(stream);
              try {
                  video.srcObject = stream;
                } catch (error) {
                  video.src = URL.createObjectURL(mediaSource);
                }
                video.play();
                strr=stream;
              }
              function throwError(e){
                alert(e.name);
              }
            $('#open').unbind("click").on("click", function(){
              opencam();
               $('#control').show();
            });
            $('#cancel_modal').unbind("click").on("click", function(){
              closecam();
            });
        });

        $(".edit-link").unbind("click").on("click", function(){
            window.location.href = api+'/pis/client_update?client_id='+client_id+'&client_fo='+client_fo;
        })

        $(".btn-addInvestigation").unbind("click").on("click", function(){
            $("#investigationUploadModal").modal("show")

            $(".saveInvestigationDocument").unbind("click").on("click", function(){
                var fileToUpload = $('#file-input-investigation').prop('files')[0];
                if (fileToUpload === undefined) {
                    $("#failed_upload_investigation").show();
                    $(".saveInvestigationDocument").prop("disabled", true)
                    setTimeout (function () {
                        $("#failed_upload_investigation").hide();
                        $(".saveInvestigationDocument").prop("disabled", false)
                    }, 2000);
                }
                else {
                    var form = new FormData();
                    form.append("file", fileToUpload, fileToUpload.name);
                    var settings = {
                        "url": api+"8080/file/upload?uuid="+client_id+"&type=Investigation&createdby="+userName+"&version=0&kind="+fileToUpload.name+"&officeId="+client_fo+"&remarks="+$(".investigatingOfficer").val(),
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
                            $('#success_upload_investigation').show();
                            setTimeout(function () {
                                $('#success_upload_investigation').hide();
                                window.location.reload(true);
                            }, 1000);
                        } else {

                        }
                    });
                }
            })
        })
        loadInvestigationFiles();

        $("#investigationTab").unbind("click").on("click", function(){
            $(".info-details").html('');
            $(".info-action").html('');
            $(".info-action").append(`
                <button class="btn btn-sm btn-primary btn-addInvestigation" type="submit"><i class="fa fa-plus-circle"></i>  Add Investigation Document/Report</button>
            `)
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="investigationContent">
                    <table id="investigationTable" class="table table-bordered table_head" style="max-width: 100%;">
                        <thead>
                            <th>#</th>
                            <th>Reports</th>
                            <th>Investigating Officer</th>
                            <th>Actions</th>
                        </thead>
                        <tbody class="table_body">
                        </tbody>
                    </table>
                </div>
            `)
            loadInvestigationFiles();

            $(".btn-addInvestigation").unbind("click").on("click", function(){
                $("#investigationUploadModal").modal("show")

                $(".saveInvestigationDocument").unbind("click").on("click", function(){
                    var fileToUpload = $('#file-input-investigation').prop('files')[0];
                    if (fileToUpload === undefined) {
                        $("#failed_upload_investigation").show();
                        $(".saveInvestigationDocument").prop("disabled", true)
                        setTimeout (function () {
                            $("#failed_upload_investigation").hide();
                            $(".saveInvestigationDocument").prop("disabled", false)
                        }, 2000);
                    }
                    else {
                        var form = new FormData();
                        form.append("file", fileToUpload, fileToUpload.name);
                        var settings = {
                            "url": api+"8080/file/upload?uuid="+client_id+"&type=Investigation&createdby="+userName+"&version=0&kind="+fileToUpload.name+"&officeId="+client_fo+"&remarks="+$(".investigatingOfficer").val(),
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
                                $('#success_upload_investigation').show();
                                setTimeout(function () {
                                    $('#success_upload_investigation').hide();
                                    window.location.reload(true);
                                }, 1000);
                            } else {

                            }
                        });
                    }
                })
            })
        })

        $("#supervisionTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-action").append(`
                <button class="btn btn-sm btn-primary btn-addSupervision" type="submit"><i class="fa fa-plus-circle"></i>  Add Supervision Document/Report</button>
            `)
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="supervisionContent">
                    <table id="" class="table table-bordered table_head" style="max-width: 100%;">
                        <thead>
                            <th>#</th>
                            <th>Reports</th>
                            <th>Investigating Officer</th>
                            <th>Actions</th>
                        </thead>
                        <tbody class="table_body">
                        </tbody>
                    </table>
                </div>
            `)

            $(".btn-addSupervision").unbind("click").on("click", function(){
                console.log("supervision document clicked")
                $("#supervisionUploadModal").modal("show")

                $(".saveSupervisionDocument").unbind("click").on("click", function(){
                    var fileToUpload = $('#file-input-supervision').prop('files')[0];
                    if (fileToUpload === undefined) {
                        $("#failed_upload_supervision").show();
                        $(".saveSupervisionDocument").prop("disabled", true)
                        setTimeout (function () {
                            $("#failed_upload_supervision").hide();
                            $(".saveSupervisionDocument").prop("disabled", false)
                        }, 2000);
                    }
                    else {
                        var form = new FormData();
                        form.append("file", fileToUpload, fileToUpload.name);
                        var settings = {
                            "url": api+"8080/file/upload?uuid="+client_id+"&type=Supervision&createdby="+userName+"&version=0&kind="+fileToUpload.name+"&officeId="+client_fo+"&remarks="+$(".investigatingOfficerSupervision").val(),
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
                                $('#success_upload_supervision').show();
                                setTimeout(function () {
                                    $('#success_upload_supervision').hide();
                                    window.location.reload(true);
                                }, 1000);
                            } else {

                            }
                        });
                    }
                })
            })
            loadSupervisionFiles();
        })

        $("#rehabilitationTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="rehabilatationContent" style="overflow: auto; max-height: 100%">
                    <div class="tc-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Therapeutic Community</span>
                    </div>
                    <div class="tc-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By: Commission Date</span>
                        <span><input type="date" class="form-control mx-2"></span>
                        <span><input type="date" class="form-control mx-3"></span>
                        <span><button type="button" class="btn btn-primary btn-searchTc btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="tc-body" style="height: 200px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_tc" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Date Conducted</th>
                                <th>Activities-Category</th>
                                <th>Therapeutic Community Ladderized Program (TCLP) Phase</th>
                                <th>Venue</th>
                                <th>Conducted By</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>

                    <div class="rj-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Restorative Justice</span>
                    </div>
                    <div class="rj-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By: Commission Date</span>
                        <span><input type="date" class="form-control mx-2"></span>
                        <span><input type="date" class="form-control mx-3"></span>
                        <span><button type="button" class="btn btn-primary btn-searchRj btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="rj-body" style="height: 200px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_rj" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Process Applied</th>
                                <th>Stakeholders Involved</th>
                                <th>Date Conducted</th>
                                <th>Conducted By</th>
                                <th>Outcome</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>

                    <div class="vol-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Volunteerism</span>
                    </div>
                    <div class="vol-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By: Commission Date</span>
                        <span><input type="date" class="form-control mx-2"></span>
                        <span><input type="date" class="form-control mx-3"></span>
                        <span><button type="button" class="btn btn-primary btn-searchVol btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="vol-body" style="height: 200px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_vol" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Name of Volunteer Probation Assistant Supervising the Parolee/Pardonee</th>
                                <th>Date Conducted</th>
                                <th>Kind of Service Extended to the Parolee/Pardonee</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
        })

        $("#reportingDateTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-action").append(`
                <button class="btn btn-sm btn-primary btn-addReportingDate" type="submit"><i class="fa fa-plus-circle"></i>  Add Reporting Date</button>
            `)
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="reportingDateContent" style="overflow: auto; max-height: 100%">
                    <div class="tc-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Reporting Date</span>
                    </div>
                    <div class="tc-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By:</span>
                        <span>
                            <select class="form-control searchReportingDate select2 mx-3">
                                <option selected value="all">All</option>
                            </select>
                        </span>
                        <span><button type="button" class="btn btn-primary btn-searchRd btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="tc-body" style="height: 500px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_tc" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Date</th>
                                <th>Field Office</th>
                                <th>Reporting Type</th>
                                <th>Officer</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
            $(".btn-addReportingDate").unbind("click").on("click", function(){
                $("#addReportingDateModal").modal("show")
            })
        })

        $("#otherDocumentsTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-action").append(`
                <button class="btn btn-sm btn-primary btn-addNotes" type="submit"><i class="fa fa-plus-circle"></i>  Add Note/Other Document</button>
            `)
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="notesOtherDocumentContent" style="overflow: auto; max-height: 100%">
                    <div class="notes-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Notes/Other Documents</span>
                    </div>
                    <div class="tc-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By:</span>
                        <span>
                            <select class="form-control documentFilter select2 mx-3">
                                <option selected value="all">All</option>
                            </select>
                        </span>
                        <span><button type="button" class="btn btn-primary btn-searchRd btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="tc-body" style="height: 500px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_odctab" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Date Received</th>
                                <th>Uploader</th>
                                <th>Remarks</th>
                                <th>Actions</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
            $(".btn-addNotes").unbind("click").on("click", function(){
                $("#addOtherDocumentModal").modal("show")

                $(".saveOtherDocument").unbind("click").on("click", function(){
                    var fileToUpload = $('#file-input-other').prop('files')[0];
                    if (fileToUpload === undefined) {
                        $("#failed_upload_other").show();
                        $(".saveOtherDocument").prop("disabled", true)
                        setTimeout (function () {
                            $("#failed_upload_other").hide();
                            $(".saveOtherDocument").prop("disabled", false)
                        }, 2000);
                    }
                    else {
                        var form = new FormData();
                        form.append("file", fileToUpload, fileToUpload.name);
                        var settings = {
                            "url": api+"8080/file/upload?uuid="+client_id+"&type=notesAndOtherDocuments&createdby="+userName+"&version=0&kind="+fileToUpload.name+"&officeId="+client_fo+"&remarks="+$(".remarksOther").val(),
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
                                $('#success_upload_other').show();
                                setTimeout(function () {
                                    $('#success_upload_other').hide();
                                    window.location.reload(true);
                                }, 1000);
                            } else {

                            }
                        });
                    }
                })
            })
            dataTableOther = null;
            loadOtherUploadedDocuments("notesAndOtherDocuments", client_id, client_fo)
        })

        $("#taskListTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-details").append(`
                <div class="tab-pane fade show active" id="taskListContent" style="overflow: auto; max-height: 100%">
                    <div class="notes-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Task List</span>
                    </div>
                    <div class="tc-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By:</span>
                        <span>
                            <select class="form-control taskFilter select2 mx-3">
                                <option selected value="all">All</option>
                            </select>
                        </span>
                        <span><button type="button" class="btn btn-primary btn-searchTask btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="tc-body" style="height: 500px; width: 100%; padding-top: 10px;">
                        <table id="" class="table table-bordered table_head_tc" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Task</th>
                                <th>Date Assigned</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </thead>
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
        })

        $("#docketListTab").unbind("click").on("click", function(){
            $(".info-details").html('')
            $(".info-action").html('');
            $(".info-details").append(`
                <!-- Print Preview Modal -->
                <div id="pdfPreviewModal" 
                    style="display:none; position:fixed; top:0; left:0; width:100%; height:100%;
                        background:rgba(0,0,0,0.6); justify-content:center; align-items:center; z-index:9999;">

                  <div style="background:#fff; padding:10px; border-radius:8px; width:90%; height:90%;
                      position:relative; display:flex; flex-direction:column;">

                    <!-- Header buttons -->
                    <div style="display:flex; justify-content:flex-end; gap:10px; margin-bottom:10px;">
                        <button type="button" id="closePreview" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- PDF iframe -->
                    <iframe id="pdfIframe" style="flex:1; width:100%; border:none; border-radius:6px;"></iframe>

                  </div>
                </div>

                <div class="tab-pane fade show active" id="docketListContent" style="overflow: auto; max-height: 100%">
                    <div class="notes-header" style="height: 50px; width: 100%; padding: 10px 20px;">
                        <span style="color: #007bff; font-weight: bold;">Notes/Other Documents</span>
                    </div>
                    <div class="tc-search" style="height: 50px; width: 100%; display: flex; align-items: center; padding-left: 20px;">
                        <span style="color: #333;">Filter By:</span>
                        <span>
                            <select class="form-control docketFilter select2 mx-3">
                                <option selected value="all">All</option>
                            </select>
                        </span>
                        <span><button type="button" class="btn btn-primary btn-searchDocket btn-sm mx-4">Confirm</button></span>
                    </div>
                    <div class="tc-body" style="height: 500px; width: 100%; padding-top: 10px; overflow-y: auto;">
                        <table id="" class="table table-bordered table_head_tc" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>Docket Number</th>
                                <th>Date Received</th>
                                <th>Days Left</th>
                                <th>Officer</th>
                                <th>Status</th>
                                <th>Worksheet</th>
                                <th>PSIR</th>
                            </thead>
                            <tbody class="table_body_tc">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
            docketCurrentPage = 0;
            docketIsLoading = false;
            docketHasMore = true;
            docketRowCount = 0;
            cachedWsStatus = null;
            cachedPsStatus = null;

            getDocketNumberDetails();

            $(".tc-body").off("scroll").on("scroll", function () {
                var el = $(this);
                if (el.scrollTop() + el.innerHeight() >= el[0].scrollHeight - 50) {
                    getDocketNumberDetails();
                }
            });

            $(".btn-addNotes").unbind("click").on("click", function(){
                $("#addOtherDocumentModal").modal("show")
            })
        })

        $(document).off("click", ".btn_pdfPSIR").on("click", ".btn_pdfPSIR", function(e) {
            e.preventDefault();
            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {
                var worksheetData = JSON.parse(result.response.jsonData)
                console.log(worksheetData)
                __executeExternalGet(`8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`).done(function (resImage) {
                    var petitionerProfileId = resImage.files[0].id
                    loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId}`)
                    .then(function(petitionerProfilePictureBase64String) {
                        localStorage.removeItem("profilePicture")
                        localStorage.setItem("profilePicture", petitionerProfilePictureBase64String)
                    });
                    loadImageToBase64(`images/pis_logo.png`)
                    .then(function(pisLogoBase64String) {
                        localStorage.removeItem("pisLogo")
                        localStorage.setItem("pisLogo", pisLogoBase64String)
                    });

                    if (resImage.status != "ERROR") {
                        var petitionerProfilePicture = localStorage.getItem("profilePicture");
                        var logo = localStorage.getItem("pisLogo");
                        var identifyingData = worksheetData.identifyingData;
                        var presentOffense = worksheetData.presentOffense;
                        var priorRecordsAndDerogatoryRecord = worksheetData.priorRecordsAndDerogatoryRecord;
                        var familyBackgroundAndBirthData = worksheetData.familyBackgroundAndBirthData;
                        var analysisAndProjectedThrust = worksheetData.analysisAndProjectedThrust;
                        var educationAndJobHistory = worksheetData.educationAndJobHistory;
                        var medicalHistory = worksheetData.medicalHistory;
                        var presentSituation = worksheetData.presentSituation;
                        var traitsAndCommunityBackground = worksheetData.traitsAndCommunityBackground;

                        // Create a new jsPDF instance
                        const doc = new jsPDF('p', 'mm', 'a4');                 
                        // Define constants
                        const pageWidth = doc.internal.pageSize.width;
                        const pageHeight = doc.internal.pageSize.height;

                        // const margin = 20; // margin from left 
                        const lineHeight = 7; // spacing between contents
                        const maxContentHeight = pageHeight - 10; // leave room for footer (bottom 20px)
                        let yCoordinate = ""; // initialize the y coordinate as empty (will be updated as soon the text is drawn in the page)
                        let pageNumber = 1; // initialize the page header
                        let topMargin = "";  
                        const bottomMargin = 10;
                        const textVerticalAdjust = 1.5;       // raise text above underline

                        // Utility to auto-wrap text, manage page breaks, and conditionally draw underline
                        function drawLeftText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
                            let newY = y;
                            const underlineStartX = x + textOffset;
                            const underlineEndX = underlineStartX + underlineLength;

                            // Determine needed height for the text block
                            const wrappedText = (value && value.trim() !== "")
                                ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
                                : [];
                            const neededHeight = (wrappedText.length || 1) * lineHeight;

                            // Page break check before drawing
                            if (newY + neededHeight + bottomMargin > maxContentHeight) {
                                doc.addPage();
                                addHeader("");
                                // addFooter()
                                newY = topMargin;
                            }

                            // Apply vertical adjust only if underline exists
                            const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

                            // Draw label
                            doc.setFont(font, fontWeight);
                            doc.setFontSize(fontSize);
                            doc.text(label, x, newY - yAdjust);

                            // Draw underline if needed
                            if (underlineLength && underlineLength > 0) {
                                doc.setLineWidth(0.2);
                                doc.line(underlineStartX, newY, underlineEndX, newY);
                            }

                            // Draw wrapped value
                            if (wrappedText.length > 0) {
                                wrappedText.forEach((line, i) => {
                                    // Check per-line page overflow
                                    if (newY + lineHeight > maxContentHeight - bottomMargin) {
                                        doc.addPage();
                                        addHeader("");
                                        // addFooter()
                                        newY = topMargin;
                                    }

                                    const textY = newY - yAdjust + i * lineHeight;
                                    doc.text(line, underlineStartX + 1, textY);
                                });
                                newY += wrappedText.length * lineHeight;
                            } else {
                                newY += lineHeight;
                            }

                            return newY;
                        }
                        // Utility to auto-wrap text, manage page breaks, and conditionally draw underline
                        function drawRightText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
                            let newY = y;
                            const underlineStartX = x + textOffset;
                            const underlineEndX = underlineStartX + underlineLength;

                            // Determine needed height for the text block
                            const wrappedText = (value && value.trim() !== "")
                                ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
                                : [];
                            const neededHeight = (wrappedText.length || 1) * lineHeight;

                            // Page break check before drawing
                            if (newY + neededHeight + bottomMargin > maxContentHeight) {
                                doc.addPage();
                                addHeader("");
                                // addFooter()
                                newY = topMargin;
                            }

                            // Apply vertical adjust only if underline exists
                            const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

                            // Draw label
                            doc.setFont(font, fontWeight);
                            doc.setFontSize(fontSize);
                            doc.text(label, x, newY - yAdjust);

                            // Draw underline if needed
                            if (underlineLength && underlineLength > 0) {
                                doc.setLineWidth(0.2);
                                doc.line(underlineStartX, newY, underlineEndX, newY);
                            }

                            // Draw wrapped value
                            if (wrappedText.length > 0) {
                                wrappedText.forEach((line, i) => {
                                    // Check per-line page overflow
                                    if (newY + lineHeight > maxContentHeight - bottomMargin) {
                                        doc.addPage();
                                        addHeader("");
                                        // addFooter()
                                        newY = topMargin;
                                    }

                                    const textY = newY - yAdjust + i * lineHeight;
                                    doc.text(line, underlineStartX + 1, textY);
                                });
                                newY += wrappedText.length * lineHeight;
                            } else {
                                newY += lineHeight;
                            }

                            return newY;
                        }
                        // for textWrapping of the texts position at the center
                        function drawCenterText(text, y, fontWeight = 'normal', fontSize = 12, maxWidth = 100) {
                            doc.setFontSize(fontSize);
                            doc.setFont('helvetica', fontWeight);

                            const pageWidth = doc.internal.pageSize.width;
                            const wrappedText = doc.splitTextToSize(text, maxWidth);
                            const lineHeight = 6;

                            wrappedText.forEach(line => {
                                // Check if we’re near the bottom of the page
                                if (y + lineHeight > 250) {
                                    doc.addPage();
                                    addHeader("");
                                    y = topMargin + 5; // reset top margin for new page
                                    doc.setFontSize(fontSize);
                                    doc.setFont('helvetica', fontWeight);
                                }

                                const textWidth = doc.getTextWidth(line);
                                const x = (pageWidth - textWidth) / 2; // horizontally center
                                doc.text(line, x, y);
                                y += lineHeight;
                            });

                            return y;
                        }
                        // for documents note that will occupy all the max width of the page
                        function drawTextBlock(text, x, y, lineHeight, maxWidth = 190) {
                            const pageHeight = doc.internal.pageSize.height; // total page height
                            const pageWidth = doc.internal.pageSize.width;   // total page width

                            // make sure the text does not go beyond the allowed content width
                            const contentRightLimit = x + maxWidth;
                            if (contentRightLimit > pageWidth - 10) { // safety margin
                                maxWidth = pageWidth - x - 10;
                            }

                            // split text to fit within the max width
                            const lines = doc.splitTextToSize(text, maxWidth);

                            for (let i = 0; i < lines.length; i++) {
                                // if reaching bottom of the page, add new page
                                if (y + lineHeight > maxContentHeight - bottomMargin) {
                                    doc.addPage();
                                    addHeader("");
                                    y = topMargin; // reset y for new page
                                    doc.setFont("helvetica", "normal");
                                    doc.setFontSize(10)
                                }

                                doc.text(lines[i], x, y);
                                y += lineHeight;
                            }

                            // return the final Y position (useful if chaining text blocks)
                            return y;
                        }

                        function addHeader(pageNumber) {
                            let fullName = petitionersName;
                            let leftY = 10;
                            let rightY = 10;

                            // if ( result.firstName === null &&
                            //      result.middleName === null &&
                            //      result.lastName === null &&
                            //      result.suffixName === null ) {
        
                            //         fullName = result.fullName;
                            // } else {
                            //     fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                            // }

                            // Left top of the header
                            leftY = drawLeftText("", "", 10, leftY, "helvetica", "normal", 10, 3)
                            leftY = drawLeftText("p.", pageNumber, 10, leftY, "helvetica", "bold", 10, 3)
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10);
                            doc.text(`PSIR Re:`, 10, leftY);
                            leftY = drawLeftText("", fullName.toUpperCase(), 20, leftY, "helvetica", "normal", 10, 6)
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10);
                            doc.text(`Criminal Case Number:`, 10, leftY);
                            leftY = drawLeftText("", result.criminalCaseNo, 44, leftY, "helvetica", "normal", 10, 6)

                            // Right top section
                            rightY = drawRightText("PPA FORM 3", "", 165, rightY, "helvetica", "bold", 10, 0)
                            rightY = drawRightText("REVISION 002", "", 165, rightY, "helvetica", "bold", 10, 0)
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10);
                            doc.text("Investigation Docket:", 120, rightY);
                            rightY = drawRightText("", `${result.docketNumber ?? "N/A"}`, 150, rightY, "helvetica", "normal", 10, 6)

                            // update the y coordinate
                            if (leftY > rightY) {
                                yCoordinate = leftY;
                                topMargin = leftY
                            } else {
                                yCoordinate = rightY;
                                topMargin = rightY;
                            }

                            // addFooter();
                            doc.setFont("helvetica", "normal")
                        }
                        addHeader(`${pageNumber}`)

                        // function for printing the logo and picture of the petitioner
                        function logoAndPicture () {
                            // ppa logo
                            let leftY = yCoordinate;
                            let rightY = yCoordinate;
                            let centerY = yCoordinate
                            doc.addImage(logo, 'PNG', 10, leftY, 30, 30); // x, y, width, height
                            // petitioner profile
                            doc.addImage(petitionerProfilePicture, 'PNG', 165, rightY, 35, 35)
                            // fetching of regional name
                            
                            // Centered text section
                            centerY = drawCenterText('', centerY, 'normal', 11);
                            centerY = drawCenterText('Republic of the Philippines', centerY, 'normal', 11);
                            centerY = drawCenterText('Department of Justice', centerY, 'bold', 11);
                            doc.setTextColor(241, 99, 117, 1)
                            centerY = drawCenterText('PAROLE AND PROBATION ADMINISTRATION', centerY, 'bold', 11);
                            centerY = drawCenterText('REGION NAME', centerY, 'bold', 11);
                            centerY = drawCenterText(`${$.cookie('departmentName').toUpperCase() ?? "N/A"}`, centerY, 'bold', 11);

                            // ensure that the y coordinate will not overlap with the picture and logo and also set the new y coordinate below the logo and picture for the next content;
                            if (centerY > centerY + 10) {
                                yCoordinate = centerY;
                            } else {
                                yCoordinate = centerY + 10;
                            }
                        }
                        logoAndPicture();

                        // for post investigation header
                        function postInvestigationReportHeader () {
                            var leftY = yCoordinate;
                            var centerY = yCoordinate + 5;
                            // Draw the rectangle border for post investigation title
                            doc.setTextColor(1, 0, 0, 1)
                            doc.rect(10, leftY, 190, 7);
                            centerY = drawCenterText('POST-SENTENCE INVESTIGATION REPORT', centerY, 'bold', 11);
                            centerY = drawCenterText('', centerY, 'bold', 11); // put some space for next content
                            
                            //set the new coordinate of y for next content
                            yCoordinate = centerY;
                        }
                        postInvestigationReportHeader()

                        function drawIdentifyingData () {
                            let centerY = yCoordinate;
                            centerY = drawCenterText('I.    IDENTIFYING DATA', centerY, 'bold', 11);
                            let leftY = centerY + 5; // re initialize the left y coordinate after the identifying data title (add 5 for the lineHeight)
                            leftY = drawLeftText("PETIONER'S NAME:", identifyingData.name, 14, leftY, "helvetica", "normal", 10, 35, 150) // label, value, xLeft, yLeft, font, fontWeight, fontSize, textOffset, underlineLength
                            doc.setFont('helvetica','italic')
                            doc.setFontSize(8);
                            doc.text(`(per court records)`, 20,leftY)
                            doc.text(`(Last Name)`, 57, leftY)
                            doc.text(`(First Name)`, 107, leftY)
                            doc.text(`(Middle Name)`, 157, leftY)
                            leftY = leftY + 10; // initialize the leftY again after fname mname and lname
                            leftY = drawLeftText("True Name:", identifyingData.trueName, 14, leftY, "helvetica", "normal", 10, 20, 165)
                            let rightY = leftY; // reinitialize the rightY to match the leftY position
                            // Left Column of Identifying data
                            leftY = drawLeftText("Alias/es:", identifyingData.alias, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Sex:", identifyingData.sex, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Gender Preference:", identifyingData.genderPreference, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Birthday:", identifyingData.birthday, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Age:", identifyingData.age, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Civil Status:", identifyingData.civilStatus, 14, leftY, "helvetica", "normal", 10, 35, 50);
                            leftY = drawLeftText("Spouse:", identifyingData.spouse, 14, leftY, "helvetica", "normal", 10, 35, 50);

                            // right column of identifying data
                            rightY = drawRightText("Education Attainment:", identifyingData.education, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("Religion:", identifyingData.religion, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("Occupation:", identifyingData.occupation, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("Nationality:", identifyingData.nationality, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("Mother:", identifyingData.mother, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("(Maiden Name):", identifyingData.maidenName, 110, rightY, "helvetica", "normal", 10, 35, 54);
                            rightY = drawRightText("Father:", identifyingData.father, 110, rightY, "helvetica", "normal", 10, 35, 54);

                            if (leftY > rightY) { // update the y coordinate
                                yCoordinate = leftY;
                            } else {
                                yCoordinate = rightY;
                            }

                            leftY = yCoordinate; // re-initialize again the leftY for reuse
                            leftY = drawLeftText("", "", 14, leftY, "helvetica", "normal", 10, 40)
                            leftY = drawLeftText("Identifying/Remarkable Features:", identifyingData.remarks, 14, leftY, "helvetica", "normal", 10, 55, 130)
                            leftY = drawLeftText("Present Address:", identifyingData.presentAddress, 14, leftY, "helvetica", "normal", 10, 30, 155)
                            leftY = drawLeftText("Permanent Address:", identifyingData.permanentAdress, 14, leftY, "helvetica", "normal", 10, 35, 150)

                            yCoordinate = leftY; // set the updated y coordinate
                        }
                        drawIdentifyingData();

                        function drawCriminalHistory () {
                            let centerY = yCoordinate;
                            centerY = drawCenterText('II.   CRIMINAL HISTORY', centerY, 'bold', 11);
                            let leftY = centerY;
                            leftY = drawLeftText("A. PRESENT OFFENSE", "", 14, leftY, "helvetica", "bold", 10, 40)
                            let rightY = leftY; // intialize the right y after the present offense title for alignment
                            // left column criminal history
                            leftY = drawLeftText("Charge With:", presentOffense.chargedWith, 14, leftY, "helvetica", "normal", 10, 40)
                            leftY = drawLeftText("Convicted of:", presentOffense.convictedOf, 14, leftY, "helvetica", "normal", 10, 40)
                            leftY = drawLeftText("Sentence:", presentOffense.sentence, 14, leftY, "helvetica", "normal", 10, 40)
                            leftY = drawLeftText("Judge:", presentOffense.judge, 14, leftY, "helvetica", "normal", 10, 40)

                            // right column criminal history
                            rightY = drawRightText("Date:", presentOffense.chargedWithDate, 110, rightY, "helvetica", "normal", 10, 40)
                            rightY = drawRightText("Date:", presentOffense.convictedOf, 110, rightY, "helvetica", "normal", 10, 40)
                            rightY = drawRightText("", "", 110, rightY, "helvetica", "normal", 10, 40)
                            rightY = drawRightText("Court:", presentOffense.judge, 110, rightY, "helvetica", "normal", 10, 40)


                            if (leftY > rightY) { // update the y coordinate
                                yCoordinate = leftY;
                            } else {
                                yCoordinate = rightY;
                            }

                            leftY = yCoordinate; // re initialize the left y coordinate for part 2 of crim history

                            // draw the circle of custodial status before the custodial status for alignment purpose;
                            doc.setFont('helvetica', 'normal');
                            doc.setFontSize(10);
                            doc.circle(45, leftY - 2, 2);
                            doc.text("On Bail", 50, leftY);
                            doc.circle(70, leftY - 2, 2);
                            doc.text("On Detention", 75, leftY);
                            leftY = drawLeftText("Custodial Status:", "", 14, leftY, "helvetica", "normal", 10, 40)
                            doc.circle(45, leftY - 2, 2);
                            leftY = drawLeftText("ROR - Custodian:", "", 50, leftY, "helvetica",  "normal", 10, 30, 115); // draw the ror custodian after the custodial status
                            leftY = drawLeftText("Address:", "", 50, leftY, "helvetica", "normal", 10, 20, 125);
                            leftY = drawLeftText("", "", 14, leftY, "helvetica", "bold", 10, 40)
                            leftY = drawLeftText("B. PRIOR RECORDS", "", 14, leftY, "helvetica", "bold", 10, 40)

                            // Table headers
                            var headers = [
                                {title: "Agency", dataKey: "agency"},
                                {title: "Criminal Case No.", dataKey: "cc_no"}, 
                                {title: "Offense", dataKey: "offense"}, 
                                {title: "Date Charged", dataKey: "when"}, 
                                {title: "Decision/Status of the Case", dataKey: "decision"}, 
                            ];
                            
                            // Table rows (array of arrays)
                            const data = priorRecordsAndDerogatoryRecord.priorRecord;
                            // Draw the table
                            doc.autoTable(headers, data, {
                                startY: leftY, // Y position on page 
                                theme: 'plain', // Options: 'plain', 'striped', 'grid'
                                // pageBreak: 'always',
                                // tableWidth: pageWidth,
                                styles: {
                                    lineWidth: 0.1,          // border thickness
                                    lineColor: [0, 0, 0],    // border color (black)
                                    columnWidth: 'wrap',
                                    overflow: 'linebreak',
                                },
                                columnStyles: {
                                    4: {columnWidth: 'auto'}
                                },
                                headStyles: {
                                    lineWidth: 0.2,
                                    lineColor: [0, 0, 0],
                                    fontStyle: 'bold',
                                },
                                bodyStyles: {
                                    lineWidth: 0.1,
                                    lineColor: [0, 0, 0],
                                },
                            });

                            leftY = doc.autoTable.previous.finalY + 5;
                            doc.setFont("helvetica","italic");
                            leftY = drawTextBlock("Note: If records check results are not yet received, write this: “The office reserves the right to submit supplemental report once records verification from the institutions and/or law-enforcement agencies yields derogatory result or previous criminal records”. Also attach the Sinumpaang Salaysay.", 14, leftY, 10)
                            yCoordinate = leftY;
                        }
                        drawCriminalHistory();

                        function drawSocioEconomic () {
                            let centerY = yCoordinate + 10;
                            centerY = drawCenterText('III.  SOCIO-ECONOMIC BACKGROUND', centerY, 'bold', 11);

                            let leftY = centerY + 5;
                            let famY = centerY + 5; // y coordinate for family relationship part
                            let rightY = centerY + 5;
                            leftY = drawLeftText("A. Family Economic Status", "", 16, leftY, "helvetica", "normal", 10, 0)
                            doc.line(14, leftY - 5, 70, leftY - 5);

                            // Helper for checkbox
                            function checkbox(x, y, checked = false) {
                                doc.rect(x, y, 4, 4); // Draw the checkbox outline
                                if (checked) {
                                    // Draw a checkmark (✓)
                                    doc.rect(x, y, 4, 4, 'F');
                                }
                            }

                            // for family economic status checkboxes
                            const economicStatus = [
                                "Poor",
                                "Low-income Class (but not poor)",
                                "Lower Middle- Income Class",
                                "Middle Middle- Income Class",
                                "Upper Middle- Income Class",
                                "Upper-Income Class (but not rich)",
                                "Rich"
                            ];
                            let xText = 25;
                            economicStatus.forEach((txt, i) => {
                                const isChecked = txt.trim().toLowerCase() === familyBackgroundAndBirthData.familyEconomicStatus.trim().toLowerCase(); // Check if current option matches API value (case-insensitive)
                                // const isChecked = txt.toLowerCase().includes(socioEconomic.eco_status.toLowerCase()); 
                                checkbox(16, leftY + i * 7, isChecked);
                                doc.text(txt, xText, leftY + 4 + i * 7);
                                yCoordinate = leftY + 4 + i * 7;
                            });

                            centerY = drawLeftText("B. Family Relationship", "", 90, famY, "helvetica", "normal", 10, 0)
                            doc.line(88, leftY - 5, 130, leftY - 5);
                            var familyRelationshipStatus = ["Very satisfactory", "Satisfactory", "Poor"];
                            familyRelationshipStatus.forEach((txt, i) => {
                                const isChecked = txt.trim().toLowerCase() === familyBackgroundAndBirthData.familyRelationship.trim().toLowerCase();
                                checkbox(90 + 2, centerY + i * 7, isChecked);
                                doc.text(txt, 90 + 10, centerY + 4 + i * 7);
                            });

                            rightY = drawRightText("C. Family Reputation", "", 140, rightY, "helvetica", "normal", 10, 0)
                            doc.line(138, leftY - 5, 180, leftY - 5);
                            var familyReputation = ["Very satisfactory", "Satisfactory", "Family reputation is undesirable"];
                            familyRelationshipStatus.forEach((txt, i) => {
                                const isChecked = txt.trim().toLowerCase() === familyBackgroundAndBirthData.familyReputationInCommunity.trim().toLowerCase();
                                checkbox(140 + 2, rightY + i * 7, isChecked);
                                doc.text(txt, 140 + 10, rightY + 4 + i * 7);
                            });

                            leftY = yCoordinate + 10;
                            centerY = yCoordinate + 10;
                            rightY = yCoordinate + 10;
                            leftY = drawLeftText("D. Family Support", "", 16, leftY, "helvetica", "normal", 10, 0)
                            doc.line(14, leftY - 5, 70, leftY - 5);
                            var familySupport = ["Very satisfactory", "Satisfactory", "Poor"];
                            familySupport.forEach((txt, i) => {
                                checkbox(16, leftY + i * 7);
                                doc.text(txt, xText, leftY + 4 + i * 7);
                                yCoordinate = leftY + 4 + i * 7;
                            });

                            centerY = drawLeftText("E. Community Acceptability", "", 90, centerY, "helvetica", "normal", 10, 0)
                            doc.line(88, centerY - 5, 130, centerY - 5);
                            var communityAcceptability = ["Very satisfactory", "Satisfactory", "Poor"];
                            communityAcceptability.forEach((txt, i) => {
                                // const isChecked = txt.trim().toLowerCase() === environmentalFactor.comAcceptance.trim().toLowerCase();
                                checkbox(90 + 2, centerY + i * 7);
                                doc.text(txt, 90 + 10, centerY + 4 + i * 7);
                            });

                            rightY = drawLeftText("F. Overall Well-being", "", 140, rightY, "helvetica", "normal", 10, 0)
                            doc.line(138, rightY - 5, 180, rightY - 5);
                            var overallWellbeing = ["Very satisfactory", "Satisfactory", "Poor"];
                            overallWellbeing.forEach((txt, i) => {
                                // const isChecked = txt.trim().toLowerCase() === employmentHistory.empHealth.trim().toLowerCase();
                                checkbox(140 + 2, rightY + i * 7);
                                doc.text(txt, 140 + 10, rightY + 4 + i * 7);
                            });

                            yCoordinate = yCoordinate + 10;
                        }
                        drawSocioEconomic();

                        function drawAnalysis () {
                            let centerY = yCoordinate + 10;
                            centerY = drawCenterText('IV.  ANALYSIS AND EVALUATION', centerY, 'bold', 11);

                            let leftY = centerY + 5;
                            doc.setFont("helvetica", "normal")
                            // leftY = drawTextBlock(evaluation.analysisAndEvaluation, 14, leftY, 7)
                            yCoordinate = leftY;
                        }
                        drawAnalysis();

                        function drawProjectedThrust () {
                            let centerY = yCoordinate + 10;
                            centerY = drawCenterText('V. PROJECTED THRUSTS OF REHABILITATION', centerY, 'bold', 11);

                            let leftY = centerY + 5;
                            doc.setFont("helvetica", "normal")
                            // leftY = drawTextBlock(evaluation.projectedThrust, 14, leftY, 7)

                            yCoordinate = leftY + 10
                        }
                        drawProjectedThrust();

                        function drawRecommendation () {
                            let centerY = yCoordinate;

                            let fullName = petitionersName;

                            // if ( result.firstName === null &&
                            //      result.middleName === null &&
                            //      result.lastName === null &&
                            //      result.suffixName === null ) {
        
                            //         fullName = result.fullName;
                            // } else {
                            //     fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                            // }

                            centerY = drawCenterText('VI. RECOMMENDATION', centerY, 'bold', 11);
                            centerY = drawCenterText('(FOR CASES WITH PENDING RESULTS OF RECORDS CHECK OR GIOR)', centerY, 'normal', 11);

                            let leftY = centerY + 5;
                            doc.setFont("helvetica", "normal")
                            leftY = drawTextBlock(`     WHEREFORE, in view of the foregoing, pending the result/s of the NBI/CMRD/Others (specify)/Courtesy Investigation Results from ______________________, it is respectfully recommended to the Honorable Court that the petition for probation of _______________________ be ___________________, subject to the following conditions:`, 14, leftY, 7)
                            // var recommendationList = recommendation.recommendations;
                            // leftY = leftY + 5;
                            // console.log(recommendationList)

                            // for (var i = 0; i < recommendationList.length; i++){
                            //     var row = [recommendationList[i].recs];
                                
                            //     for (var k = 0; k < row.length; k++){
                            //         var rowValue = row[k];
                            //         leftY = drawTextBlock(`${i + 1}.)   ${rowValue}`, 14, leftY, 7)
                            //     }
                            // }
                            leftY = leftY + 3;
                            leftY = drawTextBlock(`     In the event that petitioner fails to observe the preceding conditions and/or has committed any material misrepresentation in his/her application for probation, his/her probation may be revoked by the Court or the conditions thereof modified`, 14, leftY, 7)
                            
                            leftY = leftY + 3;
                            leftY = drawTextBlock(`     City/Municipality, Province, Philippines, Date.`, 14, leftY, 7)

                            yCoordinate = leftY;
                        }
                        drawRecommendation();


                        // Instead of saving, generate a Blob for preview
                        const pdfBlob = doc.output('blob');
                        const PSIR = URL.createObjectURL(pdfBlob);

                        // Show modal and load PDF
                        const modal = document.getElementById("pdfPreviewModal");
                        const iframe = document.getElementById("pdfIframe");
                        iframe.src = PSIR;
                        modal.style.display = "flex"; // show centered

                        // Close modal
                        document.getElementById("closePreview").addEventListener("click", function() {
                            document.getElementById("pdfPreviewModal").style.display = "none";
                        });
                    }
                })

            })
        })

        $(document).off("click", ".btn_pdfPSIRLong").on("click", ".btn_pdfPSIRLong", function(e) {
            e.preventDefault();
            var foid        = client_fo;

            function calculateAge(birthdate) {
                const currentDate = new Date();
                const birthDate = new Date(birthdate);

                let age = currentDate.getFullYear() - birthDate.getFullYear();

                // Check if the birthday has occurred this year
                const hasBirthdayOccurred = (
                    currentDate.getMonth() > birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
                );

                // If the birthday hasn't occurred yet this year, subtract 1 from the age
                if (!hasBirthdayOccurred) {
                    age--;
                }

                return age;
            }

            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {
                var worksheetData = JSON.parse(result.response.jsonData)
                if (result.status != "ERROR") {
                    __executeExternalGet(`8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`).done(function (resImage) {
                        var petitionerProfileId = resImage.files[0].id
                        loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId}`)
                        .then(function(petitionerProfilePictureBase64String) {
                            localStorage.setItem("profilePicture", petitionerProfilePictureBase64String)
                        });
                        loadImageToBase64(`images/pis_logo.png`)
                        .then(function(pisLogoBase64String) {
                            localStorage.setItem("pisLogo", pisLogoBase64String)
                        });

                        if (resImage.status != "ERROR") {
                            var petitionerProfilePicture = localStorage.getItem("profilePicture");
                            var logo = localStorage.getItem("pisLogo");
                            var identifyingData = worksheetData.identifyingData;
                            var presentOffense = worksheetData.presentOffense;
                            var priorRecordsAndDerogatoryRecord = worksheetData.priorRecordsAndDerogatoryRecord;
                            var familyBackgroundAndBirthData = worksheetData.familyBackgroundAndBirthData;
                            var analysisAndProjectedThrust = worksheetData.analysisAndProjectedThrust;
                            var educationAndJobHistory = worksheetData.educationAndJobHistory;
                            var medicalHistory = worksheetData.medicalHistory;
                            var presentSituation = worksheetData.presentSituation;
                            var traitsAndCommunityBackground = worksheetData.traitsAndCommunityBackground;

                            // Create a new jsPDF instance
                            const doc = new jsPDF('p', 'mm', 'a4');                 
                            // Define constants
                            const pageWidth = doc.internal.pageSize.width;
                            const pageHeight = doc.internal.pageSize.height;

                            // const margin = 20; // margin from left 
                            const lineHeight = 7; // spacing between contents
                            const maxContentHeight = pageHeight - 10; // leave room for footer (bottom 20px)
                            let yCoordinate = ""; // initialize the y coordinate as empty (will be updated as soon the text is drawn in the page)
                            let pageNumber = 1; // initialize the page header
                            let topMargin = "";  
                            const bottomMargin = 10;
                            const textVerticalAdjust = 1.5;       // raise text above underline

                            function drawLeftText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
                                let newY = y;
                                const underlineStartX = x + textOffset;
                                const underlineEndX = underlineStartX + underlineLength;

                                // Determine needed height for the text block
                                const wrappedText = (value && value.trim() !== "")
                                    ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
                                    : [];
                                const neededHeight = (wrappedText.length || 1) * lineHeight;

                                // Page break check before drawing
                                if (newY + neededHeight + bottomMargin > maxContentHeight) {
                                    doc.addPage();
                                    addHeader("");
                                    // addFooter()
                                    newY = topMargin;
                                }

                                // Apply vertical adjust only if underline exists
                                const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

                                // Draw label
                                doc.setFont(font, fontWeight);
                                doc.setFontSize(fontSize);
                                doc.text(label, x, newY - yAdjust);

                                // Draw underline if needed
                                if (underlineLength && underlineLength > 0) {
                                    doc.setLineWidth(0.2);
                                    doc.line(underlineStartX, newY, underlineEndX, newY);
                                }

                                // Draw wrapped value
                                if (wrappedText.length > 0) {
                                    wrappedText.forEach((line, i) => {
                                        // Check per-line page overflow
                                        if (newY + lineHeight > maxContentHeight - bottomMargin) {
                                            doc.addPage();
                                            addHeader("");
                                            // addFooter()
                                            newY = topMargin;
                                        }

                                        const textY = newY - yAdjust + i * lineHeight;
                                        doc.text(line, underlineStartX + 1, textY);
                                    });
                                    newY += wrappedText.length * lineHeight;
                                } else {
                                    newY += lineHeight;
                                }

                                return newY;
                            }
                            function drawRightText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
                                let newY = y;
                                const underlineStartX = x + textOffset;
                                const underlineEndX = underlineStartX + underlineLength;

                                // Determine needed height for the text block
                                const wrappedText = (value && value.trim() !== "")
                                    ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
                                    : [];
                                const neededHeight = (wrappedText.length || 1) * lineHeight;

                                // Page break check before drawing
                                if (newY + neededHeight + bottomMargin > maxContentHeight) {
                                    doc.addPage();
                                    addHeader("");
                                    // addFooter()
                                    newY = topMargin;
                                }

                                // Apply vertical adjust only if underline exists
                                const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

                                // Draw label
                                doc.setFont(font, fontWeight);
                                doc.setFontSize(fontSize);
                                doc.text(label, x, newY - yAdjust);

                                // Draw underline if needed
                                if (underlineLength && underlineLength > 0) {
                                    doc.setLineWidth(0.2);
                                    doc.line(underlineStartX, newY, underlineEndX, newY);
                                }

                                // Draw wrapped value
                                if (wrappedText.length > 0) {
                                    wrappedText.forEach((line, i) => {
                                        // Check per-line page overflow
                                        if (newY + lineHeight > maxContentHeight - bottomMargin) {
                                            doc.addPage();
                                            addHeader("");
                                            // addFooter()
                                            newY = topMargin;
                                        }

                                        const textY = newY - yAdjust + i * lineHeight;
                                        doc.text(line, underlineStartX + 1, textY);
                                    });
                                    newY += wrappedText.length * lineHeight;
                                } else {
                                    newY += lineHeight;
                                }

                                return newY;
                            }
                            // for textWrapping of the texts position at the center
                            function drawCenterText(text, y, fontWeight = 'normal', fontSize = 12, maxWidth = 100) {
                                doc.setFontSize(fontSize);
                                doc.setFont('helvetica', fontWeight);

                                const pageWidth = doc.internal.pageSize.width;
                                const wrappedText = doc.splitTextToSize(text, maxWidth);
                                const lineHeight = 6;

                                wrappedText.forEach(line => {
                                    // Check if we’re near the bottom of the page
                                    if (y + lineHeight > 250) {
                                        doc.addPage();
                                        addHeader("");
                                        y = topMargin + 5; // reset top margin for new page
                                        doc.setFontSize(fontSize);
                                        doc.setFont('helvetica', fontWeight);
                                    }

                                    const textWidth = doc.getTextWidth(line);
                                    const x = (pageWidth - textWidth) / 2; // horizontally center
                                    doc.text(line, x, y);
                                    y += lineHeight;
                                });

                                return y;
                            }
                            // utility for drawing text in the page
                            function drawAutoText(label, value, startX, startY, underline = false, maxWidth = 190, orgX) {
                                const maxHeight = doc.internal.pageSize.height - 20;
                                let x = startX;
                                let y = startY;
                                const lineHeight = 6;

                                const labelText = `${label}`;
                                const valueText = value ?? "N/A";

                                doc.setFont('helvetica', 'normal');
                                doc.setFontSize(10);

                                // --- STEP 1: Measure label and value widths ---
                                const labelWidth = doc.getTextWidth(labelText) + 2;
                                const valueWords = valueText.split(/\s+/);

                                // --- STEP 2: Determine remaining width on current line ---
                                let remainingWidth = maxWidth - x;

                                // --- STEP 3: Build lines BEFORE drawing ---
                                let lines = [];
                                let currentLine = "";
                                let currentWidth = 0;

                                valueWords.forEach((word, i) => {
                                    const testLine = currentLine ? `${currentLine} ${word}` : word;
                                    const testWidth = doc.getTextWidth(testLine) + labelWidth; // first line includes label width
                                    if ((testWidth) > remainingWidth) {
                                        lines.push(currentLine);
                                        currentLine = word;
                                        currentWidth = 0;
                                        remainingWidth = maxWidth; // new line has full width
                                    } else {
                                        currentLine = testLine;
                                        currentWidth = doc.getTextWidth(currentLine);
                                    }

                                    if (i === valueWords.length - 1) lines.push(currentLine);
                                });

                                // --- STEP 4: Draw lines ---
                                const valueStartX = x + labelWidth;
                                lines.forEach((line, index) => {
                                    // Page overflow handling
                                    if (y + lineHeight > maxHeight - 10) {
                                        doc.addPage();
                                        addHeader();
                                        y = topMargin;
                                    }

                                    if (index === 0) {
                                        // Draw label + first part of value
                                        doc.text(labelText, x, y);
                                        const valuePart = line.replace(labelText, "").trim();
                                        doc.text(valuePart, valueStartX, y);

                                        if (underline) {
                                            const underlineWidth = doc.getTextWidth(valuePart);
                                            doc.line(valueStartX, y + 1, valueStartX + underlineWidth, y + 1);
                                        }
                                    } else {
                                        // Draw continuation lines aligned under the value start
                                        y += lineHeight;
                                        doc.text(line, orgX, y);

                                        if (underline) {
                                            const underlineWidth = doc.getTextWidth(line);
                                            doc.line(orgX, y + 1, orgX + underlineWidth, y + 1);
                                        }
                                    }
                                });

                                // --- STEP 5: Compute final X position for chaining ---
                                const lastLineWidth = doc.getTextWidth(lines[lines.length - 1]);
                                const newX = (lines.length === 1)
                                    ? valueStartX + lastLineWidth + 4 // continue same line
                                    : orgX + lastLineWidth + 4; // indent stays consistent

                                return { x: newX, y };
                            }
                            // 🟦 Utility function to draw radio button and label
                            function drawRadioButton(label, startX = 10, startY = 10, checked = false, hasValue = false, value = "", maxWidth = 190, orgX = 14) {
                                const radius = 1.7;           // circle size
                                const labelOffset = 1;      // space between circle and label
                                const spacing = 3;         // space after element
                                const lineLength = 40;      // underline length
                                const lineOffset = 2;       // small offset under text
                                const lineHeight = 6;

                                const pageHeight = doc.internal.pageSize.height - 20;

                                let x = startX;
                                let y = startY;

                                doc.setFont('helvetica', 'normal');
                                doc.setFontSize(10);

                                // --- Compute total width of this element ---
                                let elementWidth = radius * 2 + labelOffset + doc.getTextWidth(label);
                                if (hasValue) elementWidth += lineLength + spacing;

                                // --- If it exceeds page width, wrap to next line ---
                                if (x + elementWidth > maxWidth) {
                                    x = orgX;
                                    y += lineHeight;

                                    // Handle vertical overflow (new page)
                                    if (y + lineHeight > pageHeight - 10) {
                                        doc.addPage();
                                        y = 10;
                                    }
                                }

                                // --- Draw the radio button circle ---
                                doc.circle(x, y - 1.5, radius, "S");

                                if (checked) {
                                    doc.circle(x, y - 1.5, radius / 2, "F");
                                }

                                // --- Draw the label ---
                                doc.text(label, x + radius + labelOffset, y);

                                // --- Compute new X after label ---
                                let newX = x + radius + labelOffset + doc.getTextWidth(label) + 4;

                                // --- Draw underline/value if required ---
                                if (hasValue) {
                                    const underlineXStart = newX;
                                    const underlineXEnd = maxWidth;

                                    if (value) {
                                        doc.text(value, underlineXStart, y);
                                        const valueWidth = doc.getTextWidth(value);
                                        doc.line(underlineXStart, y + lineOffset, underlineXEnd, y + lineOffset);
                                    } else {
                                        doc.line(underlineXStart, y + lineOffset, underlineXEnd, y + lineOffset);
                                    }

                                    newX = underlineXEnd + spacing;
                                } else {
                                    newX += spacing;
                                }

                                return { x: newX, y };
                            }
                            // utility for drawing tables
                            function drawAutoTable(headers = [], data = [], x, y, didDrawPageCallback = null ) {
                                const pageWidth = doc.internal.pageSize.width;

                                doc.autoTable(headers, data, {
                                    startY: y, // Y position on page 
                                    theme: 'plain', // Options: 'plain', 'striped', 'grid'
                                    styles: {
                                        lineWidth: 0.1,          // border thickness
                                        lineColor: [0, 0, 0],    // border color (black)
                                        columnWidth: 'wrap',
                                        overflow: 'linebreak',
                                    },
                                    columnStyles: {
                                        4: {columnWidth: 'auto'}
                                    },
                                    headStyles: {
                                        lineWidth: 0.2,
                                        lineColor: [0, 0, 0],
                                        fontStyle: 'bold',
                                    },
                                    bodyStyles: {
                                        lineWidth: 0.1,
                                        lineColor: [0, 0, 0],
                                    },
                                });

                                // --- Draw the table ---
                                const nextY = doc.autoTable.previous.finalY + 6;
                                return { x: x, y: nextY };
                            }
                            // function helper for drawing checkboxes
                            function drawCheckbox(label, options, selectedValue, startX, startY, settings = {}) {
                                const pageHeight = doc.internal.pageSize.height - 20;
                                const lineHeight = settings.lineHeight || 6;
                                const boxSize = settings.boxSize || 4;
                                const textOffset = settings.textOffset || 6;
                                const sectionSpacing = settings.sectionSpacing || 4; // extra space after label
                                // const topMargin = settings.topMargin || 20;

                                let x = startX;
                                let y = startY;

                                // Normalize API value (case-insensitive)
                                const normalizedValue = selectedValue ? selectedValue.toString().trim().toLowerCase() : "";

                                // Calculate total height required for this section
                                const sectionHeight = lineHeight + sectionSpacing + (options.length * lineHeight);

                                // If section won't fit, go to next page
                                if (y + sectionHeight > pageHeight) {
                                    doc.addPage();
                                    addHeader();
                                    y = topMargin;
                                }

                                // Draw section label
                                doc.text(`${label}`, x, y);
                                y += lineHeight + sectionSpacing;

                                // Draw each checkbox
                                options.forEach((opt) => {
                                    // Check again if a single checkbox overflows
                                    if (y > pageHeight) {
                                        doc.addPage();
                                        addHeader();
                                        y = topMargin;
                                    }

                                    // Draw checkbox border
                                    doc.rect(x, y - boxSize + 1, boxSize, boxSize);

                                    // Fill checkbox if selected
                                    if (opt.value.toString().trim().toLowerCase() === normalizedValue) {
                                        const pad = 1;
                                        doc.setFillColor(0, 0, 0);
                                        doc.rect(x + pad / 2, y - boxSize + 1 + pad / 2, boxSize - pad, boxSize - pad, "F");
                                    }

                                    // Draw label text beside checkbox
                                    doc.text(opt.label, x + boxSize + textOffset, y);

                                    // Move to next line
                                    y += lineHeight;
                                });

                                // Reset fill color for next drawing
                                doc.setFillColor(255, 255, 255);

                                // Return current position (useful for chaining)
                                return { x: startX, y };
                            }
                            function addHeader(pageNumber) {
                                let fullName = petitionersName;
                                let leftY = 10;
                                let rightY = 10;

                                // if ( result.firstName === null &&
                                //      result.middleName === null &&
                                //      result.lastName === null &&
                                //      result.suffixName === null ) {

                                //         fullName = result.fullName;
                                // } else {
                                //     fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                                // }

                                // Left top of the header
                                leftY = drawLeftText("PPA FORM 3 ", "", 10, leftY, "helvetica", "normal", 10, 3)
                                leftY = drawLeftText("", "", 10, leftY, "helvetica", "normal", 10, 3)
                                doc.setFont("helvetica", "normal")
                                doc.setFontSize(10);
                                doc.text(`PSIR Re:`, 10, leftY);
                                leftY = drawLeftText("", fullName.toUpperCase(), 20, leftY, "helvetica", "normal", 10, 6)
                                doc.setFont("helvetica", "normal")
                                doc.setFontSize(10);
                                doc.text(`Criminal Case Number:`, 10, leftY);
                                leftY = drawLeftText("", result.criminalCaseNo, 44, leftY, "helvetica", "normal", 10, 6)

                                // Right top section
                                rightY = drawRightText("", "", 165, rightY, "helvetica", "normal", 10, 0)
                                rightY = drawRightText("", "", 165, rightY, "helvetica", "normal", 10, 0)
                                doc.setFont("helvetica", "normal")
                                doc.setFontSize(10);
                                doc.text("Investigation Docket:", 120, rightY);
                                rightY = drawRightText("", `${result.docketNumber ?? "N/A"}`, 150, rightY, "helvetica", "normal", 10, 6)

                                // update the y coordinate
                                if (leftY > rightY) {
                                    yCoordinate = leftY;
                                    topMargin = leftY
                                } else {
                                    yCoordinate = rightY;
                                    topMargin = rightY;
                                }

                                // addFooter();
                                doc.setFont("helvetica", "normal")
                            }
                            addHeader(`${pageNumber}`)
                            // function for printing the logo and picture of the petitioner
                            function logoAndPicture () {
                                // ppa logo
                                let leftY = yCoordinate;
                                let rightY = yCoordinate;
                                let centerY = yCoordinate
                                // doc.addImage(logo, 'PNG', 10, leftY, 30, 30); // x, y, width, height
                                // petitioner profile
                                doc.addImage(petitionerProfilePicture, 'PNG', 165, rightY, 35, 35)
                                // fetching of regional name
                                
                                // Centered text section
                                centerY = drawCenterText('', centerY, 'normal', 11);
                                centerY = drawCenterText('Republic of the Philippines', centerY, 'normal', 11);
                                centerY = drawCenterText('Department of Justice', centerY, 'normal', 11);
                                // doc.setTextColor(241, 99, 117, 1)
                                centerY = drawCenterText('PAROLE AND PROBATION ADMINISTRATION', centerY, 'normal', 11);
                                centerY = drawCenterText('REGION NAME', centerY, 'normal', 11);
                                centerY = drawCenterText(`${$.cookie('departmentName').toUpperCase() ?? "N/A"}`, centerY, 'normal', 11);

                                // ensure that the y coordinate will not overlap with the picture and logo and also set the new y coordinate below the logo and picture for the next content;
                                if (centerY > centerY + 10) {
                                    yCoordinate = centerY;
                                } else {
                                    yCoordinate = centerY + 10;
                                }
                            }
                            logoAndPicture();

                            // for post investigation header
                            function postInvestigationReportHeader () {
                                var leftY = yCoordinate;
                                var centerY = yCoordinate + 5;
                                // Draw the rectangle border for post investigation title
                                doc.setTextColor(1, 0, 0, 1)
                                doc.rect(10, leftY, 190, 7);
                                centerY = drawCenterText('POST-SENTENCE INVESTIGATION REPORT', centerY, 'normal', 11);
                                centerY = drawCenterText('', centerY, 'bold', 11); // put some space for next content
                                
                                //set the new coordinate of y for next content
                                yCoordinate = centerY;
                            }
                            postInvestigationReportHeader()
                            function drawIdentifyingData () {
                                let centerY = yCoordinate;
                                centerY = drawCenterText('I.    IDENTIFYING DATA', centerY, 'normal', 11);
                                let leftY = centerY + 5; // re initialize the left y coordinate after the identifying data title (add 5 for the lineHeight)
                                doc.setFontSize(10);

                                leftY = drawLeftText("PETIONER'S NAME:", toProperCase(identifyingData.petitionersName), 14, leftY, "helvetica", "normal", 10, 35, 150) // label, value, xLeft, yLeft, font, fontWeight, fontSize, textOffset, underlineLength
                                doc.setFont('helvetica','italic')
                                doc.setFontSize(8);
                                // doc.text(`(per court records)`, 20,leftY)
                                doc.text(`(Last Name)`, 57, leftY)
                                doc.text(`(First Name)`, 107, leftY)
                                doc.text(`(Middle Name)`, 157, leftY)
                                yCoordinate = leftY + 4; // initialize the leftY again after fname mname and lname

                                let pos = drawAutoText (`True Name:`, toProperCase(identifyingData.trueName), 14, yCoordinate, true)
                                pos = drawAutoText (`Source Info:`, toProperCase(identifyingData.sourceOfInfo), pos.x+20, pos.y, true)

                                pos = drawAutoText (`Alias(es):`, toProperCase(identifyingData.alias), 14, pos.y+6, true) // add by 6 every other next line
                                pos = drawAutoText (`Height (meters):`, toProperCase(identifyingData.height), pos.x+20, pos.y, true)
                                pos = drawAutoText (`Weight (kilos):`, toProperCase(identifyingData.weight), pos.x+20, pos.y, true)
                                pos = drawAutoText (`Age:`, identifyingData.age, 14, pos.y+6, true) // add another 6 for next line
                                pos = drawAutoText (`Sex:`, toProperCase(identifyingData.sex), pos.x+20, pos.y, true)
                                pos = drawAutoText (`Citizenship:`, toProperCase(identifyingData.citizenship), pos.x+20, pos.y, true)
                                pos = drawAutoText (`Religion:`, toProperCase(identifyingData.religion), pos.x+20, pos.y, true)

                                pos = drawAutoText (`Identifying Marks:`, toProperCase(identifyingData.identifyingMarks), 14, pos.y+6, true)
                                pos = drawAutoText (`Present Address:`, toProperCase(identifyingData.presentAddress), 14, pos.y+6, true)
                                pos = drawAutoText (`Permanent Address:`, toProperCase(identifyingData.permanentAdress), 14, pos.y+6, true)

                                yCoordinate = pos.y;
                            }
                            drawIdentifyingData();
                            function drawCriminalHistory () {
                                let centerY = yCoordinate + 10;
                                centerY = drawCenterText('II.    CRIMINAL HISTORY', centerY, 'normal', 11);
                                let leftY = centerY + 5;

                                let posLeft = drawAutoText (`A. PRESENT OFFENSE`, "", 14, leftY)
                                let rightY = posLeft.y;
                                posLeft = drawAutoText (`Charged With:`, toProperCase(presentOffense.chargedWith), 20, posLeft.y+6, true, 95, 20)
                                posLeft = drawAutoText (`Convicted of:`, toProperCase(presentOffense.convictedOf), 20, posLeft.y+6, true, 95, 20)

                                yCoordinate = posLeft.y + 6;
                                let pos = drawAutoText (`Sentence:`, toProperCase(presentOffense.sentence), 20, yCoordinate, true, 95, 20)
                                
                                posLeft.y = pos.y;
                                posLeft = drawAutoText (`Judge:`, toProperCase(presentOffense.judge), 20, posLeft.y+6, true, 95, 20)
                                posLeft = drawAutoText (`Defense Counsel:`, toProperCase(presentOffense.defenseCounsel), 20, posLeft.y+6, true, 95, 20)
                                posLeft = drawAutoText (`Offended Party:`, toProperCase(presentOffense.offendedParty), 20, posLeft.y+6, true, 95, 20)

                                
                                // let rightY = centerY + 6;
                                let posRight = drawAutoText (`Date:`, presentOffense.chargedWithDate, 110, rightY + 6, true, 190, 115)
                                posRight = drawAutoText (`Date:`, toProperCase(presentOffense.convictedOfDate), 110, posRight.y+6, true, 190, 115)
                                posRight.y = pos.y;
                                posRight = drawAutoText (`Court:`, toProperCase(presentOffense.court), 110, posRight.y+6, true, 190, 115)
                                posRight = drawAutoText (`Address:`, toProperCase(presentOffense.defenseCounselAddress), 110, posRight.y+6, true, 190, 115)
                                posRight = drawAutoText (`Address:`, toProperCase(presentOffense.offendedPartyAddress), 110, posRight.y+6, true, 190, 115)

                                if (posLeft.y > posRight.y) {
                                    yCoordinate = posLeft.y;
                                } else {
                                    yCoordinate = posRight.y;
                                }

                                var custodyStatus = presentOffense.custody;
                                posLeft = drawAutoText("Custody Status:", "", 20, yCoordinate + 8)
                                let posRadio = {x: posLeft.x, y: posLeft.y}
                                let rorCustodiaPosX = posRadio.x;
                                var addPosX = posRadio.x;
                                if (custodyStatus === "on_bail") {
                                    posRadio = drawRadioButton("On Bail", posLeft.x, posLeft.y, true, false, "", 190, 20);
                                    posRadio = drawRadioButton("On Detention", posRadio.x, posRadio.y, false, false, "", 190, 20);
                                    posRadio = drawRadioButton("Period of Detention", posRadio.x, posRadio.y, false, true, "", 190, 20);
                                    posRadio = drawRadioButton("ROR – Custodian", rorCustodiaPosX, posRadio.y + 6, false, true, "", 190, 20);
                                } else if (custodyStatus === "on_detention") {
                                    posRadio = drawRadioButton("On Bail", posLeft.x, posLeft.y, false, false, "", 190, 20);
                                    posRadio = drawRadioButton("On Detention", posRadio.x, posRadio.y, true, false, "", 190, 20);
                                    posRadio = drawRadioButton("Period of Detention", posRadio.x, posRadio.y, true, true, toProperCase(presentOffense.periodOfDetention), 190, 20);
                                    posRadio = drawRadioButton("ROR – Custodian", rorCustodiaPosX, posRadio.y + 6, false, true, "", 190, 20);
                                } else if (custodyStatus === "ror_custodian") {
                                    posRadio = drawRadioButton("On Bail", posLeft.x, posLeft.y, false, false, "", 190, 20);
                                    posRadio = drawRadioButton("On Detention", posRadio.x, posRadio.y, false, false, "", 190, 20);
                                    posRadio = drawRadioButton("Period of Detention", posRadio.x, posRadio.y, false, true, "", 190, 20);
                                    posRadio = drawRadioButton("ROR – Custodian", rorCustodiaPosX, posRadio.y + 6, true, true, toProperCase(presentOffense.rorCustodian), 190, 20);
                                }
                                posLeft = drawAutoText("Address:", toProperCase(presentOffense.rorCustodianAddress), addPosX + 5, posRadio.y + 6, true, 190, 115)

                                posLeft = drawAutoText("Manner of Commission (Narrative)", toProperCase(presentOffense.mannerofCommision), 20, posLeft.y + 8, true, 190, 115)
                                // Next Line
                                posLeft = drawAutoText("Age at time of commission–Extent of Participation:", "", 20, posLeft.y + 6)
                                let posExtentParticipation = {x: posLeft.x, y:posLeft.y}
                                const options = ["Principal", "Accomplice", "Accessory"];
                                const selected = (presentOffense.extentParticipation || "").toLowerCase();

                                options.forEach(option => {
                                    const isSelected = option.toLowerCase() === selected;
                                    posExtentParticipation = drawRadioButton(
                                        option,
                                        posExtentParticipation.x,
                                        posExtentParticipation.y,
                                        isSelected,      // checkmark
                                        false,           // disabled?
                                        "",
                                        190,
                                        20
                                    );
                                });

                                posLeft.y += 8;
                                posLeft = drawAutoText("I.  Offender's Statement:", "", 25, posLeft.y);
                                posLeft = drawAutoText("", toProperCase(presentOffense.offendersStatement), 30, posLeft.y + 6, true, 180, 25); // for offenders statement
                                posLeft = drawAutoText("II.  Victim's Statement:", "", 25, posLeft.y + 6);
                                posLeft = drawAutoText("", toProperCase(presentOffense.victimsStatement), 30, posLeft.y + 6, true, 180, 25); // for victims statement
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                                posLeft = drawAutoText("", toProperCase(presentOffense.remarks), 30, posLeft.y + 6, true, 180, 25); // for victims statement

                                posLeft = drawAutoText("B.  PRIOR RECORDS", "", 14, posLeft.y + 6);
                                var tablePos = posLeft.y + 6;
                                // Example headers and rows
                                var headers = [
                                    {title: "Agency", dataKey: "agency"},
                                    {title: "Criminal Case No.", dataKey: "cc_no"}, 
                                    {title: "Offense", dataKey: "offense"}, 
                                    {title: "Date Charged", dataKey: "when"}, 
                                    {title: "Decision/Status of the Case", dataKey: "disposition"}, 
                                ];
                                const rows = priorRecordsAndDerogatoryRecord.priorRecord;
                                let posTable = drawAutoTable(headers, rows, 14, tablePos);

                                posLeft.y = doc.autoTable.previous.finalY + 5;
                                // posRight.y = posTable.y;

                                posLeft = drawAutoText("C.  OTHER DEROGATORY INFORMATION ", "", 14, posLeft.y);
                                var tableInfoPos = posLeft.y + 6;
                                // Example headers and rows
                                var headersInfo = [
                                    {title: "Source", dataKey: "source"},
                                    {title: "Particulars", dataKey: "particulars"}, 
                                ];
                                const rowsInfo = priorRecordsAndDerogatoryRecord.recordsInfo;
                                let posInfoTable = drawAutoTable(headersInfo, rowsInfo, 14, tableInfoPos);

                                posLeft.y = doc.autoTable.previous.finalY + 5;
                                // posRight.y = tableInfoPos.y;

                                // if (posLeft.y > posRight.y) {
                                //     yCoordinate = posLeft.y;
                                // } else {
                                //     yCoordinate = posRight.y
                                // }
                                yCoordinate = posLeft.y
                            }
                            drawCriminalHistory();
                            function drawPersonalHistory () {
                                let centerY = yCoordinate + 5;
                                centerY = drawCenterText('III.    PERSONAL AND SOCIAL HISTORY ', centerY, 'normal', 11);
                                let y = centerY + 5;

                                let posLeft = drawAutoText (`A. PETITIONER'S BIRTH DATA `, "", 14, y)
                                posLeft = drawAutoText (`Date of Birth:`, familyBackgroundAndBirthData.birthDate, 20, posLeft.y+6, true)
                                posLeft = drawAutoText (`Place of Birth:`, toProperCase(familyBackgroundAndBirthData.birthPlace), posLeft.x+20, posLeft.y, true)
                                posLeft = drawAutoText (`Birth Order:`, familyBackgroundAndBirthData.birthOrder, posLeft.x+20, posLeft.y, true)

                                posLeft = drawAutoText (`B. FAMILY BACKGROUND`, "", 14, posLeft.y+10);
                                posLeft = drawAutoText (`1. PARENTS:`, "", 20, posLeft.y+6);
                                posLeft = drawAutoText (`Father:`, toProperCase(familyBackgroundAndBirthData.fathersName), 25, posLeft.y+6, true);
                                posLeft = drawAutoText (`Age:`, familyBackgroundAndBirthData.fathersAge, posLeft.x + 20, posLeft.y, true);
                                posLeft = drawAutoText (`Occupation:`, toProperCase(familyBackgroundAndBirthData.fathersOccupation), posLeft.x+10, posLeft.y, true);
                                posLeft = drawAutoText (`Mother:`, toProperCase(familyBackgroundAndBirthData.mothersName), 25, posLeft.y+6, true);
                                posLeft = drawAutoText (`Age:`, familyBackgroundAndBirthData.mothersAge, posLeft.x + 20, posLeft.y, true);
                                posLeft = drawAutoText (`Occupation:`, toProperCase(familyBackgroundAndBirthData.mothersOccupation), posLeft.x+10, posLeft.y, true);

                                posLeft = drawAutoText (`Status of Marriage:`, "", 25, posLeft.y+6);
                                var civilStatusPosX = posLeft.x;
                                var civilStatusPosY = posLeft.y;
                                var statusOfMarraige = familyBackgroundAndBirthData.civilStatus;
                                let posRadio = { x: civilStatusPosX, y: civilStatusPosY };
                                const displayOptions = [
                                    "Married",
                                    "Annulled",
                                    "Separated",
                                    "Legal",
                                    "Estranged",
                                    "Common Law/Lived In",
                                    "Others"
                                ];

                                // Mapping API → UI labels
                                const apiToDisplay = {
                                    married: "Married",
                                    annulled: "Annulled",
                                    separated: "Separated",
                                    legal: "Legal",
                                    estranged: "Estranged",
                                    common_law: "Common Law/Lived In",
                                    others: "Others"
                                };

                                const selectedMain = apiToDisplay[statusOfMarraige] || "";
                                const selectedSub = apiToDisplay[familyBackgroundAndBirthData?.seperationStatus] || "";

                                displayOptions.forEach(option => {

                                    // Reset x and add spacing before "Common Law/Lived In"
                                    if (option === "Common Law/Lived In") {
                                        posRadio = { x: civilStatusPosX, y: posRadio.y + 6 };
                                    }

                                    // Determine if this option is selected
                                    let isChecked = false;
                                    let hasValue = false;

                                    if (option === selectedMain) {
                                        isChecked = true;
                                        hasValue = false;
                                    }

                                    // Sub-selection for "Separated"
                                    if (selectedMain === "Separated" && option === selectedSub) {
                                        isChecked = true;
                                        hasValue = false;
                                    }

                                    // Add text for Others
                                    let otherText = "";
                                    if (option === "Others" && selectedMain === "Others") {
                                        hasValue = true;
                                        otherText = toProperCase(familyBackgroundAndBirthData.otherStatus);
                                    }

                                    posRadio = drawRadioButton(
                                        option,
                                        posRadio.x,
                                        posRadio.y,
                                        isChecked,
                                        hasValue,
                                        otherText,
                                        190
                                    );
                                });
                                
                                posLeft.y = posRadio.y + 10;
                                posLeft = drawAutoText (`2. SOCIO-ECONOMIC BACKGROUND:`, "", 20, posLeft.y);
                                let posSocioStatus = { x:25, y:posLeft.y+6}

                                const familyRelationship = [
                                    { label: "Very Satisfactory", value: "very_satisfactory" },
                                    { label: "Satisfactory", value: "satisfactory" },
                                    { label: "Fair", value: "fair" },
                                    { label: "Poor", value: "poor" }
                                ];

                                const famStatus = drawCheckbox("Family Relationship", familyRelationship, familyBackgroundAndBirthData.familyRelationship, 25, posSocioStatus.y);

                                const majorFamilyProblems = [
                                    { label: "No Apparent Problem", value: "no_apparent_problem" },
                                    { label: "Economic", value: "economic" },
                                    { label: "Mental/Physical Illness", value: "mental_physical_illness" },
                                    { label: "Marital Problem", value: "marital_problem" },
                                    { label: "One-Parent-Family", value: "one_parent_family" },
                                    { label: "Parent-Child Conflict", value: "parent_child_conflict" },
                                    { label: "Sibling Conflict", value: "sibling_conflict" },
                                    { label: "Others", value: "others" }
                                ];

                                const majorFamProbStatus = drawCheckbox("Major Family Problems", majorFamilyProblems, familyBackgroundAndBirthData.majorFamilyProblem, posSocioStatus.x + 50, posSocioStatus.y);

                                const familyReputation = [
                                    { label: "Very Satisfactory", value: "very_satisfactory" },
                                    { label: "Satisfactory", value: "satisfactory" },
                                    { label: "Fair", value: "fair" },
                                    { label: "Poor", value: "poor" }
                                ];

                                const famRepStatus = drawCheckbox("Family Reputation in the Community", familyReputation, familyBackgroundAndBirthData.familyReputationInCommunity, posSocioStatus.x + 110, posSocioStatus.y);

                                posSocioStatus = { x:25, y:majorFamProbStatus.y + 6}

                                const familyEconomicStatus = [
                                    { label: "More than Adequate", value: "more_adequate" },
                                    { label: "Adequate", value: "adequate" },
                                    { label: "Inadequate", value: "inadequate" },
                                    { label: "Below Poverty Line", value: "below_poverty_lines" }
                                ];

                                const famEconomicStatus = drawCheckbox("Family Economic Status", familyEconomicStatus, familyBackgroundAndBirthData.familyEconomicStatus, posSocioStatus.x, posSocioStatus.y);

                                posSocioStatus = { x:25, y:famEconomicStatus.y - topMargin + 4}

                                const physicalHomeConditions = [
                                    { label: "Very Satisfactory", value: "very_satisfactory" },
                                    { label: "Satisfactory", value: "satisfactory" },
                                    { label: "Fair", value: "fair" },
                                    { label: "Poor", value: "poor" }
                                ];
                                
                                const physicalHomeConditionsStatus = drawCheckbox("Physical Home Conditions", physicalHomeConditions, familyBackgroundAndBirthData.homeCondition, posSocioStatus.x + 50, posSocioStatus.y);

                                const stabilityResidence  = [
                                    { label: "Stable", value: "stable" },
                                    { label: "Ocassional Change", value: "occasional_change" },
                                    { label: "Frequent Change", value: "frequent_change" },
                                    { label: "No Stability", value: "no_stability" }
                                ];
                                
                                const stabilityResidenceStatus = drawCheckbox("Stability of Residence", stabilityResidence, familyBackgroundAndBirthData.stabilityOfResidence, posSocioStatus.x + 110, posSocioStatus.y);

                                posLeft = {x: 14, y:stabilityResidenceStatus.y}
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 14, posLeft.y + 6);
                                posLeft = drawAutoText("", familyBackgroundAndBirthData.remarks, 30, posLeft.y + 6, true, 180, 25);

                                posLeft = drawAutoText ("C. PETITIONER'S PRESENT SITUATION", "", 14, posLeft.y + 6);
                                posLeft = drawAutoText ("Civil Status:", "", 25, posLeft.y + 6,);
                                // var civilStatusPosRadioX = posLeft.x;
                                // var civilStatusPosRadioY = posLeft.y;
                                let posRadioCivilStatus = {x:posLeft.x , y:posLeft.y}
                                const optionsPresentSituationCivilStatus = [
                                    "Single",
                                    "Married",
                                    "Widow/Widower",
                                    "With Common-Law/Lived-In Partner"
                                ];

                                // Map API → Display text
                                const apiMapPresentSituationCivilStatus = {
                                    single: "Single",
                                    married: "Married",
                                    "widow/widower": "Widow/Widower",
                                    widow: "Widow/Widower",       // optional safety
                                    common_law: "With Common-Law/Lived-In Partner"
                                };

                                // Get selected display value
                                const selected = apiMapPresentSituationCivilStatus[presentSituation.civilStatus] || "";

                                optionsPresentSituationCivilStatus.forEach(option => {
                                    const isChecked = option === selected;

                                    posRadioCivilStatus = drawRadioButton(
                                        option,
                                        posRadioCivilStatus.x,
                                        posRadioCivilStatus.y,
                                        isChecked,
                                        false,
                                        "",
                                        190,
                                        25
                                    );
                                });

                                posLeft.y = posRadioCivilStatus.y;
                                posLeft = drawAutoText (`Status of Marriage:`, "", 25, posLeft.y+6);

                                let posMarriageStatus = {x:posLeft.x , y:posLeft.y}
                                const optionsMarriageStatus = [
                                    "Annulled",
                                    "Seperated",
                                    "Legal",
                                    "Estranged",
                                    "Others"
                                ];

                                // Map API → Display text
                                const apiMapOptionsMarriageStatus = {
                                    annulled: "Annulled",
                                    seperated: "Seperated",
                                    legal: "Legal",
                                    estranged: "Estranged",
                                    others: "Others"
                                };

                                // Get selected display value
                                const selectedMarriageStatus = apiMapOptionsMarriageStatus[presentSituation.statusOfMarriage] || "";

                                optionsMarriageStatus.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedMarriageStatus;
                                    let hasValue = false;

                                    // Add text for Others
                                    let otherText = "";
                                    if (option === "Others" && selectedMarriageStatus === "Others") {
                                        hasValue = true;
                                        otherText = toProperCase(presentSituation.otherStatusOfMarriage);
                                    }

                                    posMarriageStatus = drawRadioButton(
                                        option,
                                        posMarriageStatus.x,
                                        posMarriageStatus.y,
                                        isChecked,
                                        hasValue,
                                        otherText,     // ✅ FIXED — pass the actual text
                                        190,
                                        25
                                    );
                                });
                                posLeft = {x:posMarriageStatus.x, y:posMarriageStatus.y+6}
                                posLeft = drawAutoText("REMARKS:", toProperCase(presentSituation.remarksCivilStatus), 25, posLeft.y+6, true, 190, 25);

                                posLeft = drawAutoText("1. Domestic Partner/ Spouse:", toProperCase(presentSituation.spouseName), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Age:", presentSituation.spouseAge, 25, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Sex:", "", posLeft.x+10, posLeft.y, true, 180, 25);
                                let posSpouseGender = {x: posLeft.x, y:posLeft.y}
                                var spouseSex = presentSituation.spouseSex
                                if (spouseSex === "male") {
                                    posSpouseGender = drawRadioButton("Male", posSpouseGender.x, posSpouseGender.y, true);
                                    posSpouseGender = drawRadioButton("Female", posSpouseGender.x, posSpouseGender.y, false);
                                } else if (spouseSex === "female") {
                                    posSpouseGender = drawRadioButton("Male", posSpouseGender.x, posSpouseGender.y, false);
                                    posSpouseGender = drawRadioButton("Female", posSpouseGender.x, posSpouseGender.y, true);
                                }
                                posLeft = {x:posSpouseGender.x, y:posSpouseGender.y}
                                posLeft = drawAutoText("Occupation:", toProperCase(presentSituation.spouseOccupation), posLeft.x, posLeft.y, true, 180, 25);
                                posLeft = drawAutoText("Home Address:", toProperCase(presentSituation.spouseHomeAddress), 25, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Work Address:", toProperCase(presentSituation.spouseWorkAddress), 25, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("2. Children:", "", 20, posLeft.y+8);
                                posLeft = drawAutoText("Total No. of Children:", presentSituation.totalNoOfchildren, posLeft.x, posLeft.y, true, 190, 25);

                                var childrenTablePos = {x: 30, y:posLeft.y+6};
                                // Example headers and rows
                                var headersChildren = [
                                    {title: "Age", dataKey: "age"},
                                    {title: "In/Out of School", dataKey: "school"}, 
                                    {title: "Educational Attainment", dataKey: "education"}, 
                                    {title: "Legitimate", dataKey: "legitimate"}, 
                                    {title: "Illegitimate", dataKey: "illegitimate"}, 
                                ];
                                const rowsChildren = presentSituation.children;
                                childrenTablePos = drawAutoTable(headersChildren, rowsChildren, childrenTablePos.x, childrenTablePos.y);

                                posLeft = {x:25, y:childrenTablePos.y}
                                posLeft = drawAutoText ("Relationship with Children:", "", posLeft.x, posLeft.y);
                                let relChildrenPos = {x:posLeft.x, y:posLeft.y}

                                const optionsRelChildren = [
                                    "Very Satisfactory",
                                    "Satisfactory",
                                    "Fair",
                                    "Poor",
                                ];

                                // Map API → Display text
                                const apiMapOptionsRelChildren = {
                                    very_satisfactory: "Very Satisfactory",
                                    satisfactory: "Satisfactory",
                                    fair: "Fair",
                                    poor: "Poor",
                                };

                                // Get selected display value
                                const selectedRelChildren = apiMapOptionsRelChildren[presentSituation.childrenRelationship] || "";

                                optionsRelChildren.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedRelChildren;
                                    let hasValue = false;

                                    relChildrenPos = drawRadioButton(
                                        option,
                                        relChildrenPos.x,
                                        relChildrenPos.y,
                                        isChecked,
                                        hasValue,
                                        "",     // ✅ FIXED — pass the actual text
                                        190,
                                        25
                                    );
                                });

                                posLeft = {x:25, y:relChildrenPos.y}
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                                posLeft = drawAutoText("", toProperCase(presentSituation.remarksInChildren), 25, posLeft.y + 6, true, 180, 25);

                                posLeft = drawAutoText("3. Residence:", "", 20, posLeft.y+6);
                                let posRadioDwelling = { x:25, y:posLeft.y}

                                posLeft = drawAutoText("", "Dwelling:", 20, posLeft.y+5, true);

                                const optionsDwelling = [
                                    "Owned: Yrs of Stay",
                                    "Rented: Yrs of Stay",
                                    "Informal Settler",
                                    "Others",
                                ];

                                // Map API → Display text
                                const apiMapDwelling = {
                                    owned: "Owned: Yrs of Stay",
                                    rented: "Rented: Yrs of Stay",
                                    informal_settler: "Informal Settler",
                                    others: "Others",
                                };

                                // Get selected display value
                                const selectedDwelling = apiMapDwelling[presentSituation.dwelling] || "";

                                optionsDwelling.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedDwelling;
                                    let hasValue = false;

                                    // Add text for Owned
                                    let addtlText = "";
                                    if (option === "Owned: Yrs of Stay" && selectedDwelling === "Owned: Yrs of Stay") {
                                        hasValue = true;
                                        addtlText = toProperCase(presentSituation.yearsStayedOwned);
                                    }
                                    // Add text for Rented
                                    if (option === "Rented: Yrs of Stay" && selectedDwelling === "Rented: Yrs of Stay") {
                                        hasValue = true;
                                        addtlText = toProperCase(presentSituation.yearsStayedRented);
                                    }

                                    posRadioDwelling = drawRadioButton(
                                        option,
                                        25,
                                        posRadioDwelling.y + 6,
                                        isChecked,
                                        hasValue,
                                        addtlText,     // ✅ FIXED — pass the actual text
                                        70,
                                        25
                                    );
                                });

                                posLeft = drawAutoText("", "Stability of Residence:", 75, posLeft.y, true);
                                let posStability = { x:80, y:posLeft.y}
                                const optionsStability = [
                                    "Stable",
                                    "Occasional Change",
                                    "Frequent Change",
                                    "No Stability",
                                ];

                                // Map API → Display text
                                const apiMapOptionsStability = {
                                    stable: "Stable",
                                    occasional_change: "Occasional Change",
                                    frequent_change: "Frequent Change",
                                    no_stability: "No Stability",
                                };

                                // Get selected display value
                                const selectedStability = apiMapOptionsStability[presentSituation.residenceStability] || "";

                                optionsStability.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedStability;
                                    let hasValue = false;

                                    posStability = drawRadioButton(
                                        option,
                                        80,
                                        posStability.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",     // ✅ FIXED — pass the actual text
                                        130,
                                        25
                                    );
                                });

                                posLeft = drawAutoText("", "Physical Home Conditions:", 135, posLeft.y, true);
                                let posPhysicalHomeCond = { x:140, y:posLeft.y}

                                const optionsPhysicalHomeCond = [
                                    "Very Satisfactory",
                                    "Satisfactory",
                                    "Fair",
                                    "Poor",
                                ];

                                // Map API → Display text
                                const apiMapOptionsPhysicalHomeCond = {
                                    very_satisfactory: "Very Satisfactory",
                                    satisfactory: "Satisfactory",
                                    fair: "Fair",
                                    poor: "Poor",
                                };

                                // Get selected display value
                                const selectedPhysicalHomeCond = apiMapOptionsPhysicalHomeCond[presentSituation.physicalHomeCondition] || "";

                                optionsPhysicalHomeCond.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedPhysicalHomeCond;
                                    let hasValue = false;

                                    posPhysicalHomeCond = drawRadioButton(
                                        option,
                                        140,
                                        posPhysicalHomeCond.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",     // ✅ FIXED — pass the actual text
                                        190,
                                        25
                                    );
                                });

                                posLeft = {x:20, y:posPhysicalHomeCond.y}
                                posLeft = drawAutoText("4. Economic Condition:", "", 20, posLeft.y + 6);
                                posLeft = drawAutoText("", "Family Economic Status:", 20, posLeft.y + 6, true);
                                let posFamEconomicStatus = { x:25, y:posLeft.y}

                                const optionsFamEconomicStatus = [
                                    "More than Adequate",
                                    "Adequate",
                                    "Inadequate",
                                    "Below Poverty Level",
                                ];

                                // Map API → Display text
                                const apiMapOptionsFamEconomicStatus = {
                                    more_adequate: "More than Adequate",
                                    adequate: "Adequate",
                                    inadequate: "Inadequate",
                                    below_poverty_lines: "Below Poverty Level",
                                };

                                // Get selected display value
                                const selectedFamEconomicStatus = apiMapOptionsFamEconomicStatus[presentSituation.familyEconomicStatus] || "";

                                optionsFamEconomicStatus.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedFamEconomicStatus;
                                    let hasValue = false;

                                    posFamEconomicStatus = drawRadioButton(
                                        option,
                                        25,
                                        posFamEconomicStatus.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",     // ✅ FIXED — pass the actual text
                                        70,
                                        25
                                    );
                                });

                                posLeft = drawAutoText("", "Family Breadwinner:", 75, posLeft.y, true);
                                let posFamilyBreadwinner = { x:80, y:posLeft.y}
                                const optionsFamilyBreadwinner = [
                                    "Petitioner",
                                    "Spouse",
                                    "Petitioner and Spouse",
                                    "Others",
                                ];

                                // Map API → Display text
                                const apiMapOptionsFamilyBreadwinner = {
                                    petitioner: "Petitioner",
                                    spouse: "Spouse",
                                    petiioner_and_spouse: "Petitioner and Spouse",
                                    other: "Others",
                                };

                                // Get selected display value
                                const selectedFamilyBreadwinner = apiMapOptionsFamilyBreadwinner[presentSituation.familyBreadwinner] || "";

                                optionsFamilyBreadwinner.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedFamilyBreadwinner;
                                    let hasValue = false;

                                    posFamilyBreadwinner = drawRadioButton(
                                        option,
                                        80,
                                        posFamilyBreadwinner.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",     // ✅ FIXED — pass the actual text
                                        135,
                                        25
                                    );
                                });

                                posLeft = drawAutoText("", "Petitioner's Role in the Family:", 135, posLeft.y, true);
                                let posPetionerRole = { x:140, y:posLeft.y}
                                const displayOptionsPetionerRole = [
                                    "Income Contributor",
                                    "Total",
                                    "Partial",
                                    "Primary Care-giver",
                                    "Dependent",
                                ];

                                // Mapping API → UI labels
                                const apiToDisplayPetionerRole = {
                                    income_contributor: "Income Contributor",
                                    total: "Total",
                                    partial: "Partial",
                                    primary_care_giver: "Primary Care-giver",
                                    dependent: "Dependent"
                                };

                                const selectedMainPetionerRole = apiToDisplayPetionerRole[presentSituation.roleInTheFamily] || "";
                                const selectedSubPetionerRole = apiToDisplayPetionerRole[presentSituation?.incomeContributor] || "";
                                displayOptionsPetionerRole.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = false;
                                    let hasValue = false;
                                    let x = 140;

                                    if (option === selectedMainPetionerRole) {
                                        isChecked = true;
                                        hasValue = false;
                                        x = 140
                                    }

                                    // Sub-selection for "Separated"
                                    if (selectedMainPetionerRole === "Income Contributor" && option === selectedSubPetionerRole) {
                                        isChecked = true;
                                        hasValue = false;
                                    }

                                    if (option === "Total" || option === "Partial") {
                                        x = 145
                                    }

                                    posPetionerRole = drawRadioButton(
                                        option,
                                        x,
                                        posPetionerRole.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190,
                                        140
                                    );
                                });

                                posLeft = {x:20, y:posPetionerRole.y + 6}
                                posLeft = drawAutoText("5. Major Problems in the Family:", "", 20, posLeft.y + 6);
                                let posFamilyProblemCol1 = { x:25, y:posLeft.y}
                                let posFamilyProblemCol2 = { x:80, y:posLeft.y}
                                let posFamilyProblemCol3 = { x:140, y:posLeft.y}

                                const optionsFamilyProblem = [
                                    "No Apparent Problem",
                                    "Economic",
                                    "Husband-Wife Conflict",
                                    "Mental Illness",
                                    "Physical Illness",
                                    "Parent-Child Conflict",
                                    "Sibling Conflict",
                                    "Others"
                                ];

                                // Map API → Display text
                                const apiMapOptionsFamilyProblem = {
                                    no_apparent_problem : "No Apparent Problem",
                                    economic : "Economic",
                                    mental_physical_illness : "Husband-Wife Conflict",
                                    marital_problem : "Mental Illness",
                                    one_parent_family : "Physical Illness",
                                    parent_child_conflict : "Parent-Child Conflict",
                                    sibling_conflict : "Sibling Conflict",
                                    others : "Others"
                                };

                                // Get selected display value
                                const selectedFamilyProblem = apiMapOptionsFamilyProblem[presentSituation.majorFamilyProblem] || "";

                                optionsFamilyProblem.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedFamilyProblem;
                                    let hasValue = false;
                                    let x;
                                    let yPos1 = posLeft.y;
                                    let yPos2 = posLeft.y;
                                    let yPos3 = posLeft.y;

                                    if (option === "No Apparent Problem" || option === "Economic" || option === "Husband-Wife Conflict") {
                                        x = 25
                                        posFamilyProblemCol1 = drawRadioButton(
                                            option,
                                            x,
                                            posFamilyProblemCol1.y + 6,
                                            isChecked,
                                            hasValue,
                                        );
                                    }
                                    if (option === "Mental Illness" || option === "Physical Illness" || option === "Parent-Child Conflict") {
                                        x = 80
                                        posFamilyProblemCol2 = drawRadioButton(
                                            option,
                                            x,
                                            posFamilyProblemCol2.y + 6,
                                            isChecked,
                                            hasValue,
                                        );
                                    }
                                    if (option === "Sibling Conflict" || option === "Others") {
                                        x = 130
                                        posFamilyProblemCol3 = drawRadioButton(
                                            option,
                                            x,
                                            posFamilyProblemCol3.y + 6,
                                            isChecked,
                                            hasValue,
                                        );
                                    }
                                });

                                posLeft = {x:25, y:posFamilyProblemCol1.y}
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 14, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(presentSituation.remarksInPetitionersSituation), 14, posLeft.y + 6, true, 180, 14);

                                posLeft = drawAutoText ("D. EDUCATION", "", 14, posLeft.y + 6);
                                posLeft = drawAutoText("Educational Attainment:", toProperCase(educationAndJobHistory.educationAttainment), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Over-all Conduct in School:", "", 20, posLeft.y+6);

                                let posConductSchool = {x: posLeft.x, y:posLeft.y}
                                const optionsConductSchool = [
                                    "Very Satisfactory",
                                    "Satisfactory",
                                    "Fair",
                                    "Poor",
                                ];

                                // Map API → Display text
                                const apiMapOptionsConductSchool = {
                                    very_satisfactory: "Very Satisfactory",
                                    satisfactory: "Satisfactory",
                                    fair: "Fair",
                                    poor: "Poor",
                                };

                                // Get selected display value
                                const selectedConductSchool = apiMapOptionsConductSchool[educationAndJobHistory.overAllConductInSchool] || "";

                                optionsConductSchool.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedConductSchool;
                                    let hasValue = false;

                                    posConductSchool = drawRadioButton(
                                        option,
                                        posConductSchool.x,
                                        posConductSchool.y,
                                        isChecked
                                    );
                                });

                                posLeft = {x:14, y:posConductSchool.y+4}
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                                posLeft = drawAutoText("", toProperCase(educationAndJobHistory.educationalRemarks), 25, posLeft.y + 6, true, 180, 25);

                                posLeft = drawAutoText ("E. JOB HISTORY", "", 14, posLeft.y + 6);
                                posLeft = drawAutoText("1. Petitioner's Previous Occupation:", toProperCase(educationAndJobHistory.previousOccupation), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("2. Petitioner's Present Occupation:", toProperCase(educationAndJobHistory.presentOccupation), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Employers Work and Addres:", toProperCase(educationAndJobHistory.employerAddress), 25, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("3. Present Work Status:", "", 20, posLeft.y+6);

                                let posWorkStatusRow1 = {x: posLeft.x, y: posLeft.y}
                                let posWorkStatusRow2 = {x: posLeft.x, y:posWorkStatusRow1.y+6}

                                const optionsWorkStatus = [
                                    "Self-employed",
                                    "Regular/Permanent",
                                    "Temporary",
                                    "Contractual",
                                    "Casual",
                                    "Intermittent",
                                    "Seasonal",
                                ];

                                // Map API → Display text
                                const apiMapOptionsWorkStatus = {
                                    self_employed : "Self-employed",
                                    regular_permanent : "Regular/Permanent",
                                    temporary : "Temporary",
                                    contractual : "Contractual",
                                    casual : "Casual",
                                    intermittent : "Intermittent",
                                    seasonal : "Seasonal",
                                };

                                // Get selected display value
                                const selectedWorkStatus = apiMapOptionsWorkStatus[educationAndJobHistory.workStatus] || "";

                                optionsWorkStatus.forEach(option => {

                                    // Determine if this option is selected
                                    let isChecked = option === selectedWorkStatus;
                                    let hasValue = false;

                                    if (option === "Self-employed" || option === "Regular/Permanent" || option === "Temporary") {
                                        posWorkStatusRow1 = drawRadioButton(
                                            option,
                                            posWorkStatusRow1.x,
                                            posWorkStatusRow1.y,
                                            isChecked
                                        );
                                    }
                                    if (option === "Contractual" || option === "Casual" || option === "Intermittent" || option === "Seasonal") {
                                        posWorkStatusRow2 = drawRadioButton(
                                            option,
                                            posWorkStatusRow2.x,
                                            posWorkStatusRow2.y,
                                            isChecked
                                        );
                                    }
                                });

                                posLeft = {x:20, y:posWorkStatusRow2.y}
                                posLeft = drawAutoText("Special Skills:", toProperCase(educationAndJobHistory.specialSkills), 25, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 20, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(educationAndJobHistory.jobRemarks), 20, posLeft.y + 6, true, 180, 20);

                                posLeft = drawAutoText ("F. MEDICAL HISTORY", "", 14, posLeft.y + 8);
                                posLeft = drawAutoText("Past Medical History:", toProperCase(medicalHistory.pastMedicalHistory), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Present Illness:", toProperCase(medicalHistory.presentIllness), 20, posLeft.y+6, true, 180, 25);
                                posLeft = drawAutoText("Present Medication:", toProperCase(medicalHistory.presentMedication), 20, posLeft.y+6, true, 180, 25);

                                posLeft = drawAutoText("Drug/Alcohol Use:", "", 20, posLeft.y+6);

                                let posAlcoholUse = {x: posLeft.x, y:posLeft.y}
                                if (medicalHistory.drugOrAlcoholUse === "yes") {
                                    posAlcoholUse = drawRadioButton("No", posAlcoholUse.x, posAlcoholUse.y, false);
                                    posAlcoholUse = drawRadioButton("Yes Extent Use:", posAlcoholUse.x, posAlcoholUse.y, true);
                                } else if (medicalHistory.drugOrAlcoholUse === "no") {
                                    posAlcoholUse = drawRadioButton("No", posAlcoholUse.x, posAlcoholUse.y, true);
                                    posAlcoholUse = drawRadioButton("Yes Extent Use:", posAlcoholUse.x, posAlcoholUse.y, false);
                                }

                                posLeft = {x:20, y:posAlcoholUse.y}
                                posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 20, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(medicalHistory.remarksMedical), 20, posLeft.y + 6, true, 180, 20);

                                posLeft = drawAutoText ("G. PETITIONER'S TRAITS/CHARACTERISTICS:", "", 14, posLeft.y + 8);
                                posLeft = drawAutoText("Positive:", "", 20, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(traitsAndCommunityBackground.positiveTraits), 20, posLeft.y + 6, true, 180, 20);
                                posLeft = drawAutoText("Negative:", "", 20, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(traitsAndCommunityBackground.negativeTraits), 20, posLeft.y + 6, true, 180, 20);
                                posLeft = drawAutoText("Overall Impression of the Client:", "", 20, posLeft.y + 7);
                                posLeft = drawAutoText("", toProperCase(traitsAndCommunityBackground.overAllImpression), 20, posLeft.y + 6, true, 180, 20);

                                posLeft = drawAutoText ("H. PETITIONER'S BACKGROUND IN THE COMMUNITY AND COLLATERAL INFORMATION:", "", 14, posLeft.y + 8);
                                posLeft = drawAutoText("", toProperCase(traitsAndCommunityBackground.remarks), 20, posLeft.y + 6, true, 180, 20);

                                var petitionerBackgroundTablePos = {x: 30, y:posLeft.y + 6};
                                // Example headers and rows
                                var petitionerBackgroundTableHeaders = [
                                    {title: "Collateral Source of Information", dataKey: "collateralSourceOfInformation"},
                                    {title: "Relationship to the Client", dataKey: "relationshipToClient"}, 
                                    {title: "Collateral Information Gathered", dataKey: "collateralInforamtionGathered"}, 
                                ];
                                var petitionerBackgroundTableRows = [
                                    {   
                                        "collateralSourceOfInformation": traitsAndCommunityBackground.collateralSourceOfInformation, 
                                        "relationshipToClient": traitsAndCommunityBackground.relationshipToClient, 
                                        "collateralInforamtionGathered": traitsAndCommunityBackground.collateralInforamtionGathered
                                    },
                                ]
                                // const petitionerBackgroundTableRows = traitsAndCommunityBackground;
                                petitionerBackgroundTablePos = drawAutoTable(petitionerBackgroundTableHeaders, petitionerBackgroundTableRows, petitionerBackgroundTablePos.x, petitionerBackgroundTablePos.y);

                                yCoordinate = petitionerBackgroundTablePos.y
                            }
                            drawPersonalHistory();
                            function drawAnalysis() {
                                let centerY = yCoordinate + 6;
                                centerY = drawCenterText('IV.    ANALYSIS AND EVALUATION', centerY, 'normal', 11);
                                let posLeft = {x: 25, y:centerY}
                                posLeft = drawAutoText("", analysisAndProjectedThrust.analysisAndEvaluation, 20, posLeft.y + 6, false, 180, 20);

                                yCoordinate = posLeft.y;
                            }
                            drawAnalysis();
                            function drawProjectedThrusts() {
                                let centerY = yCoordinate + 6;
                                centerY = drawCenterText('V.    PROJECTED THRUSTS OF REHABILITATION', centerY, 'normal', 11);
                                let posLeft = {x: 25, y:centerY}
                                posLeft = drawAutoText("", analysisAndProjectedThrust.projectedThrustsOfRehabilitation, 20, posLeft.y + 6, false, 180, 20);
                                yCoordinate = posLeft.y;
                            }
                            drawProjectedThrusts();
                            function drawRecommendation() {
                                let fullName = petitionersName;
                                let centerY = yCoordinate + 6;
                                centerY = drawCenterText('RECOMMENDATION', centerY, 'normal', 11);
                                let posLeft = {x: 25, y:centerY}
                                posLeft = drawAutoText("", `WHEREFORE, in view of the foregoing, pending the result/s of the NBI/CMRD/Others (specify)/Courtesy Investigation Results from ______________________, it is respectfully recommended to the Honorable Court that the petition for probation of ${fullName.toUpperCase()} be ____________________, subject to the following conditions:`, 20, posLeft.y + 6, false, 190, 14);
                                posLeft = drawAutoText("", `City/Municipality, Province, Philippines, Date.`, 20, posLeft.y + 6, false, 190, 14);
                                // var recommendationList = recommendation.recommendations;
                                // posLeft.y = posLeft.y + 4;
                                // console.log(recommendationList)

                                // for (var i = 0; i < recommendationList.length; i++){
                                //     var row = [recommendationList[i].recs];
                                    
                                //     for (var k = 0; k < row.length; k++){
                                //         var rowValue = row[k];
                                //         posLeft = drawAutoText("", `${i + 1}.)   ${rowValue}`, 20, posLeft.y + 6, false, 180, 20);
                                //     }
                                // }
                                posLeft = drawAutoText("", `In the event that petitioner fails to observe the preceding conditions and/or has committed any material misrepresentation in his/her application for probation, his/her probation may be revoked by the Court or the conditions thereof modified`, 20, posLeft.y + 6, false, 190, 14);
                                posLeft = drawAutoText("", `City/Municipality, Province, Philippines, Date.`, 20, posLeft.y + 6, false, 190, 14);
                            }
                            drawRecommendation();

                            
                            // Instead of saving, generate a Blob for preview
                            const pdfBlob = doc.output('blob');
                            const PSIR = URL.createObjectURL(pdfBlob);

                            // Show modal and load PDF
                            const modal = document.getElementById("pdfPreviewModal");
                            const iframe = document.getElementById("pdfIframe");
                            iframe.src = PSIR;
                            modal.style.display = "flex"; // show centered

                            // Close modal
                            document.getElementById("closePreview").addEventListener("click", function() {
                                document.getElementById("pdfPreviewModal").style.display = "none";
                            });
                        }   

                    })
                }
            })
        }); 
            
        $(document).off("click", ".btn_pdfWorksheet").on("click", ".btn_pdfWorksheet", function(e) {
            e.preventDefault();
            __executeExternalGet('8000/worksheet/getPetitioner/worksheet/'+client_id).done(function (result) {
                if (result.status != "ERROR") {
                    var worksheetData = JSON.parse(result.response.jsonData)
                    // Break too-long tokens into smaller segments that fit maxPxWidth
                    function breakLongToken(token, maxPxWidth) {
                        if (doc.getTextWidth(token) <= maxPxWidth) return token;
                        let out = "";
                        let seg = "";
                        for (let i = 0; i < token.length; i++) {
                            seg += token[i];
                            if (doc.getTextWidth(seg) > maxPxWidth) {
                                // push previous segment (without last char) and start new
                                out += seg.slice(0, -1) + " ";
                                seg = token[i];
                            }
                        }
                        if (seg) out += seg;
                        return out;
                    }
                    // Main function: label, value, startX, startY, underline, columnWidth, orgX
                    function drawAutoText(label, value, startX, startY, underline = false, columnWidth = 190, orgX = null) {
                        const lineHeight = 6;
                        const topMargin = 20;
                        const pageBottom = doc.internal.pageSize.height - 20;
                        const labelText = String(label ?? "");
                        const rawValue = (value === undefined || value === null || String(value).trim() === "") ? "" : String(value);

                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);

                        // ---------- PAGE BREAK HELPER ----------
                        function ensurePage(y) {
                            if (y > pageBottom) {
                                doc.addPage();
                                // if (typeof drawHeader === "function") drawHeader();
                                return topMargin;
                            }
                            return y;
                        }

                        // compute positions
                        const labelWidth = doc.getTextWidth(labelText) + 2;
                        const valueStartX = startX + labelWidth;
                        const continuationX = (orgX === null || orgX === undefined) ? valueStartX : orgX;

                        const firstLineWidthPx = columnWidth - labelWidth;
                        const nextLineWidthPx = columnWidth;

                        // 1) Build first line (preserve spaces)
                        const tokens = rawValue.split(/(\s+)/);
                        let firstLineTokens = [];
                        let consumedIndex = 0;
                        let current = "";

                        for (let i = 0; i < tokens.length; i++) {
                            const token = tokens[i];
                            const test = current + token;
                            const testForWidth = test.replace(/^\s+/, "");

                            if (doc.getTextWidth(testForWidth) <= firstLineWidthPx || current === "") {
                                current = test;
                                firstLineTokens.push(token);
                                consumedIndex = i + 1;
                            } else {
                                break;
                            }
                        }

                        const firstLineRaw = firstLineTokens.join("").replace(/^\s+/, "");
                        const firstLine = firstLineRaw.length ? firstLineRaw : "";

                        // 2) Remaining text
                        let remainingText = tokens.slice(consumedIndex).join("").replace(/^\s+/, "");

                        // 3) Break very long tokens
                        const remTokensPreserveSpaces = remainingText.split(/(\s+)/);
                        for (let i = 0; i < remTokensPreserveSpaces.length; i++) {
                            const t = remTokensPreserveSpaces[i];
                            if (t.trim() === "") continue;
                            if (doc.getTextWidth(t) > nextLineWidthPx) {
                                remTokensPreserveSpaces[i] = breakLongToken(t, nextLineWidthPx);
                            }
                        }
                        const processedRemaining = remTokensPreserveSpaces.join("");

                        // 4) split remaining lines
                        let otherLines = [];
                        if (processedRemaining && processedRemaining.trim().length) {
                            otherLines = doc.splitTextToSize(processedRemaining, nextLineWidthPx);
                        }

                        const lines = (firstLine ? [firstLine] : []).concat(otherLines);

                        // ---------- DRAWING ----------
                        let y = startY;

                        if (lines.length === 0) {
                            y = ensurePage(y);
                            doc.text(labelText, startX, y);

                            if (underline) {
                                doc.line(valueStartX, y + 1, valueStartX + doc.getTextWidth("N/A"), y + 1);
                            }
                            return { x: valueStartX + doc.getTextWidth("N/A") + 3, y };
                        }

                        // First visual line (WITH label)
                        y = ensurePage(y);
                        doc.text(labelText, startX, y);
                        doc.text(lines[0], valueStartX, y);

                        if (underline) {
                            const w = doc.getTextWidth(lines[0]);
                            doc.line(valueStartX, y + 1, valueStartX + w, y + 1);
                        }

                        // Remaining lines
                        for (let i = 1; i < lines.length; i++) {
                            y += lineHeight;
                            y = ensurePage(y);

                            doc.text(lines[i], continuationX, y);

                            if (underline) {
                                const w = doc.getTextWidth(lines[i]);
                                doc.line(continuationX, y + 1, continuationX + w, y + 1);
                            }
                        }

                        // return end position
                        const last = lines[lines.length - 1];
                        const lastWidth = doc.getTextWidth(last);
                        const lastX = ((lines.length === 1) ? valueStartX : continuationX) + lastWidth + 4;

                        return { x: lastX, y };
                    }
                    // for textWrapping of the texts position at the center
                    function drawCenterText(text, y, fontWeight = 'normal', fontSize = 12, maxWidth = 100) {
                        doc.setFontSize(fontSize);
                        doc.setFont('helvetica', fontWeight);

                        const pageWidth = doc.internal.pageSize.width;
                        const wrappedText = doc.splitTextToSize(text, maxWidth);
                        const lineHeight = 6;

                        wrappedText.forEach(line => {
                            // Check if we’re near the bottom of the page
                            if (y + lineHeight > 250) {
                                doc.addPage();
                                drawHeader();
                                y = topMargin + 5; // reset top margin for new page
                                doc.setFontSize(fontSize);
                                doc.setFont('helvetica', fontWeight);
                            }

                            const textWidth = doc.getTextWidth(line);
                            const x = (pageWidth - textWidth) / 2; // horizontally center
                            doc.text(line, x, y);
                            y += lineHeight;
                        });

                        return y;
                    }
                    // 🟦 Utility function to draw radio button and label
                    function drawRadioButton(label, startX = 10, startY = 10, checked = false, hasValue = false, value = "", maxWidth = 190, orgX = 14) {
                        const radius = 1.7;           // circle size
                        const labelOffset = 1;      // space between circle and label
                        const spacing = 3;         // space after element
                        const lineLength = 40;      // underline length
                        const lineOffset = 2;       // small offset under text
                        const lineHeight = 6;

                        const pageHeight = doc.internal.pageSize.height - 20;

                        let x = startX;
                        let y = startY;

                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(10);

                        // --- Compute total width of this element ---
                        let elementWidth = radius * 2 + labelOffset + doc.getTextWidth(label);
                        if (hasValue) elementWidth += lineLength + spacing;

                        // --- If it exceeds page width, wrap to next line ---
                        if (x + elementWidth > maxWidth) {
                            x = orgX;
                            y += lineHeight;

                            // Handle vertical overflow (new page)
                            if (y + lineHeight > pageHeight - 10) {
                                doc.addPage();
                                y = 10;
                            }
                        }

                        // --- Draw the radio button circle ---
                        doc.circle(x, y - 1.5, radius, "S");

                        if (checked) {
                            doc.circle(x, y - 1.5, radius / 2, "F");
                        }

                        // --- Draw the label ---
                        doc.text(label, x + radius + labelOffset, y);

                        // --- Compute new X after label ---
                        let newX = x + radius + labelOffset + doc.getTextWidth(label) + 4;

                        // --- Draw underline/value if required ---
                        if (hasValue) {
                            const underlineXStart = newX;
                            const underlineXEnd = maxWidth;

                            if (value) {
                                doc.text(value, underlineXStart, y);
                                const valueWidth = doc.getTextWidth(value);
                                doc.line(underlineXStart, y + lineOffset, underlineXEnd, y + lineOffset);
                            } else {
                                doc.line(underlineXStart, y + lineOffset, underlineXEnd, y + lineOffset);
                            }

                            newX = underlineXEnd + spacing;
                        } else {
                            newX += spacing;
                        }

                        return { x: newX, y };
                    }
                    // utility for drawing tables// utility for drawing tables with auto page break
                    function drawAutoTable(headers = [], data = [], x, y, didDrawPageCallback = null) {
                        const pageHeight = doc.internal.pageSize.height;
                        const topMargin = 20;
                        const bottomMargin = 20;
                        const pageBottom = pageHeight - bottomMargin;

                        doc.autoTable(headers, data, {
                            startY: y,
                            theme: 'plain',

                            margin: {
                                top: topMargin,
                                bottom: bottomMargin,
                                left: x,
                                right: 20
                            },

                            pageBreak: 'auto',   // ✅ allow automatic page breaking
                            rowPageBreak: 'auto',

                            styles: {
                                lineWidth: 0.1,
                                lineColor: [0, 0, 0],
                                overflow: 'linebreak',
                                cellPadding: 2
                            },

                            headStyles: {
                                lineWidth: 0.2,
                                lineColor: [0, 0, 0],
                                fontStyle: 'bold'
                            },

                            bodyStyles: {
                                lineWidth: 0.1,
                                lineColor: [0, 0, 0]
                            },

                            columnStyles: {
                                4: { cellWidth: 'auto' }
                            },

                            didDrawPage: function (data) {
                                // redraw header on every page
                                if (typeof drawHeader === "function") {
                                    // drawHeader();
                                }

                                // optional external callback
                                if (typeof didDrawPageCallback === "function") {
                                    didDrawPageCallback(data);
                                }
                            }
                        });

                        // jsPDF-AutoTable always stores the final Y safely (even across pages)
                        const finalY = doc.autoTable.previous.finalY;

                        return {
                            x: x,
                            y: finalY + 6   // spacing after table
                        };
                    }

                    const doc = new jsPDF('p', 'mm', 'a4');
                    let headerY;
                    let y = 10;
                    doc.setFont("helvetica", "italic")
                    doc.setFontSize(10)
                    doc.text(`PPA-FO-FR-001`, 170, 7)
                    function drawHeader () {
                        doc.setFont("helvetica", "bold")
                        let posHeader = drawAutoText (`PPA FORM 1`, "", 14, y, false)
                        headerY = posHeader.y;
                        y = posHeader.y;
                    }
                    drawHeader();
                    function drawHeaderTitle () {
                        let titleY = y + 10;
                        titleY = drawCenterText("Republic of the Philippines", titleY, 'normal', 10);
                        titleY = drawCenterText("Department of Justice", titleY, 'normal', 10);
                        titleY = drawCenterText("PAROLE AND PROBATION ADMINISTRATION", titleY, 'bold', 10);
                        titleY = drawCenterText("", titleY, 'normal', 10); // for region
                        titleY = drawCenterText("", titleY, 'normal', 10); // for parole office
                        titleY = drawCenterText("", titleY, 'normal', 10); // for location/address

                        y = titleY; // update the new value of y;
                    }
                    drawHeaderTitle();
                    if (result.status != "ERROR") {
                        console.log(worksheetData)
                        var identifyingData = worksheetData.identifyingData;
                        var presentOffense = worksheetData.presentOffense;
                        var priorRecords = worksheetData.priorRecords;
                        var identificationData = worksheetData.identificationData;
                        var familyBackground = worksheetData.familyBackground;
                        var presentSituation = worksheetData.presentSituation;
                        var educationalHistory = worksheetData.educationalHistory;
                        var employmentHistory = worksheetData.employmentHistory;
                        var communityBackground = worksheetData.communityBackground;

                        function drawCriminalCaseTitle () {
                            let crimTitleY = y + 6;

                            let posInterviewTitle = drawAutoText("Date of Initial Interview:", "", 20, crimTitleY, true, 80, 20); // 80 here is the px/space that the characters will occupy before text wrapping
                            posInterviewTitle = drawAutoText("Interviewed by:", "", 20, posInterviewTitle.y+6, true, 80, 20);

                            let posCrimTitle = drawAutoText("Criminal Case No.:", "", 110, crimTitleY, true, 80, 110);
                            posCrimTitle = drawAutoText("Inv. Docket No.:", "", 110, posCrimTitle.y+6, true, 80, 110);

                            if (posInterviewTitle.y > posCrimTitle.y) {
                                y = posInterviewTitle.y;
                            } else {
                                y = posCrimTitle.y;
                            }
                        }
                        drawCriminalCaseTitle();

                        function drawIdentifyingData () {
                            // console.log(identifyingData)
                            let posCenterTitleY = y + 10;
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10)
                            posCenterTitleY = drawCenterText("WORK SHEET", posCenterTitleY, 'normal', 10);
                            posCenterTitleY = drawCenterText("I.    IDENTIFYING DATA", posCenterTitleY + 2, 'normal', 10);

                            y = posCenterTitleY;

                            let posIdentifyingData = drawAutoText("PETITIONER:", "", 20, y, false, 80, 20);
                            posIdentifyingData = drawAutoText("", identifyingData.name, 20, posIdentifyingData.y+6, true, 160, 20);
                            posIdentifyingData = drawAutoText("ALIAS/ES:", identifyingData.alias, 20, posIdentifyingData.y+6, true, 160, 20);
                            posIdentifyingData = drawAutoText("Present Address:", identifyingData.presentAddress, 20, posIdentifyingData.y+6, true, 160, 20);
                            posIdentifyingData = drawAutoText("Permanent Address:", identifyingData.permanentAdress, 20, posIdentifyingData.y+6, true, 160, 20);

                            y = posIdentifyingData.y;
                        }
                        drawIdentifyingData();

                        function drawPresentOffense () {
                            let posCenterTitleY = y + 8;
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10)
                            posCenterTitleY = drawCenterText("II.    PETITIONER’S CRIMINAL HISTORY", posCenterTitleY + 2, 'normal', 10);

                            y = posCenterTitleY;

                            let posTitlePresentOffense = drawAutoText("A. PRESENT OFFENSE", "", 20, y, false, 110, 20);
                            y = posTitlePresentOffense.y;
                            let posChargedWith = drawAutoText("Charged With:", presentOffense.chargedWith, 20, posTitlePresentOffense.y+6, true, 110, 20);
                            let posChargedWithDate = drawAutoText("Date:", presentOffense.chargedWithDate, 130, posTitlePresentOffense.y+6, true, 30, 130);
                            y = Math.max(posChargedWith.y, posChargedWithDate.y); // set the new position of y depending which y has the longest position
                            let posPlaceCommision = drawAutoText("Place of Commission:", presentOffense.commisionPlace, 20, y+6, true, 110, 20);
                            let posPlaceCommisionDate = drawAutoText("Date:", presentOffense.commisionPlaceDate, 130, y+6, true, 30, 130)
                            y = Math.max(posPlaceCommision.y, posPlaceCommisionDate.y);
                            let posConvictedOf = drawAutoText("Convicted of:", presentOffense.convictedOf, 20, posPlaceCommision.y+6, true, 110, 20);
                            let posConvictedOfDate = drawAutoText("Date:", presentOffense.convictedOfDate, 130, posPlaceCommision.y+6, true, 100, 20);
                            y = Math.max(posConvictedOf.y, posConvictedOfDate.y);
                            let posSentence = drawAutoText("Sentence:", presentOffense.sentence, 20, posConvictedOfDate.y + 6, true, 175, 20)
                            let posJudge = drawAutoText("Judge:", presentOffense.judge, 20, posSentence.y+6, true, 100, 20);
                            let posCourt  = drawAutoText("Court:", presentOffense.court, 120, posSentence.y+6, true, 70, 120);
                            y = Math.max(posJudge.y, posCourt.y);
                            let posArrestingOfficer = drawAutoText("Arresting Officer:", presentOffense.arrestingOfficer, 20, y+6, true, 100, 20);
                            let posArrestingOfficerAddress  = drawAutoText("Address:", presentOffense.arrestingOfficerAddress, 120, y+6, true, 70, 120);
                            y = Math.max(posArrestingOfficer.y, posArrestingOfficerAddress.y);
                            let posDefenseCounsel = drawAutoText("Defense Counsel:", presentOffense.defenseCounsel, 20, y+6, true, 100, 20);
                            let posDefenseCounselAddress  = drawAutoText("Address:", presentOffense.defenseCounselAddress, 120, y+6, true, 70, 120);
                            y = Math.max(posDefenseCounsel.y, posDefenseCounselAddress.y);
                            let posProsecutor = drawAutoText("Prosecutor:", presentOffense.prosecutor, 20, y+6, true, 100, 20);
                            let posProsecutorAddress  = drawAutoText("Address:", presentOffense.prosecutorAddress, 120, y+6, true, 70, 120);
                            y = Math.max(posProsecutor.y, posProsecutorAddress.y);
                            let posOffendedParty = drawAutoText("Offended Party:", presentOffense.offendedParty, 20, y+6, true, 100, 20);
                            let posOffendedPartyAddress  = drawAutoText("Address:", presentOffense.offendedPartyAddress, 120, y+6, true, 70, 120);
                            y = Math.max(posOffendedParty.y, posOffendedPartyAddress.y);
                            let posCoAccused = drawAutoText("Co-Accused:", presentOffense.coAccused, 20, y + 6, true, 175, 20)
                            let posAggravatingCircumstances = drawAutoText("Aggravating Circumstances:", presentOffense.aggravatingCirsumstances, 20, posCoAccused.y+6, true, 175, 20);
                            let posMitigatingCirumstances = drawAutoText("Mitigating Circumstances:", presentOffense.mitigatingCircumstances, 20, posAggravatingCircumstances.y+6, true, 175, 20);

                            let posCustodyStatus = drawAutoText (`Custody Status:`, "", 20, posMitigatingCirumstances.y+6, false, 175, 20);
                            var custodyStatus = presentOffense.custody;
                            let posRadioCustodyStatus = { x: posCustodyStatus.x, y: posCustodyStatus.y};
                            let posRadioCustodyStatusRor = { x: posCustodyStatus.x, y: posCustodyStatus.y + 6};
                            const displayCustodyStatus = [
                                "On Bail",
                                "On Detention",
                                "ROR - Custodian",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayCustodyStatus = {
                                on_bail: "On Bail",
                                on_detention: "On Detention",
                                ror_custodian: "ROR - Custodian",
                            };

                            const selectedCustodyStatus = apiToDisplayCustodyStatus[custodyStatus] || "";

                            displayCustodyStatus.forEach(option => {
                                let x = posRadioCustodyStatus.x;
                                let y = posRadioCustodyStatus.y;
                                let columnWidth;
                                let isChecked = option === selectedCustodyStatus;
                                let hasValue = false;

                                if (option === "ROR - Custodian") {
                                    x = posRadioCustodyStatusRor.x;
                                    y = posRadioCustodyStatusRor.y;
                                }

                                let addtlText = "";
                                if (option === "On Detention" && selectedCustodyStatus === "On Detention") {
                                    hasValue = true;
                                    addtlText = presentOffense.periodOfDetention
                                    columnWidth = 180;
                                }

                                // Sub-selection for "Separated"
                                if (option === "ROR - Custodian" && selectedCustodyStatus === "ROR - Custodian") {
                                    hasValue = false;
                                    addtlText = `${presentOffense.ror_custodian}`
                                    columnWidth = 180;
                                }

                                posRadioCustodyStatus = drawRadioButton(
                                    option,
                                    x,
                                    y,
                                    isChecked,
                                    hasValue,
                                    addtlText,
                                    columnWidth
                                );
                            });

                            y = posRadioCustodyStatusRor.y;
                            let posRorCustodianAddress = drawAutoText("Address:", presentOffense.rorCustodianAddress, posRadioCustodyStatusRor.x, y+6, true, 175, 20);
                            y = posRorCustodianAddress.y;

                            let posExtentParticipation = drawAutoText("Extent of Participation:", "", 20, y+6, false, 175, 20)
                            let posRadioExtentParticipation = {x: posExtentParticipation.x, y:posExtentParticipation.y}
                            const optionsExtentParticipation = ["Principal", "Accomplice", "Accessory"];
                            const selectedExtentParticipation = (presentOffense.extentParticipation || "").toLowerCase();

                            optionsExtentParticipation.forEach(option => {
                                const isSelected = option.toLowerCase() === selectedExtentParticipation;
                                posRadioExtentParticipation = drawRadioButton(
                                    option,
                                    posRadioExtentParticipation.x,
                                    posRadioExtentParticipation.y,
                                    isSelected,      // checkmark
                                    false,           // disabled?
                                    "",
                                    190,
                                    20
                                );
                            });

                            let posMannerOfCommission = drawAutoText("Manner of Commission: (Narrative)", presentOffense.mannerofCommision, 20, posRadioExtentParticipation.y+6, true, 175, 20);
                            let posMotives = drawAutoText("Motives:", "", 20, posMannerOfCommission.y+6, false, 175, 20);
                            var motives = presentOffense.motives
                            let posMotivesRadio = {x: posMotives.x, y:posMotives.y}
                            let posMotivesRadioNextLine = {x: posMotivesRadio.x, y:posMotivesRadio.y+6}
                            const displayMotives = [
                                "Circumstantial",
                                "High Times",
                                "Imprudence",
                                "Temper",
                                "Unintentional",
                                "Others",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayMotives = {
                                circumstantial: "Circumstantial",
                                high_times: "High Times",
                                imprudence: "Imprudence",
                                temper: "Temper",
                                unintentional: "Unintentional",
                                others: "Others",
                            };

                            const selectedMotives = apiToDisplayMotives[motives] || "";

                            displayMotives.forEach(option => {
                                let isChecked = option === selectedMotives;
                                let hasValue = false;                                
                                let y;

                                if (option === "Unintentional" || option === "Circumstantial" || option === "Imprudence") {
                                    // y = posMotivesRadio.y;
                                    posMotivesRadio = drawRadioButton(
                                        option,
                                        posMotivesRadio.x,
                                        posMotivesRadio.y,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }

                                if (option === "High Times" || option === "Temper" || option === "Others") {
                                    // y = posMotivesRadioNextLine;
                                    posMotivesRadioNextLine = drawRadioButton(
                                        option,
                                        posMotivesRadioNextLine.x,
                                        posMotivesRadioNextLine.y,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }
                            });

                            y = posMotivesRadioNextLine.y;
                            let posExplain = drawAutoText("Explain:", presentOffense.explain, 20, y+6, true, 175, 20);

                            y = posExplain.y;
                        }
                        drawPresentOffense();

                        function drawPriorRecords () {
                            // console.log(priorRecords)
                            let posTitlePriorRecords = drawAutoText("B. PRIOR RECORDS", "", 20, y + 6, false, 110, 20);
                            let posAllegedBy = drawAutoText("Alleged By:", "", posTitlePriorRecords.x, y + 6, false, 110, 20);
                            let posAllegedByRadio = {x:posAllegedBy.x, y:posAllegedBy.y}
                            const displayAllegedBy = [
                                "Petitioner",
                                "Other Source",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayAllegedBy = {
                                petitioner: "Petitioner",
                                other_source: "Other Source",
                            };

                            const selectedAllegedBy = apiToDisplayAllegedBy[priorRecords.allegedBy] || "";

                            displayAllegedBy.forEach(option => {
                                let isChecked = option === selectedAllegedBy;
                                let hasValue = false;   

                                posAllegedByRadio = drawRadioButton(
                                    option,
                                    posAllegedByRadio.x,
                                    posAllegedByRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });

                            let posRecordRadio = {x:20, y:posAllegedByRadio.y}
                            const displayRecord = [
                                "No Record",
                                "With Derogatory Record",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayRecord = {
                                no_record: "No Record",
                                with_derogatroy_record: "With Derogatory Record",
                            };

                            const selectedRecord = apiToDisplayRecord[priorRecords.record] || "";

                            displayRecord.forEach(option => {
                                let isChecked = option === selectedRecord;
                                let hasValue = false;   

                                posRecordRadio = drawRadioButton(
                                    option,
                                    25,
                                    posRecordRadio.y+6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });

                            let tablePosRecord = {x: 25, y:posRecordRadio.y + 6};
                            // Example headers and rows
                            var headers = [
                                {title: "Agency", dataKey: "agency"},
                                {title: "Criminal Case No.", dataKey: "cc_no"}, 
                                {title: "Offense", dataKey: "offense"}, 
                                {title: "Date Charged", dataKey: "when"}, 
                                {title: "Disposition", dataKey: "disposition"}, 
                            ];
                            const rows = priorRecords.priorRecord;
                            let posTableRecord = drawAutoTable(headers, rows, 25, posRecordRadio.y + 6);

                            var probation = priorRecords.probation;
                            let posProbation = {x: 25, y:posTableRecord.y}
                            if (probation === "no") {
                                posProbation = drawRadioButton("Has been/not been on Probation", posProbation.x, posProbation.y, false);
                            } else {
                                posProbation = drawRadioButton("Has been/not been on Probation", posProbation.x, posProbation.y, true);
                            }
                            y = posProbation.y;

                            let posTitleDerogatoryInfo = drawAutoText("Other Derogatory Information", "", 25, y + 6, false, 110, 20);

                            var headersInfo = [
                                {title: "Source/Date", dataKey: "source"},
                                {title: "Position", dataKey: "position"}, 
                                {title: "Particulars", dataKey: "particulars"}, 
                            ];
                            const rowsInfo = priorRecords.recordsInfo;
                            let tablePosDerogatoryInfo = drawAutoTable(headersInfo, rowsInfo, 25, posTitleDerogatoryInfo.y + 6);
                            y = tablePosDerogatoryInfo.y;
                        }
                        drawPriorRecords();

                        function drawIdenficationData () {
                            let posCenterTitleY = y + 8;
                            doc.setFont("helvetica", "bold")
                            doc.setFontSize(10)
                            posCenterTitleY = drawCenterText("III.    PERSONAL AND SOCIAL HISTORY", posCenterTitleY + 2, 'normal', 10);
                            y = posCenterTitleY;
                            let posTitleIdentificationData = drawAutoText("A. IDENTIFICATION DATA", "", 20, y, false, 110, 20);
                            y = posTitleIdentificationData.y;

                            let posSex = drawAutoText("Sex:", "", 25, y+6, true, 10, 25);
                            let posCivilStatus = drawAutoText("Civil Status:", "", posSex.x, posSex.y, true, 15, posSex.x);
                            let posCitizenship = drawAutoText("Citizenship:", "", posCivilStatus.x, posCivilStatus.y, true, 15, posCivilStatus.x);
                            let posReligion = drawAutoText("Religion:", "", posCitizenship.x, posCitizenship.y, true, 20, posCitizenship.x);
                            let posDob = drawAutoText("DOB:", "", 25, posReligion.y+6, true, 15, posReligion.x);
                            let posAge = drawAutoText("Age:", "", posDob.x, posDob.y, true, 15, posDob.x);
                            let posPob = drawAutoText("POB:", "", posAge.x, posAge.y, true, 30, posAge.x);
                            let posIdentifyingMarks = drawAutoText("Identifying Marks:", "", 25, posAge.y+6, false, 180, 25);

                            let posIdentifyingMarksRadio = {x:posIdentifyingMarks.x, y:posIdentifyingMarks.y}
                            const displayIdentifyingMarksRadio = [
                                "Tattoo",
                                "Mole",
                                "Scar",
                                "Others",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayIdentifyingMarksRadio = {
                                tattoo : "Tattoo",
                                mole : "Mole",
                                scar : "Scar",
                                others : "Others",
                            };

                            const selectedIdentifyingMarksRadio = apiToDisplayIdentifyingMarksRadio[identificationData.identifyingMarks] || "";

                            displayIdentifyingMarksRadio.forEach(option => {
                                let isChecked = option === selectedIdentifyingMarksRadio;
                                let hasValue = false;   

                                posIdentifyingMarksRadio = drawRadioButton(
                                    option,
                                    posIdentifyingMarksRadio.x,
                                    posIdentifyingMarksRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posIdentifyingMarksRadio.y;
                            let posDescription = drawAutoText("Description:", "", 25, y+6, true, 155, 25);
                            let posPhysicalhandicap = drawAutoText("Physical Handicap:", "", 25, posDescription.y+6, true, 155, 25);

                            y = posPhysicalhandicap.y;
                        }
                        drawIdenficationData();

                        function drawFamilyBackground () {
                            let posTitleFamilyBackground = drawAutoText("B. FAMILY BACKGROUND", "", 20, y + 6, false, 110, 20);
                            y = posTitleFamilyBackground.y;
                            let posParentalTitle = drawAutoText("PARENTAL", "", 57, y+6, false, 110, 20);
                            let posMaternalTitle = drawAutoText("MATERNAL", "", 127, posParentalTitle.y, false, 110, 20);
                            let posNameTitle = drawAutoText("Name:", "", 25, posMaternalTitle.y+6, false, 110, 20);
                            let posPaternalName = drawAutoText("", familyBackground.fatherName, 55, posNameTitle.y, true, 70, 57);
                            let posMaternalName = drawAutoText("", familyBackground.motherName, 125, posNameTitle.y, true, 70, 127);
                            y = Math.max(posPaternalName.y, posMaternalName.y); // set the new position of y depending which y has the longest position
                            let posDobTitle = drawAutoText("DOB:", "", 25, y+6, false, 110, 20);
                            let posPaternalDob = drawAutoText("", familyBackground.fatherBday, 55, posDobTitle.y, true, 70, 57);
                            let posMaternalDob = drawAutoText("", familyBackground.motherBday, 125, posDobTitle.y, true, 70, 127);
                            y = Math.max(posPaternalDob.y, posMaternalDob.y);
                            let posAgeTitle = drawAutoText("Age:", "", 25, y+6, false, 110, 20);
                            let posPaternalAge = drawAutoText("", familyBackground.fatherAge, 55, posAgeTitle.y, true, 70, 57);
                            let posMaternalAge = drawAutoText("", familyBackground.motherAge, 125, posAgeTitle.y, true, 70, 127);
                            y = Math.max(posPaternalAge.y, posMaternalAge.y);
                            let posPobTitle = drawAutoText("POB:", "", 25, y+6, false, 110, 20);
                            let posPaternalPob = drawAutoText("", familyBackground.fatherBplace, 55, posPobTitle.y, true, 70, 57);
                            let posMaternalPob = drawAutoText("", familyBackground.motherBplace, 125, posPobTitle.y, true, 70, 127);
                            y = Math.max(posPaternalPob.y, posMaternalPob.y);
                            let posAddressTitle = drawAutoText("Address:", "", 25, y+6, false, 110, 20);
                            let posPaternalAddress = drawAutoText("", familyBackground.fatherAddress, 55, posAddressTitle.y, true, 70, 57);
                            let posMaternalAddress = drawAutoText("", familyBackground.motherAddress, 125, posAddressTitle.y, true, 70, 127);
                            y = Math.max(posPaternalAddress.y, posMaternalAddress.y);
                            let posCitizenshipTitle = drawAutoText("Citizenship:", "", 25, y+6, false, 110, 20);
                            let posPaternalCitizenship = drawAutoText("", familyBackground.fatherCitizenship, 55, posCitizenshipTitle.y, true, 70, 57);
                            let posMaternalCitizenship = drawAutoText("", familyBackground.motherCitizenship, 125, posCitizenshipTitle.y, true, 70, 127);
                            y = Math.max(posPaternalCitizenship.y, posMaternalCitizenship.y);
                            let posReligionTitle = drawAutoText("Religion:", "", 25, y+6, false, 110, 20);
                            let posPaternalReligion = drawAutoText("", familyBackground.fatherReligion, 55, posReligionTitle.y, true, 70, 57);
                            let posMaternalReligion = drawAutoText("", familyBackground.motherReligion, 125, posReligionTitle.y, true, 70, 127);
                            y = Math.max(posPaternalReligion.y, posMaternalReligion.y);
                            let posEducationTitle = drawAutoText("Education:", "", 25, y+6, false, 110, 20);
                            let posPaternalEducation = drawAutoText("", familyBackground.fatherEducation, 55, posEducationTitle.y, true, 70, 57);
                            let posMaternalEducation = drawAutoText("", familyBackground.motherEducation, 125, posEducationTitle.y, true, 70, 127);
                            y = Math.max(posPaternalEducation.y, posMaternalEducation.y);
                            let posOccupationTitle = drawAutoText("Occupation:", "", 25, y+6, false, 110, 20);
                            let posPaternalOccupation = drawAutoText("", familyBackground.fatherOccupation, 55, posOccupationTitle.y, true, 70, 57);
                            let posMaternalOccupation = drawAutoText("", familyBackground.motherOccupation, 125, posOccupationTitle.y, true, 70, 127);
                            y = Math.max(posPaternalOccupation.y, posMaternalOccupation.y);
                            let posWorkAddressTitle = drawAutoText("Work Address:", "", 25, y+6, false, 110, 20);
                            let posPaternalWorkAddress = drawAutoText("", familyBackground.fatherWorkAddress, 55, posWorkAddressTitle.y, true, 70, 57);
                            let posMaternalWorkAddress = drawAutoText("", familyBackground.motherWorkAddress, 125, posWorkAddressTitle.y, true, 70, 127);
                            y = Math.max(posPaternalWorkAddress.y, posMaternalWorkAddress.y);
                            let posTelNoTitle = drawAutoText("Tel. No.:", "", 25, y+6, false, 110, 20);
                            let posPaternalTelNo = drawAutoText("", familyBackground.fatherTelNo, 55, posTelNoTitle.y, true, 70, 57);
                            let posMaternalTelNo = drawAutoText("", familyBackground.motherTelNo, 125, posTelNoTitle.y, true, 70, 127);
                            y = Math.max(posPaternalTelNo.y, posMaternalTelNo.y);
                            let posIncomeTitle = drawAutoText("Monthly Income:", "", 25, y+6, false, 110, 20);
                            let posPaternalIncome = drawAutoText("", familyBackground.fatherIncome, 55, posIncomeTitle.y, true, 70, 57);
                            let posMaternalIncome = drawAutoText("", familyBackground.motherIncome, 125, posIncomeTitle.y, true, 70, 127);
                            y = Math.max(posPaternalIncome.y, posMaternalIncome.y);
                            let posDateDeceasedTitle = drawAutoText("Date Deceased:", "", 25, y+6, false, 110, 20);
                            let posPaternalDateDeceased = drawAutoText("", familyBackground.fatherDateDeceased, 55, posDateDeceasedTitle.y, true, 70, 57);
                            let posMaternalDateDeceased = drawAutoText("", familyBackground.motherDateDeceased, 125, posDateDeceasedTitle.y, true, 70, 127);
                            y = Math.max(posPaternalDateDeceased.y, posMaternalDateDeceased.y);
                            let posCauseTitle = drawAutoText("Cause:", "", 25, y+6, false, 110, 20);
                            let posPaternalCause = drawAutoText("", familyBackground.fatherDeceasedCause, 55, posCauseTitle.y, true, 70, 57);
                            let posMaternalCause = drawAutoText("", familyBackground.motherDeceasedCause, 125, posCauseTitle.y, true, 70, 127);
                            y = Math.max(posPaternalCause.y, posMaternalCause.y);

                            let posCivilStatus = drawAutoText("Civil Status:", "", 25, y+6, false, 180, 20);
                            let posCivilStatusRadio = {x:posCivilStatus.x, y:posCivilStatus.y}
                            const displayCivilStatus = [
                                "Married",
                                "Separated",
                                "Live-in/Common-Law",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayCivilStatus = {
                                married : "Married",
                                seperated : "Separated",
                                common_law : "Live-in/Common-Law",
                            };

                            const selectedCivilStatus = apiToDisplayCivilStatus[familyBackground.civilStatus] || "";

                            displayCivilStatus.forEach(option => {
                                let isChecked = option === selectedCivilStatus;
                                let hasValue = false;   

                                posCivilStatusRadio = drawRadioButton(
                                    option,
                                    posCivilStatusRadio.x,
                                    posCivilStatusRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posCivilStatusRadio.y;
                            let posRelationshipParents = drawAutoText("Relationship with Parents:", "", 25, y+6, false, 180, 20);
                            let posRelationshipParentsRadio = {x:posRelationshipParents.x, y:posRelationshipParents.y}
                            const displayRelationshipParents = [
                                "Poor",
                                "Fair",
                                "Satisfactory",
                                "Very Satisfactory",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayRelationshipParents = {
                                poor : "Poor",
                                fair : "Fair",
                                satisfactory : "Satisfactory",
                                very_satisfactory : "Very Satisfactory",
                            };

                            const selectedRelationshipParents = apiToDisplayRelationshipParents[familyBackground.familyRelationship] || "";

                            displayRelationshipParents.forEach(option => {
                                let isChecked = option === selectedRelationshipParents;
                                let hasValue = false;   

                                posRelationshipParentsRadio = drawRadioButton(
                                    option,
                                    posRelationshipParentsRadio.x,
                                    posRelationshipParentsRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = displayRelationshipParents.y;
                            // Example headers and rows
                            var headersSiblings = [
                                {title: "Name of Siblings", dataKey: "name"},
                                {title: "Degree of Rel.", dataKey: "relationship"}, 
                                {title: "Age", dataKey: "age"}, 
                                {title: "Educational Attainment", dataKey: "education"}, 
                                {title: "Occupation", dataKey: "occupation"},
                            ];
                            const rowsSiblings = familyBackground.siblings;
                            let posTableSiblings = drawAutoTable(headersSiblings, rowsSiblings, 25, y + 6);

                            y = posTableSiblings.y;
                        }
                        drawFamilyBackground();

                        function drawSocioEconomicbackground () {
                            let posSocioEconomicTitle = drawAutoText (`2. SOCIO-ECONOMIC BACKGROUND:`, "", 20, y + 6, false, 180, 20);
                            y = posSocioEconomicTitle.y;
                            function drawRadioButtonsVertically (display = [], apiToDisplay = {}, value, posName = "", x , y) {
                                const optionsToDisplay = display;

                                // Mapping API → UI labels
                                const apiToDisplayFamilyRel = apiToDisplay;

                                const selectedFamilyRel = apiToDisplayFamilyRel[value] || "";

                                optionsToDisplay.forEach((option, index) => {
                                    let isChecked = option === selectedFamilyRel;
                                    let hasValue = false;   

                                    posName = drawRadioButton(
                                        option,
                                        x,
                                        y + (index + 1) * 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                });
                                return {x: x, y: y + (optionsToDisplay.length) * 6};
                            }
                            let posFamilyRel = drawAutoText("", "Family Relationship", 23, y+6, true, 70, 23);
                            let posFamilyRelRadio = {x:25, y:posFamilyRel.y}
                            const displayFamilyRel = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayFamilyRel = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };
                            y = posFamilyRel.y;
                            posFamilyRelRadio = drawRadioButtonsVertically (displayFamilyRel, apiToDisplayFamilyRel, familyBackground.familyRelationship, "posFamilyRelRadio", 25, y)

                            let posFamilyProblem = drawAutoText("", "Major Family Problem", 78, y, true, 70, 78);
                            let posFamilyProblemRadio = {x:25, y:posFamilyProblem.y}
                            const displayFamilyProblem = [
                                "No Apparent Problem",
                                "Economic",
                                "Mental/Physical Illness",
                                "Marital Problem",
                                "One-Parent-Family",
                                "Parent-Child Conflict",
                                "Sibling Conflict",
                                "Others",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayFamilyProblem = {
                                no_apparent_problem : "No Apparent Problem",
                                economic : "Economic",
                                mental_physical_illness : "Mental/Physical Illness",
                                marital_problem : "Marital Problem",
                                one_parent_family : "One-Parent-Family",
                                parent_child_conflict : "Parent-Child Conflict",
                                sibling_conflict : "Sibling Conflict",
                                others : "Others",
                            };
                            y = posFamilyRel.y;
                            posFamilyProblemRadio = drawRadioButtonsVertically (displayFamilyProblem, apiToDisplayFamilyProblem, familyBackground.majorFamilyProblem, "posFamilyProblemRadio", 80, y)

                            let posFamilyRep = drawAutoText("", "Family Reputation in the Community", 138, y, true, 70, 138);
                            let posFamilyRepRadio = {x:25, y:posFamilyRel.y}
                            const displayFamilyRep = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayFamilyRep = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };
                            y = posFamilyRep.y;
                            posFamilyRepRadio = drawRadioButtonsVertically (displayFamilyRep, apiToDisplayFamilyRep, familyBackground.familyReputation, "posFamilyRepRadio", 140, y)

                            y = posFamilyProblemRadio.y; // set the new y after drawing the radio buttons

                            let posFamilyEcoStatus = drawAutoText("", "Family Economic Status", 23, y+6, true, 70, 23);
                            let posFamilyEcoStatusRadio = {x:25, y:posFamilyEcoStatus.y}
                            const displayFamilyEcoStatus = [
                                "More than Adequate",
                                "Adequate",
                                "Inadequate",
                                "Below Poverty Line",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayFamilyEcoStatus = {
                                more_adequate : "More than Adequate",
                                adequate : "Adequate",
                                inadequate : "Inadequate",
                                below_poverty_lines : "Below Poverty Line",
                            };
                            y = posFamilyEcoStatus.y;
                            posFamilyEcoStatusRadio = drawRadioButtonsVertically (displayFamilyEcoStatus, apiToDisplayFamilyEcoStatus, familyBackground.familyRelationship, "posFamilyEcoStatusRadio", 25, y)

                            let posPhysicalHomeCondition = drawAutoText("", "Physical Home Conditions", 78, y, true, 70, 78);
                            let posPhysicalHomeConditionRadio = {x:25, y:posPhysicalHomeCondition.y}
                            const displayPhysicalHomeCondition = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayPhysicalHomeCondition = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };
                            y = posPhysicalHomeCondition.y;
                            posPhysicalHomeConditionRadio = drawRadioButtonsVertically (displayPhysicalHomeCondition, apiToDisplayPhysicalHomeCondition, familyBackground.familyReputation, "posPhysicalHomeConditionRadio", 78, y)


                            let posStabilty = drawAutoText("", "Stability of Residence", 138, y, true, 70, 138);
                            let posStabiltyRadio = {x:25, y:posStabilty.y}
                            const displayStabilty = [
                                "Stable",
                                "Ocassional Change",
                                "Frequent Change",
                                "No Stability",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayStabilty = {
                                stable : "Stable",
                                occasional_change : "SatisfOcassional Changeactory",
                                frequent_change : "Frequent Change",
                                no_stability : "No Stability",
                            };
                            y = posStabilty.y;
                            posStabiltyRadio = drawRadioButtonsVertically (displayStabilty, apiToDisplayStabilty, familyBackground.stabilityOfResidence, "posStabiltyRadio", 138, y)
                            y = posStabiltyRadio.y;

                            let posComments = drawAutoText("Comments: Effects of the above condition's on the petitioner behavior", "", 25, y+6, false, 180, 25);
                            let posCommentsValue = drawAutoText("", "", 25, posComments.y+6, true, 180, 25);
                            y = posCommentsValue.y;

                            let posChilhoodCircumstances = drawAutoText("Childhood Circumstances:", "", 25, y+6, false, 180, 20);
                            let posChilhoodCircumstancesRadio = {x:posChilhoodCircumstances.x, y:posChilhoodCircumstances.y}
                            const displayChilhoodCircumstances = [
                                "Sad",
                                "Happy",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayChilhoodCircumstances = {
                                sad : "Sad",
                                happy : "Happy",
                            };

                            const selectedChilhoodCircumstances = apiToDisplayChilhoodCircumstances[familyBackground.childhoodCircumstances] || "";

                            displayChilhoodCircumstances.forEach(option => {
                                let isChecked = option === selectedChilhoodCircumstances;
                                let hasValue = false;   

                                posChilhoodCircumstancesRadio = drawRadioButton(
                                    option,
                                    posChilhoodCircumstancesRadio.x,
                                    posChilhoodCircumstancesRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posChilhoodCircumstancesRadio.y;
                            let posExplain = drawAutoText("Explain:", "", 25, y+6, false, 180, 25);
                            let posExplainValue = drawAutoText("", "", 25, posExplain.y+6, true, 180, 25);
                            y = posExplainValue.y;
                        }
                        drawSocioEconomicbackground();

                        function drawPresentSituation() {
                            let posTitle = drawAutoText (`B. PETITIONER'S PRESENT SITUATION:`, "", 20, y + 6, false, 180, 20);
                            let posCivilStatus = drawAutoText("Civil Status:", "", 25, posTitle.y+6, false, 180, 20);
                            let posCivilStatusRadio = {x:posCivilStatus.x, y:posCivilStatus.y};
                            let posCivilStatusSeperated = {x:posCivilStatus.x, y:posCivilStatus.y};
                            const displayCivilStatus = [
                                "Single",
                                "Married",
                                "Widow/Widower",
                                "Common-Law Relationship",
                                "Seperated"
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayCivilStatus = {
                                single : "Single",
                                married : "Married",
                                widow_widower : "Widow/Widower",
                                with_common_law_spouse : "Common-Law Relationship",
                                seperated : "Seperated"
                            };

                            const selectedCivilStatus = apiToDisplayCivilStatus[presentSituation.civilStatus] || "";

                            displayCivilStatus.forEach(option => {
                                let isChecked = option === selectedCivilStatus;
                                let hasValue = false;   
                                let addtlText = "";
                                if (option === "Seperated") {
                                    addtlText = presentSituation.reasonSeparation
                                    hasValue = true;
                                    posCivilStatusSeperated = drawRadioButton(
                                        option,
                                        posCivilStatusSeperated.x,
                                        posCivilStatusSeperated.y+6,
                                        isChecked,
                                        hasValue,
                                        addtlText,
                                        150
                                    );

                                } else {
                                    posCivilStatusRadio = drawRadioButton(
                                        option,
                                        posCivilStatusRadio.x,
                                        posCivilStatusRadio.y,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }
                            });
                            y = posCivilStatusSeperated.y;
                            let posSpouseName = drawAutoText (`SPOUSE:`, "", 25, y+6, true, 150, 25);
                            let posSpouseAge = drawAutoText (`Age:`, "", posSpouseName.x, posSpouseName.y, true, 25, posSpouseName.x);
                            y = Math.max(posSpouseName.y, posSpouseAge.y); // set the new position of y depending which y has the longest position
                            let posSpouseHomeAddress = drawAutoText (`Home Address:`, "", 25, y+6, true, 170, 25);
                            let posSpousePOB = drawAutoText (`POB:`, "", 25, posSpouseHomeAddress.y+6, true, 150, 25);
                            let posSpouseDOB = drawAutoText (`DOB:`, "", posSpousePOB.x, posSpousePOB.y, true, 25, 25);
                            y = Math.max(posSpousePOB.y, posSpouseDOB.y); // set the new position of y depending which y has the longest position
                            let posOccupation = drawAutoText (`Occupation:`, "", 25, y+6, true, 100, 25);
                            let posWorkAddress = drawAutoText (`Work Address:`, "", posOccupation.x, posOccupation.y, true, 50, posOccupation.x);
                            y = Math.max(posOccupation.y, posWorkAddress.y); // set the new position of y depending which y has the longest position
                            let posDateOfMarriage = drawAutoText (`Date of Marriage:`, "", 25, y+6, true, 100, 25);
                            let posNatureOfCeremony = drawAutoText (`Nature of Ceremony:`, "", posDateOfMarriage.x, posDateOfMarriage.y, true, 50, posDateOfMarriage.x);
                            y = Math.max(posDateOfMarriage.y, posNatureOfCeremony.y); // set the new position of y depending which y has the longest position
                            let posReasonSeperation = drawAutoText (`If Separated, State Reason/s:`, "", 25, y+6, true, 170, 25);
                            y = posReasonSeperation.y;

                            let posRelSpouse = drawAutoText("Relationship with Spouse:", "", 25, y+6, false, 180, 20);
                            let posRelSpouseRadio = {x:posRelSpouse.x, y:posRelSpouse.y};
                            const displayRelSpouse = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayRelSpouse = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };

                            const selectedRelSpouse = apiToDisplayRelSpouse[presentSituation.wifeRelationship] || "";

                            displayRelSpouse.forEach(option => {
                                let isChecked = option === selectedRelSpouse;
                                let hasValue = false;   
                                let addtlText = "";

                                posRelSpouseRadio = drawRadioButton(
                                    option,
                                    posRelSpouseRadio.x,
                                    posRelSpouseRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posRelSpouseRadio.y;
                            let posNoOfChildren = drawAutoText("No. of Children:", presentSituation.noOfChildren, 25, y+6, false, 180, 20);

                            // let tablePosChildren = {x: 25, y:posRelSpouse.y + 6};
                            // Example headers and rows
                            var headersChildren = [
                                {title: "Name", dataKey: "name"},
                                {title: "D.O.B", dataKey: "dob"}, 
                                {title: "Age", dataKey: "age"}, 
                                {title: "Educational Attainment", dataKey: "education"}, 
                                {title: "Occupation", dataKey: "occupation"}, 
                            ];
                            const rowsChildren = presentSituation.children;
                            let posTableChildren = drawAutoTable(headersChildren, rowsChildren, 25, posRelSpouse.y + 10);
                            y = posTableChildren.y;

                            let posRelChildren = drawAutoText("Relationship with Children:", "", 25, y+6, false, 180, 20);
                            let posRelChildrenRadio = {x:posRelChildren.x, y:posRelChildren.y};
                            const displayRelChildren = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ];

                            // Mapping API → UI labels
                            const apiToDisplayRelChildren = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };

                            const selectedRelChildren = apiToDisplayRelChildren[presentSituation.childrenRelationship] || "";

                            displayRelSpouse.forEach(option => {
                                let isChecked = option === selectedRelChildren;
                                let hasValue = false;   
                                let addtlText = "";

                                posRelChildrenRadio = drawRadioButton(
                                    option,
                                    posRelChildrenRadio.x,
                                    posRelChildrenRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posRelChildrenRadio.y;
                        }
                        drawPresentSituation();

                        function drawResidence() {
                            let posTitle = drawAutoText("3. RESIDENCE", "", 20, y+6, false, 110, 20);
                            let posTitleResidence = drawAutoText("Past Residence (Last ten [10] years)", "", 20, posTitle.y+6, false, 110, 20);

                            var headersResidence = [
                                {title: "Address", dataKey: "address"},
                                {title: "Inclusive Dates", dataKey: "inclusiveDate"},
                            ];
                            const rowsResidence = presentSituation.children;
                            let posTableResidence = drawAutoTable(headersResidence, rowsResidence, 25, posTitleResidence.y + 10);
                            y = posTableResidence.y;

                            let posStability = drawAutoText("", "Stability of Residence", 25, y+6, true, 180, 20);
                            let posStabilityRadio = {x:27, y:posStability.y};
                            const displayStabilty = [
                                "Stable",
                                "Ocassional Change",
                                "Frequent Change",
                                "No Stability",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayStabilty = {
                                stable : "Stable",
                                occasional_change : "Ocassional Change",
                                frequent_change : "Frequent Change",
                                no_stability : "No Stability",
                            };

                            const selectedStability = apiToDisplayStabilty[presentSituation.residenceStability] || "";

                            displayStabilty.forEach(option => {
                                let isChecked = option === selectedStability;
                                let hasValue = false;   
                                let addtlText = "";

                                posStabilityRadio = drawRadioButton(
                                    option,
                                    25,
                                    posStabilityRadio.y + 6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });

                            let posTypeResidence = drawAutoText("", "Stability of Residence", 80, y+6, true, 180, 20);
                            let posTypeResidenceRadio = {x:27, y:posTypeResidence.y};
                            const displayTypeResidence = [
                                "House",
                                "Apartment",
                                "Rented",
                                "Owned",
                                "Others",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayTypeResidence = {
                                house : "House",
                                apartment : "Apartment",
                                rented : "Rented",
                                owned : "Owned",
                                others : "Others",
                            };

                            const selectedTypeResidence = apiToDisplayTypeResidence[presentSituation.residenceType] || "";

                            displayTypeResidence.forEach(option => {
                                let isChecked = option === selectedTypeResidence;
                                let hasValue = false;   
                                let addtlText = "";

                                posTypeResidenceRadio = drawRadioButton(
                                    option,
                                    80,
                                    posTypeResidenceRadio.y + 6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });

                            let posHomeCondition = drawAutoText("", "Stability of Residence", 140, y+6, true, 180, 20);
                            let posHomeConditionRadio = {x:27, y:posHomeCondition.y};
                            const displayPhysicalHomeCondition = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayPhysicalHomeCondition = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };
                            const selectedHomeCondition = apiToDisplayPhysicalHomeCondition[presentSituation.physicalHomeCondition] || "";

                            displayPhysicalHomeCondition.forEach(option => {
                                let isChecked = option === selectedHomeCondition;
                                let hasValue = false;   
                                let addtlText = "";

                                posHomeConditionRadio = drawRadioButton(
                                    option,
                                    140,
                                    posHomeConditionRadio.y + 6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posTypeResidenceRadio.y;
                        }
                        drawResidence();

                        function drawEconomicCondition () {
                            let posTitle = drawAutoText("4. ECONOMIC CONDITIONS", "", 20, y+6, false, 110, 20);

                            let posFamilyEconomicStatus = drawAutoText("", "Family Economic Status", 25, posTitle.y+6, true, 180, 20);
                            let posFamilyEconomicStatusRadio = {x:27, y:posFamilyEconomicStatus.y};
                            const displayFamilyEcoStatus = [
                                "More than Adequate",
                                "Adequate",
                                "Inadequate",
                                "Below Poverty Line",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayFamilyEcoStatus = {
                                more_adequate : "More than Adequate",
                                adequate : "Adequate",
                                inadequate : "Inadequate",
                                below_poverty_lines : "Below Poverty Line",
                            };

                            const selectedStatus = apiToDisplayFamilyEcoStatus[presentSituation.familyEconomicStatus] || "";

                            displayFamilyEcoStatus.forEach(option => {
                                let isChecked = option === selectedStatus;
                                let hasValue = false;   
                                let addtlText = "";

                                posFamilyEconomicStatusRadio = drawRadioButton(
                                    option,
                                    25,
                                    posFamilyEconomicStatusRadio.y + 6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });

                            let posBreadwinner = drawAutoText("", "Family Breadwinner", 80, posTitle.y+6, true, 180, 20);
                            let posBreadwinnerRadio = {x:27, y:posBreadwinner.y};
                            const displayBreadwinner = [
                                "Petitioner",
                                "Spouse",
                                "Pet. and Spouse",
                                "Others",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayBreadwinner = {
                                petitioner : "Petitioner",
                                spouse : "Spouse",
                                petiioner_and_spouse : "Pet. and Spouse",
                                other : "Others",
                            };

                            const selectedBreadwinner = apiToDisplayBreadwinner[presentSituation.familyBreadwinner] || "";

                            displayBreadwinner.forEach(option => {
                                let isChecked = option === selectedBreadwinner;
                                let hasValue = false;   
                                let addtlText = "";

                                posBreadwinnerRadio = drawRadioButton(
                                    option,
                                    80,
                                    posBreadwinnerRadio.y + 6,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            let posNoOfDependants = drawAutoText("", "No. of Dependants", 140, posTitle.y+6, true, 180, 20);
                            let posNoOfDependantsRadio = {x: 140, y: posNoOfDependants.y}
                            if (presentSituation.numberOfDependentsChildren !== "" || presentSituation.numberOfDependentsChildren !== null) {
                                posNoOfDependantsRadio = drawRadioButton("Children", 140, posNoOfDependantsRadio.y, true, true, presentSituation.numberOfDependentsChildren, 190, 140);
                                posNoOfDependantsRadio = drawRadioButton("Others", posNoOfDependantsRadio.x, posNoOfDependantsRadio.y, false, false, "", 190, 140);
                            } else if (presentSituation.numberOfDependentsOthers !== "" || presentSituation.numberOfDependentsOthers !== null) {
                                posNoOfDependantsRadio = drawRadioButton("Children", 140, posNoOfDependantsRadio.y, false, false, "", 190, 140);
                                posNoOfDependantsRadio = drawRadioButton("Others", posNoOfDependantsRadio.x, posNoOfDependantsRadio.y, true, true, presentSituation.numberOfDependentsOthers, 190, 140);
                            } else {
                                posNoOfDependantsRadio = drawRadioButton("Children", 140, posNoOfDependantsRadio.y, false, false, "", 190, 140);
                                posNoOfDependantsRadio = drawRadioButton("Others", posNoOfDependantsRadio.x, posNoOfDependantsRadio.y, false, false, "", 190, 140);
                            }
                            y = posBreadwinnerRadio.y;
                        }
                        drawEconomicCondition();

                        function drawMajorFamilyProblem () {
                            let posTitle = drawAutoText("5. MAJOR FAMILY PROBLEMS IN THE FAMILY", "", 20, y+6, false, 110, 20);

                            // let posBreadwinner = drawAutoText("", "", 80, posTitle.y+6, false, 180, 20);
                            let posProblemCol1 = {x:25, y:posTitle.y};
                            let posProblemCol2 = {x:80, y:posTitle.y};
                            let posProblemCol3 = {x:140, y:posTitle.y};
                            const displayOptions = [
                                "No Apparent Problem",
                                "Economic",
                                "Husband-Wife Conflict",
                                "Mental Illness",
                                "Physical Illness",
                                "Parent-Child Conflict",
                                "Sibling Conflict",
                                "Others",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayOptions = {
                                no_apparent_problem : "No Apparent Problem",
                                economic : "Economic",
                                husband_wife_conflict : "Husband-Wife Conflict",
                                mental_illness : "Mental Illness",
                                physical_illness : "Physical Illness",
                                parent_child_conflict : "Parent-Child Conflict",
                                sibling_conflict : "Sibling Conflict",
                                others : "Others",
                            };

                            const selectedOptions = apiToDisplayOptions[presentSituation.majorFamilyProblem] || "";

                            displayOptions.forEach(option => {
                                let isChecked = option === selectedOptions;
                                let hasValue = false;   
                                let addtlText = "";

                                if (option === "No Apparent Problem" || option === "Economic" || option === "Husband-Wife Conflict") {
                                    posProblemCol1 = drawRadioButton(
                                        option,
                                        25,
                                        posProblemCol1.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Mental Illness" || option === "Physical Illness" || option === "Parent-Child Conflict") {
                                    posProblemCol2 = drawRadioButton(
                                        option,
                                        80,
                                        posProblemCol2.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Sibling Conflict" || option === "Others") {
                                    posProblemCol3 = drawRadioButton(
                                        option,
                                        140,
                                        posProblemCol3.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }
                            });
                            let posExplainTitle = drawAutoText("Comments: Effects of the above condition's on the petitioner's behavior", "", 20, posProblemCol1.y+6, false, 110, 20);
                            let posExplain = drawAutoText("", presentSituation.commentsOnFamilyProblem, 20, posExplainTitle.y+6, true, 110, 20);

                            y = posExplain.y;
                        }
                        drawMajorFamilyProblem();

                        function drawEducationalHistory () {
                            let posTitle = drawAutoText("D. PETITIONER'S EDUCATIONAL HISTORY", "", 20, y+6, false, 110, 20);

                            let posLevel = drawAutoText("Educational Level", "", 45, posTitle.y+6, false, 35, 45);
                            let posWhere = drawAutoText("Where", "", 80, posTitle.y+6, false, 20, 70);
                            let posDate = drawAutoText("Date", "", 100, posTitle.y+6, false, 20, 90);
                            let posHighestLevel = drawAutoText("Highest Level Attained", "", 120, posTitle.y+6, false, 35, 105);
                            let posHonor = drawAutoText("Honor/Award Level", "", 165, posTitle.y+6, false, 30, 165);
                            let posElementaryTitle = drawAutoText("Elementary", "", 20, posLevel.y+6, false, 20, 20);


                            let posElementaryLevelValue = drawAutoText("", "", 43, posLevel.y+6, true, 33, 45);
                            let posElementaryWhereValue = drawAutoText("", "", 78, posLevel.y+6, true, 20, 80);
                            let posElementaryDateValue = drawAutoText("", "", 98, posLevel.y+6, true, 20, 100);
                            let posElementaryHighestLevelValue = drawAutoText("", "", 118, posLevel.y+6, true, 35, 120);
                            let posElementaryHonorValue = drawAutoText("", "", 163, posLevel.y+6, true, 30, 165);
                            y = Math.max(posElementaryLevelValue.y, posElementaryWhereValue.y, posElementaryDateValue.y, posElementaryHighestLevelValue.y, posElementaryHonorValue.y);

                            let posSecondaryTitle = drawAutoText("Secondary", "", 20, y+6, false, 20, 20);
                            let posSecondaryLevelValue = drawAutoText("", "", 43, y+6, true, 33, 45);
                            let posSecondaryWhereValue = drawAutoText("", "", 78, y+6, true, 20, 80);
                            let posSecondaryDateValue = drawAutoText("", "", 98, y+6, true, 20, 100);
                            let posSecondaryHighestLevelValue = drawAutoText("", "", 118, y+6, true, 35, 120);
                            let posSecondaryHonorValue = drawAutoText("", "", 163, y+6, true, 30, 165);
                            y = Math.max(posSecondaryLevelValue.y, posSecondaryWhereValue.y, posSecondaryDateValue.y, posSecondaryHighestLevelValue.y, posSecondaryHonorValue.y);

                            let posCollegeTitle = drawAutoText("College", "", 20, y+6, false, 20, 20);
                            let posCollegeLevelValue = drawAutoText("", "", 43, y+6, true, 33, 45);
                            let posCollegeWhereValue = drawAutoText("", "", 78, y+6, true, 20, 80);
                            let posCollegeDateValue = drawAutoText("", "", 98, y+6, true, 20, 100);
                            let posCollegeHighestLevelValue = drawAutoText("", "", 118, y+6, true, 35, 120);
                            let posCollegeHonorValue = drawAutoText("", "", 163, y+6, true, 30, 165);
                            y = Math.max(posCollegeLevelValue.y, posCollegeWhereValue.y, posCollegeDateValue.y, posCollegeHighestLevelValue.y, posCollegeHonorValue.y);

                            let posPostCollegeTitle = drawAutoText("Post College", "", 20, y+6, false, 20, 20);
                            let posPostCollegeLevelValue = drawAutoText("", "", 43, y+6, true, 33, 45);
                            let posPostCollegeWhereValue = drawAutoText("", "", 78, y+6, true, 20, 80);
                            let posPostCollegeDateValue = drawAutoText("", "", 98, y+6, true, 20, 100);
                            let posPostCollegeHighestLevelValue = drawAutoText("", "", 118, y+6, true, 35, 120);
                            let posPostCollegeHonorValue = drawAutoText("", "", 163, y+6, true, 30, 165);
                            y = Math.max(posPostCollegeLevelValue.y, posPostCollegeWhereValue.y, posPostCollegeDateValue.y, posPostCollegeHighestLevelValue.y, posPostCollegeHonorValue.y);

                            let posVocationalTitle = drawAutoText("Vocational", "", 20, y+6, false, 20, 20);
                            let posVocationalLevelValue = drawAutoText("", "", 43, y+6, true, 33, 45);
                            let posVocationalWhereValue = drawAutoText("", "", 78, y+6, true, 20, 80);
                            let posVocationalDateValue = drawAutoText("", "", 98, y+6, true, 20, 100);
                            let posVocationalHighestLevelValue = drawAutoText("", "", 118, y+6, true, 35, 120);
                            let posVocationalHonorValue = drawAutoText("", "", 163, y+6, true, 30, 165);
                            y = Math.max(posVocationalLevelValue.y, posVocationalWhereValue.y, posVocationalDateValue.y, posVocationalHighestLevelValue.y, posVocationalHonorValue.y);

                            y = y+6;
                            let posUnschooledRadio = {x:27, y:y};
                            const displayUnschooled = [
                                "Unschooled but Literate",
                                "Illiterate"
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayUnschooled = {
                                unschooled_but_literate : "Unschooled but Literate",
                                illiterate : "Illiterate",
                            };

                            const selectedUnschooled = apiToDisplayUnschooled[educationalHistory.unschooled] || "";

                            displayUnschooled.forEach(option => {
                                let isChecked = option === selectedUnschooled;
                                let hasValue = false;   
                                let addtlText = "";

                                posUnschooledRadio = drawRadioButton(
                                    option,
                                    posUnschooledRadio.x,
                                    posUnschooledRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posUnschooledRadio.y;

                            let posConductSchool = drawAutoText("Over-all Conduct in School:", "", 20, y+6, false, 20, 20);
                            let posConductShoolRadio = {x:posConductSchool.x, y:posConductSchool.y};
                            const displayOptions = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayOptions = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };

                            const selectedOptions = apiToDisplayOptions[educationalHistory.conductInSchool] || "";

                            displayOptions.forEach(option => {
                                let isChecked = option === selectedOptions;
                                let hasValue = false;   
                                let addtlText = "";

                                posConductShoolRadio = drawRadioButton(
                                    option,
                                    posConductShoolRadio.x,
                                    posConductShoolRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posConductSchool.y;
                            let posExplainTitle = drawAutoText("Explain:", "", 20, y+6, false, 180, 20);
                            let posExplain = drawAutoText("", educationalHistory.conductInSchoolExplain, 20, posExplainTitle.y+6, false, 180, 20);
                            y = posExplain.y;
                        }
                        drawEducationalHistory();

                        function drawEmploymentHistory () {
                            let posTitle = drawAutoText("E. EMPLOYMENT HISTORY", "", 20, y+6, false, 110, 20);

                            let posTitlePreviousJob = drawAutoText("Petitioner's Previous Occupation", "", 20, posTitle.y+6, false, 110, 20);
                            var headersJobs = [
                                {title: "Job Held", dataKey: "jobHeld"},
                                {title: "Employer Address", dataKey: "employerAddress"},
                                {title: "Dates", dataKey: "date"},
                                {title: "Income", dataKey: "income"},
                            ];
                            const rowsJobs = employmentHistory.previousJobs;
                            let posTableJobs = drawAutoTable(headersJobs, rowsJobs, 25, posTitlePreviousJob.y + 6);
                            y = posTableJobs.y;

                            let posStatusEmployment = drawAutoText("Status of Employment/Self Employment", "", 20, y+6, false, 110, 20);
                            let posStatusEmploymentRadio = {x:25, y:posStatusEmployment.y + 6};
                            const displayStatusEmployment = [
                                "Regular",
                                "Irregular"
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayStatusEmployment = {
                                regular : "Regular",
                                irregular : "Irregular",
                            };

                            const selectedStatusEmployment = apiToDisplayStatusEmployment[employmentHistory.employmentStatus] || "";

                            displayStatusEmployment.forEach(option => {
                                let isChecked = option === selectedStatusEmployment;
                                let hasValue = false;   
                                let addtlText = "";

                                posStatusEmploymentRadio = drawRadioButton(
                                    option,
                                    posStatusEmploymentRadio.x,
                                    posStatusEmploymentRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posStatusEmploymentRadio.y
                            let posStatusEmploymentSpecify = drawAutoText("Specify:", employmentHistory.specifyEmplymentStatus, 20, y+6, true, 110, 20);
                            y = posStatusEmploymentSpecify.y;

                            let posUnemployed = drawAutoText("If unemployed, state means of support:", "", 20, y+6, false, 110, 20);
                            let posUnemployedRadio = {x:25, y:posUnemployed.y + 6};
                            const displayUnemployed = [
                                "Pension",
                                "Children Support",
                                "Others"
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayUnemployed = {
                                pension : "Pension",
                                children_support : "Children Support",
                                others : "Others",
                            };

                            const selectedUnemployed = apiToDisplayUnemployed[employmentHistory.sourceOfIncome] || "";

                            displayUnemployed.forEach(option => {
                                let isChecked = option === selectedUnemployed;
                                let hasValue = false;   
                                let addtlText = "";

                                posUnemployedRadio = drawRadioButton(
                                    option,
                                    posUnemployedRadio.x,
                                    posUnemployedRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posUnemployedRadio.y
                            let posUnemployedSpecify = drawAutoText("Specify:", employmentHistory.specifyMeansOfSupport, 20, y+6, true, 110, 20);
                            y = posUnemployedSpecify.y;


                            let posTitleEmployableSkills = drawAutoText("Employable Skills", "", 20, y+6, false, 110, 20);
                            let posEmployableSkillCol1 = {x:25, y:posTitleEmployableSkills.y};
                            let posEmployableSkillCol2 = {x:80, y:posTitleEmployableSkills.y};
                            let posEmployableSkillCol3 = {x:140, y:posTitleEmployableSkills.y};
                            const displayEmployableSkill = [
                                "Auto Mechanic",
                                "Machine Operator",
                                "Driver",
                                "Welder",
                                "Radio Technician",
                                "Electrician",
                                "Plumber",
                                "Mason",
                                "Carpenter",
                                "Baker",
                                "Hollow Block Maker",
                                "House Painter",
                                "Portrait Artist",
                                "Billboard Artist",
                                "Others",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayEmployableSkill = {
                                auto_mechanic : "Auto Mechanic",
                                machine_operator : "Machine Operator",
                                driver : "Driver",
                                welder : "Welder",
                                radio_technician : "Radio Technician",
                                electrician : "Electrician",
                                plumber : "Plumber",
                                mason : "Masont",
                                carpenter : "Carpenter",
                                baker : "Baker",
                                hollow_block_maker : "Hollow Block Maker",
                                house_painter : "House Painter",
                                portrait_artist : "Portrait Artist",
                                billboard_artist : "Billboard Artist",
                                others : "Others",
                            };

                            const selectedEmployableSkill = apiToDisplayEmployableSkill[employmentHistory.employableSkills] || "";

                            displayEmployableSkill.forEach(option => {
                                let isChecked = option === selectedEmployableSkill;
                                let hasValue = false;   
                                let addtlText = "";

                                if (option === "Auto Mechanic" || option === "Machine Operator" || option === "Driver" || option === "Welder" || option === "Radio Technician") {
                                    posEmployableSkillCol1 = drawRadioButton(
                                        option,
                                        25,
                                        posEmployableSkillCol1.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Electrician" || option === "Plumber" || option === "Mason" || option === "Carpenter" || option === "Baker") {
                                    posEmployableSkillCol2 = drawRadioButton(
                                        option,
                                        80,
                                        posEmployableSkillCol2.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Hollow Block Maker" || option === "House Painter" || option === "Portrait Artist" || option === "Billboard Artist") {
                                    posEmployableSkillCol3 = drawRadioButton(
                                        option,
                                        120,
                                        posEmployableSkillCol3.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }

                                if (option === "Others" && selectedEmployableSkill === "Others") {
                                    var columnWidth = 190 - 120;
                                    hasValue = true;
                                    isChecked = true;
                                    addtlText = employmentHistory.otherEMployableSkills
                                    posEmployableSkillCol3 = drawRadioButton(
                                        option,
                                        120,
                                        posEmployableSkillCol3.y + 6,
                                        isChecked,
                                        hasValue,
                                        addtlText,
                                        190
                                    );
                                }
                            });
                            y = posEmployableSkillCol3.y;

                            let posSourcesOfIncome = drawAutoText("Employable Skills", "", 20, y+6, false, 110, 20);
                            let posSourcesOfIncomeCol1 = {x:25, y:posSourcesOfIncome.y};
                            let posSourcesOfIncomeCol2 = {x:80, y:posSourcesOfIncome.y};
                            let posSourcesOfIncomeCol3 = {x:140, y:posSourcesOfIncome.y};
                            const displaySourcesOfIncome = [
                                "Sari-Sari Store",
                                "Ambulant Vendor",
                                "Balut Vendor",
                                "Fish Vendor",
                                "Bote-Garapa",
                                "Junk Collector",
                                "Piggery",
                                "Poultry Raising",
                                "Flower Gardening",
                                "Vegetable Gardening",
                                "Cattle Raising",
                                "Farming",
                                "Machine Aide",
                                "Metro Aide",
                                "Janitor",
                                "Others"
                            ];
                            // Mapping API → UI labels
                            const apiToDisplaySourcesOfIncome = {
                                sari_sari_store : "Sari-Sari Store",
                                ambulant_vendor : "Ambulant Vendor",
                                balut_vendor : "Balut Vendor",
                                fish_vendor : "Fish Vendor",
                                bote_garapa : "Bote-Garapa",
                                junk_collector : "Junk Collector",
                                piggery : "Piggery",
                                poultry_raising : "Poultry Raising",
                                flower_gardening : "Flower Gardening",
                                vegetable_gardening : "Vegetable Gardening",
                                cattle_raising : "Cattle Raising",
                                farming : "Farming",
                                machine_aide : "Machine Aide",
                                metro_aide : "Metro Aide",
                                janitor : "Janitor",
                                others : "Others"
                            };

                            const selectedSourcesOfIncome = apiToDisplaySourcesOfIncome[employmentHistory.sourceOfIncome] || "";

                            displaySourcesOfIncome.forEach(option => {
                                let isChecked = option === selectedSourcesOfIncome;
                                let hasValue = false;   
                                let addtlText = "";

                                if (option === "Sari-Sari Store" || option === "Ambulant Vendor" || option === "Balut Vendor" || option === "Fish Vendor" || option === "Bote-Garapa") {
                                    posSourcesOfIncomeCol1 = drawRadioButton(
                                        option,
                                        25,
                                        posSourcesOfIncomeCol1.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Junk Collector" || option === "Piggery" || option === "Poultry Raising" || option === "Flower Gardening" || option === "Vegetable Gardening") {
                                    posSourcesOfIncomeCol2 = drawRadioButton(
                                        option,
                                        80,
                                        posSourcesOfIncomeCol2.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                } else if (option === "Cattle Raising" || option === "Farming" || option === "Machine Aide" || option === "Metro Aide" || option === "Janitor") {
                                    posSourcesOfIncomeCol3 = drawRadioButton(
                                        option,
                                        120,
                                        posSourcesOfIncomeCol3.y + 6,
                                        isChecked,
                                        hasValue,
                                        "",
                                        190
                                    );
                                }

                                if (option === "Others" && selectedSourcesOfIncome === "Others") {
                                    var columnWidth = 190 - 120;
                                    hasValue = true;
                                    isChecked = true;
                                    addtlText = employmentHistory.otherSourceOfIncome
                                    posSourcesOfIncomeCol3 = drawRadioButton(
                                        option,
                                        120,
                                        posSourcesOfIncomeCol3.y + 6,
                                        isChecked,
                                        hasValue,
                                        addtlText,
                                        190
                                    );
                                }
                            });

                            y = posSourcesOfIncomeCol3.y;

                            let posPhysicalHealth = drawAutoText("Physical Health:", "", 20, y+6, false, 20, 20);
                            let posPhysicalHealthRadio = {x:posPhysicalHealth.x, y:posPhysicalHealth.y};
                            const displayPhysicalHealth = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayPhysicalHealth = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };

                            const selectedPhysicalHealth = apiToDisplayPhysicalHealth[employmentHistory.physicalHealth] || "";

                            displayPhysicalHealth.forEach(option => {
                                let isChecked = option === selectedPhysicalHealth;
                                let hasValue = false;   
                                let addtlText = "";

                                posPhysicalHealthRadio = drawRadioButton(
                                    option,
                                    posPhysicalHealthRadio.x,
                                    posPhysicalHealthRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posPhysicalHealthRadio.y;
                            let posExplainHealthTitle = drawAutoText("Explain:", "", 20, y+6, false, 180, 20);
                            let posExplainHealth = drawAutoText("", employmentHistory.explainPhysicalHealthCondition, 20, posExplainHealthTitle.y+6, true, 180, 20);
                            y = posExplainHealth.y;

                            let posTreatment = drawAutoText("Previous Treatment/Hospitalization:", "", 20, y+6, false, 20, 20);
                            let posTreatmentRadio = {x:posTreatment.x, y:posTreatment.y};
                            const displayTreatment = [
                                "None",
                                "Yes",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayTreatment = {
                                none : "None",
                                yes : "Yes",
                            };

                            const selectedTreatment = apiToDisplayTreatment[employmentHistory.previousTreatment] || "";

                            displayTreatment.forEach(option => {
                                let isChecked = option === selectedTreatment;
                                let hasValue = false;   
                                let addtlText = "";

                                if (option === "Yes" && selectedTreatment === "Yes") {
                                    hasValue = true;
                                    addtlText = `Specify: ${employmentHistory.specifyTreatment}`
                                }
                                posTreatmentRadio = drawRadioButton(
                                    option,
                                    posTreatmentRadio.x,
                                    posTreatmentRadio.y,
                                    isChecked,
                                    hasValue,
                                    addtlText,
                                    190
                                );
                            });

                            y = posTreatmentRadio.y;
                            const nameHospital = (employmentHistory.hospitalizations || [])
                                        .filter(i => i.hospital)
                                        .map(i => i.hospital)
                                        .join(", ");
                            const dateHospitalized = (employmentHistory.hospitalizations || [])
                                        .filter(i => i.dateHospitalized)
                                        .map(i => i.dateHospitalized)
                                        .join(", ");
                            let posHospitalName = drawAutoText("Name of Hospital/s:", nameHospital, 20, y+6, true, 160, 20);
                            let posHospitalDate = drawAutoText("Date/s Hospitalized:", dateHospitalized, 20, posHospitalName.y+6, true, 160, 20);
                            y = posHospitalDate.y;

                            let posDrugUsage = drawAutoText("Use of Alcohol/Drugs:", "", 20, y+6, false, 20, 20);
                            let posDrugUsageRadio = {x:posDrugUsage.x, y:posDrugUsage.y};
                            const displayDrugUsage = [
                                "Yes",
                                "No",
                                "Occasionally",
                            ]
                            // Mapping API → UI labels
                            const apiToDisplayDrugUsage = {
                                yes : "Yes",
                                no : "No",
                                occasionally : "Occasionally",
                            };

                            const selectedDrugUsage = apiToDisplayDrugUsage[employmentHistory.drugUsage] || "";

                            displayDrugUsage.forEach(option => {
                                let isChecked = option === selectedDrugUsage;
                                let hasValue = false;   
                                let addtlText = "";

                                posDrugUsageRadio = drawRadioButton(
                                    option,
                                    posDrugUsageRadio.x,
                                    posDrugUsageRadio.y,
                                    isChecked,
                                    hasValue,
                                    addtlText,
                                    190
                                );
                            });

                            y = posDrugUsageRadio.y;
                            let posExplainDrugs = drawAutoText("Explain:", "", 20, y+6, false, 180, 20);
                            let posExplainDrugsValue = drawAutoText("", employmentHistory.explainDrugUsage, 20, posExplainDrugs.y+6, true, 180, 20);
                            y = posExplainDrugsValue.y;
                        }
                        drawEmploymentHistory();

                        function drawCommunityBackground () {
                            let posTitle = drawAutoText("F. COMMUNITY BACKGROUND/ENVIRONMENTAL FACTORS", "", 20, y+6, false, 110, 20);

                            let posNeighboorhood = drawAutoText("Neighboorhood", "", 20, posTitle.y+6, false, 110, 20);
                            let posNeighboorhoodCol1;
                            let posNeighboorhoodSlumCol1;
                            let posNeighboorhoodNonSlumCol1;
                            let posNeighboorhoodCol2;
                            let posNeighboorhoodSlumCol2;
                            let posNeighboorhoodNonSlumCol2;

                            if (communityBackground.neighborhood === "rural" && communityBackground.neighborhoodArea === "slum_area") {
                                posNeighboorhoodCol1 = drawRadioButton("Rural", posNeighboorhood.x, posNeighboorhood.y, true, false, "", 190, 140);
                                posNeighboorhoodSlumCol1 = drawRadioButton("Slum Area", posNeighboorhoodCol1.x, posNeighboorhoodCol1.y, true, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol1 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol1.x, posNeighboorhoodSlumCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodCol2 = drawRadioButton("Urban", posNeighboorhood.x, posNeighboorhoodCol1.y+6, false, false, "", 190, 140);
                                posNeighboorhoodSlumCol2 = drawRadioButton("Slum Area", posNeighboorhoodCol2.x, posNeighboorhoodCol2.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol2 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol2.x, posNeighboorhoodSlumCol2.y, false, false, "", 190, 140);
                            } else if (communityBackground.neighborhood === "rural" && communityBackground.neighborhoodArea === "non_slum_area") {
                                posNeighboorhoodCol1 = drawRadioButton("Rural", posNeighboorhood.x, posNeighboorhood.y, true, false, "", 190, 140);
                                posNeighboorhoodSlumCol1 = drawRadioButton("Slum Area", posNeighboorhoodCol1.x, posNeighboorhoodCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol1 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol1.x, posNeighboorhoodSlumCol1.y, true, false, "", 190, 140);
                                posNeighboorhoodCol2 = drawRadioButton("Urban", posNeighboorhood.x, posNeighboorhoodCol1.y+6, false, false, "", 190, 140);
                                posNeighboorhoodSlumCol2 = drawRadioButton("Slum Area", posNeighboorhoodCol2.x, posNeighboorhoodCol2.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol2 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol2.x, posNeighboorhoodSlumCol2.y, false, false, "", 190, 140);
                            } else if (communityBackground.neighborhood === "urban" && communityBackground.neighborhoodArea === "slum_area") {
                                posNeighboorhoodCol1 = drawRadioButton("Rural", posNeighboorhood.x, posNeighboorhood.y, false, false, "", 190, 140);
                                posNeighboorhoodSlumCol1 = drawRadioButton("Slum Area", posNeighboorhoodCol1.x, posNeighboorhoodCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol1 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol1.x, posNeighboorhoodSlumCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodCol2 = drawRadioButton("Urban", posNeighboorhood.x, posNeighboorhoodCol1.y+6, true, false, "", 190, 140);
                                posNeighboorhoodSlumCol2 = drawRadioButton("Slum Area", posNeighboorhoodCol2.x, posNeighboorhoodCol2.y, true, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol2 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol2.x, posNeighboorhoodSlumCol2.y, false, false, "", 190, 140);
                            } else if (communityBackground.neighborhood === "urban" && communityBackground.neighborhoodArea === "non_slum_area") {
                                posNeighboorhoodCol1 = drawRadioButton("Rural", posNeighboorhood.x, posNeighboorhood.y, false, false, "", 190, 140);
                                posNeighboorhoodSlumCol1 = drawRadioButton("Slum Area", posNeighboorhoodCol1.x, posNeighboorhoodCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol1 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol1.x, posNeighboorhoodSlumCol1.y, false, false, "", 190, 140);
                                posNeighboorhoodCol2 = drawRadioButton("Urban", posNeighboorhood.x, posNeighboorhoodCol1.y+6, true, false, "", 190, 140);
                                posNeighboorhoodSlumCol2 = drawRadioButton("Slum Area", posNeighboorhoodCol2.x, posNeighboorhoodCol2.y, false, false, "", 190, 140);
                                posNeighboorhoodNonSlumCol2 = drawRadioButton("Non-Slum Area", posNeighboorhoodSlumCol2.x, posNeighboorhoodSlumCol2.y, true, false, "", 190, 140);
                            }

                            y = posNeighboorhoodNonSlumCol2.y;
                            let posDescribeNeighboorhood = drawAutoText("Describe:", "", 20, y+6, false, 180, 20);
                            let posDescribeNeighboorhoodValue = drawAutoText("", communityBackground.describeNeighborhood, 20, posDescribeNeighboorhood.y+6, true, 180, 20);
                            y = posDescribeNeighboorhoodValue.y;

                            let posCriminality = drawAutoText("Neighborhood Criminality:", "", 20, y+6, false, 180, 20);
                            let posCriminalityRadio = {x:posCriminality.x, y:posCriminality.y};
                            const displayCriminality = [
                                "High",
                                "Low",
                                "Minimal",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayCriminality = {
                                high : "High",
                                low : "Low",
                                minimal : "Minimal",
                            };

                            const selectedCriminality = apiToDisplayCriminality[communityBackground.criminalityInNeighborhood] || "";

                            displayCriminality.forEach(option => {
                                let isChecked = option === selectedCriminality;
                                let hasValue = false;   
                                let addtlText = "";
                                posCriminalityRadio = drawRadioButton(
                                    option,
                                    posCriminalityRadio.x,
                                    posCriminalityRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posCriminalityRadio.y;
                            let posExplainCriminality = drawAutoText("Describe:", "", 20, y+6, false, 180, 20);
                            let posExplainCriminalityValue = drawAutoText("", communityBackground.criminalityExplain, 20, posExplainCriminality.y+6, true, 180, 20);
                            y = posExplainCriminalityValue.y;

                            let posCommunityAcceptance = drawAutoText("Community Acceptance:", "", 20, y+6, false, 180, 20);
                            let posCommunityAcceptanceRadio = {x:posCommunityAcceptance.x, y:posCommunityAcceptance.y};
                            const displayCommunityAcceptance = [
                                "Very Satisfactory",
                                "Satisfactory",
                                "Fair",
                                "Poor",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayCommunityAcceptance = {
                                very_satisfactory : "Very Satisfactory",
                                satisfactory : "Satisfactory",
                                fair : "Fair",
                                poor : "Poor",
                            };

                            const selectedCommunityAcceptance = apiToDisplayCommunityAcceptance[communityBackground.communityAcceptance] || "";

                            displayCommunityAcceptance.forEach(option => {
                                let isChecked = option === selectedCommunityAcceptance;
                                let hasValue = false;   
                                let addtlText = "";

                                posCommunityAcceptanceRadio = drawRadioButton(
                                    option,
                                    posCommunityAcceptanceRadio.x,
                                    posCommunityAcceptanceRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190
                                );
                            });
                            y = posCommunityAcceptanceRadio.y;
                            let posCommunityAcceptanceSpecify = drawAutoText("Specify:", "", 20, y+6, false, 180, 20);
                            let posCommunityAcceptanceValue = drawAutoText("", communityBackground.communityAcceptanceSpecify, 20, posCommunityAcceptanceSpecify.y+6, true, 180, 20);
                            y = posCommunityAcceptanceValue.y;

                            let posPeerRelationship = drawAutoText("Community Acceptance:", "", 20, y+6, false, 180, 20);
                            let posPeerRelationshipRadio = {x:posPeerRelationship.x, y:posPeerRelationship.y};
                            let posPeerRelationshipRadioX = posPeerRelationship.x
                            const displayPeerRelationship = [
                                "Desirable",
                                "Undesirable with Potential for Improvement",
                                "Undesirable with no Potential for Improvement",
                            ];
                            // Mapping API → UI labels
                            const apiToDisplayPeerRelationship = {
                                desirable : "Desirable",
                                undesirable_with_potential_for_improvement : "Undesirable with Potential for Improvement",
                                undesirable_with_no_potential_for_improvement : "Undesirable with no Potential for Improvement",
                            };

                            const selectedPeerRelationship = apiToDisplayPeerRelationship[communityBackground.peerRelationship] || "";

                            displayPeerRelationship.forEach(option => {
                                let isChecked = option === selectedPeerRelationship;
                                let hasValue = false;   
                                let addtlText = "";

                                posPeerRelationshipRadio = drawRadioButton(
                                    option,
                                    posPeerRelationshipRadio.x,
                                    posPeerRelationshipRadio.y,
                                    isChecked,
                                    hasValue,
                                    "",
                                    190,
                                    posPeerRelationshipRadioX,
                                );
                            });
                            y = posPeerRelationshipRadio.y;
                            let posPeerRelationshipSpecify = drawAutoText("Specify:", "", 20, y+6, false, 180, 20);
                            let posPeerRelationshipValue = drawAutoText("", communityBackground.peerRelationshipSpecify, 20, posPeerRelationshipSpecify.y+6, true, 180, 20);
                            y = posPeerRelationshipValue.y;
                        }
                        drawCommunityBackground();
                    }

                            
                    // Instead of saving, generate a Blob for preview
                    const pdfBlob = doc.output('blob');
                    const worksheet = URL.createObjectURL(pdfBlob);

                    // Show modal and load PDF
                    const modal = document.getElementById("pdfPreviewModal");
                    const iframe = document.getElementById("pdfIframe");
                    iframe.src = worksheet;
                    modal.style.display = "flex"; // show centered

                    // Close modal
                    document.getElementById("closePreview").addEventListener("click", function() {
                        document.getElementById("pdfPreviewModal").style.display = "none";
                    });

                }


            })
        })
    } )( jQuery );