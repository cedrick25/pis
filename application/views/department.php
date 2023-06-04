<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateDeptModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Update Field Office</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_update" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully Updated  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control dep_loc_update select2" >
                                <!-- <option>Select Location</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD" class="form-control dep_name_update form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="description" class="form-control dep_desc_update form_capitalized"></div>
                    </div>
                    <!-- <div class="row form-group col-md-12">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Parent Name</label></div>
                        <div class="col-12 col-md-9">
                            <select name="select" class="form-control parent_name_update select2">
                            </select>
                        </div>
                    </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_update btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new dept account modal -->
    <div class="modal fade" id="newDeptModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">New Field Office</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success" style="display:none">
                    <i class="fa fa-check"></i>
                        Successfully created  
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control dep_loc select2">
                            </select>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD" class="form-control dep_name form_capitalized"></div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="CMRD Field Office" class="form-control dep_desc form_capitalized"></div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new dept account modal -->

    <div class="modal fade" id="addModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">Add Department</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="alert alert-success" role="alert" id="success_update_parent" style="display:none">
                        <i class="fa fa-check"></i>
                            Successfully Department Added  
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group region_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group field_office_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group desc_add"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Department</label></div>
                        <div class="col-12 col-md-8">
                            <select name="select" class="form-control parent_name select2">
                            </select>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm_add btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="viewModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">            
                    <h5 class="modal-title" id="mediumModalLabel">View details</h5>      
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body col-md-12">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Region</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group region_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group field_office_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group desc_view"></label>
                        </div>
                    </div>
                    <div class="row form-group col-md-12">
                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Department</label></div>
                        <div class="col-12 col-md-8">
                            <label class="form-group parent_name_view"></label>
                        </div>
                    </div>
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
                            <li><a href="department">My Organization</a></li>
                            <li class="active">Field Office</li>
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
                                <strong class="card-title">Field Office List</strong>
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newDeptModal"><i class="fa fa-plus-circle"></i> Add Field Office</button>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Field Office Name</th>
                                            <th>Description</th>
                                            <th>Region</th>
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
    <script src="assets/js/pisJs/department.js"></script>



</body>

</html>