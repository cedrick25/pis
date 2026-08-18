/**
 * Convert labeled table action buttons into compact icon-only controls
 * with hover tooltips (Bootstrap tooltip when available, else title).
 */
(function (window, $) {
    'use strict';

    if (!$ || !$.fn) {
        return;
    }

    var CLASS_LABELS = {
        btn_view: 'View',
        'btn-view': 'View',
        btn_update: 'Update',
        'btn-update': 'Update',
        btn_attachments: 'Attachments',
        btn_upload: 'Attachments',
        'btn-upload': 'Attachments',
        btn_remove: 'Remove',
        'btn-remove': 'Remove',
        removeUser: 'Remove',
        'btn-download': 'Download',
        btn_download: 'Download',
        btn_worksheet: 'Worksheet',
        btn_psir: 'PSIR',
        btn_add: 'Add',
        btn_grant: 'Grant Permission',
        btn_grant_update: 'Update Permission',
        btn_lift: 'Lift',
        btn_deact: 'Deactivate',
        btn_activate: 'Activate',
        btn_restrict: 'Restrict',
        btn_viewWorksheet: 'Worksheet',
        btn_viewDocuments: 'Documents',
        btn_viewClient: 'Client Info',
        btn_forward: 'Forward',
        'btn-forward': 'Forward'
    };

    function normalizeLabel(raw) {
        if (raw == null) {
            return '';
        }
        return String(raw).replace(/\s+/g, ' ').trim();
    }

    function labelFromClassList(el) {
        if (!el || !el.classList) {
            return '';
        }
        var classes = el.classList;
        for (var i = 0; i < classes.length; i++) {
            if (CLASS_LABELS[classes[i]]) {
                return CLASS_LABELS[classes[i]];
            }
        }
        return '';
    }

    function resolveLabel($btn) {
        var fromTitle = normalizeLabel($btn.attr('title') || $btn.attr('data-original-title'));
        if (fromTitle) {
            return fromTitle;
        }
        var fromAria = normalizeLabel($btn.attr('aria-label'));
        if (fromAria) {
            // Prefer short verb when aria is long ("View docket PI-...")
            if (/^view\b/i.test(fromAria)) {
                return 'View';
            }
            if (/^update\b/i.test(fromAria)) {
                return 'Update';
            }
            if (/^attachment/i.test(fromAria)) {
                return 'Attachments';
            }
            if (/^remove\b/i.test(fromAria)) {
                return 'Remove';
            }
            if (/^download\b/i.test(fromAria)) {
                return 'Download';
            }
            if (/^upload\b/i.test(fromAria)) {
                return 'Upload';
            }
            if (/^forward\b/i.test(fromAria)) {
                return 'Forward';
            }
            if (/^edit\b/i.test(fromAria)) {
                return 'Edit';
            }
        }
        var fromClass = labelFromClassList($btn.get(0));
        if (fromClass) {
            return fromClass;
        }
        return normalizeLabel($btn.text());
    }

    function hasActionIcon($btn) {
        return $btn.find('i.fa, i[class*="fa-"], .fa').length > 0;
    }

    function stripButtonText($btn) {
        $btn.contents().each(function () {
            if (this.nodeType === 3) {
                // text node (e.g. " View")
                if (normalizeLabel(this.nodeValue) !== '') {
                    this.parentNode.removeChild(this);
                }
            }
        });
        $btn.find('span').each(function () {
            var $span = $(this);
            if ($span.is('.fa, [class*="fa-"]') || $span.find('.fa, [class*="fa-"]').length) {
                return;
            }
            var text = normalizeLabel($span.text());
            if (text) {
                $span.addClass('pis-action-label').attr('aria-hidden', 'true');
            }
        });
    }

    function disposeTooltip($btn) {
        if ($btn.data('bs.tooltip') || $btn.data('tooltip')) {
            try {
                $btn.tooltip('dispose');
            } catch (e1) {
                try {
                    $btn.tooltip('destroy');
                } catch (e2) {
                    /* ignore */
                }
            }
        }
    }

    function initTooltip($btn, label) {
        if (!label || !$.fn.tooltip) {
            return;
        }
        disposeTooltip($btn);
        $btn.attr('title', label);
        $btn.tooltip({
            container: 'body',
            placement: 'top',
            trigger: 'hover',
            title: label,
            // Avoid clashing with data-toggle="modal"
            boundary: 'window'
        });
    }

    function enhanceButton(btn) {
        var $btn = $(btn);
        if (!$btn.length || $btn.data('pisActionIconified')) {
            return;
        }
        if (!$btn.is('button, a.btn, .btn')) {
            return;
        }
        if (!hasActionIcon($btn)) {
            return;
        }

        var label = resolveLabel($btn);
        if (!label) {
            return;
        }

        stripButtonText($btn);
        $btn.addClass('pis-action-btn');
        $btn.closest('td').addClass('pis-actions-col');
        $btn.attr('title', label);
        if (!$btn.attr('aria-label')) {
            $btn.attr('aria-label', label);
        }
        initTooltip($btn, label);
        $btn.data('pisActionIconified', true);
    }

    function enhanceTableActionButtons(root) {
        var $root = root ? $(root) : $(document);
        var $buttons = $root.find(
            'table td .btn.btn-sm, table td button.btn, table td a.btn, ' +
            '.table td .btn.btn-sm, .table td button.btn, .table td a.btn'
        );
        $buttons.each(function () {
            enhanceButton(this);
        });
    }

    function adjustActionColumnWidths(tableNode) {
        try {
            if (!$.fn.DataTable || !tableNode) {
                return;
            }
            if ($.fn.DataTable.isDataTable(tableNode)) {
                $(tableNode).DataTable().columns.adjust();
            }
        } catch (e) {
            /* ignore */
        }
    }

    function scheduleEnhance(root) {
        window.clearTimeout(scheduleEnhance._timer);
        // Run ASAP so tooltips attach without waiting; CSS already hides labels
        scheduleEnhance._timer = window.setTimeout(function () {
            enhanceTableActionButtons(root || document);
        }, 0);
    }

    function bindDataTables() {
        $(document)
            .off('draw.dt.pisActionIcons')
            .on('draw.dt.pisActionIcons', function (e) {
                enhanceTableActionButtons(e.target);
                adjustActionColumnWidths(e.target);
            });
    }

    function bindPermissionHook() {
        var original = window.applyPermissionVisibility;
        if (typeof original !== 'function' || original.__pisActionIconsWrapped) {
            return;
        }
        var wrapped = function () {
            var result = original.apply(this, arguments);
            enhanceTableActionButtons(document);
            return result;
        };
        wrapped.__pisActionIconsWrapped = true;
        window.applyPermissionVisibility = wrapped;
        window.buttonVisibility = wrapped;
    }

    // Run as early as possible (script is at end of body; DOM is largely ready)
    bindDataTables();
    if (document.readyState === 'loading') {
        $(function () {
            bindPermissionHook();
            enhanceTableActionButtons(document);
        });
    } else {
        bindPermissionHook();
        enhanceTableActionButtons(document);
    }

    $(function () {
        bindPermissionHook();
        enhanceTableActionButtons(document);

        // Catch late DataTable / AJAX renders
        if (window.MutationObserver) {
            var observer = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var nodes = mutations[i].addedNodes;
                    if (!nodes || !nodes.length) {
                        continue;
                    }
                    for (var j = 0; j < nodes.length; j++) {
                        var node = nodes[j];
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        if (
                            (node.matches && (node.matches('table, tr, td, .btn') || node.querySelector('table td .btn, td .btn'))) ||
                            (node.closest && node.closest('table'))
                        ) {
                            scheduleEnhance(document);
                            return;
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });

    window.enhanceTableActionButtons = enhanceTableActionButtons;
})(window, window.jQuery);
