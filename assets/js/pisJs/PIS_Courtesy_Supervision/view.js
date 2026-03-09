    ( function ( $ ) {
        var api = localStorage.getItem('api');
        var ___ctx = api;
        console.log(___ctx)

        var __getContext = function() {
            return ___ctx;
        };

        var get = function (path) {
            return $.ajax({
                method: "GET",
                url: api + path,
                dataType: "json"
            }).then(function (data) { return data; }, function () {
                return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
            });
        };

        var post = function (path, payload) {
            return $.ajax({
                method: "POST",
                url: api + path,
                dataType: "json",
                headers: { 'Content-Type': 'application/json' },
                data: payload
            }).then(function (data) { return data; }, function () {
                return $.Deferred().resolve({ status: 'ERROR', message: 'Request failed' }).promise();
            });
        };

        function getUrlParam(name) {
            var params = {};
            window.location.search.substring(1).split('&').forEach(function (p) {
                var kv = p.split('=');
                if (kv[0]) params[kv[0]] = decodeURIComponent(kv[1] || '');
            });
            return params[name];
        }

        var docket_number = getUrlParam('docket_number');
        var petitionerId = getUrlParam('petitionerId');
        var officeId = getUrlParam('officeId') || $.cookie("field_office_id");

        $('.card-body').find('input, select, button').prop('disabled', true);
        // $('.btn-confirm').prop('disabled', true);

        // Load referring office dropdown
        get('8088/department/list').done(function (result) {
            var list = Array.isArray(result) ? result : (result.content || result.data || []);
            if (result && result.status != "ERROR" && list.length) {
                $('.ref_office').append("<option value=''>Select Referring Office</option>");
                list.forEach(function (d) {
                    $('.ref_office').append("<option value='" + d.id + "'>" + d.name + "</option>");
                });
            }
        });
        function populateForm(data) {
            if (!data) return;
            $(".docket_number").val(data.docketNumber || '');
            $(".cc_num").val(data.criminalCaseNumber || '');
            $(".court_origin").val(data.courtOfOrigin || '');
            $(".date_rcv_from_ppo").val(data.receivedDateByPPO || '');
            $(".sup_officer").val(data.supervisingOfficer || '');
            $(".period_supervision").val(data.periodOfSupervision || data.periodOfCourtesySupervision || '');
            $(".case_classification").val(data.caseClassification || '');
            $(".date_completed_and_returned").val(data.dateCICAR || data.dateReturned || data.dateCompletedAndReturned || '');

            var refId = data.referringOfficeId || data.referringOfficeCourtesySupId;
            if (refId) $(".ref_office").val(refId);

            var cid = data.clientId || petitionerId;
            let name = "";
            if (!data.fullName) {
                name = `${data.firstName} ${data.middleName} ${data.lastName} ${data.suffixName}`
            } else {
                name = data.fullName
            }
            $(".client").val(name)
        }

        function enableForm(keepReadonly) {
            $("#spinner_update").length && $("#spinner_update").hide();
            $('.card-body').find('input, select, button').prop('disabled', false);
            $('.btn-confirm').prop('disabled', false);
            if (keepReadonly) {
                $('.docket_number').prop('disabled', true);
                $('.client').prop('disabled', true);
            }
        }

        // Load docket data
        if (docket_number && officeId) {
            $("#spinner_update").length && $("#spinner_update").show();
            get('8000/docketbook/' + docket_number + '/' + officeId).done(function (res) {
                var data = res.response || res;
                if (res.status === "ERROR" || !data) {
                    // enableForm(false);
                    alert(res.message || "Failed to load data");
                    return;
                }
                populateForm(data);
                // enableForm(false);
                // Save handler
                // setTimeout(function () { enableForm(false); }, 300);
            });
        } else {
            // enableForm(false);
        }

        // setTimeout(function () {
        //     $("#spinner_update").hide();
        //     updateProbationInvestigation();
        // }, 3000);

    } )( jQuery );