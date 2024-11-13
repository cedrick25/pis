    ( function ( $ ) {

        var api = localStorage.getItem('api');
        var ___ctx = api;

        var __getContext = function() {
            return ___ctx;
        };

        var __setContext = function(newctx) {
            ___ctx = newctx;
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

        // var __userDropdownForForwarding = function (dep_id, userId, roleId, secRoleId) {
        //     __executeExternalGet(___ctx+'8088/user/list/'+dep_id).done(function (result) {
        //         if (result.status != "ERROR") {
        //             $(".user_display").show()
        //             $('.user_account').append("<option selected disabled>Select User Account</option>");
        //             if (userId == $.cookie('role_id')) {
        //                 result.forEach(function(data){
        //                     var fullname = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
        //                     if (userId == "32") {
        //                         if (data.roleId == roleId || data.roleId == secRoleId){
        //                             $('.user_account').append(
        //                                 '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
        //                             );   
        //                         }
        //                     } else if (userId == "14" || userId == "4"){
        //                         if (data.roleId == roleId){
        //                             $('.user_account').append(
        //                                 '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
        //                             );   
        //                         }
        //                     } else {
        //                         $('.user_account').append(
        //                             '<option value="'+data.uuid+'" data-fname="'+data.firstName+'" data-lname="'+data.lastName+'" data-mname="'+data.middleName+'" data-sname="'+data.suffix+'">'+fullname+'</option>'
        //                         );
        //                     }
        //                 });
        //             }
        //         } else {
        //             console.log("failed fetching user list")
        //             $(".user_display").hide()
        //         }
        //     });
        // }

        // var __select = function(){
        //     $('.field_office').empty();

        //     __executeExternalGet(___ctx+'8088/department/list').done(function (result) {
        //         // console.log(result)
        //         if (result.status != "ERROR") {
        //             $('.field_office').append("<option selected disabled>Select Field Office</option>");
        //             result.forEach(function(data){
        //                 $('.field_office').append(
        //                     "<option value="+data.id+">"+data.name+"</option>");
        //             });
        //             $('.field_office').on('change', function() {
        //                 const dep_id = this.value
        //                 var userId = $.cookie('role_id');
        //                 var roleId;
        //                 var secRoleId;
        //                 if (userId == "14") {
        //                     roleId = "32"
        //                     __userDropdownForForwarding(dep_id, userId, roleId)
        //                 } else if (userId == "32") {
        //                     roleId = "4"
        //                     secRoleId = "14"
        //                     __userDropdownForForwarding(dep_id, userId, roleId, secRoleId)
        //                 } else if (userId == "4") {
        //                     roleId = "32"
        //                     __userDropdownForForwarding(dep_id, userId, roleId)
        //                 } else {
        //                     __userDropdownForForwarding(dep_id, userId, roleId)
        //                 }
        //             });
        //         } else {
        //             console.log("failed fetching department list")
        //         }
        //     })
        // }
        // __select();

        // var approval_status = "Pending of CPPO"

        var transaction_number = GetURLParameter('transaction_number');
        var id = GetURLParameter('id');
        // var officeId = GetURLParameter('fo');
        // var senderId = GetURLParameter('senderId');

        // function storeData(postUrl, postData) {
        //     $.ajax({
        //         url: postUrl,
        //         type: 'POST',
        //         dataType: 'json',
        //         contentType: 'application/json',
        //         data: JSON.stringify(postData),
        //         success: function (result) {
        //             // console.log('User data received:', result);
        //         },
        //         error: function (xhr, status, error) {
        //             console.error('Error:', status, error);
        //         }
        //     });
        // }

        // var ___updateStatusUponViewingDocket = function () {
        //     var apiUrl = api+'8000/workflow/'+id
        //     $.ajax({
        //         url: apiUrl,
        //         type: 'GET',
        //         dataType: 'json',
        //         success: function(result) {
        //             // console.log('Data received:', result);
        //             var data = result.response;
        //             console.log(data)
        //             var postUrl = api+'8000/workflow/update/'+id;
        //             let approvalStatus;
                    
        //             if (data.approvalStatus == "New - (Forwarded to CPPO)" ){
        //                 approvalStatus = "Pending of CPPO";
        //             } else if (data.approvalStatus == "New - (Forwarded to FO)" ){
        //                 approvalStatus = "Pending of FO";
        //             } else if (data.approvalStatus == "New - (Forward to CPPO for Approval)"){
        //                 approvalStatus = "Pending of CPPO for Approval";
        //             } else if (data.approvalStatus == "Pending of FO"){ 
        //                 approvalStatus = "Pending of FO";
        //             } else if (data.approvalStatus == "Pending of CPPO"){ 
        //                 approvalStatus = "Pending of CPPO";
        //             } else if (data.approvalStatus == "Pending of CPPO for Approval"){ 
        //                 approvalStatus = "Pending of CPPO for Approval";
        //             }
        //             var postData = {
        //                 "type": data.type,
        //                 "caseloadType": data.caseloadType,
        //                 "senderId": data.senderId,
        //                 "senderName": data.senderName,
        //                 "senderFieldOfficeId": data.senderFieldOfficeId,
        //                 "originFieldOfficeId": data.originFieldOfficeId,
        //                 "receiverId": data.receiverId,
        //                 "fieldOfficeId": data.fieldOfficeId,
        //                 "docketNumber": data.docketNumber,
        //                 "details": data.details,
        //                 "remarks": data.remarks,
        //                 "approvalStatus": approvalStatus,
        //                 "lastStatusUpdateDate": "",
        //             };
        //             if (approvalStatus == "Pending of FO"){
        //                 approvalStatus == "Pending of FO";
        //                 storeData(postUrl,postData)
        //             } else if (approvalStatus == "Pending of CPPO"){
        //                 approvalStatus == "Pending of CPPO";
        //                 storeData(postUrl,postData)
        //             } else if (approvalStatus == "Pending of CPPO for Approval"){
        //                 approvalStatus == "ending of CPPO for Approval";
        //                 storeData(postUrl,postData)
        //             }
        //             $(".btn-confirm_forward").unbind("click").on("click", function(){
        //                 // console.log("click")
        //                 function postDatas() {
        //                     return {
        //                         "type"                  : data.type,
        //                         "caseloadType"          : data.caseloadType,
        //                         "senderFieldOfficeId"   : $.cookie('field_office_id'),
        //                         "senderFieldOfficeName" : $.cookie('departmentName'),
        //                         "originFieldOfficeId"   : data.originFieldOfficeId,
        //                         "senderId"              : $.cookie("uuid"),
        //                         "receiverId"            : $(".user_account").val(),
        //                         "fieldOfficeId"         : $(".field_office").val(),
        //                         "docketNumber"          : data.docketNumber,
        //                         "details"               : $(".details").val(),
        //                         "remarks"               : data.remarks,
        //                         "approvalStatus"        : approvalStatus,
        //                         "lastStatusUpdateDate"  : "",
        //                     };
        //                 }
        //                 if (data.approvalStatus == "Pending of CPPO"){
        //                     approvalStatus = "New - (Forwarded to FO)"
        //                     var postData = postDatas()
        //                     storeData(postUrl,postData)
        //                     $("#success_forwarding").show()
        //                     setTimeout(function () {
        //                         $("#success_forwarding").hide()
        //                         window.location.href = api+"/pis/sent";
        //                     }, 2000);
        //                 } else if (data.approvalStatus == "Pending of FO"){
        //                     approvalStatus = "New - (Forward to CPPO for Approval)"
        //                     var postData = postDatas()
        //                     storeData(postUrl,postData)
        //                     $("#success_forwarding").show()
        //                     setTimeout(function () {
        //                         $("#success_forwarding").hide()
        //                         window.location.href = api+"/pis/sent";
        //                     }, 2000);
        //                 } else if (data.approvalStatus == "Pending of CPPO for Approval"){
        //                     approvalStatus = "New - (Forwarded to clerk for completion)"
        //                     var postData = postDatas()
        //                     storeData(postUrl,postData)
        //                     $("#success_forwarding").show()
        //                     setTimeout(function () {
        //                         $("#success_forwarding").hide()
        //                         window.location.href = api+"/pis/sent";
        //                     }, 2000);
        //                 } 
        //             })
        //         },
        //         error: function(xhr, status, error) {
        //             console.error('Error:', status, error);
        //         }
        //     });
        // }
        
        var __fields = function(){
            __executeExternalGet(___ctx+'8000/workflow/'+id).done(function (result) {
                var result = result.response;
                console.log(result)
                if (result.status != "ERROR") {
                    __executeExternalGet(___ctx+'8000/petitioner/'+result.petitionerId).done(function (resultPetitioner) {
                        var resultPetitioner = resultPetitioner.response;
                        console.log(resultPetitioner)
                        $(".firstName").text(resultPetitioner.firstName)
                        $(".middleName").text(resultPetitioner.middleName)
                        $(".lastName").text(resultPetitioner.lastName)
                        $(".aliasName").text(resultPetitioner.alias)
                        $(".criminalCaseNumber").text(resultPetitioner.criminalCaseNo)
                        $(".prisonNumber").text(resultPetitioner.prisonNumber)
                        $(".sender").text(result.senderName)
                        $(".details").text(result.details)
                        $(".subject").text(result.remarks)
                        $(".fieldOffice").text(result.fieldOfficeName)
                        $(".forward_to").text(result.receiverName)
                        // $(".return_by").text(result.receiverName)
                    })
                    $(".btn-forward").unbind("click").on("click", function(){
                        window.location.href=api+"/pis/pdl-forward?transaction_number="+transaction_number+"&id="+result.id;
                    })
                    $(".btn-return").unbind("click").on("click", function(){
                        window.location.href=api+"/pis/pdl-return?transaction_number="+transaction_number+"&id="+result.id;
                    })
                    $(".btn-upload").unbind("click").on("click", function(){
                        window.location.href=api+"/pis/pdl-upload?transaction_number="+transaction_number+"&id="+result.id;
                    })
                }else{
                    alert("failed")
                }
            })
            console.log("view history")
        }
        // // Function to toggle the display of the remarks text
        // function toggleRemarks(index) {
        //     var remarks = document.getElementById(`remarksText${index}`);
        //     var seeMore = document.getElementById(`seeMore${index}`);
            
        //     console.log(remarks.innerText.length)
        //     // Check the current text length
        //     if (remarks.innerText.length > 20) {
        //         if (remarks.style.whiteSpace === "nowrap") {
        //             remarks.style.whiteSpace = "normal";  // Show full text
        //             seeMore.innerText = "See Less";  // Change button text
        //         } else {
        //             remarks.style.whiteSpace = "nowrap";  // Truncate text
        //             seeMore.innerText = "See More";  // Change button text
        //         }
        //     }
        // }

        var historyBody = function () {
            __executeExternalGet(___ctx+'8000/workflow/history/'+transaction_number).done(function (result) {
                var result = result.response
                // console.log(result)
                result.forEach(function(data, index){
                    let userName;
                    if ($.cookie("uuid") == data.createdBy) {
                        userName = "You"
                    } else {
                        userName = data.senderName
                    }

                    // Original date string
                    const createdDate = data.createdDate;

                    // Convert to Date object
                    const dateObj = new Date(createdDate.replace(" ", "T")); // Ensuring ISO format

                    // Get the date components
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                    const day = String(dateObj.getDate()).padStart(2, "0");
                    const hours = String(dateObj.getHours()).padStart(2, "0");
                    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
                    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

                    // Construct the formatted date string
                    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                    console.log(formattedDateTime);


                    $(".history_body").append(`
                        <div class="card" style="height: 200px">
                            <div class="card-body">
                                <div class="row">
                                    <div class="routing-history-container mx-3">
                                        <div class="col col-md-12"><span class="user">${userName}</span><span> forwarded </span><span>[${data.remarks}]</span> <span> to: </span>
                                        <span>${data.receiverName} </span></div>
                                    </div>
                                    <div class="routing-details-container mx-3">
                                        <div class="col col-md-12">
                                            <span class="remarks" id="remarksText_${index}" style="display:block">${data.details}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent">
                                <span>Created at ${formattedDateTime}</span>
                            </div>
                        </div>
                    `)

                    var remarksText = document.getElementById(`remarksText_${index}`);
                    
                    if (remarksText.innerText.length > 20) {

                        const fullText = remarksText.innerText;
                        let truncatedText = remarksText.innerText.substring(0, 20);
                        
                        // Create a new HTML structure with separate span for additional text
                        remarksText.innerHTML = `
                            <span class="truncated">${truncatedText}...</span>
                            <span class="extraText float-right" id="extraText" >See More</span>
                        `;

                        $(".extraText").unbind("click").on("click", function(){
                            // Show the full text and change the link to "See less"
                            remarksText.innerHTML = `
                                <span class="fullText">${fullText}</span>
                                <span class="seeLessLinkExtra float-right">See Less</span>
                            `;
                            $(".seeLessLinkExtra").unbind("click").on("click", function(){
                                // Collapse the text back to truncated version
                                remarksText.innerHTML = `
                                    <span class="truncated">${truncatedText}...</span>
                                    <span class="extraText float-right" id="extraText">See More</span>
                                `;
                                $(".extraText").unbind("click").on("click", function(){
                                    // Show the full text and change the link to "See less"
                                    remarksText.innerHTML = `
                                        <span class="fullText">${fullText}</span>
                                        <span class="seeLessLinkExtra float-right">See Less</span>
                                    `;
                                })
                            });
                        });

                    }
                });
            })
        }
        // __fields();

        var type = "PDL"
        function fetchFiles() {
            var file_uuid = "workflow_uploads_"+transaction_number;
            const apiUrl = api+'8080/file/list/'+type+'/'+file_uuid+'/'+$.cookie('field_office_id');
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                success: function(result) {
                    var result = result.files;
                    result.forEach(function(data, index){
                        var table_id = index + 1;
                        $('.table_body').append("<tr>"+
                            "<td>"+table_id+"</td>"+
                            "<td>"+data.kind+"</td>"+
                            "<td>"+data.fileName+"</td>"+
                            "<td>"+data.version+"</td>"+
                            "<td class='options'><a href="+api+'8080/file/download/'+data.id+"><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a> <a href="+api+'8080/file/view/'+data.id+"><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a></td></tr>"
                        )
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        }
        $(document).ready(function(){
            // ___updateStatusUponViewingDocket();
            __fields();
            fetchFiles();
            historyBody();
            // toggleRemarks();
        })

    } )( jQuery );