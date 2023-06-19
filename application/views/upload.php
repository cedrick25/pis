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
                            <li><a href="received">Received</a></li>
                            <li class="active">Upload</li>
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
                                <strong class="card-title">Upload File</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Uploaded 
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label type"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label docket_number"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Kind</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" name="kind" class="form-control kind"  placeholder="e.g Kind"/>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Upload File</label></div>
                                    <div class="col col-md-3"><input type="file" name="fileupload" class="form-control-file" id="fileupload"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Files Attached</strong>
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


    </div>

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/uploads.js">

    </script>

</body>

</html>