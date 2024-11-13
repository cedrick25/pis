<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
    .routing-history-container {
        max-height: 200px;
        width: 600px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #00000029;
        border: 0px solid black; /* Combines width, style, and color */
/*        border-radius: 10px;*/
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow-y: auto; /* Allows vertical scrolling */
    }
    .routing-details-container {
        max-height:200px;
        width: 600px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-left: 1px solid #00000029; /* Combines width, style, and color */
        border-right: 1px solid #00000029; /* Combines width, style, and color */
        border-bottom: 1px solid #00000029; /* Combines width, style, and color */
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;        
        overflow-y: auto;
    }

    /* Style for the extra text */
    .extraText, .seeLessLinkExtra{
        color: blue; /* Or any color/style you want */
        cursor: pointer;
    }

</style>
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
                            <li class="active">View</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Routing Details</strong>
                            </div>
                            <div class="card-body">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label firstName"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label middleName"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label lastName"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alias Name:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label aliasName"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label criminalCaseNumber"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prison Number:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label prisonNumber"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sender:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label sender"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Details:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label details"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Subject:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label subject"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office:</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label fieldOffice"></label></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-create btn-upload float-right"><i class="fa fa-upload"></i>&nbsp;&nbsp;Upload</button>
                                <button type="button" class="btn btn-sm btn-danger waves-effect btn-create btn-return float-right mx-2"><i class="fa fa-undo"></i>&nbsp;&nbsp;Return</button>
                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-create btn-forward float-right"><i class="fa fa-forward"></i>&nbsp;&nbsp;Forward</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card" style="height: 622px; width: 578px;">
                            <div class="card-header">
                                <strong class="card-title">Routing History</strong>
                            </div>
                            <div class="card-body history_body" style="overflow: auto;">
<!--                                 
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-12"><span class="user">You</span><span> updated this task on: </span><span class="timestamp float-right">8:05pm</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="routing-history-container mx-3">
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Sender:</span></div>
                                                    <div class="col-12 col-md-7"><span class="sender"></span></div> 
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Forwarded To:</label></div>
                                                    <div class="col-12 col-md-7"><span class="forward_to"></label></div>
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Remarks:</label></div>
                                                    <div class="col-12 col-md-7"><span class="remarks"></label></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-12"><span class="user">You</span><span> updated this task on: </span><span class="timestamp float-right">8:05pm</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="routing-history-container mx-3">
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Sender:</span></div>
                                                    <div class="col-12 col-md-7"><span class="sender"></span></div> 
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Forwarded To:</label></div>
                                                    <div class="col-12 col-md-7"><span class="forward_to"></label></div>
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Remarks:</label></div>
                                                    <div class="col-12 col-md-7"><span class="remarks"></label></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-12"><span class="user">You</span><span> updated this task on: </span><span class="timestamp float-right">8:05pm</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="routing-history-container mx-3">
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Sender:</span></div>
                                                    <div class="col-12 col-md-7"><span class="sender"></span></div> 
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Forwarded To:</label></div>
                                                    <div class="col-12 col-md-7"><span class="forward_to"></label></div>
                                                </div>
                                                <div class="row form-group col-md-12">
                                                    <div class="col col-md-5"><span>Remarks:</label></div>
                                                    <div class="col-12 col-md-7"><span class="remarks"></label></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Attachments</strong>
                            </div>
                            <div class="card-body">
                                <div class="col col-md-12">
                                    <table class="table table_head">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Kind</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table_body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PDL_Inbox/view.js"></script> 

</body>

</html>