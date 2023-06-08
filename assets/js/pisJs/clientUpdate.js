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
        var __fields = function(){
            console.log(client_id)

            __executeExternalGet('petitioner/'+client_id).done(function (result) {
                console.log(result);
                
                var result = result.response;

                if (result.status != "ERROR") {
                    console.log()
                    setTimeout(function () {

                        $(".field_office_update").val(result.fieldOfficeId).trigger("change");
                    }, 3000);


                    $(".firstName_update").val(result.firstName);
                    $(".middleName_update").val(result.middleName);
                    $(".lastName_update").val(result.lastName);
                    $(".suffix_update").val(result.suffixName);
                    $(".gender_update").val(result.sex);
                    $(".education_update").val(result.education);
                    $(".occupation_update").val(result.occupation);
                    $(".cc_no_update").val(result.criminalCaseNo);
                    $(".field_office_update").val(result.fieldOfficeId);
                    $(".birthdate_update").val(result.birthDate);
                    $(".b_place_update").val(result.birthCity);
                    $(".address_update").val(result.permanentAddress);

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        console.log('clicked')

                        var payload = {

                        "firstName"         : $(".firstName_update").val(),
                        "middleName"        : $(".middleName_update").val(),
                        "lastName"          : $(".lastName_update").val(),
                        "suffixName"        : $(".suffix_update").val(),
                        "sex"               : $(".gender_update").val(),
                        "education"         : $(".education_update").val(),
                        "occupation"        : $(".occupation_update").val(),
                        "criminalCaseNo"    : $(".cc_no_update").val(),
                        "fieldOfficeId"     : $(".field_office_update").val(),
                        "birthDate"         : $(".birthdate_update").val(),
                        "birthCity"         : $(".b_place_update").val(),
                        "permanentAddress"  : $(".address_update").val(),
                        "createdBy"         : "",
                        "updatedBy"         : "",
                        "status"            : 1

                        }

                        console.log(payload)

                        __executeExternalPost('petitioner/update/'+client_id,JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success_update').show();
                                setTimeout(function () {
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

            __executeExternalGet('department/list').done(function (result) {
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