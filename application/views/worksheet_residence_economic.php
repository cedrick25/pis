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
                            <li><a href="">Worksheet Create</a></li>
                            <li class="active">Residence/Economic Conditions</li>
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
                                <strong class="card-title">Residence/Economic Conditions</strong>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link idenData" href="">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link presOff" href="">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link priorRec" href="">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link famBg" href="">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socioEco" href="">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active resEco" href="">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouseChild" href="">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link educHis" href="">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link empHis" href="">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link envFac" href="">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>

                                <fieldset class="row col col-md-12">
                                        <legend>Residence</legend>
                                        <div class="residence">
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Stability of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_stability select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FREQUENT CHANGE">Frequent Change</option>
                                                    <option value="NO STABILITY">No Stability</option>
                                                    <option value="OCCASIONAL CHANGE">Occasional Change</option>
                                                    <option value="STABLE">Stable</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Type of Residence</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control residence_type select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="INFORMAL SETTLER">Informal Settler</option>
                                                    <option value="OWNED">Owned</option>
                                                    <option value="OWNED BY PARENTS">Owned by Parents</option>
                                                    <option value="RENTED">Rented</option>
                                                    <option value="USED FREE">Used Free</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row form-group col-md-6">
                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                                            <div class="col-12 col-md-9">
                                                <select class="form-control res_home_cond select2">
                                                    <option value="" selected disabled>-- select one --</option>
                                                    <option value="FAIR">Fair</option>
                                                    <option value="POOR">Poor</option>
                                                    <option value="SATISFACTORY">Satisfactory</option>
                                                    <option value="VERY SATISFACTORY">Very Satisfactory</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button type="button" class="add_more_residence btn btn-success btn-sm float-right">Add more</button>
                                        </div>

                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Economic Conditions</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Family Status</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_status select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="ADEQUATE">Adequate</option>
                                                        <option value="BELOW POVERTY">Below Poverty Lines</option>
                                                        <option value="INADEQUATE">Inadequate</option>
                                                        <option value="MORE ADEQAUTE">More than adequate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Breadwinner</label></div>
                                                <div class="col-12 col-md-9">
                                                    <select class="form-control fam_breadwinner select2">
                                                        <option value="" selected disabled>-- select one --</option>
                                                        <option value="CLIENT">Client</option>
                                                        <option value="CLIENT & SPOUSE">Client and Spouse</option>
                                                        <option value="CLIENT & SPOUSE & CHILD">Client,Spouse and Children</option>
                                                        <option value="OTHERS">Others</option>
                                                        <option value="SPOUSE">Spouse</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">No. of Dependants</label></div>
                                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="Ceremony" class="form-control no_dependants"></div>
                                            </div>

                                            <div class="row form-group col-md-6">
                                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Dependants</label></div>
                                                <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control dependants"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

                                <fieldset class="row col col-md-12">
                                        <legend>Major Family Problems</legend>
                                        <div class="economic_conditions">
                                        </div>
                                        <div class="col-12">

                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Family Problems</label></div>
                                                <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control maj_fam_prob"></textarea></div>
                                            </div>
                                            
                                            <div class="row form-group col-md-12">
                                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Comments</label></div>
                                                <div class="col-12 col-md-10"><textarea rows="2" cols="50" class="form-control fam_comments"></textarea></div>
                                            </div>

                                        </div>
                                </fieldset>

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
       
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });
       
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });


        $(".add_more_residence").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".residence").append(`
            <div class="res">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control resAdd"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateFrom"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateTo"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.residence').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $(".btn-next").unbind("click").on("click", function(){

            const residence = [];
            const resAdd = $(".resAdd");
            const dateFrom = $(".dateFrom");
            const dateTo = $(".dateTo");

            for(var i = 0; i < resAdd.length; i++){
                
                const list = {};
                list.resAdd = $(resAdd[i]).val();
                list.dateFrom = $(dateFrom[i]).val();
                list.dateTo = $(dateTo[i]).val();
                residence.push(list);
            }


            var residenceEco = {

                residence            : residence,
                residenceStability   :  $(".res_stability").val(),
                residenceType        :  $(".residence_type").val(),
                residenceHomeCondition:  $(".res_home_cond").val(),
                fam_status           : $(".fam_status").val(),
                fam_breadwinner      : $(".fam_breadwinner").val(),
                no_dependants        : $(".res_home_cond").val(),
                dependants           : $(".dependants").val(),
                maj_fam_prob         : $(".maj_fam_prob").val(),
                fam_comments         : $(".fam_comments").val()

            }

            console.log(residenceEco)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(residenceEco),
            "type"                      : "residenceEconomic",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid")
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
                            window.location.href = 'http://localhost/pis/worksheet_spouse_children?client_id='+client_id;
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