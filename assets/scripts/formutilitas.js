var getUrl = window.location;
var baseurl =  (getUrl.origin == 'http://localhost' ? (getUrl.origin + '/' + getUrl.pathname.split('/')[1]) : getUrl.origin) + '/'; 

var i = 1;

$('#btnCekTersedia').click(function(e){
    e.preventDefault();
    var tgl_pinjam = $('input[name="date1"]').val();
    var jam_pinjam = $('input[name="jam1"]').val();
    var tgl_selesai = $('input[name="date2"]').val();
    var jam_selesai = $('input[name="jam2"]').val();
    if (tgl_pinjam == '' || jam_pinjam == '' || tgl_selesai == '' || jam_selesai == '') {
        alert('Lengkapi data tanggal dan jam pinjam serta tanggal dan jam selesai!');
    } else {
        $.ajax({
            url: baseurl + 'index.php/formutilitas/get_available_utilitas',
            type: 'POST',
            data: {
                tgl_pinjam: tgl_pinjam,
                tgl_selesai: tgl_selesai,
                jam_pinjam: jam_pinjam,
                jam_selesai: jam_selesai
            },
            dataType: "JSON",
            success: function(data){
                $('select[name="id_ruang1"]').html('<option value="" selected="0">Pilih Ruang</option>');
                $('select[name="id_barang1"]').html('<option value="" selected="0">Pilih Barang</option>');
                $('select[name="id_kendaraan1"]').html('<option value="" selected="0">Pilih Kendaraan</option>');
                $.each(data.ruang, function(key, value){
                    $('select[name="id_ruang1"]').append('<option value="'+value.id_ruang+'">'+value.nama_ruang+'</option>');
                });
               $.each(data.barang, function(key, value){
                    $('select[name="id_barang1"]').append('<option value="'+value.id_barang+'">'+value.nama_barang+'</option>');
                });
                $.each(data.ruang, function(key, value){
                    $('select[name="id_kendaraan1"]').append('<option value="'+value.id_kendaraan+'">'+value.nama_kendaraan+'</option>');
                });
            },
            failure: function(){
                alert("Gagal mengambil data");
            }
        });
    }
});

