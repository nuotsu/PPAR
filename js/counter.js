$(function(){
	// Undo
		$('.c-1 .plus, .c-1 .minus, .c-1 .reset').click(function() {
			current = $('.c-1 #number').val()
			$('.c-1 #undo').html(current)
		})
		$('.c-2 .plus, .c-2 .minus, .c-2 .reset').click(function() {
			current = $('.c-2 #number').val()
			$('.c-2 #undo').html(current)
		})

	// Keypresses
		$(document).keypress(function(e) {
			current = $('.c-active #number').val()
			keycode = (e.keycode ? e.keycode : e.which)
			// '`/~' = Switch Counters
				if (keycode == '96') {
					if ($('.counter').hasClass('c-active') == true) {
						$('.counter').toggleClass('c-active')
					}
					$('.active-icon').toggleClass('ai-hide')
				}

			// ']' = +1
				if (keycode == '93') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 + $('.c-active #key93').html()*1)
				}
			// '=/+' = +10
				if (keycode == '61') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 + $('.c-active #key61').html()*1)
				}
			// '[Quotation]' = +18
				if (keycode == '39') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 + $('.c-active #key39').html()*1)
					encounter = Math.floor($('.c-active #number').val() / 18)
					$('.c-active #encounter').html(encounter + '匹')
				}
			// '[' = -1
				if (keycode == '91') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 - 1)
				}
			// '-' - -10
				if (keycode == '45') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 - 10)
				}
			// ';/:' = -18
				if (keycode == '59') {
					$('.c-active #undo').html(current)
					$('.c-active #number').val(current*1 - $('.c-active #key59').html()*1)
					encounter = Math.floor($('.c-active #number').val() / 18)
					if (encounter < 0) {
						$('.c-active #encounter').html('')
					} else {
						$('.c-active #encounter').html(encounter + '匹')
					}
				}
			// Clear #encounter for non-.enc-btn
				if (keycode == '93' || keycode == '61' || keycode == '91' || keycode == '45') {
					$('.c-active #encounter').html('')
				}

			// 'p' = Pokérus
				if (keycode == '112') {
					$('.c-active #pokerus').click()
				}
			// 'z' = Undo
				if (keycode == '122') {
					$('.c-active #number').val($('.c-active #undo').html())
				}
		})

	// Add
		$('.c-1 .plus').on('click', function() {
			current = $('.c-1 #number').val()
			count = $(this).html()
			$('.c-1 #number').val( current*1 + count*1 )
		})
		$('.c-2 .plus').on('click', function() {
			current = $('.c-2 #number').val()
			count = $(this).html()
			$('.c-2 #number').val( current*1 + count*1 )
		})
	// Subtract
		$('.c-1 .minus').on('click', function() {
			current = $('.c-1 #number').val()
			count = $(this).html()
			$('.c-1 #number').val( current*1 - count*1 )
		})
		$('.c-2 .minus').on('click', function() {
			current = $('.c-2 #number').val()
			count = $(this).html()
			$('.c-2 #number').val( current*1 - count*1 )
		})
	// Reset
		$('.c-1 .reset').on('click', function() {
			reset = $(this).html()
			$('.c-1 #number').val(reset)
		})
		$('.c-2 .reset').on('click', function() {
			reset = $(this).html()
			$('.c-2 #number').val(reset)
		})

	// Active
		$('.active-icon').click(function() {
			if ($('.counter').hasClass('c-active') == true) {
				$('.counter').toggleClass('c-active')
			}
			$('.active-icon').toggleClass('ai-hide')
		})
		$('.active-icon').attr({
			'title': "Press: ], +, [, -, p, z, ~"
		})

	// Encounter
		$('.c-1 .enc-btn').click(function() {
			encounter = Math.floor($('.c-1 #number').val() / 18)
			if (encounter < 0) {
				$('.c-1 #encounter').html('')
			} else {
				$('.c-1 #encounter').html(encounter + '匹')
			}
		})
		$('.c-1 .buttons td:not(.enc-btn)').click(function() {
			$('.c-1 #encounter').html('')
		})
		$('.c-2 .enc-btn').click(function() {
			encounter = Math.floor($('.c-2 #number').val() / 18)
			if (encounter < 0) {
				$('.c-2 #encounter').html('')
			} else {
				$('.c-2 #encounter').html(encounter + '匹')
			}
		})
		$('.c-2 .buttons td:not(.enc-btn)').click(function() {
			$('.c-2 #encounter').html('')
		})

	// Pokerus
		$('.c-1 #pokerus').change(function() {
			if ($('body').hasClass('darkest_bg') == false) {
				if ($(this).prop('checked') == true) {
					$('.c-1 .plus').each(function() {
						$(this)
							.html($(this).html() * 2)
							.css({ 'background': '#fd69de' })
					})
				} else {
					$('.c-1 .plus').each(function() {
						$(this)
							.html($(this).html() / 2)
							.css({ 'background': '#E91E63' })
					})
				}
			} else {
				if ($(this).prop('checked') == true) {
					$('.c-1 .plus').each(function() {
						$(this)
							.html($(this).html() * 2)
							.css({ 'background': '#fd69de' })
					})
				} else {
					$('.c-1 .plus').each(function() {
						$(this)
							.html($(this).html() / 2)
							.css({ 'background': '#455A64' })
					})
				}
			}
		})
		$('.c-2 #pokerus').change(function() {
			if ($('body').hasClass('darkest_bg') == false) {
				if ($(this).prop('checked') == true) {
					$('.c-2 .plus').each(function() {
						$(this)
							.html($(this).html() * 2)
							.css({ 'background': '#fd69de' })
					})
				} else {
					$('.c-2 .plus').each(function() {
						$(this)
							.html($(this).html() / 2)
							.css({ 'background': '#FFC400' })
					})
				}
			} else {
				if ($(this).prop('checked') == true) {
					$('.c-2 .plus').each(function() {
						$(this)
							.html($(this).html() * 2)
							.css({ 'background': '#fd69de' })
					})
				} else {
					$('.c-2 .plus').each(function() {
						$(this)
							.html($(this).html() / 2)
							.css({ 'background': '#455A64' })
					})
				}
			}
		})

	// Markings
		steps = ['m_1', 'm_2', 'm_0']
		$('.markings span').on('click', function() {
			this.className = steps[($.inArray(this.className, steps) + 1) % steps.length]
		})
})
