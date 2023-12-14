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

        __executeExternalGet('8088/department/list').done(function (result) {
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



        var docketSwitch = document.getElementById('docketSwitch');
        var sentenceTrue = document.getElementById('sentenceTrue');
        var sentenceFalse = document.getElementById('sentenceFalse');
        let sentenceFormCounter = 1;

        function sentenceForms() {
            let currentCounter = sentenceFormCounter++;
            return `
                <div id="sentenceForm${currentCounter}">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control" id="sentence"></textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="minYear" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="minMonth" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="minDay" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="maxYear" placeholder="Year"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="maxMonth" placeholder="Month"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control" id="maxDay" placeholder="Day"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control" id="civilLiability" placeholder="Robbery"></div>
                    </div>
                    <div class="row form-group col-md-6"> <button type="button" class="btn btn-danger btn-sm float-left" id="rmvButton">Remove</button> </div>
                </div>`
        }

        function updateForms(data) {
            let currentCounter = sentenceFormCounter++;
            return `
                <div id="sentenceForm${currentCounter}">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-1"><label for="text-input" class=" form-control-label">Sentence</label></div>
                        <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control sentence_false" id="sentence">${data.sentence}</textarea></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Min</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_y_false" id="minYear" placeholder="Year" value="${data.max_y}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_m_false" id="minMonth" placeholder="Month" value="${data.max_m}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control min_d_false" id="minDay" placeholder="Day" value="${data.max_d}"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-3"><label for="text-input" class="form-control-label">Max</label></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_y_false" id="maxYear" placeholder="Year" value="${data.max_y}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_m_false" id="maxMonth" placeholder="Month" value="${data.max_m}"></div>
                        <div class="col-3 col-md-3"><input type="text" class="form-control max_d_false" id="maxDay" placeholder="Day" value="${data.max_d}"></div>
                    </div>
                    <div class="row form-group col-md-6">
                        <div class="col col-md-2"><label for="text-input" class="form-control-label">Civil Liability</label></div>
                        <div class="col-3 col-md-9"><input type="text" class="form-control cl_false" id="civilLiability" placeholder="Robbery" value="${data.civil_liability}"></div>
                    </div>
                    <div class="row form-group col-md-6"> <button type="button" class="btn btn-danger btn-sm float-left remove_false">Remove</button> </div>
                </div>`
        }

        function classNames(senName,yMin,mMin,dMin,yMax,mMax,dMax,clName,rmvName) {
            $('.sentence-container, #sentence').addClass(senName)
            $('.sentence-container, #minYear').addClass(yMin)
            $('.sentence-container, #minMonth').addClass(mMin)
            $('.sentence-container, #minDay').addClass(dMin)
            $('.sentence-container, #maxYear').addClass(yMax)
            $('.sentence-container, #maxMonth').addClass(mMax)
            $('.sentence-container, #maxDay').addClass(dMax)
            $('.sentence-container, #civilLiability').addClass(clName)
            $('.sentence-container, #rmvButton').addClass(rmvName)

        }

        function sentenceArray(senVal,yMinVal,mMinVal,dMinVal,yMaxVal,mMaxVal,dMaxVal,clVal) {
            const sentence = [];
            const sentence_inputs = $("."+senVal);
            const min_y = $("."+yMinVal);
            const min_m = $("."+mMinVal);
            const min_d = $("."+dMinVal);
            const max_y = $("."+yMaxVal);
            const max_m = $("."+mMaxVal);
            const max_d = $("."+dMaxVal);
            const cl_true = $("."+clVal);

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
            console.log(sentence)
        }

        var cNamesTrue = ['sentence_true','min_y_true','min_m_true','min_d_true','max_y_true','max_m_true','max_d_true','cl_true','remove_true'];
        var cNamesFalse = ['sentence_false','min_y_false','min_m_false','min_d_false','max_y_false','max_m_false','max_d_false','cl_false','remove_false'];
        var office_id = $.cookie('field_office_id');

        if (docketSwitch.value == "false"){
            $('.docket_display').show();
            __executeExternalGet('8000/docketbook/list/PIS_INV/'+$.cookie("field_office_id")).done(function (result) {
                $('.docket_num').append("<option selected disabled> - - Select Docket Number - - </option>");
                    result.response.forEach(function(data){
                        $('.docket_num').append(
                            "<option value="+data.docketNumber+">"+data.docketNumber+"</option>");
                    });
                    $('.docket_num').on('change', function() {
                        $(".manual_false").show();
                        $('.confirmButton').show();
                        const docket = this.value
                            __executeExternalGet('8000/docketbook/'+docket+'/'+$.cookie("field_office_id")).done(function (result) {
                                var result = result.response;
                                    if (result.status != "ERROR") {
                                        $(".docket_num").val(result.docketNumber);
                                        $(".firstName_false").val(result.firstName);
                                        $(".middleName_false").val(result.middleName);
                                        $(".lastName_false").val(result.lastName);
                                        $(".suffix_false").val(result.suffixName);
                                        $(".cc_no_false").val(result.criminalCaseNumber);
                                        $(".offense_false").val(result.offense);
                                        $(".pb_client_sup_false").val(result.caseloadType).trigger("change");
                                            setTimeout(function () {
                                                $(".field_office_false").val(result.fieldOfficeId).trigger("change");
                                            }, 100);
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
                                        var sentenceData = JSON.parse(result.sentence)
                                        sentenceData.forEach(function(data){
                                            sentenceFalse.innerHTML += updateForms(data);
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
                $('.manual_true').show();
                $('.manual_false').hide();
                $('.docket_display').hide();
                $('.confirmButton').show();
                sentenceTrue.innerHTML = sentenceForms();
                classNames(cNamesTrue[0],cNamesTrue[1],cNamesTrue[2],cNamesTrue[3],cNamesTrue[4],cNamesTrue[5],cNamesTrue[6],cNamesTrue[7],cNamesTrue[8]);
                setTimeout(function () {
                    $('.field_office_true').val(office_id).trigger("change")
                }, 100);
                $('.form-group').val('')
            } else {
                docketSwitch.value = false;
                $('.docket_display').show();
                $('.manual_true').hide();
                $('.manual_false').hide();
                $('.confirmButton').hide();
                $('.form-control').val('')
            }
        });

        $(".add_more_true").unbind("click").on("click", function() {
            sentenceTrue.innerHTML += sentenceForms();
            classNames(cNamesTrue[0], cNamesTrue[1], cNamesTrue[2], cNamesTrue[3], cNamesTrue[4], cNamesTrue[5], cNamesTrue[6], cNamesTrue[7],cNamesTrue[8]);
        });

        $('#sentenceTrue').on('click', '.remove_true', function(e) {
            const closestSentenceForm = $(this).closest('div');
            const rmvDiv = closestSentenceForm.parent()
            rmvDiv.remove();
        });

        $(".add_more_false").unbind("click").on("click", function(){
            sentenceFalse.innerHTML += sentenceForms();
            classNames(cNamesFalse[0], cNamesFalse[1], cNamesFalse[2], cNamesFalse[3], cNamesFalse[4], cNamesFalse[5], cNamesFalse[6], cNamesFalse[7], cNamesFalse[8]);
        })

        $('#sentenceFalse').on("click", ".remove_false", function(e) {
            const closestSentenceForm = $(this).closest('div');
            const rmvDiv = closestSentenceForm.parent()
            rmvDiv.remove();
        });

        $(".btn-confirm").unbind("click").on("click", function(){

            var fname = $('.pb_client_sup option:selected').data('fname');
            var mname = $('.pb_client_sup option:selected').data('mname');
            var lname = $('.pb_client_sup option:selected').data('lname');
            var sname = $('.pb_client_sup option:selected').data('sname');

            var md;
            if (docketSwitch.value == "true") {
                md = true
                sentenceArray(cNamesTrue[0],cNamesTrue[1],cNamesTrue[2],cNamesTrue[3],cNamesTrue[4],cNamesTrue[5],cNamesTrue[6],cNamesTrue[7]);
            } else {
                md = false
                sentenceArray(cNamesFalse[0],cNamesFalse[1],cNamesFalse[2],cNamesFalse[3],cNamesFalse[4],cNamesFalse[5],cNamesFalse[6],cNamesFalse[7]);
            }

        })


    } )( jQuery );