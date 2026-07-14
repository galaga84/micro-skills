function Navbar() {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 w-full shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                href="#como-funciona"
                className="rounded-full transition-colors"
              >
                Cómo funciona
              </a>
            </li>
            <li>
              <a
                href="#beneficios"
                className="rounded-full transition-colors"
              >
                Beneficios
              </a>
            </li>
          </ul>
        </div>
        <a href="#inicio" className="inline-flex min-h-12 items-center px-4 text-xl font-bold">
          <span className="text-neutral-950">Micro</span>
          <span className="ml-1.5 text-[#ff8dc6]">Skills</span>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              href="#como-funciona"
              className="rounded-full transition-colors"
            >
              Cómo funciona
            </a>
          </li>
          <li>
            <a
              href="#beneficios"
              className="rounded-full transition-colors"
            >
              Beneficios
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <a
          href="#contacto"
          className="btn rounded-full border-[#70ff47] bg-[#70ff47] px-6 text-neutral-950 hover:border-[#5ee63a] hover:bg-[#5ee63a]"
        >
          Contacto
        </a>
      </div>
    </div>
  )
}

export default Navbar
