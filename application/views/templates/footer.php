    

    <script src="assets/js/jquery-3.2.0.min.js"></script>
    <!-- <script src="vendors/jquery/dist/jquery.min.js"></script> -->
    <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="vendors/jqvmap/dist/jquery.vmap.min.js"></script>
    <script src="vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
    <script src="vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>

    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="assets/js/init-scripts/data-table/datatables-init.js"></script>
    <script>
    (function ($) {
        if (!$ || !$.fn || !$.fn.dataTable) {
            return;
        }
        // Site-wide: no column sorting; headers stay plain left-aligned labels
        $.extend(true, $.fn.dataTable.defaults, {
            ordering: false,
            order: []
        });
    })(window.jQuery);
    </script>

    <script src="assets/js/moment.min.js"></script>
    <!-- <script src="assets/js/bootstrap-datetimepicker.min.js"></script> -->
    <script src="assets/js/select2.min.js"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/pisJs/tableActionIcons.js"></script>
    <script src="assets/js/webcam.min.js"></script>
    <script src="assets/js/webcam.js"></script>
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/jspdf.plugin.autotable.js"></script>
    

    <script type="text/javascript">
    ( function ( $ ) {
        $(document).ready(function() {
            $('.select2').select2({
                // dropdownParent: $('.modal'),
                width: '100%',
            });
        });
        // Prefer values injected by header.php (HTTPS-ready). Fall back for older pages.
        // Path style: https://host/8088/...  Port style: https://host:8088/...
        // Auto (when header unset): localhost / private LAN -> port style; else proxy path style.
        var isLocalApiHost = function (hostname) {
            hostname = String(hostname || '').toLowerCase().replace(/^\[|\]$/g, '');
            if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
                return true;
            }
            if (hostname.slice(-6) === '.local') {
                return true;
            }
            if (/^10\.\d+\.\d+\.\d+$/.test(hostname) || /^192\.168\.\d+\.\d+$/.test(hostname)) {
                return true;
            }
            if (/^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(hostname)) {
                return true;
            }
            return false;
        };
        var usePathStyle = (typeof window.__PIS_API_PATH_STYLE === 'boolean')
            ? window.__PIS_API_PATH_STYLE
            : !isLocalApiHost(window.location.hostname);
        var apiBase = (typeof window.__PIS_API_BASE === 'string' && window.__PIS_API_BASE)
            ? window.__PIS_API_BASE
            : (window.location.protocol + '//' + window.location.hostname + (usePathStyle ? '/' : ':'));
        localStorage.setItem('api', apiBase);
        var api = localStorage.getItem('api');

        var ___ctx = api;

        var __setContext = function(newctx) {
            ___ctx = newctx;
        };

        var __getContext = function() {
            return ___ctx;
        };

        if (window.__PIS_OFFLINE_MODE && typeof $.ajaxPrefilter === 'function') {
            $.ajaxPrefilter(function (options) {
                if (!options || !options.url) {
                    return;
                }
                var rewritten = typeof window.__pisRewriteOfflineDocketListUrl === 'function'
                    ? window.__pisRewriteOfflineDocketListUrl(options.url)
                    : null;
                if (rewritten) {
                    options.url = rewritten;
                }
            });
        }

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


        /**
         * Permission gating via data-permission="can_*" (not CSS classes).
         * Hide all marked elements first, then show only granted ones.
         */
        function getStoredPermissions() {
            var raw = localStorage.getItem('permission');
            if (!raw) {
                return null;
            }
            try {
                var data = JSON.parse(raw);
                return Array.isArray(data) ? data : null;
            } catch (e) {
                return null;
            }
        }

        function hasAnyGrantedPermission(data) {
            data = data || getStoredPermissions();
            if (!data || !data.length) {
                return false;
            }
            return data.some(function (row) {
                return row && row.detail && !!row.value;
            });
        }

        function isNoPermissionPage() {
            var path = String(window.location.pathname || '');
            return /\/no_permission\/?$/.test(path) || path.indexOf('no_permission') !== -1;
        }

        function isAuthPage() {
            var path = String(window.location.pathname || '').toLowerCase();
            return /(^|\/)(login|index\.php\/?|pis\/?)$/.test(path) || path.indexOf('/login') !== -1;
        }

        function pisAppUrl(slug) {
            var base = (typeof window.__PIS_BASE_URL === 'string' && window.__PIS_BASE_URL)
                ? window.__PIS_BASE_URL
                : (window.location.protocol + '//' + window.location.host + '/pis/');
            if (base.slice(-1) !== '/') {
                base += '/';
            }
            return base + String(slug || '').replace(/^\//, '');
        }

        function redirectIfNoRolePermissions() {
            if (isAuthPage() || isNoPermissionPage()) {
                return;
            }
            var data = getStoredPermissions();
            // Only redirect when permission payload exists but nothing is granted.
            if (data === null) {
                return;
            }
            if (!hasAnyGrantedPermission(data)) {
                window.location.replace(pisAppUrl('no_permission'));
            }
        }

        function showMissingActionPermissionNotice() {
            if (isNoPermissionPage() || isAuthPage()) {
                return;
            }
            var $actionBtns = $('table [data-permission^="can_view_"], table [data-permission^="can_edit_"], table [data-permission^="can_delete_"], table [data-permission^="can_attachments_"], table [data-permission^="can_create_"], table [data-permission^="can_forward_"]');
            if (!$actionBtns.length) {
                $('#pisNoActionPermissionAlert').remove();
                $('.pis-no-action-perm').remove();
                return;
            }
            var anyVisible = $actionBtns.filter(':visible').length > 0;
            if (anyVisible) {
                $('#pisNoActionPermissionAlert').remove();
                $('.pis-no-action-perm').remove();
                return;
            }

            if (!$('#pisNoActionPermissionAlert').length) {
                var $host = $('.content.mt-3').first();
                if ($host.length) {
                    $host.prepend(
                        '<div id="pisNoActionPermissionAlert" class="alert alert-warning" role="alert" style="margin: 0 15px 15px;">' +
                        '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' +
                        '<strong>No action permissions for this page.</strong> ' +
                        'Your role can open this screen, but View / Update / Attachments / Delete (or other actions) are not assigned. ' +
                        'Ask an administrator to grant the needed permissions in <strong>User Roles → Grant Permission</strong>, then sign out and sign in again.' +
                        '</div>'
                    );
                }
            }

            $('table tbody tr').each(function () {
                var $row = $(this);
                var $rowBtns = $row.find('[data-permission^="can_view_"], [data-permission^="can_edit_"], [data-permission^="can_delete_"], [data-permission^="can_attachments_"], [data-permission^="can_create_"], [data-permission^="can_forward_"]');
                if (!$rowBtns.length) {
                    return;
                }
                if ($rowBtns.filter(':visible').length === 0 && !$row.find('.pis-no-action-perm').length) {
                    var $cell = $rowBtns.first().closest('td');
                    if ($cell.length) {
                        $cell.append('<span class="pis-no-action-perm text-muted small">No action permission assigned</span>');
                    }
                }
            });
        }

        function applyPermissionVisibility() {
            var data = getStoredPermissions();
            $('[data-permission]').hide();
            if (!data) {
                redirectIfNoRolePermissions();
                return;
            }
            data.forEach(function (row) {
                if (!row || !row.detail) {
                    return;
                }
                var $el = $('[data-permission="' + row.detail + '"]');
                if (row.value) {
                    $el.show();
                } else {
                    $el.hide();
                }
            });
            redirectIfNoRolePermissions();
            showMissingActionPermissionNotice();
        }

        window.applyPermissionVisibility = applyPermissionVisibility;
        window.buttonVisibility = applyPermissionVisibility;
        window.hasAnyGrantedPermission = hasAnyGrantedPermission;
        applyPermissionVisibility();

        function applyUserSession(result) {
            if (!result || result.status === 'ERROR') {
                return false;
            }
            console.log("====this is user logged in=====");
            console.log(result);
            console.log("====this is user logged in=====");
            $(".f_name").html(result.username);
            var field_office_id = result.departmentId;
            var role_id = result.roleId;
            var departmentName = result.departmentName;
            var managerId = null;
            try {
                managerId = result.managerId ? JSON.parse(result.managerId) : null;
            } catch (e) {
                managerId = null;
            }
            var name = `${result.firstName} ${result.middleName ?? ""} ${result.lastName} ${result.suffix ?? ""}`;
            localStorage.setItem("userName", name);
            localStorage.setItem('managerId', JSON.stringify(managerId));
            if (field_office_id != null && String(field_office_id).trim() !== '') {
                $.cookie("field_office_id", field_office_id, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
            }
            if (role_id != null) {
                $.cookie("role_id", role_id, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
            }
            if (departmentName != null) {
                $.cookie("departmentName", departmentName, window.__PIS_COOKIE_OPTS ? window.__PIS_COOKIE_OPTS() : { path: '/' });
            }
            if (result.roleId == "1") {
                $('[data-permission="can_access_organization"]').show();
            }
            $(document).trigger('pis:userSessionReady', [result]);
            return field_office_id != null && String(field_office_id).trim() !== '';
        }

        window.__pisEnsureUserSession = function () {
            if (window.__pisUserSessionPromise) {
                return window.__pisUserSessionPromise;
            }
            var d = $.Deferred();
            window.__pisUserSessionPromise = d.promise();

            var existingFo = $.cookie('field_office_id');
            if (existingFo != null && String(existingFo).trim() !== '') {
                d.resolve({ fieldOfficeId: existingFo });
                return d.promise();
            }

            var uuid = $.cookie('uuid');
            if (uuid == null || String(uuid).trim() === '') {
                d.reject({ reason: 'no_uuid' });
                return d.promise();
            }

            __executeExternalGet('8088/user/' + uuid).done(function (result) {
                if (applyUserSession(result)) {
                    d.resolve(result);
                } else {
                    d.reject({ reason: 'no_field_office', result: result });
                }
            });

            return d.promise();
        };

        if ($.cookie("uuid") != undefined) {
            window.__pisEnsureUserSession();
        } else {
            console.log("no user logged in");
        }
        $(".btn_logout").unbind("click").on("click", function(){
            console.log('clicked')
            $.removeCookie('uuid');
            $.removeCookie('field_office_id');
            $.removeCookie('role_id');
            $.removeCookie('departmentName');
            window.__pisUserSessionPromise = null;
            localStorage.clear();
            setTimeout(function () {
                window.location.href="./"
            },500);
        })
                
        $('.form_capitalized').keyup(function(event) {
            var textBox = event.target;
            var start = textBox.selectionStart;
            var end = textBox.selectionEnd;
            textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1);
            textBox.setSelectionRange(start, end);                  
        });
        
    })
( jQuery );
    </script>
    <script src="assets/js/pisJs/docketOfficeFilter.js"></script>
