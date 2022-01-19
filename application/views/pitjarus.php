<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<title>TEST PITJARUS</title>

		<link rel="stylesheet" href="<?php echo base_url();?>/assets/vendors/mdi/css/materialdesignicons.min.css">
		<link rel="stylesheet" href="<?php echo base_url();?>/assets/css/style.css">
		<link rel="stylesheet" href="<?= base_url("assets/jquery-ui/jquery-ui.css") ?>">
		<link rel="stylesheet" href="<?php echo base_url();?>/assets/bootstrap-datepicker/css/bootstrap-datepicker.min.css">
    <script src="<?= base_url('assets/jquery/jquery-3.2.1.min.js') ?>"></script>
		<script src="<?php echo base_url();?>/assets/vendors/js/vendor.bundle.base.js"></script>
		<script src="<?= base_url('assets/jquery-ui/jquery-ui.js') ?>"></script>
		<script src="<?php echo base_url();?>/assets/js/off-canvas.js"></script>
		<script src="<?php echo base_url();?>/assets/js/hoverable-collapse.js"></script>
		<script src="<?php echo base_url();?>/assets/vendors/chart.js/Chart.min.js"></script>
		<script src="<?php echo base_url();?>/assets/js/dashboard.js"></script>
		<script src="<?php echo base_url();?>/assets/DataTables-1.10.16/media/js/jquery.js"></script>
		<script src="<?php echo base_url();?>/assets/js/chart.js"></script>
	</head>
	
	<body>
		<div class="container-scroller">
		  <div class="main-panel">
        <div class="col-lg-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">Select Area</button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item"></a>
                    <?php foreach($getarea as $b) : ?>
                      <a class="dropdown-item"><input type="checkbox" value="<?= $b->area_id ?>" name="area_id[]"><?= $b->area_name; ?></a>
                    <?php endforeach; ?>
                  </div>
                </div>

                <div class="btn-group">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">Select Date From</button>
                  <div class="dropdown-menu">
                  <input type="date" class="form-control" id="datefrom" name="datefrom">
                  </div>
                </div>

                <div class="btn-group">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">Select Date To</button>
                  <div class="dropdown-menu">
                  <input type="date" class="form-control" id="dateto" name="dateto">
                  </div>
                </div>
              
                <a href="#" onclick="showChart()"><button type="button" class="btn btn-outline-info btn-icon-text"> View <i class="mdi mdi-eye btn-icon-append"></i></button></a><br><br>

                <center><h4 class="card-title"><b>GRAFIK DATA PT PITJARUS TEST</b></h4></center>

                <div class="row">
                  <div class="col-lg-6 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <canvas id="myBarChart" style="height:730px"></canvas>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                      <table class="table table-hover">
                        <thead>
                          <tr id="table-header">
                            <th>Brand</th>
                          </tr>
                        </thead>
                        <tbody id="table-detail">
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

		<link rel="stylesheet" href="<?php echo base_url();?>/assets/vendors/css/vendor.bundle.base.css">
		<script>
    var barChart = null;

    $(document).ready(function(){
      showChart();
    });

    function showChart(){
      var tgl_start = $('input[name="datefrom"]').val();
      var tgl_end = $('input[name="dateto"]').val();
      var id_area = [];
      $('input[name="area_id[]"]:checked').each(function(){
        id_area.push($(this).val());
      });
      var card_description = "Periode ";

      console.log(id_area);

      if (tgl_start != '' && tgl_end != '') {
        card_description += (dateIndo(tgl_start) + " s.d. " + dateIndo(tgl_end));
      } else {
        if (tgl_start != '') {
          card_description += (dateIndo(tgl_start) + " s.d. <?= strftime("%e %B %Y") ?>");
        } else if (tgl_end != '') {
          card_description += (" s.d. " + dateIndo(tgl_end));
        }
      }

      $.ajax({
        url: "<?= site_url('pitjarus/get_report') ?>",
        type: "POST",
        data: {
          start_date: tgl_start,
          end_date: tgl_end,
          area_id: id_area
        },
        dataType: "JSON",
        success: function(result) {
          var labels = [];
          var datasets = [];
          var table_headers = '<th class="text-center">Brand</th>';
          var table_body = '';

          $.each(result.area, function(key, value) {
            labels.push(value.area_name);

            table_headers += '<th class="text-center">' + value.area_name + '</th>';
          });

          $.each(result.charts, function(key, value) {
            var mydata = [];
            $.each(result.area, function(key1, value1) {
              var area_id = value1.area_id;
              mydata.push(value["compliance_area_" + area_id]);
            });

            var dataset = {
              label: value.brand_name,
              data: mydata,
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255,99,132,1)'],
              borderWidth: 1,
              fill: false
            }
            datasets.push(dataset);
          });

          var data = {
            labels: labels,
            datasets: datasets
          };

          var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          };

          $.each(result.data, function(key, value) {
            table_body += '<tr><td class="text-center">' + value.brand_name + '</td>';
            $.each(result.area, function(key1, value1) {
              var area_id = value1.area_id;
              table_body += '<td class="text-center">' + value["compliance_area_" + area_id] + '%</td>';
            });
            table_body += '</tr>';
          });

          $('#table-header').html(table_headers);
          $('#table-detail').html(table_body);

          if (barChart != null) barChart.destroy();
          var barChartCanvas = document.getElementById('myBarChart').getContext('2d')
          barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }
      });
    }

    function dateIndo(date) {
      var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      var dates = date.split('-');
      return parseInt(dates[2]) + ' ' + months[parseInt(dates[1]) - 1] + ' ' + dates[0];
    }
		</script>
	</body>
</html>