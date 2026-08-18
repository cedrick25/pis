# PIS Permission Rework

## Decision: `data-permission` (not CSS classes)

Permission keys live in `permission.detail` and are applied in the UI as:

```html
<button class="btn btn-sm btn-primary btn_update" data-permission="can_edit_docket_probation_investigation">Update</button>
```

**Why not classes?** CSS classes collide with styling, Bootstrap, and nav `.active` highlighting. Custom data attributes keep authorization metadata separate from presentation.

## Naming convention

| Type | Pattern | Example |
|------|---------|---------|
| Menu / module access | `can_access_{area}_{module}` | `can_access_docket_probation_investigation` |
| Create | `can_create_{area}_{module}` | `can_create_docket_probation_investigation` |
| View row | `can_view_{area}_{module}` | `can_view_docket_probation_investigation` |
| Update | `can_edit_{area}_{module}` | `can_edit_docket_probation_investigation` |
| Attachments | `can_attachments_{area}_{module}` | `can_attachments_docket_probation_investigation` |
| Delete | `can_delete_{area}_{module}` | `can_delete_docket_probation_investigation` |
| Forward | `can_forward_docket_routing_{client}` | `can_forward_docket_routing_probation` |

## Full table dump (recommended for local DB)

Import **`sql/permission.sql`** in phpMyAdmin (or mysql CLI) against the `pis` database.

This file:
- `DROP` + `CREATE` the `permission` table
- Inserts **148** rows with new `can_*` detail keys and `parent_id` hierarchy

Also copied to: `E:\Downloads\permission.sql`

**After import:** re-grant permissions per role in User Roles, then have users log out/in.

## In-place migration (keep existing table, UPDATE only)

If you prefer not to drop the table, use `sql/permission_rework_data_permission.sql` instead.

## After migration

1. Re-open **User Roles → Grant Permission** for each role and Confirm (so role-permission payloads pick up new `detail` values and new courtesy actions).
2. Have users **log out and log in** so `localStorage.permission` refreshes.
3. Verify menu items and row action buttons show/hide correctly.

## Key UI files

- `application/views/templates/footer.php` — `applyPermissionVisibility()`
- `application/views/templates/left-panel.php` — menu `data-permission`
- `assets/js/pisJs/permissionTree.js` — grant modal module tree
- `assets/js/pisJs/user_roles.js` — grant / update grant UI
