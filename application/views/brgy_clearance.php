<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>BRGY CLEARANCE</title>
    <meta name="description" content="Sufee Admin - HTML5 Admin Template">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-icon.png">
    <!-- <link rel="shortcut icon" href="favicon.ico"> -->

    <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">
    <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="vendors/selectFX/css/cs-skin-elastic.css">
    <link rel="stylesheet" href="vendors/jqvmap/dist/jqvmap.min.css">
    <link rel="stylesheet" href="vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="vendors/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/fonts.css">
</head>
<body>

<div class="container" id="indigencyForm" style="margin-top: 40px; margin-bottom: 10px">
	<div class="row">
		<div class="col-sm-3" style="text-align: center">
			<img src="images/logo.png" width="50%">
		</div>
		<div class="col-sm-6" style="text-align: center;">
			<h5>Republic of the Philipiines</h5>
			<h3 style="color: #002060"><b>BARANGAY CULONG</b></h3>
			<h4>Guimba, Nueva Ecija</h4>
			<h5><b>Tel No. 7968-21-86 / 0917-158-49-92</b></h5>
		</div>
		<div class="col-sm-3" style="text-align: center">
			<img src="images/logo.png" width="50%">
		</div>
	</div><br>
	<div class="row">
		<div class="col-sm-12" style="">
			<h2 class="" style="text-align: center"><b>OFFICE OF THE PUNONG BARANGAY</b></h2><br>
			<h2 class="" style="text-align: center"><b>CERTIFICATION</b></h2><br>
			<button class="float-right btn btn-success no-print noprint" id="windowPrint" hidden>Print</button>
			<h5><b>To whom it may concern:</b></h5>
			<br>
			<h5 style="margin-left: 40px"><b>THIS IS TO CERTIFY: </b></h5><br>
			<h5 style="margin-left: 40px"><b>Name: <u><span id="I_fullname"></span></u></b></h5><br>
			<h5 style="margin-left: 40px"><b>Age: <u><span id="I_age"></span></u></b></h5><br>
			<h5 style="margin-left: 40px"><b>Civil Status: <u><span id="I_civilstatus"></span></u></b></h5><br>
			<h5 style="margin-left: 40px"><b>Address: <u><span id="I_address"></span></u>,</b></h5>
			<label style="margin-left: 40px"><b><i>is Resident</i></b> of this barangay and has undergone RECORD CHECK from this office.</label>
			<br>
			<h5 style="margin-left: 40px;"><b>Findings: <label id="C_findings" hidden></label></b></h5>
			<div class="form-inline" id="formFindings">
			  <div class="form-group mb-2">
			    <label for="staticEmail2" class="">Findings</label>
			  </div>
			  <div class="form-group mx-sm-3 mb-2" style="width: 570px">
			    <label for="findings" class="sr-only">Findings</label>
			    <textarea class="form-control" id="findings" rows="3" style="width: 100%;"></textarea>
			  </div>
			  <!-- <button class="btn btn-primary mb-2" id="btnFindings">Confirm Findings</button> -->
			</div>
			<h5 style="margin-left: 40px;"><b>Purpose: <label id="C_purpose" hidden></label></b></h5>
			<div class="form-inline" id="formPurpose">
			  <div class="form-group mb-2">
			    <label for="staticEmail2" class="">Purpose</label>
			  </div>
			  <div class="form-group mx-sm-3 mb-2" style="width: 570px">
			    <label for="purpose" class="sr-only">Purpose</label>
			    <textarea class="form-control" id="purpose" rows="3" style="width: 100%;"></textarea>
			  </div>
			  <button class="btn btn-primary mb-2" id="btnPurpose">Confirm</button>
			</div>
			<span style="margin-left: 40px"><b>Given this <u><span id="dateToday"></span>.</u></b></span>
			<p style="color: #000000!important; margin-left: 40px"><b>Barangay Culong, Guimba, Nueva Ecija</b></p>
			<br>
			<br>
			<br>
			<br>
			<div class="row">
				<div class="col-sm-6" style="text-align: center;">
				</div>
				<div class="col-sm-6" style="text-align: center">
					<h5><b>HON. REGINA G. HABABAG</b></h5>
					<h5><b>Punong Barangay</b></h5>
					<br><br><br>
					<br><br><br>
				</div>
				<div class="col-sm-12" style="text-align: center">
					<span><b><i>Note: NOT Valid without OFFICIAL SEAL of the Barangay</i></b></span>
					<p style="color: #000000!important"><b><i>Valid until SIX(6) MONTHS upon date of issuance</b></p>
				</div>
			</div>
		</div>
	</div>
