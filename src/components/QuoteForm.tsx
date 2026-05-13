'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Section, Button, Badge, Card, Container } from '@/components/ui'
import { FaPaperPlane, FaCheck } from 'react-icons/fa6'

interface QuoteFormData {
  name: string
  email: string
  phone: string
  company: string
  restaurantes: string
  tipoSolicitacao: 'consultoria' | 'implementacao' | 'suporte' | 'customizacao'
  descricao: string
}

const initialForm: QuoteFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  restaurantes: '',
  tipoSolicitacao: 'consultoria',
  descricao: '',
}

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar solicitação.')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm(initialForm)
      }, 5000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro inesperado.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id="cotacao" className="bg-surface/50">
      <Container>
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="accent">Orçamento Personalizado</Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
              Solicite uma cotação
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Preencha o formulário com suas necessidades e entraremos em contato com uma
              proposta customizada para seu restaurante.
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-2xl mx-auto">
            <Card variant="outlined" padding="lg">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-subtle-strong flex items-center justify-center">
                    <FaCheck size={32} className="text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Solicitação enviada!
                  </h3>
                  <p className="text-foreground-muted">
                    Obrigado! Você receberá uma resposta em até 24 horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        Empresa/Restaurante *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Nome do seu restaurante"
                      />
                    </div>
                  </div>

                  {/* Row 3: Number of Restaurants and Request Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        Quantos restaurantes? *
                      </label>
                      <input
                        type="number"
                        name="restaurantes"
                        value={form.restaurantes}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground text-sm font-medium mb-2">
                        Tipo de Solicitação *
                      </label>
                      <select
                        name="tipoSolicitacao"
                        value={form.tipoSolicitacao}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="consultoria">Consultoria</option>
                        <option value="implementacao">Implementação</option>
                        <option value="suporte">Suporte Contínuo</option>
                        <option value="customizacao">Customização</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-foreground text-sm font-medium mb-2">
                      Descreva suas necessidades *
                    </label>
                    <textarea
                      name="descricao"
                      value={form.descricao}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-bg-primary border border-border-default rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Conte-nos sobre seu restaurante, desafios atuais e o que espera da plataforma..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? 'Enviando...' : 'Solicitar Orçamento'}
                    {!submitting && <FaPaperPlane size={14} />}
                  </Button>

                  <p className="text-foreground-muted text-xs text-center">
                    Seus dados serão utilizados apenas para contato sobre sua solicitação.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
