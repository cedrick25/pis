<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="completeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="completeModal_sup" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Complete Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="complete_success_sup" style="display:none">
                    <i class="fa fa-check"></i>
                        Complete Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Complete this Docket <b><span class="docket_sup"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_complete_confirm_sup btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
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
                            <li><a href="received">Docket Routing</a></li>
                            <li class="active">Received</li>
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
                                <strong class="card-title">Received List</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="identifyingDataTab" data-toggle="tab" href="#identifyingData" role="tab" aria-controls="investigation" aria-selected="true">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="presentOffenseTab" data-toggle="tab" href="#presentOffense" role="tab" aria-controls="supervision" aria-selected="false">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="priorRecordsTab" data-toggle="tab" href="#priorRecords" role="tab" aria-controls="supervision" aria-selected="false">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="familyBackgroundTab" data-toggle="tab" href="#familyBackground" role="tab" aria-controls="supervision" aria-selected="false">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="socioEconomicTab" data-toggle="tab" href="#socioEconomic" role="tab" aria-controls="supervision" aria-selected="false">Socio-Economic Background</a>
                                    </li>
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                	<div class="tab-pane fade show active" id="identifyingData" role="tabpanel" aria-labelledby="home-tab">
		                                <div style="margin-bottom: 30px; margin-right: 90px; text-align: right; margin-top: 30px;">
		                                    <img class="align-content" id="client_photo" src="images/pis_logo.png" alt="" style="max-width: 10%;">
		                                </div>
		                                <div style="margin-bottom: 30px; margin-right: 70px; text-align: right;">
		                                    <input type="file" id="file-input" style="display: none">
		                                    <button type="button" class="btn btn-primary btn-sm btn-upload">Upload Photo</button>
		                                    <button type="button" type="submit" data-toggle="modal" data-target="#cameraModal" class="btn btn-success btn-sm btn-take">Take Photo</button>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control data_name"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Initital Interview</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control data_interview"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alias(es)</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control alias"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">True Name</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control true_name"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Present Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Marikina" class="form-control present_add"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Permanent Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Marikina" class="form-control permanent_add"></div>
		                                </div>
		                            </div>
		                            <div class="tab-pane fade" id="presentOffense" role="tabpanel" aria-labelledby="profile-tab">
		                                <div style="margin-top: 30px;">
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Charged With</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control charged"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Place of Commision</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control p_commision"></div>
		                                    <!-- <div class="col-12 col-md-9"><input type="date" class="form-control date_cic"></div> -->
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Convicted Of</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control convicted"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Charged</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_charged"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Commited</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_commited"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Convicted</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control date_convicted"></div>
		                                </div>
		                                <div class="row form-group col-md-9">
		                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Sentence</label></div>
		                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Year" class="form-control s_yr"></div>
		                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Month" class="form-control s_mo"></div>
		                                    <div class="col-12 col-md-3"><input type="text" name="text-input" placeholder="Day" class="form-control s_day"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Judge</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control judge"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control court"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Arresting Officer</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control arresting"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_1"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Defense Counsel</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control defense"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_2"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prosecutor</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control prosecutor"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_3"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offended Party</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control offended"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control address_4"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Co-Accused</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ca"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Aggravating Circumstances</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control ac"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Mitigating Circumstances</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control mc"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Extent of Participation</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control ep"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Custody</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control custody"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manner of Commision</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control commision"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Motives</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control motives"></div>
		                                </div>
                                	</div>
                                	<div class="tab-pane fade" id="priorRecords" role="tabpanel" aria-labelledby="profile-tab">
		                                <div style="margin-top: 30px;">
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alleged By</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <div class="form-check-inline">
		                                        <label class="form-check-label">
		                                            <input type="radio" class="form-check-input petitioner" name="optradio" value="PETITIONER">Petitioner 
		                                            <input type="radio" class="form-check-input sources" name="optradio" value="OTHER SOURCES">Other Sources
		                                        </label>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Records</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <div class="form-check-inline">
		                                        <label class="form-check-label">
		                                            <input type="radio" class="form-check-input no_record" name="optradio">No Record
		                                            <input type="radio" class="form-check-input w_record" name="optradio">With Derogatory Record
		                                        </label>
		                                        </div>
		                                    </div>
		                                </div>
		                                <fieldset class="row col col-md-12">
		                                        <legend>Records</legend>
		                                        <div class="list">
		                                        </div>
		                                        <div class="col-12">
		                                            <button type="button" class="add_more btn btn-success btn-sm float-right">Add more</button>
		                                        </div>
		                                </fieldset>
		                                <div class="row form-group col-md-6">
		                                </div>
		                                <div class="row form-group col-md-6">
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Has Been of Probation:</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <div class="form-check-inline">
		                                        <label class="form-check-label">
		                                            <input type="radio" class="form-check-input petitioner" name="optradio" value="YES"> Yes
		                                            <input type="radio" class="form-check-input sources" name="optradio" value="NO"> No
		                                        </label>
		                                        </div>
		                                    </div>
		                                </div>
		                                <fieldset class="row col col-md-12">
		                                        <legend>Information</legend>
		                                        <div class="list_info">
		                                        </div>
		                                        <div class="col-12">
		                                            <button type="button" class="add_more_info btn btn-success btn-sm float-right">Add more</button>
		                                        </div>
		                                </fieldset>
		                            </div>
                                	<div class="tab-pane fade" id="familyBackground" role="tabpanel" aria-labelledby="profile-tab">
	                                	<div style="margin-bottom: 30px; margin-right: 90px; text-align: right; margin-top: 30px;">
	                                	</div>
                                		<div class="row form-group col-md-6">
                                    	<div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                    	<div class="col-12 col-md-9">
                                        <select class="form-control sex select2">
                                            <option value="" selected disabled>-- select one --</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="MALE">Male</option>
                                            <option value="LGBT">LGBT</option>
                                        </select>
                                    	</div>
                                		</div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Civil Status</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control civilStatus select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="ANNULLED">Annulled</option>
		                                            <option value="DIVORCED">Divorced</option>
		                                            <option value="LEGALLY SEPERATED">Legally Seperated</option>
		                                            <option value="MARRIED">Married</option>
		                                            <option value="SAME SEX RELATIONSHIP">Same Sex Relationship</option>
		                                            <option value="SINGLE">Single</option>
		                                            <option value="SOLO PARENT">Solo Parent</option>
		                                            <option value="WIDOW/WIDOWER">Widow/Widower</option>
		                                            <option value="WITH COMMON LAW SPOUSE">With Common Law Spouse</option>
		                                        </select>
		                                    </div>
		                                </div>
                                		<!-- citizenship -->
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control citizenship select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="afghan">Afghan</option>
		                                            <option value="albanian">Albanian</option>
		                                            <option value="algerian">Algerian</option>
		                                            <option value="american">American</option>
		                                            <option value="andorran">Andorran</option>
		                                            <option value="angolan">Angolan</option>
		                                            <option value="antiguans">Antiguans</option>
		                                            <option value="argentinean">Argentinean</option>
		                                            <option value="armenian">Armenian</option>
		                                            <option value="australian">Australian</option>
		                                            <option value="austrian">Austrian</option>
		                                            <option value="azerbaijani">Azerbaijani</option>
		                                            <option value="bahamian">Bahamian</option>
		                                            <option value="bahraini">Bahraini</option>
		                                            <option value="bangladeshi">Bangladeshi</option>
		                                            <option value="barbadian">Barbadian</option>
		                                            <option value="barbudans">Barbudans</option>
		                                            <option value="batswana">Batswana</option>
		                                            <option value="belarusian">Belarusian</option>
		                                            <option value="belgian">Belgian</option>
		                                            <option value="belizean">Belizean</option>
		                                            <option value="beninese">Beninese</option>
		                                            <option value="bhutanese">Bhutanese</option>
		                                            <option value="bolivian">Bolivian</option>
		                                            <option value="bosnian">Bosnian</option>
		                                            <option value="brazilian">Brazilian</option>
		                                            <option value="british">British</option>
		                                            <option value="bruneian">Bruneian</option>
		                                            <option value="bulgarian">Bulgarian</option>
		                                            <option value="burkinabe">Burkinabe</option>
		                                            <option value="burmese">Burmese</option>
		                                            <option value="burundian">Burundian</option>
		                                            <option value="cambodian">Cambodian</option>
		                                            <option value="cameroonian">Cameroonian</option>
		                                            <option value="canadian">Canadian</option>
		                                            <option value="cape verdean">Cape Verdean</option>
		                                            <option value="central african">Central African</option>
		                                            <option value="chadian">Chadian</option>
		                                            <option value="chilean">Chilean</option>
		                                            <option value="chinese">Chinese</option>
		                                            <option value="colombian">Colombian</option>
		                                            <option value="comoran">Comoran</option>
		                                            <option value="congolese">Congolese</option>
		                                            <option value="costa rican">Costa Rican</option>
		                                            <option value="croatian">Croatian</option>
		                                            <option value="cuban">Cuban</option>
		                                            <option value="cypriot">Cypriot</option>
		                                            <option value="czech">Czech</option>
		                                            <option value="danish">Danish</option>
		                                            <option value="djibouti">Djibouti</option>
		                                            <option value="dominican">Dominican</option>
		                                            <option value="dutch">Dutch</option>
		                                            <option value="east timorese">East Timorese</option>
		                                            <option value="ecuadorean">Ecuadorean</option>
		                                            <option value="egyptian">Egyptian</option>
		                                            <option value="emirian">Emirian</option>
		                                            <option value="equatorial guinean">Equatorial Guinean</option>
		                                            <option value="eritrean">Eritrean</option>
		                                            <option value="estonian">Estonian</option>
		                                            <option value="ethiopian">Ethiopian</option>
		                                            <option value="fijian">Fijian</option>
		                                            <option value="filipino">Filipino</option>
		                                            <option value="finnish">Finnish</option>
		                                            <option value="french">French</option>
		                                            <option value="gabonese">Gabonese</option>
		                                            <option value="gambian">Gambian</option>
		                                            <option value="georgian">Georgian</option>
		                                            <option value="german">German</option>
		                                            <option value="ghanaian">Ghanaian</option>
		                                            <option value="greek">Greek</option>
		                                            <option value="grenadian">Grenadian</option>
		                                            <option value="guatemalan">Guatemalan</option>
		                                            <option value="guinea-bissauan">Guinea-Bissauan</option>
		                                            <option value="guinean">Guinean</option>
		                                            <option value="guyanese">Guyanese</option>
		                                            <option value="haitian">Haitian</option>
		                                            <option value="herzegovinian">Herzegovinian</option>
		                                            <option value="honduran">Honduran</option>
		                                            <option value="hungarian">Hungarian</option>
		                                            <option value="icelander">Icelander</option>
		                                            <option value="indian">Indian</option>
		                                            <option value="indonesian">Indonesian</option>
		                                            <option value="iranian">Iranian</option>
		                                            <option value="iraqi">Iraqi</option>
		                                            <option value="irish">Irish</option>
		                                            <option value="israeli">Israeli</option>
		                                            <option value="italian">Italian</option>
		                                            <option value="ivorian">Ivorian</option>
		                                            <option value="jamaican">Jamaican</option>
		                                            <option value="japanese">Japanese</option>
		                                            <option value="jordanian">Jordanian</option>
		                                            <option value="kazakhstani">Kazakhstani</option>
		                                            <option value="kenyan">Kenyan</option>
		                                            <option value="kittian and nevisian">Kittian and Nevisian</option>
		                                            <option value="kuwaiti">Kuwaiti</option>
		                                            <option value="kyrgyz">Kyrgyz</option>
		                                            <option value="laotian">Laotian</option>
		                                            <option value="latvian">Latvian</option>
		                                            <option value="lebanese">Lebanese</option>
		                                            <option value="liberian">Liberian</option>
		                                            <option value="libyan">Libyan</option>
		                                            <option value="liechtensteiner">Liechtensteiner</option>
		                                            <option value="lithuanian">Lithuanian</option>
		                                            <option value="luxembourger">Luxembourger</option>
		                                            <option value="macedonian">Macedonian</option>
		                                            <option value="malagasy">Malagasy</option>
		                                            <option value="malawian">Malawian</option>
		                                            <option value="malaysian">Malaysian</option>
		                                            <option value="maldivan">Maldivan</option>
		                                            <option value="malian">Malian</option>
		                                            <option value="maltese">Maltese</option>
		                                            <option value="marshallese">Marshallese</option>
		                                            <option value="mauritanian">Mauritanian</option>
		                                            <option value="mauritian">Mauritian</option>
		                                            <option value="mexican">Mexican</option>
		                                            <option value="micronesian">Micronesian</option>
		                                            <option value="moldovan">Moldovan</option>
		                                            <option value="monacan">Monacan</option>
		                                            <option value="mongolian">Mongolian</option>
		                                            <option value="moroccan">Moroccan</option>
		                                            <option value="mosotho">Mosotho</option>
		                                            <option value="motswana">Motswana</option>
		                                            <option value="mozambican">Mozambican</option>
		                                            <option value="namibian">Namibian</option>
		                                            <option value="nauruan">Nauruan</option>
		                                            <option value="nepalese">Nepalese</option>
		                                            <option value="new zealander">New Zealander</option>
		                                            <option value="ni-vanuatu">Ni-Vanuatu</option>
		                                            <option value="nicaraguan">Nicaraguan</option>
		                                            <option value="nigerien">Nigerien</option>
		                                            <option value="north korean">North Korean</option>
		                                            <option value="northern irish">Northern Irish</option>
		                                            <option value="norwegian">Norwegian</option>
		                                            <option value="omani">Omani</option>
		                                            <option value="pakistani">Pakistani</option>
		                                            <option value="palauan">Palauan</option>
		                                            <option value="panamanian">Panamanian</option>
		                                            <option value="papua new guinean">Papua New Guinean</option>
		                                            <option value="paraguayan">Paraguayan</option>
		                                            <option value="peruvian">Peruvian</option>
		                                            <option value="polish">Polish</option>
		                                            <option value="portuguese">Portuguese</option>
		                                            <option value="qatari">Qatari</option>
		                                            <option value="romanian">Romanian</option>
		                                            <option value="russian">Russian</option>
		                                            <option value="rwandan">Rwandan</option>
		                                            <option value="saint lucian">Saint Lucian</option>
		                                            <option value="salvadoran">Salvadoran</option>
		                                            <option value="samoan">Samoan</option>
		                                            <option value="san marinese">San Marinese</option>
		                                            <option value="sao tomean">Sao Tomean</option>
		                                            <option value="saudi">Saudi</option>
		                                            <option value="scottish">Scottish</option>
		                                            <option value="senegalese">Senegalese</option>
		                                            <option value="serbian">Serbian</option>
		                                            <option value="seychellois">Seychellois</option>
		                                            <option value="sierra leonean">Sierra Leonean</option>
		                                            <option value="singaporean">Singaporean</option>
		                                            <option value="slovakian">Slovakian</option>
		                                            <option value="slovenian">Slovenian</option>
		                                            <option value="solomon islander">Solomon Islander</option>
		                                            <option value="somali">Somali</option>
		                                            <option value="south african">South African</option>
		                                            <option value="south korean">South Korean</option>
		                                            <option value="spanish">Spanish</option>
		                                            <option value="sri lankan">Sri Lankan</option>
		                                            <option value="sudanese">Sudanese</option>
		                                            <option value="surinamer">Surinamer</option>
		                                            <option value="swazi">Swazi</option>
		                                            <option value="swedish">Swedish</option>
		                                            <option value="swiss">Swiss</option>
		                                            <option value="syrian">Syrian</option>
		                                            <option value="taiwanese">Taiwanese</option>
		                                            <option value="tajik">Tajik</option>
		                                            <option value="tanzanian">Tanzanian</option>
		                                            <option value="thai">Thai</option>
		                                            <option value="togolese">Togolese</option>
		                                            <option value="tongan">Tongan</option>
		                                            <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
		                                            <option value="tunisian">Tunisian</option>
		                                            <option value="turkish">Turkish</option>
		                                            <option value="tuvaluan">Tuvaluan</option>
		                                            <option value="ugandan">Ugandan</option>
		                                            <option value="ukrainian">Ukrainian</option>
		                                            <option value="uruguayan">Uruguayan</option>
		                                            <option value="uzbekistani">Uzbekistani</option>
		                                            <option value="venezuelan">Venezuelan</option>
		                                            <option value="vietnamese">Vietnamese</option>
		                                            <option value="welsh">Welsh</option>
		                                            <option value="yemenite">Yemenite</option>
		                                            <option value="zambian">Zambian</option>
		                                            <option value="zimbabwean">Zimbabwean</option>
		                                        </select>
		                                    </div>
		                                </div>
                                		<!-- religion -->
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control religion select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="BAPTIST FUNDAMENTAL">Baptist Fundamental</option>
		                                            <option value="BORN AGAIN">Born Again</option>
		                                            <option value="IGLESIA FILIPINA INDEPENDENTE">Iglesia Filipina Independente</option>
		                                            <option value="IGLESIA NI CRISTO">Iglesia ni Cristo</option>
		                                            <option value="ISLAM">Islam</option>
		                                            <option value="JEHOVA">Jehova's Witness, Mormons, IFC, etc.</option>
		                                            <option value="NONE">None</option>
		                                            <option value="OTHER">Other/s</option>
		                                            <option value="CATHOLIC">Roman Catholic</option>
		                                            <option value="SEVENTH DAY ADVENTIST">Seventh Day Adventist</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
		                                    <div class="col-12 col-md-9"><input type="date" class="form-control bday"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Region</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control bplace select2">
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
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Province</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control bprovince select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="MOLE">X</option>
		                                            <option value="OTHERS">Y</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth City/Municipality</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control bcity select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="MOLE">X</option>
		                                            <option value="OTHERS">Y</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bplace_others"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Identifying Marks</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control sex select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="MOLE">Mole</option>
		                                            <option value="OTHERS">Others</option>
		                                            <option value="SCAR">Scar</option>
		                                            <option value="TATTOO">Tattoo</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Handicap</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control handicap"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Description</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control desc"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Parents Relationship</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control mother_deceased select2">
		                                            <option selected disabled>-- select one --</option>
		                                            <option value="FAIR">Fair</option>
		                                            <option value="POOR">Poor</option>
		                                            <option value="SATISFACTORY">Satisfactory</option>
		                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
		                                        </select>
		                                    </div>
		                                </div>

		                                <fieldset class="row col col-md-12">
		                                        <legend>Paternal</legend>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_name"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
		                                            <div class="col-12 col-md-9"><input type="date" class="form-control father_bday"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control father_bplace select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="MOLE">X</option>
		                                                    <option value="OTHERS">Y</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-12">
		                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Address</label></div>
		                                            <div class="col-12 col-md-12"><input type="text" name="text-input" placeholder=" " class="form-control father_add"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control father_citizenship select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="afghan">Afghan</option>
		                                                    <option value="albanian">Albanian</option>
		                                                    <option value="algerian">Algerian</option>
		                                                    <option value="american">American</option>
		                                                    <option value="andorran">Andorran</option>
		                                                    <option value="angolan">Angolan</option>
		                                                    <option value="antiguans">Antiguans</option>
		                                                    <option value="argentinean">Argentinean</option>
		                                                    <option value="armenian">Armenian</option>
		                                                    <option value="australian">Australian</option>
		                                                    <option value="austrian">Austrian</option>
		                                                    <option value="azerbaijani">Azerbaijani</option>
		                                                    <option value="bahamian">Bahamian</option>
		                                                    <option value="bahraini">Bahraini</option>
		                                                    <option value="bangladeshi">Bangladeshi</option>
		                                                    <option value="barbadian">Barbadian</option>
		                                                    <option value="barbudans">Barbudans</option>
		                                                    <option value="batswana">Batswana</option>
		                                                    <option value="belarusian">Belarusian</option>
		                                                    <option value="belgian">Belgian</option>
		                                                    <option value="belizean">Belizean</option>
		                                                    <option value="beninese">Beninese</option>
		                                                    <option value="bhutanese">Bhutanese</option>
		                                                    <option value="bolivian">Bolivian</option>
		                                                    <option value="bosnian">Bosnian</option>
		                                                    <option value="brazilian">Brazilian</option>
		                                                    <option value="british">British</option>
		                                                    <option value="bruneian">Bruneian</option>
		                                                    <option value="bulgarian">Bulgarian</option>
		                                                    <option value="burkinabe">Burkinabe</option>
		                                                    <option value="burmese">Burmese</option>
		                                                    <option value="burundian">Burundian</option>
		                                                    <option value="cambodian">Cambodian</option>
		                                                    <option value="cameroonian">Cameroonian</option>
		                                                    <option value="canadian">Canadian</option>
		                                                    <option value="cape verdean">Cape Verdean</option>
		                                                    <option value="central african">Central African</option>
		                                                    <option value="chadian">Chadian</option>
		                                                    <option value="chilean">Chilean</option>
		                                                    <option value="chinese">Chinese</option>
		                                                    <option value="colombian">Colombian</option>
		                                                    <option value="comoran">Comoran</option>
		                                                    <option value="congolese">Congolese</option>
		                                                    <option value="costa rican">Costa Rican</option>
		                                                    <option value="croatian">Croatian</option>
		                                                    <option value="cuban">Cuban</option>
		                                                    <option value="cypriot">Cypriot</option>
		                                                    <option value="czech">Czech</option>
		                                                    <option value="danish">Danish</option>
		                                                    <option value="djibouti">Djibouti</option>
		                                                    <option value="dominican">Dominican</option>
		                                                    <option value="dutch">Dutch</option>
		                                                    <option value="east timorese">East Timorese</option>
		                                                    <option value="ecuadorean">Ecuadorean</option>
		                                                    <option value="egyptian">Egyptian</option>
		                                                    <option value="emirian">Emirian</option>
		                                                    <option value="equatorial guinean">Equatorial Guinean</option>
		                                                    <option value="eritrean">Eritrean</option>
		                                                    <option value="estonian">Estonian</option>
		                                                    <option value="ethiopian">Ethiopian</option>
		                                                    <option value="fijian">Fijian</option>
		                                                    <option value="filipino">Filipino</option>
		                                                    <option value="finnish">Finnish</option>
		                                                    <option value="french">French</option>
		                                                    <option value="gabonese">Gabonese</option>
		                                                    <option value="gambian">Gambian</option>
		                                                    <option value="georgian">Georgian</option>
		                                                    <option value="german">German</option>
		                                                    <option value="ghanaian">Ghanaian</option>
		                                                    <option value="greek">Greek</option>
		                                                    <option value="grenadian">Grenadian</option>
		                                                    <option value="guatemalan">Guatemalan</option>
		                                                    <option value="guinea-bissauan">Guinea-Bissauan</option>
		                                                    <option value="guinean">Guinean</option>
		                                                    <option value="guyanese">Guyanese</option>
		                                                    <option value="haitian">Haitian</option>
		                                                    <option value="herzegovinian">Herzegovinian</option>
		                                                    <option value="honduran">Honduran</option>
		                                                    <option value="hungarian">Hungarian</option>
		                                                    <option value="icelander">Icelander</option>
		                                                    <option value="indian">Indian</option>
		                                                    <option value="indonesian">Indonesian</option>
		                                                    <option value="iranian">Iranian</option>
		                                                    <option value="iraqi">Iraqi</option>
		                                                    <option value="irish">Irish</option>
		                                                    <option value="israeli">Israeli</option>
		                                                    <option value="italian">Italian</option>
		                                                    <option value="ivorian">Ivorian</option>
		                                                    <option value="jamaican">Jamaican</option>
		                                                    <option value="japanese">Japanese</option>
		                                                    <option value="jordanian">Jordanian</option>
		                                                    <option value="kazakhstani">Kazakhstani</option>
		                                                    <option value="kenyan">Kenyan</option>
		                                                    <option value="kittian and nevisian">Kittian and Nevisian</option>
		                                                    <option value="kuwaiti">Kuwaiti</option>
		                                                    <option value="kyrgyz">Kyrgyz</option>
		                                                    <option value="laotian">Laotian</option>
		                                                    <option value="latvian">Latvian</option>
		                                                    <option value="lebanese">Lebanese</option>
		                                                    <option value="liberian">Liberian</option>
		                                                    <option value="libyan">Libyan</option>
		                                                    <option value="liechtensteiner">Liechtensteiner</option>
		                                                    <option value="lithuanian">Lithuanian</option>
		                                                    <option value="luxembourger">Luxembourger</option>
		                                                    <option value="macedonian">Macedonian</option>
		                                                    <option value="malagasy">Malagasy</option>
		                                                    <option value="malawian">Malawian</option>
		                                                    <option value="malaysian">Malaysian</option>
		                                                    <option value="maldivan">Maldivan</option>
		                                                    <option value="malian">Malian</option>
		                                                    <option value="maltese">Maltese</option>
		                                                    <option value="marshallese">Marshallese</option>
		                                                    <option value="mauritanian">Mauritanian</option>
		                                                    <option value="mauritian">Mauritian</option>
		                                                    <option value="mexican">Mexican</option>
		                                                    <option value="micronesian">Micronesian</option>
		                                                    <option value="moldovan">Moldovan</option>
		                                                    <option value="monacan">Monacan</option>
		                                                    <option value="mongolian">Mongolian</option>
		                                                    <option value="moroccan">Moroccan</option>
		                                                    <option value="mosotho">Mosotho</option>
		                                                    <option value="motswana">Motswana</option>
		                                                    <option value="mozambican">Mozambican</option>
		                                                    <option value="namibian">Namibian</option>
		                                                    <option value="nauruan">Nauruan</option>
		                                                    <option value="nepalese">Nepalese</option>
		                                                    <option value="new zealander">New Zealander</option>
		                                                    <option value="ni-vanuatu">Ni-Vanuatu</option>
		                                                    <option value="nicaraguan">Nicaraguan</option>
		                                                    <option value="nigerien">Nigerien</option>
		                                                    <option value="north korean">North Korean</option>
		                                                    <option value="northern irish">Northern Irish</option>
		                                                    <option value="norwegian">Norwegian</option>
		                                                    <option value="omani">Omani</option>
		                                                    <option value="pakistani">Pakistani</option>
		                                                    <option value="palauan">Palauan</option>
		                                                    <option value="panamanian">Panamanian</option>
		                                                    <option value="papua new guinean">Papua New Guinean</option>
		                                                    <option value="paraguayan">Paraguayan</option>
		                                                    <option value="peruvian">Peruvian</option>
		                                                    <option value="polish">Polish</option>
		                                                    <option value="portuguese">Portuguese</option>
		                                                    <option value="qatari">Qatari</option>
		                                                    <option value="romanian">Romanian</option>
		                                                    <option value="russian">Russian</option>
		                                                    <option value="rwandan">Rwandan</option>
		                                                    <option value="saint lucian">Saint Lucian</option>
		                                                    <option value="salvadoran">Salvadoran</option>
		                                                    <option value="samoan">Samoan</option>
		                                                    <option value="san marinese">San Marinese</option>
		                                                    <option value="sao tomean">Sao Tomean</option>
		                                                    <option value="saudi">Saudi</option>
		                                                    <option value="scottish">Scottish</option>
		                                                    <option value="senegalese">Senegalese</option>
		                                                    <option value="serbian">Serbian</option>
		                                                    <option value="seychellois">Seychellois</option>
		                                                    <option value="sierra leonean">Sierra Leonean</option>
		                                                    <option value="singaporean">Singaporean</option>
		                                                    <option value="slovakian">Slovakian</option>
		                                                    <option value="slovenian">Slovenian</option>
		                                                    <option value="solomon islander">Solomon Islander</option>
		                                                    <option value="somali">Somali</option>
		                                                    <option value="south african">South African</option>
		                                                    <option value="south korean">South Korean</option>
		                                                    <option value="spanish">Spanish</option>
		                                                    <option value="sri lankan">Sri Lankan</option>
		                                                    <option value="sudanese">Sudanese</option>
		                                                    <option value="surinamer">Surinamer</option>
		                                                    <option value="swazi">Swazi</option>
		                                                    <option value="swedish">Swedish</option>
		                                                    <option value="swiss">Swiss</option>
		                                                    <option value="syrian">Syrian</option>
		                                                    <option value="taiwanese">Taiwanese</option>
		                                                    <option value="tajik">Tajik</option>
		                                                    <option value="tanzanian">Tanzanian</option>
		                                                    <option value="thai">Thai</option>
		                                                    <option value="togolese">Togolese</option>
		                                                    <option value="tongan">Tongan</option>
		                                                    <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
		                                                    <option value="tunisian">Tunisian</option>
		                                                    <option value="turkish">Turkish</option>
		                                                    <option value="tuvaluan">Tuvaluan</option>
		                                                    <option value="ugandan">Ugandan</option>
		                                                    <option value="ukrainian">Ukrainian</option>
		                                                    <option value="uruguayan">Uruguayan</option>
		                                                    <option value="uzbekistani">Uzbekistani</option>
		                                                    <option value="venezuelan">Venezuelan</option>
		                                                    <option value="vietnamese">Vietnamese</option>
		                                                    <option value="welsh">Welsh</option>
		                                                    <option value="yemenite">Yemenite</option>
		                                                    <option value="zambian">Zambian</option>
		                                                    <option value="zimbabwean">Zimbabwean</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control father_religion select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="BAPTIST FUNDAMENTAL">Baptist Fundamental</option>
		                                                    <option value="BORN AGAIN">Born Again</option>
		                                                    <option value="IGLESIA FILIPINA INDEPENDENTE">Iglesia Filipina Independente</option>
		                                                    <option value="IGLESIA NI CRISTO">Iglesia ni Cristo</option>
		                                                    <option value="ISLAM">Islam</option>
		                                                    <option value="JEHOVA">Jehova's Witness, Mormons, IFC, etc.</option>
		                                                    <option value="NONE">None</option>
		                                                    <option value="OTHER">Other/s</option>
		                                                    <option value="CATHOLIC">Roman Catholic</option>
		                                                    <option value="SEVENTH DAY ADVENTIST">Seventh Day Adventist</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control father_education select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="COLLEGE GRADUATE">College Graduate</option>
		                                                    <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
		                                                    <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
		                                                    <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
		                                                    <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
		                                                    <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
		                                                    <option value="ILLITERATE">No Education/Illiterate</option>
		                                                    <option value="POST-GRADUATE">Post-Graduate Studies</option>
		                                                    <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
		                                                    <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
		                                                    <option value="VOCATIONAL">Vocational</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_occupation"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Work Address</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_work_add"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Tel. No.</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_tel_no"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Monthly Income</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_income"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Deceased</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control father_deceased select2">
		                                                    <option selected disabled>-- select one --</option>
		                                                    <option value="TRUE">Yes</option>
		                                                    <option value="FALSE">No</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6 fatherDeceasedCause" style="display: none;">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Cause</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control father_deceased_cause"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6 fatherDateDeceased" style="display: none;">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Deceased</label></div>
		                                            <div class="col-12 col-md-9"><input type="date" class="form-control father_date_deceased"></div>
		                                        </div>
		                                </fieldset>

		                                <fieldset class="row col col-md-12">
		                                        <legend>Maternal</legend>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_name"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Date</label></div>
		                                            <div class="col-12 col-md-9"><input type="date" class="form-control mother_bday"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control mother_bplace select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="MOLE">X</option>
		                                                    <option value="OTHERS">Y</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-12">
		                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Address</label></div>
		                                            <div class="col-12 col-md-12"><input type="text" name="text-input" placeholder=" " class="form-control mother_add"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Citizenship</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control mother_citizenship select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="afghan">Afghan</option>
		                                                    <option value="albanian">Albanian</option>
		                                                    <option value="algerian">Algerian</option>
		                                                    <option value="american">American</option>
		                                                    <option value="andorran">Andorran</option>
		                                                    <option value="angolan">Angolan</option>
		                                                    <option value="antiguans">Antiguans</option>
		                                                    <option value="argentinean">Argentinean</option>
		                                                    <option value="armenian">Armenian</option>
		                                                    <option value="australian">Australian</option>
		                                                    <option value="austrian">Austrian</option>
		                                                    <option value="azerbaijani">Azerbaijani</option>
		                                                    <option value="bahamian">Bahamian</option>
		                                                    <option value="bahraini">Bahraini</option>
		                                                    <option value="bangladeshi">Bangladeshi</option>
		                                                    <option value="barbadian">Barbadian</option>
		                                                    <option value="barbudans">Barbudans</option>
		                                                    <option value="batswana">Batswana</option>
		                                                    <option value="belarusian">Belarusian</option>
		                                                    <option value="belgian">Belgian</option>
		                                                    <option value="belizean">Belizean</option>
		                                                    <option value="beninese">Beninese</option>
		                                                    <option value="bhutanese">Bhutanese</option>
		                                                    <option value="bolivian">Bolivian</option>
		                                                    <option value="bosnian">Bosnian</option>
		                                                    <option value="brazilian">Brazilian</option>
		                                                    <option value="british">British</option>
		                                                    <option value="bruneian">Bruneian</option>
		                                                    <option value="bulgarian">Bulgarian</option>
		                                                    <option value="burkinabe">Burkinabe</option>
		                                                    <option value="burmese">Burmese</option>
		                                                    <option value="burundian">Burundian</option>
		                                                    <option value="cambodian">Cambodian</option>
		                                                    <option value="cameroonian">Cameroonian</option>
		                                                    <option value="canadian">Canadian</option>
		                                                    <option value="cape verdean">Cape Verdean</option>
		                                                    <option value="central african">Central African</option>
		                                                    <option value="chadian">Chadian</option>
		                                                    <option value="chilean">Chilean</option>
		                                                    <option value="chinese">Chinese</option>
		                                                    <option value="colombian">Colombian</option>
		                                                    <option value="comoran">Comoran</option>
		                                                    <option value="congolese">Congolese</option>
		                                                    <option value="costa rican">Costa Rican</option>
		                                                    <option value="croatian">Croatian</option>
		                                                    <option value="cuban">Cuban</option>
		                                                    <option value="cypriot">Cypriot</option>
		                                                    <option value="czech">Czech</option>
		                                                    <option value="danish">Danish</option>
		                                                    <option value="djibouti">Djibouti</option>
		                                                    <option value="dominican">Dominican</option>
		                                                    <option value="dutch">Dutch</option>
		                                                    <option value="east timorese">East Timorese</option>
		                                                    <option value="ecuadorean">Ecuadorean</option>
		                                                    <option value="egyptian">Egyptian</option>
		                                                    <option value="emirian">Emirian</option>
		                                                    <option value="equatorial guinean">Equatorial Guinean</option>
		                                                    <option value="eritrean">Eritrean</option>
		                                                    <option value="estonian">Estonian</option>
		                                                    <option value="ethiopian">Ethiopian</option>
		                                                    <option value="fijian">Fijian</option>
		                                                    <option value="filipino">Filipino</option>
		                                                    <option value="finnish">Finnish</option>
		                                                    <option value="french">French</option>
		                                                    <option value="gabonese">Gabonese</option>
		                                                    <option value="gambian">Gambian</option>
		                                                    <option value="georgian">Georgian</option>
		                                                    <option value="german">German</option>
		                                                    <option value="ghanaian">Ghanaian</option>
		                                                    <option value="greek">Greek</option>
		                                                    <option value="grenadian">Grenadian</option>
		                                                    <option value="guatemalan">Guatemalan</option>
		                                                    <option value="guinea-bissauan">Guinea-Bissauan</option>
		                                                    <option value="guinean">Guinean</option>
		                                                    <option value="guyanese">Guyanese</option>
		                                                    <option value="haitian">Haitian</option>
		                                                    <option value="herzegovinian">Herzegovinian</option>
		                                                    <option value="honduran">Honduran</option>
		                                                    <option value="hungarian">Hungarian</option>
		                                                    <option value="icelander">Icelander</option>
		                                                    <option value="indian">Indian</option>
		                                                    <option value="indonesian">Indonesian</option>
		                                                    <option value="iranian">Iranian</option>
		                                                    <option value="iraqi">Iraqi</option>
		                                                    <option value="irish">Irish</option>
		                                                    <option value="israeli">Israeli</option>
		                                                    <option value="italian">Italian</option>
		                                                    <option value="ivorian">Ivorian</option>
		                                                    <option value="jamaican">Jamaican</option>
		                                                    <option value="japanese">Japanese</option>
		                                                    <option value="jordanian">Jordanian</option>
		                                                    <option value="kazakhstani">Kazakhstani</option>
		                                                    <option value="kenyan">Kenyan</option>
		                                                    <option value="kittian and nevisian">Kittian and Nevisian</option>
		                                                    <option value="kuwaiti">Kuwaiti</option>
		                                                    <option value="kyrgyz">Kyrgyz</option>
		                                                    <option value="laotian">Laotian</option>
		                                                    <option value="latvian">Latvian</option>
		                                                    <option value="lebanese">Lebanese</option>
		                                                    <option value="liberian">Liberian</option>
		                                                    <option value="libyan">Libyan</option>
		                                                    <option value="liechtensteiner">Liechtensteiner</option>
		                                                    <option value="lithuanian">Lithuanian</option>
		                                                    <option value="luxembourger">Luxembourger</option>
		                                                    <option value="macedonian">Macedonian</option>
		                                                    <option value="malagasy">Malagasy</option>
		                                                    <option value="malawian">Malawian</option>
		                                                    <option value="malaysian">Malaysian</option>
		                                                    <option value="maldivan">Maldivan</option>
		                                                    <option value="malian">Malian</option>
		                                                    <option value="maltese">Maltese</option>
		                                                    <option value="marshallese">Marshallese</option>
		                                                    <option value="mauritanian">Mauritanian</option>
		                                                    <option value="mauritian">Mauritian</option>
		                                                    <option value="mexican">Mexican</option>
		                                                    <option value="micronesian">Micronesian</option>
		                                                    <option value="moldovan">Moldovan</option>
		                                                    <option value="monacan">Monacan</option>
		                                                    <option value="mongolian">Mongolian</option>
		                                                    <option value="moroccan">Moroccan</option>
		                                                    <option value="mosotho">Mosotho</option>
		                                                    <option value="motswana">Motswana</option>
		                                                    <option value="mozambican">Mozambican</option>
		                                                    <option value="namibian">Namibian</option>
		                                                    <option value="nauruan">Nauruan</option>
		                                                    <option value="nepalese">Nepalese</option>
		                                                    <option value="new zealander">New Zealander</option>
		                                                    <option value="ni-vanuatu">Ni-Vanuatu</option>
		                                                    <option value="nicaraguan">Nicaraguan</option>
		                                                    <option value="nigerien">Nigerien</option>
		                                                    <option value="north korean">North Korean</option>
		                                                    <option value="northern irish">Northern Irish</option>
		                                                    <option value="norwegian">Norwegian</option>
		                                                    <option value="omani">Omani</option>
		                                                    <option value="pakistani">Pakistani</option>
		                                                    <option value="palauan">Palauan</option>
		                                                    <option value="panamanian">Panamanian</option>
		                                                    <option value="papua new guinean">Papua New Guinean</option>
		                                                    <option value="paraguayan">Paraguayan</option>
		                                                    <option value="peruvian">Peruvian</option>
		                                                    <option value="polish">Polish</option>
		                                                    <option value="portuguese">Portuguese</option>
		                                                    <option value="qatari">Qatari</option>
		                                                    <option value="romanian">Romanian</option>
		                                                    <option value="russian">Russian</option>
		                                                    <option value="rwandan">Rwandan</option>
		                                                    <option value="saint lucian">Saint Lucian</option>
		                                                    <option value="salvadoran">Salvadoran</option>
		                                                    <option value="samoan">Samoan</option>
		                                                    <option value="san marinese">San Marinese</option>
		                                                    <option value="sao tomean">Sao Tomean</option>
		                                                    <option value="saudi">Saudi</option>
		                                                    <option value="scottish">Scottish</option>
		                                                    <option value="senegalese">Senegalese</option>
		                                                    <option value="serbian">Serbian</option>
		                                                    <option value="seychellois">Seychellois</option>
		                                                    <option value="sierra leonean">Sierra Leonean</option>
		                                                    <option value="singaporean">Singaporean</option>
		                                                    <option value="slovakian">Slovakian</option>
		                                                    <option value="slovenian">Slovenian</option>
		                                                    <option value="solomon islander">Solomon Islander</option>
		                                                    <option value="somali">Somali</option>
		                                                    <option value="south african">South African</option>
		                                                    <option value="south korean">South Korean</option>
		                                                    <option value="spanish">Spanish</option>
		                                                    <option value="sri lankan">Sri Lankan</option>
		                                                    <option value="sudanese">Sudanese</option>
		                                                    <option value="surinamer">Surinamer</option>
		                                                    <option value="swazi">Swazi</option>
		                                                    <option value="swedish">Swedish</option>
		                                                    <option value="swiss">Swiss</option>
		                                                    <option value="syrian">Syrian</option>
		                                                    <option value="taiwanese">Taiwanese</option>
		                                                    <option value="tajik">Tajik</option>
		                                                    <option value="tanzanian">Tanzanian</option>
		                                                    <option value="thai">Thai</option>
		                                                    <option value="togolese">Togolese</option>
		                                                    <option value="tongan">Tongan</option>
		                                                    <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
		                                                    <option value="tunisian">Tunisian</option>
		                                                    <option value="turkish">Turkish</option>
		                                                    <option value="tuvaluan">Tuvaluan</option>
		                                                    <option value="ugandan">Ugandan</option>
		                                                    <option value="ukrainian">Ukrainian</option>
		                                                    <option value="uruguayan">Uruguayan</option>
		                                                    <option value="uzbekistani">Uzbekistani</option>
		                                                    <option value="venezuelan">Venezuelan</option>
		                                                    <option value="vietnamese">Vietnamese</option>
		                                                    <option value="welsh">Welsh</option>
		                                                    <option value="yemenite">Yemenite</option>
		                                                    <option value="zambian">Zambian</option>
		                                                    <option value="zimbabwean">Zimbabwean</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Religion</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control mother_religion select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="BAPTIST FUNDAMENTAL">Baptist Fundamental</option>
		                                                    <option value="BORN AGAIN">Born Again</option>
		                                                    <option value="IGLESIA FILIPINA INDEPENDENTE">Iglesia Filipina Independente</option>
		                                                    <option value="IGLESIA NI CRISTO">Iglesia ni Cristo</option>
		                                                    <option value="ISLAM">Islam</option>
		                                                    <option value="JEHOVA">Jehova's Witness, Mormons, IFC, etc.</option>
		                                                    <option value="NONE">None</option>
		                                                    <option value="OTHER">Other/s</option>
		                                                    <option value="CATHOLIC">Roman Catholic</option>
		                                                    <option value="SEVENTH DAY ADVENTIST">Seventh Day Adventist</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control mother_education select2">
		                                                    <option value="" selected disabled>-- select one --</option>
		                                                    <option value="COLLEGE GRADUATE">College Graduate</option>
		                                                    <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
		                                                    <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
		                                                    <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
		                                                    <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
		                                                    <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
		                                                    <option value="ILLITERATE">No Education/Illiterate</option>
		                                                    <option value="POST-GRADUATE">Post-Graduate Studies</option>
		                                                    <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
		                                                    <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
		                                                    <option value="VOCATIONAL">Vocational</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_occupation"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Work Address</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_work_add"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Tel. No.</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_tel_no"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Monthly Income</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_income"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Deceased</label></div>
		                                            <div class="col-12 col-md-9">
		                                                <select class="form-control mother_deceased select2">
		                                                    <option selected disabled>-- select one --</option>
		                                                    <option value="TRUE">Yes</option>
		                                                    <option value="FALSE">No</option>
		                                                </select>
		                                            </div>
		                                        </div>
		                                        <div class="row form-group col-md-6 motherDeceasedCause" style="display: none;">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Cause</label></div>
		                                            <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control mother_deceased_cause"></div>
		                                        </div>
		                                        <div class="row form-group col-md-6 motherDateDeceased" style="display: none;">
		                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Deceased</label></div>
		                                            <div class="col-12 col-md-9"><input type="date" class="form-control mother_date_deceased"></div>
		                                        </div>
		                                </fieldset>
                                
		                                <fieldset class="row col col-md-12">
		                                        <legend>Siblings</legend>
		                                        <div class="list_siblings">
		                                        </div>
		                                        <div class="col-12">
		                                            <button type="button" class="add_more_siblings btn btn-success btn-sm float-right">Add more</button>
		                                        </div>
		                                </fieldset>
		                            </div>
		                            <div class="tab-pane fade" id="socioEconomic" role="tabpanel" aria-labelledby="profile-tab">
		                                <div style="margin-top: 30px;">
		                                </div>
		                                <div class="row form-group col-md-6">
	                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Relationship</label></div>
	                                    <div class="col-12 col-md-9">
	                                        <select class="form-control family_rel select2">
	                                            <option value="" selected disabled>-- select one --</option>
	                                            <option value="FAIR">Fair</option>
	                                            <option value="POOR">Poor</option>
	                                            <option value="SATISFACTORY">Satisfactory</option>
	                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
	                                        </select>
	                                    </div>
                                		</div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Reputation in Community</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control family_rep select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="FAIR">Fair</option>
		                                            <option value="POOR">Poor</option>
		                                            <option value="SATISFACTORY">Satisfactory</option>
		                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control home_cond select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="FAIR">Fair</option>
		                                            <option value="POOR">Poor</option>
		                                            <option value="SATISFACTORY">Satisfactory</option>
		                                            <option value="VERY SATISFACTORY">Very Satisfactory</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Major Family Problems</label></div>
		                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John Doe" class="form-control fam_prob"></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Economic Status</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control home_cond select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="POOR">Poor (Less than 7,890/mo)</option>
		                                            <option value="LOW INCOME">Low Income (Php 7,890-15,780/mo)</option>
		                                            <option value="LOWER MIDDLE INCOME">Lower Middle Income (Php 15,780-31,560/mo)</option>
		                                            <option value="MIDDLE CLASS">Middle Class (Php 31,560-78,900/mo)</option>
		                                            <option value="UPPER MIDDLE CLASS">Upper Middle Class (Php 78,900-118,350/mo)</option>
		                                            <option value="UPPER INCOME">Upper Income (Php 118,350-157,800/mo)</option>
		                                            <option value="RICH">Rich (at least Php 157,800/mo)</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control stability select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="FREQUENT CHANGE">Frequent Change</option>
		                                            <option value="NO STABILITY">No Stability</option>
		                                            <option value="OCCASIONAL CHANGE">Occasional Change</option>
		                                            <option value="STABLE">Stable</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Comments</label></div>
		                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control comments"></textarea></div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Childhood Circumstances</label></div>
		                                    <div class="col-12 col-md-9">
		                                        <select class="form-control circumstances select2">
		                                            <option value="" selected disabled>-- select one --</option>
		                                            <option value="SAD">Sad</option>
		                                            <option value="HAPPY">Happy</option>
		                                        </select>
		                                    </div>
		                                </div>
		                                <div class="row form-group col-md-6">
		                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
		                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control explain"></textarea></div>
		                                </div>
		                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- .animated -->
    </div><!-- /#right-panel -->
    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?>


