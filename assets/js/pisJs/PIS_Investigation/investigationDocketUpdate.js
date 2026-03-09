    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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

        $('.plea_bargain').change(function(){
            if ($('.plea_bargain').val() == "true") {
                $(".class_sel").show();
            } else {
                $(".class-sel").hide();
            }
            if ($('.plea_bargain').val() == "false"){
            $(".class_sel").hide();
            } else {
                $(".class_sel").show();
            }
        });

        let sentence_counter = -1;

        $(".add_more").unbind("click").on("click", function(){
            sentence_counter++;
            $("#sentence_card .card-body").append(`
                <div id="sentence_list_${sentence_counter}" style="padding-top: 10px; padding-bottom: 10px">
                    <div class="form-row">
                        <div class="list_sentence">
                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-sm-2 col-md-2 col-lg-2 col-xl-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                <div class="col-3 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" class="form-control civil_liability" placeholder="Robbery"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 justify-content-end" style="padding-top: 20px">
                                <button type="button" class="remove btn btn-danger btn-sm" data-id="${sentence_counter}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
        });
        $('#sentence_card .card-body').on('click', '.remove', function(e) {
            var id = $(this).data("id")
            $(`#sentence_list_${id}`).remove();
        });

        var __selectFieldOffice = function(){
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    result.forEach(function(data){
                        // $('.field_office').append(
                        //     "<option value="+data.id+">"+data.name+"</option>");
                        $('.transfer_to').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectFieldOffice();
        // var __selectclient = function(){
        //     $('.pb_client').empty();
        //     __executeExternalGet('8000/petitioner/list?type=PROBATIONER&officeId='+$.cookie("field_office_id")).done(function (result) {
        //         if (result.status != "ERROR") {
        //             $('.pb_client').append("<option selected disabled>Select Client</option>");
        //             let name = "";
        //             result.forEach(function(data){
        //                 if (data.firstName === null &&
        //                     data.middleName === null &&
        //                     data.lastName === null &&
        //                     data.suffixName === null ) {
        //                     name = data.fullName;
        //                     $('.pb_client').append(
        //                         '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');
        //                 } else {
        //                     name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
        //                     $('.pb_client').append(
        //                         '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');

        //                 }
        //             });
        //         } else {
        //             console.log("failed fetching docket list")
        //         }
        //     })
        // }
        // __selectclient();

        var docket_number = GetURLParameter('docket_number');
        var officeId = $.cookie("field_office_id");
        var petitionerId = GetURLParameter("petitionerId");

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        var updateProbationInvestigation = function () {
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+officeId).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docketNum_update").val(result.docketNumber);
                    let name = "";
                    if (!result.fullName) {
                        name = `${result.firstName} ${result.middleName} ${result.lastName} ${result.suffixName}`
                    } else {
                        name = result.fullName
                    }
                    $(".pb_client").val(name);

                    if (result.pleaBargain == true) {
                        var pb = "true"
                    } else {
                        var pb = "false"
                    }

                    $(".plea_bargain").val(pb).trigger("change");
                    $(".cc_no").val(result.criminalCaseNumber);
                    $(".court_origin").val(result.courtOfOrigin);
                    $(".offense").val(result.offense);
                    $(".sentence").val(result.sentence);
                    $(".cod").val(result.courtOrderDate);
                    $(".rd").val(result.receivedDateByPPO);
                    $(".inv_off").val(result.investigatingOfficer);
                    // for referrals acted upon
                    $(".psir_date").val(result.psirDate);
                    $(".ppo_recommendation").val(result.ppoRecommendation).trigger("change");
                    $(".manifestation_date").val(result.manifestationDate);
                    $(".transfer_date").val(result.dateOfTransfer);
                    $(".transfer_to").val(result.transferredOfficeId).trigger("change");
                    // for referrals not acted upon
                    var typeOfReferrals = result.typeOfReferrals ?? "";
                    $(".not_acted_decision").val(typeOfReferrals).trigger("change");
                    $(".date_order_received").val(result.referralsNotActedUponDateOrderReceived);
                    // for cases disposed of by the court and issuance of
                    $(".alias_t4").val(result.alias);
                    $(".court_decision_t4").val(result.courtDecision);
                    $(".reason_for_denial_t4").val(result.reasonForDenialDismissal);
                    $(".other_type_of_decision_t4").val(result.specifyOtherTypeOfDecision);
                    $(".date_order_received_court_t4").val(result.dateOrderReceivedFromTheCourt);

                    $(".btn-confirm_update").unbind("click").on("click", function(){

                        var payload = {
                            "type": "PIS_INV",
                            "docketNumber": $(".docketNum_update").val(),
                            "docketSeries": "",
                            "caseloadType": "",
                            "fieldOfficeId": officeId,
                            "clientType": "PROBATIONER",
                            "clientId": petitionerId,
                            "firstName": result.firstName ?? "",
                            "middleName": result.middleName ?? "",
                            "lastName": result.lastName ?? "",
                            "suffixName": result.suffixName ?? "",
                            "fullName": result.fullName ?? "",
                            "isLegalAge": false,
                            "pleaBargain": $(".plea_bargain").val(),
                            "caseClassification": "",
                            "criminalCaseNumber": $(".cc_no").val(),
                            "offense": $(".offense").val(),
                            "courtOfOrigin": $(".court_origin").val(),
                            "isMilitaryCourt": false,
                            "courtOrderDate": $(".cod").val(),
                            "investigatingOfficer": $(".inv_off").val(),
                            "receivedDateByPPO": $(".rd").val(),
                            "sentence": $(".sentence").val(),
                            "manualDocket": false,
                            "referral": false,
                            "referralData": "",
                            "remarks": "",
                            "probationStartDate": "",
                            "probationYear": "",
                            "probationMonth": "",
                            "probationDay": "",
                            "prisonName": "",
                            "investigationReportSubmittedDate": "",
                            "ppoRecommendation": $(".ppo_recommendation").val(),
                            "recommendationState": "",
                            "dateOfTransfer": $(".transfer_date").val(),
                            "transferredOfficeId": $(".transfer_to").val (),
                            "dateOrderReceivedFromTheBoard": "",
                            "boardOrder": "",
                            "boardOrderStatus": "",
                            "referringOfficeId": "",
                            "dateCICAR": "",
                            "supervisingOfficer": "",
                            "supervisionStartDate": "",
                            "supervisionEndDate": "",
                            "probationEndDate": "",
                            "reportType": "",
                            "referralType": "",
                            "dateReportSubmittedToTheBoard": "",
                            "dateReportSubmittedToRDForTransferToOtherPPO": "",
                            "resolutionType": "",
                            "dateResolutionFromTheBoard": "",
                            "dateResolutionFromTheRDForTransfer": "",
                            "createdBy": "",
                            "updatedBy": "",
                            "psirDate": $(".psir_date").val(),
                            "manifestationDate": $(".manifestation_date").val(),
                            "typeOfReferrals": $(".not_acted_decision").val(),
                            "referralsNotActedUponDateOrderReceived": $(".date_order_received").val(),
                            "alias": $(".alias_t4").val(),
                            "courtDecision": $(".court_decision_t4").val(),
                            "reasonForDenialDismissal": $(".reason_for_denial_t4").val(),
                            "dateOrderReceivedFromTheCourt": $(".date_order_received_court_t4").val(),
                            "dateCompletedAndReturned": "",
                            "officeFindingsForActedUpon": "",
                            "officeFindingsForPendingDisposition": "",
                            "specifyCourtPpoTransferred": "",
                            "specifyOtherReasonsRevocation": "",
                            "periodOfSupervision": "",
                            "specifyOtherSubmittedReports": "",
                            "otherResolutionType": "",
                            "periodOfCourtesySupervision": "",
                            "dateReturned": "",
                            "referringOfficeCourtesyInv": "",
                            "referringOfficeCourtesyInvId": "",
                            "referringOfficeCourtesySup": "",
                            "referringOfficeCourtesySupId": "",
                            "specifyOtherTypeOfDecision": $(".other_type_of_decision_t4").val(),
                            "fromPrisonType": ""
                        }
                        __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+officeId,JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $('#success').show();
                                setTimeout(function () {
                                    $(".form-control").val('');
                                    $('#success').hide();
                                    window.location.href=api+"/pis/investigation_docketing";
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

        setTimeout(function () {
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm_update').prop('disabled', false);
            $('.docketNum_update').prop('disabled', true)
            $('.pb_client').prop('disabled', true)
            updateProbationInvestigation();
        }, 3000);

    } )( jQuery );