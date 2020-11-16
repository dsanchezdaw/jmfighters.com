(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
  	$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOutLeft',
	    animateIn: 'fadeInDown',
	    nav:true,
	    dots: true,
	    autoplayTimeout:6000,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	    }, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter, .ftco-appointment').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

    $('.appointment_time').timepicker();


    var includeHTML = function () {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("include-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }
    }
    includeHTML();
})(jQuery);


//user session
function onClickSignOut() {
    if (confirm("¿ Seguro que quieres cerrar sesión ?")) {
        jQuery.ajax({
            type: "POST",
            async: false,
            url: 'functions.php',
            dataType: 'json',
            data: { functionName: 'signOut' },

            success: function (obj, textstatus) {
                if (obj['sessionClosed']) {
                    alert('Se ha cerrado sesión.');
                    location.reload();
                }
            }
        });
    } else {
        $('div#user_form').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
};

function getUserSession() {
    $.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUserSession' },

        success: function (obj, textstatus) {
            this.$user = obj['user'];

            if (this.$user) {
                if (this.$user[0]['rol'] == 'admin') {
                    $('#cmsList').html('<a href="cms.html" class="nav-link">Gestión</a>');
                }
                $('#session').html('<div class="modal-header"><h4 class="modal-title">Cerrar sesión</h4></div>'
                    + '<div class="modal-body row m-3"><button type="button" id="signOut" class="btn btn-danger col-md-6" onclick="onClickSignOut()">Cerrar sesión</button>'
                    + '<button type="button" class="btn btn-primary col-md-6" data-dismiss="modal">Cerrar</button></div>');
            }
        }
    });
};

function onSubmitLogin() {
    $user = $('#user').val();
    $pass = $('#password').val();

    $passEncoded = CryptoJS.MD5($pass).toString();

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUser', user: $user, pass: $passEncoded },

        success: function (obj, textstatus) {
            if (!obj['userExist']) {
                alert('Este usuario no existe');
                event.preventDefault();
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error. No se ha podido iniciar sesión.");
            event.preventDefault();
        }
    });
}



function loadClass() {
    jQuery.ajax({
        type: "POST",
        url: 'functions.php',
        data: { functionName: 'getClass' },
        success: function (obj, textstatus) {
            var $classHtml = obj["result"];

            $('#modals').html(getClassFormForHtml($classHtml));
            $('#classList').html(getClassForHtml($classHtml));
            $('#scripts').html(getScripts($classHtml));
        },
        error: function (xhr, status, error) {
            alert("No se ha podido conectar con las clases.");
        }
    });
};

function getClassForHtml(classObj) {
    $classHtml = "";
    for (var i = 0; i < classObj['length']; i++) {

        if (classObj[i]['logo']['length'] > 0) {
            $logo = classObj[i]['logo'];
        } else {
            $logo = "images/jm_logo.jpeg";
        }

        $classHtml = $classHtml + '<div class="col-md-6 col-lg-4 d-flex ftco-animate fadeInUp ftco-animated">';
        $classHtml = $classHtml + '<div class="blog-entry align-self-stretch">';
        $classHtml = $classHtml + '<div class="block-20" style="background-image: url(' + $logo + ');">';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '<div class="text p-4">';
        $classHtml = $classHtml + '<h3 class="heading">' + classObj[i]['name'] + '</h3>';
        $classHtml = $classHtml + '<p><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form_' + classObj[i]['id'] + '">Pedir cita</button></p>';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '</div>';
    };
    return $classHtml
};

function getClassFormForHtml(classObj) {
    $modals = "";
    for (var i = 0; i < classObj['length']; i++) {
        $modals = $modals + '<div class="modal" id="form_' + classObj[i]['id'] + '">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<form class="p-5 bg-light" method="POST" id="form_' + classObj[i]['id'] + '" >'
            + '<div class="modal-header">'
            + '<h4 class="modal-title">Pedir cita - ' + classObj[i]['name'] + '</h4>'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<div class="comment-form-wrap pt-5">'
            + '<div class="form-group">'
            + '<label for="name">Nombre y apellidos *</label>'
            + '<input type="text" class="form-control" id="name_' + classObj[i]['id'] + '" placeholder="Nombre y apellidos" required>'
            + '</div>'
            + '<div class="form-group">'
            + '<label for="dni">DNI *</label>'
            + '<input type="text" class="form-control" id="dni_' + classObj[i]['id'] + '" placeholder="00000000X" pattern="[0-9]{8}[a-zA-Z]{1}" required>'
            + '</div>'
            + '<!-- calendar -->'
            + '<div class="form-group">'
            + '<label for="date">Día *</label>'
            + '<input type="text" name="date" class="form-control datepicker datepicker_' + classObj[i]['id'] + '" id="date_' + classObj[i]['id'] + '" autocomplete="off" required>'
            + '</div>'
            + '<!-- hour -->'
            + '<div class="form-group">'
            + '<label for="date">Hora</label>'
            + '<select name="hour" class="custom-select" id="hour_' + classObj[i]['id'] + '" required>';

        $hours = classObj[i]['hours'].split(",");

        for (var j = 0; j < $hours['length']; j++) {
            $d = new Date();
            $h = $d.getHours() - 2;
            $hour = $hours[j].substring(0, 5);

            if ($h > $hour.substring(0, 2)) {
                $modals = $modals + '<option value="' + $hour + '">' + $hours[j] + '</option>';
            };
        };

        $modals = $modals + '</select>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<!-- Modal footer -->'
            + '<div class="modal-footer">'
            + '<input type="hidden" id="class_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['id'] + '" />'
            + '<input type="hidden" id="className_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['name'] + '" />'
            + '<input type="hidden" id="pax_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['pax'] + '" />'
            + '<input type="submit" class="btn btn-primary" value="Reservar"/>'
            + '<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>'
    };
    return $modals;
};

