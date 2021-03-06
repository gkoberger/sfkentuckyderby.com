$(function () {
    if(!$('#home').length) {
      $('.logo-header').click(function(e) {
        e.preventDefault();
        window.location.href = '/';
      });
      return;
    }

    window.Parallax = {};

    Parallax.windowHeight = 0;
    Parallax.startTop = 0;
    Parallax.header = $('#header');
    Parallax.footer = $('#footer');
    Parallax.navigation = $('#navigation');
    Parallax.headerLogo = $('.logo-header');
    Parallax.body = $('#body');
    Parallax.scrolled = false;

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

            Parallax.scrolled = true;

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
        $('#home').addClass('on');
    }


    Parallax.headerLogo.on('click', function () {
        scroll($('#navigation').offset().top);
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

        setTimeout(function () {
            if(Parallax.scrolled) return;
            if(window.document.referrer.split('/')[2] === window.location.host) {
                Parallax.scrolled = true;
                scroll($('#navigation').offset().top);
            }
        }, 0);
    });

    $('.learn-more a').click(function(e) {
        e.preventDefault();
        scroll($('#navigation').offset().top);
    });

    if($('.galleria').length > 0) {
        Galleria.loadTheme('/bower_components/jquery-galleria/src/themes/classic/galleria.classic.js');
        Galleria.configure({
            imageCrop: true,
            transition: 'fade',
            autoplay: 7000,
            showCounter: false,
            showInfo: false,
            thumbnails: true,
            showImageav: false,
            imageMargin: 0,
            thumbMargin: 0
        });
        Galleria.run('.galleria');
    }
});

var $viewport = $('html, body');
function scroll(scrollTarget) {
  $viewport.animate({ 
    scrollTop: scrollTarget // set scrollTarget to your desired position
  }, 2000);
  $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
      $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
    }
  });                 
}
