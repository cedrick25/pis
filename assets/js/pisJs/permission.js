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

        var __select = function(){
            $('.permission_add').empty();

            __executeExternalGet('8088/permission/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.permission_add').append("<option selected value='0'> - - None - - </option>");
                    result.forEach(function(data){
                        $('.permission_add').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();



        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')
            var payload = {
                  "name"       : $(".permission_name").val(),
                  "type"       : $(".type_add").val(),
                  "detail"     : $(".permission_desc").val(),
                  "parentId"   : $(".permission_add").val()
            }
            __executeExternalPost('8088/permission/create',JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#permission_success').show();

                    setTimeout(function () {
                        $('#newPermission').modal('hide');
                        $('#permission_success').hide();
                        window.location.reload(true)
                        __select();
                    }, 1000);

                }else{
                    console.log("failed adding new permission")
                }
            })
        })

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        if (data.id == null){
                            return "No id";
                        } else {
                            return data.id;
                        }
                    }
                },
                {
                    "data": 'name'
                },
                {
                    "data": 'type'
                },
                {
                    "data": 'detail'
                },
                {
                    "data": 'id',
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updatePermissionModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button>"
                    }
                }
            ]
        }

        function drawTable(name) {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "15px", "targets": [0]},
                        { "width": "400px", "targets": [1]},
                        { "width": "305px", "targets": [2,3,4]}
                    ],
                    ajax: {
                        url: api+'8088/permission',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,
                                size: d.length,
                                name: searchBarContent,
                            };
                        },
                        dataFilter: function(data){
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    "columns": tableColumns()
                })
                $('.table_head').on('draw.dt', function() {
                    buttonFunctionality();
                });
            })
        }

        const searchBarValue = document.getElementById('searchBar');
        let searchBarContent;

        searchBarValue.addEventListener('keyup', function() {
            searchBarContent = searchBarValue.value;
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
            drawTable(searchBarContent);
        });

        function buttonFunctionality() {
            $(".btn_update").unbind("click").on("click", function(){
                console.log("clicked button update")
                var data_id = $(this).data("id");
                console.log(data_id)
                __executeExternalGet('8088/permission/'+data_id).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        $(".permission_name_update").val(result.name);
                        $(".permission_desc_update").val(result.detail);
                        $(".type_update").val(result.type).trigger('change');

                        $(".btn_confirm_update").unbind("click").on("click", function(){
                            console.log('clicked btn update confirm')
                            var payload = {
                                "name"          : $(".permission_name_update").val(),
                                "detail"        : $(".permission_desc_update").val(),
                                "type"          : $(".type_update").val(),
                            }
                            console.log(payload);
                            __executeExternalPost('8088/permission/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                console.log(result);
                                if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#permission_update').show();
                                        setTimeout(function () {
                                            $('#updatePermissionModal').modal('hide');
                                            $('#permission_update').hide();
                                            __select();
                                            window.location.reload(true);
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

            $(".btn_remove").unbind("click").on("click", function(){
                var data_id = $(this).data("id");
                $(".btn_confirm_remove").unbind("click").on("click", function(){
                    __executeExternalPost('8088/permission/remove/'+data_id).done(function (result) {
                        if (result.status != "ERROR") {
                            $('#success_remove').show();
                                setTimeout(function () {
                                    $('#removeModal').modal('hide');
                                    $('#success_remove').hide();
                                    window.location.reload(true)
                                    __select();
                                    __select_parent();
                                }, 1000);
                        }else{
                            alert("failed")
                        }
                    })
                })
            })
        }

        drawTable(searchBarContent)

    } )( jQuery );