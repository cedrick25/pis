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
       
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        var __selectclient = function(){
            $('.client').empty();
            __executeExternalGet(___ctx+'8000/petitioner/list?type=PARDONEE&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.client').append("<option selected disabled> - - Select Client - - </option>");
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

        $(".btn-confirm").unbind("click").on("click", function(){
            
            var payload = {
                "type"                      : "SC_PD_CINV",
                "docketNumber"              : "",
                "docketSeries"              : $(".docket_series").val(),
                "caseloadType"              : $(".task").val(),
                "fieldOfficeId"             : $.cookie('field_office_id'),
                "clientType"                : "PARDONEE",
                "clientId"                  : $(".client").val(),
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
            __executeExternalPost('8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
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

            __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
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