</div>

    <?php $this->load->view('templates/footer.php'); ?> 

    <script type="text/javascript">
        jQuery(document).ready(function($) {
        
	        // $("#btnFindings").unbind("click").on("click", function(){
	        //     $("#findings").val()
	        //     $("#formFindings").attr("hidden", true)
	        //     $("#C_findings").attr("hidden", false)
	        //     $("#C_findings").html($("#findings").val())
	        // })
	        $("#btnPurpose").unbind("click").on("click", function(){
	            $("#purpose").val()
	            $("#formPurpose").attr("hidden", true)
	            $("#C_purpose").attr("hidden", false)
	            $("#C_purpose").html($("#purpose").val())

	            $("#findings").val()
	            $("#formFindings").attr("hidden", true)
	            $("#C_findings").attr("hidden", false)
	            $("#C_findings").html($("#findings").val())

	            // $("#windowPrint").attr("hidden", false)
	                window.print(); 
	            // $("#windowPrint").unbind("click").on("click", function(){
	            //     console.log("clicked")
	            //     $("#windowPrint").attr("hidden", true)
	            //     window.print(); 
	            // })
	        })

	        var ___ctx = '';

	        var __setContext = function(newctx) {
	            ___ctx = newctx;
	        };

	        var __getContext = function() {
	            return ___ctx;
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

	        var __fetch = function(){
	        	var getUrlParameter = function getUrlParameter(sParam) {
				    var sPageURL = window.location.search.substring(1),
				        sURLVariables = sPageURL.split('&'),
				        sParameterName,
				        i;

				    for (i = 0; i < sURLVariables.length; i++) {
				        sParameterName = sURLVariables[i].split('=');

				        if (sParameterName[0] === sParam) {
				            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
				        }
				    }
				    return false;
				};
				var rid = getUrlParameter('resident');
				console.log(rid)
	            var payload = {
	               METHOD : "fetch_by_id",
	               resident_id : rid,
	            }
	            __executeExternalPost('/bms_api/User_accounts/upsertUserAccount',JSON.stringify(payload)).done(function (result) {
	                console.log(result)
	                if (result.status === "SUCCESS") {
	                	console.log(result)
	                	$("#I_fullname").html(result.payload.first_name+" "+result.payload.middle_name+" "+result.payload.last_name+" "+result.payload.suffix_name);

	                	dob = new Date(result.payload.birthdate);
						var today = new Date();
						var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
						$('#I_age').html(age+' years old');

	                    let civil_status;
	                    switch (result.payload.civil_status) {
	                    case "1":
	                        civil_status = "Single";
	                        console.log(civil_status)
	                        break;
	                    case "2":
	                        civil_status = "Married";
	                        console.log(civil_status)
	                        break;
	                    case "3":
	                        civil_status = "Widowed";
	                        console.log(civil_status)
	                        break;
	                    case "4":
	                        civil_status = "Seperated";
	                        console.log(civil_status)
	                        break;
	                    case "5":
	                        civil_status = "Not Indicated";
	                        console.log(civil_status)
	                        break;
	                    default:
	                        civil_status = "";
	                        break;
	                    };

	                	$("#I_civilstatus").html(civil_status);
	                	$("#I_address").html(result.payload.street+" Brgy."+result.payload.barangay+" "+result.payload.city+" "+result.payload.province);
						var d = new Date();

						var month = d.getMonth()+1;
						var day = d.getDate();

						var output = d.getFullYear() + '/' +
						    (month<10 ? '0' : '') + month + '/' +
						    (day<10 ? '0' : '') + day;

	                	$("#dateToday").html(output);

	                } else {

	                }
	            })
	        }
	        __fetch();
        })
    </script>

</body>
</html>