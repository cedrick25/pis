<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
    .routing-history-container {
        max-height: 300px;
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
        max-height: 300px;
        width: 600px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-left: 1px solid #00000029; /* Combines width, style, and color */
        border-right: 1px solid #00000029; /* Combines width, style, and color */
        border-bottom: 1px solid #00000029; /* Combines width, style, and color */  
        overflow-y: auto;
    }
    .date-footer-container {
        height: 35px;
        width: 600px;
        padding-top: 5px;
        padding-bottom: 5px;
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

    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }
    .tab-content {
        width: 100%;
        overflow: auto;
    }

</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="createModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Create</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <div class="col-12 form-row d-flex justify-content-center align-items-center">
                        <p class="text-center">
                            Select where fact sheet do you want to proceed ?<br><br>
                            <button type="button" class="btn btn-primary btn-sm mx-2 text-center" style="width: 140px;" id="createProbation">Probation</button>
                            <button type="button" class="btn btn-primary btn-sm text-center" style="width: 140px;" id="createParole">Parole and Pardone</button>
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Approval Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Alert message -->
                <div class="alert alert-success" role="alert" id="complete_success" style="display:none;">
                    <i class="fa fa-check"></i> Approved Successfully!
                </div>

                <div class="modal-body">
                    <p class="text-center">
                        Once approved, changes can't be undone. Do you want to continue?
                    </p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success btn-sm" id="approveBtn">Approve</button>
                </div>
            </div>
        </div>
    </div>

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
                            <li><a href="javascript:void(0);" class="pdl_routing_breadcrumbs">PDL Routing</a></li>
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
                                <button type="button" class="btn btn-sm btn-success waves-effect btn-complete float-right mx-2"><i class="fa fa-check-circle"></i>&nbsp;&nbsp;Approve</button>
                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-create float-right" style="display: none;"><i class="fa fa-plus"></i>&nbsp;&nbsp;Create</button>
                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-upload float-right" style="display: none;"><i class="fa fa-upload"></i>&nbsp;&nbsp;Upload</button>
                                <button type="button" class="btn btn-sm btn-danger waves-effect btn-return float-right mx-2" style="display: none;"><i class="fa fa-undo"></i>&nbsp;&nbsp;Return</button>
                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-forward float-right" style="display: none;"><i class="fa fa-forward"></i>&nbsp;&nbsp;Forward</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card" style="height: 645px; width: 510px;">
                            <div class="card-header">
                                <strong class="card-title">Routing History</strong>
                            </div>
                            <div class="card-body history_body" style="overflow: auto;">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <!-- <strong class="card-title">Attachments</strong> -->
                                <ul class="nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" href="#investigation_tab" data-toggle="tab" style="cursor: pointer;">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" href="#supervision_tab" data-toggle="tab" style="cursor: pointer;">Supervision</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link" id="rehab_tab" href="#rehabilitation_tab" data-toggle="tab" style="cursor: pointer;">Rehabilitation</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link" id="oth_tab" href="#others_tab" data-toggle="tab" style="cursor: pointer;">Others</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="investigation_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="inv_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane fade" id="supervision_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="sup_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- <div class="tab-pane fade" id="rehabilitation_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="rehab_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div> -->
                                    <div class="tab-pane fade" id="others_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="oth_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
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
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PDL_Inbox/view.js"></script> 

</body>

</html>