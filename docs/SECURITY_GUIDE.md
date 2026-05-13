# 🔒 Security Guide — Pagina Web Institucional

Guia completo de segurança e boas práticas para proteger o projeto contra exposição de credenciais, chaves e dados sensíveis.

---

## 🛡️ O que o `.gitignore` Protege

### Arquivos de Ambiente (`.env*`)
```
.env                              # Variáveis globais (nunca commit)
.env.local                        # Configurações locais de desenvolvimento
.env.development.local            # Específico de desenvolvimento
.env.test.local                   # Específico de testes
.env.production.local             # ⚠️ NUNCA deve existir — use Railway Secrets
```

**✅ Alternativa Segura:** Use `.env.example` com valores de placeholder:
```env
# .env.example (safe to commit)
NEXT_PUBLIC_SITE_URL=https://example.com
DATABASE_URL=postgresql://user:password@localhost/dbname
RAILWAY_TOKEN=your_token_here
API_SECRET=sk_test_51234567890
```

### Certificados & Chaves (SSL/TLS)
```
*.pem                             # Private key format
*.key                             # Generic key file
*.crt                             # Certificate file
*.cert                            # Certificate file
*.pfx                             # Windows certificate
*.p12                             # PKCS#12 certificate
```

### Credenciais & Secrets
```
**/secrets/                       # Pasta de secrets
**/private/                       # Pasta privada
**/*-credentials.json             # Firebase, AWS, Google
**/*-key.json                     # Service account keys
**/.credentials                   # Credenciais locais
**/credentials.json               # OAuth tokens
**/private.key                    # SSH keys
**/public.key                     # SSH keys
```

### AWS & Serviços Cloud
```
.aws/                             # AWS credentials directory
.railway/                         # Railway local config
.railway.json                     # Railway config file
railway-config.json              # Alternative Railway config
```

---

## 📋 Checklist de Segurança

Antes de fazer commit, verifique:

- [ ] **Nenhum `.env.local` ou `.env.production.local` será subido**
- [ ] **Nenhuma chave SSH está sendo commitada** (`*.key`, `*.pem`)
- [ ] **Nenhum token de API está no código-fonte**
- [ ] **Nenhum arquivo de credenciais será subido** (`credentials.json`, `-key.json`)
- [ ] **Nenhuma senha está em comentários ou logs**
- [ ] **Arquivos de certificado local não serão subidos**
- [ ] **`.env.example` foi criado com values de placeholder** ✅

### Validação com Git

```bash
# Verificar o que será subido
git diff --cached

# Verificar arquivos sensíveis que não foram ignorados
git check-ignore -v .env.local
git check-ignore -v credentials.json

# Se acidentalmente adicionou um arquivo sensível:
git rm --cached .env.local
git commit --amend
```

---

## 🔐 Configuração de Variáveis de Ambiente

### Desenvolvimento Local (`.env.local` — gitignored)
```env
# .env.local (NOT COMMITTED)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/pagina_web
RAILWAY_TOKEN=local_token_for_testing
API_KEY_SECRET=sk_test_1234567890abcdef
```

### Production (Railway Secrets — gitignored)
```
# Configure no Railway Dashboard → Settings → Secrets
NEXT_PUBLIC_SITE_URL=https://pagina-web-institucional.railway.app
DATABASE_URL=postgresql://user:secure_password@db.railway.app:5432/prod_db
RAILWAY_TOKEN=sk_prod_1234567890abcdef
API_KEY_SECRET=sk_prod_987654321zyxwvutsrq
```

### Repository (`.env.example` — safe to commit ✅)
```env
# .env.example (SAFE TO COMMIT)
# Copy this file to .env.local and fill with real values

NEXT_PUBLIC_SITE_URL=https://example.com
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
RAILWAY_TOKEN=your_railway_token_here
API_KEY_SECRET=your_api_key_here
```

---

## ⚠️ O Que NÃO Fazer

### ❌ NUNCA faça isso:

```typescript
// ❌ WRONG: Hardcoded credentials
const API_KEY = 'sk_live_1234567890abcdef';
const DATABASE_URL = 'postgresql://admin:password123@db.example.com:5432/prod_db';

// ❌ WRONG: Secrets in comments
// API Token: sk_prod_xyz789
// Admin password: SuperSecurePassword123!

// ❌ WRONG: Storing credentials in config files
export const config = {
  apiKey: 'sk_123456',
  adminPassword: 'password',
  // ...
};
```

### ✅ SEMPRE faça isso:

```typescript
// ✅ CORRECT: Use environment variables
const API_KEY = process.env.API_KEY_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

// ✅ CORRECT: Validate at startup
if (!API_KEY || !DATABASE_URL) {
  throw new Error('Missing required environment variables');
}

// ✅ CORRECT: Use .env.local for development
// File: .env.local (gitignored)
// API_KEY_SECRET=sk_test_xyz789
```

---

## 🔍 Detecção de Secrets Vazados

