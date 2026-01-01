import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Si el usuario no toca nada, le llevamos al catálogo en 5 segundos.
    const timeoutId = window.setTimeout(() => navigate('/home'), 5000)

    // Cualquier interacción cuenta como “acción”, así que cancelamos el salto automático.
    const cancel = () => window.clearTimeout(timeoutId)
    window.addEventListener('pointerdown', cancel, { once: true })
    window.addEventListener('keydown', cancel, { once: true })

    return () => {
      cancel()
      window.removeEventListener('pointerdown', cancel)
      window.removeEventListener('keydown', cancel)
    }
  }, [navigate])

  return (
    <div className="landing">
      <section className="landing__hero">
        <p className="landing__kicker">Librería online</p>
        <h1 className="landing__title">Relatos de Papel</h1>
        <p className="landing__lead">
          Catálogo de libros, carrito y pago con datos mock.
        </p>

        <div className="landing__actions">
          <Link to="/home" className="btn btn--primary">
            Entrar al catálogo
          </Link>
          <a href="#detalles" className="btn btn--ghost">
            Ver detalles
          </a>
        </div>

        <p className="landing__note" id="detalles">
          Si no haces nada, serás redirigido al catálogo en 5 segundos.
        </p>
      </section>
    </div>
  )
}
