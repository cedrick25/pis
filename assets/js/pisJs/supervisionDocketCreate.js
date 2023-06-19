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

        $(".list_true").html(`
            <div class="list_sentence_true">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_true"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y_true" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m_true" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d_true" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y_true" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m_true" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d_true" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control cl_true" placeholder="Robbery"></div>
                </div>
            </div>`
        );

        $(".list_false").html(`
            <div class="list_sentence_false">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                    <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery"></div>
                </div>
            </div>`
        );

        $(".add_more_true").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list_true").append(`
                <div class="list_sentence_true">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_true"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y_true" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m_true" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d_true" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y_true" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m_true" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d_true" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl_true" placeholder="Robbery"></div>
                    </div>
                    <button type="button" class="remove_true btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });

        $(".add_more_false").unbind("click").on("click", function(){
            console.log("clicked");

            $(".list_false").append(`
                <div class="list_sentence_false">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery"></div>
                    </div>
                    <button type="button" class="remove_false btn btn-danger btn-sm float-left">Remove</button>
                </div>
                `
            )
        });


        $('.list_true').on('click', '.remove_true', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $('.list_false').on('click', '.remove_false', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

// select manual docket is set to false
    var __select = function(){
        $('.docket_num').empty();
        $('.field_office').empty();

        __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.field_office_true').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_true').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                $('.field_office_false').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_false').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
               
            } else {
                    console.log("failed fetching docket list")
                    }
    })

        var __selectclient = function(){
            $('.pb_client_sup').empty();
            $('.pb_client_sup_false').empty();
            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PROBATIONER').done(function (result) {
                console.log("++client result++")
                console.log(result)
                console.log("++client result++")
                console.log(" ")
                console.log(" ")
                if (result.status != "ERROR") {
                    $('.pb_client_sup').append("<option selected disabled> - - Select Client - - </option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        // console.log(name)
                        $('.pb_client_sup').append(
                            '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                    // $('.pb_client_sup_false').append("<option selected disabled> - - Select Client - - </option>");
                    // result.content.forEach(function(data){
                    //     var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                    //     // console.log(name)
                    //     $('.pb_client_sup_false').append(
                    //         '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    // });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

// manual docket is set to false
        __executeExternalGet('http://localhost:8000/docketbook/list/PIS_INV/'+$.cookie("field_office_id")).done(function (result) {
        console.log(result)
            if (result.status != "ERROR") {

                // if manual docket is false
                $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                    result.response.forEach(function(data){
                        console.log(data)
                        $('.docket_num').append(
                            "<option value="+data.docketNumber+">"+data.docketNumber+"</option>");
                    });


                        $('.docket_num').on('change', function() {
                            $(".manual_false").show();
                            const docket = this.value
                                __executeExternalGet('http://localhost:8000/docketbook/'+docket+'/'+$.cookie("field_office_id")).done(function (result) {
                                    console.log(result)
                                    var result = result.response;
                                    if (result.status != "ERROR") {
                                        $(".docket_num").val(result.docketNumber);
                                        $(".firstName_false").val(result.firstName);
                                        $(".middleName_false").val(result.middleName);
                                        $(".lastName_false").val(result.lastName);
                                        $(".suffix_false").val(result.suffixName);
                                        // $(".client_type").val(result.clientType).trigger("change");
                                        $(".cc_no_false").val(result.criminalCaseNumber);
                                        $(".offense_false").val(result.offense);
                                        $(".pb_client_sup_false").val(result.caseloadType).trigger("change");
                                            setTimeout(function () {
                                                $(".field_office_false").val(result.fieldOfficeId).trigger("change");
                                            }, 3000);
                                                    if (result.legalAge == true) {
                                                        var la = "true"
                                                    } else {
                                                        var la = "false"
                                                    }
                                        $(".caseload_false").val(result.caseloadType).trigger("change");
                                        $(".client_type_false").val(la).trigger("change");
                                        $(".cc_no_false").val(result.criminalCaseNumber);
                                        $(".offense_false").val(result.offense);
                                        $(".court_origin_false").val(result.courtOfOrigin);
                                                    if (result.militaryCourt == true) {
                                                        var mc = "true"
                                                    } else {
                                                        var mc = "false"
                                                    }
                                        $(".military_court_false").val(mc).trigger("change");
                                        $(".sentence_false").val(result.sentence);
                                        $(".cod_false").val(result.courtOrderDate);
                                        $(".rd_false").val(result.receivedDateByPPO);
                                        $(".remarks_false").val(result.remarks);
                                        $(".inv_off_false").val(result.investigatingOfficer);
                                                    if (result.pleaBargain == true) {
                                                        var plea = "true"
                                                    } else {
                                                        var plea = "false"
                                                    }
                                        $(".plea_bargain_false").val(plea).trigger("change");
                                        $(".classification_false").val(result.caseClassification).trigger("change");

                                            $(".list_false").empty();
                                            console.log(JSON.parse(result.sentence))
                                            JSON.parse(result.sentence).forEach(function(data){
                                                $(".list_false").append(`
                                                    <div class="list_sentence_false">
                                                        <div class="row form-group col-md-12">
                                                            <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                                            <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false">${data.sentence}</textarea></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" placeholder="Year" value="${data.min_y}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" placeholder="Month" value="${data.min_m}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" placeholder="Day" value="${data.min_d}"></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" placeholder="Year" value="${data.max_y}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" placeholder="Month" value="${data.max_m}"></div>
                                                            <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" placeholder="Day" value="${data.max_d}"></div>
                                                        </div>
                                                        <div class="row form-group col-md-6">
                                                            <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                                            <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" placeholder="Robbery" value="${data.civil_liability}"></div>
                                                        </div>
                                                        <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                                                    </div>`
                                                )
                                            });
                                    };
                                });
                        });
            } else {
            console.log("failed fetching docket number")
            }
    });
}
// select manual docket is set to false


        // manual docket
        var manual = $('.manual_docket').val()
        console.log(manual)
        if ($('.manual_docket').val() == "false"){
            __select();
            $(".manual_false").hide();
            $(".manual_true").hide();
        } else {
            $(".manual_false").hide();
            $(".manual_true").hide();
            $(".docket_display").hide();
        }
        $('.manual_docket').change(function(){
            cb = $(this);
            cb.val(cb.prop('checked'));
            console.log($('.manual_docket').val())
            if ($('.manual_docket').val() == "true") {
                $(".docket_display").hide();
                $(".form-control").val('');
                $(".manual_false").hide();
                $(".manual_true").show();
                
            } else {
                $(".manual_false").hide();
                $(".manual_true").hide();
                $(".docket_display").show();
                $(".form-control").val('');
                __select();
            }
        });

        $('.plea_bargain_false').change(function(){
            if ($('.plea_bargain_false').val() == "true") {
                $(".class_sel_false").show();
            } else {
                $(".class_sel_false").hide();
            }
            if ($('.plea_bargain_false').val() == "false"){
                $(".class_sel_false").hide();
            } else {
                $(".class_sel_false").show();
            }
        });

        $('.plea_bargain_true').change(function(){
            if ($('.plea_bargain_true').val() == "true") {
                $(".class_sel_true").show();
            } else {
                $(".class_sel_true").hide();
            }
            if ($('.plea_bargain_true').val() == "false"){
                $(".class_sel_true").hide();
            } else {
                $(".class_sel_true").show();
            }
        });

            $(".btn-confirm_true").unbind("click").on("click", function(){
                console.log("clicked true")

            var fname = $('.pb_client_sup option:selected').data('fname');
            var mname = $('.pb_client_sup option:selected').data('mname');
            var lname = $('.pb_client_sup option:selected').data('lname');
            var sname = $('.pb_client_sup option:selected').data('sname');

            console.log(fname+","+mname+","+lname+","+sname)

            const sentence = [];
            const sentence_inputs = $(".sentence_true");
            const min_y = $(".min_y_true");
            const min_m = $(".min_m_true");
            const min_d = $(".min_d_true");
            const max_y = $(".max_y_true");
            const max_m = $(".max_m_true");
            const max_d = $(".max_d_true");
            const cl_true = $(".cl_true_true");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.cl_true = $(cl_true[i]).val();
                sentence.push(list);
            }
            var md;
            if ($(".manual_docket").val() == "true") {
                md = true
            } else {
                md = false
            }
            
            var payload_true = {
                "type": "PIS_SUP",
                "docketNumber": "",
                "docketSeries": "NONE",
                "caseloadType": $(".caseload_true").val(),
                "fieldOfficeId": $(".field_office_true").val(),
                "clientType": "PROBATIONER",
                "clientId": "",
                "firstName": fname,
                "middleName": mname,
                "lastName": lname,
                "suffixName": sname,
                "fullName": "",
                "pleaBargain": $(".plea_bargain_true").val(),
                "caseClassification": $(".classification_true").val(),
                "criminalCaseNumber": $(".cc_no_true").val(),
                "offense": $(".offense_true").val(),
                "courtOfOrigin": $(".court_origin_true").val(),
                "courtOrderDate": $(".cod_true").val(),
                "investigatingOfficer": $(".inv_off_true").val(),
                "receivedDateByPPO": $(".rd_true").val(),
                "sentence": JSON.stringify(sentence),
                "manualDocket": false,
                "referral": false,
                "referralData": "",
                "remarks": "",
                "probationStartDate": "",
                "probationYear": "",
                "probationMonth": "",
                "probationDay": "",
                "prisonName": "",
                "investigationReportSubmittedDate": "",
                "ppoRecommendation": "",
                "recommendationState": "",
                "dateOfTransfer": "",
                "transferredOfficeId": "",
                "dateOrderReceivedFromTheBoard": "",
                "boardOrder": "",
                "boardOrderStatus": "",
                "referringOfficeId": "",
                "dateCICAR": "",
                "supervisingOfficer": "",
                "supervisionStartDate": "",
                "supervisionEndDate": "",
                "probationEndDate": "",
                "reportType": "",
                "referralType": "",
                "dateReportSubmittedToTheBoard": "",
                "dateReportSubmittedToRDForTransferToOtherPPO": "",
                "resolutionType": "",
                "dateResolutionFromTheBoard": "",
                "dateResolutionFromTheRDForTransfer": "",
                "createdBy": "",
                "updatedBy": "",
                "legalAge": $(".client_type_true").val(),
                "militaryCourt": $(".military_court_true").val()
            }
            console.log(payload_true)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload_true)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.reload(true);
                    }, 2000);
                }else{
                }
            })   
        })



            $(".btn-confirm_false").unbind("click").on("click", function(){
                console.log("clicked false")

            var fname = $('.pb_client_sup option:selected').data('fname');
            var mname = $('.pb_client_sup option:selected').data('mname');
            var lname = $('.pb_client_sup option:selected').data('lname');
            var sname = $('.pb_client_sup option:selected').data('sname');

            const sentence = [];
            const sentence_inputs = $(".sentence_false");
            const min_y = $(".min_y_false");
            const min_m = $(".min_m_false");
            const min_d = $(".min_d_false");
            const max_y = $(".max_y_false");
            const max_m = $(".max_m_false");
            const max_d = $(".max_d_false");
            const cl_false = $(".cl_false");

            for(var i = 0; i < sentence_inputs.length; i++){
                const list = {};
                list.sentence = $(sentence_inputs[i]).val()
                list.min_y = $(min_y[i]).val();
                list.min_m = $(min_m[i]).val();
                list.min_d = $(min_d[i]).val();
                list.max_y = $(max_y[i]).val();
                list.max_m = $(max_m[i]).val();
                list.max_d = $(max_d[i]).val();
                list.cl_false = $(cl_false[i]).val();
                sentence.push(list);
            }
            var md;
            if ($(".manual_docket").val() == "false") {
                md = false
            } else {
                md = true
            }

            var payload_false = {
                  "type": "PIS_SUP",
                  "docketNumber": "",
                  "docketSeries": "NONE",
                  "caseloadType": $(".caseload_false").val(),
                  "fieldOfficeId": $(".field_office_false").val(),
                  "clientType": "PROBATIONER",
                  "clientId": "",
                  "firstName": $(".firstName_false").val(),
                  "middleName": $(".middleName_false").val(),
                  "lastName": $(".lastName_false").val(),
                  "suffixName": $(".suffix_false").val(),
                  "fullName": "",
                  "pleaBargain": $(".plea_bargain_false").val(),
                  "caseClassification": $(".classification_false").val(),
                  "criminalCaseNumber": $(".cc_no_false").val(),
                  "offense": $(".offense_false").val(),
                  "courtOfOrigin": $(".court_origin_false").val(),
                  "courtOrderDate": $(".cod_false").val(),
                  "investigatingOfficer": $(".inv_off_false").val(),
                  "receivedDateByPPO": $(".rd_false").val(),
                  "sentence": JSON.stringify(sentence),
                  "manualDocket": false,
                  "referral": false,
                  "referralData": "",
                  "remarks": "",
                  "probationStartDate": "",
                  "probationYear": "",
                  "probationMonth": "",
                  "probationDay": "",
                  "prisonName": "",
                  "investigationReportSubmittedDate": "",
                  "ppoRecommendation": "",
                  "recommendationState": "",
                  "dateOfTransfer": "",
                  "transferredOfficeId": "",
                  "dateOrderReceivedFromTheBoard": "",
                  "boardOrder": "",
                  "boardOrderStatus": "",
                  "referringOfficeId": "",
                  "dateCICAR": "",
                  "supervisingOfficer": "",
                  "supervisionStartDate": "",
                  "supervisionEndDate": "",
                  "probationEndDate": "",
                  "reportType": "",
                  "referralType": "",
                  "dateReportSubmittedToTheBoard": "",
                  "dateReportSubmittedToRDForTransferToOtherPPO": "",
                  "resolutionType": "",
                  "dateResolutionFromTheBoard": "",
                  "dateResolutionFromTheRDForTransfer": "",
                  "createdBy": "",
                  "updatedBy": "",
                  "legalAge": $(".client_type_false").val(),
                  "militaryCourt": $(".military_court_false").val()
            }
            console.log(payload_false)
            __executeExternalPost('http://localhost:8000/docketbook/create',JSON.stringify(payload_false)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.reload(true);
                    }, 2000);
                }else{
                }
            })   
        })

    } )( jQuery );