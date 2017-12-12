$(function() {
		fruits = [ 
			{	
				"fruit" : "mango",
				"look" : "Color isn't the best way to spot a ripe mango, but a light mixture of orange, yellow and red is a good sign",
				"feel" : "Give it a gentle squeeze, a slight softness is a good sign",
				"smell" : "Smell around the stem for a sweet, fragrant and fruity aroma. A sour smell means it is overripe",
				"ripe" : "60"
			},
			{ 
				"fruit" : "lime",
				"look" : "A light green hue is the best indicator for a sweet lime",
				"feel" : "You'll want to test for a smooth surface and avoid any rough textured limes. Also give a squeeze, a little give means it'll be nice and juicy",
				"smell" : "Softly scratch the surface and if you can smell a string lime aroma, you've got a good one",
				"ripe" : ""
			},
			{ 
				"fruit" : "banana",
				"look" : "Don't fear the brown spots! As long as it's not heavily bruised, a banana covered with these dark speckles will be the sweetest and most enjoyable",
				"feel" : "Wait for the peel to soften up a bit before removing it to eat the fruit",
				"smell" : "A fragrant smell will come through the peel when it's ready",
				"ripe" : "79"
			},
			{ 
				"fruit" : "avocado",
				"look" : "A ripe avocado will reach a dark green to purplish color at it's peak but the best indicator is to pop off the little button at the stem. If you see green then you're good to go, a brown color means it's too late",
				"feel" : "Wait until the avocado begins to soften up before eating, just not <i>too</i> soft",
				"smell" : "You won't really smell anything until it's gone bad",
				"ripe" : "80"
			},
			{ 
				"fruit" : "plantain",
				"look" : "A dark brown or blackened plantain will tell you that it's ripe, sweet and ready to eat",
				"feel" : "Softness is another good key, slight mushiness or wrinkly skin is nothing to fear",
				"smell" : "Smell isn't a good indicator to rely on for this fruit",
				"ripe" : "95"
			},
			{ 
				"fruit" : "lemon",
				"look" : "A little green isn't a bad sign, but glossy skin is the best sign that it's good to go",
				"feel" : "You'll want a nice firm fruit with just a slight softness",
				"smell" : "A lemony smellinglemon is a good lemon",
				"ripe" : ""
			},
			{ 
				"fruit" : "watermelon",
				"look" : "A yellow or light green bottom hints at a watermelons ripeness. If the stripes wrap themselves all over the surface, give it some time.",
				"feel" : "Give the melon a few taps, a hollow sound is good",
				"smell" : "Smell around the bottom of the melon for a refreshing aroma",
				"ripe" : ""
			},
			{ 
				"fruit" : "cantaloupe",
				"look" : "A light tan color with some green lines means you've got a good one",
				"feel" : "A ripe cantaloupe will have a slight yield upon squeezing but should still be quite hard and heavy for its size",
				"smell" : "Sniff at its stem for a fresh cantaloupe aroma",
				"ripe" : ""
			}
		];
    $title = $('#title');

    var $basket = $('#basket');
    $basket.imagesLoaded(function() {
        $basket.masonry({
            itemSelector: '.sticker',
            columnWidth: ".sticker:first-child",
        });
    });

    $title.hover(function() {
        $title.removeClass('bounceOut').addClass('bounceIn');
    }, function() {
        $title.removeClass('bounceIn').addClass('bounceOut');
    });


    $title.click(function() {
        $('body').attr('class', 'intro');
    });
    $('#enter').click(function() {
        $('body').attr('class', 'select');
    });


    $('.sticker').hover(function() {
        $('.sticker').css({});
        $(this).removeClass('bounceOut').addClass('bounceIn');
    }, function() {
        $(this).removeClass('bounceIn').addClass('bounceOut');
    });

    $('.sticker').click(function() {
        $wait = 0;
        $selectedFruit = $(this).attr('alt');
        $selectedIndex = $(this).index();
        parseInfo($selectedIndex);

        for (var i = 4; i > 0; i--) {
            $sfWrap = $('#selected').append('<img class="fruit stage' + i + '" src="img/fruits/' + $selectedFruit + '/' + i + '.png"/>');
        }

        $sfImg = $('#selected img');
        $sfImgW = $sfImg.width();

        var i = 0;
        $('.sticker').each(function(n) {
            setTimeout(function() {
                i++;
                $('.sticker:nth-child(' + i + ')').addClass('dropOff');
            }, 60 * n);
        });
        $wait = 60 * $('.sticker').length;

        $('#top header .logo .img').transition({
            scale: .5,
            rotate: -2
        }, 200);
        setTimeout(function() {
            $('#top header .logo .img').html('<img src="img/titles/' + $selectedFruit + '.svg"/>').append('<div class="close"></div>').transition({
                scale: 1,
                rotate: 0
            }, 200);
            $('.close').click(function() {
                deselect();
            });
        }, 200);


        setTimeout(function() {
            $('#selected').imagesLoaded(function() {
                $('body').attr('class', 'single');
            });
        }, $wait);


    });

    function deselect() {
        $('body').attr('class', 'select');
        $('#top header .logo .img').transition({
            scale: .5,
            rotate: -2
        }, 200).html("<img src='img/logo.svg'/>").transition({
            scale: 1,
            rotate: 0
        }, 200);
        i = 0;
        $('.sticker').each(function(n) {
            i++;
            $('.sticker:nth-child(' + i + ')').removeClass('dropOff');
        });
        setTimeout(function() {
            $('#selected').html('');
        }, 60 * $('#basket').length + 700);
    }

    function sliderInit(value) {
        $fade = 0;
        $slider = $('.slider');
        $handle = $('.slider .handle');

        $slider.slider({
            value: value,
            min: 1,
            max: 100,
            slide: function(event, ui) {
                ripen(ui.value);
            }
        });

        ripen(value);
    }

    function ripen(value) {
        $r = 180 - value / 100 * 180;

        $seg = 100 / 3;
        if (value <= $seg) {
            $o1 = 1 - value / $seg;
            $o2 = 1;
            $o3 = 1;
        } else if (value > $seg && value < $seg * 2) {
            $o1 = 0;
            $o2 = 1 - value / $seg + 1;
            $o3 = 1;
        } else if (value >= $seg * 2) {
            $o1 = 0;
            $o2 = 0;
            $o3 = 1 - value / $seg + 2;
        }

        $('.stage1').css({
            'opacity': $o1
        });
        $('.stage2').css({
            'opacity': $o2
        });
        $('.stage3').css({
            'opacity': $o3
        });

        $pointer = $('#pointer');

        $pointer.css({
            rotate: $r
        })
    }

    function parseInfo(i) {
        // $url = "info.json";
        // $.getJSON($url, function (json) {
        $look = fruits[i].look;
        $feel = fruits[i].feel;
        $smell = fruits[i].smell;
        $value = fruits[i].ripe;
        $('#look p').html($look);
        $('#feel p').html($feel);
        $('#smell p').html($smell);
        sliderInit($value);
        // });
    }

    function touch() {
        ii++;
    }

    function check() {
        $media = $("#media-check").css('zIndex');
        $logo = $('.logo .img img');
        if ($media == 1) {
            if ($logo.attr('src') == 'img/logo-2.svg') {
                $logo.attr('src', 'img/logo.svg');
            }
        } else if ($media == 2) {
            if ($logo.attr('src') == 'img/logo.svg') {
                $logo.attr('src', 'img/logo-2.svg');
            }
        }
    }

    $(window).resize(function() {
        check();
    });
    $(window).load(function() {
        check();
        $('main').transition({
            'opacity': 1,
            'delay': 100
        }, 800);
    });



});