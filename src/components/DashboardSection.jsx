import { useEffect, useRef, useState } from 'react'
import TextType from './TextType.jsx'
import './DashboardSection.css'
import './Hero.css'
import './HowItWorks.css'

const metrics = [
  { label: 'Participantes', value: 248, detail: '+12% este mes', color: 'bg-[#70ff47]' },
  { label: 'Avance promedio', value: 78, suffix: '%', detail: '+8% este mes', color: 'bg-[#f78db3]' },
  { label: 'Cursos completados', value: 186, detail: '32 esta semana', color: 'bg-[#e89bf4]' },
  { label: 'Certificados', value: 164, detail: '88% de aprobación', color: 'bg-[#fac90e]' },
]

const weeklyProgress = [42, 55, 48, 66, 72, 81, 78]
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const courseReports = [
  { name: 'Inducción general', progress: 92, people: 68 },
  { name: 'Atención al cliente', progress: 78, people: 54 },
  { name: 'Procedimientos operativos', progress: 65, people: 41 },
]

function SidebarIcon({ children }) {
  return <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-xs">{children}</span>
}

function AnimatedNumber({ value, suffix = '', isActive }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setDisplayValue(0)
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value)
      return undefined
    }

    const duration = 900
    const startTime = performance.now()
    let animationFrame

    const animate = currentTime => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(value * easedProgress))

      if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [isActive, value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

function DashboardMockup({ isActive }) {
  return (
    <div
      className={`dashboard-mockup mockup-browser border border-white/15 bg-neutral-800 shadow-2xl ${
        isActive ? 'is-active' : ''
      }`}
    >
      <div className="mockup-browser-toolbar">
        <div className="input border-0 bg-neutral-700 text-neutral-300">
          app.microskills.cl/reportes
        </div>
      </div>

      <div className="flex min-h-[570px] bg-[#f4f4f0] text-neutral-950">
        <aside className="hidden w-52 shrink-0 flex-col bg-[#111111] p-4 text-white md:flex">
          <div className="mb-8 flex items-center gap-2 px-2 text-base font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-[#70ff47] text-sm text-black">
              M
            </span>
            Micro Skills
          </div>

          <nav className="space-y-2 text-sm">
            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 font-semibold text-black">
              <SidebarIcon>01</SidebarIcon>
              Resumen
            </div>
            {['Participantes', 'Cursos', 'Certificados'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/60">
                <SidebarIcon>0{index + 2}</SidebarIcon>
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-white/10 p-4">
            <p className="text-xs text-white/50">Organización</p>
            <p className="mt-1 text-sm font-semibold">Empresa Demo</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Dashboard
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Resumen de capacitación
              </h3>
            </div>
            <div className="w-fit rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium">
              Últimos 30 días
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {metrics.map(metric => (
              <article key={metric.label} className={`${metric.color} rounded-2xl p-4 sm:p-5`}>
                <p className="text-xs font-medium text-black/60">{metric.label}</p>
                <p className="dashboard-number mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <AnimatedNumber
                    value={metric.value}
                    suffix={metric.suffix}
                    isActive={isActive}
                  />
                </p>
                <p className="mt-2 text-[11px] font-medium text-black/55">{metric.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Progreso semanal</h4>
                  <p className="mt-1 text-xs text-neutral-500">Porcentaje de rutas completadas</p>
                </div>
                <span className="rounded-full bg-[#70ff47] px-3 py-1 text-xs font-semibold">+18%</span>
              </div>

              <div className="mt-7 flex h-44 items-end gap-2 sm:gap-3">
                {weeklyProgress.map((value, index) => (
                  <div key={`${weekDays[index]}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-2">
                    <div className="flex h-full items-end rounded-lg bg-neutral-100">
                      <div
                        className="dashboard-bar w-full rounded-lg bg-neutral-900"
                        style={{ height: `${value}%`, '--bar-delay': `${index * 70}ms` }}
                      />
                    </div>
                    <span className="text-center text-[10px] font-medium text-neutral-400">
                      {weekDays[index]}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
              <h4 className="font-semibold">Avance por curso</h4>
              <p className="mt-1 text-xs text-neutral-500">Participación y finalización</p>

              <div className="mt-6 space-y-5">
                {courseReports.map(course => (
                  <div key={course.name}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="truncate font-semibold">{course.name}</span>
                      <span className="shrink-0 text-neutral-500">{course.people} personas</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="dashboard-progress h-full rounded-full bg-[#f78db3]"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-[10px] font-semibold text-neutral-500">
                      <AnimatedNumber value={course.progress} suffix="%" isActive={isActive} />
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardSection() {
  const [showContent, setShowContent] = useState(false)
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
    <section id="reportes" className="scroll-mt-20 p-3 sm:p-5">
      <div
        ref={cardRef}
        className={`how-it-works-card overflow-hidden rounded-[2rem] bg-neutral-950 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${
          isCardVisible ? 'is-visible' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="relative">
              <h2
                aria-hidden="true"
                className="invisible text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              >
                Todo el avance, en un solo lugar.
              </h2>
              <TextType
                text="Todo el avance, en un solo lugar."
                as="h2"
                className="absolute inset-x-0 top-0 w-full text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
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
              className={`mt-6 text-lg leading-relaxed text-white/65 sm:text-xl ${
                showContent ? 'subtitle-reveal' : 'invisible opacity-0'
              }`}
            >
              Un dashboard centraliza participación, progreso, resultados y certificados para que
              cada organización pueda tomar decisiones con información clara y actualizada.
            </p>
          </div>

          <div
            aria-hidden={!showContent}
            className={`mt-12 sm:mt-16 ${
              showContent ? 'subtitle-reveal' : 'invisible opacity-0'
            }`}
          >
            <DashboardMockup isActive={showContent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardSection
