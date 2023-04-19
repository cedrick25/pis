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
                                    <li class="nav-item">
                                        <a class="nav-link eval" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link rec active" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <fieldset class="row col col-md-12">
                                    <legend>Recommendation</legend>
                                    <div class="recommendation">      
                                    </div>
                                </fieldset>
                                <fieldset class="row col col-md-12">
                                    <legend>Recommendation</legend>
                                    <div class="row form-group col-md-12">
                                        <div class="col col-md-5"><label for="text-input" class=" form-control-label">1. Probationers shall report initially to the Chief Probation and Parole Officer at:</label></div>
                                        <div class="col-12 col-md-3"><select class="form-control reportOffice select2"></select></div>
                                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Within seventy-two (72) hours from the receipt of the Order Granting Probation</label></div>
                                    </div>
                                    <div class="row form-group col-md-12">
                                        <div class="col col-md-12"><label for="text-input" class=" form-control-label">2. He/She Shall, thereafter, report to his supervising Probation and Parole Officer unless otherwise modified by the Chief Probation and Parole Officer </label></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">More Recommendations</label></div>
                                    </div>
                                    <div class="addRec">
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="addMoreRec btn btn-success btn-sm float-right">Add more</button>
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
        
        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirIdentifyingData/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                var data = JSON.parse(result.jsonData);

                $(".recommendation").append(`
                    <div class="recommendationPara">
                        <div class="col-12">
                            <p align="center">WHEREFORE, in view of the foregoing, it is respectfully recommended to the honorable Court that the petition for probation of ${data.name} to/be <select class="grant col-2 col-sm-2 select2 ">
                                                                <option value="GRANTED">Granted</option>
                                                                <option value="DENIED">Denied</option>
                                                                </select>
                                for a period of:
                            <div class="col-12" align="center">
                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Period of Supervision</label></div>
                            <div class="col-2 col-md-3"><input type="text" class="form-control supYear" placeholder="Year/s"></div>
                            <div class="col-2 col-md-3"><input type="text" class="form-control supMonth" placeholder="Month/s"></div>
                            <div class="col-2 col-md-3"><input type="text" class="form-control supDay" placeholder="Day/s"></div>
                            </p>
                            
                            <div>

                        </div>
                        <div class="col-12">
                            <p align="center"> <br> to be counted from the Probationer's initial report for supervision and subject to the following conditions: 
                            </p>
                        </div>
                    </div>`
                )
            }
        })

        $(".addMoreRec").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".addRec").append(`
            <div class="addRecommendation">
                <div class="row form-group col-md-9">
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control rec"></textarea></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>
                `
            )
        });

        $('.addRec').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });


        $(".btn-next").unbind("click").on("click", function(){

            const recommendations = [];
            const rec = $(".rec");


            for(var i = 0; i < rec.length; i++){
                
                const list = {};
                list.rec = $(rec[i]).val();
                recommendations.push(list);
            }


            var psirRecommendation = {

                recommendations         : recommendations,
                grant                   : $(".grant").val(),
                supYear                 : $(".supYear").val(),
                supMonth                : $(".supMonth").val(),
                supDay                  : $(".supDay").val(),
                reportOffice            : $(".reportOffice").val(),

            }

            // console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(psirRecommendation),
            "type"                      : "psirRecommendation",
            "worksheetStatus"           : "COMPLETED",
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
                            window.location.href = 'http://localhost/pis/client_list';
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        $(".btn-update").unbind("click").on("click", function(){

            const recommendations = [];
            const rec = $(".rec");


            for(var i = 0; i < rec.length; i++){
                
                const list = {};
                list.rec = $(rec[i]).val();
                recommendations.push(list);
            }


            var psirRecommendations = {

                recommendations         : recommendations,
                grant                   : $(".grant").val(),
                supYear                 : $(".supYear").val(),
                supMonth                : $(".supMonth").val(),
                supDay                  : $(".supDay").val(),
                reportOffice            : $(".reportOffice").val(),

            }

            // console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(psirRecommendations),
            "type"                      : "psirRecommendation",
            "worksheetStatus"           : "COMPLETED",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/psirRecommendation/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/client_list';
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirRecommendation/'+client_id).done(function (result) {
            console.log("==========")
            console.log(result)
            console.log("==========")

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "COMPLETED"){

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    var datarec = JSON.parse(result.jsonData);

                    $(".grant").val(JSON.parse(result.jsonData).grant).trigger("change");
                    $(".supYear").val(JSON.parse(result.jsonData).supYear);
                    $(".supMonth").val(JSON.parse(result.jsonData).supMonth);
                    $(".supDay").val(JSON.parse(result.jsonData).supDay);
                    $(".reportOffice").val(JSON.parse(result.jsonData).reportOffice).trigger("change");

                    datarec.recommendations.forEach(function(data){
                        console.log(data);
                        $(".addRec").append(`
                            <div class="addRecommendation">
                                <div class="row form-group col-md-9">
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control rec" value="${data.rec}">${data.rec}</textarea></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>
                        `
                        )
                    });
                }else{
                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        var __select = function(){
            $('.reportOffice').empty();
            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.reportOffice').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.reportOffice').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    setTimeout(function () {
                        $(".reportOffice").val($.cookie("field_office_id")).trigger("change");
                    }, 2000);
                    
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

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
        // $(".rec").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/psir_recommendation?client_id='+client_id;
        //                 }, 500);
        //         });
        // });

    } )( jQuery );
    </script>

</body>

</html>