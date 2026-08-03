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
        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        function hasPrefillValue(value) {
            return value !== null && value !== undefined && String(value).trim() !== "";
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

            fillTextIfEmpty(".alias_update", identifying.alias);
            fillTextIfEmpty(".age_update", identifying.age);
            fillSelectIfEmpty(".gender_update", mapPsirSex(identifying.sex));
            // Keep existing class/API pairing used by this page's save payload
            fillTextIfEmpty(".occupation_update", education.presentOccupation || education.previousOccupation);
            fillTextIfEmpty(".address_update", identifying.permanentAdress || identifying.presentAddress);
            fillTextIfEmpty(".birthdate_update", family.birthDate);
            fillTextIfEmpty(".birth_city_update", family.birthPlace);
            fillTextIfEmpty(".b_place_update", family.birthPlace);
            fillTextIfEmpty(".sibling_rank_update", family.birthOrder);
            fillTextIfEmpty(".spouse_name_update", presentSituation.spouseName);
            fillTextIfEmpty(".dependents_update", presentSituation.totalNoOfchildren);
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
            __executeExternalGet("8000/worksheet/getPetitioner/psir/" + client_id).done(function (result) {
                if (!result || result.status === "ERROR" || !result.response || !result.response.jsonData) {
                    return;
                }
                try {
                    var psirData = typeof result.response.jsonData === "string"
                        ? JSON.parse(result.response.jsonData)
                        : result.response.jsonData;
                    applyPsirToClientUpdate(psirData);
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
                    var hasNameParts = [firstName, middleName, lastName].some(function (part) {
                        return part !== null && part !== undefined && String(part).trim() !== "" && String(part).toLowerCase() !== "null";
                    });
                    var name = hasNameParts
                        ? [firstName, middleName, lastName, suffixName].filter(function (part) {
                            return part !== null && part !== undefined && String(part).trim() !== "" && String(part).toLowerCase() !== "null";
                        }).join(" ")
                        : (result.fullName || "");
                    console.log(result)
                    $("#petitionerName").text(name)
                    $(".gender_update").val(result.sex).trigger("change");
                    $(".firstName_update").val(result.firstName);
                    $(".middleName_update").val(result.middleName);
                    $(".lastName_update").val(result.lastName);
                    $(".suffix_update").val(result.suffixName);
                    $(".education_update").val(result.education);
                    $(".occupation_update").val(result.occupation);
                    $(".cc_no_update").val(result.criminalCaseNo);
                    $(".birthdate_update").val(result.birthDate);
                    $(".b_place_update").val(result.birthCity);
                    $(".address_update").val(result.permanentAddress);
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

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var payload = {
                            "firstName"         : $(".firstName_update").val(),
                            "middleName"        : $(".middleName_update").val(),
                            "lastName"          : $(".lastName_update").val(),
                            "suffixName"        : $(".suffix_update").val(),
                            "clientType"        : result.clientType,
                            "sex"               : $(".gender_update").val(),
                            "education"         : $(".educational_attainment_update").val() || $(".education_update").val(),
                            "occupation"        : $(".occupation_update").val(),
                            "criminalCaseNo"    : $(".cc_no_update").val(),
                            "fieldOfficeId"     : result.fieldOfficeId,
                            "birthDate"         : $(".birthdate_update").val(),
                            "birthCity"         : $(".birth_city_update").val() || $(".b_place_update").val(),
                            "permanentAddress"  : $(".address_update").val(),
                            "alias"             : $(".alias_update").val(),
                            "religion"          : $(".religion_update").val(),
                            "civilStatus"       : $(".civil_status_update").val(),
                            "createdBy"         : "",
                            "updatedBy"         : "",
                            "status"            : 1
                        }
                        __executeExternalPost('8000/petitioner/update/'+client_id,JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success').show();
                                setTimeout(function () {
                                    $('#success').hide();
                                    window.location.href = api+'/pis/client_list';
                                }, 2000);
                            }else{
                                alert("failed")
                            }
                        })
                    })

                    // Fill remaining empty fields from PSIR
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