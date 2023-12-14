<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="completeModal_inv" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_inv" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_inv btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_sup" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_sup" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_sup"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_sup btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_cinv" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_cinv" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_cinv"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_cinv btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_csup" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_csup" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_csup"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_csup btn-sm">Confirm</button>
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
                            <li><a href="received">Docket Routing</a></li>
                            <li class="active">Received</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Received List</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" data-toggle="tab" style="cursor: pointer;">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" data-toggle="tab" style="cursor: pointer;">Supervision</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="cinv_tab" data-toggle="tab" style="cursor: pointer;">Courtesy Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="csup_tab" data-toggle="tab" style="cursor: pointer;">Courtesy Supervision</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3 id="tableTitle"></h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
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
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/receivedPardonee.js">

    </script>

</body>

</html>