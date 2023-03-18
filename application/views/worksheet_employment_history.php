<?php $this->load->view('templates/header.php'); ?> 

<body>
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
                                        <a class="nav-link idenData" href="">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link presOff" href="">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link priorRec" href="">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link famBg" href="">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socioEco" href="">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link resEco" href="">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouseChild" href="">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link educHis" href="">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active empHis" href="">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link envFac" href="">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                        
                                <fieldset class="row form-group col col-md-12">
                                        <legend>Employment History</legend>
                                        <div class="emp_history">
                                        </div>
                                        <div class="col-12">
                                            <div class="col-12">
                                                <button type="button" class="add_more_emp btn btn-success btn-sm float-right">Add more</button>
                                            </div>
                                        </div>
                                </fieldset>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Status of Employment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_status select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="REGULAR">Regular</option>
                                            <option value="IRREGULAR">Irregular</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specStatus"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Means of Support</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_support select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="CHILDREN SUPPORT">Children Support</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="PENSION">Pension</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specSupp"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employable Skills</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_skills"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Other Source of income</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_otherSource"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Health</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_health select2">
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
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainHealth"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Previous Treatment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_treatment select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NONE">None</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 hosp_name" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Hospital Name/s</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_hosName"></div>
                                </div>

                                <div class="row form-group col-md-6 date_hosp" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date/s Hospitalized</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_dateHos"></div>
                                </div>

                                <div class="row form-group col-md-6 use_drug" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Use of Alcohol/Drugs</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_useDrug select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NO">No</option>
                                            <option value="OCCASIONALLY">Occasionally</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 drug_explain" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainDrug"></textarea></div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-success btn-next btn-sm">Save & Next</button>
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


        $(".add_more_emp").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".emp_history").append(`
            <div class="emp_his">
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Job Held</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control job_held"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employer Address</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_add"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateFrom"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control emp_dateTo"></div>
                </div>

                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Income</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_Income"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.emp_history').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        if ($('.emp_treatment').val() == "NONE"){
            $(".hosp_name").hide();
            $(".date_hosp").hide();
            $(".use_drug").hide();
            $(".drug_explain").hide();
        } else {
            $(".hosp_name").hide();
            $(".date_hosp").hide();
            $(".use_drug").hide();
            $(".drug_explain").hide();
        }
        $('.emp_treatment').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.emp_treatment').val())
            if ($('.emp_treatment').val() == "YES") {
                $(".hosp_name").show();
                $(".date_hosp").show();
                $(".use_drug").show();
                $(".drug_explain").show();
            } else {
                $(".hosp_name").hide();
                $(".date_hosp").hide();
                $(".use_drug").hide();
                $(".drug_explain").hide();
            }
        });

        $(".btn-next").unbind("click").on("click", function(){

            const empHistory = [];
            const job_held = $(".job_held");
            const emp_add = $(".emp_add");
            const emp_dateFrom = $(".emp_dateFrom");
            const emp_dateTo = $(".emp_dateTo");
            const emp_Income = $(".emp_Income");

            for(var i = 0; i < job_held.length; i++){
                
                const list = {};
                list.job_held = $(job_held[i]).val();
                list.emp_add = $(emp_add[i]).val();
                list.emp_dateFrom = $(emp_dateFrom[i]).val();
                list.emp_dateTo = $(emp_dateTo[i]).val();
                list.emp_Income = $(emp_Income[i]).val();
                empHistory.push(list);
            }


            var employmentHistory = {

                empHistory              : empHistory,
                empStatus               : $(".emp_status").val(),
                empSpecStatus           : $(".emp_specStatus").val(),
                empSupport              : $(".emp_support").val(),
                empSpecSupp             : $(".emp_specSupp").val(),
                empSkills               : $(".emp_skills").val(),
                empOtherSource          : $(".emp_otherSource").val(),
                empOtherSource          : $(".emp_otherSource").val(),
                empTreatment            : $(".emp_treatment").val(),
                empHosName              : $(".emp_hosName").val(),
                empDateHos              : $(".emp_dateHos").val(),
                empUseDrug              : $(".emp_useDrug").val(),
                empExplainDrug          : $(".emp_explainDrug").val(),


            }

            console.log(employmentHistory)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(employmentHistory),
            "type"                      : "spouseChildren",
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
                            window.location.href = 'http://localhost/pis/worksheet_environmental_factor?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

    } )( jQuery );
    </script>

</body>

</html>