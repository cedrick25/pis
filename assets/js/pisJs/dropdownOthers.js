/**
 * Show a same-column specify field when a dropdown value is Others.
 * Treats others / other / OTHER / OTHERS as Others.
 */
(function (global, $) {
    "use strict";

    function isOthersValue(val) {
        if (val === null || val === undefined) return false;
        var t = String(val).trim().toLowerCase();
        return t === "others" || t === "other";
    }

    function readOthersText($input) {
        if (!$input || !$input.length) return "";
        return String($input.val() || "").trim();
    }

    function othersWrap($select) {
        return $select.closest(".form-group").children(".dropdown-others-wrap").first();
    }

    function syncOthersField($select, clearWhenHidden) {
        var $wrap = othersWrap($select);
        if (!$wrap.length) return;
        if (isOthersValue($select.val())) {
            $wrap.show();
            return;
        }
        $wrap.hide();
        if (clearWhenHidden) {
            $wrap.find("input, textarea").val("");
        }
    }

    function eachOthersSelect($root, fn) {
        $root.find("select").each(function () {
            var $select = $(this);
            if (!othersWrap($select).length) return;
            fn($select);
        });
    }

    function bindDropdownOthers(root) {
        var $root = root ? $(root) : $(document);
        eachOthersSelect($root, function ($select) {
            syncOthersField($select, false);
            $select.off(".dropdownOthers").on(
                "change.dropdownOthers select2:select.dropdownOthers",
                function () {
                    syncOthersField($(this), true);
                }
            );
        });
    }

    function refreshDropdownOthers(root) {
        var $root = root ? $(root) : $(document);
        eachOthersSelect($root, function ($select) {
            syncOthersField($select, false);
        });
    }

    function collectOthers($select, $input) {
        if (!isOthersValue($select.val())) return "";
        return readOthersText($input);
    }

    global.DropdownOthers = {
        isOthersValue: isOthersValue,
        readOthersText: readOthersText,
        collect: collectOthers,
        bind: bindDropdownOthers,
        refresh: refreshDropdownOthers,
        sync: syncOthersField
    };

    $(function () {
        bindDropdownOthers(document);
    });
})(window, jQuery);
