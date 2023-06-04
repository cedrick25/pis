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
                                    <!-- <li class="nav-item">
                                        <a class="nav-link medHistory" href="#" data-toggle="modal" data-target="#warningModal">Medical History</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a class="nav-link eval" href="#" data-toggle="modal" data-target="#warningModal">Evaluation</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link rec active" href="#" data-toggle="modal" data-target="#warningModal">Recommendation</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
<!--                                 <fieldset class="row col col-md-12">
                                    <legend>Recommendation</legend>
                                    <div class="recommendation">      
                                    </div>
                                      <div class="row justify-content-center">
                                        <div class="col-12">
                                          One of two columns
                                        </div>
                                      </div>
                                </fieldset> -->
                                <fieldset>
                                    <legend>Recommendation</legend>
                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-12 recommendation">
                                                </div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Period of Supervision</label></div>
                                                <div class="col-2 col-md-1"><input type="text" class="form-control supYear" placeholder="Year/s"></div>
                                                <div class="col-2 col-md-1"><input type="text" class="form-control supMonth" placeholder="Month/s"></div>
                                                <div class="col-2 col-md-1"><input type="text" class="form-control supDay" placeholder="Day/s"></div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <p> <br> to be counted from the Probationer's initial report for supervision and subject to the following conditions: 
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                </fieldset>
                                <fieldset class="row col col-md-12">
                                    <legend>Recommendation</legend>
                                    <div class="row form-group col-md-12">
                                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">1. Probationers shall report initially to the Chief Probation and Parole Officer at:</label></div>
                                        <div class="col-12 col-md-3"><select class="reportOffice select2"></select></div>
                                        <div class="col col-md-4"><label for="text-input" class=" form-control-label">Within seventy-two (72) hours from the receipt of the Order Granting Probation</label></div>
                                    </div>
                                    <div class="row form-group col-md-12">
                                        <div class="col col-md-12"><label for="text-input" class=" form-control-label">2. He/She Shall, thereafter, report to his supervising Probation and Parole Officer unless otherwise modified by the Chief Probation and Parole Officer </label></div>
                                    </div>
                                    <div class="row form-group col-md-9">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">More Recommendations</label></div>
                                    </div>
                                    <div class="addRec">
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="addMoreRec btn btn-success btn-sm float-right">Add more</button>
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
    <script src="assets/js/pisJs/psirRecommendation.js"></script>


</body>

</html>