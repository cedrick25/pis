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

        console.log($.cookie("field_office_id"))

        var __select = function(){
            $('.field_office').empty();

            $('.type').on('change', function() {
                $('.docket_num').empty();
                const type = this.value
                console.log(type)
                __executeExternalGet('8000/docketbook/list/'+type+'/'+$.cookie('field_office_id')).done(function (result) {
                    if (result.status != "ERROR") {

                        $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");

                        result.response.forEach(function(data){
                            $('.docket_num').append(
                                "<option value="+data.docketNumber+" data-id="+data.type+">"+data.docketNumber+"</option>");
                        });
                    } else {
                        console.log("failed fetching docket number")
                    }
                });
            });
        }

        $('.docket_num').on('change', function() {
            const dn = this.value
            list_upload(dn)
            list_workflow(dn)
        });
        var list_upload = function(docket_number){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
            __executeExternalGet('8080/file/list/'+docket_number).done(function (result) {

                if (result.status != "ERROR") {
                    $('.docket_result').show()
                    if (result.files.length != 0) {
                        result.files.forEach(function(data){
                            $('.table_body').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.fileName+"</td>"+
                                "<td>"+data.createdDate+"</td>"+
                                "<td class='options'><a href='"+(window.pisApiUrl ? window.pisApiUrl('8080/file/view/'+data.id) : (__getContext()+'8080/file/view/'+data.id))+"'><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                            )
                        });
                    }
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "bPaginate": false,
                            // "columnDefs": [
                                // { "width": "30%", "targets": 6 }
                            // ]
                        });
                        // $('.dataTables_length').addClass('bs-select');
                    }); 
                }
            });
        }
        var list_workflow = function(docket_number){
            $('.an_body').empty();

            __executeExternalGet('8000/workflow/docket/'+docket_number+'?page=0&size=100').done(function (result) {
                // console.log("==========")
                // console.log(result)
                // console.log(result.content.length)
                if (result.status != "ERROR") {
                    if (result.content.length != 0) {

                        result.content.forEach(function(data){
                            console.log(data)
                            console.log(data.fieldOfficeId)
                            __executeExternalGet('8088/department/'+data.fieldOfficeId).done(function (result) {
                                if (result.status != "ERROR") {
                                    console.log(result);
                                    console.log(result.name);
                                    var fo = result.name;
                                    __executeExternalGet('8088/user/'+data.senderId).done(function (result) {
                                        var sender = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                                        __executeExternalGet('8088/user/'+data.receiverId).done(function (result) {
                                            var receiver = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix;
                                            $('.an_body').prepend(`
                                                <div class="card-announcement">
                                                    <p class="card-text"><b>Date posted: <i>${data.createdDate}</i></b></p>
                                                    <p class="card-text">Docket Number: <b>${data.docketNumber}</b></p>
                                                    <p class="card-text">Field Office: <b>${fo}</b></p>
                                                    <p class="card-text">Sender: <b>${sender}</b></p>
                                                    <p class="card-text">Receiver: <b>${receiver}</b></p>
                                                </div>
                                                `)
                                        });
                                    });
                                }
                            });
                        });
                       
                    }
                    else{
                        $('.an_body').prepend(`
                            No data available ...
                            `)
                    }
                }
            });
        }

        __select();

    } )( jQuery );