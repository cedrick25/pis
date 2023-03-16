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
                            <li><a href="client_list">Client</a></li>
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Environmental Factors</li>
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
                                <strong class="card-title">Community Background/Environmental Factors</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Neighborhood</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control neighborhood select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="RURAL">Rural</option>
                                            <option value="URBAN">Urban</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Area</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control area select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NON-SLUM AREA">Non-Slum Area</option>
                                            <option value="SLUM-AREA">Slum Area</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Describe</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control neighborhoodDescribe"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Neighborhood Criminality</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control home_cond select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="HIGH">High</option>
                                            <option value="LOW">Low</option>
                                            <option value="MINIMAL">Minimal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control criminalityExplain"></textarea></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Community Acceptance</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control comAcceptance select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control acceptanceSpecify"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Peer Group Relationship</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control home_cond select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="DESIRABLE">Desirable</option>
                                            <option value="UNDESIRABLE WITH POTENTIAL">Undesirable with Potential for Improvement</option>
                                            <option value="UNDESIRABLE WITH NO POTENTIAL">Undesirable with no Potential for Improvement</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control peerSpecify"></textarea></div>
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <a href="client_list"> <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button> </a>
                                <button type="button" class="btn btn-primary btn-confirm btn-sm">Save & Exit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

<!--     <script type="text/javascript">
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
                "type"                      : "SC_PR_CINV",
                "docketNumber"              : "",
                "docketSeries"              : $(".docket_series").val(),
                "caseloadType"              : $(".task").val(),
                "fieldOfficeId"             : $.cookie('field_office_id'),
                "clientType"                : "PAROLEE",
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
                "investigatingOfficer"      : $(".inv_off").val(),
                "receivedDateByPPO"         : $(".dr_ppo").val(),
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
                "referringOfficeId"         : $(".ref_office").val(),
                "dateCICAR"                 : $(".date_cic").val(),
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
   
            var __select = function(){
                $('.ref_office').empty();

                __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                    console.log(result)
                    if (result.status != "ERROR") {
                        $('.ref_office').append("<option selected disabled> - - Select Field Office - - </option>");
                        result.forEach(function(data){
                            $('.ref_office').append(
                                "<option value="+data.id+">"+data.name+"</option>");
                        });

                    } else {
                        console.log("failed fetching docket list")
                    }
                })
            }
            __select();

    } )( jQuery );
    </script> -->

</body>

</html>