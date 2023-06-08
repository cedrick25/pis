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

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Fact Sheet</strong>
                            </div>
                                <div class="card-body">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="identifyingDataTab" data-toggle="tab" href="#idenData" role="tab" aria-selected="true">Identifying Data</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="presentOffenseTab" data-toggle="tab" href="#preOffense" role="tab" aria-selected="false">Present Offense</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="priorRecordsTab" data-toggle="tab" href="#priRecords" role="tab" aria-selected="false">Prior Records</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#famBackground" role="tab" aria-selected="false">Family Background</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#ecoBackground" role="tab" aria-selected="false">Socio-Economic Background</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#resConditions" role="tab" aria-selected="false">Residence/Economic Conditions</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#spouseChild" role="tab" aria-selected="false">Spouse/Children</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#educHistory" role="tab" aria-selected="false">Education History</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#employmentHis" role="tab" aria-selected="false">Employment History</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" data-toggle="tab" href="#environmentalFactor" role="tab" aria-selected="false">Environmental Factor</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content pl-3 p-1" id="myTabContent">
                                        <div class="tab-pane fade show active" id="idenData" role="tabpanel" aria-labelledby="home-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Identfying Data</legend>
                                                        <div class="identifyingData">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="preOffense" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Present Offense</legend>
                                                        <div class="presentOffense">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="priRecords" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Prior Records</legend>
                                                        <div class="priorRecords">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Records</legend>
                                                        <div class="records">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Information</legend>
                                                        <div class="information">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="famBackground" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend></legend>
                                                        <div class="self">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Paternal</legend>
                                                        <div class="paternal">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Maternal</legend>
                                                        <div class="maternal">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Siblings</legend>
                                                        <div class="siblings">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="ecoBackground" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend></legend>
                                                        <div class="eco">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="resConditions" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Residence</legend>
                                                        <div class="res">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Economic Conditions</legend>
                                                        <div class="ecoStatus">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Major Family Problems</legend>
                                                        <div class="famProb">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="spouseChild" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Civil Status</legend>
                                                        <div class="civil">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Spouse</legend>
                                                        <div class="spouse">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Children</legend>
                                                        <div class="child">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="educHistory" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Elementary</legend>
                                                        <div class="elem">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Secondary</legend>
                                                        <div class="sec">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>College</legend>
                                                        <div class="coll">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Post College</legend>
                                                        <div class="pcoll">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Vocational</legend>
                                                        <div class="voc">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend></legend>
                                                        <div class="unschool">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset> 
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="employmentHis" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Employment History</legend>
                                                        <div class="empHistory">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                                <fieldset class="row col col-md-12">
                                                    <legend>Status</legend>
                                                        <div class="empStatus">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="environmentalFactor" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="col col-md-12">
                                                <fieldset class="row col col-md-12">
                                                    <legend>Environmental Factor</legend>
                                                        <div class="envFactor">
                                                        </div>
                                                        <div class="col-12">
                                                        </div>
                                                </fieldset>
                                            </div>
                                        </div>
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
    <script src="assets/js/pisJs/factSheetText.js"></script> 