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
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link idenData" href="" aria-selected="true">Identifying Data</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link presOff" href="" aria-selected="false">Present Offense</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active priorRec" id="priorRecordsTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Prior Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link famBg" id="familyBackgroundTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Family Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link socioEco" id="socioEconomicTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Socio-Economic Background</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link resEco" id="residenceEconomicTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Residence/Economic Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link spouseChild" id="spouseChildrenTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Spouse/Children</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link educHis" id="educationHistoryTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Education History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link empHis" id="employmentHistoryTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Employment History</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link envFac" id="environmentalFactorTab" data-toggle="tab" href="" role="tab" aria-controls="supervision" aria-selected="false">Environmental Factor</a>
                                    </li>
                                </ul>
                                <div style="margin-top: 30px;">
                                </div>
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alleged By</label></div>
                                    <div class="col-12 col-md-9">
                                        <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input petitioner" name="optradio" value="PETITIONER">Petitioner 
                                            <input type="radio" class="form-check-input sources" name="optradio" value="OTHER SOURCES">Other Sources
                                        </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Records</label></div>
                                    <div class="col-12 col-md-9">
                                        <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input no_record" name="optradio">No Record
                                            <input type="radio" class="form-check-input w_record" name="optradio">With Derogatory Record
                                        </label>
                                        </div>
                                    </div>
                                </div>
                                <fieldset class="row col col-md-12">
                                        <legend>Records</legend>
                                        <div class="list">
                                        </div>
                                        <div class="col-12">
                                            <button type="button" class="add_more btn btn-success btn-sm float-right">Add more</button>
                                        </div>
                                </fieldset>
                                <div class="row form-group col-md-6">
                                </div>
                                <div class="row form-group col-md-6">
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Has Been of Probation:</label></div>
                                    <div class="col-12 col-md-9">
                                        <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input petitioner" name="optradio" value="YES"> Yes
                                            <input type="radio" class="form-check-input sources" name="optradio" value="NO"> No
                                        </label>
                                        </div>
                                    </div>
                                </div>
                                <fieldset class="row col col-md-12">
                                        <legend>Information</legend>
                                        <div class="list_info">
                                        </div>
                                        <div class="col-12">
                                            <button type="button" class="add_more_info btn btn-success btn-sm float-right">Add more</button>
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

        // $('.plea_bargain').change(function(){
        //     if ($('.plea_bargain').val() == "true") {
        //         $(".class_sel").show();
        //     } else {
        //         $(".class-sel").hide();
        //     }
        //     if ($('.plea_bargain').val() == "false"){
        //     $(".class_sel").hide();
        //     } else {
        //         $(".class_sel").show();
        //     }
        // });


        $(".list").html(`
            <div class="list_records">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control agency" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control cc_no" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control offense" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control when" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control where" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control disposition" placeholder="Disposition"></div>
                </div>
            </div>`
        );

        $(".list_info").html(`
            <div class="list_information">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-3"><input type="text" class="form-control source" placeholder="Source"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control date" placeholder="Date"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control pos" placeholder="Position"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control particulars" placeholder="Particulars"></div>
                </div>
            </div>`
        );

        $(".add_more").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".list").append(`
            <div class="list_records">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control agency" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control cc_no" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control offense" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control when" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control where" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control disposition" placeholder="Disposition"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>
                `
            )
        });

        $(".add_more_info").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".list_info").append(`
            <div class="list_information">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-3"><input type="text" class="form-control source" placeholder="Source"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control date" placeholder="Date"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control pos" placeholder="Position"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control particulars" placeholder="Particulars"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>
                `
            )
        });

        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $('.list_info').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });




        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        var __select = function(){
            $('.field_office').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    setTimeout(function () {
                        $(".field_office").val($.cookie("field_office_id")).trigger("change");
                    }, 2000);
                    
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();


            $(".btn-next").unbind("click").on("click", function(){

            const records = [];
            const agency = $(".agency");
            const cc_no = $(".cc_no");
            const offense = $(".offense");
            const when = $(".when");
            const where = $(".where");
            const disposition = $(".disposition");
            const source = $(".source");
            const date = $(".date");
            const pos = $(".pos");
            const particulars = $(".particulars");

            for(var i = 0; i < agency.length; i++){

                const list = {};
                list.agency = $(agency[i]).val();
                list.cc_no = $(cc_no[i]).val();
                list.offense = $(offense[i]).val();
                list.when = $(when[i]).val();
                list.where = $(where[i]).val();
                list.disposition = $(disposition[i]).val();
                list.source = $(source).val();
                list.date = $(date).val();
                list.pos = $(pos).val();
                list.particulars = $(particulars).val();
                records.push(list);
            }

            // console.log(records)
            // console.log(info)

            var priorRecords = {

                priorRecord         : records,

            }

            console.log(priorRecords)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(priorRecords),
            "type"                      : "priorRecords",
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
                            window.location.href = 'http://localhost/pis/worksheet_family_background?client_id='+client_id;
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