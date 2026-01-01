import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.js'
import { formatPrice } from '../../utils/format.js'
import CartItem from '../CartItem/CartItem.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'

// Carrito en formato "drawer" lateral. Se cierra con Escape o clic en el fondo.
export default function CartDrawer({ open, onClose }) {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const hasItems = items.length > 0

  function handleClearCart() {
    if (!hasItems) return

    const unitsText = totalItems === 1 ? '1 unidad' : `${totalItems} unidades`
    const ok = window.confirm(`¿Vaciar carrito? Se eliminarán ${unitsText}.`)
    if (!ok) return

    clearCart()
  }

  useEffect(() => {
    if (!open) return

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true">
      <div className="cart-drawer__backdrop" onClick={onClose} />

      <aside className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Carrito</h2>
          <button type="button" className="btn btn--ghost cursor-pointer" onClick={onClose}>
            Cerrar
          </button>
        </div>

        <div className="cart-drawer__body">
          {!hasItems ? (
            <EmptyState title="Carrito vacío" description="Añade algún libro para continuar." />
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Total</span>
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
          </div>

          <button
            type="button"
            className={`btn btn--danger w-full justify-center ${
              hasItems ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!hasItems}
            onClick={handleClearCart}
          >
            Vaciar carrito
          </button>

          <Link
            to="/checkout"
            className={`btn btn--primary w-full justify-center ${
              hasItems ? 'cursor-pointer' : 'pointer-events-none opacity-50'
            }`}
            onClick={onClose}
          >
            Continuar al pago
          </Link>
        </div>
      </aside>
    </div>
  )
}