<script type="text/javascript">
    ( function ( $ ) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            // path = $.wms.getContextPath() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "GET",
                url: path,
                dataType: "json",
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };
        var __executeExternalPost = function(path, jsonObj, customLoader) {
            path = __getContext() + path;
            var d = $.Deferred();
            if(customLoader != ""){
                $("#"+customLoader).show();
                $("#"+customLoader).removeClass("hide");
            }
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                headers: {
                    // 'Content-Type': 'multipart/form-data;'
                    'Content-Type':'application/json'
                },
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
                d.resolve(data)
            }).fail(function (jqXHR, textStatus, errorThrown,request) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : request
                });
                
                if(customLoader != ""){
                    $("#"+customLoader).hide();
                    $("#"+customLoader).addClass("hide");
                }
            });
            
            return d.promise();
        };
        function GetURLParameter(sParam){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam)
                {
                    return decodeURIComponent(sParameterName[1]);
                }
            }
        }


        var client_id = GetURLParameter('client_id');

        console.log(client_id)

        console.log($.cookie("uuid"));

        $(".btn-next").unbind("click").on("click", function(){

            var identifyingData = {
                name                : $(".data_name").val(),
                interview           : $(".data_interview").val(),
                alias               : $(".alias").val(),
                trueName            : $(".true_name").val(),
                presentAddress      : $(".present_add").val(),
                permanentAdress     : $(".permanent_add").val()
            }

            console.log(identifyingData)


            
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(identifyingData),
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid")
            }

            console.log(payload)

            __executeExternalPost('http://localhost:8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                        // window.location.reload(true);
                        console.log(client_id)
                        window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

    	__executeExternalGet('http://localhost:8088/user/'+$.cookie("uuid")).done(function (result) {
        // console.log(result.departmentId)
        var officeId = result.departmentId;
        // console.log(result.uuid)
        var createdBy = result.uuid;
        $(document).ready(function() {
        // __executeExternalGet('http://localhost:8080/file/view/'+client_id).done(function (result) {
        //     console.log(result)
        //     // $('#client_photo').attr('src', "/C:/Users/mejar/Downloads/kill%20(3).jpg");
        // })
          // Listen for the file input change event
        $('#file-input').on('change', function() {

            var imgavat = $('#client_photo');

            console.log(imgavat);

            var file = this.files[0];

            console.log(file);

            // Create a FormData object to store the file data
            var formData = new FormData();

            formData.append('file', file);

            // Set up an AJAX request to send the file data to the server

            $.ajax({
              url: "http://localhost:8080/file/upload?uuid="+"00000"+"&type="+"petitioner_profile"+"&createdby="+$.cookie('uuid')+"&version=0&kind="+"petitioner_profile"+"&officeId="+$.cookie('field_office_id'), // Replace with the path to your server-side script
              type: 'POST',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                // Handle the server response here
                console.log(response);
              },
              error: function(xhr, status, error) {
                // Handle any errors here
                console.log(error);
              }
            });

            if (this.files[0]) {   
                var reader  = new FileReader();
                
                reader.readAsDataURL(this.files[0]);
                
                reader.onloadend = function () {
                    imgavat.attr('src', reader.result);
                };
            }

        });

        $('.btn-upload').on('click', function() {
            console.log("clicked")
            $('#file-input').click();
        });

        // this function is for take photo
        $(document).ready(function() {
            $('#control').hide();
            $('#video').resize(function(){
                $('#cont').height($('#video').height());
                  $('#cont').width($('#video').width());
                  $('#control').height($('#video').height()*0.1);
                  $('#control').css('top',$('#video').height()*0.9 );
                    $('#control').width($('#video').width());
                    $('#control').show();
            });
            function opencam(){
                $("#wrap").show()
                navigator.getUserMedia= navigator.getUserMedia ||   navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia ;
                if(navigator.getUserMedia)
                {
                    navigator.getUserMedia({video:true },  streamWebCam ,throwError) ;
                }

                    $('#vid').css('z-index','30');
                    $('#capture').css('z-index','20');
                    // $('#snap').unbind("click").on("click", function(){
                    //   canvas.width=video.clientWidth;
                    //   canvas.height=video.clientHeight;
                    //   context.drawImage(video,0,0);
                    //   $('#vid').css('z-index','20');
                    //   $('#capture').css('z-index','30');
                    // });
                    $('#snap').unbind("click").on("click", function(){
                        var canvas = document.getElementById('canvas');
                        var context = canvas.getContext('2d');
                        var video = document.getElementById('video');
                        context.drawImage(video, 0, 0, canvas.width=video.clientWidth, canvas.height=video.clientHeight);
                        $('#vid').css('z-index','20');
                        $('#capture').css('z-index','30');

                        $('.btn_confirm').unbind("click").on("click", function(){
                            console.log("clicked confirm ")
                            var dataURL = canvas.toDataURL();
                            var blob = dataURItoBlob(dataURL);
                              // Call a function to handle the blob object
                            handleBlob(blob);
                        });
                        // Function to convert data URL to a Blob object
                        function dataURItoBlob(dataURI) {
                          var byteString = atob(dataURI.split(',')[1]);
                          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                          var ab = new ArrayBuffer(byteString.length);
                          var ia = new Uint8Array(ab);
                          for (var i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                          }
                          return new Blob([ab], { type: mimeString });
                        }

                        function handleBlob(blob) {
                          // Create a new FormData object
                          console.log(blob);
                            var formData = new FormData();
                            // Append the blob object to the FormData object
                            formData.append('file', blob, 'image.jpg');
                            // Make an AJAX request to upload the image
                            $.ajax({
                                url: "http://localhost:8080/file/upload?uuid="+"00000"+"&type="+"petitioner_profile"+"&createdby="+$.cookie('uuid')+"&version=0&kind="+"petitioner_profile"+"&officeId="+$.cookie('field_office_id'),
                                type: 'POST',
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    success: function(response) {
                                        // Handle the server response here
                                        console.log(response);
                                        $("#success_photo_capture").show()
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 1000);
                                    },
                                    error: function(xhr, status, error) {
                                        // Handle any errors here
                                        console.log(error);
                                    }
                            });
                        }
                    });

                    $('#retake').unbind("click").on("click", function(){
                        $('#vid').css('z-index','30');
                        $('#capture').css('z-index','20');
                    });
            }
            function closecam(){
                $("#wrap").hide()
                video.pause();
                try {
                    video.srcObject = null;
                } catch (error) {
                    video.src =null;
                }
              var track = strr.getTracks()[0];  // if only one media track
              // ...
              track.stop();
            }
              var video= document.getElementById('video');
              var canvas= document.getElementById('canvas');
              var context= canvas.getContext('2d');
              var strr;
              function streamWebCam(stream){
              const  mediaSource = new MediaSource(stream);
              try {
                  video.srcObject = stream;
                } catch (error) {
                  video.src = URL.createObjectURL(mediaSource);
                }
                video.play();
                strr=stream;
              }
              function throwError(e){
                alert(e.name);
              }
            $('#open').unbind("click").on("click", function(){
              opencam();
               $('#control').show();
            });
            $('#cancel_modal').unbind("click").on("click", function(){
              closecam();
            });
        });
        // $('.btn_save').on('click', function() {
        //     console.log("clicked save")
        //     __executeExternalGet('http://localhost:8088/user/'+$.cookie("uuid")).done(function (result) {
        //         var officeId = result.departmentId;
        //         // console.log(result.uuid)
        //         var createdBy = result.uuid;

        // var imgsave = $('#imageprev');
        

        //     });
        // });
        
        });
        
    })

        $(".btn-next").unbind("click").on("click", function(){

            var identifyingData = {
                name                : $(".data_name").val(),
                interview           : $(".data_interview").val(),
                alias               : $(".alias").val(),
                trueName            : $(".true_name").val(),
                presentAddress      : $(".present_add").val(),
                permanentAdress     : $(".permanent_add").val()
            }

            console.log(identifyingData)

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(identifyingData),
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            }

            console.log(payload)

            __executeExternalPost('http://localhost:8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                        // window.location.reload(true);
                        console.log(client_id)
                        // window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

    } )( jQuery );
    </script>