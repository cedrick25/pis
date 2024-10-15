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
        var __selectclient = function(){
            $('.client').empty();
            __executeExternalGet('8000/petitioner/list?type=PARDONEE&officeId='+$.cookie('field_office_id')).done(function (result) {
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
            $('.office_transfered').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.office_transfered').append("<option selected disabled>Select Field Office</option>");
                    result.forEach(function(data){
                        $('.office_transfered').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });

                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        $(".btn-confirm").unbind("click").on("click", function(){

            var fname = $('.client option:selected').data('fname');
            var mname = $('.client option:selected').data('mname');
            var lname = $('.client option:selected').data('lname');
            var sname = $('.client option:selected').data('sname');
            var fullName = fname + " " + mname + " " + lname + " " + sname;
                
            var payload = {
                "type"                              : "SC_PD_INV",
                "docketNumber"                      : "",
                "docketSeries"                      :$(".docket_series").val(),
                "caseloadType"                      :$(".caseload").val(),
                "fieldOfficeId"                     : $.cookie('field_office_id'),
                "clientType"                        : "PARDONEE",
                "clientId"                          : $(".client").val(),
                "firstName"                         : fname,
                "middleName"                        : mname,
                "lastName"                          : lname,
                "suffixName"                        : sname,
                "fullName"                          : fullName,
                "pleaBargain"                       : true,
                "caseClassification"                : "",
                "criminalCaseNumber"                : $(".cc_no").val(),
                "offense"                           : $(".offense").val(),
                "courtOfOrigin"                     : "",
                "courtOrderDate"                    : "",
                "investigatingOfficer"              :$(".inv_off").val(),
                "receivedDateByPPO"                 : "",
                "sentence"                          : "",
                "manualDocket"                      : true,
                "referral"                          : true,
                "referralData"                      : "",
                "remarks"                           : "",
                "reportType"                        : "",
                "probationStartDate"                : "",
                "probationYear"                     : "",
                "probationMonth"                    : "",
                "probationDay"                      : "",
                "prisonName"                        : $(".prison_name").val(),
                "investigationReportSubmittedDate"  :$(".date_peci").val(),
                "ppoRecommendation"                 : "",
                "recommendationState"               : $(".recommentation").val(),
                "dateOfTransfer"                    : $(".date_transferred").val(),
                "transferredOfficeId"               : $(".office_transfered").val(),
                "dateOrderReceivedFromTheBoard"     : "",
                "boardOrder"                        : $(".board_order").val(),
                "boardOrderStatus"                  : $(".board_status").val(),
                "referrringOfficeId"                : "",
                "dateCICAR"                         : "",    
                "supervisingOfficer"                : "",
                "probationEndDate"                  : "",
                "referralType"                      : "",
                "dateReportSubmittedToTheBoard"     : "",
                "dateReportSubmittedToRDForTransferToOtherPPO": "",
                "resolutionType"                    : "",
                "dateResolutionFromTheBoard"        : "",
                "dateResolutionFromTheRDForTransfer": "",
                "createdBy"                         : "",
                "updatedBy"                         : "",
                "legalAge"                          : true,
                "militaryCourt"                     : true
            }
            __executeExternalPost('8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/pardonee_investigation_docketing'
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

    } )( jQuery );