<?php
$fs_client_id = $this->input->get('client_id');
$fs_field_office_id = $this->input->get('field_office_id');
$fs_href = 'client_view_factsheet?client_id=' . rawurlencode((string) $fs_client_id);
if ($fs_field_office_id !== null && $fs_field_office_id !== '') {
    $fs_href .= '&field_office_id=' . rawurlencode((string) $fs_field_office_id);
}
$fs_href_attr = htmlspecialchars($fs_href, ENT_QUOTES, 'UTF-8');
?>
<style>
    .btn-back-factsheet {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        line-height: 1;
        position: relative;
    }
    .btn-back-factsheet:before,
    .btn-back-factsheet:after {
        content: none !important;
    }
    .btn-back-factsheet i {
        font-size: 14px;
        margin: 0;
    }
    .card-header .btn-back-factsheet {
        margin-left: auto;
    }
</style>
<a href="<?php echo $fs_href_attr; ?>"
   class="btn btn-sm btn-secondary btn-back-factsheet"
   title="Back to Fact Sheet"
   data-toggle="tooltip"
   data-placement="left"
   aria-label="Back to Fact Sheet">
    <i class="fa fa-arrow-left"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        if (window.jQuery && jQuery.fn.tooltip) {
            jQuery(".btn-back-factsheet").tooltip();
        }
    });
</script>
