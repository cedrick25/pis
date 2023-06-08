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
                            <div class="card-header">
                                <strong class="card-title">Uploaded Documents</strong>
                            </div>
                            <div class="card-body">
                                <div class="col col-md-12">
                                    <table class="table table_head">
                                        <thead>
                                            <tr>
                                                <th>#</th>
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

    </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/pisJs/factSheetUploadedDocuments.js"></script> 