$('#btnTambah-util').click(function(e){
	var id_ruang = $('select[name="id_ruang1"]').val();
	var ruang_text = $('select[name="id_ruang1"]').find('option:selected').text();
    var id_barang = $('select[name="id_barang1"]').val();
	var barang_text = $('select[name="id_barang1"]').find('option:selected').text();
    var id_kendaraan = $('select[name="id_kendaraan1"]').val();
	var kendaraan_text = $('select[name="id_kendaraan1"]').find('option:selected').text();
    var jml_pinjam = $('input[name="jml_pinjam1"]').val();
    var tgl_pinjam = $('input[name="date1"]').val();
    var jam_pinjam = $('input[name="jam1"]').val();
    var tgl_selesai = $('input[name="date2"]').val();
    var jam_selesai = $('input[name="jam2"]').val();
	var keterangan = $('input[name="ket_util1"]').val();

	e.preventDefault();
    if(id_ruang != '')  {
        $('#body-ruang').append('<tr id="row-ruang-'+i+'">'+
            '<td><input type="hidden" name="id_ruang[]" id="id_ruang-'+i+'" value="'+id_ruang+'"><span id="nama_ruang-'+i+'">'+ruang_text+'</span></td>'+
            '<td><input type="number" class="form-control" id="jml_pinjam" name="jml_pinjam_ruang[]" value="'+jml_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date11" name="date11_ruang[]" value="'+tgl_pinjam+'"></td>'+
            '<td><input type="time" class="form-control" id="jam11" name="jam11_ruang[]" value="'+jam_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date22" name="date22_ruang[]" value="'+tgl_selesai+'"></td>'+
            '<td><input type="time" class="form-control" id="jam22" name="jam22_ruang[]" value="'+jam_selesai+'"></td>'+
            '<td><textarea class="form-control" id="ket_util" name="ket_util_ruang[]">'+keterangan+'</textarea></td>'+
            '<td>'+
            '<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="ruang-'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
            '</td>'+
        '</tr>');

        $('option[value="'+id_ruang+'"]').remove();
        $('select[name="id_ruang1"]').val('');
        $('input[name="jml_pinjam1"]').val('');
        $('input[name="date1"]').val('');
        $('input[name="jam1"]').val('');
        $('input[name="date2"]').val('');
        $('input[name="jam2"]').val('');
        $('textarea[name="ket_util1"]').val('');
    }

    if(id_barang != '')  {
        $('#body-barang').append('<tr id="row-barang-'+i+'">'+
            '<td><input type="hidden" name="id_barang[]" id="id_barang-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
            '<td><input type="number" class="form-control" id="jml_pinjam" name="jml_pinjam_barang[]" value="'+jml_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date11" name="date11_barang[]" value="'+tgl_pinjam+'"></td>'+
            '<td><input type="time" class="form-control" id="jam11" name="jam11_barang[]" value="'+jam_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date22" name="date22_barang[]" value="'+tgl_selesai+'"></td>'+
            '<td><input type="time" class="form-control" id="jam22" name="jam22_barang[]" value="'+jam_selesai+'"></td>'+
            '<td><textarea class="form-control" id="ket_util" name="ket_util_barang[]">'+keterangan+'</textarea></td>'+
            '<td>'+
            '<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="barang-'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
            '</td>'+
        '</tr>');

        $('option[value="'+id_barang+'"]').remove();
        $('select[name="id_barang1"]').val('');
        $('input[name="jml_pinjam1"]').val('');
        $('input[name="date1"]').val('');
        $('input[name="jam1"]').val('');
        $('input[name="date2"]').val('');
        $('input[name="jam2"]').val('');
        $('textarea[name="ket_util1"]').val('');
    }

    if(id_kendaraan != '')  {
        $('#body-kendaraan').append('<tr id="row-kendaraan-'+i+'">'+
            '<td><input type="hidden" name="id_kendaraan[]" id="id_kendaraan-'+i+'" value="'+id_kendaraan+'"><span id="nama_kendaraan-'+i+'">'+kendaraan_text+'</span></td>'+
            '<td><input type="number" class="form-control" id="jml_pinjam" name="jml_pinjam_kendaraan[]" value="'+jml_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date11" name="date11_kendaraan[]" value="'+tgl_pinjam+'"></td>'+
            '<td><input type="time" class="form-control" id="jam11" name="jam11_kendaraan[]" value="'+jam_pinjam+'"></td>'+
            '<td><input type="date" class="form-control" id="date22" name="date22_kendaraan[]" value="'+tgl_selesai+'"></td>'+
            '<td><input type="time" class="form-control" id="jam22" name="jam22_kendaraan[]" value="'+jam_selesai+'"></td>'+
            '<td><textarea class="form-control" id="ket_util" name="ket_util_kendaraan[]">'+keterangan+'</textarea></td>'+
            '<td>'+
            '<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="kendaraan-'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
            '</td>'+
        '</tr>');

        $('option[value="'+id_kendaraan+'"]').remove();
        $('select[name="id_kendaraan1"]').val('');
        $('input[name="jml_pinjam1"]').val('');
        $('input[name="date1"]').val('');
        $('input[name="jam1"]').val('');
        $('input[name="date2"]').val('');
        $('input[name="jam2"]').val('');
        $('textarea[name="ket_util1"]').val('');
    }

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var id_item = $('#id_'+id+'').val();
    var nama_item = $('#nama_'+id+'').html();
    $('#row-'+id+'').remove();
    if (id.includes('kendaraan')) {
        $('select[name="id_kendaraan1"]').append('<option value="'+id_item+'">'+nama_item+'</option>');
    } else if (id.includes('barang')) {
        $('select[name="id_barang1"]').append('<option value="'+id_item+'">'+nama_item+'</option>');
    } else if (id.includes('ruang')) {
        $('select[name="id_ruang1"]').append('<option value="'+id_item+'">'+nama_item+'</option>');
    }
});