// Mobile Navigation Menu
document.getElementById('nav-toggle').addEventListener('click', function() {
  const navMenu = document.getElementById('nav-menu');
  const isExpanded = this.getAttribute('aria-expanded') === 'true';

  // Toggle the expanded state of the button
  this.setAttribute('aria-expanded', !isExpanded);

  // Toggle the visibility of the navigation menu
  navMenu.classList.toggle('active');
});

// Intersection Observer to reveal sections on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
      }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Smooth scrolling for internal anchor links
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
      });
  });
});

// Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    let isMoving = false;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (index) => {
        if (isMoving) return;
        isMoving = true;
        track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
        currentIndex = index;

        // Update dots
        updateDots();
    };

    const updateDots = () => {
        dots.forEach(dot => {
            dot.classList.remove('current-slide');
            dot.setAttribute('aria-selected', 'false');
        });
        dots[currentIndex].classList.add('current-slide');
        dots[currentIndex].setAttribute('aria-selected', 'true');
    };

    const handleTransitionEnd = () => {
        isMoving = false;
    };

    // Automatic Slide Transition
    const autoSlide = () => {
        moveToSlide((currentIndex + 1) % slides.length);
    };

    let slideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 5000);
    });

    // Reset transition and position on transition end
    track.addEventListener('transitionend', handleTransitionEnd);

    // Button Event Listeners
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide((currentIndex + 1) % slides.length);
    });

    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide((currentIndex - 1 + slides.length) % slides.length);
    });

    // Dots Navigation
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        clearInterval(slideInterval);

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(targetIndex);
    });
});
