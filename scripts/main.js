// scripts/main.js

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle'); // Hamburger button
  const navMenu = document.getElementById('nav-menu'); // Navigation menu

  // Add a click event listener to the hamburger button
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu

    // Update aria-expanded attribute for accessibility
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Back-to-Top Button Functionality
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) { // Show after 300px
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Dark Mode Toggle Functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (darkModeToggle) {
    // Check for saved user preference, if any, on load of the website
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      // Save user preference in localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Scroll-triggered animations using Intersection Observer

  // Select all sections you want to animate
  const sections = document.querySelectorAll('section');

  // Create an Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Adjust this value as needed
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Remove observer if you only want the animation once
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Register Service Worker in main.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
