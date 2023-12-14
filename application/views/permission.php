<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php');?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updatePermissionModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="permission_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permission Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g User Accounts" class="form-control permission_name_update"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control type_update select2">
                                <option value="0" selected disabled> - - Select Type - - </option>
                                <!-- <option value="API">API</option> -->
                                <option value="VIEW">VIEW</option>
                                <option value="ACTION">ACTION</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Detail</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g api - user_accounts/list, page - /user_account, action - add" class="form-control permission_desc_update"></div>
                    </div>
                </div>                      
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- Remove modal -->
    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Field Office</h5>
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
                        Are you sure you want to remove this field office? 
                    </p>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_remove">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Remove modal -->


    <!-- new permission modal -->
    <div class="modal fade" id="newPermission" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">New Permission</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="permission_success" style="display:none">
                    <i class="fa fa-check"></i>
                        New Permission Added Successfully  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permission Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g User Accounts" class="form-control permission_name"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" id="" class="form-control type_add select2">
                                <option value="0" selected disabled> - - Select Type - - </option>
                                <!-- <option value="API">API</option> -->
                                <option value="VIEW">VIEW</option>
                                <option value="ACTION">ACTION</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Detail</label></div>
                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g api - user_accounts/list, page - /user_account, action - add" class="form-control permission_desc"></div>
                    </div>
                </div>


                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new permission modal -->


    <!-- new grant permission modal -->

    <!-- new grant permission modal -->


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
                            <li><a href="permission">My Organization</a></li>
                            <li class="active">Permission</li>
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
                                <strong class="card-title">Permission List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newPermission"><i class="fa fa-plus-circle"></i> Add Permission </button>
                            </div>
                            <div class="dataTables_filter">
                                <label style=" display: inline-flex; margin-left: 5px; margin-right: 20px; margin-top: 25px" class="float-right" >Search:<input type="search" class="form-control form-control-sm searchBar" id= "searchBar" placeholder="Search" style="margin-left: 7px"></label>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Permission Name</th>
                                            <th>Type</th>
                                            <th>Detail</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
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
    <script src="assets/js/pisJs/permission.js"></script>



</body>

</html>