/* ==========================================================================
   VITORIA.DEV — Landing Page
   ========================================================================== */

const GITHUB_USER = 'vitoriakelly';

/* ----------------------------- Util ------------------------------------- */

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

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

/* ---------------------------- Typed effect ------------------------------ */

const typedTexts = [
  'Dev Full Stack 👩‍💻',
  'C# • React • Node • Vue',
  'APIs & Microsserviços ⚡',
  'Apaixonada por código 💜',
];

function startTyping() {
  const el = $('#typed');
  if (!el) return;

  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const currentText = typedTexts[textIdx];

    if (!deleting) {
      el.textContent = currentText.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentText.length) {
        deleting = true;
        return setTimeout(tick, 2200);
      }
    } else {
      el.textContent = currentText.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % typedTexts.length;
      }
    }

    setTimeout(tick, deleting ? 35 : 75);
  }

  tick();
}

/* ---------------------------- GitHub data ------------------------------- */

async function loadGitHubData() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    const user = await userRes.json();

    if (user.public_repos !== undefined) {
      animateCount('#stat-repos', user.public_repos);
    }
    if (user.followers !== undefined) {
      animateCount('#stat-followers', user.followers);
    }

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`
    );
    const repos = await reposRes.json();

    const filtered = Array.isArray(repos)
      ? repos
          .filter((r) => !r.fork && r.description && r.description.trim().length > 0)
          .slice(0, 6)
      : [];

    const finalRepos = filtered.length >= 6
      ? filtered
      : (Array.isArray(repos)
          ? repos.filter((r) => !r.fork).slice(0, 6)
          : []);

    renderProjects(finalRepos);
  } catch (err) {
    console.error('Falha ao carregar dados do GitHub:', err);
    renderProjectsError();
  }
}

function animateCount(selector, target) {
  const el = $(selector);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current;
  }, 40);
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l2-3h14l2 3M3 7h18"/>
            </svg>
            ${escapeHTML(r.name)}
          </div>
          ${r.stargazers_count > 0
            ? `<span class="project-stars">★ ${r.stargazers_count}</span>`
            : ''}
        </div>
        <p class="project-description">
          ${escapeHTML(r.description || 'Projeto desenvolvido com carinho ✨')}
        </p>
        <div class="project-footer">
          <span class="project-language">
            <span class="lang-dot" style="background:${LANGUAGE_COLORS[r.language] || '#888'}"></span>
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
      <p>Não foi possível carregar os repositórios agora.</p>
      <p style="margin-top: 1rem;">
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener" class="btn btn-ghost">
          Ver no GitHub
        </a>
      </p>
    </div>`;
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

/* ----------------------- Background canvas ------------------------------ */

function initBackgroundCanvas() {
  const canvas = $('#bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((width * height) / 20000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.5,
      hue: Math.random() * 60 + 270,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const lightness = isLight ? 42 : 70;
    const alpha = isLight ? 0.45 : 0.7;

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, ${lightness}%, ${alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `hsla(${p.hue}, 70%, ${lightness}%, ${0.14 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ------------------------- Reveal on scroll ----------------------------- */

function initReveal() {
  const els = $$('.section, .about-card, .project-card, .stack-item');
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
    { threshold: 0.12 }
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
      next === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
    );
  }

  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
}

function initThemeToggle() {
  applyTheme(getPreferredTheme());

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
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
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
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
  $('#year').textContent = new Date().getFullYear();

  startTyping();
  loadGitHubData();
  initBackgroundCanvas();
  initReveal();
  initThemeToggle();
  initMobileMenu();
});
