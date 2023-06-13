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
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });
       

        // $(".btn-next").unbind("click").on("click", function(){

        //     window.location.href = 'http://localhost/pis/psir_spouse_children?client_id='+client_id;

        // })

        $(".btn-next").unbind("click").on("click", function(){

            const residence = [];
            const resAdd = $(".resAdd");
            const dateFrom = $(".dateFrom");
            const dateTo = $(".dateTo");

            for(var i = 0; i < resAdd.length; i++){
                
                const list = {};
                list.resAdd = $(resAdd[i]).val();
                list.dateFrom = $(dateFrom[i]).val();
                list.dateTo = $(dateTo[i]).val();
                residence.push(list);
            }


            var residenceEco = {

                residence            : residence,
                residenceStability   :  $(".res_stability").val(),
                residenceType        :  $(".residence_type").val(),
                residenceHomeCondition:  $(".res_home_cond").val(),
                fam_status           : $(".fam_status").val(),
                fam_breadwinner      : $(".fam_breadwinner").val(),
                no_dependants        : $(".no_dependants").val(),
                dependants           : $(".dependants").val(),
                maj_fam_prob         : $(".maj_fam_prob").val(),
                fam_comments         : $(".fam_comments").val(),

            }

            console.log(residenceEco)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(residenceEco),
            "type"                      : "psirResidenceEconomic",
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
                            window.location.href = 'http://localhost/pis/psir_spouse_children?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/residenceEconomic/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    __executeExternalGet('8000/worksheet/getPetitioner/psirResidenceEconomic/'+client_id).done(function (result) {

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

                    console.log(JSON.parse(result.jsonData))

                    const residenceList = JSON.parse(result.jsonData)

                    console.log(residenceList)


                    residenceList.residence.forEach(function(data){
                        $(".residence").append(`
                        <div class="res">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control resAdd" disabled>${data.resAdd}</textarea></div>
                            </div>
                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateFrom" value="${data.dateFrom}" disabled></div>
                            </div>
                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateTo" value="${data.dateTo}" disabled></div>
                            </div>
                        </div>`
                        )
                    });

                        $(".res_stability").val(JSON.parse(result.jsonData).residenceStability).trigger("change");
                        $(".res_home_cond").val(JSON.parse(result.jsonData).residenceHomeCondition).trigger("change");
                        $(".residence_type").val(JSON.parse(result.jsonData).residenceType).trigger("change");
                        $(".fam_status").val(JSON.parse(result.jsonData).fam_status).trigger("change");
                        $(".fam_breadwinner").val(JSON.parse(result.jsonData).fam_breadwinner).trigger("change");
                        $(".dependants").val(JSON.parse(result.jsonData).dependants);
                        $(".no_dependants").val(JSON.parse(result.jsonData).no_dependants);
                        $(".fam_comments").val(JSON.parse(result.jsonData).fam_comments);
                        $(".maj_fam_prob").val(JSON.parse(result.jsonData).maj_fam_prob).trigger("change");

                }else{
                    $(".btn-update").hide();
                    $(".btn-next").show();
                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){

            const residence = [];
            const resAdd = $(".resAdd");
            const dateFrom = $(".dateFrom");
            const dateTo = $(".dateTo");

            for(var i = 0; i < resAdd.length; i++){
                
                const list = {};
                list.resAdd = $(resAdd[i]).val();
                list.dateFrom = $(dateFrom[i]).val();
                list.dateTo = $(dateTo[i]).val();
                residence.push(list);
            }


            var residenceEco = {

                residence            : residence,
                residenceStability   :  $(".res_stability").val(),
                residenceType        :  $(".residence_type").val(),
                residenceHomeCondition:  $(".res_home_cond").val(),
                fam_status           : $(".fam_status").val(),
                fam_breadwinner      : $(".fam_breadwinner").val(),
                no_dependants        : $(".no_dependants").val(),
                dependants           : $(".dependants").val(),
                maj_fam_prob         : $(".maj_fam_prob").val(),
                fam_comments         : $(".fam_comments").val(),

            }

            console.log(residenceEco)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(residenceEco),
            "type"                      : "psirResidenceEconomic",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/updatePetitioner/psirResidenceEconomic/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_spouse_children?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_identifying_data?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_prior_records?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_present_offense?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_family_background?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_socio_economic?client_id='+client_id;
                        }, 500);
                });
        });
        // $(".resEco").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/psir_residence_economic?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".spouseChild").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_spouse_children?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_education_history?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_employment_history?client_id='+client_id;
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
                            window.location.href = 'http://localhost/pis/psir_environmental_factor?client_id='+client_id;
                        }, 500);
                });
        });
        $(".eval").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_evaluation?client_id='+client_id;
                        }, 500);
                });
        });
        $(".rec").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_recommendation?client_id='+client_id;
                        }, 500);
                });
        });
        // $(".medhistory").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/psir_med_history?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
    } )( jQuery );