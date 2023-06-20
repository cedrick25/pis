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
       
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });


        $(".btn-next").unbind("click").on("click", function(){

            var envFactor = {

                neighborhood            : $(".neighborhood").val(),
                neighborhoodDescribe    : $(".neighborhoodDescribe").val(),
                neighCrim               : $(".neighCrim").val(),
                criminalityExplain      : $(".criminalityExplain").val(),
                comAcceptance           : $(".comAcceptance").val(),
                acceptanceSpecify       : $(".acceptanceSpecify").val(),
                peerRel                 : $(".peerRel").val(),
                peerSpecify             : $(".peerSpecify").val(),
                area                    : $(".area").val()

            }

            console.log(envFactor)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(envFactor),
            "type"                      : "environmentalFactor",
            "worksheetStatus"           : "COMPLETED",
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/client_list';
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/environmentalFactor/'+client_id).done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")

                var result = result.response;

                if (result.status != "ERROR") {

                    if (result.worksheetStatus == "COMPLETED"){

                        $(".btn-update").show();
                        $(".btn-next").hide();

                        JSON.parse(result.jsonData)

                        console.log(JSON.parse(result.jsonData))

                        // var spouseChild = JSON.parse(result.jsonData);

                        $(".neighborhood").val(JSON.parse(result.jsonData).neighborhood).trigger("change");
                        $(".area").val(JSON.parse(result.jsonData).area).trigger("change");
                        $(".neighborhoodDescribe").val(JSON.parse(result.jsonData).neighborhoodDescribe);
                        $(".neighCrim").val(JSON.parse(result.jsonData).neighCrim).trigger("change");
                        $(".criminalityExplain").val(JSON.parse(result.jsonData).criminalityExplain);
                        $(".comAcceptance").val(JSON.parse(result.jsonData).comAcceptance).trigger("change");
                        $(".acceptanceSpecify").val(JSON.parse(result.jsonData).acceptanceSpecify);
                        $(".peerRel").val(JSON.parse(result.jsonData).peerRel).trigger("change");
                        $(".peerSpecify").val(JSON.parse(result.jsonData).peerSpecify);

                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
        })

        $(".btn-update").unbind("click").on("click", function(){

            var envFactor = {

                neighborhood            : $(".neighborhood").val(),
                neighborhoodDescribe    : $(".neighborhoodDescribe").val(),
                neighCrim               : $(".neighCrim").val(),
                criminalityExplain      : $(".criminalityExplain").val(),
                comAcceptance           : $(".comAcceptance").val(),
                acceptanceSpecify       : $(".acceptanceSpecify").val(),
                peerRel                 : $(".peerRel").val(),
                peerSpecify             : $(".peerSpecify").val(),
                area                    : $(".area").val()

            }

            console.log(envFactor)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(envFactor),
            "type"                      : "environmentalFactor",
            "worksheetStatus"           : "COMPLETED",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/updatePetitioner/environmentalFactor/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/client_list';
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_prior_records?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_present_offense?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_family_background?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_socio_economic?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_residence_economic?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_spouse_children?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_education_history?client_id='+client_id;
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
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_employment_history?client_id='+client_id;
                        }, 500);
                });
        });
        // $(".envFac").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_environmental_factor?client_id='+client_id;
        //                 }, 500);
        //         });
        // });

    } )( jQuery );