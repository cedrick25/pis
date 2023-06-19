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

        var __selectclient = function(){
            $('.client').empty();
            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PAROLEE').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.client').append("<option selected disabled> - - Select Client - - </option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        console.log(name)
                        $('.client').append(
                            '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();
       
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        $(".btn-confirm").unbind("click").on("click", function(){

            var fname = $('.client option:selected').data('fname');
            var mname = $('.client option:selected').data('mname');
            var lname = $('.client option:selected').data('lname');
            var sname = $('.client option:selected').data('sname');
                
            var payload = {
                "type"                         : "SC_PR_INV",
                "docketNumber"                 : "",
                "docketSeries"                 :$(".docket_series").val(),
                "caseloadType"                 :$(".caseload").val(),
                "fieldOfficeId"                : $.cookie('field_office_id'),
                "clientType"                   :"PAROLEE",
                "firstName"                    : "",
                "middleName"                   : "",
                "lastName"                     : "",
                "suffixName"                   : "",
                "fullName"                     : "",
                "pleaBargain"                  : true,
                "caseClassification"           : "",
                "criminalCaseNumber"           : $(".cc_no").val(),
                "offense"                      : $(".offense").val(),
                "courtOfOrigin"                : "",
                "courtOrderDate"               : "",
                "investigatingOfficer"         :$(".inv_off").val(),
                "receivedDateByPPO"            : "",
                "sentence"                     : "",
                "manualDocket"                 : true,
                "referral"                     : true,
                "referralData"                 : "",
                "remarks"                      : "",
                "reportType"                   : "",
                "probationStartDate"           : "",
                "probationYear"                : "",
                "probationMonth"               : "",
                "probationDay"                 : "",
                "prisonName"                   : $(".prison_name").val(),
                "investigationReportSubmittedDate":$(".date_peci").val(),
                "ppoRecommendation"            : "",
                "recommendationState"          : $(".recommentation").val(),
                "dateOfTransfer"               : $(".date_transferred").val(),
                "transferredOfficeId"          : $(".office_transfered").val(),
                "dateOrderReceivedFromTheBoard": "",
                "boardOrder"                   : $(".board_order").val(),
                "boardOrderStatus"             : $(".board_status").val(),
                "referrringOfficeId"           : "",
                "dateCICAR"                    : "",
                "supervisingOfficer"           : "",
                "probationEndDate"             : "",
                "referralType"                 : "",
                "dateReportSubmittedToTheBoard": "",
                "dateReportSubmittedToRDForTransferToOtherPPO": "",
                "resolutionType"               : "",
                "dateResolutionFromTheBoard"   : "",
                "dateResolutionFromTheRDForTransfer": "",
                "createdBy"                    : "",
                "updatedBy"                    : "",
                "legalAge"                     : true,
                "militaryCourt"                : true
}

            console.log(payload)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
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
            $('.office_transfered').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.office_transfered').append("<option selected disabled> - - Select Field Office - - </option>");
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

            // var __client = function(){
            //     $('.client').empty();


            //     __executeExternalGet('http://localhost:8000/petitioner?page=0&size=100').done(function (result) {
                    
            //         if (result.status != "ERROR") {
            //         console.log(result)
            //             $('.client').append("<option selected disabled> - - Select Client - - </option>");
            //             result.content.forEach(function(data){
            //                 $('.client').append(
            //                     "<option value="+data.id+">"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffixName+"</option>");
            //             });

            //         } else {
            //             console.log("failed fetching docket list")
            //         }
            //     })
            // }
            // __client();


    } )( jQuery );