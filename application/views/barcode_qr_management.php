<?php $this->load->view('templates/header.php'); ?> 


    <!-- Left Panel -->

    <?php $this->load->view('templates/left-panel.php'); ?> 
    
    <!-- /#left-panel -->

    <!-- barcode modal -->
    <div class="modal fade" id="barcodeModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Generate barcode or QRcode</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row form-group col-md-12">
                        <div class="col col-md-3" ><label for="generateInput" class=" form-control-label">No. of sticker</label></div>
                        <div class="col-12 col-md-9"><input type="number" id="generateInput" name="text-input" placeholder="number" class="form-control"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm genBarcodebtn" type="submit">Generate Barcode</button>
                    <button type="button" class="btn btn-primary btn-sm genQRbtn" type="submit">Generate QRcode</button>
                </div>
            </div>
        </div>
    </div> 
    <!-- barcode modal -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <?php $this->load->view('templates/avatar.php'); ?> 
        <!-- /header -->

        <div class="breadcrumbs">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Barcode QR Generator</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <li><a href="dashboard">Dashboard</a></li>
                            <li class="active">Barcode QR Generator</li>
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
                            <div class="card-header">
                                <strong class="card-title">Barcode QR Generator</strong>
                                <!-- <button class="btn btn-sm btn-success float-right" type="submit"><i class="fa fa-plus-circle"></i> Purchase Order</button> -->
                            </div>
                            <div class="card-body">
                                <button class="btn btn-sm btn-success" type="submit" data-toggle="modal" data-target="#barcodeModal"><i class="fa fa-barcode"></i> Generate </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


    </div>
    <?php $this->load->view('templates/footer.php'); ?> 

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $(".genBarcodebtn").unbind('click').on('click', function(){
                window.open("barcode?no="+$("#generateInput").val() ,'_blank');
            })
            $(".genQRbtn").unbind('click').on('click', function(){
                window.open("qrcode?no="+$("#generateInput").val() ,'_blank');
            })
        })
    </script>
</body>
</html>
