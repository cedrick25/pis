<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

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
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Environmental Factors</li>
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
                                <strong class="card-title">Community Background/Environmental Factors</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link idenData" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link presOff" href="#" data-toggle="modal" data-target="#warningModal">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link priorRec" href="#" data-toggle="modal" data-target="#warningModal">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link famBg" href="#" data-toggle="modal" data-target="#warningModal">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socioEco" href="#" data-toggle="modal" data-target="#warningModal">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link resEco" href="#" data-toggle="modal" data-target="#warningModal">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouseChild" href="#" data-toggle="modal" data-target="#warningModal">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link educHis" href="#" data-toggle="modal" data-target="#warningModal">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link empHis" href="#" data-toggle="modal" data-target="#warningModal">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link envFac" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link medHistory active" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link eval" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link rec" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <fieldset class="row col col-md-12">
                                    <legend>MEDICAL HISTORY</legend>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Past Medical History</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control pastMed"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Present Illness/</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control presIll"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Present Medication</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control presMedic"></textarea></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Use of Alcohol/Drugs </label></div>
                                        <div class="col-12 col-md-4">
                                            <select class="form-control useAlcohol select2">
                                                <option value="" selected disabled>-- select one --</option>
                                                <option value="NO">No</option>
                                                <option value="OCASSIONALY">Ocassionaly</option>
                                                <option value="YES">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Use</label></div>
                                        <div class="col-12 col-md-6"><input type="text" class="form-control useExtent" placeholder=""></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks/Additional Information</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control remarks"></textarea></div>
                                    </div>
                                </fieldset>                         
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-success btn-next btn-sm" style="display: none">Next</button>
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
    <script src="assets/js/pisJs/psirMedHistory.js"></script>


</body>

</html>