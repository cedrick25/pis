<?php $this->load->view('templates/header.php'); ?> 

    <style type="text/css">
        .select2 {
            height: calc(2.25rem + 2px)!important;
        }
        .qr-code {
            max-width: 200px;
            margin: 10px;
        }
        span {
        	margin-left: 17px;
        }
        .barcode_qr {
        	margin-bottom: 10px;
        }
    </style>
<body>
    <div class="barcode_base">
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 

	
    <script type="text/javascript">
        jQuery(document).ready(function($) {                                           

            var __urlParam = function(name){
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results==null) {
                   return null;
                }
                return decodeURI(results[1]) || 0;
            }
            var stickerNo = __urlParam('no')
            
            var MyDate = new Date();
            var nowDate;

            MyDate.setDate(MyDate.getDate() + 1); // +1 day
            var d = ('0' + MyDate.getDate()).slice(-2)
            var m = ('0' + (MyDate.getMonth()+1)).slice(-2)
            var y = MyDate.getFullYear()
            nowDate = d+"-"+m+"-"+y
            // console.log(nowDate)

            function generateRandomString(length) {

	            var text = "";
	            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                return text;
            }

            for (let i = 0; i < stickerNo; ++i) {
                var random = generateRandomString(5)
                $(".barcode_base").append('<div class="barcode_qr">'+
                	'<img src="https://chart.googleapis.com/chart?cht=qr&chl=culong-&chs=160x160&chld=L|0" class="qr-code img-thumbnail img-responsive" /><br>'+
                        '<span>culong-'+m+y+'-'+random+'</span>'+
                    '</div>'
                );
            }
      		window.print();
        })
    </script>
</body>

</html>