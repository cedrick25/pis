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
    <!-- Left Panel -->

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
                            <li class="active">Employment History</li>
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
                                <strong class="card-title">EMPLOYMENT HISTORY</strong>
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
                                        <a class="nav-link present_situation" href="#" data-toggle="modal" data-target="#warningModal" data-name="Present Situation">Present Situation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Educational History">Educational History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active employment_history" href="#" data-name="Employment History">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal" data-name="Community background/Environmental Factor">Community Background/Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                Petitioner's Previous Job List
                                                <div>
                                                    <a data-toggle="collapse" href="#previousJobCard" role="button" aria-expanded="true" aria-controls="previousJobCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="previousJobCard" class="collapse show">
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush" id="previous_job_list" style="padding-bottom: 5px;">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Status of Employment/Self Employment</label>
                                        <select class="form-control employment_status select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="regular">Regular</option>
                                            <option value="irregular">Irregular</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Specify</label>
                                        <input type="text" name="text-input" placeholder="Specify" class="form-control specify_employment_status">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">If Unemployed, State Means of Support</label>
                                        <select class="form-control means_of_support select2">
                                            <option value="" selected disabled>Select Means of Support</option>
                                            <option value="children_support">Children Support</option>
                                            <option value="pension">Pension</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Specify</label>
                                        <input type="text" name="text-input" placeholder="Specify" class="form-control specify_means_of_support">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Employable Skills</label>
                                        <select class="form-control employable_skills select2">
                                            <option value="" selected disabled>Select Skills</option>
                                            <option value="auto_mechanic">Auto Mechanic</option>
                                            <option value="machine_operator">Machine Operator</option>
                                            <option value="driver">Driver</option>
                                            <option value="welder">Welder</option>
                                            <option value="radio_technician">Radio Technician</option>
                                            <option value="electrician">Electrician</option>
                                            <option value="plumber">Plumber</option>
                                            <option value="mason">Mason</option>
                                            <option value="carpenter">Carpenter</option>
                                            <option value="baker">Baker</option>
                                            <option value="hollow_block_maker">Hollow Block Maker</option>
                                            <option value="house_painter">House Painter</option>
                                            <option value="portrait_artist">Portrait Artist</option>
                                            <option value="billboard_artist">Billboard Artist</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="other_employable_skills_field" style="display:none;">
                                        <label for="text-input" class=" form-control-label">Other Skills</label>
                                        <input type="text" name="text-input" placeholder="Other Skills" class="form-control other_skills">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Other Source of Income</label>
                                        <select class="form-control other_source_income select2">
                                            <option value="" selected disabled>Select Source of Income</option>
                                            <option value="sari_sari_store">Sari-Sari Store</option>
                                            <option value="ambulant_vendor">Ambulant Vendor</option>
                                            <option value="balut_vendor">Balut Vendor</option>
                                            <option value="fish_vendor">Fish Vendor</option>
                                            <option value="bote_garapa">Bote-Garapa</option>
                                            <option value="junk_collector">Junk Collector</option>
                                            <option value="piggery">Piggery</option>
                                            <option value="poultry_raising">Poultry Raising</option>
                                            <option value="flower_gardening">Flower Gardening</option>
                                            <option value="vegetable_gardening">Vegetable Gardening</option>
                                            <option value="cattle_raising">Cattle Raising</option>
                                            <option value="farming">Farming</option>
                                            <option value="machine_aide">Machine Aide</option>
                                            <option value="metro_aide">Metro Aide</option>
                                            <option value="janitor">Janitor</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="other_source_income_field" style="display:none;">
                                        <label for="text-input" class=" form-control-label">Other Source of Income</label>
                                        <input type="text" name="text-input" placeholder="Other Source of Income" class="form-control other_income">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Physical Health</label>
                                        <select class="form-control physical_health select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="poor">Poor</option>
                                            <option value="fair">Fair</option>
                                            <option value="satisfactory">Satisfactory</option>
                                            <option value="very_satisfactory">Very Satisfactory</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Explain</label>
                                        <textarea placeholder="Other Source of Income" class="form-control explainHealthCondition"></textarea>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Previous Treatment/Hospitalization</label>
                                        <select class="form-control previous_treatment select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="none">None</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" id="specify_treatment_field" style="display: none;">
                                        <label for="text-input" class=" form-control-label">Specify</label>
                                        <input type="text" name="text-input" placeholder="Specify" class="form-control specify_treatment">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col" id="previousHospitalizationsList" style="display: none;">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                Previous Hospitalizations
                                                <div>
                                                    <a data-toggle="collapse" href="#previousHospitalizationCard" role="button" aria-expanded="true" aria-controls="previousHospitalizationCard">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="previousHospitalizationCard" class="collapse show">
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush" id="previous_hospitalization_list" style="padding-bottom: 5px;">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Use of Alcohol/Drugs</label>
                                        <select class="form-control drug_usage select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                            <option value="occasionally">Occasionally</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Explain</label>
                                        <textarea placeholder="Explain" class="form-control explain_use_of_drugs"></textarea>
                                    </div>
                                </div>
                                <!-- <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Number of Dependents (Children)</label>
                                        <input type="text" name="text-input" placeholder="Number of Dependents" class="form-control no_of_dependents_children">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Number of Dependents (Others)</label>
                                        <input type="text" name="text-input" placeholder="Number of Dependents" class="form-control no_of_dependents_others">
                                    </div>
                                </div> -->
                            </div>
                            <div class="card-footer">
                                <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button> -->
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
    <script src="assets/js/pisJs/psirRecordSave.js"></script>
    <script src="assets/js/pisJs/psirPrefillFromWorksheet.js"></script>
    <script src="assets/js/pisJs/worksheetEmploymentHistory.js"></script>

</body>

</html>