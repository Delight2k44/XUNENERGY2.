document.addEventListener('DOMContentLoaded', function() {
  // Search Form
  const searchForm = document.querySelector('.search-form');
  document.querySelector('#search-btn').addEventListener('click', () => {
    searchForm.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    searchForm.classList.remove('active');
  });

  // Swiper Init
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

  // Word Counter
  const messageField = document.querySelector('textarea[name="message"]');
  if(messageField) {
    const wordCounter = messageField.nextElementSibling;
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

  // Rating System
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

  // Form Handling
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

  // Toast System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.remove(), 3000);
  }
});

// jQuery for legacy components
$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    margin: 5,
    navigation: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  $(window).scroll(function() {
    $('.navbar-bottom').toggleClass("sticky", $(this).scrollTop() > 5);
    $('.scroll-up-btn').toggleClass("show", $(this).scrollTop() > 500);
  });

  $('.scroll-up-btn').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });
});
