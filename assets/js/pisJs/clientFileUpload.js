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

            var load_table = function(table_id, api){
                $(`#${table_id} .table_head`).DataTable().destroy();
                $(`#${table_id} .table_body`).empty();

                __executeExternalGet(api).done(function (result) {
                    if (result.status != "ERROR") {
                        result.files.forEach(function(data){
                            let actions = "<a href="+api+'8080/file/view/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a> <a href="+api+'8080/file/download/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a>";
                            $(`#${table_id}`).append("<tr>"+
                                "<td>"+data.id+"</td>"+
                                "<td>"+data.fileName+"</td>"+
                                "<td>"+data.version+"</td>"+
                                "<td>"+"N/A"+"</td>"+
                                "<td class='actions'> "+actions+"")
                        });
                        $(document).ready(function () {
                            $(`#${table_id} .table_head tbody tr`).each(function (idx) {
                               $(this).children("td:eq(0)").html(idx + 1);
                            });
                            var table = $(`#${table_id} .table_head`).DataTable({
                                order: [[0, 'asc']],
                                autoWidth: false,
                                fixedColumns: true,
                                "columnDefs": [
                                    { "width": "20%", "targets": 5 }
                                ]
                            });
                            $(`#${table_id}`).on('shown.bs.tab', function () {
                                table.columns.adjust();
                            });
                            // $('.dataTables_length').addClass('bs-select');
                        });               
                    }
                })
            }

            $(".upload").unbind("click").on("click", function(){
                $(".upload_file").show();
            })

            __executeExternalGet('8088/user/'+$.cookie("uuid")).done(function (result) {
                if (result.status != "ERROR") {
                    var fullname = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix; 
                    // console.log(fullname)
                    var officeId = result.departmentId;
                    // console.log(officeId);
                    $(".uploader").val(fullname);
                    $(".uploader").prop('disabled', true);
                    __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                        var result = result.response;
                        console.log(result)
                        // console.log(client_id)
                        var name = result.firstName + " " + result.lastName;
                        var api_table = `8080/file/list/investigation/ppis_${client_id}/${officeId}`
                        console.log(api_table)
                        load_table('inv_table', api_table)

                        var file_uuid = `ppis_${client_id}`; // initialize the value of the uuid

                        // set the uuid if the type is change
                        // $('.type').change(function(){
                        //     file_uuid = result.id + "_" + result.clientType + "_" + name + "_" + $(".type").val();
                        //     console.log(file_uuid)
                        // });


                        // event handler when a tab is clicked
                        $("#inv_tab").unbind("click").on("click", function(){
                            console.log("clicked inv")
                            var api_table = `8080/file/list/investigation/ppis_${client_id}/${officeId}`
                            load_table('inv_table', api_table)
                        })
                        $("#sup_tab").unbind("click").on("click", function(){
                            console.log("clicked sup")
                            var api_table = `8080/file/list/supervision/ppis_${client_id}/${officeId}`
                            load_table('sup_table', api_table)
                        })
                        $("#rehab_tab").unbind("click").on("click", function(){
                            console.log("clicked rehab")
                            var api_table = `8080/file/list/rehabilitation/ppis_${client_id}/${officeId}`
                            load_table('rehab_table', api_table)
                        })
                        $("#oth_tab").unbind("click").on("click", function(){
                            console.log("clicked oth")
                            var api_table = `8080/file/list/others/ppis_${client_id}/${officeId}`
                            load_table('oth_table', api_table)
                        })

                        // for uploading file
                        $(".btn-confirm").unbind("click").on("click", function(){
                            console.log("clicked upload confirm")
                            var fileToUpload = $('#fileupload').prop('files')[0];
                            if (fileToUpload === undefined) {
                                alert("Please Choose File Before Upload!")
                            }
                            else {
                                var form = new FormData();
                                form.append("file", fileToUpload, fileToUpload.name);
                                // console.log(fileToUpload.name)
                                var settings = {
                                    "url": api+"8080/file/upload?uuid="+file_uuid+"&type="+$(".type").val()+"&createdby="+fullname+"&version=0&kind="+fileToUpload.name+"&officeId="+officeId,
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