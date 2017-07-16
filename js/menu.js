$(function() {
	// <meta> info
		$('head').prepend(
			'<meta title="PPAR (Pokémon Pixel Art Randomizer)">' +
			'<meta description="' +
				'Generate wallpapers and images made up of randomized pixel art from the Pokémon games.' +
			'">' +
			'<meta keywords="' +
				'Nuotsu, PPAR, Pokémon Pixel Art Randomizer, GitHub, wallpaper' +
			'">'
		);

	// Click other/BG to hide Menu
		$('body').prepend('<div class="bg"></div>')
		$('.bg').css({
			'position':'fixed',
			'left':'0',	'right': '0',
			'top': '0',	'bottom': '0',
			'z-index': '-1'
		})

	// Menu
		$('.menu .dragger').click(function() {
			$(this)
				.toggleClass('open')
				.toggleClass('close')
			$('.menu .contents').slideToggle(150, 'swing')
		})
		$('body div:not(.menu)').click(function() {
			$('.menu .dragger')
				.addClass('open')
				.removeClass('close')
			$('.menu .contents').slideUp(150, 'swing')
		})

	// Copyright
		today = new Date()
		$('#cprt_year').html(today.getFullYear())
})
