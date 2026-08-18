/**
 * PPA Form 3 — Post-Sentence Investigation Report (PSIR) printable HTML/CSS.
 * Printable PSIR — legal-style layout (sans-serif, underline fields, minimal rules).
 */
(function (global) {
    "use strict";

    function esc(s) {
        if (s === null || s === undefined) return "";
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function nz(v) {
        return v !== null && v !== undefined ? v : {};
    }

    function str(v) {
        if (v === null || v === undefined) return "";
        var t = String(v).trim();
        return t === "null" || t === "undefined" ? "" : t;
    }

    /** Round checkbox style (matches worksheet print helper). */
    function chk(label, on) {
        return (
            '<span class="pch' + (on ? " on" : "") +
            '"><span class="pdot"></span>' +
            esc(label) +
            "</span>"
        );
    }

    function uline(val, cls) {
        return '<span class="ul ' + (cls || "") + '">' + esc(str(val)) + "</span>";
    }

    function blankLines(n) {
        var h = "";
        for (var i = 0; i < n; i++) {
            h += '<div class="ruled-line">&nbsp;</div>';
        }
        return h;
    }

    function resolveCriminalCaseNo(ws) {
        var po = nz(ws.presentOffense);
        return str(
            po.criminalCaseNo ||
                po.criminal_case_no ||
                po.cc_no ||
                ws.criminalCaseNumber ||
                ws.criminalCaseNo ||
                ""
        );
    }

    function resolvePetitionerDisplay(ws, meta) {
        var id = nz(ws.identifyingData);
        if (meta && str(meta.petitionersName)) return str(meta.petitionersName);
        return str(id.name || id.petitionersName || id.fullName || "");
    }

    /** Split name into Last / First / Middle for tri-column display when separate fields absent. */
    function splitPetitionerNameParts(id) {
        if (id.lastName || id.firstName || id.middleName) {
            return {
                last: str(id.lastName),
                first: str(id.firstName),
                middle: str(id.middleName),
            };
        }
        var raw = str(id.petitionersName || id.name || id.fullName || "");
        if (!raw) {
            return { last: "", first: "", middle: "" };
        }
        var comma = raw.split(",");
        if (comma.length >= 2) {
            var last = str(comma[0]).trim();
            var restChunks = [];
            for (var ci = 1; ci < comma.length; ci++) {
                var seg = str(comma[ci]).trim();
                if (seg) restChunks.push(seg);
            }
            var restTok = restChunks.join(" ").split(/\s+/).filter(Boolean);
            return {
                last: last,
                first: restTok[0] || "",
                middle: restTok.slice(1).join(" ") || "",
            };
        }
        var sp = raw.split(/\s+/).filter(Boolean);
        if (sp.length >= 3) {
            return {
                last: sp[0],
                first: sp[1],
                middle: sp.slice(2).join(" "),
            };
        }
        if (sp.length === 2) {
            return { last: sp[0], first: sp[1], middle: "" };
        }
        return { last: raw, first: "", middle: "" };
    }

    /** LAST, FIRST MIDDLE — matches tri-column PSIR fields (no stray commas). */
    function formatPetitionerCommaStyle(nm) {
        var L = str(nm.last).trim();
        var F = str(nm.first).trim();
        var M = str(nm.middle).trim();
        var tail = [F, M].filter(Boolean).join(" ").trim();
        if (L && tail) return (L + ", " + tail).toUpperCase();
        if (L) return L.toUpperCase();
        return tail.toUpperCase();
    }

    /** Prefer parsed Last/First/Middle over raw petitionersName for display lines. */
    function resolvePetitionerDisplayFromParts(ws, meta) {
        var id = nz(ws.identifyingData);
        id.petitionersName = id.petitionersName || id.name;
        var nm = splitPetitionerNameParts(id);
        var line = formatPetitionerCommaStyle(nm);
        if (line) return line;
        var fb = resolvePetitionerDisplay(ws, meta)
            .replace(/,\s*,+/g, ",")
            .replace(/^\s*,\s*/, "")
            .replace(/,\s*$/, "")
            .replace(/\s+/g, " ")
            .trim();
        return fb.toUpperCase();
    }

    function secHead(numRoman, titleWords) {
        return (
            '<div class="sec-head">' +
            esc(numRoman + ". " + String(titleWords).toUpperCase()) +
            "</div>"
        );
    }

    function fieldHalf(label, value) {
        return (
            '<div class="id-field">' +
            '<span class="flab">' +
            esc(label) +
            "</span>" +
            '<span class="fill-line">' +
            esc(str(value)) +
            "</span>" +
            "</div>"
        );
    }

    function fieldFull(label, value) {
        return (
            '<div class="id-full">' +
            '<span class="flab">' +
            esc(label) +
            "</span>" +
            '<span class="fill-line">' +
            esc(str(value)) +
            "</span>" +
            "</div>"
        );
    }

    function idRowTwo(leftLabel, leftVal, rightLabel, rightVal) {
        return (
            '<div class="id-row-pair">' +
            fieldHalf(leftLabel, leftVal) +
            fieldHalf(rightLabel, rightVal) +
            "</div>"
        );
    }

    function priorRowsForTable(ws) {
        var pr = nz(ws.priorRecordsAndDerogatoryRecord);
        var rows = pr.priorRecord || [];
        var agencies = ["NBI", "CMRD/CMRU", "Others"];
        var out = [];

        function matchAgency(label, row) {
            var a = str(row.agency).toLowerCase();
            var L = label.toLowerCase();
            if (L.indexOf("nbi") >= 0) return a.indexOf("nbi") >= 0;
            if (L.indexOf("cmrd") >= 0 || L.indexOf("cmru") >= 0)
                return a.indexOf("cmrd") >= 0 || a.indexOf("cmru") >= 0;
            if (L.indexOf("others") >= 0)
                return (
                    a.indexOf("other") >= 0 ||
                    (a.length > 0 &&
                        a.indexOf("nbi") < 0 &&
                        a.indexOf("cmrd") < 0 &&
                        a.indexOf("cmru") < 0)
                );
            return false;
        }

        var used = {};
        for (var i = 0; i < agencies.length; i++) {
            var ag = agencies[i];
            var found = null;
            for (var r = 0; r < rows.length; r++) {
                if (used[r]) continue;
                if (matchAgency(ag, rows[r])) {
                    found = rows[r];
                    used[r] = true;
                    break;
                }
            }
            out.push({
                agency: ag,
                cc_no: found ? str(found.cc_no) : "",
                offense: found ? str(found.offense) : "",
                when: found ? str(found.when) : "",
                decision: found ? str(found.decision) : "",
            });
        }
        for (var j = 0; j < rows.length; j++) {
            if (used[j]) continue;
            var row = rows[j];
            out.push({
                agency: str(row.agency),
                cc_no: str(row.cc_no),
                offense: str(row.offense),
                when: str(row.when),
                decision: str(row.decision),
            });
        }
        if (out.length === 0) {
            out.push({
                agency: "NBI",
                cc_no: "",
                offense: "",
                when: "",
                decision: "",
            });
        }
        return out;
    }

    function mapCustody(po) {
        var c = str(po.custody).toLowerCase().replace(/-/g, "_");
        return {
            onBail: c === "on_bail",
            onDetention: c === "on_detention",
            ror: c === "ror_custodian" || c === "ror",
        };
    }

    var ECON_OPTS = [
        "Poor",
        "Low-income Class (but not poor)",
        "Lower Middle- Income Class",
        "Middle Middle- Income Class",
        "Upper Middle- Income Class",
        "Upper-Income Class (but not rich)",
        "Rich",
    ];

    var THREE_SAT = ["Very satisfactory", "Satisfactory", "Poor"];

    var REPUTATION_OPTS = [
        "Very satisfactory",
        "Satisfactory",
        "Family reputation is undesirable.",
    ];

    var SUPPORT_LIKE = ["Very satisfactory", "Satisfactory", "Poor"];

    function selMatches(option, saved) {
        return option.trim().toLowerCase() === str(saved).trim().toLowerCase();
    }

    function colChecks(title, options, selected) {
        var h = '<div class="soc-col-head">' + esc(title) + "</div>";
        for (var i = 0; i < options.length; i++) {
            h += "<div>" + chk(options[i], selMatches(options[i], selected)) + "</div>";
        }
        return '<div class="soc-cell">' + h + "</div>";
    }

    var RECOMMENDATION_CONDITIONS = [
        "His/her probation period shall be for NO. OF YEARS/MONTHS to be counted from his/her initial reporting for supervision;",
        "He/she shall initially report to the Chief Probation and Parole Officer of Name of the Field Office located at Address of the Field Office within seventy-two (72) hours from the receipt of the Order granting probation;",
        "He/she shall, thereafter, report to his/her supervising Probation and Parole Officer at least once a month unless otherwise modified by the Chief Probation and Parole Officer;",
        "He/she shall reside at and shall not change his/her residence without prior approval of the Chief Probation and Parole Officer, or Court, as the case may be;",
        "He/she shall secure a written permit to travel outside the jurisdiction of the Parole and Probation Office from the Chief Probation and Parole Officer, or from the Court, if such travel exceeds thirty (30) days;",
        "He/she shall not commit any crime or any other offense;",
        "He/she shall render community service and will participate in tree-planting activities;",
        "He/she shall allow the Supervising Probation and Parole Officer or an authorized Volunteer Probation Assistant to visit his/her home and place of work;",
        "He/she shall meet his/her family responsibilities;",
        "He/she shall undergo medical, psychological or psychiatric examination and treatment and enter and remain in a specified institution, when required for that purpose;",
        "He/she shall devote himself/herself to a specific employment and shall not change said employment without prior notice to the supervising officer and/or pursue a prescribed secular study or vocational training;",
        "He/she shall refrain from associating with persons of questionable character;",
        "He/she shall cooperate with his/her program of supervision, and shall satisfy any other conditions related to his/her rehabilitation and not unduly restrictive of his/her liberty nor incompatible with his/her freedom of conscience; and",
        "He/she shall undergo mandatory drug tests every ______________________ (for clients with drug related cases).",
    ];

    function coverLetterImg(src, cls, alt) {
        if (!src) return "";
        return '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" class="' + cls + '"/>';
    }

    /** Middle-column contact lines (phone + website), centered above the red rule. */
    function coverLetterContactBlock(meta) {
        var phone = str(meta.officePhone || "").trim();
        var url = str(meta.officeWebsiteUrl || meta.officeWebsite || "").trim();
        var urlLabel = str(meta.officeWebsiteLabel || "").trim();
        if (!phone && !url) return "";
        var parts = "";
        if (phone) {
            parts +=
                '<div class="cover-hdr-contact-line">Tel. No.: <span class="cover-hdr-contact-val">' +
                esc(phone) +
                "</span></div>";
        }
        if (url) {
            parts +=
                '<div class="cover-hdr-contact-line">Website: <a class="cover-hdr-url" href="' +
                esc(url) +
                '">' +
                esc(urlLabel || url) +
                "</a></div>";
        }
        return '<div class="cover-hdr-contact-inner">' + parts + "</div>";
    }

    /** Formal PSIR page 1 — DOJ-PPA letterhead cover (Times New Roman, line-height 1.15, 1 inch margins when printed). */
    function sectionPsirCoverLetter(meta, ws) {
        var judge = str((nz(ws.presentOffense).judge || meta.judgeName || "").trim());
        var pet = resolvePetitionerDisplay(ws, meta).toUpperCase();
        var ccRaw = resolveCriminalCaseNo(ws) || "_______________";
        var cc = str(ccRaw).toUpperCase();
        var headName = str(meta.headFieldOfficeName || "HEAD OF THE FIELD OFFICE");
        var dept = str(meta.departmentName || "REGION");
        var office = str(meta.officeName || "OFFICE NAME");
        var addr = str(meta.officeAddress || "Address");
        var seal = meta.coverPpaSealSrc || "";
        var dojLogo = meta.coverDojLogoSrc || "";
        var bpLogo = meta.coverBagongPilipinasSrc || "";
        var redeemBanner = meta.coverRedeemingLivesSrc || "";
        var isoBv = meta.coverIsoBvSrc || "";
        var headSub = str(meta.headPosition || "").trim();
        var formRev = str(meta.coverFormRevision || "001").trim() || "001";
        var contactHtml = coverLetterContactBlock(meta);

        return (
            '<section class="psir-cover-sheet page-break-after">' +
            '<div class="cover-sheet-inner">' +
            '<header class="cover-letterhead" aria-label="Agency letterhead">' +
            '<div class="cover-letterhead-row">' +
            '<div class="cover-hdr-left">' +
            '<div class="cover-hdr-left-inner">' +
            coverLetterImg(seal, "cover-img-seal-ppa", "PPA seal") +
            "</div>" +
            "</div>" +
            '<div class="cover-hdr-center">' +
            '<div class="cover-hdr-center-stack">' +
            '<div class="cover-hdr-line">Republic of the Philippines</div>' +
            '<div class="cover-hdr-line cover-hdr-dojtxt">Department of Justice</div>' +
            '<div class="cover-hdr-line cover-hdr-ppa">Parole and Probation Administration</div>' +
            '<div class="cover-hdr-line cover-hdr-office">' +
            esc(dept.toUpperCase()) +
            "</div>" +
            '<div class="cover-hdr-line cover-hdr-office">' +
            esc(office.toUpperCase()) +
            "</div>" +
            '<div class="cover-hdr-addr">' +
            esc(addr) +
            "</div>" +
            "</div>" +
            '<div class="cover-hdr-center-spacer" aria-hidden="true"></div>' +
            '<div class="cover-hdr-contact-block">' +
            contactHtml +
            "</div>" +
            "</div>" +
            '<div class="cover-hdr-right">' +
            '<div class="cover-hdr-right-inner">' +
            '<div class="cover-hdr-form-top">' +
            '<div class="cover-form-33">PPA FORM 33</div>' +
            '<div class="cover-form-rev">Revision ' +
            esc(formRev) +
            "</div>" +
            "</div>" +
            '<div class="cover-hdr-logos-pair">' +
            coverLetterImg(dojLogo, "cover-img-seal-side cover-img-doj-side", "Department of Justice seal") +
            coverLetterImg(bpLogo, "cover-img-seal-side cover-img-bp-side", "Bagong Pilipinas") +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="cover-hdr-red-rule-full" role="presentation"></div>' +
            "</header>" +
            '<div class="cover-flow">' +
            '<div class="cover-top-block">' +
            '<div class="cover-date-row">' +
            '<span class="cover-date-label">Date</span>' +
            '<span class="cover-date-field">' +
            uline(meta.letterDate || "", "cover-field-ul") +
            "</span>" +
            "</div>" +
            '<div class="cover-address-block">' +
            '<div class="cover-addr-line cover-addr-judge">' +
            "<strong>" +
            esc(judge || "NAME OF THE HONORABLE JUDGE") +
            "</strong>" +
            "</div>" +
            '<div class="cover-addr-role">Presiding Judge</div>' +
            '<div class="cover-addr-line cover-addr-court">' +
            esc(meta.rtcBranch || "RTC Branch, City") +
            "</div>" +
            "</div>" +
            "</div>" +
            '<p class="cover-salutation"><strong>Sir/Madam:</strong></p>' +
            '<p class="cover-letter-body">' +
            "In connection with the Order of this Honorable Court dated " +
            uline(meta.courtOrderDate || "Month 00, 0000", "inline-ul") +
            " which was received by our office on " +
            uline(meta.officeReceivedDate || "Month 00, 0000", "inline-ul") +
            ", the undersigned has the honor to submit the attached Post-Sentence Investigation Report (PSIR) prepared by " +
            uline(meta.probationOfficerName || "NAME OF THE PROBATION OFFICER", "inline-ul") +
            ', <span class="cover-emspace"></span>re: <strong class="cover-petitioner-name">' +
            esc(pet) +
            "</strong>" +
            ', <span class="cover-emspace"></span>petitioner for probation in <strong class="cover-cc-label">CRIMINAL CASE NO.</strong> ' +
            '<strong class="cover-cc-value">' +
            esc(cc) +
            "</strong>" +
            " for resolution." +
            "</p>" +
            "</div>" +
            '<div class="cover-closing-block">' +
            '<p class="cover-vty">Very truly yours,</p>' +
            '<div class="cover-signature-gap" aria-hidden="true"></div>' +
            '<p class="cover-head-line"><strong>' +
            esc(headName) +
            "</strong></p>" +
            (headSub
                ? '<p class="cover-head-title">' + esc(headSub) + "</p>"
                : "") +
            "</div>" +
            "</div>" +
            '<footer class="cover-sheet-footer" aria-label="PPA footer" style="margin: 0 auto; max-width: 190mm">' +
            '<div class="cover-footer-graphic">' +
            coverLetterImg(redeemBanner, "cover-img-redeem", "Redeeming Lives… Restoring Relationships") +
            "</div>" +
            '<div class="cover-footer-iso-stack">' +
            coverLetterImg(isoBv, "cover-img-iso", "ISO 9001 Bureau Veritas") +
            '<div class="cover-footer-cert-lines">' +
            '<span class="cover-footer-cert-line">ISO 9001:2015</span>' +
            '<span class="cover-footer-cert-line">Certificate No.: PHL 22013</span>' +
            "</div>" +
            "</div>" +
            "</footer>" +
            "</section>"
        );
    }

    function sectionMetaHeader(meta, ws) {
        var pageNum = str(meta.pageNumber || "1");
        var petUp = resolvePetitionerDisplay(ws, meta).toUpperCase();
        var cc = resolveCriminalCaseNo(ws);
        var dock = str(meta.docketNumber || "");
        return (
            '<table class="meta-hdr">' +
            "<tr>" +
            '<td class="meta-left">' +
            '<div><span class="lbl">p.</span> ' +
            esc(pageNum) +
            "</div>" +
            '<div><span class="lbl">PSIR Re:</span> ' +
            esc(petUp) +
            "</div>" +
            '<div><span class="lbl">Criminal Case Number:</span> ' +
            esc(cc) +
            "</div>" +
            "</td>" +
            '<td class="meta-right">' +
            '<div class="frm">PPA FORM 3</div>' +
            '<div class="frm">REVISION 002</div>' +
            '<div><span class="lbl">Investigation Docket:</span> ' +
            esc(dock || "N/A") +
            "</div>" +
            "</td>" +
            "</tr>" +
            "</table>"
        );
    }

    function letterheadBlock(meta) {
        var dept = str(meta.departmentName || "REGION");
        var office = str(meta.officeName || "OFFICE NAME");
        var addr = str(meta.officeAddress || "Address");
        return (
            '<div class="mast">' +
            '<div class="mast-gutter mast-gutter-l" aria-hidden="true"></div>' +
            '<div class="mast-center">' +
            '<div>Republic of the Philippines</div>' +
            '<div class="b">Department of Justice</div>' +
            '<div class="ppa">PAROLE AND PROBATION ADMINISTRATION</div>' +
            '<div class="b">' +
            esc(dept.toUpperCase()) +
            "</div>" +
            '<div class="b">' +
            esc(office.toUpperCase()) +
            "</div>" +
            '<div class="addr">' +
            esc(addr) +
            "</div>" +
            "</div>" +
            '<div class="mast-gutter mast-gutter-r">' +
            (meta.photoSrc
                ? '<img src="' + esc(meta.photoSrc) + '" alt="" class="photo-img"/>'
                : '<div class="photo-ph">Photo</div>') +
            "</div>" +
            "</div>"
        );
    }

    function identifyingGrid(id) {
        var nm = splitPetitionerNameParts(id);
        return (
            '<section class="id-section">' +
            secHead("I", "IDENTIFYING DATA") +
            '<div class="pet-name-block">' +
            '<div class="pet-name-label">PETITIONER\'S NAME <span class="court-rec-hint">(per court records)</span></div>' +
            '<div class="pet-three-col">' +
            '<div class="pet-cell">' +
            '<div class="fill-line">' +
            esc(nm.last) +
            "</div>" +
            '<div class="pet-sub">(Last Name)</div>' +
            "</div>" +
            '<div class="pet-cell">' +
            '<div class="fill-line">' +
            esc(nm.first) +
            "</div>" +
            '<div class="pet-sub">(First Name)</div>' +
            "</div>" +
            '<div class="pet-cell">' +
            '<div class="fill-line">' +
            esc(nm.middle) +
            "</div>" +
            '<div class="pet-sub">(Middle Name)</div>' +
            "</div>" +
            "</div>" +
            "</div>" +
            fieldFull("True Name:", id.trueName) +
            idRowTwo("Alias/es:", id.alias, "Education Attainment:", id.education) +
            idRowTwo("Sex:", id.sex, "Religion:", id.religion) +
            idRowTwo("Gender Preference:", id.genderPreference, "Occupation:", id.occupation) +
            idRowTwo("Birthday:", id.birthday, "Nationality:", id.nationality) +
            idRowTwo("Age:", id.age, "Mother:", id.mother) +
            idRowTwo("Civil Status:", id.civilStatus, "(Maiden Name):", id.maidenName) +
            idRowTwo("Spouse:", id.spouse, "Father:", id.father) +
            fieldFull("Identifying/Remarkable Features:", id.remarks || id.identifyingMarks) +
            fieldFull("Present Address:", id.presentAddress) +
            fieldFull("Permanent Address:", id.permanentAdress || id.permanentAddress) +
            "</section>"
        );
    }

    function criminalBlock(po, ws) {
        var cust = mapCustody(po);
        var court = str(po.court);
        return (
            '<section class="crim-section">' +
            secHead("II", "CRIMINAL HISTORY") +
            '<div class="sub-sec-head">A. PRESENT OFFENSE</div>' +
            idRowTwo("Charged with:", po.chargedWith, "Date:", po.chargedWithDate) +
            idRowTwo("Convicted of:", po.convictedOf, "Date:", po.convictedOfDate) +
            fieldFull("Sentence:", po.sentence) +
            idRowTwo("Judge:", po.judge, "Court:", court || po.judge) +
            '<div class="cust-row">' +
            '<span class="flab">Custodial Status:</span> ' +
            chk("On Bail", cust.onBail) +
            '<span class="cust-gap"></span>' +
            chk("On Detention", cust.onDetention) +
            "</div>" +
            '<div class="id-full cust-ror">' +
            chk("ROR – Custodian", cust.ror) +
            '<span class="fill-line">' +
            esc(str(po.rorCustodian)) +
            "</span>" +
            "</div>" +
            fieldFull("Address:", po.rorCustodianAddress) +
            '<div class="sub-sec-head page-break-inside-avoid">B. PRIOR AND PENDING RECORD</div>' +
            priorTableHtml(ws) +
            '<p class="prior-note">' +
            'Note: If records check results are not yet received, write this: "The office reserves the right to submit supplemental report once records verification from the institutions and/or law-enforcement agencies yields derogatory result or previous criminal records". Also attach the Sinumpaang Salaysay.' +
            "</p>" +
            "</section>"
        );
    }

    function priorTableHtml(ws) {
        var rows = priorRowsForTable(ws);
        var h =
            '<table class="pri">' +
            "<thead><tr>" +
            "<th>Agency</th>" +
            "<th>Criminal Case No.</th>" +
            "<th>Offense</th>" +
            "<th>Date Charged</th>" +
            "<th>Decision/Status of the Case</th>" +
            "</tr></thead><tbody>";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            h +=
                "<tr>" +
                "<td>" +
                esc(row.agency) +
                "</td>" +
                "<td>" +
                esc(row.cc_no) +
                "</td>" +
                "<td>" +
                esc(row.offense) +
                "</td>" +
                "<td>" +
                esc(row.when) +
                "</td>" +
                "<td>" +
                esc(row.decision) +
                "</td>" +
                "</tr>";
        }
        return h + "</tbody></table>";
    }

    function socioBlock(ws) {
        var fb = nz(ws.familyBackgroundAndBirthData);
        var tr = nz(ws.traitsAndCommunityBackground);
        var ps = nz(ws.presentSituation);
        var sup = str(fb.familySupport || tr.familySupport || "");
        var comm = str(
            fb.communityAcceptability ||
                tr.communityAcceptability ||
                ps.communityAcceptability ||
                ""
        );
        var well = str(fb.overallWellBeing || tr.overallWellBeing || "");
        return (
            '<section class="soc-section">' +
            secHead("III", "SOCIO-ECONOMIC BACKGROUND") +
            '<div class="soc-row-three">' +
            colChecks("A. Family Economic Status", ECON_OPTS, fb.familyEconomicStatus) +
            colChecks("B. Family Relationship", THREE_SAT, fb.familyRelationship) +
            colChecks("C. Family Reputation", REPUTATION_OPTS, fb.familyReputationInCommunity) +
            "</div>" +
            '<div class="soc-row-three">' +
            colChecks("D. Family Support", SUPPORT_LIKE, sup) +
            colChecks("E. Community Acceptability", SUPPORT_LIKE, comm) +
            colChecks("F. Overall Well-being", SUPPORT_LIKE, well) +
            "</div>" +
            "</section>"
        );
    }

    function analysisBlock(ws, variant) {
        var ev = nz(ws.analysisAndProjectedThrust);
        var analysis = str(ev.analysisAndEvaluation);
        var thrust = str(ev.projectedThrustsOfRehabilitation || ev.projectedThrust);
        var filled = variant === "long" || analysis || thrust;
        return (
            '<section class="analysis-section">' +
            '<div class="sec-head rule-top">' +
            esc("IV. ANALYSIS AND EVALUATION") +
            "</div>" +
            (filled
                ? '<div class="body-text">' +
                  esc(analysis) +
                  "</div>" +
                  blankLines(analysis ? 0 : 4)
                : blankLines(5)) +
            '<div class="sec-head rule-top">' +
            esc("V. PROJECTED THRUSTS OF REHABILITATION") +
            "</div>" +
            (filled
                ? '<div class="body-text">' +
                  esc(thrust) +
                  "</div>" +
                  blankLines(thrust ? 0 : 4)
                : blankLines(5)) +
            "</section>"
        );
    }

    function recommendationBlock(ws, meta, pendingIntro) {
        var pet = resolvePetitionerDisplay(ws, meta);
        var petU = pet.toUpperCase();
        var introPending =
            "WHEREFORE, in view of the foregoing, pending the result/s of the NBI/CMRD/Others (specify)/Courtesy Investigation Results from ______________________, it is respectfully recommended to the Honorable Court that the petition for probation of " +
            esc(petU) +
            " be GRANTED, subject to the following conditions:";
        var introComplete =
            "WHEREFORE, in view of the foregoing, it is respectfully recommended to the Honorable Court that the petition for probation of " +
            esc(petU) +
            " be GRANTED, subject to the following conditions:";
        var intro = pendingIntro ? introPending : introComplete;
        var sub =
            pendingIntro
                ? "(FOR CASES WITH PENDING RESULTS OF RECORDS CHECK OR GIOR)"
                : "(FOR CASES WITH COMPLETE RECORDS CHECK OR GIOR)";

        var list = '<ol class="cond-list">';
        for (var i = 0; i < RECOMMENDATION_CONDITIONS.length; i++) {
            list += "<li>" + esc(RECOMMENDATION_CONDITIONS[i]) + "</li>";
        }
        list += "</ol>";

        return (
            '<section class="rec block">' +
            '<div class="sec-head">' +
            esc("VI. RECOMMENDATION") +
            "</div>" +
            '<div class="rec-sub">' +
            esc(sub) +
            "</div>" +
            '<p class="justify">' +
            intro +
            "</p>" +
            list +
            '<p class="justify">' +
            "In the event that petitioner fails to observe the preceding conditions and/or has committed any material misrepresentation in his/her application for probation, his/her probation may be revoked by the Court or the conditions thereof modified." +
            "</p>" +
            '<div class="sig-date">' +
            uline(meta.cityProvinceDate || "City/Municipality, Province, Philippines, Date.", "wide") +
            "</div>" +
            '<div class="sig-two">' +
            '<div class="sig-col">' +
            '<div class="sig-h">Prepared and submitted by:</div>' +
            '<div class="rule"></div>' +
            '<div class="hint">' +
            esc(meta.investigatingOfficer || "NAME OF INVESTIGATING OFFICER") +
            "</div>" +
            '<div class="hint">' +
            esc(meta.investigatingPosition || "Position") +
            "</div>" +
            '<div class="hint">Date: ' +
            uline(meta.investigatingDate || "", "inline-ul") +
            "</div></div>" +
            '<div class="sig-col">' +
            '<div class="sig-h">Reviewed and approved by:</div>' +
            '<div class="rule"></div>' +
            '<div class="hint">' +
            esc(meta.headFieldOfficeName || "HEAD OF THE FIELD OFFICE") +
            "</div>" +
            '<div class="hint">' +
            esc(meta.headPosition || "Position") +
            "</div>" +
            '<div class="hint">Date: ' +
            uline(meta.headDate || "", "inline-ul") +
            "</div></div>" +
            "</div>" +
            "</section>"
        );
    }

    /** --- PPA Form 3 official multi-page layout (variant "long") — matches client PSIR template --- */
    var OF3_PAGE_TOTAL = 6;

    var OF3_GRANTED_CONDITIONS = [
        "Probationers shall report initially to the Chief Probation and Parole Officer at _____________________________________________________________________ within seventy-two (72) hours from the receipt of the Order granting probation.",
        "He/She shall, thereafter, report to his/her supervising Probation and Parole Officer _____________________________________ unless otherwise modified by the Chief Probation and Parole Officer.",
        "He/She shall reside at and shall not change his/her residence without prior approval of the Chief Probation and Parole Officer, or Court, as the case may be.",
        "He/She shall secure a written permit to travel outside the jurisdiction of the Parole and Probation Office from the Chief Probation and Parole Officer, and from the Court if such travel exceeds thirty (30) days.",
        "He/She shall not commit any crime or any other offense.",
        "He/She shall render community service and will participate in tree-planting activities.",
        "He/She shall allow the supervising Probation and Parole Officer or an authorized Volunteer Probation Aide to visit his/her home and place of work.",
        "He/She shall meet his/her family responsibilities.",
        "He/She shall undergo medical, psychological or psychiatric examination and treatment and enter and remain in a specified institution, when required for that purpose.",
        "He/She shall devote himself/herself to a specific employment and shall not change said employment without prior notice to the supervising officer and/or pursue a prescribed secular study or vocational training.",
        "He/She shall refrain from associating with persons of questionable character.",
        "He/She shall cooperate with his/her rehabilitation and not unduly restrictive of his/her liberty incompatible with his/her freedom of conscience.",
    ];

    function of3norm(v) {
        return str(v)
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_/]/g, "");
    }

    function of3sel(saved, candidateVals) {
        var s = of3norm(saved);
        for (var i = 0; i < candidateVals.length; i++) {
            if (s === of3norm(candidateVals[i])) return true;
        }
        return false;
    }

    function of3TopHeader(ws, meta, pageNum) {
        var pet = resolvePetitionerDisplayFromParts(ws, meta);
        var cc = resolveCriminalCaseNo(ws);
        var dock = str(meta.docketNumber || "");
        var formTxt = pageNum === 1 ? "PPA FORM 3" : "PPA FORM 3/p." + pageNum;
        return (
            '<div class="of3-hdr">' +
            '<table class="of3-hdr-t"><tbody>' +
            "<tr>" +
            '<td class="of3-hdr-main">' +
            '<div class="of3-formline">' +
            '<span class="of3-formid">' +
            esc(formTxt) +
            "</span></div>" +
            '<div class="of3-hfld"><span class="of3-hlbl">PSIR RE:</span><span class="of3-hfill">' +
            esc(pet) +
            "</span></div>" +
            '<div class="of3-hfld"><span class="of3-hlbl">Criminal Case Number</span><span class="of3-hfill">' +
            esc(cc) +
            "</span></div>" +
            "</td>" +
            '<td class="of3-hdr-dkt">' +
            '<div class="of3-hfld of3-hfld-r"><span class="of3-hlbl">Investigation Docket No.</span><span class="of3-hfill">' +
            esc(dock) +
            "</span></div>" +
            "</td>" +
            "</tr></tbody></table>" +
            "</div>"
        );
    }

    function of3BannerBlock() {
        return '<div class="of3-banner"><span class="of3-banner-inner">POST-SENTENCE INVESTIGATION REPORT</span></div>';
    }

    function of3Page(ws, meta, pageIdx, showMast, innerHtml) {
        var brk = pageIdx < OF3_PAGE_TOTAL ? " page-break-after" : "";
        return (
            '<section class="of3-page' + brk +
            '">' +
            of3TopHeader(ws, meta, pageIdx) +
            (showMast ? letterheadBlock(meta) + of3BannerBlock() : "") +
            '<div class="of3-content">' +
            innerHtml +
            "</div>" +
            "</section>"
        );
    }

    function of3FieldRowFlex(partsHtml, mbCls) {
        return '<div class="of3-row ' + (mbCls || "") + '">' + partsHtml + "</div>";
    }

    function of3LabeledFill(label, value, flexGrow) {
        return (
            '<div class="of3-item' + (flexGrow ? " of3-grow" : "") +
            '">' +
            '<span class="of3-ll">' +
            esc(label) +
            '</span><span class="of3-ul">' +
            esc(str(value)) +
            "</span></div>"
        );
    }

    function of3LabeledFillTwo(leftLbl, leftVal, rightLbl, rightVal) {
        return (
            of3FieldRowFlex(
                of3LabeledFill(leftLbl, leftVal, true) +
                    '<span class="of3-tabgap"></span>' +
                    of3LabeledFill(rightLbl, rightVal, true),
                "of3-mb"
            )
        );
    }

    function of3Block(linesHtml, minHtMm) {
        return (
            '<div class="of3-textblk"' +
            (minHtMm ? ' style="min-height:' + minHtMm + "mm\"" : "") +
            ">" +
            linesHtml +
            "</div>"
        );
    }

    function of3TxtBlk(content, rowsApprox) {
        var t = str(content);
        if (t) {
            return '<div class="of3-par">' + esc(t).replace(/\n/g, "<br/>") + "</div>";
        }
        var h = "";
        var r = rowsApprox || 3;
        for (var i = 0; i < r; i++) {
            h += '<div class="of3-ruled">&nbsp;</div>';
        }
        return h;
    }

    function of3ExtentParticipationChks(po) {
        var p = of3norm(po.extentParticipation);
        return (
            '<span class="of3-inline-chks">' +
            "Age at time of commission–Extent of Participation: " +
            chk("Principal", p === "principal") +
            chk("Accomplice", p === "accomplice") +
            chk("Accessory", p === "accessory") +
            "</span>"
        );
    }

    function of3CustodyBlock(po) {
        var cust = mapCustody(po);
        var pd = str(po.periodOfDetention);
        return (
            '<div class="of3-cust">' +
            '<span class="of3-ll">Custody Status:</span> ' +
            chk("On Bail", cust.onBail) +
            chk("On Detention", cust.onDetention) +
            of3LabeledFill("Period of Detention", pd, false) +
            chk("ROR – Custodian", cust.ror) +
            "</div>" +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("", po.rorCustodian, true) +
            "</div>" +
            of3FieldRowFlex(of3LabeledFill("Address:", po.rorCustodianAddress, true), "of3-mb")
        );
    }

    function of3IdentifySection(id, ws, meta) {
        id.petitionersName = id.petitionersName || id.name;
        var nm = splitPetitionerNameParts(id);
        function petLine(txt, gCol) {
            return (
                '<div class="of3-pet-line ' + gCol +
                '"><span class="of3-pet-txt">' +
                esc(str(txt).toUpperCase()) +
                "</span></div>"
            );
        }
        function petCap(cap, gCol) {
            return '<div class="of3-pet-cap ' + gCol + '">' + esc(cap) + "</div>";
        }
        return (
            '<div class="of3-sec">I. IDENTIFYING DATA</div>' +
            '<div class="of3-pet-block of3-mb">' +
            '<div class="of3-pet-grid">' +
            '<span class="of3-pet-lbl">PETITIONER:</span>' +
            petLine(nm.last, "of3-pet-g2") +
            petLine(nm.first, "of3-pet-g3") +
            petLine(nm.middle, "of3-pet-g4") +
            '<span class="of3-pet-corner" aria-hidden="true"></span>' +
            petCap("(Last Name)", "of3-pet-g2") +
            petCap("(First Name)", "of3-pet-g3") +
            petCap("(Middle Name)", "of3-pet-g4") +
            "</div>" +
            "</div>" +
            of3LabeledFillTwo("True Name:", id.trueName, "Source of Info:", id.sourceOfInfo) +
            of3LabeledFillTwo("Alias/es:", id.alias, "Height (meters):", id.height) +
            "<div class=\"of3-row of3-mb\">" +
            of3LabeledFill("Weight (kilos)", id.weight, false) +
            "</div>" +
            of3LabeledFillTwo("Age:", id.age, "Sex:", id.sex) +
            of3LabeledFillTwo("Citizenship:", id.citizenship, "Religion:", id.religion) +
            of3FieldRowFlex(of3LabeledFill("Identifying Marks/Unusual Features:", id.identifyingMarks || id.remarks, true), "of3-mb") +
            of3FieldRowFlex(of3LabeledFill("Present Address:", id.presentAddress, true), "of3-mb") +
            of3FieldRowFlex(of3LabeledFill("Permanent Address:", id.permanentAdress || id.permanentAddress, true), "of3-mb")
        );
    }

    function of3PresentOffenseSec(po) {
        return (
            '<div class="of3-sec">II. PETITIONER’S CRIMINAL HISTORY</div>' +
            '<div class="of3-sub">A. PRESENT OFFENSE</div>' +
            of3LabeledFillTwo("Charged with", po.chargedWith, "Date:", po.chargedWithDate) +
            of3LabeledFillTwo("Convicted of", po.convictedOf, "Date:", po.convictedOfDate) +
            of3FieldRowFlex(of3LabeledFill("Sentence", po.sentence, true), "of3-mb") +
            of3LabeledFillTwo("Judge", po.judge, "Court:", po.court) +
            of3LabeledFillTwo("Defense Counsel", po.defenseCounsel, "Address", po.defenseCounselAddress) +
            of3LabeledFillTwo("Offended Party", po.offendedParty, "Address", po.offendedPartyAddress) +
            of3CustodyBlock(po) +
            '<div class="of3-sub2">Manner of Commission (Narrative)</div>' +
            of3TxtBlk(po.mannerofCommision, 4) +
            '<div class="of3-mb">' +
            of3ExtentParticipationChks(po) +
            "</div>" +
            '<div class="of3-sub2">I. Offender’s Statement</div>' +
            of3TxtBlk(po.offendersStatement, 3) +
            '<div class="of3-sub2">II. Victim’s Statement</div>' +
            of3TxtBlk(po.victimsStatement, 3) +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(po.remarks, 3)
        );
    }

    function of3PriorRowTr(r) {
        r = r || {};
        var ccDt =
            str(r.cc_no).trim() + (str(r.when).trim() ? " / " + str(r.when).trim() : "");
        var disp = str(r.disposition || r.decision || r.where || "").trim();
        return (
            "<tr><td>" +
            esc(str(r.agency)) +
            "</td><td>" +
            esc(ccDt) +
            "</td><td>" +
            esc(str(r.offense)) +
            "</td><td>" +
            esc(disp) +
            "</td></tr>"
        );
    }

    function of3PriorHasAnyData(ws) {
        var rows = nz(ws.priorRecordsAndDerogatoryRecord).priorRecord || [];
        for (var j = 0; j < rows.length; j++) {
            var r = rows[j] || {};
            if (
                str(r.agency) ||
                str(r.cc_no) ||
                str(r.offense) ||
                str(r.when) ||
                str(r.disposition) ||
                str(r.decision) ||
                str(r.where)
            ) {
                return true;
            }
        }
        return false;
    }

    function of3PriorTable(ws) {
        var rows = nz(ws.priorRecordsAndDerogatoryRecord).priorRecord || [];
        var body = "";
        if (!of3PriorHasAnyData(ws)) {
            body = "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
        } else {
            for (var i = 0; i < rows.length; i++) {
                body += of3PriorRowTr(rows[i]);
            }
        }
        return (
            '<div class="of3-sub">B. PRIOR RECORDS</div>' +
            '<table class="of3-grid">' +
            "<thead><tr>" +
            "<th>Agency</th><th>CC No./Date</th><th>Offense</th><th>Disposition/Date</th>" +
            "</tr></thead><tbody>" +
            body +
            "</tbody></table>"
        );
    }

    function of3Derogatory(ws) {
        var pr = nz(ws.priorRecordsAndDerogatoryRecord);
        var infos = pr.recordsInfo || [];
        var rows = "";
        if (infos.length === 0) {
            rows = "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
        } else {
            for (var i = 0; i < infos.length; i++) {
                var inf = infos[i] || {};
                var src = str(inf.source || "").trim() + (inf.position ? ", " + str(inf.position).trim() : "");
                rows +=
                    "<tr><td>" +
                    esc(src) +
                    "</td><td>" +
                    esc(str(inf.particulars)) +
                    "</td></tr>";
            }
        }
        return (
            '<div class="of3-sub">C. OTHER DEROGATORY INFORMATION</div>' +
            '<table class="of3-grid of3-der">' +
            "<thead><tr><th>Source/Position</th><th>Particulars</th></tr></thead><tbody>" +
            rows +
            "</tbody></table>"
        );
    }

    function of3FamMarriageChks(fb) {
        var sep = str(fb.seperationStatus || fb.separationStatus || "");
        var oth = str(fb.otherStatus || "");
        return (
            '<div class="of3-row of3-wrap of3-mb">' +
            '<span class="of3-ll">Status of Marriage:</span> ' +
            chk("Married", of3sel(fb.civilStatus, ["married"])) +
            chk("Annulled", of3sel(sep, ["annulled"])) +
            chk("Separated:", of3sel(sep, ["seperated", "separated"])) +
            chk("Legal", of3sel(sep, ["legal"])) +
            chk("Estranged", of3sel(sep, ["estranged"])) +
            chk("Common-Law/Live-in", of3sel(fb.civilStatus, ["common_law", "common-law"])) +
            chk("Others", !!oth || of3sel(sep, ["others"])) +
            (oth ? '<span class="of3-ul">' + esc(oth) + "</span>" : "") +
            "</div>"
        );
    }

    function of3chk(save, pdfLabel, backendKeys) {
        return chk(pdfLabel, of3sel(save, backendKeys));
    }

    function of3SocTriCol(titleA, optsA, selA, titleB, optsB, selB, titleC, optsC, selC) {
        function col(title, opts, sel) {
            var h = '<div class="of3-soc-col"><div class="of3-soc-title">' + esc(title) + "</div>";
            for (var i = 0; i < opts.length; i++) {
                var pair = opts[i];
                var label = pair[0];
                var keys = pair[1];
                h += "<div>" + of3chk(sel, label, keys) + "</div>";
            }
            h += "</div>";
            return h;
        }
        return (
            '<div class="of3-soc-row">' +
            col(titleA, optsA, selA) +
            col(titleB, optsB, selB) +
            col(titleC, optsC, selC) +
            "</div>"
        );
    }

    function of3FamilyBirth(fb) {
        var faParts = splitPetitionerNameParts({
            name: fb.fathersName,
            petitionersName: fb.fathersName,
        });
        var moParts = splitPetitionerNameParts({
            name: fb.mothersName,
            petitionersName: fb.mothersName,
        });
        return (
            '<div class="of3-sec">III. PERSONAL AND SOCIAL HISTORY</div>' +
            '<div class="of3-sub">A. PETITIONER’S BIRTH DATA</div>' +
            of3LabeledFillTwo("Date of Birth:", fb.birthDate, "Place of Birth:", fb.birthPlace) +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Birth Order:", fb.birthOrder, false) +
            "</div>" +
            '<div class="of3-sub">B. FAMILY BACKGROUND</div>' +
            '<div class="of3-sub2">1. PARENTS:</div>' +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Father:", fb.fathersName, true) +
            of3LabeledFill("Age:", fb.fathersAge, false) +
            of3LabeledFill("Occupation:", fb.fathersOccupation, true) +
            "</div>" +
            '<div class="of3-nameparts"><span>Last Name</span><span>First</span><span>Middle</span></div>' +
            '<div class="of3-three nm">' +
            "<div><span class=\"of3-ul\">" +
            esc(faParts.last) +
            "</span></div><div><span class=\"of3-ul\">" +
            esc(faParts.first) +
            "</span></div><div><span class=\"of3-ul\">" +
            esc(faParts.middle) +
            "</span></div></div>" +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Mother:", fb.mothersName, true) +
            of3LabeledFill("Age:", fb.mothersAge, false) +
            of3LabeledFill("Occupation:", fb.mothersOccupation, true) +
            "</div>" +
            '<div class="of3-nameparts"><span>Middle Name</span><span>First</span><span>Middle</span></div>' +
            '<div class="of3-three nm">' +
            "<div><span class=\"of3-ul\">" +
            esc(moParts.last) +
            "</span></div><div><span class=\"of3-ul\">" +
            esc(moParts.first) +
            "</span></div><div><span class=\"of3-ul\">" +
            esc(moParts.middle) +
            "</span></div></div>" +
            of3FamMarriageChks(fb) +
            '<div class="of3-sub2">2. SOCIO-ECONOMIC BACKGROUND</div>' +
            of3SocTriCol(
                "Family Relationship",
                [
                    ["Very Satisfactory", ["very_satisfactory"]],
                    ["Satisfactory", ["satisfactory"]],
                    ["Fair", ["fair"]],
                    ["Poor", ["poor"]],
                    ["One-Parent-Family", ["one_parent_family"]],
                    ["Parent-Child Conflict", ["parent_child_conflict"]],
                    ["Sibling Conflict", ["sibling_conflict"]],
                    ["Others", ["others"]],
                ],
                fb.familyRelationship,
                "Major Family Problems",
                [
                    ["No Apparent Problem", ["no_apparent_problem"]],
                    ["Economic", ["economic"]],
                    ["Mental/Physical Illness", ["mental_physical_illness"]],
                    ["Marital Problem", ["marital_problem"]],
                ],
                fb.majorFamilyProblem,
                "Family Reputation in the Community",
                [
                    ["Very Satisfactory", ["very_satisfactory"]],
                    ["Satisfactory", ["satisfactory"]],
                    ["Fair", ["fair"]],
                    ["Poor", ["poor"]],
                ],
                fb.familyReputationInCommunity
            ) +
            of3SocTriCol(
                "Family Economic Status",
                [
                    ["More than Adequate", ["more_adequate", "more_than_adequate"]],
                    ["Adequate", ["adequate"]],
                    ["Inadequate", ["inadequate"]],
                    ["Below Poverty Line", ["below_poverty_lines", "below_poverty_line"]],
                ],
                fb.familyEconomicStatus,
                "Physical Home Conditions",
                [
                    ["Very Satisfactory", ["very_satisfactory"]],
                    ["Satisfactory", ["satisfactory"]],
                    ["Fair", ["fair"]],
                    ["Poor", ["poor"]],
                ],
                fb.homeCondition,
                "Stability of Residence",
                [
                    ["Stable", ["stable"]],
                    ["Occasional Change", ["occasional_change"]],
                    ["Frequent Change", ["frequent_change"]],
                    ["No Stability", ["no_stability"]],
                ],
                fb.stabilityOfResidence
            ) +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(fb.remarks, 3)
        );
    }

    function of3CivilRow(ps) {
        return (
            chk("Single", of3sel(ps.civilStatus, ["single"])) +
            chk("Married", of3sel(ps.civilStatus, ["married"])) +
            chk("Widow/Widower", of3sel(ps.civilStatus, ["widow/widower", "widow", "widower"])) +
            chk("With Common-Law/Live-in Partner", of3sel(ps.civilStatus, ["common_law", "common-law"]))
        );
    }

    function of3SpouseSex(ps) {
        return (
            '<span class="of3-sex-chk">Sex: ' +
            chk("Male", of3sel(ps.spouseSex, ["male"])) +
            chk("Female", of3sel(ps.spouseSex, ["female"])) +
            "</span>"
        );
    }

    function of3ChildrenTable(ps) {
        var ch = ps.children || [];
        var rows = "";
        for (var i = 0; i < ch.length; i++) {
            var c = ch[i] || {};
            rows +=
                "<tr><td>" +
                esc(c.age) +
                "</td><td>" +
                esc(c.school) +
                "</td><td>" +
                esc(c.education) +
                "</td><td>" +
                esc(c.legitimate) +
                "</td><td>" +
                esc(c.illegitimate) +
                "</td></tr>";
        }
        if (!rows) {
            rows = "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
        }
        return (
            '<table class="of3-grid of3-ch">' +
            "<thead><tr>" +
            "<th>Age</th><th>In/Out of School</th><th>Educational Attainment</th><th>Legitimate</th><th>Illegitimate</th>" +
            "</tr></thead><tbody>" +
            rows +
            "</tbody></table>"
        );
    }

    function of3ChildRelChk(ps) {
        var r = str(ps.childrenRelationship || "");
        return (
            '<div class="of3-row of3-wrap of3-mb">' +
            '<span class="of3-ll">Relationship with Children:</span> ' +
            chk("Very Satisfactory", of3sel(r, ["very_satisfactory", "very satisfactory"])) +
            chk("Satisfactory", of3sel(r, ["satisfactory"])) +
            chk("Fair", of3sel(r, ["fair"])) +
            chk("Poor", of3sel(r, ["poor"])) +
            "</div>"
        );
    }

    function of3DwellingRow(ps) {
        var d = str(ps.dwelling || "");
        return (
            '<div class="of3-sub2">3. Residence</div>' +
            '<table class="of3-grid of3-res"><thead><tr>' +
            "<th>Dwelling</th><th>Stability of Residence</th><th>Physical Home Conditions</th>" +
            "</tr></thead><tbody><tr><td>" +
            '<div class="of3-stack">' +
            chk("Owned: Yrs of Stay " + esc(str(ps.yearsStayedOwned || "")), of3sel(d, ["owned"])) +
            chk("Rented: Yrs of Stay " + esc(str(ps.yearsStayedRented || "")), of3sel(d, ["rented"])) +
            chk("Informal Settler", of3sel(d, ["informal_settler"])) +
            chk("Others", of3sel(d, ["others"])) +
            "</div></td><td>" +
            '<div class="of3-stack">' +
            chk("Stable", of3sel(ps.residenceStability, ["stable"])) +
            chk("Occasional Change", of3sel(ps.residenceStability, ["occasional_change"])) +
            chk("Frequent Change", of3sel(ps.residenceStability, ["frequent_change"])) +
            chk("No Stability", of3sel(ps.residenceStability, ["no_stability"])) +
            "</div></td><td>" +
            '<div class="of3-stack">' +
            chk("Very Satisfactory", of3sel(ps.physicalHomeCondition, ["very_satisfactory"])) +
            chk("Satisfactory", of3sel(ps.physicalHomeCondition, ["satisfactory"])) +
            chk("Fair", of3sel(ps.physicalHomeCondition, ["fair"])) +
            chk("Poor", of3sel(ps.physicalHomeCondition, ["poor"])) +
            "</div></td></tr></tbody></table>"
        );
    }

    function of3EconomicRow(ps) {
        var fe = str(ps.familyEconomicStatus || "");
        var fbw = str(ps.familyBreadwinner || "");
        var role = str(ps.roleInTheFamily || "");
        var inc = str(ps.incomeContributor || "");
        return (
            '<div class="of3-sub2">4. Economic Condition</div>' +
            '<table class="of3-grid of3-eco"><thead><tr>' +
            "<th>Family Economic Status</th><th>Family Breadwinner</th><th>Petitioner’s Role in the Family</th>" +
            "</tr></thead><tbody><tr><td>" +
            '<div class="of3-stack">' +
            chk("More than Adequate", of3sel(fe, ["more_than_adequate", "more_adequate"])) +
            chk("Adequate", of3sel(fe, ["adequate"])) +
            chk("Inadequate", of3sel(fe, ["inadequate"])) +
            chk("Below Poverty Level", of3sel(fe, ["below_poverty_lines", "below_poverty"])) +
            "</div></td><td>" +
            '<div class="of3-stack">' +
            chk("Petitioner", of3sel(fbw, ["petitioner"])) +
            chk("Spouse", of3sel(fbw, ["spouse"])) +
            chk("Petitioner and Spouse", of3sel(fbw, ["petiioner_and_spouse", "petitioner_and_spouse"])) +
            chk("Others", of3sel(fbw, ["other"])) +
            "</div></td><td>" +
            '<div class="of3-stack">' +
            chk("Income Contributor", of3sel(role, ["income_contributor"])) +
            chk("Total", of3sel(inc, ["total"])) +
            chk("Partial", of3sel(inc, ["partial"])) +
            chk("Primary Care-giver", of3sel(role, ["primary_care_giver"])) +
            chk("Dependent", of3sel(role, ["dependent"])) +
            "</div></td></tr></tbody></table>"
        );
    }

    function of3MajorProb(ps) {
        var m = str(ps.majorFamilyProblem || "");
        var o = str(ps.otherFamilyProblem || "");
        return (
            '<div class="of3-sub2">5. Major Problems in the Family</div>' +
            '<div class="of3-stack of3-mb">' +
            chk("No Apparent Problem", of3sel(m, ["no_apparent_problem"])) +
            chk("Mental Illness", of3sel(m, ["mental_illness"])) +
            chk("Sibling conflict", of3sel(m, ["sibling_conflict"])) +
            chk("Economic", of3sel(m, ["economic"])) +
            chk("Physical Illness", of3sel(m, ["physical_illness"])) +
            chk("Others " + esc(o), of3sel(m, ["others"])) +
            chk("Husband-Wife Conflict", of3sel(m, ["husband_wife_conflict"])) +
            chk("Parent-Child Conflict", of3sel(m, ["parent_child_conflict"])) +
            "</div>"
        );
    }

    function of3PresentSituation(ps, ws, meta) {
        var spNm = splitPetitionerNameParts({
            name: ps.spouseName,
            petitionersName: ps.spouseName,
        });
        return (
            '<div class="of3-sub">C. PETITIONER’S PRESENT SITUATION</div>' +
            '<div class="of3-row of3-wrap of3-mb">' +
            '<span class="of3-ll">Civil Status:</span> ' +
            of3CivilRow(ps) +
            "</div>" +
            '<div class="of3-row of3-wrap of3-mb">' +
            '<span class="of3-ll">Status of Marriage:</span> ' +
            chk("Annulled", of3sel(ps.statusOfMarriage, ["annulled"])) +
            chk("Separated", of3sel(ps.statusOfMarriage, ["seperated", "separated"])) +
            chk("Legal", of3sel(ps.statusOfMarriage, ["legal"])) +
            chk("Estranged", of3sel(ps.statusOfMarriage, ["estranged"])) +
            chk("Others", of3sel(ps.statusOfMarriage, ["others"])) +
            (ps.otherStatusOfMarriage
                ? '<span class="of3-ul">' + esc(str(ps.otherStatusOfMarriage)) + "</span>"
                : "") +
            "</div>" +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Remarks:", ps.remarksCivilStatus, true) +
            "</div>" +
            '<div class="of3-sub2">1. Domestic Partner/Spouse</div>' +
            '<div class="of3-row of3-mb">' +
            '<span class="of3-ul of3-grow" style="display:block">' +
            esc(str(ps.spouseName)) +
            "</span>" +
            "</div>" +
            '<div class="of3-nameparts of3-four-h"><span>Full Name</span><span>Last/Maiden Name</span><span>First</span><span>Middle</span></div>' +
            '<div class="of3-four nm of3-mb">' +
            '<div><span class="of3-ul">' +
            esc(str(ps.spouseName)) +
            "</span></div>" +
            '<div><span class="of3-ul">' +
            esc(spNm.last) +
            "</span></div>" +
            '<div><span class="of3-ul">' +
            esc(spNm.first) +
            "</span></div>" +
            '<div><span class="of3-ul">' +
            esc(spNm.middle) +
            "</span></div>" +
            "</div>" +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Age", ps.spouseAge, false) +
            of3SpouseSex(ps) +
            of3LabeledFill("Occupation", ps.spouseOccupation, true) +
            "</div>" +
            of3FieldRowFlex(of3LabeledFill("Home Address:", ps.spouseHomeAddress, true), "of3-mb") +
            of3FieldRowFlex(of3LabeledFill("Work Address:", ps.spouseWorkAddress, true), "of3-mb") +
            '<div class="of3-sub2">2. Children: Total No. of Children ' +
            esc(str(ps.totalNoOfchildren || "")) +
            "</div>" +
            of3ChildrenTable(ps) +
            of3ChildRelChk(ps) +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION:</div>' +
            of3TxtBlk(ps.remarksInChildren, 2) +
            of3DwellingRow(ps) +
            of3EconomicRow(ps) +
            of3MajorProb(ps) +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(ps.remarksInPetitionersSituation, 3)
        );
    }

    function of3ConductSchool(ej) {
        var c = str(ej.overAllConductInSchool || "");
        return (
            '<div class="of3-row of3-wrap of3-mb">' +
            chk("Very Satisfactory", of3sel(c, ["very_satisfactory"])) +
            chk("Satisfactory", of3sel(c, ["satisfactory"])) +
            chk("Fair", of3sel(c, ["fair"])) +
            chk("Poor", of3sel(c, ["poor"])) +
            "</div>"
        );
    }

    function of3WorkStatusChks(ej) {
        var w = str(ej.workStatus || "");
        return (
            '<div class="of3-stack of3-mb">' +
            chk("Self-employed", of3sel(w, ["self_employed"])) +
            chk("Regular/Permanent", of3sel(w, ["regular_permanent"])) +
            chk("Temporary", of3sel(w, ["temporary"])) +
            chk("Contractual", of3sel(w, ["contractual"])) +
            chk("Casual", of3sel(w, ["casual"])) +
            chk("Intermittent", of3sel(w, ["intermittent"])) +
            chk("Seasonal", of3sel(w, ["seasonal"])) +
            "</div>"
        );
    }

    function of3EduJobMedTraits(ws, meta) {
        var ej = nz(ws.educationAndJobHistory);
        var med = nz(ws.medicalHistory);
        var tr = nz(ws.traitsAndCommunityBackground);
        var drug = str(med.drugOrAlcoholUse || "").toLowerCase();
        return (
            '<div class="of3-sub">D. EDUCATION</div>' +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Educational Attainment:", ej.educationAttainment, true) +
            "</div>" +
            '<div class="of3-row of3-mb"><span class="of3-ll">Over-all Conduct in School:</span>' +
            of3ConductSchool(ej) +
            "</div>" +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(ej.educationalRemarks, 3) +
            '<div class="of3-sub">E. JOB HISTORY</div>' +
            '<div class="of3-num">1. Petitioner’s Previous Occupation:</div>' +
            '<div class="of3-ulblock">' +
            esc(str(ej.previousOccupation)) +
            "</div>" +
            '<div class="of3-num">2. Petitioner’s Present Occupation:</div>' +
            '<div class="of3-ulblock">' +
            esc(str(ej.presentOccupation)) +
            "</div>" +
            '<div class="of3-row of3-mb">' +
            of3LabeledFill("Employer and Work Address:", ej.employerAddress, true) +
            "</div>" +
            '<div class="of3-num">3. Present Work Status:</div>' +
            of3WorkStatusChks(ej) +
            '<div class="of3-num">4. Special Skills:</div>' +
            of3TxtBlk(ej.specialSkills, 2) +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(ej.jobRemarks, 3) +
            '<div class="of3-sub">F. MEDICAL HISTORY</div>' +
            of3FieldRowFlex(of3LabeledFill("Past Medical History", med.pastMedicalHistory, true), "of3-mb") +
            of3FieldRowFlex(of3LabeledFill("Present Illness", med.presentIllness, true), "of3-mb") +
            of3FieldRowFlex(of3LabeledFill("Present Medication", med.presentMedication, true), "of3-mb") +
            '<div class="of3-row of3-wrap of3-mb">' +
            '<span class="of3-ll">Drug/Alcohol Use:</span> ' +
            chk("No", drug === "no") +
            chk("Yes", drug === "yes") +
            of3LabeledFill("Extent of Use:", med.extentOfUse, true) +
            "</div>" +
            '<div class="of3-sub2">REMARKS/ADDITIONAL INFORMATION</div>' +
            of3TxtBlk(med.remarksMedical, 3) +
            '<div class="of3-sub">G. PETITIONER’S TRAITS/CHARACTERISTICS:</div>' +
            '<div class="of3-sub2">Positive:</div>' +
            of3TxtBlk(tr.positiveTraits, 2) +
            '<div class="of3-sub2">Negative:</div>' +
            of3TxtBlk(tr.negativeTraits, 2) +
            '<div class="of3-sub2">Overall Impression of the Client</div>' +
            of3TxtBlk(tr.overAllImpression, 2)
        );
    }

    function of3CommunityAnalysis(ws) {
        var tr = nz(ws.traitsAndCommunityBackground);
        var ev = nz(ws.analysisAndProjectedThrust);
        return (
            '<div class="of3-sub">H. PETITIONER’S BACKGROUND IN THE COMMUNITY AND COLLATERAL INFORMATION</div>' +
            of3TxtBlk(tr.remarks, 4) +
            '<table class="of3-grid">' +
            "<thead><tr>" +
            "<th>Collateral Source of Information</th><th>Relationship to Client</th><th>Collateral Information Gathered</th>" +
            "</tr></thead><tbody><tr><td>" +
            esc(str(tr.collateralSourceOfInformation)) +
            "</td><td>" +
            esc(str(tr.relationshipToClient)) +
            "</td><td>" +
            esc(str(tr.collateralInforamtionGathered)) +
            "</td></tr></tbody></table>" +
            '<div class="of3-sec of3-mtop">IV. ANALYSIS AND EVALUATION</div>' +
            of3TxtBlk(ev.analysisAndEvaluation, 6) +
            '<div class="of3-sec">V. PROJECTED THRUSTS OF REHABILITATION</div>' +
            of3TxtBlk(ev.projectedThrustsOfRehabilitation || ev.projectedThrust, 6)
        );
    }

    function of3FillConditionPlaceholders(html, meta) {
        var ini = str(meta.initialReportOfficeLine || "").trim();
        var sup = str(meta.supervisingOfficerLine || "").trim();
        var out = html;
        if (ini) {
            out = out.replace(
                "Chief Probation and Parole Officer at _____________________________________________________________________",
                "Chief Probation and Parole Officer at " + ini
            );
        }
        if (sup) {
            out = out.replace(
                "Probation and Parole Officer _____________________________________",
                "Probation and Parole Officer " + sup
            );
        }
        return out;
    }

    function of3RecommendationGranted(ws, meta) {
        var pet = resolvePetitionerDisplayFromParts(ws, meta);
        var period = str(meta.probationPeriodRecommended || "").trim();
        var periodTxt = period ? period : "_______________________";
        var ol = "<ol class=\"of3-cond\">";
        for (var i = 0; i < OF3_GRANTED_CONDITIONS.length; i++) {
            var li = esc(of3FillConditionPlaceholders(OF3_GRANTED_CONDITIONS[i], meta));
            ol += "<li>" + li + "</li>";
        }
        ol += "</ol>";
        return (
            '<div class="of3-sec">RECOMMENDATION</div>' +
            '<p class="of3-justify">' +
            "WHEREFORE, in view of the foregoing, it is respectfully recommended to the Honorable Court that the petition for probation of " +
            '<span class="of3-ul">' +
            esc(pet) +
            "</span> be " +
            "<strong>GRANTED</strong> for a period of " +
            '<span class="of3-ul">' +
            esc(periodTxt) +
            "</span>, to be counted from Probationer’s initial report for supervision and subject to the following conditions:" +
            "</p>" +
            ol +
            '<p class="of3-justify">' +
            "In the event that Petitioner fails to observe the preceding conditions and/or has committed any material misrepresentation in his application for probation, his probation may be revoked by the Court or the conditions thereof modified." +
            "</p>" +
            '<div class="of3-sigblock">' +
            '<div class="of3-sigline">' +
            esc(meta.cityProvinceDate || "_____________________________, Philippines __________________") +
            "</div>" +
            '<div class="of3-siggrid">' +
            "<div><div class=\"of3-sigh\">SUBMITTED BY:</div><div class=\"of3-sigrule\"></div>" +
            '<div class="of3-sigt">' +
            esc(meta.investigatingOfficer || meta.probationOfficerName || "") +
            "</div>" +
            '<div class="of3-sigt">Probation and Parole Officer</div>' +
            '<div class="of3-sigt">Date: <span class="of3-ul">' +
            esc(meta.investigatingDate || "") +
            "</span></div></div>" +
            "<div><div class=\"of3-sigh\">APPROVED BY:</div><div class=\"of3-sigrule\"></div>" +
            '<div class="of3-sigt">' +
            esc(meta.headFieldOfficeName || "") +
            "</div>" +
            '<div class="of3-sigt">Chief Probation and Parole Office</div>' +
            '<div class="of3-sigt">Date: <span class="of3-ul">' +
            esc(meta.headDate || "") +
            "</span></div></div>" +
            "</div>" +
            "</div>"
        );
    }

    function buildBodyOfficialLong(ws, meta) {
        meta = meta || {};
        var id = nz(ws.identifyingData);
        id.petitionersName = id.petitionersName || id.name;
        var po = nz(ws.presentOffense);
        var fb = nz(ws.familyBackgroundAndBirthData);
        var ps = nz(ws.presentSituation);
        var out = "";
        out +=
            of3Page(ws, meta, 1, true, of3IdentifySection(id, ws, meta) + of3PresentOffenseSec(po)) +
            of3Page(ws, meta, 2, false, of3PriorTable(ws) + of3Derogatory(ws) + of3FamilyBirth(fb)) +
            of3Page(ws, meta, 3, false, of3PresentSituation(ps, ws, meta)) +
            of3Page(ws, meta, 4, false, of3EduJobMedTraits(ws, meta)) +
            of3Page(ws, meta, 5, false, of3CommunityAnalysis(ws)) +
            of3Page(ws, meta, 6, false, of3RecommendationGranted(ws, meta));
        return '<article class="sheet sheet-of3">' + out + "</article>";
    }

    function buildBodyLegacyShort(ws, meta) {
        meta = meta || {};
        var id = nz(ws.identifyingData);
        var po = nz(ws.presentOffense);

        var parts = "";
        parts += sectionPsirCoverLetter(meta, ws);

        parts +=
            '<article class="sheet">' +
            sectionMetaHeader(meta, ws) +
            letterheadBlock(meta) +
            '<div class="psir-banner"><span class="psir-banner-inner">POST-SENTENCE INVESTIGATION REPORT</span></div>';

        parts += identifyingGrid(id);
        parts += criminalBlock(po, ws);
        parts += socioBlock(ws);
        parts += analysisBlock(ws, "short");

        parts += recommendationBlock(ws, meta, true);

        parts += "</article>";
        return parts;
    }

    function buildBody(ws, meta) {
        meta = meta || {};
        if (meta.variant === "long") {
            return buildBodyOfficialLong(ws, meta);
        }
        return buildBodyLegacyShort(ws, meta);
    }

    function buildHtmlDocument(ws, meta) {
        meta = meta || {};
        var body = buildBody(ws, meta);
        var css =
            "@page{size:A4;margin:25.4mm}" +
            "html,body{margin:0;padding:0;color:#000;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:'Times New Roman',Times,serif;font-size:11pt;line-height:1.35}" +
            ".sheet{max-width:190mm;margin:0 auto;padding:0}" +
            ".block{margin-bottom:6mm}" +
            ".page-break-after{page-break-after:always}" +
            ".page-break-inside-avoid{page-break-inside:avoid}" +
            ".psir-cover-sheet{box-sizing:border-box;width:100%;min-height:246mm;display:flex;flex-direction:column;font-family:'Times New Roman',Times,serif;font-size:11pt;line-height:1.15;color:#000}" +
            ".cover-sheet-inner{max-width:190mm;margin:0 auto;padding:0}" +
            ".cover-letterhead{display:flex;flex-direction:column;width:100%;box-sizing:border-box;margin:0 0 9mm}" +
            ".cover-letterhead-row{display:flex;flex-direction:row;align-items:stretch;width:100%;box-sizing:border-box;min-height:34mm}" +
            ".cover-hdr-left{flex:0 0 26%;max-width:26%;display:flex;align-items:center;justify-content:flex-start;padding:0 2mm 0 0;box-sizing:border-box}" +
            ".cover-hdr-left-inner{display:flex;align-items:center;justify-content:flex-start;width:100%;height:100%}" +
            ".cover-img-seal-ppa{height:27mm;width:auto;max-width:34mm;display:block;margin:0}" +
            ".cover-hdr-center{flex:1 1 48%;min-width:0;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;padding:0 3mm;box-sizing:border-box;line-height:1.15}" +
            ".cover-hdr-center-stack{text-align:center;width:100%;flex:0 0 auto}" +
            ".cover-hdr-center-spacer{flex:1 1 auto;min-height:2mm}" +
            ".cover-hdr-contact-block{flex:0 0 auto;width:100%;text-align:center;font-size:9pt;line-height:1.25;color:#222;margin-bottom:1.5mm}" +
            ".cover-hdr-contact-inner{display:inline-block;text-align:center;max-width:100%}" +
            ".cover-hdr-contact-line{margin:0 0 1mm}" +
            ".cover-hdr-contact-line:last-child{margin-bottom:0}" +
            ".cover-hdr-url{color:#000;text-decoration:underline}" +
            ".cover-hdr-red-rule-full{display:block;width:100%;max-width:100%;box-sizing:border-box;border:none;border-bottom:1.5pt solid #c40000;margin:2mm 0 0;padding:0;line-height:0;flex-shrink:0}" +
            ".cover-hdr-right{flex:0 0 26%;max-width:26%;display:flex;align-items:center;justify-content:flex-end;padding:0 0 0 2mm;box-sizing:border-box}" +
            ".cover-hdr-right-inner{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;width:100%;align-self:stretch;height:100%;box-sizing:border-box}" +
            ".cover-hdr-form-top{text-align:right;line-height:1.15;margin-bottom:3mm;flex:0 0 auto;width:100%}" +
            ".cover-form-33{font-weight:700;font-size:10pt;line-height:1.15}" +
            ".cover-form-rev{font-weight:700;font-size:9.5pt;line-height:1.15;margin-top:1mm}" +
            ".cover-hdr-logos-pair{display:flex;flex-direction:row;align-items:center;justify-content:flex-end;gap:3mm;flex:0 0 auto;width:auto}" +
            ".cover-img-seal-side{height:18mm;width:auto;max-width:22mm;display:block;margin:0}" +
            ".cover-hdr-line{margin:0 0 1mm;font-size:10.5pt;line-height:1.15}" +
            ".cover-hdr-dojtxt{font-weight:700}" +
            ".cover-hdr-ppa{color:#c40000;font-weight:700;letter-spacing:.02em;text-transform:uppercase}" +
            ".cover-hdr-office{font-weight:700}" +
            ".cover-hdr-addr{font-size:9.5pt;margin-top:1mm;color:#222;line-height:1.15}" +
            ".cover-flow{flex:1 1 auto;line-height:1.15}" +
            ".cover-top-block{margin:0 0 8mm}" +
            ".cover-date-row{display:flex;align-items:baseline;gap:4mm;margin:0 0 8mm;text-align:left;line-height:1.15}" +
            ".cover-date-label{flex-shrink:0;font-weight:400}" +
            ".cover-date-field{flex:0 1 auto;min-width:42mm;max-width:65%}" +
            ".cover-address-block{text-align:left;margin:0;line-height:1.15}" +
            ".cover-addr-line{margin:0 0 4mm}" +
            ".cover-addr-judge{margin-bottom:2mm}" +
            ".cover-addr-court{margin-bottom:0}" +
            ".cover-addr-role{font-style:italic;font-size:10pt;margin:0 0 5mm;color:#222;line-height:1.15}" +
            ".cover-field-ul,.cover-sheet-inner .ul{border-bottom:1pt solid #000}" +
            ".cover-ul-full{display:block;width:100%;max-width:100%;box-sizing:border-box}" +
            ".cover-salutation{margin:6mm 0 4mm;line-height:1.15}" +
            ".cover-letter-body{margin:0 0 10mm;text-align:justify;text-justify:inter-word;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word;word-wrap:break-word;line-height:1.15}" +
            ".cover-petitioner-name,.cover-cc-value{font-weight:700;text-transform:uppercase;letter-spacing:.02em}" +
            ".cover-cc-label{font-weight:700;text-transform:uppercase}" +
            ".cover-emspace{display:inline-block;width:0.25em}" +
            ".cover-closing-block{margin-top:auto;text-align:right;width:100%;box-sizing:border-box;padding-top:12mm;line-height:1.15}" +
            ".cover-vty{margin:0 0 0}" +
            ".cover-signature-gap{height:calc(4 * 1.15em);min-height:calc(4 * 1.15em);margin:0 0 2mm}" +
            ".cover-head-line{margin:0;font-weight:400}" +
            ".cover-head-title{margin:2mm 0 0;font-style:italic;font-size:10pt;color:#222;line-height:1.15}" +
            ".cover-sheet-footer{flex-shrink:0;display:flex;flex-direction:row;justify-content:space-between;align-items:flex-end;width:100%;box-sizing:border-box;margin-top:auto;padding-top:6mm;border:none;gap:4mm}" +
            ".cover-footer-graphic{flex:1;min-width:0;text-align:left}" +
            ".cover-img-redeem{width:100%;max-width:118mm;height:auto;display:block}" +
            ".cover-footer-iso-stack{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;text-align:right;max-width:42mm;line-height:1.15}" +
            ".cover-img-iso{max-width:38mm;height:auto;display:block;margin-bottom:1mm}" +
            ".cover-footer-cert-lines{display:flex;flex-direction:column;align-items:flex-end;font-size:8pt;color:#000}" +
            ".cover-footer-cert-line{display:block;white-space:nowrap}" +
            ".meta-hdr{width:100%;border-collapse:collapse;margin-bottom:3mm;font-size:10pt}" +
            ".meta-hdr td{vertical-align:top;width:50%;padding:1mm 0;border:none}" +
            ".meta-left .lbl{font-weight:700}" +
            ".meta-right{text-align:right}" +
            ".meta-right .frm{font-weight:700}" +
            ".mast{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;column-gap:4mm;width:100%;box-sizing:border-box;margin:2mm 0 5mm}" +
            ".mast-gutter-l{min-width:0}" +
            ".mast-center{text-align:center;line-height:1.38;font-size:10pt}" +
            ".mast-gutter-r{display:flex;justify-content:flex-end;align-items:center;min-width:0}" +
            ".mast-center .b{font-weight:700}" +
            ".mast-center .ppa{color:#000;font-weight:700;letter-spacing:.03em}" +
            ".mast-center .addr{font-size:9.5pt;margin-top:1mm;color:#222}" +
            ".photo-img{width:28mm;height:35mm;object-fit:cover;border:0.5pt solid #aaa;display:inline-block}" +
            ".photo-ph{width:28mm;height:35mm;border:0.5pt dashed #999;display:inline-flex;align-items:center;justify-content:center;font-size:8pt;color:#777}" +
            ".psir-banner{border:1pt solid #000;padding:3mm 5mm;margin:4mm 0 6mm;text-align:center;box-sizing:border-box}" +
            ".psir-banner-inner{font-weight:700;font-size:11pt;letter-spacing:.12em;text-transform:uppercase;display:inline-block}" +
            ".sec-head{font-weight:700;text-transform:uppercase;text-align:center;margin:6mm 0 4mm;font-size:10.5pt;letter-spacing:.08em}" +
            ".sub-sec-head{font-weight:700;margin:5mm 0 3mm;font-size:10pt}" +
            ".id-section,.crim-section,.soc-section,.analysis-section{margin-bottom:2mm}" +
            ".pet-name-block{margin:1mm 0 5mm}" +
            ".pet-name-label{font-weight:700;margin-bottom:2mm}" +
            ".court-rec-hint{font-weight:400;font-style:italic;font-size:9pt}" +
            ".pet-three-col{display:flex;gap:6mm;align-items:flex-end}" +
            ".pet-cell{flex:1;min-width:0}" +
            ".pet-cell .fill-line{border-bottom:1pt solid #000;min-height:1.25em;padding:0 0 2px;box-sizing:border-box}" +
            ".pet-sub{font-size:8pt;font-style:italic;text-align:center;margin-top:2mm;line-height:1.2}" +
            ".id-row-pair{display:flex;gap:8mm;margin-bottom:4mm;align-items:flex-end}" +
            ".id-field{flex:1;min-width:0;display:flex;align-items:flex-end;gap:3mm}" +
            ".flab{flex-shrink:0;font-weight:400;white-space:nowrap}" +
            ".fill-line{flex:1;border-bottom:1pt solid #000;min-height:1.2em;word-break:break-word;padding:0 2px 2px;box-sizing:border-box}" +
            ".id-full{display:flex;align-items:flex-end;gap:3mm;margin-bottom:4mm;width:100%;box-sizing:border-box}" +
            ".id-full .flab{align-self:flex-end}" +
            ".id-full .fill-line{flex:1}" +
            ".cust-row{display:flex;align-items:center;gap:4mm;margin:4mm 0 3mm;flex-wrap:wrap}" +
            ".cust-gap{display:inline-block;width:8mm}" +
            ".cust-ror{display:flex;align-items:flex-end;gap:3mm;margin-bottom:4mm;flex-wrap:wrap}" +
            ".cust-ror .pch{flex-shrink:0}" +
            ".cust-ror .fill-line{flex:1;min-width:35mm}" +
            ".ul{border-bottom:1pt solid #000;min-height:1.05em;display:inline-block;vertical-align:bottom;word-break:break-word}" +
            ".ul.grow{width:96%}" +
            ".ul.wide{width:100%}" +
            ".ul.mid{width:62mm}" +
            ".inline-ul{min-width:35mm;border-bottom:1pt solid #000;display:inline-block}" +
            ".pri{width:100%;border-collapse:collapse;margin:2mm 0 4mm;font-size:9.5pt;border-top:2.25pt solid #000;border-bottom:2.25pt solid #000}" +
            ".pri th,.pri td{border-left:none;border-right:none;padding:2.5mm 3mm 2.5mm 0;vertical-align:top}" +
            ".pri thead th{font-weight:700;text-align:left;background:transparent;border-bottom:1pt solid #000;padding-bottom:2mm}" +
            ".pri tbody tr:first-child td{border-top:none}" +
            ".prior-note{font-size:9pt;font-style:italic;text-align:justify;margin:3mm 0 5mm;line-height:1.4;color:#222}" +
            ".soc-row-three{display:flex;gap:8mm;margin-bottom:8mm;align-items:flex-start;justify-content:space-between}" +
            ".soc-cell{flex:1;min-width:0;padding:0 3mm 0 0;font-size:9.5pt;line-height:1.45}" +
            ".soc-cell:last-child{padding-right:0}" +
            ".soc-col-head{font-weight:700;text-decoration:underline;text-align:center;margin-bottom:4mm;font-size:9.5pt;display:block}" +
            ".pch{font-size:9pt;display:flex;align-items:flex-start;gap:2mm;margin:1.5mm 0;line-height:1.3}" +
            ".pch .pdot{width:7px;height:7px;border:1pt solid #000;border-radius:50%;flex-shrink:0;margin-top:3px;background:#fff}" +
            ".pch.on .pdot{background:#222;border-color:#222}" +
            ".rule-top{margin-top:6mm;padding-top:3mm;border-top:0.35pt solid #bbb}" +
            ".body-text{white-space:pre-wrap;text-align:justify;margin:3mm 0;line-height:1.45}" +
            ".ruled-line{border-bottom:0.75pt solid #ccc;min-height:4.5mm;margin:0 0 2mm}" +
            ".rec-sub{text-align:center;margin-bottom:4mm;font-size:10pt;font-weight:600}" +
            ".justify{text-align:justify;line-height:1.42;margin:4mm 0}" +
            ".cond-list{margin:3mm 0 4mm;padding-left:6mm}" +
            ".cond-list li{margin:1.5mm 0;text-align:justify;line-height:1.4}" +
            ".sig-date{margin:8mm 0 5mm}" +
            ".sig-two{display:flex;gap:12mm;margin-top:6mm;font-size:10pt}" +
            ".sig-col{flex:1;min-width:0}" +
            ".sig-h{font-weight:700;margin-bottom:2mm}" +
            ".sig-two .rule{border-bottom:1pt solid #000;min-height:14mm;margin:5mm 0 3mm}" +
            ".sig-two .hint{font-size:9pt;margin-top:1mm;color:#222}" +
            ".right{text-align:right}" +
            ".small-muted{font-size:9pt;font-style:italic;margin-top:1mm;color:#333}" +
            ".salutation{margin:6mm 0 3mm;font-weight:700}" +
            ".closing{margin-top:10mm}" +
            ".sheet-of3{font-size:10.8pt;line-height:1.28}" +
            ".of3-page{box-sizing:border-box;padding:0;position:relative}" +
            ".of3-hdr{margin-bottom:2mm;font-size:10pt;line-height:1.22}" +
            ".of3-hdr-t{width:100%;border-collapse:collapse;margin:0}" +
            ".of3-hdr-t td{vertical-align:top;padding:0;border:none}" +
            ".of3-hdr-main{width:62%}" +
            ".of3-hdr-dkt{width:38%;text-align:right;padding-left:2mm}" +
            ".of3-formline{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1.5mm}" +
            ".of3-formid{font-weight:700}" +
            ".of3-hfld{display:flex;align-items:baseline;gap:2mm;margin:0 0 1mm;text-align:left}" +
            ".of3-hfld-r{justify-content:flex-end;text-align:right}" +
            ".of3-hlbl{flex-shrink:0;font-weight:400}" +
            ".of3-hfill{flex:1;border-bottom:1pt solid #000;min-height:1.15em;padding:0 2px 1px;text-transform:uppercase}" +
            ".of3-banner{border:1pt solid #000;padding:2mm 4mm;margin:3mm 0 5mm;text-align:center}" +
            ".of3-banner-inner{font-weight:700;font-size:11pt;letter-spacing:.12em;text-transform:uppercase}" +
            ".of3-content{padding:0}" +
            ".of3-sec{font-weight:700;text-transform:uppercase;text-align:center;margin:5mm 0 3mm;font-size:10.5pt;letter-spacing:.06em}" +
            ".of3-mtop{margin-top:4mm}" +
            ".of3-sub{font-weight:700;margin:4mm 0 2mm;font-size:10pt}" +
            ".of3-pet-block{margin:3mm 0 4mm;padding:0}" +
            ".of3-pet-grid{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);grid-template-rows:auto auto;column-gap:5mm;row-gap:1.5mm;width:100%;margin:0;padding:0;box-sizing:border-box}" +
            ".of3-pet-lbl{grid-column:1;grid-row:1;align-self:end;font-weight:700;font-size:10pt;margin:0;padding:0 3mm 1px 0;line-height:1.15}" +
            ".of3-pet-line.of3-pet-g2{grid-column:2;grid-row:1;align-self:end}" +
            ".of3-pet-line.of3-pet-g3{grid-column:3;grid-row:1;align-self:end}" +
            ".of3-pet-line.of3-pet-g4{grid-column:4;grid-row:1;align-self:end}" +
            ".of3-pet-corner{grid-column:1;grid-row:2;margin:0;padding:0}" +
            ".of3-pet-cap.of3-pet-g2{grid-column:2;grid-row:2}" +
            ".of3-pet-cap.of3-pet-g3{grid-column:3;grid-row:2}" +
            ".of3-pet-cap.of3-pet-g4{grid-column:4;grid-row:2}" +
            ".of3-pet-line{border-bottom:1pt solid #000;margin:0;padding:0 1px 1px;min-height:1.35em;display:flex;align-items:flex-end;justify-content:flex-start;box-sizing:border-box;line-height:1.15;background:transparent}" +
            ".of3-pet-txt{display:inline;margin:0;padding:0;font-size:10pt;font-weight:400;line-height:1.15;background:transparent;vertical-align:baseline}" +
            ".of3-pet-cap{font-size:8pt;font-style:italic;text-align:center;margin:0;padding:0;line-height:1.2;color:#000}" +
            ".of3-sub2{font-weight:700;margin:3mm 0 2mm;font-size:10pt;font-style:normal}" +
            ".of3-num{font-weight:700;margin:2mm 0 1mm;font-size:10pt}" +
            ".of3-row{display:flex;flex-wrap:wrap;align-items:flex-end;gap:2mm 4mm;margin-bottom:2mm}" +
            ".of3-row.of3-wrap{align-items:center}" +
            ".of3-item{display:flex;align-items:flex-end;gap:2mm;flex:1;min-width:42mm}" +
            ".of3-item.of3-grow{flex:2;min-width:52mm}" +
            ".of3-ll{flex-shrink:0;font-size:10pt}" +
            ".of3-ul{flex:1;border-bottom:1pt solid #000;min-height:1.15em;padding:0 2px 1px;word-break:break-word;font-size:10pt}" +
            ".of3-ul.of3-grow{display:inline-block;flex:1;width:100%}" +
            ".of3-tabgap{width:6mm;flex-shrink:0}" +
            ".of3-mb{margin-bottom:3mm}" +
            ".of3-par{text-align:justify;margin:1mm 0;line-height:1.38}" +
            ".of3-ruled{border-bottom:0.75pt solid #bbb;min-height:4mm;margin:0 0 1.5mm}" +
            ".of3-textblk{margin:2mm 0}" +
            ".of3-inline-chks{display:block;margin:2mm 0;line-height:1.45}" +
            ".of3-inline-chks .pch{margin-right:4mm;display:inline-flex}" +
            ".of3-cust{margin:2mm 0;line-height:1.45}" +
            ".of3-cust .pch{margin-right:4mm}" +
            ".of3-nameparts{display:flex;justify-content:space-between;font-size:8pt;font-style:italic;margin:1mm 10mm 0;text-align:center}" +
            ".of3-nameparts span{flex:1}" +
            ".of3-nameparts.of3-four-h span{flex:1}" +
            ".of3-three{display:flex;gap:5mm;margin-bottom:3mm}" +
            ".of3-three.nm>div{flex:1;text-align:center}" +
            ".of3-four{display:flex;gap:4mm;margin-bottom:3mm}" +
            ".of3-four.nm>div{flex:1;text-align:center}" +
            ".of3-grid{width:100%;border-collapse:collapse;font-size:9.5pt;margin:2mm 0 4mm}" +
            ".of3-grid th,.of3-grid td{border:1pt solid #000;padding:2mm 2.5mm;vertical-align:top}" +
            ".of3-grid thead th{font-weight:700;text-align:center;background:#fff}" +
            ".of3-der td{width:50%}" +
            ".of3-soc-row{display:flex;gap:5mm;margin:3mm 0;align-items:flex-start}" +
            ".of3-soc-col{flex:1;min-width:0;font-size:9pt;line-height:1.38;border:0.35pt solid #ccc;padding:2mm 3mm}" +
            ".of3-soc-title{font-weight:700;text-align:center;margin-bottom:2mm;font-size:9.5pt}" +
            ".of3-stack .pch{display:flex;margin:1mm 0}" +
            ".of3-res td,.of3-eco td{width:33.33%}" +
            ".of3-sex-chk{display:inline-flex;align-items:center;gap:3mm;margin-left:4mm}" +
            ".of3-ulblock{border-bottom:1pt solid #000;min-height:5mm;margin:0 0 3mm}" +
            ".of3-justify{text-align:justify;line-height:1.38;margin:2mm 0;text-indent:0}" +
            ".of3-cond{margin:2mm 0 4mm;padding-left:6mm}" +
            ".of3-cond li{margin:2mm 0;text-align:justify;line-height:1.38}" +
            ".of3-sigblock{margin-top:6mm}" +
            ".of3-sigline{margin:6mm 0;text-align:center;font-size:10pt}" +
            ".of3-siggrid{display:flex;gap:14mm;margin-top:6mm;justify-content:space-between}" +
            ".of3-siggrid>div{flex:1;min-width:0;text-align:center}" +
            ".of3-sigh{font-weight:700;margin-bottom:2mm;font-size:10pt;text-align:left}" +
            ".of3-sigrule{border-bottom:1pt solid #000;min-height:14mm;margin:4mm 0 3mm}" +
            ".of3-sigt{font-size:9pt;text-align:center;line-height:1.35}" +
            "@media print{.psir-cover-sheet{page-break-inside:avoid;min-height:246mm}.mast{page-break-inside:avoid}.soc-row-three{page-break-inside:avoid}.rec{page-break-inside:avoid}.pet-three-col{page-break-inside:avoid}.of3-page{page-break-inside:auto}.of3-grid{page-break-inside:auto}.of3-soc-row{page-break-inside:avoid}.of3-pet-block{page-break-inside:avoid}}";

        return (
            "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/><title>PSIR — PPA Form 3</title><style>" +
            css +
            "</style></head><body>" +
            body +
            "</body></html>"
        );
    }

    global.fsBuildPpaPsirPrintDocument = buildHtmlDocument;
})(typeof window !== "undefined" ? window : this);
