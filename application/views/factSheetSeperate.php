<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Removed Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to remove this Docket: <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Worksheet</strong>
                            </div>
                            <div class="card-body">
                                <fieldset class="row col col-md-12">
                                    <legend>Identifying Data</legend>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control data_name" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Initital Interview</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control data_interview" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alias(es)</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control alias" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">True Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control true_name" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Present Address</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control present_add" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permanent Address</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control permanent_add" disabled></div>
                                            </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Present Offense</legend>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Charged With</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control charged" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Place of Commision</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control p_commision" disabled></div>
                                            <!-- <div class="col-12 col-md-9"><input type="date" class="form-control date_cic"></div> -->
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control convicted" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Charged</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control date_charged" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Commited</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control date_commited" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Convicted</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control date_convicted" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                            <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control s_yr" disabled></div>
                                            <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control s_mo" disabled></div>
                                            <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="" class="form-control s_day" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Judge</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control judge" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control court" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Arresting Officer</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control arresting" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control address_1" disabled></div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Defense Counsel</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control defense" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control address_2" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prosecutor</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control prosecutor" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control address_3" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offended Party</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control offended" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control address_4" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Co-Accused</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control ca" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Aggravating Circumstances</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control ac" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Mitigating Circumstances</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control mc" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Participation</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control ep" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Custody</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control custody" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manner of Commision</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control commision" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Motives</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control motives" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control explain" disabled></div>
                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Prior Records</legend>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alleged By</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control allegedBy" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Records</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control records" disabled></div>
                                        </div>
                                        <fieldset class="row col col-md-12">
                                                <legend>Records</legend>
                                                <div class="list">
                                                </div>
                                                <div class="col-12">
                                                    <!-- <button type="button" class="add_more btn btn-success btn-sm float-right">Add more</button> -->
                                                </div>
                                        </fieldset>
                                        <div class="row form-group col-md-6">
                                        </div>
                                        <div class="row form-group col-md-6">
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Has Been of Probation:</label></div>
                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control probation" disabled></div>
                                        </div>
                                        <fieldset class="row col col-md-12">
                                            <legend>Information</legend>
                                            <div class="list_info">
                                            </div>
                                            <div class="col-12">
                                                <!-- <button type="button" class="add_more_info btn btn-success btn-sm float-right">Add more</button> -->
                                            </div>
                                        </fieldset>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Family Background</legend>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sex" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control civilStatus" disabled></div>
                                            </div>
                                            <!-- citizenship -->
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control citizenship" disabled></div>
                                            </div>
                                            <!-- religion -->
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control religion" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bday" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Region</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bplace" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Province</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bprovince" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth City/Municipality</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bcity" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bplace_others" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Identifying Marks</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control identifyingMarks" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Handicap</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control handicap" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Description</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control desc" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Parents Relationship</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control parentsRelation" disabled></div>
                                            </div>

                                            <fieldset class="row col col-md-12">
                                                <legend>Paternal</legend>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_name" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_bday" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" class="form-control father_bplace" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Address</label></div>
                                                    <div class="col-12 col-md-12"><input type="text" name="text-input" placeholder=" " class="form-control father_add" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_citizenship" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_religion" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_education" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_occupation" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Work Address</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_work_add" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Tel. No.</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_tel_no" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Monthly Income</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_income" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Deceased</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_deceased" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 fatherDeceasedCause" style="display: none;">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Cause</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_deceased_cause" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 fatherDateDeceased" style="display: none;">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Deceased</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_date_deceased" disabled></div>
                                                </div>
                                            </fieldset>

                                            <fieldset class="row col col-md-12">
                                                <legend>Maternal</legend>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_name" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_bday" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" class="form-control mother_bplace" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Address</label></div>
                                                    <div class="col-12 col-md-12"><input type="text" name="text-input" placeholder=" " class="form-control mother_add" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_citizenship" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_religion" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_education" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_occupation" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Work Address</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_work_add" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Tel. No.</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_tel_no" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Monthly Income</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_income" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Deceased</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_deceased" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 motherDeceasedCause" style="display: none;">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Cause</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_deceased_cause" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 motherDateDeceased" style="display: none;">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Deceased</label></div>
                                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_date_deceased" disabled></div>
                                                </div>
                                            </fieldset>
                                            
                                            <fieldset class="row col col-md-12">
                                                <legend>Siblings</legend>
                                                <div class="list_siblings">
                                                </div>
                                                <div class="col-12">
                                                    <!-- <button type="button" class="add_more_siblings btn btn-success btn-sm float-right">Add more</button> -->
                                                </div>
                                            </fieldset>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Socio-Economic Background</legend>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Relationship</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control family_rel" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Reputation in Community</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control family_rep" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control home_cond" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control family_prob" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Economic Status</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control eco_status" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control stability" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Comments</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control comments" disabled></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Childhood Circumstances</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control circumstances" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control explain" disabled></textarea></div>
                                    </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Residence/Economic Conditions</legend>
                                        <fieldset class="row col col-md-12">
                                            <legend>Residence</legend>
                                            <div class="residence">
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control res_stability" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Residence</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control residence_type" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control res_home_cond" disabled></div>
                                            </div>

                                            <div class="col-12">
                                                <!-- <button type="button" class="add_more_residence btn btn-success btn-sm float-right">Add more</button> -->
                                            </div>
                                        </fieldset>

                                        <fieldset class="row col col-md-12">
                                            <legend>Economic Conditions</legend>
                                            <div class="economic_conditions">
                                            </div>
                                            <div class="col-12">

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Status</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control fam_status" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Breadwinner</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control fam_breadwinner" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">No. of Dependants</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control no_dependants" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Dependants</label></div>
                                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control dependants" disabled></textarea></div>
                                                </div>

                                            </div>
                                        </fieldset>

                                        <fieldset class="row col col-md-12">
                                            <legend>Major Family Problems</legend>
                                                <div class="economic_conditions">
                                                </div>
                                                <div class="col-12">

                                                    <!-- <div class="row form-group col-md-12">
                                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Family Problems</label></div>
                                                        <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control maj_fam_prob"></textarea></div>
                                                    </div> -->
                                                    <div class="row form-group col-md-12">
                                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
                                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control maj_fam_prob" disabled></div>
                                                    </div>
                                                    
                                                    <div class="row form-group col-md-12">
                                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Comments</label></div>
                                                        <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control fam_comments" disabled></textarea></div>
                                                    </div>

                                                </div>
                                        </fieldset>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Spouse/Children</legend>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                        <div class="col-12 col-md-10">
                                            <select class="form-control civilStatus select2" disabled>
                                                <option value="" selected disabled>-- select one --</option>
                                                <option value="ANNULLED">Annulled</option>
                                                <option value="DIVORCED">Divorced</option>
                                                <option value="LEGALLY SEPERATED">Legally Seperated</option>
                                                <option value="MARRIED">Married</option>
                                                <option value="SAME SEX RELATIONSHIP">Same Sex Relationship</option>
                                                <option value="SINGLE">Single</option>
                                                <option value="SOLO PARENT">Solo Parent</option>
                                                <option value="WIDOW/WIDOWER">Widow/Widower</option>
                                                <option value="WITH COMMON-LAW SPOUSE">With Common-Law Spouse</option>
                                            </select>
                                        </div>
                                    </div>

                                    <fieldset class="row col col-md-12">
                                        <legend>SPOUSE</legend>
                                            <div class="spouse">
                                            </div>
                                            <div class="col-12">
                                                <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control spouse_fname" disabled></div>
                                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control spouse_mname" disabled></div>
                                                    <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control spouse_lname" disabled></div>
                                                    <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Extended Name" class="form-control spouse_ename" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Present Address</label></div>
                                                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control pAddress" disabled></textarea></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Region</label></div>
                                                    <div class="col-12 col-md-10">
                                                        <select class="form-control spouse_region select2" disabled>
                                                            <option value="" selected disabled>-- select one --</option>
                                                            <option value="CAR">CAR</option>
                                                            <option value="NCR">NCR</option>
                                                            <option value="REGION I">REGION I</option>
                                                            <option value="REGION II">REGION II</option>
                                                            <option value="REGION III">REGION III</option>
                                                            <option value="REGION IV-A">REGION IV-A</option>
                                                            <option value="REGION IV-B">REGION IV-B</option>
                                                            <option value="REGION V">REGION V</option>
                                                            <option value="REGION VI">REGION VI</option>
                                                            <option value="REGION VII">REGION VII</option>
                                                            <option value="REGION VIII">REGION VIII</option>
                                                            <option value="REGION IX">REGION IX</option>
                                                            <option value="REGION X">REGION X</option>
                                                            <option value="REGION XI">REGION XI</option>
                                                            <option value="REGION XII">REGION XII</option>
                                                            <option value="REGION XIII">REGION XIII</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                    <div class="col-12 col-md-10"><input type="date" class="form-control spouse_bday" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Province</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseProvince" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Work Address</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouse_work_add" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Municipality</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseMunicipality" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Nature of Ceremony</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Ceremony" class="form-control spouse_ceremony" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Birth Place" class="form-control spouse_bplace_others" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                    <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Occupation" class="form-control spouse_occupation" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Marriage Date</label></div>
                                                    <div class="col-12 col-md-10"><input type="date" class="form-control date_marriage" disabled></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    
                                                </div>
                                                <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control spouse_remarks" disabled></textarea></div>
                                                </div>
                                                <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Spouse Relationship</label></div>
                                                    <div class="col-12 col-md-10">
                                                        <select class="form-control spouse_relationship select2" disabled>
                                                            <option value="" selected disabled>-- select one --</option>
                                                            <option value="FAIR">Fair</option>
                                                            <option value="POOR">Poor</option>
                                                            <option value="SATISFACTORY">Satisfactory</option>
                                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                    </fieldset>

                                    <fieldset class="row col col-md-12">
                                            <legend>Children</legend>
                                            <div class="spousechild">
                                            </div>
                                            <div class="col-12">
                                                <!-- <button type="button" class="add_more_child btn btn-success btn-sm float-right" style="display:none;">Add more</button> -->
                                            </div>
                                    </fieldset>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Education History</legend>
                                    <legend>Elementary</legend>
                                        <div class="elementary_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_lvl" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_high" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_where" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_date" disabled></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_award" disabled></div>
                                            </div>

                                        </div>

                                    <fieldset class="row form-group col col-md-12">
                                            <legend>Secondary</legend>
                                            <div class="secondary_education">
                                            </div>
                                            <div class="col-12">

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_lvl" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_high" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_where" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_date" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_award" disabled></div>
                                                </div>

                                            </div>
                                    </fieldset>

                                    <fieldset class="row form-group col col-md-12">
                                            <legend>College</legend>
                                            <div class="college_education">
                                            </div>
                                            <div class="col-12">

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_lvl" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_high" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_where" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_date" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_award" disabled></div>
                                                </div>

                                            </div>
                                    </fieldset>

                                    <fieldset class="row form-group col col-md-12">
                                            <legend>Post College</legend>
                                            <div class="pcollege_education">
                                            </div>
                                            <div class="col-12">

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_lvl" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_high" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_where" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_date" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_award" disabled></div>
                                                </div>

                                            </div>
                                    </fieldset>

                                    <fieldset class="row col form-group col-md-12">
                                            <legend>Vocational</legend>
                                            <div class="vocational_education">
                                            </div>
                                            <div class="col-12">

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_lvl" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_high" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_where" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_date" disabled></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_award" disabled></div>
                                                </div>

                                            </div>
                                    </fieldset>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Unschooled</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control unschool" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Conduct in School</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control conduct" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label" disabled>Explain</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control educExplain" disabled></textarea></div>
                                    </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Employment History</legend>
                                    <fieldset class="row form-group col col-md-12">
                                            <legend>Employment History</legend>
                                            <div class="emp_history">
                                            </div>
                                            <div class="col-12">
                                                <div class="col-12">
                                                    <!-- <button type="button" class="add_more_emp btn btn-success btn-sm float-right">Add more</button> -->
                                                </div>
                                            </div>
                                    </fieldset>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Status of Employment</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_status" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specStatus" disabled></textarea></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Means of Support</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_support" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specSupp" disabled></textarea></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employable Skills</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_skills" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Other Source of income</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_otherSource" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Health</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_health" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainHealth" disabled></textarea></div>
                                    </div>

                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Previous Treatment</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_treatment" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6 hosp_name" style="display:none;">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Hospital Name/s</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_hosName" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6 date_hosp" style="display:none;">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date/s Hospitalized</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_dateHos" disabled></div>
                                    </div>

                                    <div class="row form-group col-md-6 use_drug" style="display:none;">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Use of Alcohol/Drugs</label></div>
                                        <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_useDrug" disabled></div>>
                                    </div>

                                    <div class="row form-group col-md-6 drug_explain" style="display:none;">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainDrug" disabled></textarea></div>
                                    </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                    <legend>Environmental Factor</legend>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Neighborhood</label></div>
                                            <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control neighborhood" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Area</label></div>
                                            <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control area" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Describe</label></div>
                                            <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control neighborhoodDescribe" disabled></textarea></div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Neighborhood Criminality</label></div>
                                            <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control neighCrim" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Explain</label></div>
                                            <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control criminalityExplain" disabled></textarea></div>
                                        </div>
                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Community Acceptance</label></div>
                                            <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control comAcceptance" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                            <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control acceptanceSpecify" disabled></textarea></div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Peer Group Relationship</label></div>
                                            <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control peerRel" disabled></div>
                                        </div>
                                        <div class="row form-group col-md-9">
                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                            <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control peerSpecify" disabled></textarea></div>
                                        </div>
                                </fieldset>

                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Files Attached</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="col col-md-12">
                                            <table class="table table_head">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Kind</th>
                                                        <th>File Name</th>
                                                        <th>Version</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body">
                                                </tbody>
                                            </table>
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

    <!-- <script src="assets/js/pisJs/factSheetSeperate.js"></script> -->


</body>

</html>