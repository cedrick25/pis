<?php $this->load->view('templates/header.php'); ?> 

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
                            <li><a href="pardonee_courtesy_supervision_docketing">Pardone</a></li>
                            <li class="active">Courtesy Supervision Create</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

	    <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Create Courtesy Supervision</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="select">Select</option>
                                            <option value="pending">John Doe</option>
                                            <option value="approve">Doe John</option>
                                        </select>
                                    </div>
                                </div>
			                    <!-- <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g PI-01012023" class="form-control docket_num"></div>
			                    </div> -->
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Ser.</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control docket_series select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="PD">PARDON SUPERVISION</option>
                                            <option value="TPD">TRANSFERRED PARDON SUPERVISION</option>
                                            <option value="CPD">COURTESY PARDON SUPERVISION</option>
                                        </select>
                                    </div>
                                </div>
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Supervising Officer</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control sup_off"></div>
			                    </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referring Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control ref_office select2">
                                            <option selected value="select">Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Reason referral</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Parolee" class="form-control reason"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control task select2">
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
                                <!-- <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type select2">
                                            <option selected value="select">Select</option>
                                            <option value="parolee">Parolee</option>
                                            <option value="parolee">Pardonee</option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Case Class</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control case_class select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Received by PPO</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control dr_ppo"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Start Supervision</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control start_sup_date"></div>
                                </div>
                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">End Supervision</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control end_sup_date"></div>
                                </div>
                                
			                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Courtesy Referral</label></div>
			                        <div class="col-12 col-md-9"><input type="date" class="form-control date_court_ref"></div>
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

    <script src="assets/js/pisJs/SC_Pardonee_Courtesy_Supervision/pardoneeCourtesySupervisionCreate.js">

    </script>

</body>

</html>