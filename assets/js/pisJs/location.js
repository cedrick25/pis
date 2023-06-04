    ( function ( $ ) {

        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
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


        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                    "name"         : $(".new_loc").val(),
                    "address"      : $(".new_add").val(),
                    "parentId"     : "0"
                }
            __executeExternalPost('http://localhost:8088/location/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                            $('#newLocModal').modal('hide');
                            $('#success').show();
                            __table();
                        }, 1000);
                }else{
                //     console.log(result.status);
                //     alert(result.message)
                }
             })
        })

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8088/location/list').done(function (result) {
                console.log(result)

                result.forEach(function(data){
                    let actions = "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateLocModal' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button>";

                    $('.table_body').append("<tr>"+
                        "<td>"+data.id+"</td>"+
                        "<td>"+data.name+"</td>"+ 
                        "<td>"+data.address+"</td>"+  
                        "<td align='center' class='actions'> "+actions+"")
                });
                

                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'asc']],
                        //"columnDefs": [
                        //    { "width": "30%", "targets": 6 }
                        //]
                    });
                    $('.dataTables_length').addClass('bs-select');
                });
                

                $(".btn_update").unbind("click").on("click", function(){
                    var data_id = $(this).data("id");
                    __executeExternalGet('http://localhost:8088/location/'+data_id).done(function (result) {
                        console.log(result);

                        if (result.status != "ERROR") {
                            $(".loc_name_update").val(result.name);
                            $(".loc_add_update").val(result.address);

                            $(".btn_confirm_update").unbind("click").on("click", function(){
                                console.log('clicked')
                                var payload = {
                                    "name"      : $(".loc_name_update").val(),
                                    "address"   : $(".loc_add_update").val(),
                                    "parentId"  : "0"
                        }

                            __executeExternalPost('http://localhost:8088/location/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                console.log(result);
                                    if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_update').show();
                                            setTimeout(function () {
                                                $('#updateLocModal').modal('hide');
                                                $('#success_update').hide();
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


    } )( jQuery );