/**
 * ============================================================================
 * MAHMOUD MOHAMMED — PERSONAL PORTFOLIO SCRIPT
 * Stack: Pure Vanilla JavaScript (ES6+)
 * Author: Mahmoud Mohammed
 * Description: Modular, performant, accessible interactions and animations.
 * ============================================================================
 */

(function () {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initActiveNav();
    initScrollReveal();
    initMouseInteraction();
    initTestimonialSlider();
    initContactForm();
    initSmoothScroll();
  });

  /* ==========================================================================
     1. THEME MANAGEMENT (Dark / Light Mode & LocalStorage)
     ========================================================================== */
  function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;

    // Check LocalStorage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme (Default to dark if no saved preference)
    let currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'dark');
    applyTheme(currentTheme);

    // Toggle click handler
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('portfolio-theme', currentTheme);
      });
    }

    // Function to apply theme attribute & ARIA
    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      if (themeToggleBtn) {
        const isDark = theme === 'dark';
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      }
    }

    // Listen for OS system theme changes if user has not manually set a preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & MOBILE NAVIGATION
     ========================================================================== */
  function initNavbar() {
    const header = document.getElementById('site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky / Scrolled Navbar visual change
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Mobile Hamburger Toggle
    if (hamburgerBtn && navMenu) {
      const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !navMenu.classList.contains('is-open');
        navMenu.classList.toggle('is-open', isOpen);
        hamburgerBtn.classList.toggle('is-active', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());

        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = isOpen && window.innerWidth <= 768 ? 'hidden' : '';
      };

      hamburgerBtn.addEventListener('click', () => toggleMenu());

      // Close menu when a navigation link is clicked
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('is-open')) {
            toggleMenu(false);
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (
          navMenu.classList.contains('is-open') &&
          !navMenu.contains(e.target) &&
          !hamburgerBtn.contains(e.target)
        ) {
          toggleMenu(false);
        }
      });

      // Close menu on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });

      // Reset body overflow on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    }
  }

  /* ==========================================================================
     3. ACTIVE NAVIGATION LINK TRACKING (IntersectionObserver)
     ========================================================================== */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }, { passive: true });
      return;
    }

    // Modern IntersectionObserver implementation
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Reveal only once for performance
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================================
     5. MOUSE INTERACTION & BACKGROUND PARALLAX
     ========================================================================== */
  function initMouseInteraction() {
    // Only apply on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const blob1 = document.getElementById('blob1');
    const blob2 = document.getElementById('blob2');
    const blob3 = document.getElementById('blob3');
    const heroCard = document.getElementById('hero-profile-container');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTicking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!isTicking) {
        requestAnimationFrame(updatePositions);
        isTicking = true;
      }
    }, { passive: true });

    function updatePositions() {
      // Smooth interpolation (lerp)
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      // Subtle parallax shifts
      if (blob1) blob1.style.transform = `translate3d(${currentX * -35}px, ${currentY * -35}px, 0)`;
      if (blob2) blob2.style.transform = `translate3d(${currentX * 45}px, ${currentY * 45}px, 0)`;
      if (blob3) blob3.style.transform = `translate3d(${currentX * -25}px, ${currentY * 25}px, 0)`;

      // Subtle 3D tilt on hero profile card
      if (heroCard && window.scrollY < 600) {
        heroCard.style.transform = `perspective(1000px) rotateY(${currentX * 4}deg) rotateX(${currentY * -4}deg)`;
      }

      if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
        requestAnimationFrame(updatePositions);
      } else {
        isTicking = false;
      }
    }
  }

  /* ==========================================================================
     6. TESTIMONIALS SLIDER / CAROUSEL (Vanilla JS)
     ========================================================================== */
  function initTestimonialSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    if (!track) return;

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoSlideTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // Generate dynamic indicator dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('type', 'button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToSlide(index);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slideCount) % slideCount;
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Button event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    // Autoplay logic (every 6 seconds)
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Pause on hover
    const sliderWrapper = track.closest('.testimonials-slider-container');
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
      sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // Pause when tab is not active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    // Touch & Swipe gestures for mobile
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      if (touchStartX - touchEndX > threshold) {
        nextSlide(); // Swiped left -> next
      } else if (touchEndX - touchStartX > threshold) {
        prevSlide(); // Swiped right -> prev
      }
    }

    // Initialize first state and start timer
    updateSlider();
    startAutoSlide();
  }

  /* ==========================================================================
     7. CONTACT FORM VALIDATION & SUBMISSION HANDLER
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const feedbackBox = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('contact-submit-btn');

    // Validation helper
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(String(email).toLowerCase());
    };

    const setGroupState = (input, isValid) => {
      const group = input.closest('.form-group');
      if (group) {
        if (isValid) {
          group.classList.remove('has-error');
        } else {
          group.classList.add('has-error');
        }
      }
      return isValid;
    };

    // Live validation on blur & input
    nameInput.addEventListener('blur', () => setGroupState(nameInput, nameInput.value.trim().length > 0));
    emailInput.addEventListener('blur', () => setGroupState(emailInput, validateEmail(emailInput.value.trim())));
    subjectInput.addEventListener('blur', () => setGroupState(subjectInput, subjectInput.value.trim().length > 0));
    messageInput.addEventListener('blur', () => setGroupState(messageInput, messageInput.value.trim().length >= 10));

    // Form submit listener
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = setGroupState(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = setGroupState(emailInput, validateEmail(emailInput.value.trim()));
      const isSubjectValid = setGroupState(subjectInput, subjectInput.value.trim().length > 0);
      const isMessageValid = setGroupState(messageInput, messageInput.value.trim().length >= 10);

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!isFormValid) {
        feedbackBox.className = 'form-feedback error';
        feedbackBox.innerHTML = `
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          <span>Please fill in all required fields properly before submitting.</span>
        `;
        return;
      }

      /* ======================================================================
         CONNECT YOUR EMAIL SERVICE / BACKEND HERE:
         This is a static frontend project with client-side validation.
         To send real emails from this form, you can easily plug in:
         
         Option A: EmailJS (https://www.emailjs.com/)
           emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
             from_name: nameInput.value,
             from_email: emailInput.value,
             subject: subjectInput.value,
             message: messageInput.value
           }).then(...);
           
         Option B: Formspree (https://formspree.io/)
           fetch("https://formspree.io/f/YOUR_FORM_ID", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ ... })
           }).then(...);
           
         Option C: Your Node.js / Express backend endpoint
           fetch("/api/contact", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ ... })
           }).then(...);
         ====================================================================== */

      // Simulation of successful transmission
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        feedbackBox.className = 'form-feedback success';
        feedbackBox.innerHTML = `
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          <span>Thank you, ${nameInput.value.trim()}! Your message has been received (Demo mode). I will get back to you shortly.</span>
        `;

        // Clear input values
        form.reset();

        // Clear feedback after 7 seconds
        setTimeout(() => {
          feedbackBox.className = 'form-feedback';
          feedbackBox.innerHTML = '';
        }, 7000);
      }, 700);
    });
  }

  /* ==========================================================================
     8. SMOOTH SCROLLING ENHANCEMENT
     ========================================================================== */
  function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navbarHeight = document.getElementById('site-header')?.offsetHeight || 78;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight - 4);

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Set focus for accessibility without visible outline jump
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

})();
