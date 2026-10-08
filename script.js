const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-nav');
function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menu'); toggle.querySelector('span').textContent = '+'; }
toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; menu.hidden = expanded; toggle.setAttribute('aria-expanded', String(!expanded)); toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu'); toggle.querySelector('span').textContent = expanded ? '+' : '−'; });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !menu.hidden){ closeMenu(); toggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
