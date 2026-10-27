(function ($) {
    "use strict";

    if (!$ || !$.fn || window.__pisLegalFormsBound) return;
    window.__pisLegalFormsBound = true;

    var formsModal = document.getElementById("legalFormsModal");
    var downloadModal = document.getElementById("legalFormDownloadModal");
    if (!formsModal || !downloadModal) return;
    if (formsModal.parentNode !== document.body) document.body.appendChild(formsModal);
    if (downloadModal.parentNode !== document.body) document.body.appendChild(downloadModal);

    function bindLegalTooltip(el) {
        if (!$.fn.tooltip) return;
        var $el = $(el);
        if ($el.data("bs.tooltip")) return;
        $el.tooltip({
            title: "Certification and waiver forms",
            placement: "top",
            container: "body",
            trigger: "hover",
            template: '<div class="tooltip legal-forms-tip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }

    $(document).on("mouseenter", ".btn-legal-forms", function () {
        bindLegalTooltip(this);
    });

    var active = { clientId: "", docketNumber: "", officeId: "" };

    var state = {
        record: null,
        data: {},
        jsonOk: true,
        office: {},
        editing: "",
        uploadForm: "",
        previewUrl: null,
        previewHtml: "",
        previewBase: "PPA_Form",
        previewBusy: false
    };

    function apiUrl(path) {
        if (typeof window.pisApiUrl === "function") return window.pisApiUrl(path);
        var base = localStorage.getItem("api") || "";
        return base + path;
    }

    function apiGet(path) {
        return $.ajax({ method: "GET", url: apiUrl(path), dataType: "json" });
    }

    function apiPost(path, payload) {
        return $.ajax({
            method: "POST",
            url: apiUrl(path),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(payload)
        });
    }

    function clientId() {
        if (active.clientId) return active.clientId;
        return window.WorksheetApi ? WorksheetApi.clientId() : "";
    }

    function docketNumber() {
        if (active.docketNumber) return active.docketNumber;
        return window.WorksheetApi ? WorksheetApi.docketNumber() : "";
    }

    function officeId() {
        if (active.officeId) return active.officeId;
        return window.WorksheetApi ? WorksheetApi.fieldOfficeId() : "";
    }

    function parseJson(raw) {
        if (raw == null || raw === "") return { ok: true, data: {} };
        if (typeof raw === "object") return { ok: true, data: raw };
        try {
            return { ok: true, data: JSON.parse(raw) || {} };
        } catch (err) {
            return { ok: false, data: {} };
        }
    }

    function todayIso() {
        var d = new Date();
        var month = String(d.getMonth() + 1);
        var day = String(d.getDate());
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return d.getFullYear() + "-" + month + "-" + day;
    }

    function showAlert(message, kind) {
        var $alert = $("#legalFormsAlert");
        $alert.removeClass("alert-success alert-danger alert-warning")
            .addClass(kind === "success" ? "alert-success" : kind === "warning" ? "alert-warning" : "alert-danger")
            .text(message)
            .show();
    }

    function hideAlert() {
        $("#legalFormsAlert").hide().text("");
    }

    function hasText(value) {
        return String(value == null ? "" : value).trim() !== "";
    }

    function isSaved(form) {
        if (!form || typeof form !== "object") return false;
        if (form.updatedAt) return true;
        return hasText(form.petitionerName) || hasText(form.signedOn) || hasText(form.place)
            || hasText(form.petitionerSignature) || hasText(form.officerSignature)
            || hasText(form.authorizedPerson) || hasText(form.authorizedOffice)
            || hasText(form.swornOn) || hasText(form.swornPlace) || hasText(form.othersSpecify);
    }

    function signatureDataUrl(value) {
        var text = String(value == null ? "" : value).replace(/^\s+|\s+$/g, "");
        if (!text) return "";
        var dataUrl = text.match(/^data:image\/[a-z0-9.+-]+;base64,/i);
        if (dataUrl) return text;
        var compact = text.replace(/\s+/g, "");
        if (compact.length > 80 && /^[A-Za-z0-9+/=]+$/.test(compact)) {
            return "data:image/png;base64," + compact;
        }
        return "";
    }

    function recordStatusLabel() {
        var status = state.record && state.record.worksheetStatus;
        status = status == null ? "" : String(status).trim();
        if (!status || status === "null") return "Not Available";
        return status;
    }

    function paintStatus() {
        var cert = state.data.certification || null;
        var waiver = state.data.waiver || null;
        var label = recordStatusLabel();
        $("#legalCertStatus, #legalWaiverStatus").text(label).toggleClass("is-saved", label.toLowerCase() === "complete");
        $("#legalCertEdit").text(isSaved(cert) ? "Update" : "Create");
        $("#legalWaiverEdit").text(isSaved(waiver) ? "Update" : "Create");
        var docket = docketNumber();
        $("#legalFormsDocket").text(docket ? "Docket " + docket : "");
    }

    function showList() {
        state.editing = "";
        $("#legalSignLibrary").hide();
        $("#legalFormEditor").hide();
        $("#legalFormsList").show();
        paintStatus();
    }

    function officeFrom(dept) {
        if (!dept || dept.status === "ERROR" || dept.status === "FAILED") return {};
        var body = dept.name || dept.locationName ? dept : (dept.response || {});
        return {
            region: body.locationName || "",
            officeName: body.name || "",
            address: body.description || ""
        };
    }

    function applyRecord(result) {
        var record = result && result.response ? result.response : {};
        if (result && (result.status === "ERROR" || result.status === "FAILED")) {
            record = {};
        }
        state.record = record && record.id ? record : (record || {});
        var parsed = parseJson(state.record.jsonData);
        state.jsonOk = parsed.ok;
        state.data = parsed.ok ? parsed.data : (state.data || {});
        paintStatus();
    }

    function setRowButtonsEnabled(enabled) {
        $(".legal-edit, .legal-print, .legal-upload").prop("disabled", !enabled);
    }

    function refresh() {
        if (!window.WorksheetApi || !docketNumber() || !officeId()) {
            showAlert("Open this worksheet from a docket before filling the certification or waiver.", "warning");
            paintStatus();
            setRowButtonsEnabled(false);
            return;
        }
        var pending = 2;
        setRowButtonsEnabled(false);
        function finished() {
            pending -= 1;
            if (pending <= 0) setRowButtonsEnabled(true);
        }
        apiGet(WorksheetApi.getUrl("worksheet", docketNumber(), officeId())).done(applyRecord).fail(function () {
            showAlert("Could not load the worksheet.", "danger");
        }).always(finished);
        apiGet("8088/department/" + encodeURIComponent(officeId())).done(function (dept) {
            state.office = officeFrom(dept);
        }).always(finished);
    }

    function textOf(id) {
        return $.trim($("#" + id).val() || "");
    }

    function setChecked(id, on) {
        $("#" + id).prop("checked", !!on);
    }

    function openEditor(kind) {
        hideAlert();
        if (!docketNumber() || !officeId()) {
            showAlert("Open this worksheet from a docket before filling the certification or waiver.", "warning");
            return;
        }
        state.editing = kind;
        $("#legalSignLibrary").hide();
        var idData = state.data.identifyingData || {};
        var saved = kind === "certification" ? (state.data.certification || null) : (state.data.waiver || null);
        var fresh = !isSaved(saved);
        $("#legalFormsList").hide();
        $("#legalFormEditor").show();
        if (kind === "certification") {
            $("#legalCertFields").show();
            $("#legalWaiverFields").hide();
            $("#legalFormEditorTitle").text(fresh ? "Create certification" : "Update certification");
            $("#legalFormEditorLead").text("Prints on PPA Form 1. Draw each e-signature, upload a PNG or JPG, or choose an image already stored under Notes / Other Documents.");
            $("#legalCertName").val(fresh ? (idData.name || "") : (saved.petitionerName || ""));
            $("#legalCertDate").val(fresh ? todayIso() : (saved.signedOn || ""));
            $("#legalCertPlace").val(fresh ? (state.office.address || state.office.officeName || "") : (saved.place || ""));
        } else {
            $("#legalCertFields").hide();
            $("#legalWaiverFields").show();
            $("#legalFormEditorTitle").text(fresh ? "Create waiver" : "Update waiver");
            $("#legalFormEditorLead").text("Prints on PPA Form 2. Draw each e-signature, upload a PNG or JPG, or choose an image already stored under Notes / Other Documents.");
            var records = (saved && saved.records) || {};
            $("#legalWaiverPerson").val(fresh ? (idData.interviewedBy || localStorage.getItem("userName") || "") : (saved.authorizedPerson || ""));
            $("#legalWaiverOffice").val(fresh ? (state.office.officeName || "") : (saved.authorizedOffice || ""));
            setChecked("legalWaiverArrest", fresh ? true : !!records.arrest);
            setChecked("legalWaiverProbation", fresh ? true : !!records.probation);
            setChecked("legalWaiverSchool", fresh ? true : !!records.school);
            setChecked("legalWaiverMedical", fresh ? true : !!records.medical);
            setChecked("legalWaiverMilitary", fresh ? true : !!records.military);
            $("#legalWaiverOthers").val(fresh ? "" : (saved.othersSpecify || ""));
            $("#legalWaiverDate").val(fresh ? todayIso() : (saved.swornOn || ""));
            $("#legalWaiverPlace").val(fresh ? (state.office.address || state.office.officeName || "") : (saved.swornPlace || ""));
        }
        var petitionerSignature = saved && saved.petitionerSignature;
        var officerSignature = saved && saved.officerSignature;
        function paintSignatures() {
            loadPad(document.getElementById("legalSignPetitioner"), petitionerSignature);
            loadPad(document.getElementById("legalSignOfficer"), officerSignature);
        }
        paintSignatures();
        window.requestAnimationFrame(paintSignatures);
        $("#legalFormSave").prop("disabled", false).text("Save");
    }

    function padContext(canvas) {
        return canvas.getContext("2d");
    }

    function blankPad(canvas) {
        if (!canvas) return;
        var ctx = padContext(canvas);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.dataset.signed = "";
        canvas.dataset.source = "";
    }

    function placeSignatureImage(canvas, dataUrl) {
        if (!canvas) return;
        var img = new Image();
        img.onload = function () {
            if (!img.width || !img.height) {
                showAlert("Could not use that signature image.", "danger");
                return;
            }
            var ctx = padContext(canvas);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            var width = img.width * scale;
            var height = img.height * scale;
            ctx.drawImage(img, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
            canvas.dataset.signed = "1";
            canvas.dataset.source = canvas.toDataURL("image/png");
        };
        img.onerror = function () {
            showAlert("Could not use that signature image.", "danger");
        };
        img.src = dataUrl;
    }

    function loadPad(canvas, dataUrl) {
        blankPad(canvas);
        var src = signatureDataUrl(dataUrl);
        if (!canvas || !src) return;
        if (!canvas.width || !canvas.height) {
            canvas.width = 520;
            canvas.height = 140;
        }
        var token = (canvas._sigToken || 0) + 1;
        canvas._sigToken = token;
        canvas.dataset.signed = "1";
        canvas.dataset.source = src;
        var img = new Image();
        img.onload = function () {
            if (canvas._sigToken !== token || !img.width || !img.height) return;
            var ctx = padContext(canvas);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            var width = img.width * scale;
            var height = img.height * scale;
            ctx.drawImage(img, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
            canvas.dataset.source = canvas.toDataURL("image/png");
        };
        img.src = src;
    }

    function readPad(id) {
        var canvas = document.getElementById(id);
        if (!canvas || canvas.dataset.signed !== "1") return "";
        if (canvas.dataset.source) return canvas.dataset.source;
        return canvas.toDataURL("image/png");
    }

    function padPoint(canvas, ev) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (ev.clientX - rect.left) * (canvas.width / rect.width),
            y: (ev.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function bindPad(canvas) {
        if (!canvas || canvas.dataset.bound === "1") return;
        canvas.dataset.bound = "1";
        blankPad(canvas);
        var drawing = false;
        var ctx = padContext(canvas);
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#111";
        canvas.addEventListener("pointerdown", function (ev) {
            ev.preventDefault();
            drawing = true;
            try { canvas.setPointerCapture(ev.pointerId); } catch (err) {}
            canvas.dataset.source = "";
            var point = padPoint(canvas, ev);
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            canvas.dataset.signed = "1";
        });
        canvas.addEventListener("pointermove", function (ev) {
            if (!drawing) return;
            var point = padPoint(canvas, ev);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
        });
        function stop() { drawing = false; }
        canvas.addEventListener("pointerup", stop);
        canvas.addEventListener("pointercancel", stop);
    }

    function collectCertification() {
        return {
            petitionerName: textOf("legalCertName"),
            signedOn: textOf("legalCertDate"),
            place: textOf("legalCertPlace"),
            petitionerSignature: readPad("legalSignPetitioner"),
            officerSignature: readPad("legalSignOfficer"),
            updatedAt: new Date().toISOString()
        };
    }

    function collectWaiver() {
        return {
            authorizedPerson: textOf("legalWaiverPerson"),
            authorizedOffice: textOf("legalWaiverOffice"),
            records: {
                arrest: $("#legalWaiverArrest").prop("checked"),
                probation: $("#legalWaiverProbation").prop("checked"),
                school: $("#legalWaiverSchool").prop("checked"),
                medical: $("#legalWaiverMedical").prop("checked"),
                military: $("#legalWaiverMilitary").prop("checked")
            },
            othersSpecify: textOf("legalWaiverOthers"),
            swornOn: textOf("legalWaiverDate"),
            swornPlace: textOf("legalWaiverPlace"),
            petitionerSignature: readPad("legalSignPetitioner"),
            officerSignature: readPad("legalSignOfficer"),
            updatedAt: new Date().toISOString()
        };
    }

    function missingFields(kind) {
        if (kind === "certification") {
            if (!textOf("legalCertName") || !textOf("legalCertDate") || !textOf("legalCertPlace")) {
                return "Enter the petitioner’s name, the date signed, and the place.";
            }
            return "";
        }
        if (!textOf("legalWaiverPerson") || !textOf("legalWaiverOffice") || !textOf("legalWaiverDate") || !textOf("legalWaiverPlace")) {
            return "Enter the authorized person, office, date sworn, and place sworn.";
        }
        return "";
    }

    function saveForm() {
        var kind = state.editing;
        var problem = missingFields(kind);
        if (problem) {
            showAlert(problem, "warning");
            return;
        }
        var formData = kind === "certification" ? collectCertification() : collectWaiver();
        var $btn = $("#legalFormSave");
        $btn.prop("disabled", true).text("Saving…");
        apiGet(WorksheetApi.getUrl("worksheet", docketNumber(), officeId())).done(function (result) {
            applyRecord(result);
            if (!state.jsonOk) {
                $btn.prop("disabled", false).text("Save");
                showAlert("The worksheet data could not be read, so this form was not saved.", "danger");
                return;
            }
            var existing = state.data || {};
            if (kind === "certification") existing.certification = formData;
            else existing.waiver = formData;
            var record = state.record || {};
            var payload = {
                petitionerId: record.petitionerId || clientId(),
                docketNumber: record.docketNumber || docketNumber(),
                jsonData: JSON.stringify(existing),
                type: "worksheet",
                worksheetStatus: record.worksheetStatus || "incomplete",
                createdBy: $.cookie("uuid") || "",
                updatedBy: $.cookie("uuid") || "",
                fieldOfficeId: record.fieldOfficeId || officeId()
            };
            var path = record.id ? WorksheetApi.updateUrl("worksheet", docketNumber(), officeId()) : "8000/worksheet/create";
            apiPost(path, payload).done(function (res) {
                $btn.prop("disabled", false).text("Save");
                if (!res || res.status === "ERROR" || res.status === "FAILED") {
                    showAlert((res && res.message) || "Could not save the form.", "danger");
                    return;
                }
                if (res.response) applyRecord(res);
                else {
                    state.data = existing;
                    state.record = record;
                    state.record.jsonData = payload.jsonData;
                }
                showList();
                showAlert(kind === "certification" ? "Certification saved." : "Waiver saved.", "success");
            }).fail(function () {
                $btn.prop("disabled", false).text("Save");
                showAlert("Could not save the form.", "danger");
            });
        }).fail(function () {
            $btn.prop("disabled", false).text("Save");
            showAlert("Could not load the worksheet to save this form.", "danger");
        });
    }

    function fileBase(kind) {
        var idData = state.data.identifyingData || {};
        var cert = state.data.certification || {};
        var name = idData.name || cert.petitionerName || kind;
        var safe = String(name).replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || kind;
        return (kind === "certification" ? "PPA_Certification_" : "PPA_Waiver_") + safe;
    }

    function buildPrintHtml(kind) {
        if (kind === "certification") {
            if (typeof fsBuildPpaCertificationPrintDocument !== "function") return "";
            return fsBuildPpaCertificationPrintDocument(state.data.certification || {}, state.office);
        }
        if (typeof fsBuildPpaWaiverPrintDocument !== "function") return "";
        return fsBuildPpaWaiverPrintDocument(state.data.waiver || {}, state.office);
    }

    function syncFormatCards() {
        $("#legalFormDownloadModal .ws-dl-option").each(function () {
            var selected = $(this).find("input[type='radio']").prop("checked");
            $(this).toggleClass("is-selected", !!selected);
        });
    }

    function closePreview() {
        downloadModal.style.display = "none";
        var frame = document.getElementById("legalFormPreviewFrame");
        if (frame) frame.src = "about:blank";
        if (state.previewUrl) {
            URL.revokeObjectURL(state.previewUrl);
            state.previewUrl = null;
        }
        $(document).off("keydown.legalFormEsc");
    }

    function openPreview(html, title, base) {
        var frame = document.getElementById("legalFormPreviewFrame");
        if (!frame) return;
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
        var blob = new Blob([html], { type: "text/html;charset=utf-8" });
        state.previewUrl = URL.createObjectURL(blob);
        state.previewHtml = html;
        state.previewBase = base;
        $("#legalFormDownloadTitle").text(title);
        $("#legalFormFormatPdf").prop("checked", true);
        syncFormatCards();
        frame.src = state.previewUrl;
        downloadModal.style.display = "flex";
    }

    document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape" && downloadModal.style.display === "flex") {
            ev.preventDefault();
            ev.stopPropagation();
            closePreview();
        }
    }, true);

    function printForm(kind) {
        hideAlert();
        var html = buildPrintHtml(kind);
        if (!html) {
            showAlert("Print layout failed to load. Refresh the page and try again.", "danger");
            return;
        }
        openPreview(html, kind === "certification" ? "Certification" : "Waiver", fileBase(kind));
    }

    function isJpegOrPng(file) {
        if (!file || !file.size || file.size > 60 * 1024 * 1024) return false;
        var name = String(file.name || "").toLowerCase();
        var type = String(file.type || "").toLowerCase();
        if (!/\.(jpe?g|png)$/.test(name)) return false;
        return type === "" || type === "image/jpeg" || type === "image/jpg" || type === "image/pjpeg" || type === "image/png";
    }

    function storeNotesImage(file, remarks) {
        var createdBy = localStorage.getItem("userName") || $.cookie("uuid") || "user";
        var path = "8080/file/upload?uuid=" + encodeURIComponent(clientId()) +
            "&officeId=" + encodeURIComponent(officeId()) +
            "&type=notesAndOtherDocuments" +
            "&version=0" +
            "&kind=image" +
            "&remarks=" + encodeURIComponent(remarks) +
            "&createdby=" + encodeURIComponent(createdBy) +
            "&dateReceived=" + encodeURIComponent(todayIso());
        var form = new FormData();
        form.append("file", file, file.name);
        return $.ajax({
            method: "POST",
            url: apiUrl(path),
            data: form,
            processData: false,
            contentType: false,
            timeout: 0
        });
    }

    function notesUploadError(xhr, fallback) {
        if (xhr && xhr.status === 413) return "The image exceeds the 60 MB upload limit.";
        return fallback;
    }

    function uploadImage(file) {
        if (!clientId() || !officeId()) {
            showAlert("The petitioner and field office are required before uploading.", "warning");
            return;
        }
        if (!isJpegOrPng(file)) {
            showAlert("Upload a JPG or PNG image, up to 60 MB.", "warning");
            return;
        }
        var remarks = state.uploadForm === "waiver" ? "Waiver" : "Certification";
        showAlert("Uploading image…", "warning");
        storeNotesImage(file, remarks).done(function () {
            showAlert(remarks + " image uploaded. It is listed under Notes / Other Documents.", "success");
        }).fail(function (xhr) {
            showAlert(notesUploadError(xhr, "Could not upload the image."), "danger");
        });
    }

    function signatureRemarks(padId) {
        var form = state.editing === "waiver" ? "Waiver" : "Certification";
        var who = padId === "legalSignOfficer" ? "investigating officer signature" : "petitioner signature";
        var docket = docketNumber();
        return form + " " + who + (docket ? " " + docket : "");
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function isNotesImage(file) {
        if (!file) return false;
        var name = String(file.fileName || "").toLowerCase();
        var type = String(file.contentType || "").toLowerCase();
        if (/\.(jpe?g|png)$/.test(name)) return true;
        if (type === "image/jpeg" || type === "image/jpg" || type === "image/pjpeg" || type === "image/png") return true;
        return String(file.kind || "").toLowerCase() === "image" && !/\.(pdf|docx?)$/.test(name);
    }

    function notesImageLabel(file) {
        var name = file.fileName || "Image";
        return file.remarks ? name + " — " + file.remarks : name;
    }

    function openNotesPicker(padId) {
        signUploadPad = padId;
        $("#legalSignLibrary").show();
        $("#legalSignLibraryList").html('<div class="text-muted small">Loading images…</div>');
        if (!clientId() || !officeId()) {
            $("#legalSignLibraryList").html('<div class="text-muted small">The petitioner and field office are required.</div>');
            return;
        }
        apiGet("8080/file/list/notesAndOtherDocuments/" + encodeURIComponent(clientId()) + "/" + encodeURIComponent(officeId()))
            .done(function (result) {
                var files = (result && result.files) || [];
                var images = [];
                for (var i = 0; i < files.length; i++) {
                    if (isNotesImage(files[i]) && files[i].id != null) images.push(files[i]);
                }
                if (!images.length) {
                    $("#legalSignLibraryList").html('<div class="text-muted small">No JPG or PNG images are in Notes / Other Documents yet.</div>');
                    return;
                }
                var html = "";
                for (var n = 0; n < images.length; n++) {
                    var label = notesImageLabel(images[n]);
                    html += '<div class="legal-sign-library-item"><span class="legal-sign-library-name" title="' + escapeHtml(label) + '">' +
                        escapeHtml(label) + '</span><button type="button" class="btn btn-sm btn-outline-primary legal-sign-use" data-id="' +
                        escapeHtml(images[n].id) + '">Use</button></div>';
                }
                $("#legalSignLibraryList").html(html);
            })
            .fail(function () {
                $("#legalSignLibraryList").html('<div class="text-danger small">Could not load Notes / Other Documents.</div>');
            });
    }

    function useNotesImage(id) {
        var padId = signUploadPad;
        if (!id || !padId) return;
        showAlert("Loading signature image…", "warning");
        $.ajax({
            method: "GET",
            url: apiUrl("8080/file/download/" + encodeURIComponent(id)),
            xhrFields: { responseType: "blob" },
            timeout: 0
        }).done(function (blob) {
            if (!blob || !blob.size) {
                showAlert("Could not read that image.", "danger");
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                placeSignatureImage(document.getElementById(padId), reader.result);
                hideAlert();
            };
            reader.onerror = function () {
                showAlert("Could not read that image.", "danger");
            };
            reader.readAsDataURL(blob);
        }).fail(function () {
            showAlert("Could not load that image from Notes / Other Documents.", "danger");
        });
    }

    $(document).on("click", ".btn-legal-forms", function () {
        var $btn = $(this);
        active.clientId = $.trim($btn.attr("data-client-id") || "");
        active.docketNumber = $.trim($btn.attr("data-docket-number") || "");
        active.officeId = $.trim($btn.attr("data-office-id") || "");
        if ($btn.data("bs.tooltip")) $btn.tooltip("hide");
        $("#legalFormsModal").modal("show");
    });

    $("#legalFormsModal").on("show.bs.modal", function () {
        hideAlert();
        showList();
        refresh();
    });

    bindPad(document.getElementById("legalSignPetitioner"));
    bindPad(document.getElementById("legalSignOfficer"));
    $(document).on("click", ".legal-sign-clear", function () {
        blankPad(document.getElementById($(this).attr("data-pad")));
    });

    var signUploadPad = "";
    $(document).on("click", ".legal-sign-upload", function () {
        signUploadPad = $(this).attr("data-pad") || "";
        $("#legalSignFile").val("").trigger("click");
    });
    $("#legalSignFile").on("change", function () {
        var file = this.files && this.files[0];
        var padId = signUploadPad;
        $(this).val("");
        if (!file || !padId) return;
        if (!isJpegOrPng(file)) {
            showAlert("Upload a JPG or PNG signature, up to 60 MB.", "warning");
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            placeSignatureImage(document.getElementById(padId), reader.result);
            showAlert("Saving the signature under Notes / Other Documents…", "warning");
            storeNotesImage(file, signatureRemarks(padId)).done(function () {
                showAlert("Signature image saved. It is listed under Notes / Other Documents.", "success");
            }).fail(function (xhr) {
                showAlert(notesUploadError(xhr, "The signature is on the form, but it could not be stored under Notes / Other Documents."), "danger");
            });
        };
        reader.onerror = function () {
            showAlert("Could not read that signature image.", "danger");
        };
        reader.readAsDataURL(file);
    });
    $(document).on("click", ".legal-sign-notes", function () {
        openNotesPicker($(this).attr("data-pad") || "");
    });
    $("#legalSignLibraryClose").on("click", function () {
        $("#legalSignLibrary").hide();
    });
    $(document).on("click", ".legal-sign-use", function () {
        useNotesImage($(this).attr("data-id"));
    });

    $(document).on("click", ".legal-edit", function () {
        openEditor($(this).data("form"));
    });

    $(document).on("click", "#legalFormEditor .legal-back", function () {
        hideAlert();
        showList();
    });

    $("#legalFormSave").on("click", saveForm);

    $(document).on("click", ".legal-print", function () {
        printForm($(this).data("form"));
    });

    $(document).on("click", ".legal-upload", function () {
        state.uploadForm = $(this).data("form") || "certification";
        $("#legalFormsFile").val("").trigger("click");
    });

    $("#legalFormsFile").on("change", function () {
        var file = this.files && this.files[0];
        if (file) uploadImage(file);
        $(this).val("");
    });

    $("#legalFormDownloadClose").on("click", closePreview);
    $(document).on("change", "input[name='legalFormDownloadFormat']", syncFormatCards);
    $("#legalFormDownloadBtn").on("click", function () {
        if (state.previewBusy) return;
        if (!state.previewHtml || typeof fsDownloadPpaWorksheet !== "function") {
            alert("Download failed to load. Refresh the page and try again.");
            return;
        }
        var format = $("input[name='legalFormDownloadFormat']:checked").val() || "pdf";
        var $btn = $(this);
        state.previewBusy = true;
        $btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Preparing…');
        fsDownloadPpaWorksheet(state.previewHtml, format, state.previewBase).then(function () {
            state.previewBusy = false;
            $btn.prop("disabled", false).html('<i class="fa fa-download" aria-hidden="true"></i> Download');
        }, function () {
            state.previewBusy = false;
            $btn.prop("disabled", false).html('<i class="fa fa-download" aria-hidden="true"></i> Download');
            alert("Could not create the file. Try again.");
        });
    });
})(window.jQuery);
