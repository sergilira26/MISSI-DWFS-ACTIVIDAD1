import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.js'

// Header principal: marca, navegación y acceso al carrito.
export default function Header({ showCart, onOpenCart }) {
  const { totalItems } = useCart()

  return (
    <div className="header">
      <div className="header__brand">
        <Link to="/home" className="header__title" aria-label="Ir al catálogo">
          Relatos de Papel
        </Link>
      </div>

      <nav className="header__nav" aria-label="Navegación principal">
        <NavLink to="/home" className="btn btn--ghost cursor-pointer">
          Catálogo
        </NavLink>

        {showCart ? (
          <button type="button" className="btn btn--ghost cursor-pointer" onClick={onOpenCart}>
            Carrito <span className="badge">{totalItems}</span>
          </button>
        ) : null}
      </nav>
    </div>
  )
}
