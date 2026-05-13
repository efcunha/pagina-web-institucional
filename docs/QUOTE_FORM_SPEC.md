# 📝 Especificação: QuoteForm & Support Plans

Detalhes técnicos para integração do formulário de cotação e planos de suporte.

---

## 🔧 API Endpoint Esperado

### `POST /api/send-quote`

**Responsabilidade:** Receber solicitação de cotação, validar e enviar para equipe

#### Request Body:
```typescript
interface QuoteFormData {
  name: string                                    // Nome do solicitante
  email: string                                   // E-mail
  phone: string                                   // Telefone/WhatsApp
  company: string                                 // Nome da empresa/restaurante
  restaurantes: string                            // Número de restaurantes
  tipoSolicitacao: 'consultoria' | 'implementacao' | 'suporte' | 'customizacao'
  descricao: string                               // Descrição das necessidades
}
```

#### Response:
```typescript
{
  success: true,
  message: "Cotação recebida com sucesso",
  id: "quote_123456789"  // ID para rastreamento
}

// Em caso de erro:
{
  error: "Descrição do erro"
}
```

#### HTTP Status:
- `200 OK` — Enviado com sucesso
- `400 Bad Request` — Dados inválidos
- `500 Internal Server Error` — Erro no servidor

---

## 📧 Ações Esperadas no Backend

### 1. Validação
- [x] Todos os campos obrigatórios preenchidos
- [x] E-mail é válido
- [x] Telefone contém dígitos

### 2. Envio de E-mail
**Para:** `contato@machado-cunha.com` ou configurar via env var

**Assunto:** `Nova solicitação de cotação - {tipo_solicitacao}`

**Template de E-mail (HTML):**
```
Cliente: {name}
E-mail: {email}
Telefone: {phone}

Empresa: {company}
Restaurantes: {restaurantes}
Tipo: {tipoSolicitacao}

Mensagem:
{descricao}

---
ID da Solicitação: {id}
Data/Hora: {timestamp}
```

### 3. Persistência (Opcional)
- Salvar em banco de dados para CRM
- Integrar com Supabase se desejar rastreamento

### 4. Resposta ao Usuário
- E-mail de confirmação ao solicitante
- Indicar prazo de resposta (ex: "24h")

---

## 🎯 Tipos de Solicitação

### 1. **Consultoria**
Busca de informações sobre viabilidade, arquitetura, custo

**Resposta esperada:** 
- Apresentação da plataforma
- Questionário de necessidades
- Proposta de próximas etapas

### 2. **Implementação**
Deploy completo, integração, treinamento

**Resposta esperada:**
- Cronograma
- Equipe responsável
- Custos estimados
- SLA de entrega

### 3. **Suporte Contínuo**
Suporte técnico 24h, customizações, otimizações

**Resposta esperada:**
- Plano de suporte (horas, responsabilidades)
- Custos mensais/anuais
- Disponibilidade
- SLA (Service Level Agreement)

### 4. **Customização**
Features específicas, integrações, mudanças customizadas

**Resposta esperada:**
- Análise de viabilidade
- Escopo do trabalho
- Timeline
- Custos

---

## 🔐 Segurança

### Validação no Frontend:
- [x] Campos obrigatórios
- [x] Formato de e-mail
- [x] Feedback visual de erros

### Validação no Backend:
- [ ] Verificar rate limiting (máx 1 cotação/IP a cada 5 min)
- [ ] Sanitizar input (XSS)
- [ ] CSRF token (se necessário)
- [ ] Validar estrutura de dados

### Dados Sensíveis:
- [x] Não salvar dados de forma plain text
- [x] Usar HTTPS
- [x] Respeitar LGPD (avisar sobre coleta de dados)

---

## 🎨 Estados do Formulário

### 1. **Inicial (Vazio)**
```
[Campos vazios]
Botão: "Solicitar Orçamento" (habilitado)
Mensagens de erro: Nenhuma
```

### 2. **Preenchendo**
```
[Campos sendo preenchidos]
Botão: "Solicitar Orçamento" (habilitado)
Validação em tempo real? Opcional
```

### 3. **Enviando**
```
[Campos desabilitados]
Botão: "Enviando..." (desabilitado)
Spinner: Animação de carregamento
```

### 4. **Sucesso**
```
✅ Ícone de sucesso grande
"Solicitação enviada!"
"Você receberá uma resposta em até 24 horas."
Texto: "Fechar" ou reset automático em 5s
```

### 5. **Erro**
```
❌ Mensagem de erro (vermelho)
"Erro ao enviar solicitação: {mensagem}"
Botão: "Tentar novamente" (reenabilitado)
```

---

## 📱 Responsividade

### Mobile (< 640px):
- Formulário stacked (campos em coluna)
- Botão de submit ocupa 100% da largura
- Labels acima dos campos

### Tablet (640px - 1024px):
- 2 colunas em alguns casos
- Layouts flexíveis

### Desktop (> 1024px):
- Layout otimizado
- Máximo de 2 colunas

---

## 🌍 Integração com Ecossistema

### Supabase (Opcional):
```sql
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(255) NOT NULL,
  restaurantes INTEGER NOT NULL,
  tipo_solicitacao VARCHAR(50) NOT NULL,
  descricao TEXT NOT NULL,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'novo',  -- novo, respondido, arquivado
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy (se necessário)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
```

### Railway:
- Variável de ambiente: `QUOTE_EMAIL_TO=contato@machado-cunha.com`
- Configurar SMTP para envio de e-mails

### GitHub Actions (Notificação Opcional):
- Abrir issue no repositório ao receber cotação?
- Label: `type:quote`, `urgent` se X restaurantes

---

## 📊 Analytics (Opcional)

Rastrear:
- Número de cotações por tipo
- Taxa de conversão (cotação → cliente)
- Tipo mais solicitado
- Tempo médio de resposta

---

## ✅ Checklist de Implementação

Frontend:
- [x] Componente QuoteForm criado
- [x] Validação no cliente
- [x] Estados de loading/sucesso/erro
- [ ] Integração com API

Backend:
- [ ] Criar endpoint `/api/send-quote`
- [ ] Validação no servidor
- [ ] Configurar envio de e-mail
- [ ] Rate limiting
- [ ] Logging/auditoria
- [ ] (Opcional) Persistência em BD

DevOps:
- [ ] Configurar variáveis de ambiente
- [ ] Testar em staging
- [ ] Deploy para produção
- [ ] Monitorar erros

---

## 🔗 Referências

- [Formulários React Best Practices](https://react.dev/reference/react-dom/components#form-components)
- [Validação de E-mail](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address)
- [LGPD - Consentimento](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

---

**Data:** 2026-05-13  
**Status:** 📋 Especificação Completa
