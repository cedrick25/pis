<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
.table_head {
    width: 100% !important;
    word-wrap: break-word;
}
.prob-fs-client-list-wrap {
    min-height: 8rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
.prob-fs-client-list-loader {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.88);
    border-radius: 0.25rem;
}
.prob-fs-client-list-loader.is-hidden {
    display: none !important;
}
.prob-fs-client-search-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.prob-fs-client-search-wrap .prob-fs-client-search-input {
    padding-right: 2rem;
}
.prob-fs-client-search-clear {
    position: absolute;
    right: 0.35rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 0.15rem 0.35rem;
    line-height: 1;
    color: #6c757d;
    cursor: pointer;
    display: none;
}
.prob-fs-client-search-clear:hover,
.prob-fs-client-search-clear:focus {
    color: #343a40;
    outline: none;
}
.prob-fs-client-search-wrap.has-value .prob-fs-client-search-clear {
    display: block;
}
@media (min-width: 768px) {
    .card-body div.dataTables_wrapper > div.row:first-of-type {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
    }
    .card-body div.dataTables_wrapper > div.row:first-of-type > div[class*="col-"] {
        flex: 0 0 auto;
        width: auto;
        max-width: 100%;
    }
}
</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

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
                            <li><a href="client_list">Fact Sheet</a></li>
                            <li class="active">Fact Sheet Dashboard</li>
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
                            <div class="card-header" id="pager">
                                <strong class="card-title">Probation Fact Sheet</strong>
                            </div>
                            <div class="card-body">
                                <div id="client_list_page_error" class="alert alert-danger" style="display:none;" role="alert"></div>
                                <div class="prob-fs-client-list-wrap position-relative">
                                    <div id="probFsClientListLoader" class="prob-fs-client-list-loader" aria-live="polite" aria-busy="true">
                                        <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                        <p class="mb-0 mt-2 text-muted">Loading clients…</p>
                                    </div>
                                <div class="table-responsive">
                                <table id="tblProbationClientList" class="table table_head" width="100%">
                                    <caption class="sr-only">Probation fact sheet clients for this field office</caption>
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Criminal Case Number</th>
                                        <th scope="col">Field Office</th>
                                        <th scope="col">Worksheet Status</th>
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
            </div><!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/clientList.js"></script>


</body>

</html>