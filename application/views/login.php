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
    <script src="assets/js/pisJs/login.js">
    </script>
</body>

</html>
