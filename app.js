// Search Form Toggle
const searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').addEventListener('click', () => {
    searchForm.classList.toggle('active');
});

// Remove Search Form on Scroll
window.addEventListener('scroll', () => {
    searchForm.classList.remove('active');
});

// jQuery Document Ready
$(document).ready(function() {
    // Navbar Sticky Effect
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

    // Owl Carousel Initialization
    $('.owl-carousel').owlCarousel({
        margin: 5,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false }
        }
    });
});

// Swiper Slideshow Configuration
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
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
    }
});

// Contact Form Word Counter
const messageField = document.querySelector('textarea[name="message"]');
if(messageField) {
    const wordCounter = document.createElement('div');
    wordCounter.className = 'word-counter';
    messageField.parentNode.insertBefore(wordCounter, messageField.nextSibling);

    messageField.addEventListener('input', () => {
        const words = messageField.value.trim().split(/\s+/);
        const wordCount = words.length;
        
        wordCounter.textContent = `${350 - wordCount} words remaining`;
        wordCounter.style.color = '#2b5087';
        
        if(wordCount > 350) {
            messageField.value = words.slice(0, 350).join(' ');
            wordCounter.textContent = 'Maximum 350 words reached!';
            wordCounter.style.color = 'red';
        }
    });
}

// Enhanced Rating System
document.querySelectorAll('.bxs-star').forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        const stars = document.querySelectorAll('.bxs-star');
        
        stars.forEach((s, index) => {
            s.classList.remove('active');
            if(index < value) {
                s.classList.add('active');
                s.style.animation = `starPop 0.3s ease ${index * 0.1}s`;
            }
        });
        
        document.getElementById('selectedRating').value = value;
    });
});

// Form Submission Handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        try {
            submitButton.innerHTML = '<div class="spinner"></div>';
            submitButton.disabled = true;

            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if(response.ok) {
                form.reset();
                showToast('Message sent successfully!', 'success');
                
                // Reset rating if feedback form
                if(form.id === 'feedbackForm') {
                    document.querySelectorAll('.bxs-star').forEach(star => {
                        star.classList.remove('active');
                    });
                    document.getElementById('selectedRating').value = 0;
                }
            } else {
                showToast('Submission failed. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error. Please check connection.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
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
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.remove(), 3000);
}


