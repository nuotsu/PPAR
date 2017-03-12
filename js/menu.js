$(function() {
	// BG
		$('body').prepend('<div class="bg"></div>')
		$('.bg').css({
			'position':'fixed',
			'left':'0',
			'right': '0',
			'top': '0',
			'bottom': '0',
			'z-index': '-1'
		})

	$('.menu .dragger').click(function() {
		$(this)
			.toggleClass('open')
			.toggleClass('close')
		$('.menu .contents').slideToggle(150, 'swing')
	})
	$('div:not(.menu), .bg').click(function() {
		$('.menu .dragger')
			.addClass('open')
			.removeClass('close')
		$('.menu .contents').slideUp(150, 'swing')
	})
})