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

        var clientId = GetURLParameter('clientId');
        var clientType = GetURLParameter('clientType');

        __executeExternalGet('8000/worksheet/getPetitioner/identifyingData/'+clientId).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".identifyingData").html(`
                    <div class="iData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${JSON.parse(result.jsonData).name}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Alias(es):</label> ${JSON.parse(result.jsonData).alias}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Present Address:</label> ${JSON.parse(result.jsonData).presentAddress}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Initial Interview:</label> ${JSON.parse(result.jsonData).interview}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">True Name:</label> ${JSON.parse(result.jsonData).trueName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Permanent Address Address:</label> ${JSON.parse(result.jsonData).permanentAdress}</div>
                        </div>
                    </div>`
                );



            }
            else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/presentOffense/'+clientId).done(function (result) {
            // console.log(result)

            var result = result.response;

            if (result.status != "ERROR") {

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".presentOffense").html(`
                    <div class="pOffense">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Charged With:</label> ${JSON.parse(result.jsonData).chargedWith}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Place of Commision:</label> ${JSON.parse(result.jsonData).commisionPlace}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Convicted Of:</label> ${JSON.parse(result.jsonData).convictedOf}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Charged:</label> ${JSON.parse(result.jsonData).dateCharged}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Commited:</label> ${JSON.parse(result.jsonData).dateCommitted}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Convicted:</label> ${JSON.parse(result.jsonData).dateConvicted}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sentence:</label> ${JSON.parse(result.jsonData).sentenceMonth} / ${JSON.parse(result.jsonData).sentenceDay} / ${JSON.parse(result.jsonData).sentenceYear}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Judge:</label> ${JSON.parse(result.jsonData).judge}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Court:</label> ${JSON.parse(result.jsonData).court}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Arresting Officer:</label> ${JSON.parse(result.jsonData).arrestingOfficer}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).firstAddress}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Defense Counsel:</label> ${JSON.parse(result.jsonData).defenseCounsel}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).secondAddress}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Prosecutor:</label> ${JSON.parse(result.jsonData).prosecutor}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).thirdAddress}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Offended Party:</label> ${JSON.parse(result.jsonData).offended}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).fourthAddress}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Co-Accused:</label> ${JSON.parse(result.jsonData).coAccused}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Aggravating Circumstances:</label> ${JSON.parse(result.jsonData).aggravatingCirsumstances}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Mitigating Circumstances:</label> ${JSON.parse(result.jsonData).mitigatingCircumstances}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Extent of Participation:</label> ${JSON.parse(result.jsonData).extentParticipation}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Custody:</label> ${JSON.parse(result.jsonData).custody}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Motives:</label> ${JSON.parse(result.jsonData).motives}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label> ${JSON.parse(result.jsonData).explain}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Manner of Commision:</label> ${JSON.parse(result.jsonData).mannerofCommision}</div>
                        </div>
                    </div>`
                );
            }
            else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/priorRecords/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".priorRecords").html(`
                    <div class="pOffense">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Alleged By:</label> ${JSON.parse(result.jsonData).derogatoryRecord}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Records:</label> ${JSON.parse(result.jsonData).allegedBy}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Has been of probation:</label> ${JSON.parse(result.jsonData).probation}</div>
                        </div>
                    </div>`
                );

                var records = JSON.parse(result.jsonData).priorRecord;
                for (var i = 0; i < records.length; i++){
                    var precords = records[i];
                    // console.log(precords)
                    $(".records").append(`
                        <div class="pRecords">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Agency:</label> ${precords.agency}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Crminal Case Number:</label> ${precords.cc_no}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Offense:</label> ${precords.offense}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">When:</label> ${precords.when}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${precords.where}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Disposition:</label> ${precords.disposition}</div>
                            </div>
                        </div>`
                    );
                }

                var info = JSON.parse(result.jsonData).recordsInfo;
                for (var j = 0; j < info.length; j++){
                    var recInfo = info[j];
                    // console.log(recInfo)
                    $(".information").append(`
                        <div class="info">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Source:</label> ${recInfo.source}</div>
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date:</label> ${recInfo.date}</div>
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Position:</label> ${recInfo.pos}</div>
                                <div class="col col-md-3"><label for="text-input" class=" form-control-label">Particulars:</label> ${recInfo.particulars}</div>
                            </div>
                        </div>`
                    );
                }
            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/familyBackground/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".self").html(`
                    <div class="selfInfo">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label> ${JSON.parse(result.jsonData).sex}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Civil Status:</label> ${JSON.parse(result.jsonData).civilStatus}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label> ${JSON.parse(result.jsonData).citizenship}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label> ${JSON.parse(result.jsonData).religion}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label> ${JSON.parse(result.jsonData).bday}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Region:</label> ${JSON.parse(result.jsonData).bplace}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Province:</label> ${JSON.parse(result.jsonData).bprovince}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth City/Municipality:</label> ${JSON.parse(result.jsonData).bcity}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place (Others):</label> ${JSON.parse(result.jsonData).bplaceOthers}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Identifying Marks:</label> ${JSON.parse(result.jsonData).identifyingMarks}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Handicap:</label> ${JSON.parse(result.jsonData).handicap}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description:</label> ${JSON.parse(result.jsonData).desc}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Parents Relationship:</label> ${JSON.parse(result.jsonData).parentsRelationship}</div>
                        </div>
                    </div>`
                );
                $(".paternal").html(`
                    <div class="paternalInfo">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${JSON.parse(result.jsonData).fatherName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place:</label> ${JSON.parse(result.jsonData).fatherBplace}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label> ${JSON.parse(result.jsonData).fatherBday}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).fatherAdd}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label> ${JSON.parse(result.jsonData).fatherCitizenship}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label> ${JSON.parse(result.jsonData).fatherReligion}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label> ${JSON.parse(result.jsonData).fatherEducation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${JSON.parse(result.jsonData).fatherOccupation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label> ${JSON.parse(result.jsonData).fatherWork_add}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Tel. No.:</label> ${JSON.parse(result.jsonData).fatherTelNo}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Monthly Income:</label> ${JSON.parse(result.jsonData).fatherIncome}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Deceased:</label> ${JSON.parse(result.jsonData).fatherDateDeceased}</div>
                        </div>
                    </div>`
                );
                $(".maternal").html(`
                    <div class="maternalInfo">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${JSON.parse(result.jsonData).motherName}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place:</label> ${JSON.parse(result.jsonData).motherBplace}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label> ${JSON.parse(result.jsonData).motherBday}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${JSON.parse(result.jsonData).motherAdd}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label> ${JSON.parse(result.jsonData).motherCitizenship}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label> ${JSON.parse(result.jsonData).motherReligion}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label> ${JSON.parse(result.jsonData).motherEducation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${JSON.parse(result.jsonData).motherOccupation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label> ${JSON.parse(result.jsonData).motherWork_add}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Tel. No.:</label> ${JSON.parse(result.jsonData).motherTelNo}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Monthly Income:</label> ${JSON.parse(result.jsonData).motherIncome}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Deceased:</label> ${JSON.parse(result.jsonData).motherDeceased}</div>
                        </div>
                    </div>`
                );

                var sibling = JSON.parse(result.jsonData).siblings;
                for (var i = 0; i < sibling.length; i++){
                    var sibs = sibling[i];
                    $(".siblings").append(`
                        <div class="siblingsInfo">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${sibs.sibling_name}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Relationship:</label> ${sibs.relationship}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Age:</label> ${sibs.age}</div>
                            </div>
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label> ${sibs.sibling_sex}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label> ${sibs.sibling_education}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${sibs.sibling_occupation}</div>
                            </div>
                        </div>`
                    );
                }
            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/socioEconomic/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".eco").html(`
                    <div class="ecoBack">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Relationship:</label> ${JSON.parse(result.jsonData).family_rel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Reputation in Community:</label> ${JSON.parse(result.jsonData).family_rep}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Home Condition:</label> ${JSON.parse(result.jsonData).home_cond}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Major Family Problems:</label> ${JSON.parse(result.jsonData).fam_prob}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Economic Status:</label> ${JSON.parse(result.jsonData).eco_status}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Stability of Residence:</label> ${JSON.parse(result.jsonData).stability}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Childhood Circumstances:</label> ${JSON.parse(result.jsonData).circumstances}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Comments:</label> ${JSON.parse(result.jsonData).comments}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label> ${JSON.parse(result.jsonData).explain}</div>
                        </div>
                    </div>`
                );

            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/residenceEconomic/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                var residences = JSON.parse(result.jsonData).residence;
                for (var i = 0; i < residences.length; i++){
                    var resd = residences[i];
                    // console.log(resd)
                    $(".res").append(`
                        <div class="resData">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label> ${resd.resAdd}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date From:</label> ${resd.dateFrom}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date To:</label> ${resd.dateTo}</div>
                            </div>
                        </div>`
                    );
                }
                $(".res").append(`
                    <div class="resData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Stability of Residence:</label> ${JSON.parse(result.jsonData).residenceStability}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Residence:</label> ${JSON.parse(result.jsonData).residenceType}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Home Condition:</label> ${JSON.parse(result.jsonData).residenceHomeCondition}</div>
                        </div>
                    </div>`
                );
                $(".ecoStatus").html(`
                    <div class="ecoStatusData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Status:</label> ${JSON.parse(result.jsonData).fam_status}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Breadwinner:</label> ${JSON.parse(result.jsonData).fam_breadwinner}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">No. of Dependants</label> ${JSON.parse(result.jsonData).no_dependants}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Dependants:</label> ${JSON.parse(result.jsonData).dependants}</div>
                        </div>
                    </div>`
                );
                $(".famProb").html(`
                    <div class="famProbData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Major Family Problems:</label> ${JSON.parse(result.jsonData).maj_fam_prob}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Comments:</label> ${JSON.parse(result.jsonData).fam_comments}</div>
                        </div>
                    </div>`
                );
            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/spouseChildren/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".civil").html(`
                    <div class="civilData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Civil Status:</label> ${JSON.parse(result.jsonData).civilStatus}</div>
                        </div>
                    </div>`
                );
                $(".spouse").html(`
                    <div class="spouseData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${JSON.parse(result.jsonData).spouseFname} ${JSON.parse(result.jsonData).spouseMname} ${JSON.parse(result.jsonData).spouseLname} ${JSON.parse(result.jsonData).spouseEname}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Present Address:</label> ${JSON.parse(result.jsonData).presentAddress}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Region:</label> ${JSON.parse(result.jsonData).spouse_region}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label> ${JSON.parse(result.jsonData).spouse_bday}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Province:</label> ${JSON.parse(result.jsonData).spouseProvince}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label> ${JSON.parse(result.jsonData).spouse_work_add}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Municipality:</label> ${JSON.parse(result.jsonData).spouseMunicipality}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Nature of Ceremony:</label> ${JSON.parse(result.jsonData).spouse_ceremony}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place (Others):</label> ${JSON.parse(result.jsonData).spouse_bplace_others}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${JSON.parse(result.jsonData).spouse_occupation}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Marriage Date:</label> ${JSON.parse(result.jsonData).date_marriage}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Remarks:</label> ${JSON.parse(result.jsonData).spouse_remarks}</div>
                        </div>
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Spouse Relationship:</label> ${JSON.parse(result.jsonData).spouse_relationship}</div>
                        </div>
                    </div>`
                );

                var childList = JSON.parse(result.jsonData).children;
                for (var i = 0; i < childList.length; i++){
                    var childrenList = childList[i];
                    $(".child").append(`
                        <div class="childData">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label> ${childrenList.child_fname} ${childrenList.child_mname} ${childrenList.child_lname} ${childrenList.child_sname}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Birth:</label> ${childrenList.child_bdate}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label> ${childrenList.child_education}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Age:</label> ${childrenList.child_age}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label> ${childrenList.child_occupation}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label> ${childrenList.childSex}</div>
                            </div>
                        </div>`
                    );
                }

            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/educationHistory/'+clientId).done(function (result) {
            // console.log(result)
            var result = result.response;

            if (result != "ERROR"){
                // console.log(result)

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                $(".elem").html(`
                    <div class="elemData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label> ${JSON.parse(result.jsonData).elemLevel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label> ${JSON.parse(result.jsonData).elemHigh}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${JSON.parse(result.jsonData).elemWhere}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label> ${JSON.parse(result.jsonData).elemDate}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label> ${JSON.parse(result.jsonData).elemAward}</div>
                        </div>
                    </div>`
                );
                $(".sec").html(`
                    <div class="secData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label> ${JSON.parse(result.jsonData).secLevel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label> ${JSON.parse(result.jsonData).secHigh}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${JSON.parse(result.jsonData).secWhere}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label> ${JSON.parse(result.jsonData).secDate}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label> ${JSON.parse(result.jsonData).secAward}</div>
                        </div>
                    </div>`
                );
                $(".coll").html(`
                    <div class="collData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label> ${JSON.parse(result.jsonData).collegeLevel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label> ${JSON.parse(result.jsonData).collegeHigh}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${JSON.parse(result.jsonData).collegeWhere}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label> ${JSON.parse(result.jsonData).collegeDate}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label> ${JSON.parse(result.jsonData).collegeAward}</div>
                        </div>
                    </div>`
                );
                $(".pcoll").html(`
                    <div class="pcollData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label> ${JSON.parse(result.jsonData).pcollegeLevel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label> ${JSON.parse(result.jsonData).pcollegeHigh}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${JSON.parse(result.jsonData).pcollegeAward}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label> ${JSON.parse(result.jsonData).pcollegeDate}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label> ${JSON.parse(result.jsonData).pcollegeAward}</div>
                        </div>
                    </div>`
                );
                $(".voc").html(`
                    <div class="vocData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label> ${JSON.parse(result.jsonData).vocLevel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label> ${JSON.parse(result.jsonData).vocHigh}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label> ${JSON.parse(result.jsonData).collegeAward}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label> ${JSON.parse(result.jsonData).vocWhere}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label> ${JSON.parse(result.jsonData).vocAward}</div>
                        </div>
                    </div>`
                );
                $(".unschool").html(`
                    <div class="unschoolData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Unschooled:</label> ${JSON.parse(result.jsonData).unschool}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Conduct in School:</label> ${JSON.parse(result.jsonData).conduct}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label> ${JSON.parse(result.jsonData).educExplain}</div>
                        </div>
                    </div>`
                );

            }else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/employmentHistory/'+clientId).done(function (result) {
            var result = result.response;

            if (result.status != "ERROR") {

                JSON.parse(result.jsonData)

                // console.log(JSON.parse(result.jsonData))

                var empHist = JSON.parse(result.jsonData).empHistory;
                for (var i = 0; i < empHist.length; i++){
                    var employmentHistory = empHist[i]
                    $(".empHistory").append(`
                        <div class="empHistoryData">
                            <div class="row form-group col-md-12">
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Job Held:</label> ${employmentHistory.job_held}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Employer Address:</label> ${employmentHistory.emp_add}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date From:</label> ${employmentHistory.emp_dateFrom}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date To:</label> ${employmentHistory.emp_dateTo}</div>
                                <div class="col col-md-4"><label for="text-input" class=" form-control-label">Income:</label> ${employmentHistory.emp_Income}</div>
                            </div>
                        </div>`
                    );
                }
                
                $(".empStatus").html(`
                    <div class="empStatusData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Status of Employment:</label> ${JSON.parse(result.jsonData).empStatus}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label> ${JSON.parse(result.jsonData).empSpecStatus}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Means of Support:</label> ${JSON.parse(result.jsonData).empSupport}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label> ${JSON.parse(result.jsonData).empSpecSupp}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Employable Skills:</label> ${JSON.parse(result.jsonData).empSkills}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Other Source of income:</label> ${JSON.parse(result.jsonData).empOtherSource}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Health:</label> ${JSON.parse(result.jsonData).empHealth}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label> ${JSON.parse(result.jsonData).empExplainHealth}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Previous Treatment:</label> ${JSON.parse(result.jsonData).empTreatment}</div>
                        </div>
                    </div>`
                );
            }
            else{
                console.log("error fetching data")
            }
        })
        __executeExternalGet('8000/worksheet/getPetitioner/environmentalFactor/'+clientId).done(function (result) {

            var result = result.response;

            if (result.status != "ERROR") {

                JSON.parse(result.jsonData)

                console.log(JSON.parse(result.jsonData))

                $(".envFactor").html(`
                    <div class="envFactorData">
                        <div class="row form-group col-md-12">
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Neighborhood:</label> ${JSON.parse(result.jsonData).neighborhood}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Area:</label> ${JSON.parse(result.jsonData).area}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Describe:</label> ${JSON.parse(result.jsonData).neighborhoodDescribe}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Neighborhood Criminality:</label> ${JSON.parse(result.jsonData).neighCrim}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label> ${JSON.parse(result.jsonData).criminalityExplain}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Community Acceptance:</label> ${JSON.parse(result.jsonData).comAcceptance}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label> ${JSON.parse(result.jsonData).acceptanceSpecify}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Peer Group Relationship:</label> ${JSON.parse(result.jsonData).peerRel}</div>
                            <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label> ${JSON.parse(result.jsonData).peerSpecify}</div>
                        </div>
                    </div>`
                );


            }
            else{
                console.log("error fetching data")
            }
        })
        
        
        
        
        
        
        



    } )( jQuery );