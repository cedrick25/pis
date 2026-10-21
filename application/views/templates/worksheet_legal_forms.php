<div class="modal fade" id="legalFormsModal" tabindex="-1" role="dialog" aria-labelledby="legalFormsTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header legal-forms-header">
                <div>
                    <h5 class="modal-title" id="legalFormsTitle">Certification and waiver</h5>
                    <p class="legal-forms-docket" id="legalFormsDocket"></p>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="legalFormsAlert" class="alert" role="alert" style="display:none"></div>
                <div id="legalFormsList">
                    <p class="legal-forms-lead">Fill either form here, then print it or upload a signed image. Uploaded images also appear under Notes / Other Documents.</p>
                    <div class="table-responsive">
                        <table class="table legal-forms-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Form</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="legal-form-name">Certification</div>
                                        <div class="legal-form-note">PPA Form 1 — petitioner’s declaration</div>
                                    </td>
                                    <td><span class="legal-status" id="legalCertStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary legal-edit" data-form="certification" id="legalCertEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary legal-print" data-form="certification">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary legal-upload" data-form="certification">Upload</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="legal-form-name">Waiver</div>
                                        <div class="legal-form-note">PPA Form 2 — authorization to secure records</div>
                                    </td>
                                    <td><span class="legal-status" id="legalWaiverStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary legal-edit" data-form="waiver" id="legalWaiverEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary legal-print" data-form="waiver">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary legal-upload" data-form="waiver">Upload</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input type="file" id="legalFormsFile" accept="image/jpeg,image/png,.jpg,.jpeg,.png" hidden>
                </div>
                <div id="legalFormEditor" style="display:none">
                    <button type="button" class="btn btn-link legal-back px-0">&larr; Back to forms</button>
                    <h6 class="legal-editor-title" id="legalFormEditorTitle">Certification</h6>
                    <p class="legal-forms-lead" id="legalFormEditorLead"></p>
                    <div id="legalCertFields">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="legalCertName">Petitioner’s name</label>
                                <input type="text" class="form-control" id="legalCertName" autocomplete="off">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="legalCertDate">Date signed</label>
                                <input type="date" class="form-control" id="legalCertDate">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="legalCertPlace">Place</label>
                                <input type="text" class="form-control" id="legalCertPlace" autocomplete="off" placeholder="City or municipality">
                            </div>
                        </div>
                    </div>
                    <div id="legalWaiverFields" style="display:none">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="legalWaiverPerson">Authorized person</label>
                                <input type="text" class="form-control" id="legalWaiverPerson" autocomplete="off">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="legalWaiverOffice">Office</label>
                                <input type="text" class="form-control" id="legalWaiverOffice" autocomplete="off">
                            </div>
                        </div>
                        <div class="legal-check-list">
                            <label class="legal-check"><input type="checkbox" id="legalWaiverArrest" checked> Record of previous arrest, arresting agency, date and place of arrest disposition</label>
                            <label class="legal-check"><input type="checkbox" id="legalWaiverProbation" checked> Record of previous probation, parole, or pardon</label>
                            <label class="legal-check"><input type="checkbox" id="legalWaiverSchool" checked> School records</label>
                            <label class="legal-check"><input type="checkbox" id="legalWaiverMedical" checked> Medical records</label>
                            <label class="legal-check"><input type="checkbox" id="legalWaiverMilitary" checked> Military records</label>
                        </div>
                        <div class="form-group">
                            <label for="legalWaiverOthers">Others (specify)</label>
                            <input type="text" class="form-control" id="legalWaiverOthers" autocomplete="off">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="legalWaiverDate">Date sworn</label>
                                <input type="date" class="form-control" id="legalWaiverDate">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="legalWaiverPlace">Place sworn</label>
                                <input type="text" class="form-control" id="legalWaiverPlace" autocomplete="off" placeholder="City or municipality">
                            </div>
                        </div>
                    </div>
                    <div id="legalSignFields">
                        <div class="legal-sign-grid">
                            <div class="legal-sign-pad">
                                <label for="legalSignPetitioner">Petitioner e-signature</label>
                                <canvas id="legalSignPetitioner" width="520" height="140"></canvas>
                                <div class="legal-sign-actions">
                                    <button type="button" class="btn btn-link btn-sm legal-sign-upload px-0" data-pad="legalSignPetitioner">Upload image</button>
                                    <button type="button" class="btn btn-link btn-sm legal-sign-notes px-0" data-pad="legalSignPetitioner">From notes</button>
                                    <button type="button" class="btn btn-link btn-sm legal-sign-clear px-0" data-pad="legalSignPetitioner">Clear</button>
                                </div>
                            </div>
                            <div class="legal-sign-pad">
                                <label for="legalSignOfficer">Investigating officer e-signature</label>
                                <canvas id="legalSignOfficer" width="520" height="140"></canvas>
                                <div class="legal-sign-actions">
                                    <button type="button" class="btn btn-link btn-sm legal-sign-upload px-0" data-pad="legalSignOfficer">Upload image</button>
                                    <button type="button" class="btn btn-link btn-sm legal-sign-notes px-0" data-pad="legalSignOfficer">From notes</button>
                                    <button type="button" class="btn btn-link btn-sm legal-sign-clear px-0" data-pad="legalSignOfficer">Clear</button>
                                </div>
                            </div>
                        </div>
                        <div id="legalSignLibrary" class="legal-sign-library" style="display:none">
                            <div class="legal-sign-library-head">
                                <span>Images in Notes / Other Documents</span>
                                <button type="button" class="btn btn-link btn-sm px-0" id="legalSignLibraryClose">Close</button>
                            </div>
                            <div id="legalSignLibraryList" class="legal-sign-library-list"></div>
                        </div>
                        <input type="file" id="legalSignFile" accept="image/jpeg,image/png,.jpg,.jpeg,.png" hidden>
                    </div>
                    <div class="legal-editor-actions">
                        <button type="button" class="btn btn-primary" id="legalFormSave">Save</button>
                        <button type="button" class="btn btn-light border legal-back">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="legalFormDownloadModal" role="dialog" aria-modal="true" aria-labelledby="legalFormDownloadTitle" style="display:none">
    <div class="ws-dl-dialog">
        <div class="ws-dl-header">
            <h2 id="legalFormDownloadTitle" class="ws-dl-title">Form</h2>
            <button type="button" id="legalFormDownloadClose" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="ws-dl-body">
            <div class="ws-dl-preview">
                <iframe id="legalFormPreviewFrame" title="Form preview"></iframe>
            </div>
            <div class="ws-dl-side">
                <p class="ws-dl-label">Download as</p>
                <label class="ws-dl-option is-selected">
                    <input type="radio" name="legalFormDownloadFormat" id="legalFormFormatPdf" value="pdf" checked>
                    <span>PDF</span>
                </label>
                <label class="ws-dl-option">
                    <input type="radio" name="legalFormDownloadFormat" id="legalFormFormatWord" value="word">
                    <span>Word</span>
                </label>
                <button type="button" id="legalFormDownloadBtn" class="btn btn-primary ws-dl-download">
                    <i class="fa fa-download" aria-hidden="true"></i> Download
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .legal-forms-tip { pointer-events: none; }
    .legal-forms-tip .tooltip-inner { max-width: none; white-space: nowrap; }
    #legalFormsModal .legal-forms-header { align-items: flex-start; }
    #legalFormsModal .legal-forms-docket { margin: 2px 0 0; color: #6c757d; font-size: 13px; }
    #legalFormsModal .legal-forms-lead { color: #495057; font-size: 13px; margin-bottom: 14px; }
    #legalFormsModal .modal-body { max-height: 70vh; overflow: auto; }
    #legalFormsModal .legal-forms-table { border: 1px solid #e6e6e6; }
    #legalFormsModal .legal-forms-table th {
        background: #f7f9fb;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: .03em;
        color: #6c757d;
    }
    #legalFormsModal .legal-forms-table td { vertical-align: middle; }
    #legalFormsModal .legal-form-name { font-weight: 600; color: #212529; }
    #legalFormsModal .legal-form-note { color: #6c757d; font-size: 12px; margin-top: 2px; }
    #legalFormsModal .legal-status {
        display: inline-block;
        border-radius: 999px;
        padding: 3px 10px;
        font-size: 12px;
        font-weight: 600;
        background: #f1f3f5;
        color: #495057;
    }
    #legalFormsModal .legal-status.is-saved { background: #e6f4ea; color: #1e7e34; }
    #legalFormsModal .legal-edit,
    #legalFormsModal .legal-print,
    #legalFormsModal .legal-upload { margin-left: 4px; }
    #legalFormsModal .legal-editor-title { font-weight: 700; margin: 4px 0 6px; }
    #legalFormsModal .legal-check-list {
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 14px;
        background: #fbfcfd;
    }
    #legalFormsModal .legal-check {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin: 0 0 8px;
        font-weight: 400;
        color: #212529;
    }
    #legalFormsModal .legal-check:last-child { margin-bottom: 0; }
    #legalFormsModal .legal-check input { margin-top: 3px; }
    #legalFormsModal .legal-sign-grid { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
    #legalFormsModal .legal-sign-pad { flex: 1 1 220px; }
    #legalFormsModal .legal-sign-pad label { display: block; font-weight: 600; margin-bottom: 6px; }
    #legalFormsModal .legal-sign-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    #legalFormsModal .legal-sign-library {
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        background: #fbfcfd;
        margin: 4px 0 12px;
        padding: 8px 10px;
    }
    #legalFormsModal .legal-sign-library-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
    }
    #legalFormsModal .legal-sign-library-list { max-height: 160px; overflow: auto; }
    #legalFormsModal .legal-sign-library-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 0;
        border-top: 1px solid #eef1f4;
        font-size: 13px;
    }
    #legalFormsModal .legal-sign-library-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #legalFormsModal .legal-sign-pad canvas {
        width: 100%;
        height: 120px;
        border: 1px dashed #adb5bd;
        border-radius: 6px;
        background: #fff;
        touch-action: none;
        cursor: crosshair;
    }
    #legalFormsModal .legal-editor-actions { display: flex; gap: 8px; }
    #legalFormDownloadModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.45);
        z-index: 10060;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
    #legalFormDownloadModal .ws-dl-dialog {
        background: #fff;
        width: min(1100px, 96vw);
        height: min(860px, 92vh);
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.28);
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    #legalFormDownloadModal .ws-dl-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #e6e6e6;
        flex-shrink: 0;
    }
    #legalFormDownloadModal .ws-dl-title { margin: 0; font-size: 16px; font-weight: 600; color: #212529; }
    #legalFormDownloadModal .ws-dl-body { display: flex; flex: 1; min-height: 0; }
    #legalFormDownloadModal .ws-dl-preview { flex: 1; min-width: 0; padding: 16px; background: #fff; }
    #legalFormDownloadModal .ws-dl-preview iframe {
        width: 100%;
        height: 100%;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        background: #fff;
    }
    #legalFormDownloadModal .ws-dl-side {
        width: 280px;
        flex-shrink: 0;
        border-left: 1px solid #e6e6e6;
        padding: 16px;
        display: flex;
        flex-direction: column;
        background: #fff;
    }
    #legalFormDownloadModal .ws-dl-label { font-weight: 600; margin: 0 0 12px; color: #212529; }
    #legalFormDownloadModal .ws-dl-option {
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid #ced4da;
        border-radius: 6px;
        padding: 12px 14px;
        margin: 0 0 10px;
        cursor: pointer;
        background: #fff;
        font-weight: 500;
        color: #212529;
    }
    #legalFormDownloadModal .ws-dl-option input { margin: 0; accent-color: #0d6efd; }
    #legalFormDownloadModal .ws-dl-option.is-selected {
        border-color: #0d6efd;
        background: #e8f2ff;
        box-shadow: 0 0 0 1px #0d6efd;
    }
    #legalFormDownloadModal .ws-dl-download { margin-top: auto; width: 100%; padding: 8px 12px; font-weight: 600; }
    #legalFormDownloadModal .ws-dl-download .fa { margin-right: 6px; }
    @media (max-width: 768px) {
        #legalFormDownloadModal .ws-dl-body { flex-direction: column; }
        #legalFormDownloadModal .ws-dl-side { width: 100%; border-left: 0; border-top: 1px solid #e6e6e6; }
        #legalFormsModal .legal-edit,
        #legalFormsModal .legal-print,
        #legalFormsModal .legal-upload { margin: 2px 0 2px 4px; }
    }
</style>
<?php if (empty($legal_forms_skip_scripts)) : ?>
<script src="assets/js/html2canvas.min.js" defer></script>
<script src="assets/js/pisJs/ppaWorksheetPrintHtml.js?v=<?php echo filemtime(FCPATH . 'assets/js/pisJs/ppaWorksheetPrintHtml.js'); ?>" defer></script>
<script src="assets/js/pisJs/ppaWorksheetDownload.js?v=<?php echo filemtime(FCPATH . 'assets/js/pisJs/ppaWorksheetDownload.js'); ?>" defer></script>
<script src="assets/js/pisJs/worksheetLegalForms.js?v=<?php echo filemtime(FCPATH . 'assets/js/pisJs/worksheetLegalForms.js'); ?>" defer></script>
<?php endif; ?>
