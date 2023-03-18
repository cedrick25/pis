<?php $this->load->view('templates/header.php'); ?> 
<body>

    <div class="modal fade" id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="max-width: 703px;">
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
                                    <!-- <div class="col-md-4"><a id='close' class='btn btn-block m-1 hov'><i class="fa fa-times"></i></a></div> -->

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
                            <li class="active">Identifying Data</li>
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
                                <strong class="card-title">Identifying Data</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="worksheet_identifying_data" aria-selected="true">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="worksheet_present_offense" role="tab" aria-controls="supervision" aria-selected="false">Present Offense</a>
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
                                    <li class="nav-item">
                                        <a class="nav-link" id="residenceEconomicTab" data-toggle="tab" href="#residenceEconomics" role="tab" aria-controls="supervision" aria-selected="false">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="spouseChildrenTab" data-toggle="tab" href="#spouseChildren" role="tab" aria-controls="supervision" aria-selected="false">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="educationHistoryTab" data-toggle="tab" href="#educationHistory" role="tab" aria-controls="supervision" aria-selected="false">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="employmentHistoryTab" data-toggle="tab" href="#employmentHistory" role="tab" aria-controls="supervision" aria-selected="false">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="environmentalFactorTab" data-toggle="tab" href="#environmentalFactor" role="tab" aria-controls="supervision" aria-selected="false">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div style="margin-bottom: 30px; margin-right: 90px; text-align: right;">
                                    <img class="align-content" id="client_photo" src="images/logoo.jpg" alt="" style="max-width: 20%;">
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
                            <div class="card-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-success btn-next btn-sm">Save & Next</button>
                                <button type="button" class="btn btn-primary btn-exit btn-sm">Save & Exit</button>
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
        var field_office_id = GetURLParameter('field_office_id');
        console.log(client_id)

        __executeExternalGet('http://localhost:8080/file/getLatest/petitioner_profile/'+client_id+"/"+field_office_id).done(function (result) {
            if (result.status != "ERROR") {
                console.log(result.files.length)
                if (result.files.length != 0) {
                    console.log(result.files[0].id)
                    $('#client_photo').attr('src', 'http://localhost:8080/file/view/'+result.files[0].id);
                }
            }
        })
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
              url: "http://localhost:8080/file/upload?uuid="+client_id+"&type=petitioner_profile&createdby="+$.cookie('uuid')+"&version=0&kind=petitioner_profile&officeId="+$.cookie('field_office_id'), // Replace with the path to your server-side script
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
                                url: "http://localhost:8080/file/upload?uuid="+client_id+"&type=petitioner_profile&createdby="+$.cookie('uuid')+"&version=0&kind=petitioner_profile&officeId="+$.cookie('field_office_id'),
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
            "type"                      : "identifyingData",
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
                        window.location.href = 'http://localhost/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

    } )( jQuery );
    </script>

</body>

</html>