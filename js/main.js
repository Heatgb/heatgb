/* ============================================================
   HEAT GB — Main JavaScript
   - Mobile nav toggle
   - Active nav link
   - Formspree AJAX form submission
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

  /* ── Formspree AJAX submission ── */
  function setupFormspree(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const successMsg = form.querySelector('.form-success');
    const errorMsg   = form.querySelector('.form-error');
    const submitBtn  = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg)   errorMsg.style.display   = 'none';

      try {
        const data = new FormData(form);
        const response = await fetch('https://formspree.io/f/xwvndkow', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          if (successMsg) successMsg.style.display = 'block';
          if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  setupFormspree('#contact-form');

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
