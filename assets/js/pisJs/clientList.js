( function ( $ ) {

    function resolveApiBase() {
        var raw = localStorage.getItem('api');
        if (raw != null && String(raw).trim() !== '') {
            return String(raw).trim();
        }
        if (typeof window.__PIS_API_BASE === 'string' && String(window.__PIS_API_BASE).trim() !== '') {
            return String(window.__PIS_API_BASE).trim();
        }
        return '';
    }

    function joinApiUrl(base, path) {
        var b = String(base == null ? '' : base).replace(/\/+$/, '');
        var p = String(path == null ? '' : path).replace(/^\/+/, '');
        if (!b) {
            return p;
        }
        if (!p) {
            return b;
        }
        if (b.slice(-1) === ':' && /^\d+\//.test(p)) {
            return b + p;
        }
        return b + '/' + p;
    }

    function escAttr(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }

    var api = resolveApiBase();
    var ___ctx = api;

    var __setContext = function(newctx) {
        ___ctx = newctx;
        api = newctx;
    };

    var __getContext = function() {
        return ___ctx;
    };

    function showClientListPageError(msg) {
        $('#client_list_page_error').text(msg).show();
    }

    function hideClientListPageError() {
        $('#client_list_page_error').hide().empty();
    }

    var PROBATION_CLIENT_TYPE = 'PROBATIONER';
    var TABLE_SEL = '#tblProbationClientList';
    var probationClientListDataTable = null;

    function setProbFsClientListLoader(visible) {
        var $el = $('#probFsClientListLoader');
        if (!$el.length) {
            return;
        }
        if (visible) {
            $el.removeClass('is-hidden').attr('aria-busy', 'true');
        } else {
            $el.addClass('is-hidden').attr('aria-busy', 'false');
        }
    }

    function safeDataTablesCallback(callback, payload) {
        try {
            callback(payload);
        } catch (e) {
            /* DataTables can throw on malformed rows */
        }
    }

    function searchTermForAjax() {
        return ($('.prob-fs-client-search-input').val() || '').trim();
    }

    function updateSearchClearState() {
        var hasTerm = !!searchTermForAjax();
        $('.prob-fs-client-search-wrap').toggleClass('has-value', hasTerm);
    }

    function formatListErrorMessage(m, fallback) {
        if (m != null && typeof m === 'string' && m.trim() !== '') {
            return m.trim();
        }
        return fallback;
    }

    var __executeExternalGet = function(path, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: "GET",
            url: path,
            dataType: "json",
            cache: false
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            var msg = typeof errorThrown === 'string' && errorThrown
                ? errorThrown
                : (textStatus || 'Network error');
            d.resolve({
                status : 'ERROR',
                message : msg
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };
    var __executeExternalPost = function(path, jsonObj, customLoader) {
        path = joinApiUrl(__getContext(), path);
        var d = $.Deferred();
        if(customLoader != ""){
            $("#"+customLoader).show();
            $("#"+customLoader).removeClass("hide");
        }
        $.ajax({
            method: 'POST',
            url: path,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        }).done(function (data, textStatus, jqXHR) {
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
            d.resolve(data)
        }).fail(function (jqXHR, textStatus, errorThrown,request) {
            var msg = typeof errorThrown === 'string' && errorThrown
                ? errorThrown
                : (textStatus || 'Network error');
            d.resolve({
                status : 'ERROR',
                message : msg
            });
            
            if(customLoader != ""){
                $("#"+customLoader).hide();
                $("#"+customLoader).addClass("hide");
            }
        });
        
        return d.promise();
    };

    var officeId = $.cookie("field_office_id") || '';
    let petitionerData;
    let clientType;
    function buttonFunctionality () {
        $(".btn_worksheet").unbind("click").on("click", function(){
            var client_id   = $(this).data("id");
            var foid        = $(this).data("foid");
            // window.location.href = 'http://ppis.probation.gov.ph/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
            window.location.href = api+'/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
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
            window.location.href = api+'/pis/client_view_upload?client_id='+client_id+'&client_type='+client_type;
        })
        $(".btn_psir").unbind("click").on("click", function(){
            var client_id   = $(this).data("id");
            var foid        = $(this).data("foid");
            window.location.href = api+'/pis/psir_identifying_data?client_id='+client_id+'&field_office_id='+foid;
        })
        $(".btn_pdfPSIR").unbind("click").on("click", function(){
            var client_id   = $(this).data("id");
            var foid        = $(this).data("foid");

            function calculateAge(birthdate) {
                const currentDate = new Date();
                const birthDate = new Date(birthdate);

                let age = currentDate.getFullYear() - birthDate.getFullYear();

                // Check if the birthday has occurred this year
                const hasBirthdayOccurred = (
                    currentDate.getMonth() > birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
                );

                // If the birthday hasn't occurred yet this year, subtract 1 from the age
                if (!hasBirthdayOccurred) {
                    age--;
                }

                return age;
            }

            async function fetchData(url) {
                try {
                    const response = await __executeExternalGet(url);
                    if (response && response.status === 'ERROR') {
                        throw new Error(response.message || 'Request failed');
                    }
                    if (response && Object.prototype.hasOwnProperty.call(response, 'response')) {
                        return response.response;
                    }
                    return response;
                } catch (error) {
                    console.error('Error fetching data from ' + url, error);
                    throw error;
                }
            }

            async function getData(client_id, endpoint) {
                const url = `8000/worksheet/getPetitioner/${endpoint}/${client_id}`;
                return await fetchData(url);
            }

            async function getDataPetitioner(client_id) {
                const url = `8000/petitioner/${client_id}`;
                return await fetchData(url);
            }

            async function fetchAllData(client_id) {
                try {
                    const result2 = await getData(client_id, 'psirIdentifyingData');
                    const result3 = await getData(client_id, 'psirPresentOffense');
                    const result4 = await getData(client_id, 'psirPriorRecords');
                    const result5 = await getData(client_id, 'psirFamilyBackground');
                    const result6 = await getData(client_id, 'psirSocioEconomic');
                    const result7 = await getData(client_id, 'psirResidenceEconomic');
                    const result8 = await getData(client_id, 'psirSpouseChildren');
                    const result9 = await getData(client_id, 'psirEducationHistory');
                    const result10 = await getData(client_id, 'psirEmploymentHistory');
                    const result11 = await getData(client_id, 'psirEnvironmentalFactor');
                    const result12 = await getData(client_id, 'psirEvaluation');
                    const result13 = await getData(client_id, 'psirRecommendation');
                    const resultPetitioner = await getDataPetitioner(client_id);

                    // Process results as needed
                    var result = resultPetitioner;

                    // Create a new jsPDF instance
                    var doc = new jsPDF();

                    // Set border and separation in the middle
                    var pageWidth = doc.internal.pageSize.width;
                    var pageHeight = doc.internal.pageSize.height;

                    const borderThickness = 0.5;
                    const borderColor = "#000000";

                    // Set the position and size of the rectangle
                    const x = 10;
                    const y = 10;
                    const width = 190;
                    const height = 277;
                    const halfWidth = width / 2;
                    const separation = halfWidth-20;
                    // for checkbox 
                    var newSeperation = 60;
                    var checkboxSize = 5;
                    var checkboxTextMargin = 4;
                    var checkboxFontSize = 12;
                    let yCoordinateLeft = 16;
                    let yCoordinateRight = 16;
                    let yCoordinate = 16;
                    // for prior records table
                    var headers = ["Agency", "Criminal Case No.", "Offense", "Date Charged","Decision"];
                    var dataPrior = JSON.parse(result4.jsonData).priorRecord;
                    var totalWidth = 37;
                    var columnCount = headers.length;
                    var colWidth = 190 / columnCount;
                    var cellPadding = 13;
                    var statusSatisfaction = ["VERY SATISFACTORY","SATISFACTORY","FAIR","POOR","VERY POOR"]


                    function pageOrientation () {
                        // Draw a rectangle with border
                        doc.setDrawColor(borderColor);
                        doc.setLineWidth(borderThickness);
                        doc.rect(x, y, width, height);

                        doc.setFont('times', 'normal');
                        doc.setFontSize(12);
                    }
                    pageOrientation();

                    const splitText = (text, xCoordinate, yCoord) => {
                        const textArray = doc.splitTextToSize(text, separation);
                        if (textArray.length > 0) {
                            for (let i = 0; i < textArray.length; i++){
                                doc.text(textArray[i], xCoordinate, yCoord);
                                yCoord += 6;
                            }
                        } else {
                            doc.text(textArray.slice(0).join('\n'), xCoordinate, yCoord);
                            yCoord += 6;
                        }
                        return yCoord;
                    };

                    const longSplitText = (text, xCoordinate, yCoord) => {
                        const textArray = doc.splitTextToSize(text, width);
                        if (textArray.length > 0) {
                            for (let i = 0; i < textArray.length; i++){
                                doc.text(textArray[i], xCoordinate, yCoord);
                                yCoord += 6;
                            }
                        } else {
                            doc.text(textArray.slice(0).join('\n'), xCoordinate, yCoord);
                            yCoord += 6;
                        }
                        return yCoord;
                    };

                    const drawTextLeft = (text, xCoordinate, yCoord) => {
                        yCoordinateLeft = splitText(text, xCoordinate, yCoord);

                    };
                    const drawTextRight = (text, xCoordinate, yCoord) => {
                        yCoordinateRight = splitText(text, xCoordinate, yCoord);

                    };
                    const drawTextFree = (text, xCoordinate, yCoord) => {
                        yCoordinate = longSplitText(text, xCoordinate, yCoord);
                    };
                    const drawCheckBox = (text,xBoxCoordinate,yBoxCoordinate,checked) => {
                        doc.text(text, xBoxCoordinate + checkboxSize + checkboxTextMargin, yBoxCoordinate + checkboxSize / 2 + checkboxFontSize / 6);
                        doc.rect(xBoxCoordinate,yBoxCoordinate,checkboxSize,checkboxSize)
                        if (checked) {
                            var checkmarkSize = checkboxSize;
                            var checkmarkX = xBoxCoordinate;
                            var checkmarkY = yBoxCoordinate;
                            doc.rect(checkmarkX, checkmarkY, checkmarkSize, checkmarkSize, "F");
                        }
                        yBoxCoordinate+=6;
                        return yBoxCoordinate;
                    }


                    function header () {
                        drawTextLeft('PPA FORM 3/p. 1', 13, yCoordinateLeft);
                        drawTextLeft('PSIR Re: ' + result.firstName + ' ' + result.middleName + ' ' + result.lastName + ' ' + result.suffixName, 13, yCoordinateLeft);
                        drawTextLeft('Criminal Case Number: ' + result.criminalCaseNo, 13, yCoordinateLeft);
                        drawTextRight('PPA-FO-FR-003 ', 127, yCoordinateRight)
                        drawTextRight('Investigation Docket No.: '+result.criminalCaseNo, 127, yCoordinateRight)
                        drawTextLeft('',13,yCoordinateLeft)
                    }

                    // Part 1 Page 1 PSIR

                    header();
                    yCoordinate = yCoordinateLeft + 0;
                    drawTextFree('Republic of The Philippines',80,yCoordinate)
                    drawTextFree('Department of Justice',85,yCoordinate)
                    drawTextFree('PAROLE AND PROBATION ADMINISTRATION',60,yCoordinate)
                    drawTextFree('REGIONAL OFFICE NO.',83,yCoordinate)
                    drawTextFree('Parole and Probation Office',80,yCoordinate)
                    drawTextFree('POST-SENTENCE INVESTIGATION REPORT',63,yCoordinate)
                    drawTextFree('',80,yCoordinate)
                    drawTextFree('I. BASIC INFORMATION',80,yCoordinate)
                    drawTextFree('',80,yCoordinate)
                    yCoordinateLeft = (yCoordinate - yCoordinateLeft)+yCoordinateLeft;
                    yCoordinateRight = (yCoordinate - yCoordinateRight)+yCoordinateRight;
                    drawTextLeft("PETIONER's NAME: "+JSON.parse(result2.jsonData).name,13,yCoordinateLeft)
                    drawTextLeft('True Name: '+JSON.parse(result2.jsonData).trueName,13,yCoordinateLeft)
                    drawTextLeft('Gender: '+result.sex,13,yCoordinateLeft);
                    drawTextLeft('Birthday: '+JSON.parse(result5.jsonData).bday,13,yCoordinateLeft);
                    drawTextLeft('Nationality: '+JSON.parse(result5.jsonData).citizenship,13,yCoordinateLeft);
                    drawTextLeft('Educational Attainment: '+JSON.parse(result9.jsonData).elemHigh+','+JSON.parse(result9.jsonData).secHigh+','+JSON.parse(result9.jsonData).collegeHigh+','+JSON.parse(result9.jsonData).pcollegeHigh+','+JSON.parse(result9.jsonData).vocHigh,13,yCoordinateLeft)
                    // drawTextLeft('Birth Order: '+result.sex,13,yCoordinateLeft)
                    drawTextLeft('Birth Order: '+result.sex,13,yCoordinateLeft)
                    drawTextLeft("Father's Name: "+JSON.parse(result5.jsonData).fatherName,13,yCoordinateLeft)
                    drawTextLeft('Spouse: '+JSON.parse(result8.jsonData).spouseLname+','+JSON.parse(result8.jsonData).spouseFname+' '+JSON.parse(result8.jsonData).spouseMname+','+JSON.parse(result8.jsonData).spouseEname,13,yCoordinateLeft)
                    drawTextLeft('Identifying Marks/Unusual Features:'+JSON.parse(result5.jsonData).identifyingMarks,13,yCoordinateLeft)
                    yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate;
                    drawTextFree('Present Address:'+JSON.parse(result2.jsonData).presentAddress,13,yCoordinate)
                    drawTextFree('Permanent Address:'+JSON.parse(result2.jsonData).permanentAdress,13,yCoordinate)
                    // yCoordinateRight = yCoordinate + 0;
                    drawTextRight('Alias: '+JSON.parse(result2.jsonData).alias,127,yCoordinateRight)
                    const birthdate = JSON.parse(result5.jsonData).bday;
                    const age = calculateAge(birthdate);
                    drawTextRight('Age: '+age,127,yCoordinateRight)
                    drawTextRight('Birthplace: '+JSON.parse(result5.jsonData).bprovince+' '+JSON.parse(result5.jsonData).bcity+' '+JSON.parse(result5.jsonData).bplace,127,yCoordinateRight)
                    drawTextRight('Religion: '+JSON.parse(result5.jsonData).religion,127,yCoordinateRight)
                    drawTextRight('Civil Status: '+JSON.parse(result5.jsonData).civilStatus,127,yCoordinateRight)
                    drawTextRight('Occupation: '+JSON.parse(result5.jsonData).job_held,127,yCoordinateRight)
                    drawTextRight("Mother's Name: "+JSON.parse(result5.jsonData).motherName,127,yCoordinateRight)
                    drawTextRight('Occupation: '+JSON.parse(result8.jsonData).spouse_occupation,127,yCoordinateRight)
                    yCoordinateLeft = (yCoordinate - yCoordinateLeft)+yCoordinateLeft;
                    yCoordinateRight = (yCoordinate - yCoordinateRight)+yCoordinateRight;

                    if (yCoordinate == yCoordinateLeft && yCoordinate == yCoordinateRight){
                        if (yCoordinate >= 220) {
                            doc.addPage('a4', 'portrait')
                            pageOrientation();
                            yCoordinateLeft = 16;
                            yCoordinateRight = 16;
                            yCoordinate = 16;
                            header();
                            chapterIIpart1_PSIR();
                        } else {
                            chapterIIpart1_PSIR();
                        }
                    }

                    function chapterIIpart1_PSIR() {

                        yCoordinate = ((yCoordinateLeft - yCoordinate) + yCoordinate)+6;
                        drawTextFree('II. PERSONAL AND SOCIAL HISTORY',70,yCoordinate);
                        drawTextFree('',70,yCoordinate);

                        yCoordinateLeft = (yCoordinate - yCoordinateLeft)+yCoordinateLeft;
                        yCoordinateRight = (yCoordinate - yCoordinateRight)+yCoordinateRight;

                        const sssText = doc.splitTextToSize('A. SUBJECTIVE SOCIO-ECONOMIC STATUS:', newSeperation);
                        drawTextLeft(sssText,13,yCoordinateLeft)

                        var ecoStatus = ["POOR","LOW INCOME","LOWER MIDDLE INCOME","MIDDLE CLASS","UPPER INCOME","RICH"]
                        var ecoStatusResult = JSON.parse(result6.jsonData).eco_status;

                        for (var i=0; i<ecoStatus.length; i++){
                            if (ecoStatus[i] == ecoStatusResult){
                                yCoordinateLeft = drawCheckBox(ecoStatus[i],13,yCoordinateLeft,true)
                            } else {
                                yCoordinateLeft = drawCheckBox(ecoStatus[i],13,yCoordinateLeft,false)
                            }
                        }

                        const frText = doc.splitTextToSize('B. FAMILY RELATIONSHIP', newSeperation);
                        drawTextFree(frText,80,yCoordinate)
                        var famRel = JSON.parse(result6.jsonData).family_rel;
                        yCoordinate+=6;

                        for (var i=0; i<statusSatisfaction.length; i++){
                            if (statusSatisfaction[i] == famRel){
                                yCoordinate = drawCheckBox(statusSatisfaction[i],80,yCoordinate,true)
                            } else {
                                yCoordinate = drawCheckBox(statusSatisfaction[i],80,yCoordinate,false)
                            }
                        }

                        const famRepText = doc.splitTextToSize('C. FAMILY REPUTATION', newSeperation);
                        drawTextRight(famRepText,145,yCoordinateRight)
                        var famStatus = JSON.parse(result6.jsonData).family_rep;
                        yCoordinateRight+=6;

                        for (var i=0; i<statusSatisfaction.length; i++){
                            if (statusSatisfaction[i] == famStatus){
                                yCoordinateRight = drawCheckBox(statusSatisfaction[i],145,yCoordinateRight,true)
                            } else {
                                yCoordinateRight = drawCheckBox(statusSatisfaction[i],145,yCoordinateRight,false)
                            }
                        }

                        yCoordinate = ((yCoordinateLeft - yCoordinate)+yCoordinate)+6;
                        yCoordinateRight = ((yCoordinateLeft - yCoordinate)+yCoordinate)+6;
                        yCoordinateLeft = yCoordinateLeft+6;

                        if (yCoordinate == yCoordinateLeft && yCoordinateRight == yCoordinateLeft){
                            if (yCoordinateLeft >= 250){
                                doc.addPage('a4','portrait');
                                pageOrientation();

                                yCoordinateLeft = 16;
                                yCoordinateRight = 16;
                                yCoordinate = 16;

                                header();
                                chapterIIpart2_PSIR ();
                            } else {
                                chapterIIpart2_PSIR ();
                            }
                        } else {
                                // Guard: mismatched coordinates; do not advance sections (legacy behavior)
                        }
                        
                    }

                    function chapterIIpart2_PSIR () {

                        yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate;                            
                        yCoordinateRight = (yCoordinateLeft - yCoordinateRight)+yCoordinateRight;
                        const owbText = doc.splitTextToSize('D. OVERALL WELL-BEING', newSeperation);
                        drawTextLeft(owbText,13,yCoordinateLeft)
                        var empHealth = JSON.parse(result10.jsonData).empHealth;

                        for (var i=0; i<statusSatisfaction.length; i++){
                            if (statusSatisfaction[i] == empHealth){
                                yCoordinateLeft = drawCheckBox(statusSatisfaction[i],13,yCoordinateLeft,true)
                            } else {
                                yCoordinateLeft = drawCheckBox(statusSatisfaction[i],13,yCoordinateLeft,false)
                            }
                        }

                        const fsText = doc.splitTextToSize('E. FAMILY SUPPORT', newSeperation);
                        drawTextFree(fsText,80,yCoordinate)
                        var famSupp = JSON.parse(result6.jsonData).family_rel

                        for (var i=0; i<statusSatisfaction.length; i++){
                            if (statusSatisfaction[i] == famSupp){
                                yCoordinate = drawCheckBox(statusSatisfaction[i],80,yCoordinate,true)
                            } else {
                                yCoordinate = drawCheckBox(statusSatisfaction[i],80,yCoordinate,false)
                            }
                        }

                        const csText = doc.splitTextToSize('F. COMMUNITY SUPPORT', newSeperation);
                        drawTextRight(csText,145,yCoordinateRight)
                        var comAcc = JSON.parse(result11.jsonData).comAcceptance;

                        for (var i=0; i<statusSatisfaction.length; i++){
                            if (statusSatisfaction[i] == comAcc){
                                yCoordinateRight = drawCheckBox(statusSatisfaction[i],145,yCoordinateRight,true)
                            } else {
                                yCoordinateRight = drawCheckBox(statusSatisfaction[i],145,yCoordinateRight,false)
                            }
                        }

                        yCoordinate = yCoordinate + 12;
                        yCoordinateLeft = yCoordinateLeft + 12;
                        yCoordinateRight = yCoordinateRight + 12;

                        drawTextFree('III. CRIMINAL HISTORY',80,yCoordinate);
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('A. PRESENT OFFENSE',13,yCoordinateLeft);
                        drawTextLeft('Charged With: '+JSON.parse(result3.jsonData).chargedWith,13,yCoordinateLeft)
                        drawTextLeft('Convicted of: '+JSON.parse(result3.jsonData).convictedOf,13,yCoordinateLeft)
                        drawTextLeft('Sentence: ',13,yCoordinateLeft)
                        drawTextLeft('Judge: '+JSON.parse(result3.jsonData).judge,13,yCoordinateLeft)
                        drawTextLeft('Custodial Status: '+JSON.parse(result3.jsonData).custody,13,yCoordinateLeft)
                        drawTextRight('',127,yCoordinateRight)
                        drawTextRight('',127,yCoordinateRight)
                        drawTextRight('Date:'+JSON.parse(result3.jsonData).dateCharged,127,yCoordinateRight)
                        drawTextRight('Date:'+JSON.parse(result3.jsonData).dateConvicted,127,yCoordinateRight)
                        drawTextRight('Court:'+JSON.parse(result3.jsonData).court,127,yCoordinateRight)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('B. PRIOR AND PENDING RECORDS',13,yCoordinateLeft);

                        yCoordinate = (yCoordinateLeft-yCoordinate)+yCoordinate;
                        yCoordinateRight = (yCoordinateLeft-yCoordinateRight)+yCoordinateRight;

                        for (var j = 0; j < headers.length; j++) {

                            var headerValue = headers[j];
                            var currentX = cellPadding + j * (colWidth);
                            var lines = doc.splitTextToSize(headerValue, totalWidth);

                            for (var k = 0; k < lines.length; k++) {
                                doc.text(currentX, yCoordinateLeft + k * 10, lines[k]);
                            }
                        }
                        for (var i = 0; i < dataPrior.length; i++) {
                            var row = [dataPrior[i].agency, dataPrior[i].cc_no, dataPrior[i].offense, dataPrior[i].when, dataPrior[i].disposition];
                            yCoordinateLeft += 6

                            for (var j = 0; j < row.length; j++) {
                                var cellValue = row[j];
                                var currentX = cellPadding + j * (colWidth);

                                var lines = doc.splitTextToSize(cellValue, totalWidth);
                                if (lines.length >= 2) {
                                    if (yCoordinateLeft >= 272){
                                        doc.addPage('a4','portrait')
                                        pageOrientation();
                                        yCoordinateLeft = 16;
                                        yCoordinateRight = 16;
                                        yCoordinate = 16;
                                        header();
                                        doc.text(currentX, yCoordinateLeft, lines.slice(0).join('\n'));
                                        yCoordinateLeft+=6;
                                    } else {
                                        doc.text(currentX, yCoordinateLeft, lines.slice(0).join('\n'));
                                        yCoordinateLeft+=6;
                                    }
                                } else if (lines.length == 1){
                                    if (yCoordinateLeft >= 272){
                                        doc.addPage('a4','portrait')
                                        pageOrientation();
                                        yCoordinateLeft = 16;
                                        yCoordinateRight = 16;
                                        yCoordinate = 16;
                                        header();
                                        doc.text(lines, currentX, yCoordinateLeft);
                                    } else {
                                        doc.text(lines, currentX, yCoordinateLeft);
                                    }
                                } else {
                                    // Empty cell; skip
                                }
                            }
                        }
                    }

                    function chapterIV_psir() {
                        drawTextLeft('',13,yCoordinateLeft)
                        yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate;
                        yCoordinateRight = (yCoordinateLeft - yCoordinateRight)+yCoordinateRight;
                        drawTextFree('IV Analysis and Evaluation', 80, yCoordinate);
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextRight('',127,yCoordinateRight)

                        var analysisText = JSON.parse(result12.jsonData).analysisAndEvaluation;
                        var linesAnalysisText = doc.splitTextToSize(analysisText, 185);

                        for (var i = 0; i < linesAnalysisText.length; i++){
                            if (yCoordinateLeft >= 272){
                                doc.addPage('a4','portrait')
                                pageOrientation();
                                yCoordinateLeft = 16;
                                yCoordinateRight = 16;
                                yCoordinate = 16;
                                header();
                                doc.text(linesAnalysisText[i],13,yCoordinateLeft)
                                yCoordinateLeft+=6;
                            } else {
                                doc.text(linesAnalysisText[i],13,yCoordinateLeft)
                                yCoordinateLeft+=6;
                            }
                        }

                    }

                    function chapterV_psir() {
                        drawTextLeft('',13,yCoordinateLeft)
                        yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate;
                        yCoordinateRight = (yCoordinateLeft - yCoordinateRight)+yCoordinateRight;
                        drawTextFree('V. PROJECTED THRUSTS OF REHABILITATION', 60, yCoordinate);
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextRight('',127,yCoordinateRight)

                        var trustText = JSON.parse(result12.jsonData).projectedThrust;
                        var linesTrustText = doc.splitTextToSize(trustText,185)

                        for (var i = 0; i < linesTrustText.length; i++){
                            if (yCoordinateLeft >= 272){
                                doc.addPage('a4','portrait')
                                pageOrientation();
                                yCoordinateLeft = 16;
                                yCoordinateRight = 16;
                                yCoordinate = 16;
                                header();
                                doc.text(linesTrustText[i],13,yCoordinateLeft)
                                yCoordinateLeft+=6;
                            } else {
                                doc.text(linesTrustText[i],13,yCoordinateLeft)
                                yCoordinateLeft+=6;
                            }
                        }
                    }

                    function chapterVI_psir() {
                        drawTextLeft('',13,yCoordinateLeft)
                        yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate;
                        yCoordinateRight = (yCoordinateLeft - yCoordinateRight)+yCoordinateRight;
                        drawTextFree('VI RECOMMENDATION', 80, yCoordinate);
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextRight('',127,yCoordinateRight)
                        drawTextFree('',13,yCoordinate);
                        var text = "WHEREFORE, in view of the foregoing, it is respectfully recommended to this Honorable Court that the petition for probation of "+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName+' be '+JSON.parse(result13.jsonData).grant+',  subject to the following conditions:';
                        // var textLines = doc.splitTextToSize(text,185)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextLeft('',13,yCoordinateLeft)
                        drawTextFree(text,13,yCoordinate);
                        var recommendation =  JSON.parse(result13.jsonData).recommendations;
                        for (var i = 0; i < recommendation.length; i++){
                            var row = [recommendation[i].recs];
                            
                            for (var k = 0; k < row.length; k++){
                                var rowValue = row[k];
                                var recLinesText = doc.splitTextToSize(rowValue,180)
                                    for (var j = 0; j < recLinesText.length; j++){
                                        if (yCoordinateLeft >= 272){
                                            doc.addPage('a4','portrait')
                                            pageOrientation();
                                            yCoordinateLeft = 16;
                                            yCoordinateRight = 16;
                                            yCoordinate = 16;
                                            header();
                                            doc.text(recLinesText[j],13,yCoordinateLeft)
                                            yCoordinateLeft+=6;
                                        } else {
                                            doc.text(recLinesText[j],13,yCoordinateLeft)
                                            yCoordinateLeft+=6;
                                        }
                                    }
                                }
                            }
                            // var recLinesText = doc.splitTextToSize(contentRecommendation,180)
                    }

                    function footer(){
                        var currentDate = new Date();
                        var currentYear = currentDate.getFullYear();
                        var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
                        var currentDay = currentDate.getDate();
                        var formattedDate = currentYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth + '-' + (currentDay < 10 ? '0' : '') + currentDay;

                        yCoordinate = (yCoordinateLeft - yCoordinate)+yCoordinate
                        yCoordinateRight = (yCoordinateLeft - yCoordinateRight)+yCoordinateRight;
                        drawTextRight('Prepared and submitted by: ',127,yCoordinateRight)
                        drawTextRight(resultPetitioner.createdByName,127,yCoordinateRight)
                        drawTextRight('Investigating Officer',127,yCoordinateRight)
                        drawTextRight('Date: '+formattedDate,127,yCoordinateRight)
                    }

                    chapterIV_psir();
                    chapterV_psir();
                    chapterVI_psir();
                    footer();

                    // drawTextLeft('',yCoordinateLeft)
                    // drawTextLeft()

                    //Save the PDF
                    doc.save('Simplified PSIR.pdf'); 
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchAllData(client_id);
        });       
    }

    function getProbationClientListTable() {
        return $(TABLE_SEL);
    }

    function destroyProbationClientListTable() {
        var $tbl = getProbationClientListTable();
        if ($tbl.length && $.fn.DataTable && $.fn.DataTable.isDataTable($tbl[0])) {
            $tbl.DataTable().destroy();
        }
        $tbl.find('tbody.table_body').empty();
    }

    function probationClientListAjax(data, callback /* , settings */) {
        setProbFsClientListLoader(true);
        hideClientListPageError();

        var page = data.start / data.length;
        var size = data.length;
        var fieldOfficeId = $.cookie('field_office_id');
        var term = searchTermForAjax();

        function finishFail(message) {
            showClientListPageError(message);
            safeDataTablesCallback(callback, {
                draw: data.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            });
        }

        function onAjaxComplete() {
            setProbFsClientListLoader(false);
        }

        if (fieldOfficeId == null || String(fieldOfficeId).trim() === '') {
            finishFail('Your field office could not be determined. Please sign in again.');
            onAjaxComplete();
            return;
        }

        if (!term) {
            $.ajax({
                url: joinApiUrl(__getContext(), '8000/petitioner'),
                type: 'GET',
                dataType: 'json',
                cache: false,
                data: {
                    page: page,
                    size: size,
                    type: PROBATION_CLIENT_TYPE,
                    officeId: fieldOfficeId
                }
            })
                .done(function (json) {
                    if (!json || typeof json !== 'object') {
                        finishFail('Unable to load the client list. Please try again.');
                        return;
                    }
                    var total =
                        typeof json.totalElements === 'number' ? json.totalElements : 0;
                    var rows = Array.isArray(json.content) ? json.content : [];
                    safeDataTablesCallback(callback, {
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: rows
                    });
                })
                .fail(function () {
                    finishFail('Unable to load the client list. Please check your connection and try again.');
                })
                .always(onAjaxComplete);
        } else {
            var searchUrl = joinApiUrl(
                __getContext(),
                '8000/petitioner/search/' +
                    encodeURIComponent(PROBATION_CLIENT_TYPE) +
                    '?page=' +
                    encodeURIComponent(page) +
                    '&size=' +
                    encodeURIComponent(size)
            );
            $.ajax({
                url: searchUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                cache: false,
                data: JSON.stringify({
                    name: term,
                    fieldOfficeId: fieldOfficeId,
                    canSeeOtherOffices: false
                })
            })
                .done(function (json) {
                    if (!json || typeof json !== 'object') {
                        finishFail('Search could not be completed. Please try again.');
                        return;
                    }
                    var total =
                        typeof json.totalElements === 'number' ? json.totalElements : 0;
                    var rows = Array.isArray(json.content) ? json.content : [];
                    safeDataTablesCallback(callback, {
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: rows
                    });
                })
                .fail(function (xhr) {
                    var msg = formatListErrorMessage(
                        xhr && xhr.responseJSON && xhr.responseJSON.message,
                        'Search could not be completed. Please try again.'
                    );
                    finishFail(msg);
                })
                .always(onAjaxComplete);
        }
    }

    function getProbationClientListColumnDefs() {
        return [
            { "width": "5%", "targets": [0] },
            { "width": "25%", "targets": [1] },
            { "width": "25%", "targets": [2] },
            { "width": "25%", "targets": [3] },
            { "width": "20%", "targets": [4] }
        ];
    }

    function tableColumns() {
        return [
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return meta.settings._iDisplayStart + meta.row + 1;
                }
            },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    var client_fo = data.fieldOfficeId;
                    var client_id = data.id;
                    var name;
                    if (
                        data.firstName === null &&
                        data.middleName === null &&
                        data.lastName === null &&
                        data.suffixName === null
                    ) {
                        name = data.fullName || "N/A";
                    } else {
                        name = `${data.firstName ?? ""} ${data.middleName ?? ""} ${data.lastName ?? ""} ${data.suffixName ?? ""}`;
                    }

                    var base = String(__getContext() || '').replace(/\/+$/, '');
                    var href = base + '/pis/client_view_factsheet?client_id=' + encodeURIComponent(String(client_id == null ? '' : client_id)) + '&field_office_id=' + encodeURIComponent(String(client_fo == null ? '' : client_fo));
                    var nameLink = '<a href="' + escAttr(href) + '" class="text-primary">' + escAttr(String(name).trim()) + '</a>';
                    return nameLink;
                }
            },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    if (data.criminalCaseNo === null || data.criminalCaseNo === "") {
                        return "N/A";
                    }
                    return data.criminalCaseNo;
                }
            },
            {
                "data": 'fieldOfficeName',
                "render": function (data, type, row, meta) {
                    if (data == null || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return type === 'display' || type === 'filter' ? String(data) : data;
                }
            },
            {
                "data": 'worksheetStatus',
                "render": function (data, type, row, meta) {
                    if (data == null || String(data).trim() === '') {
                        return 'N/A';
                    }
                    return type === 'display' || type === 'filter' ? String(data) : data;
                }
            }
        ];
    }

    var searchHtml =
        '<div class="prob-fs-client-search-toolbar" role="search" style="display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 8px;">' +
        '<label for="prob_fs_client_search" style="margin-bottom: 0; white-space: nowrap;">Search</label>' +
        '<div class="prob-fs-client-search-wrap" style="width: 250px; max-width: 100%;">' +
        '<input type="search" id="prob_fs_client_search" class="form-control form-control-sm prob-fs-client-search-input" placeholder="Name or case number" autocomplete="off" inputmode="search">' +
        '<button type="button" class="prob-fs-client-search-clear" title="Clear search" aria-label="Clear search">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '</div>' +
        '<button type="button" class="btn btn-primary btn-sm client_search" aria-label="Run search"><i class="fa fa-search" aria-hidden="true"></i></button>' +
        '</div>';

    function injectSearch(value) {
        var $slot = $('#prob_fs_client_search_slot');
        if ($slot.length) {
            $slot.html(searchHtml);
            if (value) {
                $slot.find('.prob-fs-client-search-input').val(value);
            }
            updateSearchClearState();
            return;
        }
        var $target = $('.dataTables_length').parent().next();
        if ($target.length) {
            $target.html(searchHtml);
            if (value) {
                $target.find('.prob-fs-client-search-input').val(value);
            }
            updateSearchClearState();
        }
    }

    function initProbationClientListDataTable() {
        try {
            destroyProbationClientListTable();
            getProbationClientListTable()
                .off('draw.dt.probFs')
                .on('draw.dt.probFs', function () {
                    buttonFunctionality();
                });

            probationClientListDataTable = getProbationClientListTable().DataTable({
                processing: false,
                serverSide: true,
                scrollX: true,
                searching: false,
                lengthMenu: [10, 25, 50, 100],
                pageLength: 10,
                language: {
                    emptyTable: 'No clients found.',
                    zeroRecords: 'No clients found.'
                },
                columnDefs: getProbationClientListColumnDefs(),
                ajax: probationClientListAjax,
                columns: tableColumns()
            });
        } catch (err) {
            setProbFsClientListLoader(false);
            probationClientListDataTable = null;
            showClientListPageError('The client list could not be loaded. Please refresh the page.');
            if (typeof console !== 'undefined' && console.error) {
                console.error(err);
            }
        }
    }

    function wireProbationClientListSearchUi() {
        $(document)
            .off('click.probFsSearch', '.client_search')
            .on('click.probFsSearch', '.client_search', function () {
                if (!probationClientListDataTable) {
                    return;
                }
                hideClientListPageError();
                probationClientListDataTable.ajax.reload(null, true);
            });

        $(document)
            .off('click.probFsSearchClear', '.prob-fs-client-search-clear')
            .on('click.probFsSearchClear', '.prob-fs-client-search-clear', function (e) {
                e.preventDefault();
                $('.prob-fs-client-search-input').val('');
                updateSearchClearState();
                hideClientListPageError();
                if (probationClientListDataTable) {
                    probationClientListDataTable.ajax.reload(null, true);
                }
                $('.prob-fs-client-search-input').trigger('focus');
            });

        $(document)
            .off('input.probFsSearch', '.prob-fs-client-search-input')
            .on('input.probFsSearch', '.prob-fs-client-search-input', function () {
                updateSearchClearState();
            });

        $(document)
            .off('keydown.probFsSearch', '.prob-fs-client-search-input')
            .on('keydown.probFsSearch', '.prob-fs-client-search-input', function (e) {
                if (e.key === 'Enter' || e.which === 13) {
                    e.preventDefault();
                    $('.client_search').first().trigger('click');
                }
            });

    }

    if (!api) {
        setProbFsClientListLoader(false);
        var configMsg =
            '<div class="alert alert-warning prob-fs-api-missing mb-3" role="alert">' +
            'Application configuration is missing (API base URL). ' +
            'Try refreshing the page. If this continues, ensure browser storage is enabled or contact your administrator.' +
            '</div>';
        var $cardBody = $(TABLE_SEL).closest('.card-body');
        if ($cardBody.length) {
            $cardBody.prepend(configMsg);
            var $wrap = $(TABLE_SEL).closest('.prob-fs-client-list-wrap');
            if ($wrap.length) {
                $wrap.hide();
            } else {
                $(TABLE_SEL).hide();
            }
        } else {
            alert(
                'Application configuration is missing (API base URL). Try refreshing the page or contact your administrator.'
            );
        }
    } else if (!officeId) {
        setProbFsClientListLoader(false);
        showClientListPageError('Your session is missing field office information. Please sign in again.');
    } else {
        wireProbationClientListSearchUi();
        initProbationClientListDataTable();
        if (probationClientListDataTable) {
            injectSearch();
            updateSearchClearState();
        }
    }

} )( jQuery );