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
                            <li class="active">Residence/Economic Conditions</li>
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
                                <strong class="card-title">Residence/Economic Conditions</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>

                                <fieldset class="row col col-md-12">
                                        <legend>Residence</legend>
                                        <div class="residence">
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_stability select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FREQUENT CHANGE">Frequent Change</option>
                                                    <option value="NO STABILITY">No Stability</option>
                                                    <option value="OCCASIONAL CHANGE">Occasional Change</option>
                                                    <option value="STABLE">Stable</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control residence_type select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="INFORMAL SETTLER">Informal Settler</option>
                                                    <option value="OWNED">Owned</option>
                                                    <option value="OWNED BY PARENTS">Owned by Parents</option>
                                                    <option value="RENTED">Rented</option>
                                                    <option value="USED FREE">Used Free</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_home_cond select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FAIR">Fair</option>
                                                    <option value="POOR">Poor</option>
                                                    <option value="SATISFACTORY">Satisfactory</option>
                                                    <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button type="button" class="add_more_residence btn btn-success btn-sm float-right">Add more</button>
                                        </div>

                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Economic Conditions</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Status</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_status select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="ADEQUATE">Adequate</option>
                                                        <option value="BELOW POVERTY">Below Poverty Lines</option>
                                                        <option value="INADEQUATE">Inadequate</option>
                                                        <option value="MORE ADEQAUTE">More than adequate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Breadwinner</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_breadwinner select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="CLIENT">Client</option>
                                                        <option value="CLIENT & SPOUSE">Client and Spouse</option>
                                                        <option value="CLIENT & SPOUSE & CHILD">Client,Spouse and Children</option>
                                                        <option value="OTHERS">Others</option>
                                                        <option value="SPOUSE">Spouse</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">No. of Dependants</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Ceremony" class="form-control no_dependants"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Dependants</label></div>
                                                <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control dependants"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Major Family Problems</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Problems</label></div>
                                                <div class="col-12 col-md-5"><textarea rows="2" cols="50" class="form-control maj_fam_prob"></textarea></div>
                                            </div>
                                            
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Comments</label></div>
                                                <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control fam_comments"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <a href="worksheet_education_history"> <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button> </a>
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
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        // $(".btn-confirm").unbind("click").on("click", function(){
            
        //     var payload = {
        //         "type"                      : "SC_PR_CINV",
        //         "docketNumber"              : "",
        //         "docketSeries"              : $(".docket_series").val(),
        //         "caseloadType"              : $(".task").val(),
        //         "fieldOfficeId"             : $.cookie('field_office_id'),
        //         "clientType"                : "PAROLEE",
        //         "clientId"                  : "",
        //         "firstName"                 : "",
        //         "middleName"                : "",
        //         "lastName"                  : "",
        //         "suffixName"                : "",
        //         "fullName"                  : "",
        //         "pleaBargain"               : true,
        //         "caseClassification"        : "",
        //         "criminalCaseNumber"        : "",
        //         "offense"                   : "",
        //         "courtOfOrigin"             : "",
        //         "courtOrderDate"            : "",
        //         "investigatingOfficer"      : $(".inv_off").val(),
        //         "receivedDateByPPO"         : $(".dr_ppo").val(),
        //         "sentence"                  : "",
        //         "manualDocket"              : true,
        //         "referral"                  : true,
        //         "referralData"              : "",
        //         "remarks"                   : "",
        //         "probationStartDate"        : "",
        //         "probationYear"             : "",
        //         "probationMonth"            : "",
        //         "probationDay"              : "",
        //         "reportType"                : "",
        //         "prisonName"                : "",
        //         "investigationReportSubmittedDate"          :"",
        //         "ppoRecommendation"         : "",
        //         "recommendationState"       : "",
        //         "dateOfTransfer"            : "",
        //         "transferredOfficeId"       : "",
        //         "dateOrderReceivedFromTheBoard"             : "",
        //         "boardOrder"                : "",
        //         "boardOrderStatus"          : "",
        //         "referringOfficeId"         : $(".ref_office").val(),
        //         "dateCICAR"                 : $(".date_cic").val(),
        //         "supervisingOfficer"        : "",
        //         "probationEndDate"          : "",
        //         "referralType"              : "",
        //         "dateReportSubmittedToTheBoard"             : "",
        //         "dateReportSubmittedToRDForTransferToOtherPPO": "",
        //         "resolutionType"            : "",
        //         "dateResolutionFromTheBoard": "",
        //         "dateResolutionFromTheRDForTransfer"        : "",
        //         "createdBy"                 : "",
        //         "updatedBy"                 : "",
        //         "legalAge"                  : true,
        //         "militaryCourt"             : true,
        //         "supervisionStartDate"      : "",
        //         "supervisionEndDate"        : ""
        //     }
        //     console.log(payload)
        //     __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
        //         console.log(result);
        //         if (result.status != "ERROR") {
        //             $(".form-control").val('');
        //             $('#success').show();
        //             setTimeout(function () {
        //                 $('#success').hide();
        //                 setTimeout(function () {
        //                     window.location.reload(true);
        //                 }, 500);
        //             }, 2000);
        //         }else{
        //             alert("failed")
        //         }
        //     })
        // })
   
        //     var __select = function(){
        //         $('.ref_office').empty();

        //         __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
        //             console.log(result)
        //             if (result.status != "ERROR") {
        //                 $('.ref_office').append("<option selected disabled> - - Select Field Office - - </option>");
        //                 result.forEach(function(data){
        //                     $('.ref_office').append(
        //                         "<option value="+data.id+">"+data.name+"</option>");
        //                 });

        //             } else {
        //                 console.log("failed fetching docket list")
        //             }
        //         })
        //     }
        //     __select();

        $(".add_more_residence").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".residence").append(`
            <div class="res">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control spouse_remarks"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Birth Place" class="form-control spouse_bplace_others"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Birth Place" class="form-control spouse_bplace_others"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.residence').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

    } )( jQuery );
    </script>

</body>

</html>