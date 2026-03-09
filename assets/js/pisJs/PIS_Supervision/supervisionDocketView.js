    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var __executeExternalGet = function(path, customLoader) {
            path = __getContext() + path;
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

        $('.card-body').find('input, select, button').prop('disabled', true);

        var docket_number = GetURLParameter('docket_number');

        function updateForms(result) {
            docketData = result; // Store for payload (preserves fields not in form)
            // Main section
            $(".docketNum_update").val(result.docketNumber || '');
            if ($('.pb_client_sup').is('select')) {
                $(".pb_client_sup").val(result.clientId || '').trigger("change");
            } else {
                $(".pb_client_sup").val(result.fullName || '').trigger("change");
            }

            // For Probation Supervision Referrals Received (#received)
            $(".alias").val(result.alias || '');
            $(".referral_type").val(result.referralType || '').trigger("change");
            $(".cc_no").val(result.criminalCaseNumber || '');
            $(".court_origin").val(result.courtOfOrigin || '');
            $(".case_classification").val(result.caseClassification || '').trigger("change");
            $(".date_rcv_ppo").val(result.receivedDateByPPO || '');
            $(".supervising_officer").val(result.supervisingOfficer || '');
            $(".prob_start_date").val(result.probationStartDate || '');
            $(".prob_end_date").val(result.probationEndDate || '');

            // For Probation Supervision Cases Acted Upon (#casesActedUpon)
            $("#casesActedUpon .office_findings").val(result.officeFindingsForActedUpon || '').trigger("change");
            $("#casesActedUpon .other_reasons_of_revocation").val(result.specifyOtherReasonsRevocation || '');
            $("#casesActedUpon .court_probationer_transferred").val(result.specifyCourtPpoTransferred || '');
            $("#casesActedUpon .date_submitted_court").val(result.dateOrderReceivedFromTheCourt || result.dateCompletedAndReturned || '');

            // For Carry Over Probation Supervision Cases Pending Disposition (#carryOver)
            $("#carryOver .office_findings").val(result.officeFindingsForPendingDisposition || '').trigger("change");
            $("#carryOver .date_submitted_court").val(result.dateOrderReceivedFromTheCourt || result.dateCompletedAndReturned || '');
            $("#carryOver .supervising_officer_carry_over").val(result.supervisingOfficer || '');
            // Single sentence input
            if ($(".sentence").length) {
                $(".sentence").val(result.sentence || '');
            }
        }
        __executeExternalGet('8000/docketbook/'+docket_number+'/'+$.cookie("field_office_id")).done(function (result) {
            var result = result.response || result;
            if (result.status === "ERROR" || !result) {
                $("#spinner_update").hide();
                console.error('Failed to load docket:', result);
                return;
            }
            console.log(result);
            md = result.manualDocket === true;
            if (result.manualDocket === false){
                $('.manualProbStart').hide()
                $('.manualProbYear').hide()
                $('.manualProbMonth').hide()
                $('.manualProbDay').hide()
            }
            setTimeout(function () {
                $("#spinner_update").hide();
                $('.btn-confirm').prop('disabled', false);
                $('.docketNum_update').prop('disabled', true);
                updateForms(result);
            }, 3000);
        })
    } )( jQuery );