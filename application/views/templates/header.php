<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
    <!-- <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"> -->
    <!-- <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script> -->
    <!-- <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>PPIS</title>
    <meta name="description" content="Brgy Culong">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-icon.png">
    <link rel="shortcut icon" type="image/x-icon" href="images/pis_logo.png">

    <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">
    <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="vendors/selectFX/css/cs-skin-elastic.css">
    <link rel="stylesheet" href="vendors/jqvmap/dist/jqvmap.min.css">

    <link rel="stylesheet" href="vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="vendors/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
    
    <!-- <link rel="stylesheet" href="assets/css/bootstrap-datetimepicker.css"> -->
    <link rel="stylesheet" href="assets/css/select2.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/pis-table-actions.css">

    <link rel="stylesheet" href="assets/css/fonts.css">
    <!-- <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'> -->
    <style type="text/css">
        .select2 {
            height: calc(2.25rem + 2px)!important;
        }
    </style>
    <?php
        $pis_base_url = $this->config->item('base_url');
        $pis_is_https = !empty($this->config->item('is_https'));
        $pis_protocol = $pis_is_https ? 'https://' : 'http://';
        $pis_api_host = defined('PIS_API_HOST') ? trim((string) PIS_API_HOST) : '';
        if ($pis_api_host === '') {
            $pis_api_host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/:\d+$/', '', (string) $_SERVER['HTTP_HOST']) : 'localhost';
        }

        // Resolve API URL style:
        // path  -> https://host/8088/... (Proxy Manager)
        // port  -> https://host:8088/... (local WAMP / Docker ports)
        $pis_api_path_style_raw = defined('PIS_API_PATH_STYLE') ? PIS_API_PATH_STYLE : 'auto';
        $pis_api_host_for_detect = strtolower(trim($pis_api_host, "[] \t\n\r\0\x0B"));
        $pis_is_local_api_host = (
            $pis_api_host_for_detect === ''
            || $pis_api_host_for_detect === 'localhost'
            || $pis_api_host_for_detect === '127.0.0.1'
            || $pis_api_host_for_detect === '::1'
            || substr($pis_api_host_for_detect, -6) === '.local'
            || (
                filter_var($pis_api_host_for_detect, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)
                && !filter_var(
                    $pis_api_host_for_detect,
                    FILTER_VALIDATE_IP,
                    FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
                )
            )
        );
        if ($pis_api_path_style_raw === 'auto' || $pis_api_path_style_raw === null || $pis_api_path_style_raw === '') {
            $pis_api_path_style = !$pis_is_local_api_host;
        } else {
            $pis_api_path_style = filter_var($pis_api_path_style_raw, FILTER_VALIDATE_BOOLEAN);
        }
        $pis_api_base = $pis_protocol.$pis_api_host.($pis_api_path_style ? '/' : ':');
    ?>
    <script type="text/javascript">
        window.__PIS_BASE_URL = <?= json_encode($pis_base_url) ?>;
        window.__PIS_API_BASE = <?= json_encode($pis_api_base) ?>;
        window.__PIS_API_PATH_STYLE = <?= $pis_api_path_style ? 'true' : 'false' ?>;
        window.__PIS_IS_HTTPS = <?= $pis_is_https ? 'true' : 'false' ?>;
        window.__PIS_SMS_API_URL = <?= json_encode(defined('PIS_SMS_API_URL') ? PIS_SMS_API_URL : '') ?>;
        window.__PIS_EMAIL_API_URL = <?= json_encode(defined('PIS_EMAIL_API_URL') ? PIS_EMAIL_API_URL : '') ?>;
        window.pisUrl = function (path) {
            var base = String(window.__PIS_BASE_URL || '').replace(/\/+$/, '');
            var p = String(path == null ? '' : path).replace(/^\/+/, '');
            if (!base) {
                return p;
            }
            return p ? (base + '/' + p) : (base + '/');
        };
        window.pisApiUrl = function (path) {
            var base = window.__PIS_API_BASE || (localStorage.getItem('api') || '');
            var p = String(path == null ? '' : path).replace(/^\/+/, '');
            if (!base) {
                return p;
            }
            if (base.slice(-1) === ':' && /^\d+\//.test(p)) {
                return base + p;
            }
            return base.replace(/\/+$/, '') + (p ? '/' + p : '');
        };
        window.__PIS_COOKIE_OPTS = function () {
            var opts = { path: '/' };
            if (window.__PIS_IS_HTTPS || window.location.protocol === 'https:') {
                opts.secure = true;
            }
            return opts;
        };
        try {
            localStorage.setItem('api', window.__PIS_API_BASE);
        } catch (e) {}
    </script>
</head>
