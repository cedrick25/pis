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
    
    var client_id = GetURLParameter('client_id');
    var type = GetURLParameter('type');
    var officeid = $.cookie("field_office_id");
    var clientType = GetURLParameter('client_type');

    // console.log(client_id)

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
            var result = result.response;
            // console.log(result)
            var officeId = result.fieldOfficeId;
            var fullname = result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffixName;
            var file_uuid = result.clientType + "_" + result.criminalCaseNo;
            // console.log(officeId)
            __executeExternalGet('8080/file/list/'+result.clientType+'/'+file_uuid+'/'+$.cookie("field_office_id")).done(function (result) {
            // console.log("==========")
            // console.log(result)
            // console.log("==========")
            if (result.status != "ERROR") {
                result.files.forEach(function(data){
                    let actions = "<a href="+api+'8080/file/view/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a> <a href="+api+'8080/file/download/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a>";
                    $('.table_body').append("<tr>"+
                        "<td>"+data.id+"</td>"+
                        "<td>"+fullname+"</td>"+
                        "<td>"+data.fileName+"</td>"+
                        "<td class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    $('.table_head tbody tr').each(function (idx) {
                       $(this).children("td:eq(0)").html(idx + 1);
                    });
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                        "pageLength": 10,
                        "columnDefs": [
                            { "width": "40%", "targets": 3 }
                        ]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });               
            }
            })

        })    
        
    }
    __table();

    $(".btn_add_dokyu").unbind("click").on("click", function(){
        console.log(client_id)
        window.location.href = api+'/pis/client_single_carpeta_upload?client_id='+client_id+"&client_type="+clientType;
    })

} )( jQuery );