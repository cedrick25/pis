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

        var __table = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            __executeExternalGet('http://localhost:8000/docketbook/list/SC_PR_CINV/'+$.cookie("field_office_id")).done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                if (result.status != "ERROR") {
                    result.response.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td></td>"+
                            "<td>"+data.docketNumber+"</td>"+
                            "<td>"+data.docketSeries+"</td>"+
                            "<td>"+data.clientType+"</td>"+
                            "<td>"+data.status+"</td>"+
                            "<td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update pr_cinv_update' style='display:none;' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_remove pr_cinv_remove' style='display:none;' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button>")
                    });
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "20%", "targets": 5 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_remove").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        var office_id = $(this).data("oi");
                        $(".docket").html(docket_number)
                        $(".btn_remove_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('http://localhost:8000/docketbook/remove/'+docket_number+'/'+office_id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $(".form-control").val('');
                                        $('#success_remove').show();
                                            setTimeout(function () {
                                                $('#removeModal').modal('hide');
                                                $('#success_remove').hide();
                                                __table();
                                            }, 1000);
                                        
                                    // $(".form-control").val('');
                                    // $('#removeModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })
                        })
                    })

                    $(".btn_update").unbind("click").on("click", function(){
                        var docket_number = $(this).data("docket");
                        window.location.href = 'http://localhost/pis/parolee_courtesy_investigation_update?docket_number='+docket_number;
                    })
                   
                }
            })
        }
        __table();

    } )( jQuery );