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
            $('.dep_loc').empty();
            $('.dep_loc_update').empty();

            __executeExternalGet('8088/location/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.dep_loc').append("<option selected disabled> - - Select Region - - </option>");
                    $('.dep_loc_update').append("<option selected disabled> - - Select Region - - </option>");
                    result.forEach(function(data){
                        // console.log(data)
                        $('.dep_loc').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.dep_loc_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select();
        var __select_parent = function(){
            $('.parent_name').empty();
            $('.parent_name_update').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.parent_name').append("<option selected disabled> - - Select Department - - </option>");
                    $('.parent_name').append("<option value='0'> None </option>");

                    $('.parent_name_update').append("<option selected disabled> - - Select Department - - </option>");
                    $('.parent_name_update').append("<option value='0'> None </option>");
                    result.forEach(function(data){
                        // console.log(data)
                        $('.parent_name').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.parent_name_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");

                    });
                } else {
                    console.log("failed fetching department list")
                }
            })
        }
        __select_parent();

        $(".btn-confirm").unbind("click").on("click", function(){
            var payload = {
                "createdBy"     : "1",
                "name"          : $(".dep_name").val(),
                "description"   : $(".dep_desc").val(),
                "parentId"      : "0",
                "locationId"    : $(".dep_loc").val()
            }
            __executeExternalPost('8088/department/create',JSON.stringify(payload)).done(function (result) {
                // console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                            $('#newDeptModal').modal('hide');
                            $('success').hide();
                            window.location.reload(true)
                            __select();
                            __select_parent();
                        }, 1000);

                }else{
                    console.log("failed adding new department")
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
                    "data": 'description'
                },
                {
                    "data": 'locationName'
                },
                {
                    "data": 'id',
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDeptModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_add' type='submit' data-toggle='modal' data-target='#addModal' data-id='"+data+"'><i class='fa fa-plus-circle'></i> Add</button> <button class='btn btn-sm btn-info btn_view' type='submit' data-toggle='modal' data-target='#viewModal' data-id='"+data+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-danger btn_remove' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data+"'><i class='fa fa-remove'></i> Remove</button>"
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
                        { "width": "20%", "targets": [1,2,3,4] },
                        { "width": "5%", "targets": [0]}
                    ],
                    ajax: {
                        url: api+'8088/department',
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

        function buttonFunctionality() { 
            $(".btn_update").unbind("click").on("click", function(){
                // console.log("clicked button update")
                var data_id = $(this).data("id");
                // console.log(data_id)
                __executeExternalGet('8088/department/'+data_id).done(function (result) {
                    // console.log(result);
                    if (result.status != "ERROR") {
                        $(".dep_name_update").val(result.name);
                        $(".dep_desc_update").val(result.description);
                        $(".dep_loc_update").val(result.locationId).trigger('change');

                        $(".btn_confirm_update").unbind("click").on("click", function(){
                            // console.log('clicked btn update confirm')
                            var payload = {
                                "updatedBy"     : "1",
                                "name"          : $(".dep_name_update").val(),
                                "description"   : $(".dep_desc_update").val(),
                                "parentId"      : "0",
                                "locationId"    : $(".dep_loc_update").val()
                            }
                            // console.log(payload);
                            __executeExternalPost('8088/department/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                // console.log(result);
                                if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_update').show();
                                        setTimeout(function () {
                                            $('#updateDeptModal').modal('hide');
                                            $('#success_update').hide();
                                            window.location.reload(true)
                                            __select();
                                            __select_parent();
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
                    __executeExternalPost('8088/department/remove/'+data_id).done(function (result) {
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
            $(".btn_add").unbind("click").on("click", function(){
                var data_id = $(this).data("id");
                __executeExternalGet('8088/department/'+data_id).done(function (result) {
                    if (result.status != "ERROR") {
                        $(".region_add").html(result.locationName);
                        $(".field_office_add").html(result.name);
                        $(".desc_add").html(result.description);

                        $(".btn-confirm_add").unbind("click").on("click", function(){
                            var payload = {
                                "updatedBy"     : "1",
                                "name"          : result.name,
                                "description"   : result.description,
                                "parentId"      : $(".parent_name").val(),
                                "locationId"    : result.locationId
                            };
                            __executeExternalPost('8088/department/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_update_parent').show();
                                        setTimeout(function () {
                                            $('#addModal').modal('hide');
                                            $('#success_update_parent').hide();
                                            window.location.reload(true)
                                            __select();
                                            __select_parent();
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
            $(".btn_view").unbind("click").on("click", function(){
                // console.log("clicked button update")
                var data_id = $(this).data("id");
                // console.log(data_id)
                __executeExternalGet('8088/department/'+data_id).done(function (result) {
                    // console.log(result);
                    if (result.status != "ERROR") {
                        $(".region_view").html(result.locationName);
                        $(".field_office_view").html(result.name);
                        $(".desc_view").html(result.description);
                        if (result.parentId != 0 ) {

                            __executeExternalGet('8088/department/'+result.parentId).done(function (result) {
                                console.log(result);
                                if (result.status != "ERROR") {
                                    $(".parent_name_view").html(result.name);

                                }else{
                                    alert("failed")
                                }
                            })
                        } else {
                            $(".parent_name_view").html(" - - no parent added - - ");

                        }

                    }else{
                        alert("failed")
                    }
                })
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

        drawTable(searchBarContent);


    } )( jQuery );