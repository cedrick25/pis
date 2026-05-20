/**
 * PPA Form 1 & 2 printable worksheet — HTML/CSS for browser print preview.
 * Populated from worksheet aggregate JSON (`getPetitioner/worksheet/:id`).
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

    function chk(label, on) {
        return (
            '<span class="chk' +
            (on ? " on" : "") +
            '"><span class="dot"></span>' +
            esc(label) +
            "</span>"
        );
    }

    /** Vertical list of radios (socio-economic columns). */
    function chkCol(titleU, pairs, sel, mapDisp) {
        var lines = [];
        if (titleU) lines.push('<div class="col-title-under">' + esc(titleU) + "</div>");
        for (var i = 0; i < pairs.length; i++) {
            lines.push('<div>' + chk(pairs[i][1], pairs[i][0] === sel) + "</div>");
        }
        return '<td class="vert-col">' + lines.join("") + "</td>";
    }

    function uline(val, widthPct) {
        return (
            '<span class="uline" style="width:' +
            (widthPct || "100") +
            '%;">' +
            esc(str(val)) +
            "</span>"
        );
    }

    function fieldLine(label, value, labelW) {
        return (
            '<div class="field-line"><span class="flabel" style="width:' +
            (labelW || "auto") +
            ';">' +
            esc(label) +
            "</span>" +
            uline(value) +
            "</div>"
        );
    }

    function twoColRow(leftHtml, rightHtml) {
        return (
            '<table class="grid2"><tr><td class="c50">' +
            leftHtml +
            '</td><td class="c50">' +
            rightHtml +
            "</td></tr></table>"
        );
    }

    function tableFromObjects(headers, rows) {
        if (!rows || !rows.length)
            rows = [{}];
        var h =
            "<thead><tr>" +
            headers
                .map(function (h) {
                    return "<th>" + esc(h.title || h.label || "") + "</th>";
                })
                .join("") +
            "</tr></thead>";
        var b = "<tbody>";
        for (var r = 0; r < rows.length; r++) {
            var row = rows[r] || {};
            b += "<tr>";
            for (var c = 0; c < headers.length; c++) {
                var key = headers[c].dataKey || headers[c].key;
                b += "<td>" + esc(str(row[key])) + "</td>";
            }
            b += "</tr>";
        }
        b += "</tbody>";
        return '<table class="tbl">' + h + b + "</table>";
    }

    /** Education grid — single worksheet row columns. */
    function eduGridRow(level, eh) {
        var p = eh || {};
        var map = {
            Elementary: ["elemLevel", "elemWhere", "elemDate", "elemHigh", "elemAward"],
            Secondary: ["secLevel", "secWhere", "secDate", "secHigh", "secAward"],
            College: ["collegeLevel", "collegeWhere", "collegeDate", "collegeHigh", "collegeAward"],
            "Post College": [
                "postCollegeLevel",
                "postCollegeWhere",
                "postCollegeDate",
                "postCollegeHigh",
                "postCollegeAward",
            ],
            Vocational: ["vocLevel", "vocWhere", "vocDate", "vocHigh", "vocAward"],
        };
        var k = map[level];
        return (
            "<tr>" +
            "<td>" +
            esc(level) +
            "</td>" +
            "<td>" +
            esc(str(p[k[0]])) +
            "</td>" +
            "<td>" +
            esc(str(p[k[1]])) +
            "</td>" +
            "<td>" +
            esc(str(p[k[2]])) +
            "</td>" +
            "<td>" +
            esc(str(p[k[3]])) +
            "</td>" +
            "<td>" +
            esc(str(p[k[4]])) +
            "</td>" +
            "</tr>"
        );
    }

    function spouseName(ps) {
        return [ps.spouseLastName, ps.spouseFirstName, ps.spouseMiddleName]
            .map(str)
            .filter(Boolean)
            .join(" ");
    }

    function neighborhoodHtml(cb) {
        var n = (cb.neighborhood || "").toLowerCase();
        var a = (cb.neighborhoodArea || "").toLowerCase();
        var selRural = n === "rural";
        var selUrban = n === "urban";
        var selSlum = a === "slum_area";
        var selNonSlum = a === "non_slum_area";
        return (
            '<div class="nb-row">' +
            chk("Rural", selRural) +
            chk("Slum Area", selRural && selSlum) +
            chk("Non-Slum Area", selRural && selNonSlum) +
            "</div>" +
            '<div class="nb-row">' +
            chk("Urban", selUrban) +
            chk("Slum Area", selUrban && selSlum) +
            chk("Non-Slum Area", selUrban && selNonSlum) +
            "</div>"
        );
    }

    /** Build printable HTML fragment (inside body). */
    function buildBody(ws) {
        var idData = nz(ws.identifyingData);
        var po = nz(ws.presentOffense);
        var prior = nz(ws.priorRecords);
        var ident = nz(ws.identificationData);
        var fb = nz(ws.familyBackground);
        var ps = nz(ws.presentSituation);
        var eh = nz(ws.educationalHistory);
        var em = nz(ws.employmentHistory);
        var cb = nz(ws.communityBackground);

        var mapCustody = {
            on_bail: "On Bail",
            on_detention: "On Detention",
            ror_custodian: "ROR - Custodian",
        };
        var selCustody = mapCustody[str(po.custody)] || "";

        var mapMotives = {
            circumstantial: "Circumstantial",
            high_times: "High Times",
            imprudence: "Imprudence",
            temper: "Temper",
            unintentional: "Unintentional",
            others: "Others",
        };
        var selMotive = mapMotives[str(po.motives)] || "";

        var mapExtent = {
            principal: "Principal",
            accomplice: "Accomplice",
            accessory: "Accessory",
        };
        var extKey = str(po.extentParticipation).toLowerCase();
        var selExtent = mapExtent[extKey] || "";

        var mapAlleged = { petitioner: "Petitioner", other_source: "Other Source" };
        var selAlleged = mapAlleged[str(prior.allegedBy)] || "";

        var mapRecord = { no_record: "No Record", with_derogatroy_record: "With Derogatory Record" };
        var selRecord = mapRecord[str(prior.record)] || "";

        var mapMarks = {
            tattoo: "Tattoo",
            mole: "Mole",
            scar: "Scar",
            others: "Others",
        };
        var selMark = mapMarks[str(ident.identifyingMarks)] || "";

        var mapCivilFb = {
            married: "Married",
            seperated: "Separated",
            common_law: "Live-in/Common-Law",
        };
        var selCivilParents = mapCivilFb[str(fb.civilStatus)] || "";

        var mapRelParents = {
            poor: "Poor",
            fair: "Fair",
            satisfactory: "Satisfactory",
            very_satisfactory: "Very Satisfactory",
        };
        var selRelParents = mapRelParents[str(fb.parentsRelationship)] || "";

        var mapFamProb = {
            no_apparent_problem: "No Apparent Problem",
            economic: "Economic",
            mental_physical_illness: "Mental/Physical Illness",
            marital_problem: "Marital Problem",
            one_parent_family: "One-Parent-Family",
            parent_child_conflict: "Parent-Child Conflict",
            sibling_conflict: "Sibling Conflict",
            others: "Others",
        };
        var mapFamEco = {
            more_adequate: "More than Adequate",
            adequate: "Adequate",
            inadequate: "Inadequate",
            below_poverty_lines: "Below Poverty Line",
        };
        var mapHomeCond = {
            very_satisfactory: "Very Satisfactory",
            satisfactory: "Satisfactory",
            fair: "Fair",
            poor: "Poor",
        };
        var mapStab = {
            stable: "Stable",
            occasional_change: "Ocassional Change",
            frequent_change: "Frequent Change",
            no_stability: "No Stability",
        };

        var frPairs = [
            ["very_satisfactory", "Very Satisfactory"],
            ["satisfactory", "Satisfactory"],
            ["fair", "Fair"],
            ["poor", "Poor"],
        ];
        var mfpPairs = Object.keys(mapFamProb).map(function (k) {
            return [k, mapFamProb[k]];
        });

        var mapPsCivil = {
            single: "Single",
            married: "Married",
            widow_widower: "Widow/Widower",
            with_common_law_spouse: "Common-Law Relationship",
            seperated: "Seperated",
        };

        var mapRelGood = {
            very_satisfactory: "Very Satisfactory",
            satisfactory: "Satisfactory",
            fair: "Fair",
            poor: "Poor",
        };

        var mapResType = {
            house: "House",
            apartment: "Apartment",
            rented: "Rented",
            owned: "Owned",
            others: "Others",
        };

        var mapBread = {
            petitioner: "Petitioner",
            spouse: "Spouse",
            petiioner_and_spouse: "Pet. and Spouse",
            other: "Others",
        };

        var mapMajProb = {
            no_apparent_problem: "No Apparent Problem",
            economic: "Economic",
            husband_wife_conflict: "Husband-Wife Conflict",
            mental_illness: "Mental Illness",
            physical_illness: "Physical Illness",
            parent_child_conflict: "Parent-Child Conflict",
            sibling_conflict: "Sibling Conflict",
            others: "Others",
        };
        var depChildren = str(ps.numberOfDependentsChildren);
        var depOthers = str(ps.numberOfDependentsOthers);
        var hasChildNum = depChildren !== "";
        var hasOtherNum = depOthers !== "";

        var priorRows = prior.priorRecord || [];
        var derRows = prior.recordsInfo || [];

        function skillColHtml(opts, currentKey) {
            var h = "";
            var ck = str(currentKey);
            for (var i = 0; i < opts.length; i++) {
                var key = opts[i][0];
                var lb = opts[i][1];
                h += '<div>' + chk(lb, ck === key) + "</div>";
            }
            return '<td class="skill-col">' + h + "</td>";
        }

        function employSkillRadiosBlock() {
            var cur = str(em.employableSkills);
            var c1 = [
                ["auto_mechanic", "Auto Mechanic"],
                ["machine_operator", "Machine Operator"],
                ["driver", "Driver"],
                ["welder", "Welder"],
                ["radio_technician", "Radio Technician"],
            ];
            var c2 = [
                ["electrician", "Electrician"],
                ["plumber", "Plumber"],
                ["mason", "Mason"],
                ["carpenter", "Carpenter"],
                ["baker", "Baker"],
            ];
            var c3 = [
                ["hollow_block_maker", "Hollow Block Maker"],
                ["house_painter", "House Painter"],
                ["portrait_artist", "Portrait Artist"],
                ["billboard_artist", "Billboard Artist"],
            ];
            var othOn = cur === "others";
            var c3html =
                '<td class="skill-col">';
            for (var j = 0; j < c3.length; j++)
                c3html += '<div>' + chk(c3[j][1], cur === c3[j][0]) + "</div>";
            c3html +=
                "<div>" +
                chk("Others", othOn) +
                (othOn && str(em.otherEMployableSkills)
                    ? " " + '<span class="uline short">' + esc(str(em.otherEMployableSkills)) + "</span>"
                    : "") +
                "</div></td>";
            return (
                '<table class="skill-table">' +
                "<tr>" +
                '<td class="section-sub vert-mid">' +
                "<div><strong>Employable Skills</strong></div>" +
                "</td>" +
                skillColHtml(c1, cur) +
                skillColHtml(c2, cur) +
                c3html +
                "</tr></table>"
            );
        }

        function sourceIncomeSkillsBlock() {
            var src = em.sourceOfIncome;
            var c1 = [
                ["sari_sari_store", "Sari-Sari Store"],
                ["ambulant_vendor", "Ambulant Vendor"],
                ["balut_vendor", "Balut Vendor"],
                ["fish_vendor", "Fish Vendor"],
                ["bote_garapa", "Bote-Garapa"],
            ];
            var c2 = [
                ["junk_collector", "Junk Collector"],
                ["piggery", "Piggery"],
                ["poultry_raising", "Poultry Raising"],
                ["flower_gardening", "Flower Gardening"],
                ["vegetable_gardening", "Vegetable Gardening"],
            ];
            var c3 = [
                ["cattle_raising", "Cattle Raising"],
                ["farming", "Farming"],
                ["machine_aide", "Machine Aide"],
                ["metro_aide", "Metro Aide"],
                ["janitor", "Janitor"],
            ];
            var othOn = src === "others";
            var c4 =
                '<td class="skill-col"><div>' +
                chk("Others", othOn) +
                (othOn && str(em.otherSourceOfIncome)
                    ? " " + '<span class="uline short">' + esc(str(em.otherSourceOfIncome)) + "</span>"
                    : "") +
                "</div></td>";
            return (
                '<table class="skill-table">' +
                "<tr>" +
                '<td class="section-sub vert-mid">' +
                "<div><strong>Employable Skills</strong></div>" +
                "</td>" +
                skillColHtml(c1, src) +
                skillColHtml(c2, src) +
                skillColHtml(c3, src) +
                c4 +
                "</tr></table>"
            );
        }

        /* --- Assembly --- */

        var h =
            '<div class="sheet">' +
            '<div class="meta-id">PPA-FO-FR-001</div>' +
            '<div class="clr"></div>' +
            '<div class="hdr-main">PPA FORM 1</div>' +
            '<div class="hdr-center">' +
            "<div>Republic of the Philippines</div>" +
            "<div>Department of Justice</div>" +
            "<div><strong>PAROLE AND PROBATION ADMINISTRATION</strong></div>" +
            "</div>" +
            twoColRow(
                fieldLine("Date of Initial Interview:", str(idData.interview)) +
                    fieldLine("Interviewed by:", str(idData.interviewedBy)),
                fieldLine("Criminal Case No.:", "") + fieldLine("Inv. Docket No.:", "")
            ) +
            '<div class="section-title">WORK SHEET</div>' +
            '<div class="section-num">I. IDENTIFYING DATA</div>' +
            fieldLine("PETITIONER:", str(idData.name)) +
            fieldLine("ALIAS/ES:", str(idData.alias)) +
            fieldLine("Present Address:", str(idData.presentAddress)) +
            fieldLine("Permanent Address:", str(idData.permanentAdress)) +
            '<div class="section-num">II. PETITIONER’S CRIMINAL HISTORY</div>' +
            '<div class="subsection">A. PRESENT OFFENSE</div>' +
            twoColRow(
                fieldLine("Charged With:", po.chargedWith),
                '<div class="field-line tight-right"><span class="flabel">Date:</span>' +
                    uline(po.chargedWithDate, "60") +
                    "</div>"
            ) +
            twoColRow(
                fieldLine("Place of Commission:", po.commisionPlace),
                '<div class="field-line tight-right"><span class="flabel">Date:</span>' +
                    uline(po.commisionPlaceDate, "60") +
                    "</div>"
            ) +
            twoColRow(
                fieldLine("Convicted of:", po.convictedOf),
                '<div class="field-line tight-right"><span class="flabel">Date:</span>' +
                    uline(po.convictedOfDate, "60") +
                    "</div>"
            ) +
            fieldLine("Sentence:", po.sentence) +
            twoColRow(fieldLine("Judge:", po.judge), fieldLine("Court:", po.court)) +
            twoColRow(fieldLine("Arresting Officer:", po.arrestingOfficer), fieldLine("Address:", po.arrestingOfficerAddress)) +
            twoColRow(fieldLine("Defense Counsel:", po.defenseCounsel), fieldLine("Address:", po.defenseCounselAddress)) +
            twoColRow(fieldLine("Prosecutor:", po.prosecutor), fieldLine("Address:", po.prosecutorAddress)) +
            twoColRow(fieldLine("Offended Party:", po.offendedParty), fieldLine("Address:", po.offendedPartyAddress)) +
            fieldLine("Co-Accused:", po.coAccused) +
            fieldLine("Aggravating Circumstances:", po.aggravatingCirsumstances) +
            fieldLine("Mitigating Circumstances:", po.mitigatingCircumstances) +
            '<div class="field-line">' +
            '<span class="flabel nowrap">Custody Status:</span> ' +
            chk("On Bail", selCustody === "On Bail") +
            chk(
                "On Detention",
                selCustody === "On Detention"
            );
        if (selCustody === "On Detention" && po.periodOfDetention)
            h += '<span class="uline">' + esc(str(po.periodOfDetention)) + "</span>";
        h +=
            chk("ROR – Custodian", selCustody === "ROR - Custodian") +
            '</div><div class="field-line indent-cust">';
        if (selCustody === "ROR - Custodian" && po.rorCustodian)
            h += uline(po.rorCustodian, "70");
        h += "</div>" + fieldLine("Address:", po.rorCustodianAddress);
        h +=
            '<div class="field-line"><span class="flabel nowrap">Extent of Participation:</span> ' +
            chk("Principal", selExtent === "Principal") +
            chk("Accomplice", selExtent === "Accomplice") +
            chk("Accessory", selExtent === "Accessory") +
            "</div>";

        function motiveRow(labels) {
            var s = "";
            for (var i = 0; i < labels.length; i++)
                s += chk(labels[i], selMotive === labels[i]);
            return s;
        }
        h +=
            fieldLine("Manner of Commission: (Narrative)", po.mannerofCommision) +
            '<div class="motives">' +
            '<span class="flabel nowrap">Motives:</span><br/>' +
            '<span class="chk-row motive-line">' +
            motiveRow(["Circumstantial", "Imprudence", "Unintentional"]) +
            "</span><br/>" +
            '<span class="chk-row motive-line">' +
            motiveRow(["High Times", "Temper", "Others"]) +
            "</span></div>" +
            fieldLine("Explain:", po.explain) +
            '<div class="subsection">B. PRIOR RECORDS</div>' +
            '<div><span class="flabel nowrap">Alleged By:</span> ' +
            chk("Petitioner", selAlleged === "Petitioner") +
            chk("Other Source", selAlleged === "Other Source") +
            "</div>" +
            '<div style="margin-top:2mm;">' +
            chk("No Record", selRecord === "No Record") +
            "</div>" +
            '<div>' +
            chk("With Derogatory Record", selRecord === "With Derogatory Record") +
            "</div>" +
            tableFromObjects(
                [
                    { title: "Agency", dataKey: "agency" },
                    { title: "Criminal Case No.", dataKey: "cc_no" },
                    { title: "Offense", dataKey: "offense" },
                    { title: "Date Charged", dataKey: "when" },
                    { title: "Disposition", dataKey: "disposition" },
                ],
                priorRows
            ) +
            '<div style="margin:2mm 0;">' +
            chk(
                "Has been/not been on Probation",
                str(prior.probation).toLowerCase() === "yes" || prior.probation === true
            ) +
            "</div>" +
            '<div class="subsection sm">Other Derogatory Information</div>' +
            tableFromObjects(
                [
                    { title: "Source/Date", dataKey: "source" },
                    { title: "Position", dataKey: "position" },
                    { title: "Particulars", dataKey: "particulars" },
                ],
                derRows
            ) +
            '<div class="section-num page-break-before">III. PERSONAL AND SOCIAL HISTORY</div>' +
            '<div class="subsection">A. IDENTIFICATION DATA</div>' +
            '<table class="id-row"><tr><td>Sex:<br/>' +
            uline(ident.sex, "90") +
            '</td><td>Civil Status:<br/>' +
            uline(ident.civilStatus, "90") +
            '</td><td>Citizenship:<br/>' +
            uline(ident.citizenship, "90") +
            '</td><td>Religion:<br/>' +
            uline(ident.religion, "90") +
            '</td></tr><tr><td>DOB:<br/>' +
            uline(ident.dateOfBirth, "90") +
            '</td><td colspan="2">Age:<br/>' +
            uline(ident.age, "90") +
            '</td><td>POB:<br/>' +
            uline(ident.placeOfBirth, "90") +
            '</td></tr></table>' +
            '<div class="field-line"><span class="flabel nowrap">Identifying Marks:</span>' +
            chk("Tattoo", selMark === "Tattoo") +
            chk("Mole", selMark === "Mole") +
            chk("Scar", selMark === "Scar") +
            chk("Others", selMark === "Others") +
            "</div>" +
            fieldLine("Description:", ident.description) +
            fieldLine("Physical Handicap:", ident.physicalHandicap) +
            '<div class="subsection">B. FAMILY BACKGROUND</div>' +
            '<table class="tbl parents"><thead><tr><th style="width:18%"></th><th>PARENTAL</th><th>MATERNAL</th></tr></thead>' +
            "<tbody>" +
            "<tr><td>Name</td><td>" +
            esc(str(fb.fatherName)) +
            "</td><td>" +
            esc(str(fb.motherName)) +
            "</td></tr>" +
            "<tr><td>DOB</td><td>" +
            esc(str(fb.fatherBday)) +
            "</td><td>" +
            esc(str(fb.motherBday)) +
            "</td></tr>" +
            "<tr><td>Age</td><td>" +
            esc(str(fb.fatherAge)) +
            "</td><td>" +
            esc(str(fb.motherAge)) +
            "</td></tr>" +
            "<tr><td>POB</td><td>" +
            esc(str(fb.fatherBplace)) +
            "</td><td>" +
            esc(str(fb.motherBplace)) +
            "</td></tr>" +
            "<tr><td>Address</td><td>" +
            esc(str(fb.fatherAddress)) +
            "</td><td>" +
            esc(str(fb.motherAddress)) +
            "</td></tr>" +
            "<tr><td>Citizenship</td><td>" +
            esc(str(fb.fatherCitizenship)) +
            "</td><td>" +
            esc(str(fb.motherCitizenship)) +
            "</td></tr>" +
            "<tr><td>Religion</td><td>" +
            esc(str(fb.fatherReligion)) +
            "</td><td>" +
            esc(str(fb.motherReligion)) +
            "</td></tr>" +
            "<tr><td>Education</td><td>" +
            esc(str(fb.fatherEducation)) +
            "</td><td>" +
            esc(str(fb.motherEducation)) +
            "</td></tr>" +
            "<tr><td>Occupation</td><td>" +
            esc(str(fb.fatherOccupation)) +
            "</td><td>" +
            esc(str(fb.motherOccupation)) +
            "</td></tr>" +
            "<tr><td>Work Address</td><td>" +
            esc(str(fb.fatherWorkAddress)) +
            "</td><td>" +
            esc(str(fb.motherWorkAddress)) +
            "</td></tr>" +
            "<tr><td>Tel. No.</td><td>" +
            esc(str(fb.fatherTelNo)) +
            "</td><td>" +
            esc(str(fb.motherTelNo)) +
            "</td></tr>" +
            "<tr><td>Monthly Income</td><td>" +
            esc(str(fb.fatherIncome)) +
            "</td><td>" +
            esc(str(fb.motherIncome)) +
            "</td></tr>" +
            "<tr><td>Date Deceased</td><td>" +
            esc(str(fb.fatherDateDeceased)) +
            "</td><td>" +
            esc(str(fb.motherDateDeceased)) +
            "</td></tr>" +
            "<tr><td>Cause</td><td>" +
            esc(str(fb.fatherDeceasedCause)) +
            "</td><td>" +
            esc(str(fb.motherDeceasedCause)) +
            "</td></tr>" +
            "</tbody></table>" +
            '<div class="field-line"><span class="flabel nowrap">Civil Status:</span>' +
            chk("Married", selCivilParents === "Married") +
            chk("Separated", selCivilParents === "Separated") +
            chk("Live-in/Common-Law", selCivilParents === "Live-in/Common-Law") +
            "</div>" +
            '<div class="field-line"><span class="flabel nowrap">Relationship with Parents:</span>' +
            chk("Poor", selRelParents === "Poor") +
            chk("Fair", selRelParents === "Fair") +
            chk("Satisfactory", selRelParents === "Satisfactory") +
            chk("Very Satisfactory", selRelParents === "Very Satisfactory") +
            "</div>" +
            tableFromObjects(
                [
                    { title: "Name of Siblings", dataKey: "name" },
                    { title: "Degree of Rel.", dataKey: "relationship" },
                    { title: "Age", dataKey: "age" },
                    { title: "Educational Attainment", dataKey: "education" },
                    { title: "Occupation", dataKey: "occupation" },
                ],
                fb.siblings || [{}]
            ) +
            '<div class="subsection">2. SOCIO-ECONOMIC BACKGROUND:</div>' +
            '<table class="socio-grid"><tr>' +
            chkCol("Family Relationship", frPairs, str(fb.familyRelationship), {}) +
            chkCol("Major Family Problem", mfpPairs, str(fb.majorFamilyProblem), mapFamProb) +
            chkCol(
                "Family Reputation in the Community",
                frPairs,
                str(fb.familyReputation),
                {}
            ) +
            "</tr><tr>" +
            chkCol(
                "Family Economic Status",
                [
                    ["more_adequate", "More than Adequate"],
                    ["adequate", "Adequate"],
                    ["inadequate", "Inadequate"],
                    ["below_poverty_lines", "Below Poverty Line"],
                ],
                str(fb.familyEconomic),
                mapFamEco
            ) +
            chkCol("Physical Home Conditions", frPairs, str(fb.homeCondition), mapHomeCond) +
            chkCol("Stability of Residence", Object.keys(mapStab).map(function (k) { return [k, mapStab[k]]; }), str(fb.stabilityOfResidence), {}) +
            "</tr></table>" +
            '<div class="muted-label">Comments: Effects of the above condition\'s on the petitioner behavior</div>' +
            uline(fb.commentsOnBehavior, "100") +
            '<div class="field-line" style="margin-top:3mm;"><span class="flabel nowrap">Childhood Circumstances:</span>' +
            chk("Sad", str(fb.childhoodCircumstances) === "sad") +
            chk("Happy", str(fb.childhoodCircumstances) === "happy") +
            "</div>" +
            fieldLine("Explain:", fb.explainCircumstances);

        /* Present situation */

        function psCivilLine() {
            var sv = str(ps.civilStatus);
            var keys = ["single", "married", "widow_widower", "with_common_law_spouse", "seperated"];
            var html = "";
            for (var i = 0; i < keys.length; i++)
                html += chk(mapPsCivil[keys[i]], sv === keys[i]);
            return html;
        }

        h +=
            '<div class="subsection page-break-before">B. PETITIONER\'S PRESENT SITUATION:</div>' +
            '<div class="field-line"><span class="flabel nowrap">Civil Status:</span>' +
            psCivilLine() +
            "</div>";

        /* Spouse fields — typo “Seperated” matches worksheet UI */
        h +=
            twoColRow(
                fieldLine("SPOUSE:", spouseName(ps)),
                '<div class="field-line"><span class="flabel">Age:</span>' + uline("", "40") + "</div>"
            ) +
            fieldLine("Home Address:", ps.spouseHomeAddress) +
            twoColRow(
                fieldLine("POB:", ps.spouseBirthPlace),
                fieldLine("DOB:", ps.spouseBirthDate)
            ) +
            twoColRow(fieldLine("Occupation:", ps.spouseOccupation), fieldLine("Work Address:", ps.spouseWorkAddress)) +
            twoColRow(fieldLine("Date of Marriage:", ps.marriageDate), fieldLine("Nature of Ceremony:", ps.marriageNature)) +
            fieldLine("If Separated, State Reason/s:", ps.reasonSeparation || ps.seperationCause);

        var relKeys = ["very_satisfactory", "satisfactory", "fair", "poor"];
        var relLbls = mapRelGood;
        var selRelS = mapRelGood[str(ps.wifeRelationship)] || "";
        function relBlk(sel) {
            var out = "";
            for (var ri = 0; ri < relKeys.length; ri++) {
                var rk = relKeys[ri];
                out += chk(relLbls[rk], sel === relLbls[rk]);
            }
            return out;
        }

        h +=
            '<div class="field-line"><span class="flabel nowrap">Relationship with Spouse:</span>' + relBlk(selRelS) + "</div>" +
            fieldLine("No. of Children:", ps.noOfChildren) +
            tableFromObjects(
                [
                    { title: "Name", dataKey: "name" },
                    { title: "D.O.B", dataKey: "dob" },
                    { title: "Age", dataKey: "age" },
                    { title: "Educational Attainment", dataKey: "education" },
                    { title: "Occupation", dataKey: "occupation" },
                ],
                ps.children || [{}]
            ) +
            '<div class="field-line"><span class="flabel nowrap">Relationship with Children:</span>' +
            relBlk(mapRelGood[str(ps.childrenRelationship)] || "") +
            "</div>";

        /* Residence */
        h +=
            '<div class="subsection">3. RESIDENCE</div>' +
            '<div class="small-h">Past Residence (Last ten [10] years)</div>' +
            tableFromObjects(
                [
                    { title: "Address", dataKey: "address" },
                    { title: "Inclusive Dates", dataKey: "inclusiveDate" },
                ],
                ps.residence && ps.residence.length ? ps.residence : [{}]
            );

        var selStabPs = mapStab[str(ps.residenceStability)] || "";
        var selResTypeDisp = "";
        (function () {
            var rk = str(ps.residenceType);
            for (var xk in mapResType)
                if (xk === rk) selResTypeDisp = mapResType[xk];
        })();
        h +=
            '<div style="margin-top:2mm;" class="tri-radio-head">Stability of Residence</div>' +
            '<div class="chk-col-set">' +
            chk("Stable", selStabPs === "Stable") +
            chk("Ocassional Change", selStabPs === "Ocassional Change") +
            chk("Frequent Change", selStabPs === "Frequent Change") +
            chk("No Stability", selStabPs === "No Stability") +
            "</div>" +
            '<div class="tri-radio-head">Stability of Residence</div>' +
            '<div class="chk-col-set">' +
            chk("House", selResTypeDisp === "House") +
            chk("Apartment", selResTypeDisp === "Apartment") +
            chk("Rented", selResTypeDisp === "Rented") +
            chk("Owned", selResTypeDisp === "Owned") +
            chk("Others", selResTypeDisp === "Others") +
            "</div>";

        var selHomePs = mapHomeCond[str(ps.physicalHomeCondition)] || "";
        h +=
            '<div class="tri-radio-head">Stability of Residence</div>' +
            '<div class="chk-col-set">' +
            chk("Very Satisfactory", selHomePs === "Very Satisfactory") +
            chk("Satisfactory", selHomePs === "Satisfactory") +
            chk("Fair", selHomePs === "Fair") +
            chk("Poor", selHomePs === "Poor") +
            "</div>";

        /* Economic */
        var selFamEcoPs = mapFamEco[str(ps.familyEconomicStatus)] || "";
        var selBread = mapBread[str(ps.familyBreadwinner)] || "";

        h +=
            '<div class="subsection page-break-before">4. ECONOMIC CONDITIONS</div>' +
            '<div class="tri-radio-head">Family Economic Status</div>' +
            '<div class="chk-col-set econ-z">' +
            chk("More than Adequate", selFamEcoPs === "More than Adequate") +
            chk("Adequate", selFamEcoPs === "Adequate") +
            chk("Inadequate", selFamEcoPs === "Inadequate") +
            chk("Below Poverty Line", selFamEcoPs === "Below Poverty Line") +
            "</div>" +
            '<div class="tri-radio-head">Family Breadwinner</div>' +
            '<div class="chk-col-set">' +
            chk("Petitioner", selBread === "Petitioner") +
            chk("Spouse", selBread === "Spouse") +
            chk("Pet. and Spouse", selBread === "Pet. and Spouse") +
            chk("Others", selBread === "Others") +
            "</div>" +
            '<div class="field-line"><span class="flabel nowrap">No. of Dependants </span>';

        var childLbl = chk("Children", hasChildNum);
        if (hasChildNum) childLbl += uline(depChildren, "18");
        h += childLbl;
        var othLbl = chk("Others", hasOtherNum);
        if (hasOtherNum) othLbl += uline(depOthers, "18");
        h += othLbl + "</div>";

        /* Major family problems columns */
        h += '<div class="subsection">5. MAJOR FAMILY PROBLEMS IN THE FAMILY</div><table class="prob-cols"><tr>';
        function probCell(opts) {
            var mk = str(ps.majorFamilyProblem);
            var u = "";
            for (var i = 0; i < opts.length; i++) {
                var L = opts[i];
                var matchedKey = "";
                for (var k in mapMajProb)
                    if (mapMajProb[k] === L) {
                        matchedKey = k;
                        break;
                    }
                u += '<div>' + chk(L, matchedKey !== "" && mk === matchedKey) + "</div>";
            }
            return "<td>" + u + "</td>";
        }
        h +=
            probCell(["No Apparent Problem", "Economic", "Husband-Wife Conflict"]) +
            probCell(["Mental Illness", "Physical Illness", "Parent-Child Conflict"]) +
            probCell(["Sibling Conflict", "Others"]) +
            "</tr></table>" +
            '<div class="muted-label">Comments: Effects of the above condition\'s on the petitioner\'s behavior</div>' +
            uline(ps.commentsOnFamilyProblem, "100");

        /* Education */
        h +=
            '<div class="subsection page-break-before">D. PETITIONER\'S EDUCATIONAL HISTORY</div>' +
            '<table class="tbl edu">' +
            "<thead><tr>" +
            "<th style=\"width:14%\"></th>" +
            "<th>Educational Level</th>" +
            "<th>Where</th>" +
            "<th>Date</th>" +
            "<th>Highest Level Attained</th>" +
            "<th>Honor/Award Level</th></tr>" +
            "</thead><tbody>" +
            eduGridRow("Elementary", eh) +
            eduGridRow("Secondary", eh) +
            eduGridRow("College", eh) +
            eduGridRow("Post College", eh) +
            eduGridRow("Vocational", eh) +
            "</tbody></table>" +
            '<div style="margin:2mm 0">' +
            chk("Unschooled but Literate", str(eh.unschooled) === "unschooled_but_literate") +
            chk("Illiterate", str(eh.unschooled) === "illiterate") +
            "</div>" +
            '<div class="field-line"><span class="flabel nowrap">Over-all Conduct in School:</span>' +
            relBlk(mapRelGood[str(eh.conductInSchool)] || "") +
            "</div>" +
            fieldLine("Explain:", eh.conductInSchoolExplain);

        /* Employment */

        function empLine(label, radios) {
            return '<div class="field-line"><span class="flabel nowrap">' + esc(label) + "</span>" + radios + "</div>";
        }

        var nameHospital =
            ((em.hospitalizations || []).map(function (x) {
                return str(x.hospital);
            }).filter(Boolean).join(", ") || "");
        var dateHosp =
            ((em.hospitalizations || []).map(function (x) {
                return str(x.dateHospitalized);
            }).filter(Boolean).join(", ") || "");

            '<div class="subsection page-break-before">E. EMPLOYMENT HISTORY</div>' +
            '<div class="small-h">Petitioner\'s Previous Occupation</div>' +
            tableFromObjects(
                [
                    { title: "Job Held", dataKey: "jobHeld" },
                    { title: "Employer Address", dataKey: "employerAddress" },
                    { title: "Dates", dataKey: "date" },
                    { title: "Income", dataKey: "income" },
                ],
                em.previousJobs || [{}]
            ) +
            '<div class="field-line"><span class="flabel">Status of Employment/Self Employment </span>' +
            chk("Regular", em.employmentStatus === "regular") +
            chk("Irregular", em.employmentStatus === "irregular") +
            "</div>" +
            fieldLine("Specify:", em.specifyEmplymentStatus) +
            empLine(
                "If unemployed, state means of support:",
                chk("Pension", str(em.meansOfSupport) === "pension") +
                    chk("Children Support", str(em.meansOfSupport) === "children_support") +
                    chk("Others", str(em.meansOfSupport) === "others")
            ) +
            fieldLine("Specify:", em.specifyMeansOfSupport) +
            '<div style="margin:2mm 0">' +
            employSkillRadiosBlock() +
            "</div>" +
            '<div style="margin:3mm 0">' +
            sourceIncomeSkillsBlock() +
            "</div>";

        var selHlth = mapRelGood[str(em.physicalHealth)] || "";

        function drugLine() {
            return (
                chk("Yes", str(em.drugUsage) === "yes") +
                chk("No", str(em.drugUsage) === "no") +
                chk("Occasionally", str(em.drugUsage) === "occasionally")
            );
        }

        h +=
            empLine(
                "Physical Health:",
                chk("Very Satisfactory", selHlth === "Very Satisfactory") +
                    chk("Satisfactory", selHlth === "Satisfactory") +
                    chk("Fair", selHlth === "Fair") +
                    chk("Poor", selHlth === "Poor")
            ) +
            fieldLine("Explain:", em.explainPhysicalHealthCondition) +
            '<div class="field-line"><span class="flabel nowrap">Previous Treatment/Hospitalization:</span>' +
            chk("None", str(em.previousTreatment) === "none") +
            chk("Yes", str(em.previousTreatment) === "yes") +
            (str(em.previousTreatment) === "yes" && em.specifyTreatment
                ? '<span class="hint"> Specify: </span>' + uline(em.specifyTreatment, "50")
                : "") +
            "</div>" +
            fieldLine("Name of Hospital/s:", nameHospital) +
            fieldLine("Date/s Hospitalized:", dateHosp) +
            '<div class="field-line"><span class="flabel nowrap">Use of Alcohol/Drugs:</span>' +
            drugLine() +
            "</div>" +
            fieldLine("Explain:", em.explainDrugUsage);

        /* Community */

        var selCA = mapRelGood[str(cb.communityAcceptance)] || "";

        h +=
            '<div class="subsection page-break-before">F. COMMUNITY BACKGROUND/ENVIRONMENTAL FACTORS</div>' +
            '<div class="field-line"><span class="flabel">Neighboorhood</span></div>' +
            neighborhoodHtml(cb) +
            fieldLine("Describe:", cb.describeNeighborhood) +
            '<div class="field-line"><span class="flabel nowrap">Neighborhood Criminality:</span>' +
            chk("High", str(cb.criminalityInNeighborhood) === "high") +
            chk("Low", str(cb.criminalityInNeighborhood) === "low") +
            chk("Minimal", str(cb.criminalityInNeighborhood) === "minimal") +
            "</div>" +
            fieldLine("Describe:", cb.criminalityExplain) +
            '<div class="field-line"><span class="flabel nowrap">Community Acceptance:</span>' +
            chk("Very Satisfactory", selCA === "Very Satisfactory") +
            chk("Satisfactory", selCA === "Satisfactory") +
            chk("Fair", selCA === "Fair") +
            chk("Poor", selCA === "Poor") +
            "</div>" +
            fieldLine("Specify:", cb.communityAcceptanceSpecify) +
            '<div class="field-line muted-wrap"><span class="flabel nowrap">Community Acceptance:</span>' +
            chk(
                "Desirable",
                str(cb.peerRelationship) === "desirable"
            ) +
            '<span class="wrap-label">' +
            chk(
                "Undesirable with Potential for Improvement",
                str(cb.peerRelationship) === "undesirable_with_potential_for_improvement"
            ) +
            "</span>" +
            '<span class="wrap-label">' +
            chk(
                "Undesirable with no Potential for Improvement",
                str(cb.peerRelationship) === "undesirable_with_no_potential_for_improvement"
            ) +
            "</span></div>" +
            fieldLine("Specify:", cb.peerRelationshipSpecify);

        var petitionerPrintedName = esc(str(idData.name));
        var waiverBody =
            "I, " +
            petitionerPrintedName +
            ", recognizing that the foregoing Work Sheet forms part of the investigation/supervision " +
            "record of my case handled by the Parole and Probation Administration (PPA), DOJ, voluntarily " +
            "consent that PPA investigators or supervision officers may obtain, verify, and share such " +
            "information as may be needed from collateral sources toward a fair disposition of my case. " +
            "I waive any objections I may otherwise have relating to confidentiality of matters contained " +
            "herein exclusively for legitimate PPA investigative or supervisory ends. I expressly release " +
            "any person whom the PPA may contact from any obligation of secrecy with respect solely to such " +
            "legitimate inquiry. Nothing herein diminishes protections against unrelated or unlawful disclosures " +
            "under applicable law.";
        var certBody =
            "I hereby certify that the foregoing answers and statements appearing in this Work Sheet are " +
            "true and correct according to my best knowledge and belief. Any false statements or omissions " +
            "may adversely affect consideration of my case and may incur legal consequences.";
        var signLine =
            '<div class="sign-grid">' +
            '<div><div class="sign-label">PETITIONER</div>' +
            '<div class="sign-rule"></div>' +
            '<div class="sign-hint">Signature over Printed Name / Date</div></div>' +
            '<div><div class="sign-label">INVESTIGATION / FIELD OFFICE</div>' +
            '<div class="sign-rule"></div>' +
            '<div class="sign-hint">Signature of Officer Concerned / Date</div></div>' +
            "</div>";

        h +=
            '<div class="legal-footer page-break-before">' +
            '<div class="section-num">WAIVER</div>' +
            '<p class="legal-para justified">' +
            waiverBody +
            "</p>" +
            '<div class="section-num" style="margin-top:5mm;">CERTIFICATION</div>' +
            '<p class="legal-para justified">' +
            certBody +
            "</p>" +
            signLine +
            "</div>";

        return h + "</div>";
    }

    /** Full standalone document for iframe / print dialog. */
    function buildHtmlDocument(ws) {
        var body = buildBody(ws);
        return (
            "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/><title>PPA Worksheet</title><style>" +
            "@page { size: A4; margin: 12mm 11mm }" +
            "html,body{margin:0;padding:0;color:#000;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:Arial,Helvetica,sans-serif;font-size:10pt;line-height:1.35}"
            +
            ".sheet{max-width:190mm;margin:0 auto;padding:0}"
            +
            ".meta-id{float:right;font-style:italic;font-size:10pt;margin:0}"
            +
            ".clr{clear:both;height:2mm}"
            +
            ".hdr-main{text-align:left;font-weight:700;margin:3mm 0 2mm;width:72%;margin-left:auto;margin-right:auto;text-align:center}"
            +
            ".hdr-center{text-align:center;line-height:1.45;margin-bottom:5mm;font-size:10pt}"
            +
            ".section-title{text-align:center;font-weight:700;margin:4mm 0 3mm;text-decoration:none}"
            +
            ".section-num{font-weight:700;margin:4mm 0 2mm}"
            +
            ".subsection{font-weight:700;margin:3mm 0 2mm}"
            +
            ".subsection.sm{font-weight:700;margin-top:2mm;font-size:9.5pt}"
            +
            ".small-h{font-size:9.5pt;margin-bottom:2mm}"
            +
            ".grid2{width:100%;border-collapse:collapse;margin:3mm 0}"
            +
            ".grid2 td{padding:2mm 4mm 2mm 0;vertical-align:top}"
            +
            ".c50{width:50%}"
            +
            ".field-line{margin:2.25mm 0;display:flex;align-items:flex-end;gap:4px;width:100%;flex-wrap:wrap}"
            +
            ".field-line.indent-cust{padding-left:16mm;margin-top:-1mm}"
            +
            ".flabel{font-weight:normal;flex-shrink:0}"
            +
            ".flabel.nowrap{white-space:nowrap}"
            +
            ".uline{flex:1;border-bottom:0.35pt solid #000;min-height:1em;padding:0 2px 1px;display:inline-block;vertical-align:bottom;word-break:break-word}"
            +
            ".uline.short{flex:none;min-width:18mm;display:inline-block;vertical-align:bottom}"
            +
            ".tight-right .uline{max-width:none}"
            +
            ".tbl{width:100%;border-collapse:collapse;margin:3mm 0;font-size:9.5pt}"
            +
            ".tbl th,.tbl td{border:0.35pt solid #000;padding:1.5mm 2mm;vertical-align:top}"
            +
            ".tbl th{background:#f5f5f5;font-weight:700;text-align:center}"
            +
            ".parents td:first-child{font-weight:600;background:#fafafa;width:22%}"
            +
            ".id-row{width:100%;border-collapse:collapse;margin:2mm 0}"
            +
            ".id-row td{border:0.35pt solid #000;padding:2mm;width:25%;vertical-align:top;font-size:9.5pt}"
            +
            ".socio-grid{width:100%;border-collapse:collapse;margin:3mm 0}"
            +
            ".socio-grid td{width:33.33%;border:0.35pt solid #000;padding:2mm;vertical-align:top;font-size:9pt;line-height:1.45}"
            +
            ".vert-col .col-title-under{text-decoration:underline;font-weight:600;text-align:center;margin-bottom:3mm;display:block;font-size:9.5pt}"
            +
            ".chk{font-size:9pt;display:inline-flex;align-items:center;gap:1.2mm;margin-right:5mm;margin-bottom:2px;white-space:nowrap}"
            +
            ".chk .dot{width:8px;height:8px;border:0.35pt solid #000;border-radius:50%;flex-shrink:0;box-sizing:border-box;background:#fff}"
            +
            ".chk.on .dot{background:#222;border-color:#222}"
            +
            ".chk-row{display:inline;line-height:2}"
            +
            ".motive-line{display:block;line-height:1.8;margin-top:1mm}"
            +
            ".prob-cols{width:100%;border-collapse:collapse;margin:3mm 0;font-size:9.5pt}"
            +
            ".prob-cols td{width:33.33%;vertical-align:top;padding:3mm;border:0.35pt solid #eee}"
            +
            ".skill-table{width:100%;border-collapse:collapse;margin:2mm 0;font-size:9pt}"
            +
            ".skill-table td{border:0.35pt solid #000;padding:1.8mm 2mm;vertical-align:top}"
            +
            ".skill-table .section-sub{font-weight:700;width:20%;writing-mode:horizontal-tb}"
            +
            ".skill-table .vert-mid{vertical-align:middle}"
            +
            ".skill-col div{margin-bottom:1.8mm;line-height:1.35}"
            +
            ".nb-row{display:block;margin:1mm 0 .5mm}"
            +
            ".tri-radio-head{font-weight:700;font-size:9.5pt;margin-top:4mm;margin-bottom:1mm}"
            +
            ".chk-col-set{font-size:9pt;line-height:1.7;margin-bottom:2mm;display:flex;flex-wrap:wrap;gap:0 4mm}"
            +
            ".econ-z .chk{margin-right:3mm}"
            +
            ".muted-label{font-style:italic;font-size:9.5pt;margin:3mm 0 2mm;line-height:1.35;color:#222}"
            +
            ".hint{font-size:9pt;color:#444}"
            +
            ".wrap-label{display:block;margin-top:1mm;margin-left:0}"
            +
            ".muted-wrap{line-height:1.6!important}"
            +
            ".legal-footer{font-size:9.5pt;line-height:1.45;margin-top:2mm}" +
            ".legal-para{margin:2mm 0;text-align:justify}" +
            ".justified{text-align:justify;text-justify:inter-word}" +
            ".sign-grid{display:flex;justify-content:space-between;gap:8mm;margin-top:8mm;flex-wrap:wrap}" +
            ".sign-grid>div{flex:1;min-width:42%}" +
            ".sign-label{font-weight:700;margin-bottom:2mm;font-size:9.5pt}" +
            ".sign-rule{border-bottom:0.35pt solid #000;min-height:10mm;margin-bottom:2mm}" +
            ".sign-hint{font-size:8.5pt;font-style:italic;color:#222}" +
            ".worksheet-confidential-footer{text-align:center;font-weight:700;font-style:italic;font-size:13pt;margin-top:10mm;padding-top:4mm;line-height:1.2;letter-spacing:.06em}" +
            "@media print{" +
            ".sheet{padding-bottom:16mm}" +
            ".worksheet-confidential-footer{position:fixed;left:0;right:0;bottom:4mm;width:100%;margin:0;padding:0;z-index:1}" +
            "}" +
            ".page-break-before { break-inside: avoid; padding-top: 2mm }"
            +
            "</style></head><body>" +
            body +
            "</body></html>"
        );
    }

    global.fsBuildPpaWorksheetPrintDocument = buildHtmlDocument;
})(typeof window !== "undefined" ? window : this);
