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

        var client_id = GetURLParameter('client_id');
        var foid = GetURLParameter('field_office_id');
        var field_office_id = $.cookie('field_office_id');


        __executeExternalGet('8080/file/getLatest/petitioner_profile/'+client_id+"/"+field_office_id).done(function (result) {
            if (result.status != "ERROR") {
                if (result.files.length != 0) {
                    $('#client_photo').attr('src', api+'8080/file/view/'+result.files[0].id);
                }
            }
        })

        function gatheredData () {

            var identifyingData = {
                name                : $(".data_name").val(),
                interview           : $(".data_interview").val(),
                alias               : $(".alias").val(),
                trueName            : $(".true_name").val(),
                presentAddress      : $(".present_add").val(),
                permanentAdress     : $(".permanent_add").val()
            }
            
            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(identifyingData),
            "type"                      : "psirIdentifyingData",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            return payload;
        }

        $(".btn-next").unbind("click").on("click", function(){

            var datapayload = gatheredData();
            __executeExternalPost('8000/worksheet/create',JSON.stringify(datapayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        $(".overlay").show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                            window.location.href = api+'/pis/psir_present_offense?client_id='+client_id+'&field_office_id='+foid;
                        }, 500); 
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })

        
        $('.card-body').find('input, select, button').prop('disabled', true);
        
        __executeExternalGet('8000/worksheet/getPetitioner/identifyingData/'+client_id).done(function (result) {
            var result = result.response;
            if (result.status != "ERROR") {
                if (result.worksheetStatus == "INCOMPLETE"){
                    __executeExternalGet('8000/worksheet/getPetitioner/psirIdentifyingData/'+client_id).done(function (result) {
                        var result = result.response;
                        if (result.status != "ERROR") {
                            if (result.worksheetStatus == "INCOMPLETE"){
                                $(".btn-next").hide();
                                $(".btn-update").show();

                            }else{
                                $(".btn-update").hide();
                                $(".btn-next").show();
                            } 
                        }
                    })
                    console.log(JSON.parse(result.jsonData))
                    $(".data_name").val(JSON.parse(result.jsonData).name);
                    $(".data_interview").val(JSON.parse(result.jsonData).interview);
                    $(".alias").val(JSON.parse(result.jsonData).alias);
                    $(".true_name").val(JSON.parse(result.jsonData).trueName);
                    $(".present_add").val(JSON.parse(result.jsonData).presentAddress);
                    $(".permanent_add").val(JSON.parse(result.jsonData).permanentAdress);

                }else{
                    $(".btn-update").hide();
                    $(".btn-next").show();
                } 
            }
        })


        $(".btn-update").unbind("click").on("click", function(){

            var datapayload = gatheredData()
            __executeExternalPost('8000/worksheet/updatePetitioner/psirIdentifyingData/'+client_id,JSON.stringify(datapayload)).done(function (result) {
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        $(".overlay").show();
                        $(".btn-next").prop('disabled', true);
                        setTimeout(function () {
                            $(".overlay").hide();
                            $(".overlay").hide();
                            $(".btn-next").prop('disabled', false);
                            window.location.href = api+'/pis/psir_present_offense?client_id='+client_id+'&field_office_id='+foid;
                        }, 500); 
                    }, 2000);
                }else{
                    alert("failed")
                }
            })
        })


        function setupWorksheetClickHandler(psirType) {
            $(`.${psirType}`).unbind("click").on("click", function () {
                $(".btn_warning").unbind("click").on("click", function () {
                    $(".form-control").val('');
                    $("#warningModal").modal("hide");
                    $(".overlay").show();
                    setTimeout(function () {
                        $(".overlay").hide();
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