<?php $this->load->view('templates/header.php'); ?> 

<body>


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
    <!-- Left Panel -->

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
                            <li><a href="">Worksheet</a></li>
                            <li class="active">Petitioner's Criminal History</li>
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
                                <strong class="card-title">Present Offense</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link idenData" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active presOff" href="#">Present Offense</a>
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
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Charged With</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control charged"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Place of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control p_commision"></div>
                                    <!-- <div class="col-12 col-md-9"><input type="date" class="form-control date_cic"></div> -->
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control convicted"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Charged</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_charged"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Commited</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_commited"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Convicted</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_convicted"></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Year" class="form-control s_yr"></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Month" class="form-control s_mo"></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Day" class="form-control s_day"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Judge</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control judge"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control court"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Arresting Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control arresting"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_1"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Defense Counsel</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control defense"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_2"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prosecutor</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control prosecutor"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_3"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offended Party</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control offended"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_4"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Co-Accused</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ca"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Aggravating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ac"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Mitigating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control mc"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Participation</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control ep"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Custody</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control custody"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manner of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control commision"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Motives</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control motives"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control explain"></div>
                                </div>
                            </div>
                            <div class="card-footer">
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
            "type"                      : "presentOffense",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
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
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })


        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });


        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/presentOffense/'+client_id).done(function (result) {
            console.log("=====identifyingData=====")
            console.log(result)
            console.log("=====identifyingData=====")

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){
                    $(".btn-update").show();
                    $(".btn-next").hide();

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
                    $(".ep").val(JSON.parse(result.jsonData).extentParticipation);
                    $(".custody").val(JSON.parse(result.jsonData).custody);
                    $(".commision").val(JSON.parse(result.jsonData).mannerofCommision);
                    $(".motives").val(JSON.parse(result.jsonData).motives);
                    $(".explain").val(JSON.parse(result.jsonData).explain);

                }else{

                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
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
            "type"                      : "presentOffense",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            }

            console.log(payload)

            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/presentOffense/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id='+client_id;
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
        // $(".presOff").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
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
    </script>

</body>

</html>