<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
.table_head {
    width: 100% !important;
    word-wrap: break-word;
}
.pis-inv-docket-list-wrap {
    min-height: 8rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
.pis-inv-docket-list-loader {
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
.pis-inv-docket-list-loader.is-hidden {
    display: none !important;
}
/* Same search chrome as supervision/courtesy docketing lists (injectSearch targets .sup-docket-search-wrap) */
.sup-docket-search-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.sup-docket-search-wrap .sup-docket-search-input {
    padding-right: 2rem;
}
.sup-docket-search-clear {
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
.sup-docket-search-clear:hover,
.sup-docket-search-clear:focus {
    color: #343a40;
    outline: none;
}
.sup-docket-search-wrap.has-value .sup-docket-search-clear {
    display: block;
}
/* Length left, search group right — same row as courtesy investigation list */
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
.pis-inv-docket-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
    max-width: 14rem;
}
.pis-inv-docket-actions .btn {
    flex: 1 1 calc(50% - 0.35rem);
    min-width: 5.5rem;
    white-space: nowrap;
}
@media (min-width: 992px) {
    .pis-inv-docket-actions {
        max-width: none;
        flex-wrap: nowrap;
    }
    .pis-inv-docket-actions .btn {
        flex: 0 0 auto;
    }
}
</style>
<body>
    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-describedby="removeModalDesc" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Permanently remove docket?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close dialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check" aria-hidden="true"></i>
                        Removed Successfully  
                </div>
                <div class="alert alert-danger" role="alert" id="error_remove" style="display:none"></div>
                <div class="modal-body">
                    <p id="removeModalDesc" class="mb-0">
                        You are about to permanently remove docket <b><span class="docket"></span></b>. This cannot be undone. Only continue if you are certain.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger btn_remove_confirm btn-sm">Remove permanently</button>
                </div>
            </div>
        </div>
    </div>
    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->
  
        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="investigation_docketing">Docketing</a></li>
                            <li class="active">Investigation Docket list</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="card">
                            <div class="card-header" id="pager">
                                <strong class="card-title">Investigation Docket List</strong>
                                <!-- <a href="investigation_docket_create"> <button class="btn btn-sm btn-success float-right " data-permission="can_create_docket_probation_investigation" style="display:none;" type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button> </a> -->
                            </div>
                            <div class="card-body">
                                <div id="pisInvDocketListSearchError" class="alert alert-danger" style="display:none;" role="alert"></div>
                                <div class="pis-inv-docket-list-wrap position-relative">
                                    <div id="pisInvDocketListLoader" class="pis-inv-docket-list-loader" aria-live="polite" aria-busy="true">
                                        <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                        <p class="mb-0 mt-2 text-muted">Loading dockets…</p>
                                    </div>
                                    <table id="tblPisInvestigationDockets" class="table table_head" width="100%">
                                        <caption class="sr-only">Investigation Docket List</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Docket Number</th>
                                                <th scope="col">Received Date</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Criminal Case No.</th>
                                                <th scope="col">Field Office</th>
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
            <!-- .animated -->
        </div><!-- .content -->


    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/PIS_Investigation/investigationDocketing.js">

    </script>

</body>

</html>
