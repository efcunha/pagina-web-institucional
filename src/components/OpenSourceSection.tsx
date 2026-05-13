'use client'

import { motion } from 'framer-motion'
import { Section, Button, Badge, Card, Container } from '@/components/ui'
import { FaCode, FaUsers, FaHeartPulse, FaGit } from 'react-icons/fa6'

export function OpenSourceSection() {
  const benefits = [
    {
      icon: <FaCode size={28} />,
      title: 'Código aberto',
      description:
        'MIT License — audite, customize e estenda. Transparência total, sem segredos.',
    },
    {
      icon: <FaUsers size={28} />,
      title: 'Comunidade ativa',
      description:
        'Contribuições bem-vindas. Desenvolva com a comunidade e compartilhe melhorias.',
    },
    {
      icon: <FaHeartPulse size={28} />,
      title: 'Suporte profissional',
      description:
        'Implementação, customização e suporte contínuo. Entre em contato para orçamento.',
    },
    {
      icon: <FaGit size={28} />,
      title: 'Sempre atualizado',
      description:
        'Repositório público com atualizações regulares. Mantenha seu sistema sempre seguro.',
    },
  ]

  return (
    <Section id="open-source" className="bg-accent-subtle">
      <Container>
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="accent">
              <FaGit className="inline mr-2" />
              Open Source MIT License
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
              Código aberto, segurança garantida
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Restaurante Supabase é 100% open source. Audite o código, customize para suas
              necessidades e confie em uma arquitetura de código aberto e confiável.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
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
                <Card variant="outlined" padding="lg" className="h-full">
                  <div className="flex flex-col gap-3 text-foreground-muted mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted text-sm sm:text-base">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-foreground-muted mb-6">
              <a
                href="https://github.com/efcunha/restaurante-supabase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover font-medium inline-flex items-center gap-2"
              >
                <FaGit size={16} />
                Ver repositório no GitHub
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
