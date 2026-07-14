import { useEffect, useRef, useState } from 'react'
import IndustrySlideshow from './IndustrySlideshow.jsx'
import TextType from './TextType.jsx'
import './Hero.css'
import './HowItWorks.css'

const SECTION_TITLE =
  'La capacitación tradicional no siempre calza con la realidad del trabajo en terreno'

function ProblemSection() {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsCardVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px',
      },
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="problema" className="scroll-mt-20 p-3 sm:p-5">
      <div
        ref={cardRef}
        className={`how-it-works-card w-full rounded-[2rem] bg-neutral-950 px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28 ${
          isCardVisible ? 'is-visible' : ''
        }`}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div className="max-w-3xl">
            <div className="relative">
              <h2
                aria-hidden="true"
                className="invisible text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                {SECTION_TITLE}
              </h2>
              <TextType
                text={SECTION_TITLE}
                as="h2"
                className="absolute inset-x-0 top-0 w-full text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                typingSpeed={35}
                initialDelay={250}
                loop={false}
                startOnVisible
                cursorCharacter="|"
                onTypingComplete={() => setShowContent(true)}
              />
            </div>

            <p
              aria-hidden={!showContent}
              className={`mt-7 text-lg leading-relaxed text-white/65 sm:text-xl ${
                showContent ? 'subtitle-reveal' : 'invisible opacity-0'
              }`}
            >
              Muchas organizaciones cuentan con buenos contenidos, pero enfrentan dificultades para
              que las personas accedan, completen y apliquen la capacitación. Las plataformas
              extensas, las claves de acceso, la falta de computador y los tiempos operativos pueden
              reducir la participación.
            </p>
          </div>

          <div
            aria-hidden={!showContent}
            className={
              showContent ? 'subtitle-reveal' : 'invisible opacity-0'
            }
          >
            <IndustrySlideshow isActive={showContent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
