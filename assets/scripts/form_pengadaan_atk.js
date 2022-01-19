var i = 1;

$('#btnTambah').click(function(e){
	var id_barang = $('select[name="id_atk1"]').val();
	var barang_text = $('select[name="id_atk1"]').find('option:selected').text();
	var jumlah_pengadaan = $('input[name="jml_pengadaan1"]').val();

	e.preventDefault();
	$('#body-detail').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_atk[]" id="id_atk-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
		'<td><input type="number" class="form-control" id="jml_pengadaan" name="jml_pengadaan[]" value="'+jumlah_pengadaan+'"></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_barang+'"]').remove();
	$('select[name="id_atk1"]').val('');
	$('input[name="jml_pengadaan1"]').val('');

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var id_barang = $('#id_atk-'+id+'').val();
    var nama_barang = $('#nama_barang-'+id+'').html();
    $('#row-'+id+'').remove();
    $('select[name="id_atk1"]').append('<option value="'+id_barang+'">'+nama_barang+'</option>');
});