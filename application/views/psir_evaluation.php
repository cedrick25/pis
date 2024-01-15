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
                                        <a class="nav-link employment_history" href="#" data-toggle="modal" data-target="#warningModal">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link medHistory" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link eval active" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
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
    <script src="assets/js/pisJs/psirEvaluation.js"></script>


</body>

</html>