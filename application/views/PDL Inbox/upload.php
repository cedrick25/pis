<?php $this->load->view('templates/header.php'); ?> 
<style>
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }
    .tab-content {
        width: 100%;
        overflow: auto;
    }
</style>
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
                            <li><a href="pdl-receive">PDL Routing</a></li>
                            <li><a href="javascript:void(0);" class="breadcrumbs_view_history">Forward</a></li>
                            <li class="active">Attachments</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

	    <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card upload_file">
                            <div class="card-header">
                                <strong class="card-title">Upload File</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Uploaded 
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" name="type" class="form-control name"  placeholder="Client Name" disabled />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" name="type" class="form-control docket_num"  placeholder="Docket Number" disabled />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select class="form-control type select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="investigation">Investigation</option>
                                            <option value="supervision">Supervision</option>
                                            <option value="rehabilitation">Rehabilitation</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Upload File</label></div>
                                    <div class="col col-md-3"><input type="file" name="fileupload" class="form-control-file" id="fileupload"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header d-flex align-items-center" id="pager">
                                <!-- <strong class="card-title">Upload File</strong> -->
                                <ul class="nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="inv_tab" href="#investigation_tab" data-toggle="tab" style="cursor: pointer;">Investigation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="sup_tab" href="#supervision_tab" data-toggle="tab" style="cursor: pointer;">Supervision</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="rehab_tab" href="#rehabilitation_tab" data-toggle="tab" style="cursor: pointer;">Rehabilitation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="oth_tab" href="#others_tab" data-toggle="tab" style="cursor: pointer;">Others</a>
                                    </li>
                                </ul>
                                <!-- <button class="btn btn-primary upload btn-sm ml-auto" type="submit"><i class="fa fa-upload"></i> Upload Document</button> -->
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="investigation_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="inv_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane fade" id="supervision_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="sup_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane fade" id="rehabilitation_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="rehab_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane fade" id="others_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="oth_table" class="table table_head" width="100%">
                                            <thead>
                                                <th>#</th>
                                                <th>File Name</th>
                                                <th>Version</th>
                                                <th>Remarks</th>
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
            </div>
        </div>


    </div>

    <?php $this->load->view('templates/footer.php'); ?> 
<script src="assets/js/pisJs/PDL_Inbox/upload.js"></script> 

</body>

</html>