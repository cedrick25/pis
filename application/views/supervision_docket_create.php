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

                <div class="breadcrumbs">
                    <div class="col-sm-4">
                        <div class="page-header float-left">
                            <div class="page-title">
                                <h1>Create</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li><a href="dashboard">Dashboard</a></li>
                                    <li><a href="supervision_docketing">Supervision Docket</a></li>
                                    <li class="active">Create</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

            <!-- content -->
                <div class="content mt-3">
                    <div class="animated fadeIn">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Create Supervision Docket</strong>
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
                                                            <input type="checkbox" class="form-check-input primary manual_docket" value="false">
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 docket_display" style="">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select name="select" class="form-control docket_num select2">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                        <div class="col-md-12 manual_true" style="display:none">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control pb_client_sup select2">
                                                    </select>
                                                </div>
                                            </div>
                                        <!-- <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_true"></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_true"></div>
                                                </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_true"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_true" ></div>
                                            </div> -->
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control caseload_true select2">
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
                                                    <select class="form-control client_type_true select2">
                                                        <option selected value="true">Adult</option>
                                                        <option value="false">Juvenile</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control field_office_true select2">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_true"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin_true"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control inv_off_true"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control military_court_true select2" >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control plea_bargain_true select2">
                                                    <option selected value="none" disabled>Select</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div class="row form-group col-md-6 class_sel_true" style="display: none;">
                                            <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control classification_true select2" >
                                                    <option selected value="none" disabled>Choose</option>
                                                    <option value="drug">Drug</option>
                                                    <option value="non-drug">Non Drug</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div class="row form-group col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>List</legend>
                                                    <div class="list_true">
                                                    </div>
                                                    <div class="col-12">
                                                        <button type="button" class="add_more_true btn btn-primary btn-success btn-sm float-right">Add more</button>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                                <div class="col-12 col-md-9"><input type="date" class="form-control cod_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                                <div class="col-12 col-md-9"><input type="date" class="form-control rd_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Start Date</label></div>
                                                <div class="col-12 col-md-9"><input type="date" class="form-control prob_start_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Year</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Year" class="form-control prob_year_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Month</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Month" class="form-control prob_month_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Day</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Day" class="form-control prob_day_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-12">
                                            <div class="col-12 col-md-12">
                                                <div class="card-footer">
                                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" disabled>Cancel</button>
                                                <button type="button" class="btn btn-primary btn-confirm_true btn-sm" >Confirm</button>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 manual_false" style="display:none">
<!--                                             <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control pb_client_sup_false select2">
                                                    </select>
                                                </div>
                                            </div> -->
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_false" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_false" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_false" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_false" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control caseload_false select2">
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
                                                    <select class="form-control client_type_false select2">
                                                        <option selected value="true">Adult</option>
                                                        <option value="false">Juvenile</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control field_office_false select2">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_false" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control inv_off_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control military_court_false select2" >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control plea_bargain_false select2">
                                                    <option selected value="none" disabled>Select</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div class="row form-group col-md-6 class_sel_false" style="display: none;">
                                            <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control classification_false select2" >
                                                    <option selected value="none" disabled>Choose</option>
                                                    <option value="drug">Drug</option>
                                                    <option value="non-drug">Non Drug</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div class="row form-group col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>List</legend>
                                                    <div class="list_false">
                                                    </div>
                                                    <div class="col-12">
                                                        <button type="button" class="add_more_false btn btn-primary btn-success btn-sm float-right">Add more</button>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                                <div class="col-12 col-md-9"><input type="date" class="form-control cod_false" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                                <div class="col-12 col-md-9"><input type="date" class="form-control rd_false" ></div>
                                            </div>
                                            <div class="row form-group col-md-12">
                                            <div class="col-12 col-md-12">
                                                <div class="card-footer">
                                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" disabled>Cancel</button>
                                                <button type="button" class="btn btn-primary btn-confirm_false btn-sm" >Confirm</button>
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

        <!-- content -->

        </div>
            <!-- footer -->
            <?php $this->load->view('templates/footer.php'); ?>
            <!-- footer -->


    <script src="assets/js/pisJs/supervisionDocketCreate.js">

    </script> 
</body>


