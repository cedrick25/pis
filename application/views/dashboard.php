<?php $this->load->view('templates/header.php'); ?> 
<style type="">
    .aside #left-panel: {
        width: 280px; !important
    } 
</style>
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
                                    <!-- <div class="card-header">
                                        <strong class="card-title">Dashboard</strong>
                                    </div> -->
                                    <div class="card-body">
                                    <!-- <div class="card-body"> -->
                                        Welcome to<strong> Parole and Probation Information System</strong>
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
