<div class="modal fade" id="psirRecModal" tabindex="-1" role="dialog" aria-labelledby="psirRecTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header psir-rec-header">
                <div>
                    <h5 class="modal-title" id="psirRecTitle">Recommendation</h5>
                    <p class="psir-rec-docket" id="psirRecDocket"></p>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="psirRecAlert" class="alert" role="alert" style="display:none"></div>
                <div id="psirRecList">
                    <p class="psir-rec-lead">Choose one recommendation. Fill it here, then print it or upload a signed image. Uploaded images also appear under Notes / Other Documents. Short and Long print the report without these pages.</p>
                    <div class="table-responsive">
                        <table class="table psir-rec-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Form</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="psir-rec-group"><td colspan="3">Short version</td></tr>
                                <tr>
                                    <td>
                                        <div class="psir-rec-name">Pending records check or GIOR</div>
                                        <div class="psir-rec-note">Petition granted while NBI, CMRD, or courtesy results are still out</div>
                                    </td>
                                    <td><span class="psir-rec-status" id="psirRecPendingStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary psir-rec-edit" data-form="pending" id="psirRecPendingEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-print" data-form="pending">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-upload" data-form="pending">Upload</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="psir-rec-name">Complete records check or GIOR</div>
                                        <div class="psir-rec-note">Petition granted with records already complete</div>
                                    </td>
                                    <td><span class="psir-rec-status" id="psirRecCompleteStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary psir-rec-edit" data-form="complete" id="psirRecCompleteEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-print" data-form="complete">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-upload" data-form="complete">Upload</button>
                                    </td>
                                </tr>
                                <tr class="psir-rec-group"><td colspan="3">Long version</td></tr>
                                <tr>
                                    <td>
                                        <div class="psir-rec-name">Granted</div>
                                        <div class="psir-rec-note">Granted for the supervision period, with the condition list</div>
                                    </td>
                                    <td><span class="psir-rec-status" id="psirRecGrantedStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary psir-rec-edit" data-form="granted" id="psirRecGrantedEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-print" data-form="granted">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-upload" data-form="granted">Upload</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="psir-rec-name">Denied</div>
                                        <div class="psir-rec-note">Denied under PD 968, as amended</div>
                                    </td>
                                    <td><span class="psir-rec-status" id="psirRecDeniedStatus">Not filled</span></td>
                                    <td class="text-right text-nowrap">
                                        <button type="button" class="btn btn-sm btn-primary psir-rec-edit" data-form="denied" id="psirRecDeniedEdit">Create</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-print" data-form="denied">Print</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary psir-rec-upload" data-form="denied">Upload</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input type="file" id="psirRecFile" accept="image/jpeg,image/png,.jpg,.jpeg,.png" hidden>
                </div>
                <div id="psirRecEditor" style="display:none">
                    <button type="button" class="btn btn-link psir-rec-back px-0">&larr; Back to forms</button>
                    <h6 class="psir-rec-editor-title" id="psirRecEditorTitle">Recommendation</h6>
                    <p class="psir-rec-lead" id="psirRecEditorLead"></p>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="psirRecName">Petitioner’s name</label>
                            <input type="text" class="form-control" id="psirRecName" autocomplete="off">
                        </div>
                    </div>
                    <div id="psirRecResultsFields">
                        <div class="form-group">
                            <label for="psirRecResults">Results still pending from</label>
                            <input type="text" class="form-control" id="psirRecResults" autocomplete="off" placeholder="NBI, CMRD, or courtesy investigation source">
                        </div>
                    </div>
                    <div id="psirRecShortFields">
                        <div class="form-group">
                            <label for="psirRecPlaceDate">Place and date</label>
                            <input type="text" class="form-control" id="psirRecPlaceDate" autocomplete="off" placeholder="City or municipality, province, date">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="psirRecOfficer">Investigating officer</label>
                                <input type="text" class="form-control" id="psirRecOfficer" autocomplete="off">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecOfficerPosition">Position</label>
                                <input type="text" class="form-control" id="psirRecOfficerPosition" autocomplete="off">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecOfficerDate">Date</label>
                                <input type="date" class="form-control" id="psirRecOfficerDate">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="psirRecHead">Head of the field office</label>
                                <input type="text" class="form-control" id="psirRecHead" autocomplete="off">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecHeadPosition">Position</label>
                                <input type="text" class="form-control" id="psirRecHeadPosition" autocomplete="off">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecHeadDate">Date</label>
                                <input type="date" class="form-control" id="psirRecHeadDate">
                            </div>
                        </div>
                    </div>
                    <div id="psirRecLongFields">
                        <div id="psirRecPeriodFields" class="form-row">
                            <div class="form-group col-md-4">
                                <label for="psirRecYears">Years</label>
                                <input type="text" class="form-control" id="psirRecYears" autocomplete="off" inputmode="numeric">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="psirRecMonths">Months</label>
                                <input type="text" class="form-control" id="psirRecMonths" autocomplete="off" inputmode="numeric">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="psirRecDays">Days</label>
                                <input type="text" class="form-control" id="psirRecDays" autocomplete="off" inputmode="numeric">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="psirRecPlace">Place</label>
                                <input type="text" class="form-control" id="psirRecPlace" autocomplete="off" placeholder="City or municipality">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="psirRecSignedOn">Date</label>
                                <input type="date" class="form-control" id="psirRecSignedOn">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="psirRecLongOfficer">Submitted by</label>
                                <input type="text" class="form-control" id="psirRecLongOfficer" autocomplete="off">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecLongOfficerDate">Submitted date</label>
                                <input type="date" class="form-control" id="psirRecLongOfficerDate">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="psirRecLongHeadDate">Approved date</label>
                                <input type="date" class="form-control" id="psirRecLongHeadDate">
                            </div>
                        </div>
                    </div>
                    <div id="psirRecSignFields">
                        <div class="psir-rec-sign-grid">
                            <div class="psir-rec-sign-pad">
                                <label for="psirRecSignOfficer" id="psirRecSignOfficerLabel">Investigating officer e-signature</label>
                                <canvas id="psirRecSignOfficer" width="520" height="140"></canvas>
                                <div class="psir-rec-sign-actions">
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-upload px-0" data-pad="psirRecSignOfficer">Upload image</button>
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-notes px-0" data-pad="psirRecSignOfficer">From notes</button>
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-clear px-0" data-pad="psirRecSignOfficer">Clear</button>
                                </div>
                            </div>
                            <div class="psir-rec-sign-pad">
                                <label for="psirRecSignHead" id="psirRecSignHeadLabel">Head of office e-signature</label>
                                <canvas id="psirRecSignHead" width="520" height="140"></canvas>
                                <div class="psir-rec-sign-actions">
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-upload px-0" data-pad="psirRecSignHead">Upload image</button>
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-notes px-0" data-pad="psirRecSignHead">From notes</button>
                                    <button type="button" class="btn btn-link btn-sm psir-rec-sign-clear px-0" data-pad="psirRecSignHead">Clear</button>
                                </div>
                            </div>
                        </div>
                        <div id="psirRecSignLibrary" class="psir-rec-sign-library" style="display:none">
                            <div class="psir-rec-sign-library-head">
                                <span>Images in Notes / Other Documents</span>
                                <button type="button" class="btn btn-link btn-sm px-0" id="psirRecSignLibraryClose">Close</button>
                            </div>
                            <div id="psirRecSignLibraryList" class="psir-rec-sign-library-list"></div>
                        </div>
                        <input type="file" id="psirRecSignFile" accept="image/jpeg,image/png,.jpg,.jpeg,.png" hidden>
                    </div>
                    <div class="psir-rec-editor-actions">
                        <button type="button" class="btn btn-primary" id="psirRecSave">Save</button>
                        <button type="button" class="btn btn-light border psir-rec-back">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="psirRecDownloadModal" role="dialog" aria-modal="true" aria-labelledby="psirRecDownloadTitle" style="display:none">
    <div class="ws-dl-dialog">
        <div class="ws-dl-header">
            <h2 id="psirRecDownloadTitle" class="ws-dl-title">Recommendation</h2>
            <button type="button" id="psirRecDownloadClose" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="ws-dl-body">
            <div class="ws-dl-preview">
                <iframe id="psirRecPreviewFrame" title="Recommendation preview"></iframe>
            </div>
            <div class="ws-dl-side">
                <p class="ws-dl-label">Download as</p>
                <label class="ws-dl-option is-selected">
                    <input type="radio" name="psirRecDownloadFormat" id="psirRecFormatPdf" value="pdf" checked>
                    <span>PDF</span>
                </label>
                <label class="ws-dl-option">
                    <input type="radio" name="psirRecDownloadFormat" id="psirRecFormatWord" value="word">
                    <span>Word</span>
                </label>
                <button type="button" id="psirRecDownloadBtn" class="btn btn-primary ws-dl-download">
                    <i class="fa fa-download" aria-hidden="true"></i> Download
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .psir-rec-tip { pointer-events: none; }
    .psir-rec-tip .tooltip-inner { max-width: none; white-space: nowrap; }
    #psirRecModal .psir-rec-header { align-items: flex-start; }
    #psirRecModal .psir-rec-docket { margin: 2px 0 0; color: #6c757d; font-size: 13px; }
    #psirRecModal .psir-rec-lead { color: #495057; font-size: 13px; margin-bottom: 14px; }
    #psirRecModal .modal-body { max-height: 70vh; overflow: auto; }
    #psirRecModal .psir-rec-table { border: 1px solid #e6e6e6; }
    #psirRecModal .psir-rec-table th {
        background: #f7f9fb;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: .03em;
        color: #6c757d;
    }
    #psirRecModal .psir-rec-table td { vertical-align: middle; }
    #psirRecModal .psir-rec-group td {
        background: #f7f9fb;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .03em;
        text-transform: uppercase;
        color: #6c757d;
    }
    #psirRecModal .psir-rec-name { font-weight: 600; color: #212529; }
    #psirRecModal .psir-rec-note { color: #6c757d; font-size: 12px; margin-top: 2px; }
    #psirRecModal .psir-rec-status {
        display: inline-block;
        border-radius: 999px;
        padding: 3px 10px;
        font-size: 12px;
        font-weight: 600;
        background: #f1f3f5;
        color: #495057;
    }
    #psirRecModal .psir-rec-status.is-saved { background: #e6f4ea; color: #1e7e34; }
    #psirRecModal .psir-rec-edit,
    #psirRecModal .psir-rec-print,
    #psirRecModal .psir-rec-upload { margin-left: 4px; }
    #psirRecModal .psir-rec-editor-title { font-weight: 700; margin: 4px 0 6px; }
    #psirRecModal .psir-rec-sign-grid { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
    #psirRecModal .psir-rec-sign-pad { flex: 1 1 220px; }
    #psirRecModal .psir-rec-sign-pad label { display: block; font-weight: 600; margin-bottom: 6px; }
    #psirRecModal .psir-rec-sign-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    #psirRecModal .psir-rec-sign-library {
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        background: #fbfcfd;
        margin: 4px 0 12px;
        padding: 8px 10px;
    }
    #psirRecModal .psir-rec-sign-library-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
    }
    #psirRecModal .psir-rec-sign-library-list { max-height: 160px; overflow: auto; }
    #psirRecModal .psir-rec-sign-library-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 0;
        border-top: 1px solid #eef1f4;
        font-size: 13px;
    }
    #psirRecModal .psir-rec-sign-library-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #psirRecModal .psir-rec-sign-pad canvas {
        width: 100%;
        height: 120px;
        border: 1px dashed #adb5bd;
        border-radius: 6px;
        background: #fff;
        touch-action: none;
        cursor: crosshair;
    }
    #psirRecModal .psir-rec-editor-actions { display: flex; gap: 8px; }
    #psirRecDownloadModal {
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
    #psirRecDownloadModal .ws-dl-dialog {
        background: #fff;
        width: min(1100px, 96vw);
        height: min(860px, 92vh);
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.28);
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    #psirRecDownloadModal .ws-dl-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #e6e6e6;
        flex-shrink: 0;
    }
    #psirRecDownloadModal .ws-dl-title { margin: 0; font-size: 16px; font-weight: 600; color: #212529; }
    #psirRecDownloadModal .ws-dl-body { display: flex; flex: 1; min-height: 0; }
    #psirRecDownloadModal .ws-dl-preview { flex: 1; min-width: 0; padding: 16px; background: #fff; }
    #psirRecDownloadModal .ws-dl-preview iframe {
        width: 100%;
        height: 100%;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        background: #fff;
    }
    #psirRecDownloadModal .ws-dl-side {
        width: 280px;
        flex-shrink: 0;
        border-left: 1px solid #e6e6e6;
        padding: 16px;
        display: flex;
        flex-direction: column;
        background: #fff;
    }
    #psirRecDownloadModal .ws-dl-label { font-weight: 600; margin: 0 0 12px; color: #212529; }
    #psirRecDownloadModal .ws-dl-option {
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
    #psirRecDownloadModal .ws-dl-option input { margin: 0; accent-color: #0d6efd; }
    #psirRecDownloadModal .ws-dl-option.is-selected {
        border-color: #0d6efd;
        background: #e8f2ff;
        box-shadow: 0 0 0 1px #0d6efd;
    }
    #psirRecDownloadModal .ws-dl-download { margin-top: auto; width: 100%; padding: 8px 12px; font-weight: 600; }
    #psirRecDownloadModal .ws-dl-download .fa { margin-right: 6px; }
    @media (max-width: 768px) {
        #psirRecDownloadModal .ws-dl-body { flex-direction: column; }
        #psirRecDownloadModal .ws-dl-side { width: 100%; border-left: 0; border-top: 1px solid #e6e6e6; }
        #psirRecModal .psir-rec-edit,
        #psirRecModal .psir-rec-print,
        #psirRecModal .psir-rec-upload { margin: 2px 0 2px 4px; }
    }
</style>
