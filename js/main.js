/* ==========================================================================
   HEAT GB — interactions (vanilla, ~5KB, deferred)
   - Header state + thermostat scroll progress
   - Thermostat menu (dial) with focus handling
   - Scroll reveals, word-by-word statement, count-ups
   - Coverage radar <-> list highlighting
   - Click-to-load Google Map (keeps page fast)
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Header + thermostat progress ── */
  var header = $('#header');
  var thermo = $('#thermo');
  var thermoTemp = $('#thermoTemp');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    header.classList.toggle('is-scrolled', y > 30);
    if (!body.classList.contains('menu-open')) {
      thermo.style.setProperty('--p', p.toFixed(3));
      thermoTemp.textContent = Math.round(12 + p * 11);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── Menu (thermostat dial) ── */
  var menu = $('#menu');
  var main = $('#main');
  var links = $$('.menu__link', menu);
  var needle = $('#dialNeedle');
  var arc = $('#dialArc');
  var dialTemp = $('#dialTemp');
  var dialName = $('#dialName');
  var ARC = 706.9;
  var current = links[0];

  function setDial(link) {
    var t = (parseFloat(link.dataset.temp) - 10) / 15;
    needle.style.setProperty('--a', (-135 + 270 * t) + 'deg');
    needle.style.transform = 'rotate(' + (-135 + 270 * t) + 'deg)';
    arc.style.strokeDashoffset = (ARC * (1 - t)).toFixed(1);
    dialTemp.textContent = link.dataset.temp;
    dialName.textContent = link.dataset.name;
  }

  function openMenu() {
    body.classList.add('menu-open');
    thermo.setAttribute('aria-expanded', 'true');
    thermo.setAttribute('aria-label', 'Close menu');
    main.setAttribute('inert', '');
    header.setAttribute('inert', '');
    body.style.overflow = 'hidden';
    links.forEach(function (l) { l.classList.toggle('is-current', l === current); });
    setDial(current);
    thermo.style.setProperty('--p', '1');
    setTimeout(function () { current.focus({ preventScroll: true }); }, 350);
  }
  function closeMenu(focusButton) {
    body.classList.remove('menu-open');
    thermo.setAttribute('aria-expanded', 'false');
    thermo.setAttribute('aria-label', 'Open menu');
    main.removeAttribute('inert');
    header.removeAttribute('inert');
    body.style.overflow = '';
    if (focusButton) thermo.focus();
    onScroll();
  }
  thermo.addEventListener('click', function () {
    body.classList.contains('menu-open') ? closeMenu(true) : openMenu();
  });
  links.forEach(function (l) {
    l.addEventListener('mouseenter', function () { setDial(l); });
    l.addEventListener('focus', function () { setDial(l); });
    l.addEventListener('click', function () { closeMenu(false); });
  });
  $$('a', menu).forEach(function (a) {
    if (!a.classList.contains('menu__link')) a.addEventListener('click', function () { closeMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (!body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key === 'Tab') { // keep focus inside menu + button
      var f = [thermo].concat($$('a', menu));
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ── Track the section in view (header links + menu) ── */
  var sectionIds = ['top', 'about', 'services', 'worcester', 'gas-safe', 'coverage', 'contact'];
  var headerLinks = $$('.header__links a');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        current = links.filter(function (l) { return l.getAttribute('href') === '#' + id; })[0] || current;
        headerLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });
  }

  /* ── Reveal on scroll ── */
  var reveals = $$('[data-reveal]');
  if (!reduce && 'IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); revObs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Statement: words light up as you scroll ── */
  var statement = $('[data-split]');
  if (statement && !reduce) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { split(n); }
      });
    })(statement);
    statement.classList.add('is-split');
    var words = $$('.w', statement);
    var wTick = false;
    var lightWords = function () {
      var r = statement.getBoundingClientRect();
      var vh = window.innerHeight;
      var prog = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
      var n = Math.round(prog * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
      wTick = false;
    };
    window.addEventListener('scroll', function () { if (!wTick) { wTick = true; requestAnimationFrame(lightWords); } }, { passive: true });
    lightWords();
  }

  /* ── Stacked cards recede as the next one slides over ── */
  var cards = $$('.stack .card');
  var stackMQ = window.matchMedia('(min-width: 960px) and (min-height: 760px)');
  var sTick = false;
  function stackFx() {
    sTick = false;
    if (!stackMQ.matches || reduce) { cards.forEach(function (c) { c.style.transform = ''; c.style.removeProperty('--dim'); }); return; }
    for (var i = 0; i < cards.length - 1; i++) {
      var a = cards[i].getBoundingClientRect(), b = cards[i + 1].getBoundingClientRect();
      var k = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
      cards[i].style.transform = k ? 'scale(' + (1 - k * .07).toFixed(4) + ')' : '';
      cards[i].style.setProperty('--dim', (k * .55).toFixed(3));
    }
  }
  if (cards.length) {
    window.addEventListener('scroll', function () { if (!sTick) { sTick = true; requestAnimationFrame(stackFx); } }, { passive: true });
    window.addEventListener('resize', stackFx);
  }

  /* ── Count-ups ── */
  function countUp(el, to, dur) {
    var from = to > 1000 ? to - 40 : 0;
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce) {
    var gauge = $('#gaugeNum');
    if (gauge) { gauge.textContent = '0'; setTimeout(function () { countUp(gauge, 12, 2000); }, 300); }
    if ('IntersectionObserver' in window) {
      var cObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          countUp(en.target, parseInt(en.target.dataset.count, 10), 1600);
          cObs.unobserve(en.target);
        });
      }, { threshold: .6 });
      $$('[data-count]').forEach(function (el) { cObs.observe(el); });
    }
  }

  /* ── Coverage: list <-> radar ── */
  var radar = $('.radar');
  if (radar) {
    $$('#areas li').forEach(function (li) {
      var town = $('.town[data-town="' + li.dataset.town + '"]', radar);
      if (!town) return;
      var on = function () { li.classList.add('is-hot'); town.classList.add('is-hot'); };
      var off = function () { li.classList.remove('is-hot'); town.classList.remove('is-hot'); };
      li.addEventListener('mouseenter', on); li.addEventListener('mouseleave', off);
      town.addEventListener('mouseenter', on); town.addEventListener('mouseleave', off);
    });
  }

  /* ── Click-to-load Google Map ── */
  var mapBtn = $('#mapLoad');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://maps.google.com/maps?q=41+Elmroyd+Avenue,+Potters+Bar,+EN6+2EE,+UK&output=embed&z=13';
      f.title = 'Map showing Heat GB, 41 Elmroyd Avenue, Potters Bar';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      $('#mapbox').replaceChildren(f);
    });
  }

  /* ── Footer year ── */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
