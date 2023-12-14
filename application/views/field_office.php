<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- modal -->

    <!-- Update modal -->
    <div class="modal fade" id="updateOfficemodal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Field Office Update</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="success">
                    
                </div>
                    <div class="modal-body col-md-12">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control field_office_update form_capitalized"></div>
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Region</label></div>
                            <div class="col-12 col-md-9">
                                <select name="select" class="form-control region_update select2" >
                                    <option>Select Location</option>
                                    <option>NCR</option>
                                </select>
                            </div>
                        </div>      
                    </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update modal -->

    <!-- new Docket modal -->
    <div class="modal fade" id="newOfficemodal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
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
                        Successfully Added  
                </div>
                <div class="modal-body col-md-12">
                    <div class="modal-body col-md-12">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="CMRD" class="form-control field_office form_capitalized"></div>
                        </div>
                        <div class="row form-group col-md-12">      
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Region</label></div>
                            <div class="col-12 col-md-9">
                                <select name="select" class="form-control region select2" >
                                    <option>Select Location</option>
                                    <option>NCR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new Docket modal -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Field Office</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="dashboard">My Organization</a></li>
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
                                <button class="btn btn-sm btn-success float-right" type="submit" data-toggle="modal" data-target="#newOfficemodal"><i class="fa fa-plus-circle"></i> Add Field Office</button>
                            </div>
                            <div class="card-body">
                                <table id="" class="table table_head">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Field Office</th>
                                            <th>Region</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
<!--                                        <th>Criminal Case No.</th>
                                            <th>Status</th>
                                            <th>Actions</th>
 -->                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                        <tr>
                                            <td>1</td>
                                            <td>Central Office</td>
                                            <td>NCR</td>
                                            <td>01/01/2023</td>
                                            <td class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateOfficemodal'><i class='fa fa-refresh'></i> Update</button>
                                            </td>
<!--                                        <td>Test Case</td> 
                                            <td>Criminal case test</td>
                                            <td>inbox</td>
                                            <td align='center' class='actions'> <button class='btn btn-sm btn-primary btn_update' type='submit' data-toggle='modal' data-target='#updateDocketing'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-danger btn_forward' type='submit' data-toggle='modal' data-target='#forwardDocket'><i class='fa fa-forward'></i> Forwarding</button>
                                            </td> -->
                                        </tr>
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

    <script src="assets/js/pisJs/fieldOffice.js">
    </script>

</body>

</html>