$(function () {
    window.Parallax = {};

    Parallax.windowHeight = 0;
    Parallax.startTop = 0;
    Parallax.header = $('#header');
    Parallax.footer = $('#footer');
    Parallax.navigation = $('#navigation');
    Parallax.headerLogo = $('.logo-header');
    Parallax.body = $('#body');

    function d() {
        $(window).resize(function() {
            Parallax.windowHeight = $(window).height();
            Parallax.header.height(Parallax.windowHeight);
            Parallax.body.css({
                marginTop: Parallax.windowHeight,
                minHeight: Parallax.windowHeight
            });
            Parallax.startTop = (Parallax.windowHeight - Parallax.headerLogo.height()) / 2;
        }).trigger('resize');

        $(window).scroll(function () {
            var limit = Parallax.windowHeight - 300,
                scrollTop = $(window).scrollTop(),
                scrollTopLimited = scrollTop,
                logoTop = 0;

            if(scrollTopLimited > limit) {
                scrollTopLimited = limit;
            }

            logoTop = scrollTopLimited + (Parallax.startTop - (Parallax.startTop * (scrollTopLimited / limit)));

            Parallax.header.css('top', scrollTopLimited * 0.5);
            Parallax.headerLogo.css('top', logoTop - 80); // 50 is just a top margin so it's not flush with the top of the page

            if(scrollTop >= Parallax.windowHeight) {
                Parallax.body.addClass('fixedNavigation');
                Parallax.navigation.css('top', scrollTop - Parallax.windowHeight);
            }
            else {
                Parallax.body.removeClass('fixedNavigation');
                Parallax.navigation.css('top', 'auto');
            }
        }).trigger('scroll');

        Parallax.body.css('top', 'auto');
        Parallax.footer.css('top', 'auto');
        Parallax.headerLogo.animate({
            opacity: 1
        }, 'fast');
    }


    Parallax.headerLogo.on('click', function () {
        $('html, body').animate({
            scrollTop: $("#navigation").offset().top
        }, 2000);
    });


    Parallax.BV = new $.BigVideo({
        useFlashForFirefox: false,
        container: $('#header'),
        ambient: true
    });

    Parallax.BV.init();

    if(Modernizr.touch) {
        Parallax.BV.show('img/races.jpg');
    } else {
        Parallax.BV.show('vid/races.mp4',{
            ambient: true,
            altSource:'vid/races.webm'
        });
    }

    // $('#big-video-wrap').css('display', 'block');
    // $('video').bind('progress', function(e) {
    //     console.log($('video').get(0).duration);
    //     // console.log($('video').get(0).buffered.end(0) / $('video').get(0).duration);
    // });

    $('video').bind('canplay', function(e) {
        $('#big-video-wrap, #big-video-vid').css('display', 'block');
        // setTimeout(function () {
        //     $('#big-video-wrap').css('display', 'block');
        // }, 1000);

        setTimeout(d, 0);
    });


});
