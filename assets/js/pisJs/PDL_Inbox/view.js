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
        var __executeFile = function(path, jsonObj) {
            var d = $.Deferred();
            $.ajax({
                method: "POST",
                url: path,
                dataType: "json",
                cache: false,
                "mimeType": "multipart/form-data",
                processData: false,
                contentType: false,
                /*data: JSON.stringify(jsonObj)*/
                data: jsonObj
            }).done(function (data, textStatus, jqXHR) {
                d.resolve(data);
                $(".loadDiv").hide();
                $(".overlay-back").hide();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log('---FAILED---');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log('---FAILED---');
                
                d.resolve({
                    status : 'ERROR',
                    message : errorThrown
                });
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

        var transaction_number = GetURLParameter('transaction_number');
        var id = GetURLParameter('id');
        var sent = GetURLParameter('sent');

        var load_table = function(table_id, api){
            $(`#${table_id} .table_head`).DataTable().destroy();
            $(`#${table_id} .table_body`).empty();

            __executeExternalGet(api).done(function (result) {
                if (result.status != "ERROR") {
                    result.files.forEach(function(data){
                        let actions = "<a href="+api+'8080/file/view/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-view' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a> <a href="+api+'8080/file/download/'+data.id+" target='_blank'><button class=' btn btn-primary btn-sm btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a>";
                        $(`#${table_id}`).append("<tr>"+
                            "<td>"+data.id+"</td>"+
                            "<td>"+data.fileName+"</td>"+
                            "<td>"+data.version+"</td>"+
                            "<td>"+"N/A"+"</td>"+
                            "<td class='actions'> "+actions+"")
                    });
                    $(document).ready(function () {
                        $(`#${table_id} .table_head tbody tr`).each(function (idx) {
                           $(this).children("td:eq(0)").html(idx + 1);
                        });
                        var table = $(`#${table_id} .table_head`).DataTable({
                            order: [[0, 'asc']],
                            autoWidth: false,
                            fixedColumns: true,
                            "columnDefs": [
                                { "width": "20%", "targets": 5 }
                            ]
                        });
                        $(`#${table_id}`).on('shown.bs.tab', function () {
                            table.columns.adjust();
                        });
                        // $('.dataTables_length').addClass('bs-select');
                    });               
                }
            })
        }

        var __fields = function(){
            if(sent){
                $(".btn-forward").hide();
                $(".btn-return").hide();
                $(".btn-upload").hide();
                $(".pdl_routing_breadcrumbs").unbind("click").on("click", function(){
                    window.location.href=api+"/pis/pdl-sent";
                })
            } else {
                var roleName = localStorage.getItem("userRole")
                if (roleName === "CLERK ACCOUNT") {
                    $(".btn-forward").hide();
                    $(".btn-return").show();
                    $(".btn-upload").hide();
                    $(".btn-create").show();
                } else {
                    $(".btn-forward").show();
                    $(".btn-return").show();
                    $(".btn-upload").show();
                    $(".btn-create").hide();
                }
                $(".pdl_routing_breadcrumbs").unbind("click").on("click", function(){
                    window.location.href=api+"/pis/pdl-receive";
                })
            }
            __executeExternalGet('8000/workflow/'+id).done(function (result) {
                var result = result.response;
                console.log(result)
                if (result.status != "ERROR") {
                    __executeExternalGet('8000/petitioner/'+result.petitionerId).done(function (resultPetitioner) {
                        var resultPetitioner = resultPetitioner.response;
                        console.log(resultPetitioner)
                        $(".firstName").text(resultPetitioner.firstName)
                        $(".middleName").text(resultPetitioner.middleName === "" ? "N/A" : resultPetitioner.middleName)
                        $(".lastName").text(resultPetitioner.lastName)
                        $(".aliasName").text(resultPetitioner.alias === "" ? "N/A" : resultPetitioner.alias)
                        var criminalCases = JSON.parse(resultPetitioner.criminalCaseNo);
                        if (Array.isArray(criminalCases)) {
                            // Join the criminal case numbers with <br> and display them
                            var caseNumbers = criminalCases.map(item => item.criminal_cases_number).join('<br>');
                            $(".criminalCaseNumber").html(caseNumbers);
                        }
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
                        window.location.href=api+"/pis/pdl-upload?transaction_number="+transaction_number+"&id="+result.id+"&petitionerId="+result.petitionerId;
                    })
                    $(".btn-create").unbind("click").on("click", function(){
                        // window.location.href=api+"/pis/pdl-upload?transaction_number="+transaction_number+"&id="+result.id+"&petitionerId="+result.petitionerId;
                        $("#createModal").modal("show")
                    })
                    $("#createProbation").unbind("click").on("click", function(){
                        window.location.href=api+"/pis/new_client?petitionerId=" + result.petitionerId + "&transaction_number=" + transaction_number;
                    })
                    $("#createParole").unbind("click").on("click", function(){
                        window.location.href=api+"/pis/client_list_parole_and_pardone";
                    })

                    var api_table = `8080/file/list/investigation/${result.petitionerId}/0`
                    load_table('inv_table', api_table)

                    $("#inv_tab").unbind("click").on("click", function(){
                        console.log("clicked inv")
                        var api_table = `8080/file/list/investigation/${result.petitionerId}/0`
                        load_table('inv_table', api_table)
                    })
                    $("#sup_tab").unbind("click").on("click", function(){
                        console.log("clicked sup")
                        var api_table = `8080/file/list/supervision/${result.petitionerId}/0`
                        load_table('sup_table', api_table)
                    })
                    $("#rehab_tab").unbind("click").on("click", function(){
                        console.log("clicked rehab")
                        var api_table = `8080/file/list/rehabilitation/${result.petitionerId}/0`
                        load_table('rehab_table', api_table)
                    })
                    $("#oth_tab").unbind("click").on("click", function(){
                        console.log("clicked oth")
                        var api_table = `8080/file/list/others/${result.petitionerId}/0`
                        load_table('oth_table', api_table)
                    })
                }else{
                    alert("failed")
                }
            })
            console.log("view history")
        }

        var historyBody = function () {
            __executeExternalGet('8000/workflow/history/'+transaction_number).done(function (result) {
                var result = result.response
                // console.log(result)
                result.forEach(function(data, index){
                    console.log(data)
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
                        <div class="row" style="margin-bottom: 20px">
                            <div class="routing-history-container mx-3">
                                <div class="col col-md-12"><span class="user">${userName}</span><span> forwarded </span><span>[${data.remarks}]</span> <span> to: </span>
                                <span>${data.receiverName} </span></div>
                            </div>
                            <div class="routing-details-container mx-3">
                                <div class="col col-md-12">
                                    <span class="remarks" id="remarksText_${data.id}" style="display:block">${data.details}</span>
                                </div>
                            </div>
                            <div class="date-footer-container mx-3">
                                <div class="col col-md-12">
                                    <span style="font-size: 12px; color: #808080;">Created at ${formattedDateTime}</span>
                                </div>
                            </div>
                        </div>

                    `)

                    var remarksText = document.getElementById(`remarksText_${data.id}`);
                    
                    if (remarksText.innerText.length > 20) {

                        const fullText = remarksText.innerText;
                        let truncatedText = remarksText.innerText.substring(0, 20);
                        
                        // Create a new HTML structure with separate span for additional text
                        remarksText.innerHTML = `
                            <span class="truncated">${truncatedText}...</span>
                            <span class="extraText float-right" id="extraText_${data.id}" >See More</span>
                        `;

                        // Attach event listeners to a static parent element, such as the document or a container element
                        $(document).on("click", `#extraText_${data.id}`, function() {
                            // Show the full text and change the link to "See Less"
                            remarksText.innerHTML = `
                                <span class="fullText">${fullText}</span>
                                <span class="seeLessLinkExtra float-right" id="less_${data.id}">See Less</span>
                            `;
                        });

                        $(document).on("click", `#less_${data.id}`, function() {
                            // Collapse the text back to truncated version
                            remarksText.innerHTML = `
                                <span class="truncated">${truncatedText}...</span>
                                <span class="extraText float-right" id="extraText_${data.id}">See More</span>
                            `;
                        });
                    }
                });
            })
        }
        // __fields();




        $(document).ready(function(){
            // ___updateStatusUponViewingDocket();
            __fields();
            historyBody();
            // toggleRemarks();
        })

    } )( jQuery );