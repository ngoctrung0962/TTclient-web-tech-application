

/*------------------
    Preloader
--------------------*/
document.querySelector(window).addEventListener('load', function () {
    document.querySelector(".loader").fadeOut();
    document.querySelector("#preloder").delay(200).fadeOut("slow");

    /*------------------
        Product filter
    --------------------*/
    document.querySelector('.filter__controls li').addEventListener('click', function () {
        document.querySelector('.filter__controls li').removeClass('active');
        document.querySelector(this).classList.add('active');
    });


    document.querySelector('.set-bg').each(function () {
        var bg = document.querySelector(this).data('setbg');
        document.querySelector(this).css('background-image', 'url(' + bg + ')');
    });


    if (document.querySelector('.property__gallery').length > 0) {
        var containerEl = document.querySelector('.property__gallery');
        // eslint-disable-next-line no-undef
        var mixer = mixitup(containerEl);
    }
    //Search Switch
    document.querySelector('.search-switch').addEventListener('click', function () {
        document.querySelector('.search-model').fadeIn(400);
    });

    document.querySelector('.search-close-switch').addEventListener('click', function () {
        document.querySelector('.search-model').fadeOut(400, function () {
            document.querySelector('#search-input').val('');
        });
    });

    //Canvas Menu
    document.querySelector(".canvas__open").addEventListener('click', function () {
        document.querySelector(".offcanvas-menu-wrapper").classList.add("active");
        document.querySelector(".offcanvas-menu-overlay").classList.add("active");
    });

    document.querySelector(".offcanvas-menu-overlay, .offcanvas__close").addEventListener('click', function () {
        document.querySelector(".offcanvas-menu-wrapper").removeClass("active");
        document.querySelector(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
        Navigation
    --------------------*/
    document.querySelector(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    document.querySelector('.collapse').addEventListener('shown.bs.collapse', function () {
        document.querySelector(this).previousElementSibling.classList.add('active');
    });

    document.querySelector('.collapse').addEventListener('hidden.bs.collapse', function () {
        document.querySelector(this).previousElementSibling.removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    document.querySelector(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Product Details Slider
    ----------------------------*/
    document.querySelector(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).addEventListener('changed.owl.carousel', function (event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs(num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if (e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }


    /*------------------
        Magnific
    --------------------*/
    document.querySelector('.image-popup').magnificPopup({
        type: 'image'
    });


    document.querySelector(".nice-scroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#dddddd",
        boxzoom: false,
        cursorwidth: 5,
        background: 'rgba(0, 0, 0, 0.2)',
        cursorborderradius: 50,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

    document.querySelector("#countdown-time").countdown(timerdate, function (event) {
        document.querySelector(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Day</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hour</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
    });

    /*-------------------
        Range Slider
    --------------------- */
    var rangeSlider = document.querySelector(".price-range"),
        minamount = document.querySelector("#minamount"),
        maxamount = document.querySelector("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*------------------
        Single Product
    --------------------*/
    document.querySelector('.product__thumb .pt').addEventListener('click', function () {
        var imgurl = document.querySelector(this).data('imgbigurl');
        var bigImg = document.querySelector('.product__big__img').attr('src');
        if (imgurl != bigImg) {
            document.querySelector('.product__big__img').attr({ src: imgurl });
        }
    });

    /*-------------------
        Quantity change
    --------------------- */
    var proQty = document.querySelector('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.insertAdjacentHTML("beforeend", '<span class="inc qtybtn">+</span>');
    proQty.addEventListener('click', '.qtybtn', function () {
        var $button = document.querySelector(this);
        var oldValue = $button.parent().querySelector('input').value;
        if ($button.classList.contains('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().querySelector('input').val(newVal);
    });

    /*-------------------
        Radio Btn
    --------------------- */
    document.querySelector(".size__btn label").addEventListener('click', function () {
        document.querySelector(".size__btn label").removeClass('active');
        document.querySelector(this).classList.add('active');
    });
    document.querySelector('.set-bg').each(function () {
        var bg = document.querySelector(this).data('setbg');
        document.querySelector(this).css('background-image', 'url(' + bg + ')');
    });
});


