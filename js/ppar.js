// Language Localization
    function language(lang) {
        $('[data-JPN]').each(function() {
            $(this).html( $(this).attr('data-' + lang) )
        })
        if ($('.search')) {
            $('.search').attr({
                'placeholder': $('.search').attr('data-' + lang)
            })
        }
    }
    language('JPN') // Initial Language
    $('#lang').change(function() {
        language( $('#lang').val() )
    })

// ppaJSON
    var ppaDex = []
        pkmnJPN = []
        pkmnENG = []
    $.ajax({
        url: 'js/ppa.json',
        dataType: 'json',
        async: false,
        success: function(ppaJSON) {
            for (var i in ppaJSON) {
                $('#wallpaper').append(`
                    <img
                        src="images/ppa/${ppaJSON[i].dex}_PPA.png"
                        data-region="${ppaJSON[i].region}"
                        data-type="${ppaJSON[i].type.join(' ')}"
                        data-collection="${ppaJSON[i].collection.join(' ')}"
                    >
                `)

                ppaDex[i] = ppaJSON[i].dex
                pkmnJPN[i] = ppaJSON[i].nameJPN
                pkmnENG[i] = ppaJSON[i].nameENG
            }
            $('#ppaTotal').html( $('#wallpaper img').length )
            $('*:not(#wallpaper), .ui-autocomplet').css({
                'z-index': $('#wallpaper img').length
            })
            return ppaDex, pkmnJPN, pkmnENG
        }
    })

// Title Icon & Favicon
    var rPPAi = ppaDex[Math.floor(Math.random() * ppaDex.length)]
    $('#favicon').attr({
        'href': `images/ppa/${rPPAi}_PPA.png`
    })

// Open/Close Settings
    $('#settings').hide()
    $('.settings').hover(function() {
        $('#settings').show()
        $('.settings').css({
            'border-radius': 5,
            'width': 'auto',
            'height': 'auto'
        })
        $('#openSettings').html('×')
        var rPPA = ppaDex[Math.floor(Math.random() * ppaDex.length)]
        $('#titlePPA img').attr({
            'src': `images/ppa/${rPPA}_PPA.png`
        })
        // Yakkun / Bulba
            if ($('#lang').val() == 'JPN')
                $('#titlePPA a').attr({
                    'href': 'https://yakkun.com/sm/zukan/n' + rPPA.toLowerCase()
                })
            else {
                var rBulba = pkmnENG[ppaDex.indexOf(rPPA)]
                                    .replace('(', '')
                                    .replace(')', '')
                $('#titlePPA a').attr({
                    'href': 'https://bulbapedia.bulbagarden.net/wiki/' + rBulba
                })
            }
    }, function() {
        closeSettings()
    })
    $('#openSettings').click(function() {
        closeSettings()
    })
    function closeSettings() {
        $('#settings').hide()
        $('.settings').css({
            'border-radius': 20,
            'width': 30,
            'height': 30
        })
        $('#openSettings').html('≡')
    }

// Dimensions
    $('#width').val( $('#wallpaper').width().toFixed(0) )
    $('#height').val( $('#wallpaper').height().toFixed(0) )
    $('#currentScreen').val(`${$(window).width()} ${$(window).height()} 60`)
    $('#size').change(function() {
        var wpSize = []
            wpSize[0] = $('#size').val().split(' ')[0]
            wpSize[1] = $('#size').val().split(' ')[1]
            ppaSize = $('#size').val().split(' ')[2]
        $('#width').val(wpSize[0])
        $('#height').val(wpSize[1])
        $('#ppaSize').val(ppaSize)
        changeWallpaper()
    })
    $(window).resize(function() {
        $('#width').val( $('#wallpaper').width().toFixed(0) )
        $('#height').val( $('#wallpaper').height() )
    })
    $('#width, #height, #ppaSize').change(function() {
        changeWallpaper()
    })
    function changeWallpaper() {
        $('#wallpaper').css({
            'width': $('#width').val(),
            'height': $('#height').val()
        })
        $('#wallpaper img').css({
            'width': $('#ppaSize').val()
        })
    }

