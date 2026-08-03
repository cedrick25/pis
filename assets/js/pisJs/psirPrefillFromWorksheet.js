/**
 * Prefill PSIR form fields from a completed Worksheet (form-only; never auto-saves).
 * Usage: PsirPrefill.fromWorksheet(clientId, section, __executeExternalGet)
 */
(function (window, $) {
    "use strict";

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

    function setText(selector, value) {
        if (!hasValue(value)) return;
        var $el = $(selector);
        if (!$el.length) return;
        $el.val(value);
    }

    function setSelect(selector, value) {
        if (!hasValue(value)) return;
        var $el = $(selector);
        if (!$el.length) return;
        if ($el.is("select") && $el.find('option[value="' + String(value).replace(/"/g, '\\"') + '"]').length === 0) {
            return;
        }
        $el.val(value).trigger("change");
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
        if (!isWorksheetComplete(response.worksheetStatus)) {
            return null;
        }
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
        getFn("8000/worksheet/getPetitioner/worksheet/" + clientId).done(function (result) {
            d.resolve(parseWorksheetPayload(result));
        }).fail(function () {
            d.resolve(null);
        });
        return d.promise();
    }

    function applyIdentifying(data) {
        var id = data.identifyingData || {};
        var iden = data.identificationData || {};
        setText(".data_name", id.name);
        setText(".alias", id.alias);
        setText(".present_add", id.presentAddress);
        setText(".permanent_add", id.permanentAdress);
        setSelect(".sex", iden.sex);
        setSelect(".citizenship", iden.citizenship);
        setSelect(".religion", iden.religion);
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
        setText(".period_detention", po.periodOfDetention);
        setText(".ror_custodian", po.rorCustodian);
        setText(".ror_custodian_address", po.rorCustodianAddress);
        setText(".extent_participation", po.extentParticipation);
        setText(".manner_commission", po.mannerofCommision);
    }

    function applyPriorRecords(data) {
        var prior = data.priorRecords || {};
        var records = Array.isArray(prior.priorRecord) ? prior.priorRecord : [];
        var infos = Array.isArray(prior.recordsInfo) ? prior.recordsInfo : [];
        if (!records.length && !infos.length) return;

        var recordCounter = 0;
        var infoCounter = 0;
        $("#records_list").empty();
        $("#info_list").empty();

        if (!records.length) {
            records = [{}];
        }
        if (!infos.length) {
            infos = [{}];
        }

        records.forEach(function (row, index) {
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
                    '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="prior_records_button_group_' + index + '"></div>' +
                "</li>"
            );
            recordCounter = index + 1;
            if (index === 0) {
                $("#prior_records_button_group_" + index).append(
                    '<button type="button" class="btn btn-primary btn-addRecord btn-sm" style="border-radius:2px;" data-id="' + index + '">' +
                        '<i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
                );
            } else {
                $("#prior_records_button_group_" + index).append(
                    '<button type="button" class="btn btn-danger btn-delRecord btn-sm" style="border-radius:2px;" data-id="' + index + '">' +
                        '<i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>'
                );
            }
        });

        infos.forEach(function (row, index) {
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
                    '<div class="form-group col-sm-4 col-md-1 col-lg-1 col-xl-1 d-flex mt-auto" style="margin-bottom: 20px;" id="info_records_button_group_' + index + '"></div>' +
                "</li>"
            );
            infoCounter = index + 1;
            if (index === 0) {
                $("#info_records_button_group_" + index).append(
                    '<button type="button" class="btn btn-primary btn-addInfo btn-sm" style="border-radius:2px;" data-id="' + index + '">' +
                        '<i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
                );
            } else {
                $("#info_records_button_group_" + index).append(
                    '<button type="button" class="btn btn-danger btn-delInfo btn-sm" style="border-radius:2px;" data-id="' + index + '">' +
                        '<i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>'
                );
            }
        });

        if (typeof window !== "undefined") {
            window.__psirPrefillRecordCounter = recordCounter;
            window.__psirPrefillInfoCounter = infoCounter;
        }
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
        setSelect(".civil_status", fam.civilStatus);
        setSelect(".fam_relationship", fam.familyRelationship);
        setSelect(".family_problems", fam.majorFamilyProblem);
        setSelect(".family_reputation", fam.familyReputation);
        setSelect(".family_economic", fam.familyEconomic);
        setSelect(".home_condition", fam.homeCondition);
        setSelect(".residence_stability", fam.stabilityOfResidence);
    }

    function applyPresentSituation(data) {
        var ps = data.presentSituation || {};
        setSelect(".civil_status", ps.civilStatus);
        setText(".spouse_name", joinName(ps.spouseFirstName, ps.spouseMiddleName, ps.spouseLastName));
        setText(".spouse_occupation", ps.spouseOccupation);
        setText(".spouse_home_address", ps.spouseHomeAddress);
        setText(".spouse_work_address", ps.spouseWorkAddress);
        setText(".total_children", ps.noOfChildren);
        setSelect(".relationship_with_children", ps.childrenRelationship);
        setSelect(".stability_residence", ps.residenceStability);
        setSelect(".physical_home_conditions", ps.physicalHomeCondition);
        setSelect(".family_economic_status", ps.familyEconomicStatus);
        setSelect(".family_breadwinner", ps.familyBreadwinner);
        setSelect(".major_family_problem", ps.majorFamilyProblem);

        var children = Array.isArray(ps.children) ? ps.children : [];
        if (!children.length) return;

        $("#children_list").empty();
        children.forEach(function (child, index) {
            child = child || {};
            var btnHtml = index === 0
                ? '<button type="button" class="btn btn-primary btn-addChildren btn-sm" style="border-radius:2px" data-id="' + index + '">' +
                    '<i class="fa fa-plus"></i><span class="mx-2">Add</span></button>'
                : '<button type="button" class="btn btn-danger btn-delChildren btn-sm" style="border-radius:2px" data-id="' + index + '">' +
                    '<i class="fa fa-trash"></i><span class="mx-2">Remove</span></button>';

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
        });
        window.__psirPrefillChildrenCounter = children.length;
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

    function applyEducationAndJob(data) {
        var edu = data.educationalHistory || {};
        var emp = data.employmentHistory || {};
        setText(".educational_attainment", highestEducationSummary(edu));
        setSelect(".over_all_conduct_in_school", edu.conductInSchool);
        setText(".remarks_education", edu.conductInSchoolExplain);

        var jobs = Array.isArray(emp.previousJobs) ? emp.previousJobs : [];
        if (jobs.length) {
            setText(".previous_occupation", jobs[0].jobHeld);
            setText(".employer_address", jobs[0].employerAddress);
        }
        setSelect(".work_status", emp.employmentStatus);

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

    window.PsirPrefill = {
        fetchWorksheet: fetchWorksheet,
        apply: apply,
        fromWorksheet: fromWorksheet,
        isWorksheetComplete: isWorksheetComplete
    };
})(window, jQuery);
