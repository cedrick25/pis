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

        $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')

            var payload = {
                "name"             : $(".user_role_name").val(),
                "description"      : $(".user_role_desc").val(),
                "parentId"         : "0",
                "departmentId"     : "0"
             }
            __executeExternalPost('8088/role/create',JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                        $('#newRoleModal').modal('hide');
                        $('#success').hide();
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
                    "data": 'id',
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateRoleModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update</button>"
                    }
                },
                {
                    "data": 'id',
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-success btn_grant' type='submit' data-toggle='modal' data-target='#grantPermissionModal' data-id='"+data+"'><i class='fa fa-plus-circle'></i> Grant Permission</button> <button class='btn btn-sm btn-primary btn_grant_update' type='submit' data-toggle='modal' data-target='#updatePermissionModal' data-id='"+data+"'><i class='fa fa-refresh'></i> Update Permission</button>"
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
                        url: api+'8088/role',
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
                console.log("clicked button update")
                var data_id = $(this).data("id");
                console.log(data_id)
                __executeExternalGet('8088/role/'+data_id).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        $(".user_role_name_update").val(result.name);
                        $(".user_role_desc_update").val(result.description);

                        $(".btn_confirm_update").unbind("click").on("click", function(){
                            console.log('clicked btn update confirm')
                            var payload = {
                                "name"             : $(".user_role_name_update").val(),
                                "description"      : $(".user_role_desc_update").val(),
                                "parentId"         : "0",
                                "departmentId"     : "0"
                            }
                            console.log(payload);
                            __executeExternalPost('8088/role/update/'+data_id,JSON.stringify(payload)).done(function (result) {
                                console.log(result);
                                if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_update').show();
                                    setTimeout(function () {
                                        $('#success_update').hide();
                                        window.location.reload(true);
                                    }, 2000);
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
            $(".btn_grant").unbind("click").on("click", function(){
                console.log("clicked button grant")
                var data_id = $(this).data("id");
                console.log(data_id)
                __executeExternalGet('8088/permission/list').done(function (result) {
                    console.log(result);

                    function getPermissionName(id) {
                        let name = "";
                        result.forEach(item => {
                            if (id == item.id) {   // use == in case id is string vs number
                                name = item.name;
                            }
                        });
                        return name; // ✅ return instead of just logging
                    }
                    function getPermissionAction(id) {
                        let action = "";
                        result.forEach(item => {
                            if (id == item.id) {   // use == in case id is string vs number
                                action = item.type;
                            }
                        });
                        return action; // ✅ return instead of just logging
                    }
                    function getPermissionDetail(id) {
                        let detail = "";
                        result.forEach(item => {
                            if (id == item.id) {   // use == in case id is string vs number
                                detail = item.detail;
                            }
                        });
                        return detail; // ✅ return instead of just logging
                    }

                    $('.permission_list').empty();

                    if (result.status != "ERROR") {
                        const permissions = [
                            {
                                label: getPermissionName(1),   // will now return the correct name
                                permission: getPermissionDetail(1),
                                action: getPermissionAction(1),
                                id: 1,
                                subcategories: [
                                    {
                                        label: getPermissionName(2), // example for dynamic lookup
                                        permission: getPermissionDetail(2),
                                        action: getPermissionAction(2),
                                        id: 2,
                                        subcategories: [
                                            {
                                                label: getPermissionName(3),
                                                permission: getPermissionDetail(3),
                                                action: getPermissionAction(3),
                                                id: 3,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(7),
                                                        permission: getPermissionDetail(7),
                                                        action: getPermissionAction(7),
                                                        id: 7,
                                                    },
                                                    {
                                                        label: getPermissionName(8),
                                                        permission: getPermissionDetail(8),
                                                        action: getPermissionAction(8),
                                                        id: 8,
                                                    },
                                                    {
                                                        label: getPermissionName(9),
                                                        permission: getPermissionDetail(9),
                                                        action: getPermissionAction(9),
                                                        id: 9,
                                                    },
                                                    {
                                                        label: getPermissionName(10),
                                                        permission: getPermissionDetail(10),
                                                        action: getPermissionAction(10),
                                                        id: 10,
                                                    },
                                                    {
                                                        label: getPermissionName(11),
                                                        permission: getPermissionDetail(11),
                                                        action: getPermissionAction(11),
                                                        id: 11,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(4),
                                                permission: "pis_probation_supervision",
                                                id: 4,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(12),
                                                        permission: getPermissionDetail(12),
                                                        action: getPermissionAction(12),
                                                        id: 12,
                                                    },
                                                    {
                                                        label: getPermissionName(13),
                                                        permission: getPermissionDetail(13),
                                                        action: getPermissionAction(13),
                                                        id: 13,
                                                    },
                                                    {
                                                        label: getPermissionName(14),
                                                        permission: getPermissionDetail(14),
                                                        action: getPermissionAction(14),
                                                        id: 14,
                                                    },
                                                    {
                                                        label: getPermissionName(15),
                                                        permission: getPermissionDetail(15),
                                                        action: getPermissionAction(15),
                                                        id: 15,
                                                    },
                                                    {
                                                        label: getPermissionName(16),
                                                        permission: getPermissionDetail(16),
                                                        action: getPermissionAction(16),
                                                        id: 16,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(5),
                                                permission: getPermissionDetail(5),
                                                action: getPermissionAction(5),
                                                id: 5,
                                            },
                                            {
                                                label: getPermissionName(6),
                                                permission: getPermissionDetail(6),
                                                action: getPermissionAction(6),
                                                id: 6,
                                            },
                                        ],
                                    },
                                    // pre parole permissions
                                    {
                                        label: getPermissionName(17),
                                        permission: getPermissionDetail(17),
                                        action: getPermissionAction(17),
                                        id: 17,
                                        subcategories: [
                                            {
                                                label: getPermissionName(18),
                                                permission: getPermissionDetail(18),
                                                action: getPermissionAction(18),
                                                id: 18,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(22),
                                                        permission: getPermissionDetail(22),
                                                        action: getPermissionAction(22),
                                                        id: 22,
                                                    },
                                                    {
                                                        label: getPermissionName(23),
                                                        permission: getPermissionDetail(23),
                                                        action: getPermissionAction(23),
                                                        id: 23,
                                                    },
                                                    {
                                                        label: getPermissionName(24),
                                                        permission: getPermissionDetail(24),
                                                        action: getPermissionAction(24),
                                                        id: 24,
                                                    },
                                                    {
                                                        label: getPermissionName(25),
                                                        permission: getPermissionDetail(25),
                                                        action: getPermissionAction(25),
                                                        id: 25,
                                                    },
                                                    {
                                                        label: getPermissionName(26),
                                                        permission: getPermissionDetail(26),
                                                        action: getPermissionAction(26),
                                                        id: 26,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(19),
                                                permission: getPermissionDetail(19),
                                                action: getPermissionAction(19),
                                                id: 19,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(27),
                                                        permission: getPermissionDetail(27),
                                                        action: getPermissionAction(27),
                                                        id: 27,
                                                    },
                                                    {
                                                        label: getPermissionName(28),
                                                        permission: getPermissionDetail(28),
                                                        action: getPermissionAction(28),
                                                        id: 28,
                                                    },
                                                    {
                                                        label: getPermissionName(29),
                                                        permission: getPermissionDetail(29),
                                                        action: getPermissionAction(29),
                                                        id: 29,
                                                    },
                                                    {
                                                        label: getPermissionName(30),
                                                        permission: getPermissionDetail(30),
                                                        action: getPermissionAction(30),
                                                        id: 30,
                                                    },
                                                    {
                                                        label: getPermissionName(31),
                                                        permission: getPermissionDetail(31),
                                                        action: getPermissionAction(31),
                                                        id: 31,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(20),
                                                permission: getPermissionDetail(20),
                                                action: getPermissionAction(20),
                                                id: 20,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(32),
                                                        permission: getPermissionDetail(32),
                                                        action: getPermissionAction(32),
                                                        id: 32,
                                                    },
                                                    {
                                                        label: getPermissionName(33),
                                                        permission: getPermissionDetail(33),
                                                        action: getPermissionAction(33),
                                                        id: 33,
                                                    },
                                                    {
                                                        label: getPermissionName(34),
                                                        permission: getPermissionDetail(34),
                                                        action: getPermissionAction(34),
                                                        id: 34,
                                                    },
                                                    {
                                                        label: getPermissionName(35),
                                                        permission: getPermissionDetail(35),
                                                        action: getPermissionAction(35),
                                                        id: 35,
                                                    },
                                                    {
                                                        label: getPermissionName(36),
                                                        permission: getPermissionDetail(36),
                                                        action: getPermissionAction(36),
                                                        id: 36,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(21),
                                                permission: getPermissionDetail(21),
                                                action: getPermissionAction(21),
                                                id: 21,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(37),
                                                        permission: getPermissionDetail(37),
                                                        action: getPermissionAction(37),
                                                        id: 37,
                                                    },
                                                    {
                                                        label: getPermissionName(38),
                                                        permission: getPermissionDetail(38),
                                                        action: getPermissionAction(38),
                                                        id: 38,
                                                    },
                                                    {
                                                        label: getPermissionName(39),
                                                        permission: getPermissionDetail(39),
                                                        action: getPermissionAction(39),
                                                        id: 39,
                                                    },
                                                    {
                                                        label: getPermissionName(40),
                                                        permission: getPermissionDetail(40),
                                                        action: getPermissionAction(40),
                                                        id: 40,
                                                    },
                                                    {
                                                        label: getPermissionName(41),
                                                        permission: getPermissionDetail(41),
                                                        action: getPermissionAction(41),
                                                        id: 41,
                                                    },
                                                ]
                                            },
                                        ],
                                    },
                                    // parole permissions
                                    {
                                        label: getPermissionName(42),
                                        permission: getPermissionDetail(42),
                                        action: getPermissionAction(42),
                                        id: 42,
                                        subcategories: [
                                            {
                                                label: getPermissionName(43),
                                                permission: getPermissionDetail(43),
                                                action: getPermissionAction(43),
                                                id: 43,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(47),
                                                        permission: getPermissionDetail(47),
                                                        action: getPermissionAction(47),
                                                        id: 47,
                                                    },
                                                    {
                                                        label: getPermissionName(48),
                                                        permission: getPermissionDetail(48),
                                                        action: getPermissionAction(48),
                                                        id: 48,
                                                    },
                                                    {
                                                        label: getPermissionName(49),
                                                        permission: getPermissionDetail(49),
                                                        action: getPermissionAction(49),
                                                        id: 49,
                                                    },
                                                    {
                                                        label: getPermissionName(50),
                                                        permission: getPermissionDetail(50),
                                                        action: getPermissionAction(50),
                                                        id: 50,
                                                    },
                                                    {
                                                        label: getPermissionName(51),
                                                        permission: getPermissionDetail(51),
                                                        action: getPermissionAction(51),
                                                        id: 51,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(44),
                                                permission: getPermissionDetail(44),
                                                action: getPermissionAction(44),
                                                id: 44,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(52),
                                                        permission: getPermissionDetail(52),
                                                        action: getPermissionAction(52),
                                                        id: 52,
                                                    },
                                                    {
                                                        label: getPermissionName(53),
                                                        permission: getPermissionDetail(53),
                                                        action: getPermissionAction(53),
                                                        id: 53,
                                                    },
                                                    {
                                                        label: getPermissionName(54),
                                                        permission: getPermissionDetail(54),
                                                        action: getPermissionAction(54),
                                                        id: 54,
                                                    },
                                                    {
                                                        label: getPermissionName(55),
                                                        permission: getPermissionDetail(55),
                                                        action: getPermissionAction(55),
                                                        id: 55,
                                                    },
                                                    {
                                                        label: getPermissionName(56),
                                                        permission: getPermissionDetail(56),
                                                        action: getPermissionAction(56),
                                                        id: 56,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(45),
                                                permission: getPermissionDetail(45),
                                                action: getPermissionAction(45),
                                                id: 45,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(57),
                                                        permission: getPermissionDetail(57),
                                                        action: getPermissionAction(57),
                                                        id: 57,
                                                    },
                                                    {
                                                        label: getPermissionName(58),
                                                        permission: getPermissionDetail(58),
                                                        action: getPermissionAction(58),
                                                        id: 58,
                                                    },
                                                    {
                                                        label: getPermissionName(59),
                                                        permission: getPermissionDetail(59),
                                                        action: getPermissionAction(59),
                                                        id: 59,
                                                    },
                                                    {
                                                        label: getPermissionName(60),
                                                        permission: getPermissionDetail(60),
                                                        action: getPermissionAction(60),
                                                        id: 60,
                                                    },
                                                    {
                                                        label: getPermissionName(61),
                                                        permission: getPermissionDetail(61),
                                                        action: getPermissionAction(61),
                                                        id: 61,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(46),
                                                permission: getPermissionDetail(46),
                                                action: getPermissionAction(46),
                                                id: 46,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(62),
                                                        permission: getPermissionDetail(62),
                                                        action: getPermissionAction(62),
                                                        id: 62,
                                                    },
                                                    {
                                                        label: getPermissionName(63),
                                                        permission: getPermissionDetail(63),
                                                        action: getPermissionAction(63),
                                                        id: 63,
                                                    },
                                                    {
                                                        label: getPermissionName(64),
                                                        permission: getPermissionDetail(64),
                                                        action: getPermissionAction(64),
                                                        id: 64,
                                                    },
                                                    {
                                                        label: getPermissionName(65),
                                                        permission: getPermissionDetail(65),
                                                        action: getPermissionAction(65),
                                                        id: 65,
                                                    },
                                                    {
                                                        label: getPermissionName(66),
                                                        permission: getPermissionDetail(66),
                                                        action: getPermissionAction(66),
                                                        id: 66,
                                                    },
                                                ]
                                            },
                                        ],
                                    },
                                    // pardone permissions
                                    {
                                        label: getPermissionName(67),
                                        permission: getPermissionDetail(67),
                                        action: getPermissionAction(67),
                                        id: 67,
                                        subcategories: [
                                            {
                                                label: getPermissionName(68),
                                                permission: getPermissionDetail(68),
                                                action: getPermissionAction(68),
                                                id: 68,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(72),
                                                        permission: getPermissionDetail(72),
                                                        action: getPermissionAction(72),
                                                        id: 72,
                                                    },
                                                    {
                                                        label: getPermissionName(73),
                                                        permission: getPermissionDetail(73),
                                                        action: getPermissionAction(73),
                                                        id: 73,
                                                    },
                                                    {
                                                        label: getPermissionName(74),
                                                        permission: getPermissionDetail(74),
                                                        action: getPermissionAction(74),
                                                        id: 74,
                                                    },
                                                    {
                                                        label: getPermissionName(75),
                                                        permission: getPermissionDetail(75),
                                                        action: getPermissionAction(75),
                                                        id: 75,
                                                    },
                                                    {
                                                        label: getPermissionName(76),
                                                        permission: getPermissionDetail(76),
                                                        action: getPermissionAction(76),
                                                        id: 76,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(69),
                                                permission: getPermissionDetail(69),
                                                action: getPermissionAction(69),
                                                id: 69,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(77),
                                                        permission: getPermissionDetail(77),
                                                        action: getPermissionAction(77),
                                                        id: 77,
                                                    },
                                                    {
                                                        label: getPermissionName(78),
                                                        permission: getPermissionDetail(78),
                                                        action: getPermissionAction(78),
                                                        id: 78,
                                                    },
                                                    {
                                                        label: getPermissionName(79),
                                                        permission: getPermissionDetail(79),
                                                        action: getPermissionAction(79),
                                                        id: 79,
                                                    },
                                                    {
                                                        label: getPermissionName(80),
                                                        permission: getPermissionDetail(80),
                                                        action: getPermissionAction(80),
                                                        id: 80,
                                                    },
                                                    {
                                                        label: getPermissionName(81),
                                                        permission: getPermissionDetail(81),
                                                        action: getPermissionAction(81),
                                                        id: 81,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(70),
                                                permission: getPermissionDetail(70),
                                                action: getPermissionAction(70),
                                                id: 70,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(82),
                                                        permission: getPermissionDetail(82),
                                                        action: getPermissionAction(82),
                                                        id: 82,
                                                    },
                                                    {
                                                        label: getPermissionName(83),
                                                        permission: getPermissionDetail(83),
                                                        action: getPermissionAction(83),
                                                        id: 83,
                                                    },
                                                    {
                                                        label: getPermissionName(84),
                                                        permission: getPermissionDetail(84),
                                                        action: getPermissionAction(84),
                                                        id: 84,
                                                    },
                                                    {
                                                        label: getPermissionName(85),
                                                        permission: getPermissionDetail(85),
                                                        action: getPermissionAction(85),
                                                        id: 85,
                                                    },
                                                    {
                                                        label: getPermissionName(86),
                                                        permission: getPermissionDetail(86),
                                                        action: getPermissionAction(86),
                                                        id: 86,
                                                    },
                                                ]
                                            },
                                            {
                                                label: getPermissionName(71),
                                                permission: getPermissionDetail(71),
                                                action: getPermissionAction(71),
                                                id: 71,
                                                subcategories: [
                                                    {
                                                        label: getPermissionName(87),
                                                        permission: getPermissionDetail(87),
                                                        action: getPermissionAction(87),
                                                        id: 87,
                                                    },
                                                    {
                                                        label: getPermissionName(88),
                                                        permission: getPermissionDetail(88),
                                                        action: getPermissionAction(88),
                                                        id: 88,
                                                    },
                                                    {
                                                        label: getPermissionName(89),
                                                        permission: getPermissionDetail(89),
                                                        action: getPermissionAction(89),
                                                        id: 89,
                                                    },
                                                    {
                                                        label: getPermissionName(90),
                                                        permission: getPermissionDetail(90),
                                                        action: getPermissionAction(90),
                                                        id: 90,
                                                    },
                                                    {
                                                        label: getPermissionName(91),
                                                        permission: getPermissionDetail(91),
                                                        action: getPermissionAction(91),
                                                        id: 91,
                                                    },
                                                ]
                                            },
                                        ],
                                    },
                                ]
                            },
                            // docket routing forwarding permissions
                            {
                                label: getPermissionName(92),
                                permission: getPermissionDetail(92),
                                action: getPermissionAction(92),
                                id: 92,
                                subcategories: [
                                    {
                                        label: getPermissionName(93),
                                        permission: getPermissionDetail(93),
                                        action: getPermissionAction(93),
                                        id: 93,
                                        subcategories: [
                                            {
                                                label: getPermissionName(97),
                                                permission: getPermissionDetail(97),
                                                action: getPermissionAction(97),
                                                id: 97,
                                            },
                                        ]
                                    },
                                    {
                                        label: getPermissionName(94),
                                        permission: getPermissionDetail(94),
                                        action: getPermissionAction(94),
                                        id: 94,
                                        subcategories: [
                                            {
                                                label: getPermissionName(98),
                                                permission: getPermissionDetail(98),
                                                action: getPermissionAction(98),
                                                id: 98,
                                            },
                                        ]
                                    },
                                    {
                                        label: getPermissionName(95),
                                        permission: getPermissionDetail(95),
                                        action: getPermissionAction(95),
                                        id: 95,
                                        subcategories: [
                                            {
                                                label: getPermissionName(99),
                                                permission: getPermissionDetail(99),
                                                action: getPermissionAction(99),
                                                id: 99,
                                            },
                                        ]
                                    },
                                    {
                                        label: getPermissionName(96),
                                        permission: getPermissionDetail(96),
                                        action: getPermissionAction(96),
                                        id: 96,
                                        subcategories: [
                                            {
                                                label: getPermissionName(100),
                                                permission: getPermissionDetail(100),
                                                action: getPermissionAction(100),
                                                id: 100,
                                            },
                                        ]
                                    },
                                    // docket routing for pdl forwarding permissions
                                    {
                                        label: getPermissionName(101),
                                        permission: getPermissionDetail(101),
                                        action: getPermissionAction(101),
                                        id: 101,
                                        subcategories: []
                                    },
                                    // permission of sent and inbox
                                    {
                                        label: getPermissionName(102),
                                        permission: getPermissionDetail(102),
                                        action: getPermissionAction(102),
                                        id: 102,
                                        subcategories: [
                                            {
                                                label: getPermissionName(104),
                                                permission: getPermissionDetail(104),
                                                action: getPermissionAction(104),
                                                id: 104,
                                            },
                                            {
                                                label: getPermissionName(105),
                                                permission: getPermissionDetail(105),
                                                action: getPermissionAction(105),
                                                id: 105,
                                            },
                                            {
                                                label: getPermissionName(106),
                                                permission: getPermissionDetail(106),
                                                action: getPermissionAction(106),
                                                id: 106,
                                            },
                                            {
                                                label: getPermissionName(107),
                                                permission: getPermissionDetail(107),
                                                action: getPermissionAction(107),
                                                id: 107,
                                            },
                                            {
                                                label: getPermissionName(108),
                                                permission: getPermissionDetail(108),
                                                action: getPermissionAction(108),
                                                id: 108,
                                            },
                                        ]
                                    },
                                    {
                                        label: getPermissionName(103),
                                        permission: getPermissionDetail(103),
                                        action: getPermissionAction(103),
                                        id: 103,
                                        subcategories: [
                                            {
                                                label: getPermissionName(109),
                                                permission: getPermissionDetail(109),
                                                action: getPermissionAction(109),
                                                id: 109,
                                            },
                                            {
                                                label: getPermissionName(110),
                                                permission: getPermissionDetail(110),
                                                action: getPermissionAction(110),
                                                id: 110,
                                            },
                                            {
                                                label: getPermissionName(111),
                                                permission: getPermissionDetail(111),
                                                action: getPermissionAction(111),
                                                id: 111,
                                            },
                                            {
                                                label: getPermissionName(112),
                                                permission: getPermissionDetail(112),
                                                action: getPermissionAction(112),
                                                id: 112,
                                            },
                                            {
                                                label: getPermissionName(113),
                                                permission: getPermissionDetail(113),
                                                action: getPermissionAction(113),
                                                id: 113,
                                            },
                                        ]
                                    },
                                ]
                            },
                            // fact sheet permissions
                            {
                                label: getPermissionName(114),
                                permission: getPermissionDetail(114),
                                action: getPermissionAction(114),
                                id: 114,
                                subcategories: [
                                    {
                                        label: getPermissionName(115),
                                        permission: getPermissionDetail(115),
                                        action: getPermissionAction(115),
                                        id: 115,
                                        subcategories: [
                                            {
                                                label: getPermissionName(119),
                                                permission: getPermissionDetail(119),
                                                action: getPermissionAction(119),
                                                id: 119,
                                            },
                                            {
                                                label: getPermissionName(120),
                                                permission: getPermissionDetail(120),
                                                action: getPermissionAction(120),
                                                id: 120,
                                            },
                                            {
                                                label: getPermissionName(121),
                                                permission: getPermissionDetail(121),
                                                action: getPermissionAction(121),
                                                id: 121,
                                            },
                                            {
                                                label: getPermissionName(122),
                                                permission: getPermissionDetail(122),
                                                action: getPermissionAction(122),
                                                id: 122,
                                            },
                                            {
                                                label: getPermissionName(123),
                                                permission: getPermissionDetail(123),
                                                action: getPermissionAction(123),
                                                id: 123,
                                            },
                                            {
                                                label: getPermissionName(124),
                                                permission: getPermissionDetail(124),
                                                action: getPermissionAction(124),
                                                id: 124,
                                            }
                                        ]
                                    },
                                    {
                                        label: getPermissionName(117),
                                        permission: getPermissionDetail(117),
                                        action: getPermissionAction(117),
                                        id: 117,
                                        subcategories: [
                                            {
                                                label: getPermissionName(125),
                                                permission: getPermissionDetail(125),
                                                action: getPermissionAction(125),
                                                id: 125,
                                            },
                                            {
                                                label: getPermissionName(126),
                                                permission: getPermissionDetail(126),
                                                action: getPermissionAction(126),
                                                id: 126,
                                            },
                                            {
                                                label: getPermissionName(127),
                                                permission: getPermissionDetail(127),
                                                action: getPermissionAction(127),
                                                id: 127,
                                            }
                                        ]
                                    },
                                    {
                                        label: getPermissionName(118),
                                        permission: getPermissionDetail(118),
                                        action: getPermissionAction(118),
                                        id: 118,
                                        subcategories: [
                                            {
                                                label: getPermissionName(128),
                                                permission: getPermissionDetail(128),
                                                action: getPermissionAction(128),
                                                id: 128,
                                            },
                                            {
                                                label: getPermissionName(129),
                                                permission: getPermissionDetail(129),
                                                action: getPermissionAction(129),
                                                id: 129,
                                            },
                                            {
                                                label: getPermissionName(130),
                                                permission: getPermissionDetail(130),
                                                action: getPermissionAction(130),
                                                id: 130,
                                            },
                                            {
                                                label: getPermissionName(131),
                                                permission: getPermissionDetail(131),
                                                action: getPermissionAction(131),
                                                id: 131,
                                            }
                                        ]
                                    },
                                ]
                            },
                            // forms
                            {
                                label: getPermissionName(132),
                                permission: getPermissionDetail(132),
                                action: getPermissionAction(132),
                                id: 132,
                            },
                            // system settings
                            {
                                label: getPermissionName(133),
                                permission: getPermissionDetail(133),
                                action: getPermissionAction(133),
                                id: 133,
                                subcategories: [
                                    {
                                        label: getPermissionName(134),
                                        permission: getPermissionDetail(134),
                                        action: getPermissionAction(134),
                                        id: 134,
                                    },
                                    {
                                        label: getPermissionName(135),
                                        permission: getPermissionDetail(135),
                                        action: getPermissionAction(135),
                                        id: 135,
                                    },
                                    {
                                        label: getPermissionName(136),
                                        permission: getPermissionDetail(136),
                                        action: getPermissionAction(136),
                                        id: 136,
                                    },
                                    {
                                        label: getPermissionName(137),
                                        permission: getPermissionDetail(137),
                                        action: getPermissionAction(137),
                                        id: 137,
                                    },
                                    {
                                        label: getPermissionName(138),
                                        permission: getPermissionDetail(138),
                                        action: getPermissionAction(138),
                                        id: 138,
                                    }
                                ]
                            }
                        ];
                        
                        function renderPermissions(container, items) {
                          items.forEach(item => {
                            const wrapper = document.createElement("div");
                            wrapper.classList.add("permission-item", "col-md-12", "row");

                            wrapper.innerHTML = `
                              <div class="permission-row">
                                <label class="switch">
                                  <input type="checkbox" class="permission-checkbox" name="type" value="${item.id}" 
                                         data-name="${item.label}" data-action="${item.action}" 
                                         data-detail="${item.permission}" checked>
                                  <span class="slider round"></span>
                                </label>
                                <span class="permission-label">${item.label}</span>
                              </div>
                            `;

                            const checkbox = wrapper.querySelector(".permission-checkbox");

                            if (item.subcategories && item.subcategories.length > 0) {
                              const subContainer = document.createElement("div");
                              subContainer.classList.add("sub-permission", "col-md-12", "row");
                              renderPermissions(subContainer, item.subcategories);
                              wrapper.appendChild(subContainer);

                              const subCheckboxes = subContainer.querySelectorAll(".permission-checkbox");

                              // 🔹 Parent → Children (fixed: toggle both ways)
                              checkbox.addEventListener("change", function () {
                                subCheckboxes.forEach(cb => cb.checked = this.checked);
                              });

                              // 🔹 Children → Parent
                              subCheckboxes.forEach(cb => {
                                cb.addEventListener("change", function () {
                                  if (Array.from(subCheckboxes).some(child => child.checked)) {
                                    checkbox.checked = true; // at least one child checked → parent checked
                                  } else {
                                    checkbox.checked = false; // none checked → parent unchecked
                                  }
                                });
                              });
                            }

                            container.appendChild(wrapper);
                          });
                        }

                        // Render inside the container
                        const permissionContainer = document.getElementById("permissionContainer");
                        renderPermissions(permissionContainer, permissions);

                    } else {
                        console.log("failed fetching department list")
                    }
                });

                $(".btn_grant_confirm").unbind("click").on("click", function(){
                    console.log('clicked btn grant confirm')
                    const sentence = [];
                    $("input:checkbox[name=type]:checked").each(function(){
                        var list = {
                          "id": $(this).val(),
                          "name": $(this).data("name"),
                          "detail": $(this).data("detail"),
                          "type": $(this).data("action"),
                          "value": true,
                        }
                        sentence.push(list);
                    });
                    $("input:checkbox[name=type]:not(:checked)").each(function(){
                        var list = {
                          "id": $(this).val(),
                          "name": $(this).data("name"),
                          "detail": $(this).data("detail"),
                          "type": $(this).data("action"),
                          "value": false,
                        }
                        sentence.push(list);
                    });

                    var payload = {
                        "roleId": data_id,
                        "permissionList": sentence
                    }
                    // console.log(payload)
                    __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $('#success_grant').show();
                            setTimeout(function () {
                                $('#success_grant').hide();
                                window.location.reload(true);
                            }, 2000);
                        }else{
                        }
                    })   
                })
            })
            $(".btn_grant_update").unbind("click").on("click", function(){
                console.log("clicked button grant")
                var data_id = $(this).data("id");
                console.log(data_id)

                __executeExternalGet('8088/role-permission/'+data_id).done(function (result_rp) {
                    console.log(result_rp);

                    $('.permission_list_update').empty();
                    if (result_rp.status != "ERROR") {
                        result_rp.permissionList.forEach(function(data){
                        console.log(data);
                        let value;
                        switch (data.value) {
                        case true:
                            value = "checked";
                            break;
                        default:
                            value = "";
                            break;
                        }

                        $('.permission_list_update').append(`
                            <div class="col col-md-10"><label for="text-input" class=" form-control-label" style="display:block">${data.name}</label></div>
                            <div class="col col-md-2">
                                <div class="form-check form-check-inline">
                                <label class="switch">
                                    <input type="checkbox" name="type" class="form-check-input primary" ${value} data-name="${data.name}" value="${data.id}">
                                    <span class="slider round"></span>
                                </label>
                                </div>
                            </div>`);
                        });
                        
                    } else {
                        console.log("failed fetching department list")
                    }
                });

                $(".btn_grant_confirm_update").unbind("click").on("click", function(){
                    console.log('clicked btn grant confirm')
                    const sentence = [];
                    $("input:checkbox[name=type]:checked").each(function(){
                        var list = {
                          "id": $(this).val(),
                          "value": true,
                          "name": $(this).data("name")
                        }
                        sentence.push(list);
                    });
                    $("input:checkbox[name=type]:not(:checked)").each(function(){
                        var list = {
                          "id": $(this).val(),
                          "value": false,
                          "name": $(this).data("name")
                        }
                        sentence.push(list);
                    });

                    var payload = {
                        "roleId": data_id,
                        "permissionList": sentence
                    }
                    console.log(payload)
                    __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            $('#success_grant_update').show();
                            setTimeout(function () {
                                $('#success_grant_update').hide();
                                window.location.reload(true);
                            }, 2000);
                        }else{
                        }
                    })   
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