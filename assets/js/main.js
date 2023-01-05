$.noConflict();

jQuery(document).ready(function($) {

	"use strict";

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	} );

	jQuery('.selectpicker').selectpicker;


	$('#menuToggle').on('click', function(event) {
		$('body').toggleClass('open');
	});

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	// $('.user-area> a').on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.user-menu').parent().removeClass('open');
	// 	$('.user-menu').parent().toggleClass('open');
	// });

    $('.select2').select2();
    
    // $('.datetimepicker').datetimepicker({
    //     format: 'MM-DD-YYYY hh:mm A',

    //     // Your Icons
    //     // as Bootstrap 4 is not using Glyphicons anymore
    //     icons: {
    //         time: 'fa fa-clock-o',
    //         date: 'fa fa-calendar',
    //         up: 'fa fa-chevron-up',
    //         down: 'fa fa-chevron-down',
    //         previous: 'fa fa-chevron-left',
    //         next: 'fa fa-chevron-right',
    //         today: 'fa fa-check',
    //         clear: 'fa fa-trash',
    //         close: 'fa fa-times'
    //     }
    // })
});