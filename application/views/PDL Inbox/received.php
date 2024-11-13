<?php $this->load->view('templates/header.php'); ?> 
<style>
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }
</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="completeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm btn-sm">Confirm</button>
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
                            <li><a href="pdl-receive">PDL Routing</a></li>
                            <li class="active">Received</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <!-- <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Received List</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" data-toggle="tab" style="cursor: pointer;">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" data-toggle="tab" style="cursor: pointer;">Supervision</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="inv" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Investigation</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Docket No.</th>
                                                        <th>Field Office</th>
                                                        <th>Details</th>
                                                        <th>Sender</th>
                                                        <th>Status</th>
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
                    </div> -->
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">PDL Inbox</strong>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head" width="100%">
                                    <thead>
                                        <th>#</th>
                                        <th>Transaction Number</th>
                                        <th>Field Office</th>
                                        <th>Sender</th>
                                        <th>Subject</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody class="table_body">
<!--                                         <tr>
                                            <td style="width: 5%">1</td>
                                            <td style="width: 20%">James Santos</td>
                                            <td style="width: 15%">Central Office HQ</td>
                                            <td style="width: 15%">PPA Sys Admin</td>
                                            <td style="width: 25%">Sample Subject</td>
                                            <td style="width: 20%">
                                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-create btn-view"><i class="fa fa-eye"></i>&nbsp;&nbsp;View</button>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 5%">2</td>
                                            <td style="width: 20%">John Doe</td>
                                            <td style="width: 15%">Central Office HQ</td>
                                            <td style="width: 15%">PPA Sys Admin</td>
                                            <td style="width: 25%">Sample Subject</td>
                                            <td style="width: 20%">
                                                <button type="button" class="btn btn-sm btn-primary waves-effect btn-create btn-view"><i class="fa fa-eye"></i>&nbsp;&nbsp;View</button>
                                            </td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/PDL_Inbox/received.js"></script>

</body>

</html>