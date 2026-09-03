/**
 * One PSIR record per client: create only when none exists, otherwise update.
 */
(function (window) {
    "use strict";

    function parseExisting(result) {
        if (!result || result.status === "ERROR" || !result.response) {
            return { existing: {}, hasRecord: false, error: true };
        }
        var raw = result.response.jsonData;
        var existing = {};
        if (typeof raw === "string" && raw.trim() !== "" && raw !== "null") {
            try {
                var parsed = JSON.parse(raw);
                if (parsed && typeof parsed === "object") {
                    existing = parsed;
                }
            } catch (e) {
                existing = {};
            }
        }
        return {
            existing: existing,
            hasRecord: result.response.id != null && result.response.id !== "",
            error: false
        };
    }

    function persist(postFn, clientId, payload, parsed, done) {
        if (window.WorksheetApi && WorksheetApi.attachPayload) {
            WorksheetApi.attachPayload(payload);
        }
        var url = parsed.hasRecord
            ? WorksheetApi.updateUrl("psir")
            : "8000/worksheet/create";
        if (parsed.hasRecord) {
            payload.updatedBy = payload.updatedBy || payload.createdBy;
        }
        postFn(url, JSON.stringify(payload)).done(done);
    }

    window.PsirRecord = {
        parseExisting: parseExisting,
        persist: persist
    };
})(window);
