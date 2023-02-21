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
                                            </div>
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
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_true" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_true"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
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
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" disabled>Cancel</button>
                                                <button type="button" class="btn btn-primary btn-confirm_true btn-sm" >Confirm</button>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 manual_false" style="display:none">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_false" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control caseload_false select2" disabled>
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
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_false" ></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                                <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_false"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
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
                                                <div class="modal-footer">
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


    <script type="text/javascript">
    ( function ( $ ) {
        var ___ctx = '';

        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalPost = function(path, jsonObj, customLoader) {
            path = __getContext() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                headers: {
                    // 'Content-Type': 'multipart/form-data;'
                    'Content-Type':'application/json'
                },
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };
        var __executeExternalGet = function(path, customLoader) {
            // path = $.wms.getContextPath() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "GET",
                url: path,
                dataType: "json",
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };

        $(".list_true").html(`
            <div class="list_sentence_true">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_true"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y_true" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m_true" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d_true" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y_true" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m_true" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d_true" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control cl_true" placeholder="Robbery"></div>
                </div>
            </div>`
        );

        $(".list_false").html(`
            <div class="list_sentence_false">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery"></div>
                </div>
            </div>`
        );

        $(".add_more_true").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list_true").append(`
                <div class="list_sentence_true">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_true"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y_true" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m_true" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d_true" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y_true" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m_true" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d_true" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl_true" placeholder="Robbery"></div>
                    </div>
                    <button type="button" class="remove_true btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });

        $(".add_more_false").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list_false").append(`
                <div class="list_sentence_false">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery"></div>
                    </div>
                    <button type="button" class="remove_false btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });


        $('.list_true').on('click', '.remove_true', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $('.list_false').on('click', '.remove_false', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

// select manual docket is set to false
    var __select = function(){
        $('.docket_num').empty();
        $('.field_office').empty();

        __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.field_office_true').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_true').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                $('.field_office_false').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_false').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
               
            } else {
                    console.log("failed fetching docket list")
                    }
    })

// manual docket is set to false
        __executeExternalGet('http://localhost:8000/docketbook/list/PIS_INV/'+$.cookie("field_office_id")).done(function (result) {
        console.log(result)
            if (result.status != "ERROR") {

                // if manual docket is false
                $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                    result.response.forEach(function(data){
                        $('.docket_num').append(
                            "<option value="+data.docketNumber+">"+data.docketNumber+"</option>");
                    });


                        $('.docket_num').on('change', function() {
                            $(".manual_false").show();
                            const docket = this.value
                                __executeExternalGet('http://localhost:8000/docketbook/'+docket+'/'+$.cookie("field_office_id")).done(function (result) {
                                    console.log(result)
                                    var result = result.response;
                                    if (result.status != "ERROR") {
                                        $(".docket_num").val(result.docketNumber);
                                        $(".firstName_false").val(result.firstName);
                                        $(".middleName_false").val(result.middleName);
                                        $(".lastName_false").val(result.lastName);
                                        $(".suffix_false").val(result.suffixName);
                                        // $(".client_type").val(result.clientType).trigger("change");
                                        $(".cc_no_false").val(result.criminalCaseNumber);
                                        $(".offense_false").val(result.offense);
                                            setTimeout(function () {
                                                $(".field_office_false").val(result.fieldOfficeId).trigger("change");
                                            }, 3000);
                                                    if (result.legalAge == true) {
                                                        var la = "true"
                                                    } else {
                                                        var la = "false"
                                                    }
                                        $(".caseload_false").val(result.caseloadType).trigger("change");
                                        $(".client_type_false").val(la).trigger("change");
                                        $(".cc_no_false").val(result.criminalCaseNumber);
                                        $(".offense_false").val(result.offense);
                                        $(".court_origin_false").val(result.courtOfOrigin);
                                                    if (result.militaryCourt == true) {
                                                        var mc = "true"
                                                    } else {
                                                        var mc = "false"
                                                    }
                                        $(".military_court_false").val(mc).trigger("change");
                                        $(".sentence_false").val(result.sentence);
                                        $(".cod_false").val(result.courtOrderDate);
                                        $(".rd_false").val(result.receivedDateByPPO);
                                        $(".remarks_false").val(result.remarks);
                                        $(".inv_off_false").val(result.investigatingOfficer);
                                                    if (result.pleaBargain == true) {
                                                        var plea = "true"
                                                    } else {
                                                        var plea = "false"
                                                    }
                                        $(".plea_bargain_false").val(plea).trigger("change");
                                        $(".classification_false").val(result.caseClassification).trigger("change");

                                            $(".list_false").empty();
                                            console.log(JSON.parse(result.sentence))
                                            JSON.parse(result.sentence).forEach(function(data){
                                                $(".list_false").append(`
                                                    <div class="list_sentence_false">
                                                        <div class="row form-group col-md-12">
                                                            <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                                            <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false">${data.sentence}</textarea></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year" value="${data.min_y}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month" value="${data.min_m}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day" value="${data.min_d}"></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year" value="${data.max_y}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month" value="${data.max_m}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day" value="${data.max_d}"></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                                            <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery" value="${data.civil_liability}"></div>
                                                        </div>
                                                        <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                                                    </div>`
                                                )
                                            });
                                    };
                                });
                        });
            } else {
            console.log("failed fetching docket number")
            }
    });
}
// select manual docket is set to false


        // manual docket
        var manual = $('.manual_docket').val()
        console.log(manual)
        if ($('.manual_docket').val() == "false"){
            __select();
            $(".manual_false").hide();
            $(".manual_true").hide();
        } else {
            $(".manual_false").hide();
            $(".manual_true").hide();
            $(".docket_display").hide();
        }
        $('.manual_docket').change(function(){
            cb = $(this);
            cb.val(cb.prop('checked'));
            console.log($('.manual_docket').val())
            if ($('.manual_docket').val() == "true") {
                $(".docket_display").hide();
                $(".form-control").val('');
                $(".manual_false").hide();
                $(".manual_true").show();
                
            } else {
                $(".manual_false").hide();
                $(".manual_true").hide();
                $(".docket_display").show();
                $(".form-control").val('');
                __select();
            }
        });

        $('.plea_bargain_false').change(function(){
            if ($('.plea_bargain_false').val() == "true") {
                $(".class_sel_false").show();
            } else {
                $(".class_sel_false").hide();
            }
            if ($('.plea_bargain_false').val() == "false"){
                $(".class_sel_false").hide();
            } else {
                $(".class_sel_false").show();
            }
        });

        $('.plea_bargain_true').change(function(){
            if ($('.plea_bargain_true').val() == "true") {
                $(".class_sel_true").show();
            } else {
                $(".class_sel_true").hide();
            }
            if ($('.plea_bargain_true').val() == "false"){
                $(".class_sel_true").hide();
            } else {
                $(".class_sel_true").show();
            }
        });

            $(".btn-confirm_true").unbind("click").on("click", function(){
                console.log("clicked true")

            const sentence = [];
            const sentence_inputs = $(".sentence_true");
            const min_y = $(".min_y_true");
            const min_m = $(".min_m_true");
            const min_d = $(".min_d_true");
            const max_y = $(".max_y_true");
            const max_m = $(".max_m_true");
            const max_d = $(".max_d_true");
            const cl_true = $(".cl_true_true");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.cl_true = $(cl_true[i]).val();
                sentence.push(list);
            }
            var md;
            if ($(".manual_docket").val() == "true") {
                md = true
            } else {
                md = false
            }
            
            var payload_true = {
                "type": "PIS_SUP",
                "docketNumber": "",
                "docketSeries": "NONE",
                "caseloadType": $(".caseload_true").val(),
                "fieldOfficeId": $(".field_office_true").val(),
                "clientType": "PROBATIONER",
                "clientId": "",
                "firstName": $(".firstName_true").val(),
                "middleName": $(".middleName_true").val(),
                "lastName": $(".lastName_true").val(),
                "suffixName": $(".suffix_true").val(),
                "fullName": "",
                "pleaBargain": $(".plea_bargain_true").val(),
                "caseClassification": $(".classification_true").val(),
                "criminalCaseNumber": $(".cc_no_true").val(),
                "offense": $(".offense_true").val(),
                "courtOfOrigin": $(".court_origin_true").val(),
                "courtOrderDate": $(".cod_true").val(),
                "investigatingOfficer": $(".inv_off_true").val(),
                "receivedDateByPPO": $(".rd_true").val(),
                "sentence": JSON.stringify(sentence),
                "manualDocket": false,
                "referral": false,
                "referralData": "",
                "remarks": "",
                "probationStartDate": "",
                "probationYear": "",
                "probationMonth": "",
                "probationDay": "",
                "prisonName": "",
                "investigationReportSubmittedDate": "",
                "ppoRecommendation": "",
                "recommendationState": "",
                "dateOfTransfer": "",
                "transferredOfficeId": "",
                "dateOrderReceivedFromTheBoard": "",
                "boardOrder": "",
                "boardOrderStatus": "",
                "referringOfficeId": "",
                "dateCICAR": "",
                "supervisingOfficer": "",
                "supervisionStartDate": "",
                "supervisionEndDate": "",
                "probationEndDate": "",
                "reportType": "",
                "referralType": "",
                "dateReportSubmittedToTheBoard": "",
                "dateReportSubmittedToRDForTransferToOtherPPO": "",
                "resolutionType": "",
                "dateResolutionFromTheBoard": "",
                "dateResolutionFromTheRDForTransfer": "",
                "createdBy": "",
                "updatedBy": "",
                "legalAge": $(".client_type_true").val(),
                "militaryCourt": $(".military_court_true").val()
            }
            console.log(payload_true)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload_true)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.reload(true);
                    }, 2000);
                }else{
                }
            })   
        })



            $(".btn-confirm_false").unbind("click").on("click", function(){
                console.log("clicked false")

            const sentence = [];
            const sentence_inputs = $(".sentence_false");
            const min_y = $(".min_y_false");
            const min_m = $(".min_m_false");
            const min_d = $(".min_d_false");
            const max_y = $(".max_y_false");
            const max_m = $(".max_m_false");
            const max_d = $(".max_d_false");
            const cl_false = $(".cl_false");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.cl_false = $(cl_false[i]).val();
                sentence.push(list);
            }
            var md;
            if ($(".manual_docket").val() == "false") {
                md = false
            } else {
                md = true
            }

            var payload_false = {
                  "type": "PIS_SUP",
                  "docketNumber": $(".docket_num").val(),
                  "docketSeries": "NONE",
                  "caseloadType": $(".caseload_false").val(),
                  "fieldOfficeId": $(".field_office_false").val(),
                  "clientType": "PROBATIONER",
                  "clientId": "",
                  "firstName": $(".firstName_false").val(),
                  "middleName": $(".middleName_false").val(),
                  "lastName": $(".lastName_false").val(),
                  "suffixName": $(".suffix_false").val(),
                  "fullName": "",
                  "pleaBargain": $(".plea_bargain_false").val(),
                  "caseClassification": $(".classification_false").val(),
                  "criminalCaseNumber": $(".cc_no_false").val(),
                  "offense": $(".offense_false").val(),
                  "courtOfOrigin": $(".court_origin_false").val(),
                  "courtOrderDate": $(".cod_false").val(),
                  "investigatingOfficer": $(".inv_off_false").val(),
                  "receivedDateByPPO": $(".rd_false").val(),
                  "sentence": JSON.stringify(sentence),
                  "manualDocket": false,
                  "referral": false,
                  "referralData": "",
                  "remarks": "",
                  "probationStartDate": "",
                  "probationYear": "",
                  "probationMonth": "",
                  "probationDay": "",
                  "prisonName": "",
                  "investigationReportSubmittedDate": "",
                  "ppoRecommendation": "",
                  "recommendationState": "",
                  "dateOfTransfer": "",
                  "transferredOfficeId": "",
                  "dateOrderReceivedFromTheBoard": "",
                  "boardOrder": "",
                  "boardOrderStatus": "",
                  "referringOfficeId": "",
                  "dateCICAR": "",
                  "supervisingOfficer": "",
                  "supervisionStartDate": "",
                  "supervisionEndDate": "",
                  "probationEndDate": "",
                  "reportType": "",
                  "referralType": "",
                  "dateReportSubmittedToTheBoard": "",
                  "dateReportSubmittedToRDForTransferToOtherPPO": "",
                  "resolutionType": "",
                  "dateResolutionFromTheBoard": "",
                  "dateResolutionFromTheRDForTransfer": "",
                  "createdBy": "",
                  "updatedBy": "",
                  "legalAge": $(".client_type_false").val(),
                  "militaryCourt": $(".military_court_false").val()
            }
            console.log(payload_false)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload_false)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.reload(true);
                    }, 2000);
                }else{
                }
            })   
        })

    } )( jQuery );
    </script> 
</body>


