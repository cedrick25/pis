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
                            <li><a href="parole-pardon-courtesy-investigation-list">Courtesy Investigation Docket</a></li>
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
                                <strong class="card-title">Update Courtesy Investigation</strong>
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
                                            <input type="text" name="sc_cinv_docket_number" class="form-control docket_num_update" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Client</div>
                                            <input type="text" name="sc_cinv_client_name" class="form-control client_update" disabled autocomplete="name">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                <span class="section-label">
                                                    <i class="fa fa-inbox" aria-hidden="true"></i>
                                                    For Courtesy Investigation Referrals Received
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="received" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Referring Office</label>
                                                        <select class="form-control ref_office select2" name="sc_cinv_ref_office">
                                                            <option value="" selected disabled>Please Choose</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received by the PPO</label>
                                                        <input type="date" class="form-control date_received_by_ppo" name="sc_cinv_date_received">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Investigating Officer</label>
                                                        <input type="text" name="sc_cinv_inv_officer" placeholder="Investigating Officer" class="form-control inv_officer" autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Reasons</label>
                                                        <input type="text" name="sc_cinv_reasons" placeholder="Reasons" class="form-control reasons" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#casesActedUpon" role="button" aria-expanded="true" aria-controls="casesActedUpon">
                                                <span class="section-label">
                                                    <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                                    For Referrals Completed and Returned
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="casesActedUpon" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Completed and Returned</label>
                                                        <input type="date" class="form-control date_completed_and_returned" name="sc_cinv_date_completed">
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

    <script src="assets/js/pisJs/SC_Pre_Parole_Courtesy_Investigation/update.js">
    </script>


</body>

</html>
