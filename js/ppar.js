$(function() {
	// load ppaJSON
		$.getJSON('../js/ppa.json', function(ppaJSON) {
            for (var i in ppaJSON) {
				if ($('.language a:first-child').css('text-decoration') == 'underline') {
					$('.wallpaper').append(
						'<img src="../images/ppa/' + ppaJSON[i].dex + '_PPA.png" ' +
						'data-collection="' + ppaJSON[i].data.join(' ') + '" ' +
						'title="' + ppaJSON[i].nameJPN +'|' + ppaJSON[i].dex + '">\n'
					);
				} else {
					$('.wallpaper').append(
						'<img src="../images/ppa/' + ppaJSON[i].dex + '_PPA.png" ' +
						'data-collection="' + ppaJSON[i].data.join(' ') + '" ' +
						'title="' + ppaJSON[i].nameENG +'|' + ppaJSON[i].dex + '">\n'
					);
				}
            }
			$('#PPAlen span').html( $('.wallpaper img').length );
		});

	// Dimensions
		$('.dimensions input').change(function() {
			$('.wallpaper, .wallpaper-container').css({
				'width': $('.dimensions #width').val(),
				'height': $('.dimensions #height').val()
			});
			$('.wallpaper img').css({
				'width': $('.dimensions #icon-size').val()
			});
		});
		$('.dimensions #width').attr({
			'value': $('.wallpaper').width()
		});

	// BG Color
		$('#bg_color').change(function() {
			$('.wallpaper').css({
				'background': $('#bg_color').val()
			});
		});
	// BG Image
		$('#bg_img').click(function() {
			$('#bg_img_upload').click();
		});
		$('#bg_img_upload').change(function() {
			img = this.files[0];
			reader = new FileReader();
			reader.onloadend = function() {
				$('.wallpaper').css({
					'background': 'none',
					'background-image': 'url("' + reader.result + '")',
					'background-size': 'cover',
					'background-position': 'center'
				});
			}
			if (img) {
				reader.readAsDataURL(img);
			}
		});

	// Randomize
		$('#randomize').click(function() {
			rX = $('.wallpaper').width() - $('.wallpaper img').width();
			rY = $('.wallpaper').height() - $('.wallpaper img').height();
			direction = ['-1', '1'];
			$('.wallpaper img').each(function() {
				$(this).css({
					'position': 'absolute',
					'left': Math.floor(Math.random() * rX),
					'top': Math.floor(Math.random() * rY),
					'z-index': Math.floor(Math.random() * $('.wallpaper img').length),
					'transform': 'scaleX(' + direction[Math.floor(Math.random() * 2)] + ')'
				});
			});
			$('#PPAlen').css({
				'z-index': $('.wallpaper img').length
			});
		});
	// Organize
		$('#organize').click(function() {
			$('.wallpaper img').css({
				'position': 'static',
				'transform': 'scaleX(' + 1 + ')'
			});
		});

	// Fullscreen Preview
		fullscreen = false;
		$('#FS_BG').hide();
		init_width = $('#FS_BG').width();
		$('.wallpaper').click(function() {
			fullscreen = true;
			$('#previewId').remove();
			$('#FS_BG').css({
				'z-index': $('.wallpaper img').length,
				'width': init_width
			});
			$('#FS_BG').fadeIn(500);
			// html2canvas for Fullscreen Preview
				html2canvas($('.wallpaper'), {
					onrendered: function(canvas) {
						canvas.id = 'previewId';
						$('#FS_BG').append(canvas);
						$('#previewId').css({
							'max-width': init_width
						});
					}, allowTaint: true
				});
				$('#FS_BG').css({
					'display': 'inline-block'
				});
		});
		$('#FS_BG, #FS_exit').click(function() {
			fullscreen = false;
			$('#FS_BG').fadeOut(500);
		});
	// Save
		$('#save').click(function() {
			html2canvas($('.wallpaper'), {
				onrendered: function(canvas) {
					canvas.id = 'canvasId';
					$('#result').append(canvas);
				}, allowTaint: true
			});
			$('.result #result').css({
				'display': 'inline-block'
			});
		});

	// Collection
		$('#collection').change(function() {
			collection = $(this).val();
			if (collection == 'all') {
				$('.wallpaper img').css({
					'display': 'inline'
				});
			} else {
				$('.wallpaper img').css({
					'display': 'none'
				});
				$('.wallpaper img[data-collection*=' + collection + ']').css({
					'display': 'inline'
				});
			}
			$('#PPAlen span').html( $('.wallpaper img[style*="display: inline;"]').length );
		});
	// Locate
		// Hide Rest Initial
			$('.hideRest').css({
				'pointer-events': 'none',
				'opacity': '0.3'
			});
		// Locate
			$('#locate').click(function() {
				$('.wallpaper img').css({
					'opacity': '0.1'
				});
				find = $('#find').val().split(',');
				for (i = 0; i <= find.length; i++) {
					$('.wallpaper img[src*=' + find[i] +']').css({
						'opacity': 1
					});
				}
				$('.hideRest').css({
					'pointer-events': 'auto',
					'opacity': 1
				});
				$('#hideRest').prop('checked', false);
			// Hide Rest
				$('#hideRest').change(function() {
					if ($(this).prop('checked') == true) {
						$('.wallpaper img').css({
							'opacity': 0
						});
						find = $('#find').val().split(',');
						for (i = 0; i <= find.length; i++) {
							$('.wallpaper img[src*=' + find[i] +']').css({
								'opacity': 1
							});
						}
					} else {
						$('.wallpaper img').css({
							'opacity': 0.1
						});
						find = $('#find').val().split(',');
						for (i = 0; i <= find.length; i++) {
							$('.wallpaper img[src*=' + find[i] +']').css({
								'opacity': 1
							});
						}
					}
				});
			});
			// Show All
				$('#showAll').click(function() {
					$('.wallpaper img').css({
						'opacity': 1
					});
					$('#find').val('');
				});

	// Keypresses
		$(document).keypress(function(e) {
			keycode = (e.keycode ? e.keycode : e.which)
			if (keycode == '114') $('#randomize').click();	// 'r' = Randomize
			if (keycode == '111') $('#organize').click();	// 'o' = Organize
			if (keycode == '115') $('#save').click();	// 's' = Save
			if (keycode == '102') {		// 'f' = Toggle Fullscreen Preview
				if (fullscreen == false) {
					$('.wallpaper').click();
				} else {
					$('#FS_BG').click();
				}
			}
		});
});
