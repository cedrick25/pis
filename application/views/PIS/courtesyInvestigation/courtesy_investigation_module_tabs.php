<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$pis_cinv_tab = isset($pis_cinv_tab) ? $pis_cinv_tab : 'courtesy_investigation';
?>
<ul class="nav pis-inv-module-tabs" role="tablist">
    <li class="nav-item" role="presentation" data-permission="can_access_docket_probation_courtesy_investigation" style="display:none;">
        <a class="nav-link<?php echo $pis_cinv_tab === 'courtesy_investigation' ? ' active' : ''; ?>"
           href="probation-courtesy-investigation-list"
           role="tab"
           aria-selected="<?php echo $pis_cinv_tab === 'courtesy_investigation' ? 'true' : 'false'; ?>">Courtesy Investigation</a>
    </li>
    <li class="nav-item" role="presentation" data-permission="can_access_docket_probation_carry_over_courtesy_investigation" style="display:none;">
        <a class="nav-link<?php echo $pis_cinv_tab === 'carry_over' ? ' active' : ''; ?>"
           href="probation-carry-over-courtesy-investigation-list"
           role="tab"
           aria-selected="<?php echo $pis_cinv_tab === 'carry_over' ? 'true' : 'false'; ?>">Carry Over</a>
    </li>
</ul>
