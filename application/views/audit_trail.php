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
                        <h1>Audit Trail</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Audit Trail</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Audit Trail</strong>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>USER TYPE</th>
                                            <th>DATE TIME</th>
                                            <th>ACTION PERFORMED</th>
                                            <th>ACTION DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table_body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div>

    <?php $this->load->view('templates/footer.php'); ?> 

    <script type="text/javascript">
    jQuery(document).ready(function($) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
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

        var __audit = function(){
            $('.table_head').DataTable().destroy();
            $('.table_body').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/audit_trail',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                $(".badge_blotter").html(result.count)
                $(".count_b").html(result.count)

                result.payload.forEach(function(data){
                    $('.table_body').append("<tr>"+
                        "<td>"+data.audit_trail_id+"</td>"+
                        "<td>"+data.first_name+" "+data.middle_name+" "+data.last_name+" "+data.suffix_name+"</td>"+
                        "<td>"+data.user_type_name+"</td>"+
                        "<td>"+data.date_created+"</td>"+
                        "<td>"+data.action_performed+"</td>"+
                        "<td>"+data.action_details+"</td>")
                });
                $(document).ready(function () {
                    var table = $('.table_head').DataTable({
                        order: [[0, 'desc']],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

            })
        }
        __audit();
    })
    </script>
</body>

</html>