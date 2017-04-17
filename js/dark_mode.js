$(function() {
  // PPAR
    $('#randomize, #organize, #locate, #showAll, #save').addClass('btn_color')
  // Counter
    $('.c-1 .plus, .c-1 .minus, .c-2 .plus, .c-2 .minus').addClass('btn_color')
    $('.language a').addClass('language_txt')

  $('#mode').click(function() {
    if ($(this).hasClass('DM_JPN')) {
      $(this).toggleClass('DM_txt_JPN')
      $(this).toggleClass('LM_txt_JPN')
    }
    if ($(this).hasClass('DM_ENG')) {
      $(this).toggleClass('DM_txt_ENG')
      $(this).toggleClass('LM_txt_ENG')
    }

    // Common + PPAR
      $('body, .settings_bg').toggleClass('darkest_bg')
      $('.language a').toggleClass('language_txt')
      $('.language a, .top, .settings, .settings input, .display input, .howto, #collection, #mode').toggleClass('white_txt')
      $('#randomize, #organize, #locate, #showAll, #save').toggleClass('btn_color')
      $('#randomize, #organize, #locate, #showAll, #save').toggleClass('dark_bg')
      $('#result').toggleClass('white_border')

    // Counter
      $('.counter, .display input').toggleClass('darker_bg')
      $('.c-1 .plus, .c-1 .minus, .c-2 .plus, .c-2 .minus').toggleClass('btn_color')
      $('.buttons td').toggleClass('dark_bg')
      $('.reset').toggleClass('light_bg')
  })

  // Keypresses
    $(document).keypress(function(e) {
      keycode = (e.keycode ? e.keycode : e.which)
      // 'd' = Dark Mode
        if (keycode == '100') {
          $('#mode').click()
        }
    })
})
