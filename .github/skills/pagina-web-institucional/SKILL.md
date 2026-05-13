# Skill: Pagina Web Institucional — Next.js Static Site

**Escopo:** Site institucional da Machado & Cunha Soft House — landing page, marketing e presença web para divulgação de serviços de software para restaurantes.

**Stack:** Next.js 14 (App Router + Static Export), TypeScript 5.9, Tailwind CSS 3.4, Framer Motion, Railway deploy.

---

## 🎯 Características do Projeto

### Tecnologias Core
- **Framework:** Next.js 14 com App Router
- **Output:** Static Export (`output: 'export'`)
- **Language:** TypeScript 5.x (strict mode recomendado)
- **Styling:** Tailwind CSS 3.4 + Design Tokens customizados
- **Animations:** Framer Motion 11.x
- **Icons:** React Icons (FontAwesome 6)
- **Tipografia:** Playfair Display (headings) + DM Sans (body) via Google Fonts

### Design System
**Cores** (Figma-style):
- **Background:** `#0f0f0f` (dark theme)
- **Surface:** `#111827` (cards, sections)
- **Accent (Gold):** `#d4a853` (CTAs, highlights)
- **Foreground:** `#f5f5f5` (text principal)

**Tokens:** Todos em `src/styles/tokens.css` — colors, typography, spacing, radius, shadows, transitions, z-index.

### Arquitetura de Componentes
```
src/
├── app/
│   ├── layout.tsx       (Root layout + fonts, global styles)
│   ├── page.tsx         (Homepage — stitch de todas as seções)
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── Hero.tsx               (Seção principal)
│   ├── Features.tsx           (Destaques de features)
│   ├── HowItWorks.tsx         (Passo-a-passo)
│   ├── Pricing.tsx            (Planos)
│   ├── Security.tsx           (Segurança)
│   ├── Testimonials.tsx       (Depoimentos)
│   ├── Contact.tsx            (CTA + contato)
│   ├── AboutProduct.tsx       (Sobre o produto)
│   ├── FAQ.tsx                (Perguntas frequentes)
│   ├── Header.tsx             (Navbar)
│   ├── Footer.tsx             (Rodapé)
│   ├── Button.figma.tsx       (Button component)
│   ├── Card.figma.tsx         (Card component)
│   └── ui/                    (Componentes de UI reutilizáveis)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Section.tsx
│       ├── Accordion.tsx
│       ├── Badge.tsx
│       └── index.ts
└── styles/
    ├── globals.css
    └── tokens.css (Design tokens centralizados)
```

### Deploy & Infraestrutura
- **Plataforma:** Railway
- **Build:** `npm install && npm run build`
- **Start:** `node scripts/start-static-server.mjs` (servidor estático com segurança)
- **Health Check:** `/`
- **Replicas:** 1
- **Restart Policy:** ON_FAILURE

### Scripts Disponíveis
```json
{
  "dev": "next dev",                           // Dev local
  "build": "next build",                       // Build estático
  "start": "next start",                       // Start server
  "lint": "eslint .",                          // Linting
  "preview": "npx serve out -s",              // Preview estático local
  "sync:android-local": "bash scripts/sync-local-android-build.sh"
}
```

---

## 🔧 Convenções e Padrões

### Estrutura de Pastas
- Componentes em `src/components/` (feature-first quando apropriado)
- Componentes de UI reutilizáveis em `src/components/ui/`
- Hooks customizados em `src/utils/` (ex: `useLatestBuildDownloads.ts`)
- Estilos globais em `src/styles/`

### Nomenclatura
- **Arquivos React:** PascalCase (`Hero.tsx`, `Features.tsx`)
- **Variáveis/funções:** camelCase
- **CSS variables:** `--color-*`, `--font-*`, `--spacing-*`, etc.

### Tipagem TypeScript
- **Strict mode:** Ativado no `tsconfig.json`
- **Props:** Sempre tipadas explicitamente
- **Event handlers:** Use `React.MouseEvent`, `React.ChangeEvent`, etc.
- **Evite `any`:** Use `unknown` com type guards quando necessário

### Componentes

#### Padrão de Componente Reutilizável (UI)
```typescript
// src/components/ui/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}
```

#### Padrão de Seção (Homepage)
```typescript
// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { Container } from './ui/Container';

export function Hero() {
  return (
    <section className="section-hero">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Conteúdo */}
        </motion.div>
      </Container>
    </section>
  );
}
```

### Animações (Framer Motion)
- Use `motion` para elementos com animações
- Prefira `animate` + `initial` para transições simples
- Para listas, use `staggerContainer` + `staggerItem`
- Mantenha durations baixas (0.3s—0.8s) para UX responsiva

