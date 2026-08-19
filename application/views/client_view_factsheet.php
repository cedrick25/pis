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
        font-weight: 600;
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

    /* Fact sheet UX (scoped): loaders, toasts, modals, responsive shell */
    .page-client-factsheet .fs-profile-outer {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    .page-client-factsheet .fs-tab-panel-wrap {
        min-height: 8rem;
    }
    .page-client-factsheet .fs-panel-loader {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.88);
        border-radius: 0.25rem;
        pointer-events: none;
    }
    .page-client-factsheet .fs-panel-loader.is-hidden {
        display: none !important;
    }
    @keyframes fsToastIn {
        from {
            opacity: 0;
            transform: translateY(-0.35rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .page-client-factsheet .fs-toast-host {
        position: fixed;
        top: 5.5rem;
        right: 1rem;
        left: 1rem;
        z-index: 10050;
        max-width: 24rem;
        margin-left: auto;
        pointer-events: none;
    }
    @media (min-width: 576px) {
        .page-client-factsheet .fs-toast-host {
            left: auto;
        }
    }
    .page-client-factsheet .fs-toast-host .alert {
        pointer-events: auto;
        margin-bottom: 0.5rem;
        box-shadow: 0 0.35rem 1.25rem rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 0.375rem;
        animation: fsToastIn 0.28s ease-out;
    }
    .page-client-factsheet .fs-dynamic-toast.alert {
        display: none;
        position: relative;
    }
    .page-client-factsheet .modal-content > .alert.fs-modal-alert {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-bottom: 0;
        border: none;
        border-radius: 0.375rem;
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06);
    }
    .page-client-factsheet .modal.fade .modal-dialog {
        transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease-out;
    }
    .page-client-factsheet .modal-content {
        border: none;
        border-radius: 0.35rem;
        box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.12);
        overflow: hidden;
    }
    .page-client-factsheet .modal-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .page-client-factsheet .modal-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.06);
        gap: 0.35rem;
    }
    .page-client-factsheet .modal-body .form-control.is-invalid,
    .page-client-factsheet .modal-body .custom-file-input.is-invalid ~ .custom-file-label {
        border-color: #dc3545;
    }
    .page-client-factsheet .fs-invalid-hint {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #dc3545;
    }
    .page-client-factsheet .fs-invalid-hint.is-visible {
        display: block;
    }
    .page-client-factsheet .info-nav-tabs-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 2px;
    }
    .page-client-factsheet .info-nav-tabs-scroll .nav-tabs {
        flex-wrap: nowrap;
        white-space: nowrap;
    }
    .page-client-factsheet .info-nav-tabs-scroll .nav-link {
        white-space: nowrap;
    }

    .page-client-factsheet .fs-empty-state {
        text-align: center;
        padding: 2rem 1rem;
        color: #6c757d;
        background: #f8f9fa;
        border-radius: 0.25rem;
        border: 1px dashed #dee2e6;
    }
    .page-client-factsheet .fs-empty-state i {
        font-size: 2rem;
        opacity: 0.35;
        display: block;
        margin-bottom: 0.5rem;
    }

    /* Docket List — Worksheet / PSIR action controls (scoped) */
    .page-client-factsheet .fs-docket-cell-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.45rem;
    }
    .page-client-factsheet .fs-docket-status {
        font-size: 0.8125rem;
        color: #495057;
        line-height: 1.3;
        flex: 1 1 5rem;
        min-width: 0;
    }
    .page-client-factsheet .fs-docket-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
    }
    .page-client-factsheet .fs-docket-actions .btn {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.2;
        padding: 0.2rem 0.45rem;
        border-radius: 0.2rem;
        white-space: nowrap;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.15s ease, transform 0.12s ease;
    }
    .page-client-factsheet .fs-docket-actions .btn:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    }
    .page-client-factsheet .fs-docket-actions .btn:active {
        transform: translateY(1px);
    }
    .page-client-factsheet .fs-docket-actions .btn i {
        margin-right: 0.28rem;
        font-size: 0.75rem;
        vertical-align: middle;
    }
    .page-client-factsheet .fs-docket-actions a.btn {
        text-decoration: none;
    }

    .page-client-factsheet .fs-info-body {
        margin-top: 40px;
    }

    @media (max-width: 768px) {
        .page-client-factsheet .right-panel,
        .page-client-factsheet .content,
        .page-client-factsheet .content .animated,
        .page-client-factsheet .content .row,
        .page-client-factsheet .content [class*="col-"],
        .page-client-factsheet .card,
        .page-client-factsheet .card-body {
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
        }

        .page-client-factsheet .right-panel {
            overflow-x: hidden;
        }

        .page-client-factsheet .content.mt-3 {
            margin-top: 0.5rem !important;
            padding-left: 10px;
            padding-right: 10px;
        }

        .page-client-factsheet .breadcrumbs {
            padding: 8px 10px !important;
        }

        .page-client-factsheet .breadcrumb {
            flex-wrap: wrap;
            font-size: 0.8125rem;
            margin-bottom: 0;
            padding: 0.35rem 0;
        }

        .page-client-factsheet .card .card-header {
            padding: 0.65rem 0.75rem;
        }

        .page-client-factsheet .card .card-body {
            padding: 0.75rem;
        }

        .page-client-factsheet .card .card-footer {
            padding: 0.75rem;
        }

        .page-client-factsheet .card-footer .btn {
            float: none !important;
            width: 100%;
        }

        .page-client-factsheet .fs-profile-outer {
            overflow-x: visible;
            width: 100%;
            max-width: 100%;
        }

        .page-client-factsheet .profile-container {
            min-width: 0;
            min-height: 0;
            width: 100%;
            max-width: 100%;
            flex-direction: column;
            align-items: stretch;
            padding: 0.75rem;
        }

        .page-client-factsheet .name-container {
            width: 100%;
            max-width: 100%;
            height: auto;
            padding: 0;
        }

        .page-client-factsheet .name-header {
            flex-wrap: wrap;
            gap: 0.35rem;
        }

        .page-client-factsheet .img-body {
            width: 100%;
            max-width: 220px;
            height: auto;
            margin: 0.75rem auto 0;
            padding-top: 0;
        }

        .page-client-factsheet .img-cont,
        .page-client-factsheet .btn-cont {
            width: 100%;
            max-width: 220px;
            height: auto;
        }

        .page-client-factsheet .img-cont {
            height: auto;
        }

        .page-client-factsheet .img-cont img {
            height: auto;
            max-height: 180px;
            object-fit: contain;
        }

        .page-client-factsheet .fs-info-body {
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            margin-top: 1rem !important;
        }

        .page-client-factsheet .info-nav {
            width: 100%;
            max-width: 100%;
            padding: 0;
            margin-bottom: 0.5rem;
        }

        .page-client-factsheet .info-nav-tabs-scroll {
            width: 100%;
            max-width: 100%;
            margin: 0 -0.15rem;
            padding-bottom: 4px;
        }

        .page-client-factsheet .info-nav-tabs-scroll .nav-tabs {
            border-bottom: 1px solid #dee2e6;
        }

        .page-client-factsheet .info-nav-tabs-scroll .nav-link {
            font-size: 0.8125rem;
            padding: 0.5rem 0.65rem;
        }

        .page-client-factsheet .info-action {
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            justify-content: stretch;
            padding: 0.5rem 0 0.75rem;
        }

        .page-client-factsheet .info-action .btn {
            width: 100%;
            max-width: 100%;
            margin: 0;
            white-space: normal;
            text-align: center;
        }

        .page-client-factsheet .fs-tab-panel-wrap,
        .page-client-factsheet .info-details {
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            margin: 0;
        }

        .page-client-factsheet .info-details .tab-pane {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .page-client-factsheet .info-details table {
            width: 100% !important;
            margin-bottom: 0;
        }

        .page-client-factsheet .dataTables_wrapper {
            width: 100% !important;
            max-width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .page-client-factsheet div.dataTables_wrapper div.row {
            margin-left: 0;
            margin-right: 0;
        }

        .page-client-factsheet div.dataTables_wrapper div.dataTables_length,
        .page-client-factsheet div.dataTables_wrapper div.dataTables_filter,
        .page-client-factsheet div.dataTables_wrapper div.dataTables_info,
        .page-client-factsheet div.dataTables_wrapper div.dataTables_paginate {
            float: none !important;
            width: 100% !important;
            max-width: 100%;
            text-align: left !important;
            margin-bottom: 0.5rem;
            padding-left: 0;
            padding-right: 0;
        }

        .page-client-factsheet div.dataTables_wrapper div.dataTables_filter label {
            width: 100%;
            display: block;
        }

        .page-client-factsheet div.dataTables_wrapper div.dataTables_filter input {
            width: 100% !important;
            max-width: 100%;
            margin-left: 0 !important;
            display: block;
        }

        .page-client-factsheet div.dataTables_wrapper div.dataTables_paginate {
            text-align: center !important;
            overflow-x: auto;
            white-space: nowrap;
        }

        .page-client-factsheet .table td .btn,
        .page-client-factsheet .table td .btn-group {
            display: inline-block;
            margin: 0.15rem 0.15rem 0.15rem 0;
            white-space: nowrap;
        }

        .page-client-factsheet #rehabilatationContent,
        .page-client-factsheet .tc-header,
        .page-client-factsheet .tc-search,
        .page-client-factsheet .tc-body {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .page-client-factsheet .tc-search {
            display: flex !important;
            flex-direction: column;
            align-items: stretch !important;
            gap: 0.5rem;
            padding: 0.5rem 0 !important;
        }

        .page-client-factsheet .tc-search .form-control,
        .page-client-factsheet .tc-search .btn {
            width: 100%;
            max-width: 100%;
            margin: 0 !important;
        }

        .page-client-factsheet .tc-body {
            padding-top: 0.5rem !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
<body class="page-client-factsheet">
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
                      <a class='btn btn-sm btn-block btn-primary text-white col-sm-12 col-md-12' id='open'><i class="fa fa-video-camera" aria-hidden="true"></i> Open cam</a>
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
                                        <div class="col-md-6"><a id='retake' href="#" class='btn btn-sm btn-light btn-block border m-1 hov' role="button"><i class="fa fa-refresh" aria-hidden="true"></i><span class="sr-only"> Retake</span></a></div>
                                        <div class="col-md-6"><a id='snap' href="#" class='btn btn-sm btn-primary btn-block m-1 hov' role="button"><i class="fa fa-camera" aria-hidden="true"></i><span class="sr-only"> Capture</span></a></div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_photo_capture" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Photo Capture Successfully Uploaded
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" id="cancel_modal" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm btn_confirm">Confirm</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Uploaded Successfully
                </div>
                <div class="modal-body col-md-12">
                    <label class="form-control-label small text-muted" for="file-input">Choose image file</label>
                    <input type="file" id="file-input" class="form-control-file" accept="image/*">
                    <div class="fs-invalid-hint" id="file-input-upload-hint" role="alert"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" id="dismissedModalUploadPic">Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm uploadPhotoBtn">Confirm</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload_reporting" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
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
                            <button type="button" class="btn btn-info btn-sm btn-viewPetitionerFingerprints" style="width: 100%; border-radius: 3px;"><i class="fa fa-eye" aria-hidden="true"></i>  View Fingerprint</button>
                        </div>
                        <div class="takePhotoContainer" style="width: 100%; height: 150px; padding: 10px; align-items: center; margin: auto;">
                            <button type="button" class="btn btn-info btn-sm" style="width: 100%; border-radius: 3px;"><i class="fa fa-picture-o" aria-hidden="true"></i>  Take Photo</button> 
                        </div>
                        <div class="uploadAttachmentContainer" style="width: 100%; min-height: 150px; padding: 10px; align-items: center; margin: auto;">
                            <input type="file" id="file-input-reporting-photo" accept="image/*" style="display: none;" aria-hidden="true">
                            <button type="button" class="btn btn-info btn-sm btn-uploadReportingPhotoPick" style="width: 100%; border-radius: 3px;"><i class="fa fa-upload" aria-hidden="true"></i>  Upload Photo</button>
                            <div class="fs-invalid-hint" id="file-input-reporting-photo-hint" role="alert"></div>
                            <div class="reporting-profile-photo-followup mt-2" style="display: none;">
                                <img id="reporting_photo_preview" src="" alt="Selected photo preview" style="max-width: 100%; max-height: 90px; border-radius: 4px; display: none; margin: 0 auto 8px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm saveReportingDate">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="viewPetitionerFingerprintsModal" tabindex="-1" role="dialog" aria-labelledby="viewPetitionerFingerprintsTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 900px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewPetitionerFingerprintsTitle">View fingerprints — petitioner</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body col-md-12">
                    <p class="text-muted small mb-2 petition-fp-list-hint">All fingerprint files uploaded for this petitioner (all fingers and versions).</p>
                    <p class="text-info small petition-fp-list-loading" style="display:none" role="status">Loading fingerprints…</p>
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm table_petitioner_fingerprints mb-0">
                            <thead>
                                <tr>
                                    <th style="width:48px;">#</th>
                                    <th>Finger</th>
                                    <th>File name</th>
                                    <th>Remarks</th>
                                    <th style="width:200px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="petitioner_fingerprints_tbody"></tbody>
                        </table>
                    </div>
                    <p class="text-muted mb-0 mt-3 petition-fp-list-empty" style="display:none">No fingerprint files found for this petitioner in this field office.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload_other" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="failed_upload_other" style="display:none">
                    <i class="fa fa-times" aria-hidden="true"></i>
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
                                <div class="col-12 col-md-8"><input type="file" id="file-input-other" class="form-control-file"></div>
                                <div class="col-12 col-md-8 offset-md-4"><div class="fs-invalid-hint" id="file-input-other-hint" role="alert"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm saveOtherDocument">Confirm</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload_fingerprint" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
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
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm saveFingerPrints">Confirm</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload_investigation" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="failed_upload_investigation" style="display:none">
                    <i class="fa fa-times" aria-hidden="true"></i>
                        Upload Failed! Please Check Your File Before Uploading.
                </div>
                <div class="alert alert-warning fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="no_dockets_upload_investigation" style="display:none" aria-live="assertive">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    There are no investigation dockets for this client. Create or assign an investigation docket before uploading documents here.
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 100%; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="select-docket-investigation" class=" form-control-label">Docket number:</label></div>
                                <div class="col-12 col-md-8">
                                    <select id="select-docket-investigation" class="form-control form-control-sm"></select>
                                    <div class="fs-invalid-hint" id="select-docket-investigation-hint" role="alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Investigating Officer:</label></div>
                                <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="" class="form-control investigatingOfficer"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Attachment:</label></div>
                                <div class="col-12 col-md-8"><input type="file" id="file-input-investigation" class="form-control-file"></div>
                                <div class="col-12 col-md-8 offset-md-4"><div class="fs-invalid-hint" id="file-input-investigation-hint" role="alert"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm saveInvestigationDocument">Confirm</button>
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
                <div class="alert alert-success fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="success_upload_supervision" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Added Successfully
                </div>
                <div class="alert alert-danger fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="failed_upload_supervision" style="display:none">
                    <i class="fa fa-times" aria-hidden="true"></i>
                        Upload Failed! Please Check Your File Before Uploading.
                </div>
                <div class="alert alert-warning fs-modal-alert mx-3 mb-0 mt-2" role="alert" id="no_dockets_upload_supervision" style="display:none" aria-live="assertive">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    There are no supervision dockets for this client. Create or assign a supervision docket before uploading documents here.
                </div>
                <div class="modal-body col-md-12" style="display: flex; justify-content: space-between;">
                    <div class="reportingDetailsContainer" style="width: 100%; padding: 20px;">
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="select-docket-supervision" class=" form-control-label">Docket number:</label></div>
                                <div class="col-12 col-md-8">
                                    <select id="select-docket-supervision" class="form-control form-control-sm"></select>
                                    <div class="fs-invalid-hint" id="select-docket-supervision-hint" role="alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label class=" form-control-label">Investigating Officer:</label></div>
                                <div class="col-12 col-md-8"><input type="text" name="text-input" placeholder="" class="form-control investigatingOfficerSupervision"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row form-group col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Attachment:</label></div>
                                <div class="col-12 col-md-8"><input type="file" id="file-input-supervision" class="form-control-file"></div>
                                <div class="col-12 col-md-8 offset-md-4"><div class="fs-invalid-hint" id="file-input-supervision-hint" role="alert"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" >Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm saveSupervisionDocument">Confirm</button>
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
                            <div class="fs-toast-host" aria-live="polite" aria-atomic="true">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                        Successfully Updated  
                                </div>
                                <div id="fsDynamicToast" class="alert fs-dynamic-toast alert-info mb-0" role="alert"></div>
                            </div>
                            <div class="fs-profile-outer">
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
                                        <button type="button" data-toggle="modal" data-target="#cameraModal" class="btn btn-sm btn-outline-primary btn-block btn-take rounded-0">
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
                            </div>
                            <div class="info-body fs-info-body">
                                <div class="info-nav info-nav-tabs-scroll">
                                    <ul class="nav nav-tabs flex-nowrap">
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
                                        <li class="nav-item" style="display: none;">
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
                                <div class="fs-tab-panel-wrap position-relative">
                                <div id="fsTabContentLoader" class="fs-panel-loader is-hidden" aria-live="polite" aria-busy="false">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted fs-panel-loader-text">Loading…</p>
                                </div>
                                <div class="info-details">
                                    <div class="tab-pane fade show active" id="investigationContent">
                                        <table id="investigationTableStart" class="table table-bordered table_head" style="max-width: 100%;">
                                            <caption class="sr-only">Investigation documents for this client</caption>
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Reports</th>
                                                <th scope="col">Investigating Officer</th>
                                                <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
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
    <script src="assets/js/html2canvas.min.js"></script>
    <script src="assets/js/pisJs/ppaWorksheetPrintHtml.js"></script>
    <script src="assets/js/pisJs/ppaPsirPrintHtml.js"></script>
    <script src="assets/js/pisJs/clientViewFactSheet.js"></script>


</body>

</html>