<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->
    <div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Create New Document</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to create new document? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Generate Report</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Generate Report</li>
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
                                <strong class="card-title">Generate Report</strong>
                                <!-- <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Received Document</button> -->
                            </div>
                            <div class="card-body">
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">DATE RECEIVED START</label></div>
                                    <div class="col-12 col-md-9"><input type="date" id="text-input" name="text-input" placeholder="DATE RECEIVED START" class="form-control datetimepicker"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">DATE RECEIVED END</label></div>
                                    <div class="col-12 col-md-9"><input type="date" id="text-input" name="text-input" placeholder="DATE RECEIVED END" class="form-control datetimepicker"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class="division form-control-label">RECIPIENT DIVISION</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control" id="select2">
                                            <option value="" disabled selected> - - Select Division - - </option>
                                            <option value="ALL">ALL</option>
                                            <option value="1">OD</option>
                                            <option value="2">AD</option>
                                            <option value="3">Legal</option>
                                            <option value="4">COA</option>
                                            <option value="5">ADM</option>
                                            <option value="6">LGSD</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class="division form-control-label">SENDER </label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control" id="select2">
                                            <option value="" disabled selected> - - Select name - - </option>
                                            <option value="ALL">ALL</option>
                                            <option value="1">Julius sample</option>
                                            <option value="2">Julia sample</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class="status form-control-label">STATUS</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control" id="select2">
                                            <option value="" disabled selected> - - Select status - - </option>
                                            <option value="ALL">ALL</option>
                                            <option value="1">Done</option>
                                            <option value="2">Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <a href="data_tracking_report" target="_blank">
                                <button type="submit" class="btn btn-primary btn-sm">
                                    <i class="fa fa-dot-circle-o"></i> Generate report
                                </button>
                                </a>
                                <button type="reset" class="btn btn-secondary btn-sm">
                                    <i class="fa fa-ban"></i> Reset
                                </button>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
        </div><!-- .content -->
    </div>
    <!-- /#right-panel -->

    <!-- Right Panel -->
</body>
    
    <?php $this->load->view('templates/footer.php'); ?> 
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            
        });
    </script>
</html>
