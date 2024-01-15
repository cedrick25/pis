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
                            <li><a href="docket_routing">Docket Routing</a></li>
                            <li class="active">Forward</li>
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
                            <div class="card-header">
                                <strong class="card-title">Forward Docket</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Forward 
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control type select2">
                                            <option value="" selected disabled> - - Select Type - - </option>
                                            <option value="PIS_INV">Investigation</option>
                                            <option value="PIS_SUP">Supervision</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control docket_num select2" disabled>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control caseload select2" disabled>
                                            <option value="" selected disabled> - - Select Type - - </option>
                                            <option value="PROBATION_INV_MOTION_FAILURE">Client&#39;s Failure to Report</option>
                                            <option value="PROBATION_INV_CSI">Community Service Investigation</option>
                                            <option value="PROBATION_INV_CCSI">Courtesy Community Service Investigation</option>
                                            <option value="PROBATION_INV_CPI">Courtesy Probation Investigation</option>
                                            <option value="PROBATION_INV_CPI_FULL_BLOWN">Courtesy Probation Investigation - Full Blown</option>
                                            <option value="PROBATION_INV_CPI_PARTIAL">Courtesy Probation Investigation - Partial</option>
                                            <option value="PROBATION_INV_CSSI">Courtesy Suspended Sentence Investigation</option>
                                            <option value="PROBATION_INV_MOTION_DISQUALIFY">Disqualified Client</option>
                                            <option value="PROBATION_INV_GIOR_FOLLOW_UP">Follow-up of GIOR Result</option>
                                            <option value="PROBATION_INV_INVESTIGATION">Probation Investigation</option>
                                            <option value="PROBATION_INV_RPI">Reinvestigation for Client under Probation</option>
                                            <option value="PROBATION_INV_RCS">Reinvestigation for Community Service</option>
                                            <option value="PROBATION_INV_RSS">Reinvestigation for Suspended Sentence</option>
                                            <option value="PROBATION_INV_MOTION_EXTENSION">Request for Extension of Time to Submit PSIR</option>
                                            <option value="PROBATION_INV_RC">Request for Records Check</option>
                                            <option value="PROBATION_INV_RES_RC">Results of Records Check</option>
                                            <option value="PROBATION_INV_SSI">Suspended Sentence Investigation</option>
                                            <option value="PROBATION_INV_TCSI">Transferred Community Service Investigation</option>
                                            <option value="PROBATION_INV_TPI">Transferred Probation Investigation</option>
                                            <option value="PROBATION_INV_TSSI">Transferred Suspended Sentence Investigation</option>
                                            <option value="PROBATION_SUP_CSS">Community Service Supervision</option>
                                            <option value="PROBATION_SUP_CCSS">Courtesy Community Service Supervision</option>
                                            <option value="PROBATION_SUP_CPS">Courtesy Probation Supervision</option>
                                            <option value="PROBATION_SUP_CSSS">Courtesy Suspended Sentence Supervision</option>
                                            <option value="PROBATION_SUP_DOCKET_CREATION">For Docket Creation</option>
                                            <option value="PROBATION_SUP_TRANS">Motion/Manifestation to Transfer Supervision and Control</option>
                                            <option value="PROBATION_SUP_TRAVEL_PERMIT">Permit to Travel</option>
                                            <option value="PROBATION_SUP_SUPERVISION">Probation Supervision</option>
                                            <option value="PROBATION_SUP_RPS">Reinstated Probation Supervision</option>
                                            <option value="PROBATION_SUP_RC">Request for Records Check</option>
                                            <option value="PROBATION_SUP_RES_RC">Results of Records Check</option>
                                            <option value="PROBATION_REVOCATION_ABSCOND">Revocation - Abscond</option>
                                            <option value="PROBATION_REVOCATION_COMMISSION">Revocation - Commission of Another Offense</option>
                                            <option value="PROBATION_REVOCATION_OTHER">Revocation - Other</option>
                                            <option value="PROBATION_REVOCATION_VIOLATION">Revocation - Violation of Probation Conditions</option>
                                            <option value="PROBATION_SUP_SSS">Suspended Sentence Supervision</option>
                                            <option value="PROBATION_SUP_TERMINATE_PROBATION">Terminate Probation</option>
                                            <option value="PROBATION_SUP_CRT_APPR_TRANS">Transfer of Residence</option>
                                            <option value="PROBATION_SUP_TCSS">Transferred Community Service Supervision</option>
                                            <option value="PROBATION_SUP_TPS">Transferred Probation Supervision</option>
                                            <option value="PROBATION_SUP_TSSS">Transferred Suspended Sentence Supervision</option><option value="PROBATION_SUP_TRAVEL_GT30">Travel Exceeding 30 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Forward to Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control field_office select2">
                                            <option value="" selected disabled> - - Select Type - - </option>
                                            <option>Central Office</option>
                                            <option>San Juan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 user_display">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Account</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control user_account select2">
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Details" class="form-control details"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset probation_rcv_reset" style='display:none;'>Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm_forward btn-sm probation_rcv_submit" style='display:none;'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/docketRoutingProbation.js"></script> 

</body>

</html>