var i = 1;

$('#btnBagi').click(function(e){
	var id_barang = $('select[name="id_atk2"]').val();
	var barang_text = $('select[name="id_atk2"]').find('option:selected').text();
	var jumlah_pembagian = $('input[name="jml_pembagian1"]').val();

	e.preventDefault();
	$('#body-detail-bagi').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_atk[]" id="id_atk-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
		'<td><input type="number" class="form-control" id="jml_pembagian" name="jml_pembagian[]" value="'+jumlah_pembagian+'"></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_barang+'"]').remove();
	$('select[name="id_atk2"]').val('');
	$('input[name="jml_pembagian1"]').val('');

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var id_barang = $('#id_atk-'+id+'').val();
    var nama_barang = $('#nama_barang-'+id+'').html();
    $('#row-'+id+'').remove();
    $('select[name="id_atk2"]').append('<option value="'+id_barang+'">'+nama_barang+'</option>');
});