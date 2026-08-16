<?php $this->load->view('templates/header.php'); ?> 
<style>
    .spinner {
        border: 8px solid #f3f3f3; /* Light gray */
        border-top: 8px solid black; /* Black */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }
    /* Spinner animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .client-container {
        min-width: 1550px;
        margin: auto;
        background-color: #e1efff;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .left-side {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .name-container {
        width: 1300px; 
        height: 50px;
        flex: 1;
        margin-bottom: 30px;
        border-bottom: 5px solid white;
    }
    .name-header {
        background-color: transparent;
        padding: 2px 12px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        /*font-weight: bold;*/
    }
    .name-text {
        color: #3a77c6;
        font-weight: bold;
    }
    .img-body {
        width: 215px;
        display: block;
        padding: 5px;
    }
    .img-cont {
        width: 200px;
        height: 190px;
        margin: auto;
        align-items: flex-start;
        background-color: #e7e9eb;
    }
    .details-container {
        width: 1300px;
    }
</style>
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
                            <li><a href="#" id="factSheet">Fact Sheet</a></li>
                            <li class="active">Update</li>
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
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">Update Client</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body" style="background-color: #e1efff;">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="client-container">
                                    <div class="left-side">
                                        <div class="name-container">
                                            <div class="name-header">
                                                <span class="name-text" id="petitionerName"></span>
                                            </div>
                                        </div>
                                        <div class="details-container">
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="First Name" class="form-control firstName_update"></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Middle Name" class="form-control middleName_update"></div>
                                                <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control lastName_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Ext</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Ext" class="form-control suffix_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Alias(es)</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Alias(es)" class="form-control alias_update" style="height: 100px; align-content: center;"></textarea></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Jail</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Jail" class="form-control jail_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Is Local Jail ?</label></div>
                                                <div class="col-12 col-md-4">
                                                    <select class="form-control local_jail_update select2">
                                                        <option selected value="" disabled>Select</option>
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Identifying Marks</label></div>
                                                <div class="col-12 col-md-4">
                                                    <select class="form-control identifying_marks_update select2">
                                                        <option selected value="" disabled>Select</option>
                                                    </select>
                                                </div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Educ'l Attainment</label></div>
                                                <div class="col-12 col-md-4">
                                                    <input type="text" name="text-input" placeholder="Educational Attainment" class="form-control educational_attainment_update">
                                                </div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Description</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Description" class="form-control client_description_update" style="height: 100px; align-content: center;"></textarea></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Physical Handicap</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Physical Handicap" class="form-control physical_handicap_update" style="height: 100px; align-content: center;"></textarea></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Address" class="form-control address_update" style="height: 100px; align-content: center;"></textarea></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Occupation" class="form-control occupation_update" style="height: 100px; align-content: center;"></textarea></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date of Birth</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control birthdate_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Hobbies</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Occupation" class="form-control hobbies_update" style="height: 100px; align-content: center;"></textarea></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Skills</label></div>
                                                <div class="col-12 col-md-4"><textarea  placeholder="Skills" class="form-control skills_update" style="height: 100px; align-content: center;"></textarea></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Birth Region</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Birth Region" class="form-control birth_region_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Religion</label></div>
                                                <div class="col-12 col-md-4">
                                                    <select class="form-control religion_update select2">
                                                        <option selected value="" disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Birth Province</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Birth Province" class="form-control birth_province_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Birth City</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Birth City" class="form-control birth_city_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Age</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Age" class="form-control age_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sibling Rank</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Sibling Rank" class="form-control sibling_rank_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sex</label></div>
                                                <div class="col-12 col-md-4">
                                                    <select class="form-control gender_update select2">
                                                        <option selected value="none" disabled>Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                                <div class="col-12 col-md-4">
                                                    <select class="form-control civil_status_update select2">
                                                        <option selected value="none" disabled>Select</option>
                                                    </select>
                                                </div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Number of Female Siblings</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Number of Female Siblings" class="form-control female_siblings_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Spouse's Name</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Spouse's Name" class="form-control spouse_name_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Number of Male Siblings</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Number of Male Siblings" class="form-control male_siblings_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Number of Dependents</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Number of Dependents" class="form-control dependents_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Organizational Membership</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Organizational Membership" class="form-control org_mem_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center" style="border-top: 5px solid white; border-bottom: 5px solid white;">
                                                <div class="col col-md-12" style="padding-top: 5px; padding-bottom: 5px;"><span class="name-text">Case Profile</span></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Custody Status</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Custody Status" class="form-control custody_status"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Charge With</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Charge With" class="form-control charge_with_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date Probation Granted</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control probation_granted_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control charged_with_date_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Convicted Of" class="form-control convicted_of_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control convicted_of_date_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence (Inc. Fine/Incl)</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Sentence (Inc. Fine/Incl)" class="form-control sentence_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Period of Supervision</label></div>
                                                <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control pyears_update"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label"></label>Year(s)</div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label"></label></div>
                                                <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control pmonths_update"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label"></label>Month(s)</div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label"></label></div>
                                                <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control pdays_update"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label"></label>Day(s)</div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Judge</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Judge" class="form-control judge_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date Started</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control date_started_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Court</label></div>
                                                <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="Court" class="form-control court_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date FR/VR/TR/ET Submitted</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control date_fr_vr_tr_et_submitted_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date PSIR/Motion/ Manifestation</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control date_psir_update"></div>
                                                <div class="col col-md-1"></div>
                                                <div class="col-12 col-md-1"></div>
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date Court Order</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control date_court_update"></div>
                                            </div>
                                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-end">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Date Received</label></div>
                                                <div class="col-12 col-md-4"><input type="date" class="form-control date_received_update"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="img-body">
                                        <div class="img-cont">
                                            <img class="align-content" id="client_photo" src="images/nopic.jpg" style="width: 100%; height: 100%;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm float-right">Confirm</button>
			                    <button type="button" class="btn btn-secondary btn-cance-update btn-sm float-right mx-2">Cancel</button>
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
    <script src="assets/js/pisJs/clientUpdate.js"></script>


</body>

</html>