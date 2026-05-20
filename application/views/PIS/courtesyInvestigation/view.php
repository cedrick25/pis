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

    .view-page .form-control-label {
        font-weight: 600;
        color: #4b5563;
    }

    .view-page .form-row {
        margin-bottom: 2px;
    }

    .view-page .form-control:disabled,
    .view-page .form-control[readonly] {
        background-color: #f8f9fa;
        color: #2f3d4a;
        border-color: #dee2e6;
        cursor: not-allowed;
    }

    .view-page .section-note {
        background: #f8fafc;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 10px 14px;
        margin-top: 10px;
        margin-bottom: 14px;
        color: #4b5563;
        font-weight: 600;
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
                            <li><a href="probation-courtesy-investigation-list">Courtesy Investigation Docket</a></li>
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
                                <strong class="card-title">View Courtesy Investigation</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="spinner_view" class="text-center" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-danger" role="alert" id="view_form_error" style="display:none"></div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_docket_number" class=" form-control-label">Docket Number</label>
                                        <input type="text" id="cinv_view_docket_number" name="cinv_view_docket_number" placeholder="Docket Number" class="form-control docket_number" readonly autocomplete="off">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_client_name" class=" form-control-label">Petitioner's Name</label>
                                        <input type="text" id="cinv_view_client_name" name="cinv_view_client_name" placeholder="Petitioner's Name" class="form-control client" readonly autocomplete="name">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_ref_office" class=" form-control-label">Referring Office</label>
                                        <select id="cinv_view_ref_office" name="cinv_view_ref_office" class="form-control ref_office select2" disabled>
                                        </select>
                                        <p id="ref_office_list_error" class="small text-danger mt-1 mb-0" style="display:none;" role="alert"></p>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_date_rcv_ppo" class=" form-control-label">Date Received from the PPO</label>
                                        <input type="date" id="cinv_view_date_rcv_ppo" name="cinv_view_date_rcv_ppo" class="form-control date_rcv_from_ppo" readonly>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_inv_officer" class=" form-control-label">Investigating Officer</label>
                                        <input type="text" id="cinv_view_inv_officer" name="cinv_view_inv_officer" placeholder="Investigating Officer" class="form-control inv_officer" readonly autocomplete="off">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_reasons" class=" form-control-label">Reasons</label>
                                        <input type="text" id="cinv_view_reasons" name="cinv_view_reasons" placeholder="Reasons" class="form-control reasons" readonly autocomplete="off">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <p class="section-note">(For Referrals Completed And Returned)</p>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="cinv_view_date_completed_returned" class=" form-control-label">Date Completed and Returned</label>
                                        <input type="date" id="cinv_view_date_completed_returned" name="cinv_view_date_completed_returned" class="form-control date_completed_and_returned" readonly>
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

    <script src="assets/js/pisJs/PIS_Courtesy_Investigation/view.js">

    </script>

</body>

</html>
