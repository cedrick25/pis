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

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                    "field_office"     : $(".field_office").val(),
                    "region"           : $(".region").val(),
                }
            // console.log(payload);

            __executeExternalPost('8088/region/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                $(".form-control").val('');
                    setTimeout(function () {
                        $('#success').html('<div class="alert alert-success" role="alert" style="display:none"> <i class="fa fa-check"></i> Successfully Updated</div>');
                        $('#newOfficemodal').modal('hide');
                        __table();
                    }, 1000);
                }else{
                    console.log(result.status);
                    alert(result.message)
                }
            })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('8088/user?page=0&size=50').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")

                result.content.forEach(function(data){

                    $('.table_body').append("<tr>"+
                        "<td></td>"+
                        "<td>"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix+"</td>"+
                        "<td>"+data.username+"</td>"+
                        "<td>"+data.email+"</td>"+
                        "<td>"+data.createdBy+"</td>"+
                        "<td>"+status+"</td>"+
                        "<td align='center' class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                    $('.table_head tbody tr').each(function (idx) {
                       $(this).children("td:eq(0)").html(idx + 1);
                    });
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                        "columnDefs": [
                            { "width": "30%", "targets": 6 }
                        ]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

                $(".btn_update").unbind("click").on("click", function(){
                    var data_id = $(this).data("id");
                    console.log(data_id)
                    __executeExternalGet('8088/region/'+data_id).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $(".field_office_update").val(result.field_office);
                            $(".region_update").val(result.region);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                    "field_office_update"     : $(".field_office_update").val(),
                                    "region_update"           : $(".region_update").val(),
                                }
                                // console.log(payload)

                                __executeExternalPost('8088/region/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                    console.log(result);
                                    if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                        setTimeout(function () {
                                            $('#success_update').html('<div class="alert alert-success" role="alert" style="display:none"> <i class="fa fa-check"></i> Successfully Updated</div>');
                                            $('#updateUserModal').modal('hide');
                                            __table();
                                        }, 1000);
                                    }else{
                                        alert("failed")
                                    }
                                })
                            })

                        }else{
                            alert("failed")
                        }
                    })
                })
            })
        }
        __table();

    })( jQuery );
