    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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
        var __executeFile = function(path, jsonObj) {
            var d = $.Deferred();
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                cache: false,
                "mimeType": "multipart/form-data",
                processData: false,
                contentType: false,
                /*data: JSON.stringify(jsonObj)*/
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                d.resolve(data);
                $(".loadDiv").hide();
                $(".overlay-back").hide();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : errorThrown
                });
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
            var client_id = GetURLParameter('client_id');
            var officeid = GetURLParameter('departmentId');
            var client_type = GetURLParameter('client_type');


            __executeExternalGet('8088/user/'+$.cookie("uuid")).done(function (result) {

                // console.log(result);
                // console.log(client_type);

                // var result = result.response;

                if (result.status != "ERROR") {
                    var fullname = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix; 
                    // console.log(fullname)
                    var officeId = result.departmentId;
                    // console.log(officeId);
                    $(".uploader").val(fullname);
                    $(".uploader").prop('disabled', true);
                    __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                        // console.log(result)
                        var result = result.response;
                        console.log(result)
                        // console.log(client_id)
                        var file_uuid = result.clientType + "_" + result.criminalCaseNo;
                        console.log(file_uuid)
                        $(".btn-confirm").unbind("click").on("click", function(){
                        // console.log("clicked")
                        var fileToUpload = $('#fileupload').prop('files')[0];
                        if (fileToUpload === undefined) {
                            alert("Please Choose File Before Upload!")
                        }
                        else {
                            var form = new FormData();
                            form.append("file", fileToUpload, fileToUpload.name);

                            var settings = {
                                "url": api+"8080/file/upload?uuid="+file_uuid+"&type="+result.clientType+"&createdby="+$.cookie('uuid')+"&version=0&kind="+$('.kind').val()+"&officeId="+officeId,
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "data": form
                            };
                            // console.log(settings)

                            $.ajax(settings).done(function (response) {
                                console.log(response);
                                if (response) {
                                    $('#success_upload').show();
                                    setTimeout(function () {
                                        $('#success_upload').hide();
                                        window.location.reload(true);
                                    }, 1000);
                                } else {

                                }
                            });
                        }
                    })

                    })

                    

                }else{
                    alert("failed")
                }
            })
               
    } )( jQuery );