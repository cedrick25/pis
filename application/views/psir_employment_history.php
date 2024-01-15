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
                                        <a class="nav-link identifying_data" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_offense" href="#" data-toggle="modal" data-target="#warningModal">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link prior_record" href="#" data-toggle="modal" data-target="#warningModal">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link family_background" href="#" data-toggle="modal" data-target="#warningModal">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socio_economic" href="#" data-toggle="modal" data-target="#warningModal">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link residence_economic" href="#" data-toggle="modal" data-target="#warningModal">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouse_children" href="#" data-toggle="modal" data-target="#warningModal">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active empHis" href="#">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link medHistory" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link evaluation" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link recommendation" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
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
                                                <!-- <button type="button" class="add_more_emp btn btn-success btn-sm float-right">Add more</button> -->
                                            </div>
                                        </div>
                                </fieldset>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Status of Employment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_status select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="REGULAR">Regular</option>
                                            <option value="IRREGULAR">Irregular</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specStatus" disabled></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Means of Support</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_support select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="CHILDREN SUPPORT">Children Support</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="PENSION">Pension</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specSupp" disabled></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employable Skills</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_skills" disabled></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Other Source of income</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_otherSource" disabled></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Health</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_health select2" disabled>
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
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainHealth" disabled></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Previous Treatment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_treatment select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NONE">None</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 hosp_name" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Hospital Name/s</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_hosName" disabled></div>
                                </div>

                                <div class="row form-group col-md-6 date_hosp" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date/s Hospitalized</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_dateHos" disabled></div>
                                </div>

                                <div class="row form-group col-md-6 use_drug" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Use of Alcohol/Drugs</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_useDrug select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NO">No</option>
                                            <option value="OCCASIONALLY">Occasionally</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 drug_explain" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainDrug" disabled></textarea></div>
                                </div>

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

    <script src="assets/js/pisJs/psirEmploymentHistory.js"></script>


</body>

</html>