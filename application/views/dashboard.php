<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 

    <!-- /#left-panel -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-12">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li class="active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Dashboard</strong>
                                    </div>
                                    <!-- <div class="card-body" style="height:490px; overflow:auto; background:#fff;"> -->
                                    <div class="card-body">
                                        <div class="row form-group col-md-6">         
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="" class="form-control type select2">
                                                    <option value="" selected disabled> - - Select Type - - </option>
                                                    <option value="PIS_INV">Investigation</option>
                                                    <option value="PIS_SUP">Supervision</option>
                                                    <!-- <option value="PIS_SC">Single Carpeta</option> -->
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">         
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="" class="form-control docket_num select2">
                                                    <option selected disabled> - - Select Docket Number - - </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col col-md-6 docket_result" style="display: none">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h4>Workflow</h4>   
                                                </div>
                                            </div><br>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="an_body" style="height:490px; overflow:auto; background:#fff;">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-md-6 docket_result" style="display: none">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h4>Uploaded File</h4>   
                                                </div>
                                            </div><br>
                                            <table class="table table_head">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File name</th>
                                                        <th>Date Uploaded</th>
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
    <script src="vendors/chart.js/dist/Chart.bundle.min.js"></script>
    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/widgets.js"></script>
    <script src="assets/js/init-scripts/chart-js/chartjs-init.js"></script>

    
    <script src="assets/js/pisJs/dashboard.js"></script>
</body>

</html>
