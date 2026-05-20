<?php $this->load->view('templates/header.php'); ?>
<style>
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }

    .csup-att-page .tab-content {
        width: 100%;
        overflow: auto;
    }

    .csup-att-page .card-body--with-loader {
        position: relative;
        min-height: 14rem;
    }

    .csup-att-page #csup_attachments_loader {
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

    .csup-att-page #csup_attachments_loader.is-hidden {
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

    .pis-toast.pis-toast--visible {
        opacity: 1;
        transform: translateX(0);
    }
</style>
<body>
    <?php $this->load->view('templates/left-panel.php'); ?>

    <div id="right-panel" class="right-panel">

        <?php $this->load->view('templates/avatar.php'); ?>

        <div class="breadcrumbs">
            <div class="col-sm-8">
                <div class="page-header float-left">
                    <div class="page-title">
                        <ol class="breadcrumb text-left">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li><a href="parole-pardon-courtesy-supervision-list">Courtesy Supervision Docket</a></li>
                            <li class="active">View Attachments</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3 csup-att-page">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="alert alert-danger" id="attachments_error" style="display:none;" role="alert"></div>
                        <div class="card upload_file">
                            <div class="card-header">
                                <strong class="card-title">Courtesy Supervision — Upload attachment</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="csup_attachments_loader" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    Successfully uploaded.
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="csup_att_client_name" class="form-control-label">Name</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="csup_att_client_name" name="csup_att_client_name" class="form-control name" placeholder="Client Name" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="csup_att_docket_num" class="form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="csup_att_docket_num" name="csup_att_docket_num" class="form-control docket_num" placeholder="Docket Number" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="csup_att_client_type" class="form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="csup_att_client_type" name="csup_att_client_type" class="form-control client_type select2">
                                            <option selected value="none" disabled>Select</option>
                                            <option value="parolee">Parolee</option>
                                            <option value="pardonee">Pardonee</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="csup_att_cmis_kind" class="form-control-label">Kind</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="csup_att_cmis_kind" name="csup_att_cmis_kind" class="form-control cmisTable select2">
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="csup_att_doc_type" class="form-control-label">Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="csup_att_doc_type" name="csup_att_doc_type" class="form-control type select2">
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12">
                                    <div class="col col-md-3"><label for="fileupload" class="form-control-label">Upload File</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="file" name="csup_att_file" class="form-control-file" id="fileupload" accept=".pdf,.doc,.docx,image/*">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm float-right">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header d-flex align-items-center" id="pager">
                                <strong class="card-title">Uploaded Files</strong>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="investigation_tab" role="tabpanel" aria-labelledby="home-tab">
                                        <table id="courtesy_csup_uploads_table" class="table table_head table-striped table-bordered" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>File Name</th>
                                                    <th>Remarks</th>
                                                    <th>Actions</th>
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

        <div id="pis_toast_stack" class="pis-toast-stack" aria-live="polite" aria-atomic="false"></div>

    </div>

    <?php $this->load->view('templates/footer.php'); ?>

    <script src="assets/js/pisJs/SC_Pre_Parole_Courtesy_Supervision/upload.js"></script>

</body>
</html>
