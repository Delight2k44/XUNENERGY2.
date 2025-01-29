// SearchForm Section code
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
}

$(document).ready(function() {

    $(window).scroll(function() {
        // Navbar-bottom scrolling
        if (this.scrollY > 5) {
            $('.navbar-bottom').addClass("sticky");
        } else {
            $('.navbar-bottom').removeClass("sticky");
        }

        // Scrolling Button Btn
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Slide-up script
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });
    });

    // Owl Carousel
    $('.owl-carousel').owlCarousel({
        margin: 5,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});
// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Feedback Rating System
document.querySelectorAll('.bxs-star').forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        document.querySelectorAll('.bxs-star').forEach((s, index) => {
            s.classList.toggle('active', index < value);
        });
        document.getElementById('selectedRating').value = value;
    });
});

// Form Submission Handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Oops! Something went wrong.');
            }
        });
    });
});
