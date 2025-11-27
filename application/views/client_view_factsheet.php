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
    .spinner {
        border: 8px solid #f3f3f3; /* Light gray */
        border-top: 8px solid black; /* Black */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }
    /* Spinner animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .profile-container {
        min-width: 1530px;
        min-height: 300px;
        margin: auto;
        background-color: #e1efff;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .name-container {
        width: 1200px; 
        height: 50px;
        flex: 1;
        padding: 10px;
    }
    .left-side {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .img-body {
         width: 300px;
        height: 300px;
        display: block;
        padding-top: 5px;
    }
    .img-cont {
        width: 200px;
        height: 200px;
        margin: auto;
        align-items: flex-start;
        background-color: #e7e9eb;
    }
    .btn-cont {
        width: 250px;
        height: 80px;
        margin: auto;
        margin-top: 10px;
        display: block;
        align-items: center;
        padding-top: 5px;
    }
    .img-cont img {
        width: 100%;
        height: 175px;
        display: block;
    }
    .btn-take {
        display: block;
        width: 100%;
        height: 30px;
        border-radius: 0;
        border: 0px;
        color: #007bff;
        font-weight: bold;
    }
    .name-header {
        background-color: transparent;
        padding: 2px 12px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
    }
    .name-text {
        color: #333;
    }
    .name-actions a {
        font-size: 14px;
        color: #007bff;
        text-decoration: none;
        margin-left: 10px;
    }
    .name-actions a:hover {
        text-decoration: underline;
    }
    .info-body {
        width: 1530px;
        height: 700px;
        margin: auto;
    }
    .info-nav {
        background-color: transparent;
        padding: 2px 12px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
    }
    .info-action {
        width: 1530px;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .info-details {
        width: 1500px;
        height: 650px;
        margin: auto;
    }
    .fingerprint-box {
        width: 225px; 
        height: 225px; 
        border: 1px solid #dbdbdb; 
        margin: auto; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: flex-start;
    }
</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    <div class="modal fade" id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered" role="document" style="max-width: 703px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Capture Camera</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body col-md-12">
                     <div class="container-fluid" id='camcam'>
                      <a class='btn btn-block btn-primary text-white col-sm-12 col-md-12' id='open'> Open cam</a>
                      <br><br>
                      <div class="row">
                        <div class="col" style="text-align: center;">
                          <div id="wrap">
                          <div id='cont'>
                            <div id="vid" class='son' >
                          <video id='video'></video>
                            </div>
                            <div id="capture" class='son'>
                          <canvas id='canvas'></canvas>
                          <canvas id='blank' style='display:none;'></canvas>
                            </div>
                            <div id="control">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-6"><a id='retake' class='btn btn-block m-1 hov'><i class="fa fa-refresh"></i></a></div>
                                        <div class="col-md-6"><a id='snap' class='btn btn-block m-1 hov'><i class="fa fa-camera"></i></a></div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="alert alert-success" role="alert" id="success_photo_capture" style="display:none">
                    <i class="fa fa-check"></i>
                        Photo Capture Successfully Uploaded
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancel_modal" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="uploadPicModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered" role="document" style="max-width: 703px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Upload Profile</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check"></i>
                        Uploaded Successfully
                </div>
                <div class="modal-body col-md-12">
                    <input type="file" id="file-input">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="dismissedModalUploadPic">Cancel</button>
                    <button type="button" class="btn btn-primary uploadPhotoBtn">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addReportingDateModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 1200px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Add Reporting Date</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check"></i>
                        Added Successfully
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 700px; height: 500px; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control reportingDate"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Field Office:</label></div>
                                <div class="col-12 col-md-8"><label class=" form-control-label">Marikina City</label></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Remarks:</label></div>
                                <div class="col-12 col-md-8"><textarea class="form-control remarksReportingDate"></textarea></div>
                            </div>
                        </div>
                    </div>
                    <div class="validateClientContainer" style="width: 500px; height: 500px; flex: 1;">
                        <div class="validateClientHeader" style="width: 100%; height: 50px; padding: 10px; display: flex; align-items: center; justify-content: center;">
                            <span style="font-weight: bold; color: #007bff;"> Validate Client: </span>
                        </div>
                        <div class="takeFingerPrintContainer" style="width: 100%; height: 150px; padding: 10px; align-items: center; margin: auto;">
                            <button type="button" class="btn btn-info" style="width: 100%; border-radius: 3px;"><i class="fa fa-hand-o-up" aria-hidden="true"></i>  Take Fingerprint</button>
                        </div>
                        <div class="takePhotoContainer" style="width: 100%; height: 150px; padding: 10px; align-items: center; margin: auto;">
                            <button type="button" class="btn btn-info" style="width: 100%; border-radius: 3px;"><i class="fa fa-picture-o" aria-hidden="true"></i>  Take Photo</button> 
                        </div>
                        <div class="uploadAttachmentContainer" style="width: 100%; height: 150px; padding: 10px; align-items: center; margin: auto;">
                            <button type="button" class="btn btn-info" style="width: 100%; border-radius: 3px;"><i class="fa fa-upload" aria-hidden="true"></i>  Take Photo</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary saveReportingDate">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addOtherDocumentModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 703px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Notes/Other Documents</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload_other" style="display:none">
                    <i class="fa fa-check"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger" role="alert" id="failed_upload_other" style="display:none">
                    <i class="fa fa-times"></i>
                        Upload Failed! Please Check Your File Before Uploading.
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 100%; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Received:</label></div>
                                <div class="col-12 col-md-8"><input type="date" class="form-control dateReceived"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Name:</label></div>
                                <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="" class="form-control nameOthers"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Remarks:</label></div>
                                <div class="col-12 col-md-8"><textarea class="form-control remarksOther"></textarea></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Attachment:</label></div>
                                <div class="col-12 col-md-8"><input type="file" id="file-input-other"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary saveOtherDocument">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="uploadFingerprintModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 1200px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Upload Fingerprint</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload_fingerprint" style="display:none">
                    <i class="fa fa-check"></i>
                        Added Successfully
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="fingerprints" style="width: 1200px; height: 300px; display: block;">
                        <div class="fingerprints-action" style="width: 1160px; height: 40px; display: flex; justify-content: end; padding-right: 20px; align-items: center;">
                            <button type="button" class="btn btn-info btn-sm btn-refreshFingerprint mx-2" style="border-radius: 5px">
                                <i class="fa fa-refresh" aria-hidden="true"></i> Refresh
                            </button>
                        </div>
                        <div class="fingerprints-details" style="width: 1160px; height: 260px; display: flex; align-items: center;">
                            <div class="fingerprint-box">
                                <input type="file" id="rthumb" style="display: none;">
                                <img class="align-content" id="rthumb_fingerprint" src="images/fingerprintlogo.jpg" style="width: 100%; height: 90%; cursor: pointer;">
                                <span class="name-text" style="font-weight: bold">1. Right Thumb</span>
                            </div>
                            <div class="fingerprint-box">
                                <input type="file" id="rindex" style="display: none;">
                                <img class="align-content" id="rindex_fingerprint" src="images/fingerprintlogo.jpg" style="width: 100%; height: 90%; cursor: pointer;">
                                <span class="name-text" style="font-weight: bold">1. Right Index</span>
                            </div>
                            <div class="fingerprint-box">
                                <input type="file" id="rmiddle" style="display: none;">
                                <img class="align-content" id="rmiddle_fingerprint" src="images/fingerprintlogo.jpg" style="width: 100%; height: 90%; cursor: pointer;">
                                <span class="name-text" style="font-weight: bold">1. Right Middle</span>
                            </div>
                            <div class="fingerprint-box">
                                <input type="file" id="rring" style="display: none;">
                                <img class="align-content" id="rring_fingerprint" src="images/fingerprintlogo.jpg" style="width: 100%; height: 90%; cursor: pointer;">
                                <span class="name-text" style="font-weight: bold">1. Right Ring</span>
                            </div>
                            <div class="fingerprint-box">
                                <input type="file" id="rlittle" style="display: none;">
                                <img class="align-content" id="rlittle_fingerprint" src="images/fingerprintlogo.jpg" style="width: 100%; height: 90%; cursor: pointer;">
                                <span class="name-text" style="font-weight: bold">1. Right Little</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary saveFingerPrints">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="investigationUploadModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 703px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Investigation Documents</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload_investigation" style="display:none">
                    <i class="fa fa-check"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger" role="alert" id="failed_upload_investigation" style="display:none">
                    <i class="fa fa-times"></i>
                        Upload Failed! Please Check Your File Before Uploading.
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 100%; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Investigating Officer:</label></div>
                                <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="" class="form-control investigatingOfficer"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Attachment:</label></div>
                                <div class="col-12 col-md-8"><input type="file" id="file-input-investigation"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary saveInvestigationDocument">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="supervisionUploadModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 703px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Supervision Documents</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_upload_supervision" style="display:none">
                    <i class="fa fa-check"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger" role="alert" id="failed_upload_supervision" style="display:none">
                    <i class="fa fa-times"></i>
                        Upload Failed! Please Check Your File Before Uploading.
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 100%; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Investigating Officer:</label></div>
                                <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="" class="form-control investigatingOfficerSupervision"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Attachment:</label></div>
                                <div class="col-12 col-md-8"><input type="file" id="file-input-supervision"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary saveSupervisionDocument">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    
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
                            <li><a href="client_list">Client List</a></li>
                            <li class="active">Fact Sheet</li>
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
                                <strong class="card-title">Fact Sheet</strong>
                                <!-- <div class="spinner ml-auto" role="status" aria-hidden="true" id="spinner_update"></div> -->
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Updated  
                                </div>
                            </div>
                            <div class="profile-container">
                                <div class="left-side">
                                    <div class="name-container">
                                        <div class="name-header">
                                            <span class="name-text" id="petitionerName"></span>
                                            <div class="name-actions">
                                                <a href="#" class="toggle-link"><i class="fa fa-plus-circle"></i> Show</a>
                                                <a href="#" class="edit-link"><i class="fa fa-edit"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="img-body">
                                    <div class="img-cont">
                                        <img class="align-content" id="client_photo" src="images/nopic.jpg">
                                        <button type="button" data-toggle="modal" data-target="#cameraModal" class="btn btn-sm btn-take">
                                            <i class="fa fa-camera" aria-hidden="true"></i> Take Photo
                                        </button>
                                    </div>
                                    <div class="btn-cont">
                                        <button type="button" data-toggle="modal" data-target="#uploadPicModal" class="btn btn-primary btn-sm btn-block btn-photo">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i> Upload Photo
                                        </button>
                                        <button type="button" class="btn btn-danger btn-sm btn-block btn-fingerprint">
                                            <i class="fa fa-upload" aria-hidden="true"></i> Upload Fingerprint
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="info-body" style="margin-top: 40px">
                                <div class="info-nav">
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#" data-toggle="tab" id="investigationTab">Investigation</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="supervisionTab">Supervision</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="rehabilitationTab">Rehabilitation</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="reportingDateTab">Reporting Dates</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="otherDocumentsTab">Notes/Other Documents</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="taskListTab">Task List</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-toggle="tab" id="docketListTab">Docket List</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="info-action">
                                    <button class="btn btn-sm btn-primary btn-addInvestigation" type="submit"><i class="fa fa-plus-circle"></i>  Add Investigation Document/Report</button>
                                </div>
                                <div class="info-details">
                                    <div class="tab-pane fade show active" id="investigationContent">
                                        <table id="investigationTableStart" class="table table-bordered table_head" style="max-width: 100%;">
                                            <thead>
                                                <th>#</th>
                                                <th>Reports</th>
                                                <th>Investigating Officer</th>
                                                <th>Actions</th>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm_update btn-sm float-right">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/pisJs/clientViewFactSheet.js"></script>


</body>

</html>