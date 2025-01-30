document.addEventListener('DOMContentLoaded', function() {
    // Adjust the font size based on window width
    function adjustFontSize() {
        const width = window.innerWidth;
        const body = document.body;
        body.style.fontSize = width < 768 ? '1.2em' : '1em';
    }

    // Run on initial load and window resize
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    // Search Form Toggle
    const searchForm = document.querySelector('.search-form');
    document.querySelector('#search-btn').addEventListener('click', () => {
        searchForm.classList.toggle('active');
    });

    // Remove Search Form on Scroll
    window.addEventListener('scroll', () => {
        searchForm.classList.remove('active');
    });

    // Navbar Sticky Effect and Scroll Up Button
    $(window).scroll(function() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Navbar Sticky
        $('.navbar-bottom').toggleClass("sticky", scrollY > 5);

        // Scroll Up Button
        $('.scroll-up-btn').toggleClass("show", scrollY > 500);
    });

    // Smooth Scroll to Top
    $('.scroll-up-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Enhanced Rating System with Animation
    document.querySelectorAll('.bxs-star').forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            document.querySelectorAll('.bxs-star').forEach((s, index) => {
                s.classList.toggle('active', index < value);
                if (index < value) {
                    s.style.animation = `starPop 0.3s ease ${index * 0.1}s`;
                }
            });
            document.getElementById('selectedRating').value = value;
        });
    });

    // Enhanced Form Handling with Loading States
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            try {
                submitButton.innerHTML = '<div class="spinner"></div>';
                submitButton.disabled = true;

                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    // Reset stars if feedback form
                    if (form.id === 'feedbackForm') {
                        document.querySelectorAll('.bxs-star').forEach(star => {
                            star.classList.remove('active');
                        });
                        document.getElementById('selectedRating').value = 0;
                    }
                    showToast('Message sent successfully!', 'success');
                } else {
                    showToast('Oops! Something went wrong.', 'error');
                }
            } catch (error) {
                showToast('Network error. Please check your connection.', 'error');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    });

    // Toast Notification System
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
