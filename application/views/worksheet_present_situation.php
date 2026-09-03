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
    <div class="overlay" style="display: none;">
        <div class="loader">
        <span></span>
        </div>
    </div>
    
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
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <strong class="card-title">PETITIONER'S PRESENT SITUATION</strong>
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
                                        <a class="nav-link identification_data" href="#" data-toggle="modal" data-target="#warningModal" data-name="Identification Data">Identification Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link family_background" href="#" data-toggle="modal" data-target="#warningModal" data-name="Family Background">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active present_situation" href="#" data-name="Present Situation">Present Situation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Educational History">Educational History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link employment_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Employment History">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal" data-name="Community background/Environmental Factor">Community Background/Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Civil Status</label>
                                        <select class="form-control civil_status select2">
                                            <option value="" selected disabled>Select Civil Status</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="widow_widower">Widow/Widower</option>
                                            <option value="with_common_law_spouse">With Common Law Relationship</option>
                                            <option value="seperated">Seperated</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control civil_status_others" placeholder="Specify">
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none;" id="seperation_cause_field">
                                        <label for="text-input" class=" form-control-label">Cause</label>
                                        <input type="text" name="text-input" placeholder="Cause" class="form-control seperation_cause">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col" id="spouse_section">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                Spouse
                                                <div>
                                                    <a data-toggle="collapse" href="#spouseCard" role="button" aria-expanded="true" aria-controls="spouseCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="spouseCard" class="collapse show">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">First Name</label>
                                                        <input type="text" name="text-input" placeholder="First Name" class="form-control spouse_first_name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Middle Name</label>
                                                        <input type="text" name="text-input" placeholder="Middle Name" class="form-control spouse_middle_name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                        <label for="text-input" class=" form-control-label">Family/Maiden Name</label>
                                                        <input type="text" name="text-input" placeholder="Family/Maiden Name" class="form-control spouse_last_name">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">Home Address</label>
                                                        <input type="text" name="text-input" placeholder="Home Address" class="form-control spouse_home_address">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Place of Birth</label>
                                                        <input type="text" name="text-input" placeholder="First Name" class="form-control spouse_place_of_birth">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date of Birth</label>
                                                        <input type="date" class="form-control spouse_date_of_birth">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Occupation</label>
                                                        <input type="text" name="text-input" placeholder="Occupation" class="form-control spouse_occupation">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Work Address</label>
                                                        <input type="text" name="text-input" placeholder="Work Address" class="form-control spouse_work_address">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date of Marriage</label>
                                                        <input type="date" class="form-control date_of_marriage">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Nature of Ceremony</label>
                                                        <input type="text" name="text-input" placeholder="Nature of Ceremony" class="form-control nature_ceremony">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">If Seperated, State Reason/s</label>
                                                        <textarea placeholder="Reason/s" class="form-control reason_seperation"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Relationship with Spouse</label>
                                                        <select class="form-control relationship_with_spouse select2">
                                                            <option value="" selected disabled>Select Relationship Status</option>
                                                            <option value="poor">Poor</option>
                                                            <option value="fair">Fair</option>
                                                            <option value="satisfactory">Satisfactory</option>
                                                            <option value="very_satisfactory">Very Satisfactory</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control relationship_with_spouse_others" placeholder="Specify">
                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="children_section">
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Number of Children</label>
                                        <input type="text" name="text-input" placeholder="Number of Children" class="form-control no_of_children">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                Children
                                                <div>
                                                    <a data-toggle="collapse" href="#childrenCard" role="button" aria-expanded="true" aria-controls="childrenCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="childrenCard" class="collapse show">
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush" id="children_list" style="">
                                                </ul>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                    <label for="text-input" class=" form-control-label">Relationship with Children</label>
                                                    <select class="form-control relationship_with_children select2">
                                                        <option value="" selected disabled>Select Relationship Status</option>
                                                        <option value="poor">Poor</option>
                                                        <option value="fair">Fair</option>
                                                        <option value="satisfactory">Satisfactory</option>
                                                        <option value="very_satisfactory">Very Satisfactory</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control relationship_with_children_others" placeholder="Specify">
                                        </div>
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
                                                Residence
                                                <div>
                                                    <a data-toggle="collapse" href="#residenceCard" role="button" aria-expanded="true" aria-controls="residenceCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="residenceCard" class="collapse show">
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush" id="residence_list" style="padding-bottom: 5px;">
                                                </ul>
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
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control stability_residence_others" placeholder="Specify">
                                        </div>
                                                </div>
                                                <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                    <label for="text-input" class=" form-control-label">Type of Residence</label>
                                                    <select class="form-control type_residence select2">
                                                        <option value="" selected disabled>Select</option>
                                                        <option value="house">House</option>
                                                        <option value="apartment">Apartment</option>
                                                        <option value="rented">Rented</option>
                                                        <option value="owned">Owned</option>
                                                        <option value="others">Others</option>
                                                    </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control type_residence_others" placeholder="Specify">
                                        </div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                    <label for="text-input" class=" form-control-label">Physical Home Conditions</label>
                                                    <select class="form-control physical_home_conditions select2">
                                                        <option value="" selected disabled>Select</option>
                                                        <option value="poor">Poor</option>
                                                        <option value="fair">Fair</option>
                                                        <option value="satisfactory">Satisfactory</option>
                                                        <option value="very_satisfactory">Very Satisfactory</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control physical_home_conditions_others" placeholder="Specify">
                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Family Economic Status</label>
                                        <select class="form-control family_economic_status select2">
                                            <option value="" selected disabled>Select Status</option>
                                            <option value="more_than_adequate">More than Adequate</option>
                                            <option value="adequate">Adequate</option>
                                            <option value="inadequate">Inadequate</option>
                                            <option value="below_poverty_lines">Below Poverty Level</option>
                                            <option value="others">Others</option>
                                        </select>
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control family_economic_status_others" placeholder="Specify">
                                        </div>
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
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control family_breadwinner_others" placeholder="Specify">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Number of Dependents (Children)</label>
                                        <input type="text" name="text-input" placeholder="Number of Dependents" class="form-control no_of_dependents_children">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Number of Dependents (Others)</label>
                                        <input type="text" name="text-input" placeholder="Number of Dependents" class="form-control no_of_dependents_others">
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
                                        <div class="dropdown-others-wrap" style="display:none;margin-top:8px;">
                                            <input type="text" class="form-control major_family_problem_others" placeholder="Specify">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Comments: Effects of the Above Conditions on the Petitioner's Behavior</label>
                                        <textarea placeholder="Comments" class="form-control comments"></textarea>
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
    <script src="assets/js/pisJs/worksheetPresentSituation.js"></script>


</body>

</html>