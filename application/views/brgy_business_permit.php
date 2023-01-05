<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>BRGY BUSINESS PERMIT</title>
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

<div class="container" style="margin-top: 40px; margin-bottom: 20px">
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
		<div class="col-sm-12" style="text-align: center">
			<h2 class="" style=" color: red;">Barangay Clearance for Business</h2><br>
			<label>This is certify that</label>
			<button class="float-right btn btn-success no-print noprint" id="windowPrint" hidden>Print</button>
			<h1 id="B_ownername">Gon Freecs</h1>
			<label>Is the Owner / Proprietor of</label>
			<div class="form-inline" id="formOwner" style="margin-left: 135px">
			  <div class="form-group mb-2">
			    <label for="staticEmail2" class="">Business Name</label>
			  </div>
			  <div class="form-group mx-sm-3 mb-2" style="width: 590px">
			    <label for="inputPassword2" class="sr-only">Business Name</label>
			    <textarea class="form-control" id="owner" rows="1" style="width: 100%;" placeholder="(e.g. GREATBAKES SOLUTIONS INC.)"></textarea>
			  </div>
			  <!-- <button class="btn btn-primary mb-2" id="btnOwner">Confirm Business Name</button> -->
			</div>
			<h1 id="B_name" hidden></h1>
			<div class="form-inline" id="formStreet" style="margin-left: 200px">
			  <div class="form-group mb-2">
			    <label for="staticEmail2" class="">Street</label>
			  </div>
			  <div class="form-group mx-sm-3 mb-2" style="width: 590px">
			    <label for="inputPassword2" class="sr-only">Street</label>
			    <textarea class="form-control" id="street" rows="1" style="width: 100%;" placeholder="(e.g. 326-A P.GUEVARRA STREET )"></textarea>
			  </div>
			  <button class="btn btn-primary mb-2" id="btnStreet">Confirm</button>
			</div>
			<b><span id="B_street" hidden>,</span></b>
			<p style="color: #000000!important;"><b>Barangay Culong, Guimba, Nueva Ecija</b></p>
			<p style="color: #000000!important;"><b>It is further certified that the said business is not a nuisance to the public order and safety. Moreover the above-named applicant pledges to abide with the existing rules, laws, regulation and ordinance pertaining to permits and licenses.</b></p>
			<p style="color: #000000!important;"><b>This Certification is being issued upon the request of the interested party for the presentation to the Business Permit and Licensing Officer, of this City, prior to the Issuance of any permit and licensing for the said business, pursuant to the provision of Sec. 152(C) Republic Act No. 7160, otherwise known as the   Local Government Code 1991.</b></p>
			<span><b>Given this <u><span id="dateToday"></span>.</u></b></span>
			<p style="color: #000000!important; margin-left: 40px"><b>Barangay Culong, Guimba, Nueva Ecija</b></p>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12"><b>CTC NO.: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_________________</b></div>
		<div class="col-sm-12"><b>Date Issued: &nbsp;&nbsp;&nbsp;<u id="dateIssued"></u></b></div>
		<div class="col-sm-12"><b>Place Issued: &nbsp; <u id="placeIssued"></u></b></div>
	</div><br>
	<div class="row"> 
		<div class="col-sm-4" style="text-align: center;">
			<img src="images/regie_hababag1.jpg" width="50%">
		</div>
		<div class="col-sm-6" style="text-align: center">
			<h5><b>HON. REGINA G. HABABAG</b></h5>
			<h5><b>Punong Barangay</b></h5>
			<br><br>
			<span><b><i>Note: NOT Valid without OFFICIAL SEAL of the Barangay</i></b></span>
			<p style="color: #000000!important"><b><i>Valid until <u><span style="color: red;">DECEMBER 31, 2022</span></u></i></b></p>
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
	        $("#btnStreet").unbind("click").on("click", function(){
	            $("#owner").val()
	            $("#formOwner").attr("hidden", true)
	            $("#B_name").attr("hidden", false)
	            $("#B_name").html($("#owner").val())

	            $("#street").val()
	            $("#formStreet").attr("hidden", true)
	            $("#B_street").attr("hidden", false)
	            $("#B_street").html($("#street").val())

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
	                	$("#B_ownername").html(result.payload.first_name+" "+result.payload.middle_name+" "+result.payload.last_name+" "+result.payload.suffix_name);

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
						var d = new Date();

						var month = d.getMonth()+1;
						var day = d.getDate();

						var output = d.getFullYear() + '/' +
						    (month<10 ? '0' : '') + month + '/' +
						    (day<10 ? '0' : '') + day;

	                	$("#dateToday").html(output);
	                	$("#dateIssued").html(output);
	                	$("#placeIssued").html(result.payload.street+" Brgy."+result.payload.barangay+" "+result.payload.city+" "+result.payload.province);

	                } else {

	                }
	            })
	        }
	        __fetch();
        })
    </script>
</body>
</html>