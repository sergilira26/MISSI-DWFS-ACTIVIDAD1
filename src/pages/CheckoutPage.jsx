import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { formatPrice } from '../utils/format.js'
import EmptyState from '../components/EmptyState/EmptyState.jsx'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()

  function handlePay() {
    // Orden pedido: alert -> vaciar carrito -> redirigir.
    window.alert('Pedido realizado. ¡Gracias por tu compra!')
    clearCart()
    navigate('/home')
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <EmptyState
          title="No hay nada para pagar"
          description="Tu carrito está vacío."
          action={
            <Link to="/home" className="btn btn--primary">
              Ir al catálogo
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page__title">Checkout</h1>
      <p className="page__subtitle">Revisa el resumen antes de pagar.</p>

      <div className="checkout">
        <section className="checkout__card">
          <div className="checkout__body">
            {items.map((it) => (
              <div key={it.id} className="checkout__line">
                <div className="min-w-0 pr-4">
                  <p className="truncate font-medium">{it.title}</p>
                  <p className="text-sm text-slate-300">
                    {it.author} · {it.qty} ud.
                  </p>
                </div>
                <div className="text-right">
                  <p className="checkout__value">
                    {formatPrice(it.price * it.qty)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatPrice(it.price)} / ud.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="checkout__card">
          <div className="checkout__body">
            <div className="checkout__line">
              <span className="checkout__label">Total</span>
              <span className="checkout__value">{formatPrice(totalPrice)}</span>
            </div>

            <button
              type="button"
              className="btn btn--primary w-full justify-center mt-4 cursor-pointer"
              onClick={handlePay}
            >
              Pagar
            </button>

            <Link to="/home" className="btn btn--ghost w-full justify-center mt-2 cursor-pointer">
              Seguir comprando
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
