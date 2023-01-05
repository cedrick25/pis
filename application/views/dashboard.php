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
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Dashboard</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li class="active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="card no-padding ">
                        <div class="card-body">
                            <div class="h1 text-muted text-right mb-4">
                                <i class="fa fa-home"></i>
                            </div>

                            <div class="h4 mb-0">
                                <span class=" count_r">0</span>
                            </div>
                            <small class="text-muted text-uppercase font-weight-bold">Residents</small>
                            <div class="progress progress-xs mt-3 mb-0 bg-flat-color-1" style="width: 90%; height: 5px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card no-padding ">
                        <div class="card-body">
                            <div class="h1 text-muted text-right mb-4">
                                <i class="fa fa-male"></i>
                            </div>

                            <div class="h4 mb-0">
                                <span class="count_male">0</span>
                            </div>
                            <small class="text-muted text-uppercase font-weight-bold">Male</small>
                            <div class="progress progress-xs mt-3 mb-0 bg-flat-color-2" style="width: 90%; height: 5px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card no-padding ">
                        <div class="card-body">
                            <div class="h1 text-muted text-right mb-4">
                                <i class="fa fa-female"></i>
                            </div>

                            <div class="h4 mb-0">
                                <span class="count_female">0</span>
                            </div>
                            <small class="text-muted text-uppercase font-weight-bold">Female</small>
                            <div class="progress progress-xs mt-3 mb-0 bg-flat-color-3" style="width: 90%; height: 5px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card no-padding ">
                        <div class="card-body">
                            <div class="h1 text-muted text-right mb-4">
                                <i class="fa fa-file"></i>
                            </div>

                            <div class="h4 mb-0">
                                <span class=" count_b">0</span>
                            </div>
                            <small class="text-muted text-uppercase font-weight-bold">Blotter</small>
                            <div class="progress progress-xs mt-3 mb-0 bg-flat-color-4" style="width: 90%; height: 5px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="card no-padding ">
                        <div class="card-body">
                            <div class="h1 text-muted text-right mb-4">
                                <i class="fa fa-cog"></i>
                            </div>
                            <div class="h4 mb-0">
                                <span class="count_eq">0</span>
                            </div>
                            <small class="text-muted text-uppercase font-weight-bold">Equipment</small>
                            <div class="progress progress-xs mt-3 mb-0 bg-flat-color-5" style="width: 90%; height: 5px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- .content -->

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Announcement <small><span class="badge badge-danger float-right mt-1 badge_announcement">0</span></small></strong>
                                    </div>
                                    <div class="card-body an_body" style="height:390px; overflow:auto; background:#fff;">
                                        <!-- <div class="card-announcement">
                                            <p class="card-text"><b>Date posted: <i>Oct. 20, 2022</i></b></p>
                                            <p class="card-text">What: Finance Department Staff Meeting</p>
                                            <p class="card-text">Where: Multi-purpose hall.</p>
                                            <p class="card-text">When: Nov. 20, 2022. 3:00pm</p>
                                        </div>
                                        <div class="card-announcement">
                                            <p class="card-text"><b>Date posted: <i>Oct. 20, 2022</i></b></p>
                                            <p class="card-text">What: Finance Department Staff Meeting</p>
                                            <p class="card-text">Where: Multi-purpose hall.</p>
                                            <p class="card-text">When: Nov. 20, 2022. 3:00pm</p>
                                        </div>
                                        <div class="card-announcement">
                                            <p class="card-text"><b>Date posted: <i>Oct. 20, 2022</i></b></p>
                                            <p class="card-text">What: Finance Department Staff Meeting</p>
                                            <p class="card-text">Where: Multi-purpose hall.</p>
                                            <p class="card-text">When: Nov. 20, 2022. 3:00pm</p>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Blotter</strong> <small><span class="badge badge-danger float-right mt-1 badge_blotter">0</span></small></strong>
                                        <!-- <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Received Document</button> -->
                                    </div>
                                    <div class="card-body">
                                        <table id="bootstrap-data-table-export" class="table table-striped table-bordered table_head_blotter">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Time Occurred</th>
                                                    <th>Complainant</th>
                                                    <th>Complaint</th>
                                                    <th>Suspect</th>
                                                    <th>Involved</th>
                                                    <th>Date Created</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body_blotter">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Resident</strong> <small><span class="badge badge-success float-right mt-1 badge_resident">0</span></small></strong>
                                        <!-- <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Received Document</button> -->
                                    </div>
                                    <div class="card-body">
                                        <table id="resident_table" class="resident_table table table-striped table-bordered resident_table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Fullname</th>
                                                    <th>Address</th>
                                                    <th>Voter Status</th>
                                                    <th>Civil Status</th>
                                                    <th>Occupation</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body_resident">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title">Equipment</strong> <small><span class="badge badge-success float-right mt-1 badge_eq">0</span></small></strong>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table_head_equipment">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">In Stock</th>
                                                    <th scope="col">In Use</th>
                                                    <th scope="col">In Repair</th>
                                                    <th scope="col">Disposed</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body_equipment">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title mb-3">Barangay Captain</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="mx-auto d-block">
                                            <img class="rounded-circle mx-auto d-block" src="images/regie_hababag1.jpg" width="50%" alt="Card image cap">
                                            <h5 class="text-sm-center mt-2 mb-1">Regina Hababag</h5>
                                            <div class="location text-sm-center"><i class="fa fa-map-marker"></i> Culong, Guimba Nueva Ecija</div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <strong class="card-title mb-3">Barangay Officials</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="mx-auto d-block">
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/josel.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on clean & Green, Solid Waste Mngm't</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/edwin.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair. on Education & PWD</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/garcia.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on Public Works / Senior Citizen</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/bengie.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on Sport Development / Disaster Mngm't</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/johnny.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on Peace & Order</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/garray.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on Cultural/Health & Sanitation/Ways & Means</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/mendoza.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Comm.Chair on BIDS/Livelihood/ Entreprenuership/Red Cross 143</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/melvin.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">SK Chairperson</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/hazel.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Barangay Treasurer</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-7">
                                                    <img src="images/nancy.jpg" style="width: 100%;">
                                                </div>
                                                <div class="col-sm-5">
                                                    <label style="font-size: 13px; margin-top: 10px">Barangay Seretary</label>
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
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

        var __table_announcement = function(){

            var payload = {
               METHOD : "fetch_all_dashboard",
            }
            __executeExternalPost('/bms_api/bms/announcement',JSON.stringify(payload)).done(function (result) {
                console.log("==============")
                console.log(result)
                console.log("==============")
                $(".badge_announcement").html(result.count)
                result.payload.forEach(function(data){
                    $('.an_body').prepend(`
                        <div class="card-announcement">
                            <p class="card-text"><b>Date posted: <i>${data.date_created}</i></b></p>
                            <p class="card-text">What: ${data.a_what}</p>
                            <p class="card-text">Where: ${data.a_where}</p>
                            <p class="card-text">When: ${data.a_when}  ${data.a_time} </p>
                        </div>
                        `)
                })
            })
        }
        __table_announcement();

        var __table_blotter = function(){
            $('.table_head_blotter').DataTable().destroy();
            $('.table_body_blotter').empty();

            var payload = {
               METHOD : "fetch_all_dashboard",
            }
            __executeExternalPost('/bms_api/bms/blotter',JSON.stringify(payload)).done(function (result) {
                console.log(result)

                $(".badge_blotter").html(result.count)
                $(".count_b").html(result.count)

                result.payload.forEach(function(data){
                    actions = ((data.status==1) ? "<button class='btn btn-sm btn-primary btn_update "+status+"' type='submit' data-toggle='modal' data-target='#updateBlotter' data-id='"+data.blotter_id+"'><i class='fa fa-refresh'></i> Update</button>"+
                        " <button class='btn btn-sm btn-danger btn_archive "+status+"' type='submit' data-toggle='modal' data-target='#archiveModal' data-id='"+data.blotter_id+"'><i class='fa fa-archive'></i> Archive</button>" : 'ARCHIVED');
                    $('.table_body_blotter').append("<tr>"+
                        "<td>"+data.blotter_id+"</td>"+
                        "<td>"+data.date_occured+" "+data.time_occured+"</td>"+
                        "<td>"+data.complainant+"</td>"+
                        "<td>"+data.complaint+"</td>"+
                        "<td>"+data.suspect+"</td>"+
                        "<td>"+data.involved+"</td>"+
                        "<td>"+data.date_created+"</td>")
                });
                $(document).ready(function () {
                    var table = $('.table_head_blotter').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "20%", "targets": 6 }
                        ],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });

            })
        }
        __table_blotter();

        var __table_equipment = function(){
            $('.table_head_equipment').DataTable().destroy();
            $('.table_body_equipment').empty();

            var payload = {
               METHOD : "fetch_all",
            }
            __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                // console.log(result)
                result.payload.forEach(function(data){
                    // console.log(data)

                    var payload = {
                       METHOD : "fetch_all_ie",
                       equipment_id :data.equipment_id,
                    }
                    // console.log(payload)
                    __executeExternalPost('/bms_api/bms/equipment',JSON.stringify(payload)).done(function (result) {
                        // console.log(result)

                        // $(".badge_eq").html(result.count)
                        // $(".count_eq").html(result.count)

                        
                        if (result.status === "SUCCESS") {
                            var total = 0;
                            var a = 0;
                            var b = 0;
                            var c = 0;
                            var d = 0;
                            result.payload.forEach(function(data){
                                a += parseInt(data.stock);
                                b += parseInt(data.used);
                                c += parseInt(data.repair);
                                d += parseInt(data.disposed);
                            });
                            total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d));
                            $('.table_body_equipment').append("<tr>"+
                                "<td><a class='btn_update_eq btn' href='#!' data-toggle='modal' data-target='#updatestockModal' data-id='"+data.equipment_id+"'>"+data.equipment_name+"</a></td>"+
                                "<td>"+a+"</td>"+
                                "<td>"+b+"</td>"+
                                "<td>"+c+"</td>"+
                                "<td>"+d+"</td>"+
                                "<td>"+total+"</td>")

                            // $(".badge_eq").html(total_count)
                            // $(".count_eq").html(total_count)
                        } else {
                            $('.table_body_equipment').append("<tr>"+
                                "<td><a class='btn_update_eq btn' href='#!' data-toggle='modal' data-target='#updatestockModal' data-id='"+data.equipment_id+"'>"+data.equipment_name+"</a></td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>"+
                                "<td>"+"0"+"</td>")
                        }
                    })
                })

            })
        }
        __table_equipment();

        var __table_resident = function(){
            $('.resident_table').DataTable().destroy();
            $('.table_body_resident').empty();

            var payload = {
               METHOD : "fetch_all_dashboard",
            }
            __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
                console.log(result)
                $(".badge_resident").html(result.count)
                $(".count_r").html(result.count)

                result.payload.forEach(function(data){
                    let civil_status;
                    switch (data.civil_status) {
                    case "1":
                        civil_status = "Single";
                        console.log(civil_status)
                        break;
                    case "2":
                        civil_status = "Married";
                        console.log(civil_status)
                        break;
                    case "3":
                        civil_status = "Widowed";
                        console.log(civil_status)
                        break;
                    case "4":
                        civil_status = "Seperated";
                        console.log(civil_status)
                        break;
                    case "5":
                        civil_status = "Not Indicated";
                        console.log(civil_status)
                        break;
                    default:
                        civil_status = "";
                        break;
                    };

                    voter_status = ((data.voter_status==1) ? "Yes" : 'No');
                    // civil_status = ((data.civil_status==1) ? "Single" : 'Married');

                    $('.table_body_resident').append("<tr>"+
                        "<td>"+data.resident_id+"</td>"+
                        "<td>"+data.first_name+" "+data.middle_name+" "+data.last_name+" "+data.suffix_name+"</td>"+
                        "<td>"+data.street+" Brgy."+data.barangay+" "+data.city+" "+data.province+"</td>"+
                        "<td>"+voter_status+"</td>"+
                        "<td>"+civil_status+"</td>"+
                        "<td>"+data.occupation+"</td>")
                });
                $(document).ready(function () {
                    var table = $('.resident_table').DataTable({
                        order: [[0, 'desc']],
                        "columnDefs": [
                            { "width": "30%", "targets": 2 }
                        ],
                    });
                    $('.dataTables_length').addClass('bs-select');
                });
            })
        }
        __table_resident();

        var payload_male = {
           METHOD : "fetch_all_male",
        }
        __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload_male)).done(function (result) {
            console.log(result)
            $(".count_male").html(result.count)
        })
        var payload_female = {
           METHOD : "fetch_all_female",
        }
        __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload_female)).done(function (result) {
            console.log(result)
            $(".count_female").html(result.count)
        })
        var payload_inv = {
           METHOD : "fetch_all",
        }
        __executeExternalPost('/bms_api/bms/inventory',JSON.stringify(payload_inv)).done(function (result) {
            console.log(result)
            $(".count_eq").html(result.count)
            $(".badge_eq").html(result.count)
        })

    } )( jQuery );
    </script>
</body>

</html>
