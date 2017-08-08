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

	// Copyright
		today = new Date()
		$('#cprt_year').html(today.getFullYear())
})
