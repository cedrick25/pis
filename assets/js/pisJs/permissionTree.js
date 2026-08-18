/**
 * Grant-permission tree — ONLY modules/pages that appear in the live left-panel
 * and their row-action buttons. Unused historical Parole/Pardone docket menus
 * are intentionally omitted.
 */
(function (window) {
    'use strict';

    var ACTION_LABELS = {
        create: 'Create',
        view: 'View',
        edit: 'Update',
        delete: 'Delete',
        attachments: 'Attachments',
        forward: 'Forward',
        worksheet: 'Worksheet',
        psir: 'PSIR',
        generate_psir: 'Generate PSIR'
    };

    /** Optional `label` overrides DB name so the grant UI stays clear even if DB is stale. */
    var PERMISSION_TREE = [
        {
            detail: 'can_access_docketing_module',
            label: 'Docketing',
            children: [
                {
                    detail: 'can_access_docket_probation',
                    label: 'Probation',
                    children: [
                        {
                            detail: 'can_access_docket_probation_investigation',
                            label: 'Investigation',
                            children: [
                                'can_view_docket_probation_investigation',
                                'can_edit_docket_probation_investigation',
                                'can_attachments_docket_probation_investigation',
                                'can_delete_docket_probation_investigation'
                            ]
                        },
                        {
                            detail: 'can_access_docket_probation_courtesy_investigation',
                            label: 'Courtesy Investigation',
                            children: [
                                'can_view_docket_probation_courtesy_investigation',
                                'can_edit_docket_probation_courtesy_investigation',
                                'can_attachments_docket_probation_courtesy_investigation',
                                'can_delete_docket_probation_courtesy_investigation'
                            ]
                        },
                        {
                            detail: 'can_access_docket_probation_supervision',
                            label: 'Supervision',
                            children: [
                                'can_view_docket_probation_supervision',
                                'can_edit_docket_probation_supervision',
                                'can_attachments_docket_probation_supervision',
                                'can_delete_docket_probation_supervision'
                            ]
                        },
                        {
                            detail: 'can_access_docket_probation_courtesy_supervision',
                            label: 'Courtesy Supervision',
                            children: [
                                'can_view_docket_probation_courtesy_supervision',
                                'can_edit_docket_probation_courtesy_supervision',
                                'can_attachments_docket_probation_courtesy_supervision',
                                'can_delete_docket_probation_courtesy_supervision'
                            ]
                        }
                    ]
                },
                {
                    detail: 'can_access_docket_pre_parole',
                    label: 'Parole and Pardon',
                    children: [
                        {
                            detail: 'can_access_docket_pre_parole_investigation',
                            label: 'Investigation',
                            children: [
                                'can_view_docket_pre_parole_investigation',
                                'can_edit_docket_pre_parole_investigation',
                                'can_attachments_docket_pre_parole_investigation',
                                'can_delete_docket_pre_parole_investigation'
                            ]
                        },
                        {
                            detail: 'can_access_docket_pre_parole_courtesy_investigation',
                            label: 'Courtesy Investigation',
                            children: [
                                'can_view_docket_pre_parole_courtesy_investigation',
                                'can_edit_docket_pre_parole_courtesy_investigation',
                                'can_attachments_docket_pre_parole_courtesy_investigation',
                                'can_delete_docket_pre_parole_courtesy_investigation'
                            ]
                        },
                        {
                            detail: 'can_access_docket_pre_parole_supervision',
                            label: 'Supervision',
                            children: [
                                'can_view_docket_pre_parole_supervision',
                                'can_edit_docket_pre_parole_supervision',
                                'can_attachments_docket_pre_parole_supervision',
                                'can_delete_docket_pre_parole_supervision'
                            ]
                        },
                        {
                            detail: 'can_access_docket_pre_parole_courtesy_supervision',
                            label: 'Courtesy Supervision',
                            children: [
                                'can_view_docket_pre_parole_courtesy_supervision',
                                'can_edit_docket_pre_parole_courtesy_supervision',
                                'can_attachments_docket_pre_parole_courtesy_supervision',
                                'can_delete_docket_pre_parole_courtesy_supervision'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            detail: 'can_access_docket_routing_module',
            label: 'Docket Routing',
            children: [
                {
                    detail: 'can_access_docket_routing_module_csd',
                    label: 'Docket Routing (CSD)',
                    children: [
                        {
                            detail: 'can_access_docket_routing_probation',
                            label: 'Probation',
                            children: ['can_forward_docket_routing_probation']
                        },
                        {
                            detail: 'can_access_docket_routing_pre_parole',
                            label: 'Pre-Parole',
                            children: ['can_forward_docket_routing_pre_parole']
                        },
                        {
                            detail: 'can_access_docket_routing_parole',
                            label: 'Parole',
                            children: ['can_forward_docket_routing_parole']
                        },
                        {
                            detail: 'can_access_docket_routing_pardone',
                            label: 'Pardone',
                            children: ['can_forward_docket_routing_pardone']
                        }
                    ]
                },
                { detail: 'can_access_docket_routing_pdl', label: 'PDL Routing', children: [] },
                {
                    detail: 'can_access_docket_routing_sent',
                    label: 'Sent',
                    children: [
                        { detail: 'can_access_docket_routing_sent_probation', label: 'Probation' },
                        { detail: 'can_access_docket_routing_sent_pre_parole', label: 'Pre-Parole' },
                        { detail: 'can_access_docket_routing_sent_parole', label: 'Parole' },
                        { detail: 'can_access_docket_routing_sent_pardone', label: 'Pardone' },
                        { detail: 'can_access_docket_routing_sent_pdl', label: 'PDL' }
                    ]
                },
                {
                    detail: 'can_access_docket_routing_inbox',
                    label: 'Inbox',
                    children: [
                        { detail: 'can_access_docket_routing_inbox_probation', label: 'Probation' },
                        { detail: 'can_access_docket_routing_inbox_pre_parole', label: 'Pre-Parole' },
                        { detail: 'can_access_docket_routing_inbox_parole', label: 'Parole' },
                        { detail: 'can_access_docket_routing_inbox_pardone', label: 'Pardone' },
                        { detail: 'can_access_docket_routing_inbox_pdl', label: 'PDL' }
                    ]
                }
            ]
        },
        {
            detail: 'can_access_fact_sheet',
            label: 'Fact Sheet',
            children: [
                {
                    detail: 'can_access_fact_sheet_probation',
                    label: 'Probation',
                    children: [
                        'can_create_fact_sheet_probation',
                        'can_edit_fact_sheet_probation',
                        'can_attachments_fact_sheet_probation',
                        'can_worksheet_fact_sheet_probation',
                        'can_psir_fact_sheet_probation',
                        'can_generate_psir_fact_sheet_probation'
                    ]
                },
                {
                    detail: 'can_access_fact_sheet_parole_pardone',
                    label: 'Parole and Pardone',
                    children: [
                        'can_create_fact_sheet_parole_pardone',
                        'can_edit_fact_sheet_parole_pardone',
                        'can_attachments_fact_sheet_parole_pardone'
                    ]
                },
                {
                    detail: 'can_access_fact_sheet_pdl',
                    label: 'PDL',
                    children: [
                        'can_create_fact_sheet_pdl',
                        'can_edit_fact_sheet_pdl',
                        'can_view_fact_sheet_pdl',
                        'can_attachments_fact_sheet_pdl'
                    ]
                }
            ]
        },
        { detail: 'can_access_forms', label: 'Forms', children: [] },
        {
            detail: 'can_access_organization',
            label: 'My Organization',
            children: [
                { detail: 'can_access_organization_user_accounts', label: 'User Accounts' },
                { detail: 'can_access_organization_user_roles', label: 'User Roles' },
                { detail: 'can_access_organization_field_offices', label: 'Field Offices' },
                { detail: 'can_access_organization_regions', label: 'Regions' },
                { detail: 'can_access_organization_permissions', label: 'Permissions' }
            ]
        }
    ];

    function shortLabel(row, overrideLabel) {
        if (overrideLabel) {
            return overrideLabel;
        }
        if (!row) {
            return '';
        }
        if (String(row.type || '').toUpperCase() === 'ACTION' && row.detail) {
            var match = String(row.detail).match(/^can_(create|view|edit|delete|attachments|forward|worksheet|psir|generate_psir)_/);
            if (match && ACTION_LABELS[match[1]]) {
                return ACTION_LABELS[match[1]];
            }
        }
        return row.name || row.detail || '';
    }

    function indexByDetail(list) {
        var map = {};
        (list || []).forEach(function (item) {
            if (item && item.detail) {
                map[item.detail] = item;
            }
        });
        return map;
    }

    function resolveNode(node, byDetail) {
        if (typeof node === 'string') {
            var leaf = byDetail[node];
            if (!leaf) {
                return null;
            }
            return {
                id: leaf.id,
                label: shortLabel(leaf),
                permission: leaf.detail,
                action: leaf.type,
                subcategories: []
            };
        }
        var row = byDetail[node.detail];
        if (!row) {
            return null;
        }
        var children = [];
        (node.children || []).forEach(function (child) {
            var resolved = resolveNode(child, byDetail);
            if (resolved) {
                children.push(resolved);
            }
        });
        return {
            id: row.id,
            label: shortLabel(row, node.label),
            permission: row.detail,
            action: row.type,
            subcategories: children
        };
    }

    function buildPermissionTree(apiList) {
        var byDetail = indexByDetail(apiList);
        var tree = [];
        PERMISSION_TREE.forEach(function (root) {
            var resolved = resolveNode(root, byDetail);
            if (resolved) {
                tree.push(resolved);
            }
        });
        return tree;
    }

    window.PisPermissionTree = {
        PERMISSION_TREE: PERMISSION_TREE,
        shortLabel: shortLabel,
        buildPermissionTree: buildPermissionTree
    };
})(window);
