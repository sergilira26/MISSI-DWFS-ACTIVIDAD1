import { useCart } from '../../hooks/useCart.js'
import { formatPrice } from '../../utils/format.js'

// Línea del carrito: cantidad, subtotal y acciones rápidas.
export default function CartItem({ item }) {
  const { addToCart, decrementItem, removeFromCart } = useCart()
  const lineSubtotal = item.price * item.qty

  return (
    <div className="cart-item">
      <div className="min-w-0">
        <p className="cart-item__title truncate">{item.title}</p>
        <p className="cart-item__meta">
          {item.author} · {formatPrice(item.price)} / ud.
        </p>
        <p className="cart-item__subtotal">
          Subtotal:{' '}
          <span className="cart-item__subtotal-value">{formatPrice(lineSubtotal)}</span>
        </p>
      </div>

      <div className="cart-item__actions">
        <button
          type="button"
          className="btn btn--ghost cursor-pointer"
          onClick={() => decrementItem(item.id)}
          aria-label="Restar una unidad"
        >
          -
        </button>
        <span className="badge" aria-label={`Cantidad: ${item.qty}`}>
          {item.qty}
        </span>
        <button
          type="button"
          className="btn btn--ghost cursor-pointer"
          onClick={() => addToCart(item)}
          aria-label="Sumar una unidad"
        >
          +
        </button>

        <button
          type="button"
          className="btn btn--danger cursor-pointer"
          onClick={() => removeFromCart(item.id)}
        >
          Quitar
        </button>
      </div>
    </div>
  )
}

