<?php $this->load->view('templates/header.php'); ?> 

<body class="bg-dark">


    <!-- new User account modal -->
    <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <span style="font-size: 60px;"><b>PPIS</b></span><br>
                    <span>Probation and Parole Information System</span>
                </div>
                <div class="login-form">
                    <div style="margin-bottom: 30px; text-align: center;">
                        <img class="align-content" src="images/pis_logo.png" alt="" style="max-width: 32%;">
                    </div>
                    <div id="prompt">
                        
                    </div>
                    <hr>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-user"></i></div>
                            <input type="text" class="form-control username" placeholder="Username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-lock"></i></div>
                            <input type="password" class="form-control password" placeholder="********">
                        </div>
                    </div>
                    <a href="#!">
                        <button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30 btn-confirm">Sign in</button>
                    </a>
                    <div class="register-link m-t-15 text-center">
                        <p>Don't have account ? <a href="#!" data-toggle="modal" data-target="#newUserModal"> Sign Up Here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <?php $this->load->view('templates/footer.php'); ?> 
    <script type="text/javascript">
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


        $(".btn-confirm").unbind("click").on("click", function(){
            // console.log('clicked')

            var username = $(".username").val();
            var password = $(".password").val();

            var payload = {
                   username : username,
                   password : password
            }
            console.log(payload);
            __executeExternalPost('http://localhost:8088/authenticate',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.authenticated == true) {
                        console.log('authenticated = true')
                        if (result.isLocked != true) {
                            console.log("not lock")
                            $('#prompt').html('<div class="alert alert-success" role="alert"> <i class="fa fa-check"></i> Login Successfully </div>');  
                            var uuid = result.uuid
                            // var roleid = result.role.roleId
                            // $.cookie("roleid", roleid);
                            $.cookie("uuid", uuid);

                            localStorage.clear();
                            
                            // check if localstorage is clear
                            // var data = JSON.parse(localStorage.getItem('permission'));
                            // console.log(data)

                            var permission_role = result.rolePermission
                            localStorage.setItem('permission', JSON.stringify(permission_role));

                            setTimeout(function () {
                                window.location.href="dashboard"
                            },1000);
                        } else {
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-check"></i> This account is locked!</div>')
                            // console.log("this account is locked")
                        }
                    } else {
                        // console.log('no data found,inactive or removed')
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i> No data found,inactive or removed! </div>')
                        if (result.failedAttemptsCount == 4) {
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle""></i> Attempt 4, last failed attempt your account will be locked! </div>')
                            // console.log("attempt 4, last failed attempt your account will be locked")
                        }else if(result.failedAttemptsCount >= 5){
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle""></i> Your account is locked now! </div>')
                            // console.log("your account is locked now")
                        }else if(result.failedAttemptsCount != null){
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i>'+' Your failed attempt is ' + result.failedAttemptsCount + '</div>')
                            // console.log("Your failed attempt is " +result.failedAttemptsCount)
                        }
                    }

                }else{
                    
                }
            })
        })

        $(".username,.password").keyup(function(event){
            if(event.keyCode == 13){
                $(".btn-confirm").click();
            }
        });

    } )( jQuery );
    </script>
</body>

</html>
