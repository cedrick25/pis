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
                            <div class="card-header d-flex alig-items-center" id="pager">
                                <strong class="card-title">Persons Deprived of Liberty</strong>
                                <a href="new_client_single_carpeta" class="ml-auto"> <button class="btn btn-sm btn-success client_add"
                                style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button> </a>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active " id="pr" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>File Number</th>
                                                <th>Field Office</th>
                                                <th>Client Type</th>
                                                <th>Worksheet Status</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
<!--                             <div class="card-body">
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
                            </div> -->
                        </div>
                    </div>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/Fact_Sheet/Single_Carpeta/client_list_single_carpeta.js"></script>


</body>

</html>