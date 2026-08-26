// ========================================
// Main JavaScript - Advanced Portfolio
// ========================================

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const loader = document.getElementById('loader');
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const scrollProgress = document.getElementById('scrollProgress');
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuToggle = document.getElementById('menuToggle');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTop = document.getElementById('scrollTop');
  const typewriter = document.getElementById('typewriter');
  const particleCanvas = document.getElementById('particleCanvas');
  const yearSpan = document.getElementById('year');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const revealElements = document.querySelectorAll('.reveal');
  const statNumbers = document.querySelectorAll('.stat-number');
  const skillBars = document.querySelectorAll('.skill-progress');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const magneticBtns = document.querySelectorAll('.magnetic');

  // ========================================
  // Utility Functions
  // ========================================
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // ========================================
  // Loading Screen
  // ========================================
  const initLoader = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Initialize animations after loader hides
        initTypewriter();
        initParticles();
      }, 1800);
    });
  };

  // ========================================
  // Custom Cursor
  // ========================================
  const initCursor = () => {
    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .filter-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
      });
    });

    // Hide cursor on mobile
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
    }
  };

  // ========================================
  // Particle Network Background
  // ========================================
  const initParticles = () => {
    if (!particleCanvas) return;

    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 200));

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > particleCanvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > particleCanvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((particleCanvas.width * particleCanvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(particles[i].x - particles[j].x, 2) +
            Math.pow(particles[i].y - particles[j].y, 2)
          );

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    window.addEventListener('resize', debounce(() => {
      resizeCanvas();
      createParticles();
    }, 200));
  };

  // ========================================
  // Typewriter Effect
  // ========================================
  const initTypewriter = () => {
    if (!typewriter) return;

    const words = [
      'Content Moderator',
      'ICT Programmer',
      'Web Developer',
      'Problem Solver',
      'Continuous Learner'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
      }

      setTimeout(type, typeSpeed);
    };

    type();
  };

  // ========================================
  // Scroll Animations
  // ========================================
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars
          if (entry.target.classList.contains('skill-category')) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
              const progress = bar.dataset.progress;
              setTimeout(() => {
                bar.style.width = `${progress}%`;
              }, 200);
            });
          }

          // Animate stats counter
          if (entry.target.classList.contains('stats-grid')) {
            animateStats();
          }
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Also observe skill categories and stats grid
    document.querySelectorAll('.skill-category, .stats-grid').forEach(el => {
      observer.observe(el);
    });
  };

  // ========================================
  // Stats Counter Animation
  // ========================================
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      updateCounter();
    });
  };

  // ========================================
  // Scroll Progress & Header
  // ========================================
  const initScrollEffects = () => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update scroll progress bar
      if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercent}%`;
      }

      // Update header
      if (header) {
        if (scrollTop > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Show/hide scroll to top button
      if (scrollTop > 500) {
        scrollTop?.classList.add('visible');
      } else {
        scrollTop?.classList.remove('visible');
      }

      // Update active nav link
      updateActiveNavLink();
    };

    window.addEventListener('scroll', debounce(updateScroll, 10));
    updateScroll();
  };

  // ========================================
  // Active Nav Link
  // ========================================
  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // ========================================
  // Mobile Menu
  // ========================================
  const initMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  };

  // ========================================
  // Theme Toggle
  // ========================================
  const initThemeToggle = () => {
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  };

  // ========================================
  // Smooth Scroll
  // ========================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header?.offsetHeight || 80;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ========================================
  // Project Filtering
  // ========================================
  const initProjectFilter = () => {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  };

  // ========================================
  // Magnetic Buttons
  // ========================================
  const initMagneticButtons = () => {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };

  // ========================================
  // Scroll to Top
  // ========================================
  const initScrollToTop = () => {
    if (!scrollTop) return;

    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // ========================================
  // 3D Tilt Effect for Project Cards
  // ========================================
  const init3DTilt = () => {
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  };

  // ========================================
  // Update Year
  // ========================================
  const updateYear = () => {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  // ========================================
  // Parallax Effect
  // ========================================
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.hero-avatar, .hero-card');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;

      parallaxElements.forEach(el => {
        const speed = el.dataset.parallaxSpeed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  };

  // ========================================
  // Initialize Everything
  // ========================================
  const init = () => {
    initLoader();
    initCursor();
    initScrollAnimations();
    initScrollEffects();
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
    initProjectFilter();
    initMagneticButtons();
    initScrollToTop();
    init3DTilt();
    initParallax();
    updateYear();

    // Disable cursor on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
    }
  };

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
