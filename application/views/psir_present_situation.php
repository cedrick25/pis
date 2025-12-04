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
                            <li class="active">Petitioner's Present Situation</li>
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
                                        <a class="nav-link identifying_data" href="#" data-toggle="modal" data-target="#warningModal" data-name="Identifying Data">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_offense" href="#" data-toggle="modal" data-target="#warningModal" data-name="Present Offense">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link prior_records" href="#" data-toggle="modal" data-target="#warningModal" data-name="Prior Records">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link family_background" href="#" data-toggle="modal" data-target="#warningModal" data-name="Birth Data and Family Background">Birth Data and Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active present_situation" href="#" data-name="Present Situation">Present Situation</a>
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
                                                PETITIONER'S CIVIL STATUS
                                                <div>
                                                    <a data-toggle="collapse" href="#presentCivilStatus" role="button" aria-expanded="true" aria-controls="presentCivilStatus">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="presentCivilStatus" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Civil Status</label>
                                                        <select class="form-control civil_status select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="single">Single</option>
                                                            <option value="married">Married</option>
                                                            <option value="widow/widower">Widow/Widower</option>
                                                            <option value="common_law">With Common Law/ Lived-In</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="married_status_field">
                                                        <label for="text-input" class=" form-control-label">Status of Marriage</label>
                                                        <select class="form-control status_of_marriage select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="annulled">Annulled</option>
                                                            <option value="seperated">Seperated</option>
                                                            <option value="legal">Legal</option>
                                                            <option value="estranged">Estranged</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="other_married_status_field">
                                                        <label for="text-input" class=" form-control-label">Other Status of Marriage</label>
                                                        <input type="text" name="text-input" placeholder="Status of Marriage" class="form-control other_married_status">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Remarks</label>
                                                        <textarea placeholder="Remarks" class="form-control remarks_civil_status"></textarea>
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
                                                CHILDREN
                                                <div>
                                                    <a data-toggle="collapse" href="#childrenCard" role="button" aria-expanded="true" aria-controls="childrenCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="childrenCard" class="collapse show">
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush" id="children_list">
                                                </ul>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col" style="margin-top: 20px">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Relationship with Children</label>
                                                        <select class="form-control relationship_with_children select2">
                                                            <option value="" selected disabled>Select Relationship Status</option>
                                                            <option value="poor">Poor</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">Remarks/Additional Information</label>
                                                        <textarea placeholder="Remarks/Additional Information" class="form-control remarks_children"></textarea>
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
                                                RESIDENCE
                                                <div>
                                                    <a data-toggle="collapse" href="#residenceCard" role="button" aria-expanded="true" aria-controls="residenceCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="residenceCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Dwelling</label>
                                                        <select class="form-control dwelling select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="owned">Owned</option>
                                                            <option value="rented">Rented</option>
                                                            <option value="informal_settler">Informal Settler</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="years_of_stay_owned_field">
                                                        <label for="text-input" class=" form-control-label">Years of Stay</label>
                                                        <input type="text" name="text-input" placeholder="Years of Stay" class="form-control years_of_stay_owned">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="years_of_stay_rented_field">
                                                        <label for="text-input" class=" form-control-label">Years of Stay</label>
                                                        <input type="text" name="text-input" placeholder="Years of Stay" class="form-control years_of_stay_rented">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Stability of Residence</label>
                                                        <select class="form-control stability_residence select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="stable">Stable</option>
                                                            <option value="occasional_change">Occasional Change</option>
                                                            <option value="frequent_change">Frequent Change</option>
                                                            <option value="no_stability">No Stability</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Physical Home Conditions</label>
                                                        <select class="form-control physical_home_conditions select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="poor">Poor</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                                        </select>
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
                                                ECONOMIC CONDITION
                                                <div>
                                                    <a data-toggle="collapse" href="#economicConditionCard" role="button" aria-expanded="true" aria-controls="economicConditionCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="economicConditionCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Family Economic Status</label>
                                                        <select class="form-control family_economic_status select2">
                                                            <option value="" selected disabled>Select Status</option>
                                                            <option value="more_than_adequate">More than Adequate</option>
                                                            <option value="adequate">Adequate</option>
                                                            <option value="inadequate">Inadequate</option>
                                                            <option value="below_poverty_lines">Below Poverty Level</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Family Breadwinner</label>
                                                        <select class="form-control family_breadwinner select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="petitioner">Petitioner</option>
                                                            <option value="spouse">Spouse</option>
                                                            <option value="petiioner_and_spouse">Petitioner and Spouse</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Petitioner's Role in the Family</label>
                                                        <select class="form-control role_in_the_family select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="income_contributor">Income Contributor</option>
                                                            <option value="primary_care_giver">Primary Care-giver</option>
                                                            <option value="dependent">Dependent</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="income_contributor_field">
                                                        <label for="text-input" class=" form-control-label">Income Contributor</label>
                                                        <select class="form-control income_contributor select2">
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="total">Total</option>
                                                            <option value="partial">Partial</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Major Family Problem</label>
                                        <select class="form-control major_family_problem select2">
                                            <option value="" selected disabled>Select Status</option>
                                            <option value="no_apparent_problem">No Apparent Problem</option>
                                            <option value="economic">Economic</option>
                                            <option value="husband_wife_conflict">Husband-Wife Conflict</option>
                                            <option value="mental_illness">Mental Illness</option>
                                            <option value="physical_illness">Physical Illness</option>
                                            <option value="parent_child_conflict">Parent-Child Conflict</option>
                                            <option value="sibling_conflict">Sibling Conflict</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="other_famiy_problem_field">
                                        <label for="text-input" class=" form-control-label">Other Family Problem</label>
                                        <input type="text" name="text-input" placeholder="Other Family Problem" class="form-control other_famiy_problem">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Remarks/Additional Information</label>
                                        <textarea placeholder="Remarks" class="form-control remarks_situation"></textarea>
                                    </div>
                                </div>

                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-saveData btn-sm float-right" style="">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/psirPresentSituation.js"></script>


</body>

</html>