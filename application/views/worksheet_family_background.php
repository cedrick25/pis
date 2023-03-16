<?php $this->load->view('templates/header.php'); ?> 

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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <a href="worksheet_socio_economic"> <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button> </a>
                                <button type="button" class="btn btn-primary btn-confirm btn-sm">Save & Exit</button>
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
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        // $(".btn-confirm").unbind("click").on("click", function(){
            
        //     var payload = {
        //         "type"                      : "SC_PR_CINV",
        //         "docketNumber"              : "",
        //         "docketSeries"              : $(".docket_series").val(),
        //         "caseloadType"              : $(".task").val(),
        //         "fieldOfficeId"             : $.cookie('field_office_id'),
        //         "clientType"                : "PAROLEE",
        //         "clientId"                  : "",
        //         "firstName"                 : "",
        //         "middleName"                : "",
        //         "lastName"                  : "",
        //         "suffixName"                : "",
        //         "fullName"                  : "",
        //         "pleaBargain"               : true,
        //         "caseClassification"        : "",
        //         "criminalCaseNumber"        : "",
        //         "offense"                   : "",
        //         "courtOfOrigin"             : "",
        //         "courtOrderDate"            : "",
        //         "investigatingOfficer"      : $(".inv_off").val(),
        //         "receivedDateByPPO"         : $(".dr_ppo").val(),
        //         "sentence"                  : "",
        //         "manualDocket"              : true,
        //         "referral"                  : true,
        //         "referralData"              : "",
        //         "remarks"                   : "",
        //         "probationStartDate"        : "",
        //         "probationYear"             : "",
        //         "probationMonth"            : "",
        //         "probationDay"              : "",
        //         "reportType"                : "",
        //         "prisonName"                : "",
        //         "investigationReportSubmittedDate"          :"",
        //         "ppoRecommendation"         : "",
        //         "recommendationState"       : "",
        //         "dateOfTransfer"            : "",
        //         "transferredOfficeId"       : "",
        //         "dateOrderReceivedFromTheBoard"             : "",
        //         "boardOrder"                : "",
        //         "boardOrderStatus"          : "",
        //         "referringOfficeId"         : $(".ref_office").val(),
        //         "dateCICAR"                 : $(".date_cic").val(),
        //         "supervisingOfficer"        : "",
        //         "probationEndDate"          : "",
        //         "referralType"              : "",
        //         "dateReportSubmittedToTheBoard"             : "",
        //         "dateReportSubmittedToRDForTransferToOtherPPO": "",
        //         "resolutionType"            : "",
        //         "dateResolutionFromTheBoard": "",
        //         "dateResolutionFromTheRDForTransfer"        : "",
        //         "createdBy"                 : "",
        //         "updatedBy"                 : "",
        //         "legalAge"                  : true,
        //         "militaryCourt"             : true,
        //         "supervisionStartDate"      : "",
        //         "supervisionEndDate"        : ""
        //     }
        //     console.log(payload)
        //     __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
        //         console.log(result);
        //         if (result.status != "ERROR") {
        //             $(".form-control").val('');
        //             $('#success').show();
        //             setTimeout(function () {
        //                 $('#success').hide();
        //                 setTimeout(function () {
        //                     window.location.reload(true);
        //                 }, 500);
        //             }, 2000);
        //         }else{
        //             alert("failed")
        //         }
        //     })
        // })
   
        //     var __select = function(){
        //         $('.ref_office').empty();

        //         __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
        //             console.log(result)
        //             if (result.status != "ERROR") {
        //                 $('.ref_office').append("<option selected disabled> - - Select Field Office - - </option>");
        //                 result.forEach(function(data){
        //                     $('.ref_office').append(
        //                         "<option value="+data.id+">"+data.name+"</option>");
        //                 });

        //             } else {
        //                 console.log("failed fetching docket list")
        //             }
        //         })
        //     }
        //     __select();

        // $(".list_siblings").html(`
        //     <div class="list_sibling">
        //         <div class="row form-group col-md-12">
        //             <div class="col-3 col-md-2"><input type="text" class="form-control sibling_name" placeholder="Sibling's Name"></div>
        //             <div class="col-3 col-md-2"><input type="text" class="form-control relationship" placeholder="Relationship"></div>
        //             <div class="col-3 col-md-2"><input type="text" class="form-control age" placeholder="Age"></div>
        //             <div class="col-3 col-md-2">
        //                 <select class="form-control sibling_sex select2">
        //                     <option value="" selected disabled>Sex</option>
        //                     <option value="FEMALE">Female</option>
        //                     <option value="MALE">Male</option>
        //                     <option value="LGBT">LGBT</option>
        //                 </select>
        //             </div>
        //             <div class="col-3 col-md-2">
        //                 <select class="form-control sibling_education select2">
        //                     <option value="" selected disabled>Education</option>
        //                     <option value="COLLEGE GRADUATE">College Graduate</option>
        //                     <option value="COLLEGE UNDERGRADUATE">College Undergraduate</option>
        //                     <option value="ELEMENTARY GRADUATE">Elementary Graduate</option>
        //                     <option value="ELEMENTARY UNDERGRADUATE">Elementary Undergraduate</option>
        //                     <option value="JUNIOR HS GRADUATE">Junior High School Graduate</option>
        //                     <option value="JUNIOR HS UNDERGRADUATE">Junior High School Undergraduate</option>
        //                     <option value="ILLITERATE">No Education/Illiterate</option>
        //                     <option value="POST-GRADUATE">Post-Graduate Studies</option>
        //                     <option value="SENIOR HS GRADUATE">Senior High School Graduate</option>
        //                     <option value="SENIOR HS UNDERGRADUATE">Senior High School Undergraduate</option>
        //                     <option value="VOCATIONAL">Vocational</option>
        //                 </select>
        //             </div>
        //             <div class="col-3 col-md-2"><input type="text" class="form-control sibling_occupation" placeholder="Occupation"></div>
        //         </div>
        //     </div>`
        // );

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

    } )( jQuery );
    </script>

</body>

</html>