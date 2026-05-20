<?php $this->load->view('templates/header.php'); ?>
<style>
    .view-page .card {
        border: 1px solid #e4e7ea;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .view-page .card-title {
        font-weight: 600;
        color: #2f3d4a;
    }

    .view-page .card-body--with-loader {
        position: relative;
        min-height: 12rem;
    }

    .view-page #spinner_view {
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

    .view-page #spinner_view.is-hidden {
        display: none !important;
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
                            <li><a href="supervision_docketing">Supervision Docket</a></li>
                            <li class="active">View</li>
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
                            <div class="card-header">
                                <strong class="card-title">View Supervision Docket</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="spinner_view" class="text-center" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-danger" role="alert" id="view_form_error" style="display:none"></div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Docket Number</div>
                                            <input type="text" name="sup_view_docket" class="form-control docketNum_update" readonly autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Client</div>
                                            <input type="text" name="sup_view_client" class="form-control pb_client_sup" readonly autocomplete="name">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                <span class="section-label">
                                                    <i class="fa fa-inbox" aria-hidden="true"></i>
                                                    For Probation Supervision Referrals Received
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="received" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Alias</label>
                                                        <input type="text" name="sup_view_alias" placeholder="Alias" class="form-control alias" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Type of Referrals</label>
                                                        <select class="form-control referral_type select2" name="sup_view_referral_type" disabled>
                                                            <option value="" selected disabled>Please Choose</option>
                                                            <option value="From Local Courts">From Local Courts</option>
                                                            <option value="Direct Transfer, Court to Court">Direct Transfer, Court to Court</option>
                                                            <option value="From Military Courts">From Military Courts</option>
                                                            <option value="Transfer from other Offices/Courts">Transfer from other Offices/Courts</option>
                                                            <option value="Reconsidered/Reinstated">Reconsidered/Reinstated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Criminal Case Number</label>
                                                        <input type="text" name="sup_view_cc" placeholder="Criminal Case No." class="form-control cc_no" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Court of Origin</label>
                                                        <input type="text" name="sup_view_court_origin" placeholder="Court of Origin" class="form-control court_origin" readonly autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Case Classification</label>
                                                        <select class="form-control case_classification select2" name="sup_view_case_class" disabled>
                                                            <option value="" selected disabled>Please choose</option>
                                                            <option value="MINIMUM">MINIMUM</option>
                                                            <option value="MEDIUM">MEDIUM</option>
                                                            <option value="MAXIMUM">MAXIMUM</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received by PPO</label>
                                                        <input type="date" class="form-control date_rcv_ppo" name="sup_view_date_rcv" readonly>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="sup_view_supervising" placeholder="Supervising Officer" class="form-control supervising_officer" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Probation Start Date</label>
                                                        <input type="date" class="form-control prob_start_date" name="sup_view_prob_start" readonly>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Probation End Date</label>
                                                        <input type="date" class="form-control prob_end_date" name="sup_view_prob_end" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#casesActedUpon" role="button" aria-expanded="true" aria-controls="casesActedUpon">
                                                <span class="section-label">
                                                    <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                                    For Probation Supervision Cases Acted Upon
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="casesActedUpon" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Office Findings</label>
                                                        <select class="form-control office_findings select2" name="sup_view_office_acted" disabled>
                                                            <option value="">Please choose</option>
                                                            <optgroup label="Termination">
                                                                <option value="Termination - Full Term">Termination - Full Term</option>
                                                                <option value="Termination - Early Termination">Termination - Early Termination</option>
                                                                <option value="Termination - Died">Termination - Died</option>
                                                            </optgroup>
                                                            <optgroup label="Revocation">
                                                                <option value="Revocation - Abscond">Revocation - Abscond</option>
                                                                <option value="Revocation - Commission of Another Offense">Revocation - Commission of Another Offense</option>
                                                                <option value="Revocation - Violation of Probation Conditions">Revocation - Violation of Probation Conditions</option>
                                                                <option value="Revocation - Other">Revocation - Other</option>
                                                            </optgroup>
                                                            <option value="Extension of Probation Period">Extension of Probation Period</option>
                                                            <option value="Transfer to Other Courts/PPO">Transfer to Other Courts/PPO</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Specify the Other Reasons of Revocation</label>
                                                        <input type="text" name="sup_view_other_rev" placeholder="Specify the Other Reasons of Revocation" class="form-control other_reasons_of_revocation" readonly autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Specify the Court/PPO where the probationer is transferred</label>
                                                        <input type="text" name="sup_view_court_trans" placeholder="Specify the Court/PPO where the probationer is transferred" class="form-control court_probationer_transferred" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Submitted to the Court</label>
                                                        <input type="date" class="form-control date_submitted_court" name="sup_view_date_submitted_acted" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#carryOver" role="button" aria-expanded="true" aria-controls="carryOver">
                                                <span class="section-label">
                                                    <i class="fa fa-gavel" aria-hidden="true"></i>
                                                    For Carry Over Probation Supervision Cases Pending Disposition in Court
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="carryOver" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Office Findings</label>
                                                        <select class="form-control office_findings select2" name="sup_view_office_pending" disabled>
                                                            <option value="">Please choose</option>
                                                            <optgroup label="Termination">
                                                                <option value="Termination - Full Term">Termination - Full Term</option>
                                                                <option value="Termination - Early Termination">Termination - Early Termination</option>
                                                                <option value="Termination - Died">Termination - Died</option>
                                                            </optgroup>
                                                            <optgroup label="Revocation">
                                                                <option value="Revocation - Abscond">Revocation - Abscond</option>
                                                                <option value="Revocation - Commission of Another Offense">Revocation - Commission of Another Offense</option>
                                                                <option value="Revocation - Violation of Probation Conditions">Revocation - Violation of Probation Conditions</option>
                                                                <option value="Revocation - Other">Revocation - Other</option>
                                                            </optgroup>
                                                            <option value="Extension of Probation Period">Extension of Probation Period</option>
                                                            <option value="Transfer to Other Courts/PPO">Transfer to Other Courts/PPO</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Submitted to the Court</label>
                                                        <input type="date" class="form-control date_submitted_court" name="sup_view_date_submitted_pending" readonly>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="sup_view_supervising_carry" placeholder="Supervising Officer" class="form-control supervising_officer_carry_over" readonly autocomplete="off">
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

    <script src="assets/js/pisJs/PIS_Supervision/supervisionDocketView.js"></script>
</body>

</html>
