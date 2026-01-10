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
                            <li><a href="investigation_docketing">Investigation Docket</a></li>
                            <li class="active">Update</li>
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
                                <strong class="card-title">Update</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket Number</label>
                                        <input type="text" name="text-input" class="form-control docketNum_update">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Client</label>
                                        <select class="form-control pb_client select2">
                                            <option selected value="none">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Referrals Received
                                                <div>
                                                    <a data-toggle="collapse" href="#received" role="button" aria-expanded="true" aria-controls="received">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="received" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Plea Bargain</label>
                                                        <select class="form-control plea_bargain select2">
                                                            <option selected value="none">Select</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Criminal Case Number</label>
                                                        <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Court of Origin</label>
                                                        <input type="text" name="text-input" placeholder="Court of Origin" class="form-control court_origin">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Offense</label>
                                                        <input type="text" name="text-input" placeholder="Offense" class="form-control offense">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">Sentence</label>
                                                        <input type="text" name="text-input" placeholder="Sentence" class="form-control sentence">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date of Court Order</label>
                                                        <input type="date" class="form-control cod">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Received by PPO</label>
                                                        <input type="date" class="form-control rd">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Investigation Officer</label>
                                                        <input type="text" name="text-input" placeholder="Officer Doe" class="form-control inv_off">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Referrals Acted Upon
                                                <div>
                                                    <a data-toggle="collapse" href="#actedUpon" role="button" aria-expanded="true" aria-controls="actedUpon">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="actedUpon" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">PSIR Date</label>
                                                        <input type="date" class="form-control psir_date">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">PPO's Recommendation</label>
                                                        <select class="form-control ppo_recommendation select2">
                                                            <option selected value="none">Select</option>
                                                            <option value="PSIR - For Granted">For Grant</option>
                                                            <option value="PSIR - For Denial">For Denial</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Manifestation Date</label>
                                                        <input type="date" class="form-control manifestation_date">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Transfer Date</label>
                                                        <input type="date" class="form-control transfer_date">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label for="text-input" class=" form-control-label">Transfer To</label>
                                                        <input type="date" name="text-input" placeholder="Transfer To" class="form-control transfer_to">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Referrals Not Acted Upon
                                                <div>
                                                    <a data-toggle="collapse" href="#notActedUpon" role="button" aria-expanded="true" aria-controls="notActedUpon">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="notActedUpon" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Type</label>
                                                        <select class="form-control not_acted_decision select2">
                                                            <option selected value="none">Select</option>
                                                            <option value="Recall">Recalled</option>
                                                            <option value="Warrant of Arrest">Warrant of Arrest</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Order Received</label>
                                                        <input type="date" class="form-control date_order_received">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Cases Disposed Of By The Court And Issuance Of
                                                <div>
                                                    <a data-toggle="collapse" href="#tableFour" role="button" aria-expanded="true" aria-controls="tableFour">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tableFour" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                            <label for="text-input" class=" form-control-label">Alias</label>
                                                            <input type="text" name="text-input" placeholder="Alias" class="form-control alias_t4">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                            <label for="text-input" class=" form-control-label">Court Decision</label>
                                                            <select class="form-control court_decision_t4 select2">
                                                                <option selected value="none">Select</option>
                                                                <option value="Recall">Recalled</option>
                                                                <option value="Warrant of Arrest">Warrant of Arrest</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                            <label for="text-input" class=" form-control-label">Reason for Denial/Dismissal</label>
                                                            <input type="text" name="text-input" placeholder="Reason for Denial/Dismissal" class="form-control reason_for_denial_t4">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                            <label for="text-input" class=" form-control-label">Specify other type of Court Decision</label>
                                                            <input type="text" name="text-input" placeholder="Specify other type of Court Decision" class="form-control other_type_of_decision_t4">
                                                        </div>
                                                        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                            <label for="text-input" class=" form-control-label">Date Order Received from the Court</label>
                                                            <input type="date" class="form-control date_order_received_court_t4">
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


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/PIS_investigation/investigationDocketUpdate.js"></script>

</body>

</html>