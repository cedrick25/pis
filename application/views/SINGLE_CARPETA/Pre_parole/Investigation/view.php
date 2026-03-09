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

    .view-page .card {
        border: 1px solid #e4e7ea;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .view-page .card-title {
        font-weight: 600;
        color: #2f3d4a;
    }

    .view-page .section-card .card-header {
        background: #f8fafc;
        border-bottom: 1px solid #e9ecef;
        padding: 0;
    }

    .view-page .section-trigger {
        width: 100%;
        padding: 14px 18px;
        color: #2f3d4a;
        font-weight: 600;
        text-decoration: none !important;
    }

    .view-page .section-trigger:hover {
        background: #f3f6f9;
    }

    .view-page .section-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .view-page .section-label i {
        color: #6c757d;
    }

    .view-page .field-label {
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 6px;
    }

    .view-page .form-control:disabled,
    .view-page .form-control[readonly] {
        background-color: #f8f9fa;
        color: #2f3d4a;
        border-color: #dee2e6;
        cursor: not-allowed;
    }

    .view-page .quick-info {
        background: #f8fafc;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 14px 16px;
        margin-bottom: 16px;
    }

    .view-page .quick-info .title {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: #6c757d;
        margin-bottom: 4px;
    }

    .view-page .quick-info .value {
        font-size: 15px;
        color: #2f3d4a;
        font-weight: 600;
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
                            <li class="active">Investigation List View</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3 view-page">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">View Investigation List</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Docket Number</div>
                                            <input type="text" name="text-input" placeholder="Docket No." class="form-control docket_num_update" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Client</div>
                                            <select class="form-control client_update select2">
                                                <option selected value="none" disabled>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <div class="card section-card">
                                            <div class="card-header">
                                                <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                    <span class="section-label">
                                                        <i class="fa fa-inbox" aria-hidden="true"></i>
                                                        For Referrals Received
                                                    </span>
                                                    <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                            <div id="received" class="collapse show">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Criminal Case No.</label>
                                                            <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no_update">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Name of Prison/Jail</label>
                                                            <input type="text" name="text-input" placeholder="Name of Prison/Jail" class="form-control name_prison">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">From</label>
                                                            <select class="form-control board_order_update select2">
                                                                <option selected value="select" disabled>Select</option>
                                                                <option value="penal_colony">Penal Colony</option>
                                                                <option value="prison">Prison</option>
                                                                <option value="jail">Jail</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Offense</label>
                                                            <input type="text" name="text-input" placeholder="Offense" class="form-control offense">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Date Received by the PPO</label>
                                                            <input type="date" class="form-control date_received_by_ppo">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Investigating Officer</label>
                                                            <input type="text" name="text-input" placeholder="Investigating Officer" class="form-control inv_officer">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 mb-3">
                                        <div class="card section-card">
                                            <div class="card-header">
                                                <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#actedUpon" role="button" aria-expanded="true" aria-controls="actedUpon">
                                                    <span class="section-label">
                                                        <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                                        For Referrals Acted Upon
                                                    </span>
                                                    <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                            <div id="actedUpon" class="collapse show">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Date Pre-Parole/Executive Clemency Investigation Report Submitted</label>
                                                            <input type="date" class="form-control date_peci_update">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">PPO's Recommendation</label>
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
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Transfer Date</label>
                                                            <input type="date" class="form-control transfered_date">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Transfer To</label>
                                                            <input type="text" name="text-input" placeholder="Transfer To" class="form-control transfer_to">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="card section-card">
                                            <div class="card-header">
                                                <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#table4" role="button" aria-expanded="true" aria-controls="table4">
                                                    <span class="section-label">
                                                        <i class="fa fa-gavel" aria-hidden="true"></i>
                                                        Cases Resolved by the Board
                                                    </span>
                                                    <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                            <div id="table4" class="collapse show">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Court Decision</label>
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
                                                                <option value="Died">DIED</option>
                                                                <option value="Others">Others</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Date Order Received from the Court</label>
                                                            <input type="date" class="form-control date_order_rcv_court">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/SC_Pre_Parole_Investigation/view.js">

    </script>

</body>

</html>