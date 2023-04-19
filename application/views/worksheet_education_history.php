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
                            <li class="active">Educational History</li>
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
                                <strong class="card-title">Petitioner's Educational History</strong>
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
                                        <a class="nav-link active educHis" href="#">Education History</a>
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
                                <fieldset class="row form-group col col-md-12">
                                        <legend>Elementary</legend>
                                        <div class="elementary_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control elem_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row form-group col col-md-12">
                                        <legend>Secondary</legend>
                                        <div class="secondary_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control sec_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row form-group col col-md-12">
                                        <legend>College</legend>
                                        <div class="college_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control college_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row form-group col col-md-12">
                                        <legend>Post College</legend>
                                        <div class="pcollege_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control pcollege_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row col form-group col-md-12">
                                        <legend>Vocational</legend>
                                        <div class="vocational_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control voc_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Unschooled</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control unschool select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="LITERATE">Unschooled but Literate</option>
                                            <option value="ILLITERATE">Illiterate</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Conduct in School</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control conduct select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control educExplain"></textarea></div>
                                </div>

                            </div>
                            <div class="card-footer">
                                <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button> -->
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

        var field_office_id = GetURLParameter('field_office_id');
        console.log(field_office_id)
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/educationHistory/'+client_id).done(function (result) {
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

                        // var spouseChild = JSON.parse(result.jsonData);

                        $(".elem_lvl").val(JSON.parse(result.jsonData).elemLevel);
                        $(".elem_where").val(JSON.parse(result.jsonData).elemWhere);
                        $(".elem_high").val(JSON.parse(result.jsonData).elemHigh);
                        $(".elem_award").val(JSON.parse(result.jsonData).elemAward);
                        $(".elem_date").val(JSON.parse(result.jsonData).elemDate);
                        $(".sec_lvl").val(JSON.parse(result.jsonData).secLevel);
                        $(".sec_where").val(JSON.parse(result.jsonData).secWhere);
                        $(".sec_high").val(JSON.parse(result.jsonData).secHigh);
                        $(".sec_award").val(JSON.parse(result.jsonData).secAward);
                        $(".sec_date").val(JSON.parse(result.jsonData).secDate);
                        $(".college_lvl").val(JSON.parse(result.jsonData).collegeLevel);
                        $(".college_where").val(JSON.parse(result.jsonData).collegeWhere);
                        $(".college_high").val(JSON.parse(result.jsonData).collegeHigh);
                        $(".college_award").val(JSON.parse(result.jsonData).collegeAward);
                        $(".college_date").val(JSON.parse(result.jsonData).collegeDate);
                        $(".pcollege_lvl").val(JSON.parse(result.jsonData).pcollegeLevel);
                        $(".pcollege_where").val(JSON.parse(result.jsonData).pcollegeWhere);
                        $(".pcollege_high").val(JSON.parse(result.jsonData).pcollegeHigh);
                        $(".pcollege_award").val(JSON.parse(result.jsonData).pcollegeAward);
                        $(".pcollege_date").val(JSON.parse(result.jsonData).pcollegeDate);
                        $(".voc_lvl").val(JSON.parse(result.jsonData).vocLevel);
                        $(".voc_where").val(JSON.parse(result.jsonData).vocWhere);
                        $(".voc_high").val(JSON.parse(result.jsonData).vocHigh);
                        $(".voc_award").val(JSON.parse(result.jsonData).vocAward);
                        $(".voc_date").val(JSON.parse(result.jsonData).vocDate);
                        $(".unschool").val(JSON.parse(result.jsonData).unschool).trigger("change");
                        $(".educExplain").val(JSON.parse(result.jsonData).educExplain);  
                        $(".conduct").val(JSON.parse(result.jsonData).conduct).trigger("change");

                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
            })

        $(".btn-next").unbind("click").on("click", function(){

            var educHistory = {

                elemLevel               : $(".elem_lvl").val(),
                elemWhere               : $(".elem_where").val(),
                elemHigh                : $(".elem_high").val(),
                elemAward              : $(".elem_award").val(),
                elemDate               : $(".elem_date").val(),
                secLevel               : $(".sec_lvl").val(),
                secWhere               : $(".sec_where").val(),
                secHigh                : $(".sec_high").val(),
                secAward              : $(".sec_award").val(),
                secDate               : $(".sec_date").val(),
                collegeLevel               : $(".college_lvl").val(),
                collegeWhere               : $(".college_where").val(),
                collegeHigh                : $(".college_high").val(),
                collegeAward              : $(".college_award").val(),
                collegeDate               : $(".college_date").val(),
                pcollegeLevel               : $(".pcollege_lvl").val(),
                pcollegeWhere               : $(".pcollege_where").val(),
                pcollegeHigh                : $(".pcollege_high").val(),
                pcollegeAward              : $(".pcollege_award").val(),
                pcollegeDate               : $(".pcollege_date").val(),
                vocLevel               : $(".voc_lvl").val(),
                vocWhere               : $(".voc_where").val(),
                vocHigh                : $(".voc_high").val(),
                vocAward              : $(".voc_award").val(),
                vocDate               : $(".voc_date").val(),
                unschool                : $(".unschool").val(),
                educExplain              : $(".educExplain").val(),
                conduct               : $(".conduct").val()



            }

            console.log(educHistory)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(educHistory),
            "type"                      : "educationHistory",
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
                            window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_employment_history?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })


        $(".btn-update").unbind("click").on("click", function(){

            var educHistory = {

                elemLevel               : $(".elem_lvl").val(),
                elemWhere               : $(".elem_where").val(),
                elemHigh                : $(".elem_high").val(),
                elemAward              : $(".elem_award").val(),
                elemDate               : $(".elem_date").val(),
                secLevel               : $(".sec_lvl").val(),
                secWhere               : $(".sec_where").val(),
                secHigh                : $(".sec_high").val(),
                secAward              : $(".sec_award").val(),
                secDate               : $(".sec_date").val(),
                collegeLevel               : $(".college_lvl").val(),
                collegeWhere               : $(".college_where").val(),
                collegeHigh                : $(".college_high").val(),
                collegeAward              : $(".college_award").val(),
                collegeDate               : $(".college_date").val(),
                pcollegeLevel               : $(".pcollege_lvl").val(),
                pcollegeWhere               : $(".pcollege_where").val(),
                pcollegeHigh                : $(".pcollege_high").val(),
                pcollegeAward              : $(".pcollege_award").val(),
                pcollegeDate               : $(".pcollege_date").val(),
                vocLevel               : $(".voc_lvl").val(),
                vocWhere               : $(".voc_where").val(),
                vocHigh                : $(".voc_high").val(),
                vocAward              : $(".voc_award").val(),
                vocDate               : $(".voc_date").val(),
                unschool                : $(".unschool").val(),
                educExplain              : $(".educExplain").val(),
                conduct               : $(".conduct").val()



            }

            console.log(educHistory)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(educHistory),
            "type"                      : "educationHistory",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/educationHistory/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_employment_history?client_id='+client_id
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
                            window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_family_background?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id=';
                        }, 500);
                });
        });
        // $(".educHis").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".empHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_employment_history?client_id=';
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
                            window.location.href = 'http://localhost/pis/worksheet_environmental_factor?client_id=';
                        }, 500);
                });
        });

    } )( jQuery );
    </script>

</body>

</html>