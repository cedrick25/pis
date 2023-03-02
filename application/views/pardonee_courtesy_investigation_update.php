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
                            <li><a href="pardonee_courtesy_investigation_docketing">Pardonee</a></li>
                            <li class="active">Courtesy Investigation Update</li>
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
                                <strong class="card-title">Update Courtesy Supervision</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g PI-01012023" class="form-control docket_num_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Series</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control docket_series_update select2">
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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control task_update select2">
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
                                        <select class="form-control client_type_update select2">
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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Referring Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control ref_office_update select2">
                                            <option selected disabled value="select"> - - Select - - </option>
                                            <option value="parolee">Parolee</option>
                                            <option value="pardonee">Pardonee</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigating Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control inv_off_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Reason referral</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Parolee" class="form-control reason_update"></div>
                                </div>
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
                                    <div class="col-12 col-md-9"><input type="date" class="form-control dr_ppo_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Courtesy Investigation Completed</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_cic_update"></div>
                                </div>
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
        function GetURLParameter(sParam){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam)
                {
                    return decodeURIComponent(sParameterName[1]);
                }
            }
        }

        var docket_number = GetURLParameter('docket_number');
        var __fields = function(){
            __executeExternalGet('http://localhost:8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                console.log(result);
                console.log(docket_number)
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docket_num_update").val(result.docketNumber);

                    setTimeout(function () {
                    $(".docket_series_update").val(result.docketSeries).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".task_update").val(result.caseloadType).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".client_type_update").val(result.clientType).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".ref_office_update").val(result.referringOfficeId).trigger("change");
                    }, 3000);


                    $(".inv_off_update").val(result.investigatingOfficer);
                    $(".reason_update").val(result.referralData);
                    $(".dr_ppo_update").val(result.receivedDateByPPO);
                    $(".date_cic_update").val(result.dateCICAR);



                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {

                        "type"                      : "SC_PD_CINV",
                        "docketNumber"              : $(".docket_num_update").val(),
                        "docketSeries"              : $(".docket_series_update").val(),
                        "caseloadType"              : $(".task_update").val(),
                        "fieldOfficeId"             : $.cookie('field_office_id'),
                        "clientType"                : $(".client_type_update").val(),
                        "clientId"                  : "",
                        "firstName"                 : "",
                        "middleName"                : "",
                        "lastName"                  : "",
                        "suffixName"                : "",
                        "fullName"                  : "",
                        "pleaBargain"               : true,
                        "caseClassification"        : "",
                        "criminalCaseNumber"        : "",
                        "offense"                   : "",
                        "courtOfOrigin"             : "",
                        "courtOrderDate"            : "",
                        "investigatingOfficer"      : $(".inv_off_update").val(),
                        "receivedDateByPPO"         : $(".dr_ppo_update").val(),
                        "sentence"                  : "",
                        "manualDocket"              : true,
                        "referral"                  : true,
                        "referralData"              : "",
                        "remarks"                   : "",
                        "probationStartDate"        : "",
                        "probationYear"             : "",
                        "probationMonth"            : "",
                        "probationDay"              : "",
                        "reportType"                : "",
                        "prisonName"                : "",
                        "investigationReportSubmittedDate"          :"",
                        "ppoRecommendation"         : "",
                        "recommendationState"       : "",
                        "dateOfTransfer"            : "",
                        "transferredOfficeId"       : "",
                        "dateOrderReceivedFromTheBoard"             : "",
                        "boardOrder"                : "",
                        "boardOrderStatus"          : "",
                        "referringOfficeId"         : $(".ref_office_update").val(),
                        "dateCICAR"                 : $(".date_cic_update").val(),
                        "supervisingOfficer"        : "",
                        "probationEndDate"          : "",
                        "referralType"              : "",
                        "dateReportSubmittedToTheBoard"             : "",
                        "dateReportSubmittedToRDForTransferToOtherPPO": "",
                        "resolutionType"            : "",
                        "dateResolutionFromTheBoard": "",
                        "dateResolutionFromTheRDForTransfer"        : "",
                        "createdBy"                 : "",
                        "updatedBy"                 : "",
                        "legalAge"                  : true,
                        "militaryCourt"             : true,
                        "supervisionStartDate"      : "",
                        "supervisionEndDate"        : ""

                        }

                        console.log(payload)

                        __executeExternalPost('http://localhost:8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success_update').show();
                                setTimeout(function () {
                                    $('#success_update').hide();
                                    window.location.href = 'http://localhost/pis/pardonee_courtesy_investigation_docketing';
                                }, 2000);
                            }else{
                                alert("failed")
                            }
                        })
                    })

                }else{
                    alert("failed")
                }
            })
        }


        var __select = function(){
            $('.ref_office_update').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.ref_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.ref_office_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });

                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        setTimeout(function () {
            __fields();
        }, 500);


    } )( jQuery );
    </script>

</body>

</html>