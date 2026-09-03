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
        var client_fo = GetURLParameter('client_fo');
        var PROFILE_EXTRA_TYPE = "client_update_profile";
        var extraProfileRecordId = null;
        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        function hasPrefillValue(value) {
            return value !== null && value !== undefined && String(value).trim() !== "" && String(value).toLowerCase() !== "null";
        }

        function formValue(selector) {
            var value = $(selector).val();
            if (value === "none") return "";
            return value == null ? "" : String(value).trim();
        }

        function splitFullName(fullName) {
            var parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
            if (!parts.length) {
                return { firstName: "", middleName: "", lastName: "" };
            }
            if (parts.length === 1) {
                return { firstName: parts[0], middleName: "", lastName: "" };
            }
            if (parts.length === 2) {
                return { firstName: parts[0], middleName: "", lastName: parts[1] };
            }
            return {
                firstName: parts[0],
                middleName: parts.slice(1, -1).join(" "),
                lastName: parts[parts.length - 1]
            };
        }

        function applySplitName(fullName) {
            if (!hasPrefillValue(fullName)) return false;
            var parts = splitFullName(fullName);
            if (isUpdateFieldEmpty($(".firstName_update"))) $(".firstName_update").val(parts.firstName);
            if (isUpdateFieldEmpty($(".middleName_update"))) $(".middleName_update").val(parts.middleName);
            if (isUpdateFieldEmpty($(".lastName_update"))) $(".lastName_update").val(parts.lastName);
            return true;
        }

        function joinNameParts(firstName, middleName, lastName, suffixName) {
            return [firstName, middleName, lastName, suffixName].filter(hasPrefillValue).join(" ");
        }

        function readJoinedNameFromForm() {
            return joinNameParts(
                formValue(".firstName_update"),
                formValue(".middleName_update"),
                formValue(".lastName_update"),
                formValue(".suffix_update")
            );
        }

        function mapFormSex(sex) {
            if (!hasPrefillValue(sex)) return "";
            var normalized = String(sex).toLowerCase();
            if (normalized === "male" || normalized === "female") return normalized;
            return String(sex);
        }

        function mapFormCivilStatusToPsir(civilStatus) {
            if (!hasPrefillValue(civilStatus) || civilStatus === "none") return null;
            var map = {
                "single": "single",
                "married": "married",
                "widow/widower": "widow/widower",
                "common_law": "common_law",
                "with common law spouse": "common_law"
            };
            var key = String(civilStatus).toLowerCase();
            return map[key] || key.replace(/\s+/g, "_");
        }

        function ensureSection(data, key) {
            if (!data[key] || typeof data[key] !== "object") {
                data[key] = {};
            }
            return data[key];
        }

        function setIfFormHasValue(target, key, value) {
            if (!hasPrefillValue(value)) return;
            target[key] = value;
        }

        function collectExtraProfile() {
            return {
                jail: formValue(".jail_update"),
                localJail: formValue(".local_jail_update"),
                identifyingMarks: formValue(".identifying_marks_update"),
                description: formValue(".client_description_update"),
                physicalHandicap: formValue(".physical_handicap_update"),
                hobbies: formValue(".hobbies_update"),
                skills: formValue(".skills_update"),
                birthRegion: formValue(".birth_region_update"),
                birthProvince: formValue(".birth_province_update"),
                age: formValue(".age_update"),
                siblingRank: formValue(".sibling_rank_update"),
                femaleSiblings: formValue(".female_siblings_update"),
                maleSiblings: formValue(".male_siblings_update"),
                spouseName: formValue(".spouse_name_update"),
                dependents: formValue(".dependents_update"),
                orgMembership: formValue(".org_mem_update"),
                custodyStatus: formValue(".custody_status"),
                chargeWith: formValue(".charge_with_update"),
                chargedWithDate: formValue(".charged_with_date_update"),
                convictedOf: formValue(".convicted_of_update"),
                convictedOfDate: formValue(".convicted_of_date_update"),
                sentence: formValue(".sentence_update"),
                judge: formValue(".judge_update"),
                court: formValue(".court_update"),
                probationGranted: formValue(".probation_granted_update"),
                periodYears: formValue(".pyears_update"),
                periodMonths: formValue(".pmonths_update"),
                periodDays: formValue(".pdays_update"),
                dateStarted: formValue(".date_started_update"),
                dateFrVrTrEtSubmitted: formValue(".date_fr_vr_tr_et_submitted_update"),
                datePsir: formValue(".date_psir_update"),
                dateCourtOrder: formValue(".date_court_update"),
                dateReceived: formValue(".date_received_update")
            };
        }

        function applyExtraProfile(extra) {
            if (!extra || typeof extra !== "object") return;
            fillTextIfEmpty(".jail_update", extra.jail);
            fillSelectIfEmpty(".local_jail_update", extra.localJail, extra.localJail === "true" ? "Yes" : extra.localJail === "false" ? "No" : extra.localJail);
            fillSelectIfEmpty(".identifying_marks_update", extra.identifyingMarks, extra.identifyingMarks);
            fillTextIfEmpty(".client_description_update", extra.description);
            fillTextIfEmpty(".physical_handicap_update", extra.physicalHandicap);
            fillTextIfEmpty(".hobbies_update", extra.hobbies);
            fillTextIfEmpty(".skills_update", extra.skills);
            fillTextIfEmpty(".birth_region_update", extra.birthRegion);
            fillTextIfEmpty(".birth_province_update", extra.birthProvince);
            fillTextIfEmpty(".age_update", extra.age);
            fillTextIfEmpty(".sibling_rank_update", extra.siblingRank);
            fillTextIfEmpty(".female_siblings_update", extra.femaleSiblings);
            fillTextIfEmpty(".male_siblings_update", extra.maleSiblings);
            fillTextIfEmpty(".spouse_name_update", extra.spouseName);
            fillTextIfEmpty(".dependents_update", extra.dependents);
            fillTextIfEmpty(".org_mem_update", extra.orgMembership);
            fillTextIfEmpty(".custody_status", extra.custodyStatus);
            fillTextIfEmpty(".charge_with_update", extra.chargeWith);
            fillTextIfEmpty(".charged_with_date_update", extra.chargedWithDate);
            fillTextIfEmpty(".convicted_of_update", extra.convictedOf);
            fillTextIfEmpty(".convicted_of_date_update", extra.convictedOfDate);
            fillTextIfEmpty(".sentence_update", extra.sentence);
            fillTextIfEmpty(".judge_update", extra.judge);
            fillTextIfEmpty(".court_update", extra.court);
            fillTextIfEmpty(".probation_granted_update", extra.probationGranted);
            fillTextIfEmpty(".pyears_update", extra.periodYears);
            fillTextIfEmpty(".pmonths_update", extra.periodMonths);
            fillTextIfEmpty(".pdays_update", extra.periodDays);
            fillTextIfEmpty(".date_started_update", extra.dateStarted);
            fillTextIfEmpty(".date_fr_vr_tr_et_submitted_update", extra.dateFrVrTrEtSubmitted);
            fillTextIfEmpty(".date_psir_update", extra.datePsir);
            fillTextIfEmpty(".date_court_update", extra.dateCourtOrder);
            fillTextIfEmpty(".date_received_update", extra.dateReceived);
        }

        function loadExtraProfile() {
            __executeExternalGet("8000/data/" + PROFILE_EXTRA_TYPE + "/" + client_id).done(function (result) {
                var rows = (result && result.status !== "ERROR" && Array.isArray(result.response))
                    ? result.response
                    : [];
                if (!rows.length) return;
                extraProfileRecordId = rows[0].id || null;
                var extra = {};
                try {
                    extra = typeof rows[0].jsonData === "string"
                        ? JSON.parse(rows[0].jsonData || "{}")
                        : (rows[0].jsonData || {});
                } catch (e) {
                    extra = {};
                }
                applyExtraProfile(extra);
            });
        }

        function saveExtraProfile(onDone) {
            var payload = {
                petitionerId: client_id,
                type: PROFILE_EXTRA_TYPE,
                jsonData: JSON.stringify(collectExtraProfile()),
                createdBy: $.cookie("uuid"),
                updatedBy: $.cookie("uuid"),
                status: true
            };
            var url = extraProfileRecordId
                ? "8000/data/update/" + extraProfileRecordId
                : "8000/data/create";
            __executeExternalPost(url, JSON.stringify(payload)).done(function (saveRes) {
                if (saveRes && saveRes.status !== "ERROR" && saveRes.response && saveRes.response.id) {
                    extraProfileRecordId = saveRes.response.id;
                }
                if (typeof onDone === "function") onDone(saveRes);
            });
        }

        function isUpdateFieldEmpty($el) {
            if (!$el || !$el.length) return false;
            var value = $el.val();
            if (value === null || value === undefined || String(value).trim() === "" || value === "none") {
                return true;
            }
            if ($el.is("select")) {
                var $selected = $el.find("option:selected");
                if ($selected.length && ($selected.is("[disabled]") || $selected.val() === "" || $selected.val() === "none")) {
                    return true;
                }
            }
            return false;
        }

        function fillTextIfEmpty(selector, value) {
            if (!hasPrefillValue(value)) return;
            var $el = $(selector);
            if (!isUpdateFieldEmpty($el)) return;
            $el.val(value);
        }

        function fillSelectIfEmpty(selector, value, label) {
            if (!hasPrefillValue(value)) return;
            var $el = $(selector);
            if (!isUpdateFieldEmpty($el)) return;
            var optionValue = String(value);
            if ($el.find('option[value="' + optionValue.replace(/"/g, '\\"') + '"]').length === 0) {
                var optionLabel = hasPrefillValue(label) ? label : optionValue;
                $el.append($("<option></option>").attr("value", optionValue).text(optionLabel));
            }
            $el.val(optionValue).trigger("change");
        }

        function mapPsirSex(sex) {
            if (!hasPrefillValue(sex)) return null;
            var normalized = String(sex).toLowerCase();
            if (normalized === "male" || normalized === "female") return normalized;
            return null;
        }

        function mapPsirCivilStatus(civilStatus) {
            if (!hasPrefillValue(civilStatus)) return null;
            var map = {
                "single": { value: "SINGLE", label: "Single" },
                "married": { value: "MARRIED", label: "Married" },
                "widow/widower": { value: "WIDOW/WIDOWER", label: "Widow/Widower" },
                "common_law": { value: "WITH COMMON LAW SPOUSE", label: "With Common Law Spouse" }
            };
            return map[String(civilStatus).toLowerCase()] || null;
        }

        function applyPsirToClientUpdate(psirData) {
            if (!psirData || typeof psirData !== "object") return;

            var identifying = psirData.identifyingData || {};
            var family = psirData.familyBackgroundAndBirthData || {};
            var presentSituation = psirData.presentSituation || {};
            var education = psirData.educationAndJobHistory || {};
            var offense = psirData.presentOffense || {};

            applySplitName(identifying.petitionersName || identifying.trueName);
            fillTextIfEmpty(".alias_update", identifying.alias);
            fillTextIfEmpty(".age_update", identifying.age);
            fillSelectIfEmpty(".gender_update", mapPsirSex(identifying.sex));
            fillTextIfEmpty(".occupation_update", education.presentOccupation || education.previousOccupation);
            fillTextIfEmpty(".address_update", identifying.permanentAdress || identifying.presentAddress);
            fillTextIfEmpty(".birthdate_update", family.birthDate);
            fillTextIfEmpty(".birth_city_update", family.birthPlace);
            fillTextIfEmpty(".b_place_update", family.birthPlace);
            fillTextIfEmpty(".sibling_rank_update", family.birthOrder);
            fillTextIfEmpty(".spouse_name_update", presentSituation.spouseName || joinNameParts(
                presentSituation.spouseFirstName,
                presentSituation.spouseMiddleName,
                presentSituation.spouseLastName
            ));
            fillTextIfEmpty(".dependents_update", presentSituation.noOfChildren || presentSituation.totalNoOfchildren);
            fillTextIfEmpty(".skills_update", education.specialSkills);

            if (hasPrefillValue(identifying.identifyingMarks)) {
                fillSelectIfEmpty(".identifying_marks_update", identifying.identifyingMarks, identifying.identifyingMarks);
            }
            if (hasPrefillValue(education.educationAttainment)) {
                fillTextIfEmpty(".educational_attainment_update", education.educationAttainment);
            }
            if (hasPrefillValue(identifying.religion)) {
                fillSelectIfEmpty(".religion_update", identifying.religion, identifying.religion);
            }
            var civil = mapPsirCivilStatus(presentSituation.civilStatus);
            if (civil) {
                fillSelectIfEmpty(".civil_status_update", civil.value, civil.label);
            }

            fillTextIfEmpty(".charge_with_update", offense.chargedWith);
            fillTextIfEmpty(".charged_with_date_update", offense.chargedWithDate);
            fillTextIfEmpty(".convicted_of_update", offense.convictedOf);
            fillTextIfEmpty(".convicted_of_date_update", offense.convictedOfDate);
            fillTextIfEmpty(".sentence_update", offense.sentence);
            fillTextIfEmpty(".judge_update", offense.judge);
            fillTextIfEmpty(".court_update", offense.court);
            fillTextIfEmpty(".custody_status", offense.custody);
        }

        function prefillClientUpdateFromPsir() {
            __executeExternalGet(WorksheetApi.getUrl("psir")).done(function (result) {
                if (!result || result.status === "ERROR" || !result.response || !result.response.jsonData) {
                    return;
                }
                try {
                    var psirData = typeof result.response.jsonData === "string"
                        ? JSON.parse(result.response.jsonData)
                        : result.response.jsonData;
                    applyPsirToClientUpdate(psirData);
                    if (!hasPrefillValue($("#petitionerName").text())) {
                        $("#petitionerName").text(readJoinedNameFromForm());
                    }
                } catch (e) {
                    console.log("PSIR prefill skipped:", e);
                }
            });
        }
                
        function getLatestProfile () {
            __executeExternalGet('8080/file/getLatest/petitioner_profile/'+client_id+"/"+client_fo).done(function (result) {
                if (result.status != "ERROR") {
                    if (result.files.length != 0) {
                        $('#client_photo').attr('src', api+'8080/file/view/'+result.files[0].id);
                    }
                }
            })
        }
        $("#factSheet").unbind("click").on("click", function(){
            window.location.href = api+'/pis/client_view_factsheet?client_id='+client_id+'&field_office_id='+client_fo;
        })
        $(".btn-cance-update").unbind("click").on("click", function(){
            window.location.href = api+'/pis/client_view_factsheet?client_id='+client_id+'&field_office_id='+client_fo;
        })
        
        var __fields = function(){
            getLatestProfile();
            __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                var result = result.response;

                if (result.status != "ERROR") {
                    var firstName = result.firstName;
                    var middleName = result.middleName;
                    var lastName = result.lastName;
                    var suffixName = result.suffixName;
                    var hasNameParts = [firstName, middleName, lastName].some(hasPrefillValue);
                    var name = hasNameParts
                        ? joinNameParts(firstName, middleName, lastName, suffixName)
                        : (result.fullName || "");
                    $("#petitionerName").text(name);
                    fillSelectIfEmpty(".gender_update", mapFormSex(result.sex));
                    if (hasNameParts) {
                        $(".firstName_update").val(firstName);
                        $(".middleName_update").val(middleName);
                        $(".lastName_update").val(lastName);
                    } else {
                        applySplitName(result.fullName);
                    }
                    if (hasPrefillValue(suffixName)) {
                        $(".suffix_update").val(suffixName);
                    }
                    $(".education_update").val(result.education);
                    $(".occupation_update").val(result.occupation);
                    $(".cc_no_update").val(result.criminalCaseNo);
                    $(".birthdate_update").val(result.birthDate);
                    $(".b_place_update").val(result.birthCity);
                    $(".address_update").val(result.permanentAddress);
                    fillTextIfEmpty(".jail_update", result.prisonName);
                    fillTextIfEmpty(".date_received_update", result.dateReceived);
                    if (hasPrefillValue(result.alias)) {
                        $(".alias_update").val(result.alias);
                    }
                    if (hasPrefillValue(result.education)) {
                        fillTextIfEmpty(".educational_attainment_update", result.education);
                    }
                    if (hasPrefillValue(result.birthCity)) {
                        fillTextIfEmpty(".birth_city_update", result.birthCity);
                    }
                    if (hasPrefillValue(result.religion)) {
                        fillSelectIfEmpty(".religion_update", result.religion, result.religion);
                    }
                    if (hasPrefillValue(result.civilStatus)) {
                        fillSelectIfEmpty(".civil_status_update", result.civilStatus, result.civilStatus);
                    }
                    if (!hasPrefillValue($("#petitionerName").text())) {
                        $("#petitionerName").text(readJoinedNameFromForm() || result.fullName || "");
                    }

                    function finishUpdateSuccess() {
                        $(".form-control").val('');
                        $('#success').show();
                        setTimeout(function () {
                            $('#success').hide();
                            window.location.href = api+'/pis/client_list';
                        }, 2000);
                    }

                    function patchExistingPsirThenFinish() {
                        __executeExternalGet(WorksheetApi.getUrl("psir")).done(function (psirResult) {
                            if (!window.PsirRecord) {
                                finishUpdateSuccess();
                                return;
                            }
                            var parsed = window.PsirRecord.parseExisting(psirResult);
                            if (parsed.error || !parsed.hasRecord) {
                                finishUpdateSuccess();
                                return;
                            }
                            var data = parsed.existing;
                            var identifying = ensureSection(data, "identifyingData");
                            var family = ensureSection(data, "familyBackgroundAndBirthData");
                            var presentSituation = ensureSection(data, "presentSituation");
                            var education = ensureSection(data, "educationAndJobHistory");
                            var offense = ensureSection(data, "presentOffense");

                            setIfFormHasValue(identifying, "petitionersName", readJoinedNameFromForm());
                            setIfFormHasValue(identifying, "alias", formValue(".alias_update"));
                            setIfFormHasValue(identifying, "age", formValue(".age_update"));
                            setIfFormHasValue(identifying, "sex", mapFormSex(formValue(".gender_update")));
                            setIfFormHasValue(identifying, "religion", formValue(".religion_update"));
                            setIfFormHasValue(identifying, "identifyingMarks", formValue(".identifying_marks_update"));
                            setIfFormHasValue(identifying, "permanentAdress", formValue(".address_update"));
                            setIfFormHasValue(identifying, "presentAddress", formValue(".address_update"));
                            setIfFormHasValue(family, "birthDate", formValue(".birthdate_update"));
                            setIfFormHasValue(family, "birthPlace", formValue(".birth_city_update") || formValue(".b_place_update"));
                            setIfFormHasValue(presentSituation, "civilStatus", mapFormCivilStatusToPsir(formValue(".civil_status_update")));
                            setIfFormHasValue(presentSituation, "spouseName", formValue(".spouse_name_update"));
                            setIfFormHasValue(presentSituation, "noOfChildren", formValue(".dependents_update"));
                            setIfFormHasValue(education, "educationAttainment", formValue(".educational_attainment_update") || formValue(".education_update"));
                            setIfFormHasValue(education, "presentOccupation", formValue(".occupation_update"));
                            setIfFormHasValue(education, "specialSkills", formValue(".skills_update"));
                            setIfFormHasValue(offense, "chargedWith", formValue(".charge_with_update"));
                            setIfFormHasValue(offense, "chargedWithDate", formValue(".charged_with_date_update"));
                            setIfFormHasValue(offense, "convictedOf", formValue(".convicted_of_update"));
                            setIfFormHasValue(offense, "convictedOfDate", formValue(".convicted_of_date_update"));
                            setIfFormHasValue(offense, "sentence", formValue(".sentence_update"));
                            setIfFormHasValue(offense, "judge", formValue(".judge_update"));
                            setIfFormHasValue(offense, "court", formValue(".court_update"));
                            setIfFormHasValue(offense, "custody", formValue(".custody_status"));

                            var payload = {
                                petitionerId: client_id,
                                docketNumber: WorksheetApi.docketNumber(),
                                jsonData: JSON.stringify(data),
                                type: "psir",
                                worksheetStatus: (psirResult.response && psirResult.response.worksheetStatus) || "incomplete",
                                createdBy: $.cookie("uuid"),
                                updatedBy: $.cookie("uuid"),
                                fieldOfficeId: result.fieldOfficeId || $.cookie("field_office_id")
                            };
                            window.PsirRecord.persist(__executeExternalPost, client_id, payload, parsed, function (saveRes) {
                                if (saveRes && saveRes.status === "ERROR") {
                                    alert("Profile saved, but PSIR could not be updated.");
                                }
                                finishUpdateSuccess();
                            });
                        });
                    }

                    function saveExtraThenPsir() {
                        saveExtraProfile(function (extraRes) {
                            if (extraRes && extraRes.status === "ERROR") {
                                alert("Profile saved, but extra profile fields could not be updated.");
                            }
                            patchExistingPsirThenFinish();
                        });
                    }

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var payload = {
                            "firstName"         : formValue(".firstName_update"),
                            "middleName"        : formValue(".middleName_update"),
                            "lastName"          : formValue(".lastName_update"),
                            "suffixName"        : formValue(".suffix_update"),
                            "fullName"          : readJoinedNameFromForm(),
                            "clientType"        : result.clientType,
                            "sex"               : mapFormSex(formValue(".gender_update")),
                            "education"         : formValue(".educational_attainment_update") || formValue(".education_update"),
                            "occupation"        : formValue(".occupation_update"),
                            "criminalCaseNo"    : formValue(".cc_no_update"),
                            "fieldOfficeId"     : result.fieldOfficeId,
                            "docketNumber"      : result.docketNumber,
                            "birthDate"         : formValue(".birthdate_update"),
                            "birthCity"         : formValue(".birth_city_update") || formValue(".b_place_update"),
                            "permanentAddress"  : formValue(".address_update"),
                            "alias"             : formValue(".alias_update"),
                            "religion"          : formValue(".religion_update"),
                            "civilStatus"       : formValue(".civil_status_update"),
                            "prisonName"        : formValue(".jail_update"),
                            "dateReceived"      : formValue(".date_received_update"),
                            "updatedBy"         : $.cookie("uuid") || "",
                            "status"            : 1
                        };
                        __executeExternalPost('8000/petitioner/update/'+client_id,JSON.stringify(payload)).done(function (updateResult) {
                            if (updateResult.status != "ERROR") {
                                saveExtraThenPsir();
                            }else{
                                alert("failed")
                            }
                        })
                    })

                    loadExtraProfile();
                    prefillClientUpdateFromPsir();

                }else{
                    alert("failed")
                }
            })
        }

        setTimeout(function () {
            __fields();
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm_update').prop('disabled', false);
        }, 0);


    } )( jQuery );