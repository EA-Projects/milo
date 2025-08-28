window.addEventListener('load', function() {   
    // Date Picker initializer 
    $(function(){
        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            duration: "fast"
        });
    }); 

    // Fix navbar when scroll
    if (window.matchMedia('(min-width: 575px)').matches) {
        scrollValue = 1;
    } else{
        scrollValue = 550;
    }
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= scrollValue) {
            $('nav').addClass('scrolled');
        } 
        else {
            $('nav').removeClass('scrolled');
        }
    });

    // Animations
    if ($('[data-fade]').length) {
        let animatedElements = new Set();
    
        let observer = new IntersectionObserver((entries) => {
            const toAnimate = entries
                .filter(entry => entry.isIntersecting && !animatedElements.has(entry.target))
                .map(entry => entry.target);
    
            if (toAnimate.length > 0) {
                gsap.to(toAnimate, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: "power2.out",
                    duration: 0.5,
                    delay: 0.3
                });
    
                toAnimate.forEach(el => {
                    animatedElements.add(el);
                    observer.unobserve(el);
                });
            }
        }, {
            threshold: 0.3
        });
    
        document.querySelectorAll("[data-fade]").forEach((el) => {
            observer.observe(el);
        });
    }

    if ($('[data-type]').length) {
        let animatedElements = new Set();

        // Split the text into characters
        let splitText = new SplitType("[data-type]");

        let observer = new IntersectionObserver((entries) => {
            const toAnimate = entries
                .filter(entry => entry.isIntersecting && !animatedElements.has(entry.target))
                .map(entry => entry.target);

            if (toAnimate.length > 0) {
                const chars = toAnimate.flatMap(el => el.querySelectorAll('.char'));

                gsap.set("[data-type]", { 
                    opacity: 1,
                });
                gsap.to(chars, {
                    opacity: 1,
                    delay: 0.2,
                    duration: 0.2,
                    stagger: 0.010,
                });

                toAnimate.forEach(el => {
                    animatedElements.add(el);
                    observer.unobserve(el);
                });
            }
        }, {
            threshold: 0.3
        });

        document.querySelectorAll("[data-type]").forEach((el) => {
            observer.observe(el);
        });
    }


    // Slick slider for How It Works section
    $('.slide-how-it-works').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding:'20px',
        focusOnSelect: false,
        arrows: false,
        autoplay: false,
        pauseOnHover: false,
        draggable: true,
        infinite: false,
        dots: true,
    });

    if ($('#waitlist-form').length) {
        $(function () {
            const scriptURL =
                'https://script.google.com/macros/s/AKfycbyBFYRIJPgeA503Q8SW0wvmo8dssUm7Mhl9iI9NDjsib5411Rq1AuWchRf3S_S-seYJ/exec';
            const form = document.getElementById('waitlist-form');
        
            form.addEventListener('submit', (e) => {
                $('#waitlist-form').addClass('disabled');
        
                // Sending status
                $('#waitlist-form').addClass('readonly');
                $('#waitlist-form input.button').val("Sending Information");
        
                e.preventDefault();
        
                // Create a FormData to include file and other fields
                const formData = new FormData(form);
        
                fetch(scriptURL, { method: 'POST', body: formData })
                .then((response) => {
                    $('.success-form').addClass('visible');
                    $('#waitlist-form').addClass('readonly');
                    $('.wrapper-reserve-area').addClass('readonly');
                    $('#waitlist-form input.button').val("Submitted");
                })
                .catch((error) => {
                    console.error('Error!', error.message);
                    $('.success-form').removeClass('visible');
                    $('#waitlist-form').removeClass('readonly');
                    $('.wrapper-reserve-area').removeClass('readonly');
                    $('#waitlist-form input.button').val("Submit");
                });
            });
        });
    }
});