// Collections
    $('#region, #type1, #type2, #collection').change(function() {
        var region = $('#region').val()
            if (region == 'all') $('#wallpaper img').addClass('showRegion')
            else {
                $('#wallpaper img').removeClass('showRegion')
                $(`#wallpaper img[data-region=${region}]`).addClass('showRegion')
            }
        var type1 = $('#type1').val()
            type2 = $('#type2').val()
            if (type1 == 'all') {
                $('#type2')
                    .val('all')
                    .attr('disabled', true)
                $('#wallpaper img').addClass('showType')
            } else {
                $('#type2').attr('disabled', false)
                $('#wallpaper img').removeClass('showType')
                if (type2 == 'all') $(`#wallpaper img[data-type*=${type1}]`).addClass('showType')
                if (type2 == 'none') $(`#wallpaper img[data-type=${type1}]`).addClass('showType')
                else $(`#wallpaper img[data-type*=${type1}][data-type*=${type2}]`).addClass('showType')
            }
        var collection = $('#collection').val()
            if (collection == 'all') $('#wallpaper img').addClass('showCollection')
            else {
                $('#wallpaper img').removeClass('showCollection')
                $(`#wallpaper img[data-collection*=${collection}]`).addClass('showCollection')
            }
        $('#wallpaper img').hide()
        $('.showRegion.showType.showCollection').show()
        $('#ppaTotal').html( $('#wallpaper img[style*=inline]').length )
    })

// Search
    function searchSuggestions() {
        $('.search').keyup(function() {
            if ($('#lang').val() == 'JPN')
                $('.search').autocomplete({
                    source: pkmnJPN
                })
            else
                $('.search').autocomplete({
                    source: pkmnENG
                })
        })
    }
    searchSuggestions()
    $('#addSearch').click(function() {
        $('#removeSearch').remove()
        $(this)
            .before(`
                <br class="searchBR">
                <input
                    class="search s${$('.search').length}"
                    type="text"
                    data-JPN="ピカチュウ"
                    data-ENG="Pikachu">\n
                `)
            .after('<button id="removeSearch">-</button>')
        language( $('#lang').val() )
        $('#removeSearch').click(function() {
            $('.search').last().remove()
            $('.searchBR').last().remove()
            if ($('.search').length == 1) {
                $(this).remove()
            }
        });
        searchSuggestions()
    })
    $('#search').click(function() {
        var query = []
        var qDex = []  // query converted to ppaDex
        for (var i = 0; i < $('.search').length; i++)
            query.push( $(`.s${i}`).val() )
        for (var i = 0; i < query.length; i++) {
            if ($('#lang').val() == 'JPN') qDex[i] = ppaDex[pkmnJPN.indexOf(query[i])]
            else qDex[i] = ppaDex[pkmnENG.indexOf(query[i])]
        }
        console.log(pkmnENG, query, qDex);
        $('#wallpaper img').hide()
        for (var i in qDex) {
            $(`#wallpaper img[src*=${qDex[i]}_PPA]`).show()
        }
    })

// BG Image
    $('#bgIMG').click(function() {
        $('#bgIMG_upload').click()
    })
    $('#bgIMG_upload').change(function() {
        img = this.files[0]
        rdr = new FileReader()
        rdr.onloadend = function() {
            $('#wallpaper').css({
                'background': 'none',
                'background-image': 'url(\'' + rdr.result + '\')',
                'background-position': 'center',
                'background-size': 'cover',
                'background-repeat': 'no-repeat'
            })
        }
        if (img) rdr.readAsDataURL(img)
    })

