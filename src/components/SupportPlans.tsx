'use client'

import { motion } from 'framer-motion'
import { Section, Button, Card, Badge, Container } from '@/components/ui'
import { FaCheck, FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa6'

const supportPlans = [
  {
    name: 'Consulta Inicial',
    description: 'Entenda se o Restaurante Supabase é ideal para seu negócio',
    features: [
      'Análise da sua operação',
      'Apresentação da plataforma',
      'Esclarecimento de dúvidas',
      'Próximos passos',
    ],
    price: 'Gratuito',
    cta: 'Agendar Consulta',
    highlighted: false,
  },
  {
    name: 'Implementação',
    description: 'Deployment, integração e configuração do seu sistema',
    features: [
      'Deploy da plataforma',
      'Integração com seus sistemas',
      'Configuração inicial',
      'Treinamento da equipe',
      'Suporte na primeira semana',
    ],
    price: 'Sob Orçamento',
    cta: 'Solicitar Orçamento',
    highlighted: true,
  },
  {
    name: 'Suporte Contínuo',
    description: 'Acompanhamento técnico, customizações e evolução',
    features: [
      'Suporte técnico 24h',
      'Customizações sob demanda',
      'Atualizações e patches',
      'Consultoria estratégica',
      'Otimizações de performance',
    ],
    price: 'Sob Orçamento',
    cta: 'Conversar com Time',
    highlighted: false,
  },
]

export function SupportPlans() {
  return (
    <Section id="suporte" className="bg-surface/50">
      <Container>
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="accent">Implementação & Suporte</Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
              Conosco do início ao crescimento
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
              O código é aberto e gratuito. Oferecemos serviços de implementação, customização
              e suporte contínuo para garantir o sucesso do seu projeto.
            </p>
          </div>

          {/* Support Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1, duration: 0.5 },
                  }),
                }}
              >
                <Card
                  variant={plan.highlighted ? 'elevated' : 'outlined'}
                  padding="lg"
                  className={`h-full flex flex-col relative ${
                    plan.highlighted ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="accent">Mais Popular</Badge>
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-foreground-muted text-sm mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-accent">
                      {plan.price}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle-strong flex items-center justify-center">
                          <FaCheck size={10} className="text-accent" />
                        </span>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => {
                      const contactSection = document.getElementById('cotacao')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {plan.cta}
                    <FaArrowRight size={14} />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-accent-subtle rounded-lg p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Não encontrou o que procura?
            </h3>
            <p className="text-foreground-muted mb-6">
              Possuímos soluções customizadas para cada necessidade. Converse com nosso time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contato@machado-cunha.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-medium hover:bg-accent-hover transition-colors"
              >
                <FaEnvelope size={16} />
                contato@machado-cunha.com
              </a>
              <a
                href="https://wa.me/55..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent-subtle transition-colors"
              >
                <FaPhone size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
