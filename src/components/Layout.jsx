import { Outlet } from 'react-router-dom'
import logo from '../images/participadf-branca.svg'

export default function Layout() {
  return (
    <div className="min-vh-100 bg-light d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: 420 }}>

        {/* HEADER */}
        <header
          className="w-100 py-3 shadow-sm fixed-top"
          style={{ backgroundColor: 'var(--azul-principal)' }}
        >
          <div className="container-fluid px-3">
            <div className="d-flex align-items-center">

              <img
                src={logo}
                alt="Participa DF"
                style={{ height: '20px' }}
                className="me-2"
              />

            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <main className="flex-grow-1 d-flex align-items-center justify-content-center"
  style={{ paddingTop: '72px' }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
