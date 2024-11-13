    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)
        
        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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


        var client_id = GetURLParameter('client_id');
        var foid = GetURLParameter('field_office_id');
        var field_office_id = $.cookie('field_office_id');

        $(".list").html(`
            <div class="list_records">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control agency" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control cc_no" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control offense" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control when" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control where" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control disposition" placeholder="Disposition"></div>
                </div>
            </div>`
        );

        $(".list_info").html(`
            <div class="list_information">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-3"><input type="text" class="form-control source" placeholder="Source"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control date" placeholder="Date"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control pos" placeholder="Position"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control particulars" placeholder="Particulars"></div>
                </div>
            </div>`
        );

        $(".add_more").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".list").append(`
            <div class="list_records">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-2"><input type="text" class="form-control agency" placeholder="Agency"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control cc_no" placeholder="CC No."></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control offense" placeholder="Offense"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control when" placeholder="When"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control where" placeholder="Where"></div>
                    <div class="col-3 col-md-2"><input type="text" class="form-control disposition" placeholder="Disposition"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>
                `
            )
        });

        $(".add_more_info").unbind("click").on("click", function(){
            // console.log("clicked");

            $(".list_info").append(`
            <div class="list_information">
                <div class="row form-group col-md-12">
                    <div class="col-3 col-md-3"><input type="text" class="form-control source" placeholder="Source"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control date" placeholder="Date"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control pos" placeholder="Position"></div>
                    <div class="col-3 col-md-3"><input type="text" class="form-control particulars" placeholder="Particulars"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>
                `
            )
        });

        $('.list').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        $('.list_info').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        let allegedByVal;
        let derogatoryRecordVal;
        let probationVal;

        function gatherRecordsData(allegedByVal,derogatoryRecordVal,probationVal) {
            const records = [];
            const agency = $(".agency");
            const cc_no = $(".cc_no");
            const offense = $(".offense");
            const when = $(".when");
            const where = $(".where");
            const disposition = $(".disposition");

            const recordInfo = [];
            const source = $(".source");
            const date = $(".date");
            const pos = $(".pos");
            const particulars = $(".particulars");

            for (var i = 0; i < agency.length; i++) {
                const list = {};
                list.agency = $(agency[i]).val();
                list.cc_no = $(cc_no[i]).val();
                list.offense = $(offense[i]).val();
                list.when = $(when[i]).val();
                list.where = $(where[i]).val();
                list.disposition = $(disposition[i]).val();
                records.push(list);
            }

            for (var i = 0; i < source.length; i++) {
                const list_info = {};
                list_info.source = $(source[i]).val();
                list_info.date = $(date[i]).val();
                list_info.pos = $(pos[i]).val();
                list_info.particulars = $(particulars[i]).val();
                recordInfo.push(list_info);
            }

            var priorRecords = {
                derogatoryRecord: derogatoryRecordVal,
                allegedBy: allegedByVal,
                probation: probationVal,
                priorRecord: records,
                recordsInfo: recordInfo
            }

            var payload = {
                "petitionerId": client_id,
                "jsonData": JSON.stringify(priorRecords),
                "type": "priorRecords",
                "worksheetStatus": "INCOMPLETE",
                "createdBy": $.cookie("uuid"),
                "fieldOfficeId": $.cookie("field_office_id")
            }
            return payload;
        }

        function radioButtonsListener(radioButtonName) {
            var radioButtonName = document.getElementsByName(radioButtonName);
                radioButtonName.forEach(function(radioButtonName) {
                    radioButtonName.addEventListener('change', function() {
                        var radioName = this.name;
                        if (radioName == "allegedby"){
                            allegedByVal = this.value;
                        } else if (radioName == "derogatoryRecord"){
                            derogatoryRecordVal = this.value;
                        } else if (radioName == "probation"){
                            probationVal = this.value;
                        } else {
                            console.log("Error")
                        }
                    });
                });
        }

        radioButtonsListener('allegedby')
        radioButtonsListener('derogatoryRecord')
        radioButtonsListener('probation')


        $(".btn-next").unbind("click").on("click", function(){

            if (allegedByVal && derogatoryRecordVal && probationVal){
                var dataPayload = gatherRecordsData(allegedByVal,derogatoryRecordVal,probationVal);
            } else {
                console.log("Radio Button not completed")
            }

            var required = ["agency", "cc_no", "offense", "when", "where", "disposition", "source", "date", "pos", "particulars"];

            required.forEach(function(data) {
                // First, remove the existing error message and error class if present
                $("." + data).removeClass("error_field");
                $("." + data).next('.errorRequired').remove();
        
                // Now check if the field is empty or null
                if ($("." + data).val() === "" || $("." + data).val() === null) {
                    $("." + data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter($("." + data));
                } 
            });

            var requiredRadio = ["allegedby", "derogatoryRecord", "probation"];

            requiredRadio.forEach(function(name) {
                var radioGroup = $("input[name='" + name + "']").closest('.radio-group');
                $("input[name='" + name + "']").removeClass("error_field");
                radioGroup.find('.errorRequired').remove();

                if ($("input[name='" + name + "']:checked").length === 0) {
                    $("input[name='" + name + "']").addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px; padding-left: 30px">* required field</span>')
                        .appendTo(radioGroup);
                }

                // Add change event listener to clear error on selection
                $("input[name='" + name + "']").on('change', function() {
                    $("input[name='" + name + "']").removeClass("error_field");
                    radioGroup.find('.errorRequired').remove();
                });
            });


            var requiredFields = $('.errorRequired:visible').length;
            console.log('Number of required fields: ' + requiredFields);

            if (requiredFields === 0) {
                __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $('#success').hide();
                            $(".overlay").show();
                            setTimeout(function () {
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                                window.location.href = api+'/pis/worksheet_family_background?client_id='+client_id+'&field_office_id='+foid;
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                    }
                })
            }
        })

            __executeExternalGet('8000/worksheet/getPetitioner/priorRecords/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    $('.list').empty();
                    $('.list_info').empty();

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    var allegedByValue = JSON.parse(result.jsonData).allegedBy;
                    var derogatoryRecordValue = JSON.parse(result.jsonData).derogatoryRecord;
                    var probationValue = JSON.parse(result.jsonData).probation;

                    $('input[name="allegedby"]').each(function() {
                        if ($(this).val() == allegedByValue) {
                            $(this).prop("checked", true);
                        }
                    });
                    $('input[name="derogatoryRecord"]').each(function() {
                        if ($(this).val() == derogatoryRecordValue) {
                            $(this).prop("checked", true);
                        }
                    });
                    $('input[name="probation"]').each(function() {
                        if ($(this).val() == probationValue) {
                            $(this).prop("checked", true);
                        }
                    });

                    const recordList = JSON.parse(result.jsonData)

                    recordList.priorRecord.forEach(function(data){
                        $(".list").append(`
                            <div class="list_records">
                                <div class="row form-group col-md-12">
                                    <div class="col-3 col-md-2"><input type="text" class="form-control agency" placeholder="Agency" value="${data.agency}"></div>
                                    <div class="col-3 col-md-2"><input type="text" class="form-control cc_no" placeholder="CC No." value="${data.cc_no}"></div>
                                    <div class="col-3 col-md-2"><input type="text" class="form-control offense" placeholder="Offense" value="${data.offense}"></div>
                                    <div class="col-3 col-md-2"><input type="text" class="form-control when" placeholder="When" value="${data.when}"></div>
                                    <div class="col-3 col-md-2"><input type="text" class="form-control where" placeholder="Where" value="${data.where}"></div>
                                    <div class="col-3 col-md-2"><input type="text" class="form-control disposition" placeholder="Disposition" value="${data.disposition}"></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>`
                        )
                    });

                    recordList.recordsInfo.forEach(function(data){
                        $(".list_info").append(`
                            <div class="list_information">
                                <div class="row form-group col-md-12">
                                    <div class="col-3 col-md-3"><input type="text" class="form-control source" placeholder="Source" value="${data.source}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control date" placeholder="Date" value="${data.date}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control pos" placeholder="Position" value="${data.pos}"></div>
                                    <div class="col-3 col-md-3"><input type="text" class="form-control particulars" placeholder="Particulars" value="${data.particulars}"></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>
                        `)
                    });




                }else{

                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){


            if (allegedByVal && derogatoryRecordVal && probationVal){
                var dataPayload = gatherRecordsData(allegedByVal,derogatoryRecordVal,probationVal);
            } else {
                console.log("Radio Button not completed")
            }

            __executeExternalPost('8000/worksheet/updatePetitioner/priorRecords/'+client_id,JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $(".overlay").show();
                        $('#success').hide();
                        $(".btn-update").prop("disabled", true)
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".btn-update").prop("disabled", false)
                            window.location.href = api+'/pis/worksheet_family_background?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })
            })

        function setupWorksheetClickHandler(worksheetType) {
            $(`.${worksheetType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    $(".overlay").show();
                    setTimeout(function () {
                        $(".overlay").hide();
                        window.location.href = api+'/pis/worksheet_'+worksheetType+'?client_id='+client_id+'&field_office_id='+foid;
                    }, 500);
                });
            });
        }
        
        setupWorksheetClickHandler("prior_records");
        setupWorksheetClickHandler("present_offense");
        setupWorksheetClickHandler("identifying_data");
        setupWorksheetClickHandler("family_background");
        setupWorksheetClickHandler("socio_economic");
        setupWorksheetClickHandler("residence_economic");
        setupWorksheetClickHandler("spouse_children");
        setupWorksheetClickHandler("education_history");
        setupWorksheetClickHandler("employment_history");
        setupWorksheetClickHandler("environmental_factor")

    } )( jQuery );