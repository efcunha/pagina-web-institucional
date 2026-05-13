# Config for GitHub Copilot Custom Agents

This repository uses GitHub Copilot for development assistance with the following configurations:

## 📋 Instructions Files

- **Primary:** `copilot-instructions.md` — Main instructions for Copilot Chat
- **Skill-based routing:** `.github/skills/pagina-web-institucional/SKILL.md`

## 🤖 Agents & Modes

- Default Copilot Chat with skill-based context
- GitHub Copilot Extensions for specialized workflows (when installed)

## 📌 Key Practices

1. **Always reference the primary skill** before implementing
2. **Use design tokens** from `src/styles/tokens.css`
3. **TypeScript strict mode** — no implicit `any`
4. **Accessibility first** — WCAG AA compliance
5. **Performance matters** — static export, optimized images
6. **Security-conscious** — no hardcoded secrets

## 🔗 Getting Started

1. Consult [`.github/copilot-instructions.md`](./ copilot-instructions.md)
2. Review [`.github/skills/pagina-web-institucional/SKILL.md`](./skills/pagina-web-institucional/SKILL.md)
3. Start coding with Copilot Chat assistance

## 📚 References

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot Chat](https://github.com/copilot/chat)
- [Project Skill](./skills/pagina-web-institucional/SKILL.md)

---

**Last updated:** 2026-05-13