### Estilos & Design Tokens
- **CSS Variables:** Use tokens de `src/styles/tokens.css`
- **Tailwind:** Estenda `tailwind.config.js` para cores/spacing customizados
- **Responsividade:** Mobile-first com breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- **Dark Theme:** Já é padrão — não adicione light theme sem discussão

### Acessibilidade
- Sempre adicione `alt` em imagens
- Use `aria-label` em elementos interativos sem texto
- Mantenha contraste > 4.5:1 (WCAG AA)
- Teste navegação por teclado (Tab, Enter)

---

## 📋 Fluxo de Trabalho

### 1. Feature Branch
```bash
git checkout -b feat/seção-nova-pricing
git checkout -b fix/ajuste-cores-tokens
git checkout -b docs/atualizar-readme
```

### 2. Desenvolvimento Local
```bash
npm install       # Se houver mudanças em package.json
npm run dev       # Start dev server em http://localhost:3000
npm run lint      # Verificar ESLint antes de commit
```

### 3. Build Local
```bash
npm run build      # Testar build estático
npm run preview    # Servir `out/` localmente
```

### 4. Commit & Push
```bash
git add .
git commit -m "feat: adicionar seção de testimonials com animações"
git push origin feat/seção-nova-pricing
```

### 5. Pull Request
- Preencha o template em `.github/pull_request_template.md`
- Inclua screenshots/GIFs se houver mudanças visuais
- Referencie issues relacionadas (`Closes #123`)

### 6. Review & Merge
- Mínimo 1 review antes de merge
- CI/CD deve passar (lint, build)
- Squash commits se houver cleanup

---

## 🚀 Deploy

### Deploy Manual via CLI
```bash
railway up --service pagina-web-institucional
```

### CI/CD Automático (GitHub Actions)
- **Branch:** Merge em `main` dispara workflow de deploy
- **Artifacts:** Build de produção salvo em `out/`
- **Railway:** Atualizado automaticamente
- **Logs:** Verifique em GitHub Actions → Deployments

---

## 🔒 Segurança & Boas Práticas

### Secrets & Env Vars
- Nunca commite `.env.local` (gitignored)
- Variáveis públicas em `.env.example`
- Secrets confidenciais no Railway / GitHub Secrets

### Performance
- **Images:** Use `next/image` com `priority` seletivo
- **Fonts:** Google Fonts já otimizado via `layout.tsx`
- **Bundles:** Monitore com `next/bundle-analyzer` se necessário
- **Static Export:** Zero JS server-side, tudo pre-rendered

### SEO
- **Meta tags:** Configure em `layout.tsx` (title, description, og:*)
- **Sitemap:** Considere gerar `public/sitemap.xml` se houver > 50 páginas
- **robots.txt:** Configure se necessário

---

## ✅ Definição de Done (DoD) — Feature Completa

- [ ] Código implementado com TypeScript strict
- [ ] Componentes reutilizáveis em `src/components/ui/`
- [ ] Responsivo (testado em mobile, tablet, desktop)
- [ ] Acessibilidade validada (alt, aria-*, contraste)
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem warnings
- [ ] `npm run preview` funciona localmente
- [ ] Screenshot/GIF da feature (se visual)
- [ ] PR com descrição e referência a issues
- [ ] Mínimo 1 review aprovado
- [ ] Railway deploy bem-sucedido

---

## 🛠️ Troubleshooting

### Build falha com "output: export"
- Verifique se não há `getServerSideProps` ou `getStaticProps`
- Não use rota dinâmica com ISR (`revalidate`)
- Use `next/image` com `unoptimized: true` (já configurado)

### Estilos Tailwind não aparecem
- Verifique `tailwind.config.js` — `content` deve incluir `src/**/*.{js,ts,jsx,tsx}`
- Rode `npm run build` para ver erros de compilação
- Limpe `.next/` e reinstale se necessário

### Railway deploy com erro de porta
- Verifique `scripts/start-static-server.mjs` — porta padrão deve ser `process.env.PORT || 3000`
- Railway injeta `PORT` automaticamente

### Animações Framer Motion lentas
- Reduza `duration` (máx. 0.8s para UX)
- Evite `animate` contínuas — use `whileHover` + `whileTap` para interações
- Desabilite animações em modo reduzido: `prefers-reduced-motion`

---

## 📚 Referências

- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Railway Docs](https://docs.railway.app/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última atualização:** 2026-05-13
**Maintainers:** Machado & Cunha Soft House
