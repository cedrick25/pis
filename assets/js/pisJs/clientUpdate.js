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
        var client_fo = GetURLParameter('client_fo');
        $('.card-body').find('input, select, button').prop('disabled', true);
        $('.btn-confirm_update').prop('disabled', true);
                
        function getLatestProfile () {
            __executeExternalGet('8080/file/getLatest/petitioner_profile/'+client_id+"/"+client_fo).done(function (result) {
                if (result.status != "ERROR") {
                    if (result.files.length != 0) {
                        $('#client_photo').attr('src', api+'8080/file/view/'+result.files[0].id);
                    }
                }
            })
        }
        $("#factSheet").unbind("click").on("click", function(){
            window.location.href = api+'/pis/client_view_factsheet?client_id='+client_id+'&field_office_id='+client_fo;
        })
        $(".btn-cance-update").unbind("click").on("click", function(){
            window.location.href = api+'/pis/client_view_factsheet?client_id='+client_id+'&field_office_id='+client_fo;
        })
        
        var __fields = function(){
            getLatestProfile();
            __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                var result = result.response;

                if (result.status != "ERROR") {
                    var name = `${result.firstName} ${result.middleName ?? ""} ${result.lastName} ${result.suffixName ?? ""}`
                    $("#petitionerName").text(name)
                    $(".gender_update").val(result.sex).trigger("change");
                    $(".firstName_update").val(result.firstName);
                    $(".middleName_update").val(result.middleName);
                    $(".lastName_update").val(result.lastName);
                    $(".suffix_update").val(result.suffixName);
                    $(".education_update").val(result.education);
                    $(".occupation_update").val(result.occupation);
                    $(".cc_no_update").val(result.criminalCaseNo);
                    $(".birthdate_update").val(result.birthDate);
                    $(".b_place_update").val(result.birthCity);
                    $(".address_update").val(result.permanentAddress);

                    $(".btn-confirm_update").unbind("click").on("click", function(){
                        var payload = {
                            "firstName"         : $(".firstName_update").val(),
                            "middleName"        : $(".middleName_update").val(),
                            "lastName"          : $(".lastName_update").val(),
                            "suffixName"        : $(".suffix_update").val(),
                            "clientType"        : result.clientType,
                            "sex"               : $(".gender_update").val(),
                            "education"         : $(".education_update").val(),
                            "occupation"        : $(".occupation_update").val(),
                            "criminalCaseNo"    : $(".cc_no_update").val(),
                            "fieldOfficeId"     : result.fieldOfficeId,
                            "birthDate"         : $(".birthdate_update").val(),
                            "birthCity"         : $(".b_place_update").val(),
                            "permanentAddress"  : $(".address_update").val(),
                            "createdBy"         : "",
                            "updatedBy"         : "",
                            "status"            : 1
                        }
                        __executeExternalPost('8000/petitioner/update/'+client_id,JSON.stringify(payload)).done(function (result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                            $(".form-control").val('');
                            $('#success').show();
                                setTimeout(function () {
                                    $('#success').hide();
                                    window.location.href = api+'/pis/client_list';
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
            __fields();
            $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm_update').prop('disabled', false);
        }, 0);


    } )( jQuery );