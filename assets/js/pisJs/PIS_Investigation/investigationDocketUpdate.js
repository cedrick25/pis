    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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

        let sentence_counter = -1;

        $(".add_more").unbind("click").on("click", function(){
            sentence_counter++;
            $("#sentence_card .card-body").append(`
                <div id="sentence_list_${sentence_counter}" style="padding-top: 10px; padding-bottom: 10px">
                    <div class="form-row">
                        <div class="list_sentence">
                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month"></div>
                                <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-sm-2 col-md-2 col-lg-2 col-xl-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                <div class="col-3 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" class="form-control civil_liability" placeholder="Robbery"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 justify-content-end" style="padding-top: 20px">
                                <button type="button" class="remove btn btn-danger btn-sm" data-id="${sentence_counter}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
        });
        $('#sentence_card .card-body').on('click', '.remove', function(e) {
            var id = $(this).data("id")
            $(`#sentence_list_${id}`).remove();
        });

        var __selectFieldOffice = function(){
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                        $('.cmis_fo').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectFieldOffice();

        var __selectclient = function(){
            $('.pb_client').empty();
            __executeExternalGet('8000/petitioner?page=0&size=50&type=PROBATIONER&officeId='+$.cookie("field_office_id")).done(function (result) {
                if (result.status != "ERROR") {
                    $('.pb_client').append("<option selected disabled>Select Client</option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        $('.pb_client').append(
                            '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();

        var docket_number = GetURLParameter('docket_number');
        var officeId = $.cookie("field_office_id");
        // console.log(officeId)

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);

        var updateProbationInvestigation = function () {
            __executeExternalGet('8000/docketbook/'+docket_number+'/'+officeId).done(function (result) {
                console.log(result);
                var result = result.response;
                // console.log(JSON.parse(result.sentence))
                if (result.status != "ERROR") {
                    $(".docketNum_update").val(result.docketNumber);
                    console.log(result.fieldOfficeId)
                    $(".field_office").val(result.fieldOfficeId).trigger("change");
                    $(".pb_client").val(result.clientId).trigger("change");
                    if (result.legalAge == true) {
                        var la = "true"
                    } else {
                        var la = "false"
                    }

                    $(".caseload").val(result.caseloadType).trigger("change");
                    $(".client_type").val(la).trigger("change");
                    $(".cc_no").val(result.criminalCaseNumber);
                    $(".offense").val(result.offense);
                    $(".court_origin").val(result.courtOfOrigin);
                    if (result.militaryCourt == true) {
                        var mc = "true"
                    } else {
                        var mc = "false"
                    }
                    $(".military_court").val(mc).trigger("change");
                    $(".sentence").val(result.sentence);
                    $(".cod").val(result.courtOrderDate);
                    $(".rd").val(result.receivedDateByPPO);
                    $(".remarks").val(result.remarks);
                    $(".inv_off").val(result.investigatingOfficer);
                    if (result.pleaBargain == true) {
                        var plea = "true"
                    } else {
                        var plea = "false"
                    }
                    $(".plea_bargain").val(plea).trigger("change");
                    $(".classification").val(result.caseClassification).trigger("change");

                    JSON.parse(result.sentence).forEach(function(data){
                        sentence_counter++;
                        $(`#sentence_card .card-body`).append(`
                            <div id="sentence_list_${sentence_counter}" style="padding-top: 10px; padding-bottom: 10px">
                                <div class="form-row">
                                    <div class="row form-group col-md-12">
                                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence">${data.sentence}</textarea></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control min_y" placeholder="Year" value="${data.min_y}"></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control min_m" placeholder="Month" value="${data.min_m}"></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control min_d" placeholder="Day" value="${data.min_d}"></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control max_y" placeholder="Year" value="${data.max_y}"></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control max_m" placeholder="Month" value="${data.max_m}"></div>
                                        <div class="col-3 col-md-3"><input type="number" class="form-control max_d" placeholder="Day" value="${data.max_d}"></div>
                                    </div>
                                    <div class="row form-group col-md-6">
                                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                        <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery" value="${data.civil_liability}"></div>
                                    </div>
                                    <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 justify-content-end" style="padding-top: 20px">
                                        <button type="button" class="remove btn btn-danger btn-sm" data-id="${sentence_counter}">Remove</button>
                                    </div>
                                </div>
                            </div>
                            `
                        )

                    });
                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var fname = $('.pb_client option:selected').data('fname');
                        var mname = $('.pb_client option:selected').data('mname');
                        var lname = $('.pb_client option:selected').data('lname');
                        var sname = $('.pb_client option:selected').data('sname');
                        var fullName = fname + " " + mname + " " + lname + " " + sname;


                        var clientId = result.clientId;
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
                            "type"                  : "PIS_INV",
                            "docketNumber"          : docket_number,
                            "docketSeries"          : "NONE",
                            "caseloadType"          : $(".caseload").val(),
                            "fieldOfficeId"         : $(".field_office").val(),
                            "clientType"            : "PROBATIONER",
                            "firstName"             : fname,
                            "middleName"            : mname,
                            "lastName"              : lname,
                            "suffixName"            : sname,
                            "fullName"              : fullName,
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
                            "clientId"              : clientId
                        }

                        __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+officeId,JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $('#success').show();
                                setTimeout(function () {
                                    $(".form-control").val('');
                                    $('#success').hide();
                                    window.location.href=api+"/pis/investigation_docketing";
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

        setTimeout(function () {
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm_update').prop('disabled', false);
            $('.docketNum_update').prop('disabled', true)
            $('.pb_client').prop('disabled', true)
            $('.caseload').prop('disabled', true)
            updateProbationInvestigation();
        }, 3000);

    } )( jQuery );