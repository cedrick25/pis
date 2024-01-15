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
        var foid = GetURLParameter('field_office_id');
        var field_office_id = $.cookie('field_office_id');

        var fatherDeceased = $('.father_deceased').val()
        if (fatherDeceased == "FALSE"){
            $(".fatherDateDeceased").hide();
            $(".fatherDeceasedCause").hide();
        } else {
            $(".fatherDateDeceased").hide();
            $(".fatherDeceasedCause").hide();
        }
        $('.father_deceased').change(function(){
            if ($('.father_deceased').val() == "TRUE") {
                $(".fatherDateDeceased").show();
                $(".fatherDeceasedCause").show();
            } else {
                $(".fatherDateDeceased").hide();
                $(".fatherDeceasedCause").hide();
            }
        });

        var motherDeceased = $('.mother_deceased').val()
        if (motherDeceased == "FALSE"){
            $(".motherDateDeceased").hide();
            $(".motherDeceasedCause").hide();
        } else {
            $(".motherDateDeceased").hide();
            $(".motherDeceasedCause").hide();
        }
        $('.mother_deceased').change(function(){
            if ($('.mother_deceased').val() == "TRUE") {
                $(".motherDateDeceased").show();
                $(".motherDeceasedCause").show();
            } else {
                $(".motherDateDeceased").hide();
                $(".motherDeceasedCause").hide();
            }
        });

        function gatheredData () {
            const siblings = [];
            const sibling_name = $(".sibling_name");
            const relationship = $(".relationship");
            const age = $(".age");
            const sibling_sex = $(".sibling_sex");
            const sibling_education = $(".sibling_education");
            const sibling_occupation = $(".sibling_occupation");

            for(var i = 0; i < sibling_name.length; i++){
                
                const list = {};
                list.sibling_name = $(sibling_name[i]).val();
                list.relationship = $(relationship[i]).val();
                list.age = $(age[i]).val();
                list.sibling_sex = $(sibling_sex[i]).val();
                list.sibling_education = $(sibling_education[i]).val();
                list.sibling_occupation = $(sibling_occupation[i]).val();
                siblings.push(list);
            }


            var familyBG = {

                siblings            : siblings,
                sex                 : $(".sex").val(),
                civilStatus         : $(".civilStatus").val(),
                citizenship         : $(".citizenship").val(),
                religion            : $(".religion").val(),
                bday                : $(".bday").val(),
                bplace              : $(".bplace").val(),
                bprovince           : $(".bprovince").val(),
                bcity               : $(".bcity").val(),
                bplaceOthers        : $(".bplace_others").val(),
                identifyingMarks    : $(".identifyingMarks").val(),
                handicap            : $(".handicap").val(),
                desc                : $(".desc").val(),
                parentsRelationship : $(".parentsRelation").val(),
                fatherName          : $(".father_name").val(),
                fatherBday          : $(".father_bday").val(),
                fatherBplace        : $(".father_bplace").val(),
                fatherAdd           : $(".father_add").val(),
                fatherCitizenship   : $(".father_citizenship").val(),
                fatherReligion      : $(".father_religion").val(),
                fatherEducation     : $(".father_education").val(),
                fatherOccupation    : $(".father_occupation").val(),
                fatherWork_add      : $(".father_work_add").val(),
                fatherTelNo         : $(".father_tel_no").val(),
                fatherIncome        : $(".father_income").val(),
                fatherDeceased      : $(".father_deceased").val(),
                fatherDeceasedCause : $(".father_deceased_cause").val(),
                fatherDateDeceased  : $(".father_date_deceased").val(),

                motherName          : $(".mother_name").val(),
                motherBday          : $(".mother_bday").val(),
                motherBplace        : $(".mother_bplace").val(),
                motherAdd           : $(".mother_add").val(),
                motherCitizenship   : $(".mother_citizenship").val(),
                motherReligion      : $(".mother_religion").val(),
                motherEducation     : $(".mother_education").val(),
                motherOccupation    : $(".mother_occupation").val(),
                motherWork_add      : $(".mother_work_add").val(),
                motherTelNo         : $(".mother_tel_no").val(),
                motherIncome        : $(".mother_income").val(),
                motherDeceased      : $(".mother_deceased").val(),
                motherDeceasedCause : $(".mother_deceased_cause").val(),
                motherDateDeceased  : $(".mother_date_deceased").val(),

            }

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(familyBG),
            "type"                      : "psirFamilyBackground",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){

            var dataPayload = gatheredData()
            __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = api+'/pis/psir_socio_economic?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })
        

        __executeExternalGet('8000/worksheet/getPetitioner/familyBackground/'+client_id).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "INCOMPLETE"){
                    __executeExternalGet('8000/worksheet/getPetitioner/psirFamilyBackground/'+client_id).done(function (result) {
                        var result = result.response;
                        if (result.status != "ERROR") {
                            if (result.worksheetStatus == "INCOMPLETE"){
                                $(".btn-next").hide();
                                $(".btn-update").show();
                            }else{
                                $(".btn-update").hide();
                                $(".btn-next").show();
                            } 
                        }
                    })

                    const familybg = JSON.parse(result.jsonData)

                    $(".sex").val(JSON.parse(result.jsonData).sex).trigger("change");
                    $(".civilStatus").val(JSON.parse(result.jsonData).civilStatus).trigger("change");
                    $(".citizenship").val(JSON.parse(result.jsonData).citizenship).trigger("change");
                    $(".religion").val(JSON.parse(result.jsonData).religion).trigger("change");
                    $(".bday").val(JSON.parse(result.jsonData).bday);
                    $(".bplace").val(JSON.parse(result.jsonData).bplace).trigger("change");
                    $(".bprovince").val(JSON.parse(result.jsonData).bprovince);
                    $(".bcity").val(JSON.parse(result.jsonData).bcity);
                    $(".bplace_others").val(JSON.parse(result.jsonData).bplace);
                    $(".identifyingMarks").val(JSON.parse(result.jsonData).identifyingMarks).trigger("change");
                    $(".handicap").val(JSON.parse(result.jsonData).handicap);
                    $(".desc").val(JSON.parse(result.jsonData).desc);
                    $(".parentsRelation").val(JSON.parse(result.jsonData).parentsRelationship).trigger("change");
                    $(".father_name").val(JSON.parse(result.jsonData).fatherName);
                    $(".father_bday").val(JSON.parse(result.jsonData).fatherBday);
                    $(".father_bplace").val(JSON.parse(result.jsonData).fatherBplace).trigger("change");
                    $(".father_add").val(JSON.parse(result.jsonData).fatherAdd);
                    $(".father_citizenship").val(JSON.parse(result.jsonData).fatherCitizenship).trigger("change");
                    $(".father_religion").val(JSON.parse(result.jsonData).fatherReligion).trigger("change");
                    $(".father_education").val(JSON.parse(result.jsonData).fatherEducation).trigger("change");
                    $(".father_occupation").val(JSON.parse(result.jsonData).fatherOccupation);
                    $(".father_work_add").val(JSON.parse(result.jsonData).fatherWork_add);
                    $(".father_tel_no").val(JSON.parse(result.jsonData).fatherTelNo);
                    $(".father_income").val(JSON.parse(result.jsonData).fatherIncome);
                    $(".father_deceased").val(JSON.parse(result.jsonData).fatherDeceased).trigger("change");
                    $(".father_deceased_cause").val(JSON.parse(result.jsonData).fatherDeceasedCause);
                    $(".father_date_deceased").val(JSON.parse(result.jsonData).fatherDateDeceased);
                    $(".mother_name").val(JSON.parse(result.jsonData).motherName);
                    $(".mother_bday").val(JSON.parse(result.jsonData).motherBday);
                    $(".mother_bplace").val(JSON.parse(result.jsonData).motherBplace).trigger("change");
                    $(".mother_add").val(JSON.parse(result.jsonData).motherAdd);
                    $(".mother_citizenship").val(JSON.parse(result.jsonData).motherCitizenship).trigger("change");
                    $(".mother_religion").val(JSON.parse(result.jsonData).motherReligion).trigger("change");
                    $(".mother_education").val(JSON.parse(result.jsonData).motherEducation).trigger("change");
                    $(".mother_occupation").val(JSON.parse(result.jsonData).motherOccupation);
                    $(".mother_work_add").val(JSON.parse(result.jsonData).motherWork_add);
                    $(".mother_tel_no").val(JSON.parse(result.jsonData).motherTelNo);
                    $(".mother_income").val(JSON.parse(result.jsonData).motherIncome);
                    $(".mother_deceased").val(JSON.parse(result.jsonData).motherDeceased).trigger("change");
                    $(".mother_deceased_cause").val(JSON.parse(result.jsonData).motherDeceasedCause);
                    $(".mother_date_deceased").val(JSON.parse(result.jsonData).motherDateDeceased);


                    familybg.siblings.forEach(function(data){
                        $(".list_siblings").append(`
                        <div class="list_sibling">
                            <div class="row form-group col-md-12">
                                <div class="col-3 col-md-2"><input type="text" class="form-control sibling_name" placeholder="Sibling's Name" value="${data.sibling_name}" disabled></div>
                                <div class="col-3 col-md-2"><input type="text" class="form-control relationship" placeholder="Relationship" value="${data.relationship}" disabled></div>
                                <div class="col-3 col-md-2"><input type="text" class="form-control age" placeholder="Age" value="${data.age}" disabled></div>
                                <div class="col-3 col-md-2">
                                    <select class="form-control sibling_sex select2" disabled>
                                        <option value="${data.sibling_sex}">${data.sibling_sex}</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                        <option value="LGBT">LGBT</option>
                                    </select>
                                </div>
                                <div class="col-3 col-md-2">
                                    <select class="form-control sibling_education select2" disabled>
                                        <option value="${data.sibling_education}">${data.sibling_education}</option>
                                        <option value="COLLEGE GRADUATE">College Graduate</option>
                                        <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
                                        <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
                                        <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
                                        <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
                                        <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
                                        <option value="ILLITERATE">No Education/Illiterate</option>
                                        <option value="POST-GRADUATE">Post-Graduate Studies</option>
                                        <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
                                        <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
                                        <option value="VOCATIONAL">Vocational</option>
                                    </select>
                                </div>
                                <div class="col-3 col-md-2"><input type="text" class="form-control sibling_occupation" placeholder="Occupation" value="${data.sibling_occupation}" disabled></div>
                            </div>
                            
                        </div>`
                        )
                    });
                }else{

                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){

            var dataPayload = gatheredData();

            __executeExternalPost('8000/worksheet/updatePetitioner/psirFamilyBackground/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = api+'/pis/psir_socio_economic?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        function setupWorksheetClickHandler(psirType) {
            $(`.${psirType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    setTimeout(function () {
                        window.location.href = api+'/pis/psir_'+psirType+'?client_id='+client_id+'&field_office_id='+foid;
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("socio_economic");
        setupWorksheetClickHandler("residence_economic");
        setupWorksheetClickHandler("spouse_children");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor")
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation")




    } )( jQuery );