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
                        Are you sure you want to proceed to next tab all the changes you've made will lost ? 
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
                                        <a class="nav-link active envFac" href="#">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Neighborhood</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control neighborhood select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="RURAL">Rural</option>
                                            <option value="URBAN">Urban</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Area</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control area select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NON-SLUM AREA">Non-Slum Area</option>
                                            <option value="SLUM-AREA">Slum Area</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Describe</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control neighborhoodDescribe"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Neighborhood Criminality</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control neighCrim select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="HIGH">High</option>
                                            <option value="LOW">Low</option>
                                            <option value="MINIMAL">Minimal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control criminalityExplain"></textarea></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Community Acceptance</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control comAcceptance select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control acceptanceSpecify"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Peer Group Relationship</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control peerRel select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="DESIRABLE">Desirable</option>
                                            <option value="UNDESIRABLE WITH POTENTIAL">Undesirable with Potential for Improvement</option>
                                            <option value="UNDESIRABLE WITH NO POTENTIAL">Undesirable with no Potential for Improvement</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control peerSpecify"></textarea></div>
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
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
            "createdBy"                 : $.cookie("uuid")
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

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/environmentalFactor/'+client_id).done(function (result) {
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
            "createdBy"                 : $.cookie("uuid")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/environmentalFactor/'+client_id,JSON.stringify(payload)).done(function (result) {
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
        // $(".envFac").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_environmental_factor?client_id='+client_id;
        //                 }, 500);
        //         });
        // });

    } )( jQuery );
    </script>

</body>

</html>