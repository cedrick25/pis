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
        console.log(client_id)
        
        __executeExternalGet('8000/worksheet/getPetitioner/psirIdentifyingData/'+client_id).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                var data = JSON.parse(result.jsonData);
                console.log(data)

                $(".recommendation").append(`
                    <div class="recommendationPara">
                        <div class="col-12">
                            <p align="center">WHEREFORE, in view of the foregoing, it is respectfully recommended to the honorable Court that the petition for probation of ${data.name} to/be <select class="grant col-2 col-sm-2 select2 ">
                                                                <option value="GRANTED">Granted</option>
                                                                <option value="DENIED">Denied</option>
                                                                </select>
                                for a period of:
                            </p>
                        </div>
                    </div>`
                )
            }
        })


        $(".addMoreRec").unbind("click").on("click", function(){
            $(".addRec").append(`
            <div class="addRecommendation">
                <div class="row form-group col-md-9">
                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control recs"></textarea></div>
                    <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                </div>
            </div>
                `
            )
        });

        $('.addRec').on('click', '.remove', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });

        $('.addRec').on('click', '.remove', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });

        function gatheredData () {

            const recommendations = [];
            const recs = $(".recs");

            for(var i = 0; i < recs.length; i++){
                
                const list = {};
                list.recs = $(recs[i]).val();
                recommendations.push(list);
            }

            var psirRecommendation = {
                recommendations         : recommendations,
                grant                   : $(".grant").val(),
                supYear                 : $(".supYear").val(),
                supMonth                : $(".supMonth").val(),
                supDay                  : $(".supDay").val(),
                reportOffice            : $(".reportOffice").val(),
            }

            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(psirRecommendation),
            "type"                      : "psirRecommendation",
            "worksheetStatus"           : "COMPLETED",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }


        $(".btn-next").unbind("click").on("click", function(){
            var payload = gatheredData();
            __executeExternalPost('8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/client_list';
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        $(".btn-update").unbind("click").on("click", function(){
            var payload = gatheredData();
            __executeExternalPost('8000/worksheet/updatePetitioner/psirRecommendation/'+client_id,JSON.stringify(payload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.href = api+'/pis/client_list';
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })

            })

        __executeExternalGet('8000/worksheet/getPetitioner/psirRecommendation/'+client_id).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "COMPLETED"){
                    $(".btn-update").show();
                    $(".btn-next").hide();

                    var datarec = JSON.parse(result.jsonData);

                    $(".grant").val(JSON.parse(result.jsonData).grant).trigger("change");
                    $(".supYear").val(JSON.parse(result.jsonData).supYear);
                    $(".supMonth").val(JSON.parse(result.jsonData).supMonth);
                    $(".supDay").val(JSON.parse(result.jsonData).supDay);
                    $(".reportOffice").val(JSON.parse(result.jsonData).reportOffice).trigger("change");

                    datarec.recommendations.forEach(function(data){
                        $(".addRec").append(`
                            <div class="addRecommendation">
                                <div class="row form-group col-md-9">
                                    <div class="col-12 col-md-9"><textarea rows="2" cols="50" class="form-control recs" value="${data.recs}">${data.recs}</textarea></div>
                                </div>
                                <button type="button" class="remove btn btn-danger btn-sm float-right">Remove</button>
                            </div>
                        `
                        )
                    });
                }else{
                    $(".btn-next").show();
                    $(".btn-update").hide();
                } 

            }
        })

        var __select = function(){
            $('.reportOffice').empty();
            __executeExternalGet('8088/department/list').done(function (result) {
                if (result.status != "ERROR") {
                    $('.reportOffice').append("<option selected disabled> - - Select Field Office - - </option>");
                    result.forEach(function(data){
                        $('.reportOffice').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                    setTimeout(function () {
                        $(".reportOffice").val($.cookie("field_office_id")).trigger("change");
                    }, 2000);
                    
                } else {
                    console.log("failed fetching docket list")
                }
            })
        }
        __select();

        function setupWorksheetClickHandler(psirType) {
            $(`.${psirType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    setTimeout(function () {
                        window.location.href = api+'/pis/psir_'+psirType+'?client_id='+client_id+'&field_office_id='+foid;
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
        setupWorksheetClickHandler("evaluation");
        setupWorksheetClickHandler("recommendation")

    } )( jQuery );