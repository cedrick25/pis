<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="pdl-docket">PDL Routing</a></li>
                            <li class="active">Forward</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Forward PDL</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Forward 
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control pdl_client select2">
                                            <option value="" selected disabled>Select Client</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Forward to Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control field_office select2">
                                            <option value="" selected disabled>Select Field Office</option>
                                        </select>
                                    </div>
                                </div>
<!--                                 <div class="row form-group col-md-12 user_display">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Role</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control user_role select2">
                                            <option value="" selected disabled>Select User Role</option>
                                        </select>
                                    </div>
                                </div> -->
                                <div class="row form-group col-md-12 user_display">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">User Account</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control user_account select2">
                                            <option value="" selected disabled>Select User Account</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Subject</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Subject" class="form-control subject"></div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" placeholder="Enter Details" class="form-control details"></textarea></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <!-- reset button class: probation_rcv_reset
                                    if needed pls attach to the button -->
                                <button type="button" class="btn btn-secondary btn-sm btn-reset" style='display:none;'>Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm_forward btn-sm probation_rcv_submit float-right" style='display:none;'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PDL_Inbox/pdl_routing.js"></script> 

</body>

</html>