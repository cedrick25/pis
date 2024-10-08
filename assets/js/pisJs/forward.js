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

        var docket_number = GetURLParameter('docket_number');
        var id = GetURLParameter('id');
        var fieldOffice = GetURLParameter('fo');

        function storeData(postUrl, postData) {
            $.ajax({
                url: postUrl,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(postData),
                success: function (result) {
                    // console.log('User data received:', result);
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchFile(type,docket_number,fi) {
            const apiUrl = api+'8080/file/list/'+type+'/'+docket_number+'/'+fi;          
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    // console.log('Data received:', result.response);
                    var data = result.files;
                    if (data.kind == null && data.uuid == null){
                        alert("You must accomplish the Worksheet and PSIR first!")
                    } else {
                        storeData(postUrl,postData)
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchDocket() {
            var apiUrl = api+'8000/docketbook/'+docket_number+'/'+fieldOffice;

            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    // console.log('Data received:', result.response);
                    var data = result.response;
                    $(".docket_number").html(data.docketNumber);
                    $(".type").html(data.type);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchUser(dep_id) {
            var apiUrl = api+'8088/user/list/'+dep_id;

            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    // console.log('Data received:', result);
                    $('.user_account').append("<option selected disabled> - - Select User Account - - </option>");
                    if ($.cookie('role_id') == "32"){
                        result.forEach(function(data){
                            if (data.roleId == "4" || data.roleId == "14"){
                                var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                $('.user_account').append(
                                    '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
                                ); 
                            }
                        }); 
                    } else if ($.cookie('role_id') == "4"){
                        result.forEach(function(data){
                            if (data.roleId == "32"){
                                var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                                $('.user_account').append(
                                    '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
                                ); 
                            }
                        }); 
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchDep() {
            var apiUrl = api+'8088/department/list';

            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    $('.field_office').on('change', function() {
                        $(".user_display").show()
                        var dep_id = this.value;
                        fetchUser(dep_id)
                    })
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        function fetchWorfklow() {
            var apiUrl = api+'8000/workflow/'+id
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    // console.log('Data received:', result);
                    var data = result.response;
                    var postUrl = api+'8000/workflow/update/'+id;
                    let approvalStatus;
                    if (data.approvalStatus == "New - (Forwarded to CPPO)" ){
                        approvalStatus = "Pending of CPPO"
                    } else if (data.approvalStatus == "New - (Forwarded to FO)" ){
                        approvalStatus = "Pending of FO"
                    } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                        approvalStatus = "Pending of CPPO for Approval"
                    }
                    var postData = {
                        "type": data.type,
                        "caseloadType": data.caseloadType,
                        "senderId": data.senderId,
                        "senderName": data.senderName,
                        "receiverId": data.receiverId,
                        "fieldOfficeId": data.fieldOfficeId,
                        "docketNumber": data.docketNumber,
                        "details": data.details,
                        "remarks": data.remarks,
                        "approvalStatus": approvalStatus,
                        "lastStatusUpdateDate": "",
                    };
                    if (approvalStatus == "Pending of FO"){
                        approvalStatus == "Pending of FO";
                        storeData(postUrl,postData)
                    } else if (approvalStatus == "Pending of CPPO"){
                        approvalStatus == "Pending of CPPO";
                        storeData(postUrl,postData)
                    } else if (approvalStatus == "Pending of CPPO for Approval"){
                        approvalStatus == "ending of CPPO for Approval";
                        storeData(postUrl,postData)
                    }

                    $(".btn-confirm_forward").unbind("click").on("click", function(){
                        var apiUrl = api+'8000/workflow/'+id
                        $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            success: function(result) {
                                var data = result.response;
                                let approvalStatus;
                                var postUrl = api+'8000/workflow/create';
                                function postDatas() {
                                    return {
                                        "type"                  : data.type,
                                        "caseloadType"          : data.caseloadType,
                                        "senderId"              : $.cookie("uuid"),
                                        "receiverId"            : $(".user_account").val(),
                                        "fieldOfficeId"         : $(".field_office").val(),
                                        "docketNumber"          : data.docketNumber,
                                        "details"               : $(".details").val(),
                                        "remarks"               : data.remarks,
                                        "approvalStatus"        : approvalStatus,
                                        "lastStatusUpdateDate"  : "",
                                    };
                                }
                                if (data.approvalStatus == "Pending of CPPO"){
                                    approvalStatus = "New - (Forwarded to FO)"
                                    var postData = postDatas()
                                    storeData(postUrl,postData)

                                    $("#success_forwarding").show()
                                    setTimeout(function () {
                                        $("#success_forwarding").hide()
                                    }, 2000);
                                } else if (data.approvalStatus == "Pending of FO"){
                                    approvalStatus = "New - (Forward to CPPO for Approval)"
                                    var postData = postDatas()
                                    storeData(postUrl,postData)

                                    $("#success_forwarding").show()
                                    setTimeout(function () {
                                        $("#success_forwarding").hide()
                                    }, 2000);
                                }                       
                            },
                            error: function(xhr, status, error) {
                                console.error('Error:', status, error);
                            }
                        })


                    })

                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }

        $(document).ready(function(){
            fetchDocket();
            fetchDep();
            fetchWorfklow();
        })
        
    } )( jQuery );