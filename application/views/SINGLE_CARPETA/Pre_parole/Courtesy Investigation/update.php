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
                            <li><a href="parole-pardon-courtesy-investigation-list">Pre-Parole</a></li>
                            <li class="active">Courtesy Investigation Update</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">Update Courtesy Investigation</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket No.</label>
                                        <input type="text" name="text-input" placeholder="Docket No." class="form-control docket_num_update" disabled>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Client</label>
                                        <select class="form-control client_update select2">
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Referring Office</label>
                                        <select class="form-control ref_office select2">
                                            <option selected value="select" disabled>Select</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class="form-control-label">Date Received by the PPO</label>
                                        <input type="date" class="form-control date_received_by_ppo">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Investigating Officer</label>
                                        <input type="text" name="text-input" placeholder="Investigating Officer" class="form-control inv_officer">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Reasons</label>
                                        <input type="text" name="text-input" placeholder="Reasons" class="form-control reasons">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <p for="text-input" class=" form-control-label">(For Referrals Completed And Returned)</p>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Date Completed and Returned</label>
                                        <input type="date" name="text-input" placeholder="Date Completed and Returned" class="form-control date_completed_and_returned">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm float-right">Confirm</button>
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