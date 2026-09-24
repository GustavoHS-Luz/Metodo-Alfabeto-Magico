// Funcionalidade Completa do Carrossel de Demonstração (Setas + Bolinhas)
document.addEventListener("DOMContentLoaded", function() {
  var track = document.getElementById('demoTrack');
  var prev = document.getElementById('demoPrev');
  var next = document.getElementById('demoNext');
  var dotsWrap = document.getElementById('demoDots');
  
  if(!track || !prev || !next || !dotsWrap) return;

  // Pega todos os cards de fotos
  var slides = Array.prototype.slice.call(track.querySelectorAll('.demo-card'));
  
  // 1. Cria as bolinhas dinamicamente
  slides.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className = 'demo-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ir para foto ' + (i + 1));
    
    // 2. Quando clica na bolinha, rola até o card correspondente
    dot.addEventListener('click', function() {
      slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  
  var dots = Array.prototype.slice.call(dotsWrap.children);

  // 3. Atualiza a bolinha ativa sempre que o carrossel rolar
  var ticking = false;
  track.addEventListener('scroll', function() {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var cardWidth = track.querySelector('.demo-card').offsetWidth;
      // Calcula qual imagem está no centro baseado na rolagem
      var idx = Math.round(track.scrollLeft / cardWidth);
      
      // Garante que o índice não quebre
      if(idx >= dots.length) idx = dots.length - 1;
      
      dots.forEach(function(d, i) { 
        d.classList.toggle('active', i === idx); 
      });
      ticking = false;
    });
  });

  // 4. Botão Voltar (Seta Esquerda)
  prev.addEventListener('click', function(e) {
    e.preventDefault();
    var cardWidth = track.querySelector('.demo-card').offsetWidth; 
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  // 5. Botão Avançar (Seta Direita)
  next.addEventListener('click', function(e) {
    e.preventDefault();
    var cardWidth = track.querySelector('.demo-card').offsetWidth; 
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
});

// Carrossel do Temporizador da Oferta
(function(){
  var duration = 15 * 60;
  var minEl = document.getElementById('min');
  var secEl = document.getElementById('sec');
  
  function tick(){
    if(duration <= 0){ 
      minEl.textContent = "00"; 
      secEl.textContent = "00"; 
      return; 
    }
    var m = Math.floor(duration/60);
    var s = duration%60;
    
    minEl.textContent = (m < 10 ? "0" : "") + m;
    secEl.textContent = (s < 10 ? "0" : "") + s;
    duration--;
  }
  
  tick();
  setInterval(tick, 1000);
})();

// Funcionalidade das Setas do Carrossel de Demonstração (1 por vez)
(function(){
  var track = document.getElementById('demoTrack');
  var prev = document.getElementById('demoPrev');
  var next = document.getElementById('demoNext');
  
  if(!track || !prev || !next) return;

  // Botão Voltar (Seta Esquerda)
  prev.addEventListener('click', function(){
    track.scrollBy({ 
      left: -track.clientWidth, // Volta exatamente 1 card
      behavior: 'smooth' 
    });
  });

  // Botão Avançar (Seta Direita)
  next.addEventListener('click', function(){
    track.scrollBy({ 
      left: track.clientWidth, // Avança exatamente 1 card
      behavior: 'smooth' 
    });
  });
})();
  
  // Carrossel de depoimentos (prints do WhatsApp)
  (function(){
    var track = document.getElementById('testiTrack');
    var prev = document.getElementById('testiPrev');
    var next = document.getElementById('testiNext');
    var dotsWrap = document.getElementById('testiDots');
    if(!track) return;

    var slides = Array.prototype.slice.call(track.children);

    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
      dot.addEventListener('click', function(){
        slides[i].scrollIntoView({behavior:'smooth', inline:'start', block:'nearest'});
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function slideWidth(){
      return slides[0] ? slides[0].getBoundingClientRect().width + 20 : 260;
    }
    prev.addEventListener('click', function(){
      track.scrollBy({left: -slideWidth(), behavior:'smooth'});
    });
    next.addEventListener('click', function(){
      track.scrollBy({left: slideWidth(), behavior:'smooth'});
    });

    var ticking = false;
    track.addEventListener('scroll', function(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var idx = Math.round(track.scrollLeft / slideWidth());
        dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
        ticking = false;
      });
    });
  })();