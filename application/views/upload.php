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
                            <li><a href="received">Received</a></li>
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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label type"></label></div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-9"><label for="text-input" class=" form-control-label docket_number"></label></div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Upload File</label></div>
                                    <div class="col col-md-3"><input type="file" name="fileupload" class="form-control-file" id="fileupload"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Upload List</strong>
                            </div>
                            <div class="card-body">
                                <div class="col col-md-12">
                                    <table class="table table_head">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>File name</th>
                                                <th>Date Uploaded</th>
                                                <th>Actions</th>
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
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                cache: false,
                "mimeType": "multipart/form-data",
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

        var docket_number = GetURLParameter('docket_number');
        var __fields = function(){
            __executeExternalGet('http://localhost:8000/docketbook/'+docket_number).done(function (result) {
                console.log(result);
                var result = result.response;
                if (result.status != "ERROR") {
                    $(".docket_number").html(result.docketNumber);
                    $(".type").html(result.type);

                    $(".btn-confirm").unbind("click").on("click", function(){
                        console.log("clicked")
                        var fileToUpload = $('#fileupload').prop('files')[0];

                        if (fileToUpload === undefined) {
                            alert("Please Choose File Before Upload!")
                        }else {
                            const formdata = new FormData();
                            formdata.append("files", fileupload.files[0], fileupload.files[0].name);
                            console.log(fileupload.files[0])
                            console.log(fileupload.files[0].name)
                            __executeFile('http://localhost:8080/file/upload?uuid='+$.cookie('uuid')+'&type='+result.type,formdata).done(function (result) {
                                console.log(result)
                                if(result){
                                    list_upload();

                                }else{
                                    // alert ("upload Failed");
                                }
                            });
                        } 
                    })
                }else{
                    alert("failed")
                }
            })
        }
        __fields();

        var list_upload = function(){
            console.log("list")
            __executeExternalGet('http://localhost:8080/file/list/INV/'+$.cookie('uuid')).done(function (result) {
                console.log(result)

                if (result.response.length != 0) {
                    $(".table_body").empty()
                    result.response.forEach(function(data){
                        $('.table_body').append("<tr>"+
                            "<td>"+data.file_name+"</td>"+
                            "<td>"+data.created_date+"</td>"+
                            "<td align='center' class='options'><a href="+'http://localhost:8080/view/'+data.id+"><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.file_path+"' data-file_name='"+data.file_name+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                        )
                    });
                } else {

                }

            });
        }
    } )( jQuery );
    </script>

</body>

</html>