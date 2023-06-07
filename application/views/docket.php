<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Docket</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control pb_client_type" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control caseload" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control client_type" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control cc_no" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control offense" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control court_origin" disabled></div>
                                </div>
                                <div class="row form-group col-md-6 false_manual">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control field_office" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control inv_off" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control military_court" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control plea_bargain" disabled></div>
                                </div>
                                <div class="row form-group col-md-6 class_sel" style="display: none;">
                                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control classification" disabled></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <fieldset class="row col col-md-12">
                                        <legend>List</legend>
                                        <div class="list">
                                        </div>
                                        <div class="col-12">
                                            <!-- <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button> -->
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control cod" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control rd" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control remarks" disabled></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button> -->
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <strong class="card-title">Files Attached</strong>
                                </div>
                                <div class="card-body">
                                    <div class="col col-md-12">
                                        <table class="table table_head">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Kind</th>
                                                    <th>File Name</th>
                                                    <th>Version</th>
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
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 