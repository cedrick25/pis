    ( function ( $ ) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            // path = $.wms.getContextPath() + path;
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
        console.log(client_id)
        var field_office_id = GetURLParameter('field_office_id');
        console.log(field_office_id)
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });



        $(".add_more_child").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".spousechild").append(`
            <div class="child">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname"></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname"></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname"></div>
                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname"></div>
                </div>
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
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.spousechild').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $(".btn-next").unbind("click").on("click", function(){

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
                civilStatus           : $(".civilStatus").val(),
                spouseFname      : $(".spouse_fname").val(),
                spouseMname        : $(".spouse_mname").val(),
                spouseLname           : $(".spouse_lname").val(),
                spouseEname         : $(".spouse_ename").val(),
                presentAddress         : $(".pAddress").val(),
                spouse_region           : $(".spouse_region").val(),
                spouse_bday      : $(".spouse_bday").val(),
                spouseProvince        : $(".spouseProvince").val(),
                spouseMunicipality           : $(".spouseMunicipality").val(),
                spouse_work_add         : $(".spouse_work_add").val(),
                spouse_ceremony         : $(".spouse_ceremony").val(),
                spouse_bplace_others           : $(".spouse_bplace_others").val(),
                spouse_occupation      : $(".spouse_occupation").val(),
                date_marriage        : $(".date_marriage").val(),
                spouse_remarks           : $(".spouse_remarks").val(),
                spouse_relationship         : $(".spouse_relationship").val(),

            }
            console.log(spouseChildren)
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(spouseChildren),
            "type"                      : "spouseChildren",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

        })

        $(".btn-update").unbind("click").on("click", function(){

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
                civilStatus           : $(".civilStatus").val(),
                spouseFname      : $(".spouse_fname").val(),
                spouseMname        : $(".spouse_mname").val(),
                spouseLname           : $(".spouse_lname").val(),
                spouseEname         : $(".spouse_ename").val(),
                presentAddress         : $(".pAddress").val(),
                spouse_region           : $(".spouse_region").val(),
                spouse_bday      : $(".spouse_bday").val(),
                spouseProvince        : $(".spouseProvince").val(),
                spouseMunicipality           : $(".spouseMunicipality").val(),
                spouse_work_add         : $(".spouse_work_add").val(),
                spouse_ceremony         : $(".spouse_ceremony").val(),
                spouse_bplace_others           : $(".spouse_bplace_others").val(),
                spouse_occupation      : $(".spouse_occupation").val(),
                date_marriage        : $(".date_marriage").val(),
                spouse_remarks           : $(".spouse_remarks").val(),
                spouse_relationship         : $(".spouse_relationship").val(),

            }
            console.log(spouseChildren)
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(spouseChildren),
            "type"                      : "spouseChildren",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/spouseChildren/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/spouseChildren/'+client_id).done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")

                var result = result.response;

                if (result.status != "ERROR") {

                    if (result.worksheetStatus == "INCOMPLETE"){

                        $(".btn-update").show();
                        $(".btn-next").hide();

                        JSON.parse(result.jsonData)

                        console.log(JSON.parse(result.jsonData))

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
                        console.log(data)
                        $(".spousechild").append(`
                            <div class="child">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname" value="${data.child_fname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname" value="${data.child_mname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname" value="${data.child_lname}"></div>
                                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname" value="${data.child_sname}"></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                                    <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate" value="${data.child_bdate}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age" value="${data.child_age}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label" >Sex</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_sex select2">
                                            <option value="${data.childSex}">${data.childSex}</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="MALE">Male</option>
                                            <option value="LGBT">LGBT</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_education select2">
                                            <option value="${data.child_education}">${data.child_education}</option>
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
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation" value="${data.child_occupation}"></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>`
                        )
                    });

                    }else{
                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
            })

        var civilStatus = $('.civilStatus').val()
        // console.log(fatherDeceased)
        if (civilStatus == "SINGLE"){
            $(".spouseModule").hide();
            $(".add_more_child").hide();
            $(".spousechild").hide();
        } else {
            $(".spouseModule").show();
            $(".add_more_child").show();
            $(".spousechild").show();
        }
        $('.civilStatus').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.civilStatus').val())
            if ($('.civilStatus').val() == "SINGLE") {
                $(".spouseModule").hide();
                $(".add_more_child").hide();
                $(".spousechild").hide();
            } else {
                $(".spouseModule").show();
                $(".add_more_child").show();
                $(".spousechild").show();
            }
        });


        $(".idenData").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id='+client_id;
                        }, 500);
                });
        });
        $(".priorRec").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id='+client_id;
                        }, 500);
                });
        });
        $(".presOff").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                });
        });
        $(".famBg").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_family_background?client_id='+client_id;
                        }, 500);
                });
        });
        $(".socioEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id='+client_id;
                        }, 500);
                });
        });
        $(".resEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id='+client_id;
                        }, 500);
                });
        });
        // $(".spouseChild").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".educHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".empHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_employment_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".envFac").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_environmental_factor?client_id='+client_id;
                        }, 500);
                });
        });

    } )( jQuery );