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
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Update</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
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
                            <div class="card-header">
                                <strong class="card-title">Update Supervision</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Updated  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control docket_num" disabled></div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control pb_client_type_sup_update select2">
                                        </select>
                                    </div>
                                </div> -->
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_update" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_update" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_update" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_update" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control caseload_type_update select2" disabled>
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
                                        <select class="form-control client_type_update select2">
                                            <option selected value="true">Adult</option>
                                            <option value="false">Juvenile</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office_update">
                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Investigation Officer" class="form-control inv_off_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control military_court_update select2">
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control plea_bargain_update select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6 class_sel" style="display: none;">
                                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control classification_update select2" >
                                            <option selected value="none" disabled>Choose</option>
                                            <option value="drug">Drug</option>
                                            <option value="non-drug">Non Drug</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <fieldset class="row col col-md-12">
                                        <legend>List</legend>
                                        <div class="list">
                                        </div>
                                        <div class="col-12">
                                            <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control cod_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control rd_update"></div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks_update"></div>
                                </div> -->
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/supervisionDocketUpdate.js">

    </script>


</body>

</html>