// Skeleton de la tarjeta: sirve para simular carga cuando el listado va pidiendo más libros.
export default function BookCardSkeleton() {
  return (
    <div className="book-card book-card--skeleton" role="listitem" aria-hidden="true">
      <div className="book-card__body animate-pulse">
        <div className="book-card__cover border-slate-800">
          <div className="h-full w-full bg-slate-800/70" />
        </div>

        <div className="mt-3 h-4 w-4/5 book-card__skeleton-line" />
        <div className="mt-2 h-3 w-2/5 book-card__skeleton-line" />

        <div className="book-card__footer">
          <div className="h-4 w-16 book-card__skeleton-line" />
          <div className="h-3 w-10 book-card__skeleton-line" />
        </div>
      </div>
    </div>
  )
}
