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
                            <li class="active">Residence/Economic Conditions</li>
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
                                <strong class="card-title">Residence/Economic Conditions</strong>
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
                                        <a class="nav-link active resEco" href="#">Residence/Economic Conditions</a>
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

                                <fieldset class="row col col-md-12">
                                        <legend>Residence</legend>
                                        <div class="residence">
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_stability select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FREQUENT CHANGE">Frequent Change</option>
                                                    <option value="NO STABILITY">No Stability</option>
                                                    <option value="OCCASIONAL CHANGE">Occasional Change</option>
                                                    <option value="STABLE">Stable</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control residence_type select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="INFORMAL SETTLER">Informal Settler</option>
                                                    <option value="OWNED">Owned</option>
                                                    <option value="OWNED BY PARENTS">Owned by Parents</option>
                                                    <option value="RENTED">Rented</option>
                                                    <option value="USED FREE">Used Free</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_home_cond select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FAIR">Fair</option>
                                                    <option value="POOR">Poor</option>
                                                    <option value="SATISFACTORY">Satisfactory</option>
                                                    <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button type="button" class="add_more_residence btn btn-success btn-sm float-right">Add more</button>
                                        </div>

                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Economic Conditions</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Status</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_status select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="ADEQUATE">Adequate</option>
                                                        <option value="BELOW POVERTY">Below Poverty Lines</option>
                                                        <option value="INADEQUATE">Inadequate</option>
                                                        <option value="MORE ADEQAUTE">More than adequate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Breadwinner</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_breadwinner select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="CLIENT">Client</option>
                                                        <option value="CLIENT & SPOUSE">Client and Spouse</option>
                                                        <option value="CLIENT & SPOUSE & CHILD">Client,Spouse and Children</option>
                                                        <option value="OTHERS">Others</option>
                                                        <option value="SPOUSE">Spouse</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">No. of Dependants</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Ceremony" class="form-control no_dependants"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Dependants</label></div>
                                                <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control dependants"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Major Family Problems</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <!-- <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Family Problems</label></div>
                                                <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control maj_fam_prob"></textarea></div>
                                            </div> -->
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
                                                <div class="col-12 col-md-5">
                                                    <select class="form-control maj_fam_prob select2">
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
                                            
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Comments</label></div>
                                                <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control fam_comments"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

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
    <script src="assets/js/pisJs/worksheetResidenceEconomic.js"></script>


</body>

</html>