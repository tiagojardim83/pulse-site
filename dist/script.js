const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-nav');
function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menu'); toggle.querySelector('span').textContent = '+'; }
toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; menu.hidden = expanded; toggle.setAttribute('aria-expanded', String(!expanded)); toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu'); toggle.querySelector('span').textContent = expanded ? '+' : '−'; });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !menu.hidden){ closeMenu(); toggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();

const intro = document.querySelector('.intro');
if (document.documentElement.classList.contains('intro-active') && intro) {
  const pageSections = document.querySelectorAll('body > .header, body > main, body > footer');
  pageSections.forEach(section => section.inert = true);
  const line = intro.querySelector('.intro-ecg-line');
  const count = intro.querySelector('.intro-count');
  line.style.setProperty('--ecg-length', line.getTotalLength());

  let finished = false;
  let startY = null;
  let wheelDistance = 0;
  let beatTimers = [];
  function resetBeatCount() {
    beatTimers.forEach(clearTimeout);
    count.innerHTML = '00 <span>/ 03</span>';
    beatTimers = [950, 1950, 2950].map((time, index) =>
      setTimeout(() => { count.innerHTML = `0${index + 1} <span>/ 03</span>`; }, time)
    );
  }
  resetBeatCount();
  line.addEventListener('animationiteration', resetBeatCount);

  function onWheel(event) {
    event.preventDefault();
    if (event.deltaY <= 0) return;
    wheelDistance += event.deltaY;
    if (wheelDistance > 45) finishIntro();
  }
  function onPointerDown(event) {
    if (event.target.closest('button')) return;
    startY = event.clientY;
  }
  function onPointerUp(event) {
    if (startY === null) return;
    const distance = startY - event.clientY;
    startY = null;
    if (distance > 55) finishIntro();
  }
  function onKeyDown(event) {
    if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      finishIntro();
    }
  }
  function finishIntro() {
    if (finished) return;
    finished = true;
    beatTimers.forEach(clearTimeout);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKeyDown);
    intro.removeEventListener('pointerdown', onPointerDown);
    intro.removeEventListener('pointerup', onPointerUp);
    line.removeEventListener('animationiteration', resetBeatCount);
    document.documentElement.classList.remove('intro-active');
    document.documentElement.classList.add('intro-ending');
    pageSections.forEach(section => section.inert = false);
    intro.addEventListener('transitionend', event => {
      if (event.target === intro) intro.remove();
    }, { once: true });
    setTimeout(() => intro.remove(), 1100);
  }
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);
  intro.addEventListener('pointerdown', onPointerDown);
  intro.addEventListener('pointerup', onPointerUp);
  intro.querySelector('.intro-skip').addEventListener('click', finishIntro);
  document.querySelector('.skip').addEventListener('click', finishIntro);
}

const clientCarousel = document.querySelector('#client-carousel');
if (clientCarousel) {
  const cards = [...clientCarousel.querySelectorAll('.project')];
  const previous = document.querySelector('.carousel-prev');
  const next = document.querySelector('.carousel-next');
  const position = document.querySelector('.carousel-position');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function step() {
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
  }
  function updateCarousel() {
    const max = Math.max(0, clientCarousel.scrollWidth - clientCarousel.clientWidth);
    const current = step() ? Math.round(clientCarousel.scrollLeft / step()) : 0;
    position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = clientCarousel.scrollLeft <= 2;
    next.disabled = clientCarousel.scrollLeft >= max - 2;
  }
  function moveCarousel(direction) {
    clientCarousel.scrollBy({ left: direction * step(), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => moveCarousel(-1));
  next.addEventListener('click', () => moveCarousel(1));
  clientCarousel.addEventListener('scroll', updateCarousel, { passive: true });
  clientCarousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
