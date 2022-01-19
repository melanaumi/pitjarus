var i = 1;

$('#btnTambah').click(function(e){
	var id_barang = $('select[name="id_barang1"]').val();
	var barang_text = $('select[name="id_barang1"]').find('option:selected').text();
    var jumlah_perpindahan = $('input[name="jml_perpindahan1"]').val();
    var id_ruang_asal = $('select[name=id_ruang_asal1]').val();
    var ruang_asal_text = $('select[name="id_ruang_asal1"]').find('option:selected').text();
    var id_ruang_tujuan = $('select[name=id_ruang_tujuan1]').val();
    var ruang_tujuan_text = $('select[name="id_ruang_tujuan1"]').find('option:selected').text();
    var ket_perpindahan = $('textarea[name="ket_perpindahan1"]').val();

	e.preventDefault();
	$('#body-pindah').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_barang[]" id="id_barang-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
        '<td><input type="number" class="form-control" id="jml_perpindahan" name="jml_perpindahan[]" value="'+jumlah_perpindahan+'"></td>'+
        '<td><input type="hidden" name="id_ruang_asal[]" id="id_ruang_asal-'+i+'" value="'+id_ruang_asal+'"><span id="nama_ruang-'+i+'">'+ruang_asal_text+'</span></td>'+
        '<td><input type="hidden" name="id_ruang_tujuan[]" id="id_ruang_tujuan-'+i+'" value="'+id_ruang_tujuan+'"><span id="nama_ruang-'+i+'">'+ruang_tujuan_text+'</span></td>'+
        '<td><textarea class="form-control" id="ket_perpindahan" name="ket_perpindahan[]">'+ket_perpindahan+'</textarea></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_barang+'"]').remove();
	$('select[name="id_barang1"]').val('');
    $('input[name="jml_perpindahan1"]').val('');
	$('select[name="id_ruang_asal1"]').val('');
	$('select[name="id_ruang_tujuan1"]').val('');
    $('textarea[name="ket_perpindahan1"]').val('');

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