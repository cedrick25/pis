    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;

        var __getContext = function() {
            return ___ctx;
        };

        var __setContext = function(newctx) {
            ___ctx = newctx;
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

        var __select = function(){
            $('.field_office').empty();

            $('.type').on('change', function() {
                $('.docket_num').empty();
                const type = this.value
                console.log(type)
                __executeExternalGet(___ctx+'8000/docketbook/list/'+type+"/"+$.cookie("field_office_id")).done(function (result) {
                    console.log(result)
                    if (result.status != "ERROR") {

                        $('.docket_num').append("<option selected disabled>Select Docket Number</option>");

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
                __executeExternalGet(___ctx+'8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                    console.log(result)
                    var result = result.response;
                    if (result.status != "ERROR") {
                        // console.log(result.caseloadType)

                        setTimeout(function () {
                        $(".caseload").val(result.caseloadType).trigger("change");
                        }, 500);

                        setTimeout(function () {
                        $(".field_office").val(result.fieldOfficeId).trigger("change");
                        }, 500);

                    } else {
                        console.log("failed fetching docket number")
                    }


                });
            });

            __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled>Select Field Office</option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    $('.field_office').on('change', function() {
                        $('.user_account').empty();
                        const dep_id = this.value
                        __executeExternalGet(___ctx+'8088/user/list/'+dep_id).done(function (result) {
                            console.log(result)
                            if (result.status != "ERROR") {
                                $(".user_display").show()
                                $('.user_account').append("<option selected disabled>Select User Account</option>");
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

            // __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
            //     // console.log(result)
            //     if (result.status != "ERROR") {
            //         $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
            //         result.forEach(function(data){
            //             $('.field_office').append(
            //                 "<option value="+data.id+">"+data.name+"</option>");
            //         });

            //     } else {
            //         console.log("failed fetching department list")
            //     }
            // })

            // __executeExternalGet('http://localhost:8088/user/list/'+'/'+$.cookie("field_office_id")).done(function (result) {
            //     // console.log(result)
            //     if (result.status != "ERROR") {
            //         $('.user_account').append("<option selected disabled> - - Select Receiver - - </option>");
            //         result.forEach(function(data){
            //             console.log(data)
            //             var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
            //             $('.user_account').append(
            //                 "<option value="+data.uuid+">"+fullname+"</option>");
            //         });

            //     } else {
            //         console.log("failed fetching department list")
            //     }
            // })


            var originFieldOfficeId = $.cookie('field_office_id');

            $(".btn-confirm_forward").unbind("click").on("click", function(){
                
                var fname = $('.user_account option:selected').data('fname');
                var mname = $('.user_account option:selected').data('mname');
                var lname = $('.user_account option:selected').data('lname');
                var sname = $('.user_account option:selected').data('sname');

                var receivername = fname + " " + mname + " " + lname + " " + sname;

                var payload = {
                    "type"                  : $('.type').val(),
                    "caseloadType"          : $(".caseload").val(),
                    "senderId"              : $.cookie("uuid"),
                    "senderFieldOfficeId"   : $.cookie('field_office_id'),
                    "senderFieldOfficeName" : $.cookie('departmentName'),
                    "originFieldOfficeId"   : originFieldOfficeId,
                    // "originFieldOfficeName" : $.cookie('departmentName'),
                    "receiverId"            : $(".user_account").val(),
                    "receiverName"          : receivername,
                    "fieldOfficeId"         : $(".field_office").val(),
                    "docketNumber"          : $(".docket_num").val(),
                    "details"               : $(".details").val(),
                    "remarks"               : "",
                    "approvalStatus"        : "New - (Forwarded to CPPO)",
                    "lastStatusUpdateDate"  : "",
                }
                console.log(payload)
                __executeExternalPost('8000/workflow/create',JSON.stringify(payload)).done(function (result) {
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

    } )( jQuery );