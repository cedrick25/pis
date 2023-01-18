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
                            <li><a href="dashboard">Supervision Docket</a></li>
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
                                <div id="prompt">
                                </div>
                            </div>
                            <div class="card-body">
				                <div class="modal-body col-md-12">
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix"></div>
				                    </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type">
                                            <option selected value="ADULT">Adult</option>
                                            <option value="JUVENILE">Juvenile</option>
                                        </select>
                                    </div>
                                </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CC No.</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">CO</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin"></div>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Is this Military Court?</label></div>
				                        <div class="col-12 col-md-9">
				                            <select class="form-control military_court">
				                                <option value="Yes">Yes</option>
				                                <option value="No">No</option>
				                            </select>
				                        </div>
				                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Manual Docket</label></div>
                                        <div class="col-12 col-md-9">
                                            <select class="form-control manual_docket">
                                                <option selected value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
				                    <div class="row form-group col-md-12">
				                        <fieldset class="row col col-md-12">
				                            <legend>List</legend>
				                            <div class="list">
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
				                            </div>
				                            <div class="col-12">
				                                <button type="button" class="add_more btn btn-primary btn-success btn-sm float-right">Add more</button>
				                            </div>
				                        </fieldset>
				                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court Order Date</label></div>
				                        <div class="col-12 col-md-9"><input type="date" class="form-control cod"></div>
				                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Start Date</label></div>
                                        <div class="col-12 col-md-9"><input type="date" class="form-control prob_start"></div>
                                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
				                        <div class="col-12 col-md-9"><input type="date" class="form-control rd"></div>
				                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Year</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Year" class="form-control prob_year"></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Month</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Month" class="form-control prob_month"></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Probation Day</label></div>
                                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="Day" class="form-control prob_day"></div>
                                    </div>
				                    <div class="row form-group col-md-6">
				                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
				                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
				                    </div>
				                </div>                            
				                <div class="modal-footer">
				                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
				                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
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
                "fieldOfficeId" : "",
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

    } )( jQuery );
    </script>

</body>

</html>