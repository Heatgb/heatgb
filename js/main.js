/* ============================================================
   HEAT GB — Main JavaScript
   - Mobile nav toggle
   - Active nav link
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile navigation ── */
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      const open = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close nav when a link is clicked
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index';
  document.querySelectorAll('.nav__list a').forEach(function (link) {
    const linkPath = link.getAttribute('href').replace(/\/$/, '') || '/index';
    if (currentPath.endsWith(linkPath) || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
