# 📋 GitHub Configuration — Pagina Web Institucional

Este diretório contém configurações, skills e workflows para o GitHub Copilot e CI/CD.

## Estrutura

```
.github/
├── copilot-instructions.md          # Instruções principais do Copilot
├── CODEOWNERS                        # Proprietários de código
├── dependabot.yml                    # Configuração de atualizações automáticas
├── pull_request_template.md          # Template de pull request
├── skills/
│   └── pagina-web-institucional/
│       └── SKILL.md                  # Skill específica do projeto
└── workflows/
    ├── lint.yml                      # Workflow de linting
    ├── build.yml                     # Workflow de build
    └── deploy-railway.yml            # Workflow de deploy para Railway
```

## Guia Rápido

### 🤖 GitHub Copilot

Consulte as instruções no início da conversa em [copilot-instructions.md](./copilot-instructions.md).

**Skill Principal:** [.github/skills/pagina-web-institucional/SKILL.md](./skills/pagina-web-institucional/SKILL.md)

Use essa skill como referência para:
- Convenções de código
- Arquitetura de componentes
- Fluxo de desenvolvimento
- Deploy e CI/CD
- Troubleshooting

### 🔄 CI/CD Workflows

#### Linting
- **Arquivo:** `.github/workflows/lint.yml`
- **Trigger:** Push em `main` ou `develop`, Pull Requests
- **Verifica:** ESLint + TypeScript

#### Build
- **Arquivo:** `.github/workflows/build.yml`
- **Trigger:** Push em `main` ou `develop`, Pull Requests
- **Verifica:** Lint → Build → Artefatos

#### Deploy Railway
- **Arquivo:** `.github/workflows/deploy-railway.yml`
- **Trigger:** Push em `main` (manual com `workflow_dispatch`)
- **Ação:** Build → Deploy para Railway

### 📦 Dependabot

Atualiza dependências npm e GitHub Actions automaticamente toda segunda-feira às 9h.

**Configuração:** `.github/dependabot.yml`

### 👥 Code Owners

Especifica quem deve revisar PRs em áreas específicas.

**Arquivo:** `.github/CODEOWNERS`

### 📝 Pull Request Template

Todos os PRs devem preencher o template para garantir qualidade.

**Arquivo:** `.github/pull_request_template.md`

## Fluxo de Desenvolvimento

1. Crie uma branch: `git checkout -b feat/nome-descritivo`
2. Faça suas mudanças
3. Verifique localmente:
   ```bash
   npm run lint
   npm run build
   npm run preview
   ```
4. Faça commit:
   ```bash
   git add .
   git commit -m "feat: adicionar nova seção"
   ```
5. Faça push: `git push origin feat/nome-descritivo`
6. Abra um PR (preencha o template)
7. Aguarde revisão e CI/CD passar
8. Merge para `main`

## CI/CD Status

Todos os workflows são executados automaticamente em PRs e pushes.

Verifique o status em: **GitHub → Actions → [Seu PR/Commit]**

## 📚 Referências

- [Skill do Projeto](./skills/pagina-web-institucional/SKILL.md)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Railway](https://docs.railway.app/)

---

**Última atualização:** 2026-05-13
