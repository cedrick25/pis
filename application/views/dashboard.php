<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 

    <!-- /#left-panel -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-12">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li class="active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Dashboard</strong>
                                    </div>
                                    <div class="card-body an_body" style="height:490px; overflow:auto; background:#fff;">
                                        <div class="row form-group col-md-6">         
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type</label></div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="" class="form-control type select2">
                                                    <option value="" selected disabled> - - Select Type - - </option>
                                                    <option value="INV">Investigation</option>
                                                    <option value="SUP">Supervision</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row form-group col-md-6">         
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="" class="form-control docket_num select2">
                                                    <option selected disabled> - - Select Docket Number - - </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col col-md-6">
                                            <table class="table table_head_workflow">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>File name</th>
                                                        <th>Date Uploaded</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_workflow">
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col col-md-6">
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

            </div><!-- .animated -->
        </div><!-- .content -->
    </div><!-- /#right-panel -->

    <!-- Right Panel -->

	<?php $this->load->view('templates/footer.php'); ?> 
    <script src="vendors/chart.js/dist/Chart.bundle.min.js"></script>
    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/widgets.js"></script>
    <script src="assets/js/init-scripts/chart-js/chartjs-init.js"></script>

    
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

        var __select = function(){
            $('.field_office').empty();

            $('.type').on('change', function() {
                $('.docket_num').empty();
                const type = this.value
                console.log(type)
                __executeExternalGet('http://localhost:8000/docketbook/list/'+type).done(function (result) {
                    if (result.status != "ERROR") {

                        $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");

                        result.response.forEach(function(data){
                            $('.docket_num').append(
                                "<option value="+data.docketNumber+" data-id="+data.type+">"+data.docketNumber+"</option>");
                        });
                    } else {
                        console.log("failed fetching docket number")
                    }
                });
            });
        }

        $('.docket_num').on('change', function() {
            const dn = this.value
            list_upload(dn)
        });
        var list_upload = function(docket_number){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();
            __executeExternalGet('http://localhost:8080/file/list/'+docket_number).done(function (result) {
                console.log("======")
                console.log(result)
                console.log("======")

                if (result.status != "ERROR") {
                    if (result.files.length != 0) {
                        result.files.forEach(function(data){
                            $('.table_body').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.fileName+"</td>"+
                                "<td>"+data.createdDate+"</td>"+
                                "<td class='options'><a href="+'http://localhost:8080/file/view/'+data.id+"><button class=' btn btn-success btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a></td></tr>"
                            )
                        });
                    }
                    $(document).ready(function () {
                        $('.table_head tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head').DataTable({
                            order: [[0, 'asc']],
                            // "columnDefs": [
                                // { "width": "30%", "targets": 6 }
                            // ]
                        });
                        // $('.dataTables_length').addClass('bs-select');
                    }); 
                }
            });
        }

        __select();

    } )( jQuery );
    </script>
</body>

</html>
