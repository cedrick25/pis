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

        $(".add_more_residence").unbind("click").on("click", function(){
            $(".residence").append(`
            <div class="res">
                <div class="row form-group col-md-12">
                    <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                    <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control resAdd"></textarea></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateFrom"></div>
                </div>
                <div class="row form-group col-md-6">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                    <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateTo"></div>
                </div>
                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
            </div>`
            )
        });

        $('.residence').on('click', '.remove', function(e) {
            e.preventDefault();

            $(this).parent().remove();
        });

        function gatheredDataResEco() {
            const residence = [];
            const resAdd = $(".resAdd");
            const dateFrom = $(".dateFrom");
            const dateTo = $(".dateTo");

            for(var i = 0; i < resAdd.length; i++){
                
                const list = {};
                list.resAdd = $(resAdd[i]).val();
                list.dateFrom = $(dateFrom[i]).val();
                list.dateTo = $(dateTo[i]).val();
                residence.push(list);
            }


            var residenceEco = {

                residence            : residence,
                residenceStability   :  $(".res_stability").val(),
                residenceType        :  $(".residence_type").val(),
                residenceHomeCondition:  $(".res_home_cond").val(),
                fam_status           : $(".fam_status").val(),
                fam_breadwinner      : $(".fam_breadwinner").val(),
                no_dependants        : $(".no_dependants").val(),
                dependants           : $(".dependants").val(),
                maj_fam_prob         : $(".maj_fam_prob").val(),
                fam_comments         : $(".fam_comments").val(),

            }


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(residenceEco),
            "type"                      : "residenceEconomic",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){

            var dataPayload = gatheredDataResEco();

            __executeExternalPost('8000/worksheet/create',JSON.stringify(dataPayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/worksheet_spouse_children?client_id='+client_id+'&field_office_id='+foid;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/residenceEconomic/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    const residenceList = JSON.parse(result.jsonData)

                    residenceList.residence.forEach(function(data){
                        $(".residence").append(`
                        <div class="res">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-1"><label for="text-input" class=" form-control-label">Address</label></div>
                                <div class="col-12 col-md-11"><textarea rows="2" cols="50" class="form-control resAdd">${data.resAdd}</textarea></div>
                            </div>
                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date From</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateFrom" value="${data.dateFrom}"></div>
                            </div>
                            <div class="row form-group col-md-6">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date To</label></div>
                                <div class="col-3 col-md-9"><input type="text" name="text-input" placeholder="" class="form-control dateTo" value="${data.dateTo}"></div>
                            </div>
                            <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                        </div>`
                        )
                    });

                        $(".res_stability").val(JSON.parse(result.jsonData).residenceStability).trigger("change");
                        $(".res_home_cond").val(JSON.parse(result.jsonData).residenceHomeCondition).trigger("change");
                        $(".residence_type").val(JSON.parse(result.jsonData).residenceType).trigger("change");
                        $(".fam_status").val(JSON.parse(result.jsonData).fam_status).trigger("change");
                        $(".fam_breadwinner").val(JSON.parse(result.jsonData).fam_breadwinner).trigger("change");
                        $(".dependants").val(JSON.parse(result.jsonData).dependants);
                        $(".no_dependants").val(JSON.parse(result.jsonData).no_dependants);
                        $(".fam_comments").val(JSON.parse(result.jsonData).fam_comments);
                        $(".maj_fam_prob").val(JSON.parse(result.jsonData).maj_fam_prob).trigger("change");

                }else{

                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        $(".btn-update").unbind("click").on("click", function(){

            var dataPayload = gatheredDataResEco();

            __executeExternalPost('8000/worksheet/updatePetitioner/residenceEconomic/'+client_id,JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_spouse_children?client_id='+client_id+'&field_office_id='+foid;
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
                    setTimeout(function () {
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