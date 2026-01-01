import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/format.js'

// Tarjeta clicable (link) para ir al detalle del libro.
const TONE_STYLES = {
  amber: { border: 'border-amber-300/20', gradient: 'from-amber-300/20 to-amber-300/5' },
  violet: {
    border: 'border-violet-300/20',
    gradient: 'from-violet-300/20 to-violet-300/5',
  },
  sky: { border: 'border-sky-300/20', gradient: 'from-sky-300/20 to-sky-300/5' },
  emerald: {
    border: 'border-emerald-300/20',
    gradient: 'from-emerald-300/20 to-emerald-300/5',
  },
  rose: { border: 'border-rose-300/20', gradient: 'from-rose-300/20 to-rose-300/5' },
  slate: { border: 'border-slate-300/20', gradient: 'from-slate-300/20 to-slate-300/5' },
}

export default function BookCard({ book }) {
  const tone = TONE_STYLES[book.tone] ?? TONE_STYLES.slate

  return (
    <Link
      to={`/book/${book.id}`}
      className="book-card"
      role="listitem"
      aria-label={`Ver detalles de ${book.title}`}
    >
      <div className="book-card__body">
        <div className={`book-card__cover ${tone.border}`}>
          {book.cover ? (
            <img
              className="book-card__cover-img"
              src={book.cover}
              alt={`Portada de ${book.title}`}
              loading="lazy"
            />
          ) : (
            <div className={`book-card__cover-fallback ${tone.gradient}`} />
          )}
        </div>

        <h3 className="book-card__title mt-3">{book.title}</h3>
        <p className="book-card__meta">{book.author}</p>

        <div className="book-card__footer">
          <span className="book-card__price">{formatPrice(book.price)}</span>
          <span className="text-sm text-slate-400">Ver</span>
        </div>
      </div>
    </Link>
  )
}
