<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <div class="modal fade" id="warningModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Proceed ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_inv" style="display:none">
                    <i class="fa fa-check"></i>
                        Proceeded Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Proceed to the select tab ? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_warning btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list">Client</a></li>
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Environmental Factors</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Community Background/Environmental Factors</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link idenData" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link presOff" href="#" data-toggle="modal" data-target="#warningModal">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link priorRec" href="#" data-toggle="modal" data-target="#warningModal">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link famBg" href="#" data-toggle="modal" data-target="#warningModal">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socioEco" href="#" data-toggle="modal" data-target="#warningModal">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link resEco" href="#" data-toggle="modal" data-target="#warningModal">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouseChild" href="#" data-toggle="modal" data-target="#warningModal">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link educHis" href="#" data-toggle="modal" data-target="#warningModal">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link empHis" href="#" data-toggle="modal" data-target="#warningModal">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link envFac" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link medHistory" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link eval active" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link rec" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
<!--                                 <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Neighborhood</label></div>
                                    <div class="col-12 col-md-6">
                                        <select class="form-control neighborhood select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="RURAL">Rural</option>
                                            <option value="URBAN">Urban</option>
                                        </select>
                                    </div>
                                </div> -->
<!--                                 <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Area</label></div>
                                    <div class="col-12 col-md-6">
                                        <select class="form-control area select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NON-SLUM AREA">Non-Slum Area</option>
                                            <option value="SLUM-AREA">Slum Area</option>
                                        </select>
                                    </div>
                                </div> -->
                                <fieldset class="row col col-md-12">
                                    <legend>Petitioners Traits</legend>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Positive</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control positiveTraits"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Negative</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control negativeTraits"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Overall Impression of the Client</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control overallTraits"></textarea></div>
                                    </div>
                                </fieldset>
                                <fieldset class="row col col-md-12">
                                    <legend>Petitioner's Background in the Community & Collateral Information</legend>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">PETITIONER'S BACKGROUND IN THE COMMUNITY & COLLATERAL INFORMATION</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="4" cols="50" class="form-control communityBackground"></textarea></div>
                                    </div>
                                    <div class="collateralInfo">
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="addMoreCollInfo btn btn-success btn-sm float-right">Add more</button>
                                    </div>
                                </fieldset>
                                <fieldset class="row col col-md-12">
                                    <legend>Analysis and Evaluation</legend>
<!--                                     <legend>Petitioner's Background in the Community & Collateral Information</legend>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">PETITIONER'S BACKGROUND IN THE COMMUNITY & COLLATERAL INFORMATION</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="4" cols="50" class="form-control communityBackground"></textarea></div>
                                    </div> -->
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Analysis and Evaluation</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control analysisAndEvaluation"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Projected Thrust of Rehabilitation</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control projectedThrust"></textarea></div>
                                    </div>
                                </fieldset>                               
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-success btn-next btn-sm" style="display: none">Next</button>
                                <button type="button" class="btn btn-success btn-update btn-sm" style="display: none">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script type="text/javascript">
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
       
        $(".addMoreCollInfo").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".collateralInfo").append(`
            <div class="collateralInformation">
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Source Of Information</label></div>
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collInfo"></textarea></div>
                </div>
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Relationship to Client</label></div>
                    <div class="col-12 col-md-5"><input type="text" name="text-input" placeholder=" " class="form-control relClient"></div>
                </div>
                <div class="row form-group col-md-9">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Information Gathered</label></div>
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collGathered"></textarea></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.collateralInfo').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });


        $(".btn-next").unbind("click").on("click", function(){

            const collateralInfo = [];
            const collInfo = $(".collInfo");
            const relClient = $(".relClient");
            const collGathered = $(".collGathered");

            for(var i = 0; i < collInfo.length; i++){
                
                const list = {};
                list.collInfo = $(collInfo[i]).val();
                list.relClient = $(relClient[i]).val();
                list.collGathered = $(collGathered[i]).val();
                collateralInfo.push(list);
            }


            var evaluation = {

                collateralInfo          : collateralInfo,
                positiveTraits          : $(".positiveTraits").val(),
                negativeTraits          : $(".negativeTraits").val(),
                overallTraits           : $(".overallTraits").val(),
                analysisAndEvaluation   : $(".analysisAndEvaluation").val(),
                projectedThrust         : $(".projectedThrust").val(),
                communityBackground     : $(".communityBackground").val(),
            }

            // console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(evaluation),
            "type"                      : "psirEvaluation",
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
                            window.location.href = 'http://localhost/pis/psir_recommendation?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        $(".btn-update").unbind("click").on("click", function(){

            const collateralInfo = [];
            const collInfo = $(".collInfo");
            const relClient = $(".relClient");
            const collGathered = $(".collGathered");

            for(var i = 0; i < collInfo.length; i++){
                
                const list = {};
                list.collInfo = $(collInfo[i]).val();
                list.relClient = $(relClient[i]).val();
                list.collGathered = $(collGathered[i]).val();
                collateralInfo.push(list);
            }


            var evaluation = {

                collateralInfo          : collateralInfo,
                positiveTraits          : $(".positiveTraits").val(),
                negativeTraits          : $(".negativeTraits").val(),
                overallTraits           : $(".overallTraits").val(),
                analysisAndEvaluation   : $(".analysisAndEvaluation").val(),
                projectedThrust         : $(".projectedThrust").val(),
                communityBackground     : $(".communityBackground").val(),
            }

            // console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(evaluation),
            "type"                      : "psirEvaluation",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/psirEvaluation/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/psir_recommendation?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirEvaluation/'+client_id).done(function (result) {
            console.log("==========")
            console.log(result)
            console.log("==========")

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    console.log(JSON.parse(result.jsonData))

                    var evaluation = JSON.parse(result.jsonData);



                    $(".positiveTraits").val(JSON.parse(result.jsonData).positiveTraits);
                    $(".negativeTraits").val(JSON.parse(result.jsonData).negativeTraits);
                    $(".overallTraits").val(JSON.parse(result.jsonData).overallTraits);
                    $(".analysisAndEvaluation").val(JSON.parse(result.jsonData).analysisAndEvaluation);
                    $(".projectedThrust").val(JSON.parse(result.jsonData).projectedThrust);
                    $(".communityBackground").val(JSON.parse(result.jsonData).communityBackground);

                    evaluation.collateralInfo.forEach(function(data){
                        console.log(data);
                        $(".collateralInfo").append(`
                            <div class="collateralInfo">
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Source Of Information</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collInfo" value="${data.collInfo}">${data.collInfo}</textarea></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Relationship to Client</label></div>
                                    <div class="col-12 col-md-5"><input type="text" name="text-input" placeholder=" " class="form-control relClient" value="${data.relClient}"></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Collateral Information Gathered</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control collGathered" value="${data.collGathered}">${data.collGathered}</textarea></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>
                        `
                        )
                        // setTimeout(function () {
                        // $(".sibling_sex").val(data.sibling_sex).trigger("change");
                        // }, 500);
                        // setTimeout(function () {
                        // $(".sibling_education").val(data.sibling_education).trigger("change");
                        // }, 500);
                    });
                }else{
                    $(".btn-next").show();
                    $(".btn-update").hide();
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
        // $(".eval").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/psir_education_history?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
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
    </script>

</body>

</html>