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
                        // var remarks = [];
                        // const remarksArray = {
                        //     date_received: $(".dateReceived").val(),
                        //     name: $(".nameOthers").val(),
                        //     remark: $(".remarksOther").val()
                        // };
                        // remarks.push(remarksArray);
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
                            <tbody class="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `)
            $(".btn-addNotes").unbind("click").on("click", function(){
                $("#addOtherDocumentModal").modal("show")
            })
        })

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
                }else{
                    alert("failed")
                }
            })
        }
        getClientDetails();




    } )( jQuery );