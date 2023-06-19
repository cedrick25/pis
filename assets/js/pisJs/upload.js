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
        var fi = $.cookie("field_office_id");

        console.log(docket_number)
        console.log(type)
        console.log(fi)

        var list_upload = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('8000/docketbook/'+docket_number+'/'+fi).done(function (result) {

                console.log(result)
                var result = result.response;
                var client_type = result.clientType;
                var docket_num = result.docketNumber;

                // console.log (client_type)
                // console.log (docket_num)

                __executeExternalGet('8080/file/list/'+type+'/'+docket_number+'/'+fi).done(function (result) {
                console.log("======")
                console.log(result)
                console.log("======")

                if (result.status != "ERROR") {
                    result.files.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.kind+"</td>"+
                            "<td>"+data.fileName+"</td>"+
                            "<td>"+data.version+"</td>"+
                            "<td class='options'><a href="+'http://localhost:8080/file/view/'+data.id+"><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                        )
                    });
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                                // { "width": "30%", "targets": 6 }
                            // ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    }); 
                }
                });
            })
        }
        list_upload();
        
        var __fields = function(){
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+fi).done(function (result) {
                console.log(result);
                var result = result.response;
                if (result.status != "ERROR") {
                    $(".type").html(result.clientType);
                    $(".docket_number").html(result.docketNumber);

                    $(".btn-confirm").unbind("click").on("click", function(){
                        console.log("clicked")
                        var fileToUpload = $('#fileupload').prop('files')[0];

                        if (fileToUpload === undefined) {
                            alert("Please Choose File Before Upload!")
                        }else {
                            var form = new FormData();
                            form.append("file", fileToUpload, fileToUpload.name);

                            var settings = {
                                "url": api+"8080/file/upload?uuid="+result.docketNumber+"&type="+result.type+"&createdby="+$.cookie('uuid')+"&version=0&kind="+$('.kind').val()+"&officeId="+fi,
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "data": form
                            };

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


                            // var formdata = new FormData();
                            // formdata.append("files", fileToUpload, fileToUpload.name);
                            // console.log(formdata)
                            // __executeFile("http://localhost:8080/file/upload?uuid="+result.docketNumber+"&type="+result.type+"&version=0&kind="+$('.kind').val(),formdata).done(function (result) {
                            //     console.log(result)
                            //     if(result){
                            //         // list_upload();

                            //     }else{
                            //         // alert ("upload Failed");
                            //     }
                            // });
                        }
                    })
                }else{
                    alert("failed")
                }
            })
        }
        __fields();

    } )( jQuery );