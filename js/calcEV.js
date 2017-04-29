$(function() {
	$('#calcEV').change(function() {
		$('#sos').html( Math.floor($(this).val() / 18) )
		$('#remainder').html( $(this).val() % 18 )
	})
})