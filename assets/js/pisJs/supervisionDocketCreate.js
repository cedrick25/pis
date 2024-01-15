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

        var office_id = $.cookie('field_office_id');

        var __fieldOffice = function(){
            __executeExternalGet('8088/department/list').done(function (result) {
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
        __fieldOffice();
        var __selectclient = function(){
            __executeExternalGet('8000/petitioner?page=0&size=50&type=PROBATIONER&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.pb_client_sup').append("<option selected disabled> - - Select Client - - </option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        $('.pb_client_sup').append(
                            '<option value="'+data.id+'"  data-id="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();



        var docketSwitch = document.getElementById('docketSwitch');
        var sentenceFields = document.getElementById('sentenceForm');
        let sentenceFormCounter = 1;
        let currentContainer = 1;
        var sentencePayload;

        function sentenceForms() {
            let currentCounter = sentenceFormCounter++;
            return `
                <div class="sentenceForm${currentCounter}">
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
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl" placeholder="Robbery"></div>
                    </div>
                    <div class="row form-group col-md-6"> <button type="button" class="btn btn-danger btn-sm float-left remove">Remove</button> </div>
                </div>`
        }

        function updateForms(data) {
            let currentCounter = sentenceFormCounter++;
            return `
                <div class="sentenceForm${currentCounter}">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence">${data.sentence}</textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y" placeholder="Year" value="${data.max_y}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m" placeholder="Month" value="${data.max_m}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d" placeholder="Day" value="${data.max_d}"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y" placeholder="Year" value="${data.max_y}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m" placeholder="Month" value="${data.max_m}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d" placeholder="Day" value="${data.max_d}"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl" placeholder="Robbery" value="${data.civil_liability}"></div>
                    </div>
                    <div class="row form-group col-md-6"> <button type="button" class="btn btn-danger btn-sm float-left remove">Remove</button> </div>
                </div>`
        }

        var fields = ['sentence','min_y','min_m','min_d','max_y','max_m','max_d','cl'];

        function sentenceArray(arrayValue) {
            const sentence = [];
            const sentence_inputs = $("."+fields[0]);
            const min_y = $("."+fields[1]);
            const min_m = $("."+fields[2]);
            const min_d = $("."+fields[3]);
            const max_y = $("."+fields[4]);
            const max_m = $("."+fields[5]);
            const max_d = $("."+fields[6]);
            const cl_true = $("."+fields[7]);

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
            sentencePayload = JSON.stringify(sentence);
        }

        if (docketSwitch.value == "false"){
            $('.docket_display').show();
            $('.manualProbStart').hide();
            $('.manualProbYear').hide();
            $('.manualProbMonth').hide();
            $('.manualProbDay').hide();
            setTimeout(function () {
                $('.docket_display').prop('selectedIndex',0).trigger("change");
            }, 5);
            __executeExternalGet('8000/docketbook/list/PIS_INV/'+$.cookie("field_office_id")).done(function (result) {
                $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                    result.response.forEach(function(data){
                        $('.docket_num').append(
                            "<option value="+data.docketNumber+">"+data.docketNumber+"</option>");
                    });
                    $('.docket_num').on('change', function() {
                        console.log($('.docket_num').val());
                        $(".docketing").show();
                        $('.confirmButton').show();
                        $('.manualProbStart').hide();
                        $('.manualProbYear').hide();
                        $('.manualProbMonth').hide();
                        $('.manualProbDay').hide();
                        setTimeout(function () {
                            $('.caseload').prop('selectedIndex',0).trigger("change");
                        }, 5);
                        const docket = this.value
                            __executeExternalGet('8000/docketbook/'+docket+'/'+$.cookie("field_office_id")).done(function (result) {
                                var result = result.response;
                                    if (result.status != "ERROR") {
                                        $(".docket_num").val(result.docketNumber);
                                        $(".firstName").val(result.firstName);
                                        $(".middleName").val(result.middleName);
                                        $(".lastName").val(result.lastName);
                                        $(".suffix").val(result.suffixName);
                                        $(".cc_no").val(result.criminalCaseNumber);
                                        $(".offense").val(result.offense);
                                        setTimeout(function () {
                                            $(".field_office").val(result.fieldOfficeId).trigger("change");
                                            $(".pb_client_sup").val(result.clientId).trigger("change");
                                            $(".field_office").val(result.fieldOfficeId).trigger("change");
                                        }, 100);
                                        setTimeout(function () {
                                            $(".field_office").val(result.fieldOfficeId).trigger("change");
                                        }, 1000);
                                        if (result.legalAge == true) {
                                            var la = "true"
                                        } else {
                                            var la = "false"
                                        }
                                        $(".client_type").val(la).trigger("change");
                                        $(".cc_no").val(result.criminalCaseNumber);
                                        $(".offense").val(result.offense);
                                        $(".court_origin").val(result.courtOfOrigin);
                                        if (result.militaryCourt == true) {
                                            var mc = "true"
                                        } else {
                                            var mc = "false"
                                        }
                                        $(".military_cour").val(mc).trigger("change");
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
                                        var sentenceData = JSON.parse(result.sentence)
                                        sentenceData.forEach(function(data){
                                            let noContainer = currentContainer++;
                                            var container = document.createElement('div');
                                            container.id = 'SentenceContainer'+noContainer;
                                            container.innerHTML += updateForms(data);
                                            sentenceFields.appendChild(container)
                                        });
                                    } else {
                                        alert("Error!")
                                    };
                            })
                    })
            })
        }

        docketSwitch.addEventListener('change', function() {
            if (docketSwitch.checked) {
                docketSwitch.value = true;
                $('.pb_client_sup').prop('disabled', false)
                $('.docketing').show();
                $('.manualProbStart').show();
                $('.manualProbYear').show();
                $('.manualProbMonth').show();
                $('.manualProbDay').show();
                $('.invCod').hide();
                $('.docket_display').hide();
                $('.confirmButton').show();
                sentenceFields.innerHTML = '';
                setTimeout(function () {
                    let noContainer = currentContainer++;
                    var container = document.createElement('div');
                    container.className = 'SentenceContainer'+noContainer;
                    container.innerHTML += sentenceForms();
                    sentenceFields.appendChild(container)
                    $('.docket_display').prop('selectedIndex',0).trigger("change");
                    $('.pb_client_sup').prop('selectedIndex',0).trigger("change");
                }, 100);
                setTimeout(function () {
                    $('.field_office').val(office_id).trigger("change")
                }, 1000);
                $('.form-group').val('')
                $('.form-control').val('')
            } else {
                docketSwitch.value = false;
                sentenceFields.innerHTML = '';
                setTimeout(function () {
                    $('.docket_display').prop('selectedIndex',0).trigger("change");
                }, 5);
                $('.docket_display').show();
                $('.docketing').hide();
                $('.manualProbStart').hide();
                $('.manualProbYear').hide();
                $('.manualProbMonth').hide();
                $('.manualProbDay').hide();
                $('.confirmButton').hide();
                $('.form-control').val('')
            }
        });
        $(".add_more").unbind("click").on("click", function() {
            let noContainer = currentContainer++;
            var container = document.createElement('div');
            container.className = 'SentenceContainer'+noContainer;
            container.innerHTML += sentenceForms();
            sentenceFields.appendChild(container)
        });

        $(document).on('click', '.remove', function(e) {
            const parentDiv = $(this).closest('div');
            const containerDiv = parentDiv.parent();
            const rmvDiv = containerDiv.parent();
            rmvDiv.remove();
        });

        $(".btn-confirm").unbind("click").on("click", function(){

            var fname = $('.pb_client_sup option:selected').data('fname');
            var mname = $('.pb_client_sup option:selected').data('mname');
            var lname = $('.pb_client_sup option:selected').data('lname');
            var sname = $('.pb_client_sup option:selected').data('sname');
            var clientId = $('.pb_client_sup option:selected').data('id');

            var md;
            if (docketSwitch.value == "true") {
                md = true
            } else {
                md = false
            }
            sentenceArray(fields);
            var payload = {
                "type": "PIS_SUP",
                "docketNumber": "",
                "docketSeries": "NONE",
                "caseloadType": $(".caseload").val(),
                "fieldOfficeId": $(".field_office").val(),
                "clientType": "PROBATIONER",
                "clientId": clientId,
                "firstName": fname,
                "middleName": mname,
                "lastName": lname,
                "suffixName": sname,
                "fullName": "",
                "pleaBargain": $(".plea_bargain").val(),
                "caseClassification": $(".classification").val(),
                "criminalCaseNumber": $(".cc_no").val(),
                "offense": $(".offense").val(),
                "courtOfOrigin": $(".court_origin").val(),
                "courtOrderDate": $(".cod").val(),
                "investigatingOfficer": $(".inv_off").val(),
                "receivedDateByPPO": $(".rd").val(),
                "sentence": sentencePayload,
                "manualDocket": md,
                "referral": false,
                "referralData": "",
                "remarks": "",
                "probationStartDate": $(".prob_start").val(),
                "probationYear": $(".prob_year").val(),
                "probationMonth": $(".prob_month").val(),
                "probationDay": $(".prob_day").val(),
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
                "legalAge": $(".client_type").val(),
                "militaryCourt": $(".military_court").val()
            }
            __executeExternalPost('8000/docketbook/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        window.location.href=api+'/pis/supervision_docketing';
                    }, 2000);
                }else{
                }
            })  
        })


    } )( jQuery );