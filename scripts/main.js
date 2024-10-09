document.addEventListener('DOMContentLoaded', () => {
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

    // Carousel Functionality (Runway Carousel)
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 1;
    let isMoving = false;

    // Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    allSlides.forEach(setSlidePosition);

    // Set initial position to the first actual slide
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';

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
        dots[(currentIndex - 1 + dots.length) % dots.length].classList.add('current-slide');
        dots[(currentIndex - 1 + dots.length) % dots.length].setAttribute('aria-selected', 'true');
    };

    const handleTransitionEnd = () => {
        isMoving = false;
        if (currentIndex === allSlides.length - 1) {
            track.style.transition = 'none';
            currentIndex = 1;
            track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        } else if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = slides.length;
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
        slideInterval = setInterval(autoSlide, 5000);
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
        moveToSlide(targetIndex + 1);
    });

    // Adjust positioning when resizing the window
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        allSlides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + newSlideWidth * currentIndex + 'px)';
    });

    // Project Gallery Carousel Functionality for Each Project Section
    const initializeProjectCarousel = (projectId) => {
        const projectSection = document.getElementById(projectId);
        const images = Array.from(projectSection.querySelectorAll('.project-image'));
        let currentIndex = 0;

        // Function to show the next image
        const showNextImage = () => {
            // Hide current image
            images[currentIndex].classList.remove('active');

            // Update index
            currentIndex = (currentIndex + 1) % images.length;

            // Show next image
            images[currentIndex].classList.add('active');
        };

        // Set interval for automatic transition
        setInterval(showNextImage, 3000); // Change image every 3 seconds
    };

    // Initialize carousels for each project section
    initializeProjectCarousel('bleach-in-bloom');
    initializeProjectCarousel('adbreak');
});