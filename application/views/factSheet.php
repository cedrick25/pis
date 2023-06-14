<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    
    
    <!-- /#left-panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        
        <!-- /header -->
  
        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Search Results</strong>
                            </div>
                            <div class="card-body">
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="pb" role="tabpanel" aria-labelledby="home-tab">

                                        <div class="col col-md-12">
                                            <table class="table table_head_pb">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Field Office</th>
                                                        <th>Docket Number</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pb">
                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body noresult" style="display:none;">
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="pb" role="tabpanel" aria-labelledby="home-tab">

                                        <div class="col col-md-12">
                                            <fieldset class="row col col-md-12">
                                                <legend></legend>
                                                     <div class="col col-md-4"><label for="text-input" class=" form-control-label">NO RESULTS FOUND</label></div>
                                            </fieldset>
                                        </div>
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
    <script src="assets/js/pisJs/factSheet.js"></script> 