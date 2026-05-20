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

    .update-page .form-control-label {
        font-weight: 600;
        color: #4b5563;
    }

    .update-page .form-control:disabled,
    .update-page .form-control[readonly] {
        background-color: #f8f9fa;
        color: #2f3d4a;
        border-color: #dee2e6;
        cursor: not-allowed;
    }

    .update-page .section-note {
        background: #f8fafc;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 10px 14px;
        margin-top: 10px;
        margin-bottom: 14px;
        color: #4b5563;
        font-weight: 600;
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
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="parole-pardon-courtesy-supervision-list">Courtesy Supervision Docket</a></li>
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
                                <strong class="card-title">Update Courtesy Supervision Investigation</strong>
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

                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_client_type" class="form-control-label">Client Type</label>
                                        <select id="sc_ppcsup_update_client_type" class="form-control client_type_update select2" aria-describedby="fb_client_type">
                                            <option selected value="" disabled>Select</option>
                                            <option value="PAROLEE">Parolee</option>
                                            <option value="PARDONEE">Pardonee</option>
                                        </select>
                                        <div class="invalid-feedback" id="fb_client_type" style="display:none"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_docket" class="form-control-label">Docket Number</label>
                                        <input type="text" id="sc_ppcsup_update_docket" name="sc_ppcsup_update_docket" placeholder="Docket Number" class="form-control docket_num_update" disabled>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_petitioner" class="form-control-label">Petitioner's Name</label>
                                        <input type="text" id="sc_ppcsup_update_petitioner" name="sc_ppcsup_update_petitioner" placeholder="Petitioner's Name" class="form-control client_update" readonly>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_cc" class="form-control-label">Criminal Case No.</label>
                                        <input type="text" id="sc_ppcsup_update_cc" name="sc_ppcsup_update_cc" placeholder="Criminal Case No." class="form-control cc_num">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_court" class="form-control-label">Court of Origin</label>
                                        <input type="text" id="sc_ppcsup_update_court" name="sc_ppcsup_update_court" placeholder="Court of Origin" class="form-control court_origin">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_ref_office_primary" class="form-control-label">Referring Office</label>
                                        <select id="sc_ppcsup_update_ref_office_primary" class="form-control ref_office select2" aria-describedby="fb_ref_office">
                                        </select>
                                        <div class="invalid-feedback" id="fb_ref_office" style="display:none"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_date_rcv_ppo" class="form-control-label">Date Received from the PPO</label>
                                        <input type="date" id="sc_ppcsup_update_date_rcv_ppo" name="sc_ppcsup_update_date_rcv_ppo" placeholder="Date Received from the PPO" class="form-control date_received_from_ppo">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_sup_officer" class="form-control-label">Supervising Officer</label>
                                        <input type="text" id="sc_ppcsup_update_sup_officer" name="sc_ppcsup_update_sup_officer" placeholder="Supervising Officer" class="form-control sup_officer">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_period" class="form-control-label">Period of Supervision</label>
                                        <input type="text" id="sc_ppcsup_update_period" name="sc_ppcsup_update_period" placeholder="Period of Supervision" class="form-control period_cs_sup">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_case_class" class="form-control-label">Case Classification</label>
                                        <select id="sc_ppcsup_update_case_class" class="form-control case_classification select2">
                                            <option value="MINIMUM">MINIMUM</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="MAXIMUM">MAXIMUM</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <p class="section-note">(For Referrals Completed And Returned)</p>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="sc_ppcsup_update_date_completed" class="form-control-label">Date Completed and Returned</label>
                                        <input type="date" id="sc_ppcsup_update_date_completed" name="sc_ppcsup_update_date_completed" placeholder="Date Completed and Returned" class="form-control date_returned">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer confirmButton">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm float-right">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="pis_toast_stack" class="pis-toast-stack" aria-live="polite" aria-atomic="false"></div>

    </div><!-- /#right-panel -->

    <?php $this->load->view('templates/footer.php'); ?>

    <script src="assets/js/pisJs/SC_Pre_Parole_Courtesy_Supervision/update.js"></script>

</body>

</html>
