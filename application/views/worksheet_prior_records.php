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
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Alleged By</label></div>
                                    <div class="col-12 col-md-9">
                                        <div class="form-check-inline">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input petitioner" name="optradio">Petitioner 
                                            <input type="radio" class="form-check-input sources" name="optradio">Other Sources
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
                                            <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
                                        </div>
                                    </fieldset>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
                                <button type="button" class="btn btn-success btn-confirm btn-sm">Save & Next</button>
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
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_y" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_m" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_d" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_y" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_m" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_d" placeholder="Disposition"></div>
                </div>
            </div>`
        );

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list").append(`
                <div class="list_records">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_y" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_m" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control min_d" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_y" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_m" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control max_d" placeholder="Disposition"></div>
                </div>
            </div>
                `
            )
        });
        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });
        // $(".btn-reset").unbind("click").on("click", function(){
        //     $(".form-control").val('');
        // });

        // var __select = function(){
        //     $('.field_office').empty();

        //     __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
        //         // console.log(result)
        //         if (result.status != "ERROR") {
        //             $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
        //             result.forEach(function(data){
        //                 $('.field_office').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");
        //             });
        //             setTimeout(function () {
        //                 $(".field_office").val($.cookie("field_office_id")).trigger("change");
        //             }, 2000);
                    
        //         } else {
        //             console.log("failed fetching docket list")
        //         }
        //     })
        // }
        // __select();
        // $(".btn-confirm").unbind("click").on("click", function(){
            
        //     const sentence = [];
        //     const sentence_inputs = $(".sentence");
        //     const min_y = $(".min_y");
        //     const min_m = $(".min_m");
        //     const min_d = $(".min_d");
        //     const max_y = $(".max_y");
        //     const max_m = $(".max_m");
        //     const max_d = $(".max_d");
        //     const civil_liability = $(".civil_liability");

        //     for(var i = 0; i < sentence_inputs.length; i++){
        //         const list = {};
        //         list.sentence = $(sentence_inputs[i]).val()
        //         list.min_y = $(min_y[i]).val();
        //         list.min_m = $(min_m[i]).val();
        //         list.min_d = $(min_d[i]).val();
        //         list.max_y = $(max_y[i]).val();
        //         list.max_m = $(max_m[i]).val();
        //         list.max_d = $(max_d[i]).val();
        //         list.civil_liability = $(civil_liability[i]).val();
        //         sentence.push(list);
        //     }
        //     // console.log(list)
        //     console.log(sentence)

        //     var payload = {
        //         "type"          : "PIS_INV",
        //         "docketNumber"  : "",
        //         "docketSeries"  : "NONE",
        //         "caseloadType"  : $(".caseload").val(),
        //         "fieldOfficeId" : $(".field_office").val(),
        //         "clientType"    : "PROBATIONER",
        //         "firstName"     : $(".firstName").val(),
        //         "middleName"    : $(".middleName").val(),
        //         "lastName"      : $(".lastName").val(),
        //         "suffixName"    : $(".suffix").val(),
        //         "fullName"              : "",
        //         "pleaBargain"           : $(".plea_bargain").val(),
        //         "criminalCaseNumber"    : $(".cc_no").val(),
        //         "caseClassification"    : $(".classification").val(),
        //         "offense"               : $(".offense").val(),
        //         "investigatingOfficer"  : $(".inv_off").val(),
        //         "courtOfOrigin"         : $(".court_origin").val(),
        //         "militaryCourt"         : $(".military_court").val(),
        //         "sentence"              : JSON.stringify(sentence),
        //         "courtOrderDate"        : $(".cod").val(),
        //         "receivedDateByPPO"     : $(".rd").val(),
        //         "manualDocket"          : false,
        //         "referral"              : false,
        //         "referralData"          : "",
        //         "remarks"               : $(".remarks").val(),
        //         "probationStartDate"    : "",
        //         "probationYear"         : "",
        //         "probationMonth"        : "",
        //         "probationDay"          :"",
        //         "status"                : 1,
        //         "legalAge"              : $(".client_type").val(),
        //     }
                
        //     console.log(payload)
        //     __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
        //         console.log(result);
        //         if (result.status != "ERROR") {
        //             $(".form-control").val('');
        //             $('#success').show();
        //             setTimeout(function () {
        //                 $('#success').hide();
        //             }, 2000);
        //         }else{
        //             alert("failed")
        //         }
        //     })
        // })

    } )( jQuery );
    </script>

</body>

</html>