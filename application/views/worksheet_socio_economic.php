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
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Socio-Economic Background</li>
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
                                <strong class="card-title">Socio-Economic Background</strong>
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
                                        <a class="nav-link  famBg" href="#" data-toggle="modal" data-target="#warningModal">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active socioEco" href="#">Socio-Economic Background</a>
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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Relationship</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control family_rel select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Reputation in Community</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control family_rep select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control home_cond select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control fam_prob"></div>
                                </div> -->
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control fam_prob select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="ECONOMIC">Economic</option>
                                            <option value="HUSBAND-WIFE_CONFLICT">Husband-wife conflict</option>
                                            <option value="MARITAL_PROBLEM">Marital problem</option>
                                            <option value="MENTAL_ILLNESS">Mental illness</option>
                                            <option value="ONE-PARENT FAMILY">One-parent family</option>
                                            <option value="PARENT-CHILD CONFLICT">Parent-child conflict</option>
                                            <option value="PHYSICAL_ILLNESS">Physical illness</option>
                                            <option value="SIBLING_CONFLICT">Sibling conflict</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="NO_APPARENT_PROBLEM">No apparent problem</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Economic Status</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control eco_status select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="POOR">Poor (Less than 7,890/mo)</option>
                                            <option value="LOW INCOME">Low Income (Php 7,890-15,780/mo)</option>
                                            <option value="LOWER MIDDLE INCOME">Lower Middle Income (Php 15,780-31,560/mo)</option>
                                            <option value="MIDDLE CLASS">Middle Class (Php 31,560-78,900/mo)</option>
                                            <option value="UPPER MIDDLE CLASS">Upper Middle Class (Php 78,900-118,350/mo)</option>
                                            <option value="UPPER INCOME">Upper Income (Php 118,350-157,800/mo)</option>
                                            <option value="RICH">Rich (at least Php 157,800/mo)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control stability select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FREQUENT CHANGE">Frequent Change</option>
                                            <option value="NO STABILITY">No Stability</option>
                                            <option value="OCCASIONAL CHANGE">Occasional Change</option>
                                            <option value="STABLE">Stable</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Comments</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control comments"></textarea></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Childhood Circumstances</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control circumstances select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="SAD">Sad</option>
                                            <option value="HAPPY">Happy</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control explain"></textarea></div>
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
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/socioEconomic/'+client_id).done(function (result) {
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
            "createdBy"                 : $.cookie("uuid")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/socioEconomic/'+client_id,JSON.stringify(payload)).done(function (result) {
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
    </script>

</body>

</html>