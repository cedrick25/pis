<?php $this->load->view('templates/header.php'); ?> 
<style>
    .page-pdl-client-list .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
        white-space: nowrap;
    }

    .page-pdl-client-list .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }

    .page-pdl-client-list .table_head {
        width: 100% !important;
        word-wrap: break-word;
    }

    .page-pdl-client-list .pdl-fs-client-list-wrap {
        width: 100%;
        max-width: 100%;
        min-height: 8rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .page-pdl-client-list .pdl-fs-card-header-nav {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        flex: 1 1 auto;
        min-width: 0;
    }

    .page-pdl-client-list .pdl-fs-card-header-nav .nav {
        flex-wrap: nowrap;
        white-space: nowrap;
    }

    @media (min-width: 768px) {
        .page-pdl-client-list .card-body div.dataTables_wrapper > div.row:first-of-type {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
        }

        .page-pdl-client-list .card-body div.dataTables_wrapper > div.row:first-of-type > div[class*="col-"] {
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
        }
    }

    @media (max-width: 768px) {
        .page-pdl-client-list .right-panel,
        .page-pdl-client-list .content,
        .page-pdl-client-list .content .animated,
        .page-pdl-client-list .content .row,
        .page-pdl-client-list .content [class*="col-"],
        .page-pdl-client-list .card,
        .page-pdl-client-list .card-body {
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
        }

        .page-pdl-client-list .right-panel {
            overflow-x: hidden;
        }

        .page-pdl-client-list .content.mt-3 {
            margin-top: 0.5rem !important;
            padding-left: 10px;
            padding-right: 10px;
        }

        .page-pdl-client-list .breadcrumbs {
            padding: 8px 10px !important;
        }

        .page-pdl-client-list .breadcrumb {
            flex-wrap: wrap;
            font-size: 0.8125rem;
            margin-bottom: 0;
            padding: 0.35rem 0;
        }

        .page-pdl-client-list .card .card-header {
            flex-direction: column;
            align-items: stretch !important;
            padding: 0.65rem 0.75rem;
            gap: 0.5rem;
        }

        .page-pdl-client-list .pdl-fs-card-header-nav {
            width: 100%;
            max-width: 100%;
            margin: 0 -0.15rem;
            padding-bottom: 2px;
        }

        .page-pdl-client-list .card-header .client_add_pdl {
            width: 100%;
            margin-left: 0 !important;
            white-space: normal;
        }

        .page-pdl-client-list .card .card-body {
            padding: 0.75rem;
        }

        .page-pdl-client-list .pdl-fs-client-list-wrap {
            overflow-x: auto;
        }

        .page-pdl-client-list .dataTables_wrapper {
            width: 100% !important;
            max-width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .page-pdl-client-list div.dataTables_wrapper div.row {
            margin-left: 0;
            margin-right: 0;
        }

        .page-pdl-client-list div.dataTables_wrapper div.dataTables_length,
        .page-pdl-client-list div.dataTables_wrapper div.dataTables_filter,
        .page-pdl-client-list div.dataTables_wrapper div.dataTables_info,
        .page-pdl-client-list div.dataTables_wrapper div.dataTables_paginate {
            float: none !important;
            width: 100% !important;
            max-width: 100%;
            text-align: left !important;
            margin-bottom: 0.5rem;
            padding-left: 0;
            padding-right: 0;
        }

        .page-pdl-client-list div.dataTables_wrapper div.dataTables_filter label {
            width: 100%;
            display: block;
        }

        .page-pdl-client-list div.dataTables_wrapper div.dataTables_filter input {
            width: 100% !important;
            max-width: 100%;
            margin-left: 0 !important;
            display: block;
        }

        .page-pdl-client-list div.dataTables_wrapper div.dataTables_paginate {
            text-align: center !important;
            overflow-x: auto;
            white-space: nowrap;
        }

        .page-pdl-client-list .table_head td .btn {
            display: inline-block;
            margin: 0.15rem 0.15rem 0.15rem 0;
            white-space: nowrap;
        }
    }
</style>
<body class="page-pdl-client-list">
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document" style="">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove PDL Client</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Remove Successfully  
                </div>
                <div class="modal-body col-md-12">
                    <p>
                        Are you sure you want to remove this PDL client? 
                    </p>
                </div>                            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_confirm_remove">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->
  
        <div class="breadcrumbs">
            <div class="col-sm-12">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="client_list_single_carpeta">Fact Sheet</a></li>
                            <li><a href="client_list_single_carpeta">Person Deprived Liberty</a></li>
                            <li class="active">List</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header d-flex flex-wrap align-items-center justify-content-between" id="pager">
                                <div class="pdl-fs-card-header-nav">
                                    <ul class="nav">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="inv_tab" href="#" data-toggle="tab" style="cursor: pointer;" data-type="investigation">Investigation</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="sup_tab" href="#" data-toggle="tab" style="cursor: pointer;" data-type="supervision">Supervision</a>
                                        </li>
                                    </ul>
                                </div>
                                <button class="btn btn-sm btn-success client_add client_add_pdl ml-auto" style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Client</button>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="homeTab" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="pdl-fs-client-list-wrap">
                                            <div class="table-responsive">
                                                <table id="tblPdlClientList" class="table table_head" width="100%">
                                                    <caption class="sr-only">Persons deprived of liberty client list</caption>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">First Name</th>
                                                            <th scope="col">Middle Name</th>
                                                            <th scope="col">Last Name</th>
                                                            <th scope="col">Criminal Case Number</th>
                                                            <th scope="col">Prison Number</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table_body">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/Fact_Sheet/Single_Carpeta/client_list_single_carpeta.js"></script>


</body>

</html>