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
                            <li><a href="pdl-receive">PDL Routing</a></li>
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
                                <strong class="card-title">Forward</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Forwarded  
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label name"></label></div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control field_office select2">
                                            <option>Central Office HQ</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 user_display" style="">
                                <!-- <div class="row form-group col-md-12 user_display" style="display: none;"> -->
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Forward to</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control user_account select2">
                                            <option selected disabled>Select User Account</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g details" class="form-control details"></div>
                                </div>
                            </div>
                            <div class="card-footer">
			                    <button type="button" class="btn btn-primary btn-confirm_forward btn-sm float-right">Confirm</button>
			                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PDL_Inbox/forward.js"></script> 

</body>

</html>