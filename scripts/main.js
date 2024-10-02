// JavaScript to control the behavior of the mobile navigation menu
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

    // Clone slides to create an infinite loop effect
    const clones = [];
    slides.forEach((slide) => {
        const cloneStart = slide.cloneNode(true);
        cloneStart.classList.add('clone');
        track.appendChild(cloneStart);
        clones.push(cloneStart);

        const cloneEnd = slide.cloneNode(true);
        cloneEnd.classList.add('clone');
        track.insertBefore(cloneEnd, slides[0]);
        clones.push(cloneEnd);
    });

    const allSlides = Array.from(track.children);

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    allSlides.forEach(setSlidePosition);

    // Move the track to show the first original slide
    const startPosition = slideWidth * slides.length;
    track.style.transform = 'translateX(-' + startPosition + 'px)';
    currentIndex = slides.length;

    // Update dots to match current slide
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        currentDot.setAttribute('aria-selected', 'false');
        targetDot.classList.add('current-slide');
        targetDot.setAttribute('aria-selected', 'true');
    };

    const moveToSlide = (index) => {
        if (isMoving) return;
        isMoving = true;
        track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
        currentIndex = index;

        // Update dots
        const slidesLength = slides.length;
        const activeIndex = (currentIndex - slidesLength) % slidesLength;
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetDot = dots[(activeIndex + slidesLength) % slidesLength];
        updateDots(currentDot, targetDot);
    };

    const handleTransitionEnd = () => {
        isMoving = false;
        const slidesLength = slides.length;
        if (currentIndex >= allSlides.length - slidesLength) {
            currentIndex = slidesLength;
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        }
        if (currentIndex <= slidesLength - 1) {
            currentIndex = allSlides.length - (slidesLength * 2);
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        }
    };

    // Automatic Slide Transition
    const autoSlide = () => {
        moveToSlide(currentIndex + 1);
    };

    let slideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 3000);
    });

    // Reset transition and position on transition end
    track.addEventListener('transitionend', handleTransitionEnd);

    // Button Event Listeners
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide(currentIndex - 1);
    });

    // Dots Navigation
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        clearInterval(slideInterval);

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(slides.length + targetIndex);
    });

    // Loading Indicator
    window.addEventListener('load', () => {
        const loader = document.querySelector('.carousel-loader');
        loader.style.display = 'none';
    });
});
