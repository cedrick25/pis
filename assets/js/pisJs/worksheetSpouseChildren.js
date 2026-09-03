    ( function ( $ ) {
        var api = localStorage.getItem('api') || (window.__PIS_API_BASE || '');
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

        $(".add_more_child").unbind("click").on("click", function(){

            $(".spousechild").append(`
            <div class="child">
                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                        <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname"></div>
                        <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname"></div>
                        <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname"></div>
                        <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname"></div>
                    </div>
                </div>
                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                        <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate"></div>
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>

                        <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age"></div>
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sex</label></div>
                        <div class="col-3 col-md-3">
                            <select class="form-control child_sex select2">
                                <option value="" selected disabled>Sex</option>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                                <option value="LGBT">LGBT</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>
                        <div class="col-3 col-md-3">
                            <select class="form-control child_education select2">
                                <option value="" selected disabled>Education</option>
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

                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>
                        <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation"></div>
                    </div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.spousechild').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        function gatheredData () {

            const children = [];
            const child_fname = $(".child_fname");
            const child_mname = $(".child_mname");
            const child_lname = $(".child_lname");
            const child_sname = $(".child_sname");
            const child_bdate = $(".child_bdate");
            const child_age = $(".child_age");
            const child_sex = $(".child_sex");
            const child_education = $(".child_education");
            const child_occupation = $(".child_occupation");

            for(var i = 0; i < child_fname.length; i++){
                
                const list = {};
                list.child_fname = $(child_fname[i]).val();
                list.child_mname = $(child_mname[i]).val();
                list.child_lname = $(child_lname[i]).val();
                list.child_sname = $(child_sname[i]).val();
                list.child_bdate = $(child_bdate[i]).val();
                list.child_age = $(child_age[i]).val();
                list.childSex = $(child_sex[i]).val();
                list.child_education = $(child_education[i]).val();
                list.child_occupation = $(child_occupation[i]).val();
                children.push(list);
            }
            var spouseChildren = {

                children            : children,
                civilStatus         : $(".civilStatus").val(),
                spouseFname         : $(".spouse_fname").val(),
                spouseMname         : $(".spouse_mname").val(),
                spouseLname         : $(".spouse_lname").val(),
                spouseEname         : $(".spouse_ename").val(),
                presentAddress      : $(".pAddress").val(),
                spouse_region       : $(".spouse_region").val(),
                spouse_bday         : $(".spouse_bday").val(),
                spouseProvince      : $(".spouseProvince").val(),
                spouseMunicipality  : $(".spouseMunicipality").val(),
                spouse_work_add     : $(".spouse_work_add").val(),
                spouse_ceremony     : $(".spouse_ceremony").val(),
                spouse_bplace_others: $(".spouse_bplace_others").val(),
                spouse_occupation   : $(".spouse_occupation").val(),
                date_marriage       : $(".date_marriage").val(),
                spouse_remarks      : $(".spouse_remarks").val(),
                spouse_relationship : $(".spouse_relationship").val(),

            }

            var payload = {
                "petitionerId"              : client_id,
                "docketNumber"              : WorksheetApi.docketNumber(),
                "jsonData"                  : JSON.stringify(spouseChildren),
                "type"                      : "spouseChildren",
                "worksheetStatus"           : "INCOMPLETE",
                "createdBy"                 : $.cookie("uuid"),
                "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){

            var dataPayload = gatheredData();

            var required = ["civilStatus", "spouse_fname", "spouse_mname", "spouse_lname", "spouse_ename", "pAddress", "spouse_region", "spouse_bday", "spouseProvince", "spouseMunicipality", "spouse_work_add",
                "spouse_ceremony", "spouse_bplace_others", "spouse_occupation", "date_marriage", "spouse_remarks", "spouse_relationship"];

            required.forEach(function(data) {
                // First, remove the existing error message and error class if present
                $("." + data).removeClass("error_field");
                $("." + data).next('.errorRequired').remove();
        
                // Now check if the field is empty or null
                if ($("." + data).val() === "" || $("." + data).val() === null) {
                    $("." + data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter($("." + data));
                } 
            });

            var requiredFields = $('.errorRequired:visible').length;
            console.log('Number of required fields: ' + requiredFields);

            if (requiredFields === 0) {
                __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                    if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").show();
                            $('#success').hide();
                            setTimeout(function () {
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                                window.location.href = window.pisUrl('worksheet_education_history?' + WorksheetApi.pageQuery());
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }

            
        })

        $(".btn-update").unbind("click").on("click", function(){

            var dataPayload = gatheredData();

            __executeExternalPost(WorksheetApi.updateUrl('spouseChildren'),JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    $(".btn-update").prop('disabled', true);
                    setTimeout(function () {
                        $(".overlay").show();
                        $('#success').hide();
                        setTimeout(function () {
                        $(".overlay").hide();
                        $(".btn-next").prop('disabled', false);
                            window.location.href = window.pisUrl('worksheet_education_history?' + WorksheetApi.pageQuery());
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        __executeExternalGet(WorksheetApi.getUrl('spouseChildren')).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "INCOMPLETE"){

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    JSON.parse(result.jsonData)
                    var spouseChild = JSON.parse(result.jsonData);

                    $(".civilStatus").val(JSON.parse(result.jsonData).civilStatus).trigger("change");        
                    $(".spouse_fname").val(JSON.parse(result.jsonData).spouseFname);       
                    $(".spouse_mname").val(JSON.parse(result.jsonData).spouseMname);       
                    $(".spouse_lname").val(JSON.parse(result.jsonData).spouseLname);       
                    $(".spouse_ename").val(JSON.parse(result.jsonData).spouseEname);
                    $(".pAddress").val(JSON.parse(result.jsonData).presentAddress);
                    $(".spouse_region").val(JSON.parse(result.jsonData).spouse_region).trigger("change");
                    $(".spouse_bday").val(JSON.parse(result.jsonData).spouse_bday);
                    $(".spouseProvince").val(JSON.parse(result.jsonData).spouseProvince);
                    $(".spouseMunicipality").val(JSON.parse(result.jsonData).spouseMunicipality); 
                    $(".spouse_work_add").val(JSON.parse(result.jsonData).spouse_work_add);    
                    $(".spouse_ceremony").val(JSON.parse(result.jsonData).spouse_ceremony);   
                    $(".spouse_bplace_others").val(JSON.parse(result.jsonData).spouse_bplace_others);
                    $(".spouse_occupation").val(JSON.parse(result.jsonData).spouse_occupation);  
                    $(".date_marriage").val(JSON.parse(result.jsonData).date_marriage);
                    $(".spouse_remarks").val(JSON.parse(result.jsonData).spouse_remarks);
                    $(".spouse_relationship").val(JSON.parse(result.jsonData).spouse_relationship).trigger("change");


                spouseChild.children.forEach(function(data){
                    $(".spousechild").append(`
                        <div class="child">
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname" value="${data.child_fname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname" value="${data.child_mname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname" value="${data.child_lname}"></div>
                                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname" value="${data.child_sname}"></div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                                    <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate" value="${data.child_bdate}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age" value="${data.child_age}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label" >Sex</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_sex select2">
                                            <option value="n/a" ${data.childSex === "n/a" ? "selected" : ""} disabled>Select Sex</option>
                                            <option value="FEMALE" ${data.childSex === "FEMALE" ? "selected" : ""}>Female</option>
                                            <option value="MALE" ${data.childSex === "MALE" ? "selected" : ""}>Male</option>
                                            <option value="LGBT" ${data.childSex === "LGBT" ? "selected" : ""}>LGBT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_education select2">
                                            <option value="n/a" ${data.child_education === "n/a" ? "selected" : ""} disabled>Select Education</option>
                                            <option value="COLLEGE GRADUATE" ${data.child_education === "COLLEGE GRADUATE" ? "selected" : ""}>College Graduate</option>
                                            <option value="COLLEGE UNDERGRADUATE" ${data.child_education === "COLLEGE UNDERGRADUATE" ? "selected" : ""}>College Undergraduate</option>
                                            <option value="ELEMENTARY GRADUATE" ${data.child_education === "ELEMENTARY GRADUATE" ? "selected" : ""}>Elementary Graduate</option>
                                            <option value="ELEMENTARY UNDERGRADUATE" ${data.child_education === "ELEMENTARY UNDERGRADUATE" ? "selected" : ""}>Elementary Undergraduate</option>
                                            <option value="JUNIOR HS GRADUATE" ${data.child_education === "JUNIOR HS GRADUATE" ? "selected" : ""}>Junior High School Graduate</option>
                                            <option value="JUNIOR HS UNDERGRADUATE" ${data.child_education === "JUNIOR HS UNDERGRADUATE" ? "selected" : ""}>Junior High School Undergraduate</option>
                                            <option value="ILLITERATE" ${data.child_education === "ILLITERATE" ? "selected" : ""}>No Education/Illiterate</option>
                                            <option value="POST-GRADUATE" ${data.child_education === "POST-GRADUATE" ? "selected" : ""}>Post-Graduate Studies</option>
                                            <option value="SENIOR HS GRADUATE" ${data.child_education === "SENIOR HS GRADUATE" ? "selected" : ""}>Senior High School Graduate</option>
                                            <option value="SENIOR HS UNDERGRADUATE" ${data.child_education === "SENIOR HS UNDERGRADUATE" ? "selected" : ""}>Senior High School Undergraduate</option>
                                            <option value="VOCATIONAL" ${data.child_education === "VOCATIONAL" ? "selected" : ""}>Vocational</option>
                                        </select>
                                    </div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation" value="${data.child_occupation}"></div>
                                </div>
                            </div>
                            <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                        </div>`
                    )
                });
                }else{
                    $(".spousechild").html(`
                        <div class="child">
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname"></div>
                                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname"></div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                                    <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label" >Sex</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_sex select2">
                                            <option value="n/a">Select Sex</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="MALE">Male</option>
                                            <option value="LGBT">LGBT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_education select2">
                                            <option value="n/a">Select Education</option>
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
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation"></div>
                                </div>
                                <br><br><br>
                            </div>
                        </div>`
                    )
                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        var civilStatus = $('.civilStatus').val()
        if (civilStatus == "SINGLE"){
            $(".spouseFieldSet").hide();
            $(".childFieldSet").hide();
            $(".spouseModule").hide();
            $(".add_more_child").hide();
            $(".spousechild").hide();
        } else {
            $(".spouseFieldSet").show();
            $(".childFieldSet").show();
            $(".spouseModule").show();
            $(".add_more_child").show();
            $(".spousechild").show();
        }
        $('.civilStatus').change(function(){
            if ($('.civilStatus').val() == "SINGLE") {
                $(".spouseModule").hide();
                $(".spouseFieldSet").hide();
                $(".childFieldSet").hide();
                $(".add_more_child").hide();
                $(".spousechild").hide();
                $(".spouseModule, .form-control").val('');
                $(".civilStatus").val("SINGLE")
            } else {
                $(".spouseFieldSet").show();
                $(".childFieldSet").show();
                $(".spouseModule").show();
                $(".add_more_child").show();
                $(".spousechild").show();
            }
        });

        function setupWorksheetClickHandler(worksheetType) {
            $(`.${worksheetType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    $(".overlay").show();
                    setTimeout(function () {
                        $(".overlay").hide();
                        window.location.href = window.pisUrl('worksheet_'+worksheetType+'?' + WorksheetApi.pageQuery());
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
    } )( jQuery );