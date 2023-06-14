<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->


    
    <!-- /#left-panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <!-- /header -->
        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Client Info</strong>
                            </div>
                            <div class="card-body noresult" style="display:none;">
                                <div class="col col-md-12">
                                    <fieldset class="row col col-md-12">
                                        <legend></legend>
                                             <div class="col col-md-4"><label for="text-input" class=" form-control-label">NO RESULTS FOUND</label></div>
                                    </fieldset>
                                </div>
                            </div>
                                <div class="card-body clientInfo">
                                    <fieldset class="row col col-md-12">
                                        <legend>Client</legend>
                                            <div class="client">
                                            </div>
                                            <div class="col-12">
                                            </div>
                                    </fieldset>
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
    <script src="assets/js/pisJs/factSheetClientInfo.js"></script> 