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
                        <h1>Update</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="supervision_docketing">Supervision Docket</a></li>
                            <li class="active">Update</li>
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
                                <strong class="card-title">Update Supervision</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Updated  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control docket_num" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control caseload_type_update select2" disabled>
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
                                        <select class="form-control client_type_update select2">
                                            <option selected value="true">Adult</option>
                                            <option value="false">Juvenile</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin_update"></div>
                                </div>
                                <div class="row form-group col-md-6 false_manual">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office_update">
                                            <option value="1">Yes</option>
                                            <option value="2">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control inv_off_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control military_court_update select2">
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control plea_bargain_update select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6 class_sel" style="display: none;">
                                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control classification_update select2" >
                                            <option selected value="none" disabled>Choose</option>
                                            <option value="drug">Drug</option>
                                            <option value="non-drug">Non Drug</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <fieldset class="row col col-md-12">
                                        <legend>List</legend>
                                        <div class="list">
                                        </div>
                                        <div class="col-12">
                                            <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control cod_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control rd_update"></div>
                                </div>
                                <!-- <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks_update"></div>
                                </div> -->
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

        $('.plea_bargain_update').change(function(){
            if ($('.plea_bargain_update').val() == "true") {
                $(".class_sel").show();
            } else {
                $(".class-sel").hide();
            }
            if ($('.plea_bargain_update').val() == "false"){
            $(".class_sel").hide();
            } else {
                $(".class_sel").show();
            }
        });

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked")
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
                </div>`
            )
        })
        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });
        var docket_number = GetURLParameter('docket_number');
        var __fields = function(){
            __executeExternalGet('http://localhost:8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docket_num").val(result.docketNumber);
                    $(".firstName_update").val(result.firstName);
                    $(".middleName_update").val(result.middleName);
                    setTimeout(function () {
                    $(".caseload_type_update").val(result.caseloadType).trigger("change");
                    }, 3000);
                    $(".lastName_update").val(result.lastName);
                    $(".suffix_update").val(result.suffixName);
                    setTimeout(function () {
                        $(".field_office_update").val(result.fieldOfficeId).trigger("change");
                    }, 3000);
                    $(".cc_no_update").val(result.criminalCaseNumber);
                    $(".offense_update").val(result.offense);
                    $(".court_origin_update").val(result.courtOfOrigin);
                    if (result.militaryCourt == true) {
                        var mc = "true"
                    } else {
                        var mc = "false"
                    }
                    if (result.legalAge == true) {
                        var la = "true"
                    } else {
                        var la = "false"
                    }
                    $(".client_type_update").val(la).trigger("change");
                    $(".military_court_update").val(mc).trigger("change");
                    $(".cod_update").val(result.courtOrderDate);
                    $(".rd_update").val(result.receivedDate);
                    $(".remarks_update").val(result.remarks);

                    // console.log(JSON.parse(result.sentence))
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

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')
                        
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
                        // console.log(list)
                        console.log(sentence)
                        
                        var payload = {
                            "type"          : "PIS_SUP",
                            "docketNumber"  : $(".docket_num").val(),
                            "fieldOfficeId" : $(".field_office_update").val(),
                            "clientType"    : $(".client_type_update").val(),
                            "caseload"      : $(".caseload_type_update").val(),
                            "firstName"     : $(".firstName_update").val(),
                            "middleName"    : $(".middleName_update").val(),
                            "lastName"      : $(".lastName_update").val(),
                            "suffixName"    : $(".suffix_update").val(),
                            "criminalCaseNumber" : $(".cc_no_update").val(),
                            "offense"       : $(".offense_update").val(),
                            "courtOfOrigin" : $(".court_origin_update").val(),
                            "militaryCourt" : $(".military_court_update").val(),
                            "sentence"      : JSON.stringify(sentence),
                            "courtOrderDate": $(".cod_update").val(),
                            "receivedDate"  : $(".rd_update").val(),
                            "manualDocket"  : false,
                            "referral"      : false,
                            "typeOfReferral": "",
                            "remarks"       : $(".remarks_update").val(),
                            "probationStartDate": "",
                            "probationYear" : "",
                            "probationMonth": "",
                            "probationDay"  :"",
                            "status"        : 1,
                        }

                        __executeExternalPost('http://localhost:8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success_update').show();
                                setTimeout(function () {
                                    $('#success_update').hide();
                                    window.location.reload(true);
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
            $('.field_office_update').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_update').append(
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