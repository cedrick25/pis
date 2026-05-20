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
                                <strong class="card-title">Update Supervision</strong>
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
                                            <div class="title">Docket Number</div>
                                            <input type="text" name="sup_docket_number" class="form-control docketNum_update" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Client</div>
                                            <input type="text" name="sup_client_name" class="form-control pb_client_sup" disabled autocomplete="name">
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
                                                        <input type="text" name="sup_alias" placeholder="Alias" class="form-control alias" autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Type of Referrals</label>
                                                        <select class="form-control referral_type select2" name="sup_referral_type">
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
                                                        <input type="text" name="sup_cc_no" placeholder="Criminal Case No." class="form-control cc_no" autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Court of Origin</label>
                                                        <input type="text" name="sup_court_origin" placeholder="Court of Origin" class="form-control court_origin" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Case Classification</label>
                                                        <select class="form-control case_classification select2" name="sup_case_class">
                                                            <option value="" selected disabled>Please choose</option>
                                                            <option value="MINIMUM">MINIMUM</option>
                                                            <option value="MEDIUM">MEDIUM</option>
                                                            <option value="MAXIMUM">MAXIMUM</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received by PPO</label>
                                                        <input type="date" class="form-control date_rcv_ppo" name="sup_date_rcv_ppo">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="sup_supervising_officer" placeholder="Supervising Officer" class="form-control supervising_officer" autocomplete="name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Probation Start Date</label>
                                                        <input type="date" class="form-control prob_start_date" name="sup_prob_start">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Probation End Date</label>
                                                        <input type="date" class="form-control prob_end_date" name="sup_prob_end">
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
                                                        <select class="form-control office_findings select2" name="sup_office_findings_acted">
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
                                                        <input type="text" name="sup_other_revocation" placeholder="Specify the Other Reasons of Revocation" class="form-control other_reasons_of_revocation" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Specify the Court/PPO where the probationer is transferred</label>
                                                        <input type="text" name="sup_court_transferred" placeholder="Specify the Court/PPO where the probationer is transferred" class="form-control court_probationer_transferred" autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Submitted to the Court</label>
                                                        <input type="date" class="form-control date_submitted_court" name="sup_date_submitted_acted">
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
                                                        <select class="form-control office_findings select2" name="sup_office_findings_pending">
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
                                                        <input type="date" class="form-control date_submitted_court" name="sup_date_submitted_pending">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="sup_supervising_carry" placeholder="Supervising Officer" class="form-control supervising_officer_carry_over" autocomplete="name">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer confirmButton">
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

    <script src="assets/js/pisJs/PIS_Supervision/supervisionDocketUpdate.js">
    </script>


</body>

</html>
