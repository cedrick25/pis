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

        $('.plea_bargain_update').change(function(){
            if ($('.plea_bargain_update').val() == "true") {
                $(".class_sel").show();
            } else {
                $(".class-sel").hide();
            }
            if ($('.plea_bargain_update').val() == "false"){
            $(".class_sel").hide();
            } else {
                $(".class_sel").show();
            }
        });

        $(".add_more").unbind("click").on("click", function(){
            console.log("clicked")
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
                </div>`
            )
        })
        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });
        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });
        var docket_number = GetURLParameter('docket_number');
        var __fields = function(){
            __executeExternalGet('http://localhost:8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docketNum_update").val(result.docketNumber);
                    $(".firstName_update").val(result.firstName);
                    $(".middleName_update").val(result.middleName);
                    $(".lastName_update").val(result.lastName);
                    $(".suffix_update").val(result.suffixName);
                    setTimeout(function () {
                        $(".field_office_update").val(result.fieldOfficeId).trigger("change");
                    }, 3000);
                    if (result.legalAge == true) {
                        var la = "true"
                    } else {
                        var la = "false"
                    }

                    $(".caseload_update").val(result.caseloadType).trigger("change");
                    $(".client_type_update").val(la).trigger("change");
                    $(".cc_no_update").val(result.criminalCaseNumber);
                    $(".offense_update").val(result.offense);
                    $(".court_origin_update").val(result.courtOfOrigin);
                    if (result.militaryCourt == true) {
                        var mc = "true"
                    } else {
                        var mc = "false"
                    }
                    $(".military_court_update").val(mc).trigger("change");
                    $(".sentence_update").val(result.sentence);
                    $(".cod_update").val(result.courtOrderDate);
                    $(".rd_update").val(result.receivedDateByPPO);
                    $(".remarks_update").val(result.remarks);
                    $(".inv_off_update").val(result.investigatingOfficer);
                    if (result.pleaBargain == true) {
                        var plea = "true"
                    } else {
                        var plea = "false"
                    }
                    $(".plea_bargain_update").val(plea).trigger("change");
                    $(".classification_update").val(result.caseClassification).trigger("change");

                    console.log(JSON.parse(result.sentence))
                    JSON.parse(result.sentence).forEach(function(data){
                        $(".list").append(`
                            <div class="list_sentence">
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence">${data.sentence}</textarea></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year" value="${data.min_y}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month" value="${data.min_m}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day" value="${data.min_d}"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year" value="${data.max_y}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month" value="${data.max_m}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day" value="${data.max_d}"></div>
                                </div>
                                <div class="row form-group col-md-6">
                                    <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                    <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery" value="${data.civil_liability}"></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-left">Remove</button>
                            </div>`
                        )
                    });

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')

                        var clientId = result.clientId;
                        console.log(clientId)
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
                            list.sentence = $(sentence_inputs[i]).val()
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
                            "type"          : "PIS_INV",
                            "docketNumber"  : docket_number,
                            "docketSeries"  : "NONE",
                            "caseloadType"  : $(".caseload_update").val(),
                            "fieldOfficeId" : $(".field_office_update").val(),
                            "clientType"    : "PROBATIONER",
                            "firstName"     : $(".firstName_update").val(),
                            "middleName"    : $(".middleName_update").val(),
                            "lastName"      : $(".lastName_update").val(),
                            "suffixName"    : $(".suffix_update").val(),
                            "fullName"              : "",
                            "pleaBargain"           : $(".plea_bargain_update").val(),
                            "criminalCaseNumber"    : $(".cc_no_update").val(),
                            "caseClassification"    : $(".classification_update").val(),
                            "offense"               : $(".offense_update").val(),
                            "investigatingOfficer"  : $(".inv_off_update").val(),
                            "courtOfOrigin"         : $(".court_origin_update").val(),
                            "militaryCourt"         : $(".military_court_update").val(),
                            "sentence"              : JSON.stringify(sentence),
                            "courtOrderDate"        : $(".cod_update").val(),
                            "receivedDateByPPO"     : $(".rd_update").val(),
                            "manualDocket"          : false,
                            "referral"              : false,
                            "referralData"          : "",
                            "remarks"               : $(".remarks_update").val(),
                            "probationStartDate"    : "",
                            "probationYear"         : "",
                            "probationMonth"        : "",
                            "probationDay"          :"",
                            "status"                : 1,
                            "legalAge"              : $(".client_type_update").val(),
                            "clientId"              : clientId
                        }

                        __executeExternalPost('http://localhost:8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $('#success_update').show();
                                setTimeout(function () {
                                    $(".form-control").val('');
                                    $('#success_update').hide();
                                    window.location.reload(true);
                                }, 2000);
                            }else{
                                alert("failed")
                            }
                        })
                    })

                }else{
                    alert("failed")
                }
            })
        }
        var __select = function(){
            $('.field_office_update').empty();

            __executeExternalGet('http://localhost:8088/department/list').done(function (result) {
                console.log(result)
                if (result.status != "ERROR") {
                    $('.field_office_update').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office_update').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });

                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        setTimeout(function () {
            __fields();
        }, 500);
    } )( jQuery );