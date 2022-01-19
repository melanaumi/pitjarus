var i = 1;

$('#btnTambah-perubahan').click(function(e){
	var id_ruang = $('select[name="id_ruang1"]').val();
	var ruang_text = $('select[name="id_ruang1"]').find('option:selected').text();
    var ruangbaru = $('input[name="nama_ruang_baru1"]').val();
    var id_jenis_ruang = $('select[name="jenisruang1"]').val();
	var jenis_ruang_text = $('select[name="jenisruang1"]').find('option:selected').text();
	var keterangan = $('textarea[name="ket_perubahan1"]').val();

	e.preventDefault();
	$('#body-perubahan').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_ruang[]" id="id_ruang-'+i+'" value="'+id_ruang+'"><span id="nama_ruang-'+i+'">'+ruang_text+'</span></td>'+
		'<td><input type="text" class="form-control" id="nama_ruang_baru" name="nama_ruang_baru[]" value="'+ruangbaru+'"></td>'+
        '<td><input type="hidden" name="id_jenis_ruang[]" id="id_jenis_ruang-'+i+'" value="'+id_jenis_ruang+'"><span id="nama_ruang-'+i+'">'+jenis_ruang_text+'</span></td>'+
        '<td><textarea class="form-control" id="ket_perubahan" name="ket_perubahan[]">'+keterangan+'</textarea></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_ruang+'"]').remove();
	$('select[name="id_ruang1"]').val('');
	$('input[name="nama_ruang_baru1"]').val('');
	$('select[name="id_jenis_ruang1"]').val('');
    $('textarea[name="ket_perubahan1"]').val('');

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var idruang = $('#id_ruang-'+id+'').val();
    var namaruang = $('#nama_ruang-'+id+'').html();
    $('#row-'+id+'').remove();
    $('select[name="id_ruang1"]').append('<option value="'+idruang+'">'+namaruang+'</option>');
});