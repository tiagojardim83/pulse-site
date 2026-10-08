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
  const length = line.getTotalLength();
  line.style.setProperty('--ecg-length', length);
  let finished = false;
  const timers = [];
  function finishIntro() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    document.documentElement.classList.remove('intro-active');
    document.documentElement.classList.add('intro-ending');
    document.documentElement.style.overflow = '';
    pageSections.forEach(section => section.inert = false);
    intro.addEventListener('transitionend', event => {
      if (event.target === intro) intro.remove();
    }, { once: true });
    timers.push(setTimeout(() => intro.remove(), 1100));
  }
  [950, 1950, 2950].forEach((time, index) => {
    timers.push(setTimeout(() => { count.innerHTML = `0${index + 1} <span>/ 03</span>`; }, time));
  });
  line.addEventListener('animationend', () => {
    timers.push(setTimeout(finishIntro, 280));
  }, { once: true });
  timers.push(setTimeout(finishIntro, 4800));
  intro.querySelector('.intro-skip').addEventListener('click', finishIntro);
  document.querySelector('.skip').addEventListener('click', finishIntro);
}
