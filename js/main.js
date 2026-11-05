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


  /* ── Preview watermark ── */
  const wm = document.createElement('div');
  wm.setAttribute('aria-hidden', 'true');
  wm.style.cssText = [
    'position:fixed',
    'top:50%',
    'left:50%',
    'transform:translate(-50%,-50%)',
    'width:100vw',
    'text-align:center',
    'font-family:Oswald,sans-serif',
    'font-size:18vw',
    'font-weight:700',
    'letter-spacing:-.02em',
    'text-transform:uppercase',
    'color:#000',
    'opacity:0.08',
    'pointer-events:none',
    '-webkit-user-select:none',
    'user-select:none',
    'z-index:9999',
    'white-space:nowrap',
  ].join(';');
  wm.textContent = 'Preview';
  document.body.appendChild(wm);

})();
