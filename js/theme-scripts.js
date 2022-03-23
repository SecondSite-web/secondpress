/*!
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
}() );

/*!
 * Custom JS Functions
 */

jQuery(document).ready(function(e) {
// get current url
    var location = window.location.href;
    console.log(location);

// remove active class from all
    $(".nav-item a").removeClass('nav-active');

// add active class to div that matches active url
    $(".nav-item a[href='"+location+"']").addClass('nav-active');
});

jQuery(document).ready(function(e) {
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});
$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.move-top').fadeIn();
        } else {
            $('.move-top').fadeOut();
        }
    });

    $('.move-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

$(document).ready(function() {
    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    // If element is scrolled into view, fade it in
    $(window).scroll(function() {
        $('.scroll-animations .animated').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeIn');
            }
        });
    });
});

$(document).ready(function() {
    $( ".submit" ).addClass( "btn btn-primary" );
    $( ".search-submit" ).addClass( "btn btn-primary" );
    $( ".post-edit-link" ).addClass( "btn btn-danger btn-sm" );
    $( ".comment-edit-link" ).addClass( "btn btn-danger btn-sm" );
    $( "img" ).addClass( "img-fluid" );
});