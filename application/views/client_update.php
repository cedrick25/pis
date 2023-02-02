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
                            <li><a href="client_list">Client List</a></li>
                            <li class="active">Update</li>
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
                                <strong class="card-title">Update Client</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">First Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g John" class="form-control firstName_update"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Middle Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g A." class="form-control middleName_update"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Last Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Doe" class="form-control lastName_update"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Suffix Name</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Jr." class="form-control suffix_update"></div>
			                    </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Sex</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control gender_update select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Education</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g College" class="form-control education_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Occupation</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Officer" class="form-control occupation_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case No.</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g No.1234" class="form-control cc_no_update"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office_update select2">
                                            <!-- <option selected value="ADULT">Adult</option>
                                            <option value="JUVENILE">Juvenile</option> -->
                                        </select>
                                    </div>
                                </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birthdate</label></div>
			                        <div class="col-12 col-md-9"><input type="date" class="form-control birthdate_update"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Birth Place</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Quezon" class="form-control b_place_update"></div>
			                    </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Address</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Marikina" class="form-control address_update"></div>
                                </div>
                            </div>
                            <div class="card-footer">
			                    <button type="button" class="btn btn-secondary btn-sm btn-reset">Reset</button>
			                    <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
			                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

<!--     <script type="text/javascript">
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

        $('.plea_bargain').change(function(){
            if ($('.plea_bargain').val() == "true") {
                $(".class_sel").show();
            } else {
                $(".class-sel").hide();
            }
            if ($('.plea_bargain').val() == "false"){
            $(".class_sel").hide();
            } else {
                $(".class_sel").show();
            }
        });


        $(".list").html(`
            <div class="list_sentence">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                </div>
            </div>`
        );

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list").append(`
                <div class="list_sentence">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                    </div>
                    <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });
        $('.list').on('click', '.remove', function(e) {
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
                   
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();
        $(".btn-confirm").unbind("click").on("click", function(){
            
            const sentence = [];
            const sentence_inputs = $(".sentence");
            const min_y = $(".min_y");
            const min_m = $(".min_m");
            const min_d = $(".min_d");
            const max_y = $(".max_y");
            const max_m = $(".max_m");
            const max_d = $(".max_d");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                sentence.push(list);
            }
            // console.log(list)
            console.log(sentence)

            var payload = {
                "type"          : "INV",
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
                "sentence"      : JSON.stringify(sentence),
                "courtOrderDate": $(".cod").val(),
                "receivedDate"  : $(".rd").val(),
                "manualDocket"  : false,
                "referral"      : false,
                "typeOfReferral": "",
                "remarks"       : $(".remarks").val(),
                "probationStartDate": "",
                "probationYear" : "",
                "probationMonth": "",
                "probationDay"  :"",
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
                    alert("failed")
                }
            })
        })

    } )( jQuery );
    </script> -->

</body>

</html>