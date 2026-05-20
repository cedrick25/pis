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
                            <li><a href="parole-pardon-supervision">Parole and Pardon</a></li>
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
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label class="field-label">Client Type</label>
                                        <select class="form-control client_type_update select2" name="sc_ppr_client_type">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="PAROLEE">Parolee</option>
                                            <option value="PARDONEE">Pardonee</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Docket Number</div>
                                            <input type="text" name="sc_ppr_docket_number" placeholder="Docket No." class="form-control docket_num_update" disabled autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Client</div>
                                            <input type="text" name="sc_ppr_client_name" placeholder="Client" class="form-control client_update" disabled autocomplete="name">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                <span class="section-label">
                                                    <i class="fa fa-inbox" aria-hidden="true"></i>
                                                    For Parole and Pardon Supervision Cases Referrals Received
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="received" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Case Classification</label>
                                                        <select class="form-control case_classification select2" name="sc_ppr_case_class">
                                                            <option value="MINIMUM">MINIMUM</option>
                                                            <option value="MEDIUM">MEDIUM</option>
                                                            <option value="MAXIMUM">MAXIMUM</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received by the PPO</label>
                                                        <input type="date" class="form-control date_received_by_ppo" name="sc_ppr_date_rcv_ppo">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="sc_ppr_supervising_officer" placeholder="Supervising Officer" class="form-control sup_officer" autocomplete="name">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervision Start Date</label>
                                                        <input type="date" class="form-control sup_start_date" name="sc_ppr_sup_start">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervision End Date</label>
                                                        <input type="date" class="form-control sup_end_date" name="sc_ppr_sup_end">
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
                                                    For Parole and Pardon Supervision Cases Acted Upon
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="actedUpon" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Office Findings</label>
                                                        <select class="form-control office_findings" name="sc_ppr_office_findings">
                                                            <option value="">Please choose</option>
                                                            <option value="SUMMARY">SUMMARY REPORT</option>
                                                            <option value="INFRACTION">INFRACTION REPORT</option>
                                                            <option value="DEATH">DEATH REPORT</option>
                                                            <option value="OTHERS">OTHERS</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Specify the Other Submitted Reports</label>
                                                        <input type="text" name="sc_ppr_specify_report" placeholder="Specify the Other Submitted Reports" class="form-control specify_report" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Submitted to the Board</label>
                                                        <input type="date" class="form-control date_submitted_board" name="sc_ppr_date_submitted_board">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Report Submitted to the Regional Director for Transfer to Other PPO's</label>
                                                        <input type="date" class="form-control date_submitted_regional_dir" name="sc_ppr_date_submitted_rd">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#resolved" role="button" aria-expanded="true" aria-controls="resolved">
                                                <span class="section-label">
                                                    <i class="fa fa-gavel" aria-hidden="true"></i>
                                                    For Parole and Pardon Supervision Cases Resolved by the Board
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="resolved" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Board Resolution</label>
                                                        <select class="form-control board_resolution" name="sc_ppr_board_resolution">
                                                            <option value="">Please choose</option>
                                                            <option value="FINAL">FINAL RELEASE AND DISCHARGE</option>
                                                            <option value="ARREST">ARREST/RECOMMITMENT</option>
                                                            <option value="DEATH">DEATH</option>
                                                            <option value="OTHERS">OTHERS</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Specify the Other Resolutions received from the Board</label>
                                                        <input type="text" name="sc_ppr_specify_resolution" placeholder="Specify the Other Resolutions received from the Board" class="form-control specify_resolution" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Resolution received from the Board</label>
                                                        <input type="date" class="form-control date_resolution" name="sc_ppr_date_resolution_board">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#resolvedrd" role="button" aria-expanded="true" aria-controls="resolvedrd">
                                                <span class="section-label">
                                                    <i class="fa fa-flag-checkered" aria-hidden="true"></i>
                                                    For Parole and Pardon Supervision Cases Resolved by the Regional Director
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="resolvedrd" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Resolution Received from the Regional Director</label>
                                                        <input type="date" class="form-control date_resolution_rd" name="sc_ppr_date_resolution_rd">
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

    <script src="assets/js/pisJs/SC_Pre_Parole_Supervision/update.js">
    </script>

</body>

</html>
