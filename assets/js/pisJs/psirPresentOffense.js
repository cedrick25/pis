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


        // $(".btn-next").unbind("click").on("click", function(){
        //     window.location.href = 'http://localhost/pis/psir_prior_records?client_id='+client_id;
        // })

        $(".btn-next").unbind("click").on("click", function(){

            var presentOffense = {
                chargedWith                 : $(".charged").val(),
                commisionPlace              : $(".p_commision").val(),
                convictedOf                 : $(".convicted").val(),
                dateCharged                 : $(".date_charged").val(),
                dateCommitted               : $(".date_commited").val(),
                dateConvicted               : $(".date_convicted").val(),
                sentenceYear                : $(".s_yr").val(),
                sentenceMonth               : $(".s_mo").val(),
                sentenceDay                 : $(".s_day").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                arrestingOfficer            : $(".arresting").val(),
                firstAddress                : $(".address_1").val(),
                defenseCounsel              : $(".defense").val(),
                secondAddress               : $(".address_2").val(),
                prosecutor                  : $(".prosecutor").val(),
                thirdAddress                : $(".address_3").val(),
                offended                    : $(".offended").val(),
                fourthAddress               : $(".address_4").val(),
                coAccused                   : $(".ca").val(),
                aggravatingCirsumstances    : $(".ac").val(),
                mitigatingCircumstances     : $(".mc").val(),
                extentParticipation         : $(".ep").val(),
                custody                     : $(".custody").val(),
                mannerofCommision           : $(".commision").val(),
                motives                     : $(".motives").val(),
                explain                     : $(".explain").val(),
            }

            console.log(presentOffense)


            
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(presentOffense),
            "type"                      : "psirPresentOffense",
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
                            window.location.href = 'http://localhost/pis/psir_prior_records?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        $(".btn-update").unbind("click").on("click", function(){

            var presentOffense = {
                chargedWith                 : $(".charged").val(),
                commisionPlace              : $(".p_commision").val(),
                convictedOf                 : $(".convicted").val(),
                dateCharged                 : $(".date_charged").val(),
                dateCommitted               : $(".date_commited").val(),
                dateConvicted               : $(".date_convicted").val(),
                sentenceYear                : $(".s_yr").val(),
                sentenceMonth               : $(".s_mo").val(),
                sentenceDay                 : $(".s_day").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                arrestingOfficer            : $(".arresting").val(),
                firstAddress                : $(".address_1").val(),
                defenseCounsel              : $(".defense").val(),
                secondAddress               : $(".address_2").val(),
                prosecutor                  : $(".prosecutor").val(),
                thirdAddress                : $(".address_3").val(),
                offended                    : $(".offended").val(),
                fourthAddress               : $(".address_4").val(),
                coAccused                   : $(".ca").val(),
                aggravatingCirsumstances    : $(".ac").val(),
                mitigatingCircumstances     : $(".mc").val(),
                extentParticipation         : $(".ep").val(),
                custody                     : $(".custody").val(),
                mannerofCommision           : $(".commision").val(),
                motives                     : $(".motives").val(),
                explain                     : $(".explain").val(),
            }

            console.log(presentOffense)


            
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(presentOffense),
            "type"                      : "psirPresentOffense",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)

            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/psirPresentOffense/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_prior_records?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })



        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });


        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/presentOffense/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirPresentOffense/'+client_id).done(function (result) {

                            var result = result.response;

                            console.log(result)

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


                    JSON.parse(result.jsonData)

                    console.log(JSON.parse(result.jsonData))

                    $(".charged").val(JSON.parse(result.jsonData).chargedWith);
                    $(".p_commision").val(JSON.parse(result.jsonData).commisionPlace);
                    $(".convicted").val(JSON.parse(result.jsonData).convictedOf);
                    $(".date_charged").val(JSON.parse(result.jsonData).dateCharged);
                    $(".date_commited").val(JSON.parse(result.jsonData).dateCommitted);
                    $(".date_convicted").val(JSON.parse(result.jsonData).dateConvicted);
                    $(".s_yr").val(JSON.parse(result.jsonData).sentenceYear);
                    $(".s_mo").val(JSON.parse(result.jsonData).sentenceMonth);
                    $(".s_day").val(JSON.parse(result.jsonData).sentenceDay);
                    $(".judge").val(JSON.parse(result.jsonData).judge);
                    $(".court").val(JSON.parse(result.jsonData).court);
                    $(".arresting").val(JSON.parse(result.jsonData).arrestingOfficer);
                    $(".address_1").val(JSON.parse(result.jsonData).firstAddress);
                    $(".defense").val(JSON.parse(result.jsonData).defenseCounsel);
                    $(".address_2").val(JSON.parse(result.jsonData).secondAddress);
                    $(".prosecutor").val(JSON.parse(result.jsonData).prosecutor);
                    $(".address_3").val(JSON.parse(result.jsonData).thirdAddress);
                    $(".offended").val(JSON.parse(result.jsonData).offended);
                    $(".address_4").val(JSON.parse(result.jsonData).fourthAddress);
                    $(".ca").val(JSON.parse(result.jsonData).coAccused);
                    $(".ac").val(JSON.parse(result.jsonData).aggravatingCirsumstances);
                    $(".mc").val(JSON.parse(result.jsonData).mitigatingCircumstances);
                    $(".ep").val(JSON.parse(result.jsonData).extentParticipation).trigger("change");
                    $(".custody").val(JSON.parse(result.jsonData).custody).trigger("change");
                    $(".commision").val(JSON.parse(result.jsonData).mannerofCommision);
                    $(".motives").val(JSON.parse(result.jsonData).motives).trigger("change");
                    $(".explain").val(JSON.parse(result.jsonData).explain);

                }else{
                    $(".btn-update").hide();
                    $(".btn-next").show();
                } 

            }
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
        // $(".presOff").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/psir_present_offense?client_id='+client_id;
        //                 }, 500);
        //         });
        // });

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
        $(".resEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_residence_economic?client_id='+client_id;
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