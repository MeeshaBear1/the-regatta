/* THE REGATTA — motion + commerce. Zero dependencies. */
(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header state */
  var hdr = document.querySelector('.hdr');
  function onScrollHdr() { hdr && hdr.classList.toggle('scrolled', scrollY > 40); }
  addEventListener('scroll', onScrollHdr, { passive: true }); onScrollHdr();

  /* mobile disclosure menu */
  var mbtn = document.querySelector('.menu-btn');
  if (mbtn) mbtn.addEventListener('click', function () {
    var open = hdr.classList.toggle('menu-open');
    mbtn.setAttribute('aria-expanded', open);
  });

  /* scroll progress --sp (drives #1 parallax, #6 ken burns, #8 signal hoist) */
  var flags = [].slice.call(document.querySelectorAll('.hoist svg'));
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      var p = max > 0 ? Math.min(1, scrollY / max) : 0;
      if (!reduced) document.documentElement.style.setProperty('--sp', p.toFixed(4));
      flags.forEach(function (f, i) { f.classList.toggle('up', p >= (i + 0.5) / flags.length); });
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* reveals (#2), stagger (#5), line wipe (#12) */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add(e.target.classList.contains('rule') ? 'wiped' : 'in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal,.stagger,.rule').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal,.stagger').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('.rule').forEach(function (el) { el.classList.add('wiped'); });
  }

  /* gallery filters */
  var grid = document.getElementById('gallery-grid');
  if (grid) {
    var sel = {
      collection: document.getElementById('f-collection'),
      era: document.getElementById('f-era'),
      medium: document.getElementById('f-medium')
    };
    var q = document.getElementById('f-q'), count = document.getElementById('f-count');
    var cards = [].slice.call(grid.children);
    function apply() {
      var n = 0;
      cards.forEach(function (c) {
        var ok = (!sel.collection.value || c.dataset.collection === sel.collection.value) &&
                 (!sel.era.value || c.dataset.era === sel.era.value) &&
                 (!sel.medium.value || c.dataset.medium === sel.medium.value) &&
                 (!q.value || (c.dataset.search || '').indexOf(q.value.toLowerCase()) !== -1);
        c.style.display = ok ? '' : 'none'; if (ok) n++;
      });
      count.textContent = n + ' pieces';
    }
    Object.keys(sel).forEach(function (k) { sel[k].addEventListener('change', apply); });
    q.addEventListener('input', apply);
    var pre = new URLSearchParams(location.search);
    ['collection', 'era', 'medium'].forEach(function (k) {
      if (pre.get(k)) { sel[k].value = pre.get(k); }
    });
    apply();
  }

  /* deep zoom */
  var art = document.querySelector('.pdp-art');
  if (art) {
    var zoomer = document.querySelector('.zoomer'), zimg = zoomer.querySelector('img');
    var s = 1, tx = 0, ty = 0, dragging = false, lx = 0, ly = 0;
    function render() { zimg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')'; }
    function open() {
      zoomer.classList.add('open'); document.body.style.overflow = 'hidden';
      s = Math.min(innerWidth / zimg.naturalWidth, innerHeight / zimg.naturalHeight) || 1;
      tx = (innerWidth - zimg.naturalWidth * s) / 2 - innerWidth / 2;
      ty = (innerHeight - zimg.naturalHeight * s) / 2 - innerHeight / 2;
      tx += innerWidth / 2; ty += innerHeight / 2;
      zimg.style.top = '0'; zimg.style.left = '0'; render();
    }
    function close() { zoomer.classList.remove('open'); document.body.style.overflow = ''; }
    art.addEventListener('click', open);
    art.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    zoomer.querySelector('.close').addEventListener('click', function (e) { e.stopPropagation(); close(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    zoomer.addEventListener('wheel', function (e) {
      e.preventDefault();
      var f = e.deltaY < 0 ? 1.15 : 1 / 1.15, ns = Math.max(0.1, Math.min(8, s * f));
      tx = e.clientX - (e.clientX - tx) * (ns / s); ty = e.clientY - (e.clientY - ty) * (ns / s);
      s = ns; render();
    }, { passive: false });
    zoomer.addEventListener('pointerdown', function (e) { dragging = true; lx = e.clientX; ly = e.clientY; zoomer.setPointerCapture(e.pointerId); });
    zoomer.addEventListener('pointermove', function (e) { if (!dragging) return; tx += e.clientX - lx; ty += e.clientY - ly; lx = e.clientX; ly = e.clientY; render(); });
    zoomer.addEventListener('pointerup', function () { dragging = false; });
  }

  /* folio (cart) — localStorage stub; acquisition is by enquiry */
  function folio() { try { return JSON.parse(localStorage.getItem('regatta-folio') || '[]'); } catch (e) { return []; } }
  function saveFolio(f) { localStorage.setItem('regatta-folio', JSON.stringify(f)); badge(); }
  function badge() {
    var b = document.getElementById('folio-count');
    if (b) b.textContent = folio().length ? '(' + folio().length + ')' : '';
  }
  badge();
  function toast(msg) {
    var t = document.querySelector('.toast'); if (!t) return;
    t.textContent = msg; t.classList.add('on');
    setTimeout(function () { t.classList.remove('on'); }, 2200);
  }
  document.querySelectorAll('[data-add-folio]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tierEl = document.querySelector('.tier[aria-pressed="true"]');
      var f = folio();
      f.push({ slug: btn.dataset.addFolio, title: btn.dataset.title, tier: tierEl ? tierEl.dataset.tier : 'Cutter', price: tierEl ? tierEl.dataset.price : '' });
      saveFolio(f); toast('Entered in the folio');
    });
  });
  document.querySelectorAll('.tier').forEach(function (t) {
    function pick() {
      document.querySelectorAll('.tier').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      t.setAttribute('aria-pressed', 'true');
    }
    t.addEventListener('click', pick);
    t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });
  var flist = document.getElementById('folio-list');
  if (flist) {
    function renderFolio() {
      var f = folio();
      if (!f.length) { flist.innerHTML = '<p>The folio is empty. The gallery is not: <a href="../gallery/">choose a piece</a> and enter it here.</p>'; return; }
      flist.innerHTML = f.map(function (it, i) {
        return '<div class="tier"><span>' + it.title + ' — ' + it.tier + '</span><span class="price">' + it.price +
          ' <button class="btn" style="padding:.3rem .7rem" data-rm="' + i + '">Remove</button></span></div>';
      }).join('');
      flist.querySelectorAll('[data-rm]').forEach(function (b) {
        b.addEventListener('click', function () { var f2 = folio(); f2.splice(+b.dataset.rm, 1); saveFolio(f2); renderFolio(); });
      });
      var enq = document.getElementById('enquire');
      if (enq) enq.href = 'mailto:acquisitions@theregatta.gallery?subject=' +
        encodeURIComponent('Acquisition enquiry — The Regatta') + '&body=' +
        encodeURIComponent(f.map(function (it) { return it.title + ' — ' + it.tier + ' — ' + it.price; }).join('\n'));
    }
    renderFolio();
  }

  /* burgee lab */
  var bform = document.getElementById('burgee-form');
  if (bform) {
    var DENY = ['new york yacht club', 'nyyc', 'royal yacht squadron', 'rys', 'royal ocean racing', 'rorc',
      'america’s cup', "america's cup", 'americas cup', 'st francis yacht club', 'stfyc', 'chicago yacht club',
      'royal thames', 'seawanhaka', 'larchmont yacht', 'eastern yacht club', 'san diego yacht club',
      'royal perth', 'royal new zealand yacht squadron', 'royal ulster', 'royal cork', 'annapolis yacht club'];
    var name = document.getElementById('b-name'), col1 = document.getElementById('b-col1'),
      col2 = document.getElementById('b-col2'), shape = document.getElementById('b-shape'),
      div = document.getElementById('b-div'), err = document.getElementById('b-lint'),
      stage = document.getElementById('burgee-svg');
    function lint(v) {
      v = v.toLowerCase();
      return DENY.some(function (d) { return v.indexOf(d) !== -1; });
    }
    function draw() {
      var bad = lint(name.value || '');
      err.classList.toggle('on', bad);
      var c1 = col1.value, c2 = col2.value, w = 420, h = 260;
      var path = shape.value === 'pennant' ? 'M10,10 L410,130 L10,250 Z'
        : shape.value === 'swallowtail' ? 'M10,10 H410 L330,130 L410,250 H10 Z'
        : 'M10,10 H410 V250 H10 Z';
      var dv = '';
      if (div.value === 'per-fess') dv = '<path d="M10,130 H410" stroke="' + c2 + '" stroke-width="120" clip-path="url(#cp)"/>';
      if (div.value === 'per-pale') dv = '<path d="M210,10 V250" stroke="' + c2 + '" stroke-width="200" clip-path="url(#cp)"/>';
      if (div.value === 'cross') dv = '<g stroke="' + c2 + '" stroke-width="52" clip-path="url(#cp)"><path d="M10,130 H410"/><path d="M160,10 V250"/></g>';
      if (div.value === 'saltire') dv = '<g stroke="' + c2 + '" stroke-width="46" clip-path="url(#cp)"><path d="M10,10 L410,250"/><path d="M410,10 L10,250"/></g>';
      if (div.value === 'bordure') dv = '<path d="' + path + '" fill="none" stroke="' + c2 + '" stroke-width="34" clip-path="url(#cp)"/>';
      var label = bad ? '' : (name.value || 'YOUR SIGNAL').toUpperCase();
      stage.innerHTML =
        '<svg viewBox="0 0 ' + w + ' ' + (h + 70) + '" role="img" aria-label="Burgee preview" style="width:100%;max-width:460px">' +
        '<defs><clipPath id="cp"><path d="' + path + '"/></clipPath></defs>' +
        '<path d="' + path + '" fill="' + c1 + '"/>' + dv +
        '<path d="' + path + '" fill="none" stroke="#14232E" stroke-width="2"/>' +
        '<line x1="10" y1="10" x2="10" y2="250" stroke="#14232E" stroke-width="6"/>' +
        '<text x="210" y="' + (h + 45) + '" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="15" letter-spacing="4" fill="#14232E">' +
        label.replace(/&/g, '&amp;').replace(/</g, '&lt;') + ' · FIRST HOISTED 2026</text></svg>';
      var dl = document.getElementById('b-download');
      if (dl) {
        if (bad) { dl.removeAttribute('href'); }
        else { dl.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(stage.innerHTML); dl.download = 'burgee-preview.svg'; }
      }
    }
    bform.addEventListener('input', draw); draw();
  }
})();
