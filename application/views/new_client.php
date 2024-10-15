<?php $this->load->view('templates/header.php'); ?> 

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
                            <li><a href="client_list">Client List</a></li>
                            <li class="active">Create</li>
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
                                <strong class="card-title">Create New Client</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                        <div class="col-12 col-md-9" style="padding-right: 0px; padding-left: 20px;"><input type="text" name="text-input" placeholder="Enter Crimnal Case Number" class="form-control cc_no"></div>
                                    </div>
                                </div>
                                <!-- <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="PROBATIONER">Probationer</option>
                                        </select>
                                    </div>
                                </div> -->
                                <!-- <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office select2">
                                        </select>
                                    </div>
                                </div> -->
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter First Name" class="form-control firstName"></div>
			                    </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3">
                                        <label class="form-check-label" for="mNameCheck">Middle Name</label>
                                        <!-- <div class="form-check">
                                            <input type="checkbox" class="form-check-input middleNameCheck" id="mNameCheck" style="width: 12px; height: 12px;">
                                            <label class="form-check-label italic-font small-font" for="mNameCheck">No Middle Name</label>
                                        </div> -->
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input type="text" name="text-input" placeholder="Enter Middle Name" class="form-control middleName form_capitalized">
                                    </div>
                                </div>
<!-- 			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 fieldMiddleName" >
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
			                        
			                    </div> -->
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Last Name" class="form-control lastName"></div>
			                    </div>
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Suffix" class="form-control suffix"></div>
			                    </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control gender select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Educational Attainment</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Educational Attainment" class="form-control education"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Occupation" class="form-control occupation"></div>
                                </div>
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthdate</label></div>
			                        <div class="col-12 col-md-9"><input type="date" class="form-control birthdate"></div>
			                    </div>
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Birthplace" class="form-control b_place"></div>
			                    </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Address" class="form-control address"></div>
                                </div>
                            </div>
                            <div class="card-footer">
			                    <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
			                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->
    <?php $this->load->view('templates/footer.php'); ?> 
    <!-- Right Panel -->

    <script src="assets/js/pisJs/newClient.js">

    </script>

</body>

</html>