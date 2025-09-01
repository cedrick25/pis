<?php $this->load->view('templates/header.php'); ?> 
<style>
    .spinner {
        border: 8px solid #f3f3f3; /* Light gray */
        border-top: 8px solid black; /* Black */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }
    /* Spinner animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .custom-col {
      margin-right: 0;
      margin-left: 0;

      > .col,
      > [class*="col-"] {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }
    .cursor-pointer {
      cursor: pointer;
    }
</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->
    <div class="modal fade" id="removeInvestigation" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Remove Successfully  
                </div>
                <div class="modal-body col-md-12">
                    <p>
                        Are you sure you want to permanently delete this investigation item?
                        <span class="text-primary">This action is irreversible and cannot be undone.</span>
                    </p>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="btn_confirm_remove">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="removeSupervision" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove_sup" style="display:none">
                    <i class="fa fa-check"></i>
                        Remove Successfully  
                </div>
                <div class="modal-body col-md-12">
                    <p>
                        Are you sure you want to permanently delete this supervision item?
                        <span class="text-primary">This action is irreversible and cannot be undone.</span>
                    </p>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="btn_confirm_remove_sup">Confirm</button>
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
                            <li><a href="client_list_single_carpeta">Fact Sheet</a></li>
                            <li><a href="client_list_single_carpeta">PDL</a></li>
                            <li class="active">View</li>
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
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">View PDL Details</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_view"></div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex alig-items-center" id="" style="margin-bottom: 50px">
                                    <ul class="nav nav-tabs col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="inv_tab" data-toggle="tab" href="#inv_body" role="tab" aria-controls="inv" aria-selected="true">Investigation</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#sup_body" role="tab" aria-controls="sup" aria-selected="false">Supervision</a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv_body" role="tabpanel" aria-labelledby="inv_tab">
                                        <dl class="row" id="inv_html" style="padding-left: 50px">
                                        </dl>
                                        <dl class="row" id="inv_item_html" style="padding-left: 50px">
                                        </dl>
                                    </div>
                                    <div class="tab-pane fade" id="sup_body" role="tabpanel" aria-labelledby="sup_tab" >
                                        <dl class="row" id="sup_html" style="padding-left: 50px">
                                        </dl>
                                        <dl class="row" id="sup_item_html" style="padding-left: 50px">
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div><!-- /#right-panel -->
    <?php $this->load->view('templates/footer.php'); ?> 
    <!-- Right Panel -->

    <script src="assets/js/pisJs/Fact_Sheet/Single_Carpeta/client_view_single_carpeta.js">

    </script>

</body>

</html>