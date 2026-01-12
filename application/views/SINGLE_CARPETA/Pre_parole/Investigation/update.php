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
                            <li><a href="parole-pardon-investigation-list">Parole and Pardon</a></li>
                            <li class="active">Investigation List Update</li>
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
                                <strong class="card-title">Update Investigation List</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket No.</label>
                                        <input type="text" name="text-input" placeholder="Docket No." class="form-control docket_num_update" disabled>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Client</label>
                                        <select class="form-control client_update select2">
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Referrals Received
                                                <div>
                                                    <a data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="received" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Criminal Case No.</label>
                                                        <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no_update">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Name of Prison/Jail</label>
                                                        <input type="text" name="text-input" placeholder="Name of Prison/Jail" class="form-control name_prison">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">From</label>
                                                        <select class="form-control board_order_update select2">
                                                            <option selected value="select" disabled>Select</option>
                                                            <option value="penal_colony">Penal Colony</option>
                                                            <option value="prison">Prison</option>
                                                            <option value="jail">Jail</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Offense</label>
                                                        <input type="text" name="text-input" placeholder="Offense" class="form-control offense">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class="form-control-label">Date Received by the PPO</label>
                                                        <input type="date" class="form-control date_received_by_ppo">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Investigating Officer</label>
                                                        <input type="text" name="text-input" placeholder="Investigating Officer" class="form-control inv_officer">
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
                                                For Referrals Acted Upon
                                                <div>
                                                    <a data-toggle="collapse" href="#actedUpon" role="button" aria-expanded="true" aria-controls="actedUpon">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="actedUpon" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Pre-Parole/Executive Clemency Investigation Report Submitted</label>
                                                        <input type="date" class="form-control date_peci_update">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">PPO's Recommendation</label>
                                                        <select class="form-control ppo_recommendation select2">
                                                        <option value="">None</option>
                                                        <option value="Parole - For Granted">Parole - For Grant</option>
                                                        <option value="Parole - For Denial">Parole - For Denial</option>
                                                        <option value="Commutation - For Granted">Commutation - For Grant</option>
                                                        <option value="Commutation - For Denial">Commutation - For Denial</option>
                                                        <option value="Conditional Pardon - For Granted">Conditional Pardon - For Grant</option>
                                                        <option value="Conditional Pardon - For Denial">Conditional Pardon - For Denial</option>
                                                        <option value="Absolute Pardon - For Granted">Absolute Pardon - For Grant</option>
                                                        <option value="Absolute Pardon - For Denial">Absolute Pardon - For Denial</option>
                                                        <option value="Other">Other</option>
                                                      </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class="form-control-label">Transfer Date</label>
                                                        <input type="date" class="form-control transfered_date">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Transfer To</label>
                                                        <input type="text" name="text-input" placeholder="Transfer To" class="form-control transfer_to">
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
                                                For Pre-Parole/Executive Clemency Investigation Cases Resolved By The Board
                                                <div>
                                                    <a data-toggle="collapse" href="#table4" role="button" aria-expanded="true" aria-controls="table4">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="table4" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Court Decision</label>
                                                        <select class="form-control court_decision select2">
                                                            <option value="">Please choose</option>
                                                            <option value="PAROLE - Granted">PAROLE - Granted</option>
                                                            <option value="PAROLE - Denial">PAROLE - Denial</option>
                                                            <option value="PAROLE - Cancelled">PAROLE - Cancelled</option>
                                                            <option value="COMMUTATION - Granted">COMMUTATION - Granted</option>
                                                            <option value="COMMUTATION - Denial">COMMUTATION - Denial</option>
                                                            <option value="COMMUTATION - Cancelled">COMMUTATION - Cancelled</option>
                                                            <option value="CONDITIONAL - Granted">CONDITIONAL - Granted</option>
                                                            <option value="CONDITIONAL - Denial">CONDITIONAL - Denial</option>
                                                            <option value="CONDITIONAL - Cancelled">CONDITIONAL - Cancelled</option>
                                                            <option value="ABSOLUTE - Granted">ABSOLUTE - Granted</option>
                                                            <option value="ABSOLUTE - Denial">ABSOLUTE - Denial</option>
                                                            <!-- <option value="ABSOLUTE - Cancelled">ABSOLUTE - Cancelled</option> -->
                                                            <option value="Died">DIED</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class="form-control-label">Date Order Received from the Court</label>
                                                        <input type="date" class="form-control date_order_rcv_court">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

    <script src="assets/js/pisJs/SC_Parolee_Investigation/paroleeInvestigationUpdate.js">

    </script>

</body>

</html>