### Git Hooks (Prevenção Local)

Instale `pre-commit` para verificar antes de fazer commit:

```bash
# Instalar pre-commit
pip install pre-commit

# Configurar
pre-commit install

# Verificar arquivo de config
# Adicione ao .pre-commit-config.yaml:
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

### GitHub Secret Scanning (Detecção Remota)

GitHub detecta automaticamente secrets conhecidos em PRs:
- API Keys (GitHub, AWS, Stripe, etc.)
- Private keys
- Tokens
- Passwords patterns

**Para habilitar:**
1. Vá para **Settings → Security → Secret scanning**
2. Ative **"Secret scanning alerts"**
3. GitHub alertará em PRs que contenham padrões conhecidos

---

## 🚨 Se Você Acidentalmente Fez Push de um Secret

### 1. Identifique o Arquivo
```bash
git log --all --full-history -- path/to/secret/file
```

### 2. Reverta Localmente
```bash
git reset --soft HEAD~1
git reset HEAD path/to/secret/file
git checkout -- path/to/secret/file
```

### 3. Force Push (⚠️ apenas em branches, não em `main`)
```bash
git push origin feature-branch --force
```

### 4. Regenere Credenciais
- Se era uma senha: Altere a senha
- Se era um token: Regenere o token
- Se era API key: Revogue e crie nova

### 5. Adicione ao `.gitignore` & Commit
```bash
echo "sensitive-file" >> .gitignore
git add .gitignore
git commit -m "chore: add sensitive file to gitignore"
git push
```

---

## 🛠️ Ferramentas de Segurança Recomendadas

### 1. **git-secrets** (Detecção Local)
```bash
# Instalar
brew install git-secrets  # macOS
choco install git-secrets  # Windows

# Configurar para este repositório
git secrets --install
git secrets --register-aws

# Test
echo "password123" >> test.txt
git add test.txt  # Detectará o padrão de senha
```

### 2. **TruffleHog** (Histórico completo)
```bash
# Verificar histórico do Git
truffleHog git https://github.com/efcunha/pagina-web-institucional
```

### 3. **ESLint Plugin para Secrets**
```bash
npm install --save-dev eslint-plugin-no-secrets
```

```javascript
// .eslintrc.json
{
  "plugins": ["no-secrets"],
  "rules": {
    "no-secrets/no-secrets": "error"
  }
}
```

---

## 📚 Railway-Specific Security

### Variáveis de Ambiente no Railway

1. **Dashboard:**
   - Vá para seu projeto → Settings → Environment
   - Clique **"New Variable"**
   - Configure para `production` environment

2. **Via CLI:**
   ```bash
   railway variables set API_KEY_SECRET=sk_prod_xyz789
   railway variables set DATABASE_URL=postgresql://...
   ```

3. **Verificar:**
   ```bash
   railway variables list
   ```

### Secrets Não Aparecem nos Logs
```bash
# Railway mascara valores de secrets automaticamente
# Logs mostram: DATABASE_URL=***
# Você NUNCA vê o valor real nos logs públicos
```

---

## ✅ Status de Segurança Atual

Este projeto está protegido por:

| Proteção | Status | Detalhes |
|----------|--------|----------|
| `.env*` files | ✅ | Todos os arquivos `.env*` estão no `.gitignore` |
| SSH Keys | ✅ | `*.key`, `*.pem` estão ignoradas |
| Certificates | ✅ | `*.crt`, `*.cert`, `*.pfx` estão ignoradas |
| Credentials | ✅ | `*-credentials.json`, `credentials.json` estão ignoradas |
| AWS Config | ✅ | `.aws/` está ignorada |
| Railway Config | ✅ | `.railway/`, `.railway.json` estão ignoradas |
| Database Backups | ✅ | `*.db`, `*.sqlite*`, `*.backup` estão ignoradas |
| Git Secrets | ⚠️ | Recomenda-se instalar `git-secrets` para prevenção local |
| GitHub Secret Scanning | ⚠️ | Habilite em Settings → Security → Secret scanning |

---

## 🔗 Referências

- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [OWASP: Secrets Management](https://owasp.org/www-community/Secrets_Leakage)
- [Railway: Environment Variables](https://docs.railway.app/deploy/environment-variables)
- [git-secrets Documentation](https://github.com/awslabs/git-secrets)
- [TruffleHog: Secrets Detection](https://github.com/trufflesecurity/trufflehog)

---

## 🎓 Treinamento da Equipe

Quando new members juntarem ao projeto:

1. **Ler este documento** 📖
2. **Clonar repositório:**
   ```bash
   git clone https://github.com/efcunha/pagina-web-institucional
   cp .env.example .env.local
   # Editar .env.local com valores locais
   ```
3. **NUNCA commitar `.env.local`**
4. **NUNCA fazer hardcode de secrets**
5. **SEMPRE usar `process.env`** para variáveis sensíveis

---

**Última atualização:** 2026-05-13  
**Mantido por:** Machado & Cunha Soft House
