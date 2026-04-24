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

    .update-page .form-row {
        margin-bottom: 2px;
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
                            <li><a href="probation-courtesy-investigation-list">Courtesy Investigation Docket</a></li>
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
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket Number</label>
                                        <input type="text" name="text-input" placeholder="Docket Number" class="form-control docket_number">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Petitioner's Name</label>
                                        <input type="text" name="text-input" placeholder="Petitioner's Name" class="form-control client" disabled>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Referring Office</label>
                                        <select class="form-control ref_office select2">
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Date Received from the PPO</label>
                                        <input type="date" name="text-input" placeholder="Date Received from the PPO" class="form-control date_rcv_from_ppo">
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
                                    <p class="section-note">(For Referrals Completed And Returned)</p>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Date Completed and Returned</label>
                                        <input type="date" name="text-input" placeholder="Date Completed and Returned" class="form-control date_completed_and_returned">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
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

    <script src="assets/js/pisJs/PIS_Courtesy_Investigation/update.js">

    </script>

</body>

</html>