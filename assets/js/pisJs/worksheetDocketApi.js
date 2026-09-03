/**
 * Worksheet/PSIR records are keyed by docket number + field office, not petitioner id.
 * Path names stay getPetitioner / updatePetitioner; the last segment is the docket number.
 */
(function (window) {
    "use strict";

    function queryParam(name) {
        var search = window.location.search.substring(1);
        if (!search) {
            return "";
        }
        var parts = search.split("&");
        for (var i = 0; i < parts.length; i++) {
            var pair = parts[i].split("=");
            if (decodeURIComponent(pair[0]) === name) {
                return pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, " ")) : "";
            }
        }
        return "";
    }

    function cookie(name) {
        if (window.$ && typeof window.$.cookie === "function") {
            return window.$.cookie(name) || "";
        }
        return "";
    }

    function clientId() {
        return queryParam("client_id");
    }

    function docketNumber() {
        return queryParam("docket_number");
    }

    function fieldOfficeId() {
        return queryParam("field_office_id") || cookie("field_office_id") || "";
    }

    function enc(value) {
        return encodeURIComponent(value == null ? "" : String(value));
    }

    function getUrl(type, docket, office) {
        docket = docket || docketNumber();
        office = office || fieldOfficeId();
        return "8000/worksheet/getPetitioner/" + type + "/" + enc(docket) + "?fieldOfficeId=" + enc(office);
    }

    function updateUrl(type, docket, office) {
        docket = docket || docketNumber();
        office = office || fieldOfficeId();
        return "8000/worksheet/updatePetitioner/" + type + "/" + enc(docket) + "?fieldOfficeId=" + enc(office);
    }

    function pageQuery(extra) {
        var parts = [
            "client_id=" + enc(clientId()),
            "docket_number=" + enc(docketNumber()),
            "field_office_id=" + enc(queryParam("field_office_id") || fieldOfficeId())
        ];
        if (extra && extra.status != null && extra.status !== "") {
            parts.push("status=" + enc(extra.status));
        }
        return parts.join("&");
    }

    function attachPayload(payload) {
        if (!payload) {
            payload = {};
        }
        payload.petitionerId = payload.petitionerId || clientId();
        payload.docketNumber = payload.docketNumber || docketNumber();
        payload.fieldOfficeId = payload.fieldOfficeId || fieldOfficeId();
        return payload;
    }

    window.WorksheetApi = {
        clientId: clientId,
        docketNumber: docketNumber,
        fieldOfficeId: fieldOfficeId,
        getUrl: getUrl,
        updateUrl: updateUrl,
        pageQuery: pageQuery,
        attachPayload: attachPayload
    };
})(window);
