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
                            <li><a href="probation-courtesy-supervision-list">Courtesy Supervision Docket</a></li>
                            <li class="active">View</li>
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
                                <strong class="card-title">View Courtesy Supervision Investigation</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket Number</label>
                                        <input type="text" name="text-input" placeholder="Docket Number" class="form-control docket_number">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Petitioner's Name</label>
                                        <select class="form-control client select2">
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Criminal Case No.</label>
                                        <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_num">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Court of Origin</label>
                                        <input type="text" name="text-input" placeholder="Court of Origin" class="form-control court_origin">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Referring Office</label>
                                        <select class="form-control ref_office select2">
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Date Received from the PPO</label>
                                        <input type="date" name="text-input" placeholder="Date Received from the PPO" class="form-control date_rcv_from_ppo">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Supervising Officer</label>
                                        <input type="text" name="text-input" placeholder="Supervising Officer" class="form-control sup_officer">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Period of Supervision</label>
                                        <input type="text" name="text-input" placeholder="Period of Supervision" class="form-control period_supervision">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Case Classification</label>
                                        <select class="form-control case_classification select2">
                                            <option value="MINIMUM">MINIMUM</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="MAXIMUM">MAXIMUM</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <p for="text-input" class=" form-control-label">(For Referrals Completed And Returned)</p>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Date Completed and Returned</label>
                                        <input type="date" name="text-input" placeholder="Date Completed and Returned" class="form-control date_completed_and_returned">
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PIS_Courtesy_Supervision/update.js">

    </script>

</body>

</html>