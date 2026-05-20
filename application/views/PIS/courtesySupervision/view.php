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
    <?php $this->load->view('templates/left-panel.php'); ?>

    <div id="right-panel" class="right-panel">

        <?php $this->load->view('templates/avatar.php'); ?>

        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="probation-courtesy-supervision-list">Courtesy Supervision Docket</a></li>
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
                                <strong class="card-title">View Courtesy Supervision Docket</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="spinner_view" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-danger" role="alert" id="view_form_error" style="display:none"></div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Docket Number</div>
                                            <input type="text" name="csup_view_docket" class="form-control docket_number" readonly autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div class="quick-info">
                                            <div class="title">Petitioner</div>
                                            <input type="text" name="csup_view_client" class="form-control client" readonly autocomplete="name">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mb-3">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#csupViewCaseDetails" role="button" aria-expanded="true" aria-controls="csupViewCaseDetails">
                                                <span class="section-label">
                                                    <i class="fa fa-folder-open" aria-hidden="true"></i>
                                                    Case and referral details
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="csupViewCaseDetails" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Criminal Case No.</label>
                                                        <input type="text" name="csup_view_cc" class="form-control cc_num" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Court of Origin</label>
                                                        <input type="text" name="csup_view_court" class="form-control court_origin" readonly autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Referring Office</label>
                                                        <select class="form-control ref_office select2" name="csup_view_ref_office" disabled title="Referring office"></select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Received from the PPO</label>
                                                        <input type="date" name="csup_view_date_rcv" class="form-control date_rcv_from_ppo" readonly>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Supervising Officer</label>
                                                        <input type="text" name="csup_view_sup" class="form-control sup_officer" readonly autocomplete="off">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Period of Supervision</label>
                                                        <input type="text" name="csup_view_period" class="form-control period_supervision" readonly autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Case Classification</label>
                                                        <select class="form-control case_classification select2" name="csup_view_case_class" disabled>
                                                            <option value="">Please choose</option>
                                                            <option value="MINIMUM">MINIMUM</option>
                                                            <option value="MEDIUM">MEDIUM</option>
                                                            <option value="MAXIMUM">MAXIMUM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="card section-card">
                                        <div class="card-header">
                                            <a class="d-flex justify-content-between align-items-center section-trigger" data-toggle="collapse" href="#csupViewCompletedReturned" role="button" aria-expanded="true" aria-controls="csupViewCompletedReturned">
                                                <span class="section-label">
                                                    <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                                                    For referrals completed and returned
                                                </span>
                                                <i class="fa fa-chevron-down text-muted" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div id="csupViewCompletedReturned" class="collapse show">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-sm-12 col-md-6">
                                                        <label class="field-label">Date Completed and Returned</label>
                                                        <input type="date" name="csup_view_date_completed" class="form-control date_completed_and_returned" readonly>
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

    <?php $this->load->view('templates/footer.php'); ?>

    <script src="assets/js/pisJs/PIS_Courtesy_Supervision/view.js"></script>

</body>
</html>
