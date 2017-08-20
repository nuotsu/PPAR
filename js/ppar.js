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
    var rPPA = ppaDex[Math.floor(Math.random() * ppaDex.length)]
        iPPA = `images/ppa/${rPPA}_PPA.png`
    $('#favicon').attr({
        'href': iPPA
    })

// Open/Close Settings
    $('#settings').hide()
    $('.settings').hover(function() {
        $('#settings').show()
        $('.settings').css({
            'border-radius': 5
        })
        $('#openSettings')
            .html('×')
            .css({
                'position': 'fixed',
                'right': 16.5,
                'top': 16.5
            })
        var rPPA = ppaDex[Math.floor(Math.random() * ppaDex.length)]
            iPPA = `images/ppa/${rPPA}_PPA.png`
        $('#ppaIcon img').attr({
            'src': iPPA
        })
    }, function() {
        closeSettings()
    })
    $('#openSettings').click(function() {
        closeSettings()
    })
    function closeSettings() {
        $('#settings').hide()
        $('.settings').css({
            'border-radius': 20
        })
        $('#openSettings')
            .html('≡')
            .css({
                'position': 'static'
            })
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
        $('#wallpaper img').css('width', $('#ppaSize').val())
    }

// Collections
    $('#region, #collection').change(function() {
        var region = $('#region').val()
            if (region == 'all') $('#wallpaper img').addClass('showRegion')
            else {
                $('#wallpaper img').removeClass('showRegion')
                $(`#wallpaper img[data-region=${region}]`).addClass('showRegion')
            }
        var collection = $('#collection').val()
            if (collection == 'all') $('#wallpaper img').addClass('showCollection')
            else {
                $('#wallpaper img').removeClass('showCollection')
                $(`#wallpaper img[data-collection*=${collection}]`).addClass('showCollection')
            }
        $('#wallpaper img').css('display', 'none')
        $('.showRegion.showCollection').css('display', 'inline')
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
            .before(`<br class="searchBR"><input class="search s${$('.search').length}" type="text" data-JPN="ピカチュウ" data-ENG="Pikachu">\n`)
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
        $('#wallpaper img').css('display', 'none')
        for (var i in qDex) {
            $(`#wallpaper img[src*=${qDex[i]}_PPA]`).css('display', 'inline')
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
        $('#wallpaper').addClass('html2canvasFix')
        html2canvas($('#wallpaper'), {
            onrendered: function(canvas) {
                url = canvas.toDataURL('image/png')
                // $('.preview').remove()
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
