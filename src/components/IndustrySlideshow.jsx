import { useEffect, useState } from 'react'
import constructionImage from '../assets/industries/construction.jpg'
import manufacturingImage from '../assets/industries/manufacturing.jpg'
import portOperationsImage from '../assets/industries/port-operations.jpg'
import roadMaintenanceImage from '../assets/industries/road-maintenance.jpg'
import './IndustrySlideshow.css'

const slides = [
  {
    label: 'Construcción',
    image: constructionImage,
    alt: 'Equipo de construcción revisando una capacitación en una tablet',
  },
  {
    label: 'Operaciones portuarias',
    image: portOperationsImage,
    alt: 'Equipo portuario revisando una capacitación en una tablet',
  },
  {
    label: 'Carreteras',
    image: roadMaintenanceImage,
    alt: 'Equipo de mantenimiento de carreteras revisando una capacitación en terreno',
  },
  {
    label: 'Industria',
    image: manufacturingImage,
    alt: 'Equipo industrial revisando una capacitación en una tablet',
  },
]

function IndustrySlideshow({ isActive }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isActive || isPaused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setCurrentSlide(previous => (previous + 1) % slides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [isActive, isPaused])

  return (
    <div
      className="industry-slideshow"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Rubros que pueden capacitarse con Micro Skills"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      {slides.map((slide, index) => (
        <figure
          key={slide.label}
          aria-hidden={index !== currentSlide}
          className={`industry-slide ${index === currentSlide ? 'is-active' : ''}`}
        >
          <img src={slide.image} alt={index === currentSlide ? slide.alt : ''} />
        </figure>
      ))}

      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <div
          className="flex gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm"
          aria-label="Seleccionar fotografía"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Mostrar ${slide.label}`}
              aria-current={index === currentSlide ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndustrySlideshow
