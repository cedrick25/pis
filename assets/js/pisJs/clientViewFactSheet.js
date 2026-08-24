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

        function fsShowTabLoader() {
            var $el = $('#fsTabContentLoader');
            if (!$el.length) return;
            $el.removeClass('is-hidden').attr('aria-busy', 'true');
        }
        function fsHideTabLoader() {
            var $el = $('#fsTabContentLoader');
            if (!$el.length) return;
            $el.addClass('is-hidden').attr('aria-busy', 'false');
        }
        function fsToast(message, kind) {
            var $el = $('#fsDynamicToast');
            if (!$el.length) return;
            kind = kind || 'info';
            var map = { success: 'success', error: 'danger', danger: 'danger', warning: 'warning', info: 'info' };
            var bs = map[kind] || 'info';
            var icon = kind === 'success' ? 'fa-check-circle' : (kind === 'error' || kind === 'danger') ? 'fa-exclamation-circle' : kind === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
            $el.removeClass('alert-success alert-danger alert-warning alert-info').addClass('alert-' + bs);
            $el.html('<i class="fa ' + icon + '" aria-hidden="true"></i> ' + $('<div/>').text(message).html());
            $el.stop(true, true).css('display', 'block').hide().fadeIn(180);
            clearTimeout(fsToast._t);
            fsToast._t = setTimeout(function () {
                $el.fadeOut(220);
            }, 3800);
        }

        var fsTabLoaderNonce = 0;

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
            $(this).removeClass('is-invalid');
            $('#file-input-upload-hint').removeClass('is-visible').text('');
        });

        $(document).on('change', '#file-input-investigation', function () {
            $(this).removeClass('is-invalid');
            $('#file-input-investigation-hint').removeClass('is-visible').text('');
        });
        $(document).on('change', '#file-input-supervision', function () {
            $(this).removeClass('is-invalid');
            $('#file-input-supervision-hint').removeClass('is-visible').text('');
        });
        $(document).on('change', '#file-input-other', function () {
            $(this).removeClass('is-invalid');
            $('#file-input-other-hint').removeClass('is-visible').text('');
        });
        $(document).on('change', '#select-docket-investigation', function () {
            $(this).removeClass('is-invalid');
            $('#select-docket-investigation-hint').removeClass('is-visible').text('');
        });
        $(document).on('change', '#select-docket-supervision', function () {
            $(this).removeClass('is-invalid');
            $('#select-docket-supervision-hint').removeClass('is-visible').text('');
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
                    <td colspan="8" class="text-center text-muted py-4"><i class="fa fa-spinner fa-spin fa-2x d-block mb-2" aria-hidden="true"></i><span>Loading dockets…</span></td>
                </tr>
            `);

            var docketPromise = __executeExternalPost(
                '8000/docketbook/getclient/'+client_id+'?page='+docketCurrentPage+'&size='+docketPageSize, '{}'
            );
            var petitionerPromise = (cachedWsStatus !== null && cachedPsStatus !== null)
                ? $.Deferred().resolve(null)
                : __executeExternalGet('8000/petitioner/'+client_id);

            $.when(docketPromise, petitionerPromise)
            .done(function (docketRes, petitionerRes) {
                $(".table_body_tc .docket-loader-row").remove();

                if (cachedWsStatus === null || cachedPsStatus === null) {
                    var petitioner = petitionerRes && petitionerRes.response ? petitionerRes.response : null;
                    cachedWsStatus = (petitioner && petitioner.worksheetStatus)
                        ? petitioner.worksheetStatus : "Not Available";
                    cachedPsStatus = (petitioner && petitioner.psirStatus)
                        ? petitioner.psirStatus : "Not Available";
                }

                var dockets = docketRes && docketRes.content ? docketRes.content : [];
                var totalPages = docketRes && docketRes.totalPages ? docketRes.totalPages : 0;

                if (docketCurrentPage === 0 && dockets.length === 0) {
                    $(".table_body_tc").append(`
                        <tr>
                            <td colspan="8" class="text-center p-0 border-0"><div class="fs-empty-state"><i class="fa fa-folder-open-o" aria-hidden="true"></i>No docket records found.</div></td>
                        </tr>
                    `);
                    docketHasMore = false;
                    docketIsLoading = false;
                    return;
                }

                var wsStatus = (!cachedWsStatus || cachedWsStatus === "null") ? "Not Available" : cachedWsStatus;
                var psStatus = (!cachedPsStatus || cachedPsStatus === "null") ? "Not Available" : cachedPsStatus;

                dockets.forEach(function (docket) {
                    docketRowCount++;
                    var docketNumber = docket.docketNumber || "N/A";
                    var dateReceived = docket.receivedDateByPPO || "N/A";
                    var officer = docket.investigatingOfficer || docket.supervisingOfficer || "N/A";
                    var status = docket.status || "N/A";

                    var docketNumEscAttr = String(docketNumber).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
                    $(".table_body_tc").append(`
                        <tr data-docket-number="${docketNumEscAttr}">
                            <td>${docketRowCount}</td>
                            <td>${docketNumber}</td>
                            <td>${dateReceived}</td>
                            <td>N/A</td>
                            <td>${officer}</td>
                            <td>${status}</td>
                            <td>
                                <div class="fs-docket-cell-inner">
                                    <span class="fs-docket-status">${wsStatus}</span>
                                    <div class="fs-docket-actions">
                                        <a href="${window.pisUrl('worksheet_identifying_data?client_id=' + client_id + '&field_office_id=' + client_fo + '&status=' + encodeURIComponent(wsStatus || ''))}" class="btn btn-sm btn-outline-primary" title="Edit worksheet" aria-label="Edit worksheet"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</a>
                                        <button type="button" class="btn btn-sm btn-outline-secondary btn_pdfWorksheet" title="Print worksheet (PDF)" aria-label="Print worksheet PDF"><i class="fa fa-print" aria-hidden="true"></i>Print</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="fs-docket-cell-inner">
                                    <span class="fs-docket-status">${psStatus}</span>
                                    <div class="fs-docket-actions">
                                        <a href="${window.pisUrl('psir_identifying_data?client_id=' + client_id + '&field_office_id=' + client_fo + '&status=' + encodeURIComponent(psStatus || ''))}" class="btn btn-sm btn-outline-primary" title="Edit PSIR" aria-label="Edit PSIR"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</a>
                                        <button type="button" class="btn btn-sm btn-outline-info btn_pdfPSIR" title="Print short PSIR" aria-label="Print short PSIR"><i class="fa fa-print" aria-hidden="true"></i>Short</button>
                                        <button type="button" class="btn btn-sm btn-outline-dark btn_pdfPSIRLong" title="Print long PSIR (includes transmittal and full recommendation blocks)" aria-label="Print long PSIR"><i class="fa fa-print" aria-hidden="true"></i>Long</button>
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
                    fsToast('Could not load client details.', 'danger');
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

        function ajaxUploadPetitionerProfilePhoto(file, onSuccess) {
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
              url: api+"8080/file/upload?uuid="+client_id+"&type=petitioner_profile&createdby="+userName+"&version=0&kind=petitioner_profile&officeId="+client_fo+"&remarks=petitioner_profile_remarks",
              type: 'POST',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                if (typeof onSuccess === 'function') onSuccess(response);
              },
              error: function(xhr, status, error) {
                console.log(error);
                fsToast('Photo upload failed.', 'danger');
              }
            });
        }

        function ajaxUploadReportingDatePhoto(file, onSuccess, remarksText) {
            var formData = new FormData();
            formData.append('file', file);
            var remarksVal = remarksText != null ? String(remarksText) : '';
            $.ajax({
              url: api+"8080/file/upload?uuid="+encodeURIComponent(client_id)+"&type=reporting_date_photo&createdby="+encodeURIComponent(userName)+"&version=0&kind=reporting_date_photo&officeId="+encodeURIComponent(client_fo)+"&remarks="+encodeURIComponent(remarksVal),
              type: 'POST',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                if (typeof onSuccess === 'function') onSuccess(response);
              },
              error: function(xhr, status, error) {
                console.log(error);
                fsToast('Photo upload failed.', 'danger');
              }
            });
        }

        function resetReportingDateProfilePhotoPicker() {
            $('#file-input-reporting-photo').val('').removeClass('is-invalid');
            $('#file-input-reporting-photo-hint').removeClass('is-visible').text('');
            $('.reporting-profile-photo-followup').hide();
            $('#reporting_photo_preview').attr('src', '').hide();
        }

        $('.uploadPhotoBtn').unbind("click").on("click", function(){
            var imgInput = $('#file-input')[0];
            var file = imgInput.files[0];
            if (!file) {
                $('#file-input').addClass('is-invalid');
                $('#file-input-upload-hint').addClass('is-visible').text('Please choose an image file.');
                fsToast('Please choose a photo to upload.', 'warning');
                return;
            }
            $('#file-input').removeClass('is-invalid');
            $('#file-input-upload-hint').removeClass('is-visible').text('');
            ajaxUploadPetitionerProfilePhoto(file, function () {
                $("#success_upload").show();
                setTimeout(function () {
                    $("#success_upload").hide();
                    $("#uploadPicModal").modal("hide");
                }, 1000);
            });
        });

        $('#file-input-reporting-photo').on('change', function () {
            var file = this.files[0];
            $(this).removeClass('is-invalid');
            $('#file-input-reporting-photo-hint').removeClass('is-visible').text('');
            if (!file) {
                $('.reporting-profile-photo-followup').hide();
                $('#reporting_photo_preview').attr('src', '').hide();
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                var url = reader.result;
                $('#reporting_photo_preview').attr('src', url).show();
            };
            $('.reporting-profile-photo-followup').show();
        });

        $(".btn-uploadReportingPhotoPick").unbind("click").on("click", function () {
            $('#file-input-reporting-photo').click();
        });

        function reportingDateRemarksForUpload() {
            return ($('#addReportingDateModal .remarksReportingDate').val() || '').trim();
        }

        function reloadReportingDatePhotosTable() {
            if (!dataTableReportingDate) return;
            try {
                if ($.fn.DataTable.isDataTable('.table_head_reporting_date')) {
                    dataTableReportingDate.ajax.reload(null, false);
                }
            } catch (e) {}
        }

        function completeReportingDateModalSuccess(options) {
            options = options || {};
            resetReportingDateProfilePhotoPicker();
            $('#addReportingDateModal .reportingDate').val('');
            $('#addReportingDateModal .remarksReportingDate').val('');
            $("#success_upload_reporting").show();
            setTimeout(function () {
                $("#success_upload_reporting").hide();
                $("#addReportingDateModal").modal("hide");
                if (options.reloadReportingTable) {
                    reloadReportingDatePhotosTable();
                }
            }, 1000);
        }

        $(".saveReportingDate").unbind("click").on("click", function () {
            var file = $('#file-input-reporting-photo')[0].files[0];
            var remarks = reportingDateRemarksForUpload();
            if (file) {
                ajaxUploadReportingDatePhoto(file, function () {
                    completeReportingDateModalSuccess({ reloadReportingTable: true });
                }, remarks);
            } else {
                completeReportingDateModalSuccess({ reloadReportingTable: false });
            }
        });

        $("#addReportingDateModal").on("hidden.bs.modal", function () {
            resetReportingDateProfilePhotoPicker();
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

        var petitionerFingerprintTypes = [
            { apiType: 'petitioner_rthumb', label: 'Right Thumb' },
            { apiType: 'petitioner_rindex', label: 'Right Index' },
            { apiType: 'petitioner_rmiddle', label: 'Right Middle' },
            { apiType: 'petitioner_rring', label: 'Right Ring' },
            { apiType: 'petitioner_rlittle', label: 'Right Little' }
        ];

        function renderPetitionerFingerprintsList(files) {
            var $tb = $('.petitioner_fingerprints_tbody');
            var $tbl = $('.table_petitioner_fingerprints');
            var $empty = $('.petition-fp-list-empty');
            $tb.empty();
            if (!files.length) {
                $tbl.hide();
                $empty.show();
                return;
            }
            $empty.hide();
            $tbl.show();
            files.forEach(function (f, idx) {
                var viewUrl = api + '8080/file/view/' + f.id;
                var dlUrl = api + '8080/file/download/' + f.id;
                var name = f.fileName != null ? String(f.fileName) : '—';
                var remarks = f.remarks != null ? String(f.remarks) : '—';
                var finger = f.fingerLabel || '—';
                var $viewBtn = $('<a/>', { href: viewUrl, target: '_blank', rel: 'noopener noreferrer', class: 'btn btn-primary btn-sm' });
                $viewBtn.append($('<i/>', { class: 'fa fa-eye' }));
                $viewBtn.append(document.createTextNode(' View'));
                var $dlBtn = $('<a/>', { href: dlUrl, target: '_blank', rel: 'noopener noreferrer', class: 'btn btn-secondary btn-sm' });
                $dlBtn.append($('<i/>', { class: 'fa fa-download' }));
                $dlBtn.append(document.createTextNode(' Download'));
                $tb.append(
                    $('<tr/>').append(
                        $('<td/>').text(idx + 1),
                        $('<td/>').text(finger),
                        $('<td/>').text(name),
                        $('<td/>').text(remarks),
                        $('<td/>').append($viewBtn, document.createTextNode(' '), $dlBtn)
                    )
                );
            });
        }

        function loadAllPetitionerFingerprintsIntoModal() {
            if (!client_id || !client_fo) {
                fsToast('Missing client or field office. Cannot load fingerprints.', 'warning');
                return;
            }
            $('.petition-fp-list-loading').show();
            $('.petition-fp-list-empty').hide();
            $('.table_petitioner_fingerprints').hide();
            $('.petitioner_fingerprints_tbody').empty();

            var reqs = petitionerFingerprintTypes.map(function (def) {
                return __executeExternalGet('8080/file/list/' + def.apiType + '/' + client_id + '/' + client_fo);
            });

            $.when.apply($, reqs).done(function () {
                var merged = [];
                for (var i = 0; i < petitionerFingerprintTypes.length; i++) {
                    var res = arguments[i];
                    if (res && res.status !== 'ERROR' && res.files && res.files.length) {
                        var label = petitionerFingerprintTypes[i].label;
                        res.files.forEach(function (f) {
                            var row = $.extend({}, f);
                            row.fingerLabel = label;
                            merged.push(row);
                        });
                    }
                }
                merged.sort(function (a, b) {
                    var af = a.fingerLabel || '';
                    var bf = b.fingerLabel || '';
                    if (af !== bf) return af.localeCompare(bf);
                    var av = a.version != null ? Number(a.version) : 0;
                    var bv = b.version != null ? Number(b.version) : 0;
                    if (bv !== av) return bv - av;
                    var ad = a.id != null ? String(a.id) : '';
                    var bd = b.id != null ? String(b.id) : '';
                    return bd.localeCompare(ad);
                });
                renderPetitionerFingerprintsList(merged);
            }).always(function () {
                $('.petition-fp-list-loading').hide();
            });
        }

        $(".btn-viewPetitionerFingerprints").unbind("click").on("click", function () {
            $("#viewPetitionerFingerprintsModal").modal("show");
            loadAllPetitionerFingerprintsIntoModal();
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
                                    fsToast('File deleted successfully.', 'success');
                                    window.location.reload(true);
                                } else {
                                    fsToast('Could not delete file.', 'danger');
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

        function fillDocketUploadSelect($select, dockets, emptyLabel) {
            $select.empty();
            var placeholder = dockets.length > 0 ? '— Select docket number —' : emptyLabel;
            $select.append($('<option/>').val('').text(placeholder));
            dockets.forEach(function (d) {
                var num = (d.docketNumber != null ? String(d.docketNumber) : '').trim();
                if (!num) return;
                var parts = [num];
                if (d.status) parts.push(d.status);
                $select.append($('<option/>').val(num).text(parts.join(' — ')));
            });
            $select.prop('disabled', dockets.length === 0);
        }

        function refreshUploadModalDocketSelects() {
            if (!client_id) return;
            $('#no_dockets_upload_investigation').hide();
            $('#no_dockets_upload_supervision').hide();
            fetchAllDocketNumbers(client_id).done(function (allDockets) {
                var inv = [];
                var sup = [];
                allDockets.forEach(function (d) {
                    if (d.type === "PIS_INV") inv.push(d);
                    else if (d.type === "PIS_SUP") sup.push(d);
                });
                fillDocketUploadSelect($('#select-docket-investigation'), inv, 'No investigation dockets');
                fillDocketUploadSelect($('#select-docket-supervision'), sup, 'No supervision dockets');
                $('#select-docket-investigation').removeClass('is-invalid');
                $('#select-docket-investigation-hint').removeClass('is-visible').text('');
                $('#select-docket-supervision').removeClass('is-invalid');
                $('#select-docket-supervision-hint').removeClass('is-visible').text('');
            });
        }

        function performInvestigationDocumentUpload() {
            var $dockSel = $('#select-docket-investigation');
            $('#no_dockets_upload_investigation').hide();
            if ($dockSel.prop('disabled')) {
                $('#success_upload_investigation').hide();
                $('#failed_upload_investigation').hide();
                $('#no_dockets_upload_investigation').show();
                return;
            }
            var docketNum = ($dockSel.val() || '').trim();
            if (!docketNum) {
                $dockSel.addClass('is-invalid');
                $('#select-docket-investigation-hint').addClass('is-visible').text('Please select a docket number.');
                fsToast('Please select a docket number.', 'warning');
                return;
            }
            $dockSel.removeClass('is-invalid');
            $('#select-docket-investigation-hint').removeClass('is-visible').text('');
            var fileToUpload = $('#file-input-investigation').prop('files')[0];
            if (fileToUpload === undefined) {
                $('#no_dockets_upload_investigation').hide();
                $("#failed_upload_investigation").show();
                $("#file-input-investigation").addClass("is-invalid");
                $("#file-input-investigation-hint").addClass("is-visible").text("Please choose a file to upload.");
                $(".saveInvestigationDocument").prop("disabled", true);
                setTimeout(function () {
                    $("#failed_upload_investigation").hide();
                    $("#file-input-investigation").removeClass("is-invalid");
                    $("#file-input-investigation-hint").removeClass("is-visible").text("");
                    $(".saveInvestigationDocument").prop("disabled", false);
                }, 2000);
                return;
            }
            $("#file-input-investigation").removeClass("is-invalid");
            $("#file-input-investigation-hint").removeClass("is-visible").text("");
            var form = new FormData();
            form.append("file", fileToUpload, fileToUpload.name);
            var remarksVal = $(".investigatingOfficer").val() || '';
            var settings = {
                "url": api + "8080/file/upload?uuid=" + encodeURIComponent(docketNum) + "&type=Investigation&createdby=" + encodeURIComponent(userName) + "&version=0&kind=" + encodeURIComponent(fileToUpload.name) + "&officeId=" + encodeURIComponent(client_fo) + "&remarks=" + encodeURIComponent(remarksVal),
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
                }
            });
        }

        function performSupervisionDocumentUpload() {
            var $dockSel = $('#select-docket-supervision');
            $('#no_dockets_upload_supervision').hide();
            if ($dockSel.prop('disabled')) {
                $('#success_upload_supervision').hide();
                $('#failed_upload_supervision').hide();
                $('#no_dockets_upload_supervision').show();
                return;
            }
            var docketNum = ($dockSel.val() || '').trim();
            if (!docketNum) {
                $dockSel.addClass('is-invalid');
                $('#select-docket-supervision-hint').addClass('is-visible').text('Please select a docket number.');
                fsToast('Please select a docket number.', 'warning');
                return;
            }
            $dockSel.removeClass('is-invalid');
            $('#select-docket-supervision-hint').removeClass('is-visible').text('');
            var fileToUpload = $('#file-input-supervision').prop('files')[0];
            if (fileToUpload === undefined) {
                $('#no_dockets_upload_supervision').hide();
                $("#failed_upload_supervision").show();
                $("#file-input-supervision").addClass("is-invalid");
                $("#file-input-supervision-hint").addClass("is-visible").text("Please choose a file to upload.");
                $(".saveSupervisionDocument").prop("disabled", true);
                setTimeout(function () {
                    $("#failed_upload_supervision").hide();
                    $("#file-input-supervision").removeClass("is-invalid");
                    $("#file-input-supervision-hint").removeClass("is-visible").text("");
                    $(".saveSupervisionDocument").prop("disabled", false);
                }, 2000);
                return;
            }
            $("#file-input-supervision").removeClass("is-invalid");
            $("#file-input-supervision-hint").removeClass("is-visible").text("");
            var form = new FormData();
            form.append("file", fileToUpload, fileToUpload.name);
            var remarksVal = $(".investigatingOfficerSupervision").val() || '';
            var settings = {
                "url": api + "8080/file/upload?uuid=" + encodeURIComponent(docketNum) + "&type=Supervision&createdby=" + encodeURIComponent(userName) + "&version=0&kind=" + encodeURIComponent(fileToUpload.name) + "&officeId=" + encodeURIComponent(client_fo) + "&remarks=" + encodeURIComponent(remarksVal),
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
                }
            });
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
                "language": {
                    "emptyTable": "No documents found for this tab."
                },
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
            var n = ++fsTabLoaderNonce;
            fsShowTabLoader();
            loadDocketFiles(client_id, client_fo).done(function (result) {
                renderDocketFilesTable('.table_head', result.invFiles);
            }).always(function () {
                if (n === fsTabLoaderNonce) fsHideTabLoader();
            });
        }

        function loadSupervisionFiles() {
            var n = ++fsTabLoaderNonce;
            fsShowTabLoader();
            loadDocketFiles(client_id, client_fo).done(function (result) {
                renderDocketFilesTable('.table_head', result.supFiles);
            }).always(function () {
                if (n === fsTabLoaderNonce) fsHideTabLoader();
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
        let dataTableReportingDate = null;

        function tableColumnsForReportingDatePhotos() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;
                    }
                },
                {
                    "data": 'fileName',
                    "defaultContent": '—'
                },
                {
                    "data": null,
                    "render": function () {
                        return 'N/A';
                    }
                },
                {
                    "data": null,
                    "render": function () {
                        return 'N/A';
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
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
                            <button class='btn btn-danger btn-sm btn-delete-reporting-date-photo' data-id='${data.id}' data-file_path='${data.filePath}' data-file_name='${data.fileName}'>
                                <i class='fa fa-trash'></i> Delete
                            </button>
                        `;
                        return actions;
                    }
                }
            ];
        }

        function loadReportingDatePhotos(type, uuid, officeId) {
            if (!dataTableReportingDate) {
                dataTableReportingDate = $('.table_head_reporting_date').DataTable({
                    "processing": false,
                    "serverSide": true,
                    "scrollX": false,
                    "searching": false,
                    "lengthMenu": [10, 25, 50, 100],
                    "pageLength": 10,
                    "language": {
                        "emptyTable": "No reporting date photos found for this client."
                    },
                    "columnDefs": [
                        { "width": "5%", "targets": [0] },
                        { "width": "25%", "targets": [1] },
                        { "width": "15%", "targets": [2] },
                        { "width": "15%", "targets": [3] },
                        { "width": "40%", "targets": [4] },
                    ],
                    ajax: {
                        url: `${api}8080/file/page/${type}/${uuid}/${officeId}`,
                        type: 'GET',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,
                                size: d.length,
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
                    columns: tableColumnsForReportingDatePhotos()
                });

                $(document).off('click', '.btn-delete-reporting-date-photo').on('click', '.btn-delete-reporting-date-photo', function () {
                    var fileId = $(this).data('id');
                    if (!fileId) return;
                    if (!confirm('Are you sure you want to delete this file?')) return;
                    __executeExternalGet('8080/file/delete/' + fileId).done(function (res) {
                        if (res.status !== 'ERROR') {
                            fsToast('File deleted successfully.', 'success');
                            if (dataTableReportingDate) {
                                dataTableReportingDate.ajax.reload(null, false);
                            }
                        } else {
                            fsToast('Could not delete file.', 'danger');
                        }
                    });
                });
            } else {
                dataTableReportingDate.ajax.url(`${api}8080/file/page/${type}/${uuid}/${officeId}`).load();
            }
        }

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
                                    fsToast('File deleted successfully.', 'success');
                                    window.location.reload(true);
                                } else {
                                    fsToast('Could not delete file.', 'danger');
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
                fsToast(String(e.name || 'Camera error'), 'danger');
              }
            $('#open').unbind("click").on("click", function(){
              opencam();
               $('#control').show();
            });
            $('#cancel_modal').unbind("click").on("click", function(){
              closecam();
            });
        });

        $('#investigationUploadModal').on('show.bs.modal', function () {
            $('#no_dockets_upload_investigation').hide();
            refreshUploadModalDocketSelects();
        });
        $('#supervisionUploadModal').on('show.bs.modal', function () {
            $('#no_dockets_upload_supervision').hide();
            refreshUploadModalDocketSelects();
        });
        $('#investigationUploadModal').on('hidden.bs.modal', function () {
            $('#no_dockets_upload_investigation').hide();
        });
        $('#supervisionUploadModal').on('hidden.bs.modal', function () {
            $('#no_dockets_upload_supervision').hide();
        });

        $(".edit-link").unbind("click").on("click", function(){
            window.location.href = window.pisUrl('client_update?client_id='+client_id+'&client_fo='+client_fo);
        })

        $(".btn-addInvestigation").unbind("click").on("click", function(){
            $("#investigationUploadModal").modal("show")

            $(".saveInvestigationDocument").unbind("click").on("click", function(){
                performInvestigationDocumentUpload();
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
                    performInvestigationDocumentUpload();
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
                    performSupervisionDocumentUpload();
                })
            })
            loadSupervisionFiles();
        })

        $("#rehabilitationTab").unbind("click").on("click", function(){
            fsTabLoaderNonce++;
            fsHideTabLoader();
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
            fsTabLoaderNonce++;
            fsHideTabLoader();
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
                        <table id="" class="table table-bordered table_head_reporting_date" style="max-width: 100%;">
                            <thead>
                                <th>#</th>
                                <th>File name</th>
                                <th>Date</th>
                                <th>Reporting type</th>
                                <th>Actions</th>
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
            dataTableReportingDate = null;
            loadReportingDatePhotos("reporting_date_photo", client_id, client_fo)
        })

        $("#otherDocumentsTab").unbind("click").on("click", function(){
            fsTabLoaderNonce++;
            fsHideTabLoader();
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
                        $("#file-input-other").addClass("is-invalid");
                        $("#file-input-other-hint").addClass("is-visible").text("Please choose a file to upload.");
                        $(".saveOtherDocument").prop("disabled", true)
                        setTimeout (function () {
                            $("#failed_upload_other").hide();
                            $("#file-input-other").removeClass("is-invalid");
                            $("#file-input-other-hint").removeClass("is-visible").text("");
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
            fsTabLoaderNonce++;
            fsHideTabLoader();
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
            fsTabLoaderNonce++;
            fsHideTabLoader();
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
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:10px;">
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                        <button type="button" id="iframePrintBtn" class="btn btn-sm btn-primary" style="display:none" title="Print" aria-label="Print document">
                            <i class="fa fa-print"></i> Print
                        </button>
                        <button type="button" id="iframeDownloadBtn" class="btn btn-sm btn-outline-secondary" style="display:none" title="Download" aria-label="Download document">
                            <i class="fa fa-download"></i> Download
                        </button>
                        </div>
                        <div style="flex:1;"></div>
                        <button type="button" id="closePreview" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- PDF iframe -->
                    <iframe id="pdfIframe" style="flex:1; width:100%; border:none; border-radius:6px;"></iframe>

                  </div>
                </div>

                <div class="tab-pane fade show active" id="docketListContent" style="overflow: auto; max-height: 100%">
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
            var $btn = $(this);
            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {
                if (result.status === "ERROR") {
                    alert("Could not load PSIR worksheet.");
                    return;
                }
                try {
                    var worksheetData = JSON.parse(result.response.jsonData);
                    if (typeof fsBuildPpaPsirPrintDocument !== "function") {
                        alert("Print layout failed to load. Refresh the page and try again.");
                        return;
                    }
                    __executeExternalGet(`8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`).always(function (resImage) {
                        var logoP = loadImageToBase64(`images/pis_logo.png`);
                        var photoP = Promise.resolve("");
                        if (resImage && resImage.status !== "ERROR" && resImage.files && resImage.files[0]) {
                            var petitionerProfileId = resImage.files[0].id;
                            photoP = loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId}`);
                        }
                        var cov = "images/psir_cover/";
                        var coverPpaSealP = loadImageToBase64(cov + "ppa-seal.png");
                        var coverDojP = loadImageToBase64(cov + "doj-logo.png");
                        var coverBpP = loadImageToBase64(cov + "bagong-pilipinas.png");
                        var coverRedeemP = loadImageToBase64(cov + "redeeming-lives-banner.png");
                        var coverIsoP = loadImageToBase64(cov + "iso-bureau-veritas.png");
                        Promise.all([
                            logoP,
                            photoP,
                            coverPpaSealP,
                            coverDojP,
                            coverBpP,
                            coverRedeemP,
                            coverIsoP,
                        ]).then(function (imgs) {
                            var $tr = $btn.closest("tr");
                            var dockCell = ($tr.attr("data-docket-number") || $tr.find("td").eq(1).text() || "").trim();
                            var meta = {
                                variant: "short",
                                logoSrc: imgs[0] || "",
                                photoSrc: imgs[1] || "",
                                coverPpaSealSrc: imgs[2] || "",
                                coverDojLogoSrc: imgs[3] || "",
                                coverBagongPilipinasSrc: imgs[4] || "",
                                coverRedeemingLivesSrc: imgs[5] || "",
                                coverIsoBvSrc: imgs[6] || "",
                                departmentName: ($.cookie("departmentName") || "").trim(),
                                officeName: ($.cookie("departmentName") || "").trim(),
                                officeAddress: "",
                                officePhone: "",
                                officeWebsite: "",
                                officeWebsiteLabel: "",
                                coverFormRevision: "001",
                                docketNumber: dockCell,
                                petitionersName: petitionersName || "",
                                pageNumber: "1"
                            };
                            var html = fsBuildPpaPsirPrintDocument(worksheetData, meta);
                            var blob = new Blob([html], { type: "text/html;charset=utf-8" });
                            var worksheetUrl = URL.createObjectURL(blob);
                            var modal = document.getElementById("pdfPreviewModal");
                            var iframe = document.getElementById("pdfIframe");
                            if (!modal || !iframe) {
                                var wopen = window.open("", "_blank");
                                if (wopen) {
                                    wopen.document.open();
                                    wopen.document.write(html);
                                    wopen.document.close();
                                    wopen.focus();
                                }
                                URL.revokeObjectURL(worksheetUrl);
                                return;
                            }
                            iframe.onload = function () {
                                iframe.onload = null;
                                try { iframe.contentWindow.focus(); } catch (ignored) {}
                            };
                            iframe.src = worksheetUrl;
                            modal.style.display = "flex";
                            var safeFileBase = (worksheetData.identifyingData && worksheetData.identifyingData.name)
                                ? String(worksheetData.identifyingData.name)
                                : ("client_" + String(client_id || "psir"));
                            safeFileBase = safeFileBase.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "PSIR";
                            var downloadFileName = "PPA_PSIR_" + safeFileBase + ".html";
                            $("#iframePrintBtn").show().off("click.wsPsirPrint").on("click.wsPsirPrint", function () {
                                try { iframe.contentWindow.print(); } catch (e2) { console.error(e2); }
                            });
                            $("#iframeDownloadBtn").show().off("click.wsPsirDl").on("click.wsPsirDl", function () {
                                try {
                                    var a = document.createElement("a");
                                    a.href = worksheetUrl;
                                    a.download = downloadFileName;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                } catch (e3) { console.error(e3); }
                            });
                            $("#closePreview").off("click.fsPreviewClose").on("click.fsPreviewClose", function () {
                                $("#pdfPreviewModal").css("display", "none");
                                $("#iframePrintBtn").hide();
                                $("#iframeDownloadBtn").hide();
                                URL.revokeObjectURL(worksheetUrl);
                            });
                        });
                    });
                } catch (errPrint) {
                    console.error(errPrint);
                    alert("Could not prepare the PSIR for printing.");
                }
            });
        });

        $(document).off("click", ".btn_pdfPSIRLong").on("click", ".btn_pdfPSIRLong", function(e) {
            e.preventDefault();
            var $btn = $(this);
            __executeExternalGet('8000/worksheet/getPetitioner/psir/'+client_id).done(function (result) {
                if (result.status === "ERROR") {
                    alert("Could not load PSIR worksheet.");
                    return;
                }
                try {
                    var worksheetData = JSON.parse(result.response.jsonData);
                    if (typeof fsBuildPpaPsirPrintDocument !== "function") {
                        alert("Print layout failed to load. Refresh the page and try again.");
                        return;
                    }
                    __executeExternalGet(`8080/file/getLatest/petitioner_profile/${client_id}/${client_fo}`).always(function (resImage) {
                        var logoP = loadImageToBase64(`images/pis_logo.png`);
                        var photoP = Promise.resolve("");
                        if (resImage && resImage.status !== "ERROR" && resImage.files && resImage.files[0]) {
                            var petitionerProfileId = resImage.files[0].id;
                            photoP = loadImageToBase64(`${___ctx}8080/file/view/${petitionerProfileId}`);
                        }
                        var cov = "images/psir_cover/";
                        var coverPpaSealP = loadImageToBase64(cov + "ppa-seal.png");
                        var coverDojP = loadImageToBase64(cov + "doj-logo.png");
                        var coverBpP = loadImageToBase64(cov + "bagong-pilipinas.png");
                        var coverRedeemP = loadImageToBase64(cov + "redeeming-lives-banner.png");
                        var coverIsoP = loadImageToBase64(cov + "iso-bureau-veritas.png");
                        Promise.all([
                            logoP,
                            photoP,
                            coverPpaSealP,
                            coverDojP,
                            coverBpP,
                            coverRedeemP,
                            coverIsoP,
                        ]).then(function (imgs) {
                            var $tr = $btn.closest("tr");
                            var dockCell = ($tr.attr("data-docket-number") || $tr.find("td").eq(1).text() || "").trim();
                            var meta = {
                                variant: "long",
                                logoSrc: imgs[0] || "",
                                photoSrc: imgs[1] || "",
                                coverPpaSealSrc: imgs[2] || "",
                                coverDojLogoSrc: imgs[3] || "",
                                coverBagongPilipinasSrc: imgs[4] || "",
                                coverRedeemingLivesSrc: imgs[5] || "",
                                coverIsoBvSrc: imgs[6] || "",
                                departmentName: ($.cookie("departmentName") || "").trim(),
                                officeName: ($.cookie("departmentName") || "").trim(),
                                officeAddress: "",
                                officePhone: "",
                                officeWebsite: "",
                                officeWebsiteLabel: "",
                                coverFormRevision: "001",
                                docketNumber: dockCell,
                                petitionersName: petitionersName || "",
                                pageNumber: "1"
                            };
                            var html = fsBuildPpaPsirPrintDocument(worksheetData, meta);
                            var blob = new Blob([html], { type: "text/html;charset=utf-8" });
                            var worksheetUrl = URL.createObjectURL(blob);
                            var modal = document.getElementById("pdfPreviewModal");
                            var iframe = document.getElementById("pdfIframe");
                            if (!modal || !iframe) {
                                var wopen = window.open("", "_blank");
                                if (wopen) {
                                    wopen.document.open();
                                    wopen.document.write(html);
                                    wopen.document.close();
                                    wopen.focus();
                                }
                                URL.revokeObjectURL(worksheetUrl);
                                return;
                            }
                            iframe.onload = function () {
                                iframe.onload = null;
                                try { iframe.contentWindow.focus(); } catch (ignored) {}
                            };
                            iframe.src = worksheetUrl;
                            modal.style.display = "flex";
                            var safeFileBase = (worksheetData.identifyingData && worksheetData.identifyingData.name)
                                ? String(worksheetData.identifyingData.name)
                                : ("client_" + String(client_id || "psir"));
                            safeFileBase = safeFileBase.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "PSIR";
                            var downloadFileName = "PPA_PSIR_Long_" + safeFileBase + ".html";
                            $("#iframePrintBtn").show().off("click.wsPsirPrint").on("click.wsPsirPrint", function () {
                                try { iframe.contentWindow.print(); } catch (e2) { console.error(e2); }
                            });
                            // $("#iframeDownloadBtn").show().off("click.wsPsirDl").on("click.wsPsirDl", function () {
                            //     try {
                            //         var a = document.createElement("a");
                            //         a.href = worksheetUrl;
                            //         a.download = downloadFileName;
                            //         document.body.appendChild(a);
                            //         a.click();
                            //         document.body.removeChild(a);
                            //     } catch (e3) { console.error(e3); }
                            // });
                            $("#closePreview").off("click.fsPreviewClose").on("click.fsPreviewClose", function () {
                                $("#pdfPreviewModal").css("display", "none");
                                $("#iframePrintBtn").hide();
                                $("#iframeDownloadBtn").hide();
                                URL.revokeObjectURL(worksheetUrl);
                            });
                        });
                    });
                } catch (errPrint) {
                    console.error(errPrint);
                    alert("Could not prepare the PSIR for printing.");
                }
            });
        });

        $(document).off("click", ".btn_pdfWorksheet").on("click", ".btn_pdfWorksheet", function(e) {
            e.preventDefault();
            __executeExternalGet('8000/worksheet/getPetitioner/worksheet/'+client_id).done(function (result) {
                if (result.status != "ERROR") {
                    try {
                        var worksheetData = JSON.parse(result.response.jsonData);
                        if (typeof fsBuildPpaWorksheetPrintDocument !== "function") {
                            console.error("fsBuildPpaWorksheetPrintDocument missing; load ppaWorksheetPrintHtml.js");
                            alert("Print layout failed to load. Refresh the page and try again.");
                            return;
                        }
                        var html = fsBuildPpaWorksheetPrintDocument(worksheetData);
                        var blob = new Blob([html], { type: "text/html;charset=utf-8" });
                        var worksheetUrl = URL.createObjectURL(blob);

                        var modal = document.getElementById("pdfPreviewModal");
                        var iframe = document.getElementById("pdfIframe");

                        if (!modal || !iframe) {
                            var wopen = window.open("", "_blank");
                            if (wopen) {
                                wopen.document.open();
                                wopen.document.write(html);
                                wopen.document.close();
                                wopen.focus();
                            }
                            URL.revokeObjectURL(worksheetUrl);
                            return;
                        }

                        iframe.onload = function () {
                            iframe.onload = null;
                            try { iframe.contentWindow.focus(); } catch (ignored) {}
                        };
                        iframe.src = worksheetUrl;
                        modal.style.display = "flex";
                        var safeFileBase = (function () {
                            var raw = (worksheetData.identifyingData && worksheetData.identifyingData.name)
                                ? String(worksheetData.identifyingData.name)
                                : ("client_" + String(client_id || "worksheet"));
                            var s = raw.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
                            return s || "PPA_Worksheet";
                        })();
                        var downloadFileName = "PPA_Worksheet_" + safeFileBase + ".html";

                        $("#iframePrintBtn").show().off("click.wsWorksheetPrint").on("click.wsWorksheetPrint", function () {
                            try {
                                iframe.contentWindow.print();
                            } catch (e2) {
                                console.error(e2);
                            }
                        });

                        $("#closePreview").off("click.fsPreviewClose").on("click.fsPreviewClose", function () {
                            $("#pdfPreviewModal").css("display", "none");
                            $("#iframePrintBtn").hide();
                            $("#iframeDownloadBtn").hide();
                            URL.revokeObjectURL(worksheetUrl);
                        });

                    } catch (errPrint) {
                        console.error(errPrint);
                        alert("Could not prepare the worksheet for printing.");
                    }
                }
            });
        });

    } )( jQuery );