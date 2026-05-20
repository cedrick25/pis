<?php $this->load->view('templates/header.php'); ?>
<style>
    .nav-link {
        border-bottom: 3px solid transparent;
        transition: border-bottom 0.3s ease;
    }

    .nav-link.active {
        border-bottom: 3px solid #0069d9;
    }

    .sup-att-page .tab-content {
        width: 100%;
        overflow: auto;
    }

    .sup-att-page .card-body--with-loader {
        position: relative;
        min-height: 14rem;
    }

    .sup-att-page #sup_attachments_loader {
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

    .sup-att-page #sup_attachments_loader.is-hidden {
        display: none !important;
    }

    .sup-att-page .upload_form_row {
        margin-bottom: 0.75rem;
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

    @media (max-width: 575.98px) {
        .sup-att-page .upload_form_row .col.col-md-3 {
            margin-bottom: 0.35rem;
        }
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
                            <li><a href="parole-pardon-supervision">Parole and Pardon</a></li>
                            <li class="active">View Attachments</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3 sup-att-page">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="alert alert-danger" id="attachments_error" style="display:none;" role="alert" aria-live="assertive"></div>
                        <div class="card upload_file">
                            <div class="card-header">
                                <strong class="card-title">Supervision — Upload attachment</strong>
                            </div>
                            <div class="card-body card-body--with-loader">
                                <div id="sup_attachments_loader" role="status" aria-live="polite" aria-busy="true">
                                    <i class="fa fa-spinner fa-spin fa-2x text-muted" aria-hidden="true"></i>
                                    <p class="mb-0 mt-2 text-muted">Loading…</p>
                                </div>
                                <div class="alert alert-success" role="alert" id="success_upload" style="display:none">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                    Successfully uploaded.
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="sc_ppr_att_client_name" class="form-control-label">Name</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="sc_ppr_att_client_name" name="sc_ppr_att_client_name" class="form-control name" placeholder="Client Name" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="sc_ppr_att_docket_num" class="form-control-label">Docket Number</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="text" id="sc_ppr_att_docket_num" name="sc_ppr_att_docket_num" class="form-control docket_num" placeholder="Docket Number" disabled autocomplete="off" />
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="sc_ppr_att_client_type" class="form-control-label">Client Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="sc_ppr_att_client_type" name="sc_ppr_att_client_type" class="form-control client_type select2" disabled>
                                            <option selected value="none" disabled>Select</option>
                                            <option value="parolee">Parolee</option>
                                            <option value="pardonee">Pardonee</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="sc_ppr_att_cmis_kind" class="form-control-label">Kind</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="sc_ppr_att_cmis_kind" name="sc_ppr_att_cmis_kind" class="form-control cmisTable select2" disabled>
                                            <option selected value="none" disabled>Select</option>
                                            <option value="F21T8">Referrals Received</option>
                                            <option value="F21T9">Cases Acted Upon</option>
                                            <option value="F21T11">Cases Resolved by the Board</option>
                                            <option value="F21T13">Cases Resolved by the Regional Director</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="sc_ppr_att_doc_type" class="form-control-label">Type</label></div>
                                    <div class="col-12 col-md-6">
                                        <select id="sc_ppr_att_doc_type" name="sc_ppr_att_doc_type" class="form-control type select2" disabled>
                                            <option selected value="none" disabled>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group col-md-12 upload_form_row">
                                    <div class="col col-md-3"><label for="fileupload" class="form-control-label">Upload File</label></div>
                                    <div class="col-12 col-md-6">
                                        <input type="file" name="sup_att_file" class="form-control-file" id="fileupload" accept=".pdf,.doc,.docx,image/*" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-confirm btn-sm float-right" disabled aria-busy="false">Confirm</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header d-flex align-items-center" id="pager">
                                <strong class="card-title" id="uploaded_files_heading">Uploaded Files</strong>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="supervision_attachments_tab" role="tabpanel" aria-labelledby="uploaded_files_heading">
                                        <table id="supervision_uploads_table" class="table table_head table-striped table-bordered" width="100%">
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

    <script src="assets/js/pisJs/SC_Pre_Parole_Supervision/upload.js"></script>

</body>
</html>
