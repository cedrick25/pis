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
                            <li><a href="pardonee_investigation_docketing">Pardonee</a></li>
                            <li class="active">Investigation List Create</li>
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
                                <strong class="card-title">Create Investigation List</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                               <!--  <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g PI-01012023" class="form-control docket_num"></div>
                                </div> -->
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Ser.</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control docket_series select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="PPI">PRE-PAROLE INVESTIGATION</option>
                                            <option value="PECI">PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                            <option value="TPPI">TRANSFERRED PRE-PAROLE INVESTIGATION</option>
                                            <option value="TPECI">TRANSFERRED PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                            <option value="CPPI">COURTESY PRE-PAROLE INVESTIGATION</option>
                                            <option value="CPECI">COURTESY PRE-EXECUTIVE CLEMENCY INVESTIGATION</option>
                                            <option value="PR">PAROLE SUPERVISION</option>
                                            <option value="PD">PARDON SUPERVISION</option>
                                            <option value="TPR">TRANSFERRED PAROLE SUPERVISION</option>
                                            <option value="TPD">TRANSFERRED PARDON SUPERVISION</option>
                                            <option value="CPR">COURTESY PAROLE SUPERVISION</option>
                                            <option value="CPD">COURTESY PARDON SUPERVISION</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Recommendation</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control recommentation   select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="parole">For Parole</option>
                                            <option value="commutation">For Commutation of Sentence</option>
                                            <option value="conditional">For Conditional Pardon</option>
                                            <option value="absolute">For Absolute Pardon</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">State</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control state select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="grant">Grant</option>
                                            <option value="denial">Denial</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control caseload select2">
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
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type select2">
                                            <option selected value="select">Select</option>
                                            <option value="parolee">Parolee</option>
                                            <option value="parolee">Pardonee</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Supervising Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control sup_officer"></div>
                                </div> -->
                                <div class="row form-group col-md-6">
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
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Office Transfered</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Central Office" class="form-control ref_office"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigating Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control inv_off"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Parolee" class="form-control cc_no"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Border Order</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control board_order select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="parole">Parole</option>
                                            <option value="commutation">Commutation of Sentence</option>
                                            <option value="conditional_pardon">Conditional Pardon</option>
                                            <option value="absolute_pardon">Absolute Pardon</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prison Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John A. Doe" class="form-control prison_name"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense </label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Murder" class="form-control offense"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Border Order Status</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control board_status select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="granted">Granted</option>
                                            <option value="denied">Denied</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="died">Died</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date of Transferred</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_transferred"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date of PECI Submitted</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_peci"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
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

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
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
       
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        $(".btn-confirm").unbind("click").on("click", function(){
                
            var payload = {
                "type"              : "SC_PD_INV",
                "docketNumber"      : "",
                "docketSeries"      : $(".docket_series").val(),
                "caseloadType"      : $(".caseload").val(),
                "clientType"        : $(".client_type").val(),
                // "ref_office"        : $(".ref_office").val(),
                // "reason"            : $(".reason").val(),
                // "start_sup_date"            : $(".start_sup_date").val(),
                // "end_sup_date"            : $(".end_sup_date").val(),
                // "date_court_ref"            : $(".date_court_ref").val(),
                "fieldOfficeId"     : $.cookie('field_office_id'),
                "firstName"         : "",
                "middleName"        : "",
                "lastName"          : "",
                "suffixName"        : "",
                "fullName"          : "",
                "pleaBargain"       : false,
                "caseClassification"    : $(".case_class").val(),
                "criminalCaseNumber"    : "",
                "offense"               : "",
                "investigatingOfficer"  : "",
                "courtOfOrigin"         : "",
                "courtOrderDate"        : "",
                "receivedDateByPPO"     : $(".dr_ppo").val(),
                "sentence"              : "",
                "manualDocket"          : false,
                "referral"              : false,
                "referralData"          : "",
                "remarks"               : "",
                "probationStartDate"    : "",
                "probationYear"         : "",
                "probationMonth"        : "",
                "probationDay"          :"",
                "prisonName"            : "",
                "investigationReportSubmittedDate"  : "",
                "ppoRecommendation"                 : "",
                "recommendationState"               : $(".recommentation").val(),
                "dateOfTransfer"                    : "",
                "transferredOfficeId"               : "",
                "dateOrderReceivedFromTheBoard"     : "",
                "boardOrder"            : "",
                "boardOrderStatus"      : "",
                "referrringOfficeId"    : "",
                "dateCICAR"             : $(".date_cic").val(),
                "supervisingOfficer"    : $(".sup_officer").val(),
                "probationEndDate"      : "",
                "referralType"          : "",
                "dateReportSubmittedToTheBoard"                 : "",
                "dateReportSubmittedToRDForTransferToOtherPPO"  : "",
                "resolutionType"                                : "",
                "dateResolutionFromTheBoard"                    : "",
                "dateResolutionFromTheRDForTransfer"            : "",
                "createdBy"     : "",
                "legalAge"      : false,
                "militaryCourt" : false,
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

    } )( jQuery );
    </script>

</body>

</html>