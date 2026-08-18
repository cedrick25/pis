(function (window, $) {
    var SELECT_ID = 'pisDocketOfficeFilter';
    var STYLE_ID = 'pisDocketOfficeFilterStyle';

    function isDocketAdmin() {
        return String($.cookie('role_id') || '') === '1';
    }

    function getCookieOfficeId() {
        var v = $.cookie('field_office_id');
        return v != null && String(v).trim() !== '' ? String(v).trim() : '';
    }

    function getSelectedDocketOfficeId() {
        if (isDocketAdmin()) {
            var $sel = $('#' + SELECT_ID);
            if ($sel.length) {
                var val = $sel.val();
                if (val != null && String(val).trim() !== '') {
                    return String(val).trim();
                }
            }
        }
        return getCookieOfficeId();
    }

    function docketListQuery(fieldOfficeId) {
        var officeId =
            fieldOfficeId != null && String(fieldOfficeId).trim() !== ''
                ? String(fieldOfficeId).trim()
                : getSelectedDocketOfficeId();
        var isAll = String(officeId).toUpperCase() === 'ALL';
        return {
            officeId: officeId,
            fieldOfficeId: isAll ? officeId : officeId,
            canSeeOtherOffices: isAll
        };
    }

    function queryParam(name) {
        try {
            var params = new URLSearchParams(window.location.search || '');
            var val = params.get(name);
            return val != null ? String(val).trim() : '';
        } catch (e) {
            return '';
        }
    }

    function resolvePageOfficeId() {
        var fromUrl = queryParam('officeId') || queryParam('office_id');
        if (fromUrl && fromUrl.toUpperCase() !== 'ALL') {
            return fromUrl;
        }
        return getCookieOfficeId();
    }

    function resolveListOfficeId(callback) {
        var selected = getSelectedDocketOfficeId();
        if (selected) {
            callback(selected);
            return;
        }
        if (typeof window.__pisEnsureUserSession === 'function') {
            window.__pisEnsureUserSession()
                .done(function () {
                    callback(getSelectedDocketOfficeId() || getCookieOfficeId());
                })
                .fail(function () {
                    callback(null);
                });
            return;
        }
        callback(null);
    }

    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }
        var css =
            '.card-header:has(.pis-docket-office-filter){display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;}' +
            '.pis-docket-office-filter{display:flex;align-items:center;gap:.5rem;min-width:220px;}' +
            '.pis-docket-office-filter label{margin:0;white-space:nowrap;font-weight:600;}' +
            '.pis-docket-office-filter .select2-container{min-width:220px;}' +
            '.pis-docket-office-filter .select2{height:auto!important;}';
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function escapeAttr(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }

    function escapeText(str) {
        return $('<div>').text(str == null ? '' : str).html();
    }

    function departmentListUrl() {
        if (typeof window.pisApiUrl === 'function') {
            return window.pisApiUrl('8088/department/list');
        }
        var base = localStorage.getItem('api') || window.__PIS_API_BASE || '';
        var b = String(base).replace(/\/+$/, '');
        if (b.slice(-1) === ':') {
            return b + '8088/department/list';
        }
        return b + '/8088/department/list';
    }

    function mountDocketOfficeFilter(headerSelector, onChange) {
        if (!isDocketAdmin()) {
            return;
        }
        ensureStyles();
        if ($('#' + SELECT_ID).length) {
            return;
        }
        var $header = headerSelector ? $(headerSelector).first() : $();
        if (!$header.length) {
            $header = $('.card-header').first();
        }
        if (!$header.length) {
            return;
        }

        var defaultOffice = getCookieOfficeId();
        var $wrap = $('<div class="pis-docket-office-filter"></div>');
        $wrap.append('<label for="' + SELECT_ID + '">Field Office</label>');
        var $sel = $(
            '<select id="' +
                SELECT_ID +
                '" class="form-control form-control-sm" aria-label="Field office"></select>'
        );
        $sel.append('<option value="ALL">All Field Offices</option>');
        $sel.append('<option value="" disabled>Loading…</option>');
        $wrap.append($sel);
        $header.append($wrap);

        $.ajax({
            url: departmentListUrl(),
            type: 'GET',
            dataType: 'json'
        }).done(function (result) {
            $sel.find('option[disabled]').remove();
            if (!result || result.status === 'ERROR' || !$.isArray(result)) {
                return;
            }
            result.forEach(function (dept) {
                if (!dept || dept.id == null) {
                    return;
                }
                var id = String(dept.id);
                $sel.append(
                    '<option value="' +
                        escapeAttr(id) +
                        '">' +
                        escapeText(dept.name || id) +
                        '</option>'
                );
            });
            if (defaultOffice && $sel.find('option[value="' + defaultOffice.replace(/"/g, '') + '"]').length) {
                $sel.val(defaultOffice);
            }
            if ($.fn.select2) {
                $sel.select2({
                    width: '260px',
                    dropdownAutoWidth: true
                });
            }
            $sel.on('change', function () {
                if (typeof onChange === 'function') {
                    onChange($sel.val());
                }
            });
        });
    }

    window.PisDocketOfficeFilter = {
        isDocketAdmin: isDocketAdmin,
        getCookieOfficeId: getCookieOfficeId,
        getSelectedDocketOfficeId: getSelectedDocketOfficeId,
        docketListQuery: docketListQuery,
        resolvePageOfficeId: resolvePageOfficeId,
        resolveListOfficeId: resolveListOfficeId,
        mountDocketOfficeFilter: mountDocketOfficeFilter
    };
})(window, jQuery);
