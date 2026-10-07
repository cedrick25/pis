<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$pis_inv_tab = isset($pis_inv_tab) ? $pis_inv_tab : 'investigation';
?>
<ul class="nav pis-inv-module-tabs" role="tablist">
    <li class="nav-item" role="presentation" data-permission="can_access_docket_probation_investigation" style="display:none;">
        <a class="nav-link<?php echo $pis_inv_tab === 'investigation' ? ' active' : ''; ?>"
           href="investigation_docketing"
           role="tab"
           aria-selected="<?php echo $pis_inv_tab === 'investigation' ? 'true' : 'false'; ?>">Investigation</a>
    </li>
    <li class="nav-item" role="presentation" data-permission="can_access_docket_probation_carry_over_investigation" style="display:none;">
        <a class="nav-link<?php echo $pis_inv_tab === 'carry_over' ? ' active' : ''; ?>"
           href="probation-carry-over-investigation-list"
           role="tab"
           aria-selected="<?php echo $pis_inv_tab === 'carry_over' ? 'true' : 'false'; ?>">Carry Over</a>
    </li>
</ul>
