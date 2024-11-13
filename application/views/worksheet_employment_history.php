<?php $this->load->view('templates/header.php'); ?> 
<style>
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(255,255,255,0);
    }

    /* Full screen semi-transparent overlay */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* Make sure it overlays everything */
    }

    /* Loader styles */
    .loader {
      width: 89px;
      height: 89px;
      position: relative;
      background: rgba(255,255,255,0.13);
      animation-duration: 2.5s;
      animation-name: animSpin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      border-radius: 50%;
    }

    @keyframes animSpin {
      50% {
        transform: rotateZ(180deg) scale(.94);
      }
      100% {
        transform: rotateZ(360deg) scale(1);
      }
    }

    .loader:before,
    .loader:after {
      content: '';
      position: absolute;
      border: 8px solid transparent;
      border-radius: 50%;
    }

    .loader:before {
      width: 75%;
      height: 75%;
      background: rgba(255,255,255,.13);
      left: 12.5%;
      top: 12.5%;
      border-left: 8px solid rgba(255,255,255,.34);
      border-bottom: 8px solid rgba(255,255,255,.34);
    }

    .loader:after {
      width: 40%;
      height: 40%;
      left: 30%;
      top: 30%;
      border-right: 8px solid rgba(255,255,255,1);
      border-left: 8px solid rgba(255,255,255,1);
      border-bottom: 8px solid rgba(255,255,255,1);
    }

    .loader span {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }

    /* Hide the overlay once the page has fully loaded */
    body.loaded .overlay {
      display: none;
    }
    
    .custom-col {
      margin-right: 0;
      margin-left: 0;

      > .col,
      > [class*="col-"] {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
</style>
<body>
    <div class="overlay" style="display: none;">
        <div class="loader">
        <span></span>
        </div>
    </div>
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
                        Are you sure you want to proceed to next tab all the changes you've made will lost ? 
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
                            <li class="active">Educational History</li>
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
                                <strong class="card-title">Petitioner's Educational History</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link identifying_datan" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link present_offense" href="#" data-toggle="modal" data-target="#warningModal">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link prior_record" href="#" data-toggle="modal" data-target="#warningModal">Prior Records</a>
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
                                        <a class="nav-link active empHis" href="#">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link environmental_factor" href="#" data-toggle="modal" data-target="#warningModal">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                        
                                <fieldset class="row form-group col col-md-12">
                                        <legend>Employment History</legend>
                                        <div class="emp_history">
                                        </div>
                                        <div class="col-12">
                                            <div class="col-12">
                                                <button type="button" class="add_more_emp btn btn-primary btn-sm float-right">Add more</button>
                                            </div>
                                        </div>
                                </fieldset>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Status of Employment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_status select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="REGULAR">Regular</option>
                                            <option value="IRREGULAR">Irregular</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specStatus"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Means of Support</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_support select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="CHILDREN SUPPORT">Children Support</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="PENSION">Pension</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Specify</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_specSupp"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Employable Skills</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_skills"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Other Source of income</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_otherSource"></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Health</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_health select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FAIR">Fair</option>
                                            <option value="POOR">Poor</option>
                                            <option value="SATISFACTORY">Satisfactory</option>
                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainHealth"></textarea></div>
                                </div>

                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Previous Treatment</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_treatment select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NONE">None</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 hosp_name" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Hospital Name/s</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_hosName"></div>
                                </div>

                                <div class="row form-group col-md-6 date_hosp" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date/s Hospitalized</label></div>
                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control emp_dateHos"></div>
                                </div>

                                <div class="row form-group col-md-6 use_drug" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Use of Alcohol/Drugs</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control emp_useDrug select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="NO">No</option>
                                            <option value="OCCASIONALLY">Occasionally</option>
                                            <option value="YES">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row form-group col-md-6 drug_explain" style="display:none;">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control emp_explainDrug"></textarea></div>
                                </div>

                            </div>
                            <div class="card-footer">
                                <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button> -->
                                <button type="button" class="btn btn-primary btn-next btn-sm float-right" style="display: none">Next</button>
                                <button type="button" class="btn btn-primary btn-update btn-sm float-right" style="display: none">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/worksheetEmploymentHistory.js"></script>

</body>

</html>