// Randomize & Organize
    $('#randomize').click(function() {
        var w = $('#width').val()
            h = $('#height').val()
            ppaSize = $('#ppaSize').val()
            z = $('#wallpaper img').length
            dir = [-1,1]
        $('#wallpaper img').each(function() {
            $(this).css({
                'position': 'absolute',
                'left': Math.floor(Math.random() * (w - ppaSize)),
                'top': Math.floor(Math.random() * (h - ppaSize)),
                'z-index': Math.floor(Math.random() * z),
                'transform': `scaleX(${dir[Math.floor(Math.random() * 2)]})`
            })
        })
    })
    $('#organize').click(function() {
        $('#wallpaper img').css({
            'position': 'static',
            'transform': `scaleX(1)`
        })
    })

// Save
    $('#save').click(function() {
        $('#wallpaper img').css({
            'background': 'none'
        })
        $('#wallpaper').addClass('html2canvasFix')
        html2canvas($('#wallpaper'), {
            onrendered: function(canvas) {
                url = canvas.toDataURL('image/png')
                $('#preview').append(`
                    <a class="preview" href="${url}" download="PPAR.png">
                        <img src=${url}>
                    </a>
                `)
                $('#wallpaper').removeClass('html2canvasFix')
            }
        })
    })
    $('.generated').hide()
    $(document).on('DOMNodeInserted', '.preview', function() {
        $('.generated').fadeIn()
        $('.generated').click(function() {

        })
        setTimeout(function() {
            $('.generated').fadeOut()
        }, 1000*2)
    })

// Pop-up Dex
    $('#popupDex').hide()
    $('#wallpaper img[src*=0]').click(function(mouse) {
        var entryDex = $(this).attr('src')
                        .replace('images/ppa/', '')
                        .replace('_PPA.png', '')
        // PPA
            $('#entryPPA img').attr({
                'src': $(this).attr('src')
            })
        // Yakkun / Bulba
            if ($('#lang').val() == 'JPN')
                $('#entryPPA a').attr({
                    'href': 'https://yakkun.com/sm/zukan/n' + entryDex.toLowerCase()
                })
            else {
                var entryBulba = pkmnENG[ppaDex.indexOf(entryDex)]
                                    .replace('(', '')
                                    .replace(')', '')
                $('#entryPPA a').attr({
                    'href': 'https://bulbapedia.bulbagarden.net/wiki/' + entryBulba
                })
            }
        // Dex #
            $('#entryNum').html(entryDex)
        // Name
            var entryNameJPN = pkmnJPN[ppaDex.indexOf(entryDex)]
            var entryNameENG = pkmnENG[ppaDex.indexOf(entryDex)]
            $('#entryName').html(`<i>${entryNameJPN}<br>${entryNameENG}</i>`)
        // Type
            var entryType = $(this).attr('data-type').split(' ')
            $('#entryType').html('')
            if ($('#lang').val() == 'JPN')
                for (var i in entryType) $('#entryType').append(`
                    <p class="${entryType[i]} ${entryType[i]}JPN"></p>
                `)
            else
                for (var i in entryType) $('#entryType').append(`
                    <p class="${entryType[i]} ${entryType[i]}ENG"></p>
                `)
        if ($('#popupDex').width() > $(window).width() * 0.95)
            $('#popupDex').css({
                'white-space': 'normal',
                'width': '95%'
            })
        else
            $('#popupDex').css({
                'white-space': 'nowrap',
                'width': 'auto'
            })
        // Mouse Position
                if (mouse.pageX > $(window).width() - $('#popupDex').width())
                    mouseX = mouse.pageX - $('#popupDex').width()
                else
                    mouseX = mouse.pageX
                if (mouse.pageY > $(window).height() - $('#popupDex').height() - $('#buttons').height())
                    mouseY = mouse.pageY - $('#popupDex').height() - $('#buttons').height()
                else
                    mouseY = mouse.pageY
                console.log();
            $('#popupDex')
                .css({
                    'left': mouseX,
                    'top':mouseY
                })
                .hide()
                .fadeIn()
        // esc to close
            $(document).keydown(function(key) {
    			if (key.which == 27) $('#popupDex').fadeOut()	// esc
    		});
    })
    $('#closeDex, #buttons button').click(function() {
        $('#popupDex').fadeOut()
    })
