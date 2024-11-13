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

        var transaction_number = GetURLParameter('transaction_number');
        var id = GetURLParameter('id');
        var fi = $.cookie("field_office_id");
        
        var __fields = function(){
            __executeExternalGet(___ctx+'8000/workflow/'+id).done(function (result) {
                var result = result.response;
                console.log(result)
                if (result.status != "ERROR") {
                    __executeExternalGet(___ctx+'8000/petitioner/'+id).done(function (resultPetitioner) {
                        var resultPetitioner = resultPetitioner.response;
                        console.log(resultPetitioner)
                        $(".name").text(resultPetitioner.firstName+" "+resultPetitioner.lastName)

                        $(".breadcrumbs_view_history").unbind("click").on("click", function(){
                            window.location.href=api+"/pis/pdl-view-history?transaction_number="+transaction_number+'&id='+id;
                        })
                        $(".btn-confirm").unbind("click").on("click", function(){
                            var fileToUpload = $('#fileupload').prop('files')[0];

                            if (fileToUpload === undefined) {
                                alert("Please Choose File Before Upload!")
                            }else {
                                var form = new FormData();
                                form.append("file", fileToUpload, fileToUpload.name);

                                var settings = {
                                    "url": api+"8080/file/upload?uuid=workflow_uploads_"+result.transactionNumber+"&type="+result.type+"&createdby="+$.cookie('uuid')+"&version=0&kind="+$('.kind').val()+"&officeId="+fi,
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
                    })
                }else{
                    alert("failed")
                }
            })
        }
        
        var type = "PDL"
        function fetchFiles() {
            var file_uuid = "workflow_uploads_"+transaction_number;
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
                            "<td class='options'><a href="+api+'8080/file/download/'+data.id+"><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a> <a href="+api+'8080/file/view/'+data.id+"><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a></td></tr>"
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
            // fetchWorkflow();
        })



    } )( jQuery );