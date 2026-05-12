/* ═══════════════════════════════════════════════════════════
   BUILD BY BYTE — MAIN SCRIPT (SPA Mode)
   - Tab/section switching (show/hide, no scroll between sections)
   - Navbar active state follows current section
   - Mobile hamburger menu
   - Reveal animation on section enter
   - Contact form handling
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── References ─────────────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const navLinksEl  = document.getElementById('navLinks');
  const navItems    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('main > section');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  /* ── Show a section by ID ───────────────────────────────── */
  function showSection(targetId) {
    // Hide all sections
    sections.forEach(sec => sec.classList.remove('active-section'));

    // Show target
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('active-section');
      // Scroll to top of page on section switch
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Re-trigger reveal animations for newly shown section
      triggerReveals(target);
    }

    // Update navbar active state
    navItems.forEach(link => {
      link.classList.toggle('active', link.dataset.target === targetId);
    });

    // Close mobile menu
    closeMobileMenu();
  }

  /* ── Reveal animations ──────────────────────────────────── */
  function triggerReveals(section) {
    const els = section.querySelectorAll('.reveal');
    els.forEach(el => el.classList.remove('visible'));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 40);
        });
      });
    });
  }

  /* ── Nav link clicks ────────────────────────────────────── */
  navItems.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.dataset.target;
      if (target) showSection(target);
    });
  });

  /* ── All data-target buttons (CTA, Request Quote, etc.) ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-target]');
    if (!btn || btn.classList.contains('nav-link')) return;
    e.preventDefault();
    showSection(btn.dataset.target);
  });

  /* ── Navbar scroll effect ───────────────────────────────── */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Hamburger menu ─────────────────────────────────────── */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  function openMobileMenu() {
    navLinksEl.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    if (
      navLinksEl.classList.contains('open') &&
      !navLinksEl.contains(e.target) &&
      !hamburger.contains(e.target)
    ) closeMobileMenu();
  });

  /* ── Contact form ───────────────────────────────────────── */
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Mengirim...';
      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = 'Kirim Pesan';
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      }, 1200);
    });
  }

  /* ── Init: show Home on load ────────────────────────────── */
  showSection('home');

});