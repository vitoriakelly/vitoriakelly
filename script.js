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
    'nav.resume': 'currículo',
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
      'Desenvolvedora Full Stack com foco em frontend, experiência em interfaces modernas, APIs e aplicações web de ponta a ponta — com React, Vue, Next.js, .NET e Node.',
    'hero.cta': 'conheça meus projetos',
    'about.label': 'sobre',
    'about.title': 'Inovação e tecnologia',
    'about.titleAccent': 'com propósito',
    'about.p1':
      'Estou sempre explorando novas tecnologias, padrões de arquitetura e formas criativas de transformar problemas complexos em soluções elegantes.',
    'about.p2':
      'Atuo no full stack desde APIs em .NET e microsserviços, passando por Node.js e NestJS, até interfaces ricas com React, Vue e Next.js. Escrever código bem feito é o que me move.',
    'about.resumeLink': 'ver currículo',
    'resume.label': 'currículo',
    'resume.title': 'Experiência',
    'resume.titleAccent': 'profissional',
    'resume.subtitle': 'Trajetória em desenvolvimento, integrações e suporte técnico.',
    'resume.download': 'Baixar CV (PDF)',
    'resume.current': 'Atual',
    'resume.more': 'Mais detalhes',
    'resume.less': 'Menos detalhes',
    'resume.responsibilities': 'Responsabilidades',
    'resume.stack': 'Stack',
    'resume.job1.role': 'Analista e Desenvolvedora Full Stack Júnior',
    'resume.job1.period': 'set 2025 – Atual',
    'resume.job1.summary':
      'Desenvolvimento full stack com foco em aplicações web modernas, atuando no frontend e no backend.',
    'resume.job1.r1': 'Desenvolver aplicações web modernas full stack, com atuação em frontend e backend.',
    'resume.job1.r2': 'Aplicar boas práticas de desenvolvimento, Clean Code e melhoria contínua da qualidade do código.',
    'resume.job1.r3': 'Integrar APIs REST e contribuir com arquitetura de software e soluções escaláveis.',
    'resume.job1.r4': 'Atuar em times ágeis com Git, Jira e colaboração próxima com equipe e stakeholders.',
    'resume.job2.role': 'Analista de Suporte N2',
    'resume.job2.period': 'abr 2025 – ago 2025',
    'resume.job2.summary':
      'Atendimento e resolução de incidentes com foco em análise técnica, diagnóstico e solução de problemas.',
    'resume.job2.r1': 'Atender e resolver incidentes e requisições com análise técnica e diagnóstico.',
    'resume.job2.r2': 'Investigar causa raiz, aplicar correções e garantir cumprimento de SLAs.',
    'resume.job2.r3': 'Manter qualidade no atendimento e documentação das soluções aplicadas.',
    'resume.job3.role': 'Analista Desenvolvedora de Software',
    'resume.job3.period': 'jul 2024 – mar 2025',
    'resume.job3.summary':
      'Desenvolvimento full stack de aplicações web escaláveis com React, Material UI e Node.js.',
    'resume.job3.r1': 'Desenvolver aplicações web escaláveis com React, Material UI e Node.js.',
    'resume.job3.r2': 'Trabalhar com arquitetura de microsserviços, PostgreSQL, Docker e mensageria com RabbitMQ.',
    'resume.job3.r3': 'Integrar APIs e serviços externos, incluindo automações e comunicação via WhatsApp (Baileys).',
    'resume.job3.r4': 'Atuar com Scrum, GitFlow, testes e foco em qualidade e melhoria contínua.',
    'resume.job4.role': 'Analista de Integração',
    'resume.job4.period': 'dez 2023 – jun 2024',
    'resume.job4.summary':
      'Integração de sistemas financeiros, garantindo comunicação eficiente entre aplicações e processos.',
    'resume.job4.r1': 'Integrar sistemas, garantindo comunicação eficiente entre aplicações e processos.',
    'resume.job4.r2': 'Monitorar fluxos integrados, assegurando estabilidade e resolução de falhas.',
    'resume.job5.role': 'Analista de Integração',
    'resume.job5.period': 'dez 2023 – jun 2024',
    'resume.job5.summary':
      'Conexão e integração de sistemas, com monitoramento contínuo dos fluxos e resolução de falhas.',
    'resume.job5.r1': 'Conectar e integrar sistemas, assegurando comunicação eficiente entre aplicações.',
    'resume.job5.r2': 'Monitorar fluxos integrados e resolver falhas para manter o funcionamento estável.',
    'resume.freelanceLabel': 'projetos freelance',
    'resume.freelanceTitle': 'Freelance',
    'resume.freelanceSubtitle':
      'Trabalhos pontuais em paralelo à experiência principal — não são trocas de emprego.',
    'resume.freelanceBadge': 'Freelance · Remoto',
    'resume.freelance1.role': 'Desenvolvedora Full Stack',
    'resume.freelance1.period': 'mar 2025 – ago 2025',
    'resume.freelance1.summary':
      'Projeto freelance em Whaticket: correções da API Oficial, ajustes e novas funções no FlowBuilder.',
    'resume.freelance1.r1':
      'Atuar como full stack em demandas do Whaticket, com correções e estabilização da API Oficial.',
    'resume.freelance1.r2':
      'Ajustar o FlowBuilder para funcionar corretamente com a API Oficial do WhatsApp.',
    'resume.freelance1.r3':
      'Adicionar novas funções ao FlowBuilder, ampliando os fluxos e recursos disponíveis no produto.',
    'resume.eduLabel': 'formação',
    'resume.eduTitle': 'Educação',
    'resume.edu1.school': 'Universidade Federal do Ceará (UFC)',
    'resume.edu1.course': 'Sistemas de Informação',
    'resume.edu1.period': '2021 – Atual',
    'resume.edu2.school': 'IFRS',
    'resume.edu2.course': 'Automação de Sistemas',
    'resume.edu3.school': 'EEEP Maria Altair Américo Saboia',
    'resume.edu3.course': 'Redes de Computadores',
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
    'nav.resume': 'resume',
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
      'Full Stack developer focused on frontend, with experience in modern interfaces, APIs, and end-to-end web applications — with React, Vue, Next.js, .NET, and Node.',
    'hero.cta': 'see my projects',
    'about.label': 'about',
    'about.title': 'Innovation and technology',
    'about.titleAccent': 'with purpose',
    'about.p1':
      'I am always exploring new technologies, architecture patterns, and creative ways to turn complex problems into elegant solutions.',
    'about.p2':
      'I work across the full stack — from .NET APIs and microservices, through Node.js and NestJS, to rich interfaces with React, Vue, and Next.js. Writing well-crafted code is what drives me.',
    'about.resumeLink': 'view resume',
    'resume.label': 'resume',
    'resume.title': 'Professional',
    'resume.titleAccent': 'experience',
    'resume.subtitle': 'Path across development, integrations, and technical support.',
    'resume.download': 'Download CV (PDF)',
    'resume.current': 'Current',
    'resume.more': 'More details',
    'resume.less': 'Less details',
    'resume.responsibilities': 'Responsibilities',
    'resume.stack': 'Stack',
    'resume.job1.role': 'Junior Full Stack Software Analyst & Developer',
    'resume.job1.period': 'Sep 2025 – Present',
    'resume.job1.summary':
      'Full stack development focused on modern web applications, working across frontend and backend.',
    'resume.job1.r1': 'Build modern full stack web applications across frontend and backend.',
    'resume.job1.r2': 'Apply clean code practices and continuously improve code quality.',
    'resume.job1.r3': 'Integrate REST APIs and contribute to software architecture and scalable solutions.',
    'resume.job1.r4': 'Work in agile teams with Git, Jira, and close collaboration with stakeholders.',
    'resume.job2.role': 'N2 Support Analyst',
    'resume.job2.period': 'Apr 2025 – Aug 2025',
    'resume.job2.summary':
      'Incident handling and troubleshooting with a focus on technical analysis and problem solving.',
    'resume.job2.r1': 'Handle and resolve incidents and requests with technical analysis and diagnosis.',
    'resume.job2.r2': 'Investigate root causes, apply fixes, and ensure SLA compliance.',
    'resume.job2.r3': 'Keep high-quality support and document applied solutions.',
    'resume.job3.role': 'Software Developer Analyst',
    'resume.job3.period': 'Jul 2024 – Mar 2025',
    'resume.job3.summary':
      'Full stack development of scalable web applications with React, Material UI, and Node.js.',
    'resume.job3.r1': 'Build scalable web apps with React, Material UI, and Node.js.',
    'resume.job3.r2': 'Work with microservices architecture, PostgreSQL, Docker, and RabbitMQ messaging.',
    'resume.job3.r3': 'Integrate APIs and external services, including WhatsApp automation (Baileys).',
    'resume.job3.r4': 'Work with Scrum, GitFlow, testing, and continuous improvement.',
    'resume.job4.role': 'Integration Analyst',
    'resume.job4.period': 'Dec 2023 – Jun 2024',
    'resume.job4.summary':
      'System integration for financial products, ensuring reliable communication across applications.',
    'resume.job4.r1': 'Integrate systems and keep efficient communication between applications and processes.',
    'resume.job4.r2': 'Monitor integrated flows, ensure stability, and resolve failures.',
    'resume.job5.role': 'Integration Analyst',
    'resume.job5.period': 'Dec 2023 – Jun 2024',
    'resume.job5.summary':
      'System connection and integration with continuous monitoring and failure resolution.',
    'resume.job5.r1': 'Connect and integrate systems with efficient application communication.',
    'resume.job5.r2': 'Monitor integrated flows and resolve failures to keep stable operation.',
    'resume.freelanceLabel': 'freelance projects',
    'resume.freelanceTitle': 'Freelance',
    'resume.freelanceSubtitle':
      'Side projects in parallel with the main experience — not job switches.',
    'resume.freelanceBadge': 'Freelance · Remote',
    'resume.freelance1.role': 'Full Stack Developer',
    'resume.freelance1.period': 'Mar 2025 – Aug 2025',
    'resume.freelance1.summary':
      'Freelance project on Whaticket: Official API fixes, FlowBuilder adjustments, and new features.',
    'resume.freelance1.r1':
      'Work as full stack on Whaticket demands, fixing and stabilizing the Official API.',
    'resume.freelance1.r2':
      'Adjust FlowBuilder so it works correctly with the WhatsApp Official API.',
    'resume.freelance1.r3':
      'Add new FlowBuilder features, expanding available flows and product capabilities.',
    'resume.eduLabel': 'education',
    'resume.eduTitle': 'Education',
    'resume.edu1.school': 'Federal University of Ceará (UFC)',
    'resume.edu1.course': 'Information Systems',
    'resume.edu1.period': '2021 – Present',
    'resume.edu2.school': 'IFRS',
    'resume.edu2.course': 'Systems Automation',
    'resume.edu3.school': 'EEEP Maria Altair Américo Saboia',
    'resume.edu3.course': 'Computer Networks',
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
  syncResumeToggleLabels();
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

/* ------------------------- Resume accordion ----------------------------- */

function initResumeToggles() {
  $$('.resume-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (!details || !details.classList.contains('resume-details')) return;

      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      details.hidden = open;
      btn.textContent = open ? t('resume.more') : t('resume.less');
    });
  });
}

function syncResumeToggleLabels() {
  $$('.resume-toggle').forEach((btn) => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.textContent = open ? t('resume.less') : t('resume.more');
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
  initResumeToggles();
});
