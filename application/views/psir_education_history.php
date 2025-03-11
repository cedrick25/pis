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
                                        <a class="nav-link spouse_children" href="#" data-toggle="modal" data-target="#warningModal">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active educHis" href="#">Education History</a>
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
                                <fieldset class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <legend>Elementary</legend>
                                    <div class="elementary_education">
                                    </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Education Level" class="form-control elem_lvl"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Highest Level Attained" class="form-control elem_high"></div>
                                            </div>
                                        </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Where" class="form-control elem_where"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control elem_date"></div>
                                            </div>
                                        </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Award Level" class="form-control elem_award"></div>
                                            </div>
                                        </div>
                                </fieldset>
                                <fieldset class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <legend>Secondary</legend>
                                    <div class="secondary_education">
                                    </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Education Level" class="form-control sec_lvl"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Highest Level Attained" class="form-control sec_high"></div>
                                            </div>
                                        </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Where" class="form-control sec_where"></div>
                                            </div>
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control sec_date"></div>
                                            </div>
                                        </div>
                                        <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Award Level" class="form-control sec_award"></div>
                                            </div>
                                </fieldset>
                                <fieldset class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <legend>College</legend>
                                        <div class="college_education">
                                        </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Education Level" class="form-control college_lvl"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Highest Level Attained" class="form-control college_high"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Where" class="form-control college_where"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control college_date"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Award Level" class="form-control college_award"></div>
                                                </div>
                                            </div>
                                </fieldset>
                                <fieldset class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <legend>Post College</legend>
                                        <div class="pcollege_education">
                                        </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Education Level" class="form-control pcollege_lvl"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Highest Level Attained" class="form-control pcollege_high"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Where" class="form-control pcollege_where"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control pcollege_date"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Award Level" class="form-control pcollege_award"></div>
                                                </div>
                                            </div>
                                </fieldset>
                                <fieldset class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <legend>Vocational</legend>
                                        <div class="vocational_education">
                                        </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Education Level" class="form-control voc_lvl"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Highest Level Attained</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Highest Level Attained" class="form-control voc_high"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Where</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Where" class="form-control voc_where"></div>
                                                </div>

                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date</label></div>
                                                    <div class="col-3 col-md-9"><input type="date" name="text-input" class="form-control voc_date"></div>
                                                </div>
                                            </div>
                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                <div class="row form-group col-md-6">
                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Award Level</label></div>
                                                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Award Level" class="form-control voc_award"></div>
                                                </div>
                                            </div>
                                </fieldset>
                                <br><br>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Unschooled</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control unschool select2">
                                                <option value="" selected disabled>Select</option>
                                                <option value="LITERATE">Unschooled but Literate</option>
                                                <option value="ILLITERATE">Illiterate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Conduct in School</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control conduct select2">
                                                <option value="" selected disabled>Select Conduct in School</option>
                                                <option value="FAIR">Fair</option>
                                                <option value="POOR">Poor</option>
                                                <option value="SATISFACTORY">Satisfactory</option>
                                                <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                        <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control educExplain"></textarea></div>
                                    </div>
                                </div>

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
    <script src="assets/js/pisJs/psirEducationHistory.js"></script>


</body>

</html>