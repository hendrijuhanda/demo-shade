$(function () {
	//bootstrap carousel
	$("#slide").carousel();

	//mixitup portfolio
	$("#grid").mixitup();

	//mixitup gallery
	$("#gal").mixitup();

	//prettyphoto image show
	$(".prettyphoto").prettyPhoto({ social_tools: false });

	//hide backtop button
	$("#backTop").hide();

	//scroll to top
	$("#backTop a").click(function (e) {
		e.preventDefault();
		$("body,html").animate({ scrollTop: 0 }, 800);
	});

	$(window).scroll(function () {
		//sticky navigation
		if (
			$(this).scrollTop() > $("header").height() /* or determine in pixel */
		) {
			$("#mainNav").addClass("navbar-fixed-top shadeStickyNav");
			$(".shadeStickyLogo").css({ display: "block" });
			$("#banner").addClass("long");
		} else {
			$("#mainNav").removeClass("navbar-fixed-top shadeStickyNav");
			$(".shadeStickyLogo").css({ display: "none" });
			$("#banner").removeClass("long");
		}

		//back top
		if ($(this).scrollTop() > 500) {
			$("#backTop").slideDown();
		} else {
			$("#backTop").slideUp();
		}
	});

	//google map
	if ($("#map").length) {
		var map = new GMaps({
			el: "#map",
			lat: -6.868439,
			lng: 107.592223,
			zoomControlOpt: { style: "SMALL", position: "TOP_LEFT" },
			panControl: false,
		});

		map.addMarker({
			lat: -6.868439,
			lng: 107.592223,
			title: "Shade, Inc.",
		});
	}
});

//hide sticky logo at width < 767
$(window).resize(function () {
	if ($(window).width() < 767) {
		$("li").remove(".shadeStickyLogo");
	} else {
	}
});
