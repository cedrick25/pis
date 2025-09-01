<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Removed Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to remove this Docket: <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
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
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list">Fact Sheet</a></li>
                            <li class="active">Fact Sheet Dashboard</li>
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
                            <div class="card-header" id="pager">
                                <strong class="card-title">Probation Fact Sheet</strong>
                                <!-- <a href="new_client"> <button class="btn btn-sm btn-success float-right client_add"
                                style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button> </a> -->
                                <a href="new_client"> <button class="btn btn-sm btn-success float-right client_add fact_sheet_pb_create" type="submit"><i class="fa fa-plus-circle"></i> Add Client</button> </a>
                            </div>
                            <!-- <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="client_pb" data-toggle="tab" href="#pb" role="tab">Probationer</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="client_pr" data-toggle="tab" href="#pr" role="tab">Parolee</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="client_pd" data-toggle="tab" href="#pd" role="tab">Pardonee</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="pb" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3 id="tableTitle"></h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Criminal Case Number</th>
                                                        <th>Field Office</th>
                                                        <th>Worksheet Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body">
                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="card-body">
                                <table id="" class="table table_head" width="100%">
                                    <thead>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Criminal Case Number</th>
                                        <th>Field Office</th>
                                        <th>Worksheet Status</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody class="table_body">
                                    </tbody>
                                </table>
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

    <script src="assets/js/pisJs/clientList.js"></script>


</body>

</html>