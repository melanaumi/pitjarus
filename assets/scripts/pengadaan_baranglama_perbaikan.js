var i = 1;

$('#btnTambahLamaPerbaikan').click(function(e){
    var id_barang_lama = $('select[name="id_barang_lama1"]').val();
    var barang_lama_text = $('select[name="id_barang_lama1"]').find('option:selected').text();
    var id_barang_baru = $('select[name="id_barang_baru1"]').val();
    var barang_baru_text = $('select[name="id_barang_baru1"]').find('option:selected').text();
    var jml_barang = $('input[name="jml_barang1"]').val();
    var id_ruang_asal = $('select[name="id_ruang_asal1"]').val();
	var ruang_asal_text = $('select[name="id_ruang_asal1"]').find('option:selected').text();
    var id_ruang_tujuan = $('select[name="id_ruang_tujuan1"]').val();
	var ruang_tujuan_text = $('select[name="id_ruang_tujuan1"]').find('option:selected').text();
	var keterangan = $('textarea[name="ket_pengadaan1"]').val();

	e.preventDefault();
	$('#body-detail').append('<tr id="row-'+i+'">'+
        '<td><input type="hidden" name="id_barang_lama[]" id="id_barang_lama-'+i+'" value="'+id_barang_lama+'"><span id="nama_barang-'+i+'">'+id_barang_lama+'</span></td>'+
        '<td><span id="nama_barang-'+i+'">'+barang_lama_text+'</span></td>'+
        '<td><input type="hidden" name="id_barang_baru[]" id="id_barang_baru-'+i+'" value="'+id_barang_baru+'"><span id="nama_barang-'+i+'">'+id_barang_baru+'</span></td>'+
        '<td><span id="nama_barang-'+i+'">'+barang_baru_text+'</span></td>'+
        '<td><input type="number" class="form-control" id="jml_barang" name="jml_barang[]" value="'+jml_barang+'"></td>'+
        '<td><input type="hidden" name="id_ruang_asal[]" id="id_ruang_asal-'+i+'" value="'+id_ruang_asal+'"><span id="nama_ruang-'+i+'">'+ruang_asal_text+'</span></td>'+
        '<td><input type="hidden" name="id_ruang_tujuan[]" id="id_ruang_tujuan-'+i+'" value="'+id_ruang_tujuan+'"><span id="nama_ruang-'+i+'">'+ruang_tujuan_text+'</span></td>'+
		'<td><input type="text" class="form-control" id="ket_pengadaan" name="ket_pengadaan[]" value="'+keterangan+'"></td>'+
		'<td>'+'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+'</td>'+
	'</tr>');

    $('option[value="'+id_barang_lama+'"]').remove();
	$('select[name="id_barang_lama1"]').val('');
    $('option[value="'+barang_lama_text+'"]').remove();
	$('select[name="id_barang_lama1"]').val('');
    $('option[value="'+id_barang_baru+'"]').remove();
	$('select[name="id_barang_baru1"]').val('');
    $('option[value="'+barang_baru_text+'"]').remove();
	$('select[name="id_barang_lama1"]').val('');
    $('input[name="jml_barang1"]').val('');
    $('input[name="kondisi_barang1"]').val('');
	$('option[value="'+id_ruang_asal+'"]').remove();
	$('select[name="id_ruang_asal1"]').val('');
    $('option[value="'+id_ruang_tujuan+'"]').remove();
	$('select[name="id_ruang_tujuan1"]').val('');
	$('input[name="ket_pengadaan1"]').val('');

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