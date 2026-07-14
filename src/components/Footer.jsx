const footerLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Contacto', href: '#contacto' },
]

function Footer() {
  return (
    <footer className="px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-neutral-200 pb-12 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div className="max-w-lg">
            <a href="#inicio" className="text-2xl font-semibold tracking-tight">
              Micro Skills
            </a>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Aprendizaje breve. Impacto real.
              <br />
              Capacitación por WhatsApp para equipos en terreno.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-950">
              Contacto
            </p>
            <address className="mt-3 flex flex-col gap-2 text-sm not-italic text-neutral-600">
              <a
                href="mailto:hormazabal.fernando@gmail.com"
                className="transition-colors hover:text-neutral-950"
              >
                hormazabal.fernando@gmail.com
              </a>
              <span>Viña del Mar, Chile</span>
            </address>
          </div>

          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Micro Skills. Todos los derechos reservados.</p>
          <a href="#inicio" className="transition-colors hover:text-neutral-950">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
