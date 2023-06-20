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
        console.log(client_id)
        var field_office_id = GetURLParameter('field_office_id');
        console.log(field_office_id)
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });


        $(".add_more_emp").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".emp_history").append(`
            <div class="emp_his">
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Job Held</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control job_held"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employer Address</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_add"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateFrom"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateTo"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Income</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_Income"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.emp_history').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        if ($('.emp_treatment').val() == "NONE"){
            $(".hosp_name").hide();
            $(".date_hosp").hide();
            $(".use_drug").hide();
            $(".drug_explain").hide();
        } else {
            $(".hosp_name").hide();
            $(".date_hosp").hide();
            $(".use_drug").hide();
            $(".drug_explain").hide();
        }
        $('.emp_treatment').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.emp_treatment').val())
            if ($('.emp_treatment').val() == "YES") {
                $(".hosp_name").show();
                $(".date_hosp").show();
                $(".use_drug").show();
                $(".drug_explain").show();
            } else {
                $(".hosp_name").hide();
                $(".date_hosp").hide();
                $(".use_drug").hide();
                $(".drug_explain").hide();
            }
        });

        $(".btn-next").unbind("click").on("click", function(){

            const empHistory = [];
            const job_held = $(".job_held");
            const emp_add = $(".emp_add");
            const emp_dateFrom = $(".emp_dateFrom");
            const emp_dateTo = $(".emp_dateTo");
            const emp_Income = $(".emp_Income");

            for(var i = 0; i < job_held.length; i++){
                
                const list = {};
                list.job_held = $(job_held[i]).val();
                list.emp_add = $(emp_add[i]).val();
                list.emp_dateFrom = $(emp_dateFrom[i]).val();
                list.emp_dateTo = $(emp_dateTo[i]).val();
                list.emp_Income = $(emp_Income[i]).val();
                empHistory.push(list);
            }


            var employmentHistory = {

                empHistory              : empHistory,
                empStatus               : $(".emp_status").val(),
                empSpecStatus           : $(".emp_specStatus").val(),
                empSupport              : $(".emp_support").val(),
                empSpecSupp             : $(".emp_specSupp").val(),
                empHealth               : $(".emp_health").val(),
                empExplainHealth        : $(".emp_explainHealth").val(),
                empSkills               : $(".emp_skills").val(),
                empOtherSource          : $(".emp_otherSource").val(),
                empTreatment            : $(".emp_treatment").val(),
                empHosName              : $(".emp_hosName").val(),
                empDateHos              : $(".emp_dateHos").val(),
                empUseDrug              : $(".emp_useDrug").val(),
                empExplainDrug          : $(".emp_explainDrug").val(),


            }

            console.log(employmentHistory)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(employmentHistory),
            "type"                      : "employmentHistory",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_environmental_factor?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })


        __executeExternalGet('8000/worksheet/getPetitioner/employmentHistory/'+client_id).done(function (result) {
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

                    var empHis = JSON.parse(result.jsonData);

                    $(".emp_status").val(JSON.parse(result.jsonData).empStatus).trigger("change");
                    $(".emp_specStatus").val(JSON.parse(result.jsonData).empSpecSupp);
                    $(".emp_support").val(JSON.parse(result.jsonData).empSupport).trigger("change");
                    $(".emp_specSupp").val(JSON.parse(result.jsonData).empSpecSupp);
                    $(".emp_skills").val(JSON.parse(result.jsonData).empSkills);
                    $(".emp_otherSource").val(JSON.parse(result.jsonData).empOtherSource);
                    $(".emp_treatment").val(JSON.parse(result.jsonData).empTreatment).trigger("change");
                    $(".emp_health").val(JSON.parse(result.jsonData).empHealth).trigger("change");
                    $(".emp_explainHealth").val(JSON.parse(result.jsonData).empExplainHealth);
                    $(".emp_hosName").val(JSON.parse(result.jsonData).empHosName);
                    $(".emp_dateHos").val(JSON.parse(result.jsonData).empDateHos);
                    $(".emp_useDrug").val(JSON.parse(result.jsonData).empUseDrug).trigger("change");
                    $(".emp_explainDrug").val(JSON.parse(result.jsonData).empExplainDrug);




                empHis.empHistory.forEach(function(data){
                    console.log(data)

                    $(".emp_history").append(`
                        <div class="emp_his">
                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Job Held</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control job_held" value="${data.job_held}"></div>
                            </div>

                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employer Address</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_add" value="${data.emp_add}"></div>
                            </div>

                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateFrom" value="${data.emp_dateFrom}"></div>
                            </div>

                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateTo" value="${data.emp_dateTo}"></div>
                            </div>

                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Income</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_Income" value="${data.emp_Income}"></div>
                            </div>
                            <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                        </div>`
                        )
                    });

                    $('.emp_his').on('click', '.remove', function(e) {
                        e.preventDefault();

                        $(this).parent().remove();
                    });


                }else{

                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){

            const empHistory = [];
            const job_held = $(".job_held");
            const emp_add = $(".emp_add");
            const emp_dateFrom = $(".emp_dateFrom");
            const emp_dateTo = $(".emp_dateTo");
            const emp_Income = $(".emp_Income");

            for(var i = 0; i < job_held.length; i++){
                
                const list = {};
                list.job_held = $(job_held[i]).val();
                list.emp_add = $(emp_add[i]).val();
                list.emp_dateFrom = $(emp_dateFrom[i]).val();
                list.emp_dateTo = $(emp_dateTo[i]).val();
                list.emp_Income = $(emp_Income[i]).val();
                empHistory.push(list);
            }


            var employmentHistory = {

                empHistory              : empHistory,
                empStatus               : $(".emp_status").val(),
                empSpecStatus           : $(".emp_specStatus").val(),
                empSupport              : $(".emp_support").val(),
                empSpecSupp             : $(".emp_specSupp").val(),
                empHealth               : $(".emp_health").val(),
                empExplainHealth        : $(".emp_explainHealth").val(),
                empSkills               : $(".emp_skills").val(),
                empOtherSource          : $(".emp_otherSource").val(),
                empTreatment            : $(".emp_treatment").val(),
                empHosName              : $(".emp_hosName").val(),
                empDateHos              : $(".emp_dateHos").val(),
                empUseDrug              : $(".emp_useDrug").val(),
                empExplainDrug          : $(".emp_explainDrug").val(),


            }

            console.log(employmentHistory)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(employmentHistory),
            "type"                      : "employmentHistory",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/updatePetitioner/employmentHistory/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_environmental_factor?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })        


        $(".idenData").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+field_office_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_prior_records?client_id='+client_id+'&field_office_id='+field_office_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_present_offense?client_id='+client_id+'&field_office_id='+field_office_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_family_background?client_id='+client_id+'&field_office_id='+field_office_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_socio_economic?client_id='+client_id+'&field_office_id='+field_office_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_residence_economic?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                });
        });
        $(".spouseChild").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_spouse_children?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                });
        });
        $(".educHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_education_history?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                });
        });
        // $(".empHis").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_employment_history?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".envFac").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_environmental_factor?client_id='+client_id+'&field_office_id='+field_office_id;
                        }, 500);
                });
        });

    } )( jQuery );