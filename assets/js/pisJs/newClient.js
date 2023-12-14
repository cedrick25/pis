    ( function ( $ ) {
        
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

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

        $(".btn-confirm").unbind("click").on("click", function(){
            var payload = {
                    "firstName"         : $(".firstName").val(),
                    "middleName"        : $(".middleName").val(),
                    "lastName"          : $(".lastName").val(),
                    "suffixName"        : $(".suffix").val(),
                    "sex"               : $(".gender").val(),
                    "education"         : $(".education").val(),
                    "occupation"        : $(".occupation").val(),
                    "criminalCaseNo"    : $(".cc_no").val(),
                    "fieldOfficeId"     : $(".field_office").val(),
                    "birthDate"         : $(".birthdate").val(),
                    "birthCity"         : $(".b_place").val(),
                    "permanentAddress"  : $(".address").val(),
                    "createdBy"         : $.cookie('uuid'),
                    "updatedBy"         : "",
                    "id"                : "",
                    "clientType"        : $(".client_type").val(),
                    "status"            : 1
            }
            __executeExternalPost('8000/petitioner/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
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
        var __select = function(){
            $('.field_office').empty();

            __executeExternalGet('8088/department/list').done(function (result) {
                console.log(result)
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
        __select();


        var checkbox = document.getElementsByClassName("middleNameCheck")[0];
        checkbox.addEventListener("change", toggleCheckbox);
        var inputBoxMiddleName = document.getElementsByClassName("middleName")[0];

        function toggleCheckbox() {
            if (checkbox.checked) {
                console.log("The checkbox is checked.");
                inputBoxMiddleName.disabled = true;
                inputBoxMiddleName.placeholder = "N/A";
                inputBoxMiddleName.value = "";
            } else {
                console.log("The checkbox is not checked.");
                inputBoxMiddleName.disabled = false;
                inputBoxMiddleName.placeholder = "e.g A.";
            }
        }

    } )( jQuery );