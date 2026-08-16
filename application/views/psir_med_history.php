<?php $this->load->view('templates/header.php'); ?> 

<body>
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
                            <li><a href="">PSIR</a></li>
                            <li class="active">Medical History</li>
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
                                <strong class="card-title">Medical History</strong>
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
                                        <a class="nav-link prior_records" href="#" data-name="Prior Records">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link family_background" href="#" data-toggle="modal" data-target="#warningModal" data-name="Birth Data and Family Background">Birth Data and Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_situation" href="#" data-toggle="modal" data-target="#warningModal" data-name="Present Situation">Present Situation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal" data-name="Education and Job History">Education and Job History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active medical_history" href="#" data-name="Medical History">Medical History</a>
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
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Past Medical History</label>
                                        <input type="text" name="text-input" placeholder="Past Medical History" class="form-control past_medical_history">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Present Illness</label>
                                        <input type="text" name="text-input" placeholder="Present Illness" class="form-control present_illness">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Present Medication</label>
                                        <input type="text" name="text-input" placeholder="Present Medication" class="form-control present_medication">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Drug/Alcohol Use</label>
                                        <select class="form-control drug_alcohol_usage select2">
                                            <option value="" selected disabled>Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6" style="display: none" id="extent_use_field">
                                        <label for="text-input" class=" form-control-label">Extent of Use</label>
                                        <input type="text" name="text-input" placeholder="Extent of Use" class="form-control extent_use">
                                    </div>
                                </div>        
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <label for="text-input" class=" form-control-label">Remarks/Additional Information</label>
                                        <textarea placeholder="Remarks" class="form-control remarks_medical"></textarea>
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
    <script src="assets/js/pisJs/psirRecordSave.js"></script>
    <script src="assets/js/pisJs/psirMedHistory.js"></script>


</body>

</html>