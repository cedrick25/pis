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
                        $(".recommendation_update").val(result.recommendationState).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".task_update").val(result.caseloadType).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".client_type_update").val(result.clientType).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".board_status_update").val(result.boardOrderStatus).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".board_order_update").val(result.boardOrder).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".state_update").val(result.status).trigger("change");
                    }, 3000);

                    setTimeout(function () {
                        $(".ref_office_update").val(result.transferredOfficeId).trigger("change");
                    }, 3000);

                    $(".inv_off_update").val(result.investigatingOfficer);
                    $(".cc_no_update").val(result.criminalCaseNumber);
                    $(".offense_update").val(result.offense);
                    $(".prison_name_update").val(result.prisonName);
                    $(".date_transferred_update").val(result.dateOfTransfer);
                    $(".date_peci_update").val(result.investigationReportSubmittedDate);

                    

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {
                        "type"                  : "SC_PD_INV",
                        "docketNumber"          : $(".docket_num_update").val(),
                        "docketSeries"          : $(".docket_series_update").val(),
                        "caseloadType"          : $(".task_update").val(),
                        "clientType"            : "PARDONEE",
                        "fieldOfficeId"         : $.cookie('field_office_id'),
                        "firstName"             : "",
                        "middleName"            : "",
                        "lastName"              : "",
                        "suffixName"            : "",
                        "fullName"              : "",
                        "pleaBargain"           : false,
                        "caseClassification"    : "",
                        "criminalCaseNumber"    : $(".cc_no_update").val(),
                        "offense"               : $(".offense_update").val(),
                        "investigatingOfficer"  : $(".inv_off_update").val(),
                        "courtOfOrigin"         : "",
                        "courtOrderDate"        : "",
                        "receivedDateByPPO"     : "",
                        "sentence"              : "",
                        "manualDocket"          : false,
                        "referral"              : false,
                        "referralData"          : "",
                        "remarks"               : "",
                        "probationStartDate"    : "",
                        "probationYear"         : "",
                        "probationMonth"        : "",
                        "probationDay"          :"",
                        "prisonName"            : $(".prison_name_update").val(),
                        "investigationReportSubmittedDate"  : $(".date_peci_update").val(),
                        "ppoRecommendation"                 : "",
                        "recommendationState"               : $(".recommendation_update").val(),
                        "dateOfTransfer"                    : $(".date_transferred_update").val(),
                        "transferredOfficeId"               : $(".ref_office_update").val(),
                        "dateOrderReceivedFromTheBoard"     : "",
                        "boardOrder"            : $(".board_order_update").val(),
                        "boardOrderStatus"      : $(".board_status_update").val(),
                        "referrringOfficeId"    : "",
                        "dateCICAR"             : "",
                        "supervisingOfficer"    : "",
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
                        __executeExternalPost('http://localhost:8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success_update').show();
                                setTimeout(function () {
                                    $('#success_update').hide();
                                    window.location.href = 'http://localhost/pis/pardonee_investigation_docketing';
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

        var __client = function(){
                $('.client_update').empty();


                __executeExternalGet('http://localhost:8000/petitioner?page=0&size=100').done(function (result) {
                    
                    if (result.status != "ERROR") {
                    console.log(result)
                        $('.client_update').append("<option selected disabled> - - Select Client - - </option>");
                        result.content.forEach(function(data){
                            $('.client_update').append(
                                "<option value="+data.id+">"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffixName+"</option>");
                        });

                    } else {
                        console.log("failed fetching docket list")
                    }
                })
            }
            __client();

    } )( jQuery );