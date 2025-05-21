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

        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm').prop('disabled', true);


        $('.plea_bargain').change(function(){
            if ($('.plea_bargain').val() == "true") {
                $(".class_sel_true").show();
            } else {
                $(".class_sel_true").hide();
            }
            if ($('.plea_bargain').val() == "false"){
            $(".class_sel_true").hide();
            } else {
                $(".class_sel_true").show();
            }
        });

        var __selectclient = function(){
            __executeExternalGet('8000/petitioner?page=0&size=50&type=PROBATIONER&officeId='+$.cookie('field_office_id')).done(function (result) {
                if (result.status != "ERROR") {
                    $('.pb_client_sup').append("<option selected disabled> - - Select Client - - </option>");
                    result.content.forEach(function(data){
                        var name = data.firstName + " " +data.middleName+ " " +data.lastName+ " " +data.suffixName;
                        $('.pb_client_sup').append(
                            '<option value="'+data.id+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffixName+'">'+name+'</option>'); 
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __selectclient();
        var __select = function(){
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.field_office').append(
                            "<option value="+data.id+" data-id="+data.id+">"+data.name+"</option>");
                        $('.cmis_fo').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        var docketSwitch = document.getElementById('docketSwitch');
        var sentenceFields = document.getElementById('sentenceForm');
        let sentenceFormCounter = 1;
        let currentContainer = 1;
        let md;
        var sentencePayload;

        var docket_number = GetURLParameter('docket_number');

        function updateForms(result) {
            $(".field_office").prop('disabled',true)
            $(".pb_client_sup").prop('disabled',true)
            $(".pb_client_sup").val(result.clientId).trigger("change");
            $(".field_office").val(result.fieldOfficeId).trigger("change");
            $(".field_office").prop('disabled',false)
            $(".cc_no").val(result.criminalCaseNumber);
            $(".docketNum_update").val(result.docketNumber);
            $(".offense").val(result.offense);
            $(".caseload").val(result.caseloadType).trigger("change");
            $(".court_origin").val(result.courtOfOrigin);
            $(".inv_off").val(result.investigatingOfficer);
            $(".cod").val(result.courtOrderDate);
            $(".rd").val(result.receivedDateByPPO);
            $(".prob_start").val(result.probationStartDate);
            $(".prob_month").val(result.probationMonth);
            $(".prob_day").val(result.probationDay);
            $(".prob_year").val(result.probationYear);
            $(".classification").val(result.caseClassification).trigger("change")
            if (result.militaryCourt == true) {
                var mc = "true"
            } else {
                var mc = "false"
            }
            if (result.legalAge == true) {
                var la = "true"
            } else {
                var la = "false"
            }
            if (result.pleaBargain == true) {
                var pb = "true"
            } else {
                var pb = "false"
            }
            $(".military_court").val(mc).trigger("change");
            $(".plea_bargain").val(pb).trigger("change");
            $(".client_type").val(la).trigger("change");

            var sentenceData = JSON.parse(result.sentence)
            if (sentenceData === null) {
                let noContainer = currentContainer++;
                var container = document.createElement('div');
                container.className = 'SentenceContainer'+noContainer;
                container.innerHTML += sentenceForms();
                sentenceFields.appendChild(container)
            } else {
                sentenceData.forEach(function (data) {
                    let currentCounter = sentenceFormCounter++;
                    let noContainer = currentContainer++;
                    var container = document.createElement('div');
                    container.id = 'SentenceContainer'+noContainer;
                    container.innerHTML += `
                    <div id="sentenceForm${currentCounter}">
                        <div class="form-row">
                            <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence">${data.sentence}</textarea></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-2"><label for="text-input" class=" form-control-label">Min</label></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control min_y" placeholder="Year" value="${data.min_y}"></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control min_m" placeholder="Month" value="${data.min_m}"></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control min_d" placeholder="Day" value="${data.min_d}"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Max</label></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control max_y" placeholder="Year" value="${data.max_y}"></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control max_m" placeholder="Month" value="${data.max_m}"></div>
                                <div class="col-3 col-md-3"><input type="number" class="form-control max_d" placeholder="Day" value="${data.max_d}"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                                <div class="col-3 col-md-9"><input type="text" class="form-control civil_liability" placeholder="Robbery" value="${data.civil_liability}"></div>
                            </div>
                            <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 justify-content-end" style="padding-top: 20px">
                                <button type="button" class="remove btn btn-danger btn-sm" data-id="${currentCounter}">Remove</button>
                            </div>
                        </div>
                    </div>`
                    sentenceFields.appendChild(container)
                })
            }
        }
        
        function sentenceForms() {
            let currentCounter = sentenceFormCounter++;
            return `
                <div class="sentenceForm${currentCounter}">
                    <div class="form-row">
                        <div class="row form-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                            <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence"></textarea></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control min_y" placeholder="Year"></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control min_m" placeholder="Month"></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control min_d" placeholder="Day"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control max_y" placeholder="Year"></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control max_m" placeholder="Month"></div>
                            <div class="col-3 col-md-3"><input type="number" class="form-control max_d" placeholder="Day"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="col col-sm-2 col-md-2 col-lg-2 col-xl-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                            <div class="col-3 col-sm-9 col-md-9 col-lg-9 col-xl-9"><input type="text" class="form-control civil_liability" placeholder="Robbery"></div>
                        </div>
                        <div class="row form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 justify-content-end" style="padding-top: 20px">
                            <button type="button" class="remove btn btn-danger btn-sm" data-id="${currentCounter}">Remove</button>
                        </div>
                    </div>
                </div>`
        }
        
        var fields = ['sentence','min_y','min_m','min_d','max_y','max_m','max_d','civil_liability'];
        
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
        __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
            var result = result.response;
            console.log(result)
            if (result.manualDocket == false){
                $('.manualProbStart').hide()
                $('.manualProbYear').hide()
                $('.manualProbMonth').hide()
                $('.manualProbDay').hide()
                md = result.manualDocket;
            }
            setTimeout(function () {
                $("#spinner_update").hide();
                $('.card-body').find('input, select, button').prop('disabled', false);
                $('.btn-confirm_update').prop('disabled', false);
                $('.docketNum_update').prop('disabled', true)
                updateForms(result);
            },3000)
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
        })
        $(".btn-confirm").unbind("click").on("click", function(){

            var fname = $('.pb_client_sup option:selected').data('fname');
            var mname = $('.pb_client_sup option:selected').data('mname');
            var lname = $('.pb_client_sup option:selected').data('lname');
            var sname = $('.pb_client_sup option:selected').data('sname');
            var clientId = $('.pb_client_sup option:selected').data('id');
            var fullName = fname + " " + mname + " " + lname + " " + sname;
            
            sentenceArray(fields);

            var payload = {
                "type": "PIS_SUP",
                "docketNumber": docket_number,
                "docketSeries": "NONE",
                "caseloadType": $(".caseload").val(),
                "fieldOfficeId": $(".field_office").val(),
                "clientType": "PROBATIONER",
                "clientId": $(".pb_client_sup").val(),
                "firstName": fname,
                "middleName": mname,
                "lastName": lname,
                "suffixName": sname,
                "fullName": fullName,
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
            __executeExternalPost('8000/docketbook/update/'+docket_number+'/'+$.cookie("field_office_id"),JSON.stringify(payload)).done(function (result) {
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