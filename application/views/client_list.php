<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Docket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Removed Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to remove this Docket: <b><span class="docket"></span></b>? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->
  
        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list">Fact Sheet</a></li>
                            <li class="active">Fact Sheet Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Fact Sheet</strong>
                                <a href="new_client"> <button class="btn btn-sm btn-success float-right client_add"
                                style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button> </a>
                            </div>
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="client_pb" data-toggle="tab" href="#pb" role="tab" aria-controls="investigation" aria-selected="true">Probationer</a>
                                    </li>
<!--                                     <li class="nav-item">
                                        <a class="nav-link" id="client_pr" data-toggle="tab" href="#pr" role="tab" aria-controls="supervision" aria-selected="false">Parolee</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="client_pd" data-toggle="tab" href="#pd" role="tab" aria-controls="single_carpeta" aria-selected="false">Pardonee</a>
                                    </li> -->
                                </ul>
                                <div class="tab-content pl-3 p-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="pb" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col col-md-12">
                                            <h3>Probationer</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pb">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pb">
                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pr" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Parolee</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pr">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pr">
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pd" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="col col-md-12">
                                            <h3>Pardonee</h3>
                                        </div><br><br>
                                        <div class="col col-md-12">
                                            <table class="table table_head_pd">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Full Name</th>
                                                        <th>Gender</th>
                                                        <th>Client Type</th>
                                                        <th>Field Office</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body_pd">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script type="text/javascript">
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





        var __tablePB = function(){
            $('.table_head_pb').DataTable().destroy();
            $('.table_body_pb').empty();

            __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PROBATIONER').done(function (result) {
                console.log("==========")
                console.log(result)
                console.log("==========")
                    // console.log(result.name)
                    if (result.status != "ERROR") {
                        result.content.forEach(function(data){
                            // __executeExternalGet('http://localhost:8088/department/'+data.fieldOfficeId).done(function (resultfo) {
                            //     console.log(resultfo.name);
                            let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-eye'></i> View</button> <button class='btn btn-sm btn-success btn_worksheet worksheet perm_worksheet' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> Worksheet</button> <button class='btn btn-sm btn-primary btn_psir psir perm_psir' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-plus-circle'></i> PSIR</button> <button class='btn btn-sm btn-success btn_pdfPSIR pdf_psir perm_pdfPSIR' type='submit' data-id='"+data.id+"' data-foid='"+data.fieldOfficeId+"'><i class='fa fa-download'></i> Generate PSIR</button>";
                            $('.table_body_pb').append("<tr>"+
                                "<td>"+data.id+"</td>"+
                                "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
                                "<td>"+data.sex+"</td>"+
                                "<td>"+data.clientType+"</td>"+
                                "<td value="+data.fieldOfficeId+">"+data.fieldOfficeName+"</td>"+
                                "<td class='actions'> "+actions+"")
                            // });
                    })  
                    
                    $(document).ready(function () {
                        $('.table_head_pb tbody tr').each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $('.table_head_pb').DataTable({
                            order: [[0, 'asc']],
                            "columnDefs": [
                                { "width": "40%", "targets": 5 }
                            ]
                        });
                        $('.dataTables_length').addClass('bs-select');
                    });

                    $(".btn_worksheet").unbind("click").on("click", function(){
                        var client_id   = $(this).data("id");
                        var foid        = $(this).data("foid");
                        window.location.href = 'http://localhost/pis/worksheet_identifying_data?client_id='+client_id+'&field_office_id='+foid;
                    })
                    $(".btn_update").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
                    })
                    $(".btn_upload").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
                    })
                    $(".btn_view").unbind("click").on("click", function(){
                        var client_id = $(this).data("id");
                        window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
                    })
                    $(".btn_psir").unbind("click").on("click", function(){
                        var client_id   = $(this).data("id");
                        var foid        = $(this).data("foid");
                        window.location.href = 'http://localhost/pis/psir_identifying_data?client_id='+client_id+'&field_office_id='+foid;
                    })
                    $(".btn_pdfPSIR").unbind("click").on("click", function(){
                        var client_id   = $(this).data("id");
                        var foid        = $(this).data("foid");

    __executeExternalGet('http://localhost:8000/petitioner/'+client_id).done(function (result) {
        // console.log("1st result")
        // console.log(result)
        var result = result.response;
            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirIdentifyingData/'+client_id).done(function (result2){
                // console.log("2nd result")
                // console.log(result2)

                var result2 = result2.response;
                    __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirPresentOffense/'+client_id).done(function (result3){
                    // console.log("3rd result")
                    // console.log(result3)

                    var result3 = result3.response;
                        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirPriorRecords/'+client_id).done(function (result4){
                        // console.log("4th result")
                        // console.log(result4)

                        var result4 = result4.response;

                            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirFamilyBackground/'+client_id).done(function (result5){
                            // console.log("5th result")
                            // console.log(result5)

                            var result5 = result5.response;

                                __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirSocioEconomic/'+client_id).done(function (result6){
                                // console.log("6th result")
                                // console.log(result6)

                                var result6 = result6.response;

                                    __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirResidenceEconomic/'+client_id).done(function (result7){
                                    // console.log("7th result")
                                    // console.log(result7)

                                    var result7 = result7.response;

                                        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirSpouseChildren/'+client_id).done(function (result8){
                                        // console.log("8th result")
                                        // console.log(result8)

                                        var result8 = result8.response;

                                            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirEducationHistory/'+client_id).done(function (result9){
                                            // console.log("9th result")
                                            // console.log(result9)

                                            var result9 = result9.response;

                                                __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirEmploymentHistory/'+client_id).done(function (result10){
                                                // console.log("10th result")
                                                // console.log(result10)

                                                var result10 = result10.response;

                                                    __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirEnvironmentalFactor/'+client_id).done(function (result11){
                                                //    console.log("11th result")
                                                //    console.log(result11)

                                                    var result11 = result11.response;

                                                        __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirEvaluation/'+client_id).done(function (result12){
                                                        // console.log("12th result")
                                                        // console.log(result12)

                                                        var result12 = result12.response;

                                                            __executeExternalGet('http://localhost:8000/worksheet/getPetitioner/psirRecommendation/'+client_id).done(function (result13){
                                                //            console.log("13th result")
                                                //            console.log(result13)

                                                            var result13 = result13.response;

                                            if (result.status != "ERROR"){

																								var doc = new jsPDF();

																								// Add Old English font
																								// doc.addFont('fonts/OLDENG.TTF', 'OldEnglish', 'bold');

																								// Set font size and style
																								doc.setFont('times', 'bold');
																								doc.setFontSize(13)
																								// Calculate line height
																								var lineHeight = doc.getLineHeight() - 8;

																								// Add some text with adjusted line height
																								doc.text('PPA FORM 3/p. 1', 10, 10);
																								doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
																								doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
																								doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
																								doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });

																								// doc.addImage('path/to/your/image.png', 'PNG', 10, 10, 50, 50);
																								// doc.setFont('times', 'bold');
																								doc.setFontSize(10);
																								doc.text('Republic of the Philippines', 80, 10 + lineHeight*3, { align: 'center' });
																								// doc.setFont('bold');
																								doc.text('Department of Justice', 85, 10 + lineHeight*4, { align: 'center' });
																								doc.text('PAROLE AND PROBATION ADMINISTRATION', 60, 10 + lineHeight*5, { align: 'center' });
																								doc.text('REGIONAL OFFICE NO.', 83, 10 + lineHeight*6, { align: 'center' });
																								doc.text('Parole and Probation Office', 80, 10 + lineHeight*7, { align: 'center' });
																								// doc.addImage('assets/images/piss.png', 'PNG', 10, 10, 50, 50);
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
																								doc.text('Civil Status: '+JSON.parse(result5.jsonData).civilStatus, 130, 10 + lineHeight*15.5);
																								doc.text('Birth Order: '+result.sex, 10, 10 + lineHeight*16.5);
																								doc.text('Occupation: '+JSON.parse(result5.jsonData).job_held, 130, 10 + lineHeight*16.5);
																								doc.text("Father's Name: "+JSON.parse(result5.jsonData).fatherName, 10, 10 + lineHeight*17.5);
																								doc.text("Mother's Name: "+JSON.parse(result5.jsonData).motherName, 130, 10 + lineHeight*17.5);
																								doc.text('Spouse: '+JSON.parse(result8.jsonData).spouseLname+','+JSON.parse(result8.jsonData).spouseFname+' '+JSON.parse(result8.jsonData).spouseMname+','+JSON.parse(result8.jsonData).spouseEname, 10, 10 + lineHeight*18.5);
																								doc.text('Occupation: '+JSON.parse(result8.jsonData).spouse_occupation, 130, 10 + lineHeight*18.5);
																								
																								doc.text('Identifying Marks/Unusual Features:'+JSON.parse(result5.jsonData).identifyingMarks,10, 10 + lineHeight*19.5)
																								doc.text('Present Address:'+JSON.parse(result2.jsonData).presentAddress,10, 10 + lineHeight*20.5)
																								doc.text('Permanent Address:'+JSON.parse(result2.jsonData).permanentAdress,10, 10 + lineHeight*21.5)

																								doc.text('II. PERSONAL AND SOCIAL HISTORY', 80, 12 + lineHeight*22.5, { align: 'left' });
																								doc.text('A. SUBJECTIVE SOCIO-ECONOMIC STATUS: '+JSON.parse(result6.jsonData).eco_status,10, 10 + lineHeight*23.5)
																								doc.text('B. FAMILY RELATIONSHIP:'+JSON.parse(result6.jsonData).family_rel,10, 10 + lineHeight*24.5)
																								doc.text('C. FAMILY REPUTATION:'+JSON.parse(result7.jsonData).fam_status,10, 10 + lineHeight*25.5)
																								doc.text('D. OVERALL WELL-BEING:'+JSON.parse(result10.jsonData).empHealth,10, 10 + lineHeight*26.5)
																								doc.text('E. FAMILY SUPPORT:'+JSON.parse(result2.jsonData).permanentAdress,10, 10 + lineHeight*27.5)
																								doc.text('F. COMMUNITY SUPPORT:'+JSON.parse(result11.jsonData).comAcceptance,10, 10 + lineHeight*28.5)

																								// PAGE 2

																								doc.addPage();
																								doc.setFontSize(13)
																								doc.text('PPA FORM 3/p. 1', 10, 10);
																								doc.text('PSIR Re: '+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName, 10, 10 + lineHeight);
																								doc.text('Criminal Case Number: '+result.criminalCaseNo, 10, 10 + lineHeight*2);
																								doc.text('PPA-FO-FR-003 ', 170, 10, { align: 'right' });
																								doc.text('Investigation Docket No.: '+result.criminalCaseNo, 130, 10 + lineHeight, { align: 'right' });
																								doc.text('III. CRIMINAL HISTORY', 80, 12 + lineHeight*3, { align: 'left' });
																								doc.text('A. PRESENT OFFENSE', 10, 12 + lineHeight*4, { align: 'left' });
																								doc.text('Charged With: '+JSON.parse(result3.jsonData).chargedWith, 10, 12 + lineHeight*5, { align: 'left' });
																								doc.text('Date:'+JSON.parse(result3.jsonData).dateCharged, 130, 10 + lineHeight*5);
																								doc.text('Convicted of: '+JSON.parse(result3.jsonData).convictedOf, 10, 12 + lineHeight*6, { align: 'left' });
																								doc.text('Date:'+JSON.parse(result3.jsonData).dateConvicted, 130, 10 + lineHeight*6);
																								doc.text('Sentence: ', 10, 12 + lineHeight*7, { align: 'left' });
																								doc.text('Judge: '+JSON.parse(result3.jsonData).judge, 10, 12 + lineHeight*8, { align: 'left' });
																								doc.text('Court:'+JSON.parse(result3.jsonData).court, 130, 10 + lineHeight*8);
																								doc.text('Custodial Status: '+JSON.parse(result3.jsonData).custody, 10, 12 + lineHeight*9, { align: 'left' });
																								doc.text('B. PRIOR AND PENDING RECORDS', 10, 12 + lineHeight*10.5, { align: 'left' });

																								// Define table properties
																								var columns = ["Agency", "CC no.", "Offense", "Date Charged", "Decision of the case"];
																								var data = [JSON.parse(result4.jsonData).priorRecord];
																								var tableX = 10; // X position of the table
																								var tableY = 95; // Y position of the table
																								var rowHeight = 10; // Height of each row
																								var columnWidth = 40; // Width of each column

																								// Set the font size and style for the table
																								doc.setFontSize(12);
																								doc.setFontStyle("bold");

																								// Draw the table headers
																								for (var i = 0; i < columns.length; i++) {
																								  doc.text(tableX + i * columnWidth, tableY, columns[i]);
																								}

																								// Draw the table rows
																								doc.setFontStyle("normal");
																								for (var j = 0; j < data.length; j++) {
																								  var row = data[j];
																								 // console.log(row);
																								  for (var k = 0; k < row.length; k++) {
																								    var value = row[k];
																								    // console.log(value)
																								    if (typeof value === "object") {
																								      value = Object.values(value).join(", ");
																								      // console.log(value)
																								    } else {
																								      value = value.toString();
																								    }

																								    // Calculate the Y position based on the column index
																								    var yPos = tableY + ((k + 1) * rowHeight);
																								    // console.log(yPos)
																								    var xPos = (tableX);
																								    // console.log(xPos)
																								    doc.text(xPos, yPos, value); // Adjust the Y position to separate rows
																								  }
																								}

																								doc.addPage();
																								doc.setFontSize(13)
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
																								  // Check if there is enough space on the current page for the line
																								  if (y + analysisLineHeight + analysisMargin > doc.internal.pageSize.height) {
																								    doc.addPage(); // Add a new page if there is not enough space
																								    y = 10; // Reset the y-coordinate to the top margin
																								  }

																								  doc.setFontSize(12);
																								  doc.text(lines[i], x, y);
																								  y += analysisLineHeight; // Increase the y-coordinate for the next line
																								}

																								y += analysisMargin; // Create some space before adding the second paragraph

																								doc.text('V. PROJECTED THRUSTS OF REHABILITATION', 60, y, { align: 'left' });

																								var secondParagraph = JSON.parse(result12.jsonData).projectedThrust;
																								y += analysisLineHeight + analysisMargin; // Increase the y-coordinate for the new paragraph

																								var secondLines = doc.splitTextToSize(secondParagraph, maxWidth);

																								for (var j = 0; j < secondLines.length; j++) {
																								  // Check if there is enough space on the current page for the line
																								  if (y + analysisLineHeight + analysisMargin > doc.internal.pageSize.height) {
																								    doc.addPage(); // Add a new page if there is not enough space
																								    y = 10; // Reset the y-coordinate to the top margin
																								  }

																								  doc.setFontSize(12);
																								  doc.text(secondLines[j], x, y);
																								  y += analysisLineHeight; // Increase the y-coordinate for the next line
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
																								console.log(rec)

																								var recommendation =  [JSON.parse(result13.jsonData).recommendations];
																								console.log(recommendation)

																								var textRec = "WHEREFORE, in view of the foregoing, it is respectfully recommended to this Honorable Court that the petition for probation of "+result.firstName+' '+result.middleName+' '+result.lastName+' '+result.suffixName+' be '+JSON.parse(result13.jsonData).grant+',  subject to the following conditions:';
																								console.log(textRec)

																								var maxWidth = 190; // Maximum width per line in pixels
																								var linesRec = doc.splitTextToSize(textRec, maxWidth);
																								console.log(linesRec)

																								var xRec = 20; // Starting x-coordinate
																								var yRec = 45; // Starting y-coordinate

																								for (var i = 0; i < linesRec.length; i++) {
																									doc.setFontSize(11)
																								  doc.text(linesRec[i], xRec, yRec); // Adjust the coordinates based on your requirements
																								  yRec += 10; // Increase the y-coordinate for the next line
																								}

																								var curYRec = yRec;
																								var lineHeight = 5; // Height of each line in pixels
																								var margin = 5; // Margin for the content
																								console.log(curYRec)

																								for (var j = 0; j < recommendation.length; j++) {
																								  var row = recommendation[j];
																								 	// console.log(row);
																								  for (var k = 0; k < row.length; k++) {
																								    var value = row[k];
																								    // console.log(value)
																								    var num = k + 1;
																								    if (typeof value === "object") {
																								      value = Object.values(value).join(", ");
																								     	// console.log(value)
																								    } else {
																								      value = value.toString();
																								    }
																								    
																								    var textSample = num + '. ' + value;
																								    console.log(textSample)
																								    var linesRecList = doc.splitTextToSize(textSample, maxWidth);
																								    console.log(linesRecList)

																								    if (curYRec + (linesRecList.length * lineHeight) + margin > doc.internal.pageSize.height) {
																								      doc.addPage(); // Add a new page if there is not enough space
																								      curYRec = margin; // Reset the y-coordinate to the top margin
																								    }

																								    		doc.text(10, curYRec, linesRecList); // Adjust the Y position to separate rows
																								    		curYRec += linesRecList.length * lineHeight;
																								  }
																								}

																								doc.save('PSIR.pdf');
                                            }
                                            else{
                                                console.log("error fetching data")
                                            }
                                }); //result 2 end
                                        }); //result 3 end
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
            })
        }
        __tablePB();

        // var __tablePR = function(){
        //     $('.table_head_pr').DataTable().destroy();
        //     $('.table_body_pr').empty();

        //     __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PAROLEE').done(function (result) {
        //         console.log("==========")
        //         console.log(result)
        //         console.log("==========")
        //         if (result.status != "ERROR") {
        //             result.content.forEach(function(data){
        //                 let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> View</button>";
        //                 $('.table_body_pr').append("<tr>"+
        //                     "<td>"+data.id+"</td>"+
        //                     "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
        //                     "<td>"+data.sex+"</td>"+
        //                     "<td>"+data.clientType+"</td>"+
        //                     "<td value="+data.fieldOfficeId+">"+data.fieldOfficeId+"</td>"+
        //                     "<td class='actions'> "+actions+"")
        //             });
                    
        //             $(document).ready(function () {
        //                 $('.table_head_pr tbody tr').each(function (idx) {
        //                    $(this).children("td:eq(0)").html(idx + 1);
        //                 });
        //                 var table = $('.table_head_pr').DataTable({
        //                     order: [[0, 'asc']],
        //                     // "columnDefs": [
        //                     //     { "width": "40%", "targets": 5 }
        //                     // ]
        //                 });
        //                 $('.dataTables_length').addClass('bs-select');
        //             });


        //             $(".btn_update").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
        //             })
        //             $(".btn_upload").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
        //             })
        //             $(".btn_view").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
        //             })
        //         }
        //     })
        // }
        // __tablePR();

        // var __tablePD = function(){
        //     $('.table_head_pd').DataTable().destroy();
        //     $('.table_body_pd').empty();

        //     __executeExternalGet('http://localhost:8000/petitioner?page=0&size=50&type=PARDONEE').done(function (result) {
        //         console.log("==========")
        //         console.log(result)
        //         console.log("==========")
        //         if (result.status != "ERROR") {
        //             result.content.forEach(function(data){
        //                 let actions = "<button class='btn btn-sm btn-primary btn_update client_update' type='submit' data-id='"+data.id+"'><i class='fa fa-refresh'></i> Update</button> <button class='btn btn-sm btn-success btn_upload client_upload' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> Upload</button> <button class='btn btn-sm btn-primary btn_view client_view' type='submit' data-id='"+data.id+"'><i class='fa fa-upload'></i> View</button>";
        //                 $('.table_body_pd').append("<tr>"+
        //                     "<td>"+data.id+"</td>"+
        //                     "<td>"+data.firstName+ " " +data.middleName+ " " +data.lastName+ " " +data.suffixName+"</td>"+
        //                     "<td>"+data.sex+"</td>"+
        //                     "<td>"+data.clientType+"</td>"+
        //                     "<td value="+data.fieldOfficeId+">"+data.fieldOfficeId+"</td>"+
        //                     "<td class='actions'> "+actions+"")
        //             });
        //             $(document).ready(function () {
        //                 $('.table_head_pd tbody tr').each(function (idx) {
        //                    $(this).children("td:eq(0)").html(idx + 1);
        //                 });
        //                 var table = $('.table_head_pd').DataTable({
        //                     order: [[0, 'asc']],
        //                     // "columnDefs": [
        //                     //     { "width": "30%", "targets": 5 }
        //                     // ]
        //                 });
        //                 $('.dataTables_length').addClass('bs-select');
        //             });

        //             $(".btn_update").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_update?client_id='+client_id;
        //             })
        //             $(".btn_upload").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_file_upload?client_id='+client_id;
        //             })
        //             $(".btn_view").unbind("click").on("click", function(){
        //                 var client_id = $(this).data("id");
        //                 window.location.href = 'http://localhost/pis/client_view_upload?client_id='+client_id;
        //             })
                   
        //         }
        //     })
        // }
        // __tablePD();


    } )( jQuery );
    </script>


</body>

</html>