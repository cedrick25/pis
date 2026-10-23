(function ($) {
    "use strict";

    if (!$ || !$.fn || window.__pisPsirRecBound) return;
    window.__pisPsirRecBound = true;

    var formsModal = document.getElementById("psirRecModal");
    var downloadModal = document.getElementById("psirRecDownloadModal");
    if (!formsModal || !downloadModal) return;
    if (formsModal.parentNode !== document.body) document.body.appendChild(formsModal);
    if (downloadModal.parentNode !== document.body) document.body.appendChild(downloadModal);

    var FORMS = {
        pending: { status: "#psirRecPendingStatus", edit: "#psirRecPendingEdit", title: "Pending records check or GIOR", file: "PSIR_Recommendation_Pending_" },
        complete: { status: "#psirRecCompleteStatus", edit: "#psirRecCompleteEdit", title: "Complete records check or GIOR", file: "PSIR_Recommendation_Complete_" },
        granted: { status: "#psirRecGrantedStatus", edit: "#psirRecGrantedEdit", title: "Granted", file: "PSIR_Recommendation_Granted_" },
        denied: { status: "#psirRecDeniedStatus", edit: "#psirRecDeniedEdit", title: "Denied", file: "PSIR_Recommendation_Denied_" }
    };

    function bindTooltip(el) {
        if (!$.fn.tooltip) return;
        var $el = $(el);
        if ($el.data("bs.tooltip")) return;
        $el.tooltip({
            title: "Recommendation forms",
            placement: "top",
            container: "body",
            trigger: "hover",
            template: '<div class="tooltip psir-rec-tip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }

    $(document).on("mouseenter", ".btn-psir-rec", function () {
        bindTooltip(this);
    });

    var active = { clientId: "", docketNumber: "", officeId: "" };
    var state = {
        record: null,
        data: {},
        jsonOk: true,
        office: {},
        period: {},
        editing: "",
        uploadForm: "",
        previewUrl: null,
        previewHtml: "",
        previewBase: "PSIR_Recommendation",
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
        var $alert = $("#psirRecAlert");
        $alert.removeClass("alert-success alert-danger alert-warning")
            .addClass(kind === "success" ? "alert-success" : kind === "warning" ? "alert-warning" : "alert-danger")
            .text(message)
            .show();
    }

    function hideAlert() {
        $("#psirRecAlert").hide().text("");
    }

    function isSaved(form) {
        return !!(form && form.updatedAt);
    }

    function recordStatusLabel() {
        var status = state.record && state.record.worksheetStatus;
        status = status == null ? "" : String(status).trim();
        if (!status || status === "null") return "Not Available";
        return status;
    }

    function formsBag() {
        return state.data.recommendationForms || {};
    }

    function petitionerName() {
        var id = state.data.identifyingData || {};
        return id.petitionersName || id.name || id.fullName || "";
    }

    function defaultOfficer() {
        return localStorage.getItem("userName") || "";
    }

    function defaultPlace() {
        return state.office.address || state.office.officeName || "";
    }

    function paintStatus() {
        var bag = formsBag();
        var label = recordStatusLabel();
        var complete = label.toLowerCase() === "complete";
        Object.keys(FORMS).forEach(function (kind) {
            var form = bag[kind] || null;
            $(FORMS[kind].status).text(label).toggleClass("is-saved", complete);
            $(FORMS[kind].edit).text(isSaved(form) ? "Update" : "Create");
        });
        var docket = docketNumber();
        $("#psirRecDocket").text(docket ? "Docket " + docket : "");
    }

    function showList() {
        state.editing = "";
        $("#psirRecSignLibrary").hide();
        $("#psirRecEditor").hide();
        $("#psirRecList").show();
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
        if (result && (result.status === "ERROR" || result.status === "FAILED")) record = {};
        state.record = record || {};
        var parsed = parseJson(state.record.jsonData);
        state.jsonOk = parsed.ok;
        state.data = parsed.ok ? parsed.data : (state.data || {});
        paintStatus();
    }

    function setRowButtonsEnabled(enabled) {
        $(".psir-rec-edit, .psir-rec-print, .psir-rec-upload").prop("disabled", !enabled);
    }

    function refresh() {
        if (!window.WorksheetApi || !docketNumber() || !officeId()) {
            showAlert("Open this PSIR from a docket before filling a recommendation.", "warning");
            paintStatus();
            setRowButtonsEnabled(false);
            return;
        }
        var pending = 3;
        setRowButtonsEnabled(false);
        function finished() {
            pending -= 1;
            if (pending <= 0) setRowButtonsEnabled(true);
        }
        apiGet(WorksheetApi.getUrl("psir", docketNumber(), officeId())).done(applyRecord).fail(function () {
            showAlert("Could not load the PSIR.", "danger");
        }).always(finished);
        apiGet(WorksheetApi.getUrl("psirRecommendation", docketNumber(), officeId())).done(function (result) {
            var record = result && result.response ? result.response : {};
            var parsed = parseJson(record.jsonData);
            state.period = parsed.ok ? parsed.data : {};
        }).always(finished);
        apiGet("8088/department/" + encodeURIComponent(officeId())).done(function (dept) {
            state.office = officeFrom(dept);
        }).always(finished);
    }

    function textOf(id) {
        return $.trim($("#" + id).val() || "");
    }

    function isShort(kind) {
        return kind === "pending" || kind === "complete";
    }

    function openEditor(kind) {
        hideAlert();
        if (!FORMS[kind]) return;
        if (!docketNumber() || !officeId()) {
            showAlert("Open this PSIR from a docket before filling a recommendation.", "warning");
            return;
        }
        state.editing = kind;
        $("#psirRecSignLibrary").hide();
        var saved = formsBag()[kind] || null;
        var fresh = !isSaved(saved);
        var place = defaultPlace();
        $("#psirRecList").hide();
        $("#psirRecEditor").show();
        $("#psirRecEditorTitle").text((fresh ? "Create " : "Update ") + FORMS[kind].title);
        $("#psirRecEditorLead").text("Draw each e-signature, upload a PNG or JPG, or choose an image already stored under Notes / Other Documents.");
        $("#psirRecName").val(fresh ? petitionerName() : (saved.petitionerName || ""));
        $("#psirRecResultsFields").toggle(kind === "pending");
        $("#psirRecShortFields").toggle(isShort(kind));
        $("#psirRecLongFields").toggle(!isShort(kind));
        $("#psirRecPeriodFields").toggle(kind === "granted");
        if (isShort(kind)) {
            $("#psirRecResults").val(fresh ? "" : (saved.resultsFrom || ""));
            $("#psirRecPlaceDate").val(fresh ? place : (saved.placeDate || ""));
            $("#psirRecOfficer").val(fresh ? defaultOfficer() : (saved.officerName || ""));
            $("#psirRecOfficerPosition").val(fresh ? "" : (saved.officerPosition || ""));
            $("#psirRecOfficerDate").val(fresh ? todayIso() : (saved.officerDate || ""));
            $("#psirRecHead").val(fresh ? "" : (saved.headName || ""));
            $("#psirRecHeadPosition").val(fresh ? "" : (saved.headPosition || ""));
            $("#psirRecHeadDate").val(fresh ? todayIso() : (saved.headDate || ""));
            $("#psirRecSignOfficerLabel").text("Prepared and submitted by");
            $("#psirRecSignHeadLabel").text("Reviewed and approved by");
        } else {
            var period = state.period || {};
            var stored = state.data.psirRecommendation || state.data.recommendation || {};
            $("#psirRecYears").val(fresh ? (stored.supYear || period.supYear || "") : (saved.supYear || ""));
            $("#psirRecMonths").val(fresh ? (stored.supMonth || period.supMonth || "") : (saved.supMonth || ""));
            $("#psirRecDays").val(fresh ? (stored.supDay || period.supDay || "") : (saved.supDay || ""));
            $("#psirRecPlace").val(fresh ? place : (saved.place || ""));
            $("#psirRecSignedOn").val(fresh ? todayIso() : (saved.signedOn || ""));
            $("#psirRecLongOfficer").val(fresh ? defaultOfficer() : (saved.officerName || ""));
            $("#psirRecLongOfficerDate").val(fresh ? todayIso() : (saved.officerDate || ""));
            $("#psirRecLongHeadDate").val(fresh ? todayIso() : (saved.headDate || ""));
            $("#psirRecSignOfficerLabel").text("Submitted by");
            $("#psirRecSignHeadLabel").text("Approved by");
        }
        loadPad(document.getElementById("psirRecSignOfficer"), saved && saved.officerSignature);
        loadPad(document.getElementById("psirRecSignHead"), saved && saved.headSignature);
        $("#psirRecSave").prop("disabled", false).text("Save");
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
        if (!canvas || !dataUrl || String(dataUrl).indexOf("data:image/png;base64,") !== 0) return;
        canvas.dataset.source = dataUrl;
        canvas.dataset.signed = "1";
        var img = new Image();
        img.onload = function () {
            if (canvas.dataset.source !== dataUrl) return;
            var ctx = padContext(canvas);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = dataUrl;
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

    function collectForm(kind) {
        var form = {
            petitionerName: textOf("psirRecName"),
            officerSignature: readPad("psirRecSignOfficer"),
            headSignature: readPad("psirRecSignHead"),
            updatedAt: new Date().toISOString()
        };
        if (isShort(kind)) {
            form.placeDate = textOf("psirRecPlaceDate");
            form.officerName = textOf("psirRecOfficer");
            form.officerPosition = textOf("psirRecOfficerPosition");
            form.officerDate = textOf("psirRecOfficerDate");
            form.headName = textOf("psirRecHead");
            form.headPosition = textOf("psirRecHeadPosition");
            form.headDate = textOf("psirRecHeadDate");
            if (kind === "pending") form.resultsFrom = textOf("psirRecResults");
        } else {
            form.place = textOf("psirRecPlace");
            form.signedOn = textOf("psirRecSignedOn");
            form.officerName = textOf("psirRecLongOfficer");
            form.officerDate = textOf("psirRecLongOfficerDate");
            form.headDate = textOf("psirRecLongHeadDate");
            if (kind === "granted") {
                form.supYear = textOf("psirRecYears");
                form.supMonth = textOf("psirRecMonths");
                form.supDay = textOf("psirRecDays");
            }
        }
        return form;
    }

    function saveForm() {
        var kind = state.editing;
        if (!textOf("psirRecName")) {
            showAlert("Enter the petitioner’s name.", "warning");
            return;
        }
        var formData = collectForm(kind);
        var $btn = $("#psirRecSave");
        $btn.prop("disabled", true).text("Saving…");
        apiGet(WorksheetApi.getUrl("psir", docketNumber(), officeId())).done(function (result) {
            applyRecord(result);
            if (!state.jsonOk) {
                $btn.prop("disabled", false).text("Save");
                showAlert("The PSIR data could not be read, so this form was not saved.", "danger");
                return;
            }
            var existing = state.data || {};
            existing.recommendationForms = existing.recommendationForms || {};
            existing.recommendationForms[kind] = formData;
            var record = state.record || {};
            var payload = {
                petitionerId: record.petitionerId || clientId(),
                docketNumber: record.docketNumber || docketNumber(),
                jsonData: JSON.stringify(existing),
                type: "psir",
                worksheetStatus: record.worksheetStatus || "incomplete",
                createdBy: $.cookie("uuid") || "",
                updatedBy: $.cookie("uuid") || "",
                fieldOfficeId: record.fieldOfficeId || officeId()
            };
            var path = record.id ? WorksheetApi.updateUrl("psir", docketNumber(), officeId()) : "8000/worksheet/create";
            apiPost(path, payload).done(function (res) {
                $btn.prop("disabled", false).text("Save");
                if (!res || res.status === "ERROR" || res.status === "FAILED") {
                    showAlert((res && res.message) || "Could not save the recommendation.", "danger");
                    return;
                }
                if (res.response) applyRecord(res);
                else {
                    state.data = existing;
                    state.record = record;
                    state.record.jsonData = payload.jsonData;
                }
                showList();
                showAlert(FORMS[kind].title + " saved.", "success");
            }).fail(function () {
                $btn.prop("disabled", false).text("Save");
                showAlert("Could not save the recommendation.", "danger");
            });
        }).fail(function () {
            $btn.prop("disabled", false).text("Save");
            showAlert("Could not load the PSIR to save this recommendation.", "danger");
        });
    }

    function formForPrint(kind) {
        var saved = formsBag()[kind] || {};
        var out = {};
        var key;
        for (key in saved) {
            if (Object.prototype.hasOwnProperty.call(saved, key)) out[key] = saved[key];
        }
        if (isSaved(saved)) return out;
        if (!out.petitionerName) out.petitionerName = petitionerName();
        if (!out.officerName) out.officerName = defaultOfficer();
        var place = defaultPlace();
        if (!out.placeDate && isShort(kind)) out.placeDate = place;
        if (!out.place && !isShort(kind)) out.place = place;
        if (kind === "granted" && !out.supYear && !out.supMonth && !out.supDay) {
            var stored = state.data.psirRecommendation || state.data.recommendation || {};
            var period = state.period || {};
            out.supYear = stored.supYear || period.supYear || "";
            out.supMonth = stored.supMonth || period.supMonth || "";
            out.supDay = stored.supDay || period.supDay || "";
        }
        return out;
    }

    function fileBase(kind) {
        var name = formForPrint(kind).petitionerName || kind;
        var safe = String(name).replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || kind;
        return FORMS[kind].file + safe;
    }

    function printMeta() {
        return {
            docketNumber: docketNumber(),
            departmentName: state.office.region || "",
            officeName: state.office.officeName || "",
            officeAddress: state.office.address || ""
        };
    }

    function syncFormatCards() {
        $("#psirRecDownloadModal .ws-dl-option").each(function () {
            var selected = $(this).find("input[type='radio']").prop("checked");
            $(this).toggleClass("is-selected", !!selected);
        });
    }

    function closePreview() {
        downloadModal.style.display = "none";
        var frame = document.getElementById("psirRecPreviewFrame");
        if (frame) frame.src = "about:blank";
        if (state.previewUrl) {
            URL.revokeObjectURL(state.previewUrl);
            state.previewUrl = null;
        }
    }

    function openPreview(html, title, base) {
        var frame = document.getElementById("psirRecPreviewFrame");
        if (!frame) return;
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
        var blob = new Blob([html], { type: "text/html;charset=utf-8" });
        state.previewUrl = URL.createObjectURL(blob);
        state.previewHtml = html;
        state.previewBase = base;
        $("#psirRecDownloadTitle").text(title);
        $("#psirRecFormatPdf").prop("checked", true);
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
        if (typeof fsBuildPsirRecommendationDocument !== "function") {
            showAlert("Print layout failed to load. Refresh the page and try again.", "danger");
            return;
        }
        var html = fsBuildPsirRecommendationDocument(kind, formForPrint(kind), state.data, printMeta());
        if (!html) {
            showAlert("Could not prepare the recommendation.", "danger");
            return;
        }
        openPreview(html, FORMS[kind].title, fileBase(kind));
    }

    function isJpegOrPng(file) {
        if (!file || !file.size || file.size > 20 * 1024 * 1024) return false;
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
        if (xhr && xhr.status === 413) return "The image exceeds the 20 MB upload limit.";
        return fallback;
    }

    function uploadLabel(kind) {
        return FORMS[kind] ? FORMS[kind].title : "Recommendation";
    }

    function uploadImage(file) {
        if (!clientId() || !officeId()) {
            showAlert("The petitioner and field office are required before uploading.", "warning");
            return;
        }
        if (!isJpegOrPng(file)) {
            showAlert("Upload a JPG or PNG image, up to 20 MB.", "warning");
            return;
        }
        var remarks = "Recommendation — " + uploadLabel(state.uploadForm);
        showAlert("Uploading image…", "warning");
        storeNotesImage(file, remarks).done(function () {
            showAlert(remarks + " image uploaded. It is listed under Notes / Other Documents.", "success");
        }).fail(function (xhr) {
            showAlert(notesUploadError(xhr, "Could not upload the image."), "danger");
        });
    }

    function signatureRemarks(padId) {
        var form = uploadLabel(state.editing);
        var who = padId === "psirRecSignHead" ? "approved-by signature" : "submitted-by signature";
        var docket = docketNumber();
        return "Recommendation " + form + " " + who + (docket ? " " + docket : "");
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

    var signUploadPad = "";

    function openNotesPicker(padId) {
        signUploadPad = padId;
        $("#psirRecSignLibrary").show();
        $("#psirRecSignLibraryList").html('<div class="text-muted small">Loading images…</div>');
        if (!clientId() || !officeId()) {
            $("#psirRecSignLibraryList").html('<div class="text-muted small">The petitioner and field office are required.</div>');
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
                    $("#psirRecSignLibraryList").html('<div class="text-muted small">No JPG or PNG images are in Notes / Other Documents yet.</div>');
                    return;
                }
                var html = "";
                for (var n = 0; n < images.length; n++) {
                    var label = notesImageLabel(images[n]);
                    html += '<div class="psir-rec-sign-library-item"><span class="psir-rec-sign-library-name" title="' + escapeHtml(label) + '">' +
                        escapeHtml(label) + '</span><button type="button" class="btn btn-sm btn-outline-primary psir-rec-sign-use" data-id="' +
                        escapeHtml(images[n].id) + '">Use</button></div>';
                }
                $("#psirRecSignLibraryList").html(html);
            })
            .fail(function () {
                $("#psirRecSignLibraryList").html('<div class="text-danger small">Could not load Notes / Other Documents.</div>');
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

    $(document).on("click", ".btn-psir-rec", function () {
        var $btn = $(this);
        active.clientId = $.trim($btn.attr("data-client-id") || "");
        active.docketNumber = $.trim($btn.attr("data-docket-number") || "");
        active.officeId = $.trim($btn.attr("data-office-id") || "");
        if ($btn.data("bs.tooltip")) $btn.tooltip("hide");
        $("#psirRecModal").modal("show");
    });

    $("#psirRecModal").on("show.bs.modal", function () {
        hideAlert();
        showList();
        refresh();
    });

    bindPad(document.getElementById("psirRecSignOfficer"));
    bindPad(document.getElementById("psirRecSignHead"));
    $(document).on("click", ".psir-rec-sign-clear", function () {
        blankPad(document.getElementById($(this).attr("data-pad")));
    });
    $(document).on("click", ".psir-rec-sign-upload", function () {
        signUploadPad = $(this).attr("data-pad") || "";
        $("#psirRecSignFile").val("").trigger("click");
    });
    $("#psirRecSignFile").on("change", function () {
        var file = this.files && this.files[0];
        var padId = signUploadPad;
        $(this).val("");
        if (!file || !padId) return;
        if (!isJpegOrPng(file)) {
            showAlert("Upload a JPG or PNG signature, up to 20 MB.", "warning");
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
    $(document).on("click", ".psir-rec-sign-notes", function () {
        openNotesPicker($(this).attr("data-pad") || "");
    });
    $("#psirRecSignLibraryClose").on("click", function () {
        $("#psirRecSignLibrary").hide();
    });
    $(document).on("click", ".psir-rec-sign-use", function () {
        useNotesImage($(this).attr("data-id"));
    });
    $(document).on("click", ".psir-rec-edit", function () {
        openEditor($(this).data("form"));
    });
    $(document).on("click", "#psirRecEditor .psir-rec-back", function () {
        hideAlert();
        showList();
    });
    $("#psirRecSave").on("click", saveForm);
    $(document).on("click", ".psir-rec-print", function () {
        printForm($(this).data("form"));
    });
    $(document).on("click", ".psir-rec-upload", function () {
        state.uploadForm = $(this).data("form") || "pending";
        $("#psirRecFile").val("").trigger("click");
    });
    $("#psirRecFile").on("change", function () {
        var file = this.files && this.files[0];
        if (file) uploadImage(file);
        $(this).val("");
    });
    $("#psirRecDownloadClose").on("click", closePreview);
    $(document).on("change", "input[name='psirRecDownloadFormat']", syncFormatCards);
    $("#psirRecDownloadBtn").on("click", function () {
        if (state.previewBusy) return;
        if (!state.previewHtml || typeof fsDownloadPpaPsir !== "function") {
            alert("Download failed to load. Refresh the page and try again.");
            return;
        }
        var format = $("input[name='psirRecDownloadFormat']:checked").val() || "pdf";
        var $btn = $(this);
        state.previewBusy = true;
        $btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Preparing…');
        fsDownloadPpaPsir(state.previewHtml, format, state.previewBase).then(function () {
            state.previewBusy = false;
            $btn.prop("disabled", false).html('<i class="fa fa-download" aria-hidden="true"></i> Download');
        }, function () {
            state.previewBusy = false;
            $btn.prop("disabled", false).html('<i class="fa fa-download" aria-hidden="true"></i> Download');
            alert("Could not create the file. Try again.");
        });
    });
})(window.jQuery);
