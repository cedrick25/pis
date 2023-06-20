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
        console.log(client_id)
        var field_office_id = GetURLParameter('field_office_id');
        console.log(field_office_id)

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




        $(".btn-reset").unbind("click").on("click", function(){
            $(".form-control").val('');
        });

        // var __select = function(){
        //     $('.field_office').empty();

        //     __executeExternalGet('8080/department/list').done(function (result) {
        //         // console.log(result)
        //         if (result.status != "ERROR") {
        //             $('.field_office').append("<option selected disabled> - - Select Field Office - - </option>");
        //             result.forEach(function(data){
        //                 $('.field_office').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");
        //             });
        //             setTimeout(function () {
        //                 $(".field_office").val($.cookie("field_office_id")).trigger("change");
        //             }, 2000);
                    
        //         } else {
        //             console.log("failed fetching docket list")
        //         }
        //     })
        // }
        // __select();


            $(".btn-next").unbind("click").on("click", function(){

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


            for(var i = 0; i < agency.length; i++){

                const list = {};
                list.agency = $(agency[i]).val();
                list.cc_no = $(cc_no[i]).val();
                list.offense = $(offense[i]).val();
                list.when = $(when[i]).val();
                list.where = $(where[i]).val();
                list.disposition = $(disposition[i]).val();
                records.push(list);
            }

            for(var i = 0; i < source.length; i++){

                const list_info = {};
                list_info.source = $(source[i]).val();
                list_info.date = $(date[i]).val();
                list_info.pos = $(pos[i]).val();
                list_info.particulars = $(particulars[i]).val();
                recordInfo.push(list_info);
            }

            console.log(records)
            console.log(recordInfo)

            var priorRecords = {

                priorRecord         : records,
                recordsInfo         : recordInfo

            }

            console.log(priorRecords)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(priorRecords),
            "type"                      : "priorRecords",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/create',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_family_background?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })
            })

            __executeExternalGet('8000/worksheet/getPetitioner/priorRecords/'+client_id).done(function (result) {
            console.log("==========")
            console.log(result)
            console.log("==========")

            var result = result.response;

            if (result.status != "ERROR") {

                if (result.worksheetStatus == "INCOMPLETE"){

                    $('.list').empty();
                    $('.list_info').empty();

                    $(".btn-update").show();
                    $(".btn-next").hide();

                    // console.log($('input[name="derogatoryRecord"]').val())

                    $('input[name="derogatoryRecord"]').val(JSON.parse(result.jsonData).derogatoryRecord).prop("checked",true);
                    $('input[name="allegedby"]').val(JSON.parse(result.jsonData).allegedBy).prop("checked",true);
                    $('input[name="probation"]').val(JSON.parse(result.jsonData).probation).prop("checked",true);

                    // console.log(JSON.parse(result.jsonData))

                    const recordList = JSON.parse(result.jsonData)

                    // console.log(recordList)


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

            // const allegedBy = [];
            // const petitioner = $(".petitioner");
            // const otherSources = $(".otherSources");

            // for(var i = 0; i < petitioner.length; i++){

            //     const list_alleged = {};
            //     list_alleged.petitioner = $(petitioner[i]).val();
            //     list_alleged.otherSources = $(otherSources[i]).val();
            //     allegedBy.push(list_alleged);
            // }

            for(var i = 0; i < agency.length; i++){

                const list = {};
                list.agency = $(agency[i]).val();
                list.cc_no = $(cc_no[i]).val();
                list.offense = $(offense[i]).val();
                list.when = $(when[i]).val();
                list.where = $(where[i]).val();
                list.disposition = $(disposition[i]).val();
                records.push(list);
            }

            for(var i = 0; i < source.length; i++){

                const list_info = {};
                list_info.source = $(source[i]).val();
                list_info.date = $(date[i]).val();
                list_info.pos = $(pos[i]).val();
                list_info.particulars = $(particulars[i]).val();
                recordInfo.push(list_info);
            }

            // console.log(records)
            // console.log(info)

            var priorRecords = {

                derogatoryRecord    : $('input[name="derogatoryRecord"]:checked').val(),
                allegedBy           : $('input[name="allegedby"]:checked').val(),
                probation           : $('input[name="probation"]:checked').val(),
                priorRecord         : records,
                recordsInfo         : recordInfo

            }

            console.log(priorRecords)


            var payload = {
            "petitionerId"              : client_id,
            "jsonData"                  : JSON.stringify(priorRecords),
            "type"                      : "priorRecords",
            "worksheetStatus"           : "INCOMPLETE",
            "createdBy"                 : $.cookie("uuid"),
            "fieldOfficeId"             : $.cookie("field_office_id")
            }

            console.log(payload)


            __executeExternalPost('8000/worksheet/updatePetitioner/priorRecords/'+client_id,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_family_background?client_id='+client_id;
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                }
                })
            })

        $(".idenData").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id;
                        }, 500);
                });
        });
        $(".presOff").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_present_offense?client_id='+client_id;
                        }, 500);
                });
        });
        // $(".priorRec").unbind("click").on("click", function(){
        //     // console.log("clicked")
        //         $(".btn_warning").unbind("click").on("click", function(){
        //             // console.log("clicked")
        //             $(".form-control").val('');
        //                 setTimeout(function () {
        //                     // window.location.reload(true);
        //                     window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_prior_records?client_id='+client_id;
        //                 }, 500);
        //         });
        // });
        $(".famBg").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_family_background?client_id='+client_id;
                        }, 500);
                });
        });
        $(".socioEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_socio_economic?client_id='+client_id;
                        }, 500);
                });
        });
        $(".resEco").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_residence_economic?client_id='+client_id;
                        }, 500);
                });
        });
        $(".spouseChild").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_spouse_children?client_id='+client_id;
                        }, 500);
                });
        });
        $(".educHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_education_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".empHis").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_employment_history?client_id='+client_id;
                        }, 500);
                });
        });
        $(".envFac").unbind("click").on("click", function(){
            // console.log("clicked")
                $(".btn_warning").unbind("click").on("click", function(){
                    // console.log("clicked")
                    $(".form-control").val('');
                        setTimeout(function () {
                            // window.location.reload(true);
                            window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_environmental_factor?client_id='+client_id;
                        }, 500);
                });
        });



        // $('.petitioner').click(function(){
        //     // console.log("clicked")
        //     var petitionerRadio = $('.petitioner').val()
        //     console.log(petitionerRadio)
        // });


    } )( jQuery );