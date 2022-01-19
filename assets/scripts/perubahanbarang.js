var i = 1;

$('#btnTambah-perubahan').click(function(e){
	var id_barang = $('select[name="id_barang1"]').val();
	var barang_text = $('select[name="id_barang1"]').find('option:selected').text();
    var idbaru = $('input[name="id_barang_baru1"]').val();
    var ruangbaru = $('input[name="nama_baru1"]').val();
    var jml = $('input[name="jumlah1"]').val();
	var keterangan = $('textarea[name="ket_perubahan_barang1"]').val();

	e.preventDefault();
	$('#body-perubahan').append('<tr id="row-'+i+'">'+
		'<td><input type="hidden" name="id_barang[]" id="id_barang-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+id_barang+'</span></td>'+
		'<td><input type="hidden" name="id_barang[]" id="id_barang-'+i+'" value="'+id_barang+'"><span id="nama_barang-'+i+'">'+barang_text+'</span></td>'+
        '<td><input type="text" class="form-control" id="id_barang_baru" name="id_barang_baru[]" value="'+idbaru+'"></td>'+      
        '<td><input type="text" class="form-control" id="nama_baru" name="nama_baru[]" value="'+ruangbaru+'"></td>'+      
        '<td><input type="number" class="form-control" id="jumlah" name="jumlah[]" value="'+jml+'"></td>'+      
        '<td><textarea class="form-control" id="ket_perubahan_barang" name="ket_perubahan_barang[]">'+keterangan+'</textarea></td>'+
		'<td>'+
		'<button type="button" class="btn btn-gradient-primary btn-rounded btn-icon remove" id="'+i+'"><i class="mdi mdi-delete-forever"></i></button>'+
		'</td>'+
	'</tr>');

	$('option[value="'+id_barang+'"]').remove();
	$('select[name="id_barang1"]').val('');
    $('input[name="id_barang_baru1"]').val('');
	$('input[name="nama_baru1"]').val('');
	$('input[name="jumlah1"]').val('');
    $('textarea[name="ket_perubahan_barang1"]').val('');

    i++;
});

$(document).on('click', '.remove', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var idbarang = $('#id_barang-'+id+'').val();
    var namabarang = $('#nama_barang-'+id+'').html();
    $('#row-'+id+'').remove();
    $('select[name="id_barang1"]').append('<option value="'+id_barang+'">'+namabarang+'</option>');
});