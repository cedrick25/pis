<?php $this->load->view('templates/header.php'); ?> 
<body>
  <div class="" style="padding-top: 40px">
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-md-12" style="text-align: center;">
        <span>Republic of the Philippines</span><br>
        <span>Department of Environment and Natural Resources</span>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-md-12" style="text-align: center;">
        <h4 class=""><b>MINES AND GEOSCIENCE BUREAU</b></h4>
        <span>North Avenue, Diliman, Quezon City</span>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-md-12" style="padding-top: 30px">
        <h4 class="" style="text-align: center;"><b>DATA TRACKING REPORT</b></h4>
      </div>
    </div><br>
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-md-12 div-table">
        <table class="table table-bordered table-darker" style="width:100%"  id="T_report">
          <thead class="small tb-header">
            <tr>
              <th colspan="5" style="text-align: center;">REFERENCE</th>
              <th colspan="6" style="text-align: center;">ROUTING AND ACTIONS</th>
            </tr>
            <tr>
              <th style="text-align: center;">DOC NO.</th>
              <th style="text-align: center;">SENDER</th>
              <th style="text-align: center;">COMPANY/ADDRESS</th>
              <th style="text-align: center;">SUBJECT</th>
              <th style="text-align: center;">ADDRESSEE</th>
              <th style="text-align: center;">FROM</th>
              <th style="text-align: center;">DATE RECEIVED</th>
              <th style="text-align: center;">TO</th>
              <th style="text-align: center;">DATE RELEASED</th>
              <th style="text-align: center;">REMARKS</th>
            </tr>
          </thead >
          <tbody class="report_tbody tbody-sm">
            <tr>
              <td>DOC-0090</td>
              <td>Lilian Martin</td>
              <td>MINING TECHNOLOGY DIVISION</td>
              <td>PURCHASE REQUEST</td>
              <td>ADDRESSE SAMPLE</td>
              <td>OFFICE OF THE CHIEF</td>
              <td>09/20/2022</td>
              <td>LGSD</td>
              <td>09/20/2022</td>
              <td>PENDING FOLDER</td>
            </tr>
            <tr>
              <td>DOC-0091</td>
              <td>Lilian Martin</td>
              <td>MINING TECHNOLOGY DIVISION</td>
              <td>PURCHASE REQUEST</td>
              <td>ADDRESSE SAMPLE</td>
              <td>OFFICE OF THE CHIEF</td>
              <td>09/20/2022</td>
              <td>LGSD</td>
              <td>09/20/2022</td>
              <td>ATTACH FOLLOWING</td>
            </tr>
            <tr>
              <td>DOC-0092</td>
              <td>Lilian Martin</td>
              <td>MINING TECHNOLOGY DIVISION</td>
              <td>PURCHASE REQUEST</td>
              <td>ADDRESSE SAMPLE</td>
              <td>OFFICE OF THE CHIEF</td>
              <td>09/20/2022</td>
              <td>LGSD</td>
              <td>09/20/2022</td>
              <td>SIGNED BY AD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
<?php $this->load->view('templates/footer.php'); ?> 

  <script type="text/javascript">
    jQuery(document).ready(function($) {
      window.print();
    });
  </script>