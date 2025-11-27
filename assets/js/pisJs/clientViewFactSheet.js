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
        // function for fetching the docket number details of the petitioner
        function getDocketNumberDetails () {
            __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                var result = result.response;
                var workSheetStatus = result.worksheetStatus;
                $(".table_body_tc").append(`
                    <tr>
                        <th> </th>
                        <th> ${result.docketNumber === null ? "N/A" : result.docketNumber} </th>
                        <th> N/A </th>
                        <th> N/A </th>
                        <th> N/A </th>
                        <th> N/A </th>
                        <th>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                              <span>${result.worksheetStatus}</span>
                              <a href="${api}/pis/worksheet_identifying_data?client_id=${client_id}&field_office_id=${client_fo}&status=${workSheetStatus}" class="text-primary">
                                <i class="fa fa-edit" aria-hidden="true"></i>
                              </a>
                            </div>
                        </th>
                        <th>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                              <span>${result.worksheetStatus}</span>

                              <div style="display: flex; gap: 8px;">
                                <a href="${api}/pis/psir_identifying_data?client_id=${client_id}&field_office_id=${client_fo}" class="text-primary">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                </a>
                                <a href="#" class="text-info btn_pdfPSIR">
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                </a>
                              </div>
                            </div>
                        </th>
                    </tr>
                `)
            })
            // ready if docket number is working again
            // __executeExternalGet('8000/docketbook/'+docket_number+'/'+officeId).done(function (result) {

            // })
        }


        // Utility to convert image file to Base64
        function loadImageToBase64(url) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        resolve(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            });
        }


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
                            $("#petitionerName").text(fullName)
                    } else {
                        fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
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
        loadUploadedDocuments("Investigation", client_id, client_fo)

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
            dataTable = null;
            loadUploadedDocuments("Investigation", client_id, client_fo)

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
            dataTable = null;
            loadUploadedDocuments("Supervision", client_id, client_fo)
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
                    <div class="tc-body" style="height: 500px; width: 100%; padding-top: 10px;">
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
            getDocketNumberDetails();
            $(".btn-addNotes").unbind("click").on("click", function(){
                $("#addOtherDocumentModal").modal("show")
            })
        })

        // event handler for printing psir v2 
            // $(document).off("click", ".btn_pdfPSIR").on("click", ".btn_pdfPSIR", function(e) {
            //     e.preventDefault();
            //     // var client_id   = client_id;
            //     var foid        = client_fo;

            //     function calculateAge(birthdate) {
            //         const currentDate = new Date();
            //         const birthDate = new Date(birthdate);

            //         let age = currentDate.getFullYear() - birthDate.getFullYear();

            //         // Check if the birthday has occurred this year
            //         const hasBirthdayOccurred = (
            //             currentDate.getMonth() > birthDate.getMonth() ||
            //             (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
            //         );

            //         // If the birthday hasn't occurred yet this year, subtract 1 from the age
            //         if (!hasBirthdayOccurred) {
            //             age--;
            //         }

            //         return age;
            //     }

            //     async function fetchData(url) {
            //         try {
            //             const response = await __executeExternalGet(url);
            //             if (response.response) {
            //                 return response.response;
            //             } else {
            //                 return response.files;
            //             }
            //         } catch (error) {
            //             console.error(`Error fetching data from ${url}`, error);
            //             throw error;
            //         }
            //     }

            //     async function getData(client_id, endpoint) {
            //         const url = `8000/worksheet/getPetitioner/${endpoint}/${client_id}`;
            //         return await fetchData(url);
            //     }

            //     async function getDataPetitioner(client_id) {
            //         const url = `8000/petitioner/${client_id}`;
            //         return await fetchData(url);
            //     }

            //     async function getPetitionerProfile() {
            //         const url = `8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`;
            //         return await fetchData(url);
            //     }

            //     async function fetchAllData(client_id) {
            //         try {
            //             const result2 = await getData(client_id, 'psirIdentifyingData');
            //             const result3 = await getData(client_id, 'psirPresentOffense');
            //             const result4 = await getData(client_id, 'psirPriorRecords');
            //             const result5 = await getData(client_id, 'psirFamilyBackground');
            //             const result6 = await getData(client_id, 'psirSocioEconomic');
            //             const result7 = await getData(client_id, 'psirResidenceEconomic');
            //             const result8 = await getData(client_id, 'psirSpouseChildren');
            //             const result9 = await getData(client_id, 'psirEducationHistory');
            //             const result10 = await getData(client_id, 'psirEmploymentHistory');
            //             const result11 = await getData(client_id, 'psirEnvironmentalFactor');
            //             const result12 = await getData(client_id, 'psirEvaluation');
            //             const result13 = await getData(client_id, 'psirRecommendation');
            //             const resultPetitioner = await getDataPetitioner(client_id);
            //             const resultPetitionerProfile = await getPetitionerProfile();

            //             // Process results as needed
            //             var result = resultPetitioner;
            //             var identifyingData = JSON.parse(result2.jsonData)
            //             var presentOffense = JSON.parse(result3.jsonData)
            //             var priorRecords = JSON.parse(result4.jsonData)
            //             var familyBackground = JSON.parse(result5.jsonData)
            //             var socioEconomic = JSON.parse(result6.jsonData)
            //             var residenceEconomic = JSON.parse(result7.jsonData)
            //             var spouseChildren = JSON.parse(result8.jsonData)
            //             var educationHistory = JSON.parse(result9.jsonData)
            //             var employmentHistory = JSON.parse(result10.jsonData)
            //             var environmentalFactor = JSON.parse(result11.jsonData)
            //             var evaluation = JSON.parse(result12.jsonData)
            //             var recommendation = JSON.parse(result13.jsonData)

            //             var petitionerProfileId = resultPetitionerProfile;

            //             // Create a new jsPDF instance
            //             const doc = new jsPDF('p', 'mm', 'a4');                 
            //             // Define constants
            //             const pageWidth = doc.internal.pageSize.width;
            //             const pageHeight = doc.internal.pageSize.height;

            //             // const margin = 20; // margin from left 
            //             const lineHeight = 7; // spacing between contents
            //             const maxContentHeight = pageHeight - 10; // leave room for footer (bottom 20px)
            //             let yCoordinate = ""; // initialize the y coordinate as empty (will be updated as soon the text is drawn in the page)
            //             let pageNumber = 1; // initialize the page header
            //             let topMargin = "";  
            //             const bottomMargin = 10;
            //             const textVerticalAdjust = 1.5;       // raise text above underline

            //             const logo = await loadImageToBase64("images/pis_logo.png");
            //             const petitionerProfilePicture = await loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId[0].id}`);

            //             // Utility to auto-wrap text, manage page breaks, and conditionally draw underline
            //             function drawLeftText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
            //                 let newY = y;
            //                 const underlineStartX = x + textOffset;
            //                 const underlineEndX = underlineStartX + underlineLength;

            //                 // Determine needed height for the text block
            //                 const wrappedText = (value && value.trim() !== "")
            //                     ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
            //                     : [];
            //                 const neededHeight = (wrappedText.length || 1) * lineHeight;

            //                 // Page break check before drawing
            //                 if (newY + neededHeight + bottomMargin > maxContentHeight) {
            //                     doc.addPage();
            //                     addHeader("");
            //                     // addFooter()
            //                     newY = topMargin;
            //                 }

            //                 // Apply vertical adjust only if underline exists
            //                 const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

            //                 // Draw label
            //                 doc.setFont(font, fontWeight);
            //                 doc.setFontSize(fontSize);
            //                 doc.text(label, x, newY - yAdjust);

            //                 // Draw underline if needed
            //                 if (underlineLength && underlineLength > 0) {
            //                     doc.setLineWidth(0.2);
            //                     doc.line(underlineStartX, newY, underlineEndX, newY);
            //                 }

            //                 // Draw wrapped value
            //                 if (wrappedText.length > 0) {
            //                     wrappedText.forEach((line, i) => {
            //                         // Check per-line page overflow
            //                         if (newY + lineHeight > maxContentHeight - bottomMargin) {
            //                             doc.addPage();
            //                             addHeader("");
            //                             // addFooter()
            //                             newY = topMargin;
            //                         }

            //                         const textY = newY - yAdjust + i * lineHeight;
            //                         doc.text(line, underlineStartX + 1, textY);
            //                     });
            //                     newY += wrappedText.length * lineHeight;
            //                 } else {
            //                     newY += lineHeight;
            //                 }

            //                 return newY;
            //             }
            //             // Utility to auto-wrap text, manage page breaks, and conditionally draw underline
            //             function drawRightText(label, value, x, y, font, fontWeight, fontSize, textOffset, underlineLength) {
            //                 let newY = y;
            //                 const underlineStartX = x + textOffset;
            //                 const underlineEndX = underlineStartX + underlineLength;

            //                 // Determine needed height for the text block
            //                 const wrappedText = (value && value.trim() !== "")
            //                     ? doc.splitTextToSize(value, underlineLength > 0 ? underlineLength : 100)
            //                     : [];
            //                 const neededHeight = (wrappedText.length || 1) * lineHeight;

            //                 // Page break check before drawing
            //                 if (newY + neededHeight + bottomMargin > maxContentHeight) {
            //                     doc.addPage();
            //                     addHeader("");
            //                     // addFooter()
            //                     newY = topMargin;
            //                 }

            //                 // Apply vertical adjust only if underline exists
            //                 const yAdjust = (underlineLength && underlineLength > 0) ? textVerticalAdjust : 0;

            //                 // Draw label
            //                 doc.setFont(font, fontWeight);
            //                 doc.setFontSize(fontSize);
            //                 doc.text(label, x, newY - yAdjust);

            //                 // Draw underline if needed
            //                 if (underlineLength && underlineLength > 0) {
            //                     doc.setLineWidth(0.2);
            //                     doc.line(underlineStartX, newY, underlineEndX, newY);
            //                 }

            //                 // Draw wrapped value
            //                 if (wrappedText.length > 0) {
            //                     wrappedText.forEach((line, i) => {
            //                         // Check per-line page overflow
            //                         if (newY + lineHeight > maxContentHeight - bottomMargin) {
            //                             doc.addPage();
            //                             addHeader("");
            //                             // addFooter()
            //                             newY = topMargin;
            //                         }

            //                         const textY = newY - yAdjust + i * lineHeight;
            //                         doc.text(line, underlineStartX + 1, textY);
            //                     });
            //                     newY += wrappedText.length * lineHeight;
            //                 } else {
            //                     newY += lineHeight;
            //                 }

            //                 return newY;
            //             }
            //             // for textWrapping of the texts position at the center
            //             function drawCenterText(text, y, fontWeight = 'normal', fontSize = 12, maxWidth = 100) {
            //                 doc.setFontSize(fontSize);
            //                 doc.setFont('helvetica', fontWeight);

            //                 const pageWidth = doc.internal.pageSize.width;
            //                 const wrappedText = doc.splitTextToSize(text, maxWidth);
            //                 const lineHeight = 6;

            //                 wrappedText.forEach(line => {
            //                     // Check if we’re near the bottom of the page
            //                     if (y + lineHeight > 250) {
            //                         doc.addPage();
            //                         addHeader("");
            //                         y = topMargin + 5; // reset top margin for new page
            //                         doc.setFontSize(fontSize);
            //                         doc.setFont('helvetica', fontWeight);
            //                     }

            //                     const textWidth = doc.getTextWidth(line);
            //                     const x = (pageWidth - textWidth) / 2; // horizontally center
            //                     doc.text(line, x, y);
            //                     y += lineHeight;
            //                 });

            //                 return y;
            //             }
            //             // for documents note that will occupy all the max width of the page
            //             function drawTextBlock(text, x, y, lineHeight, maxWidth = 190) {
            //                 const pageHeight = doc.internal.pageSize.height; // total page height
            //                 const pageWidth = doc.internal.pageSize.width;   // total page width

            //                 // make sure the text does not go beyond the allowed content width
            //                 const contentRightLimit = x + maxWidth;
            //                 if (contentRightLimit > pageWidth - 10) { // safety margin
            //                     maxWidth = pageWidth - x - 10;
            //                 }

            //                 // split text to fit within the max width
            //                 const lines = doc.splitTextToSize(text, maxWidth);

            //                 for (let i = 0; i < lines.length; i++) {
            //                     // if reaching bottom of the page, add new page
            //                     if (y + lineHeight > maxContentHeight - bottomMargin) {
            //                         doc.addPage();
            //                         addHeader("");
            //                         y = topMargin; // reset y for new page
            //                         doc.setFont("helvetica", "normal");
            //                         doc.setFontSize(10)
            //                     }

            //                     doc.text(lines[i], x, y);
            //                     y += lineHeight;
            //                 }

            //                 // return the final Y position (useful if chaining text blocks)
            //                 return y;
            //             }

            //             function addHeader(pageNumber) {
            //                 let fullName = "";
            //                 let leftY = 10;
            //                 let rightY = 10;

            //                 if ( result.firstName === null &&
            //                      result.middleName === null &&
            //                      result.lastName === null &&
            //                      result.suffixName === null ) {
        
            //                         fullName = result.fullName;
            //                 } else {
            //                     fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
            //                 }

            //                 // Left top of the header
            //                 leftY = drawLeftText("", "", 10, leftY, "helvetica", "normal", 10, 3)
            //                 leftY = drawLeftText("p.", pageNumber, 10, leftY, "helvetica", "bold", 10, 3)
            //                 doc.setFont("helvetica", "bold")
            //                 doc.setFontSize(10);
            //                 doc.text(`PSIR Re:`, 10, leftY);
            //                 leftY = drawLeftText("", fullName.toUpperCase(), 20, leftY, "helvetica", "normal", 10, 6)
            //                 doc.setFont("helvetica", "bold")
            //                 doc.setFontSize(10);
            //                 doc.text(`Criminal Case Number:`, 10, leftY);
            //                 leftY = drawLeftText("", result.criminalCaseNo, 44, leftY, "helvetica", "normal", 10, 6)

            //                 // Right top section
            //                 rightY = drawRightText("PPA FORM 3", "", 165, rightY, "helvetica", "bold", 10, 0)
            //                 rightY = drawRightText("REVISION 002", "", 165, rightY, "helvetica", "bold", 10, 0)
            //                 doc.setFont("helvetica", "bold")
            //                 doc.setFontSize(10);
            //                 doc.text("Investigation Docket:", 120, rightY);
            //                 rightY = drawRightText("", `${result.docketNumber ?? "N/A"}`, 150, rightY, "helvetica", "normal", 10, 6)

            //                 // update the y coordinate
            //                 if (leftY > rightY) {
            //                     yCoordinate = leftY;
            //                     topMargin = leftY
            //                 } else {
            //                     yCoordinate = rightY;
            //                     topMargin = rightY;
            //                 }

            //                 // addFooter();
            //                 doc.setFont("helvetica", "normal")
            //             }
            //             addHeader(`${pageNumber}`)

            //             // function for printing the logo and picture of the petitioner
            //             function logoAndPicture () {
            //                 // ppa logo
            //                 let leftY = yCoordinate;
            //                 let rightY = yCoordinate;
            //                 let centerY = yCoordinate
            //                 doc.addImage(logo, 'PNG', 10, leftY, 30, 30); // x, y, width, height
            //                 // petitioner profile
            //                 doc.addImage(petitionerProfilePicture, 'PNG', 165, rightY, 35, 35)
            //                 // fetching of regional name
                            
            //                 // Centered text section
            //                 centerY = drawCenterText('', centerY, 'normal', 11);
            //                 centerY = drawCenterText('Republic of the Philippines', centerY, 'normal', 11);
            //                 centerY = drawCenterText('Department of Justice', centerY, 'bold', 11);
            //                 doc.setTextColor(241, 99, 117, 1)
            //                 centerY = drawCenterText('PAROLE AND PROBATION ADMINISTRATION', centerY, 'bold', 11);
            //                 centerY = drawCenterText('REGION NAME', centerY, 'bold', 11);
            //                 centerY = drawCenterText(`${$.cookie('departmentName').toUpperCase() ?? "N/A"}`, centerY, 'bold', 11);

            //                 // ensure that the y coordinate will not overlap with the picture and logo and also set the new y coordinate below the logo and picture for the next content;
            //                 if (centerY > centerY + 10) {
            //                     yCoordinate = centerY;
            //                 } else {
            //                     yCoordinate = centerY + 10;
            //                 }
            //             }
            //             logoAndPicture();

            //             // for post investigation header
            //             function postInvestigationReportHeader () {
            //                 var leftY = yCoordinate;
            //                 var centerY = yCoordinate + 5;
            //                 // Draw the rectangle border for post investigation title
            //                 doc.setTextColor(1, 0, 0, 1)
            //                 doc.rect(10, leftY, 190, 7);
            //                 centerY = drawCenterText('POST-SENTENCE INVESTIGATION REPORT', centerY, 'bold', 11);
            //                 centerY = drawCenterText('', centerY, 'bold', 11); // put some space for next content
                            
            //                 //set the new coordinate of y for next content
            //                 yCoordinate = centerY;
            //             }
            //             postInvestigationReportHeader()

            //             function drawIdentifyingData () {
            //                 let centerY = yCoordinate;
            //                 centerY = drawCenterText('I.    IDENTIFYING DATA', centerY, 'bold', 11);
            //                 let leftY = centerY + 5; // re initialize the left y coordinate after the identifying data title (add 5 for the lineHeight)
            //                 leftY = drawLeftText("PETIONER'S NAME:", identifyingData.name, 14, leftY, "helvetica", "normal", 10, 35, 150) // label, value, xLeft, yLeft, font, fontWeight, fontSize, textOffset, underlineLength
            //                 doc.setFont('helvetica','italic')
            //                 doc.setFontSize(8);
            //                 doc.text(`(per court records)`, 20,leftY)
            //                 doc.text(`(Last Name)`, 57, leftY)
            //                 doc.text(`(First Name)`, 107, leftY)
            //                 doc.text(`(Middle Name)`, 157, leftY)
            //                 leftY = leftY + 10; // initialize the leftY again after fname mname and lname
            //                 leftY = drawLeftText("True Name:", identifyingData.trueName, 14, leftY, "helvetica", "normal", 10, 20, 165)
            //                 let rightY = leftY; // reinitialize the rightY to match the leftY position
            //                 // Left Column of Identifying data
            //                 leftY = drawLeftText("Alias/es:", identifyingData.alias, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Sex:", identifyingData.sex, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Gender Preference:", identifyingData.genderPreference, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Birthday:", identifyingData.birthday, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Age:", identifyingData.age, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Civil Status:", identifyingData.civilStatus, 14, leftY, "helvetica", "normal", 10, 35, 50);
            //                 leftY = drawLeftText("Spouse:", identifyingData.spouse, 14, leftY, "helvetica", "normal", 10, 35, 50);

            //                 // right column of identifying data
            //                 rightY = drawRightText("Education Attainment:", identifyingData.education, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("Religion:", identifyingData.religion, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("Occupation:", identifyingData.occupation, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("Nationality:", identifyingData.nationality, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("Mother:", identifyingData.mother, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("(Maiden Name):", identifyingData.maidenName, 110, rightY, "helvetica", "normal", 10, 35, 54);
            //                 rightY = drawRightText("Father:", identifyingData.father, 110, rightY, "helvetica", "normal", 10, 35, 54);

            //                 if (leftY > rightY) { // update the y coordinate
            //                     yCoordinate = leftY;
            //                 } else {
            //                     yCoordinate = rightY;
            //                 }

            //                 leftY = yCoordinate; // re-initialize again the leftY for reuse
            //                 leftY = drawLeftText("", "", 14, leftY, "helvetica", "normal", 10, 40)
            //                 leftY = drawLeftText("Identifying/Remarkable Features:", identifyingData.remarks, 14, leftY, "helvetica", "normal", 10, 55, 130)
            //                 leftY = drawLeftText("Present Address:", identifyingData.presentAddress, 14, leftY, "helvetica", "normal", 10, 30, 155)
            //                 leftY = drawLeftText("Permanent Address:", identifyingData.permanentAdress, 14, leftY, "helvetica", "normal", 10, 35, 150)

            //                 yCoordinate = leftY; // set the updated y coordinate
            //             }
            //             drawIdentifyingData();

            //             function drawCriminalHistory () {
            //                 let centerY = yCoordinate;
            //                 centerY = drawCenterText('II.   CRIMINAL HISTORY', centerY, 'bold', 11);
            //                 let leftY = centerY;
            //                 leftY = drawLeftText("A. PRESENT OFFENSE", "", 14, leftY, "helvetica", "bold", 10, 40)
            //                 let rightY = leftY; // intialize the right y after the present offense title for alignment
            //                 // left column criminal history
            //                 leftY = drawLeftText("Charge With:", "", 14, leftY, "helvetica", "normal", 10, 40)
            //                 leftY = drawLeftText("Convicted of:", "", 14, leftY, "helvetica", "normal", 10, 40)
            //                 leftY = drawLeftText("Sentence:", "", 14, leftY, "helvetica", "normal", 10, 40)
            //                 leftY = drawLeftText("Judge:", "", 14, leftY, "helvetica", "normal", 10, 40)

            //                 // right column criminal history
            //                 rightY = drawRightText("Date:", "", 110, rightY, "helvetica", "normal", 10, 40)
            //                 rightY = drawRightText("Date:", "", 110, rightY, "helvetica", "normal", 10, 40)
            //                 rightY = drawRightText("", "", 110, rightY, "helvetica", "normal", 10, 40)
            //                 rightY = drawRightText("Court:", "", 110, rightY, "helvetica", "normal", 10, 40)


            //                 if (leftY > rightY) { // update the y coordinate
            //                     yCoordinate = leftY;
            //                 } else {
            //                     yCoordinate = rightY;
            //                 }

            //                 leftY = yCoordinate; // re initialize the left y coordinate for part 2 of crim history

            //                 // draw the circle of custodial status before the custodial status for alignment purpose;
            //                 doc.setFont('helvetica', 'normal');
            //                 doc.setFontSize(10);
            //                 doc.circle(45, leftY - 2, 2);
            //                 doc.text("On Bail", 50, leftY);
            //                 doc.circle(70, leftY - 2, 2);
            //                 doc.text("On Detention", 75, leftY);
            //                 leftY = drawLeftText("Custodial Status:", "", 14, leftY, "helvetica", "normal", 10, 40)
            //                 doc.circle(45, leftY - 2, 2);
            //                 leftY = drawLeftText("ROR - Custodian:", "", 50, leftY, "helvetica",  "normal", 10, 30, 115); // draw the ror custodian after the custodial status
            //                 leftY = drawLeftText("Address:", "", 50, leftY, "helvetica", "normal", 10, 20, 125);
            //                 leftY = drawLeftText("", "", 14, leftY, "helvetica", "bold", 10, 40)
            //                 leftY = drawLeftText("B. PRIOR RECORDS", "", 14, leftY, "helvetica", "bold", 10, 40)

            //                 // Table headers
            //                 var headers = [
            //                     {title: "Agency", dataKey: "agency"},
            //                     {title: "Criminal Case No.", dataKey: "cc_no"}, 
            //                     {title: "Offense", dataKey: "offense"}, 
            //                     {title: "Date Charged", dataKey: "when"}, 
            //                     {title: "Decision/Status of the Case", dataKey: "decision"}, 
            //                 ];
                            
            //                 // Table rows (array of arrays)
            //                 const data = priorRecords.priorRecord;
            //                 // Draw the table
            //                 doc.autoTable(headers, data, {
            //                     startY: leftY, // Y position on page 
            //                     theme: 'plain', // Options: 'plain', 'striped', 'grid'
            //                     // pageBreak: 'always',
            //                     // tableWidth: pageWidth,
            //                     styles: {
            //                         lineWidth: 0.1,          // border thickness
            //                         lineColor: [0, 0, 0],    // border color (black)
            //                         columnWidth: 'wrap',
            //                         overflow: 'linebreak',
            //                     },
            //                     columnStyles: {
            //                         4: {columnWidth: 'auto'}
            //                     },
            //                     headStyles: {
            //                         lineWidth: 0.2,
            //                         lineColor: [0, 0, 0],
            //                         fontStyle: 'bold',
            //                     },
            //                     bodyStyles: {
            //                         lineWidth: 0.1,
            //                         lineColor: [0, 0, 0],
            //                     },
            //                 });

            //                 leftY = doc.autoTable.previous.finalY + 5;
            //                 doc.setFont("helvetica","italic");
            //                 leftY = drawTextBlock("Note: If records check results are not yet received, write this: “The office reserves the right to submit supplemental report once records verification from the institutions and/or law-enforcement agencies yields derogatory result or previous criminal records”. Also attach the Sinumpaang Salaysay.", 14, leftY, 10)
            //                 yCoordinate = leftY;
            //             }
            //             drawCriminalHistory();

            //             function drawSocioEconomic () {
            //                 let centerY = yCoordinate + 10;
            //                 centerY = drawCenterText('III.  SOCIO-ECONOMIC BACKGROUND', centerY, 'bold', 11);

            //                 let leftY = centerY + 5;
            //                 let famY = centerY + 5; // y coordinate for family relationship part
            //                 let rightY = centerY + 5;
            //                 leftY = drawLeftText("A. Family Economic Status", "", 16, leftY, "helvetica", "normal", 10, 0)
            //                 doc.line(14, leftY - 5, 70, leftY - 5);

            //                 // Helper for checkbox
            //                 function checkbox(x, y, checked = false) {
            //                     doc.rect(x, y, 4, 4); // Draw the checkbox outline
            //                     if (checked) {
            //                         // Draw a checkmark (✓)
            //                         doc.rect(x, y, 4, 4, 'F');
            //                     }
            //                 }

            //                 // for family economic status checkboxes
            //                 const economicStatus = [
            //                     "Poor",
            //                     "Low-income Class (but not poor)",
            //                     "Lower Middle- Income Class",
            //                     "Middle Middle- Income Class",
            //                     "Upper Middle- Income Class",
            //                     "Upper-Income Class (but not rich)",
            //                     "Rich"
            //                 ];
            //                 let xText = 25;
            //                 economicStatus.forEach((txt, i) => {
            //                     const isChecked = txt.trim().toLowerCase() === socioEconomic.eco_status.trim().toLowerCase(); // Check if current option matches API value (case-insensitive)
            //                     // const isChecked = txt.toLowerCase().includes(socioEconomic.eco_status.toLowerCase()); 
            //                     checkbox(16, leftY + i * 7, isChecked);
            //                     doc.text(txt, xText, leftY + 4 + i * 7);
            //                     yCoordinate = leftY + 4 + i * 7;
            //                 });

            //                 centerY = drawLeftText("B. Family Relationship", "", 90, famY, "helvetica", "normal", 10, 0)
            //                 doc.line(88, leftY - 5, 130, leftY - 5);
            //                 var familyRelationshipStatus = ["Very satisfactory", "Satisfactory", "Poor"];
            //                 familyRelationshipStatus.forEach((txt, i) => {
            //                     const isChecked = txt.trim().toLowerCase() === socioEconomic.family_rel.trim().toLowerCase();
            //                     checkbox(90 + 2, centerY + i * 7, isChecked);
            //                     doc.text(txt, 90 + 10, centerY + 4 + i * 7);
            //                 });

            //                 rightY = drawRightText("C. Family Reputation", "", 140, rightY, "helvetica", "normal", 10, 0)
            //                 doc.line(138, leftY - 5, 180, leftY - 5);
            //                 var familyReputation = ["Very satisfactory", "Satisfactory", "Family reputation is undesirable"];
            //                 familyRelationshipStatus.forEach((txt, i) => {
            //                     const isChecked = txt.trim().toLowerCase() === socioEconomic.family_rep.trim().toLowerCase();
            //                     checkbox(140 + 2, rightY + i * 7, isChecked);
            //                     doc.text(txt, 140 + 10, rightY + 4 + i * 7);
            //                 });

            //                 leftY = yCoordinate + 10;
            //                 centerY = yCoordinate + 10;
            //                 rightY = yCoordinate + 10;
            //                 leftY = drawLeftText("D. Family Support", "", 16, leftY, "helvetica", "normal", 10, 0)
            //                 doc.line(14, leftY - 5, 70, leftY - 5);
            //                 var familySupport = ["Very satisfactory", "Satisfactory", "Poor"];
            //                 familySupport.forEach((txt, i) => {
            //                     checkbox(16, leftY + i * 7);
            //                     doc.text(txt, xText, leftY + 4 + i * 7);
            //                     yCoordinate = leftY + 4 + i * 7;
            //                 });

            //                 centerY = drawLeftText("E. Community Acceptability", "", 90, centerY, "helvetica", "normal", 10, 0)
            //                 doc.line(88, centerY - 5, 130, centerY - 5);
            //                 var communityAcceptability = ["Very satisfactory", "Satisfactory", "Poor"];
            //                 communityAcceptability.forEach((txt, i) => {
            //                     const isChecked = txt.trim().toLowerCase() === environmentalFactor.comAcceptance.trim().toLowerCase();
            //                     checkbox(90 + 2, centerY + i * 7);
            //                     doc.text(txt, 90 + 10, centerY + 4 + i * 7);
            //                 });

            //                 rightY = drawLeftText("F. Overall Well-being", "", 140, rightY, "helvetica", "normal", 10, 0)
            //                 doc.line(138, rightY - 5, 180, rightY - 5);
            //                 var overallWellbeing = ["Very satisfactory", "Satisfactory", "Poor"];
            //                 overallWellbeing.forEach((txt, i) => {
            //                     const isChecked = txt.trim().toLowerCase() === employmentHistory.empHealth.trim().toLowerCase();
            //                     checkbox(140 + 2, rightY + i * 7);
            //                     doc.text(txt, 140 + 10, rightY + 4 + i * 7);
            //                 });

            //                 yCoordinate = yCoordinate + 10;
            //             }
            //             drawSocioEconomic();

            //             function drawAnalysis () {
            //                 let centerY = yCoordinate + 10;
            //                 centerY = drawCenterText('IV.  ANALYSIS AND EVALUATION', centerY, 'bold', 11);

            //                 let leftY = centerY + 5;
            //                 doc.setFont("helvetica", "normal")
            //                 leftY = drawTextBlock(evaluation.analysisAndEvaluation, 14, leftY, 7)
            //                 yCoordinate = leftY;
            //             }
            //             drawAnalysis();

            //             function drawProjectedThrust () {
            //                 let centerY = yCoordinate + 10;
            //                 centerY = drawCenterText('V. PROJECTED THRUSTS OF REHABILITATION', centerY, 'bold', 11);

            //                 let leftY = centerY + 5;
            //                 doc.setFont("helvetica", "normal")
            //                 leftY = drawTextBlock(evaluation.projectedThrust, 14, leftY, 7)

            //                 yCoordinate = leftY + 10
            //             }
            //             drawProjectedThrust();

            //             function drawRecommendation () {
            //                 let centerY = yCoordinate;

            //                 let fullName = "";

            //                 if ( result.firstName === null &&
            //                      result.middleName === null &&
            //                      result.lastName === null &&
            //                      result.suffixName === null ) {
        
            //                         fullName = result.fullName;
            //                 } else {
            //                     fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
            //                 }

            //                 centerY = drawCenterText('VI. RECOMMENDATION', centerY, 'bold', 11);
            //                 centerY = drawCenterText('(FOR CASES WITH PENDING RESULTS OF RECORDS CHECK OR GIOR)', centerY, 'normal', 11);

            //                 let leftY = centerY + 5;
            //                 doc.setFont("helvetica", "normal")
            //                 leftY = drawTextBlock(`     WHEREFORE, in view of the foregoing, pending the result/s of the NBI/CMRD/Others (specify)/Courtesy Investigation Results from ______________________, it is respectfully recommended to the Honorable Court that the petition for probation of ${fullName.toUpperCase()} be ${recommendation.grant.toUpperCase()}, subject to the following conditions:`, 14, leftY, 7)
            //                 var recommendationList = recommendation.recommendations;
            //                 leftY = leftY + 5;
            //                 console.log(recommendationList)

            //                 for (var i = 0; i < recommendationList.length; i++){
            //                     var row = [recommendationList[i].recs];
                                
            //                     for (var k = 0; k < row.length; k++){
            //                         var rowValue = row[k];
            //                         leftY = drawTextBlock(`${i + 1}.)   ${rowValue}`, 14, leftY, 7)
            //                     }
            //                 }
            //                 leftY = leftY + 3;
            //                 leftY = drawTextBlock(`     In the event that petitioner fails to observe the preceding conditions and/or has committed any material misrepresentation in his/her application for probation, his/her probation may be revoked by the Court or the conditions thereof modified`, 14, leftY, 7)
                            
            //                 leftY = leftY + 3;
            //                 leftY = drawTextBlock(`     City/Municipality, Province, Philippines, Date.`, 14, leftY, 7)

            //                 yCoordinate = leftY;
            //             }
            //             drawRecommendation();

            //             function drawSignature () {
            //                 let leftY = yCoordinate + 10;
            //                 let rightY = yCoordinate + 10;
            //                 leftY = drawLeftText("Prepared and submitted by:", "", 14, leftY, "helvetica", "normal", 10, 10)
            //                 leftY = leftY + 5;
            //                 leftY = drawLeftText("NAME OF INVESTIGATING OFFICER:", "", 14, leftY, "helvetica", "bold", 10, 10)
            //                 leftY = drawLeftText("Position", "", 14, leftY, "helvetica", "normal", 10, 10)
            //                 leftY = drawLeftText("Date:", "", 14, leftY, "helvetica", "normal", 10, 10, 40)

            //                 rightY = drawRightText("Reviewed and approved by:", "", 110, rightY, "helvetica", "normal", 10, 10)
            //                 rightY = rightY + 5;
            //                 rightY = drawLeftText("HEAD OF THE FIELD OFFICE:", "", 110, rightY, "helvetica", "bold", 10, 10)
            //                 rightY = drawLeftText("Position", "", 110, rightY, "helvetica", "normal", 10, 10)
            //                 rightY = drawLeftText("Date:", "", 110, rightY, "helvetica", "normal", 10, 10, 40)
            //             }
            //             drawSignature();
            //             // Function for reusable footer
            //             function addFooter() {
            //                 drawCenterText('CONFIDENTIAL', maxContentHeight + 5, 'bold', 12)
            //             }
            //             // addFooter()



            //             // Instead of saving, generate a Blob for preview
            //             const pdfBlob = doc.output('blob');
            //             const PSIR = URL.createObjectURL(pdfBlob);

            //             // Show modal and load PDF
            //             const modal = document.getElementById("pdfPreviewModal");
            //             const iframe = document.getElementById("pdfIframe");
            //             iframe.src = PSIR;
            //             modal.style.display = "flex"; // show centered

            //             // Close modal
            //             document.getElementById("closePreview").addEventListener("click", function() {
            //                 document.getElementById("pdfPreviewModal").style.display = "none";
            //             });
            //         } catch (error) {
            //             console.error('Error fetching data:', error);
            //         }
            //     }
            //     fetchAllData(client_id);
            // });
        // event handler for printing psir v2 

        $(document).off("click", ".btn_pdfPSIR").on("click", ".btn_pdfPSIR", function(e) {
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

            async function fetchData(url) {
                try {
                    const response = await __executeExternalGet(url);
                    if (response.response) {
                        return response.response;
                    } else {
                        return response.files;
                    }
                } catch (error) {
                    console.error(`Error fetching data from ${url}`, error);
                    throw error;
                }
            }

            async function getData(client_id, endpoint) {
                const url = `8000/worksheet/getPetitioner/${endpoint}/${client_id}`;
                return await fetchData(url);
            }

            async function getDataPetitioner(client_id) {
                const url = `8000/petitioner/${client_id}`;
                return await fetchData(url);
            }

            async function getPetitionerProfile() {
                const url = `8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`;
                return await fetchData(url);
            }

            async function fetchAllData(client_id) {
                try {
                    const result2 = await getData(client_id, 'psirIdentifyingData');
                    const result3 = await getData(client_id, 'psirPresentOffense');
                    const result4 = await getData(client_id, 'psirPriorRecords');
                    const result5 = await getData(client_id, 'psirFamilyBackground');
                    const result6 = await getData(client_id, 'psirSocioEconomic');
                    const result7 = await getData(client_id, 'psirResidenceEconomic');
                    const result8 = await getData(client_id, 'psirSpouseChildren');
                    const result9 = await getData(client_id, 'psirEducationHistory');
                    const result10 = await getData(client_id, 'psirEmploymentHistory');
                    const result11 = await getData(client_id, 'psirEnvironmentalFactor');
                    const result12 = await getData(client_id, 'psirEvaluation');
                    const result13 = await getData(client_id, 'psirRecommendation');
                    const resultPetitioner = await getDataPetitioner(client_id);
                    const resultPetitionerProfile = await getPetitionerProfile();

                    // Process results as needed
                    var result = resultPetitioner;
                    var identifyingData = JSON.parse(result2.jsonData)
                    var presentOffense = JSON.parse(result3.jsonData)
                    var priorRecords = JSON.parse(result4.jsonData)
                    var familyBackground = JSON.parse(result5.jsonData)
                    var socioEconomic = JSON.parse(result6.jsonData)
                    var residenceEconomic = JSON.parse(result7.jsonData)
                    var spouseChildren = JSON.parse(result8.jsonData)
                    var educationHistory = JSON.parse(result9.jsonData)
                    var employmentHistory = JSON.parse(result10.jsonData)
                    var environmentalFactor = JSON.parse(result11.jsonData)
                    var evaluation = JSON.parse(result12.jsonData)
                    var recommendation = JSON.parse(result13.jsonData)

                    var petitionerProfileId = resultPetitionerProfile;

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

                    const logo = await loadImageToBase64("images/pis_logo.png");
                    const petitionerProfilePicture = await loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId[0].id}`);

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
                            const underlineXEnd = newX + lineLength;

                            if (value) {
                                doc.text(value, underlineXStart, y);
                                const valueWidth = doc.getTextWidth(value);
                                doc.line(underlineXStart + valueWidth + 1, y + lineOffset, underlineXEnd, y + lineOffset);
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
                        let fullName = "";
                        let leftY = 10;
                        let rightY = 10;

                        if ( result.firstName === null &&
                             result.middleName === null &&
                             result.lastName === null &&
                             result.suffixName === null ) {
    
                                fullName = result.fullName;
                        } else {
                            fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                        }

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
                        leftY = drawLeftText("PETIONER'S NAME:", identifyingData.name, 14, leftY, "helvetica", "normal", 10, 35, 150) // label, value, xLeft, yLeft, font, fontWeight, fontSize, textOffset, underlineLength
                        doc.setFont('helvetica','italic')
                        doc.setFontSize(8);
                        // doc.text(`(per court records)`, 20,leftY)
                        doc.text(`(Last Name)`, 57, leftY)
                        doc.text(`(First Name)`, 107, leftY)
                        doc.text(`(Middle Name)`, 157, leftY)
                        yCoordinate = leftY + 10; // initialize the leftY again after fname mname and lname

                        let pos = drawAutoText (`True Name:`, identifyingData.trueName, 14, yCoordinate, true)
                        pos = drawAutoText (`Source Info:`, identifyingData.sourceInfo, pos.x+20, pos.y, true)

                        pos = drawAutoText (`Alias(es):`, identifyingData.alias, 14, pos.y+6, true) // add by 6 every other next line
                        pos = drawAutoText (`Height (meters):`, identifyingData.height, pos.x+20, pos.y, true)
                        pos = drawAutoText (`Weight (kilos):`, identifyingData.weight, pos.x+20, pos.y, true)
                        pos = drawAutoText (`Age:`, identifyingData.age, 14, pos.y+6, true) // add another 6 for next line
                        pos = drawAutoText (`Sex:`, identifyingData.sex, pos.x+20, pos.y, true)
                        pos = drawAutoText (`Citizenship:`, identifyingData.citizenship, pos.x+20, pos.y, true)
                        pos = drawAutoText (`Religion:`, identifyingData.religion, pos.x+20, pos.y, true)

                        pos = drawAutoText (`Identifying Marks:`, identifyingData.marks, 14, pos.y+6, true)
                        pos = drawAutoText (`Present Address:`, identifyingData.presentAddress, 14, pos.y+6, true)
                        pos = drawAutoText (`Permanent Address:`, identifyingData.permanentAdress, 14, pos.y+6, true)

                        yCoordinate = pos.y;
                    }
                    drawIdentifyingData();
                    function drawCriminalHistory () {
                        let centerY = yCoordinate + 10;
                        centerY = drawCenterText('II.    CRIMINAL HISTORY', centerY, 'normal', 11);
                        let leftY = centerY + 5;

                        let posLeft = drawAutoText (`A. PRESENT OFFENSE`, "", 14, leftY)
                        posLeft = drawAutoText (`Charged With:`, "", 20, posLeft.y+6, true, 95, 20)
                        posLeft = drawAutoText (`Convicted of:`, "", 20, posLeft.y+6, true, 95, 20)

                        yCoordinate = posLeft.y + 6;
                        let pos = drawAutoText (`Sentence:`, "", 20, yCoordinate, true, 95, 20)
                        
                        posLeft.y = pos.y;
                        posLeft = drawAutoText (`Judge:`, "", 20, posLeft.y+6, true, 95, 20)
                        posLeft = drawAutoText (`Defense Counsel:`, "", 20, posLeft.y+6, true, 95, 20)
                        posLeft = drawAutoText (`Offended Party:`, "", 20, posLeft.y+6, true, 95, 20)

                        
                        let rightY = centerY + 12;
                        let posRight = drawAutoText (`Date:`, "", 110, rightY, true, 95, 115)
                        posRight = drawAutoText (`Date:`, "", 110, posRight.y, true, 95, 115)
                        posRight.y = pos.y;
                        posRight = drawAutoText (`Court:`, "", 110, posRight.y+6, true, 95, 115)
                        posRight = drawAutoText (`Address:`, "", 110, posRight.y, true, 95, 115)
                        posRight = drawAutoText (`Address:`, "", 110, posRight.y, true, 95, 115)

                        if (posLeft.y > posRight.y) {
                            yCoordinate = posLeft.y;
                        } else {
                            yCoordinate = posRight.y;
                        }

                        posLeft = drawAutoText("Custody Status:", "", 20, yCoordinate)
                        let posRadio = drawRadioButton("On Bail", posLeft.x, posLeft.y, false, false, "", 190, 20);
                        var rorPosX = posRadio.x;
                        var addPosX = posRadio.x;
                        posRadio = drawRadioButton("On Detention", posRadio.x, posRadio.y, false, false, "", 190, 20);
                        posRadio = drawRadioButton("Period of Detention", posRadio.x, posRadio.y, false, true, "", 190, 20);
                        // Next line
                        posRadio = drawRadioButton("ROR – Custodian", rorPosX, posRadio.y + 6, false, true, "", 190, 20);
                        // Next Line
                        posLeft = drawAutoText("Address:", "", addPosX + 5, posRadio.y + 6)

                        posLeft = drawAutoText("Manner of Commission (Narrative)", "", 20, posLeft.y + 8)
                        // Next Line
                        posLeft = drawAutoText("Age at time of commission–Extent of Participation:", "", 20, posLeft.y + 6)
                        posRadio.x = posLeft.x;
                        posRadio.y = posLeft.y;
                        posRadio = drawRadioButton("Principal", posRadio.x, posRadio.y, false, false, "", 190, 20);
                        posRadio = drawRadioButton("Accomplice", posRadio.x, posRadio.y, false, false, "", 190, 20);
                        posRadio = drawRadioButton("Accessory", posRadio.x, posRadio.y, false, false, "", 190, 20);

                        posLeft.y += 8;

                        posLeft = drawAutoText("I.  Offender's Statement:", "", 25, posLeft.y);
                        posLeft = drawAutoText("", "", 30, posLeft.y + 6, true, 180, 25); // for offenders statement
                        posLeft = drawAutoText("II.  Victim's Statement:", "", 25, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 30, posLeft.y + 6, true, 180, 25); // for victims statement
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 30, posLeft.y + 6, true, 180, 25); // for victims statement


                        posLeft = drawAutoText("B.  PRIOR RECORDS", "", 14, posLeft.y + 6);
                        var tablePos = posLeft.y + 6;
                        // Example headers and rows
                        var headers = [
                            {title: "Agency", dataKey: "agency"},
                            {title: "Criminal Case No.", dataKey: "cc_no"}, 
                            {title: "Offense", dataKey: "offense"}, 
                            {title: "Date Charged", dataKey: "when"}, 
                            {title: "Decision/Status of the Case", dataKey: "decision"}, 
                        ];
                        const rows = priorRecords.priorRecord;
                        let posTable = drawAutoTable(headers, rows, 14, tablePos);

                        posLeft.y = posTable.y + 6;
                        posRight.y = posTable.y + 6;

                        posLeft = drawAutoText("C.  OTHER DEROGATORY INFORMATION ", "", 14, posLeft.y + 6);
                        posLeft = drawAutoText("Source/Posiion", "", 35, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 30, posLeft.y + 6, true, 90, 14); // for offenders statement

                        posRight = drawAutoText("Particulars", "", 131, posRight.y+12);
                        posRight = drawAutoText("", "", 30, posRight.y + 6, true, 90, 14); // for offenders statement

                        if (posLeft.y > posRight.y) {
                            yCoordinate = posLeft.y;
                        } else {
                            yCoordinate = posRight.y
                        }
                    }
                    drawCriminalHistory();
                    function drawPersonalHistory () {
                        let centerY = yCoordinate + 10;
                        centerY = drawCenterText('III.    PERSONAL AND SOCIAL HISTORY ', centerY, 'normal', 11);
                        let y = centerY + 5;

                        let posLeft = drawAutoText (`A. PETITIONER'S BIRTH DATA `, "", 14, y)
                        posLeft = drawAutoText (`Date of Birth:`, "", 20, posLeft.y+6, true)
                        posLeft = drawAutoText (`Place of Birth:`, "", posLeft.x+20, posLeft.y, true)
                        posLeft = drawAutoText (`Birth Order:`, "", posLeft.x+20, posLeft.y, true)

                        posLeft = drawAutoText (`B. FAMILY BACKGROUND`, "", 14, posLeft.y+10);
                        posLeft = drawAutoText (`1. PARENTS:`, "", 20, posLeft.y+6);
                        posLeft = drawAutoText (`Father:`, "", 25, posLeft.y+6, true);
                        posLeft = drawAutoText (`Age:`, "", posLeft.x + 20, posLeft.y, true);
                        posLeft = drawAutoText (`Occupation:`, "", posLeft.x+10, posLeft.y, true);
                        posLeft = drawAutoText (`Mother:`, "", 25, posLeft.y+6, true);
                        posLeft = drawAutoText (`Age:`, "", posLeft.x + 20, posLeft.y, true);
                        posLeft = drawAutoText (`Occupation:`, "", posLeft.x+10, posLeft.y, true);

                        posLeft = drawAutoText (`Status of Marriage:`, "", 25, posLeft.y+6);
                        var civilStatusPosX = posLeft.x;
                        var civilStatusPosY = posLeft.y;
                        let posRadio = drawRadioButton("Married", civilStatusPosX, posLeft.y, false);

                        posRadio = drawRadioButton("Annulled", posRadio.x, posRadio.y, false);
                        posRadio = drawRadioButton("Seperated", posRadio.x, posRadio.y, false, false, "");
                        posRadio = drawRadioButton("Common Law/Lived In", civilStatusPosX, posRadio.y + 6, false);
                        posRadio = drawRadioButton("Others", posRadio.x, posRadio.y, false, false, "");

                        posLeft.y = posRadio.y + 10;
                        posLeft = drawAutoText (`2. SOCIO-ECONOMIC BACKGROUND:`, "", 20, posLeft.y);
                        let posSocioStatus = { x:25, y:posLeft.y+6}

                        const familyRelationship = [
                            { label: "Very Satisfactory", value: "very satisfactory" },
                            { label: "Satisfactory", value: "satisfactory" },
                            { label: "Fair", value: "fair" },
                            { label: "Poor", value: "poor" }
                        ];

                        const famStatus = drawCheckbox("Family Relationship", familyRelationship, socioEconomic.family_rel, 25, posSocioStatus.y);

                        const majorFamilyProblems = [
                            { label: "No Apparent Problem", value: "no apparent problem" },
                            { label: "Economic", value: "economic" },
                            { label: "Mental/Physical Illness", value: "mental/physical illness" },
                            { label: "Marital Problem", value: "marital problem" },
                            { label: "One-Parent-Family", value: "one-parent-family" },
                            { label: "Parent-Child Conflict", value: "parent-child conflict" },
                            { label: "Sibling Conflict", value: "sibling conflict" },
                            { label: "Others", value: "others" }
                        ];

                        const majorFamProbStatus = drawCheckbox("Major Family Problems", majorFamilyProblems, socioEconomic.fam_prob, posSocioStatus.x + 50, posSocioStatus.y);

                        const familyReputation = [
                            { label: "Very Satisfactory", value: "very satisfactory" },
                            { label: "Satisfactory", value: "satisfactory" },
                            { label: "Fair", value: "fair" },
                            { label: "Poor", value: "poor" }
                        ];

                        const famRepStatus = drawCheckbox("Family Reputation in the Community", familyReputation, socioEconomic.family_rep, posSocioStatus.x + 110, posSocioStatus.y);

                        posSocioStatus = { x:25, y:majorFamProbStatus.y + 6}

                        const familyEconomicStatus = [
                            { label: "More than Adequate", value: "more than adequate" },
                            { label: "Adequate", value: "adequate" },
                            { label: "Inadequate", value: "inadequate" },
                            { label: "Below Poverty Line", value: "below poverty line" }
                        ];

                        const famEconomicStatus = drawCheckbox("Family Economic Status", familyEconomicStatus, socioEconomic.eco_status, posSocioStatus.x, posSocioStatus.y);

                        posSocioStatus = { x:25, y:famEconomicStatus.y - topMargin + 4}

                        const physicalHomeConditions = [
                            { label: "Very Satisfactory", value: "very satisfactory" },
                            { label: "Satisfactory", value: "satisfactory" },
                            { label: "Fair", value: "fair" },
                            { label: "Poor", value: "poor" }
                        ];
                        
                        const physicalHomeConditionsStatus = drawCheckbox("Physical Home Conditions", physicalHomeConditions, socioEconomic.home_cond, posSocioStatus.x + 50, posSocioStatus.y);

                        const stabilityResidence  = [
                            { label: "Stable", value: "stable" },
                            { label: "Ocassional Change", value: "ocassional change" },
                            { label: "Frequent Change", value: "frequent change" },
                            { label: "No Stability", value: "no stability" }
                        ];
                        
                        const stabilityResidenceStatus = drawCheckbox("Stability of Residence", stabilityResidence, socioEconomic.stability, posSocioStatus.x + 110, posSocioStatus.y);

                        posLeft = {x: 14, y:stabilityResidenceStatus.y}
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 14, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 30, posLeft.y + 6, true, 180, 25); // for victims statement

                        posLeft = drawAutoText ("C. PETITIONER'S PRESENT SITUATION", "", 14, posLeft.y + 6);
                        posLeft = drawAutoText ("Civil Status:", "", 25, posLeft.y + 6,);
                        var civilStatusPosRadioX = posLeft.x;
                        var civilStatusPosRadioY = posLeft.y;
                        let posRadioCivilStatus = drawRadioButton("Single", civilStatusPosRadioX, civilStatusPosRadioY, false);
                        posRadioCivilStatus = drawRadioButton("Married", posRadioCivilStatus.x, posRadioCivilStatus.y, false);
                        posRadioCivilStatus = drawRadioButton("Widow/Widower", posRadioCivilStatus.x, posRadioCivilStatus.y, false, false, "");
                        posRadioCivilStatus = drawRadioButton("With Common-Law/Lived-In Partner", civilStatusPosX, posRadioCivilStatus.y + 6, false);

                        posLeft.y = posRadioCivilStatus.y;
                        posLeft = drawAutoText (`Status of Marriage:`, "", 25, posLeft.y+6);
                        let posMarriageStatus = {x:posLeft.x, y:posLeft.y}
                        posMarriageStatus = drawRadioButton("Annulled", posMarriageStatus.x, posMarriageStatus.y, false);
                        posMarriageStatus = drawRadioButton("Seperated", posMarriageStatus.x, posMarriageStatus.y, false, false, "");
                        posMarriageStatus = drawRadioButton("Legal", posMarriageStatus.x, posMarriageStatus.y, false, false, "");
                        posMarriageStatus = drawRadioButton("Estranged", posMarriageStatus.x, posMarriageStatus.y, false);
                        posMarriageStatus = drawRadioButton("Others", posMarriageStatus.x, posMarriageStatus.y, false, false, "");

                        posLeft = {x:posMarriageStatus.x, y:posMarriageStatus.y+6}
                        posLeft = drawAutoText("REMARKS:", "", 25, posLeft.y, true, 180, 25);

                        posLeft = drawAutoText("1. Domestic Partner/ Spouse:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Age:", "", 25, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Sex:", "", posLeft.x+10, posLeft.y, true, 180, 25);
                        let posSpouseGender = {x: posLeft.x, y:posLeft.y}
                        posSpouseGender = drawRadioButton("Male", posSpouseGender.x, posSpouseGender.y, false);
                        posSpouseGender = drawRadioButton("Female", posSpouseGender.x, posSpouseGender.y, false);
                        posLeft = {x:posSpouseGender.x, y:posSpouseGender.y}
                        posLeft = drawAutoText("Occupation:", "", posLeft.x, posLeft.y, true, 180, 25);
                        posLeft = drawAutoText("Home Address:", "", 25, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Work Address:", "", 25, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("2. Children:", "", 20, posLeft.y+8);
                        posLeft = drawAutoText("Total No. of Children:", "", posLeft.x, posLeft.y, true, posLeft.x - 180, 25);

                        var childrenTablePos = {x: 30, y:posLeft.y};
                        // Example headers and rows
                        var headers = [
                            {title: "Age", dataKey: "age"},
                            {title: "In/Out of School", dataKey: "school"}, 
                            {title: "Educational Attainment", dataKey: "educ_attainment"}, 
                            {title: "Legitimate", dataKey: "legitimate"}, 
                            {title: "Illegitimate", dataKey: "illegitimate"}, 
                        ];
                        const rows = familyBackground.children;
                        childrenTablePos = drawAutoTable(headers, rows, childrenTablePos.x, childrenTablePos.y);

                        posLeft = {x:25, y:childrenTablePos.y}
                        posLeft = drawAutoText ("Relationship with Children:", "", posLeft.x, posLeft.y);
                        let relChildrenPos = {x:posLeft.x, y:posLeft.y}
                        relChildrenPos = drawRadioButton("Very Satisfactory", relChildrenPos.x, relChildrenPos.y, false);
                        relChildrenPos = drawRadioButton("Satisfactory", relChildrenPos.x, relChildrenPos.y, false, false, "");
                        relChildrenPos = drawRadioButton("Fair", relChildrenPos.x, relChildrenPos.y, false, false, "");
                        relChildrenPos = drawRadioButton("Poor", relChildrenPos.x, relChildrenPos.y, false);
                        posLeft = {x:25, y:relChildrenPos.y}
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 25, posLeft.y + 6, true, 180, 25); // for victims statement

                        posLeft = drawAutoText("3. Residence:", "", 20, posLeft.y+6);

                        posLeft = drawAutoText("", "Dwelling:", 20, posLeft.y+6, true);
                        let posRadioDwelling = { x:25, y:posLeft.y}
                        posRadioDwelling = drawRadioButton("Owned: Yrs of Stay", 25, posRadioDwelling.y + 6, false);
                        posRadioDwelling = drawRadioButton("Rented: Yrs of Stay", 25, posRadioDwelling.y + 6, false, false, "");
                        posRadioDwelling = drawRadioButton("Informal Settler", 25, posRadioDwelling.y + 6, false, false, "");
                        posRadioDwelling = drawRadioButton("Others", 25, posRadioDwelling.y + 6, false);

                        posLeft = drawAutoText("", "Stability of Residence:", 75, posLeft.y, true);
                        let posStability = { x:80, y:posLeft.y}
                        posStability = drawRadioButton("Stable", 80, posStability.y + 6, false);
                        posStability = drawRadioButton("Occasional Change", 80, posStability.y + 6, false, false, "");
                        posStability = drawRadioButton("Frequent Change", 80, posStability.y + 6, false, false, "");
                        posStability = drawRadioButton("No Stability", 80, posStability.y + 6, false);

                        posLeft = drawAutoText("", "Physical Home Conditions:", 135, posLeft.y, true);
                        let posPhysicalHomeCond = { x:140, y:posLeft.y}
                        posPhysicalHomeCond = drawRadioButton("Very Satisfactory", 140, posPhysicalHomeCond.y + 6, false);
                        posPhysicalHomeCond = drawRadioButton("Satisfactory", 140, posPhysicalHomeCond.y + 6, false, false, "");
                        posPhysicalHomeCond = drawRadioButton("Fair", 140, posPhysicalHomeCond.y + 6, false, false, "");
                        posPhysicalHomeCond = drawRadioButton("Poor", 140, posPhysicalHomeCond.y + 6, false);

                        posLeft = {x:20, y:posPhysicalHomeCond.y}
                        console.log(posLeft.y)
                        posLeft = drawAutoText("4. Economic Condition:", "", 20, posLeft.y + 6);
                        posLeft = drawAutoText("", "Family Economic Status:", 20, posLeft.y + 6, true);
                        let posFamEconomicStatus = { x:25, y:posLeft.y}
                        posFamEconomicStatus = drawRadioButton("More than Adequate", 25, posFamEconomicStatus.y + 6, false);
                        posFamEconomicStatus = drawRadioButton("Adequate", 25, posFamEconomicStatus.y + 6, false, false, "");
                        posFamEconomicStatus = drawRadioButton("Inadequate", 25, posFamEconomicStatus.y + 6, false, false, "");
                        posFamEconomicStatus = drawRadioButton("Below Poverty Level", 25, posFamEconomicStatus.y + 6, false);

                        posLeft = drawAutoText("", "Family Breadwinner:", 75, posLeft.y, true);
                        let posFamilyBreadwinner = { x:80, y:posLeft.y}
                        posFamilyBreadwinner = drawRadioButton("Petitioner", 80, posFamilyBreadwinner.y + 6, false);
                        posFamilyBreadwinner = drawRadioButton("Spouse", 80, posFamilyBreadwinner.y + 6, false, false, "");
                        posFamilyBreadwinner = drawRadioButton("Petitioner and Spouse", 80, posFamilyBreadwinner.y + 6, false, false, "");
                        posFamilyBreadwinner = drawRadioButton("Others", 80, posFamilyBreadwinner.y + 6, false);

                        posLeft = drawAutoText("", "Petitioner's Role in the Family:", 135, posLeft.y, true);
                        let posPetionerRole = { x:140, y:posLeft.y}
                        posPetionerRole = drawRadioButton("Income Contributor", 140, posPetionerRole.y + 6, false);
                        posPetionerRole = drawRadioButton("Total", 145, posPetionerRole.y + 6, false);
                        posPetionerRole = drawRadioButton("Partial", 145, posPetionerRole.y + 6, false);
                        posPetionerRole = drawRadioButton("Primary Care-giver", 140, posPetionerRole.y + 6, false);
                        posPetionerRole = drawRadioButton("Dependent", 140, posPetionerRole.y + 6, false,);

                        posLeft = {x:20, y:posPetionerRole.y + 6}
                        posLeft = drawAutoText("5. Major Problems in the Family:", "", 20, posLeft.y + 6);
                        let posFamilyProblemCol1 = { x:25, y:posLeft.y}
                        let posFamilyProblemCol2 = { x:80, y:posLeft.y}
                        let posFamilyProblemCol3 = { x:140, y:posLeft.y}
                        posFamilyProblemCol1 = drawRadioButton("No Apparent Problem", 25, posFamilyProblemCol1.y + 6, false);
                        posFamilyProblemCol1 = drawRadioButton("Economic", 25, posFamilyProblemCol1.y + 6, false);
                        posFamilyProblemCol1 = drawRadioButton("Husband-Wife Conflict", 25, posFamilyProblemCol1.y + 6, false,);

                        posFamilyProblemCol2 = drawRadioButton("Mental Illness", 80, posFamilyProblemCol2.y + 6, false);
                        posFamilyProblemCol2 = drawRadioButton("Physical Illness", 80, posFamilyProblemCol2.y + 6, false);
                        posFamilyProblemCol2 = drawRadioButton("Parent-Child Conflict", 80, posFamilyProblemCol2.y + 6, false,);

                        posFamilyProblemCol3 = drawRadioButton("Sibling conflict", 130, posFamilyProblemCol3.y + 6, false);
                        posFamilyProblemCol3 = drawRadioButton("Others", 130, posFamilyProblemCol3.y + 6, false,);

                        posLeft = {x:25, y:posFamilyProblemCol1.y}
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 14, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 14, posLeft.y + 6, true, 180, 14);

                        posLeft = drawAutoText ("D. EDUCATION", "", 14, posLeft.y + 6);
                        posLeft = drawAutoText("Educational Attainment:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Over-all Conduct in School:", "", 20, posLeft.y+6);

                        let posConductSchool = {x: posLeft.x, y:posLeft.y}
                        posConductSchool = drawRadioButton("Very Satisfactory", posConductSchool.x, posConductSchool.y, false);
                        posConductSchool = drawRadioButton("Satisfactory", posConductSchool.x, posConductSchool.y, false);
                        posConductSchool = drawRadioButton("Fair", posConductSchool.x, posConductSchool.y, false);
                        posConductSchool = drawRadioButton("Poor", posConductSchool.x, posConductSchool.y, false);

                        posLeft = {x:14, y:posConductSchool.y+4}
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 25, posLeft.y + 6);
                        posLeft = drawAutoText("", "", 25, posLeft.y + 6, true, 180, 25);

                        posLeft = drawAutoText ("E. JOB HISTORY", "", 14, posLeft.y + 6);
                        posLeft = drawAutoText("1. Petitioner's Previous Occupation:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("2. Petitioner's Present Occupation:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Employers Work and Addres:", "", 25, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("3. Present Work Status:", "", 20, posLeft.y+6);

                        let posWorkStatusRow1 = {x: posLeft.x, y: posLeft.y}
                        posWorkStatusRow1 = drawRadioButton("Self-employed", posWorkStatusRow1.x, posWorkStatusRow1.y, false);
                        posWorkStatusRow1 = drawRadioButton("Regular/Permanent", posWorkStatusRow1.x, posWorkStatusRow1.y, false);
                        posWorkStatusRow1 = drawRadioButton("Temporary", posWorkStatusRow1.x, posWorkStatusRow1.y, false);

                        let posWorkStatusRow2 = {x: posLeft.x, y:posWorkStatusRow1.y+6}
                        posWorkStatusRow2 = drawRadioButton("Contractual", posWorkStatusRow2.x, posWorkStatusRow2.y, false);
                        posWorkStatusRow2 = drawRadioButton("Casual", posWorkStatusRow2.x, posWorkStatusRow2.y, false);
                        posWorkStatusRow2 = drawRadioButton("Intermittent", posWorkStatusRow2.x, posWorkStatusRow2.y, false);
                        posWorkStatusRow2 = drawRadioButton("Seasonal", posWorkStatusRow2.x, posWorkStatusRow2.y, false);

                        posLeft = {x:20, y:posWorkStatusRow2.y}
                        posLeft = drawAutoText("Special Skills:", "", 25, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 20, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);

                        posLeft = drawAutoText ("F. MEDICAL HISTORY", "", 14, posLeft.y + 8);
                        posLeft = drawAutoText("Past Medical History:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Present Illness:", "", 20, posLeft.y+6, true, 180, 25);
                        posLeft = drawAutoText("Present Medication:", "", 20, posLeft.y+6, true, 180, 25);

                        posLeft = drawAutoText("Drug/Alcohol Use:", "", 20, posLeft.y+6);

                        let posAlcoholUse = {x: posLeft.x, y:posLeft.y}
                        posAlcoholUse = drawRadioButton("No", posAlcoholUse.x, posAlcoholUse.y, false);
                        posAlcoholUse = drawRadioButton("Yes Extent Use:", posAlcoholUse.x, posAlcoholUse.y, false);

                        posLeft = {x:20, y:posAlcoholUse.y}
                        posLeft = drawAutoText("REMARKS/ADDITIONAL INFORMATION", "", 20, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);

                        posLeft = drawAutoText ("G. PETITIONER'S TRAITS/CHARACTERISTICS:", "", 14, posLeft.y + 8);
                        posLeft = drawAutoText("Positive:", "", 20, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);
                        posLeft = drawAutoText("Negative:", "", 20, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);
                        posLeft = drawAutoText("Overall Impression of the Client:", "", 20, posLeft.y + 7);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);

                        posLeft = drawAutoText ("H. PETITIONER'S BACKGROUND IN THE COMMUNITY AND COLLATERAL INFORMATION:", "", 14, posLeft.y + 8);
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, true, 180, 20);


                        var petitionerBackgroundTablePos = {x: 30, y:posLeft.y};
                        // Example headers and rows
                        var headers = [
                            {title: "Collateral Source of Information", dataKey: "sourceInfo"},
                            {title: "Relationship to the Client", dataKey: "relationship"}, 
                            {title: "Collateral Information Gathered", dataKey: "collateralInfo"}, 
                        ];
                        const petitionerBackgroundTableRows = familyBackground.children;
                        petitionerBackgroundTablePos = drawAutoTable(headers, rows, petitionerBackgroundTablePos.x, petitionerBackgroundTablePos.y);

                        yCoordinate = petitionerBackgroundTablePos.y
                    }
                    drawPersonalHistory();
                    function drawAnalysis() {
                        let centerY = yCoordinate + 6;
                        centerY = drawCenterText('IV.    ANALYSIS AND EVALUATION', centerY, 'normal', 11);
                        let posLeft = {x: 25, y:centerY}
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, false, 180, 20);

                        yCoordinate = posLeft.y;
                    }
                    drawAnalysis();
                    function drawProjectedThrusts() {
                        let centerY = yCoordinate + 6;
                        centerY = drawCenterText('V.    PROJECTED THRUSTS OF REHABILITATION', centerY, 'normal', 11);
                        let posLeft = {x: 25, y:centerY}
                        posLeft = drawAutoText("", "", 20, posLeft.y + 6, false, 180, 20);
                        yCoordinate = posLeft.y;
                    }
                    drawProjectedThrusts();
                    function drawRecommendation() {
                        let fullName = "";

                        if ( result.firstName === null &&
                             result.middleName === null &&
                             result.lastName === null &&
                             result.suffixName === null ) {
    
                                fullName = result.fullName;
                        } else {
                            fullName = `${result.lastName} ${result.suffixName}, ${result.firstName} ${result.middleName}`
                        }
                        let centerY = yCoordinate + 6;
                        centerY = drawCenterText('RECOMMENDATION', centerY, 'normal', 11);
                        let posLeft = {x: 25, y:centerY}
                        posLeft = drawAutoText("", `WHEREFORE, in view of the foregoing, pending the result/s of the NBI/CMRD/Others (specify)/Courtesy Investigation Results from ______________________, it is respectfully recommended to the Honorable Court that the petition for probation of ${fullName.toUpperCase()} be ${recommendation.grant.toUpperCase()}, subject to the following conditions:`, 20, posLeft.y + 6, false, 190, 14);
                        var recommendationList = recommendation.recommendations;
                        posLeft.y = posLeft.y + 4;
                        console.log(recommendationList)

                        for (var i = 0; i < recommendationList.length; i++){
                            var row = [recommendationList[i].recs];
                            
                            for (var k = 0; k < row.length; k++){
                                var rowValue = row[k];
                                posLeft = drawAutoText("", `${i + 1}.)   ${rowValue}`, 20, posLeft.y + 6, false, 180, 20);
                            }
                        }
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
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchAllData(client_id);
        });     





    } )( jQuery );