# ⚡ vitoria.dev — Landing Page

Landing page pessoal da **Vitória Kelly**, Dev Full Stack apaixonada por código e inovação.

> Inovação · Tecnologia

## ✨ Destaques

- **Design moderno** com tema cyberpunk (dark + roxo/rosa/ciano)
- **Animações suaves** — partículas no background, efeito de digitação, glow no avatar, reveal on scroll
- **Integração com GitHub API** — projetos, contagem de repositórios e seguidores carregados em tempo real
- **100% responsivo** — bonito no celular, tablet e desktop
- **Acessível e semântico** — HTML5 semântico, contraste adequado, navegação por teclado

## 📁 Estrutura

```
vitoria/
├── index.html      # Estrutura da página
├── styles.css      # Estilos (tema dark + glassmorphism + gradientes)
├── script.js       # Animações e GitHub API
└── README.md       # Este arquivo
```

## 🚀 Como rodar

A página é estática, sem build. Você pode abrir o arquivo `index.html` direto no navegador, ou usar um servidor local para evitar problemas de CORS:

```bash
# opção 1 — Python
python3 -m http.server 8000

# opção 2 — Node
npx serve .

# opção 3 — VS Code
# Use a extensão "Live Server" e clique em "Go Live"
```

Depois acesse `http://localhost:8000`.

## 🌐 Como hospedar de graça

### GitHub Pages (recomendado)

1. Crie um repositório no seu GitHub chamado `vitoriakelly.github.io`
2. Faça push desses arquivos para a branch `main`
3. Vá em **Settings → Pages** e escolha a branch `main` como source
4. Pronto! Sua página estará no ar em `https://vitoriakelly.github.io`

```bash
git init
git add .
git commit -m "feat: landing page pessoal"
git branch -M main
git remote add origin https://github.com/vitoriakelly/vitoriakelly.github.io.git
git push -u origin main
```

### Outras opções

- **Vercel** — `npx vercel` e segue o passo a passo
- **Netlify** — arrasta a pasta no [app.netlify.com/drop](https://app.netlify.com/drop)

## 🛠️ Customização

### Trocar usuário do GitHub

Edite o topo de `script.js`:

```js
const GITHUB_USER = 'vitoriakelly'; // troque aqui
```

### Trocar cores

Edite as variáveis CSS no topo de `styles.css`:

```css
:root {
  --primary: #b14bff;
  --primary-2: #ff5cb4;
  --accent: #00e7ff;
  /* ... */
}
```

### Trocar textos do efeito de digitação

Edite o array `typedTexts` em `script.js`:

```js
const typedTexts = [
  'Dev Full Stack 👩‍💻',
  'C# • React • Node • Vue',
  // adicione mais
];
```

## 🧰 Stack utilizada

- HTML5 semântico
- CSS3 moderno (custom properties, grid, flexbox, backdrop-filter)
- JavaScript vanilla (sem frameworks!)
- Canvas 2D para o efeito de partículas
- [GitHub REST API](https://docs.github.com/en/rest)
- Fontes: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## 📄 Licença

Feito com 💜 e muito café. Use, fork e personalize à vontade.
