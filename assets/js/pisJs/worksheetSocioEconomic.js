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


        $(".btn-next").unbind("click").on("click", function(){

            // const siblings = [];
            // const sibling_name = $(".sibling_name");
            // const relationship = $(".relationship");
            // const age = $(".age");
            // const sibling_sex = $(".sibling_sex");
            // const sibling_education = $(".sibling_education");
            // const sibling_occupation = $(".sibling_occupation");

            // for(var i = 0; i < sibling_name.length; i++){
                
            //     const list = {};
            //     list.sibling_name = $(sibling_name[i]).val();
            //     list.relationship = $(relationship[i]).val();
            //     list.age = $(age[i]).val();
            //     list.sibling_sex = $(sibling_sex[i]).val();
            //     list.sibling_education = $(sibling_education[i]).val();
            //     list.sibling_occupation = $(sibling_occupation[i]).val();
            //     siblings.push(list);
            // }


            var socioEco = {

                family_rel          : $(".family_rel").val(),
                family_rep          : $(".family_rep").val(),
                home_cond           : $(".home_cond").val(),
                fam_prob            : $(".fam_prob").val(),
                eco_status          : $(".eco_status").val(),
                stability           : $(".stability").val(),
                comments            : $(".comments").val(),
                circumstances       : $(".circumstances").val(),
                explain             : $(".explain").val(),

            }

            // console.log(socioEco)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(socioEco),
            "type"                      : "socioEconomic",
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
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/socioEconomic/'+client_id).done(function (result) {
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

                        $(".family_rel").val(JSON.parse(result.jsonData).family_rel).trigger("change");
                        $(".family_rep").val(JSON.parse(result.jsonData).family_rep).trigger("change");
                        $(".home_cond").val(JSON.parse(result.jsonData).home_cond).trigger("change");
                        $(".fam_prob").val(JSON.parse(result.jsonData).fam_prob).trigger("change");
                        $(".eco_status").val(JSON.parse(result.jsonData).eco_status).trigger("change");
                        $(".stability").val(JSON.parse(result.jsonData).stability).trigger("change");
                        $(".comments").val(JSON.parse(result.jsonData).comments);
                        $(".circumstances").val(JSON.parse(result.jsonData).circumstances).trigger("change");
                        $(".explain").val(JSON.parse(result.jsonData).explain);

                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
            })

        $(".btn-update").unbind("click").on("click", function(){

            // const siblings = [];
            // const sibling_name = $(".sibling_name");
            // const relationship = $(".relationship");
            // const age = $(".age");
            // const sibling_sex = $(".sibling_sex");
            // const sibling_education = $(".sibling_education");
            // const sibling_occupation = $(".sibling_occupation");

            // for(var i = 0; i < sibling_name.length; i++){
                
            //     const list = {};
            //     list.sibling_name = $(sibling_name[i]).val();
            //     list.relationship = $(relationship[i]).val();
            //     list.age = $(age[i]).val();
            //     list.sibling_sex = $(sibling_sex[i]).val();
            //     list.sibling_education = $(sibling_education[i]).val();
            //     list.sibling_occupation = $(sibling_occupation[i]).val();
            //     siblings.push(list);
            // }


            var socioEco = {

                family_rel          : $(".family_rel").val(),
                family_rep          : $(".family_rep").val(),
                home_cond           : $(".home_cond").val(),
                fam_prob            : $(".fam_prob").val(),
                eco_status          : $(".eco_status").val(),
                stability           : $(".stability").val(),
                comments            : $(".comments").val(),
                circumstances       : $(".circumstances").val(),
                explain             : $(".explain").val(),

            }

            // console.log(socioEco)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(socioEco),
            "type"                      : "socioEconomic",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/updatePetitioner/socioEconomic/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id='+client_id;
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
        // $(".socioEco").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
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
        $(".spouseChild").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id='+client_id;
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