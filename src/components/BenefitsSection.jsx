import { useEffect, useRef, useState } from 'react'
import TextType from './TextType.jsx'
import './BenefitsSection.css'

const benefits = [
  {
    title: 'Acceso inmediato',
    description: 'La capacitación llega al teléfono del participante.',
    span: 'lg:col-span-2',
    surface: 'bg-[#70ff47]',
  },
  {
    title: 'Menos fricción',
    description: 'No requiere aprender una nueva plataforma.',
    span: 'lg:col-span-1',
    surface: 'bg-[#f78db3]',
  },
  {
    title: 'Aprendizaje breve',
    description: 'Contenidos divididos en cápsulas simples y enfocadas.',
    span: 'lg:col-span-1',
    surface: 'bg-[#e7ff50]',
  },
  {
    title: 'Evaluaciones automáticas',
    description: 'Preguntas de alternativas con retroalimentación inmediata.',
    span: 'lg:col-span-1',
    surface: 'bg-[#e89bf4]',
  },
  {
    title: 'Seguimiento de avance',
    description: 'Registro de participación, progreso y finalización.',
    span: 'lg:col-span-2',
    surface: 'bg-[#fc8799]',
  },
  {
    title: 'Aplicable a terreno',
    description: 'Pensado para trabajadores operativos, contratistas y equipos por turno.',
    span: 'lg:col-span-1',
    surface: 'bg-[#ff8dc6]',
  },
  {
    title: 'Contenido multimedia',
    description: 'Texto, imágenes, videos y preguntas en una misma ruta.',
    span: 'lg:col-span-2',
    surface: 'bg-[#fb4b4d]',
  },
  {
    title: 'Adaptable',
    description:
      'Se adapta a cualquier rubro, equipo o necesidad, desde inducciones y procedimientos hasta servicio, ventas y desarrollo de habilidades.',
    span: 'lg:col-span-2',
    surface: 'bg-[#fac90e]',
  },
]

function BenefitCard({ benefit, index, isVisible }) {
  const width = benefit.span === 'lg:col-span-2' ? 'w-[min(34rem,82vw)]' : 'w-[min(20rem,82vw)]'

  return (
    <div
      className={`benefit-card h-56 flex-none ${width} ${isVisible ? 'is-visible' : ''}`}
      style={{ '--benefit-delay': `${index * 100}ms` }}
    >
      <div className="benefit-card-surface relative h-full">
        <article
          className={`card image-full relative z-10 h-full overflow-hidden rounded-[1.5rem] border border-neutral-900/10 shadow-sm ${benefit.surface}`}
        >
          <figure aria-hidden="true" className={benefit.surface}>
            <div className="h-full w-full" />
          </figure>

          <div className="card-body relative z-10 justify-end p-6 text-neutral-950 sm:p-7">
            <h3 className="card-title text-4xl font-semibold leading-[0.92] tracking-[-0.045em] sm:text-5xl">
              {benefit.title}
            </h3>
            <p className="mt-3 max-w-xl text-lg font-medium leading-snug text-neutral-950/75">
              {benefit.description}
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

function BenefitRow({ benefits: rowBenefits, rowIndex, isVisible }) {
  const rowRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row || !isVisible) return undefined

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    let animationFrame
    let resumeTimer
    let isPaused = false
    let initialized = false
    let previousTime = performance.now()

    const pause = () => {
      isPaused = true
      window.clearTimeout(resumeTimer)
    }

    const resume = () => {
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => {
        isPaused = false
      }, 1400)
    }

    const animate = currentTime => {
      const firstSet = row.querySelector('.benefit-set')
      const setWidth = firstSet?.offsetWidth || 0

      if (mobileQuery.matches && setWidth > 0) {
        if (!initialized) {
          if (rowIndex % 2 === 1) row.scrollLeft = setWidth
          initialized = true
        }

        if (!isPaused) {
          const elapsed = Math.min(currentTime - previousTime, 32)
          const direction = rowIndex % 2 === 1 ? -1 : 1
          row.scrollLeft += direction * elapsed * 0.022

          if (row.scrollLeft >= setWidth) row.scrollLeft -= setWidth
          if (row.scrollLeft <= 0 && direction < 0) row.scrollLeft += setWidth
        }
      } else {
        initialized = false
      }

      previousTime = currentTime
      animationFrame = window.requestAnimationFrame(animate)
    }

    row.addEventListener('pointerdown', pause)
    row.addEventListener('pointerup', resume)
    row.addEventListener('pointercancel', resume)
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(resumeTimer)
      row.removeEventListener('pointerdown', pause)
      row.removeEventListener('pointerup', resume)
      row.removeEventListener('pointercancel', resume)
    }
  }, [isVisible, rowIndex])

  return (
    <div ref={rowRef} className="benefit-row py-4">
      <div
        className={`benefit-track ${rowIndex % 2 === 1 ? 'benefit-track-reverse' : ''} ${
          isVisible ? 'is-scrolling' : ''
        }`}
      >
        {[0, 1].map(copyIndex => (
          <div
            key={copyIndex}
            className={`benefit-set flex shrink-0 gap-4 pe-4 ${
              copyIndex === 1 ? 'benefit-set-copy' : ''
            }`}
            aria-hidden={copyIndex === 1 ? 'true' : undefined}
          >
            {rowBenefits.map((benefit, index) => (
              <BenefitCard
                key={`${copyIndex}-${benefit.title}`}
                benefit={benefit}
                index={rowIndex * 4 + index}
                isVisible={isVisible}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function BenefitsSection() {
  const [showBenefits, setShowBenefits] = useState(false)

  return (
    <section id="beneficios" className="w-full scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative mb-8 sm:mb-12">
            <h2
              aria-hidden="true"
              className="invisible text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Beneficios
            </h2>
            <TextType
              text="Beneficios"
              as="h2"
              className="absolute inset-x-0 top-0 w-full text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              typingSpeed={35}
              initialDelay={250}
              loop={false}
              startOnVisible
              cursorCharacter="|"
              onTypingComplete={() => setShowBenefits(true)}
            />
          </div>
        </div>

        <div className="w-full space-y-1">
          {[benefits.slice(0, 4), benefits.slice(4)].map((rowBenefits, rowIndex) => (
            <BenefitRow
              key={rowIndex}
              benefits={rowBenefits}
              rowIndex={rowIndex}
              isVisible={showBenefits}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
