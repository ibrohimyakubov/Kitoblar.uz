(function($){

	'use strict';

	// Variables

	var window_width = $(window).width();

	
	/**********************
	*Mobile Menu Activatin
	***********************/ 
	var mainMenuNav = $('.main-navigation');
	mainMenuNav.meanmenu({
	    meanScreenWidth: '991',
	    meanMenuContainer: '.mobile-menu',
	    meanMenuClose: '<span class="menu-close"></span>',
	    meanMenuOpen: '<span class="menu-bar"></span>',
	    meanRevealPosition: 'right',
	    meanMenuCloseSize: '0',
	});

	/**********************
	*Sticky Mobile Menu Activatin
	***********************/ 
	function stickyMobileMenu(){
		$('.sticky-mobile-menu').on('click', function(){
			$(this).toggleClass('sticky-close');
			$('.sticky-menu').toggleClass('sticky-open');
			$('.sticky-menu').slideToggle('slow');
		});	

		$('.sticky-has-child > a').on('click', function(e){
			e.preventDefault();
			$(this).siblings('ul').slideToggle('slow');
			$(this).siblings('ul').toggleClass('hidden-sub');
		})
		$('.megamenu__heading').on('click', function(e){
			e.preventDefault();
			$(this).siblings('ul').slideToggle('slow');
			$(this).siblings('ul').toggleClass('hidden-sub');
		})
	}
	stickyMobileMenu();




	/**********************
	*Category Nav Activation
	***********************/ 

	$('#js-cat-nav').slicknav({
		duration: 1000,
		label: 'Category',
		showChildren: 'false',
		prependTo:'.category-mobile-menu'
	});

	/**********************
	*Adding Slide effect to dropdown
	***********************/ 

	function dropdownAnimation(){
		$('.dropdown').on('show.bs.dropdown', function(e){
		  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
		});

		$('.dropdown').on('hide.bs.dropdown', function(e){
		  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
		});		
	}


	/**********************
	*Cart Dropdown
	***********************/ 
	
	function cartDrpdownExpand(){
		$('#cartDropdown').on('click',function(e){
			e.preventDefault();
			$(this).siblings('.mini-cart__dropdown-menu').slideToggle('slow');
		});
	}


	/**********************
	*Expand Category Menu
	***********************/ 
	
	function categoryMenuExpand(){
		$(".hidden-menu-item").css('display', 'none');

		$(window).on({
		    load:function(){
		    	var ww = $(window).width();
				if(ww <= 1200){
					$(".hidden-lg-menu-item").css('display', 'none');
				}
		    },
		    resize:function(){
		    	
		    	var ww = $(window).width();
				if(ww <= 1200){
					$(".hidden-lg-menu-item").css('display', 'none');
				}
		    }
		});


		$("#js-cat-nav-title").on('click',function(){
			$("#js-cat-nav").slideToggle(500);
		});
		$(".js-expand-hidden-menu").on('click',function(e){
			e.preventDefault();
			$(".hidden-menu-item").toggle(500);
			if(window_width <= 1200){
				$(".hidden-lg-menu-item").toggle(500);
			}
			var htmlAfter = "Close Categories";
			var htmlBefore = "More Categories";
			
			$(this).html($(this).text() == htmlAfter ? htmlBefore : htmlAfter);
			$(this).toggleClass("menu-close");
		});		
	}

	/**********************
	*Expand Category Mobile Menu 
	***********************/ 
	
	function categoryMenuExpandInMobile(){
		$('.has-children').on('click', function(e){
			e.preventDefault();
			$(this).find('.category-nav__submenu').slideToggle('500');
		});
	}


	/**********************
	*Slider Activation
	***********************/

	var selector, timeout, animateOut, animateIn, nav, dots, isProgressVar;

	function homePageSlider(selector, timeout, animateOut, animateIn, nav, dots, isProgressVar){

		var homeSlider = $(selector);

		homeSlider.owlCarousel({
			items: 1,
		    loop:true,
		    nav: nav,
		    dots: dots,
		    animateOut: animateOut,
	        animateIn: animateIn,
		    onInitialized: startProgressBarInit,
		    onTranslate:  resetProgressBar,
		    onTranslated: startProgressBar,
		    autoplay: false,
		    autoplayTimeout: timeout,
		    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">']
		});

		homeSlider.on('translate.owl.carousel', function(){
			var animation = $('[data-animation]');
			animation.each(function(){
				var anim_name = $(this).data('animation');
				$(this).removeClass('animated ' + anim_name).css('opacity', '0');
			});
		});

		$('[data-delay]').each(function(){
			var anim_del = $(this).data('delay');
			$(this).css('animation-delay', anim_del);
		});


		$('[data-duration]').each(function(){
			var anim_dur = $(this).data('duration');
			$(this).css('animation-duration', anim_dur);
		});

		homeSlider.on('translated.owl.carousel', function(){
			var layer = homeSlider.find('.owl-item.active').find('[data-animation]');
			layer.each(function(){
				var anim_name = $(this).data('animation');
				$(this).addClass('animated ' + anim_name).css('opacity', '1');
			});
		});

		var transition = "width "+ (timeout - 500) + "ms";
		function startProgressBar() {
			$("#bar").css({
				width: "100%",
				transition: transition,
			});
		}
		function startProgressBarInit() {
			setInterval(function(){
				$("#bar").css({
					width: "100%",
					transition: transition,
				});
			}, 500);
		}

		function resetProgressBar() {
			$("#bar").css({
				width: 0,
				transition: "width 0s"
			});
		}

		if(isProgressVar == 'yes'){

			var $elem,
				$progressBar,
				$bar;
			function progressBar(){
		        $elem = $('.slider-wrapper');
				//build progress bar elements
				buildProgressBar();
		    }
		    function buildProgressBar(){
		      $progressBar = $("<div>",{
		        id:"progressBar"
		      });
		      $bar = $("<div>",{
		        id:"bar"
		      });
		      $progressBar.append($bar).prependTo($elem);

		    }
		    progressBar();
		}

	}

	/**********************
	*Default Slider
	***********************/

	homePageSlider(
		selector = '#homepage-slider',
		timeout = 5000,
		animateOut = 'zoomOut',
		animateIn = 'zoomIn',
		nav = false,
		dots = true,
		isProgressVar = 'no'
	);


	/**********************
	*Slider With Progress Bar
	***********************/
	homePageSlider(
		selector = '#homepage-slider-2',
		timeout = 5000,
		animateOut = 'zoomOut',
		animateIn = 'zoomIn',
		nav = true,
		dots = true,
		isProgressVar = 'yes'
	);



	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var currentID = e.target.getAttribute('href');
		$(currentID).find('.owl-item').trigger('refresh.owl.carousel');
		$(currentID).find('.owl-item').resize();
	});

	/**********************
	*New Product Carousel Activation
	***********************/

	$('.js-new-products-carousel').owlCarousel({
		items: 3,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:3,
	        }
    	}
	});
	function carouselClasses(selector) {
	    $(selector).each(function() {
	        var total = $(this).find('.owl-item.active').length;
	        $(this).find('.owl-item').removeClass('firstActiveItem');
	        $(this).find('.owl-item').removeClass('lastActiveItem');
	        $(this).find('.owl-item.active').each(function(index) {
	            if (index === 0) {
	                $(this).addClass('firstActiveItem')
	            }
	            if (index === total - 1 && total > 1) {
	                $(this).addClass('lastActiveItem')
	            }
	        })
	    })
	}
	carouselClasses('.new-products-carousel');
	$('.new-products-carousel').on('translated.owl.carousel', function(event) {
	    carouselClasses('.new-products-carousel')
	});


	/**********************
	*New Product Carousel 2 Activation
	***********************/

	$('.js-new-products-carousel-2').owlCarousel({
		items: 2,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        }
    	}
	});

	/**********************
	*New Product Carousel 3 Activation
	***********************/

	$('.js-new-products-carousel-3').owlCarousel({
		items: 3,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        576:{
	            items:1,
	        },
	        992:{
	            items:2,
	        },
	        1200:{
	            items:3,
	        }
    	}
	});


	/**********************
	*Category Product Carousel Activation
	***********************/

	$('.js-category-product-carousel').owlCarousel({
		items: 2,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
    	}
	});

	/**********************
	*Category Product Carousel 2 Activation
	***********************/

	$('.js-category-product-carousel-2').owlCarousel({
		items: 4,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:3,
	        },
	        1200:{
	            items:4,
	        },
    	}
	});

	/**********************
	*Category Product Carousel 2 Activation
	***********************/

	$('.js-category-product-carousel-3').owlCarousel({
		items: 3,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        576:{
	            items:2,
	        },
	        992:{
	            items:3,
	        },
    	}
	});
	carouselClasses('.js-category-product-carousel-3');
	$('.js-category-product-carousel-3').on('translated.owl.carousel', function(event) {
	    carouselClasses('.js-category-product-carousel-3')
	});


	/**********************
	*Best Product Carousel Activation
	***********************/

	$('.js-best-product-carousel').owlCarousel({
		items: 1,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	});


	/**********************
	*Best Product Carousel Activation
	***********************/

	$('.related-product-carousel').owlCarousel({
		items: 4,
		smartSpeed: 500,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        575:{
	            items:2,
	        },
	        768:{
	            items:3,
	        },
	        992:{
	            items:4,
	        },
    	}
	});

	function relatedProductCarouselClasses() {
	    $('.related-product-carousel').each(function() {
	        var total = $(this).find('.owl-item.active').length;
	        $(this).find('.owl-item').removeClass('firstActiveItem');
	        $(this).find('.owl-item').removeClass('lastActiveItem');
	        $(this).find('.owl-item.active').each(function(index) {
	            if (index === 0) {
	                $(this).addClass('firstActiveItem')
	            }
	            if (index === total - 1 && total > 1) {
	                $(this).addClass('lastActiveItem')
	            }
	        })
	    })
	}
	relatedProductCarouselClasses();
	$('.related-product-carousel').on('translated.owl.carousel', function(event) {
	    relatedProductCarouselClasses();
	});



	/**********************
	*Product Thumb Carousel Activation
	***********************/

	$('#thumbmenu').owlCarousel({
		items: 4,
	    loop:false,
	    nav: false,
	    dots: true,
	    margin: 10,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],    
	    responsive:{
	        0:{
	            items:1,
	        },
	        300:{
	            items:2,
	        },
	        400:{
	            items:4,
	        },
	        768:{
	            items:4,
	        }
    	}
	});

	/**********************
	*Single Product Thumb Carousel Activation
	***********************/

	$('.product-slider').slick({
		prevArrow: '<i class="fa fa-angle-left"></i>',
		nextArrow: '<i class="fa fa-angle-right slick-next-btn"></i>',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});


	/**********************
	*Single Product Thumb Carousel Activation
	***********************/

	$('#thumbmenu-horizontal').slick({
		prevArrow: '<i class="fa fa-angle-left"></i>',
		nextArrow: '<i class="fa fa-angle-right slick-next-btn"></i>',
		slidesToShow: 3,
		responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});

	/**********************
	*Single Product Thumb Vertical Carousel Activation
	***********************/

	$('#thumbmenu-vertical').slick({
		prevArrow: '<i class="fa fa-angle-up"></i>',
		nextArrow: '<i class="fa fa-angle-down slick-next-btn"></i>',
		slidesToShow: 3,
		vertical: true,
		responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});

	/**********************
	* Thumb Tab
	***********************/

	$('.modal').on('shown.bs.modal', function (e) {
	    $('.thumb-menu-item').resize();
	})
	    
	$('.thumb-menu-item a').on('click',function(e){
	      e.preventDefault();
	     
	      var $href = $(this).attr('href');
	     
	      $('.thumb-menu-item a').removeClass('active');
	      $(this).addClass('active');
	     
	      $('.product-thumb-large .tab-pane').removeClass('active show');
	      $('.product-thumb-large '+ $href ).addClass('active show');
	     
	});

	/**********************
	* Gallery Post Carousel Activation
	***********************/
	
	$('.post-gallery').owlCarousel({
		items: 1,
	    loop:true,
	    nav: true,
	    dots: false,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    navText: ['<i class="fa fa-caret-left">', '<i class="fa fa-caret-right">'],
	});



	/**********************
	* Countdown Activation
	***********************/
	
	$('[data-countdown]').each(function() {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Minutes</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Seconds</span></div>'));
		});
	}); 



	/**********************
	* Scroll To Top
	***********************/

    function scrollToTop(){
		var scrollTop = $(".scroll-to-top");
		$(window).on('scroll',function() {
			var topPos = $(this).scrollTop();

			if (topPos > 100) {
				$(scrollTop).css("opacity", "1");

			} else {
				$(scrollTop).css("opacity", "0");
			}

		}); 

		$(scrollTop).on('click',function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;

		}); 

    }


	/**********************
	* Nice Select Activation
	***********************/

	$('.nice-select').niceSelect();

	/**********************
	* Sticky Header
	***********************/

	function stickyHeader(){
		$(window).on('scroll',function(){
			 var headerHeight = $('.header')[0].getBoundingClientRect().height;
		    if ($(window).scrollTop() >= headerHeight) {
		        $('.fixed-header').addClass('sticky-header');
		    }
		    else {
		        $('.fixed-header').removeClass('sticky-header');
		    }
		});		
	}



	/**********************
	* Expand User Activation
	***********************/

	function expandAction(){
		$(".expand_action").on('click', function(e){
			e.preventDefault();
			var target = $(this).data('attr');
			$(target).slideToggle('slow');
		});
	}
   
	/**********************
	* Expand new account info
	***********************/

	function expandNewAccountInfo(){
		$("#createaccount").on('change', function(){
			if(  $("#createaccount").prop( "checked" ) ){
				$(".new-account").slideToggle('slow');
			}else{
				$(".new-account").slideToggle('slow');
			}
		})
	}


	/**********************
	*Expand new shipping info  
	***********************/

	function expandShippingInfo(){
		$("#shipdifferetads").on('change', function(){
			if(  $("#shipdifferetads").prop( "checked" ) ){
				$(".ship-box-info").slideToggle('slow');
			}else{
				$(".ship-box-info").slideToggle('slow');
			}
		})
	}

	/**********************
	*Bootstrap tooltip activation 
	***********************/

	$('[data-toggle="tooltip"]').tooltip();

	
	/**********************
	*CounterUp activation 
	***********************/

	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	/**********************
	*Bootstrap Accordion 
	***********************/

	$('.accordion__link').on('click', function(){
		$(this).parents('.accordion__single').siblings().removeClass('open');
		$(this).parents('.accordion__single').toggleClass('open');
	});


	/* Portfolio Filter & Popup Active */
	function portfolioFilterLightgallery(){
		var $gallery = $('.portfolio-wrapper');
		var $boxes = $('.portfolio-item');
		$boxes.hide();

		$gallery.imagesLoaded({
			background: true
		}, function () {
			$boxes.fadeIn();
			$gallery.isotope({
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows',
				masonry: {
					columnWidth: '.grid-sizer',
				}
			});
		});

		$('.portfolio-filters button').on('click', function () {
			
			var filterValue = $(this).attr('data-filter');
			$gallery.isotope({
				filter: filterValue
			});

			$('.portfolio-filters button').removeClass('is-checked');
			$(this).addClass('is-checked');

		});

		var imagePopup = $('.popup-link');
		imagePopup.magnificPopup({
			type: 'image',
		});

	}

	/**********************
	*Expand new Sidebar Category
	***********************/

	function expandProductCat(){
		$(".cat-parent").on('click', function(e){
			e.preventDefault();
			$(this).find('.children').slideToggle('500');
		});
	}

	/**********************
	*Price Slider
	***********************/
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 120,
		values: [ 20, 115 ],
		slide: function( event, ui ) {
			$("#amount").val("$" + ui.values[0] + "  $" + ui.values[1]);
		}
	});
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - " +
        "$" + $("#slider-range").slider("values", 1));


	/**********************
	*Single Product Popup
	***********************/

	$('.popup-btn').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/**********************
	*Image Zoom
	***********************/

	$('.easyzoom').easyZoom();


	/**********************
	*Sticky Sidebar
	***********************/

    $('#sticky-sidebar').theiaStickySidebar({
      // Settings
      additionalMarginTop: 80
    });


	/**********************
	*Expand Shipping Calculator
	***********************/

	function expandShippingCalc(){
		$(".expand-calculator").on('click', function(e){
			e.preventDefault();
			$(this).siblings('#shipping-calculator').slideToggle('500');
		});
	}

   
	/**********************
	* Expand payment
	***********************/

	function expandPaymentInfo(){
        $('input[name="payment-method"]').on('click', function () {

            var $value = $(this).attr('value');
            $(this).parents('.payment-group').siblings('.payment-group').children('.payment-info').slideUp('300');
            $('[data-method="' + $value + '"]').slideToggle('300');
        });
	}

	/**********************
	* Tagcloud activation
	***********************/

	$(".tagcloud a").tagcloud({
	  size: {start: 14, end: 36, unit: "px"}
	});



	/**********************
	*Initialization 
	***********************/

	dropdownAnimation();
	stickyHeader();
	categoryMenuExpand();
	categoryMenuExpandInMobile();
	cartDrpdownExpand();
	expandAction();
	expandNewAccountInfo();
	expandShippingInfo();
	scrollToTop();
	portfolioFilterLightgallery();
	expandProductCat();
	expandShippingCalc();
	expandPaymentInfo();

})(jQuery);

