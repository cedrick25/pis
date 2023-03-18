<?php $this->load->view('templates/header.php'); ?> 

<body>

    <div class="modal fade" id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="max-width: 1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Capture Camera</h5>
                        <div class="modal-body col-md-12">
                            <div id="my_camera"></div>
                            <button type="button" class="btn btn-primary btn_snap">Snapshot</button>
                            <input type="file" id="file-snap" style="display:none"></input>
                            <button type="button" class="btn btn-primary btn_save">Save</button>
                            <input type="button" id="file-input-snap" style="display:none;">
                            <!-- <input type=button value="Take Snapshot" onClick="take_snapshot()">  -->
                            <div id="results" ></div>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary btn_confirm_update">Confirm</button>
                    </div>
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
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div style="margin-bottom: 30px; margin-right: 90px; text-align: right;">
                                    <img class="align-content" id="client_photo" src="images/pis_logo.png" alt="" style="max-width: 10%;">
                                </div>
                                <div style="margin-bottom: 30px; margin-right: 70px; text-align: right;">
                                    <input type="file" id="file-input" style="display: none">
                                    <!-- <button id="upload-btn">Upload</button> -->
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
                            <div class="modal-footer">
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
        console.log(client_id)



        __executeExternalGet('http://localhost:8088/user/'+$.cookie("uuid")).done(function (result) {

        // console.log(result.departmentId)
        var officeId = result.departmentId;
        // console.log(result.uuid)
        var createdBy = result.uuid;

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
            "createdBy"                 : createdBy,
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
              url: "http://localhost:8080/file/upload?uuid="+"00000"+"&type="+"petitioner_profile"+"&createdby="+$.cookie('uuid')+"&version=0&kind="+"petitioner_profile"+"&officeId="+officeId, // Replace with the path to your server-side script
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
          
          // Listen for the upload button click event
          $('.btn-upload').on('click', function() {
            console.log("clicked")
            // var imgavat = $('#client_photo');
            
            // Trigger the file input click event to open the file selector dialog
            $('#file-input').click();
            
          });
        });





        });



            $('.btn-take').on('click', function() {
            console.log("clicked take")

            Webcam.set({
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90
            });
            Webcam.attach( '#my_camera' );
            });


            $('.btn_snap').on('click', function() {
                console.log("clicked snap")
 
            // take snapshot and get image data
               Webcam.snap( function(data_uri) {
                   // display results in page
                   document.getElementById('results').innerHTML = 
                    '<img id="imageprev" src="'+data_uri+'"/>';
                });
            });



            $('.btn_save').on('click', function() {
                console.log("clicked save")
                __executeExternalGet('http://localhost:8088/user/'+$.cookie("uuid")).done(function (result) {
                    var officeId = result.departmentId;
                    // console.log(result.uuid)
                    var createdBy = result.uuid;

            var imgsave = $('#imageprev');
            

                });
            });





     //    function take_snapshot() {
 
     // // take snapshot and get image data
     //    Webcam.snap( function(data_uri) {
     //   // display results in page
     //   document.getElementById('results').innerHTML = 
     //    '<img src="'+data_uri+'"/>';
     //        } );
     //    }
    // Webcam.set({
    //    width: 320,
    //    height: 240,
    //    image_format: 'jpeg',
    //    jpeg_quality: 90
    // });

        
   
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

    } )( jQuery );
    </script>

</body>

</html>