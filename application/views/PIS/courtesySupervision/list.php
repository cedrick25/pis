<?php $this->load->view('templates/header.php'); ?> 
<style type="">
.table_head {
    width: 100% !important;
/*    table-layout: fixed;*/
    word-wrap: break-word;
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
                            <li><a href="investigation_docketing">Docketing</a></li>
                            <li class="active">Courtesy Investigation Docket list</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Courtesy Investigation Docket List</strong>
                                <!-- <a href="investigation_docket_create"> <button class="btn btn-sm btn-success float-right pb_cinv_add" style="display:none;" type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button> </a> -->
                                <a href=""> <button class="btn btn-sm btn-success float-right pb_cinv_add" type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button> </a>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head" width="100%">
                                    <thead>
                                        <th>#</th>
                                        <th>Docket Number</th>
                                        <th>Received Date</th>
                                        <th>Name</th>
                                        <th>Criminal Case No.</th>
                                        <th>Field Office</th>
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
            <!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PIS_Courtesy_Supervision/list.js">

    </script>

</body>

</html>