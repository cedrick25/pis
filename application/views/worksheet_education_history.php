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
                            <li class="active">Educational History</li>
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
                                <strong class="card-title">Petitioner's Educational History</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                        
                                <fieldset class="row form-group col col-md-12">
                                        <legend>Elementary</legend>
                                        <div class="elementary_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control elem_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control elem_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row form-group col col-md-12">
                                        <legend>Secondary</legend>
                                        <div class="secondary_education">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control sec_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control sec_award"></div>
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
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control college_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control college_award"></div>
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
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control pcollege_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control pcollege_award"></div>
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
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_lvl"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_high"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_where"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control voc_date"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control voc_award"></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Unschooled</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control unschool select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="LITERATE">Unschooled but Literate</option>
                                            <option value="ILLITERATE">Illiterate</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Conduct in School</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control conduct select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control fam_comments"></textarea></div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <a href="worksheet_employment_history"> <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button> </a>
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