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
                        <h1>Create</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="supervision_docketing">Supervision Docket</a></li>
                            <li class="active">Create</li>
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
                                <strong class="card-title">Create Supervision Docket</strong>
                                    <div class="row form-group col-md-6 float-right">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manual Docket</label></div>
                                        <div class="col-12 col-md-6">
                                            <select class="form-control manual_docket select2">
                                                
                                            </select>
                                        </div>
                                    </div>
                                <div id="prompt">
                                </div>
                            </div>
                            <div class="card-body">
				                <div class="col-md-12">
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Offices</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control field_office select2" disabled>
                                                <option selected value="1">Central Office</option>
                                                <option value="2">San Juan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row form-group col-md-6 docket_display" style="display:none">       
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Docket Number</label></div>
                                        <div class="col-12 col-md-9">
                                        <select name="select" class="form-control docket_num select2">
                                        </select>
                                        </div>
                                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix" disabled></div>
				                    </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type" disabled>
                                            <option selected value="ADULT">Adult</option>
                                            <option value="JUVENILE">Juvenile</option>
                                        </select>
                                    </div>
                                </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin" disabled></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Is this Military Court?</label></div>
				                        <div class="col-12 col-md-9">
				                            <select class="form-control military_court select2" disabled>
				                                <option value="true">Yes</option>
				                                <option value="false">No</option>
				                            </select>
				                        </div>
				                    </div>
				                    <div class="row form-group col-md-12">
				                        <fieldset class="row col col-md-12">
				                            <legend>List</legend>
				                            <div class="list">
				                                <div class="row form-group col-md-12">
				                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
				                                    <div class="col-12 col-md-11"><textarea id="" name="" rows="2" cols="50" class="form-control sentence" disabled></textarea></div>
				                                </div>
				                                <div class="row form-group col-md-6">
				                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_yr" placeholder="Year" disabled></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_month" placeholder="Month" disabled></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_day" placeholder="Day" disabled></div>
				                                </div>
				                                <div class="row form-group col-md-6">
				                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label" disabled>Max</label></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_yr" placeholder="Year" disabled></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_month" placeholder="Month" disabled></div>
				                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_day" placeholder="Day" disabled></div>
				                                </div>
				                            </div>
				                            <div class="col-12">
				                                <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right" disabled>Add more</button>
				                            </div>
				                        </fieldset>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
				                        <div class="col-12 col-md-9"><input type="date" class="form-control cod" disabled></div>
				                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Start Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control prob_start" disabled></div>
                                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
				                        <div class="col-12 col-md-9"><input type="date" class="form-control rd" disabled></div>
				                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Year</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Year" class="form-control prob_year" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Month</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Month" class="form-control prob_month" disabled></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Day</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Day" class="form-control prob_day" disabled></div>
                                    </div>
                                    <!-- <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks" disabled></div>
                                    </div> -->
				                </div>                            
				                <div class="modal-footer">
				                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" disabled>Cancel</button>
				                    <button type="button" class="btn btn-primary btn-confirm btn-sm" disabled>Confirm</button>
				                </div>
				                </div>
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

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked")
            $(".list").append(`
                <div class="">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea id="" name="" rows="2" cols="50" class="form-control sentence"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max" placeholder="Day"></div>
                    </div>
                    <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                </div>`
            )
        });
        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });
        $(".btn-confirm").unbind("click").on("click", function(){

            var payload = {
                "type"          : "SUP",
                "docketNumber"  : "",
                "fieldOfficeId" : $(".field_office").val(),
                "clientType"    : $(".client_type").val(),
                "firstName"     : $(".firstName").val(),
                "middleName"    : $(".middleName").val(),
                "lastName"      : $(".lastName").val(),
                "suffixName"    : $(".suffix").val(),
                "criminalCaseNumber" : $(".cc_no").val(),
                "offense"       : $(".offense").val(),
                "courtOfOrigin" : $(".court_origin").val(),
                "militaryCourt" : $(".military_court").val(),
                "sentence"      : $(".sentence").val(),
                "courtOrderDate": $(".cod").val(),
                "receivedDate"  : $(".rd").val(),
                "manualDocket"  : $(".manual_docket").val(),
                "referral"      : false,
                "typeOfReferral": "",
                "remarks"       : $(".remarks").val(),
                "probationStartDate": $(".prob_start").val(),
                "probationYear" : $(".prob_year").val(),
                "probationMonth": $(".prob_month").val(),
                "probationDay"  : $(".prob_day").val(),
                "status"        : 1,
            }
            console.log(payload)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                    }, 2000);
                }else{
                //     console.log(result.status);
                //     alert(result.message)
                }
            })   
        })
        
        var docket_number = GetURLParameter('docket_number');

        var __select = function(){
            $('.manual_docket').html('<option  value="true">True</option> <option selected value="false">False</option>');

            __executeExternalGet('http://localhost:8000/docketbook/list/inv').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    // $('.manual_docket').append("<option selected disabled> - - Select  - - </option>");
                    // result.forEach(function(data){
                    //     console.log(data)
                    //      $('.manual_docket').append(
                    //          "<option value="+data.docketNumber+">"+data.manualDocket+"</option>");
                    // });
                    $('.manual_docket').on('change', function() {
                        // $('.docket_num').empty();
                        $('.field_office').removeAttr('disabled');
                        $('.firstName').removeAttr('disabled');
                        $('.middleName').removeAttr('disabled');
                        $('.lastName').removeAttr('disabled');
                        $('.suffix').removeAttr('disabled');
                        $('.client_type').removeAttr('disabled');
                        $('.cc_no').removeAttr('disabled');
                        $('.court_origin').removeAttr('disabled');
                        $('.military_court').removeAttr('disabled');
                        $('.offense').removeAttr('disabled');
                        $('.sentence').removeAttr('disabled');
                        $('.min_yr').removeAttr('disabled');
                        $('.min_month').removeAttr('disabled');
                        $('.min_day').removeAttr('disabled');
                        $('.max_yr').removeAttr('disabled');
                        $('.max_month').removeAttr('disabled');
                        $('.max_day').removeAttr('disabled');
                        $('.add_more').removeAttr('disabled');
                        $('.cod').removeAttr('disabled');
                        $('.rd').removeAttr('disabled');
                        $('.prob_start').removeAttr('disabled');
                        $('.prob_year').removeAttr('disabled');
                        $('.prob_month').removeAttr('disabled');
                        $('.prob_day').removeAttr('disabled');
                        $('.remarks').removeAttr('disabled');
                        __executeExternalGet('http://localhost:8000/docketbook/list/inv').done(function (result) {
                            console.log(result)
                            if (result.status != "ERROR") {
                                $(".docket_display").show();
                                $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                                result.content.forEach(function(data){
                                    console.log(data)
                                    $('.docket_num').append(
                                        "<option value="+data.id+">"+data.docketNumber+"</option>");
                                });
                            } else {
                                console.log("failed fetching docket number")
                                $(".docket_display").hide();
                            }
                        });
                    });
                } else {
                    console.log("failed fetching docket number")
                }
            })
        }
        __select();

    } )( jQuery );
    </script>

</body>

</html>