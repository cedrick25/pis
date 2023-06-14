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
                            <li><a href="investigation_docketing">Investigation Docket</a></li>
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
                                <strong class="card-title">Create Investigation List</strong>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success" role="alert" id="success" style="display:none">
                                    <i class="fa fa-check"></i>
                                        Successfully Added  
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control pb_client_type select2">
                                        </select>
                                    </div>
                                </div>
<!-- 			                    <div class="row form-group col-md-6">
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
 -->                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Caseload</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control caseload select2">
                                            <option value="PROBATION_INV_MOTION_FAILURE">Client&#39;s Failure to Report</option>
                                            <option value="PROBATION_INV_CSI">Community Service Investigation</option>
                                            <option value="PROBATION_INV_CCSI">Courtesy Community Service Investigation</option>
                                            <option value="PROBATION_INV_CPI">Courtesy Probation Investigation</option>
                                            <option value="PROBATION_INV_CPI_FULL_BLOWN">Courtesy Probation Investigation - Full Blown</option>
                                            <option value="PROBATION_INV_CPI_PARTIAL">Courtesy Probation Investigation - Partial</option>
                                            <option value="PROBATION_INV_CSSI">Courtesy Suspended Sentence Investigation</option>
                                            <option value="PROBATION_INV_MOTION_DISQUALIFY">Disqualified Client</option>
                                            <option value="PROBATION_INV_GIOR_FOLLOW_UP">Follow-up of GIOR Result</option>
                                            <option value="PROBATION_INV_INVESTIGATION">Probation Investigation</option>
                                            <option value="PROBATION_INV_RPI">Reinvestigation for Client under Probation</option>
                                            <option value="PROBATION_INV_RCS">Reinvestigation for Community Service</option>
                                            <option value="PROBATION_INV_RSS">Reinvestigation for Suspended Sentence</option>
                                            <option value="PROBATION_INV_MOTION_EXTENSION">Request for Extension of Time to Submit PSIR</option>
                                            <option value="PROBATION_INV_RC">Request for Records Check</option>
                                            <option value="PROBATION_INV_RES_RC">Results of Records Check</option>
                                            <option value="PROBATION_INV_SSI">Suspended Sentence Investigation</option>
                                            <option value="PROBATION_INV_TCSI">Transferred Community Service Investigation</option>
                                            <option value="PROBATION_INV_TPI">Transferred Probation Investigation</option>
                                            <option value="PROBATION_INV_TSSI">Transferred Suspended Sentence Investigation</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control client_type select2">
                                            <option selected value="true">Adult</option>
                                            <option value="false">Juvenile</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Criminal Case Number</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Criminal Case No." class="form-control cc_no"></div>
                                </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Offense</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Offense" class="form-control offense"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Court of Origin</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Court of Origin" class="form-control court_origin"></div>
			                    </div>
                                <div class="row form-group col-md-6 false_manual">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Field Office</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control field_office select2" >
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Investigation Officer</label></div>
                                    <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Officer Doe" class="form-control inv_off"></div>
                                </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Military Court</label></div>
			                        <div class="col-12 col-md-9">
			                            <select class="form-control military_court select2">
			                                <option selected value="true">Yes</option>
			                                <option value="false">No</option>
			                            </select>
			                        </div>
			                    </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Plea Bargain</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control plea_bargain select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-6 class_sel" style="display: none;">
                                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Classification</label></div>
                                    <div class="col-12 col-md-9">
                                        <select class="form-control classification select2" >
                                            <option selected value="none" disabled>Choose</option>
                                            <option value="drug">Drug</option>
                                            <option value="non-drug">Non Drug</option>
                                        </select>
                                    </div>
                                </div>
			                    <div class="row form-group col-md-12">
			                        <fieldset class="row col col-md-12">
			                            <legend>List</legend>
			                            <div class="list">
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
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Received Date</label></div>
			                        <div class="col-12 col-md-9"><input type="date" class="form-control rd"></div>
			                    </div>
			                    <div class="row form-group col-md-6">
			                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Remarks</label></div>
			                        <div class="col-12 col-md-9"><input type="text" name="text-input" placeholder="e.g Remarks" class="form-control remarks"></div>
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

    <script type="text/javascript">
    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery"></div>
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
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery"></div>
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
            __executeExternalGet('8088/department/list').done(function (result) {
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

        var __selectclient = function(){
            $('.pb_client').empty();
            __executeExternalGet('8000/petitioner?page=0&size=50&type=PROBATIONER').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.pb_client_type').append("<option selected disabled> - - Select Client - - </option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        console.log(name)
                        $('.pb_client_type').append(
                            '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

        $(".btn-confirm").unbind("click").on("click", function(){
            
            var fname = $('.pb_client_type option:selected').data('fname');
            var mname = $('.pb_client_type option:selected').data('mname');
            var lname = $('.pb_client_type option:selected').data('lname');
            var sname = $('.pb_client_type option:selected').data('sname');

            const sentence = [];
            const sentence_inputs = $(".sentence");
            const min_y = $(".min_y");
            const min_m = $(".min_m");
            const min_d = $(".min_d");
            const max_y = $(".max_y");
            const max_m = $(".max_m");
            const max_d = $(".max_d");
            const civil_liability = $(".civil_liability");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val();
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.civil_liability = $(civil_liability[i]).val();
                sentence.push(list);
            }
            // console.log(list)
            console.log(sentence)

            var payload = {
                "type"                  : "PIS_INV",
                "docketNumber"          : "",
                "docketSeries"          : "NONE",
                "caseloadType"          : $(".caseload").val(),
                "fieldOfficeId"         : $(".field_office").val(),
                "clientType"            : "PROBATIONER",
                "firstName"             : fname,
                "middleName"            : mname,
                "lastName"              : lname,
                "suffixName"            : sname,
                "fullName"              : "",
                "pleaBargain"           : $(".plea_bargain").val(),
                "criminalCaseNumber"    : $(".cc_no").val(),
                "caseClassification"    : $(".classification").val(),
                "offense"               : $(".offense").val(),
                "investigatingOfficer"  : $(".inv_off").val(),
                "courtOfOrigin"         : $(".court_origin").val(),
                "militaryCourt"         : $(".military_court").val(),
                "sentence"              : JSON.stringify(sentence),
                "courtOrderDate"        : $(".cod").val(),
                "receivedDateByPPO"     : $(".rd").val(),
                "manualDocket"          : false,
                "referral"              : false,
                "referralData"          : "",
                "remarks"               : $(".remarks").val(),
                "probationStartDate"    : "",
                "probationYear"         : "",
                "probationMonth"        : "",
                "probationDay"          :"",
                "status"                : 1,
                "legalAge"              : $(".client_type").val(),
                "clientId"              : $(".pb_client_type").val(),
            }
                
            console.log(payload)

            __executeExternalPost('8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
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
    </script>

</body>

</html>