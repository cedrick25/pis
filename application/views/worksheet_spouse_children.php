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
                            <li class="active">Spouse/Children</li>
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
                                <strong class="card-title">Petitioner's Present Situation</strong>
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
                                        <a class="nav-link active spouseChild" href="#">Spouse/Children</a>
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
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                    <div class="col-12 col-md-10">
                                        <select class="form-control civilStatus select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="ANNULLED">Annulled</option>
                                            <option value="DIVORCED">Divorced</option>
                                            <option value="LEGALLY SEPERATED">Legally Seperated</option>
                                            <option value="MARRIED">Married</option>
                                            <option value="SAME SEX RELATIONSHIP">Same Sex Relationship</option>
                                            <option value="SINGLE">Single</option>
                                            <option value="SOLO PARENT">Solo Parent</option>
                                            <option value="WIDOW/WIDOWER">Widow/Widower</option>
                                            <option value="WITH COMMON-LAW SPOUSE">With Common-Law Spouse</option>
                                        </select>
                                    </div>
                                </div>

                                <fieldset class="row col col-md-12">
                                        <legend>SPOUSE</legend>
                                        <div class="spouse">
                                        </div>
                                        <div class="col-12">
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control spouse_fname"></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control spouse_mname"></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control spouse_lname"></div>
                                                <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Extended Name" class="form-control spouse_ename"></div>
                                            </div>
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Present Address</label></div>
                                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control pAddress"></textarea></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Region</label></div>
                                                <div class="col-12 col-md-10">
                                                    <select class="form-control spouse_region select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="CAR">CAR</option>
                                                        <option value="NCR">NCR</option>
                                                        <option value="REGION I">REGION I</option>
                                                        <option value="REGION II">REGION II</option>
                                                        <option value="REGION III">REGION III</option>
                                                        <option value="REGION IV-A">REGION IV-A</option>
                                                        <option value="REGION IV-B">REGION IV-B</option>
                                                        <option value="REGION V">REGION V</option>
                                                        <option value="REGION VI">REGION VI</option>
                                                        <option value="REGION VII">REGION VII</option>
                                                        <option value="REGION VIII">REGION VIII</option>
                                                        <option value="REGION IX">REGION IX</option>
                                                        <option value="REGION X">REGION X</option>
                                                        <option value="REGION XI">REGION XI</option>
                                                        <option value="REGION XII">REGION XII</option>
                                                        <option value="REGION XIII">REGION XIII</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                <div class="col-12 col-md-10"><input type="date" class="form-control spouse_bday"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Province</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseProvince"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Work Address</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouse_work_add"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Municipality</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseMunicipality"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Nature of Ceremony</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Ceremony" class="form-control spouse_ceremony"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Birth Place" class="form-control spouse_bplace_others"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Occupation" class="form-control spouse_occupation"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Marriage Date</label></div>
                                                <div class="col-12 col-md-10"><input type="date" class="form-control date_marriage"></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                
                                            </div>
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control spouse_remarks"></textarea></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Spouse Relationship</label></div>
                                                <div class="col-12 col-md-10">
                                                    <select class="form-control spouse_relationship select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="FAIR">Fair</option>
                                                        <option value="POOR">Poor</option>
                                                        <option value="SATISFACTORY">Satisfactory</option>
                                                        <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Children</legend>
                                        <div class="spousechild">
                                        </div>
                                        <div class="col-12">
                                            <button type="button" class="add_more_child btn btn-success btn-sm float-right" style="display:none;">Add more</button>
                                        </div>
                                </fieldset>

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



        $(".add_more_child").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".spousechild").append(`
            <div class="child">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname"></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname"></div>
                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname"></div>
                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname"></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                    <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate"></div>

                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>

                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age"></div>

                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sex</label></div>

                    <div class="col-3 col-md-3">
                        <select class="form-control child_sex select2">
                            <option value="" selected disabled>Sex</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                            <option value="LGBT">LGBT</option>
                        </select>
                    </div>
                </div>
                <div class="row form-group col-md-12">

                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>

                    <div class="col-3 col-md-3">
                        <select class="form-control child_education select2">
                            <option value="" selected disabled>Education</option>
                            <option value="COLLEGE GRADUATE">College Graduate</option>
                            <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
                            <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
                            <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
                            <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
                            <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
                            <option value="ILLITERATE">No Education/Illiterate</option>
                            <option value="POST-GRADUATE">Post-Graduate Studies</option>
                            <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
                            <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
                            <option value="VOCATIONAL">Vocational</option>
                        </select>
                    </div>

                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>

                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation"></div>

                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.children').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $(".btn-update").unbind("click").on("click", function(){

            const children = [];
            const child_fname = $(".child_fname");
            const child_mname = $(".child_mname");
            const child_lname = $(".child_lname");
            const child_sname = $(".child_sname");
            const child_bdate = $(".child_bdate");
            const child_age = $(".child_age");
            const child_sex = $(".child_sex");
            const child_education = $(".child_education");
            const child_occupation = $(".child_occupation");

            for(var i = 0; i < child_fname.length; i++){
                
                const list = {};
                list.child_fname = $(child_fname[i]).val();
                list.child_mname = $(child_mname[i]).val();
                list.child_lname = $(child_lname[i]).val();
                list.child_sname = $(child_sname[i]).val();
                list.child_bdate = $(child_bdate[i]).val();
                list.child_age = $(child_age[i]).val();
                list.childSex = $(child_sex[i]).val();
                list.child_education = $(child_education[i]).val();
                list.child_occupation = $(child_occupation[i]).val();
                children.push(list);
            }
            var spouseChildren = {

                children            : children,
                civilStatus           : $(".civilStatus").val(),
                spouseFname      : $(".spouse_fname").val(),
                spouseMname        : $(".spouse_mname").val(),
                spouseLname           : $(".spouse_lname").val(),
                spouseEname         : $(".spouse_ename").val(),
                presentAddress         : $(".pAddress").val(),
                spouse_region           : $(".spouse_region").val(),
                spouse_bday      : $(".spouse_bday").val(),
                spouseProvince        : $(".spouseProvince").val(),
                spouseMunicipality           : $(".spouseMunicipality").val(),
                spouse_work_add         : $(".spouse_work_add").val(),
                spouse_ceremony         : $(".spouse_ceremony").val(),
                spouse_bplace_others           : $(".spouse_bplace_others").val(),
                spouse_occupation      : $(".spouse_occupation").val(),
                date_marriage        : $(".date_marriage").val(),
                spouse_remarks           : $(".spouse_remarks").val(),
                spouse_relationship         : $(".spouse_relationship").val(),

            }
            console.log(spouseChildren)
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(spouseChildren),
            "type"                      : "spouseChildren",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid")
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/spouseChildren/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/spouseChildren/'+client_id).done(function (result) {
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

                        var spouseChild = JSON.parse(result.jsonData);

                        $(".civilStatus").val(JSON.parse(result.jsonData).civilStatus).trigger("change");        
                        $(".spouse_fname").val(JSON.parse(result.jsonData).spouseFname);       
                        $(".spouse_mname").val(JSON.parse(result.jsonData).spouseMname);       
                        $(".spouse_lname").val(JSON.parse(result.jsonData).spouseLname);       
                        $(".spouse_ename").val(JSON.parse(result.jsonData).spouseEname);
                        $(".pAddress").val(JSON.parse(result.jsonData).presentAddress);
                        $(".spouse_region").val(JSON.parse(result.jsonData).spouse_region).trigger("change");
                        $(".spouse_bday").val(JSON.parse(result.jsonData).spouse_bday);
                        $(".spouseProvince").val(JSON.parse(result.jsonData).spouseProvince);
                        $(".spouseMunicipality").val(JSON.parse(result.jsonData).spouseMunicipality); 
                        $(".spouse_work_add").val(JSON.parse(result.jsonData).spouse_work_add);    
                        $(".spouse_ceremony").val(JSON.parse(result.jsonData).spouse_ceremony);   
                        $(".spouse_bplace_others").val(JSON.parse(result.jsonData).spouse_bplace_others);
                        $(".spouse_occupation").val(JSON.parse(result.jsonData).spouse_occupation);  
                        $(".date_marriage").val(JSON.parse(result.jsonData).date_marriage);
                        $(".spouse_remarks").val(JSON.parse(result.jsonData).spouse_remarks);
                        $(".spouse_relationship").val(JSON.parse(result.jsonData).spouse_relationship).trigger("change");


                    spouseChild.children.forEach(function(data){
                        console.log(data)
                        $(".spousechild").append(`
                            <div class="child">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control child_fname" value="${data.child_fname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control child_mname" value="${data.child_mname}"></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control child_lname" value="${data.child_lname}"></div>
                                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Suffix Name" class="form-control child_sname" value="${data.child_sname}"></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                                    <div class="col-3 col-md-3"><input type="date" class="form-control child_bdate" value="${data.child_bdate}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Age" class="form-control child_age" value="${data.child_age}"></div>
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label" >Sex</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_sex select2">
                                            <option value="" selected disabled>Sex</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="MALE">Male</option>
                                            <option value="LGBT">LGBT</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-3 col-md-3">
                                        <select class="form-control child_education select2">
                                            <option value="" selected disabled>Education</option>
                                            <option value="COLLEGE GRADUATE">College Graduate</option>
                                            <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
                                            <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
                                            <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
                                            <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
                                            <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
                                            <option value="ILLITERATE">No Education/Illiterate</option>
                                            <option value="POST-GRADUATE">Post-Graduate Studies</option>
                                            <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
                                            <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
                                            <option value="VOCATIONAL">Vocational</option>
                                        </select>
                                    </div>

                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Occupation" class="form-control child_occupation" value="${data.child_occupation}"></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>`
                        )
                    });
                    
                        $('.child').on('click', '.remove', function(e) {
                            e.preventDefault();

                            $(this).parent().remove();
                        });


                    }else{

                        $(".btn-next").show();
                        $(".btn-update").hide();
                    } 

                }
            })

        var civilStatus = $('.civilStatus').val()
        // console.log(fatherDeceased)
        if (civilStatus == "SINGLE"){
            $(".spouseModule").hide();
            $(".add_more_child").hide();
            $(".spousechild").hide();
        } else {
            $(".spouseModule").show();
            $(".add_more_child").show();
            $(".spousechild").show();
        }
        $('.civilStatus').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.civilStatus').val())
            if ($('.civilStatus').val() == "SINGLE") {
                $(".spouseModule").hide();
                $(".add_more_child").hide();
                $(".spousechild").hide();
            } else {
                $(".spouseModule").show();
                $(".add_more_child").show();
                $(".spousechild").show();
            }
        });


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
        // $(".spouseChild").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
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