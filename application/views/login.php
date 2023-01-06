<?php $this->load->view('templates/header.php'); ?> 

<body class="bg-dark">


    <!-- new User account modal -->
    <!-- <div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" style="max-width: 1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New User Accounts</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="FIRST NAME" class="form-control a"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="MIDDLE NAME"class="form-control b"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="LAST NAME"class="form-control c"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="SUFFIX NAME"class="form-control d"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Username</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="USERNAME"class="form-control e"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Email Address</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="EMAIL ADDRESS"class="form-control f"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="select" class="form-control g" disabled>
                                <option value="0" disabled>  SELECT USER ROLE  </option>
                                <option value="1">Administrator</option>
                                <option value="2" selected>User</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Contact No.</label></div>
                        <div class="col-12 col-md-9"><input type="number" name="text-input" placeholder="CONTACT NUMBER"class="form-control h"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Gender</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="select" class="form-control i">
                                <option value="0" disabled>  SELECT GENDER  </option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthday</label></div>
                        <div class="col-12 col-md-9"><input type="date" class="form-control j"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="select" class="form-control k">
                                <option value="0" disabled>  SELECT CIVIL STATUS  </option>
                                <option value="1">Single</option>
                                <option value="2">Married</option>
                                <option value="3">Widowed</option>
                                <option value="4">Seperated</option>
                                <option value="5">Not Indicated</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Voter Status</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="select" class="form-control l">
                                <option value="0" disabled>  SELECT VOTER STATUS  </option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Occupation" class="form-control m"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Street</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Street" class="form-control n"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Brgy</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Brgy" class="form-control o" value="Culong" disabled></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">City</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="City" class="form-control p"value="Guimba" disabled></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Province</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Province" class="form-control q"value="Nueva Ecija" disabled></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Password</label></div>
                        <div class="col-12 col-md-9"><input type="password" name="" placeholder="*********" class="form-control r"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Retype Password</label></div>
                        <div class="col-12 col-md-9"><input type="password" name="" placeholder=" *********" class="form-control s"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Status</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="select" class="form-control t" disabled>
                                <option value="0" >  SELECT STATUS  </option>
                                <option value="1">Active</option>
                                <option value="2"selected>Pending</option>
                                <option value="3">Delete</option>
                                <option value="4">Dead</option>
                            </select>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm-new">Confirm</button>
                </div>
            </div>
        </div>
    </div> -->
    <!-- new User account modal -->
    <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <span style="font-size: 60px;"><b>PIS</b></span><br>
                    <span>Probation Information System</span>
                </div>
                <div class="login-form">
                    <div style="margin-bottom: 30px; text-align: center;">
                        <!-- <img class="align-content" src="images/logo.png" alt="" style="max-width: 32%;"> -->
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

        // $(".btn-confirm-new").unbind("click").on("click", function(){
        //     console.log('clicked')

        //     var payload = {
        //        METHOD           : "insert",
        //        first_name       : $(".a").val(),
        //        middle_name      : $(".b").val(),
        //        last_name        : $(".c").val(),
        //        suffix_name      : $(".d").val(),
        //        username         : $(".e").val(),
        //        email            : $(".f").val(),
        //        user_type_id     : $(".g").val(),
        //        contact_no       : $(".h").val(),
        //        gender           : $(".i").val(),
        //        birthdate        : $(".j").val(),
        //        civil_status     : $(".k").val(),
        //        voter_status     : $(".l").val(),
        //        occupation       : $(".m").val(),
        //        street           : $(".n").val(),
        //        barangay         : $(".o").val(),
        //        city             : $(".p").val(),
        //        province         : $(".q").val(),
        //        password         : $(".r").val(),
        //        retype_password  : $(".s").val(),
        //        status           : $(".t").val(),
        //     }
        //     __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
        //         console.log(result);
        //         if (result.status == "SUCCESS") {
        //             console.log(result.status);
        //             $(".form-control").val('');
        //             alert(result.message+ " PLEASE WAIT FOR THE ADMIN TO ACCEPT YOUR ACCOUNT!")
        //             $('#newUserModal').modal('hide');

        //             var payload_audit = {
        //                METHOD : "insert",
        //                resident_id      :  result.payload,
        //                action_performed : "Register",
        //                action_details   : "Login module"
        //             }
        //             __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload_audit)).done(function (result) {

        //             })
        //         }else{
        //             console.log(result.status);
        //             alert(result.message)
        //         }
        //     })
        // })

        $(".btn-confirm").unbind("click").on("click", function(){
            // console.log('clicked')

            var username = $(".username").val();
            var password = $(".password").val();

            var payload = {
                   username : username,
                   password : password
            }
            __executeExternalPost('http://localhost:8088/authenticate',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.authenticated == true) {
                        console.log('authenticated = true')
                        if (result.isLocked != true) {
                            console.log("not lock")
                            
                            // var user_type_id = result.payload.user_type_id
                            // var resident_id = result.payload.resident_id
                            // $.cookie("user_type_id", user_type_id);
                            // $.cookie("resident_id", resident_id);

                            setTimeout(function () {
                                window.location.href="dashboard"
                            },1000);
                        } else {
                            console.log("this account is locked")
                        }
                    } else {
                        console.log('no data found,inactive or removed')
                        if (result.failedAttemptsCount == 4) {
                            console.log("attempt 4, last failed attempt your account will be locked")
                        }else if(result.failedAttemptsCount >= 5){
                            console.log("your account is locked now")
                        }else if(result.failedAttemptsCount != null){
                            console.log("Your failed attempt is " +result.failedAttemptsCount)
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
