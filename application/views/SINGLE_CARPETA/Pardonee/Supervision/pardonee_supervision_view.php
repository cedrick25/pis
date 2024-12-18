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
                            <li><a href="pardonee_supervision_docketing">Pardone</a></li>
                            <li class="active">Supervision List View</li>
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
                                <strong class="card-title">View Supervision</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g PI-01012023" class="form-control docket_num_update" disabled></div>
                                    </div>
                                </div>
<!--                                 <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CMIS ID</label></div>
                                        <div class="col-12 col-md-4"><input type="text" name="text-input" placeholder="CMIS ID" class="form-control cmis_id"></div>
                                        <div class="col-12 col-md-5"><input type="text" name="text-input" placeholder="CMIS Name" class="form-control cmis_name" style="background-color: white;" readonly></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CMIS Field Office</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control cmis_fo select2" >
                                            </select>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Series</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control docket_series_update select2" disabled>
                                                <option selected value="none" disabled>Select</option>
    <!--                                             <option value="PPI">PRE-PAROLE INVESTIGATION</option>
                                                <option value="PECI">PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                                <option value="TPPI">TRANSFERRED PRE-PAROLE INVESTIGATION</option>
                                                <option value="TPECI">TRANSFERRED PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                                <option value="CPPI">COURTESY PRE-PAROLE INVESTIGATION</option>
                                                <option value="CPECI">COURTESY PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                                <option value="PR">PAROLE SUPERVISION</option> -->
                                                <option value="PD">PARDON SUPERVISION</option>
                                                <!-- <option value="TPR">TRANSFERRED PAROLE SUPERVISION</option> -->
                                                <option value="TPD">TRANSFERRED PARDON SUPERVISION</option>
                                                <!-- <option value="CPR">COURTESY PAROLE SUPERVISION</option>
                                                <option value="CPD">COURTESY PARDON SUPERVISION</option> -->
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control client_update select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="select">Select</option>
                                                <option value="pending">John Doe</option>
                                                <option value="approve">Doe John</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referral Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control referral_type_update select2">
                                                <option selected value="select">Select</option>
                                                <option value="BPP">From Board of Pardons and Parole</option>
                                                <option value="parolee">Transferred from otther PPO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Report Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control report_type_update select2">
                                                <option selected value="select">Select</option>
                                                <option value="summary">Summary</option>
                                                <option value="infraction">Infraction</option>
                                                <option value="death">Death</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control type_update select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="SINGLE_CARPETA_PAPWA">Process Application for Permit to Work Abroad</option>
                                                <option value="SINGLE_CARPETA_PAR">Process Arrival Report</option>
                                                <option value="SINGLE_CARPETA_PBR">Process Briefing Report</option>
                                                <option value="SINGLE_CARPETA_PCV">Process Case Verification</option>
                                                <option value="SINGLE_CARPETA_PCU">Process Certificate of Undertaking</option>
                                                <option value="SINGLE_CARPETA_PCS">Process Courtesy Supervision</option>
                                                <option value="SINGLE_CARPETA_PDR">Process Death Report</option>
                                                <option value="SINGLE_CARPETA_PGIOR">Process GIOR</option>
                                                <option value="SINGLE_CARPETA_PIR">Process Infraction Report</option>
                                                <option value="SINGLE_CARPETA_PORBPP">Process Other Requests by BPP</option>
                                                <option value="SINGLE_CARPETA_PPP">Process Program of Payment</option>
                                                <option value="SINGLE_CARPETA_PPR">Process Progress Report</option>
                                                <option value="SINGLE_CARPETA_PRC">Process Records Check</option>
                                                <option value="SINGLE_CARPETA_PRCPC">Process Request for Certificate of No Pending Case</option>
                                                <option value="SINGLE_CARPETA_PRCNA">Process Request for Certificate of Non-Appeal</option>
                                                <option value="SINGLE_CARPETA_PRCO">Process Request for Commitment Order</option>
                                                <option value="SINGLE_CARPETA_PRCI">Process Request for Community Interview</option>
                                                <option value="SINGLE_CARPETA_PRCD">Process Request for Court's Decision</option>
                                                <option value="SINGLE_CARPETA_PRDGC">Process Request for Decision Guide Chart</option>
                                                <option value="SINGLE_CARPETA_PREJ">Process Request for Entry of Judgment</option>
                                                <option value="SINGLE_CARPETA_PRFI">Process Request for Fiscal's Information</option>
                                                <option value="SINGLE_CARPETA_PRPD">Process Request for Permanent Dismissal</option>
                                                <option value="SINGLE_CARPETA_PRPDLP">Process Request for Pertinent documents of Local Prisoners</option>
                                                <option value="SINGLE_CARPETA_PRPSIR">Process Request for Post Sentence IR (Absolute Pardon)</option>
                                                <option value="SINGLE_CARPETA_PRPECIR">Process Request for Pre-EC Investigation Report</option>
                                                <option value="SINGLE_CARPETA_PRPPIR">Process Request for Pre-parole Investigation Report</option>
                                                <option value="SINGLE_CARPETA_PRTR">Process Request for Transfer of Residence(FO)</option>
                                                <option value="SINGLE_CARPETA_PRTR">Process Request for Transfer of Residence(TSD)</option>
                                                <option value="SINGLE_CARPETA_PSTR">Process Status Report</option>
                                                <option value="SINGLE_CARPETA_PSR">Process Summary Report</option>
                                                <option value="SINGLE_CARPETA_PVT">Process Verify Threats</option>
                                                <option value="SINGLE_CARPETA_PVR">Process Violation Report</option>
                                                <option value="SINGLE_CARPETA_PWR">Process Where to Reside</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Case Class</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control case_class_update select2">
                                                <option selected value="select" disabled>Select</option>
                                                <option value="high">High</option>
                                                <option value="medium">Medium</option>
                                                <option value="low">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Supervising Officer</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control sup_officer_update"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Resolution Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control res_type_update select2">
                                                <option selected value="select" disabled>Select</option>
                                                <option value="final">Final Release and Discharge</option>
                                                <option value="arrest">Arrest and Recommitment</option>
                                                <option value="death">Death</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Received by PPO</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control dr_ppo_update"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Start Supervision Period</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control start_sup_update"></div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Report Submitted to board</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control date_sub_board_update"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">End Supervision Period</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control end_sup_update"></div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Resolution Received from Board</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control date_rec_board_update"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Report Submitted to Regional Director for Transfer to other PPO</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control date_sub_trans_update"></div>
                                    </div>
                                </div>
                                <div class="form-row col-12">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Resolution Received from the Regional Director re:Transferred </label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control date_rec_trans_update"></div>
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

    <script src="assets/js/pisJs/Sc_Pardonee_Supervision/pardoneeSupervisionView.js">

    </script>

</body>

</html>