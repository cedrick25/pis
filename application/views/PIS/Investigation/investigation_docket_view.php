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
                            <li class="active">View</li>
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
                                <strong class="card-title">View Investigation</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" class="form-control docketNum_update" disabled></div>
                                    </div>
                                </div>
                                <div class="form-row">
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
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control pb_client select2" disabled>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control caseload select2">
                                                <option value="" selected disabled>Select Caseload</option>
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
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control client_type select2">
                                                <option value="" selected disabled>Select Client Type</option>
                                                <option value="true">Adult</option>
                                                <option value="false">Juvenile</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no"></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin"></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control field_office select2" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Officer Doe" class="form-control inv_off"></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control military_court select2">
                                                <option selected disabled>Select</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control plea_bargain select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 class_sel" style="display: none;">
                                        <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control classification select2" >
                                                <option selected value="none" disabled>Select</option>
                                                <option value="drug">Drug</option>
                                                <option value="non-drug">Non Drug</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <div class="card" id="sentence_card" style="border-radius: 10px;">
                                                <div class="card-header" style="background: transparent;">
                                                    <strong>Sentence</strong>
                                                    <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                                </div>
                                                <div class="card-body">
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control cod"></div>
                                    </div>
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control rd"></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
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
    <script src="assets/js/pisJs/PIS_investigation/investigationDocketView.js"></script>

</body>

</html>