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
                            <li><a href="investigation_docketing">Courtesy Investigation Docket</a></li>
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
                                <strong class="card-title">Create Courtesy Investigation</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Docket Number" class="form-control docket_number"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control client select2">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control caseload select2">
                                                <option value="" selected disabled>Select Type</option>
                                                <option value="Courtesy Probation Investigation Report">Courtesy Probation Investigation Report</option>
                                                <option value="Full Blown Courtesy Investigation Report">Full Blown Courtesy Investigation Report</option>
                                                <option value="Other Document/s">Other Document/s</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Completed and Returned</label></div>
                                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="" class="form-control date_completed_and_returned"></div>
                                    </div>
                                </div>
<!--                                 <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referring Office</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control ref_office select2">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Received from the PPO</label></div>
                                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="" class="form-control date_rcv_from_ppo"></div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
    			                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
    			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigating Officer</label></div>
    			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Offense" class="form-control inv_officer"></div>
    			                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Reasons</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Court of Origin" class="form-control reasons"></div>
                                    </div>
                                </div> -->
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

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PIS_investigation/investigationDocketCreate.js">

    </script>

</body>

</html>