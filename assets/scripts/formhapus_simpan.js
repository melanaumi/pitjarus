var i = 1;

$('#btnTambahHapusSimpan').click(function(e){
	var id_barang = $('select[name="id_barang1"]').val();
	var barang_text = $('select[name="id_barang1"]').find('option:selected').text();
	var jumlah_penghapusan = $('input[name="jml_penghapusan1"]').val();
    var id_ruang_asal = $('select[name="id_ruang_asal1"]').val();
	var ruang_asal_text = $('select[name="id_ruang_asal1"]').find('option:selected').text();
    var id_ruang_tujuan = $('select[name="id_ruang_tujuan1"]').val();
	var ruang_tujuan_text = $('select[name="id_ruang_tujuan1"]').find('option:selected').text();
	var kondisi = $('textarea[name="kondisi_barang1"]').val();	
	var ket = $('textarea[name="ket_penghapusan1"]').val();	

	e.preventDefault();
	$('#body-detail').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_barang[]" id="id_barang-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
		'<td><input type="number" class="form-control" id="jml_penghapusan" name="jml_penghapusan[]" value="'+jumlah_penghapusan+'"></td>'+
		'<td><input type="hidden" name="id_ruang_asal[]" id="id_ruang_asal-'+i+'" value="'+id_ruang_asal+'"><span id="nama_barang-'+i+'">'+ruang_asal_text+'</span></td>'+
        '<td><input type="hidden" name="id_ruang_tujuan[]" id="id_ruang_tujuan-'+i+'" value="'+id_ruang_tujuan+'"><span id="nama_barang-'+i+'">'+ruang_tujuan_text+'</span></td>'+
        '<td><input type="text" class="form-control" id="kondisi_barang" name="kondisi_barang[]" value="'+kondisi+'"></td>'+
		'<td><input type="text" class="form-control" id="ket_penghapusan" name="ket_penghapusan[]" value="'+ket+'"></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_barang+'"]').remove();
	$('select[name="id_barang1"]').val('');
	$('input[name="jml_penghapusan1"]').val('');
	$('option[value="'+id_ruang_asal+'"]').remove();
	$('select[name="id_ruang_asal1"]').val('');
    $('option[value="'+id_ruang_tujuan+'"]').remove();
	$('select[name="id_ruang_tujuan1"]').val('');
	$('input[name="kondisi_barang1"]').val('');
	$('input[name="ket_penghapusan1"]').val('');

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var id_barang = $('#id_barang-'+id+'').val();
    var nama_barang = $('#nama_barang-'+id+'').html();
    $('#row-'+id+'').remove();
    $('select[name="id_barang1"]').append('<option value="'+id_barang+'">'+nama_barang+'</option>');
});