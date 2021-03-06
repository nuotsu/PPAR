// Initialize ppa.json
    var ppa = []
        dex = []
    $.ajax({
        url: 'js/ppa.json',
        dataType: 'json',
        async: false,
        success: function(ppaJSON) {
            ppa = ppaJSON
            for (i in ppa)
                dex.push(ppa[i].dex)
        }
    })

    for (var i in ppa)
        $('#ppar').append(`
            <img
                dex="${ppa[i].dex}"
                nameJPN="${ppa[i].nameJPN}"
                nameENG="${ppa[i].nameENG}"
                type="${ppa[i].type[0]} ${ppa[i].type[1]}"
                stats="${ppa[i].stats[0]} ${ppa[i].stats[1]} ${ppa[i].stats[2]} ${ppa[i].stats[3]} ${ppa[i].stats[4]} ${ppa[i].stats[5]}"
                abilityJPN="${ppa[i].abilityJPN[0]}|${ppa[i].abilityJPN[1]}|${ppa[i].abilityJPN[2]}"
                abilityENG="${ppa[i].abilityENG[0]}|${ppa[i].abilityENG[1]}|${ppa[i].abilityENG[2]}"
                region="${ppa[i].region}"
                category="${ppa[i].collection}"
            >
        `)

    $('#ppar img').each(function() {
        $(this)
            .attr({
                'src': `img/ppa/${$(this).attr('dex')}_PPA.png`
            })
            .addClass('showRegion showT1 showT2 showCategory')
    })
    $('#nav').css('z-index', $('#ppar img').length)
    totalPPA()

// BG
    changeBG()
    $('#bg_change').change(changeBG)
    function changeBG() {
        $('#bg > *').hide()
        $(`#bg .${$('#bg_change').val()}`).show()
    }

    var p1_x = 0; var p1_y = 0
    setInterval(function() {
        $('#bg .rotom1').css({
            'background-position': `${p1_x}px ${p1_y}px`
        })
        p1_x += 0.8
        p1_y -= 0.4
        if (p1_x > 229) p1_x = 0
        if (p1_y > 119) p1_y = 0
    }, 50)

    var p2_x = 0; var p2_y = 0
    setInterval(function() {
        $('#bg .rotom2').css({
            'background-position': `${p2_x}px ${p2_y}px`
        })
        p2_x += 1.4
        p2_y -= 0.7
        if (p2_x > 24) p2_x = 0
        if (p2_y > 6) p2_y = 0
    }, 50)

// Collection
    var typeList = [
        "all",
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy"
    ]
    for (var i in typeList)
        $('#type1, #type2').append(`<option value="${typeList[i]}" lang="t_${typeList[i]}"></option>`)
        $('#type1').change(function() {
            if ($(this).val() == 'all') $('#type2').attr('disabled', true)
            else $('#type2').attr('disabled', false)
        })
    $('#collections input, #collections select').change(function() {
        $('#ppar img')
            .hide()
            .removeClass('showRegion showT1 showT2 showCategory')
        if ($('#region').val() != 'all')
            $(`#ppar img[region="${$('#region').val()}"]`).addClass('showRegion')
            else $('#ppar img').addClass('showRegion')
        if ($('#type1').val() != 'all')
            $(`#ppar img[type*="${$('#type1').val()}"]`).addClass('showT1')
            else $('#ppar img').addClass('showT1')
        if ($('#type2').val() != 'all')
            $(`#ppar img[type*="${$('#type2').val()}"]`).addClass('showT2')
            else $('#ppar img').addClass('showT2')
        if ($('#category').val() != 'all')
            $(`#ppar img[category="${$('#category').val()}"]`).addClass('showCategory')
            else $('#ppar img').addClass('showCategory')
        $('.showRegion.showT1.showT2.showCategory').show()
        totalPPA()
    })
    function totalPPA() {
        $('#total').html($('#ppar img.showRegion.showT1.showT2.showCategory').length)
    }

// Pokémon Info
    $('#pkmn > table').hide()
    $('#ppar img').click(function() {
        $('#pkmn > table').show()
        $('#nav, #pkmn').prop('open', true)
        var dex = $(this).attr('dex')
            $('#pkmn #ppa').attr({
                'src': `img/ppa/${dex}_PPA.png`
            })
            $('#pkmn #dex').html(dex)
        var nameJPN = $(this).attr('nameJPN')
            $('#pkmn #nameJPN').html(nameJPN)
        var nameENG = $(this).attr('nameENG')
            $('#pkmn #nameENG').html(nameENG)
        var types = $(this).attr('type').split(' ')
            $('#pkmn #types').html('')
            for (var i in types)
                if (types[i] != 'undefined') $('#pkmn #types').append(`<span lang="t_${types[i]}"></span>`)
            $('#pkmn #types span').each(function() {
                $(this).css({
                    'background-color': `var(--${$(this).attr('lang').replace('t_', '')})`
                })
            })
        var abilityJPN = $(this).attr('abilityJPN').split('|')
            $('#pkmn #ability').html('')
            for (var i in abilityJPN)
                if (abilityJPN[i] != 'undefined') $('#pkmn #ability').append(`<p class="ability_jp">${abilityJPN[i]}</p>`)
        var abilityENG = $(this).attr('abilityENG').split('|')
            for (var i in abilityENG)
                if (abilityENG[i] != 'undefined') $('#pkmn #ability').append(`<p class="ability_en">${abilityENG[i]}</p>`)
        var stats = $(this).attr('stats').split(' ')
            $('#stats td:nth-child(2)').html('')
            var s_total = 0
            for (var i in stats) {
                if (stats[i] != 'undefined') {
                    $('#stats tr').eq(i).find('td').eq(1).html(stats[i])
                    $('#stats tr').eq(i).find('td').eq(2).find('span').css({
                        'width': `${stats[i] / 2.55}%`
                    })
                }
                s_total += stats[i]*1
            }
            $('#s_total').html(s_total)
        $('#pkmn #links #bulba').attr({
            'href': `https://bulbapedia.bulbagarden.net/wiki/${nameENG.replace('(', '').replace(')', '')}`
        })
        $('#pkmn #links #serebii').attr({
            'href': `https://www.serebii.net/pokedex-sm/${dex.substring(1).replace(/\D/g, '')}.shtml`
        })
        $('#pkmn #links #smogon').attr({
            'href': `http://www.smogon.com/dex/sm/pokemon/${nameENG}`
        })
        $('#pkmn #links #pdb').attr({
            'href': `https://pokemondb.net/pokedex/${nameENG}`
        })
        $('#pkmn #links #yakkun').attr({
            'href': `https://yakkun.com/sm/zukan/n${dex.toLowerCase()}`
        })
    })
    $('.arrow').click(function() {
        var curr_ppa = dex.indexOf($('#dex').html())
            newDex = dex[curr_ppa*1 + $(this).attr('value')*1]
        $(`img[dex="${newDex}"]`).click()
    })


// Randomizer
    $('#randomize').click(function() {
        var w = $('#bg').width()
            h = $('#bg').height()
            ppaSize = $('#ppar img').width()
            z = $('#ppar img').length
            dir = [-1,1]
        $('#ppar img').each(function() {
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
        $('#ppar img').css({
            'position': 'static',
            'transform': 'scaleX(1)'
        })
    })

// Hotkeys
    $(document).keydown(function(e) {
    		if (e.which == 27) $('#nav > summary').click();	// esc
    		if (e.which == 37) $('.a_left').click();	// ←
    		if (e.which == 39) $('.a_right').click();	// →
            if (e.which == 82) $('#randomize').click();	// r
            if (e.which == 79) $('#organize').click();	// o
    	});
