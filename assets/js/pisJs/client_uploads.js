    ( function ( $ ) {
        var ___ctx = localStorage.getItem('api') || (window.__PIS_API_BASE || '');

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            if (path && !/^https?:\/\//i.test(path)) {
                path = __getContext() + path;
            }
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

       

            __executeExternalGet('8088/user/'+$.cookie("uuid")).done(function (result) {

                console.log(result);

                // var result = result.response;

                if (result.status != "ERROR") {
                    var fullname = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix; 
                    console.log(fullname)

                    $(".uploader").val(fullname);

                     var client_id = GetURLParameter('client_id');
                     
                    __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {

                        console.log(client_id)

                        $(".btn-confirm").unbind("click").on("click", function(){
                        
                        console.log("clicked")
                        
                        var officeId = result.departmentId;
                        console.log(officeId);
                        
                        var fileToUpload = $('#fileupload').prop('files')[0];

                        if (fileToUpload === undefined) {
                            alert("Please Choose File Before Upload!")
                        }

                        else {
                            var form = new FormData();
                            form.append("file", fileToUpload, fileToUpload.name);

                            var settings = {
                                "url": (window.pisApiUrl ? window.pisApiUrl('8080/file/upload') : (__getContext()+'8080/file/upload'))+"?uuid="+"00000"+"&type="+"FORM"+"&createdby="+$.cookie('uuid')+"&version=0&kind="+$('.kind').val()+"&officeId="+officeId,
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "data": form
                            };

                            console.log(settings)

                            $.ajax(settings).done(function (response) {
                                console.log(response);
                                if (response) {
                                    $('#success_upload').show();
                                    setTimeout(function () {
                                        $('#success_upload').hide();
                                        window.location.reload(true);
                                    }, 2000);
                                } else {

                                }
                            });


                            var formdata = new FormData();
                            formdata.append("file", fileToUpload, fileToUpload.name);
                            console.log(formdata)
                            __executeFile((window.pisApiUrl ? window.pisApiUrl('8080/file/upload') : (__getContext()+'8080/file/upload'))+"?uuid="+$.cookie('uuid')+"&type="+$('.type').val()+"&createdby="+$('.uploader').val()+"&version=0&kind="+$('.kind').val()+"&officeId="+officeId,formdata).done(function (result) {
                                console.log(result)
                                if(result){
                                    // list_upload();

                                }else{
                                    // alert ("upload Failed");
                                }
                            });
                        }
                    })
                    }

                    

                }else{
                    alert("failed")
                }
            })
               
    } )( jQuery );