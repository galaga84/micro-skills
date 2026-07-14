import { useEffect, useRef, useState } from 'react'
import TextType from './TextType.jsx'
import './Hero.css'
import './HowItWorks.css'

const SECTION_TITLE = 'Formación que acompaña al equipo donde realmente trabaja.'

const conversation = [
  {
    type: 'received',
    label: 'Bienvenida',
    content: '¡Hola, Camila! Hoy veremos cómo aplicar un nuevo procedimiento paso a paso.',
    time: '09:00',
  },
  {
    type: 'received',
    label: 'Cápsula',
    content: 'Cápsula 1 · Los 3 pasos clave',
    time: '09:01',
  },
  {
    type: 'received',
    label: 'Video',
    content: 'Video · 1:24 min',
    time: '09:01',
    video: true,
  },
  {
    type: 'received',
    label: 'Pregunta',
    content: '¿Qué debes hacer antes de comenzar el procedimiento?',
    time: '09:03',
    options: [
      { key: 'A', text: 'Comenzar de inmediato.' },
      { key: 'B', text: 'Revisar las instrucciones y confirmar los pasos.' },
      { key: 'C', text: 'Esperar sin revisar la información.' },
    ],
  },
  {
    type: 'sent',
    label: 'Tu respuesta',
    content: 'B. Revisar las instrucciones y confirmar los pasos.',
    time: '09:04',
  },
  {
    type: 'received',
    label: 'Respuesta correcta',
    content: '¡Correcto! Ya puedes continuar con la siguiente cápsula.',
    time: '09:04',
    correct: true,
  },
  {
    type: 'received',
    label: 'Curso completado',
    content: '¡Felicitaciones, Camila! Completaste el curso y aprobaste la evaluación.',
    time: '09:05',
    correct: true,
  },
  {
    type: 'received',
    label: 'Tu certificado',
    content: 'Tu certificado ya está disponible:',
    time: '09:05',
    certificate: true,
  },
]

function PlayIcon() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/90 shadow-sm">
      <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-current" aria-hidden="true">
        <path d="M8 5.5v13l10-6.5z" />
      </svg>
    </span>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" aria-hidden="true">
      <path d="m5 12 4 4L19 6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" aria-hidden="true">
      <path
        d="M7 3h7l4 4v14H7zM14 3v5h4M9.5 13h6M9.5 16h4"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneMockup({ isActive }) {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const messageListRef = useRef(null)

  useEffect(() => {
    if (!isActive) {
      setVisibleMessages(0)
      return undefined
    }

    const messageDelays = [900, 2600, 4400, 6500, 9000, 11200, 13400, 15400]
    const timers = messageDelays.map((delay, index) =>
      window.setTimeout(() => setVisibleMessages(index + 1), delay),
    )

    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [isActive])

  useEffect(() => {
    const messageList = messageListRef.current
    if (!messageList) return undefined

    if (visibleMessages === 0) {
      messageList.scrollTop = 0
      return undefined
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [visibleMessages])

  const responseIndex = conversation.findIndex(message => message.type === 'sent')
  const isTypingResponse = visibleMessages === responseIndex

  return (
    <div className="relative mx-auto w-full max-w-[350px]">
      <div className="absolute -inset-8 -z-10 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="mockup-phone shadow-2xl">
        <div className="mockup-phone-camera" />
        <div className="mockup-phone-display">
          <div className="relative flex h-full flex-col bg-[#efeae2]">

          <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-9 text-white">
            <div className="grid size-10 place-items-center rounded-full bg-white/20 text-sm font-semibold">
              MS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Micro Skills</p>
              <p className="text-xs text-white/75">
                {visibleMessages < conversation.length ? 'escribiendo…' : 'capacitación activa'}
              </p>
            </div>
            <span className="size-1 rounded-full bg-white/80" />
            <span className="size-1 rounded-full bg-white/80" />
            <span className="size-1 rounded-full bg-white/80" />
          </div>

          <div ref={messageListRef} className="phone-chat-scroll flex-1 space-y-2.5 overflow-y-auto px-3 py-4">
            {conversation.slice(0, visibleMessages).map(message => (
              <div
                key={message.label}
                className={`chat-message is-visible flex ${
                  message.type === 'sent' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2 shadow-sm ${
                    message.type === 'sent'
                      ? 'rounded-br-sm bg-[#d9fdd3]'
                      : 'rounded-tl-sm bg-white'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    {message.correct && <CheckIcon />}
                    {message.label}
                  </div>
                  <div className={message.video ? 'flex items-center gap-3 rounded-lg bg-neutral-900/5 p-2' : ''}>
                    {message.video && (
                      <span className="chat-video-play">
                        <PlayIcon />
                      </span>
                    )}
                    <p className="text-[13px] leading-snug text-neutral-800">{message.content}</p>
                  </div>
                  {message.options && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white">
                      {message.options.map((option, optionIndex) => (
                        <div
                          key={option.key}
                          className={`flex items-start gap-2 px-2.5 py-2 text-[11px] leading-snug text-neutral-700 ${
                            optionIndex > 0 ? 'border-t border-neutral-200' : ''
                          }`}
                        >
                          <span className="font-semibold text-[#00a884]">{option.key}</span>
                          <span>{option.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {message.certificate && (
                    <div className="mt-2 flex items-center gap-2.5 rounded-lg bg-neutral-100 p-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f78db3] text-neutral-950">
                        <CertificateIcon />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-semibold text-neutral-800">
                          Certificado Micro Skills
                        </p>
                        <p className="text-[9px] text-neutral-500">PDF · 248 KB</p>
                      </div>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-neutral-300 text-sm text-neutral-600">
                        ↓
                      </span>
                    </div>
                  )}
                  <p className="mt-1 text-right text-[9px] leading-none text-neutral-500">
                    {message.time} {message.type === 'sent' && '✓✓'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-[#f7f7f7] px-3 py-3">
            <div className="flex h-9 flex-1 items-center rounded-full bg-white px-4">
              <span
                aria-hidden="true"
                className={`chat-typing ${isTypingResponse ? 'is-visible' : ''}`}
              >
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className="size-9 rounded-full bg-[#00a884]" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HowItWorks() {
  const [showDescription, setShowDescription] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(false)
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
    <section id="como-funciona" className="scroll-mt-20 p-3 sm:p-5">
      <div
        ref={cardRef}
        className={`how-it-works-card w-full rounded-[2rem] border border-neutral-200 bg-neutral-50 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 ${
          isCardVisible ? 'is-visible' : ''
        }`}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div className="max-w-2xl">
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
                onTypingComplete={() => setShowDescription(true)}
              />
            </div>
            <p
              aria-hidden={!showDescription}
              className={`mt-7 text-lg leading-relaxed text-neutral-600 sm:text-xl ${
                showDescription ? 'subtitle-reveal' : 'invisible opacity-0'
              }`}
            >
              Capacitación breve por WhatsApp para empresas que necesitan formar a sus equipos de
              manera simple, directa y medible, especialmente cuando las personas trabajan en
              terreno o no tienen acceso cotidiano a un computador.
            </p>
          </div>

          <PhoneMockup isActive={showDescription} />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
