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

        var officeId = $.cookie("field_office_id");

        function buttonFunctionality(){

            $(".btn_worksheet").unbind("click").on("click", function(){
                var client_id   = $(this).data("id");
                var foid        = $(this).data("foid");
                // window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
                window.location.href = api+'8080/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
            })
            $(".btn_update").unbind("click").on("click", function(){
                var client_id = $(this).data("id");
                window.location.href = api+'/pis/client_update?client_id='+client_id;
                // window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;

            })
            $(".btn_upload").unbind("click").on("click", function(){
                var client_id = $(this).data("id");
                var client_type = $(this).data("type");
                window.location.href = api+'/pis/client_file_upload?client_id='+client_id+'&client_type='+client_type;
            })
            $(".btn_view").unbind("click").on("click", function(){
                var client_id = $(this).data("id");
                var client_type = $(this).data("type");
                // console.log(client_type)
                window.location.href = api+'/pis/client_view_upload?client_id='+client_id+'&client_type='+client_type;
            })
            $(".btn_psir").unbind("click").on("click", function(){
                var client_id   = $(this).data("id");
                var foid        = $(this).data("foid");
                window.location.href = api+'8080/pis/psir_identifying_data?client_id='+client_id+'&field_office_id='+foid;
            })
            $(".btn_pdfPSIR").unbind("click").on("click", function(){
                var client_id   = $(this).data("id");
                var foid        = $(this).data("foid");

                __executeExternalGet('8000/petitioner/'+client_id).done(function (result) {
                    var result = result.response;

    __executeExternalGet('8000/worksheet/getPetitioner/psirIdentifyingData/'+client_id).done(function (result2){

        var result2 = result2.response;
            __executeExternalGet('8000/worksheet/getPetitioner/psirPresentOffense/'+client_id).done(function (result3){

            var result3 = result3.response;
                __executeExternalGet('8000/worksheet/getPetitioner/psirPriorRecords/'+client_id).done(function (result4){
                var result4 = result4.response;

                    __executeExternalGet('8000/worksheet/getPetitioner/psirFamilyBackground/'+client_id).done(function (result5){
                    var result5 = result5.response;

                        __executeExternalGet('8000/worksheet/getPetitioner/psirSocioEconomic/'+client_id).done(function (result6){
                        var result6 = result6.response;

                            __executeExternalGet('8000/worksheet/getPetitioner/psirResidenceEconomic/'+client_id).done(function (result7){
                            var result7 = result7.response;

                                __executeExternalGet('8000/worksheet/getPetitioner/psirSpouseChildren/'+client_id).done(function (result8){
                                var result8 = result8.response;

                                    __executeExternalGet('8000/worksheet/getPetitioner/psirEducationHistory/'+client_id).done(function (result9){
                                    var result9 = result9.response;

                                        __executeExternalGet('8000/worksheet/getPetitioner/psirEmploymentHistory/'+client_id).done(function (result10){
                                        var result10 = result10.response;

                                            __executeExternalGet('8000/worksheet/getPetitioner/psirEnvironmentalFactor/'+client_id).done(function (result11){
                                            var result11 = result11.response;

                                                __executeExternalGet('8000/worksheet/getPetitioner/psirEvaluation/'+client_id).done(function (result12){
                                                var result12 = result12.response;

                                                    __executeExternalGet('8000/worksheet/getPetitioner/psirRecommendation/'+client_id).done(function (result13){
                                                    var result13 = result13.response;

                                                        if (result.status != "ERROR"){

                                                            var doc = new jsPDF();

                                                            doc.setFont('times', 'normal');
                                                            doc.setFontSize(13)
                                                            var lineHeight = doc.getLineHeight() - 8;

                                                            doc.text('PPA FORM 3/p. 1', 10, 10);
                                                            doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
                                                            doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
                                                            doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
                                                            doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });

                                                            doc.setFontSize(10);
                                                            doc.text('Republic of the Philippines', 80, 10 + lineHeight*3, { align: 'center' });
                                                            doc.text('Department of Justice', 85, 10 + lineHeight*4, { align: 'center' });
                                                            doc.text('PAROLE AND PROBATION ADMINISTRATION', 60, 10 + lineHeight*5, { align: 'center' });
                                                            doc.text('REGIONAL OFFICE NO.', 83, 10 + lineHeight*6, { align: 'center' });
                                                            doc.text('Parole and Probation Office', 80, 10 + lineHeight*7, { align: 'center' });
                                                            doc.text('POST-SENTENCE INVESTIGATION REPORT', 63, 12 + lineHeight*8, { align: 'center' });

                                                            doc.text('I. BASIC INFORMATION', 80, 12 + lineHeight*9, { align: 'left' });
                                                            doc.text("PETIONER's NAME: "+JSON.parse(result2.jsonData).name, 10, 10 + lineHeight*10.5);
                                                            doc.text('True Name: '+JSON.parse(result2.jsonData).trueName, 10, 10 + lineHeight*11.5);
                                                            doc.text('Aliases: '+JSON.parse(result2.jsonData).alias, 130, 10 + lineHeight*11.5);
                                                            doc.text('Gender: '+result.sex, 10, 10 + lineHeight*12.5);
                                                            doc.text('Age: '+JSON.parse(result2.jsonData).alias, 130, 10 + lineHeight*12.5);
                                                            doc.text('Birthday: '+JSON.parse(result5.jsonData).bday, 10, 10 + lineHeight*13.5);
                                                            doc.text('Birthplace: '+JSON.parse(result5.jsonData).bprovince+' '+JSON.parse(result5.jsonData).bcity+' '+JSON.parse(result5.jsonData).bplace, 130, 10 + lineHeight*13.5);
                                                            doc.text('Nationality: '+JSON.parse(result5.jsonData).citizenship, 10, 10 + lineHeight*14.5);
                                                            doc.text('Religion: '+JSON.parse(result5.jsonData).religion, 130, 10 + lineHeight*14.5);
                                                            doc.text('Educational Attainment: '+JSON.parse(result9.jsonData).elemHigh+','+JSON.parse(result9.jsonData).secHigh+','+JSON.parse(result9.jsonData).collegeHigh+','+JSON.parse(result9.jsonData).pcollegeHigh+','+JSON.parse(result9.jsonData).vocHigh, 10, 10 + lineHeight*15.5);
                                                            doc.text('Civil Status: '+JSON.parse(result5.jsonData).civilStatus, 130, 10 + lineHeight*16.5);
                                                            doc.text('Birth Order: '+result.sex, 10, 10 + lineHeight*16.5);
                                                            doc.text('Occupation: '+JSON.parse(result5.jsonData).job_held, 130, 10 + lineHeight*17.5);
                                                            doc.text("Father's Name: "+JSON.parse(result5.jsonData).fatherName, 10, 10 + lineHeight*17.5);
                                                            doc.text("Mother's Name: "+JSON.parse(result5.jsonData).motherName, 130, 10 + lineHeight*18.5);
                                                            doc.text('Spouse: '+JSON.parse(result8.jsonData).spouseLname+','+JSON.parse(result8.jsonData).spouseFname+' '+JSON.parse(result8.jsonData).spouseMname+','+JSON.parse(result8.jsonData).spouseEname, 10, 10 + lineHeight*18.5);
                                                            doc.text('Occupation: '+JSON.parse(result8.jsonData).spouse_occupation, 130, 10 + lineHeight*19.5);
                                                            
                                                            doc.text('Identifying Marks/Unusual Features:'+JSON.parse(result5.jsonData).identifyingMarks,10, 10 + lineHeight*19.5)
                                                            doc.text('Present Address:'+JSON.parse(result2.jsonData).presentAddress,10, 10 + lineHeight*20.5)
                                                            doc.text('Permanent Address:'+JSON.parse(result2.jsonData).permanentAdress,10, 10 + lineHeight*21.5)

                                                            doc.text('II. PERSONAL AND SOCIAL HISTORY', 80, 12 + 155, { align: 'left' });
                                                            // doc.text('A. SUBJECTIVE SOCIO-ECONOMIC STATUS: '+JSON.parse(result6.jsonData).eco_status,10, 10 + lineHeight*23.5)
                                                            // doc.text('B. FAMILY RELATIONSHIP:'+JSON.parse(result6.jsonData).family_rel,10, 10 + lineHeight*24.5)
                                                            // doc.text('C. FAMILY REPUTATION:'+JSON.parse(result7.jsonData).fam_status,10, 10 + lineHeight*25.5)
                                                            // doc.text('D. OVERALL WELL-BEING:'+JSON.parse(result10.jsonData).empHealth,10, 10 + lineHeight*26.5)
                                                            // doc.text('E. FAMILY SUPPORT:'+JSON.parse(result2.jsonData).permanentAdress,10, 10 + lineHeight*27.5)
                                                            // doc.text('F. COMMUNITY SUPPORT:'+JSON.parse(result11.jsonData).comAcceptance,10, 10 + lineHeight*28.5)

                                                            // Define checkbox properties
                                                            var checkboxSize = 5; // Size of the checkbox square
                                                            var checkboxTextMargin = 2; // Margin between the checkbox and the text
                                                            var checkboxFontSize = 12; // Font size of the text

                                                            // Function to draw a checkbox at the specified position
                                                            function drawCheckbox(x, y, checked, text) {
                                                              doc.rect(x, y, checkboxSize, checkboxSize); // Draw the checkbox square
                                                              if (checked) {
                                                                var checkmarkSize = checkboxSize - 1; // Calculate the size of the checkmark to fit inside the checkbox
                                                                console.log(checkmarkSize)
                                                                var checkmarkX = x + (checkboxSize - checkmarkSize) / 2 - 0.5; // Calculate the x position for the checkmark
                                                                console.log(checkmarkX)
                                                                var checkmarkY = y + (checkboxSize - checkmarkSize) / 2 + checkmarkSize - 3.5; // Calculate the y position for the checkmark
                                                                console.log(checkmarkY)
                                                                doc.rect(checkmarkX, checkmarkY, checkmarkSize, checkmarkSize, "F"); // Draw the checkmark
                                                              }
                                                              if (typeof text === "string") {
                                                                doc.setFont("Helvetica", "normal"); // Set font for the text
                                                                doc.setFontSize(checkboxFontSize); // Set font size for the text
                                                                doc.text(text, x + checkboxSize + checkboxTextMargin, y + checkboxSize / 2); // Draw the text next to the checkbox
                                                              }
                                                            }

                                                            // Usage
                                                            // drawCheckbox(70, 50, true); // Draw a checked checkbox at position (50, 50)

                                                            var ecoStatus = JSON.parse(result6.jsonData).eco_status;
                                                            var famRel = JSON.parse(result6.jsonData).family_rel;
                                                            var famStatus = JSON.parse(result6.jsonData).family_rep;
                                                            // console.log(ecoStatus)
                                                            doc.text('A. SUBJECTIVE SOCIO-',10, 10 + 165)
                                                            doc.text('ECONOMIC STATUS: ',10, 10 + 170)

                                                        if (ecoStatus == "POOR"){
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, true, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "LOW INCOME"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, true, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "LOWER MIDDLE INCOME"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, true, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "MIDDLE CLASS"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, true, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "UPPER MIDDLE CLASS"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, true, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "UPPER INCOME"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, true, "Upper Income");
                                                            drawCheckbox(10, 250, false, "Rich");
                                                            }else if (ecoStatus == "RICH"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 190, false, "Poor");
                                                            drawCheckbox(10, 200, false, "Low income");
                                                            drawCheckbox(10, 210, false, "Lower Middle Income");
                                                            drawCheckbox(10, 220, false, "Middle Class");
                                                            drawCheckbox(10, 230, false, "Upper Middle Class");
                                                            drawCheckbox(10, 240, false, "Upper Income");
                                                            drawCheckbox(10, 250, true, "Rich");
                                                            }else{
                                                            console.log(false)
                                                            }

                                                            doc.text('B. FAMILY RELATIONSHIP',70, 10 + 165);

                                                            if (famRel == "VERY SATISFACTORY"){
                                                            drawCheckbox(70, 190, true, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }else if (famRel == "SATISFACTORY"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, true, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }else if (famRel == "FAIR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, true, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }else if (famRel == "POOR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, true, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }else if (famRel == "VERY POOR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, true, "Very poor");
                                                            }
                                                        else{
                                                            console.log(false)
                                                        }

                                                        if (famRel == "VERY SATISFACTORY"){
                                                            drawCheckbox(70, 190, true, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }
                                                        else if (famRel == "SATISFACTORY"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, true, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }
                                                        else if (famRel == "FAIR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, true, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }
                                                        else if (famRel == "POOR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, true, "Poor");
                                                            drawCheckbox(70, 230, false, "Very poor");
                                                            }
                                                        else if (famRel == "VERY POOR"){ 
                                                            drawCheckbox(70, 190, false, "Very satisfactory");
                                                            drawCheckbox(70, 200, false, "Satisfactory");
                                                            drawCheckbox(70, 210, false, "Fair");
                                                            drawCheckbox(70, 220, false, "Poor");
                                                            drawCheckbox(70, 230, true, "Very poor");
                                                            }
                                                        else{
                                                            console.log(false)
                                                        }

                                                            doc.text('C. FAMILY REPUTATION',130, 10 + 165);

                                                        if (famStatus == "VERY SATISFACTORY"){
                                                            // console.log("true")
                                                            drawCheckbox(130, 190, true, "Very satisfactory");
                                                            drawCheckbox(130, 200, false, "Satisfactory");
                                                            drawCheckbox(130, 210, false, "Fair");
                                                            drawCheckbox(130, 220, false, "Poor");
                                                            drawCheckbox(130, 230, false, "Very poor");
                                                            }
                                                        else if (famStatus == "SATISFACTORY"){ 
                                                            // console.log("true")
                                                            drawCheckbox(130, 190, false, "Very satisfactory");
                                                            drawCheckbox(130, 200, true, "Satisfactory");
                                                            drawCheckbox(130, 210, false, "Fair");
                                                            drawCheckbox(130, 220, false, "Poor");
                                                            drawCheckbox(130, 230, false, "Very poor");
                                                            }
                                                        else if (famStatus == "FAIR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(130, 190, false, "Very satisfactory");
                                                            drawCheckbox(130, 200, false, "Satisfactory");
                                                            drawCheckbox(130, 210, true, "Fair");
                                                            drawCheckbox(130, 220, false, "Poor");
                                                            drawCheckbox(130, 230, false, "Very poor");
                                                            }
                                                        else if (famStatus == "POOR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(130, 190, false, "Very satisfactory");
                                                            drawCheckbox(130, 200, false, "Satisfactory");
                                                            drawCheckbox(130, 210, false, "Fair");
                                                            drawCheckbox(130, 220, true, "Poor");
                                                            drawCheckbox(130, 230, false, "Very poor");
                                                            }
                                                        else if (famStatus == "VERY POOR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(130, 190, false, "Very satisfactory");
                                                            drawCheckbox(130, 200, false, "Satisfactory");
                                                            drawCheckbox(130, 210, false, "Fair");
                                                            drawCheckbox(130, 220, false, "Poor");
                                                            drawCheckbox(130, 230, true, "Very poor");
                                                        }else{
                                                            console.log(false)
                                                        }

                                                            // PAGE 2

                                                            doc.addPage();
                                                            doc.setFontSize(13)
                                                            doc.text('PPA FORM 3/p. 1', 10, 10);
                                                            doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
                                                            doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
                                                            doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
                                                            doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });

                                                            // Employee Health

                                                        var empHealth = JSON.parse(result10.jsonData).empHealth;
                                                        doc.setFontSize(10);
                                                        doc.text('D. OVERALL WELL-BEING',10, 10 + 25);
                                                        console.log(famStatus)

                                                        if (empHealth == "VERY SATISFACTORY"){
                                                            // console.log("true")
                                                            drawCheckbox(10, 40, true, "Very satisfactory");
                                                            drawCheckbox(10, 50, false, "Satisfactory");
                                                            drawCheckbox(10, 60, false, "Fair");
                                                            drawCheckbox(10, 70, false, "Poor");
                                                            drawCheckbox(10, 80, false, "Very poor");
                                                            }
                                                        else if (empHealth == "SATISFACTORY"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 40, false, "Very satisfactory");
                                                            drawCheckbox(10, 50, true, "Satisfactory");
                                                            drawCheckbox(10, 60, false, "Fair");
                                                            drawCheckbox(10, 70, false, "Poor");
                                                            drawCheckbox(10, 80, false, "Very poor");
                                                            }
                                                        else if (empHealth == "FAIR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 40, false, "Very satisfactory");
                                                            drawCheckbox(10, 50, false, "Satisfactory");
                                                            drawCheckbox(10, 60, true, "Fair");
                                                            drawCheckbox(10, 70, false, "Poor");
                                                            drawCheckbox(10, 80, false, "Very poor");
                                                            }
                                                        else if (empHealth == "POOR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 40, false, "Very satisfactory");
                                                            drawCheckbox(10, 50, false, "Satisfactory");
                                                            drawCheckbox(10, 60, false, "Fair");
                                                            drawCheckbox(10, 70, true, "Poor");
                                                            drawCheckbox(10, 80, false, "Very poor");
                                                            }
                                                        else if (empHealth == "VERY POOR"){ 
                                                            // console.log("true")
                                                            drawCheckbox(10, 40, false, "Very satisfactory");
                                                            drawCheckbox(10, 50, false, "Satisfactory");
                                                            drawCheckbox(10, 60, false, "Fair");
                                                            drawCheckbox(10, 70, false, "Poor");
                                                            drawCheckbox(10, 80, true, "Very poor");
                                                            }
                                                        else{
                                                            console.log(false)
                                                        }
                                                            doc.setFontSize(10);
                                                            doc.text('E. FAMILY SUPPORT',70, 10 + 25);

                                                        if (famRel == "VERY SATISFACTORY"){
                                                            drawCheckbox(70, 40, true, "Very satisfactory");
                                                            drawCheckbox(70, 50, false, "Satisfactory");
                                                            drawCheckbox(70, 60, false, "Fair");
                                                            drawCheckbox(70, 70, false, "Poor");
                                                            drawCheckbox(70, 80, false, "Very poor");
                                                            }
                                                        else if (famRel == "SATISFACTORY"){ 
                                                            drawCheckbox(70, 40, false, "Very satisfactory");
                                                            drawCheckbox(70, 50, true, "Satisfactory");
                                                            drawCheckbox(70, 60, false, "Fair");
                                                            drawCheckbox(70, 70, false, "Poor");
                                                            drawCheckbox(70, 80, false, "Very poor");
                                                            }
                                                        else if (famRel == "FAIR"){ 
                                                            drawCheckbox(70, 40, false, "Very satisfactory");
                                                            drawCheckbox(70, 50, false, "Satisfactory");
                                                            drawCheckbox(70, 60, true, "Fair");
                                                            drawCheckbox(70, 70, false, "Poor");
                                                            drawCheckbox(70, 80, false, "Very poor");
                                                            }
                                                        else if (famRel == "POOR"){ 
                                                            drawCheckbox(70, 40, false, "Very satisfactory");
                                                            drawCheckbox(70, 50, false, "Satisfactory");
                                                            drawCheckbox(70, 60, false, "Fair");
                                                            drawCheckbox(70, 70, true, "Poor");
                                                            drawCheckbox(70, 80, false, "Very poor");
                                                            }
                                                        else if (famRel == "VERY POOR"){ 
                                                            drawCheckbox(70, 40, false, "Very satisfactory");
                                                            drawCheckbox(70, 50, false, "Satisfactory");
                                                            drawCheckbox(70, 60, false, "Fair");
                                                            drawCheckbox(70, 70, false, "Poor");
                                                            drawCheckbox(70, 80, true, "Very poor");
                                                            }
                                                        else{
                                                            console.log(false)
                                                            }

                                                            doc.setFontSize(10);
                                                            doc.text('F. FAMILY REPUTATION',130, 10 + 25);
                                                            var comAcc = JSON.parse(result11.jsonData).comAcceptance;

                                                        if (comAcc == "VERY SATISFACTORY"){
                                                            drawCheckbox(130, 40, true, "Very satisfactory");
                                                            drawCheckbox(130, 50, false, "Satisfactory");
                                                            drawCheckbox(130, 60, false, "Fair");
                                                            drawCheckbox(130, 70, false, "Poor");
                                                            drawCheckbox(130, 80, false, "Very poor");
                                                            }
                                                        else if (comAcc == "SATISFACTORY"){ 
                                                            drawCheckbox(130, 40, false, "Very satisfactory");
                                                            drawCheckbox(130, 50, true, "Satisfactory");
                                                            drawCheckbox(130, 60, false, "Fair");
                                                            drawCheckbox(130, 70, false, "Poor");
                                                            drawCheckbox(130, 80, false, "Very poor");
                                                            }
                                                        else if (comAcc == "FAIR"){ 
                                                            drawCheckbox(130, 40, false, "Very satisfactory");
                                                            drawCheckbox(130, 50, false, "Satisfactory");
                                                            drawCheckbox(130, 60, true, "Fair");
                                                            drawCheckbox(130, 70, false, "Poor");
                                                            drawCheckbox(130, 80, false, "Very poor");
                                                            }
                                                        else if (comAcc == "POOR"){ 
                                                            drawCheckbox(130, 40, false, "Very satisfactory");
                                                            drawCheckbox(130, 50, false, "Satisfactory");
                                                            drawCheckbox(130, 60, false, "Fair");
                                                            drawCheckbox(130, 70, true, "Poor");
                                                            drawCheckbox(130, 80, false, "Very poor");
                                                            }
                                                        else if (comAcc == "VERY POOR"){ 
                                                            drawCheckbox(130, 40, false, "Very satisfactory");
                                                            drawCheckbox(130, 50, false, "Satisfactory");
                                                            drawCheckbox(130, 60, false, "Fair");
                                                            drawCheckbox(130, 70, false, "Poor");
                                                            drawCheckbox(130, 80, true, "Very poor");
                                                            }
                                                        else{
                                                            console.log(false)
                                                            }

                                                            doc.text('III. CRIMINAL HISTORY', 80, 12 + 90, { align: 'left' });
                                                            doc.text('A. PRESENT OFFENSE', 10, 12 + 100, { align: 'left' });
                                                            doc.text('Charged With: '+JSON.parse(result3.jsonData).chargedWith, 10, 12 + 110, { align: 'left' });
                                                            doc.text('Date:'+JSON.parse(result3.jsonData).dateCharged, 130, 10 + 110);
                                                            doc.text('Convicted of: '+JSON.parse(result3.jsonData).convictedOf, 10, 12 + 120, { align: 'left' });
                                                            doc.text('Date:'+JSON.parse(result3.jsonData).dateConvicted, 130, 10 + 120);
                                                            doc.text('Sentence: ', 10, 12 + 130, { align: 'left' });
                                                            doc.text('Judge: '+JSON.parse(result3.jsonData).judge, 10, 12 + 140, { align: 'left' });
                                                            doc.text('Court:'+JSON.parse(result3.jsonData).court, 130, 10 + 140);
                                                            doc.text('Custodial Status: '+JSON.parse(result3.jsonData).custody, 10, 12 + 150, { align: 'left' });
                                                            doc.text('B. PRIOR AND PENDING RECORDS', 10, 12 + 165, { align: 'left' });

                                                            var columns = ["Agency", "Criminal Case No.", "Offense", "Date Charged","Decision"];
                                                            var dataPrior = JSON.parse(result4.jsonData).priorRecord;
                                                            var tableX = 10;
                                                            var tableY = 190;
                                                            var rowHeight = 10;
                                                            var columnWidth = 40;

                                                            doc.setFontSize(12);
                                                            doc.setFontStyle("bold");

                                                            for (var i = 0; i < columns.length; i++) {
                                                              doc.text(tableX + i * columnWidth, tableY, columns[i]);
                                                            }

                                                            for (var k = 0; k < dataPrior.length; k++) {
                                                                var rowData = [
                                                                [dataPrior[k].agency, dataPrior[k].cc_no, dataPrior[k].offense, dataPrior[k].when, dataPrior[k].disposition]
                                                                ]
                                                                
                                                                for (var j = 0; j < rowData.length; j++) {
                                                                    var row = rowData[j];
                                                                        for (var l = 0; l < row.length; l++) {
                                                                            var xPos = tableX + l * columnWidth;
                                                                            var yPos = tableY + (k * rowData.length + j + 1) * rowHeight;
                                                                            doc.text(xPos, yPos, row[l]);
                                                                        }
                                                                }
                                                                
                                                            }

                                                            doc.addPage();
                                                            doc.setFontSize(13)
                                                            doc.setFont('times', 'normal');
                                                            doc.text('PPA FORM 3/p. 1', 10, 10);
                                                            doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
                                                            doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
                                                            doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
                                                            doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });
                                                            doc.text('IV Analysis and Evaluation', 80, 12 + lineHeight*3, { align: 'left' });


                                                            var maxWidth = 180; // Maximum width per line in pixels
                                                            var analysisLineHeight = 5; // Height of each line in pixels
                                                            var analysisMargin = 5; // Margin for the content
                                                            var text = JSON.parse(result12.jsonData).analysisAndEvaluation;

                                                            var lines = doc.splitTextToSize(text, maxWidth);

                                                            var x = 10; // Starting x-coordinate
                                                            var y = 45; // Starting y-coordinate

                                                            for (var i = 0; i < lines.length; i++) {
                                                              if (y + analysisLineHeight + analysisMargin > doc.internal.pageSize.height) {
                                                                doc.addPage();
                                                                y = 10;
                                                              }

                                                              doc.setFontSize(12);
                                                              doc.text(lines[i], x, y);
                                                              y += analysisLineHeight;
                                                            }

                                                            y += analysisMargin;

                                                            doc.text('V. PROJECTED THRUSTS OF REHABILITATION', 60, y, { align: 'left' });

                                                            var secondParagraph = JSON.parse(result12.jsonData).projectedThrust;
                                                            y += analysisLineHeight + analysisMargin; // Increase the y-coordinate for the new paragraph

                                                            var secondLines = doc.splitTextToSize(secondParagraph, maxWidth);

                                                            for (var j = 0; j < secondLines.length; j++) {
                                                              if (y + analysisLineHeight + analysisMargin > doc.internal.pageSize.height) {
                                                                doc.addPage();
                                                                y = 10;
                                                              }

                                                              doc.setFontSize(12);
                                                              doc.text(secondLines[j], x, y);
                                                              y += analysisLineHeight;
                                                            }

                                                            doc.addPage();
                                                            doc.setFontSize(13)
                                                            doc.text('PPA FORM 3/p. 1', 10, 10);
                                                            doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
                                                            doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
                                                            doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
                                                            doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });
                                                            doc.text('VI RECOMMENDATION', 80, 12 + lineHeight*3, { align: 'left' });

                                                            var rec = JSON.parse(result13.jsonData);

                                                            var recommendation =  [JSON.parse(result13.jsonData).recommendations];

                                                            var textRec = "WHEREFORE, in view of the foregoing, it is respectfully recommended to this Honorable Court that the petition for probation of "+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName+' be '+JSON.parse(result13.jsonData).grant+',  subject to the following conditions:';

                                                            var maxWidth = 190; // Maximum width per line in pixels
                                                            var linesRec = doc.splitTextToSize(textRec, maxWidth);

                                                            var xRec = 20;
                                                            var yRec = 45;

                                                            for (var i = 0; i < linesRec.length; i++) {
                                                                doc.setFontSize(11)
                                                              doc.text(linesRec[i], xRec, yRec);
                                                              yRec += 10;
                                                            }

                                                            var curYRec = yRec;
                                                            var lineHeight = 5;
                                                            var margin = 5;

                                                            for (var j = 0; j < recommendation.length; j++) {
                                                              var row = recommendation[j];
                                                              for (var k = 0; k < row.length; k++) {
                                                                var value = row[k];
                                                                var num = k + 1;
                                                                if (typeof value === "object") {
                                                                  value = Object.values(value).join(", ");
                                                                } else {
                                                                  value = value.toString();
                                                                }
                                                                
                                                                var textSample = num + '. ' + value;
                                                                var linesRecList = doc.splitTextToSize(textSample, maxWidth);

                                                                if (curYRec + (linesRecList.length * lineHeight) + margin > doc.internal.pageSize.height) {
                                                                  doc.addPage();
                                                                  curYRec = margin;
                                                                }

                                                                        doc.text(10, curYRec, linesRecList);
                                                                        curYRec += linesRecList.length * lineHeight;
                                                                        
                                                              }
                                                              doc.text('Prepared and submitted by: ', 130,curYRec, { align: 'right' });
                                                            }

                                                            doc.save('Simplified PSIR.pdf');
                                    }

                        }); // result 2 end
                                }); // result 3 end
                                    }); // result 4 end
                                        }); // result 5 end
                                            }); // result 6 end
                                                }); // result 7 end        
                                                    }); // result 8 end        
                                                        }); // result 9 end
                                                            }); // result 10 end
                                                                }); // result 11 end
                                                                    }); // result 12 end   
                                                                        }); // result 13 end           
                });
            });       
        }

        function drawTable(type,officeId) {
            $(document).ready(function(){
                $('.table_head').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "scrollX": true,
                    "lengthChange": false,
                    "searching": false,
                    "columnDefs": [
                        { "width": "15px", "targets": [0] },
                        { "width": "100px", "targets": [2] },
                        { "width": "150px", "targets": [3] },
                        { "width": "200px", "targets": [1,4] },
                        { "width": "600px", "targets": [5] }
                    ],
                    ajax: {
                        url: api+'8000/petitioner',
                        cache: true,
                        data: function (d) {
                            return {
                                page: d.start / d.length,
                                size: d.length,
                                type: type,
                                officeId: officeId,
                            };
                        },
                        dataFilter: function(data){
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.totalElements;
                            json.recordsFiltered = json.totalElements;
                            json.data = json.content;
                            return JSON.stringify(json);
                        }
                    },
                    "columns": tableColumns()
                })
                $('.table_head').on('draw.dt', function() {
                    buttonFunctionality();
                });
            })
        }

        function tableColumns() {
            return [
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        if (data.id == null){
                            return "No id";
                        } else {
                            return data.id;
                        }
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row, meta) {
                        let name = data.firstName + " " + data.middleName + " " + data.lastName+ " "+data.suffixName;
                        return name;
                    }
                },
                {
                    "data": 'sex'
                },
                {
                    "data": 'clientType',
                },
                {
                    "data": 'fieldOfficeName'
                },
                {
                    "data": null,
                    render: function(data, type, row) {
                        return "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"' data-type='"+data.clientType+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"' data-type='"+data.clientType+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet worksheet perm_worksheet' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir psir perm_psir' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> PSIR</button> <button class='btn btn-sm btn-success btn_pdfPSIR pdf_psir perm_pdfPSIR' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-download'></i> Generate PSIR</button>"
                    }
                }
            ]
        } 

        var tableProbation = document.getElementById('client_pb')

        if (tableProbation.classList.contains("active")) {
            $('.table_head').DataTable().destroy();
            $('#tableTitle').text("Probationers")
            var clientType = "PROBATIONER";

            drawTable(clientType,officeId)
        }

        tableProbation.addEventListener('click', function() {
            $('.table_head').DataTable().destroy();
            $('#tableTitle').text("Probationers")
            var clientType = "PROBATIONER";

            drawTable(clientType,officeId)
        });

        var tableParolee = document.getElementById('client_pr')

        tableParolee.addEventListener('click', function() {
            $('.table_head').DataTable().destroy();
            $('#tableTitle').text("Parolee")
            var clientType = "PAROLEE";
            drawTable(clientType,officeId)
        });

        var tablePardonee = document.getElementById('client_pd')

        tablePardonee.addEventListener('click', function() {
            $('.table_head').DataTable().destroy();
            $('#tableTitle').text("Pardonee")
            var clientType = "PARDONEE";
            drawTable(clientType,officeId)
        });

    } )( jQuery );