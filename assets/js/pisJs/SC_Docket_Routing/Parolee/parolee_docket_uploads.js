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
    var type = GetURLParameter('type');
    var id = GetURLParameter('id');
    var fi = $.cookie("field_office_id");

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

    function fetchWorkflow (){
        var apiUrl = api+'8000/workflow/'+id
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
                        approvalStatus = "Pending of CPPO";
                    } else if (data.approvalStatus == "New - (Forwarded to FO)"){
                        approvalStatus = "Pending of FO";
                    } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
                        approvalStatus = "Pending of CPPO for Approval";
                    } else if (data.approvalStatus == "Pending of FO"){ 
                        approvalStatus = "Pending of FO";
                    } else if (data.approvalStatus == "Pending of CPPO"){ 
                        approvalStatus = "Pending of CPPO";
                    } else if (data.approvalStatus == "Pending of CPPO for Approval"){ 
                        approvalStatus = "Pending of CPPO for Approval";
                    }
                    var postData = {
                        "type": data.type,
                        "caseloadType": data.caseloadType,
                        "senderId": data.senderId,
                        "senderName": data.senderName,
                        "senderFieldOfficeId": data.senderFieldOfficeId,
                        "originFieldOfficeId": data.originFieldOfficeId,
                        "receiverId": data.receiverId,
                        "fieldOfficeId": data.fieldOfficeId,
                        "docketNumber": data.docketNumber,
                        "details": data.details,
                        "remarks": data.remarks,
                        "approvalStatus": approvalStatus,
                        "lastStatusUpdateDate": "",
                    };
                    storeData(postUrl, postData)
                    
                    // $(".btn-confirm_forward").unbind("click").on("click", function(){
                    //     console.log('clicked')
                    //     function postDatas() {
                    //         return {
                    //             "type"                  : data.type,
                    //             "caseloadType"          : data.caseloadType,
                    //             "senderId"              : $.cookie("uuid"),
                    //             "receiverId"            : $(".user_account").val(),
                    //             "fieldOfficeId"         : $(".field_office").val(),
                    //             "docketNumber"          : data.docketNumber,
                    //             "details"               : $(".details").val(),
                    //             "remarks"               : data.remarks,
                    //             "approvalStatus"        : approvalStatus,
                    //             "lastStatusUpdateDate"  : "",
                    //         };
                    //     }
                    //     if (data.approvalStatus == "Pending of CPPO"){
                    //         approvalStatus = "New - (Forwarded to FO)"
                    //         var postData = postDatas()
                    //         storeData(postUrl,postData)
                    //         $("#success_forwarding").show()
                    //         setTimeout(function () {
                    //             $("#success_forwarding").hide()
                    //             window.location.href = api+"/pis/sent";
                    //         }, 2000);
                    //     } else if (data.approvalStatus == "Pending of FO"){
                    //         approvalStatus = "New - (Forward to CPPO for Approval)"
                    //         var postData = postDatas()
                    //         storeData(postUrl,postData)
                    //         $("#success_forwarding").show()
                    //         setTimeout(function () {
                    //             $("#success_forwarding").hide()
                    //             window.location.href = api+"/pis/sent";
                    //         }, 2000);
                    //     } else if (data.approvalStatus == "Pending of CPPO for Approval"){
                    //         approvalStatus = "New - (Forwarded to clerk for completion)"
                    //         var postData = postDatas()
                    //         storeData(postUrl,postData)
                    //         $("#success_forwarding").show()
                    //         setTimeout(function () {
                    //             $("#success_forwarding").hide()
                    //             window.location.href = api+"/pis/sent";
                    //         }, 2000);
                    //     } 
                    // })
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
    }
    
    var __fields = function(){
        __executeExternalGet('8000/docketbook/'+docket_number+'/'+fi).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                $(".type").html(result.clientType);
                $(".docket_number").html(result.docketNumber);

                $(".btn-confirm").unbind("click").on("click", function(){
                    var fileToUpload = $('#fileupload').prop('files')[0];

                    if (fileToUpload === undefined) {
                        alert("Please Choose File Before Upload!")
                    }else {
                        var form = new FormData();
                        form.append("file", fileToUpload, fileToUpload.name);

                        var settings = {
                            "url": api+"8080/file/upload?uuid=workflow_uploads_"+result.docketNumber+"&type="+result.type+"&createdby="+$.cookie('uuid')+"&version=0&kind="+$('.kind').val()+"&officeId="+fi,
                            "method": "POST",
                            "timeout": 0,
                            "processData": false,
                            "mimeType": "multipart/form-data",
                            "contentType": false,
                            "data": form
                        };

                        $.ajax(settings).done(function (response) {
                            if (response) {
                                $('#success_upload').show();
                                setTimeout(function () {
                                    $('#success_upload').hide();
                                    window.location.reload(true);
                                }, 2000);
                            } else {

                            }
                        });
                    }
                })
            }else{
                alert("failed")
            }
        })
    }

    function fetchFiles() {
        var file_uuid = "workflow_uploads_"+docket_number;
        const apiUrl = api+'8080/file/list/'+type+'/'+file_uuid+'/'+fi;
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                var result = result.files;
                result.forEach(function(data, index){
                    var table_id = index + 1;
                    $('.table_body').append("<tr>"+
                        "<td>"+table_id+"</td>"+
                        "<td>"+data.kind+"</td>"+
                        "<td>"+data.fileName+"</td>"+
                        "<td>"+data.version+"</td>"+
                        "<td class='options'><a href="+api+'8080/file/view/'+data.id+" target='_blank'><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a> <a href="+api+'8080/file/download/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a> </td></tr>"
                    )
                });
            },
            error: function(xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }

    $(document).ready(function(){
        fetchFiles();
        __fields();
        fetchWorkflow();
    })



} )( jQuery );