function getScripts(classObj) {
    $weekDays = [0, 1, 2, 3, 4, 5, 6, 7];
    $script = "";
    for (var i = 0; i < classObj['length']; i++) {
        $daysEnabled = classObj[i]['days'].split(',').map(num => parseInt(num, 10));
        $daysDissabled = $.grep($weekDays, function (el) { return $.inArray(el, $daysEnabled) == '-1' });

        $script = $script + "<script>"
            //onSubmit
            + "$('#form_" + classObj[i]['id'] + "').submit(function() {"
            + "var classId = $('#class_" + classObj[i]['id'] + "').val();"
            + "submitForm(classId);"
            + "});"
            //onChangeDate
            + "$('#date_" + classObj[i]['id'] + "').change(function() {"
            + "$date = $('#date_" + classObj[i]['id'] + "').val();"
            + "$dSelected = $date.substring(0,2);"
            + "$mSelected = $date.substring(3,5);"
            + "$ySelected = $date.substring(6);"
            + "$dateFormated = new Date($mSelected+'\/'+$dSelected+'\/'+$ySelected);"

            + "$today = new Date();"
            + "$dNow = $today.getDate();"
            + "$mNow = $today.getMonth()+1;"
            + "$yNow = $today.getFullYear();"
            + "$today = new Date($mNow+'\/'+$dNow+'\/'+$yNow);"
            + "$options = '';"
            + "$h = new Date().getTime() - 180000 * 60;"
            + "$hourLimit = new Date($h).getHours();"
            + "$hours = ['" + classObj[i]['hours'].split(',') + "'];"

            + "if($today.getTime() == $dateFormated.getTime()){"
            + "for(var j = 0; j < $hours['length']; j++){"
            + "if(parseInt($hours[j].substring(0,2)) > $hourLimit){"
            + "$hour = $hours[j].substring(0,5);"
            + "$options = $options + '<option value='+$hour+'>$hours[j]</option>';"
            + "}"
            + "};"
            + "}else{"
            + "for(var j = 0; j < $hours['length']; j++){"
            + "$hour = $hours[j].substring(0,5);"
            + "$options = $options + '<option value='+$hour+'>'+$hours[j]+'</option>';"
            + "}"
            + "}"
            + "$('#hour_" + classObj[i]['id'] + "').html($options);"
            + "});"
            //datepicker
            + "$('.datepicker_" + classObj[i]['id'] + "').datepicker({"
            + "language: 'es',";
        if ($daysDissabled.length > 0) {
            $script = $script + "daysOfWeekDisabled: [" + $daysDissabled + "],";
        }
        $script = $script + "autoclose: true,"
            + "startDate: '0',"
            + "endDate: '+14d',"
            + "weekStart: 1,"
            + "format: 'dd-mm-yyyy'"
            + "});"
            + "<\/script>";
    };
    return $script;
};



async function submitForm(classId) {
    $dni = $('#dni_' + classId).val();
    $name = $('#name_' + classId).val();
    $date = $('#date_' + classId).val();
    $hour = $('#hour_' + classId).val();
    $pax = $('#pax_' + classId).val();
    $className = $('#className_' + classId).val();

    var isValidDni = isValidDNI($dni);

    if (!isValidDni) {
        alert('DNI erroneo.');
    } else {
        var classFull = new Promise((resolve, reject) => {
            jQuery.ajax({
                type: "POST",
                async: false,
                url: 'functions.php',
                dataType: 'json',
                data: { functionName: 'getBookings', date: $date, hour: $hour, dni: $dni, className: $className },

                success: function (obj, textstatus) {
                    if (obj['hasBooking']) {
                        alert("Ya tienes hecha una reserva para esa clase.");
                        resolve(true);
                    } else if (!obj['hasBooking'] && (('error' in obj) || obj.result >= this.$pax)) {
                        alert("Clase completa.");
                        resolve(true);
                    }
                    resolve(('error' in obj) || obj.result >= 10);
                }
            });
        });

        if (!(await classFull)) {
            insertBooking($date, $hour, $name, $dni.toUpperCase(), $className);

            $('form#form_' + classId)[0].reset();
            $('div#form_' + classId).modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            event.preventDefault();
        } else {
            event.preventDefault();
        }
    }
};

function insertBooking(date, hour, name, dni, className) {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'addBooking', date: date, hour: hour, name: name, dni: dni, className: className },

        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                alert("Reserva hecha con exito.");
            } else {
                alert("No se ha podido hacer la reserva.");
                event.preventDefault();
            }
            return;
        },
        error: function (xhr, status, error) {
            alert("No se ha podido hacer la reserva.");
        }
    });
};

function isValidDNI(dni) {
    var num, dniChar, char;

    num = dni.substr(0, dni.length - 1);
    dniChar = dni.substr(dni.length - 1, 1).toUpperCase();
    num = num % 23;
    char = 'TRWAGMYFPDXBNJZSQVHLCKET';
    char = char.substring(num, num + 1);

    return dniChar === char
};

function removeClass(classId) {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'removeClass', classId: classId},

        success: function (obj, textstatus) {
            if (obj['removed']) {
                alert("Clase eliminada.");
            }
            return;
        },
        error: function (xhr, status, error) {
            alert("No se ha podido eliminar la clase.");
        }
    });
};

function getDayOfWeek(n) {
    $days = ["Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"];

    return $days[n - 1];
};

function getHoursCms() {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getHours'},

        success: function (obj, textstatus) {
            return;
        }
    });
};





