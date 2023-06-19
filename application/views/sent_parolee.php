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
                            <li><a href="sent">Docket Routing</a></li>
                            <li class="active">Sent</li>
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
                                <strong class="card-title">Sent List</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#inv" role="tab" aria-controls="home" aria-selected="true">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#sup" role="tab" aria-controls="profile" aria-selected="false">Supervision</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#cinv" role="tab" aria-controls="profile" aria-selected="false">Courtesy Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#csup" role="tab" aria-controls="profile" aria-selected="false">Courtesy Supervision</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_inv">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Receiver</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_inv">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="sup" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Supervision</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_sup">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Receiver</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_sup">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="cinv" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Courtesy Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_cinv">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Receiver</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_cinv">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="csup" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Courtesy Supervision</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_csup">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Receiver</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_csup">

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

    <script src="assets/js/pisJs/sentParolee.js">

    </script>

</body>

</html>