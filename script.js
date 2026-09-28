(function () {
  'use strict';

  /* ---------- Carrossel genérico (sem leituras de layout no scroll) ---------- */
  function initCarousel(cfg) {
    var track = document.getElementById(cfg.track);
    var prev = document.getElementById(cfg.prev);
    var next = document.getElementById(cfg.next);
    var dotsWrap = document.getElementById(cfg.dots);
    if (!track || !prev || !next || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(cfg.slide));
    if (!slides.length) return;

    var slideWidth = 0; // atualizado pelo ResizeObserver
    var current = 0;
    var dots = [];

    // Cria as bolinhas de uma vez só
    var frag = document.createDocumentFragment();
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = cfg.dotClass + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', cfg.label + ' ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      frag.appendChild(dot);
      dots.push(dot);
    });
    dotsWrap.appendChild(frag);

    function setActive(idx) {
      if (idx === current || !dots[idx]) return;
      dots[current].classList.remove('active');
      dots[idx].classList.add('active');
      current = idx;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      var w = slideWidth || track.clientWidth; // fallback, só lido no clique
      track.scrollTo({ left: i * w, behavior: 'smooth' });
    }

    prev.addEventListener('click', function (e) { e.preventDefault(); goTo(current - 1); });
    next.addEventListener('click', function (e) { e.preventDefault(); goTo(current + 1); });

    // Largura do slide: medida sem forçar reflow
    if ('ResizeObserver' in window) {
      new ResizeObserver(function (entries) {
        var entry = entries[0];
        var box = entry.borderBoxSize && entry.borderBoxSize[0];
        slideWidth = box ? box.inlineSize : entry.contentRect.width;
      }).observe(slides[0]);
    }

    // Slide ativo: detectado sem ler geometria no scroll
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(slides.indexOf(entry.target));
        });
      }, { root: track, threshold: 0.6 });
      slides.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- Temporizador da oferta ---------- */
  function initTimer() {
    var minEl = document.getElementById('min');
    var secEl = document.getElementById('sec');
    if (!minEl || !secEl) return;

    var end = Date.now() + 15 * 60 * 1000;
    var id;

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function tick() {
      var left = Math.max(0, Math.round((end - Date.now()) / 1000));
      minEl.textContent = pad(Math.floor(left / 60));
      secEl.textContent = pad(left % 60);
      if (left <= 0) clearInterval(id);
    }

    tick();
    id = setInterval(tick, 1000);
  }

  /* ---------- Inicialização ---------- */
  initCarousel({
    track: 'demoTrack', prev: 'demoPrev', next: 'demoNext', dots: 'demoDots',
    slide: '.demo-card', dotClass: 'demo-dot', label: 'Ir para foto'
  });

  initCarousel({
    track: 'testiTrack', prev: 'testiPrev', next: 'testiNext', dots: 'testiDots',
    slide: '.testi-slide', dotClass: 'testi-dot', label: 'Ir para depoimento'
  });

  initTimer();
})();