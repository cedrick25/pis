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
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Upload</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="investigation_docketing">Investigation Docket</a></li>
                            <li class="active">Upload</li>
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
                                <strong class="card-title">Upload File</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success_forwarding" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Uploaded 
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label docket_number"></label></div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload Type</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Caseload Type" class="form-control caseload_type"></div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select name="select" id="" class="form-control field_office select2">
                                            <option value="" disabled selected> - - Select Field Office - - </option>
                                            <option value="Central Office">Central Office</option>
                                            <option value="Central Office1">Central Office1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Upload File</label></div>
                                    <div class="col col-md-3"><input type="file" class="form-control-file" id="fileupload"></div>
                                </div>
<!--                                 <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
                                </div> -->
                                <!-- <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="uploadFile" class=" form-control-label">Upload a File</label></div>
                                    <div class="col-12 col-md-9"><input type="file" class="form-control-file" id="uploadFile"></div>
                                </div> -->
                            </div>
                            <div class="card-footer">
			                    <!-- <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button> -->
			                    <button type="button" class="btn btn-primary btn-certUpload btn-sm float-right">Confirm</button>
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

        var __executeFile = function(path, jsonObj) {
            var d = $.Deferred();
                $(".overlay-back").show();
                $(".loadDiv").show();
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                /*data: JSON.stringify(jsonObj)*/
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                d.resolve(data);
                $(".loadDiv").hide();
                $(".overlay-back").hide();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : errorThrown
                });
                $(".overlay-back").hide();
                $(".loadDiv").hide();
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


        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        var docket_number = GetURLParameter('docket_number');
        var __fields = function(){
            __executeExternalGet('http://localhost:8000/docketbook/'+docket_number).done(function (result) {
                console.log(result);
                var result = result.response;
                if (result.status != "ERROR") {
                    $(".docket_number").html(result.docketNumber);

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')
                        
                        var payload = {
                            "type"                  : $(".caseload_type").val(),
                            "senderId"              : $.cookie("uuid"),
                            "receiverId"            : "1",
                            "fieldOfficeId"         : $(".field_office").val(),
                            "docketNumber"          : $(".docket_number").val(),
                            "details"               : $(".details").val(),
                            "remarks"               : $(".remarks").val(),
                            "approvalStatus"        : "",
                            "lastStatusUpdateDate"  : "",
                        }

                        __executeExternalPost('http://localhost:8000/workflow/create',JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success_forwarding').show();
                                setTimeout(function () {
                                    $('#success_forwarding').hide();
                                    window.location.reload(true);
                                }, 2000);
                            }else{
                                alert("failed")
                            }
                        })
                    })

                }else{
                    alert("failed")
                }
            })
        }
        __fields();

        $(".btn-certUpload").unbind("click").on("click", function(){
                    // console.log("clicked")
                    var fileToUpload = $('#fileupload').prop('files')[0];
                    // console.log(fileToUpload)
                    if (fileToUpload === undefined) {
                        alert("Please Choose File Before Upload!")
                    }else {
                        var formdata = new FormData();
                        formdata.append("files", fileupload.files[0], fileupload.files[0].name);

                        $.wms.executeFile('http://192.168.1.184:8000/cert/upload?officeId='+officeId+'&yearMonth='+date+'&uploaderId='+$.cookie("USER_ID")+'&formTable=f44',formdata).done(function (result) {
                            console.log(result)
                            if(result){
                                __cert_list_upload();
                            }else{
                                // alert ("region Failed");
                            }
                        });
                    } 
        })
    } )( jQuery );
    </script>

</body>

</html>