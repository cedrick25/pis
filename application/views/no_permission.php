<?php $this->load->view('templates/header.php'); ?>
<style>
    .pis-no-permission-wrap {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    }
    .pis-no-permission-card {
        max-width: 34rem;
        width: 100%;
        text-align: center;
        padding: 2.25rem 1.75rem;
        border: 1px solid #e3e6ea;
        border-radius: 0.5rem;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    .pis-no-permission-card .pis-lock-icon {
        font-size: 2.75rem;
        color: #6c757d;
        margin-bottom: 0.75rem;
    }
    .pis-no-permission-card h4 {
        margin-bottom: 0.75rem;
        font-weight: 600;
        color: #212529;
    }
    .pis-no-permission-card p {
        color: #495057;
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    .pis-no-permission-card .pis-hint {
        font-size: 0.9rem;
        color: #6c757d;
        margin-top: 1rem;
        margin-bottom: 0;
    }
</style>
<body>
    <?php $this->load->view('templates/left-panel.php'); ?>

    <div id="right-panel" class="right-panel">
        <?php $this->load->view('templates/avatar.php'); ?>

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Access Restricted</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li class="active">No Permission</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="content mt-3">
            <div class="pis-no-permission-wrap">
                <div class="pis-no-permission-card" role="alert" aria-live="polite">
                    <div class="pis-lock-icon" aria-hidden="true"><i class="fa fa-lock"></i></div>
                    <h4>No permissions assigned to your role</h4>
                    <p>
                        Your account signed in successfully, but this user role does not have any
                        permissions yet. That is why menus and actions are unavailable.
                    </p>
                    <p>
                        Please contact your <strong>system administrator</strong> and ask them to
                        assign permissions for your role in <strong>User Roles → Grant Permission</strong>.
                    </p>
                    <p class="pis-hint">
                        After permissions are granted, sign out and sign in again to refresh your access.
                    </p>
                </div>
            </div>
        </div>
    </div>

<?php $this->load->view('templates/footer.php'); ?>
</body>
</html>
