<?php $this->load->view('templates/header.php'); ?> 
<style>
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }

    .pinv-att-page .tab-content {
        width: 100%;
        overflow: auto;
    }

    .pinv-att-page .card-body--with-loader {
        position: relative;
        min-height: 14rem;
    }

    .pinv-att-page #pinv_attachments_loader {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.92);
        border-radius: 0 0 0.25rem 0.25rem;
    }

    .pinv-att-page #pinv_attachments_loader.is-hidden {
        display: none !important;
    }

    .pis-toast-stack {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 320px;
        pointer-events: none;
    }

    .pis-toast {
        opacity: 0;
        transform: translateX(12px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: 600;
        font-size: 13px;
        border: 1px solid transparent;
    }

    .pinv-att-page .uploads-table-wrap {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .pinv-att-page .card-footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
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
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="parole-pardon-investigation-list">Parole and Pardon</a></li>
                            <li class="active">View Attachments</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

	    <div class="content mt-3 pinv-att-page">
            <div class="animated fadeIn">
                <div class="row">
                  <div class="col-lg-12">
                        <div class="alert alert-danger" id="attachments_error" style="display:none;" role="alert"></div>
                        <div class="card upload_file">
                            <div class="card-header">
                                <strong class="card-title">Investigation — Upload attachment</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="pinv_attachments_loader" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    Successfully uploaded.
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="pinv_att_client_name" class="form-control-label">Name</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="pinv_att_client_name" name="pinv_att_client_name" class="form-control name" placeholder="Client Name" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="pinv_att_docket_num" class="form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="pinv_att_docket_num" name="pinv_att_docket_num" class="form-control docket_num" placeholder="Docket Number" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="pinv_att_cmis_kind" class="form-control-label">Kind</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="pinv_att_cmis_kind" name="pinv_att_cmis_kind" class="form-control cmisTable select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="F21T2RR">Referrals Received</option>
                                            <option value="F21T2_RAU">Referrals Acted Upon</option>
                                            <option value="F21T4">Pre-Parole/Executive Clemency Investigation Cases Resolved By The Board</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="pinv_att_doc_type" class="form-control-label">Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="pinv_att_doc_type" name="pinv_att_doc_type" class="form-control type select2">
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">         
                                    <div class="col col-md-3"><label for="fileupload" class="form-control-label">Upload File</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="file" name="pinv_att_file" class="form-control-file" id="fileupload" accept=".pdf,.doc,.docx,image/*" aria-describedby="pinv_att_file_hint">
                                        <small id="pinv_att_file_hint" class="form-text text-muted">Accepted: PDF, Word documents, or images.</small>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header d-flex align-items-center" id="pager">
                                <strong class="card-title">Uploaded Files</strong>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="investigation_tab" role="tabpanel" aria-label="Uploaded investigation attachments">
                                        <div class="uploads-table-wrap">
                                        <table id="pinv_investigation_uploads_table" class="table table_head table-striped table-bordered" width="100%">
                                            <caption class="sr-only">Files uploaded for this investigation docket</caption>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">File Name</th>
                                                    <th scope="col">Remarks</th>
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
        </div>

        <div id="pis_toast_stack" class="pis-toast-stack" aria-live="polite" aria-atomic="false"></div>

    </div>

    <?php $this->load->view('templates/footer.php'); ?> 

    <script src="assets/js/pisJs/SC_Pre_Parole_Investigation/upload.js"></script>

</body>

</html>
