import { useEffect, useRef, useState } from 'react'
import TextType from './TextType.jsx'
import './ContactSection.css'
import './HowItWorks.css'

const SECTION_TITLE = '¿Listo para capacitar a tu equipo de una forma más simple?'
const MESSAGE_MAX_LENGTH = 500
const WEB3FORMS_ACCESS_KEY = '7f9b6cca-5085-49dc-a66d-b8e612dce68c'

const highlights = [
  'Sin nuevas aplicaciones ni claves de acceso',
  'Capacitación breve directamente por WhatsApp',
  'Seguimiento de participación y avance',
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" aria-hidden="true">
      <path d="m5 12 4 4L19 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ContactSection() {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [messageLength, setMessageLength] = useState(0)
  const [submitStatus, setSubmitStatus] = useState('idle')
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

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'Nueva solicitud de demo desde MicroSkills')
    formData.append('from_name', 'Sitio web MicroSkills')
    setSubmitStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'No fue posible enviar el mensaje.')
      }

      form.reset()
      setMessageLength(0)
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  const submitMessage = {
    idle: '',
    submitting: 'Enviando mensaje…',
    success: '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.',
    error: 'No pudimos enviar el mensaje. Inténtalo nuevamente.',
  }[submitStatus]

  return (
    <section id="contacto" className="scroll-mt-20 p-3 pb-5 sm:p-5">
      <div
        ref={cardRef}
        className={`how-it-works-card w-full overflow-hidden rounded-[2rem] bg-[#09111f] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16 lg:py-24 ${
          isCardVisible ? 'is-visible' : ''
        }`}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="relative">
              <h2
                aria-hidden="true"
                className="invisible text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
              >
                {SECTION_TITLE}
              </h2>
              <TextType
                text={SECTION_TITLE}
                as="h2"
                className="absolute inset-x-0 top-0 w-full text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
                typingSpeed={35}
                initialDelay={250}
                loop={false}
                startOnVisible
                cursorCharacter="|"
                onTypingComplete={() => setShowContent(true)}
              />
            </div>

            <div
              aria-hidden={!showContent}
              className={showContent ? 'subtitle-reveal' : 'invisible opacity-0'}
            >
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
                Conversemos sobre cómo llevar capacitación simple, directa y medible a tus equipos
                en terreno.
              </p>

              <ul className="mt-9 space-y-4">
                {highlights.map(highlight => (
                  <li key={highlight} className="flex items-start gap-3 font-medium text-white/90">
                    <span className="mt-0.5 text-[#f78db3]">
                      <CheckIcon />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            aria-hidden={!showContent}
            className={`w-full ${
              showContent ? 'subtitle-reveal' : 'invisible opacity-0'
            }`}
          >
            <div className="contact-form-aura aura aura-lg w-full text-[#f78db3]">
              <div className="card rounded-[1.75rem] bg-white p-6 text-neutral-900 shadow-2xl sm:p-9">
                <h3 className="text-xl font-semibold tracking-tight">Hablemos</h3>

            <form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
              aria-busy={submitStatus === 'submitting'}
            >
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Nombre"
                  className="contact-field"
                />
              </div>

              <div>
                <label htmlFor="contact-company" className="sr-only">
                  Empresa
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Empresa"
                  className="contact-field"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Correo electrónico"
                  className="contact-field"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="sr-only">
                  Teléfono
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Teléfono"
                  className="contact-field"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  required
                  maxLength={MESSAGE_MAX_LENGTH}
                  aria-describedby="contact-message-count"
                  onChange={event => setMessageLength(event.target.value.length)}
                  placeholder="Cuéntanos qué necesita tu equipo…"
                  className="contact-field resize-none"
                />
                <p
                  id="contact-message-count"
                  className="mt-1.5 text-right text-xs tabular-nums text-neutral-500"
                  aria-live="polite"
                >
                  {messageLength}/{MESSAGE_MAX_LENGTH}
                </p>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full rounded-full bg-[#70ff47] px-6 py-3.5 font-semibold text-neutral-950 transition hover:bg-[#5ee63a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#70ff47] disabled:cursor-wait disabled:opacity-65"
              >
                {submitStatus === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
              </button>
              <p
                className={`min-h-5 text-center text-sm font-medium ${
                  submitStatus === 'error' ? 'text-red-600' : 'text-emerald-700'
                }`}
                role={submitStatus === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {submitMessage}
              </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
