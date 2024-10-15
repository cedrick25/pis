    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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

        var __selectclient = function(){
            $('.client').empty();
            __executeExternalGet(___ctx+'8000/petitioner/list?type=PARDONEE&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.client').append("<option selected disabled>Select Client</option>");
                    result.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        $('.client').append(
                            '<option value="'+data.id+'" data-id="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

        var __select = function(){
            $('.ref_office_update').empty();

            __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.ref_office_update').append("<option selected disabled>Select Field Office</option>");
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

        var docket_number = GetURLParameter('docket_number');
        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        var __fields = function(){
            __executeExternalGet(___ctx+'8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                console.log(result);
                console.log(docket_number)
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docket_num_update").val(result.docketNumber);

                    $(".docket_series_update").val(result.docketSeries).trigger("change");
                    $(".ref_office_update").val(result.referringOfficeId).trigger("change");
                    $(".case_class_update").val(result.caseClassification).trigger("change");
                    $(".client_type_update").val(result.clientType).trigger("change");
                    $(".task_update").val(result.caseloadType).trigger("change");
                    $(".client").val(result.clientId).trigger("change");
                    $(".sup_off_update").val(result.supervisingOfficer);
                    $(".dr_ppo_update").val(result.receivedDateByPPO);
                    $(".start_sup_date_update").val(result.supervisionStartDate);
                    $(".end_sup_date_update").val(result.supervisionEndDate);
                    $(".date_cic_update").val(result.dateCICAR);
                    $(".date_court_ref_update").val(result.dateCICAR);
                    $(".reason_update").val(result.referralData);



                    $(".btn-confirm_update").unbind("click").on("click", function(){             
                        var fname = $('.client option:selected').data('fname');
                        var mname = $('.client option:selected').data('mname');
                        var lname = $('.client option:selected').data('lname');
                        var sname = $('.client option:selected').data('sname');
                        var fullName = fname + " " + mname + " " + lname + " " + sname;

                        var payload = {

                        "type"                      : "SC_PD_CSUP",
                        "docketNumber"              : $(".docket_num_update").val(),
                        "docketSeries"              : $(".docket_series_update").val(),
                        "caseloadType"              : $(".task_update").val(),
                        "fieldOfficeId"             : $.cookie('field_office_id'),
                        "clientType"                : "PARDONEE",
                        "clientId"                  : $(".client").val(),
                        "firstName"                 : fname,
                        "middleName"                : mname,
                        "lastName"                  : lname,
                        "suffixName"                : sname,
                        "fullName"                  : fullName,
                        "pleaBargain"               : true,
                        "caseClassification"        : $(".case_class_update").val(),
                        "criminalCaseNumber"        : "",
                        "offense"                   : "",
                        "courtOfOrigin"             : "",
                        "courtOrderDate"            : "",
                        "investigatingOfficer"      : "",
                        "receivedDateByPPO"         : $(".dr_ppo_update").val(),
                        "sentence"                  : "",
                        "manualDocket"              : true,
                        "referral"                  : true,
                        "referralData"              : $(".reason_update").val(),
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
                        "supervisingOfficer"        : $(".sup_off_update").val(),
                        "probationEndDate"          : "",
                        "referralType"              : "",
                        "dateReportSubmittedToTheBoard"             : "",
                        "dateReportSubmittedToRDForTransferToOtherPPO": "",
                        "resolutionType"            : $(".res_type_update").val(),
                        "dateResolutionFromTheBoard": "",
                        "dateResolutionFromTheRDForTransfer"        : "",
                        "createdBy"                 : "",
                        "updatedBy"                 : "",
                        "legalAge"                  : true,
                        "militaryCourt"             : true,
                        "supervisionStartDate"      : $(".start_sup_date_update").val(),
                        "supervisionEndDate"        : $(".end_sup_date_update").val()

                        }

                        console.log(payload)

                        __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success').show();
                                setTimeout(function () {
                                    $('#success').hide();
                                    window.location.href = api+'/pis/pardonee_courtesy_supervision_docketing';
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
            __fields();
            $("#spinner_update").hide();
        }, 4000);


    } )( jQuery );