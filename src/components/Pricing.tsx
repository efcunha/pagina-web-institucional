'use client'

import { motion } from 'framer-motion'
import { Section, Button, Card, Badge } from '@/components/ui'
import { FaCheck, FaArrowRight } from 'react-icons/fa6'

const included = [
  'Código aberto e gratuito',
  'Implantação guiada sob demanda',
  'Customizações conforme o projeto',
  'Suporte técnico contratado separadamente',
]

export function Pricing() {
  return (
    <Section id="plano" className="bg-surface/50">
      <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="accent">Open Source</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            Sem mensalidade de licença
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            O software pode ser usado livremente. Serviços de implantação, personalização
            e suporte são combinados à parte, conforme necessidade.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <Card
            variant="outlined"
            padding="lg"
            className="text-center relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent-subtle opacity-50 pointer-events-none" />

            <div className="relative">
              {/* Included items */}
              <ul className="space-y-3 mb-8 text-left">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent-subtle-strong flex items-center justify-center">
                      <FaCheck size={10} className="text-accent" />
                    </span>
                    <span className="text-foreground text-base">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="primary" size="lg" fullWidth as="a" href="#contato">
                Falar com o time
                <FaArrowRight size={16} />
              </Button>
            </div>
          </Card>

          {/* Trust lines */}
          <div className="text-center mt-6">
            <p className="text-foreground-muted text-sm italic">
              Sem cobrança mensal de licença. Implantação e suporte são negociados conforme o escopo.
            </p>
          </div>
          <div className="text-center mt-3">
            <p className="text-foreground-secondary text-sm">
              Código aberto, com apoio profissional para cada etapa do projeto.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
