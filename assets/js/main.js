$(function() {
    
    "use strict";
    
    //===== Preloader
    function hidePreloader() {
        if ($('.preloader').length) {
            $('.preloader').fadeOut(500);
        }
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        $(window).on('load', function() {
            setTimeout(hidePreloader, 300);
        });
        // Safety timeout so preloader never hangs if an asset is slow
        setTimeout(hidePreloader, 1500);
    }
    
    //===== Ensure Hero Background Video Autoplays Smoothly
    var heroVideo = document.querySelector('.hero_bg_video');
    if (heroVideo) {
        heroVideo.muted = true;
        var playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                // Autoplay policy handled gracefully
            });
        }
    }
    
    
    //===== Sticky Navbar

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
        } else {
            $(".header_navbar").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active (Target ONLY navigation links inside #nav)

    var scrollLink = $('#nav .page-scroll');
    $(window).on('scroll', function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {
            if (this.hash && $(this.hash).length) {
                var target = $(this.hash);
                var targetOffset = target.offset();
                if (targetOffset) {
                    var sectionOffset = targetOffset.top - 80;
                    if (sectionOffset <= scrollbarLocation) {
                        $(this).parent().addClass('active');
                        $(this).parent().siblings().removeClass('active');
                    }
                }
            }
        });
    });
    
    //===== Close navbar-collapse when a link is clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").removeClass('active');
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });
    
    
    //===== Counter Up
    
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2500
        });
    }
    
    
    //===== Back to top
    
    $(window).on('scroll', function(event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200);
        } else {
            $('.back-to-top').fadeOut(200);
        }
    });
    
    // Animate the scroll to top
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 1200);
    });
    
    
    //===== Nice Select
    
    if ($.fn.niceSelect) {
        $('select').niceSelect();
        
        $(document).on('click', '.nice-select .option', function() {
            if (typeof calculateReservationCost === 'function') {
                setTimeout(calculateReservationCost, 50);
            }
        });
    }
    
    
    //===== WOW active
    
    if (typeof WOW === 'function') {
        var wow = new WOW({
            boxClass: 'wow',
            mobile: false,
        });
        wow.init();
    }

});