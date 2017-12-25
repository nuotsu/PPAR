// Initialize language.json
    var langJSON
    $.ajax({
        url: 'js/language.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            langJSON = data
        }
    })

    var langs = ["en", "jp"]
        for (var i in langs)
            $('#lang').append(`<option value="${langs[i]}" lang="l_${langs[i]}"></option>`)
        $(`#lang option[value="${window.location.href.split('?lang=')[1]}"]`).prop('selected', true)
    changeLang()
    $('#lang').change(function() {
        history.pushState('', '', `index.html?lang=${$(this).val()}`)
        changeLang()
    })
    function changeLang() {
        var lang = langs.indexOf(window.location.href.split('?lang=')[1])
            if (lang == -1) lang = 0
        for (var i in langJSON)
            $(`[lang="${i}"]`).html(`${langJSON[i][lang]}`)

        // Adjustments
            $('#pkmn #ability p').hide()
            var whatLang = window.location.href.split('?lang=')[1]
                if (whatLang == null) whatLang = 'en'
            $(`#pkmn #ability p.ability_${whatLang}`).show()
    }
