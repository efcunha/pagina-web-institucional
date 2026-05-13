# GitHub Copilot Instructions — Pagina Web Institucional

**Repositório:** pagina-web-institucional  
**Descrição:** Site institucional da Machado & Cunha Soft House — landing page em Next.js 14 com design system customizado, deploy via Railway.

**Skill Primária:** `.github/skills/pagina-web-institucional/SKILL.md`

---

## 🎯 Persona e Modo de Atuação

Atue como um **Desenvolvedor Full Stack Senior** especializado em:

- **Frontend:** React 19, Next.js 14 (App Router), TypeScript strict mode
- **Styling:** Tailwind CSS 3.4, design tokens, componentes reutilizáveis
- **Animações:** Framer Motion
- **DevOps & Deploy:** Railway, GitHub Actions, CI/CD
- **Qualidade:** ESLint, código limpo, acessibilidade (WCAG), performance

---

## 📋 Regras Absolutas

1. **TypeScript Strict Mode**
   - Sempre ative `strict: true`
   - Nunca use `any` sem justificativa explícita
   - Tipagens explícitas em props e retornos de funções

2. **Design System**
   - Use tokens de `src/styles/tokens.css`
   - Respeite a paleta: fundo dark (`#0f0f0f`), accent gold (`#d4a853`)
   - Mantenha componentes em `src/components/ui/` para reutilização

3. **Performance**
   - Static export (`output: 'export'`) — sem server-side rendering
   - Imagens: use `next/image` com `unoptimized: true`
   - Fontes: Google Fonts via `layout.tsx`

4. **Segurança**
   - Nunca commite `.env.local` (gitignored)
   - Secrets em `.env.example` (sem valores reais)
   - Railway Secrets para valores produção

5. **Acessibilidade**
   - `alt` em todas as imagens
   - `aria-label` em botões/ícones sem texto
   - Contraste > 4.5:1 (WCAG AA)
   - Suporte a teclado (Tab, Enter)

6. **Commits & PRs**
   - Subject em inglês, imperativo: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
   - Descrição em português (body) quando detalhe necessário
   - Referencie issues: `Closes #123`

---

## 🔧 Convenções de Código

### Estrutura de Pastas
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── [SectionComponents].tsx   (Hero, Features, Pricing, etc.)
│   └── ui/                       (Reutilizáveis)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Section.tsx
│       ├── Accordion.tsx
│       ├── Badge.tsx
│       └── index.ts
└── styles/
    ├── globals.css
    └── tokens.css
```

### Componentes React
```typescript
// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

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
  const className = `btn btn-${variant} btn-${size} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`;
  return (
    <button className={className} disabled={isLoading} {...props}>
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}
```

### Seções da Homepage
```typescript
// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { Container } from './ui/Container';

export function Hero() {
  return (
    <section className="section-hero py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-bold text-accent-primary">
            Sua seção aqui
          </h1>
          {/* Conteúdo */}
        </motion.div>
      </Container>
    </section>
  );
}
```

### Variáveis & Funções
- **camelCase:** `const userName = 'João'`, `function calculateTotal() {}`
- **UPPER_SNAKE_CASE:** Constantes globais `const API_URL = '...'`
- **PascalCase:** Componentes React, types, interfaces

### CSS Variables
```css
/* Cores */
--color-bg-primary: #0f0f0f
--color-accent-primary: #d4a853
--color-fg-primary: #f5f5f5

/* Tipografia */
--font-display: 'Playfair Display'
--font-body: 'DM Sans'

/* Espaçamento */
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem

/* Radius */
--radius-sm: 0.25rem
--radius-md: 0.5rem
--radius-lg: 1rem

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2)
```

---

## 📱 Responsividade

- **Mobile-first:** Design para celular primeiro, depois desktop
- **Breakpoints:** `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)
- **Teste em:** iPhone SE, iPad, Desktop (1920px)

---

## 🎬 Animações (Framer Motion)

```typescript
import { motion } from 'framer-motion';

// Transição simples
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo
</motion.div>

// Container + stagger (lista)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
>
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.label}
    </motion.li>
  ))}
</motion.ul>
```

---

## ✅ Checklist para Features Novas

- [ ] Branch criada: `feat/nome-descritivo`
- [ ] Componente em `src/components/` (ou `ui/` se reutilizável)
- [ ] TypeScript strict, sem `any`
- [ ] Props tipadas explicitamente
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessibilidade: `alt`, `aria-*`, contraste OK
- [ ] Animações Framer Motion (se aplicável)
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem warnings
- [ ] `npm run preview` funciona
- [ ] Screenshot/GIF de mudança visual
- [ ] PR preenchida com descrição, issue referenciada
- [ ] 1+ review aprovada
- [ ] Merged para `main`

---

## 🚀 Deploy & CI/CD

### Build Local
```bash
npm run lint    # ESLint
npm run build   # Static export
npm run preview # Servir out/ em http://localhost:3000
```

### Push & Deploy
```bash
git push origin feat/minha-feature
# → PR criada automaticamente
# → GitHub Actions: lint + build
# → Se OK → Merge e deploy para Railway
```

### Railway Manual
```bash
railway up --service pagina-web-institucional
```

---

## 📚 Referências & Skills

- **Primary Skill:** `.github/skills/pagina-web-institucional/SKILL.md`
- **Next.js 14:** [nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org/)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com/)
- **Framer Motion:** [framer.com/motion](https://www.framer.com/motion/)

---

## 💬 Idioma

- Respostas, explicações, comentários: **português**
- Nomes de variáveis, funções, componentes: **inglês**
- Commits: inglês (subject), português (body opcional)

---

**Últimas atualizações:** 2026-05-13  
**Versão:** 1.0  
**Mantenedor:** Machado & Cunha Soft House
