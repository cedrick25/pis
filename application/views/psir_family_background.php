<?php $this->load->view('templates/header.php'); ?> 
<style>
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(255,255,255,0);
    }

    /* Full screen semi-transparent overlay */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* Make sure it overlays everything */
    }

    /* Loader styles */
    .loader {
      width: 89px;
      height: 89px;
      position: relative;
      background: rgba(255,255,255,0.13);
      animation-duration: 2.5s;
      animation-name: animSpin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      border-radius: 50%;
    }

    @keyframes animSpin {
      50% {
        transform: rotateZ(180deg) scale(.94);
      }
      100% {
        transform: rotateZ(360deg) scale(1);
      }
    }

    .loader:before,
    .loader:after {
      content: '';
      position: absolute;
      border: 8px solid transparent;
      border-radius: 50%;
    }

    .loader:before {
      width: 75%;
      height: 75%;
      background: rgba(255,255,255,.13);
      left: 12.5%;
      top: 12.5%;
      border-left: 8px solid rgba(255,255,255,.34);
      border-bottom: 8px solid rgba(255,255,255,.34);
    }

    .loader:after {
      width: 40%;
      height: 40%;
      left: 30%;
      top: 30%;
      border-right: 8px solid rgba(255,255,255,1);
      border-left: 8px solid rgba(255,255,255,1);
      border-bottom: 8px solid rgba(255,255,255,1);
    }

    .loader span {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }

    /* Hide the overlay once the page has fully loaded */
    body.loaded .overlay {
      display: none;
    }
    
    .custom-col {
      margin-right: 0;
      margin-left: 0;

      > .col,
      > [class*="col-"] {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
</style>
<body>
    <div class="modal fade" id="warningModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title warningModalTitle" id="mediumModalLabel"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="tabSuccess" style="display:none">
                    <i class="fa fa-check"></i>
                        Success!
                </div>
                <div class="modal-body">
                    <p style="color: black;">
                        Are you sure you want to proceed to <span id="tabName" class="text-primary"></span> tab ?
                        <br><span>All the unsaved changes you've made will be lost.</span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_warning btn-sm">Proceed</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="saveModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="false">
        <div class="modal-dialog modal-md modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title saveModalTitle" id="mediumModalLabel">Save Changes</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="false">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="create_success" style="display:none">
                    <i class="fa fa-check"></i>
                        Saved Successfully!
                </div>
                <div class="alert alert-success" role="alert" id="update_success" style="display:none">
                    <i class="fa fa-check"></i>
                        Updated Successfully!
                </div>
                <div class="modal-body">
                    <p id="saveMessage" style="display:none; color: black;">
                        Before saving, please ensure all required fields are completed and accurate.
                    </p>
                    <p id="updateMessage" style="display:none; color: black;">
                        <span class="text-danger">Warning: Updating this record will permanently overwrite existing data. This action cannot be undone.</span><br>
                        <span>Do you wish to continue?</span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm btn-save" style="display:none;">Save Changes</button>
                    <button type="button" class="btn btn-primary btn-sm btn-update" style="display:none;">Update Changes</button>
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
                            <li><a href="">PSIR</a></li>
                            <li class="active">Birth Data and Family Background</li>
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
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <strong class="card-title">Birth Data and Family Background</strong>
                                <?php $this->load->view('templates/factsheet_link.php'); ?>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link identifying_data" href="#" data-toggle="modal" data-target="#warningModal" data-name="Identifying Data">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_offense" href="#" data-toggle="modal" data-target="#warningModal" data-name="Present Offense">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link prior_records" href="#" data-toggle="modal" data-target="#warningModal" data-name="Prior Records">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active family_background" href="#" data-name="Birth Data and Family Background">Birth Data and Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_situation" href="#" data-toggle="modal" data-target="#warningModal" data-name="Present Situation">Present Situation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Education and Job History">Education and Job History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link medical_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Medical History">Medical History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link traits_and_community_background" href="#" data-toggle="modal" data-target="#warningModal" data-name="Traits/Characteristics and Background in the Community">Traits/Characteristics and Background in the Community</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link evaluation" href="#" data-toggle="modal" data-target="#warningModal" data-name="Analysis/Evaluation and Projected Thrust of Rehabilitation">Analysis/Evaluation and Projected Thrust of Rehabilitation</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link recommendation" href="#" data-toggle="modal" data-target="#warningModal" data-name="Community background/Environmental Factor">Recommendation</a>
                                    </li> -->
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                BIRTH DATA
                                                <div>
                                                    <a data-toggle="collapse" href="#birthDataCard" role="button" aria-expanded="true" aria-controls="birthDataCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="birthDataCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Date of Birth</label>
                                                        <input type="date" name="text-input" class="form-control date_of_birth">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Place of Birth</label>
                                                        <input type="text" class="form-control place_of_birth"  placeholder="Place of Birth">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Birth Order</label>
                                                        <input type="text" class="form-control birth_order"  placeholder="Birth Order">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                PARENTS
                                                <div>
                                                    <a data-toggle="collapse" href="#parentsCard" role="button" aria-expanded="true" aria-controls="parentsCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="parentsCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Father's Name</label>
                                                        <input type="text" name="text-input" placeholder="Name" class="form-control father_name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Father's Age</label>
                                                        <input type="text" name="text-input" placeholder="Age" class="form-control father_age">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Father's Occupation</label>
                                                        <input type="text" name="text-input" placeholder="Occupation" class="form-control father_occupation">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Mother's Name</label>
                                                        <input type="text" name="text-input" placeholder="Name" class="form-control mother_name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Mother's Age</label>
                                                        <input type="text" name="text-input" placeholder="Age" class="form-control mother_age">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Mother's Occupation</label>
                                                        <input type="text" name="text-input" placeholder="Occupation" class="form-control mother_occupation">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Status of Marriage</label>
                                                        <select class="form-control civil_status select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="married">Married</option>
                                                            <option value="annulled">Annulled</option>
                                                            <option value="seperated">Seperated</option>
                                                            <option value="common_law">With Common Law/ Lived-In</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="legal_status_field">
                                                        <label for="text-input" class=" form-control-label">Seperation Status</label>
                                                        <select class="form-control seperation_status select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="legal">Legal</option>
                                                            <option value="estranged">Estranged</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control seperation_status_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="other_status_field">
                                                        <label for="text-input" class=" form-control-label">Other Status of Marriage</label>
                                                        <input type="text" name="text-input" placeholder="Status of Marriage" class="form-control other_status_of_marriage">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                SOCIO-ECONOMIC BACKGROUND
                                                <div>
                                                    <a data-toggle="collapse" href="#socioEconomicCard" role="button" aria-expanded="true" aria-controls="socioEconomicCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="socioEconomicCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Family Relationship</label>
                                                        <select class="form-control fam_relationship select2">
                                                            <option value="" selected disabled>Select Relationship</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="poor">Poor</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control fam_relationship_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Major Family Problems</label>
                                                        <select class="form-control family_problems select2">
                                                            <option value="" selected disabled>Select Problem</option>
                                                            <option value="no_apparent_problem">No Apparent Problem</option>
                                                            <option value="economic">Economic</option>
                                                            <option value="mental_physical_illness">Mental/Physical Illness</option>
                                                            <option value="marital_problem">Marital Problem</option>
                                                            <option value="one_parent_family">One-Parent Family</option>
                                                            <option value="parent_child_conflict">Parent-Child Conflict</option>
                                                            <option value="sibling_conflict">Sibling Conflict</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control family_problems_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Family Reputation in the Community</label>
                                                        <select class="form-control family_reputation select2">
                                                            <option value="" selected disabled>Select Reputation</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="poor">Poor</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control family_reputation_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Family Economic Status</label>
                                                        <select class="form-control family_economic select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="more_adequate">More Adequate</option>
                                                            <option value="adequate">Adequate</option>
                                                            <option value="inadequate">Inadequate</option>
                                                            <option value="below_poverty_lines">Below Poverty Lines</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control family_economic_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Physical Home Conditions</label>
                                                        <select class="form-control home_condition select2">
                                                            <option value="" selected disabled>Select Condition</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="poor">Poor</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control home_condition_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Stability of Residence</label>
                                                        <select class="form-control residence_stability select2">
                                                            <option value="" selected disabled>Select Stability</option>
                                                            <option value="stable">Stable</option>
                                                            <option value="occasional_change">Occasional Change</option>
                                                            <option value="frequent_change">Frequent Change</option>
                                                            <option value="no_stability">No Stability</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control residence_stability_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">Remarks/Additional Information</label>
                                                        <textarea placeholder="Remarks/Additional Information" class="form-control remarks_socio_economic"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-saveData btn-sm float-right">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/dropdownOthers.js"></script>
    <script src="assets/js/pisJs/psirRecordSave.js"></script>
    <script src="assets/js/pisJs/psirPrefillFromWorksheet.js"></script>
    <script src="assets/js/pisJs/psirFamilyBackground.js"></script>


</body>

</html>