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
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName" ></div>
				                    </div>
                                    <div class="row form-group col-md-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName" ></div>
                                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName" ></div>
				                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix" ></div>
				                    </div>
                                    <div class="row form-group col-md-6 caseload_inv">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control caseload2 select2">
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
                                    <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control caseload select2">
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
                                    <div class="row form-group col-md-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control client_type select2">
                                                <option selected value="true">Adult</option>
                                                <option value="false">Juvenile</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row form-group col-md-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control field_office select2">
                                            </select>
                                        </div>
                                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no" ></div>
				                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense" ></div>
				                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin" ></div>
				                    </div>
                                    <div class="row form-group col-md-6 false_manual">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control inv_off"></div>
                                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
				                        <div class="col-12 col-md-9">
				                            <select class="form-control military_court select2" >
				                                <option value="true">Yes</option>
				                                <option value="false">No</option>
				                            </select>
				                        </div>
				                    </div>
                                    <div class="row form-group col-md-6 false_manual">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control plea_bargain select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6 class_sel" style="display: none;">
                                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control classification select2" >
                                            <option selected value="none" disabled>Choose</option>
                                            <option value="drug">Drug</option>
                                            <option value="non-drug">Non Drug</option>
                                        </select>
                                    </div>
                                </div>
				                    <div class="row form-group col-md-12 false_manual">
                                        <fieldset class="row col col-md-12">
                                            <legend>List</legend>
                                            <div class="list">
                                            </div>
                                            <div class="col-12">
                                                <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                            </div>
                                        </fieldset>
				                    </div>
				                    <div class="row form-group col-md-6 false_manual">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
				                        <div class="col-12 col-md-9"><input type="date" class="form-control cod" ></div>
				                    </div>
                                    <div class="row form-group col-md-6 false_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control rd" ></div>
                                    </div>
                                    <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Start Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control prob_start" ></div>
                                    </div>
                                    <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Year</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Year" class="form-control prob_year" ></div>
                                    </div>
                                    <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Month</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Month" class="form-control prob_month" ></div>
                                    </div>
                                    <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Day</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Day" class="form-control prob_day" ></div>
                                    </div>
                                    <!-- <div class="row form-group col-md-6 true_manual">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks" ></div>
                                    </div> -->
				                </div>                            
				                <div class="modal-footer">
				                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" disabled>Cancel</button>
				                    <button type="button" class="btn btn-primary btn-confirm btn-sm" >Confirm</button>
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

        $(".list").html(`
            <div class="list_sentence">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control max_d" placeholder="Robbery"></div>
                </div>
            </div>`
        );

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list").append(`
                <div class="list_sentence">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control max_d" placeholder="Robbery"></div>
                    </div>
                    <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });
        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });
        var __select = function(){
            $('.docket_num').empty();
            $('.field_office').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                   
                } else {
                    console.log("failed fetching docket list")
                }
            })
            __executeExternalGet('http://localhost:8000/docketbook/list/PIS_INV/'+$.cookie("field_office_id")).done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {

                    $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                    result.response.forEach(function(data){
                        $('.docket_num').append(
                            "<option value="+data.docketNumber+">"+data.docketNumber+"</option>");
                    });
                    $('.docket_num').on('change', function() {
                        $(".false_manual").show();
                        const docket = this.value
                        __executeExternalGet('http://localhost:8000/docketbook/'+docket'/'+$.cookie("field_office_id")).done(function (result) {
                            console.log(result)
                            var result = result.response;
                            if (result.status != "ERROR") {
                                $(".firstName").val(result.firstName);
                                $(".middleName").val(result.middleName);
                                $(".lastName").val(result.lastName);
                                $(".suffix").val(result.suffixName);
                                // $(".client_type").val(result.clientType).trigger("change");
                                $(".cc_no").val(result.criminalCaseNumber);
                                $(".offense").val(result.offense);
                                setTimeout(function () {
                                    $(".field_office").val(result.fieldOfficeId).trigger("change");
                                }, 3000);
                                if (result.legalAge == true) {
                                    var la = "true"
                                } else {
                                    var la = "false"
                                }

                                $(".caseload2").val(result.caseloadType).trigger("change");
                                $(".client_type").val(la).trigger("change");
                                $(".cc_no").val(result.criminalCaseNumber);
                                $(".offense").val(result.offense);
                                $(".court_origin").val(result.courtOfOrigin);
                                if (result.militaryCourt == true) {
                                    var mc = "true"
                                } else {
                                    var mc = "false"
                                }
                                $(".military_court").val(mc).trigger("change");
                                $(".sentence").val(result.sentence);
                                $(".cod").val(result.courtOrderDate);
                                $(".rd").val(result.receivedDateByPPO);
                                $(".remarks").val(result.remarks);
                                $(".inv_off").val(result.investigatingOfficer);
                                if (result.pleaBargain == true) {
                                    var plea = "true"
                                } else {
                                    var plea = "false"
                                }
                                $(".plea_bargain").val(plea).trigger("change");
                                $(".classification").val(result.caseClassification).trigger("change");

                                $(".list").empty();
                                console.log(JSON.parse(result.sentence))
                                JSON.parse(result.sentence).forEach(function(data){
                                    $(".list").append(`
                                        <div class="list_sentence">
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence">${data.sentence}</textarea></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year" value="${data.min_y}"></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month" value="${data.min_m}"></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day" value="${data.min_d}"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year" value="${data.max_y}"></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month" value="${data.max_m}"></div>
                                                <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day" value="${data.max_d}"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                                <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery" value="${data.civil_liability}"></div>
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
        var manual = $('.manual_docket').val()
        console.log(manual)
        if ($('.manual_docket').val() == "false"){
            __select();
            $(".false_manual").hide();
            $(".true_manual").hide();
            $(".class_sel").hide();
            $(".caseload_inv").hide();
        } else {
            $(".class_sel").hide();
            $(".false_manual").show();
            $(".true_manual").hide();
            $(".caseload_inv").show();
        }
        $('.manual_docket').change(function(){
            cb = $(this);
            cb.val(cb.prop('checked'));
            console.log($('.manual_docket').val())
            if ($('.manual_docket').val() == "true") {
                $(".docket_display").hide();
                $(".form-control").val('');
                $(".false_manual").show();
                $(".true_manual").show();
                $(".class_sel").hide();
                $(".caseload_inv").hide();
                
            } else {
                $(".false_manual").hide();
                $(".true_manual").hide();
                $(".docket_display").show();
                $(".form-control").val('');
                $(".class_sel").hide();
                $(".caseload_inv").hide();
                __select();
            }
        });

        $('.plea_bargain').change(function(){
            if ($('.plea_bargain').val() == "true") {
                $(".class_sel").show();
            } else {
                $(".class_sel").hide();
            }
            if ($('.plea_bargain').val() == "false"){
                $(".class_sel").hide();
            } else {
                $(".class_sel").show();
            }
        });
        $(".btn-confirm").unbind("click").on("click", function(){

            const sentence = [];
            const sentence_inputs = $(".sentence");
            const min_y = $(".min_y");
            const min_m = $(".min_m");
            const min_d = $(".min_d");
            const max_y = $(".max_y");
            const max_m = $(".max_m");
            const max_d = $(".max_d");
            const civil_liability = $(".civil_liability");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.civil_liability = $(civil_liability[i]).val();
                sentence.push(list);
            }
            var md;
            if ($(".manual_docket").val() == "true") {
                md = true
            } else {
                md = false
            }

            var payload = {
                "type"          : "PIS_SUP",
                "docketNumber"  : "",
                "docketSeries"  : "NONE",
                "caseloadType"  : $(".caseload").val(),
                "fieldOfficeId" : $(".field_office").val(),
                "clientType"    : "PROBATIONER",
                "firstName"     : $(".firstName").val(),
                "middleName"    : $(".middleName").val(),
                "lastName"      : $(".lastName").val(),
                "suffixName"    : $(".suffix").val(),
                "fullName"              : "",
                "pleaBargain"           : $(".plea_bargain").val(),
                "criminalCaseNumber"    : $(".cc_no").val(),
                "caseClassification"    : $(".classification").val(),
                "offense"               : $(".offense").val(),
                "investigatingOfficer"  : $(".inv_off").val(),
                "courtOfOrigin"         : $(".court_origin").val(),
                "militaryCourt"         : $(".military_court").val(),
                "sentence"              : JSON.stringify(sentence),
                "courtOrderDate"        : $(".cod").val(),
                "receivedDateByPPO"     : $(".rd").val(),
                "manualDocket"          : false,
                "referral"              : false,
                "referralData"          : "",
                "remarks"               : $(".remarks").val(),
                "probationStartDate"    : "",
                "probationYear"         : "",
                "probationMonth"        : "",
                "probationDay"          :"",
                "status"                : 1,
                "legalAge"              : $(".client_type").val(),
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
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

</html>