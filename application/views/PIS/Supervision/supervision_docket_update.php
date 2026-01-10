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
                            <li><a href="supervision_docketing">Supervision Docket</a></li>
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
                                <strong class="card-title">Update Supervision</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label"><span><p>(Fill up only if you want to link supervision into an existing investigation docket number)</p></span>Docket Number</label>
                                        <select class="form-control link_docket_num select2" disabled>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Docket Number</label>
                                        <input type="text" name="text-input" class="form-control docketNum_update">
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <label for="text-input" class=" form-control-label">Client</label>
                                        <select class="form-control pb_client_sup select2" disabled>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="card" style="width: 100%; border-radius: 5px; border-color: #aaaaaa;">
                                        <div class="card-header">
                                            <div class="d-flex justify-content-between align-items-center">
                                                For Probation Supervision Referrals Received
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
                                                        <label for="text-input" class=" form-control-label">Alias</label>
                                                        <input type="text" name="text-input" placeholder="Alias" class="form-control alias">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Type of Referrals</label>
                                                        <select class="form-control referral_type select2">
                                                            <option value="From Local Courts" >From Local Courts</option>
                                                            <option value="Direct Transfer, Court to Court">Direct Transfer, Court to Court</option>
                                                            <option value="From Military Courts">From Military Courts</option>
                                                            <option value="Transfer from other Offices/Courts">Transfer from other Offices/Courts</option>
                                                            <option value="Reconsidered/Reinstated">Reconsidered/Reinstated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Criminal Case Number</label>
                                                        <input type="text" name="text-input" placeholder="Criminal Case No." class="form-control cc_no">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Court of Origin</label>
                                                        <input type="text" name="text-input" placeholder="Court of Origin" class="form-control court_origin">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Case Classification</label>
                                                        <select class="form-control case_classification select2">
                                                            <option value="MINIMUM">MINIMUM</option>
                                                            <option value="MEDIUM">MEDIUM</option>
                                                            <option value="MAXIMUM">MAXIMUM</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Received by PPO</label>
                                                        <input type="date" class="form-control date_rcv_ppo">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Supervising Officer</label>
                                                        <input type="text" name="text-input" placeholder="Supervising Officer" class="form-control supervising_officer">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Probation Start Date</label>
                                                        <input type="date" class="form-control prob_start_date">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Probation End Date</label>
                                                        <input type="date" class="form-control prob_end_date">
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
                                                For Probation Supervision Cases Acted Upon
                                                <div>
                                                    <a data-toggle="collapse" href="#casesActedUpon" role="button" aria-expanded="true" aria-controls="casesActedUpon">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="casesActedUpon" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Office Findings</label>
                                                        <select class="form-control office_findings select2">
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
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Specify the Other Reasons of Revocation</label>
                                                        <input type="text" name="text-input" placeholder="Specify the Other Reasons of Revocation" class="form-control other_reasons_of_revocation">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Specify the Court/PPO where the probationer is transferred</label>
                                                        <input type="text" name="text-input" placeholder="Specify the Court/PPO where the probationer is transferred" class="form-control court_probationer_transferred">
                                                    </div>
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Submitted to the Court</label>
                                                        <input type="date" class="form-control date_submitted_court">
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
                                                For Carry Over Probation Supervision Cases Pending Disposition in Court
                                                <div>
                                                    <a data-toggle="collapse" href="#carryOver" role="button" aria-expanded="true" aria-controls="carryOver">
                                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="carryOver" class="collapse hide">
                                            <div class="card-body">
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Office Findings</label>
                                                        <select class="form-control office_findings select2">
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
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Date Submitted to the Court</label>
                                                        <input type="date" class="form-control date_submitted_court">
                                                    </div>
                                                </div>
                                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label for="text-input" class=" form-control-label">Supervising Officer</label>
                                                        <input type="text" name="text-input" placeholder="Supervising Officer" class="form-control supervising_officer_carry_over">
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