import { useState } from 'react'
import DotField from './DotField.jsx'
import TextType from './TextType.jsx'
import './Hero.css'

function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false)

  return (
    <main
      id="inicio"
      className="relative grid min-h-[calc(100svh-4rem)] place-items-center overflow-hidden px-6"
    >
      <div className="absolute inset-0">
        <DotField
          dotRadius={3}
          dotSpacing={40}
          cursorRadius={800}
          bulgeStrength={150}
          gradientFrom="#ff8dc6"
          gradientTo="#ff8dc6"
          glowColor="transparent"
        />
      </div>
      <div className="relative z-10 w-full max-w-[90rem] text-center">
        <TextType
          text={'Aprendizaje breve,\nimpacto real.'}
          as="h1"
          className="text-center text-7xl font-semibold tracking-tight sm:text-8xl lg:text-9xl"
          typingSpeed={50}
          initialDelay={250}
          loop={false}
          startOnVisible
          cursorCharacter="|"
          onTypingComplete={() => setShowSubtitle(true)}
        />
        <p
          aria-hidden={!showSubtitle}
          className={`mx-auto mt-6 max-w-2xl text-lg sm:text-xl ${
            showSubtitle ? 'subtitle-reveal' : 'invisible opacity-0'
          }`}
        >
          Capacitación por WhatsApp para equipos en terreno.
        </p>
      </div>
    </main>
  )
}

export default Hero
