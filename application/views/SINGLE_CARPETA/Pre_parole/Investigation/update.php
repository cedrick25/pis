<?php $this->load->view('templates/header.php'); ?> 
<style>
    .update-page .card {
        border: 1px solid #e4e7ea;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .update-page .card-title {
        font-weight: 600;
        color: #2f3d4a;
    }

    .update-page .card-body--with-loader {
        position: relative;
        min-height: 12rem;
    }

    .update-page #spinner_update {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.92);
        border-radius: 0 0 0.25rem 0.25rem;
    }

    .update-page #spinner_update.is-hidden {
        display: none !important;
    }

    .update-page .section-card .card-header {
        background: #f8fafc;
        border-bottom: 1px solid #e9ecef;
        padding: 0;
    }

    .update-page .section-trigger {
        width: 100%;
        padding: 14px 18px;
        color: #2f3d4a;
        font-weight: 600;
        text-decoration: none !important;
    }

    .update-page .section-trigger:hover {
        background: #f3f6f9;
    }

    .update-page .section-trigger:focus {
        outline: 2px solid #80bdff;
        outline-offset: 2px;
        z-index: 1;
    }

    .update-page .section-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .update-page .section-label i {
        color: #6c757d;
    }

    .update-page .field-label {
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 6px;
    }

    .update-page .form-control:disabled,
    .update-page .form-control[readonly] {
        background-color: #f8f9fa;
        color: #2f3d4a;
        border-color: #dee2e6;
        cursor: not-allowed;
    }

    .update-page .quick-info {
        background: #f8fafc;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 14px 16px;
        margin-bottom: 16px;
    }

    .update-page .quick-info .title {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: #6c757d;
        margin-bottom: 4px;
    }

    .pis-toast-stack {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 320px;
        pointer-events: none;
    }

    .pis-toast {
        opacity: 0;
        transform: translateX(12px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: 600;
        font-size: 13px;
        border: 1px solid transparent;
    }

    .pis-toast.pis-toast--visible {
        opacity: 1;
        transform: translateX(0);
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
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="parole-pardon-investigation-list">Parole and Pardon</a></li>
                            <li class="active">Investigation List Update</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3 update-page">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">Update Investigation List</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="spinner_update" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading form…</p>
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    Record updated successfully.
                                </div>
                                <div class="alert alert-danger" role="alert" id="update_form_error" style="display:none"></div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <label class="title d-block" for="sc_ppinv_upd_docket">Docket Number</label>
                                            <input type="text" id="sc_ppinv_upd_docket" name="docket_number_display" placeholder="Docket No." class="form-control docket_num_update" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <label class="title d-block" for="sc_ppinv_upd_client">Client</label>
                                            <input type="text" id="sc_ppinv_upd_client" name="client_name_display" placeholder="Client Name" class="form-control client_update" readonly>
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
                                                            <label class="field-label" for="sc_ppinv_cc_no">Criminal Case No.</label>
                                                            <input type="text" id="sc_ppinv_cc_no" name="criminal_case_no" placeholder="Criminal Case No." class="form-control cc_no_update">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_prison">Name of Prison/Jail</label>
                                                            <input type="text" id="sc_ppinv_prison" name="prison_name" placeholder="Name of Prison/Jail" class="form-control name_prison">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label for="sc_ppinv_update_from" class="field-label">From</label>
                                                            <select id="sc_ppinv_update_from" class="form-control board_order_update select2" aria-describedby="fb_board_from" aria-invalid="false">
                                                                <option selected value="select" disabled>Select</option>
                                                                <option value="penal_colony">Penal Colony</option>
                                                                <option value="prison">Prison</option>
                                                                <option value="jail">Jail</option>
                                                            </select>
                                                            <div class="invalid-feedback" id="fb_board_from" style="display:none"></div>
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_offense">Offense</label>
                                                            <input type="text" id="sc_ppinv_offense" name="offense" placeholder="Offense" class="form-control offense">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_date_rcv_ppo">Date Received by the PPO</label>
                                                            <input type="date" id="sc_ppinv_date_rcv_ppo" name="date_received_by_ppo" class="form-control date_received_by_ppo">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_inv_officer">Investigating Officer</label>
                                                            <input type="text" id="sc_ppinv_inv_officer" name="investigating_officer" placeholder="Investigating Officer" class="form-control inv_officer">
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
                                                            <label class="field-label" for="sc_ppinv_date_peci">Date Pre-Parole/Executive Clemency Investigation Report Submitted</label>
                                                            <input type="date" id="sc_ppinv_date_peci" name="date_peci_report" class="form-control date_peci_update">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_ppo_rec">PPO's Recommendation</label>
                                                            <select id="sc_ppinv_ppo_rec" name="ppo_recommendation" class="form-control ppo_recommendation select2">
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
                                                            <label class="field-label" for="sc_ppinv_transfer_dt">Transfer Date</label>
                                                            <input type="date" id="sc_ppinv_transfer_dt" name="transfer_date" class="form-control transfered_date">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label" for="sc_ppinv_transfer_to">Transfer To</label>
                                                            <input type="text" id="sc_ppinv_transfer_to" name="transfer_to" placeholder="Transfer To" class="form-control transfer_to">
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
                                                            <label class="field-label" for="sc_ppinv_court_dec">Court Decision</label>
                                                            <select id="sc_ppinv_court_dec" name="court_decision" class="form-control court_decision select2">
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
                                                            <label class="field-label" for="sc_ppinv_date_order">Date Order Received from the Court</label>
                                                            <input type="date" id="sc_ppinv_date_order" name="date_order_rcv_court" class="form-control date_order_rcv_court">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer confirmButton d-flex flex-wrap justify-content-end">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="pis_toast_stack" class="pis-toast-stack" aria-live="polite" aria-atomic="false"></div>

    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/SC_Pre_Parole_Investigation/update.js"></script>

</body>

</html>
