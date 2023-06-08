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





        var __tablePB = function(){
            // $('.table_head_pb').DataTable().destroy();
            // $('.table_body_pb').empty();

            // __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PROBATIONER').done(function (result) {
            //     console.log("==========")
            //     console.log(result)
            //     console.log("==========")
            //         // console.log(result.name)
            //         if (result.status != "ERROR") {
            //             result.content.forEach(function(data){
            //                 // __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (resultfo) {
            //                 //     console.log(resultfo.name);
            //                 let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"' data-type='"+data.clientType+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"' data-type='"+data.clientType+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet worksheet perm_worksheet' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir psir perm_psir' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> PSIR</button> <button class='btn btn-sm btn-success btn_pdfPSIR pdf_psir perm_pdfPSIR' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-download'></i> Generate PSIR</button>";
            //                 $('.table_body_pb').append("<tr>"+
            //                     "<td>"+data.id+"</td>"+
            //                     "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
            //                     "<td>"+data.sex+"</td>"+
            //                     "<td>"+data.clientType+"</td>"+
            //                     "<td value="+data.fieldOfficeId+">"+data.fieldOfficeName+"</td>"+
            //                     "<td class='actions'> "+actions+"")
            //                 // });
            //         })  
                    
            //         $(document).ready(function () {
            //             $('.table_head_pb tbody tr').each(function (idx) {
            //                $(this).children("td:eq(0)").html(idx + 1);
            //             });
            //             var table = $('.table_head_pb').DataTable({
            //                 order: [[0, 'asc']],
            //                 "columnDefs": [
            //                     { "width": "40%", "targets": 5 }
            //                 ],
            //                 searching: true // Enable search bar
            //             });
            //             $('.dataTables_length').addClass('bs-select');
            //         });

            //         $(".btn_worksheet").unbind("click").on("click", function(){
            //             var client_id   = $(this).data("id");
            //             var foid        = $(this).data("foid");
            //             window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
            //         })
            //         $(".btn_view").unbind("click").on("click", function(){
            //             var client_id = $(this).data("id");
            //             var client_type = $(this).data("type");
            //             // console.log(client_type)
            //             window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id+'&client_type='+client_type;
            //         })
           
            //     }
            // })
            $(document).ready(function () {
                $('.table_head_pb tbody tr').each(function (idx) {
                   $(this).children("td:eq(0)").html(idx + 1);
                });
                var table = $('.table_head_pb').DataTable({
                    order: [[0, 'asc']],
                    "columnDefs": [
                        { "width": "40%", "targets": 5 }
                    ],
                    searching: true // Enable search bar
                });
                $('.dataTables_length').addClass('bs-select');
            });
        }
        __tablePB();


    } )( jQuery );