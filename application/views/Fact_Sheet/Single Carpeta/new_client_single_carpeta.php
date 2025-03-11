<?php $this->load->view('templates/header.php'); ?> 
<style>
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
                            <li><a href="client_list_single_carpeta">Fact Sheet</a></li>
                            <li><a href="client_list_single_carpeta">PDL</a></li>
                            <li class="active">New</li>
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
                            <div class="card-header d-flex align-items-center">
                                <strong class="card-title">Create PDL Details</strong>
                                <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Criminal Case Number" class="form-control criminal_case_number"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prison Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Prison Number" class="form-control prison_number"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter First Name" class="form-control firstName"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3">
                                            <label class="form-check-label" for="mNameCheck">Middle Name</label>
                                            <!-- <div class="form-check">
                                                <input type="checkbox" class="form-check-input middleNameCheck" id="mNameCheck" style="width: 12px; height: 12px;">
                                                <label class="form-check-label italic-font small-font" for="mNameCheck">No Middle Name</label>
                                            </div> -->
                                        </div>
                                        <div class="col-12 col-md-9">
                                            <input type="text" name="text-input" placeholder="Enter Middle Name" class="form-control middleName form_capitalized">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Last Name" class="form-control lastName"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Suffix" class="form-control suffix"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alias</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Alias" class="form-control alias"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Prison Name</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Prison Name" class="form-control prison_name"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">File Number</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter File Number" class="form-control file_number"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Location</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Location" class="form-control location"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Civil Status</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control civil_status select2">
                                                <option value="" selected disabled>Select</option>
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
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control gender select2">
                                                <option selected value="none" disabled>Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthdate</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control birthdate"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Birthplace" class="form-control b_place"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Nationality</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control nationality select2">
                                                <option value="" selected disabled>Select</option>
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
                                            <select class="form-control religion select2">
                                                <option value="" selected disabled>Select</option>
                                                <option value="BAPTIST FUNDAMENTAL">Baptist Fundamental</option>
                                                <option value="BORN AGAIN">Born Again</option>
                                                <option value="IGLESIA FILIPINA INDEPENDENTE">Iglesia Filipina Independente</option>
                                                <option value="IGLESIA NI CRISTO">Iglesia ni Cristo</option>
                                                <option value="ISLAM">Islam</option>
                                                <option value="JEHOVA">Jehova's Witness, Mormons, IFC, etc.</option>
                                                <option value="NONE">None</option>
                                                <option value="OTHER">Other/s</option>
                                                <option value="PROTESTANTS">Protestants</option>
                                                <option value="CATHOLIC">Roman Catholic</option>
                                                <option value="SEVENTH DAY ADVENTIST">Seventh Day Adventist</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Educational Attainment</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Educational Attainment" class="form-control educational_attainment"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Occupation" class="form-control occupation"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Address" class="form-control address"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">TSD PO</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter PO" class="form-control tsd_po"></div>
                                    </div>
                                </div>                     
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div class="row col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                <div class="card" id="sentence_card" style="border-radius: 10px;">
                                                    <div class="card-header" style="background: transparent;">
                                                        <!-- <strong>Sentence</strong> -->
                                                        <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                                    </div>
                                                    <div class="card-body request_card">
                                                        <div id="request_body_0">
                                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Request Type</label></div>
                                                                    <div class="col-12 col-md-9">
                                                                        <select class="form-control request_type select2">
                                                                            <option value="" selected disabled>Select</option>
                                                                            <option value="Request to conduct PPIR">Request to conduct PPIR</option>
                                                                            <option value="Request to conduct PECIR">Request to conduct PECIR</option>
                                                                            <option value="Request for transmittal">Request for transmittal</option>
                                                                            <option value="Request for transfer">Request for transfer</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Report</label></div>
                                                                    <div class="col-12 col-md-9">
                                                                        <select class="form-control type_report select2">
                                                                            <option value="" selected disabled>Select</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col" style="padding-bottom: 40px;">
                                                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Indorsement Date</label></div>
                                                                    <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control indorsement_date"></div>
                                                                </div>
                                                                <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Forwarded to BPP</label></div>
                                                                    <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Address" class="form-control date_forwarded_bpp"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 transmittal_body">
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Emailed to Field Office</label></div>
                                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control date_emailed_to_fo"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 date_received_body">
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date Result from Field Office</label></div>
                                        <div class="col-12 col-md-9"><input type="date" name="text-input" placeholder="Enter Occupation" class="form-control date_result_from_fo"></div>
                                    </div>
                                </div>
                                <div class="form-row col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-col">
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Enter Remarks" class="form-control pdl_remarks"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->
    <?php $this->load->view('templates/footer.php'); ?> 
    <!-- Right Panel -->

    <script src="assets/js/pisJs/Fact_Sheet/Single_Carpeta/client_create_single_carpeta.js">

    </script>

</body>

</html>