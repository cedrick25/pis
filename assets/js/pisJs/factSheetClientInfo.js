( function ( $ ) {
        var ___ctx = '';

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
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

        var clientId = GetURLParameter('clientId');

        __executeExternalGet('http://localhost:8000/petitioner/'+clientId).done(function (result) {
                console.log(result);
                
                var result = result.response;

                if (result.status != "ERROR") {

                    $(".client").html(`
                    <div class="clientData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Client Type:</label> ${result.clientType}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Field Office:</label> ${result.fieldOfficeName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">First Name:</label> ${result.firstName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Middle Name:</label> ${result.middleName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Last Name:</label> ${result.lastName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Suffix Name:</label> ${result.suffixName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label> ${result.sex}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label> ${result.education}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${result.occupation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Criminal Case No.:</label> ${result.criminalCaseNo}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birthdate:</label> ${result.birthDate}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place:</label> ${result.birthCity}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${result.permanentAddress}</div>
                        </div>
                    </div>`
        );

                }
                else{
                    alert("failed")
                }
        })


        


    } )( jQuery );