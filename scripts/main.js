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
