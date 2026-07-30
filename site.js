
const LANG_KEY = 'didar_lang_v1';

function getDefaultLang() {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'ru' || stored === 'kz') return stored;
  return (navigator.language || '').toLowerCase().startsWith('kk') ? 'kz' : 'ru';
}

function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    const active = btn.dataset.langSwitch === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function setupMobileNav() {
  const header = document.querySelector('header.site');
  const burger = document.querySelector('.burger');
  if (!header || !burger) return;

  function closeMenu() {
    header.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('nav.links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(getDefaultLang());
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langSwitch));
  });
  setupMobileNav();
});
