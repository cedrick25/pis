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
                            <li><a href="parolee_supervision_docketing">Parolee</a></li>
                            <li class="active">Supervision List Create</li>
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
                                <strong class="card-title">Create Supervision</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <!-- <div class="row form-group col-md-6">
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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referral Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control referral_type select2">
                                            <option selected value="select">Select</option>
                                            <option value="BPP">From Board of Pardons and Parole</option>
                                            <option value="parolee">Transferred from otther PPO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Report Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control report_type select2">
                                            <option selected value="select">Select</option>
                                            <option value="summary">Summary</option>
                                            <option value="infraction">Infraction</option>
                                            <option value="death">Death</option>
                                            <option value="others">Others</option>
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
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Supervising Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control sup_officer"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Resolution Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control res_type select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option value="final">Final Release and Discharge</option>
                                            <option value="arrest">Arrest and Recommitment</option>
                                            <option value="death">Death</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referring Office</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Central Office" class="form-control ref_office"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigating Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control inv_off"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Reason referral</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Parolee" class="form-control reason"></div>
                                </div> -->
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Case Class</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control case_class select2">
                                            <option selected value="select" disabled>Select</option>
                                            <option selected value="high">High</option>
                                            <option selected value="medium">Medium</option>
                                            <option selected value="low">Low</option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Received by PPO</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control dr_ppo"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Start Supervision Period</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control start_sup"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Report Submitted to board</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_sub_board"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">End Supervision Period</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control end_sup"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Resolution Received from Board</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_rec_board"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Report Submitted to Regional Director for Transfer to other PPO</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_sub_trans"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Resolution Received from the Regional Director re:Transferred </label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_rec_trans"></div>
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
                "type"              : "SC_PR_SUP",
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
                "recommendationState"               : "",
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