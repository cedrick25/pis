/**
 * Map Worksheet values onto PSIR (form lock + record upsert).
 * Usage:
 *   PsirPrefill.fromWorksheet(clientId, section, __executeExternalGet)
 *   PsirPrefill.afterSave(clientId, __executeExternalGet, __executeExternalPost, thenFn)
 */
(function (window, $) {
    "use strict";

    var PSIR_REQUIRED_SECTIONS = [
        "identifyingData",
        "presentOffense",
        "priorRecordsAndDerogatoryRecord",
        "familyBackgroundAndBirthData",
        "presentSituation",
        "educationAndJobHistory",
        "medicalHistory",
        "traitsAndCommunityBackground",
        "analysisAndProjectedThrust"
    ];

    function escapeAttr(value) {
        if (value === null || value === undefined) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function hasValue(value) {
        return value !== null && value !== undefined && String(value).trim() !== "";
    }

    function disableEl($el) {
        if (!$el || !$el.length) return;
        $el.prop("disabled", true);
        if ($el.is("select")) {
            $el.trigger("change");
        }
    }

    function setText(selector, value) {
        if (!hasValue(value)) return;
        var $el = $(selector);
        if (!$el.length) return;
        $el.val(value);
        disableEl($el);
    }

    function setSelect(selector, value) {
        if (!hasValue(value)) return;
        var $el = $(selector);
        if (!$el.length) return;
        if ($el.is("select") && $el.find('option[value="' + String(value).replace(/"/g, '\\"') + '"]').length === 0) {
            return;
        }
        $el.val(value).trigger("change");
        disableEl($el);
    }

    function lockIn($row, selector, value) {
        if (!hasValue(value) || !$row || !$row.length) return;
        var $el = $row.find(selector);
        if (!$el.length) return;
        $el.val(value);
        disableEl($el);
    }

    function joinName(first, middle, last) {
        return [first, middle, last].filter(hasValue).join(" ").replace(/\s+/g, " ").trim();
    }

    function isWorksheetComplete(status) {
        return String(status || "").toLowerCase() === "complete";
    }

    function parseWorksheetPayload(result) {
        if (!result || result.status === "ERROR" || !result.response) {
            return null;
        }
        var response = result.response;
        if (!response.jsonData) {
            return null;
        }
        try {
            var data = typeof response.jsonData === "string"
                ? JSON.parse(response.jsonData)
                : response.jsonData;
            return data && typeof data === "object" ? data : null;
        } catch (e) {
            return null;
        }
    }

    function fetchWorksheet(clientId, getFn) {
        var d = $.Deferred();
        if (!clientId || typeof getFn !== "function") {
            d.resolve(null);
            return d.promise();
        }
        getFn(WorksheetApi.getUrl("worksheet")).done(function (result) {
            d.resolve(parseWorksheetPayload(result));
        }).fail(function () {
            d.resolve(null);
        });
        return d.promise();
    }

    function assignIfPresent(target, key, value) {
        if (!hasValue(value)) return;
        target[key] = value;
    }

    function sectionIfAny(obj) {
        return obj && Object.keys(obj).length ? obj : null;
    }

    function highestEducationSummary(edu) {
        if (!edu) return "";
        var tiers = [
            { label: "Post-College", level: edu.postCollegeLevel, where: edu.postCollegeWhere },
            { label: "College", level: edu.collegeLevel, where: edu.collegeWhere },
            { label: "Vocational", level: edu.vocLevel, where: edu.vocWhere },
            { label: "Secondary", level: edu.secLevel, where: edu.secWhere },
            { label: "Elementary", level: edu.elemLevel, where: edu.elemWhere }
        ];
        for (var i = 0; i < tiers.length; i++) {
            var t = tiers[i];
            if (hasValue(t.level) || hasValue(t.where)) {
                var parts = [t.label];
                if (hasValue(t.level)) parts.push(t.level);
                if (hasValue(t.where)) parts.push(t.where);
                return parts.join(" - ");
            }
        }
        if (hasValue(edu.unschooled)) {
            return "Unschooled";
        }
        return "";
    }

    function mapIdentifying(data) {
        var id = data.identifyingData || {};
        var iden = data.identificationData || {};
        var out = {};
        assignIfPresent(out, "petitionersName", id.name);
        assignIfPresent(out, "alias", id.alias);
        assignIfPresent(out, "presentAddress", id.presentAddress);
        assignIfPresent(out, "permanentAdress", id.permanentAdress);
        assignIfPresent(out, "sex", iden.sex);
        assignIfPresent(out, "sexOthers", iden.sexOthers);
        assignIfPresent(out, "citizenship", iden.citizenship);
        assignIfPresent(out, "citizenshipOthers", iden.citizenshipOthers);
        assignIfPresent(out, "religion", iden.religion);
        assignIfPresent(out, "religionOthers", iden.religionOthers);
        assignIfPresent(out, "age", iden.age);
        assignIfPresent(out, "identifyingMarks", iden.identifyingMarks);
        return sectionIfAny(out);
    }

    function mapPresentOffense(data) {
        var po = data.presentOffense || {};
        var out = {};
        assignIfPresent(out, "chargedWith", po.chargedWith);
        assignIfPresent(out, "chargedWithDate", po.chargedWithDate);
        assignIfPresent(out, "convictedOf", po.convictedOf);
        assignIfPresent(out, "convictedOfDate", po.convictedOfDate);
        assignIfPresent(out, "sentence", po.sentence);
        assignIfPresent(out, "judge", po.judge);
        assignIfPresent(out, "court", po.court);
        assignIfPresent(out, "defenseCounsel", po.defenseCounsel);
        assignIfPresent(out, "defenseCounselAddress", po.defenseCounselAddress);
        assignIfPresent(out, "offendedParty", po.offendedParty);
        assignIfPresent(out, "offendedPartyAddress", po.offendedPartyAddress);
        assignIfPresent(out, "custody", po.custody);
        assignIfPresent(out, "custodyOthers", po.custodyOthers);
        assignIfPresent(out, "periodOfDetention", po.periodOfDetention);
        assignIfPresent(out, "rorCustodian", po.rorCustodian);
        assignIfPresent(out, "rorCustodianAddress", po.rorCustodianAddress);
        assignIfPresent(out, "extentParticipation", po.extentParticipation);
        assignIfPresent(out, "extentParticipationOthers", po.extentParticipationOthers);
        assignIfPresent(out, "mannerofCommision", po.mannerofCommision);
        return sectionIfAny(out);
    }

    function rowHasValue(row) {
        if (!row || typeof row !== "object") return false;
        var keys = Object.keys(row);
        for (var i = 0; i < keys.length; i++) {
            if (hasValue(row[keys[i]])) return true;
        }
        return false;
    }

    function mapPriorRecords(data) {
        var prior = data.priorRecords || {};
        var records = Array.isArray(prior.priorRecord) ? prior.priorRecord : [];
        var infos = Array.isArray(prior.recordsInfo) ? prior.recordsInfo : [];
        var out = {};
        if (records.some(rowHasValue)) {
            out.priorRecord = records;
        }
        if (infos.some(rowHasValue)) {
            out.recordsInfo = infos;
        }
        return sectionIfAny(out);
    }

    function mapFamilyBackground(data) {
        var iden = data.identificationData || {};
        var fam = data.familyBackground || {};
        var out = {};
        assignIfPresent(out, "birthDate", iden.dateOfBirth);
        assignIfPresent(out, "birthPlace", iden.placeOfBirth);
        assignIfPresent(out, "fathersName", fam.fatherName);
        assignIfPresent(out, "fathersAge", fam.fatherAge);
        assignIfPresent(out, "fathersOccupation", fam.fatherOccupation);
        assignIfPresent(out, "mothersName", fam.motherName);
        assignIfPresent(out, "mothersAge", fam.motherAge);
        assignIfPresent(out, "mothersOccupation", fam.motherOccupation);
        assignIfPresent(out, "civilStatus", fam.civilStatus || iden.civilStatus);
        assignIfPresent(out, "otherStatus", fam.civilStatusOthers);
        assignIfPresent(out, "familyRelationship", fam.familyRelationship);
        assignIfPresent(out, "familyRelationshipOthers", fam.familyRelationshipOthers);
        assignIfPresent(out, "majorFamilyProblem", fam.majorFamilyProblem);
        assignIfPresent(out, "majorFamilyProblemOthers", fam.majorFamilyProblemOthers);
        assignIfPresent(out, "familyReputationInCommunity", fam.familyReputation);
        assignIfPresent(out, "familyReputationInCommunityOthers", fam.familyReputationOthers);
        assignIfPresent(out, "familyEconomicStatus", fam.familyEconomic);
        assignIfPresent(out, "familyEconomicStatusOthers", fam.familyEconomicOthers);
        assignIfPresent(out, "homeCondition", fam.homeCondition);
        assignIfPresent(out, "homeConditionOthers", fam.homeConditionOthers);
        assignIfPresent(out, "stabilityOfResidence", fam.stabilityOfResidence);
        assignIfPresent(out, "stabilityOfResidenceOthers", fam.stabilityOfResidenceOthers);
        return sectionIfAny(out);
    }

    function mapPresentSituation(data) {
        var ps = data.presentSituation || {};
        var out = {};
        assignIfPresent(out, "civilStatus", ps.civilStatus);
        assignIfPresent(out, "civilStatusOthers", ps.civilStatusOthers);
        assignIfPresent(out, "spouseName", joinName(ps.spouseFirstName, ps.spouseMiddleName, ps.spouseLastName));
        assignIfPresent(out, "spouseOccupation", ps.spouseOccupation);
        assignIfPresent(out, "spouseHomeAddress", ps.spouseHomeAddress);
        assignIfPresent(out, "spouseWorkAddress", ps.spouseWorkAddress);
        assignIfPresent(out, "totalNoOfchildren", ps.noOfChildren);
        assignIfPresent(out, "childrenRelationship", ps.childrenRelationship);
        assignIfPresent(out, "childrenRelationshipOthers", ps.childrenRelationshipOthers);
        assignIfPresent(out, "residenceStability", ps.residenceStability);
        assignIfPresent(out, "residenceStabilityOthers", ps.residenceStabilityOthers);
        assignIfPresent(out, "physicalHomeCondition", ps.physicalHomeCondition);
        assignIfPresent(out, "physicalHomeConditionOthers", ps.physicalHomeConditionOthers);
        assignIfPresent(out, "familyEconomicStatus", ps.familyEconomicStatus);
        assignIfPresent(out, "familyEconomicStatusOthers", ps.familyEconomicStatusOthers);
        assignIfPresent(out, "familyBreadwinner", ps.familyBreadwinner);
        assignIfPresent(out, "familyBreadwinnerOthers", ps.familyBreadwinnerOthers);
        assignIfPresent(out, "majorFamilyProblem", ps.majorFamilyProblem);
        assignIfPresent(out, "otherFamilyProblem", ps.majorFamilyProblemOthers);
        var children = Array.isArray(ps.children) ? ps.children : [];
        if (children.some(function (child) {
            return child && (hasValue(child.age) || hasValue(child.education));
        })) {
            out.children = children.map(function (child) {
                child = child || {};
                var mapped = {};
                assignIfPresent(mapped, "age", child.age);
                assignIfPresent(mapped, "education", child.education);
                return mapped;
            });
        }
        return sectionIfAny(out);
    }

    function mapEducationAndJob(data) {
        var edu = data.educationalHistory || {};
        var emp = data.employmentHistory || {};
        var out = {};
        assignIfPresent(out, "educationAttainment", highestEducationSummary(edu));
        assignIfPresent(out, "overAllConductInSchool", edu.conductInSchool);
        assignIfPresent(out, "overAllConductInSchoolOthers", edu.conductInSchoolOthers);
        assignIfPresent(out, "educationalRemarks", edu.conductInSchoolExplain);
        var jobs = Array.isArray(emp.previousJobs) ? emp.previousJobs : [];
        if (jobs.length) {
            assignIfPresent(out, "previousOccupation", jobs[0].jobHeld);
            assignIfPresent(out, "employerAddress", jobs[0].employerAddress);
        }
        assignIfPresent(out, "workStatus", emp.employmentStatus);
        assignIfPresent(out, "workStatusOthers", emp.employmentStatusOthers);
        var skills = [];
        if (hasValue(emp.employableSkills)) skills.push(emp.employableSkills);
        if (hasValue(emp.otherEMployableSkills)) skills.push(emp.otherEMployableSkills);
        assignIfPresent(out, "specialSkills", skills.join(", "));
        return sectionIfAny(out);
    }

    function toPsirPatch(worksheetData) {
        var patch = {};
        if (!worksheetData) return patch;
        var identifying = mapIdentifying(worksheetData);
        var presentOffense = mapPresentOffense(worksheetData);
        var prior = mapPriorRecords(worksheetData);
        var family = mapFamilyBackground(worksheetData);
        var presentSituation = mapPresentSituation(worksheetData);
        var education = mapEducationAndJob(worksheetData);
        if (identifying) patch.identifyingData = identifying;
        if (presentOffense) patch.presentOffense = presentOffense;
        if (prior) patch.priorRecordsAndDerogatoryRecord = prior;
        if (family) patch.familyBackgroundAndBirthData = family;
        if (presentSituation) patch.presentSituation = presentSituation;
        if (education) patch.educationAndJobHistory = education;
        return patch;
    }

    function mergeRows(existingRows, incomingRows) {
        existingRows = Array.isArray(existingRows) ? existingRows.slice() : [];
        incomingRows = Array.isArray(incomingRows) ? incomingRows : [];
        incomingRows.forEach(function (row, i) {
            row = row || {};
            var dest = existingRows[i] ? $.extend({}, existingRows[i]) : {};
            Object.keys(row).forEach(function (key) {
                if (hasValue(row[key])) dest[key] = row[key];
            });
            existingRows[i] = dest;
        });
        return existingRows;
    }

    function mergeChildren(existingRows, incomingRows) {
        existingRows = Array.isArray(existingRows) ? existingRows.slice() : [];
        incomingRows = Array.isArray(incomingRows) ? incomingRows : [];
        incomingRows.forEach(function (child, i) {
            child = child || {};
            var dest = existingRows[i] ? $.extend({}, existingRows[i]) : {};
            if (hasValue(child.age)) dest.age = child.age;
            if (hasValue(child.education)) dest.education = child.education;
            existingRows[i] = dest;
        });
        return existingRows;
    }

    function mergeSection(existingSection, patchSection) {
        var merged = existingSection && typeof existingSection === "object"
            ? $.extend({}, existingSection)
            : {};
        if (!patchSection) return merged;
        Object.keys(patchSection).forEach(function (key) {
            if (key === "children") {
                merged.children = mergeChildren(merged.children, patchSection.children);
            } else if (key === "priorRecord" || key === "recordsInfo") {
                merged[key] = mergeRows(merged[key], patchSection[key]);
            } else if (hasValue(patchSection[key])) {
                merged[key] = patchSection[key];
            }
        });
        return merged;
    }

    function mergePatch(existing, patch) {
        var merged = existing && typeof existing === "object" ? $.extend({}, existing) : {};
        Object.keys(patch || {}).forEach(function (section) {
            merged[section] = mergeSection(merged[section], patch[section]);
        });
        return merged;
    }

    function isPsirComplete(data) {
        if (!data) return false;
        return PSIR_REQUIRED_SECTIONS.every(function (section) {
            return data[section] && Object.keys(data[section]).length > 0;
        });
    }

    function applyIdentifying(data) {
        var id = data.identifyingData || {};
        var iden = data.identificationData || {};
        setText(".data_name", id.name);
        setText(".alias", id.alias);
        setText(".present_add", id.presentAddress);
        setText(".permanent_add", id.permanentAdress);
        setSelect(".sex", iden.sex);
        setText(".sex_others", iden.sexOthers);
        setSelect(".citizenship", iden.citizenship);
        setText(".citizenship_others", iden.citizenshipOthers);
        setSelect(".religion", iden.religion);
        setText(".religion_others", iden.religionOthers);
        setText(".age", iden.age);
        setText(".identifying_marks", iden.identifyingMarks);
    }

    function applyPresentOffense(data) {
        var po = data.presentOffense || {};
        setText(".charged", po.chargedWith);
        setText(".date_charged_with", po.chargedWithDate);
        setText(".convicted_of", po.convictedOf);
        setText(".date_convicted_of", po.convictedOfDate);
        setText(".sentence", po.sentence);
        setText(".judge", po.judge);
        setText(".court", po.court);
        setText(".defense_counsel", po.defenseCounsel);
        setText(".defense_counsel_address", po.defenseCounselAddress);
        setText(".offended_party", po.offendedParty);
        setText(".offended_party_address", po.offendedPartyAddress);
        setSelect(".custody", po.custody);
        setText(".custody_others", po.custodyOthers);
        setText(".period_detention", po.periodOfDetention);
        setText(".ror_custodian", po.rorCustodian);
        setText(".ror_custodian_address", po.rorCustodianAddress);
        setSelect(".extent_participation", po.extentParticipation);
        setText(".extent_participation_others", po.extentParticipationOthers);
        setText(".manner_commission", po.mannerofCommision);
    }

    function appendRecordRow(index, row) {
        row = row || {};
        $("#records_list").append(
            '<li class="list-group-item d-flex align-items-center" id="record_list_' + index + '">' +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Agency</label>' +
                    '<input type="text" placeholder="Agency" class="form-control agency" value="' + escapeAttr(row.agency) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">CC No.</label>' +
                    '<input type="text" placeholder="CC No." class="form-control cc_no" value="' + escapeAttr(row.cc_no) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Offense</label>' +
                    '<input type="text" placeholder="Offense" class="form-control offense" value="' + escapeAttr(row.offense) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">When</label>' +
                    '<input type="date" placeholder="When" class="form-control when" value="' + escapeAttr(row.when) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Where</label>' +
                    '<input type="text" placeholder="Where" class="form-control where" value="' + escapeAttr(row.where) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1">' +
                    '<label class="form-control-label">Disposition</label>' +
                    '<input type="text" placeholder="Disposition" class="form-control disposition" value="' + escapeAttr(row.disposition) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="prior_records_button_group_' + index + '">' +
                    (index === 0
                        ? '<button type="button" class="btn btn-primary btn-addRecord btn-sm" style="border-radius:2px;" data-id="' + index + '"><i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
                        : '<button type="button" class="btn btn-danger btn-delRecord btn-sm" style="border-radius:2px;" data-id="' + index + '"><i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>') +
                "</div>" +
            "</li>"
        );
        var $row = $("#record_list_" + index);
        lockIn($row, ".agency", row.agency);
        lockIn($row, ".cc_no", row.cc_no);
        lockIn($row, ".offense", row.offense);
        lockIn($row, ".when", row.when);
        lockIn($row, ".where", row.where);
        lockIn($row, ".disposition", row.disposition);
    }

    function appendInfoRow(index, row) {
        row = row || {};
        $("#info_list").append(
            '<li class="list-group-item d-flex align-items-center" id="info_list_' + index + '">' +
                '<div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">' +
                    '<label class="form-control-label">Source/Date</label>' +
                    '<input type="text" placeholder="Source/Date" class="form-control source" value="' + escapeAttr(row.source) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">' +
                    '<label class="form-control-label">Position</label>' +
                    '<input type="text" placeholder="Position" class="form-control position" value="' + escapeAttr(row.position) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">' +
                    '<label class="form-control-label">Particulars</label>' +
                    '<input type="text" placeholder="Particulars" class="form-control particulars" value="' + escapeAttr(row.particulars) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="info_records_button_group_' + index + '">' +
                    (index === 0
                        ? '<button type="button" class="btn btn-primary btn-addInfo btn-sm" style="border-radius:2px;" data-id="' + index + '"><i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
                        : '<button type="button" class="btn btn-danger btn-delInfo btn-sm" style="border-radius:2px;" data-id="' + index + '"><i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>') +
                "</div>" +
            "</li>"
        );
        var $row = $("#info_list_" + index);
        lockIn($row, ".source", row.source);
        lockIn($row, ".position", row.position);
        lockIn($row, ".particulars", row.particulars);
    }

    function applyPriorRecords(data) {
        var prior = data.priorRecords || {};
        var records = Array.isArray(prior.priorRecord) ? prior.priorRecord : [];
        var infos = Array.isArray(prior.recordsInfo) ? prior.recordsInfo : [];
        if (!records.length && !infos.length) return;

        var $recordItems = $("#records_list > li");
        records.forEach(function (row, index) {
            row = row || {};
            var $row = $recordItems.eq(index);
            if ($row.length) {
                lockIn($row, ".agency", row.agency);
                lockIn($row, ".cc_no", row.cc_no);
                lockIn($row, ".offense", row.offense);
                lockIn($row, ".when", row.when);
                lockIn($row, ".where", row.where);
                lockIn($row, ".disposition", row.disposition);
            } else {
                appendRecordRow(index, row);
            }
        });

        var $infoItems = $("#info_list > li");
        infos.forEach(function (row, index) {
            row = row || {};
            var $row = $infoItems.eq(index);
            if ($row.length) {
                lockIn($row, ".source", row.source);
                lockIn($row, ".position", row.position);
                lockIn($row, ".particulars", row.particulars);
            } else {
                appendInfoRow(index, row);
            }
        });

        window.__psirPrefillRecordCounter = Math.max($("#records_list > li").length, records.length);
        window.__psirPrefillInfoCounter = Math.max($("#info_list > li").length, infos.length);
    }

    function applyFamilyBackground(data) {
        var iden = data.identificationData || {};
        var fam = data.familyBackground || {};
        setText(".date_of_birth", iden.dateOfBirth);
        setText(".place_of_birth", iden.placeOfBirth);
        setText(".father_name", fam.fatherName);
        setText(".father_age", fam.fatherAge);
        setText(".father_occupation", fam.fatherOccupation);
        setText(".mother_name", fam.motherName);
        setText(".mother_age", fam.motherAge);
        setText(".mother_occupation", fam.motherOccupation);
        setSelect(".civil_status", fam.civilStatus || iden.civilStatus);
        setText(".other_status_of_marriage", fam.civilStatusOthers);
        setSelect(".fam_relationship", fam.familyRelationship);
        setText(".fam_relationship_others", fam.familyRelationshipOthers);
        setSelect(".family_problems", fam.majorFamilyProblem);
        setText(".family_problems_others", fam.majorFamilyProblemOthers);
        setSelect(".family_reputation", fam.familyReputation);
        setText(".family_reputation_others", fam.familyReputationOthers);
        setSelect(".family_economic", fam.familyEconomic);
        setText(".family_economic_others", fam.familyEconomicOthers);
        setSelect(".home_condition", fam.homeCondition);
        setText(".home_condition_others", fam.homeConditionOthers);
        setSelect(".residence_stability", fam.stabilityOfResidence);
        setText(".residence_stability_others", fam.stabilityOfResidenceOthers);
    }

    function appendChildRow(index, child) {
        child = child || {};
        var btnHtml = index === 0
            ? '<button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="' + index + '"><i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
            : '<button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px" data-id="' + index + '"><i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>';
        $("#children_list").append(
            '<li class="list-group-item d-flex align-items-center" id="children_list_' + index + '">' +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Age</label>' +
                    '<input type="text" placeholder="Age" class="form-control children_age" value="' + escapeAttr(child.age) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">In/Out of School</label>' +
                    '<input type="text" placeholder="In/Out of School" class="form-control children_school" value="">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-3 col-lg-3 col-xl-3">' +
                    '<label class="form-control-label">Educational Attainment</label>' +
                    '<input type="text" placeholder="Educational Attainment" class="form-control children_education" value="' + escapeAttr(child.education) + '">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Legitimate</label>' +
                    '<input type="text" placeholder="Legitimate" class="form-control children_legitimate" value="">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-2 col-lg-2 col-xl-2">' +
                    '<label class="form-control-label">Illegitimate</label>' +
                    '<input type="text" placeholder="Illegitimate" class="form-control children_illegitimate" value="">' +
                "</div>" +
                '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;">' +
                    btnHtml +
                "</div>" +
            "</li>"
        );
        var $row = $("#children_list_" + index);
        lockIn($row, ".children_age", child.age);
        lockIn($row, ".children_education", child.education);
    }

    function applyPresentSituation(data) {
        var ps = data.presentSituation || {};
        setSelect(".civil_status", ps.civilStatus);
        setText(".civil_status_others", ps.civilStatusOthers);
        setText(".spouse_name", joinName(ps.spouseFirstName, ps.spouseMiddleName, ps.spouseLastName));
        setText(".spouse_occupation", ps.spouseOccupation);
        setText(".spouse_home_address", ps.spouseHomeAddress);
        setText(".spouse_work_address", ps.spouseWorkAddress);
        setText(".total_children", ps.noOfChildren);
        setSelect(".relationship_with_children", ps.childrenRelationship);
        setText(".relationship_with_children_others", ps.childrenRelationshipOthers);
        setSelect(".stability_residence", ps.residenceStability);
        setText(".stability_residence_others", ps.residenceStabilityOthers);
        setSelect(".physical_home_conditions", ps.physicalHomeCondition);
        setText(".physical_home_conditions_others", ps.physicalHomeConditionOthers);
        setSelect(".family_economic_status", ps.familyEconomicStatus);
        setText(".family_economic_status_others", ps.familyEconomicStatusOthers);
        setSelect(".family_breadwinner", ps.familyBreadwinner);
        setText(".family_breadwinner_others", ps.familyBreadwinnerOthers);
        setSelect(".major_family_problem", ps.majorFamilyProblem);
        setText(".other_famiy_problem", ps.majorFamilyProblemOthers);

        var children = Array.isArray(ps.children) ? ps.children : [];
        if (!children.length) return;

        var $items = $("#children_list > li");
        children.forEach(function (child, index) {
            child = child || {};
            var $row = $items.eq(index);
            if ($row.length) {
                lockIn($row, ".children_age", child.age);
                lockIn($row, ".children_education", child.education);
            } else {
                appendChildRow(index, child);
            }
        });
        window.__psirPrefillChildrenCounter = Math.max($("#children_list > li").length, children.length);
    }

    function applyEducationAndJob(data) {
        var edu = data.educationalHistory || {};
        var emp = data.employmentHistory || {};
        setText(".educational_attainment", highestEducationSummary(edu));
        setSelect(".over_all_conduct_in_school", edu.conductInSchool);
        setText(".over_all_conduct_in_school_others", edu.conductInSchoolOthers);
        setText(".remarks_education", edu.conductInSchoolExplain);

        var jobs = Array.isArray(emp.previousJobs) ? emp.previousJobs : [];
        if (jobs.length) {
            setText(".previous_occupation", jobs[0].jobHeld);
            setText(".employer_address", jobs[0].employerAddress);
        }
        setSelect(".work_status", emp.employmentStatus);
        setText(".work_status_others", emp.employmentStatusOthers);

        var skills = [];
        if (hasValue(emp.employableSkills)) skills.push(emp.employableSkills);
        if (hasValue(emp.otherEMployableSkills)) skills.push(emp.otherEMployableSkills);
        setText(".special_skills", skills.join(", "));
    }

    var appliers = {
        identifyingData: applyIdentifying,
        presentOffense: applyPresentOffense,
        priorRecordsAndDerogatoryRecord: applyPriorRecords,
        familyBackgroundAndBirthData: applyFamilyBackground,
        presentSituation: applyPresentSituation,
        educationAndJobHistory: applyEducationAndJob
    };

    function apply(section, worksheetData) {
        if (!worksheetData || !appliers[section]) return false;
        appliers[section](worksheetData);
        if (window.DropdownOthers) DropdownOthers.refresh();
        return true;
    }

    function fromWorksheet(clientId, section, getFn) {
        var d = $.Deferred();
        fetchWorksheet(clientId, getFn).done(function (data) {
            if (!data) {
                d.resolve(false);
                return;
            }
            d.resolve(apply(section, data));
        });
        return d.promise();
    }

    function upsertFromWorksheet(clientId, getFn, postFn) {
        var d = $.Deferred();
        if (!clientId || typeof getFn !== "function" || typeof postFn !== "function" || !window.PsirRecord) {
            d.resolve(false);
            return d.promise();
        }

        getFn(WorksheetApi.getUrl("worksheet")).done(function (wsResult) {
            var wsData = parseWorksheetPayload(wsResult);
            getFn(WorksheetApi.getUrl("psir")).done(function (psirResult) {
                var parsed = window.PsirRecord.parseExisting(psirResult);
                var existing = parsed.existing || {};
                var patch = toPsirPatch(wsData);
                var merged = mergePatch(existing, patch);
                var payload = {
                    petitionerId: clientId,
                    docketNumber: WorksheetApi.docketNumber(),
                    jsonData: JSON.stringify(merged),
                    type: "psir",
                    worksheetStatus: isPsirComplete(merged) ? "complete" : "incomplete",
                    createdBy: typeof $.cookie === "function" ? $.cookie("uuid") : "",
                    fieldOfficeId: typeof $.cookie === "function" ? $.cookie("field_office_id") : ""
                };

                var settled = false;
                function settle(ok) {
                    if (settled) return;
                    settled = true;
                    d.resolve(ok);
                }

                var wrappedPost = function (url, body) {
                    return postFn(url, body).done(function () {
                        settle(true);
                    }).fail(function () {
                        settle(false);
                    });
                };

                window.PsirRecord.persist(wrappedPost, clientId, payload, parsed, function () {
                    settle(true);
                });
            }).fail(function () {
                d.resolve(false);
            });
        }).fail(function () {
            d.resolve(false);
        });

        return d.promise();
    }

    function afterSave(clientId, getFn, postFn, thenFn) {
        var finish = function () {
            if (typeof thenFn === "function") thenFn();
        };
        upsertFromWorksheet(clientId, getFn, postFn).always(finish);
    }

    window.PsirPrefill = {
        fetchWorksheet: fetchWorksheet,
        apply: apply,
        fromWorksheet: fromWorksheet,
        toPsirPatch: toPsirPatch,
        upsertFromWorksheet: upsertFromWorksheet,
        afterSave: afterSave,
        isWorksheetComplete: isWorksheetComplete
    };
})(window, jQuery);
