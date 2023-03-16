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
                            <li><a href="">Worksheet</a></li>
                            <li class="active">Petitioner's Criminal History</li>
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
                                <strong class="card-title">Present Offense</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
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
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Explain</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Sample" class="form-control explain"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-success btn-next btn-sm">Save & Next</button>
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

            var presentOffense = {
                chargedWith                 : $(".charged").val(),
                commisionPlace              : $(".p_commision").val(),
                convictedOf                 : $(".convicted").val(),
                dateCharged                 : $(".date_charged").val(),
                dateCommitted               : $(".date_commited").val(),
                dateConvicted               : $(".date_convicted").val(),
                sentenceYear                : $(".s_yr").val(),
                sentenceMonth               : $(".s_mo").val(),
                sentenceDay                 : $(".s_day").val(),
                judge                       : $(".judge").val(),
                court                       : $(".court").val(),
                arrestingOfficer            : $(".arresting").val(),
                firstAddress                : $(".address_1").val(),
                defenseCounsel              : $(".defense").val(),
                secondAddress               : $(".address_2").val(),
                prosecutor                  : $(".prosecutor").val(),
                thirdAddress                : $(".address_3").val(),
                offended                    : $(".offended").val(),
                fourthAddress               : $(".address_4").val(),
                coAccused                   : $(".ca").val(),
                aggravatingCirsumstances    : $(".ac").val(),
                mitigatingCircumstances     : $(".mc").val(),
                extentParticipation         : $(".ep").val(),
                custody                     : $(".custody").val(),
                mannerofCommision           : $(".commision").val(),
                motives                     : $(".motives").val(),
                explain                     : $(".explain").val(),
            }

            console.log(presentOffense)


            
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(presentOffense),
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
                            window.location.href = 'http://localhost/pis/worksheet_prior_records?client_id='+client_id;
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

        // $(document).ready(function() {
        //   // Listen for the file input change event
        //   $('#file-input').on('change', function() {
        //     var imgavat = $('#client_photo');
        //     var file = this.files[0];
        //     // Create a FormData object to store the file data
        //     var formData = new FormData();
        //     formData.append('file', file);
        //     // Set up an AJAX request to send the file data to the server
        //     $.ajax({
        //       url: "http://localhost:8080/file/upload?uuid="+"00000"+"&type="+"petitioner_profile"+"&createdby="+$.cookie('uuid')+"&version=0&kind="+"petitioner_profile"+"&officeId="+officeId, // Replace with the path to your server-side script
        //       type: 'POST',
        //       data: formData,
        //       contentType: false,
        //       processData: false,
        //       success: function(response) {
        //         // Handle the server response here
        //         console.log(response);
        //       },
        //       error: function(xhr, status, error) {
        //         // Handle any errors here
        //         console.log(error);
        //       }
        //     });
        //     if (this.files[0]) {   
        //         var reader  = new FileReader();
                
        //         reader.readAsDataURL(this.files[0]);
                
        //         reader.onloadend = function () {
        //             imgavat.attr('src', reader.result);
        //         };
        //     }

        //   });
          
        //   // Listen for the upload button click event
        //   $('.btn-upload').on('click', function() {
        //     console.log("clicked")
        //     // var imgavat = $('#client_photo');
        //     // // Trigger the file input click event to open the file selector dialog
        //     // // $('#file-input').click();
        //     // // image.src = URL.createObjectURL(url);
            
        //   });
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