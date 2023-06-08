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



        $(".identifyingData").html(`
            <div class="iData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Alias(es):</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Present Address:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Initial Interview:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">True Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Permanent Address Address:</label></div>
                </div>
            </div>`
        );
        $(".presentOffense").html(`
            <div class="pOffense">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Charged With:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Place of Commision:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Convicted Of:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Charged:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Commited:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date Convicted:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sentence:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Judge:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Court:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Arresting Officer:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Defense Counsel:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Prosecutor:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Offended Party:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Co-Accused:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Aggravating Circumstances:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Mitigating Circumstances:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Extent of Participation:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Aggravating Circumstances:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Mitigating Circumstances:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Extent of Participation:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Custody:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Motives:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Manner of Commision:</label></div>
                </div>
            </div>`
        );
        $(".priorRecords").html(`
            <div class="pOffense">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Alleged By:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Records:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Has been of probation:</label></div>
                </div>
            </div>`
        );
        $(".records").html(`
            <div class="pRecords">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Agency:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Crminal Case Number:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Offense:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">When:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Disposition:</label></div>
                </div>
            </div>`
        );
        $(".information").html(`
            <div class="info">
                <div class="row form-group col-md-12">
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Source:</label></div>
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Position:</label></div>
                    <div class="col col-md-3"><label for="text-input" class=" form-control-label">Particulars:</label></div>
                </div>
            </div>`
        );
        $(".self").html(`
            <div class="selfInfo">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Civil Status:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Region:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Province:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth City/Municipality:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place (Others):</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Identifying Marks:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Handicap:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Description:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Parents Relationship:</label></div>
                </div>
            </div>`
        );
        $(".paternal").html(`
            <div class="paternalInfo">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Tel. No.:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Monthly Income:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Deceased:</label></div>
                </div>
            </div>`
        );
        $(".maternal").html(`
            <div class="maternalInfo">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Tel. No.:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Monthly Income:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Deceased:</label></div>
                </div>
            </div>`
        );
        $(".siblings").html(`
            <div class="siblingsInfo">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Relationship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Age:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Citizenship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Religion:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label></div>
                </div>
            </div>`
        );
        $(".eco").html(`
            <div class="ecoBack">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Relationship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Reputation in Community:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Home Condition:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Major Family Problems:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Economic Status:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Stability of Residence:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Childhood Circumstances:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Comments:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label></div>
                </div>
            </div>`
        );
        $(".res").html(`
            <div class="resData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Stability of Residence:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Type of Residence:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Home Condition</label></div>
                </div>
            </div>`
        );
        $(".ecoStatus").html(`
            <div class="ecoStatusData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Family Status:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Breadwinner:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">No. of Dependants</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Dependants:</label></div>
                </div>
            </div>`
        );
        $(".famProb").html(`
            <div class="famProbData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Major Family Problems:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Comments:</label></div>
                </div>
            </div>`
        );
        $(".civil").html(`
            <div class="civilData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Civil Status:</label></div>
                </div>
            </div>`
        );
        $(".spouse").html(`
            <div class="spouseData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Present Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Region:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Province:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Work Address:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Municipality:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Nature of Ceremony:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Birth Place (Others):</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Marriage Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Remarks:</label></div>
                </div>
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Spouse Relationship:</label></div>
                </div>
            </div>`
        );
        $(".child").html(`
            <div class="childData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Name:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date of Birth:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Age:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Occupation:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Sex:</label></div>
                </div>
            </div>`
        );
        $(".elem").html(`
            <div class="elemData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label></div>
                </div>
            </div>`
        );
        $(".sec").html(`
            <div class="secData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label></div>
                </div>
            </div>`
        );
        $(".coll").html(`
            <div class="collData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label></div>
                </div>
            </div>`
        );
        $(".pcoll").html(`
            <div class="pcollData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label></div>
                </div>
            </div>`
        );
        $(".voc").html(`
            <div class="vocData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Education Level:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Highest Level Attained:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Where:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Award Level:</label></div>
                </div>
            </div>`
        );
        $(".unschool").html(`
            <div class="unschoolData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Unschooled:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Conduct in School:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label></div>
                </div>
            </div>`
        );
        $(".empHistory").html(`
            <div class="empHistoryData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Job Held:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Employer Address:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date From:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Date To:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Income:</label></div>
                </div>
            </div>`
        );
        $(".empStatus").html(`
            <div class="empStatusData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Status of Employment:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Means of Support:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Employable Skills:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Other Source of income:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Physical Health:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Previous Treatment:</label></div>
                </div>
            </div>`
        );
        $(".envFactor").html(`
            <div class="envFactorData">
                <div class="row form-group col-md-12">
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Neighborhood:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Area:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Describe:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Neighborhood Criminality:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Explain:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Community Acceptance:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Peer Group Relationship:</label></div>
                    <div class="col col-md-4"><label for="text-input" class=" form-control-label">Specify:</label></div>
                </div>
            </div>`
        );


    } )( jQuery );