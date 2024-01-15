<?php $this->load->view('templates/header.php'); ?> 

<body>


    <div class="modal fade" id="warningModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Proceed ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_inv" style="display:none">
                    <i class="fa fa-check"></i>
                        Proceeded Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Proceed to the select tab ? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_warning btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
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
                            <li><a href="client_list">Client</a></li>
                            <li><a href="">PSIR</a></li>
                            <li class="active">Petitioner's Criminal History</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Present Offense</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link identifying_data" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active presOff" href="#">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link prior_records" href="#" data-toggle="modal" data-target="#warningModal">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link family_background" href="#" data-toggle="modal" data-target="#warningModal">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socio_economic" href="#" data-toggle="modal" data-target="#warningModal">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link residence_economic" href="#" data-toggle="modal" data-target="#warningModal">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouse_children" href="#" data-toggle="modal" data-target="#warningModal">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link education_history" href="#" data-toggle="modal" data-target="#warningModal">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link employment_history" href="#" data-toggle="modal" data-target="#warningModal">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link medHistory" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link evaluation" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link recommendation" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Charged With</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control charged" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Place of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control p_commision" disabled></div>
                                    <!-- <div class="col-12 col-md-9"><input type="date" class="form-control date_cic"></div> -->
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control convicted" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Charged</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_charged" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Commited</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_commited" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Convicted</label></div>
                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_convicted" disabled></div>
                                </div>
                                <div class="row form-group col-md-9">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Year" class="form-control s_yr" disabled></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Month" class="form-control s_mo" disabled></div>
                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Day" class="form-control s_day" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Judge</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control judge" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control court" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Arresting Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control arresting" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_1" disabled></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Defense Counsel</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control defense" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_2" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prosecutor</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control prosecutor" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_3" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offended Party</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control offended" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_4" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Co-Accused</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ca" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Aggravating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ac" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Mitigating Circumstances</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control mc" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Participation</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control ep select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="ON_BAIL">On Bail</option>
                                            <option value="ON_DETENTION">On Detention</option>
                                            <option value="ROR">ROR</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Custody</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control custody select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="ACCESSORY">Accessory</option>
                                            <option value="ACCOMPLICE">Accomplice</option>
                                            <option value="PRINCIPAL">Principal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manner of Commision</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control commision" disabled></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Motives</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control motives select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="CIRCUMSTANTIAL">Circumstantial</option>
                                            <option value="HIGH_TIMES">High Times</option>
                                            <option value="IMPRUDENCE">Imprudence</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="TEMPER">Temper</option>
                                            <option value="UNINTENTIONAL">Unintentional</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control explain" disabled></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button> -->
                                <button type="button" class="btn btn-success btn-next btn-sm">Next</button>
                                <button type="button" class="btn btn-success btn-update btn-sm" style="display: none">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/psirPresentOffense.js"></script>


</body>

</html>