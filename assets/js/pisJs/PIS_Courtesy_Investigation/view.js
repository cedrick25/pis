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
                        $('.ref_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectFieldOffice();

        var __selectclient = function(){
            $('.client').empty();
            __executeExternalGet('8000/petitioner/list?type=PROBATIONER&officeId='+$.cookie("field_office_id")).done(function (result) {
                if (result.status != "ERROR") {
                    $('.client').append("<option selected disabled>Select Client</option>");
                    let name = "";
                    result.forEach(function(data){
                        if (data.firstName === null &&
                            data.middleName === null &&
                            data.lastName === null &&
                            data.suffixName === null ) {
                            name = data.fullName;
                            $('.client').append(
                                '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');
                        } else {
                            name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                            $('.client').append(
                                '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'" data-fullname="'+data.fullName+'">'+name+'</option>');

                        }
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

        var docket_number = GetURLParameter('docket_number');
        var petitionerId = GetURLParameter('petitionerId');
        var officeId = $.cookie("field_office_id");
        // console.log(officeId)

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        var updateProbationInvestigation = function () {
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+officeId).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docket_number").val(result.docketNumber);
                    $(".field_office").val(result.fieldOfficeId).trigger("change");
                    setTimeout (function (){
                        $(".client").val(petitionerId).trigger("change");
                        $(".ref_office").val(result.referringOfficeId).trigger("change");
                    },1000)
                    $(".date_rcv_from_ppo").val(result.receivedDateByPPO);
                    $(".inv_officer").val(result.receivedDateByPPO);
                    $(".reasons").val(result.remarks);
                    $(".date_completed_and_returned").val(result.dateCICAR);


                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var fname = $('.pb_client option:selected').data('fname');
                        var mname = $('.pb_client option:selected').data('mname');
                        var lname = $('.pb_client option:selected').data('lname');
                        var sname = $('.pb_client option:selected').data('sname');
                        var fullName = $('.pb_client option:selected').data('fullname');

                        var payload = {
                            "type": "PIS_CSINV",
                            "docketNumber": $(".docket_number").val(),
                            "docketSeries": "",
                            "caseloadType": "",
                            "fieldOfficeId": officeId,
                            "clientType": "PROBATIONER",
                            "clientId": petitionerId,
                            "firstName": fname,
                            "middleName": mname,
                            "lastName": lname,
                            "suffixName": sname,
                            "fullName": fullName,
                            "pleaBargain": "",
                            "caseClassification": "",
                            "criminalCaseNumber": "",
                            "offense": "",
                            "courtOfOrigin": "",
                            "courtOrderDate": "",
                            "investigatingOfficer": $(".inv_officer").val(),
                            "receivedDateByPPO": $(".date_rcv_from_ppo").val(),
                            "sentence": "",
                            "manualDocket": true,
                            "referral": "",
                            "referralData": "",
                            "remarks": $(".reasons").val(),
                            "probationStartDate": "",
                            "probationYear": "",
                            "probationMonth": "",
                            "probationDay": "",
                            "prisonName": "",
                            "investigationReportSubmittedDate": "",
                            "ppoRecommendation": "",
                            "recommendationState": "",
                            "dateOfTransfer": "",
                            "transferredOfficeId": "",
                            "dateOrderReceivedFromTheBoard": "",
                            "boardOrder": "",
                            "boardOrderStatus": "",
                            "referringOfficeId": $(".ref_office").val(),
                            "dateCICAR": $(".date_completed_and_returned").val(),
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
                            "legalAge": "",
                            "militaryCourt": ""
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
            // $('.card-body').find('input, select, button').prop('disabled', false);
            // $('.btn-confirm_update').prop('disabled', false);
            // $('.docketNum_update').prop('disabled', true)
            // $('.pb_client').prop('disabled', true)
            updateProbationInvestigation();
        }, 3000);

    } )( jQuery );