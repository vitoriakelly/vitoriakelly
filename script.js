/* ==========================================================================
   VITORIA.DEV — Editorial portfolio
   ========================================================================== */

const GITHUB_USER = 'vitoriakelly';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C#': '#178600',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Swift: '#FA7343',
  Java: '#b07219',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Rust: '#dea584',
  'C++': '#f34b7d',
};

let currentLang = 'pt';
let cachedRepos = null;

/* ------------------------------ i18n ------------------------------------ */

const I18N = {
  pt: {
    'meta.title': 'Vitória Kelly · Dev Full Stack',
    'meta.description':
      'Vitória Kelly — Dev Full Stack com foco em APIs, microsserviços e aplicações web de ponta a ponta.',
    'nav.aria': 'Navegação principal',
    'nav.projects': 'projetos',
    'nav.about': 'sobre',
    'nav.contact': 'contato',
    'nav.open': 'Abrir menu',
    'nav.close': 'Fechar menu',
    'theme.toggle': 'Alternar tema',
    'theme.light': 'Ativar tema claro',
    'theme.dark': 'Ativar tema escuro',
    'lang.switch': 'Switch to English',
    'lang.label': 'EN',
    'hero.kicker': 'Vitória Kelly · Dev Full Stack',
    'hero.title': 'desenvolvimento',
    'hero.description':
      'Desenvolvedora com foco em frontend, experiência em interfaces modernas e aplicações web de ponta a ponta — com React, Vue, Next.js, .NET e Node.',
    'hero.cta': 'conheça meus projetos',
    'about.label': 'sobre',
    'about.title': 'Inovação e tecnologia',
    'about.titleAccent': 'com propósito',
    'about.p1':
      'Estou sempre explorando novas tecnologias, padrões de arquitetura e formas criativas de transformar problemas complexos em soluções elegantes.',
    'about.p2':
      'Atuo no full stack desde APIs em .NET e microsserviços, passando por Node.js e NestJS, até interfaces ricas com React, Vue e Next.js. Escrever código bem feito é o que me move.',
    'about.cv': 'baixar CV',
    'stack.label': 'stack',
    'stack.title': 'Tecnologias do',
    'stack.titleAccent': 'dia a dia',
    'projects.label': 'projetos',
    'projects.title': 'Trabalhos em',
    'projects.titleAccent': 'destaque',
    'projects.subtitle': 'Seleção puxada do meu GitHub em tempo real.',
    'projects.seeMore': 'ver todos os repositórios',
    'projects.fallback': 'Projeto em desenvolvimento',
    'projects.error': 'Não foi possível carregar os repositórios agora.',
    'projects.viewGithub': 'Ver no GitHub',
    'contact.label': 'contato',
    'contact.title': 'Vamos construir algo',
    'contact.titleAccent': 'juntos',
    'contact.titleEnd': '?',
    'contact.subtitle': 'Tem um projeto, ideia ou oportunidade? Me chama.',
    'contact.cv': 'Baixar CV',
    'contact.email': 'E-mail',
    'footer.tagline': 'Inovação · Tecnologia · Código com propósito',
  },
  en: {
    'meta.title': 'Vitória Kelly · Full Stack Dev',
    'meta.description':
      'Vitória Kelly — Full Stack developer focused on APIs, microservices, and end-to-end web applications.',
    'nav.aria': 'Main navigation',
    'nav.projects': 'projects',
    'nav.about': 'about',
    'nav.contact': 'contact',
    'nav.open': 'Open menu',
    'nav.close': 'Close menu',
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Switch to light theme',
    'theme.dark': 'Switch to dark theme',
    'lang.switch': 'Mudar para português',
    'lang.label': 'PT',
    'hero.kicker': 'Vitória Kelly · Full Stack Dev',
    'hero.title': 'development',
    'hero.description':
      'Developer focused on frontend, with experience in modern interfaces and end-to-end web applications — with React, Vue, Next.js, .NET, and Node.',
    'hero.cta': 'see my projects',
    'about.label': 'about',
    'about.title': 'Innovation and technology',
    'about.titleAccent': 'with purpose',
    'about.p1':
      'I am always exploring new technologies, architecture patterns, and creative ways to turn complex problems into elegant solutions.',
    'about.p2':
      'I work across the full stack — from .NET APIs and microservices, through Node.js and NestJS, to rich interfaces with React, Vue, and Next.js. Writing well-crafted code is what drives me.',
    'about.cv': 'download CV',
    'stack.label': 'stack',
    'stack.title': 'Everyday',
    'stack.titleAccent': 'technologies',
    'projects.label': 'projects',
    'projects.title': 'Featured',
    'projects.titleAccent': 'work',
    'projects.subtitle': 'A live selection pulled from my GitHub.',
    'projects.seeMore': 'see all repositories',
    'projects.fallback': 'Project in progress',
    'projects.error': 'Could not load repositories right now.',
    'projects.viewGithub': 'View on GitHub',
    'contact.label': 'contact',
    'contact.title': "Let's build something",
    'contact.titleAccent': 'together',
    'contact.titleEnd': '?',
    'contact.subtitle': 'Got a project, idea, or opportunity? Reach out.',
    'contact.cv': 'Download CV',
    'contact.email': 'Email',
    'footer.tagline': 'Innovation · Technology · Code with purpose',
  },
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.pt[key] ?? key;
}

