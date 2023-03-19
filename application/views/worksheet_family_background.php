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
                            <li class="active">Family Background</li>
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
                                <strong class="card-title">Identification Data</strong>
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
                                        <a class="nav-link active famBg" href="#">Family Background</a>
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
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
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
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bprovince"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth City/Municipality</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bcity"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place (Others)</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder=" " class="form-control bplace_others"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Identifying Marks</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control identifyingMarks select2">
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
                                        <select class="form-control parentsRelation select2">
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
                            <div class="card-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
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
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        $(".add_more_siblings").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".list_siblings").append(`
            <div class="list_sibling">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control sibling_name" placeholder="Sibling's Name"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control relationship" placeholder="Relationship"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control age" placeholder="Age"></div>
                    <div class="col-3 col-md-2">
                        <select class="form-control sibling_sex select2">
                            <option value="" selected disabled>Sex</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                            <option value="LGBT">LGBT</option>
                        </select>
                    </div>
                    <div class="col-3 col-md-2">
                        <select class="form-control sibling_education select2">
                            <option value="" selected disabled>Education</option>
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
                    <div class="col-3 col-md-2"><input type="text" class="form-control sibling_occupation" placeholder="Occupation"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.list_siblings').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        var fatherDeceased = $('.father_deceased').val()
        // console.log(fatherDeceased)
        if (fatherDeceased == "FALSE"){
            $(".fatherDateDeceased").hide();
            $(".fatherDeceasedCause").hide();
        } else {
            $(".fatherDateDeceased").hide();
            $(".fatherDeceasedCause").hide();
        }
        $('.father_deceased').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.father_deceased').val())
            if ($('.father_deceased').val() == "TRUE") {
                $(".fatherDateDeceased").show();
                $(".fatherDeceasedCause").show();
            } else {
                $(".fatherDateDeceased").hide();
                $(".fatherDeceasedCause").hide();
            }
        });

        var motherDeceased = $('.mother_deceased').val()
        // console.log(motherDeceased)
        if (motherDeceased == "FALSE"){
            $(".motherDateDeceased").hide();
            $(".motherDeceasedCause").hide();
        } else {
            $(".motherDateDeceased").hide();
            $(".motherDeceasedCause").hide();
        }
        $('.mother_deceased').change(function(){
            // cb = $(this);
            // cb.val(cb.prop('checked'));
            console.log($('.mother_deceased').val())
            if ($('.mother_deceased').val() == "TRUE") {
                $(".motherDateDeceased").show();
                $(".motherDeceasedCause").show();
            } else {
                $(".motherDateDeceased").hide();
                $(".motherDeceasedCause").hide();
            }
        });

        $(".btn-next").unbind("click").on("click", function(){

            const siblings = [];
            const sibling_name = $(".sibling_name");
            const relationship = $(".relationship");
            const age = $(".age");
            const sibling_sex = $(".sibling_sex");
            const sibling_education = $(".sibling_education");
            const sibling_occupation = $(".sibling_occupation");

            for(var i = 0; i < sibling_name.length; i++){
                
                const list = {};
                list.sibling_name = $(sibling_name[i]).val();
                list.relationship = $(relationship[i]).val();
                list.age = $(age[i]).val();
                list.sibling_sex = $(sibling_sex[i]).val();
                list.sibling_education = $(sibling_education[i]).val();
                list.sibling_occupation = $(sibling_occupation[i]).val();
                siblings.push(list);
            }


            var familyBG = {

                siblings            : siblings,
                sex                 : $(".sex").val(),
                civilStatus         : $(".civilStatus").val(),
                citizenship         : $(".citizenship").val(),
                religion            : $(".religion").val(),
                bday                : $(".bday").val(),
                bplace              : $(".bplace").val(),
                bprovince           : $(".bprovince").val(),
                bcity               : $(".bcity").val(),
                bplaceOthers        : $(".bplace_others").val(),
                identifyingMarks    : $(".identifyingMarks").val(),
                handicap            : $(".handicap").val(),
                desc                : $(".desc").val(),
                parentsRelationship : $(".parentsRelation").val(),
                fatherName          : $(".father_name").val(),
                fatherBday          : $(".father_bday").val(),
                fatherBplace        : $(".father_bplace").val(),
                fatherAdd           : $(".father_add").val(),
                fatherCitizenship   : $(".father_citizenship").val(),
                fatherReligion      : $(".father_religion").val(),
                fatherEducation     : $(".father_education").val(),
                fatherOccupation    : $(".father_occupation").val(),
                fatherWork_add      : $(".father_work_add").val(),
                fatherTelNo         : $(".father_tel_no").val(),
                fatherIncome        : $(".father_income").val(),
                fatherDeceased      : $(".father_deceased").val(),
                fatherDeceasedCause : $(".father_deceased_cause").val(),
                fatherDateDeceased  : $(".father_date_deceased").val(),

                motherName          : $(".mother_name").val(),
                motherBday          : $(".mother_bday").val(),
                motherBplace        : $(".mother_bplace").val(),
                motherAdd           : $(".mother_add").val(),
                motherCitizenship   : $(".mother_citizenship").val(),
                motherReligion      : $(".mother_religion").val(),
                motherEducation     : $(".mother_education").val(),
                motherOccupation    : $(".mother_occupation").val(),
                motherWork_add      : $(".mother_work_add").val(),
                motherTelNo         : $(".mother_tel_no").val(),
                motherIncome        : $(".mother_income").val(),
                motherDeceased      : $(".mother_deceased").val(),
                motherDeceasedCause : $(".mother_deceased_cause").val(),
                motherDateDeceased  : $(".mother_date_deceased").val(),

            }

            console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(familyBG),
            "type"                      : "familyBackground",
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
                            window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })
        

        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/familyBackground/'+client_id).done(function (result) {
            console.log("==========")
            console.log(result)
            console.log("==========")

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    console.log(JSON.parse(result.jsonData))

                    const familybg = JSON.parse(result.jsonData)

                    console.log(familybg)

                    $(".sex").val(JSON.parse(result.jsonData).sex).trigger("change");
                    $(".civilStatus").val(JSON.parse(result.jsonData).civilStatus).trigger("change");
                    $(".citizenship").val(JSON.parse(result.jsonData).citizenship).trigger("change");
                    $(".religion").val(JSON.parse(result.jsonData).religion).trigger("change");
                    $(".bday").val(JSON.parse(result.jsonData).bday);
                    $(".bplace").val(JSON.parse(result.jsonData).bplace).trigger("change");
                    $(".bprovince").val(JSON.parse(result.jsonData).bprovince);
                    $(".bcity").val(JSON.parse(result.jsonData).bcity);
                    $(".bplace_others").val(JSON.parse(result.jsonData).bplace);
                    $(".identifyingMarks").val(JSON.parse(result.jsonData).identifyingMarks).trigger("change");
                    $(".handicap").val(JSON.parse(result.jsonData).handicap);
                    $(".desc").val(JSON.parse(result.jsonData).desc);
                    $(".parentsRelation").val(JSON.parse(result.jsonData).parentsRelationship).trigger("change");
                    $(".father_name").val(JSON.parse(result.jsonData).fatherName);
                    $(".father_bday").val(JSON.parse(result.jsonData).fatherBday);
                    $(".father_bplace").val(JSON.parse(result.jsonData).fatherBplace).trigger("change");
                    $(".father_add").val(JSON.parse(result.jsonData).fatherAdd);
                    $(".father_citizenship").val(JSON.parse(result.jsonData).fatherCitizenship).trigger("change");
                    $(".father_religion").val(JSON.parse(result.jsonData).fatherReligion).trigger("change");
                    $(".father_education").val(JSON.parse(result.jsonData).fatherEducation).trigger("change");
                    $(".father_occupation").val(JSON.parse(result.jsonData).fatherOccupation);
                    $(".father_work_add").val(JSON.parse(result.jsonData).fatherWork_add);
                    $(".father_tel_no").val(JSON.parse(result.jsonData).fatherTelNo);
                    $(".father_income").val(JSON.parse(result.jsonData).fatherIncome);
                    $(".father_deceased").val(JSON.parse(result.jsonData).fatherDeceased).trigger("change");
                    $(".father_deceased_cause").val(JSON.parse(result.jsonData).fatherDeceasedCause);
                    $(".father_date_deceased").val(JSON.parse(result.jsonData).fatherDateDeceased);
                    $(".mother_name").val(JSON.parse(result.jsonData).motherName);
                    $(".mother_bday").val(JSON.parse(result.jsonData).motherBday);
                    $(".mother_bplace").val(JSON.parse(result.jsonData).motherBplace).trigger("change");
                    $(".mother_add").val(JSON.parse(result.jsonData).motherAdd);
                    $(".mother_citizenship").val(JSON.parse(result.jsonData).motherCitizenship);
                    $(".mother_religion").val(JSON.parse(result.jsonData).motherReligion).trigger("change");
                    $(".mother_education").val(JSON.parse(result.jsonData).motherEducation).trigger("change");
                    $(".mother_occupation").val(JSON.parse(result.jsonData).motherOccupation);
                    $(".mother_work_add").val(JSON.parse(result.jsonData).motherWork_add);
                    $(".mother_tel_no").val(JSON.parse(result.jsonData).motherTelNo);
                    $(".mother_income").val(JSON.parse(result.jsonData).motherIncome);
                    $(".mother_deceased").val(JSON.parse(result.jsonData).motherDeceased).trigger("change");
                    $(".mother_deceased_cause").val(JSON.parse(result.jsonData).motherDeceasedCause);
                    $(".mother_date_deceased").val(JSON.parse(result.jsonData).motherDateDeceased);

                    familybg.siblings.forEach(function(data){
                        console.log(data);
                        $(".list_siblings").append(`
                        <div class="list_sibling">
                            <div class="row form-group col-md-12">
                                <div class="col-3 col-md-2"><input type="text" class="form-control sibling_name" placeholder="Sibling's Name" value="${data.sibling_name}"></div>
                                <div class="col-3 col-md-2"><input type="text" class="form-control relationship" placeholder="Relationship" value="${data.relationship}"></div>
                                <div class="col-3 col-md-2"><input type="text" class="form-control age" placeholder="Age" value="${data.age}"></div>
                                <div class="col-3 col-md-2">
                                    <select class="form-control sibling_sex select2">
                                        <option value="" selected disabled>Sex</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                        <option value="LGBT">LGBT</option>
                                    </select>
                                </div>
                                <div class="col-3 col-md-2">
                                    <select class="form-control sibling_education select2">
                                        <option value="" selected disabled>Education</option>
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
                                <div class="col-3 col-md-2"><input type="text" class="form-control sibling_occupation" placeholder="Occupation" value="${data.sibling_occupation}"></div>
                            </div>
                            <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                        </div>`
                        )
                        setTimeout(function () {
                        $(".sibling_sex").val(data.sibling_sex).trigger("change");
                        }, 500);
                        setTimeout(function () {
                        $(".sibling_education").val(data.sibling_education).trigger("change");
                        }, 500);
                    });
                }else{
                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){

            const siblings = [];
            const sibling_name = $(".sibling_name");
            const relationship = $(".relationship");
            const age = $(".age");
            const sibling_sex = $(".sibling_sex");
            const sibling_education = $(".sibling_education");
            const sibling_occupation = $(".sibling_occupation");

            for(var i = 0; i < sibling_name.length; i++){
                
                const list = {};
                list.sibling_name = $(sibling_name[i]).val();
                list.relationship = $(relationship[i]).val();
                list.age = $(age[i]).val();
                list.sibling_sex = $(sibling_sex[i]).val();
                list.sibling_education = $(sibling_education[i]).val();
                list.sibling_occupation = $(sibling_occupation[i]).val();
                siblings.push(list);
            }


            var familyBG = {

                siblings            : siblings,
                sex                 : $(".sex").val(),
                civilStatus         : $(".civilStatus").val(),
                citizenship         : $(".citizenship").val(),
                religion            : $(".religion").val(),
                bday                : $(".bday").val(),
                bplace              : $(".bplace").val(),
                bprovince           : $(".bprovince").val(),
                bcity               : $(".bcity").val(),
                bplaceOthers        : $(".bplace_others").val(),
                identifyingMarks    : $(".identifyingMarks").val(),
                handicap            : $(".handicap").val(),
                desc                : $(".desc").val(),
                parentsRelationship : $(".parentsRelation").val(),
                fatherName          : $(".father_name").val(),
                fatherBday          : $(".father_bday").val(),
                fatherBplace        : $(".father_bplace").val(),
                fatherAdd           : $(".father_add").val(),
                fatherCitizenship   : $(".father_citizenship").val(),
                fatherReligion      : $(".father_religion").val(),
                fatherEducation     : $(".father_education").val(),
                fatherOccupation    : $(".father_occupation").val(),
                fatherWork_add      : $(".father_work_add").val(),
                fatherTelNo         : $(".father_tel_no").val(),
                fatherIncome        : $(".father_income").val(),
                fatherDeceased      : $(".father_deceased").val(),
                fatherDeceasedCause : $(".father_deceased_cause").val(),
                fatherDateDeceased  : $(".father_date_deceased").val(),

                motherName          : $(".mother_name").val(),
                motherBday          : $(".mother_bday").val(),
                motherBplace        : $(".mother_bplace").val(),
                motherAdd           : $(".mother_add").val(),
                motherCitizenship   : $(".mother_citizenship").val(),
                motherReligion      : $(".mother_religion").val(),
                motherEducation     : $(".mother_education").val(),
                motherOccupation    : $(".mother_occupation").val(),
                motherWork_add      : $(".mother_work_add").val(),
                motherTelNo         : $(".mother_tel_no").val(),
                motherIncome        : $(".mother_income").val(),
                motherDeceased      : $(".mother_deceased").val(),
                motherDeceasedCause : $(".mother_deceased_cause").val(),
                motherDateDeceased  : $(".mother_date_deceased").val(),

            }

            console.log(familyBG)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(familyBG),
            "type"                      : "familyBackground",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid")
            }

            console.log(payload)


            __executeExternalPost('http://localhost:8000/worksheet/updatePetitioner/familyBackground/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        $(".idenData").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id='+client_id;
                        }, 500);
                });
        });
        $(".priorRec").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id='+client_id;
                        }, 500);
                });
        });
        $(".presOff").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                });
        });

        // $(".famBg").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://localhost/pis/worksheet_family_background?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".socioEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_socio_economic?client_id='+client_id;
                        }, 500);
                });
        });
        $(".resEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_residence_economic?client_id='+client_id;
                        }, 500);
                });
        });
        $(".spouseChild").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id='+client_id;
                        }, 500);
                });
        });
        $(".educHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".empHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_employment_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".envFac").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://localhost/pis/worksheet_environmental_factor?client_id='+client_id;
                        }, 500);
                });
        });




    } )( jQuery );
    </script>

</body>

</html>