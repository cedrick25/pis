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

    .update-page .form-control-label {
        font-weight: 600;
        color: #4b5563;
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

    .update-page .form-control:disabled,
    .update-page .form-control[readonly] {
        background-color: #f8f9fa;
        color: #2f3d4a;
        border-color: #dee2e6;
        cursor: not-allowed;
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

    .update-page .view-fields-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .update-page .card-footer.confirmButton {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
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
                            <li><a href="investigation_docketing">Investigation Docket</a></li>
                            <li class="active">Update</li>
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
                            <div class="card-header">
                                <strong class="card-title">Update Investigation</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="spinner_update" class="text-center" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading form…</p>
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    Record updated successfully.
                                </div>
                                <div class="alert alert-danger" role="alert" id="update_form_error" style="display:none"></div>
                                <div class="row view-fields-scroll">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <label class="title d-block" for="pis_inv_upd_docket">Docket Number</label>
                                            <input type="text" id="pis_inv_upd_docket" name="docket_number_display" class="form-control docketNum_update" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <label class="title d-block" for="pis_inv_upd_client">Client</label>
                                            <input type="text" id="pis_inv_upd_client" name="client_name_display" class="form-control pb_client" autocomplete="name">
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
                                                        <label class="field-label">Plea Bargain</label>
                                                        <select class="form-control plea_bargain select2">
                                                            <option selected value="">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Criminal Case Number</label>
                                                        <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Court of Origin</label>
                                                        <input type="text" name="text-input" placeholder="Court of Origin" class="form-control court_origin">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Offense</label>
                                                        <input type="text" name="text-input" placeholder="Offense" class="form-control offense">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12">
                                                        <label class="field-label">Sentence</label>
                                                        <input type="text" name="text-input" placeholder="Sentence" class="form-control sentence">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date of Court Order</label>
                                                        <input type="date" class="form-control cod">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received by PPO</label>
                                                        <input type="date" class="form-control rd">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Investigation Officer</label>
                                                        <input type="text" name="text-input" placeholder="Officer Doe" class="form-control inv_off">
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
                                                        <label class="field-label">PSIR Date</label>
                                                        <input type="date" class="form-control psir_date">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">PPO's Recommendation</label>
                                                        <select class="form-control ppo_recommendation select2">
                                                            <option selected value="">Select</option>
                                                            <option value="PSIR - For Granted">For Grant</option>
                                                            <option value="PSIR - For Denial">For Denial</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Manifestation Date</label>
                                                        <input type="date" class="form-control manifestation_date">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Transfer Date</label>
                                                        <input type="date" class="form-control transfer_date">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12">
                                                        <label class="field-label">Transfer To</label>
                                                        <select class="form-control transfer_to select2">
                                                            <option selected value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#notActedUpon" role="button" aria-expanded="true" aria-controls="notActedUpon">
                                                <span class="section-label">
                                                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                                                    For Referrals Not Acted Upon
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="notActedUpon" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Type</label>
                                                        <select class="form-control not_acted_decision select2">
                                                            <option selected value="">Select</option>
                                                            <option value="Recall">Recalled</option>
                                                            <option value="Warrant of Arrest">Warrant of Arrest</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Order Received</label>
                                                        <input type="date" class="form-control date_order_received">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#tableFour" role="button" aria-expanded="true" aria-controls="tableFour">
                                                <span class="section-label">
                                                    <i class="fa fa-gavel" aria-hidden="true"></i>
                                                    For Cases Disposed Of By The Court And Issuance Of
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="tableFour" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Alias</label>
                                                            <input type="text" name="text-input" placeholder="Alias" class="form-control alias_t4">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Court Decision</label>
                                                            <select class="form-control court_decision_t4 select2">
                                                                <option selected value="">Select</option>
                                                                <option value="Recall">Recalled</option>
                                                                <option value="Warrant of Arrest">Warrant of Arrest</option>
                                                            </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Reason for Denial/Dismissal</label>
                                                            <input type="text" name="text-input" placeholder="Reason for Denial/Dismissal" class="form-control reason_for_denial_t4">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Specify other type of Court Decision</label>
                                                            <input type="text" name="text-input" placeholder="Specify other type of Court Decision" class="form-control other_type_of_decision_t4">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                            <label class="field-label">Date Order Received from the Court</label>
                                                            <input type="date" class="form-control date_order_received_court_t4">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="card-footer confirmButton">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm">Confirm</button>
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
    <script src="assets/js/pisJs/PIS_Investigation/investigationDocketUpdate.js"></script>

</body>

</html>