function formatDate(iso) {
  const locale = currentLang === 'en' ? 'en-US' : 'pt-BR';
  return new Date(iso).toLocaleDateString(locale, { month: 'short', year: 'numeric' });
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function applyTranslations() {
  $$('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (!value) return;

    if (el.tagName === 'TITLE') {
      document.title = value;
    } else if (el.tagName === 'META') {
      el.setAttribute('content', value);
    } else {
      el.textContent = value;
    }
  });

  $$('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    const value = t(key);
    if (value) el.setAttribute('aria-label', value);
  });

  const langBtn = $('#lang-toggle');
  const langLabel = $('#lang-toggle-label');
  if (langBtn) langBtn.setAttribute('aria-label', t('lang.switch'));
  if (langLabel) langLabel.textContent = t('lang.label');

  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? t('theme.light') : t('theme.dark')
    );
  }

  const menuToggle = $('#menu-toggle');
  if (menuToggle) {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-label', open ? t('nav.close') : t('nav.open'));
  }

  if (cachedRepos) renderProjects(cachedRepos);
}

function getPreferredLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch (_) {}

  const browser = (navigator.language || 'pt').toLowerCase();
  return browser.startsWith('en') ? 'en' : 'pt';
}

function applyLang(lang) {
  currentLang = lang === 'en' ? 'en' : 'pt';
  document.documentElement.setAttribute('data-lang', currentLang);
  document.documentElement.lang = currentLang === 'en' ? 'en' : 'pt-BR';

  try {
    localStorage.setItem('lang', currentLang);
  } catch (_) {}

  applyTranslations();
}

function initLanguageToggle() {
  applyLang(getPreferredLang());

  const toggle = $('#lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    applyLang(currentLang === 'pt' ? 'en' : 'pt');
  });
}

/* ---------------------------- GitHub data ------------------------------- */

async function loadGitHubData() {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`
    );
    const repos = await reposRes.json();

    const filtered = Array.isArray(repos)
      ? repos
          .filter((r) => !r.fork && r.description && r.description.trim().length > 0)
          .slice(0, 6)
      : [];

    const finalRepos =
      filtered.length >= 4
        ? filtered
        : Array.isArray(repos)
          ? repos.filter((r) => !r.fork).slice(0, 6)
          : [];

    cachedRepos = finalRepos;
    renderProjects(finalRepos);
  } catch (err) {
    console.error('Falha ao carregar dados do GitHub:', err);
    cachedRepos = null;
    renderProjectsError();
  }
}

function renderProjects(repos) {
  const grid = $('#projects-grid');
  if (!grid) return;

  if (!repos || repos.length === 0) {
    return renderProjectsError();
  }

  grid.innerHTML = repos
    .map(
      (r) => `
      <a href="${r.html_url}" target="_blank" rel="noopener" class="project-card">
        <div class="project-header">
          <div class="project-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-3h14l2 3M3 7h18"/>
            </svg>
            ${escapeHTML(r.name)}
          </div>
          ${r.stargazers_count > 0 ? `<span class="project-stars">★ ${r.stargazers_count}</span>` : ''}
        </div>
        <p class="project-description">
          ${escapeHTML(r.description || t('projects.fallback'))}
        </p>
        <div class="project-footer">
          <span class="project-language">
            <span class="lang-dot" style="background:${LANGUAGE_COLORS[r.language] || 'var(--accent)'}"></span>
            ${escapeHTML(r.language || 'Code')}
          </span>
          <span class="project-date">${formatDate(r.updated_at)}</span>
        </div>
      </a>`
    )
    .join('');
}

function renderProjectsError() {
  const grid = $('#projects-grid');
  if (!grid) return;
  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--text-muted);">
      <p>${escapeHTML(t('projects.error'))}</p>
      <p style="margin-top: 1rem;">
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener" class="btn btn-ghost">
          ${escapeHTML(t('projects.viewGithub'))}
        </a>
      </p>
    </div>`;
}

/* ------------------------- Reveal on scroll ----------------------------- */

function initReveal() {
  const els = $$('.section, .stack-item, .project-card, .hero-content, .hero-visual, .contact-panel');
  els.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));

  const mo = new MutationObserver(() => {
    $$('.project-card').forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        observer.observe(el);
      }
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

/* --------------------------- Theme toggle ------------------------------- */

function getPreferredTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.documentElement.style.colorScheme = next;

  try {
    localStorage.setItem('theme', next);
  } catch (_) {}

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.setAttribute(
      'aria-label',
      next === 'dark' ? t('theme.light') : t('theme.dark')
    );
  }
}

function initThemeToggle() {
  applyTheme(getPreferredTheme());

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      if (localStorage.getItem('theme')) return;
    } catch (_) {}
    applyTheme(e.matches ? 'dark' : 'light');
  });
}

/* --------------------------- Mobile menu -------------------------------- */

function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const nav = $('#primary-nav');
  const overlay = $('#nav-overlay');

  if (!toggle || !nav || !overlay) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? t('nav.close') : t('nav.open'));
    nav.classList.toggle('is-open', open);
    overlay.classList.toggle('is-visible', open);
    overlay.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }

  function close() {
    setOpen(false);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  overlay.addEventListener('click', close);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 968) close();
  });
}

/* ------------------------------- Init ----------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  initLanguageToggle();
  loadGitHubData();
  initReveal();
  initThemeToggle();
  initMobileMenu();
});
