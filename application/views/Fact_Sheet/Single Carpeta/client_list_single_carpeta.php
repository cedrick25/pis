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

    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove PDL Client</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Remove Successfully  
                </div>
                <div class="modal-body col-md-12">
                    <p>
                        Are you sure you want to remove this PDL client? 
                    </p>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_remove">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->
  
        <div class="breadcrumbs">
            <div class="col-sm-6">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list_single_carpeta">Fact Sheet</a></li>
                            <li><a href="client_list_single_carpeta">Person Deprived Liberty</a></li>
                            <li class="active">List</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="search-container" style="padding-top: 5px; display: flex; align-items: center; justify-content: flex-end;">
                    <label for="text-input" class="form-control-label" style="margin-right: 10px; padding-top: 7px">Search :</label>
                    <input type="text" name="first-name-input" placeholder="First Name" class="form-control firstName" style="margin-right: 10px; width: 160px;">
                    <input type="text" name="last-name-input" placeholder="Last Name" class="form-control lastName" style="margin-right: 10px; width: 160px;">
                    <button class="btn btn-primary client_search" style="display: flex; align-items: center; gap: 5px;">
                        <i class="fa fa-search" style="padding: 3px"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header d-flex alig-items-center" id="pager">
                                <!-- <strong class="card-title">Persons Deprived of Liberty</strong> -->
                                <ul class="nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" href="#" data-toggle="tab" style="cursor: pointer;" data-type="investigation">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" href="#" data-toggle="tab" style="cursor: pointer;" data-type="supervision">Supervision</a>
                                    </li>
                                </ul>
                                <button class="btn btn-sm btn-success client_add client_add_pdl ml-auto" style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active " id="homeTab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Middle Name</th>
                                                <th>Last Name</th>
                                                <th>Criminal Case Number</th>
                                                <th>Prison Number</th>
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
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/Fact_Sheet/Single_Carpeta/client_list_single_carpeta.js"></script>


</body>

</html>