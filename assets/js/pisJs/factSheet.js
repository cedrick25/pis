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

        var firstName = GetURLParameter('firstName');
        var lastName = GetURLParameter('lastName');
        var fieldOfficeId = GetURLParameter('fieldOfficeId');

        var payload = {
            "firstName"      : firstName,
            "lastName"       : lastName,
            "fieldOfficeId"  : fieldOfficeId
            
        }

        var __tablePB = function(){
            __executeExternalPost('petitioner/search',JSON.stringify(payload)).done(function (result) {
                // console.log(result);
                // var result = result.response;
                if (result.status != "ERROR") {
                    // var type = docketBookResponses.type;
                    // console.log(result.docketBookResponses)
                    for (var i = 0; i < result.length; i++) {
                      // console.log(result[i].docketBookResponses)
                      var data = result[i].docketBookResponses;
                        if (data.length === 0){
                            console.log("EMPTY ARRAY")
                        }
                        else{
                            console.log("ARRAY IS NOT EMPTY")
                        }
                      // for (var j = 0; j < data.length; j++){
                      //   var rowData = data[j]
                      //   console.log(rowData)
                      //   // let actions = "<button class='btn btn-sm btn-success btn_viewWorksheet' type='submit' data-type='"+rowData.clientType+"' data-id='"+rowData.clientId+"'><i class='fa fa-eye'></i> View Worksheet</button> <button class='btn btn-sm btn-primary btn_viewDocuments' type='submit' data-id='"+rowData.clientId+"' data-type='"+rowData.clientType+"' data-fo='"+rowData.fieldOfficeId+"'><i class='fa fa-eye'></i> View Documents</button> <button class='btn btn-sm btn-success btn_viewClient' data-id='"+rowData.clientId+"'><i class='fa fa-eye'></i> View Client Info</button>";
                      //   //     $('.table_body_pb').append("<tr>"+
                      //   //         "<td></td>"+
                      //   //         "<td>"+rowData.firstName+" "+rowData.middleName+" "+rowData.lastName+" "+rowData.suffixName+"</td>"+
                      //   //         "<td>"+rowData.fieldOfficeName+"</td>"+
                      //   //         "<td>"+rowData.docketNumber+"</td>"+
                      //   //         "<td class='actions'>"+actions+"")
                      // }
                    }
                    // $(document).ready(function () {
                    //     $('.table_head_pb tbody tr').each(function (idx) {
                    //        $(this).children("td:eq(0)").html(idx + 1);
                    //     });
                    //     var table = $('.table_head_pb').DataTable({
                    //         order: [[0, 'asc']],
                    //         "columnDefs": [
                    //             { "width": "40%", "targets": 4}
                    //         ]        
                    //     });
                    //     $('.dataTables_length').addClass('bs-select');
                    // });

                    // $(".btn_viewClient").unbind("click").on("click", function(){
                    //     var cId     = $(this).data("id");
                    //     console.log(cId)
                    //     window.location.href = 'http://localhost/pis/factSheetClientInfo?clientId='+cId;
                    // })
                    // $(".btn_viewDocuments").unbind("click").on("click", function(){
                    //     var clientId     = $(this).data("id");
                    //     console.log(clientId)
                    //     var fieldOfficeId = $(this).data("fo")
                    //     console.log(fieldOfficeId)
                    //     var clientType =$(this).data("type")
                    //     console.log(clientType)
                    //     window.location.href = 'http://localhost/pis/factSheetUploadedDocuments?clientId='+clientId+'&clientType='+clientType+'&fieldOfficeId='+fieldOfficeId;
                    // })
                    // $(".btn_viewWorksheet").unbind("click").on("click", function(){
                    //     var clientId     = $(this).data("id");
                    //     console.log(clientId)
                    //     // var fieldOfficeId = $(this).data("fo")
                    //     // console.log(fieldOfficeId)
                    //     var clientType =$(this).data("type")
                    //     console.log(clientType)
                    //     window.location.href = 'http://localhost/pis/factSheetText?clientId='+clientId+'&clientType='+clientType;
                    // })
                }else{
                    alert("failed")
                }
            })
            
        }
        __tablePB();


} )( jQuery );