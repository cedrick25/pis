<?php $this->load->view('templates/header.php'); ?>
<style type="text/css">
.table_head {
    width: 100% !important;
    word-wrap: break-word;
}
.sup-docket-list-wrap {
    min-height: 8rem;
}
.sup-docket-list-loader {
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
.sup-docket-list-loader.is-hidden {
    display: none !important;
}
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
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
                            <li><a href="supervision_docketing">Docket</a></li>
                            <li class="active">Supervision Docket list</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="alert alert-danger" id="sup_docketing_page_error" style="display:none;" role="alert"></div>
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Supervision Docket List</strong>
                                <!-- <a href="supervision_docket_create"><button class="btn btn-sm btn-success float-right pb_sup_add" style='display:none;' type="submit"><i class="fa fa-plus-circle"></i> Add Docket</button></a> -->
                            </div>
                            <div class="card-body">
                                <div class="sup-docket-list-wrap position-relative">
                                    <div id="supDocketListLoader" class="sup-docket-list-loader" aria-live="polite" aria-busy="true">
                                        <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                        <p class="mb-0 mt-2 text-muted sup-docket-loader-text">Loading dockets…</p>
                                    </div>
                                    <table id="tblSupervisionDocketing" class="table table_head" width="100%">
                                        <caption class="sr-only">Supervision dockets for this field office</caption>
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
            </div><!-- .animated -->
        </div><!-- .content -->

    </div><!-- /#right-panel -->

    <!-- Right Panel -->

    <?php $this->load->view('templates/footer.php'); ?>

    <script src="assets/js/pisJs/PIS_Supervision/supervisionDocketing.js">
    </script>

</body>

</html>
