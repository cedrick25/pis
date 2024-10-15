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
                            <li><a href="client_list_parole_and_pardone">Client List</a></li>
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
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                        <div class="col-12 col-md-9" style="padding-right: 0px; padding-left: 20px;">
                                            <select class="form-control client_type select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="PAROLEE">Parole</option>
                                                <option value="PARDONEE">Pardone</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type_update select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="PROBATIONER">Probationer</option>
                                            <option value="PAROLEE">Parolee</option>
                                            <option value="PARDONEE">Pardonee</option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Crimnal Case Number" class="form-control cc_no_update"></div>
                                </div>
			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_update"></div>
			                    </div>
                                <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3">
                                        <label class="form-check-label" for="mNameCheck">Middle Name</label>
                                        <!-- <div class="form-check">
                                            <input type="checkbox" class="form-check-input middleNameCheck" id="mNameCheck" style="width: 12px; height: 12px;">
                                            <label class="form-check-label italic-font small-font" for="mNameCheck">No Middle Name</label>
                                        </div> -->
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_update form_capitalized">
                                    </div>
                                </div>
<!-- 			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_update"></div>
			                    </div> -->
			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_update"></div>
			                    </div>
			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_update"></div>
			                    </div>
                                <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control gender_update select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g College" class="form-control education_update"></div>
                                </div>
                                <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Officer" class="form-control occupation_update"></div>
                                </div>
                                <!-- <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office_update select2">
                                        </select>
                                    </div>
                                </div> -->
			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthdate</label></div>
			                        <div class="col-12 col-md-9"><input type="date" class="form-control birthdate_update"></div>
			                    </div>
			                    <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Quezon" class="form-control b_place_update"></div>
			                    </div>
                                <div class="row form-group row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Marikina" class="form-control address_update"></div>
                                </div>
                            </div>
                            <div class="card-footer">
			                    <button type="button" class="btn btn-primary btn-confirm_update btn-sm float-right">Confirm</button>
			                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/Fact_Sheet/Parole_and_Pardone/client_list_parole_and_pardone_update.js"></script>


</body>

</html>