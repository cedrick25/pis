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
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Spouse/Children</li>
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
                                <strong class="card-title">Petitioner's Present Situation</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link identifying_data" href="#" data-toggle="modal" data-target="#warningModal">Identifying Data</a>
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
                                        <a class="nav-link active spouseChild" href="#">Spouse/Children</a>
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
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                    <div class="col-12 col-md-10">
                                        <select class="form-control civilStatus select2" disabled>
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="ANNULLED">Annulled</option>
                                            <option value="DIVORCED">Divorced</option>
                                            <option value="LEGALLY SEPERATED">Legally Seperated</option>
                                            <option value="MARRIED">Married</option>
                                            <option value="SAME SEX RELATIONSHIP">Same Sex Relationship</option>
                                            <option value="SINGLE">Single</option>
                                            <option value="SOLO PARENT">Solo Parent</option>
                                            <option value="WIDOW/WIDOWER">Widow/Widower</option>
                                            <option value="WITH COMMON-LAW SPOUSE">With Common-Law Spouse</option>
                                        </select>
                                    </div>
                                </div>

                                <fieldset class="row col col-md-12">
                                        <legend>SPOUSE</legend>
                                        <div class="spouse">
                                        </div>
                                        <div class="col-12">
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Name</label></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="First Name" class="form-control spouse_fname" disabled></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Middle Name" class="form-control spouse_mname" disabled></div>
                                                <div class="col-3 col-md-3"><input type="text" name="text-input" placeholder="Last Name" class="form-control spouse_lname" disabled></div>
                                                <div class="col-3 col-md-2"><input type="text" name="text-input" placeholder="Extended Name" class="form-control spouse_ename" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Present Address</label></div>
                                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control pAddress" disabled></textarea></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Region</label></div>
                                                <div class="col-12 col-md-10">
                                                    <select class="form-control spouse_region select2" disabled>
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="CAR">CAR</option>
                                                        <option value="NCR">NCR</option>
                                                        <option value="REGION I">REGION I</option>
                                                        <option value="REGION II">REGION II</option>
                                                        <option value="REGION III">REGION III</option>
                                                        <option value="REGION IV-A">REGION IV-A</option>
                                                        <option value="REGION IV-B">REGION IV-B</option>
                                                        <option value="REGION V">REGION V</option>
                                                        <option value="REGION VI">REGION VI</option>
                                                        <option value="REGION VII">REGION VII</option>
                                                        <option value="REGION VIII">REGION VIII</option>
                                                        <option value="REGION IX">REGION IX</option>
                                                        <option value="REGION X">REGION X</option>
                                                        <option value="REGION XI">REGION XI</option>
                                                        <option value="REGION XII">REGION XII</option>
                                                        <option value="REGION XIII">REGION XIII</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Date</label></div>
                                                <div class="col-12 col-md-10"><input type="date" class="form-control spouse_bday" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Province</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseProvince" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Work Address</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouse_work_add" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Municipality</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Address" class="form-control spouseMunicipality" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Nature of Ceremony</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Ceremony" class="form-control spouse_ceremony" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Birth Place" class="form-control spouse_bplace_others" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                                <div class="col-3 col-md-10"><input type="text" name="text-input" placeholder="Occupation" class="form-control spouse_occupation" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Marriage Date</label></div>
                                                <div class="col-12 col-md-10"><input type="date" class="form-control date_marriage" disabled></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                
                                            </div>
                                            <div class="row form-group col-md-12 spouseModule" style="display:none;">
                                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control spouse_remarks" disabled></textarea></div>
                                            </div>
                                            <div class="row form-group col-md-6 spouseModule" style="display:none;">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Spouse Relationship</label></div>
                                                <div class="col-12 col-md-10">
                                                    <select class="form-control spouse_relationship select2" disabled>
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="FAIR">Fair</option>
                                                        <option value="POOR">Poor</option>
                                                        <option value="SATISFACTORY">Satisfactory</option>
                                                        <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Children</legend>
                                        <div class="spousechild">
                                        </div>
                                        <div class="col-12">
                                            <!-- <button type="button" class="add_more_child btn btn-success btn-sm float-right" style="display:none;">Add more</button> -->
                                        </div>
                                </fieldset>

                            </div>
                            <div class="card-footer">
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
    <script src="assets/js/pisJs/psirSpouseChildren.js"></script>


</body>

</html>