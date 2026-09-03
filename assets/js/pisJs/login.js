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
        var __executeExternalPost2 = function(path, jsonObj, customLoader) {
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
        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
            var d = $.Deferred();
            if (customLoader != "") {
                $("#" + customLoader).show();
                $("#" + customLoader).removeClass("hide");
            }
            $.ajax({
                method: "GET",
                url: path,
                dataType: "json"
            }).done(function (data) {
                if (customLoader != "") {
                    $("#" + customLoader).hide();
                    $("#" + customLoader).addClass("hide");
                }
                d.resolve(data);
            }).fail(function (jqXHR, textStatus, errorThrown, request) {
                d.resolve({
                    status: 'ERROR',
                    message: request
                });
                if (customLoader != "") {
                    $("#" + customLoader).hide();
                    $("#" + customLoader).addClass("hide");
                }
            });
            return d.promise();
        };

        function persistUserSessionAndRedirect(uuid, redirectUrl) {
            __executeExternalGet('8088/user/' + uuid).done(function (user) {
                if (user && user.status !== 'ERROR') {
                    if (user.departmentId != null && String(user.departmentId).trim() !== '') {
                        $.cookie('field_office_id', user.departmentId, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                    }
                    if (user.roleId != null) {
                        $.cookie('role_id', user.roleId, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                    }
                    if (user.id != null && String(user.id).trim() !== '') {
                        $.cookie('user_id', String(user.id), window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                    }
                    if (user.departmentName != null) {
                        $.cookie('departmentName', user.departmentName, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                    }
                    var managerId = null;
                    try {
                        managerId = user.managerId ? JSON.parse(user.managerId) : null;
                    } catch (e) {
                        managerId = null;
                    }
                    var name = [user.firstName, user.middleName, user.lastName, user.suffix]
                        .filter(function (part) { return part != null && String(part).trim() !== ''; })
                        .join(' ');
                    localStorage.setItem('userName', name);
                    localStorage.setItem('managerId', JSON.stringify(managerId));
                }
                window.location.href = redirectUrl;
            });
        }

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
            __executeExternalPost('8088/authenticate',JSON.stringify(payload)).done(function (result) {
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

                            function SMSEmail(){
                                var myDate = new Date();
                                dt = (myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+myDate.getHours()+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+myDate.getSeconds());
                                
                                var payloadSMS  = {
                                    api_key : "202441593920230529142109",
                                    message_CONTENT : "Hi " + result.firstName  + ", your OTP KEY is " + otp +".",
                                    message_TO : result.mobileNumber,
                                    CREATED_BY : "1",
                                    message_DATETIME : dt
                                }
                                console.log(payloadSMS)
                                var smsUrl = window.__PIS_SMS_API_URL || '';
                                var emailUrl = window.__PIS_EMAIL_API_URL || '';
                                if (smsUrl) {
                                    __executeExternalPost2(smsUrl, JSON.stringify(payloadSMS)).done(function (resultSMS) {
                                        console.log(resultSMS)
                                    });
                                } else {
                                    console.warn('PIS_SMS_API_URL is not configured');
                                }

                                var payloadEmail  = {
                                    "message_CONTENT" : "Hi " + result.firstName+ ", your OTP KEY is " + otp +".",
                                    "message_TO" : result.email,
                                }
                                if (emailUrl) {
                                    __executeExternalPost2(emailUrl, JSON.stringify(payloadEmail)).done(function (resultemail) {
                                       console.log(resultemail)
                                    });
                                } else {
                                    console.warn('PIS_EMAIL_API_URL is not configured');
                                }
                            }
                            SMSEmail();

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
                                    $.cookie("uuid", uuid, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                                    localStorage.clear();
                                    
                                    // check if localstorage is clear
                                    var data = JSON.parse(localStorage.getItem('permission'));
                                    console.log(data)

                                    var permission_role = result.rolePermission
                                    localStorage.setItem('permission', JSON.stringify(permission_role));

                                    setTimeout(function () {
                                        persistUserSessionAndRedirect(uuid, "dashboard");
                                    }, 1000);
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
                __executeExternalPost('8088/authenticate',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        if (result.authenticated == true) {
                            console.log('authenticated = true')
                            if (result.isLocked != true) {
                                console.log("not lock")
                                $('.prompt').html('<div class="alert alert-success" role="alert"> <i class="fa fa-check-circle"></i> Login Successfully </div>');
                                var uuid = result.uuid
                                var roleName = result.role.roleName;
                                // var roleid = result.role.roleId
                                // $.cookie("roleid", roleid);
                                $.cookie("uuid", uuid, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
                                
                                // check if localstorage is clear
                                var data = JSON.parse(localStorage.getItem('permission'));
                                console.log(data)

                                var permission_role = result.rolePermission
                                localStorage.setItem('permission', JSON.stringify(permission_role));
                                localStorage.setItem('userRole', roleName);

                                var data = JSON.parse(localStorage.getItem('permission'));
                                console.log(data)
                                setTimeout(function () {
                                    persistUserSessionAndRedirect(uuid, "investigation_docketing");
                                }, 1000);
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
