<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

        <!-- right panel start -->
        <div id="right-panel" class="right-panel">

            <!-- Header-->
            <?php $this->load->view('templates/avatar.php'); ?> 
            <!-- /header -->

            <div class="content mt-3">
                <div class="animated fadeIn">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <strong class="card-title">Create Supervision</strong>
                                    <div id="prompt">
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="alert alert-success" role="alert" id="success" style="display:none">
                                        <i class="fa fa-check"></i>
                                            Successfully Added  
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row form-group col-md-12">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Manual Docket</label></div>
                                                <div class="col-12 col-md-8">
                                                    <div class="form-check form-check-inline">
                                                        <label class="switch">
                                                            <input type="checkbox" class="form-check-input primary manual_docket" id="docketSwitch" value="false">
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 docket_display"  style="display:none;">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select name="select" class="form-control docket_num select2">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 docketing" style="display:none">
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control pb_client_sup select2" disabled>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control caseload select2">
                                                    <option value="" selected disabled>- - Please Select Caseload - -</option>
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
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control client_type select2">
                                                    <option selected value="true">Adult</option>
                                                    <option value="false">Juvenile</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control field_office select2">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no" ></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense"></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin"></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control inv_off"></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control military_court select2" >
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control plea_bargain select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div class="row form-group col-md-6 class_sel_true" style="display: none;">
                                        <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control classification select2" >
                                                <option selected value="none" disabled>Choose</option>
                                                <option value="drug">Drug</option>
                                                <option value="non-drug">Non Drug</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div class="row form-group col-md-12">
                                            <fieldset class="row col col-md-12">
                                                <legend>List</legend>
                                                <div id="sentenceForm">
                                                </div>
                                                <div class="col-12">
                                                    <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                            <div class="col-12 col-md-9"><input type="date" class="form-control cod" ></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                            <div class="col-12 col-md-9"><input type="date" class="form-control rd" ></div>
                                        </div>
                                        <div class="row form-group col-md-6 manualProbStart">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Start Date</label></div>
                                            <div class="col-12 col-md-9"><input type="date" class="form-control prob_start" ></div>
                                        </div>
                                        <div class="row form-group col-md-6 manualProbYear">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Year</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Year" class="form-control prob_year" ></div>
                                        </div>
                                        <div class="row form-group col-md-6 manualProbMonth">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Month</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Month" class="form-control prob_month" ></div>
                                        </div>
                                        <div class="row form-group col-md-6 manualProbDay">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Day</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Day" class="form-control prob_day" ></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 confirmButton" style="display: none;">
                                    <div class="col-12 col-md-12">
                                        <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        <!-- content -->

        </div>
            <!-- footer -->
            <?php $this->load->view('templates/footer.php'); ?>
            <!-- footer -->


    <script src="assets/js/pisJs/supervisionDocketCreate.js">

    </script> 
</body>


