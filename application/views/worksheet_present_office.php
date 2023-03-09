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
                            <li><a href="">Worksheet</a></li>
                            <li class="active">Petitioner's Criminal History</li>
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
                                <strong class="card-title">Present Offense</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Charged With</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control charged"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Place of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control p_commision"></div>
                                    <!-- <div class="col-12 col-md-9"><input type="date" class="form-control date_cic"></div> -->
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control convicted"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Charged</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_charged"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Commited</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_commited"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Convicted</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_convicted"></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Year" class="form-control s_yr"></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Month" class="form-control s_mo"></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Day" class="form-control s_day"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Judge</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control judge"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control court"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Arresting Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control arresting"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_1"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Defense Counsel</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control defense"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_2"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prosecutor</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control prosecutor"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_3"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offended Party</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control offended"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_4"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Co-Accused</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ca"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Aggravating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ac"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Mitigating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control mc"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Participation</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control ep"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Custody</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control custody"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manner of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control commision"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Motives</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control motives"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control explain"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button>
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