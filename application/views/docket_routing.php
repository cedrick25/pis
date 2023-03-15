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
                            <li><a href="docket_routing">Docket Routing</a></li>
                            <li class="active">Forward</li>
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
                                <strong class="card-title">Forward Docket</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Forward 
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control type select2">
                                            <option value="" selected disabled> - - Select Type - - </option>
                                            <option value="PIS_INV">Investigation</option>
                                            <option value="PIS_SUP">Supervision</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control docket_num select2">
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Task</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control caseload select2" disabled>
                                            <option value="" selected disabled> - - Select Type - - </option>
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
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Forward to Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control field_office select2">
                                            <option value="" selected disabled> - - Select Type - - </option>
                                            <option>Central Office</option>
                                            <option>San Juan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 user_display">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Account</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control user_account select2">
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Details" class="form-control details"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset" style='display:none;'>Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm_forward btn-sm" style='display:none;'>Confirm</button>
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

        // var __select = function(){
        //     $('.field_office').empty();

        //     $('.type').on('change', function() {
        //         $('.docket_num').empty();
        //         const type = this.value
        //         console.log(type)
        //         __executeExternalGet('http://localhost:8000/docketbook/list/'+type+"/"+$.cookie("field_office_id")).done(function (result) {
        //             console.log(result)
        //             if (result.status != "ERROR") {

        //                 $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");

        //                 result.response.forEach(function(data){
        //                     $('.docket_num').append(
        //                         "<option value="+data.docketNumber+" data-id="+data.type+">"+data.docketNumber+"</option>");
        //                 });

        //             } else {
        //                 console.log("failed fetching docket number")
        //             }
        //         });
        //     });

        //     __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
        //         // console.log(result)
        //         if (result.status != "ERROR") {
        //             $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
        //             result.forEach(function(data){
        //                 $('.field_office').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");
        //             });
        //             $('.field_office').on('change', function() {
        //                 $('.user_account').empty();
        //                 const dep_id = this.value
        //                 __executeExternalGet('http://localhost:8088/user/list/'+dep_id).done(function (result) {
        //                     console.log(result)
        //                     if (result.status != "ERROR") {
        //                         $(".user_display").show()
        //                         $('.user_account').append("<option selected disabled> - - Select User Account - - </option>");
        //                         result.forEach(function(data){
        //                             console.log(data)
        //                             var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
        //                             $('.user_account').append(
        //                                 "<option value="+data.uuid+">"+fullname+"</option>");
        //                         });
        //                     } else {
        //                         console.log("failed fetching user list")
        //                         $(".user_display").hide()
        //                     }
        //                 });
        //             });
        //         } else {
        //             console.log("failed fetching department list")
        //         }
        //     })

        //     $(".btn-confirm_forward").unbind("click").on("click", function(){
        //         console.log('clicked')

        //         var payload = {
        //             "type"                  : $('.type').val(),
        //             "caseloadType"          : $(".caseload").val(),
        //             "senderId"              : $.cookie("uuid"),
        //             "receiverId"            : $(".user_account").val(),
        //             "fieldOfficeId"         : $(".field_office").val(),
        //             "docketNumber"          : $(".docket_num").val(),
        //             "details"               : $(".details").val(),
        //             "remarks"               : "",
        //             "approvalStatus"        : "",
        //             "lastStatusUpdateDate"  : "",
        //         }
        //         console.log(payload)
        //         __executeExternalPost('http://localhost:8000/workflow/create',JSON.stringify(payload)).done(function (result) {
        //             console.log(result);
        //             if (result.status != "ERROR") {
        //             $(".form-control").val('');
        //             $('#success_forwarding').show();
        //                 setTimeout(function () {
        //                     $('#success_forwarding').hide();
        //                     window.location.reload(true);
        //                 }, 2000);
        //             }else{
        //                 alert("failed")
        //             }
        //         })
        //     })
        // }
        // __select();

                var __select = function(){
            $('.field_office').empty();

            $('.type').on('change', function() {
                $('.docket_num').empty();
                const type = this.value
                console.log(type)
                __executeExternalGet('http://localhost:8000/docketbook/list/'+type+"/"+$.cookie("field_office_id")).done(function (result) {
                    console.log(result)
                    if (result.status != "ERROR") {

                        $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");

                        result.response.forEach(function(data){
                            $('.docket_num').append(
                                "<option value="+data.docketNumber+" data-id="+data.type+">"+data.docketNumber+"</option>");
                        });

                    } else {
                        console.log("failed fetching docket number")
                    }
                });
            });

            $('.docket_num').on('change', function() {
                const docket_number = this.value
                console.log(docket_number)
                __executeExternalGet('http://localhost:8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                    console.log(result)
                    var result = result.response;
                    if (result.status != "ERROR") {
                        // console.log(result.caseloadType)

                        setTimeout(function () {
                        $(".caseload").val(result.caseloadType).trigger("change");
                        }, 500);

                        // setTimeout(function () {
                        // $(".field_office").val(result.fieldOfficeId).trigger("change");
                        // }, 500);

                    } else {
                        console.log("failed fetching docket number")
                    }


                });
            });

                    
            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    $('.field_office').on('change', function() {
                        $('.user_account').empty();
                        const dep_id = this.value
                        __executeExternalGet('http://localhost:8088/user/list/'+dep_id).done(function (result) {
                            console.log(result)
                            if (result.status != "ERROR") {
                                $(".user_display").show()
                                $('.user_account').append("<option selected disabled> - - Select User Account - - </option>");
                                result.forEach(function(data){
                                    console.log(data)
                                    var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                    $('.user_account').append(
                                        "<option value="+data.uuid+">"+fullname+"</option>");
                                });
                            } else {
                                console.log("failed fetching user list")
                                $(".user_display").hide()
                            }
                        });
                    });
                } else {
                    console.log("failed fetching department list")
                }
            })


            $(".btn-confirm_forward").unbind("click").on("click", function(){
                console.log('clicked')

                var payload = {
                    "type"                  : $('.type').val(),
                    "caseloadType"          : $(".caseload").val(),
                    "senderId"              : $.cookie("uuid"),
                    "receiverId"            : $(".user_account").val(),
                    "fieldOfficeId"         : $(".field_office").val(),
                    "docketNumber"          : $(".docket_num").val(),
                    "details"               : $(".details").val(),
                    "remarks"               : "",
                    "approvalStatus"        : "",
                    "lastStatusUpdateDate"  : "",
                }
                console.log(payload)
                __executeExternalPost('http://localhost:8000/workflow/create',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success_forwarding').show();
                        setTimeout(function () {
                            $('#success_forwarding').hide();
                            window.location.reload(true);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            })
        }
        __select();

        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

    } )( jQuery );
    </script>

</body>

</html>