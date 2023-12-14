    

    <script src="assets/js/jquery-3.2.0.min.js"></script>
    <!-- <script src="vendors/jquery/dist/jquery.min.js"></script> -->
    <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="vendors/jqvmap/dist/jquery.vmap.min.js"></script>
    <script src="vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
    <script src="vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>

    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="assets/js/init-scripts/data-table/datatables-init.js"></script>

    <script src="assets/js/moment.min.js"></script>
    <!-- <script src="assets/js/bootstrap-datetimepicker.min.js"></script> -->
    <script src="assets/js/select2.min.js"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/webcam.min.js"></script>
    <script src="assets/js/webcam.js"></script>
    <script src="assets/js/jspdf.min.js"></script>
    

    <script type="text/javascript">
    ( function ( $ ) {
        $(document).ready(function() {
            $('.select2').select2({
                // dropdownParent: $('.modal'),
                width: '100%',
            });
        });
        // localStorage.removeItem('api');
        // localStorage.setItem('api', 'http://192.168.1.147:');
        localStorage.setItem('api', 'http://localhost:');
        var api = localStorage.getItem('api');

        var ___ctx = api;

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

        buttonVisibility();


        if ($.cookie("uuid") != undefined) {
            __executeExternalGet('8088/user/'+$.cookie("uuid")).done(function (result) {
                if (result.status != "ERROR") {
                    console.log("====this is user logged in=====");
                    console.log(result);
                    console.log("====this is user logged in=====");
                    $(".f_name").html(result.username);
                    var field_office_id = result.departmentId
                    $.cookie("field_office_id", field_office_id);

                    // const roleId = ["1"];
                    // if (roleId.includes("1")) {
                    //     $(".org_module").show()
                    // }

                    if (result.roleId == "1") {
                        $(".org_module").show()
                    }
                    // result.permissions.forEach(function(data){
                    //     if (data.type == "ACTION") {
                    //         // console.log(data.value)
                    //         setTimeout(function() {
                    //             if (!data.value) {
                    //                 var element = $('.' + data.detail);
                    //                 element.hide();
                    //             }else{
                    //                 var element = $('.' + data.detail);
                    //                 element.show();
                    //             }
                    //         }, 1000);
                    //     }else if (data.type == "VIEW") {
                    //         if (!data.value) {
                    //             var element = $('.' + data.detail);
                    //             element.hide();
                    //         }else{
                    //             var element = $('.' + data.detail);
                    //             element.show();
                    //         }
                    //     }else{
                    //     }
                    // });
                }
            })
        } else {
            console.log("no user logged in")
        }
        $(".btn_logout").unbind("click").on("click", function(){
            console.log('clicked')
            $.removeCookie('uuid');
            localStorage.clear();
            setTimeout(function () {
                window.location.href="./"
            },500);
        })
                
        $('.form_capitalized').keyup(function(event) {
            var textBox = event.target;
            var start = textBox.selectionStart;
            var end = textBox.selectionEnd;
            textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1);
            textBox.setSelectionRange(start, end);                  
        });
        
    })
( jQuery );
    </script>
