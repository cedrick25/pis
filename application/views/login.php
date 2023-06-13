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
                    <!-- <div style="margin-bottom: 30px; text-align: center;">
                        <img class="align-content" src="images/pis_logo.png" alt="" style="max-width: 32%;">
                    </div> -->
                    <div class="login_div">
                        <div class="prompt" id="prompt">
                            
                        </div>
                        <hr>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-user"></i></div>
                                <input type="text" class="form-control email" placeholder="Email address">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-lock"></i></div>
                                <input type="password" class="form-control password" placeholder="********">
                            </div>
                        </div>
                        <a><button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30 btn-confirm">Sign in</button>
                        </a>
                        <div class="register-link m-t-15 text-center">
                            <p>Don't have account ? <a href="#!" data-toggle="modal" data-target="#newUserModal"> Sign Up Here</a></p>
                        </div>
                    </div>
                    <div class="OTP_div" style="display:none;">
                        <div class="prompt_OTP">
                            
                        </div>
                        <hr>

                        <div id="timer"></div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-lock"></i></div>
                                <input type="password" class="form-control OTP" placeholder="OTP ********">
                            </div>
                        </div>
                        <a><button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30 btn-resend" style="display:none;">Resend OTP</button>
                            <button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30 btn-OTP">Enter OTP</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <?php $this->load->view('templates/footer.php'); ?> 
    <script type="text/javascript">
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
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': "*"
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

        var urlParams = new URLSearchParams(window.location.search);
        var keyValue = urlParams.get('key');

        if (keyValue != null) {
            console.log('auto login');

            // Separate the key value by a dot
            var keyParts = keyValue.split(".");

            // Access individual parts
            var firstPart = keyParts[0];
            var secondPart = keyParts[1];

            // $(".OTP_div").show();
            // $(".login_div").hide();
            // var email = $(".email").val();
            // var password = $(".password").val();

            var payload = {
                encoded : true,
                username    : keyParts[0],
                password : keyParts[1]
            }
            console.log(payload);
            __executeExternalPost('authenticate',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.authenticated == true) {
                        console.log('authenticated = true')
                        if (result.isLocked != true) {
                            console.log("not lock")
                            $('.prompt').html('<div class="alert alert-success" role="alert"> <i class="fa fa-check-circle"></i> Login Successfully </div>');
                            $(".OTP_div").show();
                            $(".login_div").hide();
                            function generateOTP() {
                                var otp = Math.floor(10000 + Math.random() * 90000); // Generate a random number between 10000 and 99999
                                return otp.toString(); // Convert the number to a string
                            }
                            
                            var otp = generateOTP(); // Generate the OTP
                            console.log(otp); // Print the OTP to the console

                            // function SMSEmail(){
                            //     var myDate = new Date();
                            //     dt = (myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+myDate.getHours()+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+myDate.getSeconds());
                                
                            //     var payloadSMS  = {
                            //         api_key : "202441593920230529142109",
                            //         message_CONTENT : "Hi " + "test"  + ", your OTP KEY is " + otp +".",
                            //         message_TO : "09066245890",
                            //         CREATED_BY : "1",
                            //         message_DATETIME : dt
                            //     }
                            //     console.log(payloadSMS)
                            //     __executeExternalPost('http://192.168.1.200/ppa-api-uams/wsv1/api/insertSMSManually',JSON.stringify(payloadSMS)).done(function (resultSMS) {
                            //         console.log(resultSMS)
                            //     });

                            //     var payloadEmail  = {
                            //         "message_CONTENT" : "Hi " + "testt" + ", your OTP KEY is " + otp +".",
                            //         "message_TO" : "jssantos@probation.gov.ph",
                            //     }
                            //     __executeExternalPost('http://192.168.1.219/ppa-api-uams/wsv1/api/email',JSON.stringify(payloadEmail)).done(function (resultemail) {
                            //        console.log(resultemail)
                            //     });
                            // }
                            // SMSEmail();

                            var timerInterval;
                            var duration = 300; // Duration in seconds (5 minutes)

                            function startTimer() {
                                var timerElement = $("#timer");
                                var minutes, seconds;

                                timerInterval = setInterval(function() {
                                    minutes = parseInt(duration / 60, 10);
                                    seconds = parseInt(duration % 60, 10);
                                    $('.OTP').prop("disabled", false);
                                    minutes = minutes < 10 ? "0" + minutes : minutes;
                                    seconds = seconds < 10 ? "0" + seconds : seconds;

                                    timerElement.text("Remaining time: " + minutes + ":" + seconds);

                                    if (--duration < 0) {
                                        clearInterval(timerInterval);
                                        timerElement.text("Time's up! OTP expired.");
                                        $(".btn-resend").show()
                                        $(".btn-OTP").hide()
                                        $('.OTP').prop("disabled", true);
                                    }
                                }, 1000);   
                            }

                            $(".btn-resend").unbind("click").on("click", function(){
                                $(".btn-resend").hide();
                                $(".btn-OTP").show();
                                $("#timer").html("");
                                clearInterval(timerInterval);
                                duration = 300; // Reset the duration to 5 minutes
                                startTimer();
                                generateOTP();
                                SMSEmail();
                                console.log(otp); // Print the OTP to the console
                            });

                            startTimer();

                            $(".btn-OTP").unbind("click").on("click", function(){
                                console.log("submit OTP");
                                if ($(".OTP").val() == "") {
                                    $('.prompt_OTP').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i> "Please enter the OTP to proceed."</div>');
                                } else if ($(".OTP").val() == otp) {
                                    $('.prompt_OTP').html('<div class="alert alert-success" role="alert"> <i class="fa fa-check-circle"></i> "OTP verified successfully. You can now proceed."</div>');

                                    var uuid = result.uuid
                                    // var roleid = result.role.roleId
                                    // $.cookie("roleid", roleid);
                                    $.cookie("uuid", uuid);
                                    localStorage.clear();
                                    
                                    // check if localstorage is clear
                                    var data = JSON.parse(localStorage.getItem('permission'));
                                    console.log(data)

                                    var permission_role = result.rolePermission
                                    localStorage.setItem('permission', JSON.stringify(permission_role));

                                    setTimeout(function () {
                                        window.location.href="dashboard"
                                    },1000);
                                } else{
                                    $('.prompt_OTP').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i> "Invalid OTP. Please enter the correct OTP to proceed." </div>');
                                    console.log("OTP not approved")
                                }
                            });
                        } else {
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-check"></i> This account is locked!</div>')
                            // console.log("this account is locked")
                        }
                    } else {
                        // console.log('no data found,inactive or removed')
                            $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i> No record found,inactive or removed! </div>')
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
        } else{
            console.log('manual login');

            $(".btn-confirm").unbind("click").on("click", function(){
                // console.log('clicked')

                var email    = $(".email").val();
                var password = $(".password").val();

                var payload = {
                    encoded : false,
                    username    : email,
                    password : password
                }
                console.log(payload);
                __executeExternalPost('authenticate',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        if (result.authenticated == true) {
                            console.log('authenticated = true')
                            if (result.isLocked != true) {
                                console.log("not lock")
                                $('.prompt').html('<div class="alert alert-success" role="alert"> <i class="fa fa-check-circle"></i> Login Successfully </div>');
                                var uuid = result.uuid
                                // var roleid = result.role.roleId
                                // $.cookie("roleid", roleid);
                                $.cookie("uuid", uuid);
                                
                                // check if localstorage is clear
                                var data = JSON.parse(localStorage.getItem('permission'));
                                console.log(data)

                                var permission_role = result.rolePermission
                                localStorage.setItem('permission', JSON.stringify(permission_role));

                                var data = JSON.parse(localStorage.getItem('permission'));
                                console.log(data)
                                setTimeout(function () {
                                    window.location.href="dashboard"
                                },1000);
                            } else {
                                $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-check"></i> This account is locked!</div>')
                                // console.log("this account is locked")
                            }
                        } else {
                            // console.log('no data found,inactive or removed')
                                $('#prompt').html('<div class="alert alert-danger" role="alert"> <i class="fa fa-exclamation-circle"></i> No record found,inactive or removed! </div>')
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
        }

        $(".email,.password").keyup(function(event){
            if(event.keyCode == 13){
                $(".btn-confirm").click();
            }
        });

    } )( jQuery );
    </script>
</body>

</html>
