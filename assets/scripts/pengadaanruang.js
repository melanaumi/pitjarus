var i = 1;

$('#btnTambah-perubahan').click(function(e){
	var id_ruang = $('select[name="id_ruang1"]').val();
	var ruang_text = $('select[name="id_ruang1"]').find('option:selected').text();
    var idruangbaru = $('input[name="id_ruang_baru1"]').val();
    var ruangbaru = $('input[name="nama_ruang_baru1"]').val();
    var id_jenis_ruang = $('select[name="jenisruang1"]').val();
	var jenis_ruang_text = $('select[name="jenisruang1"]').find('option:selected').text();
    var id_lantai = $('select[name="lantai1"]').val();
	var lantai_text = $('select[name="lantai1"]').find('option:selected').text();
    var id_gedung = $('select[name="gedung1"]').val();
	var gedung_text = $('select[name="gedung1"]').find('option:selected').text();
    var luas = $('input[name="luas_ruang1"]').val();
    var kapasitas = $('input[name="kapasitas_ruang1"]').val();
    var ket = $('input[name="ket_ruang1"]').val();

	e.preventDefault();
	$('#body-perubahan').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_ruang[]" id="id_ruang-'+i+'" value="'+id_ruang+'"><span id="nama_ruang-'+i+'">'+ruang_text+'</span></td>'+
        '<td><input type="text" class="form-control" id="id_ruang_baru" name="id_ruang_baru[]" value="'+idruangbaru+'"></td>'+
        '<td><input type="text" class="form-control" id="nama_ruang_baru" name="nama_ruang_baru[]" value="'+ruangbaru+'"></td>'+
        '<td><input type="hidden" name="id_jenis_ruang[]" id="id_jenis_ruang-'+i+'" value="'+id_jenis_ruang+'"><span id="nama_jenis_ruang-'+i+'">'+jenis_ruang_text+'</span></td>'+
        '<td><input type="hidden" name="id_lantai[]" id="id_lantai-'+i+'" value="'+id_lantai+'"><span id="nama_lantai-'+i+'">'+lantai_text+'</span></td>'+
        '<td><input type="hidden" name="id_gedung[]" id="id_gedung-'+i+'" value="'+id_gedung+'"><span id="nama_gedung-'+i+'">'+gedung_text+'</span></td>'+
        '<td><input type="number" class="form-control" id="luas_ruang" name="luas_ruang[]" value="'+luas+'"></td>'+
        '<td><input type="number" class="form-control" id="kapasitas_ruang" name="kapasitas_ruang[]" value="'+kapasitas+'"></td>'+
        '<td><input type="text" class="form-control" id="ket_ruang" name="ket_ruang[]">'+ket+'</textarea></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_ruang+'"]').remove();
	$('select[name="id_ruang1"]').val('');
    $('input[name="id_ruang_baru1"]').val('');
	$('input[name="nama_ruang_baru1"]').val('');
    $('option[value="'+id_jenis_ruang+'"]').remove();
	$('select[name="id_jenis_ruang1"]').val('');
    $('option[value="'+id_lantai+'"]').remove();
	$('select[name="id_lantai1"]').val('');
    $('option[value="'+id_gedung+'"]').remove();
	$('select[name="id_gedung1"]').val('');
    $('input[name="luas_ruang1"]').val('');
    $('input[name="kapasitas_ruang1"]').val('');
    $('input[name="ket_ruang1"]').val('');

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