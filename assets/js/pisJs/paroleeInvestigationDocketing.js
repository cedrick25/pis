    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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

        function buttonVisibility (){
            var data = JSON.parse(localStorage.getItem('permission'));
            if (data != null) {
                data.forEach(function(data){
                    if (data.type == "ACTION") {
                        // console.log(data.value)
                        setTimeout(function() {
                            if (!data.value) {
                                var element = $('.' + data.detail);
                                element.hide();
                            }else{
                                var element = $('.' + data.detail);
                                element.show();
                            }
                        }, 10);
                    }else if (data.type == "VIEW") {
                        if (!data.value) {
                            var element = $('.' + data.detail);
                            element.hide();
                        }else{
                            var element = $('.' + data.detail);
                            element.show();
                        }
                    }else{
                    }
                });
            }
        }

        function buttonFunctionality(){
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
                        }else{
                            alert("failed")
                        }
                    })
                })
            })

            $(".btn_update").unbind("click").on("click", function(){
                var docket_number = $(this).data("docket");
                window.location.href = 'http://localhost/pis/parolee_investigation_update?docket_number='+docket_number;
            })
        }

        function drawTable() {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "20px", "targets": [0] },
                        { "width": "240px", "targets": [1,2,3,4] },
                        { "width": "300px", "targets": [5] }
                    ],
                    "ajax": function(data, callback, settings) {
                        const size = 10;
                        const page = data.start / size;
                        const apiUrl = api+"8000/docketbook?page="+page+"&size="+size+"&type=SC_PR_INV&officeId="+$.cookie('field_office_id');
                        $.ajax({
                            url: apiUrl,
                            method: 'GET',
                            dataType: 'json',
                            success: function(res) {
                                callback({
                                    recordsTotal: res.totalElements,
                                    recordsFiltered: res.totalElements,
                                    data: res.content
                                });
                            },
                            error: function(err) {
                                console.error("Failed to fetch data:", err);
                            }
                        });
                    },
                    "columns": tableColumns()
                });
                $('.table_head').on('draw.dt', function() {
                    buttonFunctionality();
                    buttonVisibility();
                });
            })
        }

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
                    "data": 'docketNumber'
                },
                {
                    "data": 'docketSeries',
                    render: function(data, type, row){
                        var docketSeries = ['PRE-PAROLE INVESTIGATION','PRE-EXECUTIVE CLEMENCY INVESTIGATION','TRANSFERRED PRE-PAROLE INVESTIGATION','TRANSFERRED PRE-EXECUTIVE CLEMENCY INVESTIGATION','COURTESY PRE-PAROLE INVESTIGATION','COURTESY PRE-EXECUTIVE CLEMENCY INVESTIGATION']
                        var docketSeriesShort = ['PPI','PECI','TPPI','TPECI','CPPI','CPECI'] 
                        if ( docketSeriesShort.length == docketSeries.length ){
                            for (var i = 0; i <= docketSeriesShort.length; ++i){
                                if (docketSeriesShort[i] == data){
                                    return docketSeries[i]
                                }
                            }  
                        }                    
                    }
                },
                {
                    "data": 'clientType'
                },
                {
                    "data": 'boardOrderStatus',
                    render: function(data, type, row){
                        return data.toUpperCase();
                    }
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_update pr_inv_update' style='display:none;' type='submit' data-docket='"+data.docketNumber+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_remove pr_inv_remove' style='display:none;' type='submit' data-toggle='modal' data-target='#removeModal' data-docket='"+data.docketNumber+"' data-oi='"+data.fieldOfficeId+"'><i class='fa fa-remove'></i> Remove</button>";
                    }
                }
            ]
        }
        drawTable()

    } )( jQuery );