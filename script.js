/* =========================================================
   SHERENE PATRICIA T — PORTFOLIO SCRIPT (Bold gradient edition)
   Handles: cursor glow, mobile nav, active pill tracking,
   scroll reveals, contact form (static/demo), footer year.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (canHover && glow) {
    window.addEventListener('pointermove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.classList.add('active');
    });
    window.addEventListener('pointerleave', () => glow.classList.remove('active'));
  }

  /* ---------- Mobile nav burger ---------- */
  const burger = document.getElementById('navBurger');
  const pills = document.getElementById('navPills');

  if (burger) {
    burger.addEventListener('click', () => {
      const open = pills.classList.toggle('mobile-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Active pill link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const pillLinks = document.querySelectorAll('.pill-link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) currentId = section.id;
    });
    pillLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-tag, .section-title, .about-p, .stat-card, .edu-card, .bento-tile, .project-tile, .strength-card, .interest-cloud, .contact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Contact form (front-end only demo) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = '-- please fill in every field.';
        status.style.color = '#F87171';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = '-- that email address looks off.';
        status.style.color = '#F87171';
        return;
      }

      // No backend wired up yet — replace with a real submit handler
      // (e.g. mailto, Formspree, or your own API endpoint).
      status.textContent = `-- thanks, ${name.split(' ')[0]}. message noted (demo form, not yet connected).`;
      status.style.color = 'var(--mint)';
      form.reset();
    });
  }

});