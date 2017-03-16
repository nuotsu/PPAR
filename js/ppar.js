$(function() {
	// BG Color
		$('#bg_color').change(function() {
			$('.wallpaper').css({
				'background': $('#bg_color').val()
			})
		})
	// Dimensions
		$('.dimensions input').change(function() {
			$('.wallpaper').css({
				'width': $('.dimensions #width').val(),
				'height': $('.dimensions #height').val()
			})
			$('.wallpaper img').css({
				'width': $('.dimensions #icon-size').val()
			})
		})
	// Randomize
		$('#randomize').click(function() {
			rX = $('.wallpaper').width() - $('.wallpaper img').width()
			rY = $('.wallpaper').height() - $('.wallpaper img').height()
			$('.wallpaper img').each(function() {
				$(this).css({
					'position': 'absolute',
					'left': Math.floor(Math.random() * rX),
					'top': Math.floor(Math.random() * rY),
					'z-index': Math.floor(Math.random() * $('.wallpaper img').length)
				})
			})
		})
	// Organize
		$('#organize').click(function() {
			$('.wallpaper img').css({
				'position': 'static'
			})
		})
	// Save
		$('#save').click(function() {
			html2canvas($('.wallpaper'), {
				onrendered: function(canvas) {
					canvas.id = 'canvasId'
					$('#result').append(canvas)
				},
			allowTaint: true
			})
			$('.result #result').css({
				'display': 'inline-block'
			})
		})
	// Locate
		//Hide Rest Initial
			$('.hideRest').css({
				'pointer-events': 'none',
				'opacity': '0.3'
			})
		$('#locate').click(function() {
			$('.wallpaper img').css({
				'opacity': '0.1'
			})
			find = $('.find').val().split(',')
			for (i = 0; i <= find.length; i++) {
				$('.wallpaper img[src*=' + find[i] +']').css({
					'opacity': '1',
					// 'z-index': $('.wallpaper img').length
			})
			}
			$('.hideRest').css({
				'pointer-events': 'auto',
				'opacity': '1'
			})
			$('#hideRest').prop('checked', false)
			// Hide Rest
				$('#hideRest').change(function() {
					if ($(this).prop('checked') == true) {
						$('.wallpaper img').css({
							'opacity': '0'
						})
						find = $('.find').val().split(',')
						for (i = 0; i <= find.length; i++) {
							$('.wallpaper img[src*=' + find[i] +']').css({
								'opacity': '1',
								// 'z-index': $('.wallpaper img').length
						})
						}
					} else {
						$('.wallpaper img').css({
							'opacity': '0.1'
						})
						find = $('.find').val().split(',')
						for (i = 0; i <= find.length; i++) {
							$('.wallpaper img[src*=' + find[i] +']').css({
								'opacity': '1',
								// 'z-index': $('.wallpaper img').length
						})
						}
					}
				})
		})
	// Show All
		$('#showAll').click(function() {
			$('.wallpaper img').css({
				'opacity': '1'
			})
		})
})