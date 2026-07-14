import { memo, useEffect, useRef } from 'react'
import './DotField.css'

const TWO_PI = Math.PI * 2

const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  ...rest
}) {
  const canvasRef = useRef(null)
  const glowRef = useRef(null)
  const dotsRef = useRef([])
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
  })
  const animationFrameRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
  const glowOpacityRef = useRef(0)
  const engagementRef = useRef(0)
  const propertiesRef = useRef({})
  const rebuildRef = useRef(null)
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`)

  propertiesRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const glowElement = glowRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    let resizeTimer

    function buildDots(width, height) {
      const properties = propertiesRef.current
      const step = properties.dotRadius + properties.dotSpacing
      const columns = Math.floor(width / step)
      const rows = Math.floor(height / step)
      const horizontalPadding = (width % step) / 2
      const verticalPadding = (height % step) / 2
      const dots = new Array(rows * columns)
      let index = 0

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const anchorX = horizontalPadding + column * step + step / 2
          const anchorY = verticalPadding + row * step + step / 2
          dots[index] = {
            ax: anchorX,
            ay: anchorY,
            sx: anchorX,
            sy: anchorY,
            vx: 0,
            vy: 0,
            x: anchorX,
            y: anchorY,
          }
          index += 1
        }
      }

      dotsRef.current = dots
    }

    function resizeCanvas() {
      const rectangle = canvas.parentElement.getBoundingClientRect()
      const width = rectangle.width
      const height = rectangle.height

      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      sizeRef.current = {
        w: width,
        h: height,
        offsetX: rectangle.left + window.scrollX,
        offsetY: rectangle.top + window.scrollY,
      }

      buildDots(width, height)
    }

    function handleResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resizeCanvas, 100)
    }

    function handleMouseMove(event) {
      const size = sizeRef.current
      mouseRef.current.x = event.pageX - size.offsetX
      mouseRef.current.y = event.pageY - size.offsetY
    }

    function updateMouseSpeed() {
      const mouse = mouseRef.current
      const differenceX = mouse.prevX - mouse.x
      const differenceY = mouse.prevY - mouse.y
      const distance = Math.sqrt(differenceX * differenceX + differenceY * differenceY)
      mouse.speed += (distance - mouse.speed) * 0.5
      if (mouse.speed < 0.001) mouse.speed = 0
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
    }

    const speedInterval = window.setInterval(updateMouseSpeed, 20)
    let frameCount = 0

    function renderFrame() {
      frameCount += 1
      const dots = dotsRef.current
      const mouse = mouseRef.current
      const { w: width, h: height } = sizeRef.current
      const properties = propertiesRef.current
      const time = frameCount * 0.02

      const targetEngagement = Math.min(mouse.speed / 5, 1)
      engagementRef.current += (targetEngagement - engagementRef.current) * 0.06
      if (engagementRef.current < 0.001) engagementRef.current = 0
      const engagement = engagementRef.current

      glowOpacityRef.current += (engagement - glowOpacityRef.current) * 0.08

      if (glowElement) {
        glowElement.setAttribute('cx', mouse.x)
        glowElement.setAttribute('cy', mouse.y)
        glowElement.style.opacity = glowOpacityRef.current
      }

      context.clearRect(0, 0, width, height)

      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, properties.gradientFrom)
      gradient.addColorStop(1, properties.gradientTo)
      context.fillStyle = gradient

      const cursorRadiusSquared = properties.cursorRadius * properties.cursorRadius
      const radius = properties.dotRadius / 2
      context.beginPath()

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index]
        const differenceX = mouse.x - dot.ax
        const differenceY = mouse.y - dot.ay
        const distanceSquared = differenceX * differenceX + differenceY * differenceY

        if (distanceSquared < cursorRadiusSquared && engagement > 0.01) {
          const distance = Math.sqrt(distanceSquared)

          if (properties.bulgeOnly) {
            const proximity = 1 - distance / properties.cursorRadius
            const push = proximity * proximity * properties.bulgeStrength * engagement
            const angle = Math.atan2(differenceY, differenceX)
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15
          } else if (distance > 0) {
            const angle = Math.atan2(differenceY, differenceX)
            const movement = (500 / distance) * (mouse.speed * properties.cursorForce)
            dot.vx += Math.cos(angle) * -movement
            dot.vy += Math.sin(angle) * -movement
          }
        } else if (properties.bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1
          dot.sy += (dot.ay - dot.sy) * 0.1
        }

        if (!properties.bulgeOnly) {
          dot.vx *= 0.9
          dot.vy *= 0.9
          dot.x = dot.ax + dot.vx
          dot.y = dot.ay + dot.vy
          dot.sx += (dot.x - dot.sx) * 0.1
          dot.sy += (dot.y - dot.sy) * 0.1
        }

        let drawX = dot.sx
        let drawY = dot.sy

        if (properties.waveAmplitude > 0) {
          drawY += Math.sin(dot.ax * 0.03 + time) * properties.waveAmplitude
          drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * properties.waveAmplitude * 0.5
        }

        const sparkleScale =
          properties.sparkle && (((index * 2654435761) ^ (frameCount >> 3)) >>> 0) % 100 < 3
            ? 1.8
            : 1
        const drawRadius = radius * sparkleScale
        context.moveTo(drawX + drawRadius, drawY)
        context.arc(drawX, drawY, drawRadius, 0, TWO_PI)
      }

      context.fill()
      animationFrameRef.current = window.requestAnimationFrame(renderFrame)
    }

    resizeCanvas()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationFrameRef.current = window.requestAnimationFrame(renderFrame)

    rebuildRef.current = () => {
      const { w: width, h: height } = sizeRef.current
      if (width > 0 && height > 0) buildDots(width, height)
    }

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.clearInterval(speedInterval)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    rebuildRef.current?.()
  }, [dotRadius, dotSpacing])

  return (
    <div className="dot-field-container" aria-hidden="true" {...rest}>
      <canvas ref={canvasRef} className="dot-field-canvas" />
      <svg className="dot-field-glow" focusable="false">
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          className="dot-field-glow-circle"
        />
      </svg>
    </div>
  )
})

export default DotField
