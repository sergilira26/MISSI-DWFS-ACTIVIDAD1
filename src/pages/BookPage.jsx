import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState/EmptyState.jsx'
import { BOOKS, getBookById } from '../data/books.js'
import { useCart } from '../hooks/useCart.js'
import { formatPrice } from '../utils/format.js'

export default function BookPage() {
  const { bookId } = useParams()
  const book = getBookById(bookId)
  const { addToCart } = useCart()

  const [qty, setQty] = useState(1)
  const maxQty = 9

  const recommendations = useMemo(() => {
    if (!book) return []

    const others = BOOKS.filter((b) => b.id !== book.id)
    const preferred = others.filter((b) => b.tone === book.tone || b.author === book.author)

    const result = []
    const seen = new Set()

    for (const candidate of preferred) {
      if (result.length >= 3) break
      if (seen.has(candidate.id)) continue
      seen.add(candidate.id)
      result.push(candidate)
    }

    for (const candidate of others) {
      if (result.length >= 3) break
      if (seen.has(candidate.id)) continue
      seen.add(candidate.id)
      result.push(candidate)
    }

    return result
  }, [book])

  if (!book) {
    return (
      <div className="page">
        <EmptyState
          title="Libro no encontrado"
          description="Puede que el enlace esté mal o que el libro ya no esté en el catálogo."
          action={
            <Link to="/home" className="btn btn--primary">
              Volver al catálogo
            </Link>
          }
        />
      </div>
    )
  }

  const subtotal = book.price * qty
  const canDec = qty > 1
  const canInc = qty < maxQty

  return (
    <div className="page">
      <Link to="/home" className="btn btn--ghost">
        ← Volver
      </Link>

      <div className="book-detail">
        <article className="book-detail__card">
          <div className="book-detail__body">
            {book.cover ? (
              <img
                className="book-detail__cover"
                src={book.cover}
                alt={`Portada de ${book.title}`}
                loading="lazy"
              />
            ) : null}

            <h1 className="page__title mt-4">{book.title}</h1>
            <p className="book-detail__author">{book.author}</p>
            <p className="book-detail__description">{book.description}</p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
                <dt className="text-slate-400">ISBN</dt>
                <dd className="mt-1 font-medium">{book.isbn}</dd>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
                <dt className="text-slate-400">Precio</dt>
                <dd className="mt-1 font-medium">{formatPrice(book.price)}</dd>
              </div>
            </dl>
          </div>
        </article>

        <aside className="book-detail__aside">
          <p className="book-detail__aside-label">Precio</p>
          <p className="book-detail__price">{formatPrice(book.price)}</p>

          <div className="book-detail__qty">
            <div className="book-detail__qty-row">
              <span className="text-sm text-slate-300">Cantidad</span>
              <div className="book-detail__qty-controls" aria-label="Selector de cantidad">
                <button
                  type="button"
                  className="book-detail__qty-btn cursor-pointer"
                  disabled={!canDec}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Restar"
                >
                  -
                </button>
                <span className="book-detail__qty-value" aria-label={`Cantidad: ${qty}`}>
                  {qty}
                </span>
                <button
                  type="button"
                  className="book-detail__qty-btn cursor-pointer"
                  disabled={!canInc}
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  aria-label="Sumar"
                >
                  +
                </button>
              </div>
            </div>

            <p className="book-detail__aside-subtotal">
              Subtotal:{' '}
              <span className="book-detail__aside-subtotal-value">
                {formatPrice(subtotal)}
              </span>
            </p>
          </div>

          <button
            type="button"
            className="btn btn--primary w-full justify-center mt-4 cursor-pointer"
            onClick={() => addToCart(book, qty)}
          >
            Añadir al carrito
          </button>

          <div className="book-detail__perks">
            <div className="book-detail__perk">
              <span className="book-detail__perk-dot" aria-hidden="true" />
              <span>Envío 24/48h (demo)</span>
            </div>
            <div className="book-detail__perk">
              <span className="book-detail__perk-dot" aria-hidden="true" />
              <span>Devolución 30 días</span>
            </div>
            <div className="book-detail__perk">
              <span className="book-detail__perk-dot" aria-hidden="true" />
              <span>Pago seguro (simulado)</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            El carrito se guarda en localStorage para esta demo.
          </p>

          {recommendations.length > 0 ? (
            <div className="book-detail__reco">
              <p className="book-detail__reco-title">También te puede gustar</p>
              <div className="book-detail__reco-list">
                {recommendations.map((b) => (
                  <Link key={b.id} to={`/book/${b.id}`} className="book-detail__reco-item">
                    <img
                      className="book-detail__reco-cover"
                      src={b.cover}
                      alt={`Portada de ${b.title}`}
                      loading="lazy"
                    />
                    <span className="book-detail__reco-name">{b.title}</span>
                    <span className="book-detail__reco-price">{formatPrice(b.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}

