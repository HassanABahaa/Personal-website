/* ══════════════════════════════════════════
   Hassan Ahmed Bahaa — Portfolio Scripts
   js/main.js
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════
  // THEME TOGGLE
  // ══════════════════
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const html        = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    themeToggle.title = theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode';
  }


  // ══════════════════
  // NAVBAR SCROLL
  // ══════════════════
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    // Back to top visibility
    btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });


  // ══════════════════
  // ACTIVE NAV LINK (Intersection Observer)
  // ══════════════════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link-custom[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));


  // ══════════════════
  // MOBILE MENU
  // ══════════════════
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const mobileMenu    = document.getElementById('mobileMenu');

  hamburgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburgerIcon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerIcon.className = 'bi bi-list';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburgerIcon.className = 'bi bi-list';
    }
  });


  // ══════════════════
  // SCROLL REVEAL
  // ══════════════════
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Stagger sibling cards inside grid rows
  document.querySelectorAll('.row.g-4, .row.g-3').forEach(row => {
    row.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });


  // ══════════════════
  // BACK TO TOP
  // ══════════════════
  const btt = document.getElementById('btt');

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ══════════════════
  // TYPED HERO SUBTITLE
  // ══════════════════
  const roles = [
    'Backend Developer',
    'Node.js Engineer',
    'API Architect',
    'TypeScript Dev',
  ];
  const typedEl = document.getElementById('typedRole');
  if (typedEl) {
    let roleIdx  = 0;
    let charIdx  = 0;
    let deleting = false;

    function typeStep() {
      const current = roles[roleIdx];

      if (!deleting) {
        charIdx++;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(typeStep, 1800);
          return;
        }
        setTimeout(typeStep, 80);
      } else {
        charIdx--;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx  = (roleIdx + 1) % roles.length;
          setTimeout(typeStep, 400);
          return;
        }
        setTimeout(typeStep, 45);
      }
    }

    // Start after hero animation settles
    setTimeout(typeStep, 900);
  }


  // ══════════════════
  // SMOOTH ANCHOR OFFSET (for fixed navbar)
  // ══════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
