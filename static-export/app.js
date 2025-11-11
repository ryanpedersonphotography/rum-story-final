/* ============================================
   Rum River Barn - JavaScript Interactions
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Navigation Scroll Effect
  // ============================================
  
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolled down
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll);

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuLinks = mobileMenu.querySelectorAll('.navbar-link');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ============================================
  // Theme Toggle
  // ============================================
  
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle?.querySelector('.sun-icon');
  const moonIcon = themeToggle?.querySelector('.moon-icon');
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle icons
    if (newTheme === 'dark') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    
    // Set initial icon state
    if (currentTheme === 'dark') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    }
  }

  // ============================================
  // Spaces Tabs
  // ============================================
  
  const spaceTabs = document.querySelectorAll('.space-tab');
  const spacePanels = document.querySelectorAll('.space-panel');

  function switchSpace(spaceId) {
    // Update tabs
    spaceTabs.forEach(tab => {
      if (tab.dataset.space === spaceId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panels
    spacePanels.forEach(panel => {
      if (panel.id === `space-${spaceId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  spaceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchSpace(tab.dataset.space);
    });
  });

  // ============================================
  // Smooth Scrolling for Anchor Links
  // ============================================
  
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Form Handling
  // ============================================
  
  const scheduleForm = document.querySelector('.schedule-form');
  
  if (scheduleForm) {
    scheduleForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would normally send the data to a server
      console.log('Form submission:', data);
      
      // Show success message
      alert('Thank you for your interest! We will contact you soon to schedule your visit.');
      
      // Reset form
      this.reset();
    });
  }

  // ============================================
  // Lazy Loading Images (for performance)
  // ============================================
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // Animate on Scroll (basic implementation)
  // ============================================
  
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial animation check
  animateOnScroll();
  
  // Check on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(animateOnScroll);
  });

  // ============================================
  // Gallery Lightbox (basic implementation)
  // ============================================
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const overlay = this.querySelector('.gallery-overlay');
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${img.src}" alt="${img.alt}">
          <div class="lightbox-caption">
            ${overlay.innerHTML}
          </div>
          <button class="lightbox-close">&times;</button>
        </div>
      `;
      
      // Add styles for lightbox
      const style = document.createElement('style');
      style.textContent = `
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s;
        }
        .lightbox-content {
          max-width: 90%;
          max-height: 90%;
          position: relative;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 70vh;
          display: block;
        }
        .lightbox-caption {
          color: white;
          padding: 1rem;
          text-align: center;
        }
        .lightbox-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          width: 40px;
          height: 40px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(lightbox);
      
      // Close lightbox
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
          lightbox.remove();
          style.remove();
        }
      });
    });
  });

  // ============================================
  // Initialize when DOM is ready
  // ============================================
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Rum River Barn website initialized');
    
    // Add any additional initialization code here
  });

})();